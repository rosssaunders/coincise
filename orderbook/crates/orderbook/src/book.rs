use crate::error::OrderError;
use crate::types::{BookSnapshot, LevelSnapshot, OrderId, OrderView, Price, Quantity, Side};
use rustc_hash::FxHashMap;
use slab::Slab;
use std::collections::BTreeMap;

#[derive(Default, Debug, Clone)]
struct PriceLevel {
    head: Option<usize>,
    tail: Option<usize>,
    total_quantity: Quantity,
}

impl PriceLevel {
    #[inline]
    fn is_empty(&self) -> bool {
        self.head.is_none()
    }
}

#[derive(Debug)]
struct OrderNode {
    id: OrderId,
    side: Side,
    price: Price,
    quantity: Quantity,
    prev: Option<usize>,
    next: Option<usize>,
}

#[derive(Debug, Default)]
pub struct OrderBook {
    bids: BTreeMap<Price, PriceLevel>,
    asks: BTreeMap<Price, PriceLevel>,
    order_index: FxHashMap<OrderId, usize>,
    nodes: Slab<OrderNode>,
    total_bid_quantity: Quantity,
    total_ask_quantity: Quantity,
}

impl OrderBook {
    #[inline]
    pub fn new() -> Self {
        Self::default()
    }

    #[inline]
    pub fn total_orders(&self) -> usize {
        self.order_index.len()
    }

    #[inline]
    pub fn order(&self, order_id: OrderId) -> Option<OrderView> {
        let &idx = self.order_index.get(&order_id)?;
        self.nodes.get(idx).map(|node| OrderView {
            id: node.id,
            side: node.side,
            price: node.price,
            quantity: node.quantity,
        })
    }

    #[inline]
    pub fn best_bid(&self) -> Option<(Price, Quantity)> {
        self.bids
            .iter()
            .next_back()
            .map(|(&price, level)| (price, level.total_quantity))
    }

    #[inline]
    pub fn best_ask(&self) -> Option<(Price, Quantity)> {
        self.asks
            .iter()
            .next()
            .map(|(&price, level)| (price, level.total_quantity))
    }

    pub fn best_order(&self, side: Side) -> Option<OrderView> {
        let head_idx = match side {
            Side::Bid => {
                let (_, level) = self.bids.iter().next_back()?;
                level.head?
            }
            Side::Ask => {
                let (_, level) = self.asks.iter().next()?;
                level.head?
            }
        };
        let node = self.nodes.get(head_idx)?;
        Some(OrderView {
            id: node.id,
            side: node.side,
            price: node.price,
            quantity: node.quantity,
        })
    }

    #[inline]
    pub fn total_quantity(&self, side: Side) -> Quantity {
        match side {
            Side::Bid => self.total_bid_quantity,
            Side::Ask => self.total_ask_quantity,
        }
    }

    pub fn available_quantity(&self, side: Side, price_limit: Option<Price>) -> Quantity {
        let mut total: Quantity = 0;
        match side {
            Side::Bid => {
                for (&price, level) in &self.asks {
                    if let Some(limit) = price_limit {
                        if price > limit {
                            break;
                        }
                    }
                    total = total.saturating_add(level.total_quantity);
                }
            }
            Side::Ask => {
                for (&price, level) in self.bids.iter().rev() {
                    if let Some(limit) = price_limit {
                        if price < limit {
                            break;
                        }
                    }
                    total = total.saturating_add(level.total_quantity);
                }
            }
        }
        total
    }

    pub fn market_order_cost(&self, side: Side, quantity: Quantity) -> (u128, Quantity) {
        let mut remaining = quantity;
        let mut cost: u128 = 0;
        let mut filled: Quantity = 0;

        match side {
            Side::Bid => {
                for (&price, level) in &self.asks {
                    if remaining == 0 {
                        break;
                    }
                    let trade = remaining.min(level.total_quantity);
                    cost = cost.saturating_add(u128::from(price) * u128::from(trade));
                    remaining -= trade;
                    filled = filled.saturating_add(trade);
                }
            }
            Side::Ask => {
                for (&price, level) in self.bids.iter().rev() {
                    if remaining == 0 {
                        break;
                    }
                    let trade = remaining.min(level.total_quantity);
                    cost = cost.saturating_add(u128::from(price) * u128::from(trade));
                    remaining -= trade;
                    filled = filled.saturating_add(trade);
                }
            }
        }

        (cost, filled)
    }

