use orderbook::{
    MatchResult, MatchingEngine, OrderError, OrderId, OrderType, Price, Quantity, Side,
};

#[derive(Debug)]
pub struct TwapExecutor {
    side: Side,
    order_type: OrderType,
    price: Option<Price>,
    slice_quantity: Quantity,
    remaining_quantity: Quantity,
    next_order_id: OrderId,
}

impl TwapExecutor {
    pub fn new(
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        total_quantity: Quantity,
        slices: u32,
        starting_order_id: OrderId,
    ) -> Result<Self, OrderError> {
        if total_quantity == 0 {
            return Err(OrderError::InvalidQuantity);
        }
        if order_type != OrderType::Market && price.is_none() {
            return Err(OrderError::MissingPrice);
        }

        let slice_count = if slices == 0 { 1 } else { slices as Quantity };
        let adjusted_total = total_quantity.saturating_add(slice_count - 1);
        let slice_quantity = adjusted_total / slice_count;

        Ok(Self {
            side,
            order_type,
            price,
            slice_quantity,
            remaining_quantity: total_quantity,
            next_order_id: starting_order_id,
        })
    }

    pub fn execute_step(
        &mut self,
        engine: &mut MatchingEngine,
    ) -> Result<Option<MatchResult>, OrderError> {
        if self.remaining_quantity == 0 {
            return Ok(None);
        }

        let quantity = self.slice_quantity.min(self.remaining_quantity);
        self.remaining_quantity -= quantity;
        let result = engine.submit(
            self.next_id(),
            self.side,
            self.order_type,
            self.price,
            quantity,
        )?;
        Ok(Some(result))
    }

    #[inline]
    pub fn is_complete(&self) -> bool {
        self.remaining_quantity == 0
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
    fn new_requires_price_for_limit_like_orders() {
        let err = TwapExecutor::new(Side::Bid, OrderType::Limit, None, 10, 3, 1).unwrap_err();
        assert_eq!(err, OrderError::MissingPrice);
    }

    #[test]
    fn executes_in_slices_until_complete() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 100, 50).unwrap();
        let mut engine = MatchingEngine::with_book(book);
        let mut twap =
            TwapExecutor::new(Side::Bid, OrderType::Limit, Some(100), 10, 3, 10).unwrap();

        let mut total_filled = 0;
        while !twap.is_complete() {
            let result = twap.execute_step(&mut engine).unwrap().unwrap();
            total_filled += result
                .fills
                .iter()
                .map(|fill| fill.quantity)
                .sum::<Quantity>();
        }

        assert_eq!(total_filled, 10);
        assert!(twap.is_complete());
    }

    #[test]
    fn handles_market_orders_without_price() {
        let mut book = OrderBook::new();
        book.add_order(1, Side::Ask, 50, 10).unwrap();
        book.add_order(2, Side::Ask, 55, 10).unwrap();
        let mut engine = MatchingEngine::with_book(book);
        let mut twap = TwapExecutor::new(Side::Bid, OrderType::Market, None, 12, 4, 20).unwrap();

        let mut total_unfilled = 0;
        while let Some(result) = twap.execute_step(&mut engine).unwrap() {
            total_unfilled += result.unfilled;
        }

        assert!(twap.is_complete());
        assert_eq!(total_unfilled, 0);
    }
}
