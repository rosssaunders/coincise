# Bitmart Spot API Documentation

##

# Update Plan

- 【Important Notice】2024-10-01 The KeepAlive mechanism of spot websocket now
  supports clients sending ping frames and ping text to maintain the connection.
  In the future we will only support ping text, not ping frames

# Change Log

#### 2025-05-29

###### Websocket Stream

- \[Update\] `[Private] Order Progress` channel
  - Feat：Add new response field **deal_fee_coin_name** :Fee coin name

---

#### 2025-05-15

###### REST API

- \[Update\] `/account/v1/wallet` Get Account Balance (KEYED)
  - Feat：Add new response field **unAvailable** : Trading frozen Balance +
    Other frozen Balance

---

#### 2025-04-17

###### REST API

- \[Update\] `/spot/v4/query/order` Query Order By Id (v4) (SIGNED)
  - Feat：Add new response field **cancelSource** : Indicate the reason for
    cancel order
- \[Update\] `/spot/v4/query/client-order` Query Order By clientOrderId(v4)
  (SIGNED)
  - Feat：Add new response field **cancelSource** : Indicate the reasons for
    cancel order
- \[Update\] `/spot/v4/query/history-orders` Account Orders(v4) (SIGNED)
  - Feat：Add new response field **cancelSource** : Indicate the reasons for
    cancel order

---

#### 2025-02-18

###### REST API

- \[Update\] `/account/v2/deposit-withdraw/history` Get Deposit And Withdraw
  History (KEYED)
  - Feat：Support querying by time range, with the maximum number of results
    adjusted from 100 to 1000.
- \[Update\] `/account/v1/wallet` Get Account Balance (KEYED)
  - Feat：Add a field for the USD valuation of available balance:
    **available_usd_valuation**.
- \[Update\] `/account/v1/currencies` Get Currencies
  - Feat：Support querying for a single currency or multiple currencies.
  - Feat：Add new response field for withdrawal fee: **withdraw_fee** and new
    response field for withdrawal fee estimate: **withdraw_fee_estimate**. After
    2015-05-18 remove the response field: **withdraw_minfee**.

---

#### 2025-02-11

###### REST API

- \[New\] `/account/v1/withdraw/address/list` Query Withdraw Address List
  (KEYED)
  - Feat：Supports querying withdrawal addresses list

---

#### 2025-01-01

###### REST API

- 【Endpoint Removed】After 2024-06-30, BitMart will stop providing the
  following endpoints:

| Remove Endpoint                                | Remove Endpoint Describe                                     | Replace Endpoint                                            |
| ---------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| /spot/v1/submit_order                          | New Order(v1)                                                | /spot/v2/submit_order                                       |
| /spot/v1/batch_orders<br>/spot/v2/batch_orders | New Batch Order(v1)<br>New Batch Order(v2)                   | /spot/v4/batch_orders                                       |
| /spot/v1/cancel_order<br>/spot/v2/cancel_order | Cancel Order(v1)<br>Cancel Order(v2)                         | /spot/v3/cancel_order                                       |
| /spot/v1/cancel_orders                         | Cancel Batch Order(v1)                                       | /spot/v4/cancel_orders<br>/spot/v4/cancel_all               |
| /spot/v2/order_detail                          | Query Order(v2)                                              | /spot/v4/query/order                                        |
| /spot/v3/orders                                | Account Orders(v3)                                           | /spot/v4/query/open-orders                                  |
| /spot/v2/trades                                | Account Trade List(v2)                                       | /spot/v4/query/trades                                       |
| /spot/v1/ticker<br>/spot/v2/ticker             | Get Ticker of All Pairs (V1)<br>Get Ticker of All Pairs (V2) | /spot/quotation/v3/tickers                                  |
| /spot/v1/ticker_detail                         | Get Ticker of a Trading Pair (V1)                            | /spot/quotation/v3/ticker                                   |
| /spot/v1/steps                                 | Get K-Line Step (V1)                                         | Fixed enumeration value, no need for endpoint query         |
| /spot/v1/symbols/kline                         | Get K-Line (V1)                                              | /spot/quotation/v3/lite-klines<br>/spot/quotation/v3/klines |
| /spot/v1/symbols/book                          | Get Depth (V1)                                               | /spot/quotation/v3/books                                    |
| /spot/v1/symbols/trades                        | Get Recent Trades (V1)                                       | /spot/quotation/v3/trades                                   |

---

#### 2024-11-11

###### REST API

- \[Update\] `/spot/v1/margin/submit_order` New Margin Order(v1) (SIGNED)
  - Optimize：The rate limit 1 times/1s based on API Key changes to 20 times/1s
    based on UID

---

#### 2024-10-21

###### REST API

- \[Update\] `/spot/v4/cancel_orders` Cancel Batch Order(v4) (SIGNED)
  - Optimize：The maximum number of **orderIds** in the request parameter is 10.
  - Optimize：The maximum number of **clientOrderIds** in the request parameter
    is 10.

---

#### 2024-10-09

###### REST API

- \[Update\] `/spot/v1/user_fee` Get Basic Fee Rate (KEYED)
  - Feat：Add new response field **taker_fee_rate_D**
  - Feat：Add new response field **maker_fee_rate_D**

---

#### 2024-08-06

###### REST API

- \[New\] `/spot/v4/cancel_all` Cancel All Order(v4) (SIGNED)

---

#### 2024-07-24

###### REST API

- \[Delete\] `Public Market Data (History Version)` document directory removed
- \[Delete\] `Spot / Margin Trading (History Version)` document directory remove

---

#### 2024-06-30

###### WebSocket Steam: User private channels will implement the following frequency and flow limits::

- \[Update\] `[Private] Balance Change` channel
- \[Update\] `[Private] Order Progress` channel

The specific restriction rules are as follows:

- Each IP can maintain up to 10 connections with the private channel server.
- Once connected, allows clients to subscribe to up to 100 channels per
  connection.
- Send message rate limit:
  1.  Initiate connection: Clients can initiate a maximum of 30 requests to
      connect to the BitMart server within 1 minute.
  2.  Once connected: Clients can sending a maximum of 100 subscription messages
      within 10 seconds, message includes: PING frame, PONG frame, PING text,
      JSON format messages (subscription and unsubscription).
  3.  Once connected: A maximum of 20 messages arrays can be sent by clients for
      a single subscription.
- If the user sends more messages than the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server.

---

#### 2024-05-28

###### Websocket Stream

- \[Update\] `[Private] Order Progress` channel
  - Feature：Supports one subscription request to subscribe to the order
    transaction progress of all trading pairs

---

#### 2024-05-17

###### REST API

- \[New\] `/spot/v4/batch_orders` New Batch Order(v4) (SIGNED)
- \[New\] `/spot/v4/cancel_orders` Cancel Batch Order(v4) (SIGNED)

---

#### 2024-04-23

###### Websocket Stream

- \[Update\] `[Private] Balance Change` channel
  - New type value for **event_type** field: **BMX_DEDUCTION**\=BMX handling fee
    deduction

---

#### 2024-04-03

###### REST API

- \[Update\] `/account/v1/withdraw/charge` Withdraw Quota (KEYED)
  - Add new response field **withdraw_Precision_GeTen**

---

#### 2024-03-12

###### REST API

- \[Update\] `/spot/v4/query/order` Query Order By Id (v4) (SIGNED)
  - Response field **state** add new value **failed**

---

#### 2024-03-07

###### REST API

- \[Delete\] `/account/sub-account/sub/v1/sub-to-sub` Sub-Account to Sub-Account
  (For Sub-Account) (SIGNED)

---

#### 2024-02-29

###### Websocket Stream

- \[Update\] `[Public] Ticker` channel
  - Add a successful subscription message and return it to the client
  - Add new response field **ms_t**
  - Add new response field **fluctuation**
  - Add new response field **bid_px**
  - Add new response field **bid_sz**
  - Add new response field **ask_px**
  - Add new response field **ask_sz**
  - Add new response field **quote_volume_24h**
  - Bug fixed field **base_volume_24h** value
- \[Update\] `[Public] KLine` channel
  - Add a successful subscription message and return it to the client
  - Change the K-line generation time to the opening time of this K-line
- \[Update\] `[Public] Depth-All` channel
  - Add a successful subscription message and return it to the client
- \[Update\] `[Public] Depth-Increase` channel
  - Add a successful subscription message and return it to the client
- \[Update\] `[Public] Trade` channel
  - Add a successful subscription message and return it to the client
  - Add new response field **ms_t**
- \[Update\] `[Private] Order Progress` channel
  - Add a successful subscription message and return it to the client
  - Add new response field **create_time**
  - Add new response field **update_time**
  - Add new response field **order_mode**
  - Add new response field **entrust_type**
  - Add new response field **order_state**
- \[Update\] `[Private] Balance Change` channel
  - Add a successful subscription message and return it to the client

---

#### 2024-02-19

###### REST API

- \[Update\] `/account/v1/withdraw/apply` Withdraw (SIGNED)
  - Feature: Withdrawal to accounts registered on the exchange

---

#### 2023-10-27

###### Websocket Stream

- \[New\] `spot/depth/increase100:<symbol>` 【Private】Depth-Increase channel
  - Feature: Spot depth incremental push

#### 2023-09-08

###### Websocket Stream

- \[New\] `spot/user/balance:BALANCE_UPDATE` 【Private】Balance Change
  - Feature: Spot balance changes push

---

#### 2023-08-14

###### REST API

- \[New\] `/spot/quotation/v3/tickers` Get Ticker of All Pairs (V3)
- \[New\] `/spot/quotation/v3/ticker` Get Ticker of a Trading Pair(V3)
- \[New\] `/spot/quotation/v3/lite-klines` Get Latest K-Line (V3)
- \[New\] `/spot/quotation/v3/klines` Get History K-Line (V3)
- \[New\] `/spot/quotation/v3/books` Get Depth(V3)
- \[New\] `/spot/quotation/v3/trades` Get Recent Trades(V3)

---

#### 2023-05-09

###### REST API

- \[New\] `/spot/v4/query/order` Query order by id (v4)
- \[New\] `/spot/v4/query/client-order` Query order by client order id (v4)
- \[New\] `/spot/v4/query/open-orders` Current open orders (v4)
- \[New\] `/spot/v4/query/history-orders` Account orders (v4)
- \[New\] `/spot/v4/query/trades` Account trade list (v4)
- \[New\] `/spot/v4/query/order-trades` Order trade list(v4)

---

#### 2023-03-03

###### REST API

- \[Update\] `/spot/v1/user_fee` Get user fee rate
  - Add new response field **taker_fee_rate_C**
  - Add new response field **maker_fee_rate_C**

---

#### 2022-12-22

- Update endpoints for Spot
  - WebSocket Subscription-【Private】Order Progress add new order status 12 =
    Partially filled and canceled

#### 2022-11-03

- Update endpoints for Spot / Margin trading
  - `/spot/v3/orders` `/spot/v2/trades`add start_time and end_time field for
    flexible querying
  - add new order status 11 = Partially filled and canceled

#### 2022-11-01

- Update endpoints for Account
  - `/account/v1/currencies`Add new field contract_address,withdraw_minsize and
    withdraw_minfee

#### 2022-10-11

- The new version of market data-relateded endpoints
  - `/spot/v2/ticker`
  - `/spot/v1/ticker_detail`

#### 2022-09-29

- New spot trading endpoints
  - `/spot/v2/submit_order`
  - `/spot/v2/batch_orders`
  - `/spot/v3/cancel_order`
  - `/spot/v2/order_detail`
  - `/spot/v3/orders`
  - `/spot/v2/trades`

#### 2022-08-16

- New Endpoint for Trade Fee
  - `/spot/v1/trade_fee`
- New Endpoint for Basic Fee
  - `/spot/v1/user_fee`

#### 2022-07-07

- New endpoints for the margin loan
  - `/spot/v1/margin/isolated/borrow`
  - `/spot/v1/margin/isolated/repay`
  - `/spot/v1/margin/isolated/borrow_record`
  - `/spot/v1/margin/isolated/repay_record`
  - `/spot/v1/margin/isolated/pairs`
- New endpoint for margin trading
  - `/spot/v1/margin/submit_order`
- New endpoints for margin accounts
  - `/spot/v1/margin/isolated/account`
  - `/spot/v1/margin/isolated/transfer`
- Update endpoints for Spot / Margin trading
  - A new "order_mode" field has been added to the following endpoints to
    distinguish whether the order originates from a spot or margin trade
  - `/spot/v1/order_detail`
  - `/spot/v2/orders`
  - `/spot/v1/trades`

#### 2022-05-24

- Update endpoints for Spot
  - `/spot/v2/orders`Add new field clientOrderId
  - `/spot/v1/trades`Add new field clientOrderId
  - `/spot/v1/order_detail`Add new field clientOrderId

#### 2022-04-19

- New sub-account endpoints
  - `/sub-account/main/v1/sub-to-main`
  - `/sub-account/sub/v1/sub-to-main`
  - `/sub-account/main/v1/main-to-sub`
  - `/sub-account/sub/v1/sub-to-sub`
  - `/sub-account/main/v1/sub-to-sub`
  - `/sub-account/main/v1/transfer-list`
  - `/sub-account/v1/transfer-history`
  - `/sub-account/main/v1/wallet`
  - `/sub-account/main/v1/subaccount-list`
- Update WebSocket Order Progress channel
  - Add new field client_order_id
  - Add new field detail_id

#### 2022-03-29

- WebSocket subscription, 【private】 order channel renamed to 【private】 order
  progress
- New parameter exec_type is added to 【Private】 order progress channel, which
  indicates liquidity type

#### 2022-03-08

- Improvement of Websocket connection holding
- Catalog level repair to enhance readability

#### 2022-03-01

- support user to create , request and cancel order through client-defined
  OrderId

#### 2022-02-15

- increase the maximum rate limit based on users' feedback
- improve UI of the document

#### 2022-01-20

- Update endpoints for Spot
  - `/spot/v1/symbols/details`Add a new respond parameter trade_status, to show
    the trading status of a trading pair symbol.

#### 2022-01-18

- websocket public channel
  address`wss://ws-manager-compress.bitmart.com?protocol=1.1`will be taken down
  on 2022-02-28 UTC time,The new address
  is`wss://ws-manager-compress.bitmart.com/api?protocol=1.1`

#### 2021-11-24

- New endpoints for Spot
  - `/spot/v2/orders`Get User Order History V2
  - `/spot/v1/batch_orders`Batch Order
- Update endpoints for Spot
  - `/spot/v1/symbols/kline`Add new field 'quote_volume'
  - `/spot/v1/symbols/trades`Add optional parameter N to return the number of
    items, the default is up to 50 items
  - `/spot/v1/order_detail`Add new field 'unfilled_volume'
  - `/spot/v1/submit_order`The request parameter type added limit_maker and ioc
    order types
- New endpoints for Account
  - `/account/v2/deposit-withdraw/history`Get Deposit And Withdraw History V2
- Update endpoints for Account
  - `/account/v1/wallet`Remove the account_type,Only respond to currency
    accounts; you can bring currency parameters (optional)

#### 2021-11-06

- Update endpoints for Spot WebSocket
  - Public-Depth Channel:
  - spot/depth50 50 Level Depth Channel
  - spot/depth100 100 Level Depth Channel
  - User-Trade Channel:
  - Eligible pushes add new orders successfully

#### 2021-01-19

- New endpoints for Spot WebSocket
  - Public - ticket channels
  - Public - K channel
  - Public - trading channels
  - Public - depth channels
  - Login
  - User - Trading Channel

#### 2020-07-15

- New endpoints for Spot
  - `/spot/v2/cancel_order`Cancel an outstanding order，V2

#### 2020-06-29

- New endpoints for Account
  - `/account/v1/currencies`Get Currency
  - `/account/v1/wallet`Get Account Balance
  - `/account/v1/deposit/address`Deposit Address
  - `/account/v1/withdraw/charge`Withdraw Quota
  - `/account/v1/withdraw/apply`Withdraw
  - `/account/v1/recharge-withdraw/history`Get Deposit And Withdraw History
  - `/account/v1/recharge-withdraw/detail`Get A Deposit Or Withdraw Detail

#### 2020-05-14

- New endpoints for Spot
  - `/spot/v1/currencies`Get a list of all cryptocurrencies on the platform
  - `/spot/v1/symbols`Get a list of all trading pairs on the platform
  - `/spot/v1/symbols/details`Get a detailed list of all trading pairs on the
    platform
  - `/spot/v1/ticker`Get ticker
  - `/spot/v1/steps`Get K-Line steps
  - `/spot/v1/symbols/kline`Get k-Line
  - `/spot/v1/symbols/book`Get orderbook
  - `/spot/v1/symbols/trades`Get trades
  - `/spot/v1/wallet`Get user wallet
  - `/spot/v1/submit_order`Place order
  - `/spot/v1/cancel_order`Cancel order
  - `/spot/v1/cancel_orders`Cancel all outstanding orders in the specified
    direction for the specified trading pair
  - `/spot/v1/order_detail`Get order details
  - `/spot/v1/orders`Get user recent orders
  - `/spot/v1/trades`Get user trade history

# Introduction

## API Key Create

