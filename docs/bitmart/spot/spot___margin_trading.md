# Spot / Margin Trading

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
| symbol | String | Yes | Trading pair (e.g. BTC_USDT) 
| side | String | Yes | Side<br>-<code>buy</code>=Buy order<br>-<code>sell</code>=Sell order 
| type | String | Yes | Order type<br>-<code>limit</code>=Limit order<br>-<code>market</code>=Market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| client_order_id | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) 
| stpMode | String | No | Self transaction protection type(default:none)<br>-<code>none</code><br>-<code>cancel_maker</code><br>-<code>cancel_taker</code><br>-<code>cancel_both</code> 

#### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit\_maker/ioc)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Order size 
| price | String | Yes | Price 

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| notional | String | Yes | Required for placing orders by amount 

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Required for placing orders by quantity 

**Instruction**

Buy-limit-maker

*   When "order price">="market lowest selling price", the order will be canceled by the system
    
*   When the "order price" <"the lowest selling price in the market", the order will be accepted by the system after the submission is successful
    
*   When "order price"\*"order size"<minimum deal amount in the market, the order will be canceled by the system
    

Sell-limit-maker

*   When "order price" <= "market highest bid price", after the order is submitted, the order will be canceled by the system
    
*   When "order price"> "market highest bid price", the order will be accepted by the system after the submission is successful
    
*   When "order price"\*"order size"<minimum deal amount in the market, the order will be canceled by the system
    

Buy-ioc,Sell-ioc

*   After the order is placed, all orders that cannot be filled immediately are cancelled immediately

Self trade prevention (STP)

The trading platform imposes self trade prevention at account level. The default STP mode is none. Users can also utilize the stpMode request parameter of the placing order endpoint to determine the stpMode of a certain order.Self trade prevention will not lead to latency.

*   Orders placed via OpenAPI: If both sides of the matched trade are orders submitted through OpenAPI, the system will execute based on the stpMode configuration of the Taker order.
*   Mixed orders: If one side of the matched trade is an OpenAPI order and the other is a Web/App order, the handling will be determined by the stpMode setting of the OpenAPI order.

There are three STP modes.

1.  Cancel Maker: Which cancels the maker order to prevent self-trading. Then, the taker order continues to match with the next order based on the order book priority.
2.  Cancel Taker: The taker order is canceled to prevent self-trading. If the user's own maker order is lower in the order book priority, the taker order is partially filled and then canceled. FOK orders are always honored and canceled if they would result in self-trading.
3.  Cancel Both: Both taker and maker orders are canceled to prevent self-trading. If the user's own maker order is lower in the order book priority, the taker order is partially filled. Then, the remaining quantity of the taker order and the first maker order are canceled. FOK orders are not supported in this mode.

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "order_id":"1223181"   } }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | String | Order ID 

The request is successful only when order\_id is returned.

## Cancel Order(v3) (SIGNED)

`Applicable to the cancellation of a specified unfinished order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v3/cancel_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol": "BTC_USDT",     "order_id": "112121212" }' https://api-cloud.bitmart.com/spot/v3/cancel_order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 
| order_id | String | order_id, client_order_id, one of them is required | Order ID 
| client_order_id | String | order_id, client_order_id, one of them is required | Client-defined Order ID 

In each request, you must select one of the parameters order\_id and client\_order\_id to submit

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "result": true   } }`

| Field | Type | Description |
| --- | --- | --- |
| result | Boolean | Cancel result<br>-<code>true</code>=Cancel successfully<br>-<code>false</code>=Cancel failed 

\`result\` = 'true' indicates successful cancel; \`result\` = 'false' indicates that the cancel failed because the order was matched or cancelled.

## New Batch Order(v4) (SIGNED)

`Batch order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/batch_orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "orderParams":[{           "clientOrderId":"123456789",           "size":"0.1",           "price":"8800",           "side":"buy",           "type":"limit"           "stpMode":"none"     }],     "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/batch_orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC_USDT) 
| orderParams | List | Yes | Order parameters, the number of transactions cannot exceed 10 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

#### orderParams

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| side | String | Yes | Side<br>-<code>buy</code>=Buy order<br>-<code>sell</code>=Sell order 
| type | String | Yes | Order type<br>-<code>limit</code>=Limit order<br>-<code>market</code>=Market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| clientOrderId | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) 
| stpMode | String | No | Self transaction protection type(default:none)<br>-<code>none</code><br>-<code>cancel_maker</code><br>-<code>cancel_taker</code><br>-<code>cancel_both</code> 

###### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit\_maker/ioc)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Order size 
| price | String | Yes | Price 

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| notional | String | Yes | Required for placing orders by amount 

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Required for placing orders by quantity 

**Instruction**

Buy-limit-maker

*   When "order price">="market lowest selling price", the order will be canceled by the system
    
*   When the "order price" <"the lowest selling price in the market", the order will be accepted by the system after the submission is successful
    
*   When "order price"\*"order size"<minimum deal amount in the market, the order will be canceled by the system
    

Sell-limit-maker

*   When "order price" <= "market highest bid price", the order will be canceled by the system
    
*   When "order price"> "market highest bid price", the order will be accepted by the system after the submission is successful
    
*   When "order price"\*"order size"<minimum deal amount in the market, the order will be canceled by the system
    

Buy-ioc,Sell-ioc

*   After the order is placed, all orders that cannot be filled immediately are cancelled immediately

Self trade prevention (STP)

The trading platform imposes self trade prevention at account level. The default STP mode is none. Users can also utilize the stpMode request parameter of the placing order endpoint to determine the stpMode of a certain order.Self trade prevention will not lead to latency.

*   Orders placed via OpenAPI: If both sides of the matched trade are orders submitted through OpenAPI, the system will execute based on the stpMode configuration of the Taker order.
*   Mixed orders: If one side of the matched trade is an OpenAPI order and the other is a Web/App order, the handling will be determined by the stpMode setting of the OpenAPI order.

There are three STP modes.

1.  Cancel Maker: Which cancels the maker order to prevent self-trading. Then, the taker order continues to match with the next order based on the order book priority.
2.  Cancel Taker: The taker order is canceled to prevent self-trading. If the user's own maker order is lower in the order book priority, the taker order is partially filled and then canceled. FOK orders are always honored and canceled if they would result in self-trading.
3.  Cancel Both: Both taker and maker orders are canceled to prevent self-trading. If the user's own maker order is lower in the order book priority, the taker order is partially filled. Then, the remaining quantity of the taker order and the first maker order are canceled. FOK orders are not supported in this mode.

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "5fc697fb817a4b5396284786a9b2609a.263.17022620476480263",   "data": {     "code": 0,     "msg": "success",     "data": {       "orderIds": [         "212751308355553320"       ]     }   } }`

| Field | Type | Description |
| --- | --- | --- |
| orderIds | List | Order ID 

The request is successful only when orderIds is returned.

## Cancel Batch Order(v4) (SIGNED)

`Cancel all outstanding orders in the specified direction for the specified trading pair or cancel based on the order ID`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/cancel_orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderIds":[     "5e925f3981"   ],   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/cancel_orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC_USDT) 
| orderIds | List | orderIds, clientOrderIds, one of them is required | Order Id List (Limited to 10 ids) 
| clientOrderIds | List | orderIds, clientOrderIds, one of them is required | Client-defined OrderId List (Limited to 10 ids) 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

In each request, you must select one of the parameters orderIds and clientOrderIds to submit

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "c4edbce860164203954f7c3c81d60fc6.309.17022669632770001",   "data": {     "successIds": [       "213055379155243012"     ],     "failIds": [],     "totalCount": 1,     "successCount": 1,     "failedCount": 0   } }`

| Field | Type | Description |
| --- | --- | --- |
| successIds | List | Successfully canceled order IDs 
| failIds | List | Order IDs that failed to cancel 
| totalCount | Int | Number of submissions 
| successCount | Int | Number of successes 
| failedCount | Int | Number of failures 

## Cancel All Order(v4) (SIGNED)

`Cancel all orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/cancel_all`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "side":"buy" }' https://api-cloud.bitmart.com/spot/v4/cancel_all`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BTC_USDT) 
| side | String | No | Order side<br>-<code>buy</code><br>-<code>sell</code> 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code is equal to 1000, it means the cancellation is successful.

## New Margin Order(v1) (SIGNED)

`Applicable for margin order placement`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/submit_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "side":"buy",     "type":"limit",     "size":"10",     "price":"7000" }' https://api-cloud.bitmart.com/spot/v1/margin/submit_order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BTC_USDT) 
| side | String | Yes | Side<br>-<code>buy</code>=Buy order<br>-<code>sell</code>=Sell order 
| type | String | Yes | Order type<br>-<code>limit</code>=Limit order<br>-<code>market</code>=Market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| clientOrderId | String | No | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters) 

#### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit\_maker/ioc)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Order size 
| price | String | Yes | Price 

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| notional | String | Yes | Required for placing orders by amount 

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| size | String | Yes | Required for placing orders by quantity 

**Instruction**

Buy-limit-maker

*   When "order price">="market lowest selling price", the system will refuse to accept the order after the order is submitted
    
*   When the "order price" <"the lowest selling price in the market", the order will be canceled by the system
    

Sell-limit-maker

*   When "order price" <= "market highest bid price", after the order is submitted, the system will refuse to accept the order
    
*   When "order price"> "market highest bid price", the order will be canceled by the system
    

Buy-ioc,Sell-ioc

*   After the order is placed, all orders that cannot be filled immediately are cancelled immediately

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "order_id":1223181     } }`

| Field | Type | Description |
| --- | --- | --- |
| order_id | Long | Order ID 

The request is successful only when order\_id is returned.

## Query Order By Id (v4) (SIGNED)

`Query a single order by orderId`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/order`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "orderId":"118100034543076010",   "queryState":"open",   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/order`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| orderId | String | Yes | Order id 
| queryState | String | No | Query Type<br>- <code>open</code>=Query order state [new, partially_filled]<br>- <code>history</code>=QUery order state [filled, canceled, partially_canceled]) 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   If `queryState` is not filled in, all types of orders will be queried. If you know the order status, it is recommended to fill in, so that the query speed will be faster.  
    
*   API transaction is not completed and the order is cancelled, the query time is within 20 minutes.  
    

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "stpMode": "cancel_maker",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000",     "filledNotional" : "3999.90000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   },   "trace" : "8aab576e50024648ae45e3cfaf90f9cf.60.16817015721880197" }`

| Field | Type | Description |
| --- | --- | --- |
| orderId | String | Order ID 
| clientOrderId | String | User-defined ID 
| symbol | String | Trading pair (e.g. BTC_USDT) 
| side | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell 
| orderMode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin 
| type | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| state | String | Order status<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=A part of the order has been filled.<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. 
| cancelSource | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled.<br>-<code>stp</code>=Stp Cancelled. 
| stpMode | String | Self transaction protection type<br>-<code>none</code>=none<br>-<code>cancel_maker</code>=cancel_maker<br>-<code>cancel_taker</code>=cancel_taker<br>-<code>cancel_both</code>=cancel_both 
| price | String | Order price 
| priceAvg | String | Average execution price of the order 
| size | String | Order quantity 
| filledSize | String | Actual execution quantity 
| notional | String | Order amount 
| filledNotional | String | Actual execution amount 
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 

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
| clientOrderId | String | Yes | User-defined order id 
| queryState | String | No | Query Type<br>- <code>open</code>=Query order state [new, partially_filled]<br>- <code>history</code>=Query order state [filled, canceled, partially_canceled]) 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   If `queryState` is not filled in, all types of orders will be queried. If you know the order status, it is recommended to fill in, so that the query speed will be faster.  
    
