# Change Log

#### 2025-07-04

###### REST API

*   \[Update\] `/contract/private/order-history` Get Order History
    *   Feat：Response field **type** add new value **planorder**
*   \[Update\] `/contract/private/position-v2` Get Current Position V2
    *   Feat：Add new response field： **position\_amount**

* * *

#### 2025-06-20

###### REST API

*   \[New\] `/contract/public/market-trade` Query the latest trade data
    *   Feat: Retrieve up to the most recent 100 trade records

* * *

#### 2025-06-05

###### REST API

*   \[Update\] `/contract/public/details` Applicable to query contract details
    *   Feat：Add new response field： **status**
    *   Feat：Add new response field： **delist\_time**

* * *

#### 2025-06-04

###### REST API

*   \[New\] `/contract/public/leverage-bracket`
    *   Feat: Support retrieving risk limit bracket

* * *

#### 2025-05-08

###### REST API

*   \[New\] `/contract/private/position-v2` Get Current Position V2 (KEYED)
    *   Feat: If symbol is not provided, only trading pairs with existing positions will return data; trading pairs without positions will not return anything.
    *   Feat: If symbol is provided, data will be returned regardless of whether there is an existing position. If there is no position, the position-related fields will be displayed as zero.

* * *

#### 2025-04-10

###### Websocket Stream

*   \[Update\] `[Private] Position Channel`
    *   Feat：Add new response field **position\_mode**
*   \[Update\] `[Private] Order Channel`
    *   Feat：Add new response field **position\_mode**

* * *

#### 2025-04-08

###### REST API

*   \[New\] `/contract/private/set-position-mode` Set Position Mode (SIGNED)
    *   Feat: Applicable for setting position mode
*   \[New\] `/contract/private/get-position-mode` Get Position Mode (KEYED)
    *   Feat: Applicable for getting position mode
*   \[Update\] `/contract/private/position` Get Current Position (KEYED)
    *   Feat：Add new response field **position\_mode**
*   \[Update\] `/contract/private/order` Get Order Detail (KEYED)
    *   Feat：Add new response field **position\_mode**
*   \[Update\] `/contract/private/order-history` Get Order History (KEYED)
    *   Feat：Add new response field **position\_mode**
*   \[Update\] `/contract/private/get-open-orders` Get All Open Orders (KEYED)
    *   Feat：Add new response field **position\_mode**
*   \[Update\] `/contract/private/current-plan-order` Get All Current Plan Orders (KEYED)
    *   Feat：Add new response field **position\_mode**

* * *

#### 2025-04-03

###### REST API

*   \[Update\] `/contract/private/order` Get Order Detail (KEYED)
    *   Feat：Add new request field **account**, support differentiation between futures and copy\_trading
    *   Feat：Add new response field **account**
*   \[Update\] `/contract/private/order-history` Get Order History (KEYED)
    *   Feat：Add new request field **account**, support differentiation between futures and copy\_trading
    *   Feat：Add new response field **account**
*   \[Update\] `/contract/private/position` Get Current Position (KEYED)
    *   Feat：Add new request field **account**, support differentiation between futures and copy\_trading
    *   Feat：Add new response field **account**
*   \[Update\] `/contract/private/position-risk` Get Current Position Risk Details(KEYED)
    *   Feat：Add new request field **account**, support differentiation between futures and copy\_trading
    *   Feat：Add new response field **account**
*   \[Update\] `/contract/private/trades` Get Order Trade (KEYED)
    *   Feat：Add new request field **account**, support differentiation between futures and copy\_trading
    *   Feat：Add new response field **account**
*   \[Update\] `/contract/private/transaction-history` Get Transaction History (KEYED)
    *   Feat：Add new request field **account**, support differentiation between futures and copy\_trading
    *   Feat：Add new response field **account**

* * *

#### 2025-04-01

###### REST API

*   \[Update\] `/contract/private/cancel-all-after` Applicable for canceling all contract orders timed(SIGNED)
    *   Add new field **symbol**, support canceling open orders timed by symbol

* * *

#### 2025-03-27

###### REST API

*   \[New\] `/contract/private/cancel-all-after` Applicable for canceling all contract orders timed(SIGNED)
    *   Feature：Support canceling open orders timed

