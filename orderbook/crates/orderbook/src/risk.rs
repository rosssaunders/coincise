use crate::book::OrderBook;
use crate::error::OrderError;
use crate::events::EventBroadcaster;
use crate::matching::MatchingEngine;
use crate::types::{AccountId, MatchResult, OrderId, OrderType, OrderView, Price, Quantity, Side};
use rustc_hash::FxHashMap;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct AccountSnapshot {
    pub available_base: u128,
    pub reserved_base: u128,
    pub available_quote: u128,
    pub reserved_quote: u128,
}

#[derive(Debug, PartialEq, Eq)]
pub enum BalanceError {
    UnknownAccount,
    InsufficientBase,
    InsufficientQuote,
    UnknownOrder,
    AccountMismatch,
    ArithmeticOverflow,
    InvariantViolation(&'static str),
}

#[derive(Debug, PartialEq, Eq)]
pub enum GatewayError {
    Balance(BalanceError),
    Order(OrderError),
}

impl From<OrderError> for GatewayError {
    fn from(error: OrderError) -> Self {
        GatewayError::Order(error)
    }
}

impl From<BalanceError> for GatewayError {
    fn from(error: BalanceError) -> Self {
        GatewayError::Balance(error)
    }
}

#[derive(Default, Clone)]
struct AccountState {
    available_base: u128,
    reserved_base: u128,
    available_quote: u128,
    reserved_quote: u128,
}

#[derive(Clone, Debug)]
struct Reservation {
    order_id: OrderId,
    account_id: AccountId,
    side: Side,
    price: Price,
    quantity: Quantity,
}

#[derive(Clone, Debug)]
struct NewOrderPlan {
    account_id: AccountId,
    order_id: OrderId,
    side: Side,
    price: Option<Price>,
    reserved_base: u128,
    reserved_quote: u128,
}

#[derive(Clone, Debug)]
struct ModifyPlan {
    account_id: AccountId,
    order_id: OrderId,
    side: Side,
    price: Price,
    current_quantity: Quantity,
    new_quantity: Quantity,
    additional_base: u128,
    additional_quote: u128,
    release_base: u128,
    release_quote: u128,
}

impl Default for ModifyPlan {
    fn default() -> Self {
        Self {
            account_id: 0,
            order_id: 0,
            side: Side::Bid,
            price: 0,
            current_quantity: 0,
            new_quantity: 0,
            additional_base: 0,
            additional_quote: 0,
            release_base: 0,
            release_quote: 0,
        }
    }
}

#[derive(Default)]
struct BalanceManager {
    accounts: FxHashMap<AccountId, AccountState>,
    reservations: FxHashMap<OrderId, Reservation>,
}

impl BalanceManager {
    fn credit_account(
        &mut self,
        account_id: AccountId,
        base: Quantity,
        quote: Quantity,
    ) -> Result<(), BalanceError> {
        let state = self.accounts.entry(account_id).or_default();
        state.available_base = state
            .available_base
            .checked_add(u128::from(base))
            .ok_or(BalanceError::ArithmeticOverflow)?;
        state.available_quote = state
            .available_quote
            .checked_add(u128::from(quote))
            .ok_or(BalanceError::ArithmeticOverflow)?;
        Ok(())
    }

    fn snapshot(&self, account_id: AccountId) -> Option<AccountSnapshot> {
        self.accounts.get(&account_id).map(|state| AccountSnapshot {
            available_base: state.available_base,
            reserved_base: state.reserved_base,
            available_quote: state.available_quote,
            reserved_quote: state.reserved_quote,
        })
    }

