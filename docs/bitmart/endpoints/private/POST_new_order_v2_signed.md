# POST New Order(v2) (SIGNED)

**Source:** [New Order(v2) (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## New Order(v2) (SIGNED)

`Send in a new order.`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v2/submit_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "side":"buy",     "type":"limit",     "size":"10",     "price":"7000"     "stpMode":"none" }' https://api-cloud.bitmart.com/spot/v2/submit_order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC\_USDT) |
| side | String | Yes | Side  
\-`buy`\=Buy order  
\-`sell`\=Sell order |
| type | String | Yes | Order type  
\-`limit`\=Limit order  
\-`market`\=Market order  
\-`limit_maker`\=PostOnly order  
\-`ioc`\=IOC order |
| client\_order\_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) |
| stpMode | String | No | Self transaction protection type(default:none)  
\-`none`  
\-`cancel_maker`  
\-`cancel_taker`  
\-`cancel_both` |

#### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit\_maker/ioc)

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

-   When "order price" <= "market highest bid price", after the order is submitted, the order will be canceled by the system
    
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

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "order_id":"1223181"   } }`

| Field | Type | Description |
| --- | --- | --- |
| order\_id | String | Order ID |

The request is successful only when order\_id is returned.