# Public WebSocket API Streams

## Public API Definitions

## ENUM definitions

### Order side

- BUY
- SELL

### Order type

- LIMIT (Limit order)
- MARKET (Market order)
- LIMIT_MAKER (Limit maker order)
- IMMEDIATE_OR_CANCEL (Immediate or cancel order)
- FILL_OR_KILL (Fill or kill order)

### Order Status

- NEW Uncompleted
- FILLED Filled
- PARTIALLY_FILLED Partially filled
- CANCELED Canceled
- PARTIALLY_CANCELED Partially canceled

### Kline Interval

- 1m 1 minute
- 5m 5 minute
- 15m 15 minute
- 30m 30 minute
- 60m 60 minute
- 4h 4 hour
- 1d 1 day
- 1W 1 week
- 1M 1 month

### changed type

- WITHDRAW withdraw
- WITHDRAW_FEE withdraw fee
- DEPOSIT deposit
- DEPOSIT_FEE deposit fee
- ENTRUST deal
- ENTRUST_PLACE place order
- ENTRUST_CANCEL cancel order
- TRADE_FEE trade fee
- ENTRUST_UNFROZEN return frozen order funds
- SUGAR airdrop
- ETF_INDEX ETF place order

---

## Websocket Market Streams

- The base endpoint is: **ws://wbs-api.mexc.com/ws**
- Each connection to **ws://wbs-api.mexc.com/ws** is valid for no more than 24
  hours. Please handle disconnections and reconnections properly.
- All trading pair names in the symbol must be in **uppercase**. For example:
  `spot@public.deals.v3.api.pb@<symbol>`  
  Example: `spot@public.deals.v3.api.pb@BTCUSDT`
- If there is no valid subscription on the websocket, the server will actively
  disconnect after **30 seconds**. If the subscription is successful but there
  is no data flow, the server will disconnect after **one minute**. The client
  can send a ping to keep the connection alive.
- One ws connection supports a maximum of 30 subscriptions.
- Please process the data according to the parameters returned in the
  documentation. Parameters not returned in the documentation will be optimized
  soon, so please do not use them.

## Live Subscription/Unsubscription to Data Streams

- The following data can be sent via websocket to subscribe or unsubscribe from
  data streams. Examples are provided below.
- The `id` in the response is an unsigned integer and serves as the unique
  identifier for communication.
- If the `msg` in the response matches the corresponding request field, it
  indicates that the request was sent successfully.

## Protocol Buffers Integration

The current websocket push uses the protobuf format. The specific integration
process is as follows:

1.**PB File Definition**  
The PB definition files can be obtained via the provided
link:https://github.com/mexcdevelop/websocket-proto

2.**Generate Deserialization Code**  
Use the tool available at https://github.com/protocolbuffers/protobuf to compile
the .proto files and generate deserialization code.

> **Java**

```
   protoc *.proto --java_out=python custom_path
```

> **Python**

```
   protoc *.proto --python_out=python custom_path
```

> **Others**

```
   Multiple languages are supported, including C++, C#, Go, Ruby, PHP, JS, etc. For details, see [https://github.com/protocolbuffers/protobuf](https://github.com/protocolbuffers/protobuf).
```

3.**Data Deserialization**  
Use the code generated in the previous step to deserialize the data.

> **Java**  
> Include the protobuf-java dependency:

```
   <dependency>
       <groupId>com.google.protobuf</groupId>
       <artifactId>protobuf-java</artifactId>
       <version>{protobuf.version}</version> <!-- Specify the version as per your project requirements -->
   </dependency>
```

```
   //Parsing example:

   // Assemble the object
   PushDataV3ApiWrapper pushDataV3ApiWrapper = PushDataV3ApiWrapper.newBuilder()
           .setChannel("spot@public.aggre.depth.v3.api.pb@10ms")
           .setSymbol("BTCUSDT")
           .setSendTime(System.currentTimeMillis())
           .build();

   // Serialize to a byte array
   byte[] serializedData = pushDataV3ApiWrapper.toByteArray();

   // Deserialize into a PushDataV3ApiWrapper object
   PushDataV3ApiWrapper resultV3 = PushDataV3ApiWrapper.parseFrom(serializedData);
```

> **Python**

```
   #Parsing example:

   import PushDataV3ApiWrapper_pb2

   # Assemble the object
   pushData = PushDataV3ApiWrapper_pb2.PushDataV3ApiWrapper()
   pushData.channel = 'spot@public.aggre.depth.v3.api.pb@10ms'
   pushData.symbol = 'BTCUSDT'

   # Serialize to a string
   serializedData = pushData.SerializeToString()

   # Deserialize into a PushDataV3ApiWrapper object
   result = PushDataV3ApiWrapper_pb2.PushDataV3ApiWrapper()
   result.ParseFromString(serializedData)
   print(result)
```