    #[inline]
    pub fn level_total_quantity(&self, side: Side, price: Price) -> Option<Quantity> {
        self.book_for_side(side)
            .get(&price)
            .map(|level| level.total_quantity)
    }

    pub fn level_orders(&self, side: Side, price: Price) -> Option<Vec<OrderView>> {
        let level = self.book_for_side(side).get(&price)?;
        Some(self.collect_level_orders(level))
    }

    pub fn snapshot(&self) -> BookSnapshot {
        let bids = self
            .bids
            .iter()
            .rev()
            .map(|(&price, level)| LevelSnapshot {
                price,
                total_quantity: level.total_quantity,
                orders: self.collect_level_orders(level),
            })
            .collect();

        let asks = self
            .asks
            .iter()
            .map(|(&price, level)| LevelSnapshot {
                price,
                total_quantity: level.total_quantity,
                orders: self.collect_level_orders(level),
            })
            .collect();

        BookSnapshot { bids, asks }
    }

    pub fn add_order(
        &mut self,
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
    ) -> Result<(), OrderError> {
        if quantity == 0 {
            return Err(OrderError::InvalidQuantity);
        }
        if self.order_index.contains_key(&order_id) {
            return Err(OrderError::DuplicateOrder);
        }
        if self.is_crossed(side, price) {
            return Err(OrderError::CrossedOrder);
        }

        self.insert_resting_order(order_id, side, price, quantity);
        self.bump_total(side, quantity);
        Ok(())
    }

    pub fn cancel(&mut self, order_id: OrderId) -> Result<Quantity, OrderError> {
        let &node_idx = self
            .order_index
            .get(&order_id)
            .ok_or(OrderError::UnknownOrder)?;
        let (side, price, quantity) = {
            let node = &self.nodes[node_idx];
            (node.side, node.price, node.quantity)
        };

        if let Some(level) = self.book_for_side_mut(side).get_mut(&price) {
            level.total_quantity = level.total_quantity.saturating_sub(quantity);
        }
        self.decrement_total(side, quantity);

        self.unlink_node(side, price, node_idx);
        self.cleanup_level(side, price);

        Ok(quantity)
    }

    pub fn update_order_quantity(
        &mut self,
        order_id: OrderId,
        new_quantity: Quantity,
    ) -> Result<(), OrderError> {
        if new_quantity == 0 {
            return Err(OrderError::InvalidQuantity);
        }
        let &node_idx = self
            .order_index
            .get(&order_id)
            .ok_or(OrderError::UnknownOrder)?;

        let (side, price, old_quantity) = {
            let node = &self.nodes[node_idx];
            (node.side, node.price, node.quantity)
        };

        if let Some(level) = self.book_for_side_mut(side).get_mut(&price) {
            if new_quantity > old_quantity {
                let delta = new_quantity - old_quantity;
                level.total_quantity += delta;
                self.bump_total(side, delta);
            } else if old_quantity > new_quantity {
                let delta = old_quantity - new_quantity;
                level.total_quantity = level.total_quantity.saturating_sub(delta);
                self.decrement_total(side, delta);
            }
        }

        if let Some(node) = self.nodes.get_mut(node_idx) {
            node.quantity = new_quantity;
        }

        Ok(())
    }