- Many APIs require an API Access Key for access. Please refer to
  [this page](https://www.bitmart.com/open-api-guide/en-US) to set up.
- When setting up an API Access Key, it is recommended to set up an IP access
  whitelist for security purposes.
- Never give your API Access key/secret key to anyone.

![PNG](../../images/create_api-en-41e5a3c6.png)

If you accidentally leak your API key, delete it immediately and generate a new
one.

#### After creating an API Key, you will receive three pieces of information that you must remember:

- `Access Key`: represents the identity of the account, this is your api key
- `Secret Key`: used for API signature
- `Memo`: used for API signature

![PNG](../../images/created_api-9fb3507b.png)

The Access Key and Secret Key will be randomly generated and provided by
BitMart, and the Memo will be provided by you to ensure the security of API
access.

## API Key Permission Settings

- The default permission of a newly created API is `Read-Only`.
- To withdraw funds through the API, you need to modify the permissions in the
  UI and select `Withdraw`.
- Permission descriptions:
  - `Read-only` (query spot trading orders, query contract trading orders, query
    funds)
  - `Spot-Trade` (place orders, cancel orders)
  - `Withdraw` (withdraw funds)
  - `Margin-Trade` (repayment, borrowing, placing orders, etc.)
  - `Future-Trade` (long position, short position, closing position, etc.)

![PNG](../../images/key-permission-en-a50bc6ed.png)

###### Read-Only Permissions:

| API Name                               | Description                                                 | Authentication Type |
| -------------------------------------- | ----------------------------------------------------------- | ------------------- |
| /account/v1/wallet                     | Query account assets                                        | KEYED               |
| /account/v1/deposit/address            | Query deposit addresses for each currency                   | KEYED               |
| /account/v1/withdraw/address/list      | Query withdraw address list                                 | KEYED               |
| /account/v2/deposit-withdraw/history   | Query deposit and withdrawal history                        | KEYED               |
| /account/v1/deposit-withdraw/detail    | Query deposit and withdrawal details                        | KEYED               |
| /spot/v1/wallet                        | Query wallet balance for all currencies                     | KEYED               |
| /spot/v4/query/order                   | Query order by id (v4)                                      | SIGNED              |
| /spot/v4/query/client-order            | Query order by client order id (v4)                         | SIGNED              |
| /spot/v4/query/open-orders             | Current open orders (v4)                                    | SIGNED              |
| /spot/v4/query/history-orders          | Account orders (v4)                                         | SIGNED              |
| /spot/v4/query/trades                  | Account trade list (v4)                                     | SIGNED              |
| /spot/v4/query/order-trades            | Order trade list(v4)                                        | SIGNED              |
| /spot/v1/user_fee                      | Query basic fee rate for current user                       | KEYED               |
| /spot/v1/trade_fee                     | Query fee rate for a specific trading pair for current user | KEYED               |
| /spot/v1/margin/isolated/pairs         | Query loan interest rate and limit for a trading pair       | KEYED               |
| /spot/v1/margin/isolated/account       | Query isolated margin account information                   | KEYED               |
| /spot/v1/margin/isolated/borrow_record | Query isolated margin borrowing record                      | KEYED               |
| /spot/v1/margin/isolated/repay_record  | Query isolated margin repayment record                      | KEYED               |
| /contract/private/get-open-orders      | Query Contract All Open Orders                              | KEYED               |
| /contract/private/order                | Query contract order details                                | KEYED               |
| /contract/private/trade-fee-rate       | Query Trade Fee Rate                                        | KEYED               |
| /contract/private/order-history        | Query contract order history                                | KEYED               |
| /contract/private/trades               | Query contract trade details                                | KEYED               |
| /contract/private/transaction-history  | Get Contract Transaction History                            | KEYED               |
| /contract/private/assets-detail        | Query contract asset details                                | KEYED               |
| /contract/private/position             | Query position details                                      | KEYED               |
| /contract/private/position-v2          | Query position details V2                                   | KEYED               |
| /contract/private/current-plan-order   | Query Current Plan Orders                                   | KEYED               |
| /contract/private/position-risk        | Query Position Risk Details                                 | KEYED               |
| /contract/private/get-position-mode    | Get position mode                                           | KEYED               |

###### Withdraw Permissions:

| API Name                    | Description             | Authentication Type |
| --------------------------- | ----------------------- | ------------------- |
| /account/v1/withdraw/charge | Query withdrawal limits | KEYED               |
| /account/v1/withdraw/apply  | Apply for withdrawal    | SIGNED              |

###### Spot-Trade Permissions:

| API Name               | Description                | Authentication Type |
| ---------------------- | -------------------------- | ------------------- |
| /spot/v1/submit_order  | Place an order             | SIGNED              |
| /spot/v2/submit_order  | Place an order             | SIGNED              |
| /spot/v1/batch_orders  | Place multiple orders      | SIGNED              |
| /spot/v2/batch_orders  | Place multiple orders      | SIGNED              |
| /spot/v4/batch_orders  | Place multiple orders      | SIGNED              |
| /spot/v1/cancel_order  | Cancel an unfinished order | SIGNED              |
| /spot/v3/cancel_order  | Cancel an unfinished order | SIGNED              |
| /spot/v1/cancel_orders | Cancel multiple orders     | SIGNED              |
| /spot/v4/cancel_orders | Cancel multiple orders     | SIGNED              |

###### Margin-Trade Permissions:

| API Name                          | Description                                     | Authentication Type |
| --------------------------------- | ----------------------------------------------- | ------------------- |
| /spot/v1/margin/submit_order      | Margin order placement                          | SIGNED              |
| /spot/v1/margin/isolated/transfer | Transfer funds between margin and spot accounts | SIGNED              |
| /spot/v1/margin/isolated/borrow   | Isolated margin borrowing                       | SIGNED              |
| /spot/v1/margin/isolated/repay    | Repay isolated margin debt                      | SIGNED              |

###### Future-Trade Permissions:

| API Name                                   | Description                                       | Authentication Type |
| ------------------------------------------ | ------------------------------------------------- | ------------------- |
| /contract/private/submit-order             | Place an order for a futures contract             | SIGNED              |
| /contract/private/cancel-order             | Cancel a single futures order                     | SIGNED              |
| /contract/private/cancel-orders            | Batch cancel futures orders                       | SIGNED              |
| /contract/private/submit-plan-order        | Place a plan order for futures contracts          | SIGNED              |
| /contract/private/cancel-plan-order        | Cancel futures plan orders                        | SIGNED              |
| /account/v1/transfer-contract              | Future account transfer                           | SIGNED              |
| /account/v1/transfer-contract-list         | Get Future account transfer list                  | SIGNED              |
| /contract/private/submit-tp-sl-order       | Place a tp or sl order for a futures contract     | SIGNED              |
| /contract/private/modify-plan-order        | Modify a plan order for a futures contract        | SIGNED              |
| /contract/private/modify-preset-plan-order | Modify a preset plan order for a futures contract | SIGNED              |
| /contract/private/modify-tp-sl-order       | Modify a tp or sl order for a futures contract    | SIGNED              |
| /contract/private/submit-trail-order       | Place a trail order for futures contracts         | SIGNED              |
| /contract/private/cancel-trail-order       | Cancel futures trail order                        | SIGNED              |
| /contract/private/modify-limit-order       | Modify futures limit order                        | SIGNED              |
| /contract/private/cancel-all-after         | Timed cancel all open orders                      | SIGNED              |
| /contract/private/set-position-mode        | Set position mode                                 | SIGNED              |

###### Sub-Account Permissions:

You need to enter
[Institution Verification](https://www.bitmart.com/institution-verification/en-US)
to use the sub-account endpoints.

After the creation is successful, the sub-account has `Read-only` permission by
default.

![PNG](../../images/sub_key_permission-en-6e1c19b2.png)

###### Sub-Account Spot-Trade Permissions:

Same as the above spot trading authority

###### Sub-Account Contract-Trade Permissions:

Same as above futures trading authority

###### Sub-Account Inter-Account Transfer Permissions:

| API Name                                            | Description                                                                            | Authentication Type |
| --------------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------- |
| /account/sub-account/main/v1/sub-to-main            | Sub-Account Transfer to Main-Account (For Main Account, use spot account)              | SIGNED              |
| /account/sub-account/sub/v1/sub-to-main             | Sub-Account Transfer to Main-Account (For Sub-Account, use spot account)               | SIGNED              |
| /account/sub-account/main/v1/main-to-sub            | Main-Account Transfer to Sub-Account (For Main Account, use spot account)              | SIGNED              |
| /account/sub-account/main/v1/sub-to-sub             | Sub-Account Transfer to Sub-Account (For Main Account, use spot account)               | SIGNED              |
| /account/sub-account/main/v1/transfer-list          | Get Sub-Account Transfer History (For Main Account, use spot account)                  | KEYED               |
| /account/sub-account/v1/transfer-history            | Get Account Spot Asset Transfer History (For Main/Sub Account, use spot account)       | KEYED               |
| /account/sub-account/main/v1/wallet                 | Get Sub-Account Spot Wallet Balance (For Main Account, use spot account)               | KEYED               |
| /account/sub-account/main/v1/subaccount-list        | Get Sub-Account List (For Main Account, use spot account)                              | KEYED               |
| /account/contract/sub-account/main/v1/sub-to-main   | Sub-Account Transfer to Main-Account (For Main Account, use futures account)           | SIGNED              |
| /account/contract/sub-account/main/v1/main-to-sub   | Main-Account Transfer to Sub-Account (For Main Account, use futures account)           | SIGNED              |
| /account/contract/sub-account/sub/v1/sub-to-main    | Sub-Account Transfer to Main-Account (For Sub-Account, use futures account)            | SIGNED              |
| /account/contract/sub-account/main/v1/wallet        | Get Sub-Account Futures Wallet Balance (For Main Account, use futures account)         | KEYED               |
| /account/contract/sub-account/v1/transfer-history   | Get Account Futures Asset Transfer History (For Main/Sub Account, use futures account) | KEYED               |
| /account/contract/sub-account/main/v1/transfer-list | Get Sub-Account Transfer History (For Main Account, use futures account)               | KEYED               |

## API Library

In order to facilitate access, we provide SDK in some languages for reference.
For more programming codes, please refer to the
[Quick Start API](/en/quick/#official-sdk-libraries) on the page.

#### Available SDK:

- [Java](https://github.com/bitmartexchange/bitmart-java-sdk-api)
- [Python](https://github.com/bitmartexchange/bitmart-python-sdk-api)
- [Nodejs](https://github.com/bitmartexchange/bitmart-node-sdk-api)
- [Go](https://github.com/bitmartexchange/bitmart-go-sdk-api)
- [PHP](https://github.com/bitmartexchange/bitmart-php-sdk-api)

In addition to the SDK, we also provide code samples in multiple languages, and
the samples mainly demonstrate how to use the signed interface. It can be built
and run standalone or as part of your codebase.

- [Python Signature Example](/en/quick/#python-signature-request)
- [Go Signature Example](/en/quick/#go-signature-request)
- [Nodejs Signature Example](/en/quick/#node-signature-request)
- [Java Signature Example](/en/quick/#java-signature-request)
- [PHP Signature Example](/en/quick/#php-signature-request)
- [Ruby Signature Example](/en/quick/#ruby-signature-request)
- [C# Signature Example](/en/quick/#c-signature-request)
- [Rust Signature Example](/en/quick/#rust-signature-request)
- [C++ Signature Example](/en/quick/#c-signature-request-2)
- [Postman](https://github.com/bitmartexchange/bitmart-postman-api)

## FAQ

Here are some frequently asked questions.

### Q1. Will different API KEY in the same account return different data?

Different API KEY data under the same account is the same.

### Q2. How to fill information in when applying for APIKEY?

1\. \`memo\` is provided by the user, it can be any string, used to confuse the
signature algorithm  
2\. Binding ip is optional, it is recommended to fill in for account security  
3\. API permissions can be checked according to user needs

### Q3. How is the HTTP status code 429 created?

The request interface exceeds the access frequency limit, it is recommended to
reduce the access frequency.

### Q4. Using ccxt, the API KEY is correctly filled in, but it will also prompt 'message': 'Header X-BM-SIGN is wrong'

The parameter uid of ccxt needs to be filled in as the memo when creating the
API  
Here is an example of initialization:

bitmart = ccxt.bitmart({  
'apiKey': 'your_api_key',  
'secret': 'your_api_secret',  
'uid': 'your_api_memo' // not your uid, is the api memo  
});

### Q5. The program I wrote myself always prompts 'message': 'Header X-BM-SIGN is wrong'

Please refer to [Quick Access API](/en/quick/#python-quick-start), select the
language you use, and there are correct signature methods for reference.

### Q6. Where is the location of BitMart servers?

We are using Google Cloud Services and deployed in Taiwan.

### Q7. When will the VIP fee I applied for take effect?

We will update on the 8th, 18th and 28th of every month.

### Q8. Why does it prompt "IP is forbidden. We recommend enabling IP whitelist for API trading. "

Because you set up an IP whitelist when creating the API, which means that this
API KEY can only send requests through this IP, and other IPs using this API KEY
will prompt that it is prohibited.  
Why set up: IP whitelist is a network security measure used to control who can
access specific network resources or services. If a whitelist IP is added, the
service will only accept API requests from that IP and reject API requests from
other IPs.

## Contact Us

- Get support in our Telegram group [BitMart API Club](https://t.me/bitmart_api)
- Please take 1 minute to help us improve:
  [API Satisfaction Survey](https://www.wjx.cn/vm/OtxJYl9.aspx#)

# Basic Information

## API Basic Information

1.  This article lists the rest baseurl of the interfaces:
    https://api-cloud.bitmart.com
2.  All interface responses are in JSON format.

### Request Parameter Settings

- For `GET` and `DELETE` method interfaces, parameters must be sent in the query
  string, i.e., the parameters concatenated after the `URL?`.
- For `POST` and `PUT` method interfaces, parameters are sent in the request
  body in JSON format.

### HTTP Response Codes

- HTTP 4XX Error codes are used to indicate wrong request content, behavior, and
  format. The problem is from the request sender.
- HTTP 403 The error code indicates a violation of the restriction (prohibited
  call).
- HTTP 429 The error code indicates that the access frequency is overrun and the
  IP will be blocked.
- HTTP 418 The error code indicates that the IP has been blocked after error
  code 429.
- HTTP 5XX Error codes are used to indicate problems with BitMart server.

### API Returned Codes

- `code` Error code
- `message` Error description
- `trace` Event tracking ID for each request, which is returned by the server
  for every request
- `data` User Data

For details, please refer to [Error Code List](#error-code)

## Signature

The authentication type of each API endpoint will be indicated. If it is marked
as `SIGNED`,it means that the endpoint requires a signature to access. If it is
marked as `KEYED`, it means that the endpoint only requires an API Access KEY to
be set in the request header.

#### Authentication Type

- `NONE`: Public endpoint, accessible to anyone
- `KEYED`: Endpoint requires a valid X-BM-KEY to be set in the request header
- `SIGNED`: Endpoint requires a valid X-BM-KEY and X-BM-SIGN signature to be set
  in the request header

### 1\. Setting Request Parameters

###### 1.1 Set Request Header Key

> Create X-BM-TIMESTAMP

Copy Success

Copy to Clipboard

`// Java System.currentTimeMillis();  // Python int(time.time() * 1000)   // Golang time.Now().UnixNano() / int64(time.Millisecond)  // Nodejs & TypeScript Date.now();  // Javascript Date.now();  // PHP round(microtime(true) * 1000)  // C# DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()`

- `X-BM-KEY` (Your created API Access KEY)
- `X-BM-SIGN` (Signature using Sha-256)
- `X-BM-TIMESTAMP` (Current timestamp in milliseconds when the request is sent)

###### 1.2 Set Request Body Params

- For `GET/DELETE` requests, the query string is in form format, such as
  `symbol=BMX&side=BUY`.
- For `POST/PUT` requests, the query string is in JSON format, such as
  `{"symbol":"BMX","side":"BUY"}`.

### 2\. Example

> Shell Example

Copy Success

Copy to Clipboard

`echo -n '1589793796145#test001#{"symbol":"BTC_USDT","price":"8600","count":"100"}' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"     (stdin)= c31dc326bf87f38bfb49a3f8494961abfa291bd549d0d98d9578e87516cee46d      curl --location --request POST 'localhost:8080/spot/v1/test-post'     --header 'Content-Type: application/json'     --header 'X-BM-KEY: 80618e45710812162b04892c7ee5ead4a3cc3e56'     --header 'X-BM-SIGN: c31dc326bf87f38bfb49a3f8494961abfa291bd549d0d98d9578e87516cee46d'     --header 'X-BM-TIMESTAMP: 1589793796145'     --d '{"symbol":"BTC_USDT","price":"8600","count":"100"}'`

- Request API: /spot/v1/test-post (SIGNED)
- Request method: POST
- Current timestamp: timestamp=`1589793796145`
- Request body: `{"symbol":"BTC_USDT","price":"8600","count":"100"}`

Then set the following:

- X-BM-TIMESTAMP=`1589793796145`
- X-BM-KEY=`Your_api_access_key`
- X-BM-SIGN= hmac_sha256(`Your_api_secret_key`, `X-BM-TIMESTAMP` + '#' +
  `Your_api_memo` + '#' + `{"symbol":"BTC_USDT","price":"8600","count":"100"}`)

Assuming the key you applied for is as follows:

- `accessKey`\=80618e45710812162b04892c7ee5ead4a3cc3e56
- `secretKey`\=6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9
- `memo`\=test001

then the right side is a complete request

You can also refer to the SDK or
[Quick Start API](/en/quick/#python-quick-start) below to implement

## Rate Limit

The speed of the public interface is limited according to the IP, and the speed
of the private interface is limited according to the API KEY. When the requests
exceed the rate limit, the 429 status will be returned: the request is too
frequent.

### The specific interface limits are as follows:

| System Interface | Interface Name            | Limit Target | Rate         |
| ---------------- | ------------------------- | ------------ | ------------ |
| /system/time     | Get system time           | IP           | 10 times/sec |
| /system/service  | Get system service status | IP           | 10 times/sec |

| Funding Account Interface            | Interface Name                       | Limit Target | Rate           |
| ------------------------------------ | ------------------------------------ | ------------ | -------------- |
| /account/v1/currencies               | Get currencies                       | IP           | 2 times/2 sec  |
| /account/v1/wallet                   | Get account balance                  | X-BM-KEY     | 12 times/2 sec |
| /account/v1/deposit/address          | Deposit address                      | X-BM-KEY     | 2 times/2 sec  |
| /account/v1/withdraw/charge          | Withdraw quota                       | X-BM-KEY     | 2 times/2 sec  |
| /account/v1/withdraw/apply           | Withdraw                             | X-BM-KEY     | 8 times/2 sec  |
| /account/v1/withdraw/address/list    | Withdraw Address                     | X-BM-KEY     | 2 times/2 sec  |
| /account/v2/deposit-withdraw/history | Get deposit and withdraw history V2  | X-BM-KEY     | 8 times/2 sec  |
| /account/v1/deposit-withdraw/detail  | Get a deposit Or withdraw detail     | X-BM-KEY     | 8 times/2 sec  |
| /spot/v1/margin/isolated/account     | Get Margin Account Details(Isolated) | X-BM-KEY     | 12 times/2 sec |
| /spot/v1/margin/isolated/transfer    | Margin Asset Transfer                | X-BM-KEY     | 2 times/2 sec  |
| /spot/v1/user_fee                    | Basic Fee Rate                       | X-BM-KEY     | 2 times/2 sec  |
| /spot/v1/trade_fee                   | Actual Trade Fee Rate                | X-BM-KEY     | 2 times/2 sec  |

| Spot Public Market Interface   | Interface Name                           | Limit Target | Rate           |
| ------------------------------ | ---------------------------------------- | ------------ | -------------- |
| /spot/v1/currencies            | Get a list of all cryptocurrencies       | IP           | 8 times/2 sec  |
| /spot/v1/symbols               | Get a list of all trading pairs          | IP           | 8 times/2 sec  |
| /spot/v1/symbols/details       | Get a detailed list of all trading pairs | IP           | 12 times/2 sec |
| /spot/quotation/v3/tickers     | Get Ticker of All Pairs (V3)             | IP           | 10 times/2 sec |
| /spot/quotation/v3/ticker      | Get Ticker of a Trading Pair(V3)         | IP           | 15 times/2 sec |
| /spot/quotation/v3/lite-klines | Get Latest K-Line (V3)                   | IP           | 15 times/2 sec |
| /spot/quotation/v3/klines      | Get History K-Line (V3)                  | IP           | 10 times/2 sec |
| /spot/quotation/v3/books       | Get Depth(V3)                            | IP           | 15 times/2 sec |
| /spot/quotation/v3/trades      | Get Recent Trades(V3)                    | IP           | 15 times/2 sec |

| Spot Trading Interface        | Interface Name                            | Limit Target | Rate           |
| ----------------------------- | ----------------------------------------- | ------------ | -------------- |
| /spot/v1/wallet               | Get the user's wallet balance(KEYED)      | X-BM-KEY     | 12 times/2 sec |
| /spot/v2/submit_order         | New Order(v2) (SIGNED)                    | UID          | 40 times/2 sec |
| /spot/v4/batch_orders         | New Batch Order(v4) (SIGNED)              | UID          | 40 times/2 sec |
| /spot/v1/margin/submit_order  | New Margin Order (SIGNED)                 | UID          | 20 times/1 sec |
| /spot/v3/cancel_order         | Cancel Order(v3) (SIGNED)                 | UID          | 40 times/2 sec |
| /spot/v4/cancel_orders        | Cancel Batch Order(v4) (SIGNED)           | UID          | 40 times/2 sec |
| /spot/v4/cancel_all           | Cancel All Order(v4) (SIGNED)             | UID          | 1 times/3 sec  |
| /spot/v4/query/order          | Query Order By Id(v4) (SIGNED)            | X-BM-KEY     | 50 times/2 sec |
| /spot/v4/query/client-order   | Query Order By clientOrderId(v4) (SIGNED) | X-BM-KEY     | 50 times/2 sec |
| /spot/v4/query/open-orders    | Current Open Orders(v4) (SIGNED)          | X-BM-KEY     | 12 times/2 sec |
| /spot/v4/query/history-orders | Account Orders(v4) (SIGNED)               | X-BM-KEY     | 12 times/2 sec |
| /spot/v4/query/trades         | Account Trade List(v4) (SIGNED)           | X-BM-KEY     | 12 times/2 sec |
| /spot/v4/query/order-trades   | Order Trade List(v4) (SIGNED)             | X-BM-KEY     | 12 times/2 sec |

| Sub-Account Interface                        | Interface Name                                                    | Limit Target | Rate           |
| -------------------------------------------- | ----------------------------------------------------------------- | ------------ | -------------- |
| /account/sub-account/main/v1/sub-to-main     | Sub-Account Spot Asset Transfer (For Main Account)                | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/sub/v1/sub-to-main      | Sub-Account Spot Asset Transfer (For Sub-Account)                 | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/main/v1/main-to-sub     | Main Account Spot Asset Transfer (For Main Account)               | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/sub/v1/sub-to-sub       | Sub-Account to Sub-Account Spot Asset Transfer (For Sub-Account)  | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/main/v1/sub-to-sub      | Sub-account to Sub-Account Spot Asset Transfer (For Main Account) | X-BM-KEY     | 2 times/2 sec  |
| /account/sub-account/main/v1/transfer-list   | Query Sub-account Spot Asset Transfer History (For Main Account)  | X-BM-KEY     | 8 times/2 sec  |
| /account/sub-account/v1/transfer-history     | Get Account Spot Asset Transfer History                           | X-BM-KEY     | 8 times/2 sec  |
| /account/sub-account/main/v1/wallet          | Get Sub-Account Spot Wallet Balance (For Main Account)            | X-BM-KEY     | 12 times/2 sec |
| /account/sub-account/main/v1/subaccount-list | Get Sub-account List (For Main Account)                           | X-BM-KEY     | 8 times/2 sec  |

| Margin Loan Interface                  | Interface Name                             | Limit Target | Rate            |
| -------------------------------------- | ------------------------------------------ | ------------ | --------------- |
| /spot/v1/margin/isolated/borrow        | Margin Borrow (Isolated)                   | X-BM-KEY     | 2 times/2 sec   |
| /spot/v1/margin/isolated/repay         | Margin Repay (Isolated)                    | X-BM-KEY     | 2 times/2 sec   |
| /spot/v1/margin/isolated/borrow_record | Get Borrow Record(Isolated)                | X-BM-KEY     | 150 times/2 sec |
| /spot/v1/margin/isolated/repay_record  | Get Repayment Record(Isolated)             | X-BM-KEY     | 150 times/2 sec |
| /spot/v1/margin/isolated/pairs         | Get Trading Pair Borrowing Rate and Amount | X-BM-KEY     | 2 times/2 sec   |

### REST API

Speed limit judgment:

Each call to the interface will return 3 Response Headers with limit tags, as
shown below:

> Example:

Copy Success

Copy to Clipboard

`X-BM-RateLimit-Remaining: 10 X-BM-RateLimit-Limit: 600 X-BM-RateLimit-Reset: 60 The above setting means that it can be called 600 times within 60 seconds, and currently has been called 10 times`

| Response Header          | Description                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| X-BM-RateLimit-Remaining | The number of requests that have been used in the current time window |
| X-BM-RateLimit-Limit     | The max number of requests in the current time window                 |
| X-BM-RateLimit-Reset     | Current time window, in seconds                                       |

Note that when X-BM-RateLimit-Remaining> X-BM-RateLimit-Limit, please do not
continue to call, otherwise it will be banned

## About recvWindow, timestamp

Currently only applicable to v4 interfaces

### Time synchronization security

Signed interfaces require the timestamp parameter to be passed, whose value
should be the Unix timestamp (in milliseconds) at the time the request is sent,
set in the `X-BM-TIMESTAMP` header of the request. When the server receives the
request, it will check the timestamp in the request. If it was sent more than
5000 milliseconds ago, the request will be considered invalid. This time window
value can be defined by sending the optional parameter `recvWindow`.

The pseudo code for this logic is as follows:

Copy Success

Copy to Clipboard

`if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow)   {     // process request   }    else    {     // reject request   }`

### About trade timeliness

The internet is not always stable and reliable, so there may be latency
fluctuations between your program and the BitMart server. This is the purpose of
setting `recvWindow`. If you are engaged in high-frequency trading and have high
requirements for trade timeliness, you can set recvWindow flexibly to meet your
requirements.

It is recommended to use a recvWindow of less than 5 seconds! It cannot exceed
60 seconds at most!

## Public API Definitions

#### Field description

- `currency` Currency refers to the basic unit that can be transferred in and
  out, such as BTC, ETH, EOS, etc
- `symbol` Trading pair name, consists of base and quote currency. Taking
  BTC_USDT as an example, BTC is the base currency, and USDT is the quote
  currency. Trading pairs are mainly used in spot trading
- `orderId` Order number, the order ID under the same currency pair of each
  business line is unique
- `tradeId` The unique number of the trade

#### Order State （Field:state)

- `new`\=The order has been accepted by the engine.
- `partially_filled`\=A part of the order has been filled.
- `filled`\=The order has been completed.
- `canceled`\=The order has been canceled.
- `partially_canceled`\=A part of the order has been filled, and the order has
  been canceled.

#### Order Cancellation Reason （Field:cancelSource)

- `user`\=User manually canceled.
- `system`\=System automatically canceled.

#### Order Side （Field:side)

- `buy`\=Buy
- `sell`\=Sell

#### Order Type （Field:type)

- `limit`\=Limit Order
- `market`\=Market Order
- `limit_maker`\=PostOnly Order
- `ioc`\=IOC Order

#### Trade Role （Field:tradeRole)

- `taker`\=Take orders, take the initiative to deal
- `maker`\=Pending order, passive transaction

#### Timestamp

All the times returned by the system are in the form of timestamps.

# System Status

## Get System Time

`Get system time`

#### Request URL

`GET https://api-cloud.bitmart.com/system/time`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/system/time`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "server_time": 1527777538000   } }`

| Field       | Type | Description                                               |
| ----------- | ---- | --------------------------------------------------------- |
| server_time | Long | Current system time (timestamp, accuracy in milliseconds) |

## Get System Service Status

`Get system service status`

#### Request URL

`GET https://api-cloud.bitmart.com/system/service`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/system/service`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "service":[       {          "title": "Spot API Stop",          "service_type": "spot",          "status": "2",          "start_time": 1527777538000,          "end_time": 1527777538000      },      {         "title": "Contract API Stop",         "service_type": "contract",         "status": "2",         "start_time": 1527777538000,         "end_time": 1527777538000     }    ]   } }`

| Field        | Type   | Description                                                                                                                                        |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| title        | String | System maintenance instructions title                                                                                                              |
| status       | Long   | System maintenance status<br>- <code>0</code>=Waiting<br>- <code>1</code>=Working<br>- <code>2</code>=Completed                                    |
| service_type | String | Service type<br>- <code>spot</code>=Spot API service<br>- <code>contract</code>=Contract API service<br>- <code>account</code>=Account API service |
| start_time   | Long   | System maintenance start time, UTC-0, timestamp accuracy in milliseconds                                                                           |
| end_time     | Long   | System maintenance end time, UTC-0, timestamp accuracy in milliseconds                                                                             |

# Public Market Data

## Get Currency List (V1)

`Get a list of all cryptocurrencies on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/currencies`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/v1/currencies`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "currencies": [       {         "id": "BTC",         "name": "Bitcoin",         "withdraw_enabled": true,         "deposit_enabled": true       },       {         "id": "ETH",         "name": "Ethereum",         "withdraw_enabled": true,         "deposit_enabled": true       }     ]   } }`

| Field            | Type    | Description                                                                                                  |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| id               | String  | Currency abbreviation, such as BTC                                                                           |
| name             | String  | Currency full name, such as Bitcoin                                                                          |
| withdraw_enabled | Boolean | Whether this currency can be withdrawn on the platform<br>- <code>true</code>=can<br>- <code>false</code>=no |
| deposit_enabled  | Boolean | Whether this currency can be deposited on the platform<br>- <code>true</code>=can<br>- <code>false</code>=no |

If the currency you need is not included in the returned response, the currency
may have been delisted.

## Get Trading Pairs List (V1)

`Get a list of all trading pairs on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/symbols`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/v1/symbols`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "symbols": [        "BMX_ETH",        "XLM_ETH",        "MOBI_ETH"     ]   } }`

| Field   | Type                  | Description            |
| ------- | --------------------- | ---------------------- |
| symbols | List<symbol></symbol> | Array of trading pairs |

##### Note

- Returns an array of trading pairs
- "BMX_ETH" it means that the base currency of this trading pair is BMX, and the
  quote currency is ETH

## Get Trading Pair Details (V1)

`Get a detailed list of all trading pairs on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/symbols/details`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/v1/symbols/details`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "symbols": [         {             "symbol":"GXC_BTC",              "symbol_id":1024,              "base_currency":"GXC",              "quote_currency":"BTC",              "quote_increment":"1.00000000",              "base_min_size":"1.00000000",              "price_min_precision":6,              "price_max_precision":8,              "expiration":"NA",              "min_buy_amount":"0.00010000",              "min_sell_amount":"0.00010000",              "trade_status":"trading"         }     ]   } }`

| Field               | Type   | Description                                                                            |
| ------------------- | ------ | -------------------------------------------------------------------------------------- |
| symbols             | List   | Array of trading pair details                                                          |
| symbol              | String | Trading pair name                                                                      |
| symbol_id           | Int    | Trading pair id                                                                        |
| base_currency       | String | Base currency                                                                          |
| quote_currency      | String | Quote currency                                                                         |
| quote_increment     | String | The minimum order quantity is also the minimum order quantity increment                |
| base_min_size       | String | Minimum order quantity                                                                 |
| price_min_precision | Number | Minimum price accuracy (decimal places), used to query k-line and depth                |
| price_max_precision | Number | Maximum price accuracy (decimal places), used to query k-line and depth                |
| expiration          | String | Expiration time of trading pair                                                        |
| min_buy_amount      | String | Minimum order amount                                                                   |
| min_sell_amount     | String | Minimum sell amount                                                                    |
| trade_status        | String | Trade Status<br>- <code>trading</code>=is trading<br>- <code>pre-trade</code>=pre-open |

## Get Ticker of All Pairs (V3)

`Get all trading pairs with a volume greater than 0 within 24 hours. Market data includes: latest transaction price, best bid price, best ask price and 24-hour transaction volume snapshot information. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Ticker channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/tickers`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`` curl https://api-cloud.bitmart.com/spot/quotation/v3/tickers` ``

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": [     [       "BTC_USDT",  // symbol       "30000.00",  // last       "582.08066", // v_24h       "4793098.48", // qv_24h       "28596.30", // open_24h       "31012.44", // high_24h       "12.44", // low_24h       "0.04909", // fluctuation       "30000", // bid_px       "1",  // bid_sz       "31012.44",  // ask_px       "69994.75267", // ask_sz       "1691671091933" // ts     ],     [       "ETH_USDT",       "1840.00",       "2.00000",       "3680.00",       "1842.18",       "1842.18",       "1840.00",       "-0.00118",       "1812.35",       "4.61989",       "1859.34",       "4.07793",       "1691671094213"     ]   ] }`

| Field       | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| symbol      | String | Trading pair                           |
| last        | String | Latest price                           |
| v_24h       | String | 24-hour trade volume in base currency  |
| qv_24h      | String | 24-hour trade volume in quote currency |
| open_24h    | String | 24-hour open price                     |
| high_24h    | String | 24-hour highest price                  |
| low_24h     | String | 24-hour lowest price                   |
| fluctuation | String | 24-hour price change                   |
| bid_px      | String | top buy price                          |
| bid_sz      | String | Size of top buy order                  |
| ask_px      | String | top sell price                         |
| ask_sz      | String | Size of top sell order                 |
| ts          | String | Time of generation(in milliseconds)    |

## Get Ticker of a Trading Pair (V3)

`Applicable to query the aggregated market price of a certain trading pair, and return the latest ticker information. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Ticker channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/ticker`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/quotation/v3/ticker?symbol=BTC_USDT`

| Field  | Type   | Required? | Description                  |
| ------ | ------ | --------- | ---------------------------- |
| symbol | String | Yes       | Trading pair (e.g. BMX_USDT) |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": {     "symbol": "BTC_USDT",     "last": "30000.00",     "v_24h": "582.08066",     "qv_24h": "4793098.48",     "open_24h": "28596.30",     "high_24h": "31012.44",     "low_24h": "12.44",     "fluctuation": "0.04909",     "bid_px": "30000",     "bid_sz": "1",     "ask_px": "31012.44",     "ask_sz": "69994.75267",     "ts": "1691671061919"   } }`

| Field       | Type   | Description                            |
| ----------- | ------ | -------------------------------------- |
| symbol      | String | Trading pair                           |
| last        | String | Latest price                           |
| v_24h       | String | 24-hour trade volume in base currency  |
| qv_24h      | String | 24-hour trade volume in quote currency |
| open_24h    | String | 24-hour open price                     |
| high_24h    | String | 24-hour highest price                  |
| low_24h     | String | 24-hour lowest price                   |
| fluctuation | String | 24-hour price change                   |
| bid_px      | String | top buy price                          |
| bid_sz      | String | Size of top buy order                  |
| ask_px      | String | top sell price                         |
| ask_sz      | String | Size of top sell order                 |
| ts          | String | Time of generation(in milliseconds)    |

1.If no corresponding trading pair is found, this trading pair has been
delisted.  
2.For frequent query needs, we recommend using this endpoint to obtain
aggregated ticker for a single trading pair.

## Get Latest K-Line (V3)

`Query the latest K-line and return a maximum of 1000 data. Note that the latest K-line of the interface is not real-time data. If you want real-time data, please use websocket to subscribe to K-line channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/lite-klines`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/quotation/v3/lite-klines?symbol=BMX_ETH&step=15&limit=10`

| Field  | Type   | Required? | Description                                                                                                              |
| ------ | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| symbol | String | Yes       | Trading pair (e.g. <code>BMX_USDT</code>)                                                                                |
| before | Long   | No        | Query timestamp (unit: second, e.g. 1525760116), query the data before this time                                         |
| after  | Long   | No        | Query timestamp (unit: second, e.g. 1525769116), query the data after this time                                          |
| step   | Int    | No        | k-line step, value <code>[1, 5, 15, 30, 60,</code><br><code>120, 240, 1440, 10080, 43200]</code> unit: minute, default 1 |
| limit  | Int    | No        | Return number, the maximum value is 200, default is 100                                                                  |

A total of four query modes are supported:  
1\. If only before is passed, check forward according to the time  
2\. If only after is passed, check backward according to the time  
3\. Both before and after need to verify whether the time interval is legal, and
if it is legal, check the interval  
4\. If neither before nor after is passed, the latest K-line will be returned in
reverse order

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code":1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data":[     [       "1689736680",  // t       "3.721",  // o       "3.743",  // h       "3.677",  // l       "3.708",  // c       "22698348.04828491",  // v       "12698348.04828491"  // qv     ],     [       "1689736620",       "3.731",       "3.799",       "3.494",       "3.72",       "67632347.24399722",       "37632347.24399722"     ]   ] }`

| Field | Type   | Description                                                                                    |
| ----- | ------ | ---------------------------------------------------------------------------------------------- |
| t     | String | Create timestamp (in seconds), It can be used as the unique identification of K line           |
| o     | String | Open price                                                                                     |
| h     | String | Highest price                                                                                  |
| l     | String | Lowest price                                                                                   |
| c     | String | Close price                                                                                    |
| v     | String | Trading volume, with a unit of currency (If in BTC_USDT, The unit is BTC)                      |
| qv    | String | Trading volume, the value is the quantity in quote currency (If in BTC_USDT, The unit is USDT) |

## Get History K-Line (V3)

`Get k-line data within a specified time range of a specified trading pair. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe KLine channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/klines`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/quotation/v3/klines?symbol=BMX_ETH&step=15&limit=10`

| Field  | Type   | Required? | Description                                                                                                              |
| ------ | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| symbol | String | Yes       | Trading pair (e.g. <code>BMX_USDT</code>)                                                                                |
| before | Long   | No        | Query timestamp (unit: second, e.g. 1525760116), query the data before this time                                         |
| after  | Long   | No        | Query timestamp (unit: second, e.g. 1525769116), query the data after this time                                          |
| step   | Int    | No        | k-line step, value <code>[1, 5, 15, 30, 60,</code><br><code>120, 240, 1440, 10080, 43200]</code> unit: minute, default 1 |
| limit  | Int    | No        | Return number, the maximum value is 200, default is 100                                                                  |

A total of four query modes are supported:  
1\. If only before is passed, check forward according to the time  
2\. If only after is passed, check backward according to the time  
3\. Both before and after need to verify whether the time interval is legal, and
if it is legal, check the interval  
4\. If neither before nor after is passed, the latest K-line will be returned in
reverse order

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code":1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data":[     [       "1689736680",  // t       "3.721",  // o       "3.743",  // h       "3.677",  // l       "3.708",  // c       "22698348.04828491",  // v       "12698348.04828491"  // qv     ],     [       "1689736620",       "3.731",       "3.799",       "3.494",       "3.72",       "67632347.24399722",       "37632347.24399722"     ]   ] }`

| Field | Type   | Description                                                                                    |
| ----- | ------ | ---------------------------------------------------------------------------------------------- |
| t     | String | Create timestamp (in seconds), It can be used as the unique identification of K line           |
| o     | String | Open price                                                                                     |
| h     | String | Highest price                                                                                  |
| l     | String | Lowest price                                                                                   |
| c     | String | Close price                                                                                    |
| v     | String | Trading volume, with a unit of currency (If in BTC_USDT, The unit is BTC)                      |
| qv    | String | Trading volume, the value is the quantity in quote currency (If in BTC_USDT, The unit is USDT) |

## Get Depth (V3)

`Get full depth of trading pairs. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Depth channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/books`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/quotation/v3/books?symbol=BTC_USDT&limit=1`

| Field  | Type   | Required? | Description                                                                                                              |
| ------ | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------ |
| symbol | String | Yes       | Trading pair (e.g. <code>BMX_USDT</code>)                                                                                |
| limit  | Int    | No        | Order book depth per side. Maximum 50, e.g. 50 bids + 50 asks. Default returns to 35 depth data, e.g. 35 bids + 35 asks. |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": {     "ts": "1691672864874",     "symbol": "BTC_USDT",     "asks": [       [         "31012.44",  // price         "69994.75267"  // amount       ]     ],     "bids": [       [         "30000.00", // price         "1.00000"  // amount       ]     ]   } }`

| Field  | Type   | Description                            |
| ------ | ------ | -------------------------------------- |
| ts     | String | Create time(Timestamp in milliseconds) |
| symbol | String | Trading pair                           |
| asks   | List[] | Order book on sell side                |
| bids   | List[] | Order book on buy side                 |
| amount | String | Total number of current price depth    |
| price  | String | The price at current depth             |

## Get Recent Trades (V3)

`Get the latest trade records of the specified trading pair. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Trade channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/trades`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/spot/quotation/v3/trades?symbol=BMX_ETH&limit=10`

| Field  | Type   | Required? | Description                                         |
| ------ | ------ | --------- | --------------------------------------------------- |
| symbol | String | Yes       | Trading pair (e.g. <code>BMX_USDT</code>)           |
| limit  | Int    | No        | Number of returned items, maximum is 50, default 50 |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": [     [       "BMX_ETH", // symbol       "1691743270994", // ts       "1.00000000", // price       "1.0", // size       "sell" // side     ]   ] }`

| Field  | Type   | Description                                             |
| ------ | ------ | ------------------------------------------------------- |
| symbol | String | Trading pair                                            |
| ts     | String | Trade time (in milliseconds)                            |
| price  | String | Trade price                                             |
| size   | String | Trade number                                            |
| side   | String | Order Side<br>- <code>buy</code><br>- <code>sell</code> |

# Funding Account

## Get Account Balance (KEYED)

`Gets Account Balance`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/wallet?currency=USDT&needUsdValuation=true`

| Field            | Type   | Required? | Description                                                        |
| ---------------- | ------ | --------- | ------------------------------------------------------------------ |
| currency         | String | No        | Currency                                                           |
| needUsdValuation | Bool   | No        | Whether to return the USD valuation, default is <code>false</code> |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"ef834248-51d3-4223-9481-f862aa9dd39f",     "data":{         "wallet":[             {                 "currency":"USDT",                 "name":"Tether USD",                 "available":"1000.00000000",                 "available_usd_valuation":"1002.00000000",                 "frozen":"0.00000000",                 "unAvailable":"0.00000000"             }         ]     } }`

| Field                   | Type   | Description                                   |
| ----------------------- | ------ | --------------------------------------------- |
| currency                | String | Token symbol, e.g., 'BTC'                     |
| name                    | String | Token name, e.g., 'Bitcoin'                   |
| available               | String | Available Balance                             |
| available_usd_valuation | String | Available Balance USD valuation               |
| frozen                  | String | Trading frozen Balance                        |
| unAvailable             | String | Trading frozen Balance + Other frozen Balance |

Only assets with a balance greater than 0 will be returned.

## Get Currencies

`Gets the currency of the asset for withdrawal`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/currencies`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud.bitmart.com/account/v1/currencies?currencies=BTC,ETH,BMX`

| Field      | Type   | Required? | Description                                                                                                           |
| ---------- | ------ | --------- | --------------------------------------------------------------------------------------------------------------------- |
| currencies | String | No        | Single query, such as <code>BTC</code>; multiple queries, such as <code>BTC,ETH,BMX</code>, can have a maximum of 20. |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "currencies": [       {         "currency": "USDT",         "name": "Tether USD",         "contract_address": null,         "network": "OMNI",         "withdraw_enabled": false,         "deposit_enabled": false,         "withdraw_minsize": null,         "withdraw_minfee": null,         "withdraw_fee": "10",         "withdraw_fee_estimate": "10.3"       },       {         "currency": "USDT-TRC20",         "name": "USDT-TRC20",         "contract_address": "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t",         "network": "TRC20",         "withdraw_enabled": true,         "deposit_enabled": true,         "withdraw_minsize": "10",         "withdraw_minfee": null,         "withdraw_fee": "10",         "withdraw_fee_estimate": "10.3"       },       {         "currency": "USDT-ERC20",         "name": "USDT-ERC20",         "contract_address": "0xdac17f958d2ee523a2206206994597c13d831ec7",         "network": "ERC20",         "withdraw_enabled": true,         "deposit_enabled": true,         "withdraw_minsize": "26",         "withdraw_minfee": null,         "withdraw_fee": "26",         "withdraw_fee_estimate": "26.3"       }     ]   } }`

| Field                 | Type    | Description                                                                                     |
| --------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| currency              | String  | Token symbol, e.g., 'BTC'                                                                       |
| name                  | String  | Token name, e.g., 'Bitcoin'                                                                     |
| contract_address      | String  | Contract address                                                                                |
| network               | String  | network, e.g., 'ERC20'                                                                          |
| withdraw_enabled      | Boolean | Availability to withdraw<br>- <code>true</code>=available<br>- <code>false</code>=not available |
| deposit_enabled       | Boolean | Availability to deposit<br>- <code>true</code>=available<br>-<code>false</code>=not available   |
| withdraw_minsize      | String  | Minimum withdrawal amount                                                                       |
| withdraw_minfee       | String  | Minimum withdrawal fee (After 2025-05-18, the field will be removed)                            |
| withdraw_fee          | String  | Withdrawal fee. The unit corresponds to the currency                                            |
| withdraw_fee_estimate | String  | Withdrawal fee estimate. The unit is USD.                                                       |

1\. If the returned response does not contain the currency you need, the
currency may have been removed.  
2\. There are multiple USDT currencies. Note that:  
\`currency\` = \`USDT\` default is OMNI network  
\`currency\` = \`USDT-TRC20\` , is TRC20 network  
\`currency\` = \`USDT-ERC20\`, is ERC20 network

## Get Spot Wallet Balance (KEYED)

`Get the user's wallet balance for all currencies`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/wallet`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "wallet": [          {               "id": "BTC",               "available": "10.000000",               "name": "Bitcoin",               "frozen": "10.000000",           },           ...     ]   } }`

| Field     | Type   | Description                 |
| --------- | ------ | --------------------------- |
| id        | String | Cryptocurrency abbreviation |
| name      | String | Full name                   |
| available | String | Available balance           |
| frozen    | String | Frozen balance              |

## Deposit Address (KEYED)

`Gets Deposit Address`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/deposit/address`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/deposit/address?currency=USDT-TRC20`

| Field    | Type   | Required? | Description               |
| -------- | ------ | --------- | ------------------------- |
| currency | String | Yes       | Token symbol, e.g., 'BTC' |

**Instruction**

![PNG](../../images/usdt_address_en-4cddf274.png)

USDT has multiple recharge addresses, please select them correctly. For
example:  
\`currency\` = \`USDT\` default is OMNI;  
\`currency\` = \`USDT-TRC20\` is TRC20;  
\`currency\` = \`USDT-ERC20\` is ERC20;

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"0e6edd79-f77f-4251-abe5-83ba75d06c1a",     "data":{         "currency":"USDT-TRC20",         "chain":"USDT-TRC20",         "address":"TGR3ghy2b5VLbyAYrmiE15jasR6aPHTvC5",         "address_memo":""     } }`

| Field        | Type   | Description                                                                                                                       |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| currency     | String | Token symbol, e.g., 'BTC'                                                                                                         |
| chain        | String | Token chain                                                                                                                       |
| address      | String | Deposit address                                                                                                                   |
| address_memo | String | Tag (tag/payment_id/memo); If some currencies need to withdraw currency, it will return data. If not, it will return empty string |

This interface is not available for sub-account

The tag names required by each currency are different, such as
(tag/payment_id/memo). For convenience, BitMart is uniformly defined as
address_Memo. This means that regardless of the currency in which
tag/payment_id/memo is required, the service returns the address_Memo field
uniformly. Please pay attention to the distinction.  
Tag are required for some tokens. Please include them while making deposits to
ensure the your funds will be properly credited.  
IOTA and HLX COINS are temporarily not supported for deposit.

[Forgot to write Memo/Wrote a wrong Memo?](https://bitmart.zendesk.com/hc/en-us/articles/360050031134-Forgot-to-write-Memo-Wrote-a-wrong-Memo)

## Withdraw Quota (KEYED)

`Query withdraw quota for currencies`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/withdraw/charge`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/account/v1/withdraw/charge?currency=BTC`

| Field    | Type   | Required? | Description               |
| -------- | ------ | --------- | ------------------------- |
| currency | String | Yes       | Token symbol, e.g., 'BTC' |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"62a80bde-0cb4-4bf1-b8e5-5ad2c71463e7",     "data":{         "today_available_withdraw_BTC":"100.0000",         "min_withdraw":"0.00000000",         "withdraw_precision":8,         "withdraw_fee":"0.00000000",         "withdraw_Precision_GeTen": 10     } }`

| Field                        | Type   | Description                                                                                                         |
| ---------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| today_available_withdraw_BTC | String | Amount available for withdrawal today, unit: BTC                                                                    |
| min_withdraw                 | String | Minimum withdrawal amount                                                                                           |
| withdraw_precision           | Int    | Withdrawal amount must be accurate to several decimal places.                                                       |
| withdraw_fee                 | String | Withdrawal fee                                                                                                      |
| withdraw_Precision_GeTen     | Long   | Withdrawal amount must be an integral multiple of this value. If it is null, it means there is no such requirement. |

This interface is not available for sub-account

1\. When \`withdraw_precision\`=5, then the decimal point of the withdrawal
amount cannot exceed 5 digits.  
2\. When \`withdraw_Precision_GeTen\`=10, then the withdrawal amount must be an
integral multiple of 10.

## Withdraw (SIGNED)

`Creates a withdraw request from spot account to an external address`

`The API can only make withdrawal to verified addresses, and verified addresses can be set by WEB/APP.`

#### Request URL

`POST https://api-cloud.bitmart.com/account/v1/withdraw/apply`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

| Field    | Type   | Required? | Description                        |
| -------- | ------ | --------- | ---------------------------------- |
| currency | String | Yes       | Token symbol, e.g., 'BTC'          |
| amount   | String | Yes       | The amount of currency to withdraw |

#### Parameters for Withdraw to the blockchain

> 1.Request: Withdraw to the blockchain

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{ {     "currency": "USDT-TRC20",     "amount": "100.000",     "destination": "To Digital Address",     "address": "0x1EE6FA5A3803608fc22a1f3F76********",     "address_memo": "" }' https://api-cloud.bitmart.com/account/v1/withdraw/apply`

| Field        | Type   | Required? | Description                                                                    |
| ------------ | ------ | --------- | ------------------------------------------------------------------------------ |
| address      | String | Yes       | Withdraw address (only the address added on the official website is supported) |
| address_memo | String | No        | Address tag(tag Or payment_id Or memo)                                         |
| destination  | String | No        | Remark                                                                         |

#### Parameters for Withdraw to BitMart account

> 2.Request: Withdraw to BitMart account

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{ {     "currency": "USDT-TRC20",     "amount": "100.000",     "type": 1,     "value": "876940329",     "areaCode": "" }' https://api-cloud.bitmart.com/account/v1/withdraw/apply`

| Field    | Type   | Required? | Description                                                                        |
| -------- | ------ | --------- | ---------------------------------------------------------------------------------- |
| type     | Int    | Yes       | Account type<br><code>1</code>=CID<br><code>2</code>=Email<br><code>3</code>=Phone |
| value    | String | Yes       | Account                                                                            |
| areaCode | String | Yes       | Phone area code, required when account type is phone, e.g.: 61                     |

##### Important notes on request parameters

1\. If the currency has multiple blockchains, please pay attention to passing
parameters: such as USDT  
\`currency\`=\`USDT-TRX\` network is TRX  
\`currency\`=\`USDT-ETH\` network is ETH  
\`currency\`=\`USDT-BSC_BNB\` network is BSC_BNB  
\`currency\`=\`USDT-SOL\` network is SOL  
\`currency\`=\`USDT-ALGO\` network is ALGO  
[find more currencies network](#get-currencies)  
2\. Withdraw only supports addresses in the list of commonly used addresses of
users. IOTA, HLX one-time currency withdrawal address cannot be set as the
common address, so IOTA, HLX withdrawal address is not supported.  
3\. Without the withdrawal tag, \`address_memo\` does not pass or pass an empty
string.  
4\. If the parameters for \`Withdraw to the blockchain\` and the parameters for
\`Withdraw to BitMart account\` are transmitted at the same time, the parameters
for \`Withdraw to the blockchain\` will take precedence.

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "withdraw_id": "121212"   } }`

| Field       | Type   | Description  |
| ----------- | ------ | ------------ |
| withdraw_id | String | Withdrawa ID |

##### Note

This interface is not available for sub-account

**1\. When withdraw_id is returned, it means that the withdrawal request has
been sent successfully.**

**2\. You can check the tx_id of this withdrawal by using the interface of
[Get A Deposit Or Withdraw Detail](#get-a-deposit-or-withdraw-detail-keyed), and
use it to query the withdrawal progress on the blockchain.**

**3\. If you get an error
message， message=`This address is not verified. Please add and verify this address on the client`**  
You
need to add the address to the whitelist address according to the following 3
steps.

Step 1: After logging in to the account on the Web or APP, enter the withdrawal
page.

Step 2: Click【Add withdrawal address】

![PNG](../../images/add-address-v2-step1-en-eeaabb94.png)

Step 3: On the address management page, save the withdrawal address as
\[Verified Address\], which supports API withdrawal.

![PNG](../../images/add-address-v2-step2-en-47a1ddb2.png)
![PNG](../../images/add-address-v2-step3-en-36045e7f.png)

**4\. Address Types:**

1\. Standard Address: Can be withdrawn to a specified currency and network
address.  
2\. Universal Address: Can be withdrawn to all currencies on the specified
network.  
3\. EVM Address: Can be withdrawn to currencies on EVM type networks.

**5\. Verified Addresses:**

1\. When saving an address, it can be pre-verified to skip the verification
during withdrawal (Verified addresses will not need to be verified again during
the withdrawal process).  
2\. API withdrawal must use verified addresses; un-verified addresses cannot be
used for withdrawal via API.

## Withdraw Address (KEYED)

`Gets Withdraw Address List`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/withdraw/address/list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/withdraw/address/list`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message":"OK",   "code":1000,   "trace":"0e6edd79-f77f-4251-abe5-83ba75d06c1a",   "data":{     "list": [       {         "currency": "ETH",         "network": "ETH",         "address": "0x1121",         "memo": "12",         "remark": "12",         "addressType": 0,         "verifyStatus": 0       }]   } }`

| Field        | Type   | Description                                                                                                          |
| ------------ | ------ | -------------------------------------------------------------------------------------------------------------------- |
| address      | String | Withdraw Address                                                                                                     |
| memo         | String | Memo                                                                                                                 |
| remark       | String | Remark                                                                                                               |
| verifyStatus | Int    | Address verify status<br>-<code>0</code>=Unverified<br>-<code>1</code>=Verified                                      |
| addressType  | Int    | Address Type<br>-<code>0</code>=Standard Address<br>-<code>1</code>=Universal Address<br>-<code>2</code>=EVM Address |
| network      | String | Network. The value is present only when the address type is a Standard address or Universal Address                  |
| currency     | String | The value is present only when the address type is a Standard address                                                |

## Get Deposit And Withdraw History (KEYED)

`The original /account/v1/deposit-withdraw/history interface, the old interface is no longer supported, please switch to the new interface as soon as possible`

`Search for all existed withdraws and deposits and return their latest status.`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v2/deposit-withdraw/history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v2/deposit-withdraw/history?N=100&operation_type=withdraw&startTime=1739499865000`

| Field          | Type   | Required? | Description                                                              |
| -------------- | ------ | --------- | ------------------------------------------------------------------------ |
| currency       | String | No        | Token symbol, e.g., 'BTC'                                                |
| operation_type | String | Yes       | type<br>-<code>deposit</code>=deposit<br>-<code>withdraw</code>=withdraw |
| startTime      | Long   | No        | Default: 90 days from current timestamp (milliseconds)                   |
| endTime        | Long   | No        | Default: present timestamp (milliseconds)                                |
| N              | Int    | Yes       | Recent N records (value range 1-1000)                                    |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message":"OK",   "code":1000,   "trace":"142bf92a-fc50-4689-92b6-590886f90b97",   "data":{     "records":[       {         "withdraw_id":"1679952",         "deposit_id":"",         "operation_type":"withdraw",         "currency":"BMX",         "apply_time":1588867374000,         "arrival_amount":"59.000000000000",         "fee":"1.000000000000",         "status":0,         "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",         "address_memo":"",         "tx_id":""       }     ]   } }`

| Field          | Type   | Description                                                                                                                                                                                         |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| withdraw_id    | String | withdraw id                                                                                                                                                                                         |
| deposit_id     | String | deposit id                                                                                                                                                                                          |
| operation_type | String | type<br>-<code>deposit</code>=deposit<br>-<code>withdraw</code>=withdraw                                                                                                                            |
| currency       | String | Token symbol, e.g., 'BTC'                                                                                                                                                                           |
| apply_time     | Long   | The request timestamp is accurate to milliseconds(UTC-0)                                                                                                                                            |
| arrival_amount | String | Actual amount received                                                                                                                                                                              |
| fee            | String | fee                                                                                                                                                                                                 |
| status         | Int    | status<br>- <code>0</code>=Create<br>- <code>1</code>=Submitted, waiting for withdrawal<br>- <code>2</code>=Processing<br>- <code>3</code>=Done<br>- <code>4</code>=Cancel<br>- <code>5</code>=Fail |
| address        | String | Address                                                                                                                                                                                             |
| address_memo   | String | Address tag                                                                                                                                                                                         |
| tx_id          | String | Hash record                                                                                                                                                                                         |

1\. The deposit id has a value when \`operation_type\` = 'deposit'. The withdraw
id has a value when \`operation_type\` = 'withdraw'.  
2\. Tx_id is an empty string before it is chained.  
3\. Please notice the default startTime and endTime to make sure that time
interval is within 0-90 days.  
4\. If both startTime and endTime are sent, time between startTime and endTime
must be less than 90 days.

This endpoint is not available for sub-account

## Get A Deposit Or Withdraw Detail (KEYED)

`Query a single charge record`

#### Request URL

`GET https://api-cloud.bitmart.com/account/v1/deposit-withdraw/detail`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/v1/deposit-withdraw/detail?id=1679952`

| Field | Type   | Required? | Description                                         |
| ----- | ------ | --------- | --------------------------------------------------- |
| id    | String | Yes       | <code>withdraw_id</code> or <code>deposit_id</code> |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{         "record":{             "withdraw_id":"1679952",             "deposit_id":"",             "operation_type":"withdraw",             "currency":"BMX",             "apply_time":1588867374000,             "arrival_amount":"59.000000000000",             "fee":"1.000000000000",             "status":0,             "address":"0xe57b69a8776b37860407965B73cdFFBDFe668Bb5",             "address_memo":"",             "tx_id":""         }     } }`

| Field          | Type   | Description                                                                                                                                                                                         |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| withdraw_id    | String | withdraw id                                                                                                                                                                                         |
| deposit_id     | String | deposit id                                                                                                                                                                                          |
| operation_type | String | type<br>- <code>deposit</code>=deposit<br>- <code>withdraw</code>=withdraw                                                                                                                          |
| currency       | String | Token symbol, e.g., 'BTC'                                                                                                                                                                           |
| apply_time     | Long   | The request timestamp is accurate to milliseconds(UTC-0)                                                                                                                                            |
| arrival_amount | String | Actual amount received                                                                                                                                                                              |
| fee            | String | fee                                                                                                                                                                                                 |
| status         | Int    | status<br>- <code>0</code>=Create<br>- <code>1</code>=Submitted, waiting for withdrawal<br>- <code>2</code>=Processing<br>- <code>3</code>=Done<br>- <code>4</code>=Cancel<br>- <code>5</code>=Fail |
| address        | String | address                                                                                                                                                                                             |
| address_memo   | String | address tag                                                                                                                                                                                         |
| tx_id          | String | Hash record                                                                                                                                                                                         |

1\. The deposit id has a value when \`operation_type\` = 'deposit'. The withdraw
id has a value when \`operation_type\` = 'withdraw'.  
2\. Tx_id is an empty string before it is chained.

This interface is not available for sub-account

## Get Margin Account Details(Isolated) (KEYED)

`Applicable for isolated margin account inquiries`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/account`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/margin/isolated/account?symbol=BTC_USDT`

| Field  | Type   | Required? | Description                                                                                    |
| ------ | ------ | --------- | ---------------------------------------------------------------------------------------------- |
| symbol | String | No        | Trading pair (e.g. BMX_USDT), no symbol is passed, and all isolated margin assets are returned |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "symbols":[         {           "symbol": "BTC_USDT",           "risk_rate": "18.77",           "risk_level": "1",           "buy_enabled": true,           "sell_enabled": true,           "liquidate_price": "-0.09408905",           "liquidate_rate": "1.1",           "base": {             "currency": "BTC",             "borrow_enabled": false,             "borrowed": "2.00000000",             "borrow_unpaid": "0.84478234",             "interest_unpaid": "0.01385763",             "available": "112.89603334",             "frozen": "0.00000000",             "net_asset": "110.89603334",             "net_assetBTC": "0.00000000",             "total_asset": "112.89603334"           },           "quote": {             "currency": "USDT",             "borrow_enabled": true,             "borrowed": "0.00000000",             "borrow_unpaid": "0.84478234",             "interest_unpaid": "0.01385763",             "available": "10.00000000",             "frozen": "0.00000000",             "net_asset": "10.00000000",             "net_assetBTC": "0.00000000",             "total_asset": "10.00000000"           }         },         ...       ]     } }`

| Field           | Type    | Description                                                |
| --------------- | ------- | ---------------------------------------------------------- |
| symbol          | String  | Trading pair                                               |
| risk_rate       | String  | Current risk rate                                          |
| risk_level      | String  | Risk level                                                 |
| buy_enabled     | Boolean | Whether open to buy                                        |
| sell_enabled    | Boolean | Whether open to sell                                       |
| liquidate_price | String  | Liquidation price (precision: 8 decimal places)            |
| liquidate_rate  | String  | Liquidation rate                                           |
| currency        | String  | Currency                                                   |
| borrow_enabled  | Boolean | Whether open to borrow                                     |
| borrowed        | String  | Borrowed assets (precision: 8 decimal places)              |
| borrow_unpaid   | String  | Outstanding principal amount (precision: 8 decimal places) |
| interest_unpaid | String  | Interest outstanding (precision: 8 decimal places)         |
| available       | String  | Available assets (precision: 8 decimal places)             |
| frozen          | String  | Trading frozen assets (precision: 8 decimal places)        |
| net_asset       | String  | Net assets (precision: 8 decimal places)                   |
| net_assetBTC    | String  | Converted BTC net assets (precision: 8 decimal places)     |
| total_asset     | String  | Total assets (precision: 8 decimal places)                 |

## Margin Asset Transfer (SIGNED)

`For fund transfers between a margin account and spot account`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/transfer`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1",     "side":"in" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/transfer`

| Field    | Type   | Required? | Description                                                                            |
| -------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| symbol   | String | Yes       | Trading pair (e.g. BMX_USDT)                                                           |
| currency | String | Yes       | Currency                                                                               |
| amount   | String | Yes       | Amount of transfers (precision: 8 decimal places)                                      |
| side     | String | Yes       | Transfer direction<br>- <code>in</code>=Transfer in<br>- <code>out</code>=Transfer out |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "transfer_id":"124532"     } }`

| Field       | Type   | Description                                                   |
| ----------- | ------ | ------------------------------------------------------------- |
| transfer_id | String | Transfer order id, only successful transfers will be returned |

## Get Basic Fee Rate (KEYED)

`For querying the base rate of the current user`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/user_fee`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/user_fee`

None

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message":"OK",   "code":1000,   "trace":"0187ba0c876e4236ac191d9848a0f719.94.16778301620100121",   "data":{     "user_rate_type":0,     "level":"LV1",     "taker_fee_rate_A":"0.001",     "maker_fee_rate_A":"0.001",     "taker_fee_rate_B":"0.0025",     "maker_fee_rate_B":"0.0025",     "taker_fee_rate_C":"0.004",     "maker_fee_rate_C":"0.004",     "taker_fee_rate_D":"0.006",     "maker_fee_rate_D":"0.006"   } }`

| Field            | Type   | Description                                                                                                      |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------- |
| user_rate_type   | Long   | Rate type：<br>- <code>0</code>=Normal Users<br>- <code>1</code>=VIP Users<br>- <code>2</code>=Special VIP Users |
| level            | String | User Level                                                                                                       |
| taker_fee_rate_A | String | Taker fee rate for Class-A pairs                                                                                 |
| maker_fee_rate_A | String | Maker fee rate for Class-A pairs                                                                                 |
| taker_fee_rate_B | String | Taker fee rate for Class-B pairs                                                                                 |
| maker_fee_rate_B | String | Maker fee rate for Class-B pairs                                                                                 |
| taker_fee_rate_C | String | Taker fee rate for Class-C pairs                                                                                 |
| maker_fee_rate_C | String | Maker fee rate for Class-C pairs                                                                                 |
| taker_fee_rate_D | String | Taker fee rate for Class-D pairs                                                                                 |
| maker_fee_rate_D | String | Maker fee rate for Class-D pairs                                                                                 |

## Get Actual Trade Fee Rate (KEYED)

`For the actual fee rate of the trading pairs`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/trade_fee`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/trade_fee?symbol=BTC_USDT`

| Field  | Type   | Required? | Description                  |
| ------ | ------ | --------- | ---------------------------- |
| symbol | String | Yes       | Trading pair (e.g. BMX_USDT) |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "87614aa8-5327-4fe2-aafc-02e2ddca7210",   "data": {     "symbol": "BTC_USDT",     "buy_taker_fee_rate": "0.0008",     "sell_taker_fee_rate": "0.0008",     "buy_maker_fee_rate": "0.0006",     "sell_maker_fee_rate": "0.0006"   } }`

| Field               | Type   | Description           |
| ------------------- | ------ | --------------------- |
| symbol              | String | Trading pair          |
| buy_taker_fee_rate  | String | Taker fee rate (Buy)  |
| sell_taker_fee_rate | String | Taker fee rate (Sell) |
| buy_maker_fee_rate  | String | Maker fee rate (Buy)  |
| sell_maker_fee_rate | String | Maker fee rate (Sell) |

# Spot / Margin Trading

## New Order(v2) (SIGNED)

`Send in a new order.`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v2/submit_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "side":"buy",     "type":"limit",     "size":"10",     "price":"7000" }' https://api-cloud.bitmart.com/spot/v2/submit_order`

| Field           | Type   | Required? | Description                                                                                                                                                   |
| --------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol          | String | Yes       | Trading pair (e.g. BTC_USDT)                                                                                                                                  |
| side            | String | Yes       | Side<br>-<code>buy</code>=Buy order<br>-<code>sell</code>=Sell order                                                                                          |
| type            | String | Yes       | Order type<br>-<code>limit</code>=Limit order<br>-<code>market</code>=Market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order |
| client_order_id | String | No        | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters)                                     |

#### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit_maker/ioc)

| Field | Type   | Required? | Description |
| ----- | ------ | --------- | ----------- |
| size  | String | Yes       | Order size  |
| price | String | Yes       | Price       |

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field    | Type   | Required? | Description                           |
| -------- | ------ | --------- | ------------------------------------- |
| notional | String | Yes       | Required for placing orders by amount |

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type   | Required? | Description                             |
| ----- | ------ | --------- | --------------------------------------- |
| size  | String | Yes       | Required for placing orders by quantity |

**Instruction**

Buy-limit-maker

- When "order price">="market lowest selling price", the order will be canceled
  by the system
- When the "order price" <"the lowest selling price in the market", the order
  will be accepted by the system after the submission is successful
- When "order price"\*"order size"<minimum deal amount in the market, the order
  will be canceled by the system

Sell-limit-maker

- When "order price" <= "market highest bid price", after the order is
  submitted, the order will be canceled by the system
- When "order price"> "market highest bid price", the order will be accepted by
  the system after the submission is successful
- When "order price"\*"order size"<minimum deal amount in the market, the order
  will be canceled by the system

Buy-ioc,Sell-ioc

- After the order is placed, all orders that cannot be filled immediately are
  cancelled immediately

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "order_id":"1223181"   } }`

| Field    | Type   | Description |
| -------- | ------ | ----------- |
| order_id | String | Order ID    |

The request is successful only when order_id is returned.

## Cancel Order(v3) (SIGNED)

`Applicable to the cancellation of a specified unfinished order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v3/cancel_order`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol": "BTC_USDT",     "order_id": "112121212" }' https://api-cloud.bitmart.com/spot/v3/cancel_order`

| Field           | Type   | Required?                                          | Description                  |
| --------------- | ------ | -------------------------------------------------- | ---------------------------- |
| symbol          | String | Yes                                                | Trading pair (e.g. BMX_USDT) |
| order_id        | String | order_id, client_order_id, one of them is required | Order ID                     |
| client_order_id | String | order_id, client_order_id, one of them is required | Client-defined Order ID      |

In each request, you must select one of the parameters order_id and
client_order_id to submit

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "result": true   } }`

| Field  | Type    | Description                                                                                  |
| ------ | ------- | -------------------------------------------------------------------------------------------- |
| result | Boolean | Cancel result<br>-<code>true</code>=Cancel successfully<br>-<code>false</code>=Cancel failed |

\`result\` = 'true' indicates successful cancel; \`result\` = 'false' indicates
that the cancel failed because the order was matched or cancelled.

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

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "orderParams":[{           "clientOrderId":"123456789",           "size":"0.1",           "price":"8800",           "side":"buy",           "type":"limit"     }],     "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/batch_orders`

| Field       | Type   | Required? | Description                                                           |
| ----------- | ------ | --------- | --------------------------------------------------------------------- |
| symbol      | String | Yes       | Trading pair (e.g. BTC_USDT)                                          |
| orderParams | List   | Yes       | Order parameters, the number of transactions cannot exceed 10         |
| recvWindow  | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds |

#### orderParams

| Field         | Type   | Required? | Description                                                                                                                                                   |
| ------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| side          | String | Yes       | Side<br>-<code>buy</code>=Buy order<br>-<code>sell</code>=Sell order                                                                                          |
| type          | String | Yes       | Order type<br>-<code>limit</code>=Limit order<br>-<code>market</code>=Market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order |
| clientOrderId | String | No        | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters)                                     |

###### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit_maker/ioc)

| Field | Type   | Required? | Description |
| ----- | ------ | --------- | ----------- |
| size  | String | Yes       | Order size  |
| price | String | Yes       | Price       |

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field    | Type   | Required? | Description                           |
| -------- | ------ | --------- | ------------------------------------- |
| notional | String | Yes       | Required for placing orders by amount |

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type   | Required? | Description                             |
| ----- | ------ | --------- | --------------------------------------- |
| size  | String | Yes       | Required for placing orders by quantity |

**Instruction**

Buy-limit-maker

- When "order price">="market lowest selling price", the order will be canceled
  by the system
- When the "order price" <"the lowest selling price in the market", the order
  will be accepted by the system after the submission is successful
- When "order price"\*"order size"<minimum deal amount in the market, the order
  will be canceled by the system

Sell-limit-maker

- When "order price" <= "market highest bid price", the order will be canceled
  by the system
- When "order price"> "market highest bid price", the order will be accepted by
  the system after the submission is successful
- When "order price"\*"order size"<minimum deal amount in the market, the order
  will be canceled by the system

Buy-ioc,Sell-ioc

- After the order is placed, all orders that cannot be filled immediately are
  cancelled immediately

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "5fc697fb817a4b5396284786a9b2609a.263.17022620476480263",   "data": {     "code": 0,     "msg": "success",     "data": {       "orderIds": [         "212751308355553320"       ]     }   } }`

| Field    | Type | Description |
| -------- | ---- | ----------- |
| orderIds | List | Order ID    |

The request is successful only when orderIds is returned.

## Cancel Batch Order(v4) (SIGNED)

`Cancel all outstanding orders in the specified direction for the specified trading pair or cancel based on the order ID`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/cancel_orders`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderIds":[     "5e925f3981"   ],   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/cancel_orders`

| Field          | Type   | Required?                                         | Description                                                           |
| -------------- | ------ | ------------------------------------------------- | --------------------------------------------------------------------- |
| symbol         | String | Yes                                               | Trading pair (e.g. BTC_USDT)                                          |
| orderIds       | List   | orderIds, clientOrderIds, one of them is required | Order Id List (Limited to 10 ids)                                     |
| clientOrderIds | List   | orderIds, clientOrderIds, one of them is required | Client-defined OrderId List (Limited to 10 ids)                       |
| recvWindow     | Long   | No                                                | Trade time limit, allowed range (0,60000], default: 5000 milliseconds |

In each request, you must select one of the parameters orderIds and
clientOrderIds to submit

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "c4edbce860164203954f7c3c81d60fc6.309.17022669632770001",   "data": {     "successIds": [       "213055379155243012"     ],     "failIds": [],     "totalCount": 1,     "successCount": 1,     "failedCount": 0   } }`

| Field        | Type | Description                     |
| ------------ | ---- | ------------------------------- |
| successIds   | List | Successfully canceled order IDs |
| failIds      | List | Order IDs that failed to cancel |
| totalCount   | Int  | Number of submissions           |
| successCount | Int  | Number of successes             |
| failedCount  | Int  | Number of failures              |

## Cancel All Order(v4) (SIGNED)

`Cancel all orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/cancel_all`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "side":"buy" }' https://api-cloud.bitmart.com/spot/v4/cancel_all`

| Field  | Type   | Required? | Description                                           |
| ------ | ------ | --------- | ----------------------------------------------------- |
| symbol | String | No        | Trading pair (e.g. BTC_USDT)                          |
| side   | String | No        | Order side<br>-<code>buy</code><br>-<code>sell</code> |

#### Response Data

> Response

Copy Success

Copy to Clipboard

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

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "side":"buy",     "type":"limit",     "size":"10",     "price":"7000" }' https://api-cloud.bitmart.com/spot/v1/margin/submit_order`

| Field         | Type   | Required? | Description                                                                                                                                                   |
| ------------- | ------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol        | String | Yes       | Trading pair (e.g. BTC_USDT)                                                                                                                                  |
| side          | String | Yes       | Side<br>-<code>buy</code>=Buy order<br>-<code>sell</code>=Sell order                                                                                          |
| type          | String | Yes       | Order type<br>-<code>limit</code>=Limit order<br>-<code>market</code>=Market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order |
| clientOrderId | String | No        | Client-defined OrderId(A combination of case-sensitive alphanumerics, all numbers, or all letters of up to 32 characters)                                     |

#### Special Parameters for Limit Orders/PostOnly Orders/IOC Orders (`type`\=limit/limit_maker/ioc)

| Field | Type   | Required? | Description |
| ----- | ------ | --------- | ----------- |
| size  | String | Yes       | Order size  |
| price | String | Yes       | Price       |

#### Special Parameters for Market Buy Orders (`type`\=market, `side`\=buy)

| Field    | Type   | Required? | Description                           |
| -------- | ------ | --------- | ------------------------------------- |
| notional | String | Yes       | Required for placing orders by amount |

#### Special Parameters for Market Sell Orders (`type`\=market, `side`\=sell)

| Field | Type   | Required? | Description                             |
| ----- | ------ | --------- | --------------------------------------- |
| size  | String | Yes       | Required for placing orders by quantity |

**Instruction**

Buy-limit-maker

- When "order price">="market lowest selling price", the system will refuse to
  accept the order after the order is submitted
- When the "order price" <"the lowest selling price in the market", the order
  will be canceled by the system

Sell-limit-maker

- When "order price" <= "market highest bid price", after the order is
  submitted, the system will refuse to accept the order
- When "order price"> "market highest bid price", the order will be canceled by
  the system

Buy-ioc,Sell-ioc

- After the order is placed, all orders that cannot be filled immediately are
  cancelled immediately

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "order_id":1223181     } }`

| Field    | Type | Description |
| -------- | ---- | ----------- |
| order_id | Long | Order ID    |

The request is successful only when order_id is returned.

## Query Order By Id (v4) (SIGNED)

`Query a single order by orderId`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/order`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "orderId":"118100034543076010",   "queryState":"open",   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/order`

| Field      | Type   | Required? | Description                                                                                                                                                     |
| ---------- | ------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId    | String | Yes       | Order id                                                                                                                                                        |
| queryState | String | No        | Query Type<br>- <code>open</code>=Query order state [new, partially_filled]<br>- <code>history</code>=QUery order state [filled, canceled, partially_canceled]) |
| recvWindow | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds                                                                                           |

##### Note

- If `queryState` is not filled in, all types of orders will be queried. If you
  know the order status, it is recommended to fill in, so that the query speed
  will be faster.
- API transaction is not completed and the order is cancelled, the query time is
  within 20 minutes.

#### Response Details

> Response

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000",     "filledNotional" : "3999.90000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   },   "trace" : "8aab576e50024648ae45e3cfaf90f9cf.60.16817015721880197" }`

| Field          | Type   | Description                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | String | Order ID                                                                                                                                                                                                                                                                                                                                                                    |
| clientOrderId  | String | User-defined ID                                                                                                                                                                                                                                                                                                                                                             |
| symbol         | String | Trading pair (e.g. BTC_USDT)                                                                                                                                                                                                                                                                                                                                                |
| side           | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell                                                                                                                                                                                                                                                                                                              |
| orderMode      | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin                                                                                                                                                                                                                                                                                           |
| type           | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order                                                                                                                                                                                                               |
| state          | String | Order status<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=A part of the order has been filled.<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. |
| cancelSource   | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled.                                                                                          |
| price          | String | Order price                                                                                                                                                                                                                                                                                                                                                                 |
| priceAvg       | String | Average execution price of the order                                                                                                                                                                                                                                                                                                                                        |
| size           | String | Order quantity                                                                                                                                                                                                                                                                                                                                                              |
| filledSize     | String | Actual execution quantity                                                                                                                                                                                                                                                                                                                                                   |
| notional       | String | Order amount                                                                                                                                                                                                                                                                                                                                                                |
| filledNotional | String | Actual execution amount                                                                                                                                                                                                                                                                                                                                                     |
| createTime     | Long   | Order creation time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                                                                                                                     |
| updateTime     | Long   | Last update time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                                                                                                                        |

## Query Order By clientOrderId(v4) (SIGNED)

`Query a single order by clientOrderId.`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/client-order`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "clientOrderId":"118100034543076010",   "queryState":"open",   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/client-order`

| Field         | Type   | Required? | Description                                                                                                                                                     |
| ------------- | ------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| clientOrderId | String | Yes       | User-defined order id                                                                                                                                           |
| queryState    | String | No        | Query Type<br>- <code>open</code>=Query order state [new, partially_filled]<br>- <code>history</code>=Query order state [filled, canceled, partially_canceled]) |
| recvWindow    | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds                                                                                           |

##### Note

- If `queryState` is not filled in, all types of orders will be queried. If you
  know the order status, it is recommended to fill in, so that the query speed
  will be faster.
- API transaction is not completed and the order is cancelled, the query time is
  within 20 minutes.

#### Response Details

> Response

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000",     "filledNotional" : "3999.90000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   },   "trace" : "8aab576e50024648ae45e3cfaf90f9cf.60.16817015721880197" }`

| Field          | Type   | Description                                                                                                                                                                                                                                                                                                                                                                 |
| -------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | String | Order ID                                                                                                                                                                                                                                                                                                                                                                    |
| clientOrderId  | String | User-defined ID                                                                                                                                                                                                                                                                                                                                                             |
| symbol         | String | Trading pair (e.g. BTC_USDT)                                                                                                                                                                                                                                                                                                                                                |
| side           | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell                                                                                                                                                                                                                                                                                                              |
| orderMode      | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin                                                                                                                                                                                                                                                                                           |
| type           | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order                                                                                                                                                                                                               |
| state          | String | Order status<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=A part of the order has been filled.<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. |
| cancelSource   | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled.                                                                                          |
| price          | String | Order price                                                                                                                                                                                                                                                                                                                                                                 |
| priceAvg       | String | Average execution price of the order                                                                                                                                                                                                                                                                                                                                        |
| size           | String | Order quantity                                                                                                                                                                                                                                                                                                                                                              |
| filledSize     | String | Actual execution quantity                                                                                                                                                                                                                                                                                                                                                   |
| notional       | String | Order amount                                                                                                                                                                                                                                                                                                                                                                |
| filledNotional | String | Actual execution amount                                                                                                                                                                                                                                                                                                                                                     |
| createTime     | Long   | Order creation time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                                                                                                                     |
| updateTime     | Long   | Last update time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                                                                                                                        |

## Current Open Orders(v4) (SIGNED)

`Query the current opening order list of the account, only including state=[new, partially_filled] orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/open-orders`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239652931,   "endTime":1682239657931,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/open-orders`

| Field      | Type   | Required? | Description                                                                                     |
| ---------- | ------ | --------- | ----------------------------------------------------------------------------------------------- |
| symbol     | String | No        | Trading pair (e.g. BTC_USDT)                                                                    |
| orderMode  | String | No        | Order mode<br>- <code>spot</code>=spot trade<br>- <code>iso_margin</code>=isolated margin trade |
| startTime  | Long   | No        | Start time in milliseconds, (e.g. 1681701557927)                                                |
| endTime    | Long   | No        | End time in milliseconds, (e.g. 1681701557927)                                                  |
| limit      | Int    | No        | Number of queries, allowed range [1,200], default 200                                           |
| recvWindow | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds                           |

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

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "orderId" : "125213058731346056",     "clientOrderId" : "125213058731346056",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "new",     "cancelSource" : "",     "price" : "800.00",     "priceAvg" : "0.00",     "size" : "0.10000",     "filledSize" : "0.00000",     "notional" : "80.00000000",     "filledNotional" : "0.00000000",     "createTime" : 1681892198608,     "updateTime" : 1681892198946   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.60.16818922069220005" }`

| Field          | Type   | Description                                                                                                                                                                                                                                                                        |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | String | Order ID                                                                                                                                                                                                                                                                           |
| clientOrderId  | String | User-defined ID                                                                                                                                                                                                                                                                    |
| symbol         | String | Trading pair (e.g. BTC_USDT)                                                                                                                                                                                                                                                       |
| side           | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell                                                                                                                                                                                                                     |
| orderMode      | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin                                                                                                                                                                                                  |
| type           | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order                                                                                                                      |
| state          | String | Order status<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=a part of the order has been filled.                                                                                                                                |
| cancelSource   | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled. |
| price          | String | Order price                                                                                                                                                                                                                                                                        |
| priceAvg       | String | Average execution price of the order                                                                                                                                                                                                                                               |
| size           | String | Order quantity                                                                                                                                                                                                                                                                     |
| filledSize     | String | Actual execution quantity                                                                                                                                                                                                                                                          |
| notional       | String | Order amount                                                                                                                                                                                                                                                                       |
| filledNotional | String | Actual execution amount                                                                                                                                                                                                                                                            |
| createTime     | Long   | Order creation time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                            |
| updateTime     | Long   | Last update time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                               |

## Account Orders(v4) (SIGNED)

`Query the account history order list, only including state=[filled, canceled, partially_canceled] orders`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/history-orders`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{   "symbol":"BTC_USDT",   "orderMode":"spot",   "startTime":1682239502394,   "endTime":1682239507394,   "limit":10,   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/history-orders`

| Field      | Type   | Required? | Description                                                                                     |
| ---------- | ------ | --------- | ----------------------------------------------------------------------------------------------- |
| symbol     | String | No        | Trading pair (e.g. BTC_USDT)                                                                    |
| orderMode  | String | No        | Order mode<br>- <code>spot</code>=spot trade<br>- <code>iso_margin</code>=isolated margin trade |
| startTime  | Long   | No        | Start time in milliseconds, (e.g. 1681701557927)                                                |
| endTime    | Long   | No        | End time in milliseconds, (e.g. 1681701557927)                                                  |
| limit      | Int    | No        | Number of queries, allowed range [1,200], default 200                                           |
| recvWindow | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds                           |

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

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "state" : "filled",     "cancelSource" : "",     "price" : "48800.00",     "priceAvg" : "39999.00",     "size" : "0.10000",     "filledSize" : "0.10000",     "notional" : "4880.00000000",     "filledNotional" : "3999.90000000",     "createTime" : 1681701557927,     "updateTime" : 1681701559408   } ],   "trace" : "acc282ba9e434cc1a90bf6326de9e119.64.16818913787390001" }`

| Field          | Type   | Description                                                                                                                                                                                                                                                                        |
| -------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | String | Order ID                                                                                                                                                                                                                                                                           |
| clientOrderId  | String | User-defined ID                                                                                                                                                                                                                                                                    |
| symbol         | String | Trading pair (e.g. BTC_USDT)                                                                                                                                                                                                                                                       |
| side           | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell                                                                                                                                                                                                                     |
| orderMode      | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin                                                                                                                                                                                                  |
| type           | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order                                                                                                                      |
| state          | String | Order status<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled.                                               |
| cancelSource   | String | Order cancellation reason(Return value only if the order state is <strong>canceled</strong> or <strong>partially_canceled</strong>, otherwise it will return an empty string)<br>-<code>user</code>=User manually canceled.<br>-<code>system</code>=System automatically canceled. |
| price          | String | Order price                                                                                                                                                                                                                                                                        |
| priceAvg       | String | Average execution price of the order                                                                                                                                                                                                                                               |
| size           | String | Order quantity                                                                                                                                                                                                                                                                     |
| filledSize     | String | Actual execution quantity                                                                                                                                                                                                                                                          |
| notional       | String | Order amount                                                                                                                                                                                                                                                                       |
| filledNotional | String | Actual execution amount                                                                                                                                                                                                                                                            |
| createTime     | Long   | Order creation time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                            |
| updateTime     | Long   | Last update time in milliseconds, e.g. 1681701557927                                                                                                                                                                                                                               |

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

| Field      | Type   | Required? | Description                                                                                     |
| ---------- | ------ | --------- | ----------------------------------------------------------------------------------------------- |
| symbol     | String | No        | Trading pair (e.g. BTC_USDT)                                                                    |
| orderMode  | String | No        | Order mode<br>- <code>spot</code>=spot trade<br>- <code>iso_margin</code>=isolated margin trade |
| startTime  | Long   | No        | Start time in milliseconds, (e.g. 1681701557927)                                                |
| endTime    | Long   | No        | End time in milliseconds, (e.g. 1681701557927)                                                  |
| limit      | Int    | No        | Number of queries, allowed range [1,200], default 200                                           |
| recvWindow | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds                           |

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

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "tradeId" : "125277182593091639",     "orderId" : "125213058731346053",     "clientOrderId" : "125213058731346053",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "price" : "39999.00",     "size" : "0.10000",     "notional" : "3999.90000000",     "fee" : "9.99975000",     "feeCoinName" : "USDT",     "tradeRole" : "taker",     "createTime" : 1681891896569,     "updateTime" : 1681891896569   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.61.16819603026240455" }`