    fn prepare_new_order(
        &self,
        account_id: AccountId,
        order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        quantity: Quantity,
        book: &OrderBook,
    ) -> Result<NewOrderPlan, BalanceError> {
        let state = self
            .accounts
            .get(&account_id)
            .ok_or(BalanceError::UnknownAccount)?;
        let mut reserved_base: u128 = 0;
        let mut reserved_quote: u128 = 0;

        match side {
            Side::Bid => {
                reserved_quote = match order_type {
                    OrderType::Market => book.market_order_cost(Side::Bid, quantity).0,
                    _ => {
                        let price =
                            price.ok_or(BalanceError::InvariantViolation("missing price"))?;
                        u128::from(price) * u128::from(quantity)
                    }
                };
            }
            Side::Ask => {
                reserved_base = u128::from(quantity);
            }
        }

        if state.available_base < reserved_base {
            return Err(BalanceError::InsufficientBase);
        }
        if state.available_quote < reserved_quote {
            return Err(BalanceError::InsufficientQuote);
        }

        Ok(NewOrderPlan {
            account_id,
            order_id,
            side,
            price,
            reserved_base,
            reserved_quote,
        })
    }

    fn apply_new_order(&mut self, plan: &NewOrderPlan) {
        let state = self
            .accounts
            .get_mut(&plan.account_id)
            .expect("account must exist during reservation");
        state.available_base -= plan.reserved_base;
        state.reserved_base += plan.reserved_base;
        state.available_quote -= plan.reserved_quote;
        state.reserved_quote += plan.reserved_quote;
    }

    fn rollback_new_order(&mut self, plan: &NewOrderPlan) {
        let state = self
            .accounts
            .get_mut(&plan.account_id)
            .expect("account must exist during rollback");
        state.available_base += plan.reserved_base;
        state.reserved_base -= plan.reserved_base;
        state.available_quote += plan.reserved_quote;
        state.reserved_quote -= plan.reserved_quote;
    }

