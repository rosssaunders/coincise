# GET Futures Public API Definitions

**Source:**
[Futures Public API Definitions](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Futures Public API Definitions

#### Field description

- `symbol` is the name of the trading pair, consisting of the trading currency
  and the quote currency. Taking BTCUSDT as an example, BTC is the transaction
  currency, USDT is the pricing currency, and the transaction pair is mainly
  used in contract transactions
- `order_id` order number, the order ID of the same currency pair of each
  business line is unique

#### Order State（Field:state)

- `2`\=status_check
- `4`\=status_finish

#### Order Side（Field:side)

- `1`\=buy_open_long
- `2`\=buy_close_short
- `3`\=sell_close_long
- `4`\=sell_open_short

#### Position（Field:position_type)

- `1`\=long
- `2`\=short

#### Position Direction: (Field: position_side)

- `both` (For One-way position mode)
- `long` (For Hedge position mode)
- `short` (For Hedge position mode)

#### Order Type（Field:type)

- `limit`
- `market`
- `liquidate`
- `bankruptcy`
- `adl`
- `trailing`
- `planorder`

#### Open Type（Field:open_type)

- `cross`
- `isolated`

#### Order Mode（Field:mode)

- `1`\=GTC (Good Till Cancel)
- `2`\=FOK (Fill or Kill)
- `3`\=IOC (Immediate or Cancel)
- `4`\=Maker Only (Good Till Crossing)

#### Timestamp

All the times returned by the system are in the form of timestamps.
