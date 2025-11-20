# GET Futures Public API Definitions

**Source:** [Futures Public API Definitions](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Futures Public API Definitions

#### Field description

-   `symbol` is the name of the trading pair, consisting of the trading currency and the quote currency. Taking BTCUSDT as an example, BTC is the transaction currency, USDT is the pricing currency, and the transaction pair is mainly used in contract transactions
-   `order_id` order number, the order ID of the same currency pair of each business line is unique

#### Order State（Field:state)

-   `2`\=status\_check
-   `4`\=status\_finish

#### Order Side（Field:side)

-   `1`\=buy\_open\_long
-   `2`\=buy\_close\_short
-   `3`\=sell\_close\_long
-   `4`\=sell\_open\_short

#### Position（Field:position\_type)

-   `1`\=long
-   `2`\=short

#### Position Direction: (Field: position\_side)

-   `both` (For One-way position mode)
-   `long` (For Hedge position mode)
-   `short` (For Hedge position mode)

#### Order Type（Field:type)

-   `limit`
-   `market`
-   `liquidate`
-   `bankruptcy`
-   `adl`
-   `trailing`
-   `planorder`

#### Open Type（Field:open\_type)

-   `cross`
-   `isolated`

#### Order Mode（Field:mode)

-   `1`\=GTC (Good Till Cancel)
-   `2`\=FOK (Fill or Kill)
-   `3`\=IOC (Immediate or Cancel)
-   `4`\=Maker Only (Good Till Crossing)

#### Timestamp

All the times returned by the system are in the form of timestamps.