| Field         | Type   | Description                                                                                                                                                   |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tradeId       | String | Trade id                                                                                                                                                      |
| orderId       | String | Order ID                                                                                                                                                      |
| clientOrderId | String | User-defined ID                                                                                                                                               |
| symbol        | String | Trading pair (e.g. BTC_USDT)                                                                                                                                  |
| side          | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell                                                                                                |
| orderMode     | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin                                                                             |
| type          | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order |
| price         | String | Transaction price                                                                                                                                             |
| size          | String | Transaction quantity                                                                                                                                          |
| notional      | String | Transaction amount                                                                                                                                            |
| fee           | String | Fee amount                                                                                                                                                    |
| feeCoinName   | String | Fee coin name                                                                                                                                                 |
| tradeRole     | String | Trade role<br>-<code>taker</code>=Take orders, take the initiative to deal<br>-<code>maker</code>=Pending order, passive transaction                          |
| createTime    | Long   | Order creation time in milliseconds, e.g. 1681701557927                                                                                                       |
| updateTime    | Long   | Last update time in milliseconds, e.g. 1681701557927                                                                                                          |

## Order Trade List(v4) (SIGNED)

`Query all transaction records of a single order`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v4/query/order-trades`

#### Request Limit

Refer to [Rate Limitation Details](#cad33537ae)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl    -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'    -X POST -d '{   "orderId":"118100034543076010",   "recvWindow":5000 }' https://api-cloud.bitmart.com/spot/v4/query/order-trades`

