use crate::SharedRiskEngine;
use orderbook::{
    AccountId, AccountSnapshot, BalanceError, BookEvent as DomainBookEvent, BookRemovalReason,
    EngineEvent as DomainEngineEvent, EventBroadcaster, Fill, GatewayError, LevelSnapshot,
    OrderError, OrderRejection, OrderRejectionReason, OrderType, OrderView, SequencedEngineEvent,
    Side, TradeEvent,
};
use std::convert::TryFrom;
use std::net::SocketAddr;
use std::pin::Pin;
use tokio_stream::{
    wrappers::{errors::BroadcastStreamRecvError, BroadcastStream},
    Stream, StreamExt,
};
use tonic::async_trait;
use tonic::{Request, Response, Status};
use tracing::warn;

pub mod proto {
    tonic::include_proto!("orderbook.v1");
}

use proto::order_book_service_server::{OrderBookService, OrderBookServiceServer};
use proto::{
    book_event, engine_event, AccountBalance as ProtoAccountBalance, BookAdded,
    BookEvent as ProtoBookEvent, BookLevel, BookOrder, BookRemoveReason as ProtoBookRemoveReason,
    BookRemoved, BookUpdated, CancelOrderRequest, CancelOrderResponse, CommandStatus,
    CreditAccountRequest, CreditAccountResponse, EngineEvent as ProtoEngineEvent,
    Fill as ProtoFill, GetBalanceRequest, GetBalanceResponse, ModifyOrderRequest,
    ModifyOrderResponse, NewOrderRequest, NewOrderResponse, OrderType as ProtoOrderType,
    RejectionEvent as ProtoRejectionEvent, RejectionReason as ProtoRejectionReason,
    RestingOrder as ProtoRestingOrder, SnapshotRequest, SnapshotResponse, StreamEventsRequest,
    TradeEvent as ProtoTradeEvent,
};

#[derive(Clone)]
pub struct GrpcOrderBookService {
    engine: SharedRiskEngine,
    events: EventBroadcaster,
}

impl GrpcOrderBookService {
    pub fn new(engine: SharedRiskEngine, events: EventBroadcaster) -> Self {
        Self { engine, events }
    }

    pub fn into_server(self) -> OrderBookServiceServer<Self> {
        OrderBookServiceServer::new(self)
    }

    pub async fn serve(
        engine: SharedRiskEngine,
        events: EventBroadcaster,
        addr: SocketAddr,
    ) -> Result<(), tonic::transport::Error> {
        let service = GrpcOrderBookService::new(engine, events);
        tonic::transport::Server::builder()
            .add_service(OrderBookServiceServer::new(service))
            .serve(addr)
            .await
    }
}

#[async_trait]
impl OrderBookService for GrpcOrderBookService {
    type StreamEventsStream = Pin<Box<dyn Stream<Item = Result<ProtoEngineEvent, Status>> + Send>>;

    async fn new_order(
        &self,
        request: Request<NewOrderRequest>,
    ) -> Result<Response<NewOrderResponse>, Status> {
        let payload = request.into_inner();
        let side = decode_side(payload.side)?;
        let order_type = decode_order_type(payload.order_type);
        let price = payload.price;
        let (status, fills, resting, unfilled) = {
            let mut engine = self.engine.lock();
            match engine.submit(
                payload.account_id,
                payload.order_id,
                side,
                order_type,
                price,
                payload.quantity,
            ) {
                Ok(result) => (
                    ok_status(),
                    result.fills.into_iter().map(to_proto_fill).collect(),
                    result.resting.map(to_proto_resting),
                    result.unfilled,
                ),
                Err(error) => (gateway_status(error), Vec::new(), None, 0),
            }
        };
        Ok(Response::new(NewOrderResponse {
            status: Some(status),
            fills,
            resting,
            unfilled_quantity: unfilled,
        }))
    }

    async fn modify_order(
        &self,
        request: Request<ModifyOrderRequest>,
    ) -> Result<Response<ModifyOrderResponse>, Status> {
        let payload = request.into_inner();
        let status = {
            let mut engine = self.engine.lock();
            match engine.modify_order(payload.account_id, payload.order_id, payload.quantity) {
                Ok(_) => ok_status(),
                Err(error) => gateway_status(error),
            }
        };
        Ok(Response::new(ModifyOrderResponse {
            status: Some(status),
        }))
    }

