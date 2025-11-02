## [](#section/Changelog)Changelog

## [](#section/Changelog/2025-10-23)2025-10-23

- Add `j` and `k` fields to the order update stream (take profit limit price and
  stop loss limit price).

## [](#section/Changelog/2025-09-02)2025-09-02

- The `/depth` endpoint now returns a limit of 5,000 price levels on each side
  of the book.

## [](#section/Changelog/2025-09-01)2025-09-01

- The `cumulativeInterest` response field is being removed from the
  `/position`endpoint.
- Estimated liquidation price or `l` is being removed from the position update
  stream. It will remain as a placeholder and be set to 0. It will be removed in
  the future, so client's should not rely on its presence.
- Liquidation price can be queried for a single position using the Positions API
  `/position` for example `/position?symbol=BTC_USDC_PERP`.

## [](#section/Changelog/2025-08-07)2025-08-07

- `/history/pnl` has been removed.

## [](#section/Changelog/2025-06-08)2025-06-08

- The order id format is changing, it is no longer a byte shifted timestamp. It
  is no longer possible to derive the order timestamp from the order id. This
  change will take place at Monday June 9th, 01:00 UTC.

## [](#section/Changelog/2025-04-22)2025-04-22

- The `/fills` endpoint now returns all fills for the account, including fills
  from system orders as well as client orders. System orders include
  liquidations, ADLs and collateral conversions. Previously, by default, it only
  returned fills from client orders. This behavior can be achieved by setting
  the `fillType` parameter to `User`.

## [](#section/Changelog/2025-04-08)2025-04-08

- Added funding rate lower and upper bounds to `/markets` and `/market`
  endpoints.

## [](#section/Changelog/2025-03-26)2025-03-26

- Add open interest stream `openInterest.<symbol>`.
- Added the option to query `/history/borrowLend/positions` with a signed
  request using the instruction `borrowPositionHistoryQueryAll`.

## [](#section/Changelog/2025-03-19)2025-03-19

- The leverage filter has been removed from `/markets` and `/market` endpoints.
- Added `/openInterest` now takes `symbol` as an optional parameter. When not
  set, all markets are returned.
- `/openInterests` has been deprecated.
- Add stop loss and take profit fields to `/orders/execute`.
- Add `I` field to the order update stream (related order id).
- Add `a` and `b` fields to the order update stream (take profit trigger price
  and stop loss trigger price).

## [](#section/Changelog/2025-02-28)2025-02-28

- Added `clientId` to fill history.

## [](#section/Changelog/2025-02-11)2025-02-11

- An `O` field has been added to the order update stream. It denotes the origin
  of the update. The possible values are:
  - `USER`: The origin of the update was due to order entry by the user.
  - `LIQUIDATION_AUTOCLOSE`: The origin of the update was due to a liquidation
    by the liquidation engine.
  - `ADL_AUTOCLOSE`: The origin of the update was due to an ADL
    (auto-deleveraging) event.
  - `COLLATERAL_CONVERSION`: The origin of the update was due to a collateral
    conversion to settle debt on the account.
  - `SETTLEMENT_AUTOCLOSE`: The origin of the update was due to the settlement
    of a position on a dated market.
  - `BACKSTOP_LIQUIDITY_PROVIDER`: The origin of the update was due to a
    backstop liquidity provider facilitating a liquidation.

- `USER`: The origin of the update was due to order entry by the user.
- `LIQUIDATION_AUTOCLOSE`: The origin of the update was due to a liquidation by
  the liquidation engine.
- `ADL_AUTOCLOSE`: The origin of the update was due to an ADL
  (auto-deleveraging) event.
- `COLLATERAL_CONVERSION`: The origin of the update was due to a collateral
  conversion to settle debt on the account.
- `SETTLEMENT_AUTOCLOSE`: The origin of the update was due to the settlement of
  a position on a dated market.
- `BACKSTOP_LIQUIDITY_PROVIDER`: The origin of the update was due to a backstop
  liquidity provider facilitating a liquidation.

## [](#section/Changelog/2025-02-07)2025-02-07

- Added `r` to denote a reduce only order on the order updates stream.
- Added `reduceOnly` to the get orders endpoint.

## [](#section/Changelog/2025-02-03)2025-02-03

- Added `openInterestLimit` to the markets endpoint. Applicable to futures
  markets only.