* * *

#### 2025-03-06

###### REST API

*   \[New\] `/contract/private/modify-limit-order` Applicable for modifying contract limit orders(SIGNED)
    *   Feature：Support modifying limit orders
*   \[Update\] `/contract/private/submit-order` Applicable for placing contract orders(SIGNED)
    *   Add new field **stp\_mode**, support setting up Self-Trading-Protection

* * *

#### 2025-02-11

###### Websocket Stream

*   \[Update\] `[Public] Ticker Channel`
    *   Support subscription by trading pair
    *   Rename `fair_price`\->`mark_price`
    *   Add `index_price`
*   \[New\] `[Public] MarkPrice KlineBin Channel`
    *   Support subscription MarkPrice Kline data

* * *

###### REST API

*   \[New\] `/contract/public/markprice-kline` Get MarkPrice K-line
    *   Support retrieving MarkPrice Kline data

* * *

#### 2025-1-16

###### Websocket Stream

*   \[Update\] `[Public] Trade Channel`
    *   Feature：Add new response field **m**, support differentiation between maker and taker.

#### 2024-12-17

###### REST API

*   \[New\] `/contract/private/submit-trail-order` Support replacing trail orders(SIGNED)
    *   Feature：Support replacing trail orders
*   \[New\] `/contract/private/cancel-trail-order` Support cancel trail orders(SIGNED)
    *   Feature：Support cancel trail orders
*   \[Update\] `/contract/private/submit-order` Applicable for placing orders(SIGNED)
    *   Feature：Remove the fields related replacing trail orders

* * *

#### 2024-12-12

###### REST API

*   \[New\] `/contract/public/funding-rate-history` Query Funding Rate History (NONE)
    *   Feature：Query futures funding rate history
*   \[New\] `/contract/private/transaction-history` Query Transaction History (KEYED)
    *   Feature：Query Transfers, Realized PnL, Funding costs, Fees and other fund records

* * *

#### 2024-12-11

###### Websocket Stream

*   \[New\] `[Public] Individual Symbol Book Ticker Channel`
    *   Supports BBO push
*   \[Update\] `[Public] Depth Channel`
    *   Supports optional update speed of @100ms,@200ms
*   \[Update\] `[Public] Depth-All Channel`
    *   Supports optional update speed of @100ms,@200ms
*   \[Update\] `[Public] Depth-Increase Channel`
    *   Supports optional update speed of @100ms,@200ms

* * *

#### 2024-12-04

###### REST API

*   \[Update\] `/account/v1/transfer-contract` Transfer (SIGNED)
    *   Feature：support sub-account call

* * *

#### 2024-11-28

###### REST API

*   \[Update\] `/contract/private/modify-plan-order` Modify Plan Order (SIGNED)
    *   Remove the field client\_order\_id

###### Websocket Order

*   \[Update\] 【Private】Order Channel
    *   The field of **state** adds type **status\_approval**

* * *

#### 2024-11-25

###### Websocket Stream

*   \[New\] \[Public\] Funding rate Channel
    *   Supports funding rate push

* * *

#### 2024-11-01

###### Websocket Stream

*   \[New\] \[Public\] Full-depth Channel
    *   Supports full-depth simultaneous push
*   \[New\] \[Public\] Incremental Depth Push Channel
    *   Supports incremental depth push

* * *

#### 2024-10-29

###### REST API

*   \[Update\] `/contract/public/kline` Get K-line
    *   Single time request size upper limit 500

* * *

#### 2024-10-24

###### REST API

*   \[Update\] `/contract/public/details` Get Contract Details
    *   Add new response field **market\_max\_volume**

* * *

#### 2024-10-17

###### REST API

*   \[New\] `/contract/private/trade-fee-rate` Support querying trade fee rate(KEYED)
    *   Feature：Support querying trade fee rate
*   \[Update\] `/contract/public/funding-rate` Get Current Funding Rate
    *   Update rate limit from 2 times/2 sec to 12 times/2 sec
*   \[Update\] `/contract/public/details` Get Contract Details
    *   Add new response field **funding\_interval\_hour**
    *   Support get funding interval