    fn insert_resting_order(
        &mut self,
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
    ) {
        let tail = self
            .book_for_side(side)
            .get(&price)
            .and_then(|level| level.tail);

        let node_idx = self.nodes.insert(OrderNode {
            id: order_id,
            side,
            price,
            quantity,
            prev: tail,
            next: None,
        });

        if let Some(tail_idx) = tail {
            if let Some(node) = self.nodes.get_mut(tail_idx) {
                node.next = Some(node_idx);
            }
        }

        let level = self
            .book_for_side_mut(side)
            .entry(price)
            .or_insert_with(PriceLevel::default);

        if level.head.is_none() {
            level.head = Some(node_idx);
        }
        level.tail = Some(node_idx);
        level.total_quantity += quantity;

        self.order_index.insert(order_id, node_idx);
    }

    fn unlink_node(&mut self, side: Side, price: Price, node_idx: usize) {
        let (prev, next, order_id) = {
            let node = &self.nodes[node_idx];
            (node.prev, node.next, node.id)
        };

        if let Some(level) = self.book_for_side_mut(side).get_mut(&price) {
            if level.head == Some(node_idx) {
                level.head = next;
            }
            if level.tail == Some(node_idx) {
                level.tail = prev;
            }
        }

        if let Some(prev_idx) = prev {
            if let Some(node) = self.nodes.get_mut(prev_idx) {
                node.next = next;
            }
        }

        if let Some(next_idx) = next {
            if let Some(node) = self.nodes.get_mut(next_idx) {
                node.prev = prev;
            }
        }

        self.order_index.remove(&order_id);
        self.nodes.remove(node_idx);
    }

    fn cleanup_level(&mut self, side: Side, price: Price) {
        if self.is_level_empty(side, price) {
            self.remove_level(side, price);
        }
    }

    #[inline]
    fn bump_total(&mut self, side: Side, qty: Quantity) {
        match side {
            Side::Bid => self.total_bid_quantity += qty,
            Side::Ask => self.total_ask_quantity += qty,
        }
    }

    #[inline]
    fn decrement_total(&mut self, side: Side, qty: Quantity) {
        match side {
            Side::Bid => self.total_bid_quantity = self.total_bid_quantity.saturating_sub(qty),
            Side::Ask => self.total_ask_quantity = self.total_ask_quantity.saturating_sub(qty),
        }
    }

    fn book_for_side_mut(&mut self, side: Side) -> &mut BTreeMap<Price, PriceLevel> {
        match side {
            Side::Bid => &mut self.bids,
            Side::Ask => &mut self.asks,
        }
    }

    fn book_for_side(&self, side: Side) -> &BTreeMap<Price, PriceLevel> {
        match side {
            Side::Bid => &self.bids,
            Side::Ask => &self.asks,
        }
    }

    fn collect_level_orders(&self, level: &PriceLevel) -> Vec<OrderView> {
        let mut orders = Vec::new();
        let mut cursor = level.head;
        while let Some(idx) = cursor {
            if let Some(node) = self.nodes.get(idx) {
                orders.push(OrderView {
                    id: node.id,
                    side: node.side,
                    price: node.price,
                    quantity: node.quantity,
                });
                cursor = node.next;
            } else {
                break;
            }
        }
        orders
    }

    fn is_level_empty(&self, side: Side, price: Price) -> bool {
        self.book_for_side(side)
            .get(&price)
            .map_or(true, PriceLevel::is_empty)
    }

    fn remove_level(&mut self, side: Side, price: Price) {
        self.book_for_side_mut(side).remove(&price);
    }

    fn is_crossed(&self, side: Side, price: Price) -> bool {
        match side {
            Side::Bid => self
                .best_ask()
                .map(|(best_ask, _)| price >= best_ask)
                .unwrap_or(false),
            Side::Ask => self
                .best_bid()
                .map(|(best_bid, _)| price <= best_bid)
                .unwrap_or(false),
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn setup_book() -> OrderBook {
        OrderBook::new()
    }

    #[test]
    fn insert_and_best_prices() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 10).unwrap();
        book.add_order(2, Side::Bid, 101, 20).unwrap();
        book.add_order(3, Side::Ask, 105, 15).unwrap();
        book.add_order(4, Side::Ask, 104, 5).unwrap();

        assert_eq!(book.best_bid(), Some((101, 20)));
        assert_eq!(book.best_ask(), Some((104, 5)));
        assert_eq!(book.total_orders(), 4);
        assert_eq!(book.total_quantity(Side::Bid), 30);
        assert_eq!(book.total_quantity(Side::Ask), 20);
    }

