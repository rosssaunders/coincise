use orderbook::{
    AccountId, AccountSnapshot, BalanceError, BookEvent, BookRemovalReason, BookSnapshot,
    EngineEvent, Fill, GatewayError, LevelSnapshot, MatchResult, OrderError, OrderId,
    OrderRejection, OrderRejectionReason, OrderType, OrderView, Price, Quantity,
    SequencedEngineEvent, Side, TradeEvent,
};
use orderbook_server::proto::order_book_service_client::OrderBookServiceClient;
use orderbook_server::proto::{
    book_event, engine_event, AccountBalance as ProtoAccountBalance, BookEvent as ProtoBookEvent,
    BookRemoveReason as ProtoBookRemoveReason, CancelOrderRequest, CommandStatus,
    CreditAccountRequest, EngineEvent as ProtoEngineEvent, GetBalanceRequest, ModifyOrderRequest,
    NewOrderRequest, OrderType as ProtoOrderType, RejectionEvent as ProtoRejectionEvent,
    RejectionReason as ProtoRejectionReason, RestingOrder as ProtoRestingOrder, SnapshotRequest,
    StreamEventsRequest, TradeEvent as ProtoTradeEvent,
};
use std::convert::TryFrom;
use std::pin::Pin;
use thiserror::Error;
use tokio_stream::{Stream, StreamExt};
use tonic::transport::Channel;
use tonic::{Request, Status};

pub type GrpcClient = OrderBookServiceClient<Channel>;