- Added `orderModified` event to the order update stream. A resting reduce only
  order's quantity can be decreased in order to prevent position side reversal.

## [](#section/Changelog/2025-01-09)2025-01-09

- Added `marketType` to the markets endpoint.
- Added an optional `marketType` filter to the fills and the orders endpoints.

## [](#section/Changelog/2024-12-03)2024-12-03

- Add order expiry reason to order update stream.
- Add `cumulativeInterest` to borrow lend position.

## [](#section/Changelog/2024-12-02)2024-12-02

- Add borrow lend history per position endpoint.

## [](#section/Changelog/2024-11-10)2024-11-10

- Add `timestamp` field denoting the system time in unix-epoch microseconds to
  the depth endpoint.

## [](#section/Changelog/2024-10-15)2024-10-15

- Convert all error responses to JSON and add a error code.

## [](#section/Changelog/2024-05-14)2024-05-14

- Add `executedQuantity` and `executedQuoteQuantity` to order history endpoint.

## [](#section/Changelog/2024-05-03)2024-05-03

- Add single market order update stream `account.orderUpdate.<symbol>`.

## [](#section/Changelog/2024-05-02)2024-05-02

- Add optional `from` and `to` timestamp to get withdrawals endpoint.

## [](#section/Changelog/2024-05-01)2024-05-01

- Add optional `from` and `to` timestamp to get deposits endpoint.

## [](#section/Changelog/2024-03-14)2024-03-14

- Add optional `orderId` filter to order history endpoint.
- Add optional `from` and `to` timestamp to order fills endpoint.

## [](#section/Changelog/2024-02-28)2024-02-28

- Return the withdrawal in request withdrawal response.

## [](#section/Changelog/2024-02-24)2024-02-24

- An additional field `t` was added to the private order update stream. It is
  the `trade_id` of the fill that generated the order update.
- Added a maximum value for the `X-Window` header of `60000`.

## [](#section/Changelog/2024-01-16)2024-01-16

### Breaking

- A new websocket API is available at `wss://ws.backpack.exchange`. Please see
  the documentation. The previous API remains on the same endpoint and will be
  deprecated after a migration period. The new API changes the following:
  - Subscription endpoint is now `wss://ws.backpack.exchange` instead of
    `wss://ws.backpack.exchange/stream`.
  - Can subscribe and unsubscribe to/from multiple streams by passing more than
    one in the `params` field.
  - Signature should now be sent in a separate `signature` field.
  - Signature instruction changed from `accountQuery` to `subscribe`.
  - Event and engine timestamps are now in `microseconds` instead of
    `milliseconds`.
  - Add engine timestamp to `bookTicker`, `depth`, and `order` streams.
  - Add quote asset volume to ticker stream.
  - Add sequential trade id to trade stream.
  - Rename the event type in the depth stream from `depthEvent` to `depth`.
  - Change the format of streams from `<symbol>@<type>` to `<type>.<symbol>` or
    `kline.<interval>.<symbol>` for K-lines.
  - Flatten the K-Line in the K-line stream so its not nested.

- Subscription endpoint is now `wss://ws.backpack.exchange` instead of
  `wss://ws.backpack.exchange/stream`.
- Can subscribe and unsubscribe to/from multiple streams by passing more than
  one in the `params` field.
- Signature should now be sent in a separate `signature` field.
- Signature instruction changed from `accountQuery` to `subscribe`.
- Event and engine timestamps are now in `microseconds` instead of
  `milliseconds`.
- Add engine timestamp to `bookTicker`, `depth`, and `order` streams.
- Add quote asset volume to ticker stream.
- Add sequential trade id to trade stream.
- Rename the event type in the depth stream from `depthEvent` to `depth`.
- Change the format of streams from `<symbol>@<type>` to `<type>.<symbol>` or
  `kline.<interval>.<symbol>` for K-lines.
- Flatten the K-Line in the K-line stream so its not nested.

## [](#section/Changelog/2024-01-11)2024-01-11

### Breaking

- Replaced `identifier` field on deposits with `transaction_hash` and
  `provider_id`. This aims to provide clearer representation of the field,
  particularly for fiat deposits.
- Removed duplicate `pending` values from the `WithdrawalStatus` and
  `DepositStatus` spec enum.