    fn settle_new_order(
        &mut self,
        plan: NewOrderPlan,
        result: &MatchResult,
    ) -> Result<(), BalanceError> {
        let mut spent_quote: u128 = 0;
        let mut earned_quote: u128 = 0;
        let mut acquired_base: u128 = 0;
        let mut sold_base: u128 = 0;

        let mut completed_makers = Vec::new();
        for fill in &result.fills {
            match plan.side {
                Side::Bid => {
                    spent_quote = spent_quote
                        .checked_add(u128::from(fill.price) * u128::from(fill.quantity))
                        .ok_or(BalanceError::ArithmeticOverflow)?;
                    acquired_base = acquired_base
                        .checked_add(u128::from(fill.quantity))
                        .ok_or(BalanceError::ArithmeticOverflow)?;
                }
                Side::Ask => {
                    sold_base = sold_base
                        .checked_add(u128::from(fill.quantity))
                        .ok_or(BalanceError::ArithmeticOverflow)?;
                    earned_quote = earned_quote
                        .checked_add(u128::from(fill.price) * u128::from(fill.quantity))
                        .ok_or(BalanceError::ArithmeticOverflow)?;
                }
            }

            let (maker_account_id, maker_side) = self
                .reservations
                .get(&fill.maker_id)
                .map(|reservation| (reservation.account_id, reservation.side))
                .ok_or(BalanceError::InvariantViolation(
                    "maker reservation missing",
                ))?;
            {
                let maker_state = self
                    .accounts
                    .get_mut(&maker_account_id)
                    .ok_or(BalanceError::UnknownAccount)?;
                match maker_side {
                    Side::Bid => {
                        let cost = u128::from(fill.price) * u128::from(fill.quantity);
                        maker_state.reserved_quote =
                            maker_state
                                .reserved_quote
                                .checked_sub(cost)
                                .ok_or(BalanceError::InvariantViolation("maker quote underflow"))?;
                        maker_state.available_base = maker_state
                            .available_base
                            .checked_add(u128::from(fill.quantity))
                            .ok_or(BalanceError::ArithmeticOverflow)?;
                    }
                    Side::Ask => {
                        let quantity = u128::from(fill.quantity);
                        maker_state.reserved_base = maker_state
                            .reserved_base
                            .checked_sub(quantity)
                            .ok_or(BalanceError::InvariantViolation("maker base underflow"))?;
                        maker_state.available_base = maker_state
                            .available_base
                            .checked_add(quantity)
                            .ok_or(BalanceError::ArithmeticOverflow)?;
                        let earned = u128::from(fill.price) * quantity;
                        maker_state.available_quote = maker_state
                            .available_quote
                            .checked_add(earned)
                            .ok_or(BalanceError::ArithmeticOverflow)?;
                    }
                }
            }
            let maker_reservation = self.reservations.get_mut(&fill.maker_id).ok_or(
                BalanceError::InvariantViolation("maker reservation missing"),
            )?;
            maker_reservation.quantity = maker_reservation
                .quantity
                .checked_sub(fill.quantity)
                .ok_or(BalanceError::InvariantViolation(
                    "maker reservation quantity underflow",
                ))?;
            if maker_reservation.quantity == 0 {
                completed_makers.push(fill.maker_id);
            }
        }

        for maker_id in completed_makers {
            self.reservations.remove(&maker_id);
        }

        if spent_quote > plan.reserved_quote {
            return Err(BalanceError::InvariantViolation(
                "spent quote exceeds reservation",
            ));
        }
        if sold_base > plan.reserved_base {
            return Err(BalanceError::InvariantViolation(
                "sold base exceeds reservation",
            ));
        }

        let (required_quote, required_base) = match result.resting.as_ref() {
            Some(order) if order.side == Side::Bid => {
                (u128::from(order.price) * u128::from(order.quantity), 0)
            }
            Some(order) => (0, u128::from(order.quantity)),
            None => (0, 0),
        };

        let total_quote_consumed = spent_quote
            .checked_add(required_quote)
            .ok_or(BalanceError::ArithmeticOverflow)?;
        if total_quote_consumed > plan.reserved_quote {
            return Err(BalanceError::InvariantViolation(
                "spent quote exceeds reservation",
            ));
        }
        let total_base_consumed = sold_base
            .checked_add(required_base)
            .ok_or(BalanceError::ArithmeticOverflow)?;
        if total_base_consumed > plan.reserved_base {
            return Err(BalanceError::InvariantViolation(
                "sold base exceeds reservation",
            ));
        }

        let release_quote = plan
            .reserved_quote
            .checked_sub(total_quote_consumed)
            .ok_or(BalanceError::InvariantViolation("quote release underflow"))?;
        let release_base = plan
            .reserved_base
            .checked_sub(required_base)
            .ok_or(BalanceError::InvariantViolation("base release underflow"))?;

        let state = self
            .accounts
            .get_mut(&plan.account_id)
            .ok_or(BalanceError::UnknownAccount)?;

        if plan.reserved_quote > 0 {
            state.reserved_quote = state
                .reserved_quote
                .checked_sub(plan.reserved_quote)
                .ok_or(BalanceError::InvariantViolation("reserved quote underflow"))?;
        }
        if plan.reserved_base > 0 {
            state.reserved_base = state
                .reserved_base
                .checked_sub(plan.reserved_base)
                .ok_or(BalanceError::InvariantViolation("reserved base underflow"))?;
        }

        if required_quote > 0 {
            state.reserved_quote = state
                .reserved_quote
                .checked_add(required_quote)
                .ok_or(BalanceError::ArithmeticOverflow)?;
        }
        if required_base > 0 {
            state.reserved_base = state
                .reserved_base
                .checked_add(required_base)
                .ok_or(BalanceError::ArithmeticOverflow)?;
        }

        state.available_quote = state
            .available_quote
            .checked_add(earned_quote)
            .ok_or(BalanceError::ArithmeticOverflow)?;
        state.available_quote = state
            .available_quote
            .checked_add(release_quote)
            .ok_or(BalanceError::ArithmeticOverflow)?;
        state.available_base = state
            .available_base
            .checked_add(acquired_base)
            .ok_or(BalanceError::ArithmeticOverflow)?;
        state.available_base = state
            .available_base
            .checked_add(release_base)
            .ok_or(BalanceError::ArithmeticOverflow)?;

        if let Some(order) = &result.resting {
            if order.id != plan.order_id {
                return Err(BalanceError::InvariantViolation("resting id mismatch"));
            }
            if order.side != plan.side {
                return Err(BalanceError::InvariantViolation("resting side mismatch"));
            }
            if let Some(expected_price) = plan.price {
                if order.price != expected_price {
                    return Err(BalanceError::InvariantViolation("resting price mismatch"));
                }
            }
            self.reservations.insert(
                order.id,
                Reservation {
                    order_id: order.id,
                    account_id: plan.account_id,
                    side: order.side,
                    price: order.price,
                    quantity: order.quantity,
                },
            );
        } else {
            self.reservations.remove(&plan.order_id);
        }

        Ok(())
    }

