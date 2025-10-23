use orderbook::{MatchingEngine, OrderError, OrderId, Price, Quantity, Side};

pub struct MarketMaker {
    mid_price: Price,
    spread: Price,
    quantity: Quantity,
    next_order_id: OrderId,
    bid_order: Option<OrderId>,
    ask_order: Option<OrderId>,
}

impl MarketMaker {
    pub fn new(
        mid_price: Price,
        spread: Price,
        quantity: Quantity,
        starting_order_id: OrderId,
    ) -> Result<Self, OrderError> {
        if quantity == 0 {
            return Err(OrderError::InvalidQuantity);
        }

        Ok(Self {
            mid_price,
            spread,
            quantity,
            next_order_id: starting_order_id,
            bid_order: None,
            ask_order: None,
        })
    }

    #[inline]
    pub fn set_mid_price(&mut self, mid_price: Price) {
        self.mid_price = mid_price;
    }

    pub fn refresh_quotes(&mut self, engine: &mut MatchingEngine) -> Result<(), OrderError> {
        let bid = self.bid_order.take();
        let ask = self.ask_order.take();
        Self::cancel_if_present(engine, bid)?;
        Self::cancel_if_present(engine, ask)?;

        if let Some(price) = self.adjusted_price(engine, Side::Bid, self.bid_price()) {
            let id = self.next_id();
            let result = engine.submit_post_only(id, Side::Bid, price, self.quantity)?;
            self.bid_order = result.resting.map(|order| order.id);
        }

        if let Some(price) = self.adjusted_price(engine, Side::Ask, self.ask_price()) {
            let id = self.next_id();
            let result = engine.submit_post_only(id, Side::Ask, price, self.quantity)?;
            self.ask_order = result.resting.map(|order| order.id);
        }

        Ok(())
    }

    pub fn cancel_all(&mut self, engine: &mut MatchingEngine) -> Result<(), OrderError> {
        let bid = self.bid_order.take();
        let ask = self.ask_order.take();
        Self::cancel_if_present(engine, bid)?;
        Self::cancel_if_present(engine, ask)?;
        Ok(())
    }

    fn cancel_if_present(
        engine: &mut MatchingEngine,
        order_id: Option<OrderId>,
    ) -> Result<(), OrderError> {
        if let Some(id) = order_id {
            if engine.order_book().order(id).is_some() {
                engine.cancel_order(id)?;
            }
        }
        Ok(())
    }

    fn adjusted_price(
        &self,
        engine: &MatchingEngine,
        side: Side,
        target_price: Price,
    ) -> Option<Price> {
        let book = engine.order_book();
        match side {
            Side::Bid => {
                if let Some((best_ask, _)) = book.best_ask() {
                    if best_ask == 0 {
                        return None;
                    }
                    let max_price = best_ask.checked_sub(1)?;
                    Some(target_price.min(max_price))
                } else {
                    Some(target_price)
                }
            }
            Side::Ask => {
                if let Some((best_bid, _)) = book.best_bid() {
                    if best_bid == u64::MAX {
                        return None;
                    }
                    let min_price = best_bid.checked_add(1)?;
                    Some(target_price.max(min_price))
                } else {
                    Some(target_price)
                }
            }
        }
    }

    #[inline]
    fn bid_price(&self) -> Price {
        self.mid_price.saturating_sub(self.spread)
    }

    #[inline]
    fn ask_price(&self) -> Price {
        self.mid_price.saturating_add(self.spread)
    }

    fn next_id(&mut self) -> OrderId {
        let id = self.next_order_id;
        self.next_order_id = self.next_order_id.wrapping_add(1);
        id
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use orderbook::OrderBook;

    fn engine_with_liquidity() -> MatchingEngine {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 105, 10).unwrap();
        book.add_order(2, Side::Bid, 95, 8).unwrap();
        MatchingEngine::with_book(book)
    }

    #[test]
    fn refresh_quotes_places_orders() {
        let mut engine = engine_with_liquidity();
        let mut maker = MarketMaker::new(100, 2, 5, 10).unwrap();

        maker.refresh_quotes(&mut engine).unwrap();

        let book = engine.order_book();
        assert_eq!(book.total_orders(), 4);
        assert_eq!(book.best_bid().unwrap().0, 98);
        assert_eq!(book.best_ask().unwrap().0, 102);
    }

    #[test]
    fn refresh_quotes_respects_crossing_prices() {
        let mut engine = MatchingEngine::new();
        engine
            .order_book_mut()
            .add_order(1, Side::Ask, 100, 5)
            .unwrap();
        let mut maker = MarketMaker::new(100, 0, 5, 20).unwrap();

        maker.refresh_quotes(&mut engine).unwrap();

        let book = engine.order_book();
        assert_eq!(book.best_bid().unwrap().0, 99);
        assert_eq!(book.best_ask().unwrap().0, 100);
    }

    #[test]
    fn refresh_quotes_replaces_existing_orders() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 200, 5).unwrap();
        book.add_order(2, Side::Bid, 50, 5).unwrap();
        let mut engine = MatchingEngine::with_book(book);
        let mut maker = MarketMaker::new(100, 1, 5, 30).unwrap();

        maker.refresh_quotes(&mut engine).unwrap();
        maker.set_mid_price(110);
        maker.refresh_quotes(&mut engine).unwrap();

        let book = engine.order_book();
        assert_eq!(book.total_orders(), 4);
        assert_eq!(book.best_bid().unwrap().0, 109);
        assert_eq!(book.best_ask().unwrap().0, 111);
    }
}