#[derive(Debug, Error)]
pub enum ClientError {
    #[error("transport error: {0}")]
    Transport(#[from] tonic::transport::Error),
    #[error("gRPC status: {0}")]
    Status(#[from] Status),
    #[error("missing command status in server response")]
    MissingStatus,
    #[error("gateway rejected request: {0:?}")]
    Gateway(GatewayError),
    #[error("missing balance in server response")]
    MissingBalance,
    #[error("invalid engine event: {0}")]
    InvalidEvent(&'static str),
}

impl From<GatewayError> for ClientError {
    fn from(error: GatewayError) -> Self {
        ClientError::Gateway(error)
    }
}

pub struct GrpcOrderBookClient {
    inner: GrpcClient,
}

pub type EventStream =
    Pin<Box<dyn Stream<Item = Result<SequencedEngineEvent, ClientError>> + Send>>;

impl GrpcOrderBookClient {
    pub async fn connect(endpoint: impl AsRef<str>) -> Result<Self, ClientError> {
        let inner = OrderBookServiceClient::connect(endpoint.as_ref().to_string()).await?;
        Ok(Self { inner })
    }

    pub async fn submit_order(
        &mut self,
        account_id: AccountId,
        order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        quantity: Quantity,
    ) -> Result<MatchResult, ClientError> {
        let request = Request::new(NewOrderRequest {
            account_id,
            order_id,
            side: encode_side(side),
            price,
            quantity,
            order_type: encode_order_type(order_type),
        });
        let response = self.inner.new_order(request).await?.into_inner();
        decode_status(response.status)?;
        Ok(MatchResult {
            fills: response.fills.into_iter().map(from_proto_fill).collect(),
            resting: response.resting.map(from_proto_resting).transpose()?,
            unfilled: response.unfilled_quantity,
        })
    }

    pub async fn cancel_order(
        &mut self,
        account_id: AccountId,
        order_id: OrderId,
    ) -> Result<Quantity, ClientError> {
        let request = Request::new(CancelOrderRequest {
            account_id,
            order_id,
        });
        let response = self.inner.cancel_order(request).await?.into_inner();
        decode_status(response.status)?;
        Ok(response.canceled_quantity)
    }

    pub async fn modify_order(
        &mut self,
        account_id: AccountId,
        order_id: OrderId,
        quantity: Quantity,
    ) -> Result<(), ClientError> {
        let request = Request::new(ModifyOrderRequest {
            order_id,
            quantity,
            account_id,
        });
        let response = self.inner.modify_order(request).await?.into_inner();
        decode_status(response.status)?;
        Ok(())
    }

    pub async fn snapshot(&mut self) -> Result<BookSnapshot, ClientError> {
        let response = self
            .inner
            .snapshot(Request::new(SnapshotRequest {}))
            .await?
            .into_inner();
        decode_status(response.status)?;
        Ok(BookSnapshot {
            bids: response
                .bids
                .into_iter()
                .map(to_level_snapshot)
                .collect::<Result<Vec<_>, ClientError>>()?,
            asks: response
                .asks
                .into_iter()
                .map(to_level_snapshot)
                .collect::<Result<Vec<_>, ClientError>>()?,
        })
    }

    pub async fn credit_account(
        &mut self,
        account_id: AccountId,
        base: Quantity,
        quote: Quantity,
    ) -> Result<AccountSnapshot, ClientError> {
        let request = Request::new(CreditAccountRequest {
            account_id,
            base,
            quote,
        });
        let response = self.inner.credit_account(request).await?.into_inner();
        decode_status(response.status)?;
        let balance = response.balance.ok_or(ClientError::MissingBalance)?;
        Ok(from_proto_balance(balance))
    }

    pub async fn get_balance(
        &mut self,
        account_id: AccountId,
    ) -> Result<AccountSnapshot, ClientError> {
        let request = Request::new(GetBalanceRequest { account_id });
        let response = self.inner.get_balance(request).await?.into_inner();
        decode_status(response.status)?;
        let balance = response.balance.ok_or(ClientError::MissingBalance)?;
        Ok(from_proto_balance(balance))
    }

    pub fn inner_mut(&mut self) -> &mut GrpcClient {
        &mut self.inner
    }

    pub async fn stream_events(&mut self) -> Result<EventStream, ClientError> {
        let response = self
            .inner
            .stream_events(Request::new(StreamEventsRequest {}))
            .await?;
        let stream = response.into_inner().map(|item| {
            item.map_err(ClientError::Status)
                .and_then(from_proto_engine_event)
        });
        Ok(Box::pin(stream))
    }
}

fn decode_status(status: Option<CommandStatus>) -> Result<(), ClientError> {
    let status = status.ok_or(ClientError::MissingStatus)?;
    if status.ok {
        return Ok(());
    }
    match decode_gateway_error(&status.error_message) {
        Some(error) => Err(ClientError::Gateway(error)),
        None => Err(ClientError::Status(Status::invalid_argument(
            status.error_message,
        ))),
    }
}

fn decode_gateway_error(message: &str) -> Option<GatewayError> {
    match message {
        "duplicate_order" => Some(GatewayError::Order(OrderError::DuplicateOrder)),
        "unknown_order" => Some(GatewayError::Order(OrderError::UnknownOrder)),
        "invalid_quantity" => Some(GatewayError::Order(OrderError::InvalidQuantity)),
        "crossed_order" => Some(GatewayError::Order(OrderError::CrossedOrder)),
        "missing_price" => Some(GatewayError::Order(OrderError::MissingPrice)),
        "unknown_account" => Some(GatewayError::Balance(BalanceError::UnknownAccount)),
        "insufficient_base" => Some(GatewayError::Balance(BalanceError::InsufficientBase)),
        "insufficient_quote" => Some(GatewayError::Balance(BalanceError::InsufficientQuote)),
        "account_mismatch" => Some(GatewayError::Balance(BalanceError::AccountMismatch)),
        "numeric_overflow" => Some(GatewayError::Balance(BalanceError::ArithmeticOverflow)),
        "invariant_violation" => Some(GatewayError::Balance(BalanceError::InvariantViolation(
            "gateway",
        ))),
        _ => None,
    }
}

fn encode_side(side: Side) -> i32 {
    match side {
        Side::Bid => orderbook_server::proto::Side::Bid as i32,
        Side::Ask => orderbook_server::proto::Side::Ask as i32,
    }
}

fn decode_side(value: i32) -> Result<Side, ClientError> {
    match orderbook_server::proto::Side::try_from(value) {
        Ok(orderbook_server::proto::Side::Bid) => Ok(Side::Bid),
        Ok(orderbook_server::proto::Side::Ask) => Ok(Side::Ask),
        _ => Err(ClientError::Status(Status::invalid_argument(
            "invalid side in snapshot",
        ))),
    }
}

fn encode_order_type(order_type: OrderType) -> i32 {
    match order_type {
        OrderType::Market => ProtoOrderType::Market as i32,
        OrderType::Limit => ProtoOrderType::Limit as i32,
        OrderType::ImmediateOrCancel => ProtoOrderType::ImmediateOrCancel as i32,
        OrderType::FillOrKill => ProtoOrderType::FillOrKill as i32,
        OrderType::PostOnly => ProtoOrderType::PostOnly as i32,
    }
}

fn from_proto_engine_event(proto: ProtoEngineEvent) -> Result<SequencedEngineEvent, ClientError> {
    let sequence = proto.sequence;
    let payload = proto
        .payload
        .ok_or(ClientError::InvalidEvent("missing engine event payload"))?;
    let event = match payload {
        engine_event::Payload::Book(book) => EngineEvent::Book(from_proto_book_event(book)?),
        engine_event::Payload::Trade(trade) => EngineEvent::Trade(from_proto_trade_event(trade)?),
        engine_event::Payload::Rejection(rejection) => {
            EngineEvent::Rejection(from_proto_rejection_event(rejection)?)
        }
    };
    Ok(SequencedEngineEvent { sequence, event })
}

fn from_proto_book_event(event: ProtoBookEvent) -> Result<BookEvent, ClientError> {
    let kind = event
        .kind
        .ok_or(ClientError::InvalidEvent("missing book event payload"))?;
    match kind {
        book_event::Kind::Added(added) => Ok(BookEvent::Added(to_order_view(
            added.order_id,
            added.side,
            added.price,
            added.quantity,
        )?)),
        book_event::Kind::Updated(updated) => Ok(BookEvent::Updated(to_order_view(
            updated.order_id,
            updated.side,
            updated.price,
            updated.quantity,
        )?)),
        book_event::Kind::Removed(removed) => Ok(BookEvent::Removed {
            order_id: removed.order_id,
            side: decode_side(removed.side)?,
            price: removed.price,
            quantity: removed.quantity,
            reason: decode_book_remove_reason(removed.reason)?,
        }),
    }
}

fn from_proto_trade_event(event: ProtoTradeEvent) -> Result<TradeEvent, ClientError> {
    Ok(TradeEvent {
        taker_order_id: event.taker_order_id,
        maker_order_id: event.maker_order_id,
        price: event.price,
        quantity: event.quantity,
        taker_side: decode_side(event.taker_side)?,
        taker_order_type: decode_order_type(event.order_type),
    })
}

fn from_proto_rejection_event(event: ProtoRejectionEvent) -> Result<OrderRejection, ClientError> {
    Ok(OrderRejection {
        order_id: event.order_id,
        side: decode_side(event.side)?,
        order_type: decode_order_type(event.order_type),
        price: event.price,
        quantity: event.quantity,
        reason: decode_rejection_reason(event.reason)?,
    })
}

fn to_order_view(
    order_id: OrderId,
    side_value: i32,
    price: Price,
    quantity: Quantity,
) -> Result<OrderView, ClientError> {
    let side = decode_side(side_value)?;
    Ok(OrderView {
        id: order_id,
        side,
        price,
        quantity,
    })
}

fn decode_book_remove_reason(value: i32) -> Result<BookRemovalReason, ClientError> {
    match ProtoBookRemoveReason::try_from(value).ok() {
        Some(ProtoBookRemoveReason::Filled) => Ok(BookRemovalReason::Filled),
        Some(ProtoBookRemoveReason::Canceled) => Ok(BookRemovalReason::Canceled),
        _ => Err(ClientError::InvalidEvent("unknown book removal reason")),
    }
}

fn decode_rejection_reason(value: i32) -> Result<OrderRejectionReason, ClientError> {
    match ProtoRejectionReason::try_from(value).ok() {
        Some(ProtoRejectionReason::Duplicate) => Ok(OrderRejectionReason::DuplicateOrder),
        Some(ProtoRejectionReason::Crossed) => Ok(OrderRejectionReason::Crossed),
        Some(ProtoRejectionReason::InvalidQuantity) => Ok(OrderRejectionReason::InvalidQuantity),
        Some(ProtoRejectionReason::MissingPrice) => Ok(OrderRejectionReason::MissingPrice),
        Some(ProtoRejectionReason::InsufficientLiquidity) => {
            Ok(OrderRejectionReason::InsufficientLiquidity)
        }
        _ => Err(ClientError::InvalidEvent("unknown rejection reason")),
    }
}

fn decode_order_type(value: i32) -> OrderType {
    match ProtoOrderType::try_from(value).unwrap_or(ProtoOrderType::Limit) {
        ProtoOrderType::Market => OrderType::Market,
        ProtoOrderType::Limit | ProtoOrderType::Unspecified => OrderType::Limit,
        ProtoOrderType::ImmediateOrCancel => OrderType::ImmediateOrCancel,
        ProtoOrderType::FillOrKill => OrderType::FillOrKill,
        ProtoOrderType::PostOnly => OrderType::PostOnly,
    }
}

fn from_proto_fill(fill: orderbook_server::proto::Fill) -> Fill {
    Fill {
        maker_id: fill.maker_id,
        price: fill.price,
        quantity: fill.quantity,
    }
}

fn from_proto_balance(balance: ProtoAccountBalance) -> AccountSnapshot {
    AccountSnapshot {
        available_base: balance.available_base as u128,
        reserved_base: balance.reserved_base as u128,
        available_quote: balance.available_quote as u128,
        reserved_quote: balance.reserved_quote as u128,
    }
}

fn to_level_snapshot(
    level: orderbook_server::proto::BookLevel,
) -> Result<LevelSnapshot, ClientError> {
    let orders = level
        .orders
        .into_iter()
        .map(|order| {
            Ok(OrderView {
                id: order.order_id,
                side: decode_side(order.side)?,
                price: order.price,
                quantity: order.quantity,
            })
        })
        .collect::<Result<Vec<_>, ClientError>>()?;
    Ok(LevelSnapshot {
        price: level.price,
        total_quantity: level.total_quantity,
        orders,
    })
}

fn from_proto_resting(order: ProtoRestingOrder) -> Result<OrderView, ClientError> {
    Ok(OrderView {
        id: order.order_id,
        side: decode_side(order.side)?,
        price: order.price,
        quantity: order.quantity,
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use orderbook_server::proto::{
        self, book_event, AccountBalance as ProtoAccountBalance, BookAdded,
    };

    #[test]
    fn decode_engine_book_added_event() {
        let proto_event = ProtoEngineEvent {
            sequence: 7,
            payload: Some(engine_event::Payload::Book(ProtoBookEvent {
                kind: Some(book_event::Kind::Added(BookAdded {
                    order_id: 42,
                    side: proto::Side::Bid as i32,
                    price: 101,
                    quantity: 3,
                })),
            })),
        };

        let decoded = from_proto_engine_event(proto_event).expect("book event decoded");
        assert_eq!(decoded.sequence, 7);
        match decoded.event {
            EngineEvent::Book(BookEvent::Added(order)) => {
                assert_eq!(order.id, 42);
                assert_eq!(order.price, 101);
                assert_eq!(order.quantity, 3);
                assert_eq!(order.side, Side::Bid);
            }
            other => panic!("unexpected event: {other:?}"),
        }
    }

    #[test]
    fn decode_engine_trade_and_rejection_events() {
        let trade_event = ProtoEngineEvent {
            sequence: 11,
            payload: Some(engine_event::Payload::Trade(ProtoTradeEvent {
                taker_order_id: 1,
                maker_order_id: 2,
                taker_side: proto::Side::Ask as i32,
                order_type: ProtoOrderType::ImmediateOrCancel as i32,
                price: 100,
                quantity: 5,
            })),
        };
        let decoded_trade = from_proto_engine_event(trade_event).expect("trade decoded");
        match decoded_trade.event {
            EngineEvent::Trade(trade) => {
                assert_eq!(trade.taker_order_id, 1);
                assert_eq!(trade.maker_order_id, 2);
                assert_eq!(trade.taker_side, Side::Ask);
                assert_eq!(trade.taker_order_type, OrderType::ImmediateOrCancel);
                assert_eq!(trade.price, 100);
                assert_eq!(trade.quantity, 5);
            }
            other => panic!("unexpected event: {other:?}"),
        }

        let rejection_event = ProtoEngineEvent {
            sequence: 12,
            payload: Some(engine_event::Payload::Rejection(ProtoRejectionEvent {
                order_id: 9,
                side: proto::Side::Ask as i32,
                order_type: ProtoOrderType::FillOrKill as i32,
                price: Some(99),
                quantity: 4,
                reason: ProtoRejectionReason::InsufficientLiquidity as i32,
            })),
        };
        let decoded_rejection =
            from_proto_engine_event(rejection_event).expect("rejection decoded");
        match decoded_rejection.event {
            EngineEvent::Rejection(rejection) => {
                assert_eq!(rejection.order_id, 9);
                assert_eq!(rejection.side, Side::Ask);
                assert_eq!(rejection.order_type, OrderType::FillOrKill);
                assert_eq!(rejection.price, Some(99));
                assert_eq!(rejection.quantity, 4);
                assert_eq!(
                    rejection.reason,
                    OrderRejectionReason::InsufficientLiquidity
                );
            }
            other => panic!("unexpected event: {other:?}"),
        }
    }

    #[test]
    fn decode_status_converts_known_errors() {
        let status = Some(CommandStatus {
            ok: false,
            error_message: "unknown_order".to_string(),
        });
        let err = decode_status(status).expect_err("should map to order error");
        match err {
            ClientError::Gateway(GatewayError::Order(OrderError::UnknownOrder)) => {}
            other => panic!("unexpected error: {other:?}"),
        }

        let balance_status = Some(CommandStatus {
            ok: false,
            error_message: "unknown_account".to_string(),
        });
        let err = decode_status(balance_status).expect_err("should map to balance error");
        match err {
            ClientError::Gateway(GatewayError::Balance(BalanceError::UnknownAccount)) => {}
            other => panic!("unexpected error: {other:?}"),
        }

        let ok = decode_status(Some(CommandStatus {
            ok: true,
            error_message: String::new(),
        }));
        assert!(ok.is_ok());
    }

    #[test]
    fn balance_decoding_round_trips() {
        let proto_balance = ProtoAccountBalance {
            account_id: 5,
            available_base: 11,
            reserved_base: 7,
            available_quote: 13,
            reserved_quote: 2,
        };
        let snapshot = from_proto_balance(proto_balance);
        assert_eq!(snapshot.available_base, 11);
        assert_eq!(snapshot.reserved_base, 7);
        assert_eq!(snapshot.available_quote, 13);
        assert_eq!(snapshot.reserved_quote, 2);

        assert_eq!(
            decode_gateway_error("insufficient_base"),
            Some(GatewayError::Balance(BalanceError::InsufficientBase))
        );
        assert_eq!(
            decode_gateway_error("insufficient_quote"),
            Some(GatewayError::Balance(BalanceError::InsufficientQuote))
        );
    }
}