| Field      | Type   | Required? | Description                                                           |
| ---------- | ------ | --------- | --------------------------------------------------------------------- |
| orderId    | String | Yes       | Order id                                                              |
| recvWindow | Long   | No        | Trade time limit, allowed range (0,60000], default: 5000 milliseconds |

##### Note

- `orderId` OrderID is required and cannot be empty

#### Response Details

> Response

Copy Success

Copy to Clipboard

`{   "code" : 1000,   "message" : "success",   "data" : [ {     "tradeId" : "122177405911172002",     "orderId" : "118100034543076010",     "clientOrderId" : "118100034543076010",     "symbol" : "BTC_USDT",     "side" : "buy",     "orderMode" : "spot",     "type" : "limit",     "price" : "39999.00",     "size" : "0.10000",     "notional" : "3999.90000000",     "fee" : "9.99975000",     "feeCoinName" : "USDT",     "tradeRole" : "taker",     "createTime" : 1681701559210,     "updateTime" : 1681701559210   } ],   "trace" : "5e1c9f98d761443ea559c7af71ca57fa.62.16818934219090007" }`

| Field         | Type   | Description                                                                                                                                                   |
| ------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| tradeId       | String | Trade id                                                                                                                                                      |
| orderId       | String | Order ID                                                                                                                                                      |
| clientOrderId | String | User-defined ID                                                                                                                                               |
| symbol        | String | Trading pair (e.g. BTC_USDT)                                                                                                                                  |
| side          | String | Order side<br>-<code>buy</code>=buy<br>-<code>sell</code>=sell                                                                                                |
| orderMode     | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=isolated margin                                                                             |
| type          | String | Order type<br>-<code>limit</code>=limit order<br>-<code>market</code>=market order<br>-<code>limit_maker</code>=PostOnly order<br>-<code>ioc</code>=IOC order |
| price         | String | Transaction price                                                                                                                                             |
| size          | String | Transaction quantity                                                                                                                                          |
| notional      | String | Transaction amount                                                                                                                                            |
| fee           | String | Fee amount                                                                                                                                                    |
| feeCoinName   | String | Fee coin name                                                                                                                                                 |
| tradeRole     | String | Trade role<br>-<code>taker</code>=Take orders, take the initiative to deal<br>-<code>maker</code>=Pending order, passive transaction                          |
| createTime    | Long   | Order creation time in milliseconds, e.g. 1681701557927                                                                                                       |
| updateTime    | Long   | Last update time in milliseconds, e.g. 1681701557927                                                                                                          |

