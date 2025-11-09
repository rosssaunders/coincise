# GET API Key Permission Settings

**Source:**
[API Key Permission Settings](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

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

| API Name                               | Authentication Type | Description                                                 |
| -------------------------------------- | ------------------- | ----------------------------------------------------------- |
| /account/v1/wallet                     | KEYED               | Query account assets                                        |
| /account/v1/deposit/address            | KEYED               | Query deposit addresses for each currency                   |
| /account/v1/withdraw/address/list      | KEYED               | Query withdraw address list                                 |
| /account/v2/deposit-withdraw/history   | KEYED               | Query deposit and withdrawal history                        |
| /account/v1/deposit-withdraw/detail    | KEYED               | Query deposit and withdrawal details                        |
| /spot/v1/wallet                        | KEYED               | Query wallet balance for all currencies                     |
| /spot/v4/query/order                   | SIGNED              | Query order by id (v4)                                      |
| /spot/v4/query/client-order            | SIGNED              | Query order by client order id (v4)                         |
| /spot/v4/query/open-orders             | SIGNED              | Current open orders (v4)                                    |
| /spot/v4/query/history-orders          | SIGNED              | Account orders (v4)                                         |
| /spot/v4/query/trades                  | SIGNED              | Account trade list (v4)                                     |
| /spot/v4/query/order-trades            | SIGNED              | Order trade list(v4)                                        |
| /spot/v1/user_fee                      | KEYED               | Query basic fee rate for current user                       |
| /spot/v1/trade_fee                     | KEYED               | Query fee rate for a specific trading pair for current user |
| /spot/v1/margin/isolated/pairs         | KEYED               | Query loan interest rate and limit for a trading pair       |
| /spot/v1/margin/isolated/account       | KEYED               | Query isolated margin account information                   |
| /spot/v1/margin/isolated/borrow_record | KEYED               | Query isolated margin borrowing record                      |
| /spot/v1/margin/isolated/repay_record  | KEYED               | Query isolated margin repayment record                      |
| /contract/private/get-open-orders      | KEYED               | Query Contract All Open Orders                              |
| /contract/private/order                | KEYED               | Query contract order details                                |
| /contract/private/trade-fee-rate       | KEYED               | Query Trade Fee Rate                                        |
| /contract/private/order-history        | KEYED               | Query contract order history                                |
| /contract/private/trades               | KEYED               | Query contract trade details                                |
| /contract/private/transaction-history  | KEYED               | Get Contract Transaction History                            |
| /contract/private/assets-detail        | KEYED               | Query contract asset details                                |
| /contract/private/position             | KEYED               | Query position details                                      |
| /contract/private/position-v2          | KEYED               | Query position details V2                                   |
| /contract/private/current-plan-order   | KEYED               | Query Current Plan Orders                                   |
| /contract/private/position-risk        | KEYED               | Query Position Risk Details                                 |
| /contract/private/get-position-mode    | KEYED               | Get position mode                                           |

###### Withdraw Permissions:

| API Name                    | Authentication Type | Description             |
| --------------------------- | ------------------- | ----------------------- |
| /account/v1/withdraw/charge | KEYED               | Query withdrawal limits |
| /account/v1/withdraw/apply  | SIGNED              | Apply for withdrawal    |

###### Spot-Trade Permissions:

| API Name               | Authentication Type | Description                |
| ---------------------- | ------------------- | -------------------------- |
| /spot/v1/submit_order  | SIGNED              | Place an order             |
| /spot/v2/submit_order  | SIGNED              | Place an order             |
| /spot/v1/batch_orders  | SIGNED              | Place multiple orders      |
| /spot/v2/batch_orders  | SIGNED              | Place multiple orders      |
| /spot/v4/batch_orders  | SIGNED              | Place multiple orders      |
| /spot/v1/cancel_order  | SIGNED              | Cancel an unfinished order |
| /spot/v3/cancel_order  | SIGNED              | Cancel an unfinished order |
| /spot/v1/cancel_orders | SIGNED              | Cancel multiple orders     |
| /spot/v4/cancel_orders | SIGNED              | Cancel multiple orders     |

###### Margin-Trade Permissions:

| API Name                          | Authentication Type | Description                                     |
| --------------------------------- | ------------------- | ----------------------------------------------- |
| /spot/v1/margin/submit_order      | SIGNED              | Margin order placement                          |
| /spot/v1/margin/isolated/transfer | SIGNED              | Transfer funds between margin and spot accounts |
| /spot/v1/margin/isolated/borrow   | SIGNED              | Isolated margin borrowing                       |
| /spot/v1/margin/isolated/repay    | SIGNED              | Repay isolated margin debt                      |

###### Future-Trade Permissions:

| API Name                                   | Authentication Type | Description                                       |
| ------------------------------------------ | ------------------- | ------------------------------------------------- |
| /contract/private/submit-order             | SIGNED              | Place an order for a futures contract             |
| /contract/private/cancel-order             | SIGNED              | Cancel a single futures order                     |
| /contract/private/cancel-orders            | SIGNED              | Batch cancel futures orders                       |
| /contract/private/submit-plan-order        | SIGNED              | Place a plan order for futures contracts          |
| /contract/private/cancel-plan-order        | SIGNED              | Cancel futures plan orders                        |
| /account/v1/transfer-contract              | SIGNED              | Future account transfer                           |
| /account/v1/transfer-contract-list         | SIGNED              | Get Future account transfer list                  |
| /contract/private/submit-tp-sl-order       | SIGNED              | Place a tp or sl order for a futures contract     |
| /contract/private/modify-plan-order        | SIGNED              | Modify a plan order for a futures contract        |
| /contract/private/modify-preset-plan-order | SIGNED              | Modify a preset plan order for a futures contract |
| /contract/private/modify-tp-sl-order       | SIGNED              | Modify a tp or sl order for a futures contract    |
| /contract/private/submit-trail-order       | SIGNED              | Place a trail order for futures contracts         |
| /contract/private/cancel-trail-order       | SIGNED              | Cancel futures trail order                        |
| /contract/private/modify-limit-order       | SIGNED              | Modify futures limit order                        |
| /contract/private/cancel-all-after         | SIGNED              | Timed cancel all open orders                      |
| /contract/private/set-position-mode        | SIGNED              | Set position mode                                 |

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

| API Name                                            | Authentication Type | Description                                                                            |
| --------------------------------------------------- | ------------------- | -------------------------------------------------------------------------------------- |
| /account/sub-account/main/v1/sub-to-main            | SIGNED              | Sub-Account Transfer to Main-Account (For Main Account, use spot account)              |
| /account/sub-account/sub/v1/sub-to-main             | SIGNED              | Sub-Account Transfer to Main-Account (For Sub-Account, use spot account)               |
| /account/sub-account/main/v1/main-to-sub            | SIGNED              | Main-Account Transfer to Sub-Account (For Main Account, use spot account)              |
| /account/sub-account/main/v1/sub-to-sub             | SIGNED              | Sub-Account Transfer to Sub-Account (For Main Account, use spot account)               |
| /account/sub-account/main/v1/transfer-list          | KEYED               | Get Sub-Account Transfer History (For Main Account, use spot account)                  |
| /account/sub-account/v1/transfer-history            | KEYED               | Get Account Spot Asset Transfer History (For Main/Sub Account, use spot account)       |
| /account/sub-account/main/v1/wallet                 | KEYED               | Get Sub-Account Spot Wallet Balance (For Main Account, use spot account)               |
| /account/sub-account/main/v1/subaccount-list        | KEYED               | Get Sub-Account List (For Main Account, use spot account)                              |
| /account/contract/sub-account/main/v1/sub-to-main   | SIGNED              | Sub-Account Transfer to Main-Account (For Main Account, use futures account)           |
| /account/contract/sub-account/main/v1/main-to-sub   | SIGNED              | Main-Account Transfer to Sub-Account (For Main Account, use futures account)           |
| /account/contract/sub-account/sub/v1/sub-to-main    | SIGNED              | Sub-Account Transfer to Main-Account (For Sub-Account, use futures account)            |
| /account/contract/sub-account/main/v1/wallet        | KEYED               | Get Sub-Account Futures Wallet Balance (For Main Account, use futures account)         |
| /account/contract/sub-account/v1/transfer-history   | KEYED               | Get Account Futures Asset Transfer History (For Main/Sub Account, use futures account) |
| /account/contract/sub-account/main/v1/transfer-list | KEYED               | Get Sub-Account Transfer History (For Main Account, use futures account)               |