    fn prepare_modify(
        &self,
        account_id: AccountId,
        order_id: OrderId,
        new_quantity: Quantity,
    ) -> Result<ModifyPlan, BalanceError> {
        let reservation = self
            .reservations
            .get(&order_id)
            .ok_or(BalanceError::UnknownOrder)?;
        if reservation.account_id != account_id {
            return Err(BalanceError::AccountMismatch);
        }
        let state = self
            .accounts
            .get(&account_id)
            .ok_or(BalanceError::UnknownAccount)?;

        let mut plan = ModifyPlan {
            account_id,
            order_id,
            side: reservation.side,
            price: reservation.price,
            current_quantity: reservation.quantity,
            new_quantity,
            ..Default::default()
        };

        if new_quantity > reservation.quantity {
            let delta = new_quantity - reservation.quantity;
            match reservation.side {
                Side::Bid => {
                    let required = u128::from(reservation.price) * u128::from(delta);
                    if state.available_quote < required {
                        return Err(BalanceError::InsufficientQuote);
                    }
                    plan.additional_quote = required;
                }
                Side::Ask => {
                    let required = u128::from(delta);
                    if state.available_base < required {
                        return Err(BalanceError::InsufficientBase);
                    }
                    plan.additional_base = required;
                }
            }
        } else {
            let delta = reservation.quantity - new_quantity;
            match reservation.side {
                Side::Bid => {
                    plan.release_quote = u128::from(reservation.price) * u128::from(delta);
                }
                Side::Ask => {
                    plan.release_base = u128::from(delta);
                }
            }
        }

        Ok(plan)
    }

    fn apply_modify_additional(&mut self, plan: &ModifyPlan) {
        let state = self
            .accounts
            .get_mut(&plan.account_id)
            .expect("account must exist when modifying");
        if plan.additional_quote > 0 {
            state.available_quote -= plan.additional_quote;
            state.reserved_quote += plan.additional_quote;
        }
        if plan.additional_base > 0 {
            state.available_base -= plan.additional_base;
            state.reserved_base += plan.additional_base;
        }
    }

    fn rollback_modify(&mut self, plan: &ModifyPlan) {
        let state = self
            .accounts
            .get_mut(&plan.account_id)
            .expect("account must exist during rollback");
        if plan.additional_quote > 0 {
            state.available_quote += plan.additional_quote;
            state.reserved_quote -= plan.additional_quote;
        }
        if plan.additional_base > 0 {
            state.available_base += plan.additional_base;
            state.reserved_base -= plan.additional_base;
        }
    }

