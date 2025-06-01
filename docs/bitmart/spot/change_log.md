# Change Log

#### 2025-05-29

###### Websocket Stream

*   \[Update\] `[Private] Order Progress` channel
    *   Feat：Add new response field **deal\_fee\_coin\_name** :Fee coin name

* * *

#### 2025-05-15

###### REST API

*   \[Update\] `/account/v1/wallet` Get Account Balance (KEYED)
    *   Feat：Add new response field **unAvailable** : Trading frozen Balance + Other frozen Balance

* * *

#### 2025-04-17

###### REST API

*   \[Update\] `/spot/v4/query/order` Query Order By Id (v4) (SIGNED)
    *   Feat：Add new response field **cancelSource** : Indicate the reason for cancel order
*   \[Update\] `/spot/v4/query/client-order` Query Order By clientOrderId(v4) (SIGNED)
    *   Feat：Add new response field **cancelSource** : Indicate the reasons for cancel order
*   \[Update\] `/spot/v4/query/history-orders` Account Orders(v4) (SIGNED)
    *   Feat：Add new response field **cancelSource** : Indicate the reasons for cancel order

* * *

#### 2025-02-18

###### REST API

*   \[Update\] `/account/v2/deposit-withdraw/history` Get Deposit And Withdraw History (KEYED)
    *   Feat：Support querying by time range, with the maximum number of results adjusted from 100 to 1000.
*   \[Update\] `/account/v1/wallet` Get Account Balance (KEYED)
    *   Feat：Add a field for the USD valuation of available balance: **available\_usd\_valuation**.
*   \[Update\] `/account/v1/currencies` Get Currencies
    *   Feat：Support querying for a single currency or multiple currencies.
    *   Feat：Add new response field for withdrawal fee: **withdraw\_fee** and new response field for withdrawal fee estimate: **withdraw\_fee\_estimate**. After 2015-05-18 remove the response field: **withdraw\_minfee**.

* * *

#### 2025-02-11

###### REST API

*   \[New\] `/account/v1/withdraw/address/list` Query Withdraw Address List (KEYED)
    *   Feat：Supports querying withdrawal addresses list

* * *

#### 2025-01-01

###### REST API

*   【Endpoint Removed】After 2024-06-30, BitMart will stop providing the following endpoints:

| Remove Endpoint | Remove Endpoint Describe | Replace Endpoint |
| --- | --- | --- |
| /spot/v1/submit_order | New Order(v1) | /spot/v2/submit_order 
| /spot/v1/batch_orders<br>/spot/v2/batch_orders | New Batch Order(v1)<br>New Batch Order(v2) | /spot/v4/batch_orders 
| /spot/v1/cancel_order<br>/spot/v2/cancel_order | Cancel Order(v1)<br>Cancel Order(v2) | /spot/v3/cancel_order 
| /spot/v1/cancel_orders | Cancel Batch Order(v1) | /spot/v4/cancel_orders<br>/spot/v4/cancel_all 
| /spot/v2/order_detail | Query Order(v2) | /spot/v4/query/order 
| /spot/v3/orders | Account Orders(v3) | /spot/v4/query/open-orders 
| /spot/v2/trades | Account Trade List(v2) | /spot/v4/query/trades 
| /spot/v1/ticker<br>/spot/v2/ticker | Get Ticker of All Pairs (V1)<br>Get Ticker of All Pairs (V2) | /spot/quotation/v3/tickers 
| /spot/v1/ticker_detail | Get Ticker of a Trading Pair (V1) | /spot/quotation/v3/ticker 
| /spot/v1/steps | Get K-Line Step (V1) | Fixed enumeration value, no need for endpoint query 
| /spot/v1/symbols/kline | Get K-Line (V1) | /spot/quotation/v3/lite-klines<br>/spot/quotation/v3/klines 
| /spot/v1/symbols/book | Get Depth (V1) | /spot/quotation/v3/books 
| /spot/v1/symbols/trades | Get Recent Trades (V1) | /spot/quotation/v3/trades 

* * *

#### 2024-11-11

###### REST API

*   \[Update\] `/spot/v1/margin/submit_order` New Margin Order(v1) (SIGNED)
    *   Optimize：The rate limit 1 times/1s based on API Key changes to 20 times/1s based on UID

* * *

#### 2024-10-21

###### REST API

*   \[Update\] `/spot/v4/cancel_orders` Cancel Batch Order(v4) (SIGNED)
    *   Optimize：The maximum number of **orderIds** in the request parameter is 10.
    *   Optimize：The maximum number of **clientOrderIds** in the request parameter is 10.

