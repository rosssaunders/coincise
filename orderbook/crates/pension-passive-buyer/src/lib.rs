use orderbook::{MatchingEngine, OrderError, OrderId, Price, Quantity, Side};

pub struct PassiveBuyer {
    target_price: Price,
    quantity: Quantity,
    next_order_id: OrderId,
    resting_order: Option<OrderId>,
}

impl PassiveBuyer {
    pub fn new(
        target_price: Price,
        quantity: Quantity,
        starting_order_id: OrderId,
    ) -> Result<Self, OrderError> {
        if quantity == 0 {
            return Err(OrderError::InvalidQuantity);
        }

        Ok(Self {
            target_price,
            quantity,
            next_order_id: starting_order_id,
            resting_order: None,
        })
    }

    pub fn ensure_order(&mut self, engine: &mut MatchingEngine) -> Result<bool, OrderError> {
        if let Some(id) = self.resting_order {
            if engine.order_book().order(id).is_some() {
                return Ok(false);
            }
        }

        let price = match self.price_below_best_ask(engine) {
            Some(price) => price,
            None => {
                self.resting_order = None;
                return Ok(false);
            }
        };

        let result = engine.submit_post_only(self.next_id(), Side::Bid, price, self.quantity)?;
        self.resting_order = result.resting.map(|order| order.id);
        Ok(self.resting_order.is_some())
    }

    pub fn update_target_price(
        &mut self,
        target_price: Price,
        engine: &mut MatchingEngine,
    ) -> Result<(), OrderError> {
        self.target_price = target_price;
        self.cancel(engine)?;
        self.ensure_order(engine).map(|_| ())
    }

    pub fn cancel(&mut self, engine: &mut MatchingEngine) -> Result<(), OrderError> {
        if let Some(id) = self.resting_order.take() {
            if engine.order_book().order(id).is_some() {
                engine.cancel_order(id)?;
            }
        }
        Ok(())
    }

    #[inline]
    pub fn resting_order(&self) -> Option<OrderId> {
        self.resting_order
    }

    fn price_below_best_ask(&self, engine: &MatchingEngine) -> Option<Price> {
        let book = engine.order_book();
        match book.best_ask() {
            Some((best_ask, _)) => {
                if best_ask == 0 {
                    return None;
                }
                let max_price = best_ask.checked_sub(1)?;
                Some(self.target_price.min(max_price))
            }
            None => Some(self.target_price),
        }
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

    #[test]
    fn ensure_order_places_resting_bid() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 105, 5).unwrap();
        let mut engine = MatchingEngine::with_book(book);
        let mut buyer = PassiveBuyer::new(100, 5, 10).unwrap();

        assert!(buyer.ensure_order(&mut engine).unwrap());
        let resting = engine
            .order_book()
            .order(buyer.resting_order().unwrap())
            .unwrap();
        assert_eq!(resting.price, 100);
        assert_eq!(resting.quantity, 5);
    }

    #[test]
    fn update_target_price_requotes() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 110, 5).unwrap();
        let mut engine = MatchingEngine::with_book(book);
        let mut buyer = PassiveBuyer::new(100, 5, 20).unwrap();

        buyer.ensure_order(&mut engine).unwrap();
        buyer.update_target_price(108, &mut engine).unwrap();

        let resting = engine
            .order_book()
            .order(buyer.resting_order().unwrap())
            .unwrap();
        assert_eq!(resting.price, 108);
    }

    #[test]
    fn does_not_place_when_best_ask_zero() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 0, 5).unwrap();
        let mut engine = MatchingEngine::with_book(book);
        let mut buyer = PassiveBuyer::new(10, 5, 30).unwrap();

        assert!(!buyer.ensure_order(&mut engine).unwrap());
        assert!(buyer.resting_order().is_none());
    }
}
