# Bullish Trading API - WebSocket Public API

## Multi-OrderBook WebSocket (unauthenticated)

**Route**

- `/trading-api/v1/market-data/orderbook`

This allows simultaneous subscriptions to multiple L1 and L2 orderbooks of
different markets:

It also provides a heartbeat topic which sends heartbeat every 30s as an
indicator of platform healthiness. Please refer to the
[heartbeat session](#overview--heartbeat) for the details.

### Multi-Orderbook Subscription

The orderbooks of different markets to be subscribed are controlled by the
parameters in the subscription message listed below: | Parameters | Type |
Description |
|:----------------------|:-------|:--------------------------------------------------------------------------------|
| topic | String | l1 orderbook: l1Orderbook l2 orderbook: l2Orderbook
heartbeat: heartbeat | | symbol | String | market symbol |

L1 Subscription Message Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "l1Orderbook",
    "symbol": "BTCUSD"
  },
  "id": "1611082473000"
}
```

L2 Subscription Message Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "l2Orderbook",
    "symbol": "BTCUSD"
  },
  "id": "1611082473000"
}
```

Heartbeat Subscription Message Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "heartbeat"
  },
  "id": "1611082473000"
}
```

### Multi-Orderbook Response

- L1 Snapshot and Update Response | Name | Type | Description |
  |:---------------|:-------|:--------------------------------------------------------------------------------------------------------------|
  | type | String | "snapshot" or "update" - the first message after the
  subscription is always a snapshot of the L1-orderbook | | sequenceNumber |
  String | incrementing, unique, unsigned integer that identifies a state of the
  L1-orderbook | | symbol | String | market symbol | | timestamp | String |
  denotes the time the update was created | | bid | Array | nested array
  containing price and quantity of highest bid | | ask | Array | nested array
  containing price and quantity of lowest ask |

On subscription, the snapshot is received immediately.

```json
{
  "type": "snapshot",
  "dataType": "V1TALevel1",
  "data": {
    "symbol": "BTCUSD",
    "bid": ["5190.5000", "61.94995262"],
    "ask": ["5191.6000", "96.79626782"],
    "sequenceNumber": "7",
    "datetime": "2020-06-29T06:28:55.000Z",
    "timestamp": "1593412135000"
  }
}
```

Updates follow as and when the orderbook changes.

```json
{
  "type": "update",
  "dataType": "V1TALevel1",
  "data": {
    "symbol": "BTCUSD",
    "bid": ["5199.5000", "61.95995262"],
    "ask": ["5199.6000", "96.59626782"],
    "sequenceNumber": "8",
    "datetime": "2020-06-29T06:28:55.500Z",
    "timestamp": "1593412135500"
  }
}
```

- L2 Snapshot Response

| Name                                                                                           | Type   | Description                                                                                                     |
| ---------------------------------------------------------------------------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| symbol                                                                                         | String | market symbol                                                                                                   |
| bids                                                                                           | Array  | array of size 200 where even indices denote price, odd indices denote absolute quantities                       |
| asks                                                                                           | Array  | array of size 200 where even indices denote price, odd indices denote absolute quantities                       |
| sequenceNumberRange                                                                            | Array  | array of size 2 where first element denotes lower bound, second element denotes upper bound of sequence numbers |
| lower and upper bound are equal for initial snapshot; this may differ for subsequent snapshots |
| datetime                                                                                       | String | denotes the time the update was created by the engine, ISO 8601 with millisecond as string                      |
| timestamp                                                                                      | String | denotes the time the update was created by the engine                                                           |
| publishedAtTimestamp                                                                           | String | denotes the time the update was broadcasted to connected websockets                                             |

```json
{
  "type": "snapshot",
  "dataType": "V1TALevel2",
  "data": {
    "symbol": "BTCUSDC",
    "bids": [
      "5199.5000",
      "110.92467647",
      "5199.4000",
      "20.92470365",
      "5199.3000",
      "0.92473034",
      "5199.2000",
      "0.92475701",
      "5199.1000",
      "0.92478369",
      "5199.0000",
      "0.92481038",
      "5198.9000",
      "0.92483705",
      "5198.8000",
      "0.92486375",
      "5198.7000",
      "0.92489042",
      "5198.6000",
      "0.92491712"
    ],
    "asks": [
      "5199.6000",
      "96.37848193",
      "5199.7000",
      "0.92465082",
      "5199.8000",
      "11.04464563",
      "5199.9000",
      "0.92459696",
      "5200.0000",
      "0.92457029",
      "5200.1000",
      "0.92454362",
      "5200.2000",
      "0.92451695",
      "5200.3000",
      "0.92449028",
      "5200.4000",
      "0.92446361",
      "5200.5000",
      "0.92443695"
    ],
    "sequenceNumberRange": [1370055970, 1370055970],
    "datetime": "2025-02-14T07:15:33.797Z",
    "timestamp": "1739517333797",
    "publishedAtTimestamp": "1739517333798"
  }
}
```

See
[connect to multi-orderbook web-socket](https://github.com/bullish-exchange/api-examples/blob/master/websocket/multi_orderbook_web_socket.py)
for a sample Python script.

## Unified Anonymous Trades WebSocket (unauthenticated)

**Route**

- `/trading-api/v1/market-data/trades`

This allows simultaneous trade subscriptions to multiple markets. Additionally,
instead of sending trades one by one, trades are sent in batches.

Upon subscribing to a market, the client will first receive a snapshot of the
latest 100 trades, followed by batches of trade updates.

### Unified Anonymous Trade Subscription

Anonymous trades from different markets to be subscribed to are controlled by
the parameters in the subscription message listed below: | Parameters | Type |
Description |
|:----------------------|:-------|:--------------------------------------------------------------------------------|
| topic | String | anonymousTrades | | symbol | String | market symbol |

Trade Subscription Message Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "anonymousTrades",
    "symbol": "BTCUSDC"
  },
  "id": "1611082473000"
}
```

