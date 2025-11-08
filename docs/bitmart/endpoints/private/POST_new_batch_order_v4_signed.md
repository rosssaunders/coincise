# POST New Batch Order(v4) (SIGNED)

**Source:** [New Batch Order(v4) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## New Batch Order(v4) (SIGNED)

`Batch order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/batch_orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "orderParams":[{           "clientOrderId":"123456789",           "size":"0.1",           "price":"8800",           "side":"buy",           "type":"limit"           "stpMode":"none"     }],     "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/batch_orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC\_USDT) |
| orderParams | List | Yes | Order parameters, the number of transactions cannot exceed 10 |
| recvWindow | Long | No | Trade time limit, allowed range (0,60000\], default: 5000 milliseconds |

#### orderParams

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| side | String | Yes | Side  
\-`buy`\=Buy order  
\-`sell`\=Sell order |
| type | String | Yes | Order type  
\-`limit`\=Limit order  
\-`market`\=Market order  
\-`limit_maker`\=PostOnly order  
\-`ioc`\=IOC order |
| clientOrderId | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) |
| stpMode | String | No | Self transaction protection type(default:none)  
\-`none`  
\-`cancel_maker`  
\-`cancel_taker`  
\-`cancel_both` |

###### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit\_maker/ioc)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Order size |
| price | String | Yes | Price |

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| notional | String | Yes | Required for placing orders by amount |

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Required for placing orders by quantity |

**Instruction**

Buy-limit-maker

-   When "order price">="market lowest selling price", the order will be canceled by the system
    
-   When the "order price" <"the lowest selling price in the market", the order will be accepted by the system after the submission is successful
    
-   When "order price"\*"order size"<minimum deal amount in the market, the order will be canceled by the system
    

Sell-limit-maker

-   When "order price" <= "market highest bid price", the order will be canceled by the system
    
-   When "order price"> "market highest bid price", the order will be accepted by the system after the submission is successful
    
-   When "order price"\*"order size"<minimum deal amount in the market, the order will be canceled by the system
    

Buy-ioc,Sell-ioc

-   After the order is placed, all orders that cannot be filled immediately are cancelled immediately

Self trade prevention (STP)

The trading platform imposes self trade prevention at account level. The default STP mode is none. Users can also utilize the stpMode request parameter of the placing order endpoint to determine the stpMode of a certain order.Self trade prevention will not lead to latency.

-   Orders placed via OpenAPI: If both sides of the matched trade are orders submitted through OpenAPI, the system will execute based on the stpMode configuration of the Taker order.
-   Mixed orders: If one side of the matched trade is an OpenAPI order and the other is a Web/App order, the handling will be determined by the stpMode setting of the OpenAPI order.

There are three STP modes.

1.  Cancel Maker: Which cancels the maker order to prevent self-trading. Then, the taker order continues to match with the next order based on the order book priority.
2.  Cancel Taker: The taker order is canceled to prevent self-trading. If the user's own maker order is lower in the order book priority, the taker order is partially filled and then canceled. FOK orders are always honored and canceled if they would result in self-trading.
3.  Cancel Both: Both taker and maker orders are canceled to prevent self-trading. If the user's own maker order is lower in the order book priority, the taker order is partially filled. Then, the remaining quantity of the taker order and the first maker order are canceled. FOK orders are not supported in this mode.

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "5fc697fb817a4b5396284786a9b2609a.263.17022620476480263",   "data": {     "code": 0,     "msg": "success",     "data": {       "orderIds": [         "212751308355553320"       ]     }   } }`

| Field | Type | Description |
| --- | --- | --- |
| orderIds | List | Order ID |

The request is successful only when orderIds is returned.