# Margin Loan

## Margin Borrow (Isolated) (SIGNED)

`Applicable to isolated margin account borrowing operations`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow`

| Field    | Type   | Required? | Description                                                                            |
| -------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| symbol   | String | Yes       | Trading pair (e.g. BMX_USDT)                                                           |
| currency | String | Yes       | Borrowing currency, selected according to the borrowing trading pair(like BTC or USDT) |
| amount   | String | Yes       | Amount of borrowing (precision: 8 decimal places)                                      |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "borrow_id":"113896"     } }`

| Field     | Type   | Description                                                    |
| --------- | ------ | -------------------------------------------------------------- |
| borrow_id | String | Borrowing order ID, only successful borrowing will be returned |

## Margin Repay (Isolated) (SIGNED)

`Applicable to isolated margin account repayment operations`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay`

| Field    | Type   | Required? | Description                                                                            |
| -------- | ------ | --------- | -------------------------------------------------------------------------------------- |
| symbol   | String | Yes       | Trading pair (e.g. BMX_USDT)                                                           |
| currency | String | Yes       | Repayment currency, selected according to the borrowing trading pair(like BTC or USDT) |
| amount   | String | Yes       | Amount of repayments (precision: 8 decimal places)                                     |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{         "repay_id":"123165"     } }`