---

### Subscribe to a Data Stream

> **Subscription Channel Response**

```
{
  "id": 0,
  "code": 0,
  "msg": "spot@public.deals.v3.api.pb@BTCUSDT"
}
```

- **Request**

{ "method": "SUBSCRIPTION", "params": \["spot@public.deals.v3.api.pb@BTCUSDT"\]
}

---

### Unsubscribe from a Data Stream

> **Unsubscription Response**

```
{
  "id": 0,
  "code": 0,
  "msg": "spot@public.increase.depth.v3.api.pb@BTCUSDT"
}
```

- **Request**

{ "method": "UNSUBSCRIPTION", "params":
\["spot@public.deals.v3.api.pb@BTCUSDT"\] }

---

### PING/PONG Mechanism

> **PING/PONG Response**

```
{
  "id": 0,
  "code": 0,
  "msg": "PONG"
}
```

- **Request**

{"method": "PING"}

---

## Trade Streams

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.aggre.deals.v3.api.pb@100ms@BTCUSDT"
    ]
}
```

> **Response:**

```
{
  "channel": "spot@public.aggre.deals.v3.api.pb@100ms@BTCUSDT",
  "publicdeals": {
    "dealsList": [
      {
        "price": "93220.00", // Trade price
        "quantity": "0.04438243", // Trade quantity
        "tradetype": 2, // Trade type (1: Buy, 2: Sell)
        "time": 1736409765051 // Trade time
      }
    ],
    "eventtype": "spot@public.aggre.deals.v3.api.pb@100ms" // Event type
  },
  "symbol": "BTCUSDT", // Trading pair
  "sendtime": 1736409765052 // Event time
}
```

**Request Parameter:** `spot@public.aggre.deals.v3.api.pb@(100ms|10ms)@<symbol>`

The Trade Streams push raw trade information; each trade has a unique buyer and
seller

**Response Parameters:**

| Parameter | Data Type | Description                  |
| --------- | --------- | ---------------------------- |
| dealsList | array     | Trade information            |
| price     | string    | Trade price                  |
| quantity  | string    | Trade quantity               |
| tradetype | int       | Trade type (1: Buy, 2: Sell) |
| time      | long      | Trade time                   |
| eventtype | string    | Event type                   |
| symbol    | string    | Trading pair                 |
| sendtime  | long      | Event time                   |

---

## K-line Streams

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.kline.v3.api.pb@BTCUSDT@Min15"
    ]
}
```

> **Response:**

```
{
  "channel": "spot@public.kline.v3.api.pb@BTCUSDT@Min15",
  "publicspotkline": {
    "interval": "Min15", // K-line interval
    "windowstart": 1736410500, // Start time of the K-line
    "openingprice": "92925", // Opening trade price during this K-line
    "closingprice": "93158.47", // Closing trade price during this K-line
    "highestprice": "93158.47", // Highest trade price during this K-line
    "lowestprice": "92800", // Lowest trade price during this K-line
    "volume": "36.83803224", // Trade volume during this K-line
    "amount": "3424811.05", // Trade amount during this K-line
    "windowend": 1736411400 // End time of the K-line
  },
  "symbol": "BTCUSDT",
  "symbolid": "2fb942154ef44a4ab2ef98c8afb6a4a7",
  "createtime": 1736410707571
}
```

The Kline/Candlestick Stream push updates to the current klines/candlestick
every second.

**Request Parameter:** `spot@public.kline.v3.api.pb@<symbol>@<interval>`

**Response Parameters:**

| Parameter       | Data Type  | Description                            |
| --------------- | ---------- | -------------------------------------- |
| publicspotkline | object     | K-line information                     |
| interval        | string     | K-line interval                        |
| windowstart     | long       | Start time of the K-line               |
| openingprice    | bigDecimal | Opening trade price during this K-line |
| closingprice    | bigDecimal | Closing trade price during this K-line |
| highestprice    | bigDecimal | Highest trade price during this K-line |
| lowestprice     | bigDecimal | Lowest trade price during this K-line  |
| volume          | bigDecimal | Trade volume during this K-line        |
| amount          | bigDecimal | Trade amount during this K-line        |
| windowend       | long       | End time of the K-line                 |
| symbol          | string     | Trading pair                           |
| symbolid        | string     | Trading pair ID                        |
| createtime      | long       | Event time                             |

**K-line Interval Parameters:**

- Min: Minutes; Hour: Hours; Day: Days; Week: Weeks; M: Month