*   API transaction is not completed and the order is cancelled, the query time is within 20 minutes.  
    

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "stpMode": "cancel_maker",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000",     "filledNotional" : "3999.90000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   },   "trace" : "8aab576e50024648ae45e3cfaf90f9cf.60.16817015721880197" }`

| Field | Type | Description |
| --- | --- | --- |
| orderId | String | Order ID 
| clientOrderId | String | User-defined ID 
| symbol | String | Trading pair (e.g. BTC_USDT) 
| side | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell 
| orderMode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin 
| type | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| state | String | Order status<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=A part of the order has been filled.<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. 
| cancelSource | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled.<br>-<code>stp</code>=Stp Cancelled. 
| stpMode | String | Self transaction protection type<br>-<code>none</code>=none<br>-<code>cancel_maker</code>=cancel_maker<br>-<code>cancel_taker</code>=cancel_taker<br>-<code>cancel_both</code>=cancel_both 
| price | String | Order price 
| priceAvg | String | Average execution price of the order 
| size | String | Order quantity 
| filledSize | String | Actual execution quantity 
| notional | String | Order amount 
| filledNotional | String | Actual execution amount 
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 

## Current Open Orders(v4) (SIGNED)

`Query the current opening order list of the account, only including state=[new, partially_filled] orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/open-orders`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239652931,   "endTime":1682239657931,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/open-orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BTC_USDT) 
| orderMode | String | No | Order mode<br>- <code>spot</code>=spot trade<br>- <code>iso_margin</code>=isolated margin trade 
| startTime | Long | No | Start time in milliseconds, (e.g. 1681701557927) 
| endTime | Long | No | End time in milliseconds, (e.g. 1681701557927) 
| limit | Int | No | Number of queries, allowed range [1,200], default 200 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   For high-volume trades, it is strongly recommended that users maintain their own current order list and use websocket to update the order status. You should pull the current order list once before each transaction.
*   `symbol` is not filled in, all trading pairs will be searched by default
*   `orderMode` is not filled in, and all order modes are searched by default
*   `limit` is not filled, the default is 200, if it is filled, it cannot exceed 200
*   If the time range `startTime` and `endTime` are not filled in, the data of the last 7 days will be displayed by default.
*   When filling in the time range, `endTime` must be greater than the value of `startTime`.
*   If only `startTime` is filled in, query the historical records starting from this timestamp.
*   If only `endTime` is filled in, query the historical records starting from this timestamp.

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "orderId" : "125213058731346056",     "clientOrderId" : "125213058731346056",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "new",     "cancelSource" : "",     "stpMode": "cancel_maker",     "price" : "800.00",     "priceAvg" : "0.00",     "size" : "0.10000",     "filledSize" : "0.00000",     "notional" : "80.00000000",     "filledNotional" : "0.00000000",     "createTime" : 1681892198608,     "updateTime" : 1681892198946   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.60.16818922069220005" }`

| Field | Type | Description |
| --- | --- | --- |
| orderId | String | Order ID 
| clientOrderId | String | User-defined ID 
| symbol | String | Trading pair (e.g. BTC_USDT) 
| side | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell 
| orderMode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin 
| type | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| state | String | Order status<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=a part of the order has been filled. 
| cancelSource | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled.<br>-<code>stp</code>=Stp Cancelled. 
| stpMode | String | Self transaction protection type<br>-<code>none</code>=none<br>-<code>cancel_maker</code>=cancel_maker<br>-<code>cancel_taker</code>=cancel_taker<br>-<code>cancel_both</code>=cancel_both 
| price | String | Order price 
| priceAvg | String | Average execution price of the order 
| size | String | Order quantity 
| filledSize | String | Actual execution quantity 
| notional | String | Order amount 
| filledNotional | String | Actual execution amount 
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 

## Account Orders(v4) (SIGNED)

`Query the account history order list, only including state=[filled, canceled, partially_canceled] orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/history-orders`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239502394,   "endTime":1682239507394,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/history-orders`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BTC_USDT) 
| orderMode | String | No | Order mode<br>- <code>spot</code>=spot trade<br>- <code>iso_margin</code>=isolated margin trade 
| startTime | Long | No | Start time in milliseconds, (e.g. 1681701557927) 
| endTime | Long | No | End time in milliseconds, (e.g. 1681701557927) 
| limit | Int | No | Number of queries, allowed range [1,200], default 200 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   `symbol` is not filled in, all trading pairs will be searched by default
*   `orderMode` is not filled in, and all order modes are searched by default
*   `limit` is not filled, the default is 200, if it is filled, it cannot exceed 200
*   If the time range `startTime` and `endTime` are not filled in, the data of the last 7 days will be displayed by default.
*   When filling in the time range, `endTime` must be greater than the value of `startTime`.
*   If only `startTime` is filled in, query the historical records starting from this timestamp.
*   If only `endTime` is filled in, query the historical records starting from this timestamp.

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "stpMode": "cancel_maker",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000000",     "filledNotional" : "3999.90000000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   } ],   "trace" : "acc282ba9e434cc1a90bf6326de9e119.64.16818913787390001" }`

| Field | Type | Description |
| --- | --- | --- |
| orderId | String | Order ID 
| clientOrderId | String | User-defined ID 
| symbol | String | Trading pair (e.g. BTC_USDT) 
| side | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell 
| orderMode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin 
| type | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| state | String | Order status<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. 
| cancelSource | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled.<br>-<code>stp</code>=Stp Cancelled. 
| stpMode | String | Self transaction protection type<br>-<code>none</code>=none<br>-<code>cancel_maker</code>=cancel_maker<br>-<code>cancel_taker</code>=cancel_taker<br>-<code>cancel_both</code>=cancel_both 
| price | String | Order price 
| priceAvg | String | Average execution price of the order 
| size | String | Order quantity 
| filledSize | String | Actual execution quantity 
| notional | String | Order amount 
| filledNotional | String | Actual execution amount 
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 