    fn finalize_modify(
        &mut self,
        plan: &ModifyPlan,
        updated: &OrderView,
    ) -> Result<(), BalanceError> {
        if updated.id != plan.order_id {
            return Err(BalanceError::InvariantViolation("updated order mismatch"));
        }
        let state = self
            .accounts
            .get_mut(&plan.account_id)
            .ok_or(BalanceError::UnknownAccount)?;

        if updated.side != plan.side {
            return Err(BalanceError::InvariantViolation("updated side mismatch"));
        }
        if updated.price != plan.price {
            return Err(BalanceError::InvariantViolation("updated price mismatch"));
        }
        if updated.quantity != plan.new_quantity {
            return Err(BalanceError::InvariantViolation(
                "updated quantity mismatch",
            ));
        }

        if plan.release_quote > 0 {
            state.reserved_quote = state
                .reserved_quote
                .checked_sub(plan.release_quote)
                .ok_or(BalanceError::InvariantViolation("quote release underflow"))?;
            state.available_quote = state
                .available_quote
                .checked_add(plan.release_quote)
                .ok_or(BalanceError::ArithmeticOverflow)?;
        }
        if plan.release_base > 0 {
            state.reserved_base = state
                .reserved_base
                .checked_sub(plan.release_base)
                .ok_or(BalanceError::InvariantViolation("base release underflow"))?;
            state.available_base = state
                .available_base
                .checked_add(plan.release_base)
                .ok_or(BalanceError::ArithmeticOverflow)?;
        }

        let reservation = self
            .reservations
            .get_mut(&plan.order_id)
            .ok_or(BalanceError::UnknownOrder)?;
        if reservation.quantity != plan.current_quantity {
            return Err(BalanceError::InvariantViolation(
                "reservation quantity mismatch",
            ));
        }
        reservation.quantity = updated.quantity;
        reservation.price = updated.price;

        Ok(())
    }

    fn reservation(&self, order_id: OrderId) -> Option<&Reservation> {
        self.reservations.get(&order_id)
    }

    fn finalize_cancel(
        &mut self,
        order_id: OrderId,
        quantity: Quantity,
    ) -> Result<(), BalanceError> {
        let reservation = self
            .reservations
            .remove(&order_id)
            .ok_or(BalanceError::UnknownOrder)?;
        if reservation.quantity != quantity {
            return Err(BalanceError::InvariantViolation(
                "canceled quantity mismatch",
            ));
        }
        let state = self
            .accounts
            .get_mut(&reservation.account_id)
            .ok_or(BalanceError::UnknownAccount)?;
        match reservation.side {
            Side::Bid => {
                let reserved = u128::from(reservation.price) * u128::from(reservation.quantity);
                state.reserved_quote = state
                    .reserved_quote
                    .checked_sub(reserved)
                    .ok_or(BalanceError::InvariantViolation("cancel quote underflow"))?;
                state.available_quote = state
                    .available_quote
                    .checked_add(reserved)
                    .ok_or(BalanceError::ArithmeticOverflow)?;
            }
            Side::Ask => {
                let reserved = u128::from(reservation.quantity);
                state.reserved_base = state
                    .reserved_base
                    .checked_sub(reserved)
                    .ok_or(BalanceError::InvariantViolation("cancel base underflow"))?;
                state.available_base = state
                    .available_base
                    .checked_add(reserved)
                    .ok_or(BalanceError::ArithmeticOverflow)?;
            }
        }
        Ok(())
    }
}

pub struct RiskEngine {
    engine: MatchingEngine,
    balances: BalanceManager,
}

impl Default for RiskEngine {
    fn default() -> Self {
        Self {
            engine: MatchingEngine::new(),
            balances: BalanceManager::default(),
        }
    }
}

impl RiskEngine {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn with_engine(engine: MatchingEngine) -> Self {
        Self {
            engine,
            balances: BalanceManager::default(),
        }
    }

    pub fn with_book(book: OrderBook) -> Self {
        Self {
            engine: MatchingEngine::with_book(book),
            balances: BalanceManager::default(),
        }
    }

    pub fn set_event_broadcaster(&mut self, broadcaster: EventBroadcaster) {
        self.engine.set_event_broadcaster(broadcaster);
    }

    pub fn event_broadcaster(&self) -> Option<EventBroadcaster> {
        self.engine.event_broadcaster()
    }

    pub fn order_book(&self) -> &OrderBook {
        self.engine.order_book()
    }

    pub fn credit_account(
        &mut self,
        account_id: AccountId,
        base: Quantity,
        quote: Quantity,
    ) -> Result<(), BalanceError> {
        self.balances.credit_account(account_id, base, quote)
    }