Available intervals:

- Min1
- Min5
- Min15
- Min30
- Min60
- Hour4
- Hour8
- Day1
- Week1
- Month1

---

## Diff.Depth Stream

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.aggre.depth.v3.api.pb@100ms@BTCUSDT"
    ]
}
```

> **Response:**

```
{
  "channel": "spot@public.aggre.depth.v3.api.pb@100ms@BTCUSDT",
  "publicincreasedepths": {
    "asksList": [], // asks: Sell orders
    "bidsList": [ // bids: Buy orders
      {
        "price": "92877.58", // Price level of change
        "quantity": "0.00000000" // Quantity
      }
    ],
    "eventtype": "spot@public.aggre.depth.v3.api.pb@100ms", // Event type
    "version": "36913293511" // Version number
  },
  "symbol": "BTCUSDT", // Trading pair
  "sendtime": 1736411507002 // Event time
}
```

If the order quantity (`quantity`) for a price level is 0, it indicates that the
order at that price has been canceled or executed, and that price level should
be removed.

**Request Parameter:** `spot@public.aggre.depth.v3.api.pb@(100ms|10ms)@<symbol>`

**Response Parameters:**

| Parameter | Data Type | Description           |
| --------- | --------- | --------------------- |
| price     | string    | Price level of change |
| quantity  | string    | Quantity              |
| eventtype | string    | Event type            |
| version   | string    | Version number        |
| symbol    | string    | Trading pair          |
| sendtime  | long      | Event time            |

---

## Diff.Depth Stream(Batch Aggregation)

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.increase.depth.batch.v3.api.pb@BTCUSDT"
    ]
}
```

> **Response:**

```
{
  "channel" : "spot@public.increase.depth.batch.v3.api.pb@BTCUSDT",
  "symbol" : "BTCUSDT",
  "sendTime" : "1739502064578",
  "publicIncreaseDepthsBatch" : {
    "items" : [ {
      "asks" : [ ],
      "bids" : [ {
        "price" : "96578.48",
        "quantity" : "0.00000000"
      } ],
      "eventType" : "",
      "version" : "39003145507"
    }, {
      "asks" : [ ],
      "bids" : [ {
        "price" : "96578.90",
        "quantity" : "0.00000000"
      } ],
      "eventType" : "",
      "version" : "39003145508"
    }, {
      "asks" : [ ],
      "bids" : [ {
        "price" : "96579.31",
        "quantity" : "0.00000000"
      } ],
      "eventType" : "",
      "version" : "39003145509"
    }, {
      "asks" : [ ],
      "bids" : [ {
        "price" : "96579.84",
        "quantity" : "0.00000000"
      } ],
      "eventType" : "",
      "version" : "39003145510"
    }, {
      "asks" : [ ],
      "bids" : [ {
        "price" : "96576.69",
        "quantity" : "4.88725694"
      } ],
      "eventType" : "",
      "version" : "39003145511"
    } ],
    "eventType" : "spot@public.increase.depth.batch.v3.api.pb"
  }
}
```

In the batch aggregation version, if the number of entries exceeds 5 or the time
interval exceeds 5ms, the data is pushed once. If the order quantity for a price
level is 0, it indicates that the order at that price has been canceled or
executed, and that price level should be removed.

**Request Parameter:** `spot@public.increase.depth.batch.v3.api.pb@<symbol>`

**Response Parameters:**

| Parameter | Data Type | Description           |
| --------- | --------- | --------------------- |
| price     | string    | Price level of change |
| quantity  | string    | Quantity              |
| eventtype | string    | Event type            |
| version   | string    | Version number        |
| symbol    | string    | Trading pair          |
| sendtime  | long      | Event time            |

---

## Partial Book Depth Streams

This stream pushes limited level depth information. The “levels” indicate the
number of order levels for buy and sell orders, which can be 5, 10, or 20
levels.

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.limit.depth.v3.api.pb@BTCUSDT@5"
    ]
}
```

> **Response:**

```
{
  "channel": "spot@public.limit.depth.v3.api.pb@BTCUSDT@5",
  "publiclimitdepths": {
    "asksList": [ // asks: Sell orders
      {
        "price": "93180.18", // Price level of change
        "quantity": "0.21976424" // Quantity
      }
    ],
    "bidsList": [ // bids: Buy orders
      {
        "price": "93179.98",
        "quantity": "2.82651000"
      }
    ],
    "eventtype": "spot@public.limit.depth.v3.api.pb", // Event type
    "version": "36913565463" // Version number
  },
  "symbol": "BTCUSDT", // Trading pair
  "sendtime": 1736411838730 // Event time
}
```

**Request Parameter:** `spot@public.limit.depth.v3.api.pb@<symbol>@<level>`

**Response Parameters:**

| Parameter | Data Type | Description           |
| --------- | --------- | --------------------- |
| price     | string    | Price level of change |
| quantity  | string    | Quantity              |
| eventtype | string    | Event type            |
| version   | string    | Version number        |
| symbol    | string    | Trading pair          |
| sendtime  | long      | Event time            |

---

## Individual Symbol Book Ticker Streams

Pushes any update to the best bid or ask's price or quantity in real-time for a
specified symbol.

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.aggre.bookTicker.v3.api.pb@100ms@BTCUSDT"
    ]
}
```