| Field    | Type   | Description                                                    |
| -------- | ------ | -------------------------------------------------------------- |
| repay_id | String | Repayment order ID, only successful repayment will be returned |

## Get Borrow Record(Isolated) (KEYED)

`Applicable to the inquiry of borrowing records of an isolated margin account`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow_record`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow_record?symbol=BTC_USDT`

| Field      | Type   | Required? | Description                                            |
| ---------- | ------ | --------- | ------------------------------------------------------ |
| symbol     | String | Yes       | Trading pair (e.g. BMX_USDT)                           |
| borrow_id  | String | No        | Borrow order id                                        |
| start_time | Long   | No        | Query start time: Timestamp                            |
| end_time   | Long   | No        | Query end time: Timestamp                              |
| N          | Int    | No        | Query record size, allowed range[1-100]. Default is 50 |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "records":[         {           "borrow_id": "133425",           "symbol": "BTC_USDT",           "currency": "BTC",           "borrow_amount": "1.23854339",           "daily_interest": "0.05",           "hourly_interest": "0.00208334",           "interest_amount": "0.02398474",           "create_time": 1655345808         },         ...       ]     } }`

| Field           | Type   | Description                                                       |
| --------------- | ------ | ----------------------------------------------------------------- |
| borrow_id       | String | Borrow order id                                                   |
| symbol          | String | Trading pair                                                      |
| currency        | String | Currency                                                          |
| borrow_amount   | String | The total principal amount borrowed (precision: 8 decimal places) |
| daily_interest  | String | Daily interest                                                    |
| hourly_interest | String | Hourly interest                                                   |
| interest_amount | String | Total interest (precision: 8 decimal places)                      |
| create_time     | Long   | Order creation time                                               |

## Get Repayment Record(Isolated) (KEYED)

`Applicable to the inquiry of repayment records of isolated margin account`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay_record`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay_record?symbol=BTC_USDT`

| Field      | Type   | Required? | Description                                            |
| ---------- | ------ | --------- | ------------------------------------------------------ |
| symbol     | String | Yes       | Trading pair (e.g. BMX_USDT)                           |
| repay_id   | String | No        | Repayment ID                                           |
| currency   | String | No        | Currency                                               |
| start_time | Long   | No        | Query start time: Timestamp                            |
| end_time   | Long   | No        | Query end time: Timestamp                              |
| N          | Int    | No        | Query record size, allowed range[1-100]. Default is 50 |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "records":[         {           "repay_id":"118723",           "repay_time":1655345808,           "symbol":"BTC_USDT",           "currency":"BTC",           "repaid_amount":"1.1",           "repaid_principal":"1",           "repaid_interest":"0.1"         },         ...       ]     } }`

| Field            | Type   | Description                                     |
| ---------------- | ------ | ----------------------------------------------- |
| repay_id         | String | Repayment ID                                    |
| repay_time       | Long   | Repayment Timestamp                             |
| symbol           | String | Repayment trading pairs(like BTC_USDT)          |
| currency         | String | Repayment currency                              |
| repaid_amount    | String | Repayment amount                                |
| repaid_principal | String | The principal amount returned by this repayment |
| repaid_interest  | String | Interest returned by this repayment             |

## Get Trading Pair Borrowing Rate and Amount (KEYED)

`Applicable for checking the borrowing rate and borrowing amount of trading pairs`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/pairs`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/margin/isolated/pairs?symbol=BTC_USDT`

| Field  | Type   | Required? | Description                                                                           |
| ------ | ------ | --------- | ------------------------------------------------------------------------------------- |
| symbol | String | No        | It can be multiple-choice; if not filled in, then return all, like BTC_USDT, ETH_USDT |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "symbols":[         {           "symbol": "BTC_USDT",           "max_leverage": "10",           "symbol_enabled": true,           "base": {             "currency": "BTC",             "daily_interest": "0.05",             "hourly_interest": "0.00208334",             "max_borrow_amount": "1000.00000000",             "min_borrow_amount": "1.00000000",             "borrowable_amount": "955.90221219"           },           "quote": {             "currency": "USDT",             "daily_interest": "0.05",             "hourly_interest": "0.00208334",             "max_borrow_amount": "12000.00000000",             "min_borrow_amount": "0.01000000",             "borrowable_amount": "12000.00000000"           }         },         ...       ]     } }`

| Field             | Type    | Description                                                             |
| ----------------- | ------- | ----------------------------------------------------------------------- |
| symbol            | String  | Trading pair                                                            |
| max_leverage      | String  | Leverage multiplier                                                     |
| symbol_enabled    | Boolean | Whether the trading pair is enabled                                     |
| currency          | String  | Currency                                                                |
| daily_interest    | String  | Daily interest                                                          |
| hourly_interest   | String  | Hourly interest                                                         |
| max_borrow_amount | String  | The maximum amount of borrowing (precision: 8 decimal places)           |
| min_borrow_amount | String  | The minimum amount of borrowing (precision: 8 decimal places)           |
| borrowable_amount | String  | The current available amount of borrowing (precision: 8 decimal places) |

# Sub-Account

Sub-Account interface function is currently open to institutional users only,
and will be opened gradually

## Sub-Account to Main-Account (For Main Account) (SIGNED)

`Sub-account spot asset transfer to Main-account (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-main`

| Field      | Type   | Required? | Description                           |
| ---------- | ------ | --------- | ------------------------------------- |
| requestNo  | String | Yes       | UUID,unique identifier, max length 64 |
| amount     | String | Yes       | Transfer amount                       |
| currency   | String | Yes       | Currency                              |
| subAccount | String | Yes       | Sub-Account username                  |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Sub-Account to Main-Account (For Sub-Account) (SIGNED)

`Sub-Account spot asset transfer to Main-Account spot asset (For Sub-Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/sub/v1/sub-to-main`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC" }' https://api-cloud.bitmart.com/account/sub-account/sub/v1/sub-to-main`

| Field     | Type   | Required? | Description                           |
| --------- | ------ | --------- | ------------------------------------- |
| requestNo | String | Yes       | UUID,unique identifier, max length 64 |
| amount    | String | Yes       | Transfer amount                       |
| currency  | String | Yes       | Currency                              |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Main-Account to Sub-Account (For Main Account) (SIGNED)

`Main-account spot asset transfer to Sub-account spot asset (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/main-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl  -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "subAccount":"subAccountName@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/main-to-sub`

| Field      | Type   | Required? | Description                           |
| ---------- | ------ | --------- | ------------------------------------- |
| requestNo  | String | Yes       | UUID,unique identifier, max length 64 |
| amount     | String | Yes       | Transfer amount                       |
| currency   | String | Yes       | Currency                              |
| subAccount | String | Yes       | Sub-Account username                  |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Sub-Account to Sub-Account (For Main Account) (SIGNED)

`Sub-Account spot asset transfer to Sub-Account spot asset (For Main Account)`

#### Request URL

`POST https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl   -H 'X-BM-KEY:{{AccessKey}}'  -H 'X-BM-TIMESTAMP:{{currentTime}}'  -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "requestNo":"4e2adcff-2122-1ce7-2557-4f65d2ce1ca2",     "amount":"1",     "currency":"BTC",     "fromAccount":"subAccountName1@xxx.com",     "toAccount":"subAccountName2@xxx.com" }' https://api-cloud.bitmart.com/account/sub-account/main/v1/sub-to-sub`

| Field       | Type   | Required? | Description                           |
| ----------- | ------ | --------- | ------------------------------------- |
| requestNo   | String | Yes       | UUID,unique identifier, max length 64 |
| amount      | String | Yes       | Transfer amount                       |
| currency    | String | Yes       | Currency                              |
| fromAccount | String | Yes       | Transfer out Sub-Account username     |
| toAccount   | String | Yes       | Transfer to Sub-Account username      |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {   } }`

If code value is 1000,it means the transfer is successful.

## Get Sub-Account Transfer History (For Main Account) (KEYED)

`Query Sub-Account Spot Asset Transfer History (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/transfer-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/transfer-list?moveType=spot to spot`

| Field       | Type   | Required? | Description                                                            |
| ----------- | ------ | --------- | ---------------------------------------------------------------------- |
| moveType    | String | Yes       | type<br>-<code>spot to spot</code>=Spot wallet transfer to spot wallet |
| accountName | String | No        | Sub-Account username (default: all sub-accounts will be queried)       |
| N           | Int    | Yes       | Recent N records, allowed range[1,100]                                 |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "282fd16e-73ee-464f-adb7-7241345929f6",   "data": {     "total": 2,     "historyList": [       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "1",         "submissionTime": 1648471522       },       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "30",         "submissionTime": 1648466178       }     ]   } }`

| Field          | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| fromAccount    | String | Transfer out Sub-Account username                          |
| fromWalletType | String | Transfer out wallet type<br>-<code>spot</code>=spot wallet |
| toAccount      | String | Transfer to Sub-Account username                           |
| toWalletType   | String | Transfer to wallet type<br>-<code>spot</code>=spot wallet  |
| currency       | String | currency                                                   |
| amount         | String | Transfer amount                                            |
| submissionTime | Long   | The request timestamp is accurate to seconds(UTC-0)        |

Note: Only the data for the last 3 months can be queried

## Get Account Spot Asset Transfer History (For Main/Sub Account) (KEYED)

`Get account spot asset transfer history (For Main/Sub Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/v1/transfer-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/v1/transfer-history?moveType=spot to spot`

| Field    | Type   | Required? | Description                                                            |
| -------- | ------ | --------- | ---------------------------------------------------------------------- |
| moveType | String | Yes       | type<br>-<code>spot to spot</code>=Spot wallet transfer to spot wallet |
| N        | Int    | Yes       | Recent N records, allowed range[1,100]                                 |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "282fd16e-73ee-464f-adb7-7241345929f6",   "data": {     "total": 2,     "historyList": [       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "1",         "submissionTime": 1648471522       },       {         "fromAccount": "SubAccount1@xxx.com",         "fromWalletType": "spot",         "toAccount": "SubAccount2@xxx.com",         "toWalletType": "spot",         "currency": "BTC",         "amount": "30",         "submissionTime": 1648466178       }     ]   } }`

| Field          | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| fromAccount    | String | Transfer out Sub-Account username                          |
| fromWalletType | String | Transfer out wallet type<br>-<code>spot</code>=spot wallet |
| toAccount      | String | Transfer to Sub-Account username                           |
| toWalletType   | String | Transfer to wallet type<br>-<code>spot</code>=spot wallet  |
| currency       | String | currency                                                   |
| amount         | String | Transfer amount                                            |
| submissionTime | Long   | The request timestamp is accurate to seconds(UTC-0)        |

Note: Only the data for the last 3 months can be queried

## Get Sub-Account Spot Wallet Balance (For Main Account) (KEYED)

`Get Sub-Account spot wallet balance (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/wallet?subAccount=subAccount1@xxx.com`

| Field      | Type   | Required? | Description          |
| ---------- | ------ | --------- | -------------------- |
| subAccount | String | Yes       | Sub-Account username |
| currency   | String | No        | currency             |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{     "message":"OK",     "code":1000,     "trace":"ef834248-51d3-4223-9481-f862aa9dd39f",     "data":{         "wallet":[             {                 "currency":"USDT",                 "name":"Tether USD",                 "available":"1000.00000000",                 "frozen":"0.00000000"             },             {                 "currency":"BTC",                 "name":"Bitcoin",                 "available":"10000.00000000",                 "frozen":"10.00000000"             }         ]     } }`

| Field     | Type   | Description                 |
| --------- | ------ | --------------------------- |
| currency  | String | Token symbol, e.g., 'BTC'   |
| name      | String | Token name, e.g., 'Bitcoin' |
| available | String | Available Balance           |
| frozen    | String | Frozen Balance              |

The return list contains only assets with a balance greater than 0.

## Get Sub-Account List (For Main Account) (KEYED)

`Get Sub-Account list (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/subaccount-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/subaccount-list`

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "message": "OK",   "code": 1000,   "trace": "c03c22c3-75db-4aaa-9500-6dcd63dd9ccf",   "data": {     "subAccountList": [       {         "accountName": "subAccount1@xxx.com",         "status": 1       },       {         "accountName": "subAccount2@xxx.com",         "status": 1       }     ]   } }`

| Field       | Type   | Description                                                                                                                  |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| accountName | String | Sub-Account username                                                                                                         |
| status      | Int    | Account Status<br>-<code>0</code>=disabled in background<br>-<code>1</code>=normal<br>-<code>2</code>=frozen by main account |

# WebSocket Subscription

## Overview

### Server URL

Public Channel: `wss://ws-manager-compress.bitmart.com/api?protocol=1.1`

Private Channel: `wss://ws-manager-compress.bitmart.com/user?protocol=1.1`

## Format

The message format sent by the client to the BitMart server.

`{"op":"<operation>", "args":["<topic1>","<topic2>"]}`

**Explain**:

- `operation` request action, value: \[`subscribe`\=Subscribe channel,
  `unsubscribe`\=Unsubscribe channel, `login`\=Account login\]
- `args` request parameter, value: channel array or parameters required for
  login
- `topic` channel topic, composed of `<channel>:<filter>`
  - channel is composed of business/name
  - filter is filterable data, refer to each channel description for details

**Example**:

- Example 1: `{"op": "subscribe", "args": ["spot/ticker:BTC_USDT"]}`
  - Means to subscribe to the ticker data of the spot trading pair BTC_USDT
- Example 2:
  `{"op": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c035 1c1a071d8c83314556"]}`
  - Login request before private channel subscription

---

### Successful Response Format

The format of the success message returned by the BitMart server to the client.

The returned field not contains `errorCode`

> Successful Response Format

Copy Success

Copy to Clipboard

`When op=login: {"event":"<operation>"}  When op=unsubscribe: {"event":"<operation>","topic":"<topic>"}  When op=subscribe: {"table":"<topic1>","data":"[{"<value1>","<value2>"}]"} {"table":"<topic2>","data":"[{"<value1>","<value2>"}]"}`

**Example**:

- Example 1: `{"event":"login"}`
  - Means successful login
- Example 2：`{"topic":"spot/ticker:BTC_USDT","event":"subscribe"}`
  - Means successful subscription
- Example 2: `{"event":"unsubscribe","topic":"spot/ticker:BTC_USDT"}`
  - Means successful cancellation of ticker subscription for spot trading pair
    BTC_USDT
- Example 3:
  `{"table":"spot/ticker:BTC_USDT","data":"[{"<value1>","<value2>"}]"}`
  - Means the ticker subscription of spot trading pair BTC_USDT, generates data,
    and returns it to the client

---

### Failed Response Format

The format of the failed message returned by the BitMart server to the client.

