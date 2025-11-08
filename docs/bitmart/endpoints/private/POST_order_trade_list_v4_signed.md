# POST Order Trade List(v4) (SIGNED)

**Source:** [Order Trade List(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Order Trade List(v4) (SIGNED)

`Query all transaction records of a single order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/order-trades`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

 `curl    -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'    -X POST -d '{   "orderId":"118100034543076010",   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/order-trades`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| orderId | String | Yes | Order id |
| recvWindow | Long | No | Trade time limit, allowed range (0,60000\], default: 5000 milliseconds |

##### Note

-   `orderId` OrderID is required and cannot be empty

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "tradeId" : "122177405911172002",     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "stpMode": "cancel_maker",     "price" : "39999.00",     "size" : "0.10000",     "notional" : "3999.90000000",     "fee" : "9.99975000",     "feeCoinName" : "USDT",     "tradeRole" : "taker",     "createTime" : 1681701559210,     "updateTime" : 1681701559210   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.62.16818934219090007" }`

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