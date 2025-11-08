# POST Account Trade List(v4) (SIGNED)

**Source:** [Account Trade List(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Account Trade List(v4) (SIGNED)

`Query all transaction records of the account`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/trades`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

 `curl    -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'    -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239845952,   "endTime":1682239850952,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/trades`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BTC\_USDT) |
| orderMode | String | No | Order mode  
\- `spot`\=spot trade  
\- `iso_margin`\=isolated margin trade |
| startTime | Long | No | Start time in milliseconds, (e.g. 1681701557927) |
| endTime | Long | No | End time in milliseconds, (e.g. 1681701557927) |
| limit | Int | No | Number of queries, allowed range \[1,200\], default 200 |
| recvWindow | Long | No | Trade time limit, allowed range (0,60000\], default: 5000 milliseconds |

##### Note

-   `symbol` is not filled in, all trading pairs will be searched by default
-   `orderMode` is not filled in, and all order modes are searched by default
-   `limit` is not filled, the default is 200, if it is filled, it cannot exceed 200
-   If the time range `startTime` and `endTime` are not filled in, the data of the last 7 days will be displayed by default.
-   When filling in the time range, `endTime` must be greater than the value of `startTime`.
-   If only `startTime` is filled in, query the historical records starting from this timestamp.
-   If only `endTime` is filled in, query the historical records starting from this timestamp.

#### Response Details

> Response

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "tradeId" : "125277182593091639",     "orderId" : "125213058731346053",     "clientOrderId" : "125213058731346053",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "stpMode": "cancel_maker",     "price" : "39999.00",     "size" : "0.10000",     "notional" : "3999.90000000",     "fee" : "9.99975000",     "feeCoinName" : "USDT",     "tradeRole" : "taker",     "createTime" : 1681891896569,     "updateTime" : 1681891896569   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.61.16819603026240455" }`

| Field | Type | Description |
| --- | --- | --- |
| tradeId | String | Trade id |
| orderId | String | Order ID |
| clientOrderId | String | User-defined ID |
| symbol | String | Trading pair (e.g. BTC\_USDT) |
| side | String | Order side  
\-`buy`\=buy  
\-`sell`\=sell |
| orderMode | String | Order mode  
\-`spot`\=spot  
\-`iso_margin`\=isolated margin |
| type | String | Order type  
\-`limit`\=limit order  
\-`market`\=market order  
\-`limit_maker`\=PostOnly order  
\-`ioc`\=IOC order |
| stpMode | String | Self transaction protection type  
\-`none`\=none  
\-`cancel_maker`\=cancel\_maker  
\-`cancel_taker`\=cancel\_taker  
\-`cancel_both`\=cancel\_both |
| price | String | Transaction price |
| size | String | Transaction quantity |
| notional | String | Transaction amount |
| fee | String | Fee amount |
| feeCoinName | String | Fee coin name |
| tradeRole | String | Trade role  
\-`taker`\=Take orders, take the initiative to deal  
\-`maker`\=Pending order, passive transaction |
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 |
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 |