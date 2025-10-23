use crate::book::OrderBook;
use crate::error::OrderError;
use crate::events::EventBroadcaster;
use crate::types::{
    BookEvent, BookRemovalReason, EngineEvent, Fill, MatchResult, OrderId, OrderRejection,
    OrderRejectionReason, OrderType, OrderView, Price, Quantity, Side, TradeEvent,
};
use metrics::increment_counter;

#[derive(Debug)]
pub struct MatchingEngine {
    book: OrderBook,
    events: Option<EventBroadcaster>,
}

impl Default for MatchingEngine {
    fn default() -> Self {
        Self {
            book: OrderBook::new(),
            events: None,
        }
    }
}

impl MatchingEngine {
    #[inline]
    pub fn new() -> Self {
        Self::default()
    }

    #[inline]
    pub fn with_book(book: OrderBook) -> Self {
        Self { book, events: None }
    }

    #[inline]
    pub fn with_book_and_events(book: OrderBook, events: EventBroadcaster) -> Self {
        Self {
            book,
            events: Some(events),
        }
    }

    #[inline]
    pub fn order_book(&self) -> &OrderBook {
        &self.book
    }

    #[inline]
    pub fn order_book_mut(&mut self) -> &mut OrderBook {
        &mut self.book
    }

    #[inline]
    pub fn set_event_broadcaster(&mut self, broadcaster: EventBroadcaster) {
        self.events = Some(broadcaster);
    }

    #[inline]
    pub fn event_broadcaster(&self) -> Option<EventBroadcaster> {
        self.events.clone()
    }

    #[inline]
    fn emit(&self, event: EngineEvent) {
        if let Some(broadcaster) = &self.events {
            broadcaster.emit(event);
        }
    }

    #[inline]
    fn emit_book(&self, event: BookEvent) {
        self.emit(EngineEvent::Book(event));
    }

    #[inline]
    fn emit_trade(&self, event: TradeEvent) {
        increment_counter!("matching.trades.executed");
        self.emit(EngineEvent::Trade(event));
    }

    #[inline]
    fn emit_rejection(&self, event: OrderRejection) {
        increment_counter!("matching.orders.rejected");
        self.emit(EngineEvent::Rejection(event));
    }

    #[inline]
    fn emit_book_add(&self, order: OrderView) {
        increment_counter!("matching.book.added");
        self.emit_book(BookEvent::Added(order));
    }

    #[inline]
    fn emit_book_update(&self, order: OrderView) {
        increment_counter!("matching.book.updated");
        self.emit_book(BookEvent::Updated(order));
    }

    #[inline]
    fn emit_book_remove(&self, order: OrderView, quantity: Quantity, reason: BookRemovalReason) {
        increment_counter!("matching.book.removed");
        self.emit_book(BookEvent::Removed {
            order_id: order.id,
            side: order.side,
            price: order.price,
            quantity,
            reason,
        });
    }

    #[inline]
    fn record_rejection(
        &self,
        order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        quantity: Quantity,
        reason: OrderRejectionReason,
    ) {
        self.emit_rejection(OrderRejection {
            order_id,
            side,
            order_type,
            price,
            quantity,
            reason,
        });
    }

    #[inline]
    fn validate_quantity(
        &self,
        order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        quantity: Quantity,
    ) -> Result<(), OrderError> {
        if quantity == 0 {
            self.record_rejection(
                order_id,
                side,
                order_type,
                price,
                quantity,
                OrderRejectionReason::InvalidQuantity,
            );
            Err(OrderError::InvalidQuantity)
        } else {
            Ok(())
        }
    }

    #[inline]
    fn emit_trade_fill(
        &self,
        taker_order_id: OrderId,
        taker_side: Side,
        order_type: OrderType,
        fill: &Fill,
    ) {
        self.emit_trade(TradeEvent {
            taker_order_id,
            maker_order_id: fill.maker_id,
            price: fill.price,
            quantity: fill.quantity,
            taker_side,
            taker_order_type: order_type,
        });
    }