    pub fn account_snapshot(&self, account_id: AccountId) -> Option<AccountSnapshot> {
        self.balances.snapshot(account_id)
    }

    pub fn submit(
        &mut self,
        account_id: AccountId,
        order_id: OrderId,
        side: Side,
        order_type: OrderType,
        price: Option<Price>,
        quantity: Quantity,
    ) -> Result<MatchResult, GatewayError> {
        let effective_price = match order_type {
            OrderType::Market => None,
            _ => Some(price.ok_or_else(|| GatewayError::Order(OrderError::MissingPrice))?),
        };

        let plan = self
            .balances
            .prepare_new_order(
                account_id,
                order_id,
                side,
                order_type,
                effective_price,
                quantity,
                self.engine.order_book(),
            )
            .map_err(GatewayError::Balance)?;
        self.balances.apply_new_order(&plan);
        match self
            .engine
            .submit(order_id, side, order_type, effective_price, quantity)
        {
            Ok(result) => {
                self.balances
                    .settle_new_order(plan, &result)
                    .map_err(GatewayError::Balance)?;
                Ok(result)
            }
            Err(error) => {
                self.balances.rollback_new_order(&plan);
                Err(GatewayError::Order(error))
            }
        }
    }

    pub fn modify_order(
        &mut self,
        account_id: AccountId,
        order_id: OrderId,
        quantity: Quantity,
    ) -> Result<OrderView, GatewayError> {
        let plan = self
            .balances
            .prepare_modify(account_id, order_id, quantity)
            .map_err(GatewayError::Balance)?;
        self.balances.apply_modify_additional(&plan);
        match self.engine.modify_order(order_id, quantity) {
            Ok(updated) => {
                self.balances
                    .finalize_modify(&plan, &updated)
                    .map_err(GatewayError::Balance)?;
                Ok(updated)
            }
            Err(error) => {
                self.balances.rollback_modify(&plan);
                Err(GatewayError::Order(error))
            }
        }
    }

    pub fn cancel_order(
        &mut self,
        account_id: AccountId,
        order_id: OrderId,
    ) -> Result<Quantity, GatewayError> {
        let reservation = self
            .balances
            .reservation(order_id)
            .ok_or(GatewayError::Balance(BalanceError::UnknownOrder))?;
        if reservation.account_id != account_id {
            return Err(GatewayError::Balance(BalanceError::AccountMismatch));
        }
        if reservation.order_id != order_id {
            return Err(GatewayError::Balance(BalanceError::InvariantViolation(
                "reservation id mismatch",
            )));
        }
        match self.engine.cancel_order(order_id) {
            Ok(quantity) => {
                self.balances
                    .finalize_cancel(order_id, quantity)
                    .map_err(GatewayError::Balance)?;
                Ok(quantity)
            }
            Err(error) => Err(GatewayError::Order(error)),
        }
    }

    pub fn order_book_mut(&mut self) -> &mut OrderBook {
        self.engine.order_book_mut()
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::OrderType;

    fn seeded_engine() -> RiskEngine {
        let mut engine = RiskEngine::new();
        engine
            .credit_account(1, 1_000_000, 1_000_000)
            .expect("credit account");
        engine
            .credit_account(2, 1_000_000, 1_000_000)
            .expect("credit account");
        engine
    }

    #[test]
    fn credit_and_snapshot() {
        let mut engine = RiskEngine::new();
        engine
            .credit_account(10, 5, 7)
            .expect("credit should succeed");
        let snapshot = engine.account_snapshot(10).expect("snapshot exists");
        assert_eq!(snapshot.available_base, 5);
        assert_eq!(snapshot.available_quote, 7);
    }

    #[test]
    fn submit_consumes_balances() {
        let mut engine = seeded_engine();
        let result = engine
            .submit(1, 10, Side::Bid, OrderType::Limit, Some(100), 5)
            .expect("order accepted");
        assert!(result.resting.is_some());
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.available_quote, 1_000_000 - 500);
        assert_eq!(snapshot.reserved_quote, 500);
    }