* * *

#### 2024-10-09

###### REST API

*   \[Update\] `/spot/v1/user_fee` Get Basic Fee Rate (KEYED)
    *   Feat：Add new response field **taker\_fee\_rate\_D**
    *   Feat：Add new response field **maker\_fee\_rate\_D**

* * *

#### 2024-08-06

###### REST API

*   \[New\] `/spot/v4/cancel_all` Cancel All Order(v4) (SIGNED)

* * *

#### 2024-07-24

###### REST API

*   \[Delete\] `Public Market Data (History Version)` document directory removed
*   \[Delete\] `Spot / Margin Trading (History Version)` document directory remove

* * *

#### 2024-06-30

###### WebSocket Steam: User private channels will implement the following frequency and flow limits::

*   \[Update\] `[Private] Balance Change` channel
*   \[Update\] `[Private] Order Progress` channel

The specific restriction rules are as follows:

*   Each IP can maintain up to 10 connections with the private channel server.
*   Once connected, allows clients to subscribe to up to 100 channels per connection.
*   Send message rate limit:
    1.  Initiate connection: Clients can initiate a maximum of 30 requests to connect to the BitMart server within 1 minute.
    2.  Once connected: Clients can sending a maximum of 100 subscription messages within 10 seconds, message includes: PING frame, PONG frame, PING text, JSON format messages (subscription and unsubscription).
    3.  Once connected: A maximum of 20 messages arrays can be sent by clients for a single subscription.
*   If the user sends more messages than the limit, the connection will be disconnected. IPs that are repeatedly disconnected will be blocked by the server.

* * *

#### 2024-05-28

###### Websocket Stream

*   \[Update\] `[Private] Order Progress` channel
    *   Feature：Supports one subscription request to subscribe to the order transaction progress of all trading pairs

* * *

#### 2024-05-17

###### REST API

*   \[New\] `/spot/v4/batch_orders` New Batch Order(v4) (SIGNED)
*   \[New\] `/spot/v4/cancel_orders` Cancel Batch Order(v4) (SIGNED)

* * *

#### 2024-04-23

###### Websocket Stream

*   \[Update\] `[Private] Balance Change` channel
    *   New type value for **event\_type** field: **BMX\_DEDUCTION**\=BMX handling fee deduction

* * *

#### 2024-04-03

###### REST API

*   \[Update\] `/account/v1/withdraw/charge` Withdraw Quota (KEYED)
    *   Add new response field **withdraw\_Precision\_GeTen**

* * *

#### 2024-03-12

###### REST API

*   \[Update\] `/spot/v4/query/order` Query Order By Id (v4) (SIGNED)
    *   Response field **state** add new value **failed**

* * *

#### 2024-03-07

###### REST API

*   \[Delete\] `/account/sub-account/sub/v1/sub-to-sub` Sub-Account to Sub-Account (For Sub-Account) (SIGNED)

* * *

#### 2024-02-29

###### Websocket Stream

*   \[Update\] `[Public] Ticker` channel
    *   Add a successful subscription message and return it to the client
    *   Add new response field **ms\_t**
    *   Add new response field **fluctuation**
    *   Add new response field **bid\_px**
    *   Add new response field **bid\_sz**
    *   Add new response field **ask\_px**
    *   Add new response field **ask\_sz**
    *   Add new response field **quote\_volume\_24h**
    *   Bug fixed field **base\_volume\_24h** value
*   \[Update\] `[Public] KLine` channel
    *   Add a successful subscription message and return it to the client
    *   Change the K-line generation time to the opening time of this K-line
*   \[Update\] `[Public] Depth-All` channel
    *   Add a successful subscription message and return it to the client
*   \[Update\] `[Public] Depth-Increase` channel
    *   Add a successful subscription message and return it to the client
*   \[Update\] `[Public] Trade` channel
    *   Add a successful subscription message and return it to the client
    *   Add new response field **ms\_t**
*   \[Update\] `[Private] Order Progress` channel
    *   Add a successful subscription message and return it to the client
    *   Add new response field **create\_time**
    *   Add new response field **update\_time**
    *   Add new response field **order\_mode**
    *   Add new response field **entrust\_type**
    *   Add new response field **order\_state**
*   \[Update\] `[Private] Balance Change` channel
    *   Add a successful subscription message and return it to the client

* * *

#### 2024-02-19

###### REST API

