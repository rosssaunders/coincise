pub type AccountId = u64;
pub type OrderId = u64;
pub type Price = u64;
pub type Quantity = u64;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Side {
    Bid,
    Ask,
}

impl Side {
    #[inline]
    pub fn opposite(self) -> Self {
        match self {
            Side::Bid => Side::Ask,
            Side::Ask => Side::Bid,
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct OrderView {
    pub id: OrderId,
    pub side: Side,
    pub price: Price,
    pub quantity: Quantity,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct LevelSnapshot {
    pub price: Price,
    pub total_quantity: Quantity,
    pub orders: Vec<OrderView>,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct BookSnapshot {
    pub bids: Vec<LevelSnapshot>,
    pub asks: Vec<LevelSnapshot>,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub struct Fill {
    pub maker_id: OrderId,
    pub price: Price,
    pub quantity: Quantity,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct MatchResult {
    pub fills: Vec<Fill>,
    pub resting: Option<OrderView>,
    pub unfilled: Quantity,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum OrderType {
    Market,
    Limit,
    ImmediateOrCancel,
    FillOrKill,
    PostOnly,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum EngineEvent {
    Book(BookEvent),
    Trade(TradeEvent),
    Rejection(OrderRejection),
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub enum BookEvent {
    Added(OrderView),
    Updated(OrderView),
    Removed {
        order_id: OrderId,
        side: Side,
        price: Price,
        quantity: Quantity,
        reason: BookRemovalReason,
    },
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum BookRemovalReason {
    Filled,
    Canceled,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct TradeEvent {
    pub taker_order_id: OrderId,
    pub maker_order_id: OrderId,
    pub price: Price,
    pub quantity: Quantity,
    pub taker_side: Side,
    pub taker_order_type: OrderType,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct OrderRejection {
    pub order_id: OrderId,
    pub side: Side,
    pub order_type: OrderType,
    pub price: Option<Price>,
    pub quantity: Quantity,
    pub reason: OrderRejectionReason,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum OrderRejectionReason {
    DuplicateOrder,
    Crossed,
    InvalidQuantity,
    MissingPrice,
    InsufficientLiquidity,
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct SequencedEngineEvent {
    pub sequence: u64,
    pub event: EngineEvent,
}