    #[test]
    fn crossed_bid_rejected() {
        let mut book = setup_book();
        book.add_order(1, Side::Ask, 101, 5).unwrap();
        let err = book.add_order(2, Side::Bid, 101, 5).unwrap_err();
        assert_eq!(err, OrderError::CrossedOrder);
    }

    #[test]
    fn crossed_ask_rejected() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 5).unwrap();
        let err = book.add_order(2, Side::Ask, 100, 7).unwrap_err();
        assert_eq!(err, OrderError::CrossedOrder);
    }

    #[test]
    fn cancel_order_removes_level_when_empty() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 10).unwrap();
        book.add_order(2, Side::Bid, 100, 5).unwrap();
        book.add_order(3, Side::Bid, 99, 7).unwrap();

        let canceled = book.cancel(1).unwrap();
        assert_eq!(canceled, 10);
        assert_eq!(book.best_bid(), Some((100, 5)));
        assert_eq!(book.total_quantity(Side::Bid), 12);

        book.cancel(2).unwrap();
        assert_eq!(book.best_bid(), Some((99, 7)));
        book.cancel(3).unwrap();
        assert_eq!(book.best_bid(), None);
        assert_eq!(book.total_orders(), 0);
        assert_eq!(book.total_quantity(Side::Bid), 0);
    }

    #[test]
    fn duplicate_and_zero_quantity_rejected() {
        let mut book = setup_book();
        assert_eq!(
            book.add_order(1, Side::Bid, 100, 0),
            Err(OrderError::InvalidQuantity)
        );
        book.add_order(1, Side::Bid, 100, 10).unwrap();
        assert_eq!(
            book.add_order(1, Side::Ask, 101, 5),
            Err(OrderError::DuplicateOrder)
        );
    }

    #[test]
    fn order_view_and_level_orders() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 10).unwrap();
        book.add_order(2, Side::Bid, 100, 5).unwrap();
        book.add_order(3, Side::Bid, 101, 7).unwrap();

        let order = book.order(2).unwrap();
        assert_eq!(
            order,
            OrderView {
                id: 2,
                side: Side::Bid,
                price: 100,
                quantity: 5
            }
        );

        let level_orders = book.level_orders(Side::Bid, 100).unwrap();
        assert_eq!(level_orders.len(), 2);
        assert_eq!(level_orders[0].id, 1);
        assert_eq!(level_orders[1].id, 2);
        assert_eq!(level_orders[0].quantity, 10);
        assert_eq!(level_orders[1].quantity, 5);

        assert!(book.level_orders(Side::Ask, 200).is_none());
    }

    #[test]
    fn update_order_increases_and_decreases_quantity() {
        let mut book = setup_book();
        book.add_order(1, Side::Ask, 101, 5).unwrap();
        book.add_order(2, Side::Ask, 101, 7).unwrap();

        book.update_order_quantity(1, 8).unwrap();
        assert_eq!(book.level_total_quantity(Side::Ask, 101), Some(15));
        assert_eq!(book.total_quantity(Side::Ask), 15);

        book.update_order_quantity(2, 4).unwrap();
        assert_eq!(book.level_total_quantity(Side::Ask, 101), Some(12));
        assert_eq!(book.total_quantity(Side::Ask), 12);
    }

    #[test]
    fn update_order_rejects_zero_or_unknown() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 5).unwrap();

        assert_eq!(
            book.update_order_quantity(1, 0),
            Err(OrderError::InvalidQuantity)
        );
        assert_eq!(
            book.update_order_quantity(99, 3),
            Err(OrderError::UnknownOrder)
        );
        // ensure the existing order was not modified when an error occurs
        let order = book.order(1).unwrap();
        assert_eq!(order.quantity, 5);
    }

    #[test]
    fn snapshot_returns_full_book() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 5).unwrap();
        book.add_order(2, Side::Bid, 99, 7).unwrap();
        book.add_order(3, Side::Ask, 104, 6).unwrap();
        book.add_order(4, Side::Ask, 105, 4).unwrap();

        let snapshot = book.snapshot();
        assert_eq!(snapshot.bids.len(), 2);
        assert_eq!(snapshot.bids[0].price, 100);
        assert_eq!(snapshot.bids[0].total_quantity, 5);
        assert_eq!(snapshot.bids[0].orders.len(), 1);
        assert_eq!(snapshot.bids[0].orders[0].id, 1);
        assert_eq!(snapshot.bids[1].price, 99);
        assert_eq!(snapshot.bids[1].orders[0].id, 2);

        assert_eq!(snapshot.asks.len(), 2);
        assert_eq!(snapshot.asks[0].price, 104);
        assert_eq!(snapshot.asks[0].total_quantity, 6);
        assert_eq!(snapshot.asks[1].price, 105);
        assert_eq!(snapshot.asks[1].orders[0].id, 4);
    }

    #[test]
    fn best_order_returns_head_order() {
        let mut book = setup_book();
        book.add_order(1, Side::Bid, 100, 5).unwrap();
        book.add_order(2, Side::Bid, 100, 7).unwrap();
        book.add_order(3, Side::Bid, 101, 4).unwrap();
        book.add_order(4, Side::Ask, 105, 6).unwrap();
        book.add_order(5, Side::Ask, 104, 3).unwrap();

        let best_bid = book.best_order(Side::Bid).unwrap();
        assert_eq!(
            best_bid,
            OrderView {
                id: 3,
                side: Side::Bid,
                price: 101,
                quantity: 4,
            }
        );

        let best_ask = book.best_order(Side::Ask).unwrap();
        assert_eq!(
            best_ask,
            OrderView {
                id: 5,
                side: Side::Ask,
                price: 104,
                quantity: 3,
            }
        );
    }

    #[test]
    fn cancel_unknown_order_errors() {
        let mut book = setup_book();
        assert_eq!(book.cancel(42), Err(OrderError::UnknownOrder));
    }

    #[test]
    fn market_order_cost_for_bid_side_accumulates_levels() {
        let mut book = setup_book();
        book.add_order(1, Side::Ask, 100, 3).unwrap();
        book.add_order(2, Side::Ask, 101, 4).unwrap();

        let (cost, filled) = book.market_order_cost(Side::Bid, 5);
        assert_eq!(filled, 5);
        assert_eq!(cost, 3 * 100 + 2 * 101);
    }

    #[test]
    fn market_order_cost_for_ask_side_uses_best_bids_first() {
        let mut book = setup_book();
        book.add_order(10, Side::Bid, 100, 3).unwrap();
        book.add_order(11, Side::Bid, 99, 2).unwrap();

        let (cost, filled) = book.market_order_cost(Side::Ask, 4);
        assert_eq!(filled, 4);
        assert_eq!(cost, 3 * 100 + 1 * 99);
    }

    #[test]
    fn available_quantity_respects_side_and_limit() {
        let mut book = setup_book();
        book.add_order(1, Side::Ask, 101, 5).unwrap();
        book.add_order(2, Side::Ask, 102, 7).unwrap();
        book.add_order(3, Side::Ask, 105, 4).unwrap();
        book.add_order(4, Side::Bid, 100, 6).unwrap();
        book.add_order(5, Side::Bid, 99, 3).unwrap();
        book.add_order(6, Side::Bid, 97, 8).unwrap();

        assert_eq!(book.available_quantity(Side::Bid, None), 16);
        assert_eq!(book.available_quantity(Side::Bid, Some(101)), 5);
        assert_eq!(book.available_quantity(Side::Bid, Some(102)), 12);

        assert_eq!(book.available_quantity(Side::Ask, None), 17);
        assert_eq!(book.available_quantity(Side::Ask, Some(99)), 9);
        assert_eq!(book.available_quantity(Side::Ask, Some(98)), 9);
    }
}
