Copy

1.  [For developers](/hyperliquid-docs/for-developers)
2.  [API](/hyperliquid-docs/for-developers/api)

# Error responses

Order and cancel errors are usually returned as a vector with same length as the batched request.

Below is a list of possible batched error responses:

Error source

Error type

Error string

Order

Tick

Price must be divisible by tick size.

Order

MinTradeNtl

Order must have minimum value of $10.

Order

MinTradeSpotNtl

Order must have minimum value of 10 {quote\_token}.

Order

PerpMargin

Insufficient margin to place order.

Order

ReduceOnly

Reduce only order would increase position.

Order

BadAloPx

Post only order would have immediately matched, bbo was {bbo}.

Order

IocCancel

Order could not immediately match against any resting orders.

Order

BadTriggerPx

Invalid TP/SL price.

Order

MarketOrderNoLiquidity

No liquidity available for market order.

Order

PositionIncreaseAtOpenInterestCap

Order would increase open interest while open interest is capped

Order

PositionFlipAtOpenInterestCap

Order would increase open interest while open interest is capped

Order

TooAggressiveAtOpenInterestCap

Order rejected due to price more aggressive than oracle while at open interest cap

Order

OpenInterestIncrease

Order would increase open interest too quickly

Order

InsufficientSpotBalance

(Spot-only) Order has insufficient spot balance to trade

Order

Oracle

Order price too far from oracle

Order

PerpMaxPosition

Order would cause position to exceed margin tier limit at current leverage

Cancel

MissingOrder

Order was never placed, already canceled, or filled.

Important: Some errors are a deterministic function of the payload itself, and these are instead returned earlier as part of pre-validation. In this case only one error is returned for the entire payload, as some of these errors do not apply to a specific order or cancel.

Examples include: empty batch of orders, non-reduce-only TP/SL orders, and some forms of tick size validation.

For API users that use batching, it's recommended to handle the case where a single error is returned for a batch of multiple orders. In this case, the response could be duplicated `n`times before being sent to the callback function, as the whole batch was rejected for this same reason.

For API users that use historical orders, a list of all the cancel / reject historical order statuses can be found [here](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint#query-order-status-by-oid-or-cloid).

[PreviousTimeouts and heartbeats](/hyperliquid-docs/for-developers/api/websocket/timeouts-and-heartbeats)[NextSigning](/hyperliquid-docs/for-developers/api/signing)

Last updated 4 months ago