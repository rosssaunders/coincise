# GET 【Public】Depth Channel

**Source:** [【Public】Depth Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Depth Channel

Get depth data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

`{   "action":"subscribe",   "args":["futures/depth20:BTCUSDT@200ms"] }`

Message Format:

`{"action":"subscribe","args":["<channel:symbol><@speed>"]}`

-   actions: `subscribe`
-   channel: Channel name, such as `futures/depth20`
-   symbol: Trading pair, such as `BTCUSDT`
-   speed: Update speed, support `200ms` or `100ms`

#### Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/depth5 | 5 Level Depth Channel |
| futures/depth20 | 20 Level Depth Channel |
| futures/depth50 | 50 Level Depth Channel |

### Response

> Response

`{     "group":"futures/depth20:BTCUSDT@200ms",     "data":{             "symbol":"BTCUSDT",             "way":1,             "depths":[               {"price":"5","vol":"97"}             ],             "ms_t": 1542337219120         } }`

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract(like `BTCUSDT`) |
| way | Long | Trading side  
\-`1`\=bid  
\-`2`\=ask |
| depths | List | Array of depth details |
| ms\_t | Long | Data push timestamp (in millisecond) |

**Instruction**

Description of the `depths` details field:

| Field | Type | Description |
| --- | --- | --- |
| price | String | price |
| vol | String | volume |

An example of the array of depths values: {"price":"20159.6","vol":"7284"}. price field is the price, and vol field is the quantity.

* * *