* * *

#### 2024-10-10

###### REST API

*   \[Update\] `/contract/private/submit-tp-sl-order` Support replacing contract TP/SL orders(SIGNED)
    *   Change the default value of field **plan\_category** to 2-Position TP/SL

* * *

#### 2024-09-26

###### Documentation

*   \[Deleted\] Futures 1.0 documentation

* * *

#### 2024-09-19

###### REST API

*   \[New\] `/contract/private/submit-tp-sl-order` Support replacing contract TP/SL orders(SIGNED)
    *   Feature：Support replacing contract TP/SL orders
*   \[New\] `/contract/private/modify-plan-order` Support modifying contract plan orders(SIGNED)
    *   Feature：Support modifying contract plan orders
*   \[New\] `/contract/private/modify-preset-plan-order` Support modifying contract preset plan orders(SIGNED)
    *   Feature：Support modifying contract preset plan orders
*   \[New\] `/contract/private/modify-tp-sl-order` Support modifying contract TP/SL orders(SIGNED)
    *   Feature：Support modifying contract TP/SL orders
*   \[Update\] `/contract/private/cancel-order` Cancel a single futures order
    *   Add new request field **client\_order\_id**
    *   Support batch cancel orders by symbol
*   \[Update\] `/contract/private/cancel-plan-order` Cancel Plan Order
    *   Add new request field **client\_order\_id**
    *   Support batch cancel orders by symbol
*   \[Update\] `/contract/private/current-plan-order` Get All Current Plan Orders
    *   Add new request field **plan\_type**

* * *

#### 2024-07-23

*   Add a new endpoint named current-plan-order
    *   `/contract/private/current-plan-order`support query contract all current plan orders（TP/SL、plan）
*   New endpoints for trading
    *   `/contract/private/submit-leverage`Submit Leverage (SIGNED)
*   New endpoints for Sub-Account
    *   `/account/contract/sub-account/main/v1/transfer-list`Get Sub-Account Transfer History (For Main Account）(KEYED)
    *   `/account/contract/sub-account/v1/transfer-history`Get Account Futures Asset Transfer History (For Main/Sub Account）(KEYED)
*   New endpoints for Sub-Account
    *   `/account/contract/sub-account/main/v1/sub-to-main`Sub-Account to Main-Account (For Main Account) (SIGNED)
    *   `/account/contract/sub-account/main/v1/main-to-sub`Main-Account to Sub-Account (For Main Account) (SIGNED)
    *   `/account/contract/sub-account/sub/v1/sub-to-main`Sub-Account to Main-Account (For Sub-Account) (SIGNED)
    *   `/account/contract/sub-account/main/v1/wallet`Get Sub-Account Futures Wallet Balance (For Main Account) (KEYED)
*   New endpoints for order
    *   `/contract/private/get-open-orders`Get All Open Orders (KEYED)
*   New endpoints for transfer
    *   `/account/v1/transfer-contract`Get Transfer List (SIGNED)
    *   `/account/v1/transfer-contract-list`Transfer (SIGNED)
*   New endpoints for websocket order notify
    *   `/contract/public/websocket/order`
*   New endpoints for trading
    *   `/contract/private/submit-plan-order`Submit Plan Order (SIGNED)
    *   `/contract/private/cancel-plan-order`Cancel Plan Order (SIGNED)
*   New endpoints for trading
    *   `/contract/private/orders-history`Get Order History (KEYED)
    *   `/contract/private/trades`Get Order Trade (KEYED)
    *   `/contract/private/position`Get Current Position (KEYED)
*   New endpoints for Futures Market Data
    *   `/contract/public/kline`Get K-line
    *   `/contract/public/funding-rate`Get Current Funding Rate
*   New endpoints for Futures Account Data
    *   `/contract/private/assets-detail`Get Contract Assets (KEYED)
*   New websocket for public data
    *   `/contract/public/websocket`
*   New endpoints for get current funding rate of a specified contract
    *   `/contract/public/open-interest`
*   New endpoints for Futures Market Data
    *   `/contract/public/details`Get Contract Details
    *   `/contract/public/depth`Get Market Depth