### Trade Response Fields

Each trade in a snapshot or update contains the following fields: | Name | Type
| Description |
|:---------------------|:----------|:------------------------------------------------------------------------------------------|
| tradeId | String | unique trade ID | | symbol | String | market symbol | |
price | String | price, see
[asset value](#overview--price-and-quantity-precision) format | | quantity |
String | quantity, see [asset value](#overview--price-and-quantity-precision)
format | | side | String | order side | | isTaker | Boolean | denotes whether
this is a taker's trade | | otcMatchId | String | unique OTC match id | |
otcTradeId | String | unique Bullish OTC trade id | | clientOtcTradeId | String
| unique client OTC trade id | | createdAtTimestamp | String | denotes the time
the order was ACK'd by the exchange | | createdAtDatetime | String | denotes the
time the order was ACK'd by the exchange, ISO 8601 with millisecond as string |
| publishedAtTimestamp | String | denotes the time the update was broadcasted to
connected websockets |

### Unified Anonymous Trade Snapshot Response

The client will receive a trade snapshot with the latest 100 trades upon
subscription.

Sample:

```json
{
  "type": "snapshot",
  "dataType": "V1TAAnonymousTradeUpdate",
  "data": {
    "trades": [
      {
        "tradeId": "100069000000063765",
        "isTaker": true,
        "price": "23404.8636",
        "createdAtTimestamp": "1721879160353",
        "quantity": "0.00029411",
        "publishedAtTimestamp": "1721879162124",
        "side": "SELL",
        "createdAtDatetime": "2024-07-25T03:46:00.353Z",
        "symbol": "BTCUSDC",
        "otcMatchId": "1",
        "otcTradeId": "200069000000063765",
        "clientOtcTradeId": "300069000000063765"
      },
      {
        "tradeId": "100069000000063764",
        "isTaker": true,
        "price": "23405.3380",
        "createdAtTimestamp": "1721879155351",
        "quantity": "0.00029411",
        "publishedAtTimestamp": "1721879162124",
        "side": "SELL",
        "createdAtDatetime": "2024-07-25T03:45:55.351Z",
        "symbol": "BTCUSDC",
        "otcMatchId": "2",
        "otcTradeId": "200069000000063764",
        "clientOtcTradeId": "300069000000063764"
      },
      ...
      {
          "tradeId": "100069000000063666",
          "isTaker": true,
          "price": "23001.8708",
          "createdAtTimestamp": "1721879028067",
          "quantity": "0.00029411",
          "publishedAtTimestamp": "1721879162124",
          "side": "SELL",
          "createdAtDatetime": "2024-07-25T03:43:48.067Z",
          "symbol": "BTCUSDC"
      }
    ],
    "createdAtTimestamp": "1721879160353",
    "publishedAtTimestamp": "1721879162125",
    "symbol": "BTCUSDC"
  }
}
```

### Unified Anonymous Trade Update Response

After receiving the snapshot, the client will receive subsequent trade updates
in batches.

Sample:

```json
{
  "type": "update",
  "dataType": "V1TAAnonymousTradeUpdate",
  "data": {
    "trades": [
      {
        "tradeId": "100028000018887830",
        "isTaker": true,
        "price": "111.8940",
        "createdAtTimestamp": "1722408780738",
        "quantity": "0.00100000",
        "publishedAtTimestamp": "1722408780790",
        "side": "BUY",
        "createdAtDatetime": "2024-07-31T06:53:00.738Z",
        "symbol": "BTCUSDC"
      },
      {
        "tradeId": "100028000018887837",
        "isTaker": false,
        "price": "111.8716",
        "createdAtTimestamp": "1722408780738",
        "quantity": "0.00009595",
        "publishedAtTimestamp": "1722408780790",
        "side": "SELL",
        "createdAtDatetime": "2024-07-31T06:53:00.738Z",
        "symbol": "BTCUSDC",
        "otcMatchId": "10",
        "otcTradeId": "200028000018887837",
        "clientOtcTradeId": "300028000018887837"
      },
      ...
      {
        "tradeId": "100028000018887992",
        "isTaker": true,
        "price": "112.2896",
        "createdAtTimestamp": "1722408780786",
        "quantity": "0.00100000",
        "publishedAtTimestamp": "1722408780790",
        "side": "BUY",
        "createdAtDatetime": "2024-07-31T06:53:00.786Z",
        "symbol": "BTCUSDC",
        "otcMatchId": "11",
        "otcTradeId": "200028000018887992",
        "clientOtcTradeId": "300028000018887992"
      }
    ],
    "createdAtTimestamp": "1722408780786",
    "publishedAtTimestamp": "1722408780790",
    "symbol": "BTCUSDC"
  }
}
```

## Unified Anonymous Tick WebSocket (unauthenticated)

**Route**

- `/trading-api/v1/market-data/tick`

This allows simultaneous tick subscriptions to multiple markets.

Upon subscribing to a market, the client will first receive a snapshot of latest
ticker, followed by updates. See the data model:
[Get Market Tick](#get-/v1/markets/-symbol-/tick)

### Unified Anonymous Tick Subscription

Tick of different markets to be subscribed to, are controlled by parameters in
the subscription message listed below: | Parameters | Type | Description |
|:----------------------|:-------|:--------------------------------------------------------------------------------|
| topic | String | `tick` | | symbol | String | market symbol such as `BTCUSDC`
|

### Tick Subscription Message Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "tick",
    "symbol": "BTCUSD"
  },
  "id": "1611082473000"
}
```

### Keepalive Message Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "keepalivePing",
  "params": {},
  "id": "1611082473001"
}
```

### Tick response example

```json
{
  "type": "snapshot",
  "dataType": "V1TATickerResponse",
  "data": {
    "askVolume": "3.56000000",
    "average": "5200.0400",
    "baseVolume": "1.00000000",
    "bestAsk": "6543.0000",
    "bestBid": "2345.0000",
    "bidVolume": "2.00000000",
    "change": "0.0000",
    "close": "5200.0400",
    "createdAtTimestamp": "1591058897000",
    "publishedAtTimestamp": "1591058898000",
    "high": "5200.0400",
    "last": "5200.0400",
    "lastTradeDatetime": "2020-06-02T00:40:39.500Z",
    "lastTradeSize": "1.00000000",
    "low": "5200.0400",
    "open": "5200.0400",
    "percentage": "0.00",
    "quoteVolume": "5200.0400",
    "symbol": "BTC-USDC-PERP",
    "type": "ticker",
    "vwap": "5200.0400",
    "currentPrice": "0.0007",
    "ammData": [
      {
        "feeTierId": "1",
        "currentPrice": "0.0007",
        "baseReservesQuantity": "96153.00000000",
        "quoteReservesQuantity": "500005200.0400",
        "bidSpreadFee": "0.00000005",
        "askSpreadFee": "0.00000006"
      },
      {
        "feeTierId": "2",
        "currentPrice": "0.0017",
        "baseReservesQuantity": "96153.00000000",
        "quoteReservesQuantity": "500005200.0400",
        "bidSpreadFee": "0.00000015",
        "askSpreadFee": "0.00000016"
      }
    ],
    "createdAtDatetime": "2020-06-02T00:48:17.000Z",
    "markPrice": "26000.0000",
    "fundingRate": "0.114100",
    "openInterest": "9.00000000"
  }
}
```

## Anonymous Market Data Price Tick (unauthenticated)

**Route**

- `/trading-api/v1/market-data/tick/{symbol}`

**Note**: This endpoint does not require subscriptions.

On connection, the client receives current Tick by Market Symbol. See the data
model: [Get Market Tick](#get-/v1/markets/-symbol-/tick)

### Tick response example

```json
{
  "type": "snapshot",
  "dataType": "V1TATickerResponse",
  "data": {
    "askVolume": "3.56000000",
    "average": "5200.0400",
    "baseVolume": "1.00000000",
    "bestAsk": "6543.0000",
    "bestBid": "2345.0000",
    "bidVolume": "2.00000000",
    "change": "0.0000",
    "close": "5200.0400",
    "createdAtTimestamp": "1591058897000",
    "publishedAtTimestamp": "1591058898000",
    "high": "5200.0400",
    "last": "5200.0400",
    "lastTradeDatetime": "2020-06-02T00:40:39.500Z",
    "lastTradeSize": "1.00000000",
    "low": "5200.0400",
    "open": "5200.0400",
    "percentage": "0.00",
    "quoteVolume": "5200.0400",
    "symbol": "BTC-USDC-PERP",
    "type": "ticker",
    "vwap": "5200.0400",
    "currentPrice": "0.0007",
    "ammData": [
      {
        "feeTierId": "1",
        "currentPrice": "0.0007",
        "baseReservesQuantity": "96153.00000000",
        "quoteReservesQuantity": "500005200.0400",
        "bidSpreadFee": "0.00000005",
        "askSpreadFee": "0.00000006"
      },
      {
        "feeTierId": "2",
        "currentPrice": "0.0017",
        "baseReservesQuantity": "96153.00000000",
        "quoteReservesQuantity": "500005200.0400",
        "bidSpreadFee": "0.00000015",
        "askSpreadFee": "0.00000016"
      }
    ],
    "createdAtDatetime": "2020-06-02T00:48:17.000Z",
    "markPrice": "26000.0000",
    "fundingRate": "0.114100",
    "openInterest": "9.00000000"
  }
}
```

## Index Data websocket (unauthenticated)

**Route**

- `/trading-api/v1/index-data`

### Index Price Subscription

The index price of different assets to be subscribed are controlled by the
parameters in the subscription message listed below: | Parameters | Type |
Description |
|:----------------------|:-------|:--------------------------------------------------------------------------------|
| topic | String | Index Price: `indexPrice` | | assetSymbol | String | Asset
symbol, such as `BTC` or `USDC` |

Index Price Subscription Sample:

```json
{
  "jsonrpc": "2.0",
  "type": "command",
  "method": "subscribe",
  "params": {
    "topic": "indexPrice",
    "assetSymbol": "USDC"
  },
  "id": "1611082473000"
}
```

### IndexPrice Response

On successful subscription for an `assetSymbol`, the client receives a snapshot
with the current index price, and updates after.

| Name               | Type   | Description                                                                      |
| :----------------- | :----- | :------------------------------------------------------------------------------- |
| assetSymbol        | String | asset symbol                                                                     |
| price              | String | price in USD, see [asset value](#overview--price-and-quantity-precision) format  |
| updatedAtDatetime  | String | denotes the time the index price was updated by the exchange, in ISO 8601 format |
| updatedAtTimestamp | String | denotes the epoch millisecond time the index price was updated by the exchange   |

```json
{
  "type": "update",
  "dataType": "V1TAIndexPrice",
  "data": {
    "assetSymbol": "USDC",
    "price": "1.0000",
    "updatedAtDatetime": "2024-06-29T06:29:50.500Z",
    "updatedAtTimestamp": "1719642590000"
  }
}
```