    async fn cancel_order(
        &self,
        request: Request<CancelOrderRequest>,
    ) -> Result<Response<CancelOrderResponse>, Status> {
        let payload = request.into_inner();
        let (status, canceled_quantity) = {
            let mut engine = self.engine.lock();
            match engine.cancel_order(payload.account_id, payload.order_id) {
                Ok(quantity) => (ok_status(), quantity),
                Err(error) => (gateway_status(error), 0),
            }
        };
        Ok(Response::new(CancelOrderResponse {
            status: Some(status),
            canceled_quantity,
        }))
    }

    async fn credit_account(
        &self,
        request: Request<CreditAccountRequest>,
    ) -> Result<Response<CreditAccountResponse>, Status> {
        let payload = request.into_inner();
        let (status, balance) = {
            let mut engine = self.engine.lock();
            match engine.credit_account(payload.account_id, payload.base, payload.quote) {
                Ok(()) => {
                    let snapshot = engine
                        .account_snapshot(payload.account_id)
                        .ok_or_else(|| Status::internal("account missing after credit"))?;
                    (
                        ok_status(),
                        Some(to_proto_balance(payload.account_id, snapshot)),
                    )
                }
                Err(error) => (gateway_status(GatewayError::Balance(error)), None),
            }
        };
        Ok(Response::new(CreditAccountResponse {
            status: Some(status),
            balance,
        }))
    }

    async fn get_balance(
        &self,
        request: Request<GetBalanceRequest>,
    ) -> Result<Response<GetBalanceResponse>, Status> {
        let payload = request.into_inner();
        let (status, balance) = {
            let engine = self.engine.lock();
            match engine.account_snapshot(payload.account_id) {
                Some(snapshot) => (
                    ok_status(),
                    Some(to_proto_balance(payload.account_id, snapshot)),
                ),
                None => (
                    gateway_status(GatewayError::Balance(BalanceError::UnknownAccount)),
                    None,
                ),
            }
        };
        Ok(Response::new(GetBalanceResponse {
            status: Some(status),
            balance,
        }))
    }

    async fn snapshot(
        &self,
        _request: Request<SnapshotRequest>,
    ) -> Result<Response<SnapshotResponse>, Status> {
        let snapshot = self.engine.lock().order_book().snapshot();
        Ok(Response::new(SnapshotResponse {
            status: Some(ok_status()),
            bids: snapshot
                .bids
                .into_iter()
                .map(|level| to_proto_level(Side::Bid, level))
                .collect(),
            asks: snapshot
                .asks
                .into_iter()
                .map(|level| to_proto_level(Side::Ask, level))
                .collect(),
        }))
    }

    async fn stream_events(
        &self,
        _request: Request<StreamEventsRequest>,
    ) -> Result<Response<Self::StreamEventsStream>, Status> {
        let receiver = self.events.subscribe();
        let stream = BroadcastStream::new(receiver).filter_map(|item| match item {
            Ok(event) => Some(Ok(to_proto_engine_event(event))),
            Err(BroadcastStreamRecvError::Lagged(skipped)) => {
                warn!(skipped, "grpc stream lagged; skipping events");
                None
            }
        });
        Ok(Response::new(Box::pin(stream) as Self::StreamEventsStream))
    }
}

fn decode_side(value: i32) -> Result<Side, Status> {
    match proto::Side::try_from(value).map_err(|_| Status::invalid_argument("invalid side"))? {
        proto::Side::Bid => Ok(Side::Bid),
        proto::Side::Ask => Ok(Side::Ask),
        proto::Side::Unspecified => Err(Status::invalid_argument("invalid side")),
    }
}

fn decode_order_type(value: i32) -> OrderType {
    match ProtoOrderType::try_from(value).unwrap_or(ProtoOrderType::Unspecified) {
        ProtoOrderType::Market => OrderType::Market,
        ProtoOrderType::Limit | ProtoOrderType::Unspecified => OrderType::Limit,
        ProtoOrderType::ImmediateOrCancel => OrderType::ImmediateOrCancel,
        ProtoOrderType::FillOrKill => OrderType::FillOrKill,
        ProtoOrderType::PostOnly => OrderType::PostOnly,
    }
}

fn ok_status() -> CommandStatus {
    CommandStatus {
        ok: true,
        error_message: String::new(),
    }
}

fn gateway_status(error: GatewayError) -> CommandStatus {
    CommandStatus {
        ok: false,
        error_message: gateway_error_message(error).to_string(),
    }
}