## Account Trade List(v4) (SIGNED)

`Query all transaction records of the account`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/trades`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

 `curl    -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'    -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239845952,   "endTime":1682239850952,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/trades`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Trading pair (e.g. BTC_USDT) 
| orderMode | String | No | Order mode<br>- <code>spot</code>=spot trade<br>- <code>iso_margin</code>=isolated margin trade 
| startTime | Long | No | Start time in milliseconds, (e.g. 1681701557927) 
| endTime | Long | No | End time in milliseconds, (e.g. 1681701557927) 
| limit | Int | No | Number of queries, allowed range [1,200], default 200 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   `symbol` is not filled in, all trading pairs will be searched by default
*   `orderMode` is not filled in, and all order modes are searched by default
*   `limit` is not filled, the default is 200, if it is filled, it cannot exceed 200
*   If the time range `startTime` and `endTime` are not filled in, the data of the last 7 days will be displayed by default.
*   When filling in the time range, `endTime` must be greater than the value of `startTime`.
*   If only `startTime` is filled in, query the historical records starting from this timestamp.
*   If only `endTime` is filled in, query the historical records starting from this timestamp.

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "tradeId" : "125277182593091639",     "orderId" : "125213058731346053",     "clientOrderId" : "125213058731346053",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "stpMode": "cancel_maker",     "price" : "39999.00",     "size" : "0.10000",     "notional" : "3999.90000000",     "fee" : "9.99975000",     "feeCoinName" : "USDT",     "tradeRole" : "taker",     "createTime" : 1681891896569,     "updateTime" : 1681891896569   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.61.16819603026240455" }`

| Field | Type | Description |
| --- | --- | --- |
| tradeId | String | Trade id 
| orderId | String | Order ID 
| clientOrderId | String | User-defined ID 
| symbol | String | Trading pair (e.g. BTC_USDT) 
| side | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell 
| orderMode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin 
| type | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| stpMode | String | Self transaction protection type<br>-<code>none</code>=none<br>-<code>cancel_maker</code>=cancel_maker<br>-<code>cancel_taker</code>=cancel_taker<br>-<code>cancel_both</code>=cancel_both 
| price | String | Transaction price 
| size | String | Transaction quantity 
| notional | String | Transaction amount 
| fee | String | Fee amount 
| feeCoinName | String | Fee coin name 
| tradeRole | String | Trade role<br>-<code>taker</code>=Take orders, take the initiative to deal<br>-<code>maker</code>=Pending order, passive transaction 
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927 

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
| orderId | String | Yes | Order id 
| recvWindow | Long | No | Trade time limit, allowed range (0,60000], default: 5000 milliseconds 

##### Note

*   `orderId` OrderID is required and cannot be empty

#### Response Details

> Response

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "tradeId" : "122177405911172002",     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "stpMode": "cancel_maker",     "price" : "39999.00",     "size" : "0.10000",     "notional" : "3999.90000000",     "fee" : "9.99975000",     "feeCoinName" : "USDT",     "tradeRole" : "taker",     "createTime" : 1681701559210,     "updateTime" : 1681701559210   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.62.16818934219090007" }`

| Field | Type | Description |
| --- | --- | --- |
| tradeId | String | Trade id 
| orderId | String | Order ID 
| clientOrderId | String | User-defined ID 
| symbol | String | Trading pair (e.g. BTC_USDT) 
| side | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell 
| orderMode | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin 
| type | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order 
| stpMode | String | Self transaction protection type<br>-<code>none</code>=none<br>-<code>cancel_maker</code>=cancel_maker<br>-<code>cancel_taker</code>=cancel_taker<br>-<code>cancel_both</code>=cancel_both 
| price | String | Transaction price 
| size | String | Transaction quantity 
| notional | String | Transaction amount 
| fee | String | Fee amount 
| feeCoinName | String | Fee coin name 
| tradeRole | String | Trade role<br>-<code>taker</code>=Take orders, take the initiative to deal<br>-<code>maker</code>=Pending order, passive transaction 
| createTime | Long | Order creation time in milliseconds, e.g. 1681701557927 
| updateTime | Long | Last update time in milliseconds, e.g. 1681701557927