    pub fn submit(
        &mut self,
        order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        quantity: Quantity,
    ) -> Result<MatchResult, OrderError> {
        increment_counter!("matching.orders.submitted");
        match order_type {
            OrderType::Market => self.submit_market(order_id, side, quantity),
            OrderType::Limit => {
                let Some(price) = price else {
                    self.record_rejection(
                        order_id,
                        side,
                        OrderType::Limit,
                        None,
                        quantity,
                        OrderRejectionReason::MissingPrice,
                    );
                    return Err(OrderError::MissingPrice);
                };
                self.submit_limit(order_id, side, price, quantity)
            }
            OrderType::ImmediateOrCancel => {
                let Some(price) = price else {
                    self.record_rejection(
                        order_id,
                        side,
                        OrderType::ImmediateOrCancel,
                        None,
                        quantity,
                        OrderRejectionReason::MissingPrice,
                    );
                    return Err(OrderError::MissingPrice);
                };
                self.submit_immediate_or_cancel(order_id, side, price, quantity)
            }
            OrderType::FillOrKill => {
                let Some(price) = price else {
                    self.record_rejection(
                        order_id,
                        side,
                        OrderType::FillOrKill,
                        None,
                        quantity,
                        OrderRejectionReason::MissingPrice,
                    );
                    return Err(OrderError::MissingPrice);
                };
                self.submit_fill_or_kill(order_id, side, price, quantity)
            }
            OrderType::PostOnly => {
                let Some(price) = price else {
                    self.record_rejection(
                        order_id,
                        side,
                        OrderType::PostOnly,
                        None,
                        quantity,
                        OrderRejectionReason::MissingPrice,
                    );
                    return Err(OrderError::MissingPrice);
                };
                self.submit_post_only(order_id, side, price, quantity)
            }
        }
    }

    pub fn submit_limit(
        &mut self,
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
    ) -> Result<MatchResult, OrderError> {
        self.validate_quantity(order_id, side, OrderType::Limit, Some(price), quantity)?;
        if self.book.order(order_id).is_some() {
            self.record_rejection(
                order_id,
                side,
                OrderType::Limit,
                Some(price),
                quantity,
                OrderRejectionReason::DuplicateOrder,
            );
            return Err(OrderError::DuplicateOrder);
        }

        let mut remaining = quantity;
        let fills = self.match_opposite(
            order_id,
            side,
            OrderType::Limit,
            Some(price),
            &mut remaining,
        )?;

        let resting = if remaining > 0 {
            match self.book.add_order(order_id, side, price, remaining) {
                Ok(()) => {
                    increment_counter!("matching.orders.accepted");
                    let order = self
                        .book
                        .order(order_id)
                        .expect("resting order should exist");
                    self.emit_book_add(order);
                    Some(order)
                }
                Err(error) => {
                    self.record_rejection(
                        order_id,
                        side,
                        OrderType::Limit,
                        Some(price),
                        remaining,
                        match error {
                            OrderError::CrossedOrder => OrderRejectionReason::Crossed,
                            OrderError::DuplicateOrder => OrderRejectionReason::DuplicateOrder,
                            OrderError::InvalidQuantity => OrderRejectionReason::InvalidQuantity,
                            OrderError::UnknownOrder => OrderRejectionReason::Crossed,
                            OrderError::MissingPrice => OrderRejectionReason::MissingPrice,
                        },
                    );
                    return Err(error);
                }
            }
        } else {
            increment_counter!("matching.orders.accepted");
            None
        };

        Ok(MatchResult {
            fills,
            resting,
            unfilled: 0,
        })
    }

    pub fn submit_market(
        &mut self,
        order_id: OrderId,
        side: Side,
        quantity: Quantity,
    ) -> Result<MatchResult, OrderError> {
        self.validate_quantity(order_id, side, OrderType::Market, None, quantity)?;

        increment_counter!("matching.orders.accepted");
        let mut remaining = quantity;
        let fills = self.match_opposite(order_id, side, OrderType::Market, None, &mut remaining)?;

        Ok(MatchResult {
            fills,
            resting: None,
            unfilled: remaining,
        })
    }

    pub fn submit_immediate_or_cancel(
        &mut self,
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
    ) -> Result<MatchResult, OrderError> {
        self.validate_quantity(
            order_id,
            side,
            OrderType::ImmediateOrCancel,
            Some(price),
            quantity,
        )?;

        increment_counter!("matching.orders.accepted");
        let mut remaining = quantity;
        let fills = self.match_opposite(
            order_id,
            side,
            OrderType::ImmediateOrCancel,
            Some(price),
            &mut remaining,
        )?;

        Ok(MatchResult {
            fills,
            resting: None,
            unfilled: remaining,
        })
    }

    pub fn submit_fill_or_kill(
        &mut self,
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
    ) -> Result<MatchResult, OrderError> {
        self.validate_quantity(order_id, side, OrderType::FillOrKill, Some(price), quantity)?;

        if self.book.available_quantity(side, Some(price)) < quantity {
            self.record_rejection(
                order_id,
                side,
                OrderType::FillOrKill,
                Some(price),
                quantity,
                OrderRejectionReason::InsufficientLiquidity,
            );
            return Ok(MatchResult {
                fills: Vec::new(),
                resting: None,
                unfilled: quantity,
            });
        }

        self.submit_immediate_or_cancel(order_id, side, price, quantity)
    }