fn gateway_error_message(error: GatewayError) -> &'static str {
    match error {
        GatewayError::Order(order_error) => order_error_message(order_error),
        GatewayError::Balance(balance_error) => balance_error_message(balance_error),
    }
}

fn balance_error_message(error: BalanceError) -> &'static str {
    match error {
        BalanceError::UnknownAccount => "unknown_account",
        BalanceError::InsufficientBase => "insufficient_base",
        BalanceError::InsufficientQuote => "insufficient_quote",
        BalanceError::UnknownOrder => "unknown_order",
        BalanceError::AccountMismatch => "account_mismatch",
        BalanceError::ArithmeticOverflow => "numeric_overflow",
        BalanceError::InvariantViolation(_) => "invariant_violation",
    }
}

fn order_error_message(error: OrderError) -> &'static str {
    match error {
        OrderError::DuplicateOrder => "duplicate_order",
        OrderError::UnknownOrder => "unknown_order",
        OrderError::InvalidQuantity => "invalid_quantity",
        OrderError::CrossedOrder => "crossed_order",
        OrderError::MissingPrice => "missing_price",
    }
}

fn to_proto_level(side: Side, level: LevelSnapshot) -> BookLevel {
    BookLevel {
        side: encode_side(side),
        price: level.price,
        total_quantity: level.total_quantity,
        orders: level.orders.into_iter().map(to_proto_order).collect(),
    }
}

fn to_proto_order(order: OrderView) -> BookOrder {
    BookOrder {
        order_id: order.id,
        side: encode_side(order.side),
        price: order.price,
        quantity: order.quantity,
    }
}

fn to_proto_balance(account_id: AccountId, snapshot: AccountSnapshot) -> ProtoAccountBalance {
    ProtoAccountBalance {
        account_id,
        available_base: clamp_to_u64(snapshot.available_base),
        reserved_base: clamp_to_u64(snapshot.reserved_base),
        available_quote: clamp_to_u64(snapshot.available_quote),
        reserved_quote: clamp_to_u64(snapshot.reserved_quote),
    }
}

fn to_proto_fill(fill: Fill) -> ProtoFill {
    ProtoFill {
        maker_id: fill.maker_id,
        price: fill.price,
        quantity: fill.quantity,
    }
}

fn to_proto_resting(order: OrderView) -> ProtoRestingOrder {
    ProtoRestingOrder {
        order_id: order.id,
        side: encode_side(order.side),
        price: order.price,
        quantity: order.quantity,
    }
}

fn to_proto_engine_event(event: SequencedEngineEvent) -> ProtoEngineEvent {
    let payload = match event.event {
        DomainEngineEvent::Book(book) => {
            Some(engine_event::Payload::Book(to_proto_book_event(book)))
        }
        DomainEngineEvent::Trade(trade) => {
            Some(engine_event::Payload::Trade(to_proto_trade_event(trade)))
        }
        DomainEngineEvent::Rejection(rejection) => Some(engine_event::Payload::Rejection(
            to_proto_rejection_event(rejection),
        )),
    };
    ProtoEngineEvent {
        sequence: event.sequence,
        payload,
    }
}

fn to_proto_book_event(event: DomainBookEvent) -> ProtoBookEvent {
    let kind = match event {
        DomainBookEvent::Added(order) => Some(book_event::Kind::Added(to_proto_book_added(order))),
        DomainBookEvent::Updated(order) => {
            Some(book_event::Kind::Updated(to_proto_book_updated(order)))
        }
        DomainBookEvent::Removed {
            order_id,
            side,
            price,
            quantity,
            reason,
        } => Some(book_event::Kind::Removed(BookRemoved {
            order_id,
            side: encode_side(side),
            price,
            quantity,
            reason: encode_book_remove_reason(reason) as i32,
        })),
    };
    ProtoBookEvent { kind }
}

fn to_proto_book_added(order: OrderView) -> BookAdded {
    BookAdded {
        order_id: order.id,
        side: encode_side(order.side),
        price: order.price,
        quantity: order.quantity,
    }
}

fn to_proto_book_updated(order: OrderView) -> BookUpdated {
    BookUpdated {
        order_id: order.id,
        side: encode_side(order.side),
        price: order.price,
        quantity: order.quantity,
    }
}

fn to_proto_trade_event(event: TradeEvent) -> ProtoTradeEvent {
    ProtoTradeEvent {
        taker_order_id: event.taker_order_id,
        maker_order_id: event.maker_order_id,
        taker_side: encode_side(event.taker_side),
        order_type: encode_order_type(event.taker_order_type) as i32,
        price: event.price,
        quantity: event.quantity,
    }
}

