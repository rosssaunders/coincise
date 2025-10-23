#[derive(Debug, PartialEq, Eq)]
pub enum OrderError {
    DuplicateOrder,
    UnknownOrder,
    InvalidQuantity,
    CrossedOrder,
    MissingPrice,
}
