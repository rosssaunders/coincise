# GET 【Public】Depth-All Channel

**Source:** [【Public】Depth-All Channel](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## 【Public】Depth-All Channel

Return depth data, each push is the full data

### Pushing Rules

1.  No user login required
2.  After subscribing, then the changes will be pushed

### Request

> Request

```json
{
  "action": "subscribe",
  "args": [
    "futures/depthAll20:BTCUSDT@200ms"
  ]
}
```

Message Format:

```json
{
  "action": "subscribe",
  "args": [
    "<channel:symbol><@speed>"
  ]
}
```

-   channel: Channel name, such as`futures/depthAll20`
-   symbol: Trading pair, such as`BTCUSDT`
-   speed: Update speed, support `200ms` or `100ms`

Parameters Channel Name List

| Channel Name | Description |
| --- | --- |
| futures/depthAll5 | 5 Level Depth Channel |
| futures/depthAll20 | 20 Level Depth Channel |
| futures/depthAll50 | 50 Level Depth Channel |

### Response

> Response

```json
{
  "data": {
    "symbol": "BTCUSDT",
    "asks": [
      {
        "price": "70294.4",
        "vol": "455"
      }
    ],
    "bids": [
      {
        "price": "70293.9",
        "vol": "1856"
      }
    ],
    "ms_t": 1730399750402
  },
  "group": "futures/depthAll20:BTCUSDT@200ms"
}
```

Return data description:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract（like `BTCUSDT`） |
| asks | List | Asks Depth Array |
| bids | List | Bids Depth Array |
| ms\_t | Long | Data push timestamp (in millisecond) |

**Instruction** Description of the `asks` `bids` details field:

| Field | Type | Description |
| --- | --- | --- |
| price | String | price |
| vol | String | volume |

An example of the array of depths values: {"price":"20159.6","vol":"7284"}. price field is the price, and vol field is the quantity.

* * *