fn to_proto_rejection_event(event: OrderRejection) -> ProtoRejectionEvent {
    ProtoRejectionEvent {
        order_id: event.order_id,
        side: encode_side(event.side),
        order_type: encode_order_type(event.order_type) as i32,
        price: event.price,
        quantity: event.quantity,
        reason: encode_rejection_reason(event.reason) as i32,
    }
}

fn encode_side(side: Side) -> i32 {
    match side {
        Side::Bid => proto::Side::Bid as i32,
        Side::Ask => proto::Side::Ask as i32,
    }
}

fn encode_order_type(order_type: OrderType) -> ProtoOrderType {
    match order_type {
        OrderType::Market => ProtoOrderType::Market,
        OrderType::Limit => ProtoOrderType::Limit,
        OrderType::ImmediateOrCancel => ProtoOrderType::ImmediateOrCancel,
        OrderType::FillOrKill => ProtoOrderType::FillOrKill,
        OrderType::PostOnly => ProtoOrderType::PostOnly,
    }
}

fn clamp_to_u64(value: u128) -> u64 {
    value.min(u128::from(u64::MAX)) as u64
}

fn encode_book_remove_reason(reason: BookRemovalReason) -> ProtoBookRemoveReason {
    match reason {
        BookRemovalReason::Filled => ProtoBookRemoveReason::Filled,
        BookRemovalReason::Canceled => ProtoBookRemoveReason::Canceled,
    }
}

