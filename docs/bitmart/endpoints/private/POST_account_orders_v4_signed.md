# POST Account Orders(v4) (SIGNED)

**Source:**
[Account Orders(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Account Orders(v4) (SIGNED)

`Query the account history order list, only including state=[filled, canceled, partially_canceled] orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/history-orders`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239502394,   "endTime":1682239507394,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/history-orders`

| Field     | Type   | Required? | Description                  |
| --------- | ------ | --------- | ---------------------------- |
| symbol    | String | No        | Trading pair (e.g. BTC_USDT) |
| orderMode | String | No        | Order mode                   |

\- `spot`\=spot trade  
\- `iso_margin`\=isolated margin trade | | startTime | Long | No | Start time in
milliseconds, (e.g. 1681701557927) | | endTime | Long | No | End time in
milliseconds, (e.g. 1681701557927) | | limit | Int | No | Number of queries,
allowed range \[1,200\], default 200 | | recvWindow | Long | No | Trade time
limit, allowed range (0,60000\], default: 5000 milliseconds |

##### Note

- `symbol` is not filled in, all trading pairs will be searched by default
- `orderMode` is not filled in, and all order modes are searched by default
- `limit` is not filled, the default is 200, if it is filled, it cannot exceed
  200
- If the time range `startTime` and `endTime` are not filled in, the data of the
  last 7 days will be displayed by default.
- When filling in the time range, `endTime` must be greater than the value of
  `startTime`.
- If only `startTime` is filled in, query the historical records starting from
  this timestamp.
- If only `endTime` is filled in, query the historical records starting from
  this timestamp.

#### Response Details

> Response

```json
{
  "code": 1000,
  "message": "success",
  "data": [
    {
      "orderId": "118100034543076010",
      "clientOrderId": "118100034543076010",
      "symbol": "BTC_USDT",
      "side": "buy",
      "orderMode": "spot",
      "type": "limit",
      "state": "filled",
      "cancelSource": "",
      "stpMode": "cancel_maker",
      "price": "48800.00",
      "priceAvg": "39999.00",
      "size": "0.10000",
      "filledSize": "0.10000",
      "notional": "4880.00000000",
      "filledNotional": "3999.90000000",
      "createTime": 1681701557927,
      "updateTime": 1681701559408
    }
  ],
  "trace": "acc282ba9e434cc1a90bf6326de9e119.64.16818913787390001"
}
```

| Field         | Type   | Description                  |
| ------------- | ------ | ---------------------------- |
| orderId       | String | Order ID                     |
| clientOrderId | String | User-defined ID              |
| symbol        | String | Trading pair (e.g. BTC_USDT) |
| side          | String | Order side                   |

\-`buy`\=buy  
\-`sell`\=sell | | orderMode | String | Order mode  
\-`spot`\=spot  
\-`iso_margin`\=isolated margin | | type | String | Order type  
\-`limit`\=limit order  
\-`market`\=market order  
\-`limit_maker`\=PostOnly order  
\-`ioc`\=IOC order | | state | String | Order status  
\-`filled`\=The order has been completed.  
\-`canceled`\=The order has been canceled.  
\-`partially_canceled`\=A part of the order has been filled , and the order has
been canceled. | | cancelSource | String | Order cancellation reason(Return
value only if the order state is **canceled** or **partially_canceled**,
otherwise it will return an empty string)  
\-`user`\=User manually canceled.  
\-`system`\=System automatically canceled.  
\-`stp`\=Stp Cancelled. | | stpMode | String | Self transaction protection
type  
\-`none`\=none  
\-`cancel_maker`\=cancel_maker  
\-`cancel_taker`\=cancel_taker  
\-`cancel_both`\=cancel_both | | price | String | Order price | | priceAvg |
String | Average execution price of the order | | size | String | Order quantity
| | filledSize | String | Actual execution quantity | | notional | String |
Order amount | | filledNotional | String | Actual execution amount | |
createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 | |
updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 |