    #[test]
    fn submit_rejects_without_balance() {
        let mut engine = RiskEngine::new();
        engine
            .credit_account(1, 0, 50)
            .expect("credit should succeed");
        let error = engine
            .submit(1, 1, Side::Bid, OrderType::Limit, Some(100), 1)
            .unwrap_err();
        assert_eq!(
            error,
            GatewayError::Balance(BalanceError::InsufficientQuote)
        );
    }

    #[test]
    fn cancel_releases_reservations() {
        let mut engine = seeded_engine();
        engine
            .submit(1, 10, Side::Bid, OrderType::Limit, Some(100), 5)
            .expect("order accepted");
        let canceled = engine.cancel_order(1, 10).expect("cancel succeeds");
        assert_eq!(canceled, 5);
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.reserved_quote, 0);
        assert_eq!(snapshot.available_quote, 1_000_000);
    }

    #[test]
    fn modify_updates_reservations() {
        let mut engine = seeded_engine();
        engine
            .submit(1, 10, Side::Bid, OrderType::Limit, Some(100), 5)
            .expect("order accepted");
        engine
            .modify_order(1, 10, 7)
            .expect("modify should succeed");
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.reserved_quote, 700);
        engine
            .modify_order(1, 10, 2)
            .expect("modify should succeed");
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.reserved_quote, 200);
    }

    #[test]
    fn submit_ask_consumes_base_reservations() {
        let mut engine = RiskEngine::new();
        engine
            .credit_account(1, 10, 0)
            .expect("credit should succeed");
        let result = engine
            .submit(1, 5, Side::Ask, OrderType::Limit, Some(101), 4)
            .expect("ask accepted");
        assert!(result.resting.is_some());
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.available_base, 6);
        assert_eq!(snapshot.reserved_base, 4);
    }

    #[test]
    fn cancel_requires_matching_account() {
        let mut engine = seeded_engine();
        engine
            .submit(1, 11, Side::Bid, OrderType::Limit, Some(100), 3)
            .expect("order accepted");
        let error = engine
            .cancel_order(2, 11)
            .expect_err("mismatch should fail");
        assert_eq!(error, GatewayError::Balance(BalanceError::AccountMismatch));
    }

    #[test]
    fn modify_ask_updates_base_reservations() {
        let mut engine = RiskEngine::new();
        engine.credit_account(1, 20, 0).unwrap();
        engine
            .submit(1, 7, Side::Ask, OrderType::Limit, Some(105), 5)
            .expect("order accepted");
        engine.modify_order(1, 7, 8).expect("increase quantity");
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.available_base, 12);
        assert_eq!(snapshot.reserved_base, 8);
        engine.modify_order(1, 7, 3).expect("decrease quantity");
        let snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(snapshot.available_base, 17);
        assert_eq!(snapshot.reserved_base, 3);
    }

    #[test]
    fn market_order_reservation_matches_available_liquidity() {
        let mut engine = RiskEngine::new();
        engine.credit_account(1, 10, 0).unwrap();
        engine.credit_account(2, 0, 1_000).unwrap();
        engine
            .submit(1, 1, Side::Ask, OrderType::Limit, Some(100), 3)
            .expect("ask added");
        engine
            .submit(1, 2, Side::Ask, OrderType::Limit, Some(101), 2)
            .expect("ask added");

        let result = engine
            .submit(2, 20, Side::Bid, OrderType::Market, None, 5)
            .expect("market executed");
        assert_eq!(result.unfilled, 0);
        assert_eq!(result.fills.len(), 2);
        let snapshot = engine.account_snapshot(2).unwrap();
        // 3 @ 100 and 2 @ 101 cost 502 quote units
        assert_eq!(snapshot.available_quote, 1_000 - 502);
        assert_eq!(snapshot.reserved_quote, 0);
        let ask_snapshot = engine.account_snapshot(1).unwrap();
        assert_eq!(ask_snapshot.available_base, 10); // all base released after fills
        assert_eq!(ask_snapshot.reserved_base, 0);
    }
}