*   \[Update\] `/account/v1/withdraw/apply` Withdraw (SIGNED)
    *   Feature: Withdrawal to accounts registered on the exchange

* * *

#### 2023-10-27

###### Websocket Stream

*   \[New\] `spot/depth/increase100:<symbol>` 【Private】Depth-Increase channel
    *   Feature: Spot depth incremental push

#### 2023-09-08

###### Websocket Stream

*   \[New\] `spot/user/balance:BALANCE_UPDATE` 【Private】Balance Change
    *   Feature: Spot balance changes push

* * *

#### 2023-08-14

###### REST API

*   \[New\] `/spot/quotation/v3/tickers` Get Ticker of All Pairs (V3)
*   \[New\] `/spot/quotation/v3/ticker` Get Ticker of a Trading Pair(V3)
*   \[New\] `/spot/quotation/v3/lite-klines` Get Latest K-Line (V3)
*   \[New\] `/spot/quotation/v3/klines` Get History K-Line (V3)
*   \[New\] `/spot/quotation/v3/books` Get Depth(V3)
*   \[New\] `/spot/quotation/v3/trades` Get Recent Trades(V3)

* * *

#### 2023-05-09

###### REST API

*   \[New\] `/spot/v4/query/order` Query order by id (v4)
*   \[New\] `/spot/v4/query/client-order` Query order by client order id (v4)
*   \[New\] `/spot/v4/query/open-orders` Current open orders (v4)
*   \[New\] `/spot/v4/query/history-orders` Account orders (v4)
*   \[New\] `/spot/v4/query/trades` Account trade list (v4)
*   \[New\] `/spot/v4/query/order-trades` Order trade list(v4)

* * *

#### 2023-03-03

###### REST API

*   \[Update\] `/spot/v1/user_fee` Get user fee rate
    *   Add new response field **taker\_fee\_rate\_C**
    *   Add new response field **maker\_fee\_rate\_C**

* * *

#### 2022-12-22

*   Update endpoints for Spot
    *   WebSocket Subscription-【Private】Order Progress add new order status 12 = Partially filled and canceled

#### 2022-11-03

*   Update endpoints for Spot / Margin trading
    *   `/spot/v3/orders` `/spot/v2/trades`add start\_time and end\_time field for flexible querying
    *   add new order status 11 = Partially filled and canceled

#### 2022-11-01

*   Update endpoints for Account
    *   `/account/v1/currencies`Add new field contract\_address,withdraw\_minsize and withdraw\_minfee

#### 2022-10-11

*   The new version of market data-relateded endpoints
    *   `/spot/v2/ticker`
    *   `/spot/v1/ticker_detail`

#### 2022-09-29

*   New spot trading endpoints
    *   `/spot/v2/submit_order`
    *   `/spot/v2/batch_orders`
    *   `/spot/v3/cancel_order`
    *   `/spot/v2/order_detail`
    *   `/spot/v3/orders`
    *   `/spot/v2/trades`

#### 2022-08-16

*   New Endpoint for Trade Fee
    *   `/spot/v1/trade_fee`
*   New Endpoint for Basic Fee
    *   `/spot/v1/user_fee`

#### 2022-07-07

*   New endpoints for the margin loan
    *   `/spot/v1/margin/isolated/borrow`
    *   `/spot/v1/margin/isolated/repay`
    *   `/spot/v1/margin/isolated/borrow_record`
    *   `/spot/v1/margin/isolated/repay_record`
    *   `/spot/v1/margin/isolated/pairs`
*   New endpoint for margin trading
    *   `/spot/v1/margin/submit_order`
*   New endpoints for margin accounts
    *   `/spot/v1/margin/isolated/account`
    *   `/spot/v1/margin/isolated/transfer`
*   Update endpoints for Spot / Margin trading
    *   A new "order\_mode" field has been added to the following endpoints to distinguish whether the order originates from a spot or margin trade
    *   `/spot/v1/order_detail`
    *   `/spot/v2/orders`
    *   `/spot/v1/trades`

#### 2022-05-24

*   Update endpoints for Spot
    *   `/spot/v2/orders`Add new field clientOrderId
    *   `/spot/v1/trades`Add new field clientOrderId
    *   `/spot/v1/order_detail`Add new field clientOrderId

#### 2022-04-19