    pub fn submit_post_only(
        &mut self,
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
    ) -> Result<MatchResult, OrderError> {
        self.validate_quantity(order_id, side, OrderType::PostOnly, Some(price), quantity)?;
        if self.book.order(order_id).is_some() {
            self.record_rejection(
                order_id,
                side,
                OrderType::PostOnly,
                Some(price),
                quantity,
                OrderRejectionReason::DuplicateOrder,
            );
            return Err(OrderError::DuplicateOrder);
        }

        match self.book.add_order(order_id, side, price, quantity) {
            Ok(()) => {
                increment_counter!("matching.orders.accepted");
                let resting = self.book.order(order_id);
                if let Some(order) = resting {
                    self.emit_book_add(order);
                }
                Ok(MatchResult {
                    fills: Vec::new(),
                    resting,
                    unfilled: 0,
                })
            }
            Err(error) => {
                self.record_rejection(
                    order_id,
                    side,
                    OrderType::PostOnly,
                    Some(price),
                    quantity,
                    match error {
                        OrderError::CrossedOrder => OrderRejectionReason::Crossed,
                        OrderError::DuplicateOrder => OrderRejectionReason::DuplicateOrder,
                        OrderError::InvalidQuantity => OrderRejectionReason::InvalidQuantity,
                        OrderError::MissingPrice => OrderRejectionReason::MissingPrice,
                        OrderError::UnknownOrder => OrderRejectionReason::Crossed,
                    },
                );
                Err(error)
            }
        }
    }

    fn match_opposite(
        &mut self,
        taker_order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price_limit: Option<Price>,
        remaining: &mut Quantity,
    ) -> Result<Vec<Fill>, OrderError> {
        let mut fills = Vec::new();
        let opposite = side.opposite();

        while *remaining > 0 {
            let Some(best) = self.book.best_order(opposite) else {
                break;
            };

            if let Some(limit) = price_limit {
                let crosses = match side {
                    Side::Bid => best.price <= limit,
                    Side::Ask => best.price >= limit,
                };
                if !crosses {
                    break;
                }
            }

            let traded = (*remaining).min(best.quantity);
            if traded == 0 {
                break;
            }

            let fill = Fill {
                maker_id: best.id,
                price: best.price,
                quantity: traded,
            };
            self.emit_trade_fill(taker_order_id, side, order_type, &fill);
            fills.push(fill);

            if traded == best.quantity {
                self.book.cancel(best.id)?;
                self.emit_book_remove(best, traded, BookRemovalReason::Filled);
            } else {
                let new_quantity = best.quantity - traded;
                self.book.update_order_quantity(best.id, new_quantity)?;
                self.emit_book_update(OrderView {
                    quantity: new_quantity,
                    ..best
                });
            }

            *remaining -= traded;
        }

        Ok(fills)
    }

    pub fn modify_order(
        &mut self,
        order_id: OrderId,
        quantity: Quantity,
    ) -> Result<OrderView, OrderError> {
        let current = self.book.order(order_id).ok_or(OrderError::UnknownOrder)?;
        self.validate_quantity(
            order_id,
            current.side,
            OrderType::Limit,
            Some(current.price),
            quantity,
        )?;
        self.book.update_order_quantity(order_id, quantity)?;
        let updated = self
            .book
            .order(order_id)
            .expect("order should exist after update");
        self.emit_book_update(updated);
        Ok(updated)
    }

    pub fn cancel_order(&mut self, order_id: OrderId) -> Result<Quantity, OrderError> {
        let current = self.book.order(order_id).ok_or(OrderError::UnknownOrder)?;
        let quantity = self.book.cancel(order_id)?;
        self.emit_book_remove(current, quantity, BookRemovalReason::Canceled);
        Ok(quantity)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{BookEvent, BookRemovalReason, EngineEvent, OrderView, TradeEvent};
    use crate::EventBroadcaster;

    fn engine_with_events() -> (MatchingEngine, EventBroadcaster) {
        let events = EventBroadcaster::with_capacity(16);
        let mut engine = MatchingEngine::new();
        engine.set_event_broadcaster(events.clone());
        (engine, events)
    }

    #[test]
    fn limit_order_matches_and_rests_remaining() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 101, 5).unwrap();
        book.add_order(2, Side::Ask, 102, 7).unwrap();