> **Response:**

```
{
  "channel": "spot@public.aggre.bookTicker.v3.api.pb@100ms@BTCUSDT",
  "publicbookticker": {
    "bidprice": "93387.28",  // Best bid price
    "bidquantity": "3.73485", // Best bid quantity
    "askprice": "93387.29", // Best ask price
    "askquantity": "7.669875" // Best ask quantity
  },
  "symbol": "BTCUSDT", // Trading pair
  "sendtime": 1736412092433 // Event time
}
```

**Request Parameter:**
`spot@public.aggre.bookTicker.v3.api.pb@(100ms|10ms)@<symbol>`

**Response Parameters:**

| Parameter   | Data Type | Description       |
| ----------- | --------- | ----------------- |
| bidprice    | string    | Best bid price    |
| bidquantity | string    | Best bid quantity |
| askprice    | string    | Best ask price    |
| askquantity | string    | Best ask quantity |
| symbol      | string    | Trading pair      |
| sendtime    | long      | Event time        |

---

## Individual Symbol Book Ticker Streams(Batch Aggregation)

This batch aggregation version pushes the best order information for a specified
trading pair.

> **Request:**

```
{
    "method": "SUBSCRIPTION",
    "params": [
        "spot@public.bookTicker.batch.v3.api.pb@BTCUSDT"
    ]
}
```

> **Response:**

```
{
  "channel" : "spot@public.bookTicker.batch.v3.api.pb@BTCUSDT",
  "symbol" : "BTCUSDT",
  "sendTime" : "1739503249114",
  "publicBookTickerBatch" : {
    "items" : [ {
      "bidPrice" : "96567.37",
      "bidQuantity" : "3.362925",
      "askPrice" : "96567.38",
      "askQuantity" : "1.545255"
    } ]
  }
}
```

**Request Parameter:** `spot@public.bookTicker.batch.v3.api.pb@<symbol>`

**Response Parameters:**

| Parameter   | Data Type | Description       |
| ----------- | --------- | ----------------- |
| bidprice    | string    | Best bid price    |
| bidquantity | string    | Best bid quantity |
| askprice    | string    | Best ask price    |
| askquantity | string    | Best ask quantity |
| symbol      | string    | Trading pair      |
| sendtime    | long      | Event time        |

---

## How to Properly Maintain a Local Copy of the Order Book

1.  Connect to the WebSocket and subscribe to
    `spot@public.aggre.depth.v3.api.pb@(100ms|10ms)@MXBTC` to obtain incremental
    aggregated depth information.
2.  Access the REST API
    `https://api.mexc.com/api/v3/depth?symbol=MXBTC&limit=1000` to obtain a
    depth snapshot with 1000 levels.
3.  The `fromVersion` of each new push message should be exactly equal to the
    `toVersion + 1` of the previous message. Otherwise, packet loss has
    occurred, and reinitialization from step 2 is required.
4.  The order quantity in each push message represents the absolute value of the
    current order quantity at that price level, not a relative change.
5.  If the `toVersion` in the push message is smaller than the `version` in the
    snapshot, the message is outdated and should be ignored.
6.  If the `fromVersion` in the push message is greater than the `version` in
    the snapshot, data is missing between the push message and the snapshot,
    requiring reinitialization from step 2.
7.  Now that the `version` in the snapshot falls within the
    `[fromVersion, toVersion]` range of the push message, the push message can
    be integrated with the snapshot data as follows:
    - If the price level in the push message already exists in the snapshot,
      update the quantity based on the push message.
    - If the price level in the push message does not exist in the snapshot,
      insert a new entry with the quantity from the push message.
    - If a price level in the push message has a quantity of 0, remove that
      price level from the snapshot.

**Note:** Since the depth snapshot has a limitation on the number of price
levels, price levels outside the initial snapshot that have not changed in
quantity will not appear in incremental push messages. Therefore, the local
order book may differ slightly from the real order book. However, for most use
cases, the 5000-depth limit is sufficient to effectively understand the market
and trading activity.

---
