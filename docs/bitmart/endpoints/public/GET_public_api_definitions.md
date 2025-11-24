# GET Public API Definitions

**Source:** [Public API Definitions](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Public API Definitions

#### Field description

- `currency` Currency refers to the basic unit that can be transferred in and
  out, such as BTC, ETH, EOS, etc
- `symbol` Trading pair name, consists of base and quote currency. Taking
  BTC_USDT as an example, BTC is the base currency, and USDT is the quote
  currency. Trading pairs are mainly used in spot trading
- `orderId` Order number, the order ID under the same currency pair of each
  business line is unique
- `tradeId` The unique number of the trade

#### Order State （Field:state)

- `new`\=The order has been accepted by the engine.
- `partially_filled`\=A part of the order has been filled.
- `filled`\=The order has been completed.
- `canceled`\=The order has been canceled.
- `partially_canceled`\=A part of the order has been filled, and the order has
  been canceled.

#### Order Cancellation Reason （Field:cancelSource)

- `user`\=User manually canceled.
- `system`\=System automatically canceled.
- `stp`\=Stp Cancelled.

#### Self transaction protection type （Field:stpMode)

- `none`\=none
- `cancel_maker`\=cancel_maker
- `cancel_taker`\=cancel_taker
- `cancel_both`\=cancel_both

#### Order Side （Field:side)

- `buy`\=Buy
- `sell`\=Sell

#### Order Type （Field:type)

- `limit`\=Limit Order
- `market`\=Market Order
- `limit_maker`\=PostOnly Order
- `ioc`\=IOC Order

#### Trade Role （Field:tradeRole)

- `taker`\=Take orders, take the initiative to deal
- `maker`\=Pending order, passive transaction

#### Timestamp

All the times returned by the system are in the form of timestamps.