        let mut engine = MatchingEngine::with_book(book);

        let result = engine
            .submit_limit(10, Side::Bid, 102, 15)
            .expect("limit order should succeed");

        assert_eq!(
            result.fills,
            vec![
                Fill {
                    maker_id: 1,
                    price: 101,
                    quantity: 5,
                },
                Fill {
                    maker_id: 2,
                    price: 102,
                    quantity: 7,
                },
            ]
        );
        assert_eq!(result.unfilled, 0);

        let resting = result.resting.expect("resting order expected");
        assert_eq!(
            resting,
            OrderView {
                id: 10,
                side: Side::Bid,
                price: 102,
                quantity: 3,
            }
        );

        let stored = engine.order_book().order(10).unwrap();
        assert_eq!(stored.quantity, 3);
        assert_eq!(engine.order_book().best_ask(), None);
    }

    #[test]
    fn limit_order_full_fill_leaves_no_resting() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Bid, 100, 4).unwrap();
        book.add_order(2, Side::Bid, 99, 6).unwrap();

        let mut engine = MatchingEngine::with_book(book);

        let result = engine
            .submit_limit(11, Side::Ask, 99, 10)
            .expect("limit sell should match");

        assert_eq!(result.resting, None);
        assert_eq!(
            result.fills,
            vec![
                Fill {
                    maker_id: 1,
                    price: 100,
                    quantity: 4,
                },
                Fill {
                    maker_id: 2,
                    price: 99,
                    quantity: 6,
                },
            ]
        );
        assert_eq!(engine.order_book().total_orders(), 0);
    }

    #[test]
    fn market_order_consumes_available_liquidity() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Bid, 100, 5)
            .unwrap();
        engine
            .order_book_mut()
            .add_order(2, Side::Bid, 99, 4)
            .unwrap();

        let result = engine
            .submit_market(90, Side::Ask, 12)
            .expect("market sell should run");

        assert_eq!(result.resting, None);
        assert_eq!(result.unfilled, 3);
        assert_eq!(
            result.fills,
            vec![
                Fill {
                    maker_id: 1,
                    price: 100,
                    quantity: 5,
                },
                Fill {
                    maker_id: 2,
                    price: 99,
                    quantity: 4,
                },
            ]
        );
        assert_eq!(engine.order_book().total_orders(), 0);
    }

    #[test]
    fn market_order_without_liquidity_reports_unfilled() {
        let mut engine = MatchingEngine::new();
        let result = engine.submit_market(91, Side::Bid, 8).unwrap();
        assert!(result.fills.is_empty());
        assert_eq!(result.unfilled, 8);
        assert_eq!(result.resting, None);
    }

    #[test]
    fn limit_order_rejects_duplicate_id() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(5, Side::Ask, 110, 2)
            .unwrap();

        assert_eq!(
            engine.submit_limit(5, Side::Bid, 111, 1),
            Err(OrderError::DuplicateOrder)
        );
    }

    #[test]
    fn limit_order_respects_price_limit() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 105, 2)
            .unwrap();

        let result = engine
            .submit_limit(10, Side::Bid, 104, 3)
            .expect("should rest without matching");
        assert!(result.fills.is_empty());
        let resting = result.resting.unwrap();
        assert_eq!(resting.quantity, 3);
        assert_eq!(resting.price, 104);
        assert_eq!(engine.order_book().best_ask(), Some((105, 2)));
        assert_eq!(engine.order_book().best_bid(), Some((104, 3)));
    }

    #[test]
    fn submit_post_only_emits_add_event() {
        let (mut engine, events) = engine_with_events();
        let mut receiver = events.subscribe();

        engine
            .submit_post_only(50, Side::Bid, 100, 4)
            .expect("post only add");

        let event = receiver.try_recv().expect("event received");
        assert_eq!(event.sequence, 1);
        match event.event {
            EngineEvent::Book(BookEvent::Added(order)) => {
                assert_eq!(order.id, 50);
                assert_eq!(order.price, 100);
                assert_eq!(order.quantity, 4);
                assert_eq!(order.side, Side::Bid);
            }
            other => panic!("unexpected event: {other:?}"),
        }
    }

    #[test]
    fn trade_emits_fill_and_removal_events() {
        let (mut engine, events) = engine_with_events();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 101, 3)
            .unwrap();
        let mut receiver = events.subscribe();

        engine
            .submit_limit(2, Side::Bid, 102, 3)
            .expect("matching bid");

        let first = receiver.try_recv().expect("trade event");
        assert!(matches!(
            first.event,
            EngineEvent::Trade(TradeEvent {
                taker_order_id: 2,
                maker_order_id: 1,
                quantity: 3,
                ..
            })
        ));

        let second = receiver.try_recv().expect("removal event");
        match second.event {
            EngineEvent::Book(BookEvent::Removed {
                order_id,
                reason,
                quantity,
                ..
            }) => {
                assert_eq!(order_id, 1);
                assert_eq!(quantity, 3);
                assert_eq!(reason, BookRemovalReason::Filled);
            }
            other => panic!("unexpected event: {other:?}"),
        }
    }

    #[test]
    fn immediate_or_cancel_cancels_remainder() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 101, 5)
            .unwrap();
        engine
            .order_book_mut()
            .add_order(2, Side::Ask, 102, 5)
            .unwrap();

        let result = engine
            .submit_immediate_or_cancel(92, Side::Bid, 102, 15)
            .expect("ioc should execute");

        assert_eq!(result.unfilled, 5);
        assert_eq!(result.resting, None);
        assert_eq!(result.fills.len(), 2);
        assert_eq!(engine.order_book().total_orders(), 0);
    }

    #[test]
    fn fill_or_kill_cancels_when_insufficient() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 101, 4)
            .unwrap();

        let result = engine
            .submit_fill_or_kill(93, Side::Bid, 101, 5)
            .expect("fok should not error");

        assert!(result.fills.is_empty());
        assert_eq!(result.unfilled, 5);
        assert_eq!(engine.order_book().total_orders(), 1);
    }

    #[test]
    fn fill_or_kill_executes_when_sufficient() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 101, 4)
            .unwrap();
        engine
            .order_book_mut()
            .add_order(2, Side::Ask, 102, 4)
            .unwrap();

        let result = engine
            .submit_fill_or_kill(94, Side::Bid, 102, 8)
            .expect("fok should execute");

        assert_eq!(result.unfilled, 0);
        assert_eq!(result.resting, None);
        assert_eq!(result.fills.len(), 2);
        assert_eq!(engine.order_book().total_orders(), 0);
    }

    #[test]
    fn post_only_rests_without_crossing() {
        let mut engine = MatchingEngine::new();
        let result = engine
            .submit_post_only(10, Side::Bid, 100, 5)
            .expect("post only should rest");

        assert!(result.fills.is_empty());
        let resting = result.resting.expect("resting order expected");
        assert_eq!(resting.id, 10);
        assert_eq!(resting.price, 100);
        assert_eq!(resting.quantity, 5);
        assert_eq!(engine.order_book().order(10).unwrap().quantity, 5);
    }

    #[test]
    fn post_only_crossing_rejected() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 100, 3)
            .unwrap();

        let err = engine
            .submit_post_only(2, Side::Bid, 100, 5)
            .expect_err("post only should reject crossing");
        assert_eq!(err, OrderError::CrossedOrder);
    }

    #[test]
    fn submit_requires_price_for_limit_variants() {
        let mut engine = MatchingEngine::new();
        let err = engine
            .submit(1, Side::Bid, OrderType::Limit, None, 5)
            .expect_err("missing price should be rejected");
        assert_eq!(err, OrderError::MissingPrice);
    }

    #[test]
    fn submit_routes_to_matching_strategies() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 101, 4)
            .unwrap();

        let market = engine
            .submit(100, Side::Bid, OrderType::Market, None, 3)
            .expect("market route");
        assert_eq!(market.unfilled, 0);
        assert!(market.resting.is_none());

        let limit = engine
            .submit(101, Side::Bid, OrderType::Limit, Some(101), 2)
            .expect("limit route");
        assert!(limit.resting.is_some());
    }

    #[test]
    fn submit_market_with_zero_quantity_errors() {
        let mut engine = MatchingEngine::new();
        let err = engine
            .submit(1, Side::Bid, OrderType::Market, None, 0)
            .expect_err("zero quantity should be rejected");
        assert_eq!(err, OrderError::InvalidQuantity);
    }

    #[test]
    fn submit_requires_prices_for_all_limit_like_variants() {
        let mut engine = MatchingEngine::new();
        for order_type in [
            OrderType::Limit,
            OrderType::ImmediateOrCancel,
            OrderType::FillOrKill,
            OrderType::PostOnly,
        ] {
            let err = engine
                .submit(1, Side::Bid, order_type, None, 5)
                .expect_err("price should be required");
            assert_eq!(err, OrderError::MissingPrice);
        }
    }
}