If the returned field contains `errorCode`, it means failure. For the reason of
failure, please refer to: [WebSocket Error Code](#websocket-error-code)

> Failed Response Format

Copy Success

Copy to Clipboard

`{"event":"<operation>","errorMessage":"<error_message>","errorCode":"<error_code>"}`

- Example 1:
  `{"event":"login","errorCode":"91002","errorMessage":"API KEY not found"}`
  - Means login failed, your API KEY does not exist
- Example 2:
  `{"event":"subscribe","errorCode":"90004","errorMessage":"Invalid channel param"}`
  - Means subscription failed, your parameter is invalid, this channel does not
    exist

## Stay Connected And Limit

\* If there is a network problem, the connection will be automatically
disconnected, please set up the reconnection mechanism

### How Stay Connected

WebSocket uses the Ping/Pong mechanism to maintain the connection. Once the
connection is opened, a text 'ping' is sent every N seconds, and the remote
endpoint will return a text 'pong' to keep responding. This is an approach to
stay active. It helps to keep the connection open, especially if there is a
short timeout proxy on an inactive connection.

**If no data is returned after connecting to WebSocket, the link will be
automatically disconnected after 20s. It is recommended that the user do the
following:**

1.  After each message is received, the user sets a timer for N seconds (N<20).
2.  If the timer is triggered (no new message is received within N seconds),
    send a text string 'ping'. **(Ping frames are not supported)**
3.  Expect for a text string 'pong' as a response. If not received within N
    seconds, please issue an error or reconnect.
4.  We do not actively disconnect when there is a continuous message interaction
    between the two parties.

**The following is the data format of ping:** (Example in Java pseudocode)

- Ping Text

`ws.send(new TextWebSocketFrame("ping");`

### Connection Limit(Public Channel)

- Each IP can maintain up to 20 connections with the BitMart public channel
  server
- Once connected, allows clients to subscribe to up to 115 channels per
  connection.
- Send message rate limit:
  1.  Initiate connection: Clients can initiate a maximum of 30 requests to
      connect to the BitMart server within 1 minute.
  2.  Once connected: Clients can sending a maximum of 100 subscription messages
      within 10 seconds, message includes: PING text, JSON format messages
      (subscription and unsubscription).
  3.  Once connected: A maximum of 20 messages arrays can be sent by clients for
      a single subscription.
- If the user sends more messages than the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server.

### Connection Limit(Private Channel)

- Each IP can maintain up to 10 connections with the BitMart private channel
  server.
- Once connected, allows clients to subscribe to up to 100 channels per
  connection.
- Send message rate limit:
  1.  Initiate connection: Clients can initiate a maximum of 30 requests to
      connect to the BitMart server within 1 minute.
  2.  Once connected: Clients can sending a maximum of 100 subscription messages
      within 10 seconds, message includes: PING text, JSON format messages
      (subscription and unsubscription).
  3.  Once connected: A maximum of 20 messages arrays can be sent by clients for
      a single subscription.
- If the user sends more messages than the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server.

#### How to subscribe to more than 1000 Public channels?

Create 20 connectors and 1 receiving function in your code, and each connector
subscribes to 100 channels, so that you can easily subscribe to 2000 channels.

##### Need to pay attention to?

- Subscribe to fewer channels and respond faster. It is recommended that you
  only subscribe to the channels you want
- If the number of messages sent exceeds the limit, the connection will be
  disconnected. IPs that are repeatedly disconnected will be blocked by the
  server
- The connection limits for private channels and public channels are calculated
  separately, which means that a single IP is allowed to maintain 10 private
  channel connections and 20 public channel connections at the same time

#### Lifeless connection

Connection that do not send task subscription data within 5 minutes will be
considered lifeless and the server will close the connection.

## Data Compression

Only when the market data is returned after subscription, the remote service
will compress the data and return it to the client. The remote service returns
data in two formats, Binary format and Text format. When the binary format is
returned, the data has been compressed by the remote service and the client
needs to decompress it.

#### Compression Introduction

zlib is a library for data compression, developed by Jean-loup Gailly and Mark
Adler. The first version (v0.9) was published on May 1, 1995. zlib uses the
abstract DEFLATE algorithm, originally written for the libpng library, and later
generally used by many software. This library is free.
[Official link http://zlib.net/](http://zlib.net/)

#### Decompression Example

For more and more complete programming codes, please refer to the
[Quick Start API](/en/quick/#python-quick-start)

> Python

Copy Success

Copy to Clipboard

`import zlib  def inflate(data):     decompress = zlib.decompressobj(             -zlib.MAX_WBITS     )     inflated = decompress.decompress(data)     inflated += decompress.flush()     return inflated.decode('UTF-8')`

> Nodejs

Copy Success

Copy to Clipboard

`const zlib = require('zlib');  zlib.inflateRawSync(data);`

> Golang

Copy Success

Copy to Clipboard

`import (     "compress/flate" )  func zipDecode(in []byte) ([]byte, error) {     reader := flate.NewReader(bytes.NewReader(in))     defer reader.Close()      return ioutil.ReadAll(reader) }  string(zipDecode(data))`

> php

Copy Success

Copy to Clipboard

`@link https://php.net/manual/en/function.gzinflate.php  gzinflate($data)`

> Java

Copy Success

Copy to Clipboard

`import java.util.zip.*;  public class StringCompressUtil {      private static String uncompress(ByteBuf buf) {         try {             byte[] temp = new byte[buf.readableBytes()];             ByteBufInputStream bis = new ByteBufInputStream(buf);             bis.read(temp);             bis.close();             Inflater decompresser = new Inflater(true);             decompresser.setInput(temp, 0, temp.length);             StringBuilder sb = new StringBuilder();             byte[] result = new byte[1024];             while (!decompresser.finished()) {                 int resultLength = decompresser.inflate(result);                 sb.append(new String(result, 0, resultLength, "UTF-8"));             }             decompresser.end();             return sb.toString();         }catch (Exception e) {             e.printStackTrace();         }         return "";     }      public static String decode(ByteBuf content){         byte[] bytes = new byte[content.readableBytes()];         content.readBytes(bytes);         ByteBuf byteBuf = Unpooled.wrappedBuffer(bytes);         String str = uncompress(byteBuf);         return str;     }  }  StringCompressUtil.decode(data)`

## Subscribe

Users can subscribe to one or more channels, and the total length of multiple
channels cannot exceed 4096 bytes

> subscribe

Copy Success

Copy to Clipboard

`{"op": "subscribe", "args": ["<topic>"]}`

### Parameter Instructions

- op=subscribe
- The content of the args array is the subscribed topic
- topic is composed of `<channel>:<filter>`
  - channel is composed of business/name
  - filter can filter data, refer to the description of each channel for details

### Example

> Subscribe Request

Copy Success

Copy to Clipboard

`{"op": "subscribe", "args": ["spot/ticker:BTC_USDT"]}`

> Subscription successful

Copy Success

Copy to Clipboard

`{"event": "subscribe","topic": "spot/ticker:BTC_USDT"}`

> After successful subscription, push data

Copy Success

Copy to Clipboard

`{"table":"spot/ticker:BTC_USDT","data":[]}`

## Unsubscribe

Cancel subscription to one or more channels

> unsubscribe

Copy Success

Copy to Clipboard

`{"op": "unsubscribe", "args": ["<topic>"]}`

### Parameter Instruction

- op=unsubscribe
- The content of the args array is the subscribed topic
- topic is composed of `<channel>:<filter>`
  - channel is composed of business/name
  - filter can filter data, refer to the description of each channel for details

### Example

> Unsubscribe Request

Copy Success

Copy to Clipboard

`{"op": "unsubscribe", "args": ["spot/ticker:BTC_USDT", "spot/ticker:ETH_USDT"]}`

> Unsubscribe successful

Copy Success

Copy to Clipboard

`{"event":"unsubscribe","topic":"spot/ticker:BTC_USDT"} {"event":"unsubscribe","topic":"spot/ticker:ETH_USDT"}`

## 【Public】Ticker Channel

Get the latest price, bid price, ask price and 24-hour trading volume

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and the
    latest price, bid price, ask price will be pushed only after they change.
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

Copy Success

Copy to Clipboard

`{   "op": "subscribe",    "args": ["spot/ticker:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/ticker:<symbol>"]}`

- symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

Copy Success

Copy to Clipboard

`{   "event":  "subscribe",   "topic":  "spot/ticker:BTC_USDT" }`

`{"event":"subscribe","topic":"spot/ticker:<symbol>"}`

### After successful subscription, push data

> Push data

Copy Success

Copy to Clipboard

`{   "data":  [     {       "ask_px":  "36000",       "ask_sz":  "1.021",       "base_volume_24h":  "2.02000",       "bid_px":  "35000",       "bid_sz":  "11",       "fluctuation":  "-0.0001",       "high_24h":  "35003.04",       "last_price":  "35000.00",       "low_24h":  "35000.00",       "ms_t":  1709024652967,       "open_24h":  "35003.03",       "quote_volume_24h":  "70700.00",       "s_t":  1709024652,       "symbol":  "BTC_USDT"     }   ],   "table":  "spot/ticker" }`

Return data description:

| Field            | Type   | Description                                                                               |
| ---------------- | ------ | ----------------------------------------------------------------------------------------- |
| symbol           | String | Trading pair, <code>BTC_USDT</code>                                                       |
| last_price       | String | Last trading price                                                                        |
| high_24h         | String | 24-hour highest price                                                                     |
| low_24h          | String | 24-hour lowest price                                                                      |
| open_24h         | String | 24-hour open price                                                                        |
| base_volume_24h  | String | 24-hour traded volume in base currency                                                    |
| quote_volume_24h | String | 24-hour traded volume in quote currency                                                   |
| s_t              | Long   | Create Time (timestamp in seconds) (The field will be removed, please use the ms_t field) |
| ms_t             | Long   | Create Time (timestamp in millisecond)                                                    |
| fluctuation      | String | 24-hour Price change                                                                      |
| bid_px           | String | Best bid price                                                                            |
| bid_sz           | String | Best bid quantity                                                                         |
| ask_px           | String | Best ask price                                                                            |
| ask_sz           | String | Best bid quantity                                                                         |

## 【Public】KLine Channel

Get the spot K-line data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the
    changes will be pushed
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

Copy Success

Copy to Clipboard

`{   "op": "subscribe",    "args": ["spot/kline1m:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["<channel>:<symbol>"]}`

- channel: Channel name, such as `spot/kline1m`
- symbol: Trading pair, such as `BTC_USDT`

#### Parameters Channel Name List

| Channel Name  | Description           |
| ------------- | --------------------- |
| spot/kline1m  | 1-min KLine Channel   |
| spot/kline5m  | 5-min KLine Channel   |
| spot/kline15m | 15-min KLine Channel  |
| spot/kline30m | 30-min KLine Channel  |
| spot/kline1H  | 1-hour KLine Channel  |
| spot/kline2H  | 2-hour KLine Channel  |
| spot/kline4H  | 4-hour KLine Channel  |
| spot/kline1D  | 1-day KLine Channel   |
| spot/kline1W  | 1-week KLine Channel  |
| spot/kline1M  | 1-month KLine Channel |

### Subscription successful

> Subscription successful

Copy Success

Copy to Clipboard

`{   "topic":  "spot/kline1m:BTC_USDT",   "event":  "subscribe" }`

`{"event":"subscribe","topic":"<channel>:<symbol>"}`

### After successful subscription, push data

> Push data

Copy Success

Copy to Clipboard

`{   "data":  [     {       "candle":  [         1709025360,         "162.01",         "162.02",         "162.03",         "162.04",         "336.452694"       ],       "symbol":  "BTC_USDT"     }   ],   "table":  "spot/kline1m" }`

Return data description:

| Field  | Type                  | Description                         |
| ------ | --------------------- | ----------------------------------- |
| symbol | String                | Trading pair, <code>BTC_USDT</code> |
| candle | List<string></string> | KLine data                          |

An example of returned KLine values: \[1709025360, "162.01", "162.02", "162.03",
"162.04", "336.452694"\]. Open time (in seconds), opening price, highest price,
lowest price, closing price, trading volume.

## 【Public】Depth-All Channel

Return depth data, each push is the full data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the
    changes will be pushed
3.  Push frequency: The fastest is 500ms once

### Subscribe Request

> Subscribe Request

Copy Success

Copy to Clipboard

`{   "op": "subscribe",    "args": ["spot/depth5:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["<channel>:<symbol>"]}`

- channel: Channel name, such as `spot/depth5`
- symbol: Trading pair, such as `BTC_USDT`

#### Parameters Channel Name List

| Channel Name | Description            |
| ------------ | ---------------------- |
| spot/depth5  | 5 Level Depth Channel  |
| spot/depth20 | 20 Level Depth Channel |
| spot/depth50 | 50 Level Depth Channel |

### Subscription successful

> Subscription successful

Copy Success

Copy to Clipboard

`{   "topic":  "spot/depth5:BTC_USDT",   "event":  "subscribe" }`

`{"event":"subscribe","topic":"<channel>:<symbol>"}`

### After successful subscription, push data

> Push data

Copy Success

Copy to Clipboard

`{     "table":"spot/depth5",     "data":[         {             "asks":[                 [                     "161.96",                     "7.37567"                 ]             ],             "bids":[                 [                     "161.94",                     "4.552355"                 ]             ],             "symbol":"ETH_USDT",             "ms_t": 1542337219120         }     ] }`

Return data description:

| Field  | Type                  | Description                         |
| ------ | --------------------- | ----------------------------------- |
| symbol | String                | Trading pair, <code>BTC_USDT</code> |
| asks   | List<string></string> | Ask depth                           |
| bids   | List<string></string> | Bid depth                           |
| ms_t   | Long                  | Timestamp (in millisecond)          |

An example of the array of asks and bids values: \["161.96","7.37567"\], 161.96
is the price, and 7.37567 is the quantity.

## 【Public】Depth-Increase Channel

Return depth data, support the creation of a local full depth cache data

### Pushing Rules

1.  No user login required
2.  After subscribing, the current data will be returned directly, and then the
    changes will be pushed
3.  Push frequency: The fastest is 100ms once

### Subscribe Request

> Subscribe Request

Copy Success

Copy to Clipboard

`{    "op": "subscribe",    "args": ["spot/depth/increase100:BTC_USDT"] }`

> Full depth snapshot data Request

Copy Success

Copy to Clipboard

`{    "op": "request",    "args": ["spot/depth/increase100:BTC_USDT"] }`

Message Format:

`{"op": "<op>", "args": ["spot/depth/increase100:<symbol>"]}`

- op: `subscribe`\=Subscribe, You will receive a message that the subscription
  is successful, and then you will receive incremental depth data pushed in real
  time. `request`\=Single request for the latest depth snapshot, You will
  receive a full depth of data immediately.
- channel: Channel name, fixed value `spot/depth/increase100`, Support 100
  levels
- symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

Copy Success

Copy to Clipboard

`{   "topic":  "spot/depth/increase100:BTC_USDT",   "event":  "subscribe" }`

`{"event":"subscribe","topic":"spot/depth/increase100:<symbol>"}`

### Response

> Full depth snapshot data

Copy Success

Copy to Clipboard

`{   "data": [{     "asks": [       ["23200", "0.69959"],       ["28000.00", "0.20000"]     ],     "bids": [       ["23105", "1.80114"]     ],     "ms_t": 1698292343610,     "symbol": "BTC_USDT",     "type": "snapshot",     "version": 4   }],   "table": "spot/depth/increase100" }`

> Incremental depth data

Copy Success

Copy to Clipboard

`{     "data": [{         "asks": [             ["23200", "0.59959"]         ],         "bids": [],         "ms_t": 1698292358292,         "symbol": "BTC_USDT",         "type": "update",         "version": 5     }],     "table": "spot/depth/increase100" }`

Return data description:

| Field   | Type                  | Description                                                                                                 |
| ------- | --------------------- | ----------------------------------------------------------------------------------------------------------- |
| symbol  | String                | Trading pair, <code>BTC_USDT</code>                                                                         |
| asks    | List<string></string> | Ask depth                                                                                                   |
| bids    | List<string></string> | Bid depth                                                                                                   |
| ms_t    | Long                  | Timestamp (in millisecond)                                                                                  |
| version | Long                  | data version                                                                                                |
| type    | String                | data type<br>-<code>snapshot</code>=Full depth snapshot data<br>-<code>update</code>=Incremental depth data |

An example of the array of asks and bids values: \["411.8","10"\]. 411.8 is the
price, and 10 is the quantity.

### How to correctly maintain a copy of OrderBook locally:

1.  First, the client send a subscription request
    `{"op": "subscribe", "args": ["spot/depth/increase100:<symbol>"] }`
2.  After successful subscription, you will receive two types of messages,
    `type=snapshot` (full data) and `type=update` (update)
3.  If a type=snapshot type message is received, update the deep snapshot
    content to the `local cache`. If there is no `local cache`, create one.
4.  If a type=update message is received, update the data in the deep snapshot
    to `local cache`. The update rules are as follows:
    - 4.1 If the field version number in the received new message is less than
      or equal to the version in the local cache(new version<=local version),
      this data can be discarded.
    - 4.2 If the field version number in the new message received is equal to
      the version in the local cache plus 1(new version==local version+1), the
      quantity of the corresponding price will be `updated to the local cache`.
    - 4.3 If the field version number in the new message received is greater
      than the version in the local cache plus 1(new version>local version+1),
      please obtain the latest depth snapshot from step 7 and overwrite the
      `local cache`.
5.  The pending order volume in each returned message represents the
    `absolute value` of the current pending order volume at this price, rather
    than the relative change.
6.  How to update local cache? Under the premise of 4.2:
    - 6.1 New: If the same price is not already in the local cache, it means
      that it is a new pending order and needs to be added to the cache.
    - 6.2 Modify or Remove: If the same price is already in the local cache, it
      means that the quantity has changed. If the quantity is 0, it will be
      directly removed from the cache. Otherwise, just change the quantity.
7.  Request through request
    `{"op": "request", "args": ["spot/depth/increase100:<symbol>"] }`to obtain
    the latest depth snapshot (type=snapshot in the message), and add the depth
    The content in the snapshot is overwritten to the `local cache`, and then
    the logic continues from step 2.

- Abnormal Situation:
  1.  If there is no deep update for a period of time, an empty message 'asks':
      \[\], 'bids': \[\] will be sent to notify the user that the connection is
      normal. The pushed version is the same as the previous message. The empty
      message version=local cache version. can be discarded directly
  2.  Because the depth snapshot has a limit on the number of price tiers, price
      tiers outside the initial snapshot and without quantity changes will not
      appear in the incremental depth update information. Therefore, even if all
      updates from the incremental depth are applied, these price brackets will
      not be visible in the local order book, so there may be some differences
      between the local order book and the real order book.

#### Flow Chart

![PNG](../../images/spot_ws_depth_increase_en-7b8d2d05.png)

## 【Public】Trade Channel

Get the latest real-time transaction data

### Pushing Rules

1.  No user login required
2.  After successful subscription, incremental trade messages will be
    pushed(Taker trade message)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

Copy Success

Copy to Clipboard

`{   "op": "subscribe",    "args": ["spot/trade:BTC_USDT"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/trade:<symbol>"]}`

- symbol: Trading pair, such as `BTC_USDT`

### Subscription successful

> Subscription successful

Copy Success

Copy to Clipboard

`{   "event":  "subscribe",   "topic":  "spot/trade:BTC_USDT" }`

`{"event":"subscribe","topic":"spot/trade:<symbol>"}`

### After successful subscription, push data

> Push data

Copy Success

Copy to Clipboard

`{     "table": "spot/trade",     "data": [{         "symbol": "ETH_USDT",         "price": "162.12",         "side": "buy",         "size": "11.085",         "s_t": 1542337219,         "ms_t": 1542337219120     }] }`

Return data description:

| Field  | Type   | Description                                                                                        |
| ------ | ------ | -------------------------------------------------------------------------------------------------- |
| symbol | String | Trading pair, <code>BTC_USDT</code>                                                                |
| side   | String | Side of trade for taker order（<code>buy</code> or <code>sell</code>）                             |
| price  | String | Trade price for taker order                                                                        |
| size   | String | Trade quantity for taker order                                                                     |
| s_t    | Long   | Order execution time (Timestamp in seconds) (The field will be removed, please use the ms_t field) |
| ms_t   | Long   | Order execution time (Timestamp in millisecond)                                                    |

## 【Private】Login

### Login Subscription Format

> Request Format

Copy Success

Copy to Clipboard

`{"op":"login","args":["<YOUR_API_KEY>", "<timestamp>", "<sign>"]}`

- API_KEY: The user's API key
- timestamp: Timestamp, the unit is milliseconds, it will expire after 60
  seconds
- sign: Signature, sign=CryptoJS.HmacSHA256(timestamp + "#" + api_memo + "#" +
  "bitmart.WebSocket", secret)

### Example

> Login Example

Copy Success

Copy to Clipboard

`{"op": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556"]}`

> Response

Copy Success

Copy to Clipboard

`{"event":"login"}`

Assume that the values of the API requested by the user is as follows:

- timestamp=1589267764859
- API_KEY = "80618e45710812162b04892c7ee5ead4a3cc3e56"
- API_SECRET =
  "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"
- API_MEMO = "test001";

Ues Javascript create param `sign`: sign =
`CryptoJS.HmacSHA256(1589267764859 + "#" + test001 + "#" + "bitmart.WebSocket", '6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9')`
= 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

Ues Shell create param `sign`: sign =
`echo -n '1589267764859#test001#bitmart.WebSocket' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"`
(stdin)= 3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556

The final login parameters are:

`{"op": "login", "args": ["80618e45710812162b04892c7ee5ead4a3cc3e56", "1589267764859", "3ceeb7e1b8cb165a975e28a2e2dfaca4d30b358873c0351c1a071d8c83314556"]}`

#### Note

1\. If return data does not contain the error_code field, it indicates success  
2\. If the login fails, the link will be automatically disconnected

## 【Private】Order Progress

Subscribe to the order execution progress of a single trading pair, or you can
subscribe to the order execution progress of all trading pairs at once.

### Pushing Rules

1.  User login required
2.  Qualified orders will be pushed (Successfully placed an order, Partially
    filled, Fully filled, Canceled)
3.  Push frequency: Push when changes

### Subscribe Request

> Order transaction progress subscription request for a single trading pair

Copy Success

Copy to Clipboard

`{   "op": "subscribe",    "args": ["spot/user/order:BTC_USDT"] }`

> Order transaction progress subscription request for all trading pairs

Copy Success

Copy to Clipboard

`{   "op": "subscribe",    "args": ["spot/user/orders:ALL_SYMBOLS"] }`

Message Format:

1.The order transaction progress subscription of a single trading pair:

`{"op": "subscribe", "args": ["spot/user/order:<symbol>"]}`

- channel: Channel name, such as `spot/user/order`
- symbol: Trading pair, such as `BTC_USDT`

2.The order transaction progress of all trading pairs:

- channel: Channel name, such as `spot/user/orders`
- symbol: All Trading pair, fixed value: `ALL_SYMBOLS`

**Note: The channel names subscribed to for a single trading pair and all
trading pairs are different**

### Subscription successful

> Single trading pair subscription successful

Copy Success

Copy to Clipboard

`{   "event":  "subscribe",   "topic":  "spot/user/order:BTC_USDT" }`

1.The order transaction progress subscription of a single trading pair was
successfully subscribed.

`{"event":"subscribe","topic":"spot/user/order:<symbol>"}`

> All trading pairs subscription successful

Copy Success

Copy to Clipboard

`{   "event":  "subscribe",   "topic":  "spot/user/orders:ALL_SYMBOLS" }`

2.The order transaction progress of all trading pairs has been successfully
subscribed.

`{"event":"subscribe","topic":"spot/user/orders:ALL_SYMBOLS"}`

### After successful subscription, push data

> Push data

Copy Success

Copy to Clipboard

`{     "data":[         {             "symbol":"BTC_USDT",             "side":"buy",             "type":"market",             "notional":"",             "size":"1.0000000000",             "ms_t":"1609926028000",             "price":"46100.0000000000",             "filled_notional":"46100.0000000000",             "filled_size":"1.0000000000",             "margin_trading":"0",             "state":"4",             "order_id":"2147857398",             "order_type":"0",             "last_fill_time":"1609926039226",             "last_fill_price":"46100.00000",             "last_fill_count":"1.00000",             "exec_type":"M",             "detail_id":"256348632",             "client_order_id":"order4872191",             "create_time":"1609926028000",             "update_time":"1609926044000",             "order_mode":"0",             "entrust_type":"normal",             "order_state":"partially_filled",             "dealFee":"10.00",             "deal_fee_coin_name":"BMX"         }     ],     "table":"spot/user/order" }`

Return data description:

| Field              | Type   | Description                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------ | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol             | string | Trading pair, <code>BTC_USDT</code>                                                                                                                                                                                                                                                                                                                                                    |
| order_id           | string | Order ID                                                                                                                                                                                                                                                                                                                                                                               |
| price              | string | Order price                                                                                                                                                                                                                                                                                                                                                                            |
| size               | string | Order quantity                                                                                                                                                                                                                                                                                                                                                                         |
| notional           | string | The purchase amount, returned when buying at market price; otherwise, an empty string is returned                                                                                                                                                                                                                                                                                      |
| side               | string | Side<br>-<code>buy</code><br>-<code>sell</code>                                                                                                                                                                                                                                                                                                                                        |
| type               | string | Type<br>-<code>limit</code><br>-<code>market</code>                                                                                                                                                                                                                                                                                                                                    |
| ms_t               | string | Order Create Timestamp (in milliseconds)                                                                                                                                                                                                                                                                                                                                               |
| filled_size        | string | Filled size (Base currency)                                                                                                                                                                                                                                                                                                                                                            |
| filled_notional    | string | Filled notional amount (Quote currency)                                                                                                                                                                                                                                                                                                                                                |
| margin_trading     | string | <code>0</code>：Spot order (The field will be removed, please use the order_mode field)                                                                                                                                                                                                                                                                                                |
| order_type         | string | Order type (The field will be removed, please use the entrust_type field)<br>-<code>0</code>=Regular<br>-<code>1</code>=Maker only(Post only)<br>-<code>2</code>=Fill or kill(FOK)<br>-<code>3</code>=Immediate or Cancel(IOC)                                                                                                                                                         |
| state              | string | Order state (The field will be removed, please use the order_state field)<br>-<code>4</code>=Order success, Pending for fulfilment<br>-<code>5</code>=Partially filled<br>-<code>6</code>=Fully filled<br>-<code>8</code>=Canceled<br>-<code>12</code>=Canceled after Partially filled                                                                                                 |
| last_fill_price    | string | Latest trade price(0 if not filled)                                                                                                                                                                                                                                                                                                                                                    |
| last_fill_count    | string | Latest trade quantity(0 if not filled）                                                                                                                                                                                                                                                                                                                                                |
| last_fill_time     | string | Latest trade time(0 if not filled) millisecond                                                                                                                                                                                                                                                                                                                                         |
| exec_type          | string | Whether the trade was created by a maker or a taker.<br>-<code>M</code>=Maker<br>-<code>T</code>=Taker                                                                                                                                                                                                                                                                                 |
| detail_id          | string | Trade id                                                                                                                                                                                                                                                                                                                                                                               |
| client_order_id    | string | Client-defined OrderId                                                                                                                                                                                                                                                                                                                                                                 |
| create_time        | String | Order Create Time (in milliseconds)                                                                                                                                                                                                                                                                                                                                                    |
| update_time        | String | Order Update Time (in milliseconds)                                                                                                                                                                                                                                                                                                                                                    |
| order_mode         | String | Order mode<br>-<code>spot</code>=spot<br>-<code>iso_margin</code>=margin                                                                                                                                                                                                                                                                                                               |
| entrust_type       | String | Order Type<br>-<code>NORMAL</code>=Normal trade order(Limit Order or Market Order)<br>-<code>LIMIT_MAKER</code>=PostOnly Order<br>-<code>IOC</code>=IOC Order                                                                                                                                                                                                                          |
| order_state        | String | Order State<br>-<code>new</code>=The order has been accepted by the engine.<br>-<code>partially_filled</code>=A part of the order has been filled.<br>-<code>filled</code>=The order has been completed.<br>-<code>canceled</code>=The order has been canceled by the user.<br>-<code>partially_canceled</code>=A part of the order has been filled , and the order has been canceled. |
| dealFee            | String | Fee                                                                                                                                                                                                                                                                                                                                                                                    |
| deal_fee_coin_name | String | Fee coin name                                                                                                                                                                                                                                                                                                                                                                          |

**Notice：This data is displayed after decompression,
[Refer to Data Compression for details](#data-compression)**

## 【Private】Balance Change

Balance change push

### Pushing Rules

1.  User login required
2.  Qualified balance changes (recharge, withdrawal, transfer, transaction, BMX
    handling fee deduction)
3.  Push frequency: Push when changes

### Subscribe Request

> Subscribe Request

Copy Success

Copy to Clipboard

`{   "op": "subscribe",   "args": ["spot/user/balance:BALANCE_UPDATE"] }`

Message Format:

`{"op": "subscribe", "args": ["spot/user/balance:BALANCE_UPDATE"]}`

- Includes changes in all currency balances

### Subscription successful

> Subscription successful

Copy Success

Copy to Clipboard

`{   "event":  "subscribe",   "topic":  "spot/user/balance:BALANCE_UPDATE" }`

`{"event": "subscribe","topic": "spot/user/balance:BALANCE_UPDATE"}`

### After successful subscription, push data

> Push data

Copy Success

Copy to Clipboard

`{   "data":[     {       "event_type":"TRANSACTION_COMPLETED  ",       "event_time":"1693364237000",       "balance_details":[{         "ccy": "BTC",         "av_bal": "123.22",         "fz_bal": "12.56"       }]     }   ],   "table":"spot/user/balance" }`

Return data description:

| Field           | Type   | Description                                                                                                                                                                                                                                               |
| --------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| event_type      | string | Type for change<br>-<code>TRANSACTION_COMPLETED</code>=Trade<br>-<code>ACCOUNT_RECHARGE</code>=Recharge<br>-<code>ACCOUNT_WITHDRAWAL</code>=Withdraw<br>-<code>ACCOUNT_TRANSFER</code>=Transfer<br>-<code>BMX_DEDUCTION</code>=BMX handling fee deduction |
| event_time      | string | Create time                                                                                                                                                                                                                                               |
| balance_details | string | Detail                                                                                                                                                                                                                                                    |
| &gt;ccy         | string | Changing Balance Currency                                                                                                                                                                                                                                 |
| &gt;av_bal      | string | Available balance after change                                                                                                                                                                                                                            |
| &gt;fz_bal      | string | Freeze balance after change                                                                                                                                                                                                                               |

**Notice：This data is displayed after decompression,
[Refer to Data Compression for details](#data-compression)**

# Error Code

## Restful Error Code

### List of global HTTP return codes

| HTTP | Description                                                                                                |
| ---- | ---------------------------------------------------------------------------------------------------------- |
| 404  | Not Found-The requested interface could not be found                                                       |
| 403  | Forbidden-No permission to access the resource (KEY may not have permission, or it may be IP restrictions) |
| 401  | Unauthorized-Authentication failed (there are problems with the 3 header parameters, failed)               |
| 500  | Internal Server Error-Server exception, BitMart service problem                                            |

### Authentication Error Code

Example: httpStatus:200, body:{"code": 1000, "message": "OK", "trace":
"12323-3243242-34334534-4353","data":{}}

| error message                                                                                                            |     | code error code | http status code |
| ------------------------------------------------------------------------------------------------------------------------ | --- | --------------- | ---------------- |
| Not found                                                                                                                |     | 30000           | 404              |
| Header X-BM-KEY is empty                                                                                                 |     | 30001           | 401              |
| Header X-BM-KEY not found                                                                                                |     | 30002           | 401              |
| Header X-BM-KEY has frozen                                                                                               |     | 30003           | 401              |
| Header X-BM-SIGN is empty                                                                                                |     | 30004           | 401              |
| Header X-BM-SIGN is wrong                                                                                                |     | 30005           | 401              |
| Header X-BM-TIMESTAMP is empty                                                                                           |     | 30006           | 401              |
| Header X-BM-TIMESTAMP must be long type                                                                                  |     | 30006           | 401              |
| Header X-BM-TIMESTAMP range. Within a minute                                                                             |     | 30007           | 401              |
| Header X-BM-TIMESTAMP range. Timestamp for this request is outside of the recvWindow.                                    |     | 30007           | 401              |
| Param recvWindow must be long type                                                                                       |     | 30007           | 401              |
| Param recvWindow must be less than 60000 and greater than 0                                                              |     | 30007           | 401              |
| Header X-BM-TIMESTAMP invalid format                                                                                     |     | 30008           | 401              |
| IP is forbidden. We recommend enabling IP whitelist for API trading. After that reauth your account                      |     | 30010           | 403              |
| Header X-BM-KEY over expire time                                                                                         |     | 30011           | 403              |
| Header X-BM-KEY is forbidden to request it                                                                               |     | 30012           | 403              |
| Request too many requests                                                                                                |     | 30013           | 429              |
| Service unavailable                                                                                                      |     | 30014           | 503              |
| Service maintenance, the function is temporarily unavailable                                                             |     | 30016           | 200              |
| Your account request is temporarily rejected due to violation of current limiting rules, please contact customer service |     | 30017           | 418              |
| Request Body requires JSON format                                                                                        |     | 30018           | 503              |
| You do not have the permissions to perform this operation. Please contact customer service or BD for assistance          |     | 30019           | 200              |
| Futures V1 API has been deprecated. Please use Futures V2 API. You can view the change logs for upgrade                  |     | 30030           | 200              |
| This endpoint has been deprecated. You can view the change logs for upgrade                                              |     | 30031           | 200              |

### Funding Account&Sub-Account API Error Code

Example: httpStatus:200, body:{"code":
1000,"trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1","message": "OK","data": {}}

| error message                                                                                                                                              | code error code | http status code |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| OK                                                                                                                                                         | 1000            | 200              |
| Invalid request (maybe the body is empty, or the int parameter passes string data)                                                                         | 60000           | 400              |
| Asset account type does not exist                                                                                                                          | 60001           | 400              |
| currency does not exist                                                                                                                                    | 60002           | 400              |
| Currency has been closed recharge channel, if there is any problem, please consult customer service                                                        | 60003           | 400              |
| Currency has been closed withdraw channel, if there is any problem, please consult customer service                                                        | 60004           | 400              |
| Minimum amount is %s                                                                                                                                       | 60005           | 400              |
| Maximum withdraw precision is %d                                                                                                                           | 60006           | 400              |
| Only withdrawals from added addresses are allowed                                                                                                          | 60007           | 400              |
| Balance not enough                                                                                                                                         | 60008           | 400              |
| Beyond the limit                                                                                                                                           | 60009           | 400              |
| Withdraw id or deposit id not found                                                                                                                        | 60010           | 400              |
| Address is not valid                                                                                                                                       | 60011           | 400              |
| This action is not supported in this currency(If IOTA, HLX recharge and withdraw calls are prohibited)                                                     | 60012           | 400              |
| The withdrawal amount must be an integral multiple of %s                                                                                                   | 60013           | 400              |
| Please check your memo                                                                                                                                     | 60014           | 400              |
| This address is not verified. Please add and verify this address on the client                                                                             | 60015           | 400              |
| Your account is not allowed to recharge                                                                                                                    | 60020           | 403              |
| Your account is not allowed to withdraw                                                                                                                    | 60021           | 403              |
| No withdrawals for 24 hours                                                                                                                                | 60022           | 403              |
| Sub-account does not have permission to operate                                                                                                            | 60026           | 403              |
| Only supports sub-account calls                                                                                                                            | 60027           | 403              |
| Account status is unavailable                                                                                                                              | 60028           | 403              |
| The account is frozen by the master account, please contact the master account to unfreeze the account                                                     | 60029           | 403              |
| Method Not Allowed                                                                                                                                         | 60030           | 405              |
| Unsupported Media Type                                                                                                                                     | 60031           | 415              |
| User account not found                                                                                                                                     | 60050           | 500              |
| Internal Server Error                                                                                                                                      | 60051           | 500              |
| Exception                                                                                                                                                  | 60052           | 400              |
| please check The Email/PhoneNumber/BitMart ID And try again                                                                                                | 60053           | 403              |
| Sub-account does not support withdraw                                                                                                                      | 60054           | 403              |
| This currency is not support                                                                                                                               | 60055           | 403              |
| This currency withdrawal is suspended                                                                                                                      | 60056           | 403              |
| User status is not available                                                                                                                               | 60057           | 403              |
| Monitor that the withdrawal will cause the overall spot wallet to fall below the Margin call risk rate. Please revise the withdrawal amount as appropriate | 60058           | 403              |
| internal Withdraw forbidden                                                                                                                                | 60059           | 403              |
| Invalid request                                                                                                                                            | 60060           | 403              |
| Unsupported operation                                                                                                                                      | 60061           | 403              |
| Forbidden                                                                                                                                                  | 60062           | 403              |
| Account is frozen due to security policies. Please contact customer service                                                                                | 60063           | 403              |
| Exceed daily withdrawal quota, for your safety, please wait 24 hours and try again                                                                         | 60064           | 403              |
| The withdrawal user and the target user cannot be the same                                                                                                 | 60065           | 403              |
| Please notice the default startTime and endTime to make sure that time interval is within 0-90 days                                                        | 60066           | 400              |
| If both startTime and endTimeare sent, time between startTimeand endTimemust be less than 90 days.                                                         | 60067           | 400              |
| Parameter Error                                                                                                                                            | 60000           | 400              |
| Amount must be greater than 0                                                                                                                              | 61000           | 400              |
| Insufficient balance                                                                                                                                       | 61001           | 400              |
| ToAccount not found                                                                                                                                        | 61002           | 400              |
| The specified sub-account could not be found                                                                                                               | 61003           | 400              |
| Duplicate requests (such as using an existing requestNo)                                                                                                   | 61004           | 400              |
| Asset transfer between accounts is not available                                                                                                           | 61005           | 403              |
| The sub-account api only supports organization accounts                                                                                                    | 61006           | 403              |
| Please complete your institution verification to enable withdrawal function.                                                                               | 61007           | 403              |
| Suspend transfer out                                                                                                                                       | 61008           | 403              |

### Spot Public Mark API Error Code

| error message                      | code error code | http status code |
| ---------------------------------- | --------------- | ---------------- |
| OK                                 | 1000            | 200              |
| no data                            | 70000           | 200              |
| request param can not be null      | 70001           | 200              |
| symbol is invalid                  | 70002           | 200              |
| after is invalid                   | 71001           | 200              |
| before is invalid                  | 71002           | 200              |
| request after or before is invalid | 71003           | 200              |
| request kline count limit          | 71004           | 200              |
| request step error                 | 71005           | 200              |

### Spot&Margin API Error Code

Example: httpStatus:200, body:{"code":
1000,"trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1","message": "OK","data": {}}

| error message                                                                                                                                           | code error code | http status code |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- | ---------------- |
| OK                                                                                                                                                      | 1000            | 200              |
| Bad Request                                                                                                                                             | 50000           | 400              |
| Symbol not found                                                                                                                                        | 50001           | 400              |
| From Or To format error                                                                                                                                 | 50002           | 400              |
| Step format error                                                                                                                                       | 50003           | 400              |
| Kline size over 500                                                                                                                                     | 50004           | 400              |
| Order Id not found                                                                                                                                      | 50005           | 400              |
| Minimum size is %s                                                                                                                                      | 50006           | 400              |
| Maximum size is %s                                                                                                                                      | 50007           | 400              |
| Minimum price is %s                                                                                                                                     | 50008           | 400              |
| Minimum count\*price is %s                                                                                                                              | 50009           | 400              |
| RequestParam size is required                                                                                                                           | 50010           | 400              |
| RequestParam price is required                                                                                                                          | 50011           | 400              |
| RequestParam notional is required                                                                                                                       | 50012           | 400              |
| Maximum limit\*offset is %d                                                                                                                             | 50013           | 400              |
| RequestParam limit is required                                                                                                                          | 50014           | 400              |
| Minimum limit is 1                                                                                                                                      | 50015           | 400              |
| Maximum limit is %d                                                                                                                                     | 50016           | 400              |
| RequestParam offset is required                                                                                                                         | 50017           | 400              |
| Minimum offset is 1                                                                                                                                     | 50018           | 400              |
| Invalid status. validate status is [1=Failed, 2=Success, 3=Frozen Failed, 4=Frozen Success, 5=Partially Filled, 6=Fully Fulled, 7=Canceling, 8=Canceled | 50019           | 400              |
| Balance not enough                                                                                                                                      | 50020           | 400              |
| Invalid %s                                                                                                                                              | 50021           | 400              |
| Service unavailable                                                                                                                                     | 50022           | 400              |
| This Symbol can't place order by api                                                                                                                    | 50023           | 400              |
| Order book size over 200                                                                                                                                | 50024           | 400              |
| Maximum price is %s                                                                                                                                     | 50025           | 400              |
| The buy order price cannot be higher than the open price                                                                                                | 50026           | 400              |
| The sell order price cannot be lower than the open price                                                                                                | 50027           | 400              |
| Missing parameters                                                                                                                                      | 50028           | 400              |
| The parameters do not match                                                                                                                             | 50029           | 400              |
| Order is already canceled                                                                                                                               | 50030           | 400              |
| Order is already completed                                                                                                                              | 50031           | 400              |
| The order was matched or cancelled                                                                                                                      | 50032           | 400              |
| The order quantity should be greater than 0 and less than or equal to 10                                                                                | 50033           | 400              |
| The price is high and there is no matching depth                                                                                                        | 50034           | 400              |
| The price is low and there is no matching depth                                                                                                         | 50035           | 400              |
| Cancel failed, order is not revocable status                                                                                                            | 50036           | 400              |
| The maximum length of clientOrderId cannot exceed 32                                                                                                    | 50037           | 400              |
| ClientOrderId only allows a combination of numbers and letters                                                                                          | 50038           | 400              |
| Order_id and clientOrderId cannot be empty at the same time                                                                                             | 50039           | 400              |
| Symbol Not Available                                                                                                                                    | 50040           | 400              |
| Out of query time range                                                                                                                                 | 50041           | 400              |
| clientOrderId is duplicate                                                                                                                              | 50042           | 400              |
| Currency not found                                                                                                                                      | 51000           | 400              |
| Margin Account not Opened                                                                                                                               | 51001           | 400              |
| Margin Account Not Available                                                                                                                            | 51002           | 400              |
| Account Limit                                                                                                                                           | 51003           | 400              |
| Exceed the maximum number of borrows available                                                                                                          | 51004           | 400              |
| Less than the minimum borrowable amount                                                                                                                 | 51005           | 400              |
| Exceeds the amount to be repaid                                                                                                                         | 51006           | 400              |
| order_mode not found                                                                                                                                    | 51007           | 400              |
| Operation is limited, please try again later                                                                                                            | 51008           | 400              |
| Parameter mismatch: limit order/market order quantity should be greater than the minimum number of should buy/sell                                      | 51009           | 400              |
| Parameter mismatch: limit order price should be greater than the minimum buy price                                                                      | 51010           | 400              |
| Parameter mismatch: Limit order quantity \* price should be greater than the minimum transaction amount                                                 | 51011           | 400              |
| Participation mismatch: the number of market order buy orders should be greater than the minimum buyable amount                                         | 51012           | 400              |
| Parameter mismatch: the price of market order buy order placed is too small                                                                             | 51013           | 400              |
| Parameter mismatch: the amount of market order sell orders placed is too small                                                                          | 51014           | 400              |
| Quantity is too small                                                                                                                                   | 51015           | 400              |
| There is no Margin Borrowing                                                                                                                            | 51024           | 400              |
| Unsupported OrderMode Type                                                                                                                              | 52000           | 400              |
| Unsupported Trade Type                                                                                                                                  | 52001           | 400              |
| Unsupported Side Type                                                                                                                                   | 52002           | 400              |
| Unsupported Query State Type                                                                                                                            | 52003           | 400              |
| End time must be greater than or equal to Start time                                                                                                    | 52004           | 400              |
| Your account is frozen due to security policies. Please contact customer service                                                                        | 53000           | 403              |
| Your kyc country is restricted. Please contact customer service.                                                                                        | 53001           | 403              |
| Your account has not yet completed the kyc advanced certification, please complete first                                                                | 53002           | 403              |
| No permission, please contact the main account                                                                                                          | 53003           | 403              |
| This trading pair is not available to trade in your region                                                                                              | 53004           | 403              |
| Don't have permission to access the interface                                                                                                           | 53005           | 403              |
| Please complete your personal verification(Starter)                                                                                                     | 53006           | 403              |
| Please complete your personal verification(Advanced)                                                                                                    | 53007           | 403              |
| Services is not available in your countries and areas                                                                                                   | 53008           | 403              |
| Your account has not yet completed the qr code certification, please complete first                                                                     | 53009           | 403              |
| This account is restricted from borrowing                                                                                                               | 53010           | 403              |
| Your account type is prohibited from using this feature                                                                                                 | 53011           | 403              |
| Method Not Allowed                                                                                                                                      | 57001           | 405              |
| Unsupported Media Type                                                                                                                                  | 58001           | 415              |
| User account not found                                                                                                                                  | 59001           | 400              |
| Internal Server Error                                                                                                                                   | 59002           | 500              |
| Spot wallet call fail                                                                                                                                   | 59003           | 500              |
| Margin wallet service call exception                                                                                                                    | 59004           | 500              |
| Margin wallet service restricted                                                                                                                        | 59005           | 500              |
| Transfer fail                                                                                                                                           | 59006           | 500              |
| Get symbol risk data fail                                                                                                                               | 59007           | 500              |
| Trading order failure                                                                                                                                   | 59008           | 500              |
| Loan success,but trading order failure                                                                                                                  | 59009           | 500              |
| Insufficient loan amount.                                                                                                                               | 59010           | 500              |
| The Get Wallet Balance service call fail, please try again later                                                                                        | 59011           | 500              |

## WebSocket Error Code

> Error Code Format

Copy Success

Copy to Clipboard

`{"event":"<operation>", "errorMessage":"", "errorCode":""}`

### Error Code

| Error Message                                                                                    | Error Code |
| ------------------------------------------------------------------------------------------------ | ---------- |
| Invalid message format                                                                           | 90001      |
| Invalid op param                                                                                 | 90002      |
| Invalid args param                                                                               | 90003      |
| Invalid channel param                                                                            | 90004      |
| Topic quantity in single subscription exceeds limit                                              | 90005      |
| Subscribed total topic quantity exceeds limit                                                    | 90006      |
| Subscribed message frequency exceeds limit, please try later                                     | 90007      |
| Duplicate subscription                                                                           | 90008      |
| Invalid subscription                                                                             | 90009      |
| API KEY is empty                                                                                 | 91001      |
| API KEY not found                                                                                | 91002      |
| API KEY has frozen                                                                               | 91003      |
| API KEY over expire time                                                                         | 91004      |
| Already logged in                                                                                | 91005      |
| User not logged in / User must be logged in                                                      | 91006      |
| Param sign is empty                                                                              | 91010      |
| Param sign is wrong                                                                              | 91011      |
| Param timestamp is empty                                                                         | 91021      |
| Param timestamp range. Within a minute                                                           | 91022      |
| Param timestamp invalid format                                                                   | 91023      |
| Invalid symbol param                                                                             | 92001      |
| Frequently reestablishing connections in a short period of time                                  | 94001      |
| The number of connections established between a single IP and the server exceeds the upper limit | 94002      |
| Internal system error                                                                            | 95000      |
