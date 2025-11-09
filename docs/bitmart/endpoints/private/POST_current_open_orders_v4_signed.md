# POST Current Open Orders(v4) (SIGNED)

**Source:**
[Current Open Orders(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Current Open Orders(v4) (SIGNED)

`Query the current opening order list of the account, only including state=[new, partially_filled] orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/open-orders`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239652931,   "endTime":1682239657931,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/open-orders`

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

- For high-volume trades, it is strongly recommended that users maintain their
  own current order list and use websocket to update the order status. You
  should pull the current order list once before each transaction.
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

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "orderId" : "125213058731346056",     "clientOrderId" : "125213058731346056",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "new",     "cancelSource" : "",     "stpMode": "cancel_maker",     "price" : "800.00",     "priceAvg" : "0.00",     "size" : "0.10000",     "filledSize" : "0.00000",     "notional" : "80.00000000",     "filledNotional" : "0.00000000",     "createTime" : 1681892198608,     "updateTime" : 1681892198946   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.60.16818922069220005" }`

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
\-`new`\=The order has been accepted by the engine.  
\-`partially_filled`\=a part of the order has been filled. | | cancelSource |
String | Order cancellation reason(Return value only if the order state is
**canceled** or **partially_canceled**, otherwise it will return an empty
string)  
\-`user`\=User manually canceled.  
\-`system`\=System automatically canceled. | | stpMode | String
| 自成交保护类型  
\-`none`\=不使用  
\-`cancel_maker`\=撤销maker  
\-`cancel_taker`\=撤销taker  
\-`cancel_both`\=全部撤销 | | price | String | Order price | | priceAvg | String
| Average execution price of the order | | size | String | Order quantity | |
filledSize | String | Actual execution quantity | | notional | String | Order
amount | | filledNotional | String | Actual execution amount | | createTime |
Long | Order creation time in milliseconds, e.g. 1681701557927 | | updateTime |
Long | Last update time in milliseconds, e.g. 1681701557927 |
