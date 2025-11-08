# POST Query Order By clientOrderId(v4) (SIGNED)

**Source:** [Query Order By clientOrderId(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Query Order By clientOrderId(v4) (SIGNED)

`Query a single order by clientOrderId.`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/client-order`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "clientOrderId":"118100034543076010",   "queryState":"open",   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/client-order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| clientOrderId | String | Yes | User-defined order id |
| queryState | String | No | Query Type  
\- `open`\=Query order state \[new, partially\_filled\]  
\- `history`\=Query order state \[filled, canceled, partially\_canceled\]) |
| recvWindow | Long | No | Trade time limit, allowed range (0,60000\], default: 5000 milliseconds |

##### Note

-   If `queryState` is not filled in, all types of orders will be queried. If you know the order status, it is recommended to fill in, so that the query speed will be faster.  
    
-   API transaction is not completed and the order is cancelled, the query time is within 20 minutes.  
    

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "stpMode": "cancel_maker",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000",     "filledNotional" : "3999.90000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   },   "trace" : "8aab576e50024648ae45e3cfaf90f9cf.60.16817015721880197" }`

| Field | Type | Description |
| --- | --- | --- |
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
| state | String | Order status  
\-`new`\=The order has been accepted by the engine.  
\-`partially_filled`\=A part of the order has been filled.  
\-`filled`\=The order has been completed.  
\-`canceled`\=The order has been canceled.  
\-`partially_canceled`\=A part of the order has been filled , and the order has been canceled. |
| cancelSource | String | Order cancellation reason(Return value only if the order state is **canceled** or **partially\_canceled**, otherwise it will return an empty string)  
\-`user`\=User manually canceled.  
\-`system`\=System automatically canceled.  
\-`stp`\=Stp Cancelled. |
| stpMode | String | Self transaction protection type  
\-`none`\=none  
\-`cancel_maker`\=cancel\_maker  
\-`cancel_taker`\=cancel\_taker  
\-`cancel_both`\=cancel\_both |
| price | String | Order price |
| priceAvg | String | Average execution price of the order |
| size | String | Order quantity |
| filledSize | String | Actual execution quantity |
| notional | String | Order amount |
| filledNotional | String | Actual execution amount |
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 |
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 |