fn encode_rejection_reason(reason: OrderRejectionReason) -> ProtoRejectionReason {
    match reason {
        OrderRejectionReason::DuplicateOrder => ProtoRejectionReason::Duplicate,
        OrderRejectionReason::Crossed => ProtoRejectionReason::Crossed,
        OrderRejectionReason::InvalidQuantity => ProtoRejectionReason::InvalidQuantity,
        OrderRejectionReason::MissingPrice => ProtoRejectionReason::MissingPrice,
        OrderRejectionReason::InsufficientLiquidity => ProtoRejectionReason::InsufficientLiquidity,
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::shared_matching_engine;
    use orderbook::RiskEngine;
    use proto::OrderType as ProtoOrderType;
    use proto::Side as ProtoSide;

    #[tokio::test]
    async fn grpc_lifecycle_operations() {
        let (engine, events) = shared_matching_engine(RiskEngine::new());
        let service = GrpcOrderBookService::new(engine.clone(), events.clone());

        let credit = service
            .credit_account(Request::new(CreditAccountRequest {
                account_id: 1,
                base: 0,
                quote: 10_000,
            }))
            .await
            .unwrap()
            .into_inner();
        assert!(credit.status.unwrap().ok);
        assert_eq!(credit.balance.unwrap().account_id, 1);

        let balance = service
            .get_balance(Request::new(GetBalanceRequest { account_id: 1 }))
            .await
            .unwrap()
            .into_inner();
        assert!(balance.status.unwrap().ok);
        assert_eq!(balance.balance.unwrap().available_quote, 10_000);

        let new_response = service
            .new_order(Request::new(NewOrderRequest {
                account_id: 1,
                order_id: 1,
                side: ProtoSide::Bid as i32,
                price: Some(100),
                quantity: 5,
                order_type: ProtoOrderType::Limit as i32,
            }))
            .await
            .unwrap()
            .into_inner();
        let status = new_response.status.unwrap();
        assert!(status.ok);
        assert_eq!(new_response.fills.len(), 0);
        assert_eq!(new_response.unfilled_quantity, 0);
        let resting = new_response.resting.unwrap();
        assert_eq!(resting.order_id, 1);
        assert_eq!(resting.quantity, 5);

        let modify_response = service
            .modify_order(Request::new(ModifyOrderRequest {
                account_id: 1,
                order_id: 1,
                quantity: 7,
            }))
            .await
            .unwrap()
            .into_inner();
        assert!(modify_response.status.unwrap().ok);

        let snapshot = service
            .snapshot(Request::new(SnapshotRequest {}))
            .await
            .unwrap()
            .into_inner();
        assert!(snapshot.status.unwrap().ok);
        assert_eq!(snapshot.bids.len(), 1);
        assert_eq!(snapshot.bids[0].price, 100);
        assert_eq!(snapshot.bids[0].total_quantity, 7);
        assert_eq!(snapshot.bids[0].orders.len(), 1);

        let cancel_response = service
            .cancel_order(Request::new(CancelOrderRequest {
                order_id: 1,
                account_id: 1,
            }))
            .await
            .unwrap()
            .into_inner();
        assert!(cancel_response.status.unwrap().ok);
        assert_eq!(cancel_response.canceled_quantity, 7);

        let cancel_unknown = service
            .cancel_order(Request::new(CancelOrderRequest {
                order_id: 2,
                account_id: 1,
            }))
            .await
            .unwrap()
            .into_inner();
        assert!(!cancel_unknown.status.unwrap().ok);
    }

    #[test]
    fn decode_helpers_and_serializers_cover_all_variants() {
        assert!(decode_side(proto::Side::Unspecified as i32).is_err());
        assert_eq!(decode_side(proto::Side::Bid as i32).unwrap(), Side::Bid);
        assert_eq!(decode_side(proto::Side::Ask as i32).unwrap(), Side::Ask);

        assert_eq!(
            decode_order_type(ProtoOrderType::ImmediateOrCancel as i32),
            OrderType::ImmediateOrCancel
        );
        assert_eq!(
            decode_order_type(ProtoOrderType::FillOrKill as i32),
            OrderType::FillOrKill
        );
        assert_eq!(
            decode_order_type(ProtoOrderType::PostOnly as i32),
            OrderType::PostOnly
        );
        assert_eq!(
            decode_order_type(ProtoOrderType::Market as i32),
            OrderType::Market
        );
        assert_eq!(
            decode_order_type(ProtoOrderType::Limit as i32),
            OrderType::Limit
        );

        let status = gateway_status(GatewayError::Order(OrderError::UnknownOrder));
        assert!(!status.ok);
        assert_eq!(status.error_message, "unknown_order");

        let balance_status = gateway_status(GatewayError::Balance(BalanceError::InsufficientQuote));
        assert!(!balance_status.ok);
        assert_eq!(balance_status.error_message, "insufficient_quote");

        let level = LevelSnapshot {
            price: 100,
            total_quantity: 5,
            orders: vec![OrderView {
                id: 1,
                side: Side::Bid,
                price: 100,
                quantity: 5,
            }],
        };
        let proto_level = to_proto_level(Side::Bid, level.clone());
        assert_eq!(proto_level.side, proto::Side::Bid as i32);
        assert_eq!(proto_level.price, 100);
        assert_eq!(proto_level.total_quantity, 5);
        assert_eq!(proto_level.orders.len(), 1);
        let back = proto_level.orders[0].clone();
        assert_eq!(back.order_id, 1);
        assert_eq!(back.quantity, 5);

        let fill = to_proto_fill(Fill {
            maker_id: 42,
            price: 101,
            quantity: 3,
        });
        assert_eq!(fill.maker_id, 42);
        assert_eq!(fill.price, 101);
        assert_eq!(fill.quantity, 3);

        let resting = to_proto_resting(OrderView {
            id: 9,
            side: Side::Ask,
            price: 111,
            quantity: 7,
        });
        assert_eq!(resting.order_id, 9);
        assert_eq!(resting.side, proto::Side::Ask as i32);
        assert_eq!(resting.price, 111);
        assert_eq!(resting.quantity, 7);
    }

    #[tokio::test]
    async fn grpc_stream_events_delivers_book_add() {
        let (engine, events) = shared_matching_engine(RiskEngine::new());
        let service = GrpcOrderBookService::new(engine.clone(), events);

        let response = service
            .stream_events(Request::new(StreamEventsRequest {}))
            .await
            .expect("stream events response");
        let mut stream = response.into_inner();

        {
            let mut guard = engine.lock();
            guard.credit_account(42, 0, 10_000).expect("credit account");
            guard
                .submit(42, 10, Side::Bid, OrderType::PostOnly, Some(100), 5)
                .expect("post only add");
        }

        let event = stream
            .next()
            .await
            .expect("event available")
            .expect("valid event");
        assert_eq!(event.sequence, 1);
        match event.payload.expect("payload") {
            engine_event::Payload::Book(book) => match book.kind.expect("book kind") {
                book_event::Kind::Added(added) => {
                    assert_eq!(added.order_id, 10);
                    assert_eq!(added.price, 100);
                    assert_eq!(added.quantity, 5);
                }
                other => panic!("unexpected book payload: {other:?}"),
            },
            other => panic!("unexpected event payload: {other:?}"),
        }
    }
}