*   New sub-account endpoints
    *   `/sub-account/main/v1/sub-to-main`
    *   `/sub-account/sub/v1/sub-to-main`
    *   `/sub-account/main/v1/main-to-sub`
    *   `/sub-account/sub/v1/sub-to-sub`
    *   `/sub-account/main/v1/sub-to-sub`
    *   `/sub-account/main/v1/transfer-list`
    *   `/sub-account/v1/transfer-history`
    *   `/sub-account/main/v1/wallet`
    *   `/sub-account/main/v1/subaccount-list`
*   Update WebSocket Order Progress channel
    *   Add new field client\_order\_id
    *   Add new field detail\_id

#### 2022-03-29

*   WebSocket subscription, 【private】 order channel renamed to 【private】 order progress
*   New parameter exec\_type is added to 【Private】 order progress channel, which indicates liquidity type

#### 2022-03-08

*   Improvement of Websocket connection holding
*   Catalog level repair to enhance readability

#### 2022-03-01

*   support user to create , request and cancel order through client-defined OrderId

#### 2022-02-15

*   increase the maximum rate limit based on users' feedback
*   improve UI of the document

#### 2022-01-20

*   Update endpoints for Spot
    *   `/spot/v1/symbols/details`Add a new respond parameter trade\_status, to show the trading status of a trading pair symbol.

#### 2022-01-18

*   websocket public channel address`wss://ws-manager-compress.bitmart.com?protocol=1.1`will be taken down on 2022-02-28 UTC time,The new address is`wss://ws-manager-compress.bitmart.com/api?protocol=1.1`

#### 2021-11-24

*   New endpoints for Spot
    *   `/spot/v2/orders`Get User Order History V2
    *   `/spot/v1/batch_orders`Batch Order
*   Update endpoints for Spot
    *   `/spot/v1/symbols/kline`Add new field 'quote\_volume'
    *   `/spot/v1/symbols/trades`Add optional parameter N to return the number of items, the default is up to 50 items
    *   `/spot/v1/order_detail`Add new field 'unfilled\_volume'
    *   `/spot/v1/submit_order`The request parameter type added limit\_maker and ioc order types
*   New endpoints for Account
    *   `/account/v2/deposit-withdraw/history`Get Deposit And Withdraw History V2
*   Update endpoints for Account
    *   `/account/v1/wallet`Remove the account\_type,Only respond to currency accounts; you can bring currency parameters (optional)

#### 2021-11-06

*   Update endpoints for Spot WebSocket
    *   Public-Depth Channel:
    *   spot/depth50 50 Level Depth Channel
    *   spot/depth100 100 Level Depth Channel
    *   User-Trade Channel:
    *   Eligible pushes add new orders successfully

#### 2021-01-19

*   New endpoints for Spot WebSocket
    *   Public - ticket channels
    *   Public - K channel
    *   Public - trading channels
    *   Public - depth channels
    *   Login
    *   User - Trading Channel

#### 2020-07-15

*   New endpoints for Spot
    *   `/spot/v2/cancel_order`Cancel an outstanding order，V2

#### 2020-06-29

*   New endpoints for Account
    *   `/account/v1/currencies`Get Currency  
        
    *   `/account/v1/wallet`Get Account Balance  
        
    *   `/account/v1/deposit/address`Deposit Address  
        
    *   `/account/v1/withdraw/charge`Withdraw Quota  
        
    *   `/account/v1/withdraw/apply`Withdraw  
        
    *   `/account/v1/recharge-withdraw/history`Get Deposit And Withdraw History
    *   `/account/v1/recharge-withdraw/detail`Get A Deposit Or Withdraw Detail

#### 2020-05-14

*   New endpoints for Spot
    *   `/spot/v1/currencies`Get a list of all cryptocurrencies on the platform
    *   `/spot/v1/symbols`Get a list of all trading pairs on the platform
    *   `/spot/v1/symbols/details`Get a detailed list of all trading pairs on the platform
    *   `/spot/v1/ticker`Get ticker
    *   `/spot/v1/steps`Get K-Line steps
    *   `/spot/v1/symbols/kline`Get k-Line
    *   `/spot/v1/symbols/book`Get orderbook
    *   `/spot/v1/symbols/trades`Get trades
    *   `/spot/v1/wallet`Get user wallet
    *   `/spot/v1/submit_order`Place order
    *   `/spot/v1/cancel_order`Cancel order
    *   `/spot/v1/cancel_orders`Cancel all outstanding orders in the specified direction for the specified trading pair
    *   `/spot/v1/order_detail`Get order details
    *   `/spot/v1/orders`Get user recent orders
    *   `/spot/v1/trades`Get user trade history
