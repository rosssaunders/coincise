# [#](#gate-api-v4-v4-96-0) Gate API v4 v4.96.0

Scroll down for code samples, example requests and responses. Select a language
for code samples from the tabs above or the mobile navigation menu.

Welcome to Gate.io API

APIv4 provides spot, margin and futures trading operations. There are public
APIs to retrieve the real-time market statistics, and private APIs which needs
authentication to trade on user's behalf.

## [#](#access-url) Access URL

**REST API BaseURL:**

- Live trading: `https://api.gateio.ws/api/v4`
- Futures TestNet trading: `https://fx-api-testnet.gateio.ws/api/v4`
- Futures live trading alternative (futures only):
  `https://fx-api.gateio.ws/api/v4`

## [#](#sdk) SDK

Available SDK:

- [Python (opens new window)](https://github.com/gateio/gateapi-python)
- [Java (opens new window)](https://github.com/gateio/gateapi-java)
- [PHP (opens new window)](https://github.com/gateio/gateapi-php)
- [Go (opens new window)](https://github.com/gateio/gateapi-go)
- [C# (opens new window)](https://github.com/gateio/gateapi-csharp)
- [NodeJS (opens new window)](https://github.com/gateio/gateapi-nodejs)
- [Javascript (opens new window)](https://github.com/gateio/gateapi-js)

Besides API examples, some SDK provides an additional demo application. The demo
application is a relatively complete example demonstrating how to use the SDK.
It can be built and run separately. Refer to corresponding repository for
details.

- [Python (opens new window)](https://github.com/gateio/gateapi-python/tree/master/example)
- [Java (opens new window)](https://github.com/gateio/gateapi-java/tree/master/example)
- [C# (opens new window)](https://github.com/gateio/gateapi-csharp/tree/master/example)
- [Go (opens new window)](https://github.com/gateio/gateapi-go/tree/master/_example)

## [#](#about-apiv4-key-improvement) About APIv4 key improvement

Previously(before April 2020) futures APIv4 key are separated from spot one, but
this is no longer the case anymore. You can create multiple keys with each key
having multiple permissions now. e.g. you can create one key with spot
read/write and futures read/write permission which can be used in both spot and
futures trading.

History API keys will not be affected by this improvement. Previous spot key and
futures key are now one key with only spot permissions enabled, another only
futures permission enabled. You can reconfigure their permissions after
migration.

## [#](#comparison-with-apiv2) Comparison with APIv2

APIv4 is a standalone brand-new HTTP REST API, currently used in parallel with
APIv2. APIv4 provides complete trading operations, with more highly secured
authentication method. What's more, APIv4 specification is written following
[OpenAPI Specification (opens new window)](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md).
SDKs and documents are all generated from the same spec, which ensures
consistency between documents and implementation.

The ways APIv4 and APIv2 differ are:

1.  Their API keys are separated from each other. Once logged into the web
    console, v2 API keys are generated on _"APIKeys"_ page, while v4
    _"APIv4Keys"_ page.
2.  APIv2 supports only spot trading, while v4 supports all trading operations
    in spot, margin and futures.

Which one to choose:

1.  If margin or futures trading are needed, choose APIv4.
2.  If only spot trading or wallet operation is required, choose on your own.

## [#](#application-for-marketers) Application for Marketers

In order to further improve the platform's opening depth and trading liquidity,
we will recruit institutional market makers in an open and transparent way, and
provide a professional market maker's service rate scheme for professional
institutional market makers according to their contribution to the platform's
liquidity.

1.  Provide Gateio UID
2.  Provide other transaction volume screenshot or VIP level
3.  Brief introduction of market making method and scale

Provide the above content and submit to [mm@gate.io](mailto:mm@gate.io) , we
will accept within 3 working days.

TIP

Vip11 and above need to open GT deduction in the personal center to enjoy the
professional market rate.

## [#](#technical-support) Technical Support

If you have any questions or suggestions during the use, you can contact us in
any of the following ways:

- Submit Work Order Feedback
- Online Work Order Feedback
- Send your contact information and questions to [mm@gate.io](mailto:mm@gate.io)
  We will assign technical specialists to serve you.

If you encounter API errors, it is recommended that you sort out the following
content, so that we can quickly analyze the problem for you:

1.  Problem Description
2.  Gateio UID
3.  Request URI and parameters
4.  Error Code
5.  Responses

DANGER

Even if you submit a problem, you should not submit the API key information to
customer service or others, otherwise there will be serious asset risk. If it
has been accidentally leaked, please delete the existing API and rebuild it.

# [#](#changelog) Changelog

**v4.96.0**

- Add `cross_margin_balance`,`cross_mmr`,`cross_imr` field in
  `GET /futures/{settle}/accounts` response

**v4.95.0**

- Add `code` field in `GET /spot/account_book` query & response
- New feature `GET /unified/transferables` endpoint, Batch query unified account
  can be transferred up to a maximum of
- New feature `GET /margin/user/loan_margin_tiers` endpoint, Check the user's
  own leverage lending gradient in the current market
- New feature `GET /margin/loan_margin_tiers` endpoint, Query the current market
  leverage lending gradient
- New feature `POST /margin/leverage/user_market_setting` endpoint, Set the user
  market leverage multiple
- New feature `GET /margin/user/account` endpoint, Query the user's leverage
  account list

**v4.94.0**

- New feature `GET /unified/currencies` endpoint, List of loan currencies
  supported by unified account
- Add `sub_uid` field in `GET /unified/accounts` query

**v4.93.0**

- Add `plan_id` field in `GET /earn/dual/investment_plan` query
- Add `from`、`to`、`page`、`limit` field in `GET /earn/dual/orders` query
- Add `text` field in `GET /earn/dual/orders` response
- Add `text` field in `POST /earn/dual/orders` response
- New feature `GET /earn/staking/eth2/rate_records` endpoint, Query historical
  rate of ETH2

**v4.92.0**

2025-02-24

- Add `name` field in `GET /spot/currencies` query
- Add `base_name`、`quote_name` field in `GET /spot/currency_pairs` response
- Add `unified` field in `GET /spot/price_orders` query
- Add `sub_uid` field in `GET /unified/accounts` query

**v4.91.0**

2025-02-10

`2025-04-01` After that, we will remove the following interface, please migrate
to the new interface as soon as possible

- `GET /margin/cross/borrowable` endpoint, deprecated
- `GET /margin/cross/estimate_rate` endpoint, deprecated
- `GET /margin/cross/transferable` endpoint, deprecated
- `GET /margin/cross/interest_records` endpoint, deprecated
- `GET /margin/cross/repayments` endpoint, deprecated
- `POST /margin/cross/repayments` endpoint, deprecated
- `GET /margin/cross/loans/{loan_id}` endpoint, deprecated
- `POST /margin/cross/loans` endpoint, deprecated
- `GET /margin/cross/account_book` endpoint, deprecated
- `GET /margin/cross/accounts` endpoint, deprecated
- `GET /margin/cross/currencies/{currency}` endpoint, deprecated
- `GET /margin/cross/currencies` endpoint, deprecated

**v4.90.0**

2025-01-20

- Add `transaction_type` field in `GET /wallet/push` query
- New feature `GET /rebate/user/sub_relation` endpoint, Query whether the
  specified user is in the system
- Add `order_size` field in`GET /futures/{settle}/liq_orders` response
- Add `type` field in `GET /spot/currency_pairs` response

**v4.89.0**

2025-01-08

- Add `text` field in `DELETE /futures/{settle}/close_all_positions` query
  string

**v4.88.0**

2024-12-24

- New feature `GET /spot/insurance_history` endpoint, Query spot insurance fund
  historical data
- Add
  `cross_balance`、`iso_balance`、`im`、`mm`、`imr`、`mmr`、`margin_balance`、`available_margin`
  field in `GET /unified/accounts` response
- `PUT /unified/unified_mode` endpoint，Added single-currency margin mode

**v4.87.0**

- New feature `GET /unified/history_loan_rate` endpoint, Get historical lending
  rates

**v4.86.0**

2024-12-02

- New feature `GET /wallet/order_status` endpoint. Transfer status query
- Add `update_id` field in `GET /futures/{settle}/positions` response

**v4.85.0**

2024-11-11

- Add `x-gate-exptime` field in
  `POST /futures/{settle}/orders`、`POST /spot/batch_order` header.
- Add
  `cross_order_margin`、`cross_initial_margin`、`cross_maintenance_margin`、`cross_unrealised_pnl`、`cross_available`、`isolated_position_margin`
  field in `POST /futures/{settle}/dual_mode` response.

**v4.84.0**

2024-11-04

- New feature `GET /loan/multi_collateral/current_rate` endpoint, Query the
  current interest rate of the currency
- Add `lowest_size`、`highest_size` field in `GET /spot/tickers` response
- Add `amount` field in `POST /earn/dual/orders` request body

**v4.83.0**

2024-10-28

- New feature `GET /unified/leverage/user_currency_config` endpoint, Query the
  maximum and minimum leverage multiples that users can set for a currency
- New feature `GET /unified/leverage/user_currency_setting` endpoint, Get the
  user's currency leverage
- New feature `POST /unified/leverage/user_currency_setting` endpoint, Set the
  currency leverage ratio
- Add `id` field in `GET /futures/{settle}/account_book` response
- Add `leverage` field in `GET /unified/currency_discount_tiers` response

**v4.82.0**

2024-10-14

- New feature `GET /account/rate_limit` endpoint, Get user flow limit
  information. For details, please refer to
  [Trade Ratio Rate Limiting](#trade-ratio-rate-limiting)
- `GET /account/detail` 接口, 返回值增加 `copy_trading_role` 字段

**v4.81.0**

2024-09-30

- New feature `POST /options/countdown_cancel_all` endpoint, Countdown to cancel
  order
- Add `message` field in `GET /wallet/push` response
- Add `lowest_size`、`highest_size` in `GET /futures/{settle}/tickers` response
- Add `from`、`to` in `GET /futures/{settle}/funding_rate` query
- Add `is_max` field in `POST /earn/dual/orders` response

**v4.80.0**

2024-09-09

- New feature `GET /options/mmp` endpoint, MMP Query
- New feature `POST /options/mmp` endpoint, MMP Settings
- New feature `POST /options/mmp/reset` endpoint, MMP Reset
- Add `block_number` field in `GET /wallet/withdrawals` response

**v4.79.0**

2024-09-02

- Add `from`、`to` field in `GET /unified/interest_records` query
- Add `options` field in `GET /unified/unified_mode` response
- Add `options` field in `PUT /unified/unified_mode` request body

**v4.78.0**

2024-08-19

- New feature `GET /wallet/push` endpoint, Get Records
- New feature `POST /withdrawals/push` endpoint, Transfer between spot main
  accounts. Both parties cannot be sub-accounts.
- New feature `GET /futures/{settle}/batch_amend_orders` endpoint, Batch modify
  orders with specified IDs
- Add `close_size` field in `GET /futures/{settle}/my_trades` response
- Add `tx_id` field in `POST /wallet/transfers` response

**v4.77.0**

2024-08-05

- New feature: add `GET /sub_accounts/unified_mode` endpoint，Get sub-account
  mode
- Add `from`、`to` field in `GET /rebate/broker/commission_history` query
- Add `from`、`to` field in `GET /rebate/broker/transaction_history` query

**v4.76.0**

2024-07-22

- New feature: add `GET /rebate/partner/sub_list` endpoint，Partner subordinate
  list
- Add `page`、`limit` field in `GET /flash_swap/currency_pairs` query
- Add `order_id`、`currency_pair`、`account` field in
  `PATCH /spot/orders/{order_id}`
- Add `order_id`、`currency_pair`、`account` field in
  `DELETE /spot/orders/{order_id}`

**v4.75.1**

2024-07-08

- New feature: add `GET /delivery/{settle}/risk_limit_tiers` endpoint，querying
  risk limit levels
- New feature: add `GET /rebate/partner/transaction_history` endpoint，partners
  to get the transaction history of recommended users
- Add `borrow_type` field in `GET /unified/loan_records` response
- Add `accum_size` field in `GET /futures/{settle}/position_close` response

**v4.75.0**

2024-06-24

- New feature: add `GET /account/debit_fee` endpoint，query GT deduction
  configuration.
- New feature: add `POST /account/debit_fee` endpoint, to enable or disable GT
  deduction for the current account.

**v4.74.1**

2024-06-11

- Optimization of DOM for the visible area on mobile devices

**v4.74.0**

2024-05-29

- New feature: add `GET /unified/loan_margin_tiers` endpoint, list loan margin
  tiers

**v4.73.0**

2024-05-27

- Add `is_all` parameter in `POST /wallet/small_balance` endpoint
- Add `text` field in `POST /spot/cancel_batch_orders` response
- Add `funding`、`funding_version`、`use_funding` field in
  `GET /unified/accounts` response

**v4.72.0**

2024-05-13

- Add `last_access` field in `GET /sub_accounts/{user_id}/keys` response
- Add `contract` field in `GET /futures/{settle}/risk_limit_tiers` response

**v4.71.0**

2024-04-23

- Add `page` parameter in `GET /wallet/saved_address` endpoint
- New feature: add `GET /api/v4/rebate/user/info` endpoint, retrieve user rebate
  information
- New feature: add `POST /unified/portfolio_calculator` endpoint, portfolio
  margin calculator
- New feature: add `GET /unified/risk_units` endpoint, retrieve user risk unit
- New feature: add `PUT /unified/unified_mode` endpoint, set unified account
  mode
- New feature: add `GET /unified/unified_mode` endpoint, retrieve unified
  account mode

**v4.70.0**

2024-04-08

- Add `pnl_pnl`、`pnl_fund`、`pnl_fee` field in
  `GET /futures/{settle}/positions` response
- Add `pnl_pnl`、`pnl_fund`、`pnl_fee` field in
  `GET /futures/{settle}/position_close` response

**v4.69.0**

2024-03-25

- Add `text` field in `POST /delivery/{settle}/price_orders` response

**v4.68.0**

2024-03-18

- New feature: add `GET /unified/currency_discount_tiers` endpoint, list
  currency discount tiers
- Add `type` parameter in `GET /unified/loans` endpoint
- Add `type` parameter in `GET /unified/interest_records` endpoint

**v4.67.0**

2024-03-11

- Add `filled_amount` field in `POST /spot/orders`,`POST /spot/batch_orders`
  response
- In frequency limit rule for the wallet withdrawal interface, the speed limit
  description has been corrected from `10r/10s` to `1r/3s`(No modification to
  the original rate limiting behavior)

**v4.66.1**

2024-02-19

- New feature: add `GET /wallet/small_balance` endpoint, list small balance.
- New feature: add `GET /wallet/small_balance_history` endpoint, list small
  balance history.
- New feature: add `GET /unified/estimate_rate` endpoint, get unified estimate
  rate.

**v4.65.0**

2024-01-29

- Add `debit_fee` field in `GET /spot/batch_fee` response
- Add `user_id` parameter in `DELETE /account/stp_groups/{stp_id}/users`
  endpoint
- Spot API introduces asynchronous support modes for create orders: `ACK`,
  `RESULT`, `FULL`. For details, please refer to [SPOT API](#create-an-order)

**v4.64.0**

2024-01-22

- Add `order_type` parameter in `GET /loan/multi_collateral/orders` endpoint
- Add
  `order_type`,`fixed_type`,`fixed_rate`,`expire_time`,`auto_renew`,`auto_repay`
  field in `GET /loan/multi_collateral/orders` response
- Add `before_ltv`,`after_ltv` field in `GET /loan/multi_collateral/repay`
  response
- New feature: add `GET /loan/multi_collateral/fixed_rate` endpoint, query
  multi-collateral fix rate.
- Add `unrealised_pnl`,`borrowed` field in `GET /wallet/total_balance` response

**v4.63.0**

2024-01-15

- Add `decimal` field in `GET /wallet/currency_chains` response
- New feature: add `GET /futures/{settle}/risk_limit_tiers` endpoint, list risk
  limit tiers.

**v4.62.0**

2024-01-02

- New feature: add `POST /futures/{settle}/batch_cancel_orders` endpoint, users
  have the ability to batch cancel orders.
- New feature: add multi-collateral-loan api. (`/loan/multi_collateral/**`)

**v4.61.0**

2023-12-18

- New features: The broker obtains the user's commission rebate records in
  `GET /rebate/broker/commission_history` and
  `GET /rebate/broker/commission_history` endpoints

**v4.60.0**

2023-12-01

- Breaking change: New [Unified API](#unified-account) is online. The old
  `/portfoli/*` endpoints are deprecated.
- New features: add earn product api. (`/earn/**`)
- Add `trade_id` field in `GET /futures/{settle}/account_book` response

**v4.59.0**

2023-11-22

- Add `funding_cap_ratio` field in `GET /futures/{settle}/contracts` response
- Add `contract` field in `GET /delivery/{settle}/account_book` response
- Add `withdraw_percent_on_chains` field in `GET /wallet/withdraw_status`
  response
- Add `leverage` field in `GET /portfolio/accounts` response

**v4.58.0**

2023-11-03

- Add `loanable` field in `GET /margin/cross/currencies` response
- Add `biz_info` field in `GET /futures/{settle}/orders/{order_id}` response
- Add `tier` field in `GET /account/detail` response
- Add `max_base_amount`、`max_quote_amount` field in `GET /spot/currency_pairs`
  response

**v4.57.0**

2023-10-20

- New feature: API Gateway inbound & outbound time, For more details, please
  refer to the [API Gateway in/out time](#api-gateway-in-out-time)
- New feature: support portfolio account in `POST /spot/orders` endpoint
- New feature: add `PUT /earn/uni/interest_reinvest` endpoint, users have the
  option to enable or disable interest reinvestment.
- New feature: add `POST /spot/amend_batch_orders` endpoint, users have the
  ability to batch modify orders.
- Add `sequence_id` field in `GET /spot/trades` response
- Add `text` field in `GET /spot/account_book` response
- Add `text` field in `GET /spot/my_trades` response
- `GET /portfolio/spot/orders`、
  `GET /portfolio/spot/orders`、`GET /portfolio/spot/orders/{order_id}`、`DELETE /portfolio/spot/orders/{order_id}`
  and `PATCH /portfolio/spot/orders/{order_id}` have been deprecated. We will
  remove the endpoints by the end of October 2023. Please use `/spot/orders`
  instead.

**v4.56.0**

2023-09-25

- Add `repayment_type` field in `GET /margin/cross/repayments` and
  `GET /portfolio/loan_records` endpoints.
- Add request parameter `holding` in `GET /futures/{settle}/positions` endpoint
- Add request parameter `role` in `GET /futures/{settle}/my_trades_timerange`
  endpoint
- Add request parameter `side` and `pnl` in
  `GET /futures/{settle}/position_close` endpoint

**v4.55.0**

2023-09-12

- Add new `POST /portfolio/account_mode` endpoint, allow to change the mode.

**v4.54.0**

2023-08-28

- Add `contract_address` field in `GET /wallet/currency_chains` endpoint.
- Add `GET /portfolio/spot/currency_pairs` and
  `GET /portfolio/spot/currency_pairs/{currency_pair}` endpoints, list portfolio
  spot's currency pairs.

**v4.53.0**

2023-08-14

- New feature: delete user in STP group in
  `DELETE /account/stp_groups/{stp_id}/users` endpoint

**v4.52.0**

2023-08-07

- New feature: add collateral loan api

**v4.51.0**

2023-07-29

- Adjusted and optimized the [account book types](#accountbook-type)
- Add `mode` field in `GET /account/detail` edpoint.

**v4.50.0**

2023-07-14

- New feature: New [Portfolio API](#portfolio-account). Currently, these
  services are only available to whitelisted users. If you are interested in
  accessing these APIs, please contact our institutional department for further
  information.
- Add new endpoint `GET /flash_swap/currency_pairs`, list all flash swap
  currency pair

**v4.49.0**

2023-07-03

- Add new [frequency limit rule](#frequency-limit-rule)，the new rule is
  expected to take effect on 2023-07-10 (UTC+8)
- In the `GET /futures/{settle}/orders` API endpoint, the request field
  `contract` has been modified to be optional instead of mandatory.

**v4.48.0**

2023-06-16

- Add `client_order_id` fields in `GET /wallet/sub_account_transfers` edpoint.

**v4.47.0**

2023-05-23

- New feature: add STP group admin api
- New feature: query estimated interest rates of margin and cross margin in
  `GET /margin/uni/estimate_rate` and `GET /margin/cross/estimate_rate`
  endpoints.
- New feature: list futures order by time range in
  `GET /futures/{settle}/orders_timerange` endpoint
- Add
  `underlying`、`underlying_price`、`mark_iv`、`delta`、`gamma`、`vega`、`theta`
  fields in `GET /options/positions/{contract}` endpoint.

**v4.46.0**

2023-05-08

- New feature: query spot account book in `GET /spot/account_book` endpoint
- New feature: query user futures trading fee in `GET /futures/{settle}/fee`
  endpoint
- Add `is_internal` field in `GET /futures/{settle}/trades` endpoint

**v4.45.0**

2023-04-21

- The margin loan has been migrated to the `Lend & Earn`. For more information,
  please refer to the
  [Margin Migration Instructions](#margin-migration-instructions)
- New feature: Get interest records for the cross margin account in
  `GET /margin/cross/interest_records` endpoint.
- New feature: Add `Self-Trade Prevention` feature in the
  `POST /futures/{settle}/batch_orders` endpoint.
- Add `futures_in`、`futures_out` two fields in `GET /margin/cross/account_book`
  endpoint.

**v4.44.0**

2023-04-07

- Add `ORDER_BOOK_NOT_FOUND` and `FAILED_RETRIEVE_ASSETS` error messages.

**v4.43.0**

2023-03-27

- New feature: Add `Self-Trade Prevention` feature in the `POST /spot/orders`
  endpoint. Fore more detail, please refer to
  [STP overview](#self-trade-prevention-stp)
- New feature: Get API key's ip whitelist in `GET /account/detail` endpoint.
- Add `amend_text` in `PATCH /spot/orders/{order_id}` endpoint.
- Add `lowest_ask` and `highest_bid` fields in `GET /futures/{settle}/tickers`
  endpoint

**v4.42.0**

2023-03-13

- New feature: add `Lend & Earn` API
- New feature: Add `Self-Trade Prevention` feature in the
  `POST /futures/{settle}/orders` endpoint. Fore more detail, please refer to
  [STP overview](#self-trade-prevention-stp)
- Add `delivery` account type in `POST /wallet/sub_account_transfers` endpoint
- Add `amend_text` field in `PUT /futures/{settle}/orders/{order_id}` endpoint

**v4.41.0**

2023-03-03

Add `negative_liab`, `futures_pos_liab`, `equity`, `total_freeze`, `total_liab`,
`portfolio_margin_total_liab`, `portfolio_margin_total_equity` fields in
`GET /margin/cross/accounts` endpoint

**v4.40.0**

2023-02-24

- New feature: List Auto-Deleveraging history endpoint
  `Get /futures/{settle}/auto_deleverages`
- Add `sum` field in `GET /futures/{settle}/candlesticks` endpoint

**v4.39.0**

2023-02-09

- New feature: Query a batch of user trading fee rate endpoint
  `GET /spot/batch_fee`
- Add `enable_bonus`、`enable_credit` fields in
  `GET /futures/{settle}/contracts` endpoint

**v4.38.0**

2023-02-04

- New feature: time range query for my futures trade endpoint
  `GET /futures/{settle}/my_trades_timerange`
- Add `withdraw_order_id` field in `POST /withdrawals` endpoint

**v4.37.0**

2023-01-20

- Add new rebate API endpoints.

**v4.36.0**

2022-12-23

- Hiding all amount is not supported any more when using `iceberg` in
  `POST /spot/orders` and `POST /spot/batch_orders` endpoints

**v4.35.0**

2022-12-09

- New feature: amend order endpoint `/spot/orders/{order_id}`
- Add `avg_deal_price` field in `GET /spot/orders` response
- Add `portfolio_margin_total` field in \`\`GET /margin/cross/accounts\`
  response
- Support market order in `POST /spot/batch_orders` endpoint

**v4.34.0**

2022-11-25

- Support market order in `POST /spot/orders` endpoint

**v4.33.0**

2022-11-11

- New feature: Futures Premium Index endpoint
  `GET /futures/{settle}/premium_index`
- Allow to specify password and email when creating a sub-account.

**v4.32.0**

2022-10-28

- Improve options api document

**v4.31.0**

2022-10-14

- Allow to transfer futures and cross_margin funds between two sub-accounts in
  `POST /wallet/sub_account_to_sub_account` endpoint

**v4.30.0**

2022-09-23

- New feature: manage sub-accounts API Key
- New feature: lock and unlock sub-account endpoint
- Allow to transfer between two sub-accounts in
  `POST /wallet/sub_account_to_sub_account` endpoint

**v4.29.0**

2022-09-09

- New feature: create and list sub-accounts
- Add `settle` parameter in `GET /wallet/fee` endpoint
- Add `refr` field in option order
- The maximum number of API Keys changes to 20

**v4.28.0**

2022-08-12

- Add `offset` parameter in `GET /futures/{settle}/trades`
- new countdown cancel orders endpoint for spot and futures.

**v4.27.0**

2022-07-29

- Add `basis_rate`、`basis_value` fields in `GET /delivery/{settle}/tickers`
  response
- Add `X-Client-Request-Id` http header for tracking request
- new create a batch of futures order endpoint
  `POST /futures/{settle}/batch_orders`
- new `FOK` tif type for futures order

**v4.26.0**

2022-07-15

- Spot Price-Trigger order supports portfolio margin account
- Add `GET /wallet/saved_address` to list saved address
- `POST /wallet/transfers` returns `tx_id` field
- Add `GET /wallet/sub_account_cross_margin_balances` to query subaccount's
  `cross_margin` account
- Add `status` field in `GET /margin/currency_pairs` response

**v4.25.1**

2022-07-06

- New `GET /spot/time` endpoint which get system's time info.
- New `GET /options/my_settlements` endpoint which list my selttlements.
- Add `change_utc0`, `change_utc8` fields in `GET /spot/tickers` endpoint

**v4.25.0**

2022-06-24

- Support portfolio margin account API
- Cross-margin add more fields. Please refer to endpoint document for more
  details.
- Add `status` field in `GET /margin/cross/currencies` endpoint, determine
  whether the cross currency is disabled `0`\-disable `1`\-enable
- New `POST /spot/cross_liquidate_orders` spot trading endpoint that close
  position when the cross-currency is disabled
- Add `bouns` and `history` fields in `GET /futures/{settle}/accounts` endpoint
- Add `text`、`fee` and `point_fee` fields in `GET /futures/{settle}/my_trades`
  endpoint
- Fix typo for `cancel a price-triggered order` endpoints
- `POST /wallet/sub_account_transfers` supports transferring to `cross_margin`

**v4.24.0**

2022-05-20

- Support flash swap operations with new API group `/flash_swap`. Spot operation
  permission is required.
- New wallet APIs `GET /wallet/sub_account_margin_balances` and
  `GET /wallet/sub_account_futures_balances` to help main account retrieving sub
  accounts' margin and perpetual contract balances
- New perpetual contract API `GET /futures/{settle}/index_constituents/{index}`
  to retrieve index price constituents
- Fix missing fields like `order_type` in `FuturesPriceTriggeredOrder`

**v4.23.4**

2022-04-25

- Add `PUT /futures/{settle}/orders/{order_id}` to amend perpetual futures
  orders
- Spot candlesticks supports `30d` interval

**v4.23.3**

2022-04-01

1.  Spot candlestick API returns base currency amount
2.  Spot currency detail add `chain` field.
3.  Add withdrawal and deposit status in `GET /wallet/currency_chains` response
4.  Add missing `cross_leverage_limit` in perpetual contract's dual mode
    position leverage update API
5.  Support more intervals in perpetual and delivery contract candlesticks

**v4.23.2**

2022-01-21

1.  Add `fee` in withdrawal and deposit history
2.  Add fix fee rate in spot `Currency`

**v4.23.1**

2021-12-23

1.  Spot orders support new `time_in_force` `FOK`
2.  New `FOK_NOT_FILL` error label

**v4.23.0**

2021-12-09

1.  Add options API
2.  Add detailed rate limiting rules
3.  Add `GET /wallet/currency_chains` to retrieve chains supported by currency
4.  Add additional status for deposit and withdrawal history

**v4.22.4**

2021-11-01

1.  Data type of `ctime` and `ftime` in `SpotPriceTriggeredOrder` should be
    `int64`

**v4.22.3**

2021-10-27

1.  `GET /spot/trades` supports time range based query using `from` and `to`.

**v4.22.2**

2021-09-29

1.  Add more status in withdrawal or deposit record model
2.  Add new write only field `auto_size` in `FuturesOrder` to support closing
    dual mode position.

**v4.22.1**

2021-09-07

1.  New wallet API `GET /wallet/total_balance` to retrieve all user's estimate
    balance.
2.  Add `locked` and `risk` in margin account response
3.  Margin and cross margin loans support custom text input.

**v4.22.0**

2021-08-13

1.  Delivery contract API supports BTC settled
2.  Spot API `GET /spot/orders` and `GET /spot/my_trades` supports query by time
    range
3.  Add margin and cross margin max borrowable API
4.  Multiple document enhancements.

**v4.21.6**

2021-08-12

1.  Fix incorrect address field name in `GET /wallet/deposit_address`

**v4.21.5**

2021-06-30

- `GET /spot/orders`, `GET /spot/orders/{order_id}` and `GET /spot/my_trades`
  allow empty `currency_pair` if operated against finished orders
- Add fixed withdrawal fee on multiple chains in `GET /wallet/withdraw_status`
  response
- Add `GET /margin/transferable` and `GET /margin/cross/transferable` to
  retrieve maximum transferable amount from margin and cross margin account
- Add `from` and `to` parameter to specify time range for futures position
  closes history API

**v4.21.4**

2021-06-23

- Add cross margin account change history API `GET /margin/cross/account_book`
- Add millisecond timestamp in `GET /margin/account_book` response

**v4.21.3**

2021-06-17

- Add order book timestamp for both spot and futures trading

**v4.21.2**

2021-06-07

- Futures API support cross margin leverage modification
- Add new spot cross margin API `/margin/cross`
- Add spot order operations using spot cross margin account
- Add unpaid interests in spot margin account query
- Add new millisecond fields `create_time_ms` and `update_time_ms` in spot
  orders.
- Add `DELETE /withdrawals/{withdrawal_id}` to cancel withdrawal operation

**v4.20.1**

2021-04-14

- Update document links

**v4.20.0**

2021-03-25

- Support spot auto orders with API group `/spot/price_orders`

**v4.19.6**

2021-03-22

- Add trading timestamp in spot currency pair

**v4.19.5**

2021-03-18

- Spot and Futures operations based on order ID also accept user custom ID(but
  only for 30 minutes since creation)

**v4.19.4**

2021-03-10

- `/wallet/sub_account_transfers` supports transferals with sub user's perpetual
  contract account

**v4.19.3**

2021-03-04

- Add margin loans auto repay API `/margin/auto_repay`
- Add `multichain_address` in `/wallet/deposit_address` for currencies with
  multiple deposit addresses
- Optimize documentation

**v4.19.2**

2021-03-01

- Add `/wallet/fee` API to retrieve trading fee. Previous `/spot/fee` is
  deprecated in favour of this one.
- Add new field `chain` in withdrawal operation.
- Add new field `with_id` in `/futures/{settle}/order_book` API and `id` field
  in its response
- Add new `offset` in API `/futures/{settle}/position_close` to retrieve
  position close history with pagination.
- Add contract value calculation. Refer to `Contract` model for details.
- Fix incorrect field type in futures stats API

**v4.18.4**

2021-01-22

- Add field `create_time_ms` in spot `Trade` model
- ETF currency pairs' ticker add net value related info

**v4.18.1**

2021-01-07

- Add iceberg order support for spot orders
- Fix incorrect field types in `/futures/{settle}/contract_stats`

**v4.18.0**

2020-12-21

- Add new spot API`/spot/currencies` and `/spot/currencies/{currency}` to
  retrieve currency info
- Add more fields, e.g., `top_lsr_account`, `top_lsr_size`, in futures
  `ContractStat` model.

**v4.17.1**

2020-12-16

- Increase maximum of `limit` in `/spot/order_book` to 100

**v4.17.0**

2020-12-15

- Add `/wallet/sub_account_balances` to retrieve sub accounts' balances.

**v4.16.1**

2020-12-10

- Fix mistaken field name `dual_mode` in futures position model which should be
  `mode` instead.

**v4.16.0**

2020-12-09

_Spot_

- Increase order number limit each currency pair to 10 in
  `POST /spot/batch_orders`
- Add new query parameter `reverse` in `GET /spot/trades` to trace back trading
  history

_Futures_

- Add perpetual contract dual mode position support. Use
  `/futures/{settle}/dual_mode` to set position's dual mode. For dual mode
  position operations, refer to `/futures/{settle}/dual_comp/positions` API
  group
- Add perpetual contract new field `in_dual_mode` in futures account response
  model; `dual_mode` in position response model.
- Add new perpetual contract public API `/futures/{settle}/liq_orders` to query
  liquidated orders in markets

**v4.15.5**

2020-11-04

- Add `/futures/{settle}/contract_stats` API to retrieve contract stats
- Add `/margin/{currency_pair}` to retrieve single margin currency pair detail

**v4.15.4**

2020-09-01

- Add `point_type` in `GET /spot/fee` response
- Add `GET /wallet/withdraw_status` API
- Add C# SDK entry

**v4.15.2**

2020-08-12

- Add `GET /spot/fee` to retrieve spot order trading fee rates

**v4.15.1**

2020-08-04

- Add `GET /spot/open_orders` to retrieve all open orders in spot trading
- Add `GET /margin/account_book` to retrieve margin account balance history

**v4.14.1**

2020-07-08

- maximum length of `text` field in order extends to 28(prefix excluded)

**v4.14.0**

2020-07-06

- New Delivery contract APIs `/delivery`

**v4.13.1**

2020-06-28

- Add `GET /wallet/sub_account_transfers` to list sub account transfer records

**v4.13.0**

2020-05-20

- APIv4 now supports withdraw API. Refer to `POST /withdrawals` and
  "Authentication" section for details.
- `POST /wallet/transfers` supports transferring between spot and futures
  account
- Wallet API supports retrieving deposits and withdrawals history
- Futures orders and personal trades retrieving now supports `offset` field
- Futures `Contract` model add new field `in_delisting`

**v4.12.0**

2020-04-08

- APIv4 Key management improved. Keys are no longer separated with different
  trading types. Every key can now have multiple operation permissions. Refer to
  _"About APIv4 key improvement"_ for details.
- Add `POST /wallet/sub_account_transfers` to support transferring between main
  and sub account
- `GET /spot/candlesticks` adds query parameters `from` and `to` to support
  retrieving history data points

**v4.11.2**

2020-03-29

- Add `filled_total` in `Order` to replace `fill_price` (the latter is badly
  named)
- Add new error label `POC_FILL_IMMEDIATELY`

**v4.11.1**

2020-03-23

- Add `role` in `GET /spot/my_trades` response
- Fix missing currency account in `GET /margin/funding_accounts`

**v4.11.0**

2020-03-20

- Spot order supports GT fee discount
- Spot order time in force supports `poc`

**v4.10.1**

2020-02-24

- Add `trade_status` in spot currency pair

**v4.10.0**

2020-02-17

- Margin order creation adds new field `auto_borrow`(write only) to borrow the
  insufficient part by the system if balance is not enough
- Add new API `POST /spot/cancel_batch_orders` to support batch cancellation
  with specified order IDs
- Add new document section "Error handling" and "Which one to choose, APIv4 or
  APIv2?"

**v4.9.1**

2020-01-07

- Add fee and recent modification time in `Order` and `BatchOrder`
- Add fee in `GET /spot/my_trades` response

**v4.9.0**

2019-12-17

- `last_id` in `GET /futures/{settle}/trades` is deprecated. Use `from` and `to`
  to retrieve trading history

**v4.8.2**

2019-12-02

- Add `/spot/batch_orders` to support creating a bundle of spot or margin orders
- Fee rate of margin loan repayment enjoys VIP discount
- `Loan` add new fields `fee_rate`(fee rate of lending loan) and
  `orig_id`(original loan ID if loan is auto renewed)

**v4.8.1**

2019-11-27

- Fix missing `settle` in `GET /futures/{settle}/positions` docs and code
  snippet

**v4.8.0**

2019-11-07

- Futures API now supports settling in USDT.
- Change `/futures` to `/futures/{settle}` in ALL futures API to support futures
  operations in different settle currency.
- `currency` field in `/futures/{settle}/accounts` response adds new value:
  `USDT`
- Add `volume_24h_base`, `volume_24h_quote` and `volume_24h_settle` in
  `/futures/{setttle}/tickers` response to replace `volume_24h_btc` and
  `volume_24h_usd`. The latter two are still preserved for compatibility usage,
  but are NOT recommended for any futures operations.

To use USDT futures, just replace `/futures` with `/futures/usdt`, e.g. use
`GET /futures/usdt/accounts` to retrieve futures accounts settled in USDT, while
`GET /futures/btc/accounts` returns accounts in BTC.

For compatibility, `GET /futures/xxx` defaults to `GET /futures/btc/xxx`, e.g.
`GET /futures/accounts` will be treated as `GET /futures/btc/accounts`

**v4.7.3**

2019-07-18

- Add `text` in `/spot/orders` and `/futures/orders` to support user defined
  order information

**v4.6.3**

2019-06-11

- Add point information in Futures account and position

**v4.7.2**

2019-05-29

- Change `rate` in `Loan` as non-required for lending side.

**v4.7.1**

2019-04-17

- Add wallet v4 API. Support transfers between spot and margin account for now.
- `GET /margin/loans` can sort by `rate` and support an optional parameter
  `currency_pair`
- Fix miscellaneous document issues

**v4.6.2**

2019-04-24

- Fix price-triggered futures order's docs incorrect override docs for
  `GET /futures/orders/{order_id}` and `DELETE /futures/orders/{order_id}`

**v4.6.1**

2019-04-02

- Add `high_24h`, `low_24h` and `funding_rate_indicative` in futures ticker

**v4.6.0**

2019-03-21

_SDK related only_

- Rename futures order related function name in SDKs to avoid duplication with
  spot order API in Go
- Fix query parameter not decoded while generating authentication signature

**v4.5.2**

2019-03-14

- `currency_pair` in `/spot/order_book` should be a required parameter
- Optimize document code samples

**v4.5.1**

2019-03-11

- Fix missing URL parameter description

**v4.5.0**

2019-03-05

To avoid version confusion, all versions in APIv4 (documents and SDKs are both
included) will start with `4` from now on

- Add Spot v4 API to provide improved API capability
- Add Margin v4 API to provide support for margin loans and trading
- Add Futures price triggered auto order API support. Refer to
  `/futures/price_orders` for details
- Base URL of all Gate API v4 real trading changed to
  `https://api.gateio.ws/api/v4`

**v1.3.0**

2019-02-13

_Important update_

- Domain of base URLs are changed to `fx-api.gateio.ws` and
  `fx-api-testnet.gateio.ws` respectively, `*.gateio.io` is deprecated and will
  soon be out of service.

**v1.2.1**

2019-02-13

- Add `volumn_24h_usd` and `volume_24h_btc` in `GET /futures/tickers` response

**v1.2.0**

2019-01-17

- Add `GET /futures/contracts/{contract}` to get one single contract
- Add `GET /futures/positions/{contract}` to get one single position
- Add `GET /futures/account_book` to retrieve user account balance history
- Add `config_change_time` in `Contract` model
- fix miscellaneous document issues

**v1.1.0**

2019-01-08

- Add more fields to `Contract`, `Position`, `FuturesOrder`
- Add API `GET /futures/position_close` to retrieve position close history
- Add optional `order_id` support for API `GET /futures/my_trades`
- Change the status code of `DELETE /futures/orders` and
  `DELETE /futures/orders/{order_id}` from 204 to 200, with cancelled order
  details returned on success.
- Request `DELETE /futures/orders/{order_id}` with invalid order ID or order
  that has been finished will return 404 instead of ignoring the error
- `POST /futures/orders` now supports POC, iceberg

**v1.0.0**

2018-12-30

- Initial release

# [#](#general) General

## [#](#matching-mechanism) Matching mechanism

### [#](#matching-priority) Matching priority

Gate.io Order matching follows Price Priority > Time priority principle.

Suppose that the order book is as follows：

If the current price of 10:02 pays 102, the final transaction order is: A, C, B

### [#](#order-life-cycle) Order life cycle

A valid order sent to the matching engine is immediately confirmed and executed
with existing orders, with the executing result sent back to the client.

If an order is fully executed, then it is closed. If any part of the order is
not executed immediately, orders with TimeInForce set to `IOC` will be
cancelled, while others will be appended to the price list, waiting for
subsequent filling or being cancelled.

## [#](#data-center) Data Center

Gate.io data center is located in AWS Japan's ap-northeast-1 region.

## [#](#api-overview) API Overview

## [#](#margin-migration-instructions) Margin Migration Instructions

Between 14:00 (UTC+8) on April 13, 2023 and 14:00 (UTC+8) on April 23, 2023, the
platform will gradually migrate the assets that have not been borrowed in the
lending market to the `Lend & Earn` through an automated system process. At the
same time, assets that have already been borrowed will be cancelled for
automatic lending. After the migration is complete, you can check your
investment details in the `Lend & Earn`. During this period, borrowing funds
through the lending market will be temporarily suspended. You can also manually
transfer your assets from the lending market to the `Lend & Earn` to obtain
investment returns in advance.

After the automatic migration, the old version of the borrowing and lending
endpoint will be deprecated, and the new version of the endpoint can be found in
the /margin/uni endpoint group. For detailed endpoint migration, please refer to
the following table:"

Margin account related endpoints：

The margin lending and borrowing related APIs have been migrated to the
`/margin/uni` API group：

The earn related APIs have been migrated to the `/earn/uni` API group):

# [#](#api) API

## [#](#http-convention) HTTP convention

- All read endpoints use `GET` method. They accept only request parameters. No
  request body will be read.
- `DELETE` methods remove resources(like orders), but not all removing operation
  using `DELETE`, as `DELETE`s don't read request body either. For complex
  removing operations, `POST` method is used with parameters filled in request
  body.
- Updating is done using `POST`, `PUT` or `PATCH` method. Their parameters are
  either in body or request parameters for different endpoints. Refer to
  endpoint detail for how to send the request.
- All endpoints return HTTP status code `2xx` on success. `401` is returned on
  authentication failure. Other `4xx` codes mean the request is malformed. `5xx`
  means the server encounter some critical error on processing the request.
  Commit issues if `5xx` is met.

## [#](#time) Time

All time related fields are unix timestamp in **seconds** if no extra note, but
they may differ in formats(int64, number or string). Possible values like the
following may be returned:

- 1596531048
- "1596531048"
- 1596531048.285
- "1596531048.285"

The best way to handle time fields is parsing them as a number with decimal
places. If higher precision is not needed, you can safely cast them to
integer(or long). Our SDKs listed above has already taken proper deserialization
to handle them

## [#](#api-gateway-in-out-time) API Gateway in/out time

In every API request, the response header will always include the following
fields:

- `X-In-Time`: The timestamp when the API gateway receives a request, in Unix
  timestamp format, measured in microseconds.
- `X-Out-Time`: The timestamp when the API gateway returns a response, in Unix
  timestamp format, measured in microseconds.

For example:

```text
X-In-Time: 1695715091540163
X-Out-Time: 1695715091551905
```

## [#](#pagination) Pagination

Pagination is achieved using one of the following method

- `page-limit`
- `limit-offset`

In both method, `limit` limits the maximum number of records returned in one
request. If no additional explanation, it defaults to `100` if not provided and
its maximum value is limited to `1000`.

`page` starts from `1`, mimicking common paging used in web pages. To iterate
the whole list, use the same `limit` and increment `page` by `1` until the
records' length is shorter than the `limit`

`offset` starts from `0`, behaving like common DB search. To iterate the whole
list, increment `offset` by `limit` until the records' length is shorter than
the `limit`.

For example, if the total number of orders is 201. Using page-limit method, send
request parameters like the following:

1.  `page=1&limit=100`
2.  `page=2&limit=100`
3.  `page=3&limit=100`

Using limit-offset method, send request parameters like:

1.  `limit=100&offset=0`
2.  `limit=100&offset=100`
3.  `limit=100&offset=200`

Some endpoints may return additional pagination metadata. If present, they are
sent back through the response header. Take `GET /futures/{settle}/orders` as an
example, following headers will be returned

- `X-Pagination-Limit`: request limit
- `X-Pagination-Offset`: request offset
- `X-Pagination-Total`: total record number satisfying the request

## [#](#frequency-limit-rule) Frequency limit rule

> The rate limit is counted against each sub-account or main account.

**Rate Limit**

Each request to the API response header will contain the following fields:：

- X-Gate-RateLimit-Requests-Remain - your remaining requests for current
  endpoint
- X-Gate-RateLimit-Limit - your current limit for current endpoint
- X-Gate-RateLimit-Reset-Timestamp - the timestamp indicating when your request
  limit resets if you have exceeded your rate_limit. Otherwise, this is just the
  current timestamp (it may not exactly match timeNow).

WebSocket:

- Spot: Bulk order/single order/single order modification, a total of 10
  requests per second (10r/s).
- Futures: Bulk order/single order/single order modification/single order
  cancellation/bulk cancellation, a total of 100 requests per second (100r/s).
- Others: No limit.

## [#](#rate-limit-based-on-fill-ratio) Rate Limit Based On Fill Ratio

In order to enhance trading efficiency, we have decided to implement more
favorable sub-account rate limits for clients with a higher fill ratio. This
assessment will be based on trading data from the past seven days and will be
calculated daily at 00:00 UTC. Please note that this rule applies only to
clients at **VIP level 14 and above**.

### [#](#_1-introduction-of-terminology) 1. Introduction of Terminology

#### [#](#_1-1-symbol-multiplier) 1.1 Symbol Multiplier

To facilitate a more refined management of the impact of different trading
products on the fill ratio, we have introduced the concept of the symbol
multiplier. This multiplier allows us to adjust the influence of each product on
the overall trading volume based on its characteristics. For products with a
multiplier of less than 1, they typically involve smaller contract sizes and
therefore require more trading orders to achieve the same trading volume.
Generally, all trading products come with a default multiplier; however, certain
products are assigned independent multipliers based on their specific
characteristics. For detailed information regarding the multipliers of relevant
products, please refer to the provided table.

> Please note: The spot trading rate limits will not be launched this time.

#### [#](#_1-2-definition-of-trading-volume-weight) 1.2 Definition of Trading Volume Weight

We will assess the behavior patterns of makers and takers based on market
fluctuations and design the trading volume weight ratios accordingly.
Additionally, we will regularly evaluate these weights and make synchronized
adjustments when necessary.

**Current weight of the maker trading volume: 100%, current weight of the taker
trading volume: 90%.**

#### [#](#_1-3-calculation-formula) 1.3 Calculation Formula

The system will take a snapshot of the data at 00:00 UTC daily and, based on
this information, will select the higher value between the fill ratio of the
sub-account and the overall fill ratio of the main account to determine the
future trading rate limit for the sub-account. For exchange brokers, the system
will only consider the fill ratio of their sub-accounts. It is important to note
that the main account is also considered a "sub-account."

1.  Sub-account Fill Ratio: This ratio is calculated as follows: (Sub-account
    Taker's USDT trading volume × 0.9 + Maker's USDT trading volume × 1) / (The
    sum of (Number of new and modified requests for each contract × symbol
    multipliers) for each subaccount).
2.  Main-account Aggregated Fill Ratio: This ratio is calculated as follows:
    (main account's Taker USDT trading volume × 0.9 + Maker USDT trading volume
    × 1) / (The sum of (Number of new and modified requests for each contract ×
    symbol multipliers) for all subaccounts).

### [#](#_2-future-rate-limit-rule) 2. Future Rate Limit Rule

> > Please stay tuned for the rate limits for spot trading.

### [#](#_3-detailed-rules-for-fill-ratio) 3. Detailed Rules for Fill Ratio

1.  Target Client Group: VIP ≥ 14
2.  Calculation Period: 7 days
3.  Update Time: Daily at 08:00 (UTC). The system will update the fill ratio
    data based on the data from 00:00 UTC.
    1.  If the fill ratio and the pre-set rate limit improve, the increase will
        take effect immediately at 08:00 (UTC).
    2.  However, if the fill ratio declines, the rate limit will be reduced
        immediately.
    3.  If a client's VIP level drops below VIP 14, their rate limit will be
        lowered to the minimum tier, taking effect immediately.
    4.  If a client's VIP level rises above VIP 14, their rate limit will be
        adjusted immediately based on their current level.
    5.  If a sub-account's trading volume over the past 7 days is below
        1,000,000 USDT, the rate limit will be implemented based on the
        main-account aggregated fill ratio.
    6.  For newly created sub-accounts, the minimum tier rate limit will be
        applied at the time of creation, and the aforementioned rate limit rules
        will begin to apply at T+1 08:00 (UTC).
    7.  Both WebSocket and REST APIs are subject to these rules.

### [#](#_4-example) 4. Example

Assuming the client has three accounts, with the symbol multipliers for trading
perpetual contract products BTC-USDT and SOL-USDT being 1 and 0.4, respectively.

1.  Account A (Main Account):
    - BTC-USDT perpetual futures Maker trading volume: 100 USDT, number of order
      requests: 10; Perpetual futures Taker trading volume: 200 USDT, number of
      order requests: 20.
    - SOL-USDT perpetual futures Maker trading volume: 20 USDT, number of order
      requests: 15; Perpetual futures Taker trading volume: 20 USDT, number of
      order requests: 20.
    - Sub-account Fill Ratio = ((100 + 20) \* 1 + (200 + 20) \* 0.9) /
      ((10 + 20) \* 1 + (15 + 20) \* 0.4) = 7.23
2.  Account B (Sub-account):
    - BTC-USDT perpetual futures Maker trading volume: 200 USDT, number of order
      requests: 20; Perpetual futures Taker trading volume: 200 USDT, number of
      order requests: 30.
    - SOL-USDT perpetual futures Maker trading volume: 20 USDT, number of order
      requests: 5; Perpetual futures Taker trading volume: 30 USDT, number of
      order requests: 5.
    - Sub-account Fill Ratio = ((200 + 20) \* 1 + (200 + 30) \* 0.9) /
      ((20 + 30) \* 1 + (5 + 5) \* 0.4) = 7.91
3.  Account C (Sub-account):
    - BTC-USDT perpetual futures Maker trading volume: 50 USDT, number of order
      requests: 5; Perpetual futures Taker trading volume: 60 USDT, number of
      order requests: 8.
    - SOL-USDT perpetual futures Maker trading volume: 100 USDT, number of order
      requests: 20; Perpetual futures Taker trading volume: 120 USDT, number of
      order requests: 25.
    - Sub-account Fill Ratio = ((50 + 100) \* 1 + (60 + 120) \* 0.9) /
      ((5 + 8) \* 1 + (20 + 25) \* 0.4) = 10.06
4.  Main Account Aggregated Fill Ratio = ((100 + 20 + 200 + 20 + 50 + 100) \*
    1 + (200 + 20 + 200 + 30 + 60 + 120) \* 0.9) / ((10 + 20 + 20 + 30 +
    5 + 8) \* 1 + (15 + 20 + 5 + 5 + 20 + 25) \* 0.4) = 8.19
5.  Account Rate Limits:
    - Account A = max(7.23, 8.19) = 8.19 -> 250 r/s
    - Account B = max(7.91, 8.19) = 8.19 -> 250 r/s
    - Account C = max(10.06, 8.19) = 10.06 -> 300 r/s

### [#](#_5-remarks) 5. Remarks

1.  The release date for the rate limit of perpetual contracts based on fill
    ratio will be announced later. Please stay tuned.
2.  The existing abuse rate limit rules for perpetual contracts will still
    apply, namely:
    1.  Fill Ratio = USDT Training Amount / (Total Number of Order,
        Cancellation, and Modification Requests)
    2.  If the number of requests exceeds 86,400 within 24 hours, with no order
        fill in the same period. Then the order placement rate limit will be
        restricted to 10r/10s for the next hour.
    3.  If the number of requests exceeds 86,400 within 24 hours, with the fill
        ratio below 1%. Then the order placement rate limit will be restricted
        to 20r/10s for the next hour.
3.  Please stay tuned for the fill ratio rate limit for spot trading.

## [#](#return-format) Return Format

All API responses are in JSON format, and users need to transform and extract
data by themselves.

The HTTP status code 2XX will be returned when all operations are successful.
401 indicates that there is a problem with the certification. Other 4xx status
codes indicate that the request is invalid. If it is a 5xx error, the server has
encountered an unknown serious error when processing the request. Please give
feedback as soon as possible。

**Return Status**

## [#](#data-type) Data Type

## [#](#portfolio-margin-account) Portfolio Margin Account

TIP

The Portfolio Margin Account is no longer maintained, please refer to the new
version of the [Unified Account](#unified-account)

Since version `4.25.0`, we start supporting portfolio margin account. Gate.io's
Portfolio Margin Account is a new feature of Gate.io's trading system. Its main
function is to break the capital isolation between cross-margin leverage account
and USD cross-margin perpetual contract account inside a Classic Account and
achieve the multi-currency margin sharing among multi-product lines. Thanks to
the margin sharing, users don't need to transfer funds between the two accounts,
and the profit and loss of positions among different trading products can offset
each other and effectively improve the capital utilization rate. See more
details in the
[Help Center](/help/trade/leveraged/26421/introductions-to-gate.io-s-portfolio-margin-account)

Before using the portfolio margin account's API key, you should create the API
key on the API management page. The API key supports spot and perpetual
contracts trading only.

> If permissions of the API key can't be checked, ensure your cross-margin
> account has available balance first.

### [#](#transfer) Transfer

The classic account and portfolio margin account are two different capital
isolation accounts. If you want to achieve multi-currency margin sharing among
multi-product lines, use the portfolio margin account please.

The funds of the portfolio margin account come from the classic account. Due to
the change of funds in the classic account, the transfer of funds can only be
performed using the API Key of the classic account.

The portfolio margin account is upgraded based on the cross-margin account of
the original classic account, so the classic account only needs to transfer its
spot funds to the cross-margin account to deposit the portfolio margin account.
Similarly, withdrawals from portfolio margin account can be achieved by the
classic account performing transferals from the cross margin to its spot
account.

The API Key of the portfolio margin account can only perform transferals among
its own multiple accounts. Due to the sharing of margin, the portfolio margin
account does not need to transfer funds to its futures account (we also restrict
doing so). If the futures account has PNL funds that need to be withdrawn, it
must be transferred by the portfolio margin account's API key to its
cross-margin account first, so that the classic account can perform withdrawals
from portfolio margin account.

### [#](#spot-trading) Spot trading

The spot trading of the portfolio margin account is almost the same as the
classic account, except that `cross_margin` must be specified in the `account`
parameter when placing orders. For example, if you want to place a buy order for
the `BTC_USDT` currency pair, the order request will be similar to

```text
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "cross_margin",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint
directly.

TIP

It should be noted that the portfolio margin account is upgraded from the
classic account's cross-margin account. The API Key of the classic account
originally supports the operation of the cross-margin account. In order not to
affect the existing operations of the classic account, we still retain this
function of the classic account. So whether it is the API Key of the classic
account or the portfolio margin account, both can operate the same the cross
margin account (note that the futures accounts are separate)

### [#](#futures-trading) Futures trading

The API operation of the perpetual contract of the portfolio margin account is
exactly the same as that of the classic account, but currently only supports USD
settlement

TIP

In the futures trading, it should be noted that there is no compatibility for
cross-margin accounts like using the API Key of the classic account in spot
trading. Therefore, when using the API Key of the classic account for futures
trading, assets are kept under `classic account-futures`, and when using
portfolio margin account API Key for futures trading, assets are kept under
`portfolio margin account-futures`. These two are different futures accounts. In
addition, funds under `classic account-spot` cannot share margin with
`classic account-futures`.

## [#](#trace-id) Trace ID

The API response will carry the header: X-Gate-Trace-ID . This header is used
for tracking.

## [#](#self-trade-prevention-stp) Self-Trade Prevention (STP)

### [#](#concepts) Concepts

**Self-Trade Prevention**: STP will prevent any user's orders from being matched
with each other.

**CN**: Cancel new, Cancel new orders and keep old ones.

**CO**: Cancel old, Cancel old orders and keep new ones.

**CB**: Cancel both, Both old and new orders will be cancelled.

### [#](#stp-strategies) STP Strategies

We support three STP strategies, which are `CN` , `CO` and `CB`.

STP is achieved by adding users to one STP trading group. When a user in a STP
group place orders, and trading could happen with existing orders of users in
the same group, orders will be cancelled. The prevention strategy depends on the
`stp_act` parameter specified when placing the order as taker. If not specified,
the `CN` strategy will be used by default.

A user has to be added to a STP trading group before using STP. When a user does
not belong to any STP trading group, and place orders with the `stp_act`
parameter, the orders will be rejected.

### [#](#api-parameter-adjustment) API Parameter Adjustment

Take placing futures order as an example:

```text
POST /futures/{settle}/orders
```

New request body parameter:

New response fields:

### [#](#user-case) User case

There are multiple accounts under `Organization A`, and the IDs of several
accounts are `101`, `102`, and `103`

In order to prevent self-trading of orders placed by internal accounts of the
organization, the administrator created a STP trading group with group ID `100`,
and added accounts `101` and `102` to the STP trading group. In this case, the
members in the group are `[101,102]`.

T1: The `STP` strategy version released.

T2: After the `organization A` account `101` places a short order, there is no
matching order in the market order book to match the transaction. At this time,
the role of the order is `maker`, and the order status is `open`. The key
response fields returned are:

```text
{
	"status":"open",
	"stp_act":"cn",
	"stp_id":100
}
```

T3: `Organization A` account `101`/`102` places a long order, and it can reach a
trade with account 101’s short order. The match engine finds both two orders'
stp_id are 100, so it applies the STP strategy of the taker order, which
defaults to `cn` , and cancels the long order. Order's `finish_as` will be set
to `stp`. The key response fields returned are:

```text
{
	"status":"finished",
	"stp_act":"cn",
	"stp_id":100,
	"finish_as":"stp"
}
```

- If `stp_act` is `co` , the order placed by `taker` will be retained, the order
  status will be `open`, and the system will cancel the order of `maker`.
- If `stp_act` is `cb`, both the long and short orders will be cancelled.
  Orders' `finish_as` will be set to `stp`. The key response fields returned
  are:

```text
{
	"status":"finished",
	"stp_act":"cb",
	"stp_id":100,
	"finish_as":"stp"
}
```

T3': If account 103 places a long order, and it can reach a trade with account
101’s short order, the transaction will be made since account 103 has not been
added to account 101’s STP group. The key response fields returned are:

```text
{
	"status":"finished",
	"stp_id":0,
	"finish_as":"filled"
}
```

## [#](#unified-account) Unified Account

### [#](#description) Description

Once a user upgrades their account to the unified account, they can utilize the
assets from their spot account as collateral for trading. The assets in the
account, denominated in various currencies, will be adjusted based on their
liquidity and converted to USD for consistent calculation of the account's
assets and position value.

The maximum borrowing limit for margin trading represents the maximum amount
that a user can borrow for a given trading market. The platform calculates the
user's maximum borrowing limit based on factors such as available margin and
platform risk control rules. Once the margin trading generates automatic
borrowing, the platform immediately starts accruing interest on the borrowed
digital assets.

Currently, the ability to switch to `cross_margin` or`usdt_futures` mode is
available. In the future, we will gradually introduce support for various
combination margin accounts, including `Futures`, `Delivery`, `Options` and
more. Stay tuned for further updates.

Please refer to the documentation for unified API. Once you have upgraded your
account, you will be able to make use of these endpoints.

Related endpoint can be found in the Unified Account API doc. After enabling the
Unified Account, you can proceed to call them. For more detailed information,
please refer to [here](https://www.gate.io/unified-trading-account)

### [#](#api-integration-process) API Integration Process

- Create a new `API KEY` or update the permissions of an existing `API KEY`,
  checking the `unified` permission
- Use the classic account's `API KEY` to call the
  `POST /api/v4/unified/account_mode` endpoint, or upgrade from the WEB page to
  the Unified Account
- Use the `/api/v4/spot/**` API for spot-related operations (ordering, modifying
  orders, querying orders), with the `account=unified` option
- Use the `/api/v4/futures/**` API for perpetual futures-related operations
  (ordering, modifying orders, querying orders)
- Use the `/api/v4/unified/**` API for Unified Account-related operations
  (account querying, loan querying)

### [#](#spot-trading-2) SPOT Trading

The spot trading in the Unified Account is consistent with that in the classical
account. In order operations, specify `account=unified`, or specify
`account=spot` and the system will automatically handle the order as a unified
account order when detecting the account as a unified account. For example, to
place a buy order for the `BTC_USDT` currency pair, the order creation request
would be similar to

```text
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "unified",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint
directly.

### [#](#formula) Formula

## [#](#accountbook-type) AccountBook type

### [#](#general-2) General

- unknown: Unknown
- login: Log In
- withdraw: Withdrawals
- ch_pass: Change Password
- ch_fund_pass: Change Fund Pass
- login_failed: Login Failed
- axs_account: Access Account
- req_pass_ch: Request Password Change
- req_fund_pass_ch: Request Fund Pass Change
- fund_pass_ent: Fund Pass Entered
- bank_card_add: Bank Card Added
- frw: Face Recognition For Withdrawal

### [#](#order) Order

- new_order: Order Placed
- cancel_order: Order Cancelled
- order_fill: Order Filled
- order_rej: Order Rejected
- order_fee: Trading Fees
- system_fee: Trading Fee System Account

### [#](#withdraw-deposit) Withdraw-Deposit

- withdraw: Withdrawals
- deposit: Deposits
- deposit_rej: Deposit Rejected
- withdraw_rej: Withdrawal Rejected
- cancel_withdraw: Cancel Withdrawal
- withdraw_gatecode: GateCode Withdrawals
- withdraw_fireblock: Fireblocks Withdrawals
- withdraw_copper: Copper Withdrawals
- startup_withdraw: Token Withdrawal From Startup
- deposit_gatecode: GateCode Deposits
- deposit_fireblock: Fireblocks Deposits
- deposit_copper: Copper Deposits
- buy_cl: Buy Crypto Legend
- buy_cc: Buy Crypto Cabital
- deposit_finmo: Gate connect Finmo Deposit

### [#](#startup) Startup

- startup_prtcp: Startup Sale Participation
- startup_refund: Startup Sale Refund
- startup_sale: Startup Sale
- startup_sale_rb: Startup Sale Rolled Back

### [#](#rebate) Rebate

- referral_rebate: Referral Superior Rebate
- sec_rebate_out: Secondary Rebate Financial Account Transfer Out
- sec_rebate_in: Affiliate Indirect Superior Rebate Income
- ab_rebate: API Broker Rebate Income
- eb_rebate: Exchange Broker Rebate Income
- u_rebate: Referral Rebate Income
- ads_rebate: Affiliate Direct Superior Rebate Income
- au_rebate: Affiliate User Rebate Income
- pis_rebate: Partner Indirect Superior Rebate Income
- pds_rebate: Partner Direct Superior Rebate Income
- pu_rebate: Partner User Rebate Income

### [#](#convert) Convert

- eth_swap: ETH Swap
- dust_swap_dctd: Dust Swap-Small Balances Deducted
- dust_swap_gt_add: Dust Swap-GT Added
- dust_swap_fee: Dust Swap-Fees Deducted
- cv_buy: Quick Buy-Bought
- cv_sell: Quick Sell-Sold

### [#](#c2c) C2C

- c2c_mop: C2C Merchant Order Placed
- c2c_moc: C2C Merchant Order Canceled
- c2c_rop: C2C Retail Order Placed
- c2c_roc: C2C Retail Order Canceled
- c2c_om: C2C Order Matched
- c2c_or: C2C Order Rejected
- c2c_fee: C2C Fees

### [#](#reward) Reward

- deposit_bonus: Deposit Bonus
- trading_rewards: Trading Rewards
- purchase_bonus: Purchase Bonus
- airdrop: Airdrop
- award: Award
- mining_rewards: Mining Rewards

### [#](#account-transfer-in-out) Account Transfer In-Out

- margin_in: Isolated Margin-Transferred In
- margin_out: Isolated Margin- Transferred Out
- spot_settle_out: Spot Settlement Transfer Out
- spot_settle_in: Spot Settlement Transfer Out
- lending_in: Lending-Transferred In
- lending_out: Lending-Transferred Out
- cross_in: PortfolioMarginAccountTransferIn
- cross_out: PortfolioMarginAccountTransferOut
- perp_in: Perps- Transferred In
- perp_out: Perps- Transferred Out
- perp_settle_in: Perpetual Multi-currency Settlement Transfer In
- perp_settle_out: Perpetual Multi-currency Settlement Transfer Out
- delivery_in: Delivery- Transferred In
- delivery_out: Delivery- Transferred Out
- ai_in: Auto-Invest-Transferred In
- ai_out: Auto-Invest-Transferred Out
- e_options_in: Easy Options- Transferred In
- e_options_out: Easy Options- Transferred Out
- options_in: Options- Transferred In
- options_out: Options- Transferred Out
- cbbc_in: CBBC- Transferred In
- cbbc_out: CBBC- Transferred Out
- warrant_in: Warrant- Transferred In
- warrant_out: Warrant- Transferred Out
- subaccount_trf: Subaccount Transfer
- quant_in: Quant- Transferred In
- quant_out: Quant- Transferred Out
- pay_in: Payment Account- Transferred In
- pay_out: Payment Account- Transferred Out
- fct_in: Futures Copy Trading - Funds Transfer In
- fct_out: Futures Copy Trading - Funds Transfer Out

### [#](#points) Points

- points_purchase: Points Purchase
- points_expiration: Points With Expiration
- points_trf: Points Transfer
- points_trf_rej: Points Transfer Rejected

### [#](#finance) Finance

- lending_lent: Lending-Lent
- collected: Collected
- interest_in: Interest Income
- lending_fee: Lending-Fees Deducted
- hodl_int: HODL Interest
- redeem: Redeem
- lend: Lend
- dual_purchased: Dual C-Purchased
- dual_settled: Dual C-Settled
- liq_add: Liquidity Added
- liq_rm: Liquidity Removed
- liq_rebalanced: Liquidity Rebalanced
- slot_int_in: Slot Auction Staking Interest Income
- str_int_in: Structured Products Staking Interest Income

### [#](#loan) Loan

- borrow: Borrow
- repay: Repay
- margin_borrow: Isolated Margin-Transferred In
- margin_repay: Isolated Margin- Transferred Out
- margin_interest_out: Isolated Margin-Interest Deduction
- cl_borrow: Cryptoloan- Borrowed
- cl_repay: Cryptoloan- Repaid
- cl_dctd: Cryptoloan- Collateral Deducted
- cl_rtd: Cryptoloan- Collateral Returned
- cross_borrow: PortfolioMarginAccountBorrowIn
- cross_repay: PortfolioMarginAccountRepay
- interest_out: Interest

### [#](#moments) Moments

- donation: Donation
- rp_sent: Red Packet Sent
- rp_rcvd: Red Packet Received
- rp_rej: Red Packet Rejected
- ls_offered: Live Stream-Reward Offered
- ls_rcvd: Live Stream- Reward Received
- pt_offered: Posts- Reward Offered
- pt_rcvd: Posts- Reward Received
- subs_deduct: Subscription-Fees Deducted
- subs_in: Subscription-Fees Received
- subs_refund: Subscription- Refund
- subs_in_rcvd: Subscription- Refunds Received

### [#](#push-trading) PUSH Trading

- push_dctd: Push- Deduction
- push_rcvd_dctd: Push- Received-Deducted
- push_canceled: Push Canceled
- push_rej: Push Rejected
- push_sent: Push Sent
- push_rcvd: Push Received

### [#](#copy-trading) Copy Trading

- quant_return: Quant- Transaction Returned
- quant_cmn_in: Quant-Commission Transferred In
- quant_cmn_out: Quant-Commission Transferred Out
- quant_cmn_rtd: Quant-Commission Returned
- fct_refund: Futures Copy Trading - Funds Auto Transfer Out
- fct_rcvd: Futures Lead Trading - Performance Fee Received
- fct_fee: Futures Copy Trading - Performance Fee Paid
- fct_fee_refund: Futures Copy Trading - Performance Fee Refund

### [#](#nft) NFT

- nft_mp: NFT Auction-Margin Paid
- nft_bm: NFT Auction-Bid Made
- nft_om: NFT Auction-Offer Made
- ntf_mr: NFT Auction-Margin Returned
- nft_amr: NFT Auction-Aborted-Margin rcvd
- nft_ocb: NFT Auction-Order Canceled-Back
- nft_fb: Fixed Price-Bought
- nft_fs: Fixed Price-For Sale
- nft_ob: NFT Make-Offer Bought
- nft_os: NFT Make-Offer Sale
- nft_cr: Cancel offer refund
- nft_ir: Refund for invalid offer
- nft_wf: Withdrawal service fee
- nft_wfr: Withdrawal service fee
- ntf_mf: Multi-copy creation service fee
- ntf_mfr: Multi-copy creation service fee refund
- ntf_royalty: Royalties
- nft_cd: NFT Auction-Order Canceled-Deducted
- nft_crd: NFT Auction-Order Canceled-Rotalty-Deducted
- nft_cf: crowdfunding
- nft_cfr: crowdfunding refund
- nft_ammf: Nft-Amm Frozen
- nft_ammw: Nft-Amm Withdraw
- nft_ammdf: Nft-Amm Deal Fee
- nft_ammd: Nft-Amm Deal

## [#](#accountbook-code) AccountBook code

- 1 : Order Placed Old
- 2 : Order Cancelled old
- 4 : Withdrawals
- 9 : Cancel GateCode Withdrawal
- 17 : GateCode Withdrawals
- 18 : Fireblocks Withdrawals
- 19 : copper withdraw
- 20 : Face Recognition For Withdrawal
- 101 : Order Placed
- 102 : Order Filled
- 103 : Order Cancelled
- 104 : Cancel Onchain Withdrawal
- 105 : Token Withdrawal From Startup
- 106 : Donation
- 107 : Startup Sale Participation
- 108 : Startup Sale Refund
- 109 : Referral Superior Rebate
- 110 : Deposits
- 111 : Interest
- 112 : Deposit Rejected
- 113 : Withdrawal Rejected
- 114 : Fund Correction
- 115 : Snapshot
- 116 : Order Rejected
- 117 : CNY1 Deposited
- 118 : Rebasing
- 120 : Transaction Rolled Back
- 121 : GateCode Deposits
- 122 : Fireblocks Deposits
- 123 : Wrongdepo Fee
- 124 : copper deposit
- 131 : Call Auction- Locked
- 132 : Call Auction- Unlocked
- 141 : ETF Asset Consolidation - Debit
- 142 : ETF Asset Consolidation - Credit
- 151 : Trading Fees
- 152 : Trading Fee System Account
- 161 : Secondary Rebate Financial Account Transfer Out
- 162 : Affiliate Indirect Superior Rebate Income
- 164 : Affiliate Direct Superior Rebate Income
- 166 : Affiliate User Rebate Income
- 171 : Order Placed Frozen
- 172 : Order Cancelled Unfrozen
- 181 : ETH Swap
- 182 : ETH2 Swap
- 191 : Referral Rebate Income
- 196 : Web3 Rebate Income
- 301 : C2C Merchant Order Placed
- 302 : C2C Merchant Order Canceled
- 303 : P2P User Sell
- 304 : C2C Retail Order Canceled
- 305 : P2P User Buy
- 306 : C2C Order Rejected
- 307 : Payment Setup
- 308 : C2C Fees
- 309 : C2C Deposit Freeze
- 310 : C2C Deposit Refund
- 311 : C2C Deposit Forfeiture
- 312 : P2P Shared Asset Order Refund
- 313 : P2P Frozen Funds
- 314 : P2P Unfrozen Funds
- 319 : Crypto Conversion Fee
- 322 : Buy Crypto Legend
- 323 : Buy Crypto Cabital
- 324 : Gate Connect-Buy
- 325 : Gate Connect-Buy
- 326 : Gate Connect-Buy
- 327 : Gate Connect-Buy
- 328 : Gate Connect-Sell
- 329 : Gate Connect-Refund
- 330 : Gate Connect-Buy
- 331 : Gate Connect-Sell
- 401 : Deposit Bonus
- 402 : Trading Rewards
- 403 : Purchase Bonus
- 404 : Airdrop
- 405 : Feedback Rewards
- 501 : IFO Claimed
- 502 : IFO Returned
- 601 : Isolated Margin - Transfer In
- 602 : Isolated Margin - Transfer Out
- 603 : Lending-Transferred In
- 604 : Lending-Transferred Out
- 605 : Isolated Margin-Transferred In
- 606 : Isolated Margin- Transferred Out
- 607 : Liquidating-Unlocked
- 608 : Liquidating-Locked
- 609 : Interest Updated
- 610 : Lending-Lent
- 611 : Collected
- 612 : Interest Income
- 613 : Lending-Fees Deducted
- 614 : Due Repayment-Unlocked
- 615 : Due Repayment-Locked
- 616 : Liquidation Fee
- 621 : Staking-Locked
- 622 : Staking-Unlocked
- 623 : Staking Interest Income
- 624 : Staking-Locked
- 625 : Staking-Unlocked
- 626 : Staking Interest Income
- 627 : HODL Interest
- 628 : HODL Interest Distribution
- 629 : HODL Interest Rolled Back
- 630 : Borrow
- 631 : Repay
- 632 : Pledge
- 633 : Collateral Refund
- 635 : Fixed Rate Loan - Interest
- 640 : Flexible Rate Loan - Borrow
- 641 : Flexible Rate Loan - Repay
- 642 : Flexible Rate Loan - Liquidate to Repay Principal
- 643 : Flexible Rate Loan - Liquidate to Repay Interest
- 644 : Flexible Rate Loan - Interest
- 645 : Pledge
- 646 : Collateral Refund
- 647 : Adjust Collateral
- 648 : Refund after Liquidation
- 649 : Liquidation Fee
- 651 : Portfolio Margin Account Transfer In
- 652 : Portfolio Margin Account Transfer Out
- 655 : Fixed Rate Loan - Borrow
- 656 : Fixed Rate Loan - Repay
- 657 : Fixed Rate Loan - Liquidate to Repay Interest
- 658 : Fixed Rate Loan - Liquidate to Repay Principal
- 659 : Cross-Currency Repayment - Transfer Out
- 660 : Cross-Currency Repayment - Transfer In
- 661 : Redeem
- 662 : Lend
- 669 : Interest
- 670 : MarginTradingBorrowed
- 671 : MarginTradingRepaid
- 672 : MarginTradingInterest
- 673 : Isolated Margin-Transferred In
- 674 : Isolated Margin- Transferred Out
- 675 : Interest Updated
- 676 : Isolated Margin-Interest Deduction
- 677 : Borrow
- 678 : Repay
- 679 : Interest
- 681 : Bonus
- 682 : Contributing Insurance Funds
- 683 : Consuming Insurance Funds
- 685 : Interest - Platform Loans
- 686 : Subscription - Fixed-term
- 687 : Redemption - Fixed-term
- 688 : Interest - Fixed-term
- 689 : Bonus - Fixed-term
- 696 : Early repayment penalty
- 697 : Refund of early repayment penalty
- 701 : Perps- Transferred In
- 702 : Perps- Transferred Out
- 703 : Delivery- Transferred In
- 704 : Delivery- Transferred Out
- 705 : Multi-currency Settlement Transfer In
- 706 : Multi-currency Settlement Transfer Out
- 721 : Stable Income - Lock
- 722 : Stable Income - Unlock
- 723 : Stable Income - Interest
- 724 : Stable Income - Lock
- 725 : Stable Income - Unlock
- 726 : Stable Income - Interest
- 727 : Structured Products - Lock
- 728 : Structured Products - Lock
- 729 : Structured Products - Unlock
- 730 : Structured Products - Interest
- 731 : Structured Products - Unlock
- 732 : Structured Products - Interest
- 733 : Hybrid Interest - Lock
- 734 : Hybrid Interest - Lock
- 735 : Hybrid Interest - Unlock
- 736 : Hybrid Interest - Interest
- 737 : Hybrid Interest - Unlock
- 738 : Hybrid Interest - Interest
- 739 : Wealth Referral Commission Rebate
- 751 : Quant Fund - Lock
- 753 : Quant Fund - Unlock
- 754 : Quant Fund - Earnings
- 761 : Lock & Earn Redeem Early
- 801 : Gift Coins Sent
- 802 : Gift Coins Received
- 803 : Gift Coins Rejected
- 804 : Live Stream-Reward Offered
- 805 : Live Stream- Reward Received
- 806 : Posts- Reward Offered
- 807 : Posts- Reward Received
- 901 : Buy Points
- 902 : Buy Points Rollback
- 903 : Time-Limited Points
- 911 : Auto-Invest-Transferred Out
- 912 : Auto-Invest-Transferred In
- 913 : Redeem points for goods
- 915 : Redeemed Points - Refund
- 917 : Expired & Recycled
- 1001 : C2C Loan Ad Posted
- 1002 : C2C Loan Ad Canceled
- 1003 : C2C Loan Order Placed
- 1004 : C2C Loan Repaid
- 1005 : C2C Loan Order Canceled
- 1006 : C2C Loan Fees
- 1007 : C2C Loan Liquidated
- 1008 : C2C Loan- Margin Added
- 1101 : Points Transfer
- 1102 : Points Transfer Refund
- 1171 : Bonus - Flexible
- 1173 : Bonus - Flexible
- 1174 : Bonus
- 1181 : Staking
- 1184 : Redemption
- 1186 : Interest
- 1191 : Staking
- 1194 : Redemption
- 1196 : Interest
- 1201 : Startup Sale
- 1202 : Startup Sale Rolled Back
- 1251 : Stake
- 1253 : Manually Redeem
- 1255 : Reward
- 1258 : Auto-Redeem
- 1301 : Dust Swap-Small Balances Deducted
- 1302 : Dust Swap-GT Added
- 1303 : Dust Swap-Fees Deducted
- 1307 : Dust Swap-Small Balances Deducted
- 1310 : Dust Swap-Small Balances Deducted
- 1311 : Dust Swap-Small Balances Deducted
- 1312 : Small Balance Convert - USDT Added
- 1322 : Convert Small Balance (USDT)
- 1323 : Convert Small Balance - USDT Added
- 1401 : Subaccount Transfer
- 1501 : Subscription-Fees Deducted
- 1502 : Subscription-Fees Received
- 1503 : Subscription- Refund
- 1504 : Subscription- Refunds Received
- 1601 : Easy Options- Transferred In
- 1602 : Easy Options- Transferred Out
- 1603 : Options- Transferred In
- 1604 : Options- Transferred Out
- 1701 : Bots - Transfer In
- 1702 : Bots - Transferred Out
- 1703 : Bots - Refund
- 1801 : CBBC- Transferred In
- 1802 : CBBC- Transferred Out
- 1811 : Warrant- Transferred In
- 1812 : Warrant- Transferred Out
- 1901 : Push- Deduction
- 1903 : Push- Received-Deducted
- 1905 : Push- Canceled
- 1906 : Push- Rejected
- 1907 : Push- Sent
- 1908 : Push- Received
- 2001 : Dual C-Purchased
- 2004 : Dual C-Settled
- 2011 : Subscription to Dip Sniper products
- 2012 : Recouped from expired Dip Sniper products
- 2021 : Subscription to Peak Sniper products
- 2022 : Recouped from expired Peak Sniper products
- 2202 : Lending Farm-Token Added
- 2203 : Lending Farm-Token Removed
- 2301 : Liquidity Added
- 2302 : Liquidity Removed
- 2303 : Liquidity Rebalanced
- 2311 : Add Liquidity
- 2312 : Remove Liquidity
- 2314 : Mining Rewards
- 2401 : Bots - Performance Fee Received
- 2402 : Bots - Performance Fee Paid
- 2403 : Bots - Performance Fee Refund
- 2501 : NFT Auction-Margin Paid
- 2502 : NFT Auction-Bid Made
- 2503 : NFT Auction-Offer Made
- 2504 : NFT Auction-Margin Returned
- 2505 : Fixed Price-Bought
- 2506 : Fixed Price-For Sale
- 2512 : NFT Auction-Aborted-Margin Received
- 2517 : NFT Auction-Order Canceled-Back
- 2518 : NFT Make_Offer Bought
- 2519 : Cancel offer refund
- 2523 : Withdrawal service fee
- 2524 : Withdrawal service fee
- 2527 : Multi-copy creation service fee
- 2528 : Multi-copy creation service fee refund
- 2531 : Royalties
- 2532 : NFT Auction-Order Canceled-Deducted
- 2533 : Refund for invalid offer
- 2536 : NFT Make_Offer Sale
- 2538 : NFT Auction-Order Canceled-Rotalty-Deducted
- 2539 : crowdfunding
- 2540 : crowdfunding refund
- 2541 : crowdfunding
- 2542 : crowdfunding refund
- 2551 : Nft-Amm Frozen
- 2552 : Nft-Amm Withdraw
- 2553 : Nft-Amm Deal Fee
- 2554 : Nft-Amm Deal
- 2601 : Quick Buy-Bought
- 2602 : Quick Sell-Sold
- 2603 : Repay All - Transfer Out
- 2604 : Repay All - Transfer In
- 2605 : Buy
- 2606 : Sell
- 2607 : Buy
- 2608 : Sell
- 2609 : Buy
- 2610 : Sell
- 2611 : Convert Refund
- 2612 : Buy
- 2613 : Sell
- 2614 : HODLer Airdrop
- 2701 : Mining Contract Purchased
- 2702 : Mining Balance Added to System
- 2703 : Mining Rewards Deducted From System
- 2704 : Mining Rewards Claimed
- 2706 : Mining Balance User Money Back
- 2707 : Mining Balance deducted From System
- 2801 : Slot Auction Staking-Locked
- 2802 : Slot Auction Staking-Unlocked
- 2803 : Slot Auction Staking Interest Income
- 2804 : Slot Auction Staking-Locked
- 2805 : Slot Auction Staking-Unlocked
- 2806 : Slot Auction Staking Interest Income
- 2807 : Structured Products Staking-Locked
- 2808 : Structured Products Staking-Unlocked
- 2809 : Structured Products Staking Interest Income
- 2810 : Structured Products Financial Account Staking-Locked
- 2811 : Structured Products Financial Account Staking-Unlocked
- 2812 : Structured Products Financial Account Staking Interest Income
- 2901 : Futures Competition Buy Gift Pack
- 2902 : Futures Competition Dovote Reward
- 2903 : Futures Competition Individual Ranking Reward
- 2904 : Futures Competition Team Ranking Reward
- 2905 : Futures Competition Early Bird Reward
- 2906 : Futures Competition Early Bird Reward
- 3001 : Payment Account- Transferred In
- 3008 : Payment Account- Transferred Out
- 3019 : Fiat Withdrawal
- 3020 : Refund for Fiat Withdrawal
- 3101 : Vouchers - Redeem Points
- 3102 : Coupon Center Usdtest Exchange
- 3103 : Activity Center Point Exchange
- 3104 : Exclusive Benefits
- 3105 : Vouchers - Trading Fee Rebate
- 3150 : Error in event token release
- 3151 : Paid by Loss Protection Voucher for Copier
- 3201 : Futures Copy Trading - Funds Transfer In
- 3202 : Futures Copy Trading - Funds Transfer Out
- 3203 : Futures Copy Trading - Funds Auto Transfer Out
- 3204 : Futures Lead Trading - Performance Fee Received
- 3205 : Futures Copy Trading - Performance Fee Paid
- 3206 : Futures Copy Trading - Performance Fee Refund
- 3301 : Affiliate Ultra Direct Superior Rebate Income
- 3302 : Gate.TR&Gate.io Transfer
- 3321 : Affiliate Ultra Indirect Superior Rebate Income
- 3341 : Affiliate Ultra User Rebate Income
- 3390 : API Broker Rebate Income
- 3401 : Block Trading Transfer In
- 3402 : Block Trading Transfer Out
- 3410 : Exchange Broker Rebate Income
- 3501 : card top up
- 3502 : Gate Card Cashback
- 3503 : Return Top up
- 3504 : Replace Card Fee
- 3505 : Return Card Fee
- 3506 : Card Inactivity Fee
- 3507 : Authorization
- 3508 : Reversal
- 3509 : Clearing
- 3510 : Refund
- 3511 : Repayment
- 3512 : Card Issuance Fee
- 3513 : Return Card Fee
- 3514 : Return Card Balance
- 3515 : Tax Refund
- 3516 : Points Redemption
- 3517 : Withdraw from SGD Card
- 3518 : Deposit to SGD Card
- 3601 : Spot Lead Trading - Funds Transfer In
- 3602 : Spot Lead Trading - Funds Transfer Out
- 3603 : Spot Lead Trading - Funds Auto Transfer Out
- 3604 : Spot Copy Trading - Funds Transfer In
- 3605 : Spot Copy Trading - Funds Transfer Out
- 3606 : Spot Copy Trading - Funds Auto Transfer Out
- 3607 : Spot Lead Trading - Performance Fee Received
- 3608 : Spot Copy Trading - Performance Fee Paid
- 3609 : Spot Copy Trading - Performance Fee Refund
- 3701 : OTC trade - buy
- 3702 : OTC trade - sell
- 3703 : OTC trade - cancel
- 3801 : Futures Voucher Return Transfer
- 3901 : Transfer to Pilot
- 3902 : Transfer from Pilot
- 3903 : Transfer to Spot
- 3904 : Transfer from Spot
- 3905 : Transfer to Spot
- 3906 : Transfer from Pilot
- 3920 : Event Rewards
- 3922 : Pilot Token Airdrop
- 3923 : Pilot Token Airdrop Failed
- 4002 : Withdraw Commission
- 4009 : Withdraw Rewards
- 4011 : Deducted Negative Maker Fee
- 5001 : Pre-Market OTC Trading Fee
- 5002 : Pre-Market OTC Frozen Assets (Buy)
- 5003 : Pre-Market OTC Frozen Assets (Sell)
- 5004 : Pre-Market OTC Trading Fee Refund (Order Canceled)
- 5005 : Pre-Market OTC Unfreeze Frozen Assets (Order Canceled)
- 5006 : Pre-Market OTC Unfreeze Frozen Assets (Order Canceled)
- 5007 : Pre-Market OTC Delivery Transfer Out
- 5008 : Pre-Market OTC Delivery Transfer In
- 5009 : Pre-Market OTC Unfreeze Frozen Assets (Delivery Success)
- 5011 : Compensation to Buyer
- 5012 : Pre-Market OTC Delivery Refund
- 5013 : Pre-Market OTC Trading Fee Refund (Project Canceled)
- 5014 : Pre-Market OTC Payment Refund Due to Project Cancellation (Buy)
- 5015 : Pre-Market OTC Unfreeze Frozen Assets (Sell)
- 5016 : Early Termination Fee
- 5017 : Early Termination Indemnity
- 5051 : Pre-Market - Mint - Deduct Staked Assets
- 5052 : Pre-Market - Mint - PreToken Release
- 5053 : Pre-Market - Take a Snapshot and Clear Balance Before Settlement
- 5054 : Pre-Market - Delivery - Token Delivery
- 5055 : Pre-Market - Delivery - Unstake Staked Assets
- 5056 : Pre-Market - Settlement - Token Settlement
- 5057 : Pre-Market - Settlement - Staked Assets Settlement
- 5058 : Pre-Market - Project Canceled - Staked Assets Settlement
- 5059 : Pre-Market-Unstake-Deduct PreToken
- 5060 : Pre-Market -Unstake-Unstake Staked Assets
- 5061 : Pre-Market - Increase Staked Assets
- 5062 : Pre-Market - Decrease Staked Assets
- 5104 : Fireblocks Fee Refund

## [#](#error-handling) Error Handling

For all abnormal requests, APIv4 will return non-2xx status code, with a
response body in JSON format to explain the error.

The error response body follows a format like:

```json
{
  "label": "INVALID_PARAM_VALUE",
  "message": "Invalid parameter `text` with value: abc"
}
```

- `label`: denotes error type in `string` format. Its value are chosen from a
  certain list(see below). Programs can use `label` to identify and catch a
  specific error.
- `message`(or `detail`): detailed error message. A longer explanation showing
  why the error is generated or how to avoid it. Its purpose is helping to
  better understand the API. Error handling mechanism with this field is highly
  **NOT** recommended.

Take Python
[requests (opens new window)](https://requests.readthedocs.io/en/latest/) for
example, error handling can be written like:

> Following examples only deal with business-related errors. Network timeout or
> other common errors need to be handled separately:

```python
import requests

r = requests.get("https://api.gateio.ws/api/v4/futures/btc/contracts/BTC_USD")
try:
    r.raise_for_status()
except requests.HTTPError:
    # catch 2xx errors, parse error message in body, and do something based on `label`
    if r.json()['label'] == 'xxx':
        print(r.json())
```

or with
[Python SDK (opens new window)](https://github.com/gateio/gateapi-python):

```python
import json
from gate_api import FuturesApi
from gate_api.rest import ApiException

api = FuturesApi()
try:
    api.get_futures_contract(settle='btc', contract="BTC_USD")
except ApiException as e:  # ApiException wraps whole error information, see implementation for details
    detail = json.loads(e.value.body)
    if detail['label'] == 'xxx':
        print(detail)
```

## [#](#label-list) `label` list

- Request parameter or format related

- Authentication related

- Wallet related

- Spot and margin trading related

- Futures related

- Collateral Loan related

- Portfolio related

- Earn related

- Server errors

# [#](#authentication) Authentication

## [#](#generate-api-key) Generate API key

Before calling the private API interface, the API key of the account needs to be
generated to verify the identity. You can log in on the website and generate it
in \[account management\] - > \[APIv4 keys\], or click
[here](/myaccount/apiv4keys) to generate API keys.

Each account can create 20 API keys, and the permission configuration of each
key is independent of each other. It is recommended to set a note name for each
key to indicate its purpose.

**`Key`** Access Key **`Secret Key`** The key used for signature authentication
encryption

Besides, you can attach an IP whitelist, which requires the server only accept
requests from specified IPs. Each key can have at most 20 IPs formatted in
IPv4(not supporting IP range though). If IP whitelist is not set, the server
will skip client IP validation.

Each user can create at most 5 keys with separate permissions. It is recommended
to set a name for key denoting how the key will be used.

TIP

Note: If the key is named with `spot` or `futures`, then it could be the default
name after APIv4 migration. For details refer to _About APIv4 key improvement_
section

Created key can also be updated or deleted, but any modification(s) can take up
to 5 minutes to take effect.

Please note that futures TestNet trading is a separate environment from futures
real trading. Real trading API keys cannot be used in TestNet. If you want to
test futures API with TestNet, you need to log into the console to generate
TestNet API keys(in _"Futures TestNet APIKeys"_ tab on _" APIv4Keys"_ page).
Making futures requests are identical between real and TestNet trading, with the
only exceptions are different base URLs and different API keys.

## [#](#apiv4-permissions) APIv4 Permissions

When creating a Key, you can configure whether to enable spot, margin, contract,
wallet, or withdrawal permissions for the Key, and whether to enable read-write
or read-only permissions.

All `GET` operations are read requests, while others are write requests. Each
permission group can be set to disabled, read-only or read-write.

Please note that even though withdrawal API has only one operation(i.e.
`POST /withdrawals`), for general concern, it is still separated from wallet API
into a standalone permission group, while withdrawal history retrieving API
stays inside wallet operations( i.e., `GET /wallet/withdrawals`).

## [#](#apiv4-signed-request-requirements) APIv4 signed request requirements

1.  Generate APIv4 Key pairs in web console, and make sure it has the right
    permissions.
2.  Set request header `KEY` to the key.
3.  Set request header `Timestamp` to current time formatted in Unix time in
    seconds. Pay attention that the gap between its value and current time
    cannot exceed 60 seconds.
4.  Set request header `SIGN` to encrypted request signature. Refer to next
    section for how signature string is generated. Signature generation method
    is `HexEncode(HMAC_SHA512(secret, signature_string))`, i.e., the hexadecimal
    digest output of HMAC-SHA512 with APIv4 secret as secret and signature
    string as message,
5.  Make sure request client's IP is in your APIv4 Key's IP whitelist.

## [#](#api-signature-string-generation) API Signature string generation

In APIv4, signature string is concatenated as the following way:

`Request Method + "\n" + Request URL + "\n" + Query String + "\n" + HexEncode(SHA512(Request Payload)) + "\n" + Timestamp`

### [#](#request-method) Request Method

Request method in UPPERCASE, e.g. `POST`, `GET`

### [#](#request-url) Request URL

Request url. Protocol, host and port are not included, e.g.
`/api/v4/futures/orders`

### [#](#query-string) Query String

Request query string without URL encode. query parameters order should be the
same as how they are concatenated in the request URL, e.g.
`status=finished&limit=50`. Use empty string("") if no query parameters.

### [#](#hexencode-sha512-request-payload) HexEncode(SHA512(Request Payload))

Hash the request body with SHA512 and output its Hex encoded form. If no request
body, use empty string's hashed result, i.e.
`cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e`

### [#](#timestamp) Timestamp

`Timestamp` request header value.

Examples

Note: all example signature string are broken into multiple lines for displaying
purpose only. Only the `\n` character in signature string is reserved in
reality.

Suppose the key we used is `key`, while the secret is `secret`.

1.  List all orders

```http
GET /api/v4/futures/orders?contract=BTC_USD&status=finished&limit=50 HTTP/1.1
```

Signature string：

```text
GET\n
	/api/v4/futures/orders\n
	contract=BTC_USD&status=finished&limit=50\n
	cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e\n
	1541993715
```

Explanation：

- `/api/v4/futures/orders`: request url
- `contract=BTC_USD&status=finished&limit=50`: keep the query string as it is in
  the request url
- request body use empty string's hashed result
- `1541993715`: Unix timestamp in seconds

Signature generated

`55f84ea195d6fe57ce62464daaa7c3c02fa9d1dde954e4c898289c9a2407a3d6fb3faf24deff16790d726b66ac9f74526668b13bd01029199cc4fcc522418b8a`

2.  Create an order

```http
POST /api/v4/futures/orders HTTP/1.1

	{"contract":"BTC_USD","type":"limit","size":100,"price":6800,"time_in_force":"gtc"}
```

Signature string：

```text
POST\n
	/api/v4/futures/orders\n
	\n
	ad3c169203dc3026558f01b4df307641fa1fa361f086b2306658886d5708767b1854797c68d9e62fef2f991645aa82673622ebf417e091d0bd22bafe5d956cca\n
	1541993715
```

Explanation：

- request query string is empty, use plain empty string
- use the hashed result of the json-string-formatted request body

Signature generated

`eae42da914a590ddf727473aff25fc87d50b64783941061f47a3fdb92742541fc4c2c14017581b4199a1418d54471c269c03a38d788d802e2c306c37636389f0`

```python
# example authentication implementation in Python

"""
Python SDK is recommended as it has already implemented the authentication process for every API:
"""

import time
import hashlib
import hmac
import requests
import json

def gen_sign(method, url, query_string=None, payload_string=None):
    key = ''        # api_key
    secret = ''     # api_secret

    t = time.time()
    m = hashlib.sha512()
    m.update((payload_string or "").encode('utf-8'))
    hashed_payload = m.hexdigest()
    s = '%s\n%s\n%s\n%s\n%s' % (method, url, query_string or "", hashed_payload, t)
    sign = hmac.new(secret.encode('utf-8'), s.encode('utf-8'), hashlib.sha512).hexdigest()
    return {'KEY': key, 'Timestamp': str(t), 'SIGN': sign}

if __name__ == "__main__":
    host = "https://api.gateio.ws"
    prefix = "/api/v4"
    common_headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

    url = '/futures/orders'
    body = {"contract": "BTC_USD", "size": 100, "price": "30", "tif": "gtc"}
    request_content = json.dumps(body)
    sign_headers = gen_sign('POST', prefix + url, "", request_content)
    sign_headers.update(common_headers)
    print('signature headers: %s' % sign_headers)
    res = requests.post(host + prefix + url, headers=sign_headers, data=request_content)
    print(res.status_code)
    print(res.content)
```

# [#](#faq) FAQ

- How to retrieve `POST /wallet/transfers` history?

  Records of transfers generated through `POST /wallet/transfers` has multiple
  methods to be retrieved based on account, including:

  - `GET /margin/account_book` to retrieve transferals from or to margin
    account.
  - `GET /futures/{settle}/account_book?type=dnw` to retrieve perpetual contract
    account history
  - `GET /delivery/{settle}/account_book?type=dnw` to retrieve delivery contract
    account history

- How to create margin orders?

  Margin order creation has been merged into spot order APIs. In
  `POST /spot/orders` or `POST /spot/batch_orders`, set `account` to `margin` to
  create margin orders.

- Futures operation returns error `USER_NOT_FOUND`

  Futures account is not initialized yet. Making a deposit to your futures
  account will help. Note that each settle currency is associated with an
  independent futures account.

- Futures operation returns error `CONTRACT_NOT_FOUND`

  Every settle currency has its own contract list. Make sure the contract you
  specified is supported by the settle currency. You can query the list with

  `GET /futures/{settle}/contracts` or `GET /delivery/{settle}/contracts`

- Difference between sub account and main account

  - Sub account API Key cannot operate transferals between main and sub account,
    i.e., `POST /wallet/sub_account_transfers`
  - Sub account API Key cannot operate withdrawal, i.e., `POST /withdrawals`
  - If sub account does not have some business permission, even if its API key
    has the permission, the operations will be rejected too.

- I have other question(s) not covered above

  Contact support for the issue. If the problem is related to one of the SDKs,
  you can also open an issue in the corresponding GitHub repository.

  When submitting an issue, please include the following information to help
  identify the problem:

  - User ID
    - Original request URL, request parameters and request body
    - What API key was used and where was it used, TestNet or real trading(API
      secret is not needed)
    - Programming language. Providing a code snippet will be better
    - Whether SDK was used. If so, which method caused the problem

# [#](#withdrawal) Withdrawal

Withdrawal operations

## [#](#withdraw) Withdraw

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/withdrawals'
query_param = ''
body='{"withdraw_order_id":"order_123456","currency":"USDT","address":"1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs","amount":"222.61","memo":"","chain":"TRX"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/withdrawals"
query_param=""
body_param='{"withdraw_order_id":"order_123456","currency":"USDT","address":"1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs","amount":"222.61","memo":"","chain":"TRX"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /withdrawals`

_Withdraw_

Withdrawals to Gate addresses do not incur transaction fees.

> Body parameter

```json
{
  "withdraw_order_id": "order_123456",
  "currency": "USDT",
  "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
  "amount": "222.61",
  "memo": "",
  "chain": "TRX"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "id": "210496",
  "timestamp": "1542000000",
  "withdraw_order_id": "order_123456",
  "currency": "USDT",
  "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
  "txid": "128988928203223323290",
  "amount": "222.61",
  "memo": "",
  "status": "DONE",
  "chain": "TRX"
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#uid-transfer) UID transfer

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/withdrawals/push'
query_param = ''
body='{"receive_uid":12233,"currency":"USDT","amount":"1.1"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/withdrawals/push"
query_param=""
body_param='{"receive_uid":12233,"currency":"USDT","amount":"1.1"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /withdrawals/push`

_UID transfer_

Transfers between main spot accounts are allowed; however, both parties cannot
be sub-accounts

> Body parameter

```json
{
  "receive_uid": 12233,
  "currency": "USDT",
  "amount": "1.1"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "id": 111
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-withdrawal-with-specified-id) Cancel withdrawal with specified ID

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/withdrawals/210496'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/withdrawals/210496"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /withdrawals/{withdrawal_id}`

_Cancel withdrawal with specified ID_

### Parameters

> Example responses

> 202 Response

```json
{
  "id": "210496",
  "timestamp": "1542000000",
  "withdraw_order_id": "order_123456",
  "currency": "USDT",
  "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
  "txid": "128988928203223323290",
  "amount": "222.61",
  "memo": "",
  "status": "DONE",
  "chain": "TRX"
}
```

### Responses

### Response Schema

Status Code **202**

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#wallet) Wallet

Wallet

## [#](#list-chains-supported-for-specified-currency) List chains supported for specified currency

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/currency_chains'
query_param = 'currency=GT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/wallet/currency_chains?currency=GT \
  -H 'Accept: application/json'
```

`GET /wallet/currency_chains`

_List chains supported for specified currency_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "chain": "ETH",
    "name_cn": "以太坊ERC20",
    "name_en": "ETH/ERC20",
    "contract_address": "",
    "is_disabled": 0,
    "is_deposit_disabled": 0,
    "is_withdraw_disabled": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#generate-currency-deposit-address) Generate currency deposit address

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/deposit_address'
query_param = 'currency=USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/deposit_address"
query_param="currency=USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/deposit_address`

_Generate currency deposit address_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "USDT",
  "address": "LPXtk1kWHioP62SzfqwKbYE3Z7Wt2ujYEc",
  "multichain_addresses": [
    {
      "chain": "TRX",
      "address": "LPXtk1kWHioP62SzfqwKbYE3Z7Wt2ujYEc",
      "payment_id": "",
      "payment_name": "",
      "obtain_failed": 0
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-withdrawal-records) Retrieve withdrawal records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/withdrawals'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/withdrawals"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/withdrawals`

_Retrieve withdrawal records_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "210496",
    "timestamp": "1542000000",
    "withdraw_order_id": "order_123456",
    "currency": "USDT",
    "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
    "txid": "128988928203223323290",
    "block_number": "41575382",
    "amount": "222.61",
    "fee": "0.01",
    "memo": "",
    "status": "DONE",
    "chain": "TRX"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-deposit-records) Retrieve deposit records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/deposits'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/deposits"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/deposits`

_Retrieve deposit records_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "210496",
    "timestamp": "1542000000",
    "withdraw_order_id": "order_123456",
    "currency": "USDT",
    "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",
    "txid": "128988928203223323290",
    "amount": "222.61",
    "memo": "",
    "status": "DONE",
    "chain": "TRX"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-trading-accounts) Transfer between trading accounts

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/transfers'
query_param = ''
body='{"currency":"BTC","from":"spot","to":"margin","amount":"1","currency_pair":"BTC_USDT","settle":""}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/wallet/transfers"
query_param=""
body_param='{"currency":"BTC","from":"spot","to":"margin","amount":"1","currency_pair":"BTC_USDT","settle":""}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /wallet/transfers`

_Transfer between trading accounts_

Transfer between different accounts. Currently support transfers between the
following:

1.  spot - margin
2.  spot - futures(perpetual)
3.  spot - delivery
4.  spot - options

> Body parameter

```json
{
  "currency": "BTC",
  "from": "spot",
  "to": "margin",
  "amount": "1",
  "currency_pair": "BTC_USDT",
  "settle": ""
}
```

### Parameters

#### [#](#enumerated-values) Enumerated Values

> Example responses

> 200 Response

```json
{
  "tx_id": 59636381286
}
```

### Responses

### Response Schema

Status Code **200**

_TransactionID_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-main-and-sub-accounts) Transfer between main and sub accounts

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_transfers'
query_param = ''
body='{"client_order_id":"da3ce7a088c8b0372b741419c7829033","currency":"BTC","sub_account":"10002","direction":"to","amount":"1","sub_account_type":"spot"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/wallet/sub_account_transfers"
query_param=""
body_param='{"client_order_id":"da3ce7a088c8b0372b741419c7829033","currency":"BTC","sub_account":"10002","direction":"to","amount":"1","sub_account_type":"spot"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /wallet/sub_account_transfers`

_Transfer between main and sub accounts_

Support transferring with sub user's spot or futures account. Note that only
main user's spot account is used no matter which sub user's account is operated.

> Body parameter

```json
{
  "client_order_id": "da3ce7a088c8b0372b741419c7829033",
  "currency": "BTC",
  "sub_account": "10002",
  "direction": "to",
  "amount": "1",
  "sub_account_type": "spot"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "tx_id": 59636381286
}
```

### Responses

### Response Schema

Status Code **200**

_TransactionID_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-transfer-records-between-main-and-sub-accounts) Retrieve transfer records between main and sub accounts

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_transfers'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/sub_account_transfers"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/sub_account_transfers`

_Retrieve transfer records between main and sub accounts_

Record time range cannot exceed 30 days

> Note: only records after 2020-04-10 can be retrieved

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "uid": "10001",
    "timest": "1592809000",
    "source": "web",
    "client_order_id": "da3ce7a088c8b0372b741419c7829033",
    "currency": "BTC",
    "sub_account": "10002",
    "direction": "to",
    "amount": "1",
    "sub_account_type": "spot"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#sub-account-transfers-to-sub-account) Sub-account transfers to sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_to_sub_account'
query_param = ''
body='{"currency":"usdt","sub_account_from":"10001","sub_account_from_type":"spot","sub_account_to":"10002","sub_account_to_type":"spot","amount":"1"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/wallet/sub_account_to_sub_account"
query_param=""
body_param='{"currency":"usdt","sub_account_from":"10001","sub_account_from_type":"spot","sub_account_to":"10002","sub_account_to_type":"spot","amount":"1"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /wallet/sub_account_to_sub_account`

_Sub-account transfers to sub-account_

It is possible to perform balance transfers between two sub-accounts under the
same main account. You can use either the API Key of the main account or the API
Key of the sub-account to initiate the transfer.

> Body parameter

```json
{
  "currency": "usdt",
  "sub_account_from": "10001",
  "sub_account_from_type": "spot",
  "sub_account_to": "10002",
  "sub_account_to_type": "spot",
  "amount": "1"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "tx_id": 59636381286
}
```

### Responses

### Response Schema

Status Code **200**

_TransactionID_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-status-query) Transfer status query

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/order_status'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/order_status"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/order_status`

_Transfer status query_

Support querying transfer status based on user-defined client_order_id or tx_id
returned by the transfer interface

### Parameters

> Example responses

> 200 Response

```json
{
  "tx_id": "59636381286",
  "status": "SUCCESS"
}
```

### Responses

### Response Schema

Status Code **200**

_TransferOrderStatus_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-withdrawal-status) Retrieve withdrawal status

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/withdraw_status'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/withdraw_status"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/withdraw_status`

_Retrieve withdrawal status_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "GT",
    "name": "GateToken",
    "name_cn": "GateToken",
    "deposit": "0",
    "withdraw_percent": "0%",
    "withdraw_fix": "0.01",
    "withdraw_day_limit": "20000",
    "withdraw_day_limit_remain": "20000",
    "withdraw_amount_mini": "0.11",
    "withdraw_eachtime_limit": "20000",
    "withdraw_fix_on_chains": {
      "BTC": "20",
      "ETH": "15",
      "TRX": "0",
      "EOS": "2.5"
    },
    "withdraw_percent_on_chains": {
      "ETH": "0%",
      "GTEVM": "0%"
    }
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-sub-account-balances) Retrieve sub account balances

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_balances'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/sub_account_balances"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/sub_account_balances`

_Retrieve sub account balances_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "uid": "10003",
    "available": {
      "BTC": "0.1",
      "GT": "2000",
      "USDT": "10"
    }
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-accounts-margin-balances) Query sub accounts' margin balances

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_margin_balances'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/sub_account_margin_balances"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/sub_account_margin_balances`

_Query sub accounts' margin balances_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "uid": "10000",
    "available": [
      {
        "locked": false,
        "currency_pair": "BTC_USDT",
        "risk": "9999.99",
        "base": {
          "available": "0.1",
          "borrowed": "0",
          "interest": "0",
          "currency": "BTC",
          "locked": "0"
        },
        "quote": {
          "available": "0",
          "borrowed": "0",
          "interest": "0",
          "currency": "USDT",
          "locked": "0"
        }
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-accounts-futures-account-balances) Query sub accounts' futures account balances

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_futures_balances'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/sub_account_futures_balances"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/sub_account_futures_balances`

_Query sub accounts' futures account balances_

### Parameters

> Example responses

> 200 Response

```json
[
  [
    {
      "available": {
        "btc": {
          "available": "0.0009",
          "bonus": "0",
          "cross_available": "0.0009",
          "cross_initial_margin": "0",
          "cross_maintenance_margin": "0",
          "cross_order_margin": "0",
          "cross_unrealised_pnl": "0",
          "currency": "BTC",
          "enable_credit": false,
          "enable_evolved_classic": true,
          "enable_new_dual_mode": false,
          "history": {
            "bonus_dnw": "0",
            "bonus_offset": "0",
            "cross_settle": "0",
            "dnw": "0.0009",
            "fee": "0",
            "fund": "0",
            "pnl": "0",
            "point_dnw": "0",
            "point_fee": "0",
            "point_refr": "0",
            "refr": "0"
          },
          "in_dual_mode": false,
          "isolated_position_margin": "0",
          "maintenance_margin": "0",
          "margin_mode": 0,
          "margin_mode_name": "classic",
          "order_margin": "0",
          "point": "0",
          "position_initial_margin": "0",
          "position_margin": "0",
          "total": "0.0009",
          "unrealised_pnl": "0",
          "update_id": 11,
          "update_time": 1741766400,
          "user": 10003
        },
        "usd": {},
        "usdt": {
          "available": "500.7",
          "bonus": "0",
          "cross_available": "500.7",
          "cross_initial_margin": "0",
          "cross_maintenance_margin": "0",
          "cross_order_margin": "0",
          "cross_unrealised_pnl": "0",
          "currency": "USDT",
          "enable_credit": true,
          "enable_evolved_classic": true,
          "enable_new_dual_mode": true,
          "history": {
            "bonus_dnw": "0",
            "bonus_offset": "0",
            "cross_settle": "-1.854650083",
            "dnw": "1.89047097",
            "fee": "-0.141010882",
            "fund": "0",
            "pnl": "0.10519",
            "point_dnw": "0",
            "point_fee": "0",
            "point_refr": "0",
            "refr": "0"
          },
          "in_dual_mode": true,
          "isolated_position_margin": "0",
          "maintenance_margin": "0",
          "margin_mode": 1,
          "margin_mode_name": "multi_currency",
          "order_margin": "0",
          "point": "0",
          "position_initial_margin": "0",
          "position_margin": "0",
          "total": "0.000000005",
          "unrealised_pnl": "0",
          "update_id": 37,
          "update_time": 1741766400,
          "user": 10003
        }
      },
      "uid": "10003"
    }
  ]
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-subaccount-s-cross-margin-account-info) Query subaccount's cross_margin account info

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/sub_account_cross_margin_balances'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/sub_account_cross_margin_balances"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/sub_account_cross_margin_balances`

_Query subaccount's cross_margin account info_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "uid": "100000",
    "available": {
      "user_id": 100003,
      "locked": false,
      "total": "20.000000",
      "borrowed": "0.000000",
      "interest": "0",
      "borrowed_net": "0",
      "net": "20",
      "leverage": "3",
      "risk": "9999.99",
      "total_initial_margin": "0.00",
      "total_margin_balance": "20.00",
      "total_maintenance_margin": "0.00",
      "total_initial_margin_rate": "9999.9900",
      "total_maintenance_margin_rate": "9999.9900",
      "total_available_margin": "20.00",
      "balances": {
        "USDT": {
          "available": "20.000000",
          "freeze": "0.000000",
          "borrowed": "0.000000",
          "interest": "0.000000"
        }
      }
    }
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-saved-address) Query saved address

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/saved_address'
query_param = 'currency=USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/saved_address"
query_param="currency=USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/saved_address`

_Query saved address_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "usdt",
    "chain": "TRX",
    "address": "TWYirLzw2RARB2jfeFcfRPmeuU3rC7rakT",
    "name": "gate",
    "tag": "",
    "verified": "1"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-personal-trading-fee) Retrieve personal trading fee

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/fee'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/fee"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/fee`

_Retrieve personal trading fee_

### Parameters

#### [#](#detailed-descriptions) Detailed descriptions

**currency_pair**: Specify a currency pair to retrieve precise fee rate

This field is optional. In most cases, the fee rate is identical among all
currency pairs

**settle**: Specify the settlement currency of the contract to get more accurate
rate settings

This field is optional. Generally, the rate settings for all settlement
currencies are the same.

#### [#](#enumerated-values-2) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user_id": 10001,
  "taker_fee": "0.002",
  "maker_fee": "0.002",
  "futures_taker_fee": "-0.00025",
  "futures_maker_fee": "0.00075",
  "gt_discount": false,
  "gt_taker_fee": "0",
  "gt_maker_fee": "0",
  "loan_fee": "0.18",
  "point_type": "1",
  "delivery_taker_fee": "0.00016",
  "delivery_maker_fee": "-0.00015",
  "debit_fee": 3
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-user-s-total-balances) Retrieve user's total balances

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/total_balance'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/total_balance"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/total_balance`

_Retrieve user's total balances_

This endpoint returns an approximate sum of exchanged amount from all currencies
to input currency for each account.The exchange rate and account balance could
have been cached for at most 1 minute. It is not recommended to use its result
for any trading calculation.

For trading calculation, use the corresponding account query endpoint for each
account type. For example:

- `GET /spot/accounts` to query spot account balance
- `GET /margin/accounts` to query margin account balance
- `GET /futures/{settle}/accounts` to query futures account balance

### Parameters

> Example responses

> 200 Response

```json
{
  "details": {
    "cross_margin": {
      "amount": "0",
      "currency": "USDT"
    },
    "spot": {
      "currency": "USDT",
      "amount": "42264489969935775.5160259954878034182418"
    },
    "finance": {
      "amount": "662714381.70310327810191647181",
      "currency": "USDT"
    },
    "margin": {
      "amount": "1259175.664137668554329559",
      "currency": "USDT",
      "borrowed": "0.00"
    },
    "quant": {
      "amount": "591702859674467879.6488202650892478553852",
      "currency": "USDT"
    },
    "futures": {
      "amount": "2384175.5606114082065",
      "currency": "USDT",
      "unrealised_pnl": "0.00"
    },
    "delivery": {
      "currency": "USDT",
      "amount": "1519804.9756702",
      "unrealised_pnl": "0.00"
    },
    "warrant": {
      "amount": "0",
      "currency": "USDT"
    },
    "cbbc": {
      "currency": "USDT",
      "amount": "0"
    }
  },
  "total": {
    "currency": "USDT",
    "amount": "633967350312281193.068368815439797304437",
    "unrealised_pnl": "0.00",
    "borrowed": "0.00"
  }
}
```

### Responses

### Response Schema

Status Code **200**

_User's balance in all accounts_

#### [#](#enumerated-values-3) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-small-balance) List small balance

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/small_balance'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/small_balance"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/small_balance`

_List small balance_

> Example responses

> 200 Response

```json
[
  [
    {
      "currency": "FLOKI",
      "available_balance": "182.29400000",
      "estimated_as_btc": "0.00000012",
      "convertible_to_gt": "0.001080"
    },
    {
      "currency": "MBLK",
      "available_balance": "0.91723337",
      "estimated_as_btc": "0.00000102",
      "convertible_to_gt": "0.009188"
    }
  ]
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#convert-small-balance) Convert small balance

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/small_balance'
query_param = ''
body='{"currency":["FLOKI","MBLK"],"is_all":true}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/wallet/small_balance"
query_param=""
body_param='{"currency":["FLOKI","MBLK"],"is_all":true}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /wallet/small_balance`

_Convert small balance_

> Body parameter

```json
{
  "currency": ["FLOKI", "MBLK"],
  "is_all": true
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-small-balance-history) List small balance history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/small_balance_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/small_balance_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/small_balance_history`

_List small balance history_

### Parameters

> Example responses

> 200 Response

```json
[
  [
    {
      "id": "28583810",
      "create_time": 1706670777,
      "currency": "FLOKI",
      "amount": "182.29400000",
      "gt_amount": "0.001079"
    }
  ]
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-the-uid-transfer-history) Retrieve the UID transfer history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/wallet/push'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/wallet/push"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /wallet/push`

_Retrieve the UID transfer history_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 111,
    "push_uid": 1132,
    "receive_uid": 12324,
    "currency": "BTC",
    "amount": "1.2",
    "status": "PENDING",
    "create_time": 1706670777,
    "message": "The other party has not completed KYC,There is a security risk in your account, please contact customer service",
    "transaction_type": "withdraw"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#subaccount) SubAccount

Sub-accounts management

## [#](#create-a-new-sub-account) Create a new sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts'
query_param = ''
body='{"remark":"remark","login_name":"sub_account_for_trades"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/sub_accounts"
query_param=""
body_param='{"remark":"remark","login_name":"sub_account_for_trades"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /sub_accounts`

_Create a new sub-account_

> Body parameter

```json
{
  "remark": "remark",
  "login_name": "sub_account_for_trades"
}
```

### Parameters

> Example responses

> 201 Response

```json
{
  "remark": "remark",
  "login_name": "sub_account_for_trades",
  "user_id": 10001,
  "state": 1,
  "create_time": 168888888
}
```

### Responses

### Response Schema

Status Code **201**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-sub-accounts) List sub-accounts

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/sub_accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /sub_accounts`

_List sub-accounts_

### Parameters

#### [#](#detailed-descriptions-2) Detailed descriptions

**type**: `0` to list all types of sub-accounts (currently supporting cross
margin accounts and sub-accounts). `1` to list sub-accounts only. If no
parameter is passed, only sub-accounts will be listed by default.

> Example responses

> 200 Response

```json
[
  {
    "remark": "remark",
    "login_name": "sub_account_for_trades",
    "user_id": 10001,
    "state": 1,
    "create_time": 168888888
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-sub-account) Get the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/sub_accounts/0"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /sub_accounts/{user_id}`

_Get the sub-account_

### Parameters

> Example responses

> 200 Response

```json
{
  "remark": "remark",
  "login_name": "sub_account_for_trades",
  "user_id": 10001,
  "state": 1,
  "create_time": 168888888
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-api-key-of-the-sub-account) Create API Key of the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/keys'
query_param = ''
body='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/sub_accounts/0/keys"
query_param=""
body_param='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /sub_accounts/{user_id}/keys`

_Create API Key of the sub-account_

> Body parameter

```json
{
  "mode": 1,
  "name": "spot",
  "perms": [
    {
      "read_only": false,
      "name": "options"
    },
    {
      "read_only": false,
      "name": "spot"
    },
    {
      "read_only": false,
      "name": "delivery"
    },
    {
      "read_only": false,
      "name": "wallet"
    },
    {
      "read_only": false,
      "name": "futures"
    }
  ],
  "ip_whitelist": ["127.0.0.1", "127.0.0.2"]
}
```

### Parameters

#### [#](#detailed-descriptions-3) Detailed descriptions

**»» name**: Permission function name (no value will be cleared)

- wallet: wallet
- spot: spot/leverage
- futures: perpetual contract
- delivery: delivery contract
- earn: financial management
- custody: custody
- options: options
- account: account information
- loan: loan
- margin: leverage
- unified: unified account
- copy: copy

> Example responses

> 200 Response

```json
{
  "state": 1,
  "name": "spot",
  "user_id": 100000,
  "perms": [
    {
      "name": "options",
      "read_only": false
    },
    {
      "name": "spot",
      "read_only": false
    },
    {
      "name": "delivery",
      "read_only": false
    },
    {
      "name": "wallet",
      "read_only": false
    },
    {
      "name": "futures",
      "read_only": false
    }
  ],
  "ip_whitelist": ["127.0.0.1", "127.0.0.2"],
  "mode": 1,
  "secret": "cddcc6e5e78060e013860bdbe5e737830b96821c027664586fb38b411808f4fd",
  "key": "eb8815bf99d7bb5f8ad6497bdc4774a8",
  "created_at": 1663683330,
  "updated_at": 1663683330
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-api-key-of-the-sub-account) List all API Key of the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/keys'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/sub_accounts/0/keys"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /sub_accounts/{user_id}/keys`

_List all API Key of the sub-account_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "state": 1,
    "name": "spot",
    "user_id": 1000000,
    "perms": [
      {
        "name": "futures",
        "read_only": false
      },
      {
        "name": "wallet",
        "read_only": false
      },
      {
        "name": "delivery",
        "read_only": false
      },
      {
        "name": "options",
        "read_only": false
      },
      {
        "name": "spot",
        "read_only": false
      }
    ],
    "mode": 1,
    "ip_whitelist": ["127.0.0.1", "127.0.0.2"],
    "key": "75c3264105b74693d8cb5c7f1a8e2420",
    "created_at": 1663642892,
    "last_access": 1663642892,
    "update_at": 1663642892
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-api-key-of-the-sub-account) Update API key of the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/keys/string'
query_param = ''
body='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('PUT', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="PUT"
url="/sub_accounts/0/keys/string"
query_param=""
body_param='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`PUT /sub_accounts/{user_id}/keys/{key}`

_Update API key of the sub-account_

> Body parameter

```json
{
  "mode": 1,
  "name": "spot",
  "perms": [
    {
      "read_only": false,
      "name": "options"
    },
    {
      "read_only": false,
      "name": "spot"
    },
    {
      "read_only": false,
      "name": "delivery"
    },
    {
      "read_only": false,
      "name": "wallet"
    },
    {
      "read_only": false,
      "name": "futures"
    }
  ],
  "ip_whitelist": ["127.0.0.1", "127.0.0.2"]
}
```

### Parameters

#### [#](#detailed-descriptions-4) Detailed descriptions

**»» name**: Permission function name (no value will be cleared)

- wallet: wallet
- spot: spot/leverage
- futures: perpetual contract
- delivery: delivery contract
- earn: financial management
- custody: custody
- options: options
- account: account information
- loan: loan
- margin: leverage
- unified: unified account
- copy: copy

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-api-key-of-the-sub-account) Delete API key of the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/keys/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/sub_accounts/0/keys/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /sub_accounts/{user_id}/keys/{key}`

_Delete API key of the sub-account_

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-api-key-of-the-sub-account) Get the API Key of the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/keys/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/sub_accounts/0/keys/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /sub_accounts/{user_id}/keys/{key}`

_Get the API Key of the sub-account_

### Parameters

> Example responses

> 200 Response

```json
{
  "state": 1,
  "name": "spot",
  "user_id": 1000000,
  "perms": [
    {
      "name": "futures",
      "read_only": false
    },
    {
      "name": "wallet",
      "read_only": false
    },
    {
      "name": "delivery",
      "read_only": false
    },
    {
      "name": "options",
      "read_only": false
    },
    {
      "name": "spot",
      "read_only": false
    }
  ],
  "mode": 1,
  "ip_whitelist": ["127.0.0.1", "127.0.0.2"],
  "key": "75c3264105b74693d8cb5c7f1a8e2420",
  "created_at": 1663642892,
  "last_access": 1663642892,
  "update_at": 1663642892
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#lock-the-sub-account) Lock the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/lock'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/sub_accounts/0/lock"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /sub_accounts/{user_id}/lock`

_Lock the sub-account_

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#unlock-the-sub-account) Unlock the sub-account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/0/unlock'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/sub_accounts/0/unlock"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /sub_accounts/{user_id}/unlock`

_Unlock the sub-account_

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-sub-account-mode) Get sub-account mode

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/sub_accounts/unified_mode'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/sub_accounts/unified_mode"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /sub_accounts/unified_mode`

_Get sub-account mode_

Unified account mode：

- `classic`: Classic account mode
- `multi_currency`: Multi-currency margin mode
- `portfolio`: Portfolio margin mode

> Example responses

> 200 Response

```json
[
  {
    "user_id": 110285555,
    "is_unified": true,
    "mode": "multi_currency"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#unified) Unified

Unified account

## [#](#get-unified-account-information) Get unified account information

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/accounts`

_Get unified account information_

The assets of each currency in the account will be adjusted according to their
liquidity, defined by corresponding adjustment coefficients, and then uniformly
converted to USD to calculate the total asset value and position value of the
account.

You can refer to the [Formula](#portfolio-account) in the documentation

### Parameters

> Example responses

> 200 Response

```json
{
  "user_id": 10001,
  "locked": false,
  "balances": {
    "ETH": {
      "available": "0",
      "freeze": "0",
      "borrowed": "0.075393666654",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "1016.1",
      "total_freeze": "0",
      "total_liab": "0",
      "spot_in_use": "1.111"
    },
    "POINT": {
      "available": "9999999999.017023138734",
      "freeze": "0",
      "borrowed": "0",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "12016.1",
      "total_freeze": "0",
      "total_liab": "0",
      "spot_in_use": "12"
    },
    "USDT": {
      "available": "0.00000062023",
      "freeze": "0",
      "borrowed": "0",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "16.1",
      "total_freeze": "0",
      "total_liab": "0",
      "spot_in_use": "12"
    }
  },
  "total": "230.94621713",
  "borrowed": "161.66395521",
  "total_initial_margin": "1025.0524665088",
  "total_margin_balance": "3382495.944473949183",
  "total_maintenance_margin": "205.01049330176",
  "total_initial_margin_rate": "3299.827135672679",
  "total_maintenance_margin_rate": "16499.135678363399",
  "total_available_margin": "3381470.892007440383",
  "unified_account_total": "3381470.892007440383",
  "unified_account_total_liab": "0",
  "unified_account_total_equity": "100016.1",
  "leverage": "2",
  "spot_order_loss": "12",
  "spot_hedge": false
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-about-the-maximum-borrowing-for-the-unified-account) Query about the maximum borrowing for the unified account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/borrowable'
query_param = 'currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/borrowable"
query_param="currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/borrowable`

_Query about the maximum borrowing for the unified account_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

### Response Schema

Status Code **200**

_UnifiedBorrowable_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-about-the-maximum-transferable-for-the-unified-account) Query about the maximum transferable for the unified account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/transferable'
query_param = 'currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/transferable"
query_param="currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/transferable`

_Query about the maximum transferable for the unified account_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

### Response Schema

Status Code **200**

_UnifiedTransferable_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-query-can-be-transferred-out-at-most-for-unified-accounts-each-currency-is-the-maximum-value-after-the-user-withdraws-the-currency-the-amount-of-transferable-currency-will-be-changed) Batch query can be transferred out at most for unified accounts; each currency is the maximum value. After the user withdraws the currency, the amount of transferable currency will be changed.

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/transferables'
query_param = 'currencies=BTC,ETH'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/transferables"
query_param="currencies=BTC,ETH"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/transferables`

_Batch query can be transferred out at most for unified accounts; each currency
is the maximum value. After the user withdraws the currency, the amount of
transferable currency will be changed._

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "amount": "123456"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay) Borrow or repay

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/loans'
query_param = ''
body='{"currency":"BTC","amount":"0.1","type":"borrow","repaid_all":false,"text":"t-test"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/unified/loans"
query_param=""
body_param='{"currency":"BTC","amount":"0.1","type":"borrow","repaid_all":false,"text":"t-test"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /unified/loans`

_Borrow or repay_

When borrowing, it is essential to ensure that the borrowed amount is not below
the minimum borrowing threshold for the specific cryptocurrency and does not
exceed the maximum borrowing limit set by the platform and the user.

The interest on the loan will be automatically deducted from the account at
regular intervals. It is the user's responsibility to manage the repayment of
the borrowed amount.

For repayment, the option to repay the entire borrowed amount is available by
setting the parameter `repaid_all=true`

> Body parameter

```json
{
  "currency": "BTC",
  "amount": "0.1",
  "type": "borrow",
  "repaid_all": false,
  "text": "t-test"
}
```

### Parameters

#### [#](#enumerated-values-4) Enumerated Values

> Example responses

> 200 Response

```json
{
  "tran_id": 9527
}
```

### Responses

### Response Schema

Status Code **200**

_Unified account loan and repayment response results_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-loans) List loans

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/loans'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/loans"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/loans`

_List loans_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "USDT",
    "currency_pari": "GT_USDT",
    "amount": "1",
    "type": "margin",
    "change_time": 1673247054000,
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-load-records) Get load records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/loan_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/loan_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/loan_records`

_Get load records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 16442,
    "type": "borrow",
    "margin_mode": "cross",
    "currency_pair": "AE_USDT",
    "currency": "USDT",
    "amount": "1000",
    "create_time": 1673247054000,
    "repayment_type": "auto_repay"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records) List interest records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/interest_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/interest_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/interest_records`

_List interest records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "status": 1,
    "currency_pair": "BTC_USDT",
    "currency": "USDT",
    "actual_rate": "0.00000236",
    "interest": "0.00006136",
    "type": "platform",
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-risk-unit-details) Get user risk unit details

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/risk_units'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/risk_units"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/risk_units`

_Get user risk unit details_

Retrieve user risk unit details, only valid in portfolio margin mode

> Example responses

> 200 Response

```json
{
  "user_id": 0,
  "spot_hedge": true,
  "risk_units": [
    {
      "symbol": "BTC",
      "spot_in_use": "-13500.000001223",
      "maintain_margin": "2334.002",
      "initial_margin": "2334.002",
      "delta": "0.22",
      "gamma": "0.42",
      "theta": "0.29",
      "vega": "0.22"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-mode-of-the-unified-account) Set mode of the unified account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/unified_mode'
query_param = ''
body='{"mode":"portfolio","settings":{"spot_hedge":true,"usdt_futures":true,"options":true}}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('PUT', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="PUT"
url="/unified/unified_mode"
query_param=""
body_param='{"mode":"portfolio","settings":{"spot_hedge":true,"usdt_futures":true,"options":true}}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`PUT /unified/unified_mode`

_Set mode of the unified account_

Switching each account mode only requires passing the parameters of the
corresponding account mode, and supports turning on or off the configuration
switch in the corresponding account mode when switching the account mode

- When opening the classic account mode, mode=classic

```text
PUT /unified/unified_mode
 {
 "mode": "classic"
 }
```

- Open the cross-currency margin mode, mode=multi_currency

```text
PUT /unified/unified_mode
 {
 "mode": "multi_currency",
 "settings": {
 "usdt_futures": true
 }
 }
```

- When the portfolio margin mode is enabled, mode=portfolio

```text
PUT /unified/unified_mode
 {
 "mode": "portfolio",
 "settings": {
 "spot_hedge": true
 }
 }
```

- When opening a single currency margin mode, mode=single_currency

```text
PUT /unified/unified_mode
 {
 "mode": "single_currency"
 }
```

> Body parameter

```json
{
  "mode": "portfolio",
  "settings": {
    "spot_hedge": true,
    "usdt_futures": true,
    "options": true
  }
}
```

### Parameters

#### [#](#detailed-descriptions-5) Detailed descriptions

**» mode**: Unified account mode:

- `classic`: Classic account mode
- `multi_currency`: Multi-currency margin mode
- `portfolio`: Portfolio margin mode
- `single_currency`: Single Currency Margin Model

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-mode-of-the-unified-account) Query mode of the unified account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/unified_mode'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/unified_mode"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/unified_mode`

_Query mode of the unified account_

Unified account mode:

- `classic`: Classic account mode
- `multi_currency`: Cross-currency margin mode
- `portfolio`: Portfolio margin mode
- `single_currency`: Single-currency margin mode

> Example responses

> 200 Response

```json
{
  "mode": "portfolio",
  "settings": {
    "spot_hedge": true,
    "usdt_futures": true,
    "options": true
  }
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-unified-estimate-rate) Get unified estimate rate

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/estimate_rate'
query_param = 'currencies=BTC,GT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/estimate_rate"
query_param="currencies=BTC,GT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/estimate_rate`

_Get unified estimate rate_

Due to fluctuations in lending depth, hourly interest rates may vary, and thus,
I cannot provide exact rates. When a currency is not supported, the interest
rate returned will be an empty string.

### Parameters

> Example responses

> 200 Response

```json
{
  "BTC": "0.000002",
  "GT": "0.000001",
  "ETH": ""
}
```

### Responses

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-currency-discount-tiers) List currency discount tiers

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/currency_discount_tiers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/unified/currency_discount_tiers \
  -H 'Accept: application/json'
```

`GET /unified/currency_discount_tiers`

_List currency discount tiers_

> Example responses

> 200 Response

```json
[
  [
    {
      "currency": "USDT",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "1",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    },
    {
      "currency": "USDC",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "1",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "10000000"
        },
        {
          "tier": "2",
          "discount": "0.98",
          "lower_limit": "10000000",
          "leverage": "10",
          "upper_limit": "15000000"
        },
        {
          "tier": "3",
          "discount": "0.95",
          "lower_limit": "15000000",
          "leverage": "10",
          "upper_limit": "20000000"
        },
        {
          "tier": "4",
          "discount": "0.925",
          "lower_limit": "20000000",
          "leverage": "10",
          "upper_limit": "50000000"
        },
        {
          "tier": "5",
          "discount": "0.9",
          "lower_limit": "50000000",
          "leverage": "10",
          "upper_limit": "100000000"
        },
        {
          "tier": "6",
          "discount": "0",
          "lower_limit": "100000000",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    },
    {
      "currency": "BTC",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "0.98",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "1000"
        },
        {
          "tier": "2",
          "discount": "0.95",
          "lower_limit": "1000",
          "leverage": "10",
          "upper_limit": "10000"
        },
        {
          "tier": "3",
          "discount": "0.9",
          "lower_limit": "10000",
          "leverage": "10",
          "upper_limit": "50000"
        },
        {
          "tier": "4",
          "discount": "0.85",
          "lower_limit": "50000",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    },
    {
      "currency": "ETH",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "0.98",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "1000"
        },
        {
          "tier": "2",
          "discount": "0.95",
          "lower_limit": "1000",
          "leverage": "10",
          "upper_limit": "10000"
        },
        {
          "tier": "3",
          "discount": "0.9",
          "lower_limit": "10000",
          "leverage": "10",
          "upper_limit": "50000"
        },
        {
          "tier": "4",
          "discount": "0.85",
          "lower_limit": "50000",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    }
  ]
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-loan-margin-tiers) List loan margin tiers

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/loan_margin_tiers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/unified/loan_margin_tiers \
  -H 'Accept: application/json'
```

`GET /unified/loan_margin_tiers`

_List loan margin tiers_

> Example responses

> 200 Response

```json
[
  {
    "currency": "USDT",
    "margin_tiers": [
      {
        "tier": "1",
        "margin_rate": "0.02",
        "lower_limit": "200000",
        "upper_limit": "400000",
        "leverage": "3"
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#portfolio-margin-calculator) Portfolio margin calculator

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/portfolio_calculator'
query_param = ''
body='{"spot_balances":[{"currency":"BTC","equity":"-1","freeze":"10"}],"spot_orders":[{"currency_pairs":"BTC_USDT","order_price":"344","size":"100","left":"100","type":"sell"}],"futures_positions":[{"contract":"BTC_USDT","size":"100"}],"futures_orders":[{"contract":"BTC_USDT","size":"10","left":"8"}],"options_positions":[{"options_name":"BTC_USDT-20240329-32000-C","size":"10"}],"options_orders":[{"options_name":"BTC_USDT-20240329-32000-C","size":"100","left":"80"}],"spot_hedge":false}'
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
curl -X POST https://api.gateio.ws/api/v4/unified/portfolio_calculator \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json'
```

`POST /unified/portfolio_calculator`

_Portfolio margin calculator_

Portfolio Margin Calculator When inputting a simulated position portfolio, each
position includes the position name and quantity held, supporting markets within
the range of BTC and ETH perpetual contracts, options, and spot markets. When
inputting simulated orders, each order includes the market identifier, order
price, and order quantity, supporting markets within the range of BTC and ETH
perpetual contracts, options, and spot markets. Market orders are not included.

> Body parameter

```json
{
  "spot_balances": [
    {
      "currency": "BTC",
      "equity": "-1",
      "freeze": "10"
    }
  ],
  "spot_orders": [
    {
      "currency_pairs": "BTC_USDT",
      "order_price": "344",
      "size": "100",
      "left": "100",
      "type": "sell"
    }
  ],
  "futures_positions": [
    {
      "contract": "BTC_USDT",
      "size": "100"
    }
  ],
  "futures_orders": [
    {
      "contract": "BTC_USDT",
      "size": "10",
      "left": "8"
    }
  ],
  "options_positions": [
    {
      "options_name": "BTC_USDT-20240329-32000-C",
      "size": "10"
    }
  ],
  "options_orders": [
    {
      "options_name": "BTC_USDT-20240329-32000-C",
      "size": "100",
      "left": "80"
    }
  ],
  "spot_hedge": false
}
```

### Parameters

#### [#](#detailed-descriptions-6) Detailed descriptions

**»»» equity**: Currency equity, where equity = balance - borrowed, represents
the net delta exposure of your spot positions, which can be negative. Currently
only supports three currencies: BTC, ETH.

**»»»» count**: Initial order quantity for spot trading pairs, not involved in
actual calculation. Currently only supports three currencies: BTC, ETH.

> Example responses

> 200 Response

```json
{
  "maintain_margin_total": "0.000000000000",
  "initial_margin_total": "0.000000000000",
  "calculate_time": "1709014486",
  "risk_unit": [
    {
      "symbol": "BTC",
      "margin_result": [
        {
          "type": "original_position",
          "profit_loss_ranges": [
            {
              "price_percentage": "-0.200000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.160000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.120000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.080000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.040000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.000000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.040000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.080000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.120000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.160000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.200000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            }
          ],
          "max_loss": {
            "price_percentage": "-0.200000000000",
            "implied_volatility_percentage": "-0.300000000000",
            "profit_loss": "0.000000000000"
          },
          "mr1": "0.000000000000",
          "mr2": "0.000000000000",
          "mr3": "0.000000000000",
          "mr4": "0.000000000000"
        }
      ],
      "maintain_margin": "0.000000000000",
      "initial_margin": "0.000000000000"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

_The output of the portfolio margin calculator._

This operation does not require authentication

## [#](#minimum-currency-leverage-that-can-be-set) Minimum currency leverage that can be set

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/leverage/user_currency_config'
query_param = 'currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/leverage/user_currency_config"
query_param="currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/leverage/user_currency_config`

_Minimum currency leverage that can be set_

### Parameters

> Example responses

> 200 Response

```json
{
  "current_leverage": "2",
  "min_leverage": "0",
  "max_leverage": "0",
  "debit": "0",
  "available_margin": "0",
  "borrowable": "0",
  "except_leverage_borrowable": "0"
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-leverage-multiple-of-the-user-currency) Get the leverage multiple of the user currency

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/leverage/user_currency_setting'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/leverage/user_currency_setting"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/leverage/user_currency_setting`

_Get the leverage multiple of the user currency_

Get the user's currency leverage. If currency is not passed, query all
currencies.

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "BTC",
  "leverage": "3"
}
```

### Responses

### Response Schema

Status Code **200**

_Loan currency leverage_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-the-loan-currency-leverage) Set the loan currency leverage

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/leverage/user_currency_setting'
query_param = ''
body='{"currency":"BTC","leverage":"3"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/unified/leverage/user_currency_setting"
query_param=""
body_param='{"currency":"BTC","leverage":"3"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /unified/leverage/user_currency_setting`

_Set the loan currency leverage_

> Body parameter

```json
{
  "currency": "BTC",
  "leverage": "3"
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-of-loan-currencies-supported-by-unified-account) List of loan currencies supported by unified account

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/currencies'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/unified/currencies \
  -H 'Accept: application/json'
```

`GET /unified/currencies`

_List of loan currencies supported by unified account_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC",
    "prec": "0.000001",
    "min_borrow_amount": "0.01",
    "user_max_borrow_amount": "1000000",
    "total_max_borrow_amount": "1000000",
    "loan_status": "enable"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-historical-lending-rates) get historical lending rates

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/unified/history_loan_rate'
query_param = 'currency=USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/unified/history_loan_rate"
query_param="currency=USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /unified/history_loan_rate`

_get historical lending rates_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "USDT",
  "tier": "1",
  "tier_up_rate": "1.18",
  "rates": [
    {
      "time": 1729047616000,
      "rate": "0.00010287"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#spot) Spot

Spot trading

## [#](#list-all-currencies-details) List all currencies' details

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/currencies'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/currencies \
  -H 'Accept: application/json'
```

`GET /spot/currencies`

_List all currencies' details_

When a currency corresponds to multiple chains, you can query the information of
multiple chains through the `chains` field, such as the charging and recharge
status, identification, etc. of the chain.

> Example responses

> 200 Response

```json
[
  {
    "currency": "GT",
    "name": "GateToken",
    "delisted": false,
    "withdraw_disabled": false,
    "withdraw_delayed": false,
    "deposit_disabled": false,
    "trade_disabled": false,
    "chain": "GT",
    "chains": [
      {
        "name": "GT",
        "addr": "",
        "withdraw_disabled": false,
        "withdraw_delayed": false,
        "deposit_disabled": false
      },
      {
        "name": "ETH",
        "withdraw_disabled": false,
        "withdraw_delayed": false,
        "deposit_disabled": false,
        "addr": "0xE66747a101bFF2dBA3697199DCcE5b743b454759"
      },
      {
        "name": "GTEVM",
        "withdraw_disabled": false,
        "withdraw_delayed": false,
        "deposit_disabled": false,
        "addr": ""
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-details-of-a-specific-currency) Get details of a specific currency

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/currencies/GT'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/currencies/GT \
  -H 'Accept: application/json'
```

`GET /spot/currencies/{currency}`

_Get details of a specific currency_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "GT",
  "name": "GateToken",
  "delisted": false,
  "withdraw_disabled": false,
  "withdraw_delayed": false,
  "deposit_disabled": false,
  "trade_disabled": false,
  "chain": "GT",
  "chains": [
    {
      "name": "GT",
      "addr": "",
      "withdraw_disabled": false,
      "withdraw_delayed": false,
      "deposit_disabled": false
    },
    {
      "name": "ETH",
      "withdraw_disabled": false,
      "withdraw_delayed": false,
      "deposit_disabled": false,
      "addr": "0xE66747a101bFF2dBA3697199DCcE5b743b454759"
    },
    {
      "name": "GTEVM",
      "withdraw_disabled": false,
      "withdraw_delayed": false,
      "deposit_disabled": false,
      "addr": ""
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-all-currency-pairs-supported) List all currency pairs supported

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/currency_pairs'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/currency_pairs \
  -H 'Accept: application/json'
```

`GET /spot/currency_pairs`

_List all currency pairs supported_

> Example responses

> 200 Response

```json
[
  {
    "id": "ETH_USDT",
    "base": "ETH",
    "base_name": "Ethereum",
    "quote": "USDT",
    "quote_name": "Tether",
    "fee": "0.2",
    "min_base_amount": "0.001",
    "min_quote_amount": "1.0",
    "max_base_amount": "10000",
    "max_quote_amount": "10000000",
    "amount_precision": 3,
    "precision": 6,
    "trade_status": "tradable",
    "sell_start": 1516378650,
    "buy_start": 1516378650
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-5) Enumerated Values

This operation does not require authentication

## [#](#get-details-of-a-specifc-currency-pair) Get details of a specifc currency pair

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/currency_pairs/ETH_BTC'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/currency_pairs/ETH_BTC \
  -H 'Accept: application/json'
```

`GET /spot/currency_pairs/{currency_pair}`

_Get details of a specifc currency pair_

### Parameters

> Example responses

> 200 Response

```json
{
  "id": "ETH_USDT",
  "base": "ETH",
  "base_name": "Ethereum",
  "quote": "USDT",
  "quote_name": "Tether",
  "fee": "0.2",
  "min_base_amount": "0.001",
  "min_quote_amount": "1.0",
  "max_base_amount": "10000",
  "max_quote_amount": "10000000",
  "amount_precision": 3,
  "precision": 6,
  "trade_status": "tradable",
  "sell_start": 1516378650,
  "buy_start": 1516378650
}
```

### Responses

### Response Schema

Status Code **200**

_Spot currency pair_

#### [#](#enumerated-values-6) Enumerated Values

This operation does not require authentication

## [#](#retrieve-ticker-information) Retrieve ticker information

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/tickers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/tickers \
  -H 'Accept: application/json'
```

`GET /spot/tickers`

_Retrieve ticker information_

Return only related data if `currency_pair` is specified; otherwise return all
of them

### Parameters

#### [#](#enumerated-values-7) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC3L_USDT",
    "last": "2.46140352",
    "lowest_ask": "2.477",
    "highest_bid": "2.4606821",
    "change_percentage": "-8.91",
    "change_utc0": "-8.91",
    "change_utc8": "-8.91",
    "base_volume": "656614.0845820589",
    "quote_volume": "1602221.66468375534639404191",
    "high_24h": "2.7431",
    "low_24h": "1.9863",
    "etf_net_value": "2.46316141",
    "etf_pre_net_value": "2.43201848",
    "etf_pre_timestamp": 1611244800,
    "etf_leverage": "2.2803019447281203"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#retrieve-order-book) Retrieve order book

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/order_book'
query_param = 'currency_pair=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/order_book?currency_pair=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /spot/order_book`

_Retrieve order book_

Order book will be sorted by price from high to low on bids; low to high on asks

### Parameters

> Example responses

> 200 Response

```json
{
  "id": 123456,
  "current": 1623898993123,
  "update": 1623898993121,
  "asks": [
    ["1.52", "1.151"],
    ["1.53", "1.218"]
  ],
  "bids": [
    ["1.17", "201.863"],
    ["1.16", "725.464"]
  ]
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#retrieve-market-trades) Retrieve market trades

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/trades'
query_param = 'currency_pair=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/trades?currency_pair=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /spot/trades`

_Retrieve market trades_

Supports `from` and `to` by time range query or page-turn query based on
`last_id`. By default, query by time range is the last 30 days.

The query method based on `last_id` page turn is no longer recommended. If
`last_id` is specified, the time range query parameters will be ignored.

The maximum number of pages when searching data using limit&page paging function
is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

#### [#](#detailed-descriptions-7) Detailed descriptions

**reverse**: Whether the id of records to be retrieved should be less than the
last_id specified. Default to false.

When `last_id` is specified. Set `reverse` to `true` to trace back trading
history; `false` to retrieve latest tradings.

No effect if `last_id` is not specified.

> Example responses

> 200 Response

```json
[
  {
    "id": "1232893232",
    "create_time": "1548000000",
    "create_time_ms": "1548000000123.456",
    "order_id": "4128442423",
    "side": "buy",
    "role": "maker",
    "amount": "0.15",
    "price": "0.03",
    "fee": "0.0005",
    "fee_currency": "ETH",
    "point_fee": "0",
    "gt_fee": "0",
    "sequence_id": "588018",
    "text": "t-test"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-8) Enumerated Values

This operation does not require authentication

## [#](#market-candlesticks) Market candlesticks

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/candlesticks'
query_param = 'currency_pair=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/candlesticks?currency_pair=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /spot/candlesticks`

_Market candlesticks_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the
limit when specifying from, to and interval

### Parameters

#### [#](#enumerated-values-9) Enumerated Values

> Example responses

> 200 Response

```json
[
  [
    "1539852480",
    "971519.677",
    "0.0021724",
    "0.0021922",
    "0.0021724",
    "0.0021737",
    "true"
  ]
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#query-user-trading-fee-rates) Query user trading fee rates

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/fee'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/fee"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/fee`

_Query user trading fee rates_

This API is deprecated in favour of new fee retrieving API `/wallet/fee`.

### Parameters

#### [#](#detailed-descriptions-8) Detailed descriptions

**currency_pair**: Specify a currency pair to retrieve precise fee rate

This field is optional. In most cases, the fee rate is identical among all
currency pairs

> Example responses

> 200 Response

```json
{
  "user_id": 10001,
  "taker_fee": "0.002",
  "maker_fee": "0.002",
  "gt_discount": false,
  "gt_taker_fee": "0",
  "gt_maker_fee": "0",
  "loan_fee": "0.18",
  "point_type": "1",
  "currency_pair": "BTC_USDT",
  "debit_fee": 3
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-a-batch-of-user-trading-fee-rates) Query a batch of user trading fee rates

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/batch_fee'
query_param = 'currency_pairs=BTC_USDT,ETH_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/batch_fee"
query_param="currency_pairs=BTC_USDT,ETH_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/batch_fee`

_Query a batch of user trading fee rates_

### Parameters

> Example responses

> 200 Response

```json
{
  "BTC_USDT": {
    "user_id": 10001,
    "taker_fee": "0.002",
    "maker_fee": "0.002",
    "gt_discount": false,
    "gt_taker_fee": "0",
    "gt_maker_fee": "0",
    "loan_fee": "0.18",
    "point_type": "1",
    "currency_pair": "BTC_USDT",
    "debit_fee": 3
  },
  "GT_USDT": {
    "user_id": 10001,
    "taker_fee": "0.002",
    "maker_fee": "0.002",
    "gt_discount": false,
    "gt_taker_fee": "0",
    "gt_maker_fee": "0",
    "loan_fee": "0.18",
    "point_type": "1",
    "currency_pair": "GT_USDT",
    "debit_fee": 3
  },
  "ETH_USDT": {
    "user_id": 10001,
    "taker_fee": "0.002",
    "maker_fee": "0.002",
    "gt_discount": false,
    "gt_taker_fee": "0",
    "gt_maker_fee": "0",
    "loan_fee": "0.18",
    "point_type": "1",
    "currency_pair": "ETH_USDT",
    "debit_fee": 3
  }
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-spot-accounts) List spot accounts

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/accounts`

_List spot accounts_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "ETH",
    "available": "968.8",
    "locked": "0",
    "update_id": 98
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book) Query account book

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/account_book'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/account_book"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/account_book`

_Query account book_

Record query time range is not allowed to exceed 30 days.

The maximum number of pages when searching data using limit&page paging function
is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "123456",
    "time": 1547633726123,
    "currency": "BTC",
    "change": "1.03",
    "balance": "4.59316525194",
    "type": "margin_in",
    "text": "3815099"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-batch-of-orders) Create a batch of orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/batch_orders'
query_param = ''
body='[{"text":"t-abc123","currency_pair":"BTC_USDT","type":"limit","account":"unified","side":"buy","amount":"0.001","price":"65000","time_in_force":"gtc","iceberg":"0"}]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/batch_orders"
query_param=""
body_param='[{"text":"t-abc123","currency_pair":"BTC_USDT","type":"limit","account":"unified","side":"buy","amount":"0.001","price":"65000","time_in_force":"gtc","iceberg":"0"}]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/batch_orders`

_Create a batch of orders_

Batch orders requirements:

1.  custom order field `text` is required
2.  At most 4 currency pairs, maximum 10 orders each, are allowed in one request
3.  No mixture of spot orders and margin orders, i.e. `account` must be
    identical for all orders

> Body parameter

```json
[
  {
    "text": "t-abc123",
    "currency_pair": "BTC_USDT",
    "type": "limit",
    "account": "unified",
    "side": "buy",
    "amount": "0.001",
    "price": "65000",
    "time_in_force": "gtc",
    "iceberg": "0"
  }
]
```

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": "12332324",
    "amend_text": "t-123456",
    "text": "t-123456",
    "succeeded": true,
    "label": "",
    "message": "",
    "id": "12332324",
    "create_time": "1548000000",
    "update_time": "1548000100",
    "create_time_ms": 1548000000123,
    "update_time_ms": 1548000100123,
    "currency_pair": "ETC_BTC",
    "status": "cancelled",
    "type": "limit",
    "account": "spot",
    "side": "buy",
    "amount": "1",
    "price": "5.00032",
    "time_in_force": "gtc",
    "iceberg": "0",
    "left": "0.5",
    "filled_amount": "1.242",
    "filled_total": "2.50016",
    "avg_deal_price": "5.00032",
    "fee": "0.005",
    "fee_currency": "ETH",
    "point_fee": "0",
    "gt_fee": "0",
    "gt_discount": false,
    "rebated_fee": "0",
    "rebated_fee_currency": "BTC",
    "stp_act": "cn",
    "finish_as": "stp",
    "stp_id": 10240
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-10) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-open-orders) List all open orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/open_orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/open_orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/open_orders`

_List all open orders_

Query the current order list of all trading pairs. Please note that the paging
parameter controls the number of pending orders in each trading pair. There is
no paging control for the number of trading pairs. All trading pairs with
pending orders will be returned.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "ETH_BTC",
    "total": 1,
    "orders": [
      {
        "id": "12332324",
        "text": "t-123456",
        "create_time": "1548000000",
        "update_time": "1548000100",
        "currency_pair": "ETH_BTC",
        "status": "open",
        "type": "limit",
        "account": "spot",
        "side": "buy",
        "amount": "1",
        "price": "5.00032",
        "time_in_force": "gtc",
        "left": "0.5",
        "filled_total": "2.50016",
        "fee": "0.005",
        "fee_currency": "ETH",
        "point_fee": "0",
        "gt_fee": "0",
        "gt_discount": false,
        "rebated_fee": "0",
        "rebated_fee_currency": "BTC"
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-11) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#close-position-when-cross-currency-is-disabled) close position when cross-currency is disabled

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/cross_liquidate_orders'
query_param = ''
body='{"currency_pair":"GT_USDT","amount":"12","price":"10.15","text":"t-34535"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/cross_liquidate_orders"
query_param=""
body_param='{"currency_pair":"GT_USDT","amount":"12","price":"10.15","text":"t-34535"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/cross_liquidate_orders`

_close position when cross-currency is disabled_

Currently, only cross-margin accounts are supported to close position when cross
currencies are disabled. Maximum buy quantity = (unpaid principal and interest -
currency balance - the amount of the currency in the order book) / 0.998

> Body parameter

```json
{
  "currency_pair": "GT_USDT",
  "amount": "12",
  "price": "10.15",
  "text": "t-34535"
}
```

### Parameters

#### [#](#detailed-descriptions-9) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

**» action_mode**: Processing Mode:

Different fields are returned when placing an order based on action_mode. This
field is only valid during the request, and it is not included in the response
result ACK: Asynchronous mode, only returns key order fields RESULT: No clearing
information FULL: Full mode (default)

> Example responses

> 201 Response

```json
{
  "id": "1852454420",
  "text": "t-abc123",
  "amend_text": "-",
  "create_time": "1710488334",
  "update_time": "1710488334",
  "create_time_ms": 1710488334073,
  "update_time_ms": 1710488334074,
  "status": "closed",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0",
  "left": "0",
  "filled_amount": "0.001",
  "fill_price": "63.4693",
  "filled_total": "63.4693",
  "avg_deal_price": "63469.3",
  "fee": "0.00000022",
  "fee_currency": "BTC",
  "point_fee": "0",
  "gt_fee": "0",
  "gt_maker_fee": "0",
  "gt_taker_fee": "0",
  "gt_discount": false,
  "rebated_fee": "0",
  "rebated_fee_currency": "USDT",
  "finish_as": "filled"
}
```

### Responses

### Response Schema

Status Code **201**

_Spot order details_

#### [#](#enumerated-values-12) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-order) Create an order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/orders'
query_param = ''
body='{"text":"t-abc123","currency_pair":"BTC_USDT","type":"limit","account":"unified","side":"buy","amount":"0.001","price":"65000","time_in_force":"gtc","iceberg":"0"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/orders"
query_param=""
body_param='{"text":"t-abc123","currency_pair":"BTC_USDT","type":"limit","account":"unified","side":"buy","amount":"0.001","price":"65000","time_in_force":"gtc","iceberg":"0"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/orders`

_Create an order_

Support spot, margin, leverage, and full-position leverage orders. Use different
accounts through the `account` field, default is `spot`, that is, use the spot
account to place an order if the user is `unified` account, default is to place
an order with a unified account

When using leveraged account trading, that is, when `account` is set to
`margin`, you can set `auto_borrow` to `true`, In the case of insufficient
account balance, the system will automatically execute the
`POST /margin/uni/loans` to borrow the insufficient part. Whether the assets
obtained after the leveraged order is automatically used to return the borrowing
orders of the leveraged account in a position-by-store leverage account depends
on the automatic repayment settings of the user's position-by-store leverage
account\*\*, The account automatic repayment settings can be queried and set
through `/margin/auto_repay`.

Use unified account transactions, that is, when `account` is set to `unified`,
`auto_borrow` " can also be enableTo realize the insufficient part of automatic
borrowing, but unlike the leverage account, whether the entrustment of a unified
account is automatically repayable depends on the when placing an
order`auto_repay` setting, this setting is only effective for the current
entrustment, that is, only the assets obtained after the entrustment transaction
will be used to repay the borrowing orders of the full-position leverage
account. Unified account ordering currently supports `auto_borrow` and
`auto_repay` at the same time.

Auto repayment will be triggered at the end of the order, i.e. `status` is
`cancelled` or `closed` .

**Delegation Status**

The entrustment status in the pending order is `open`, which remains at `open`
until all the quantity is traded. If it is eaten, the order ends and the status
becomes `closed`. If the order is cancelled before all transactions are
completed, regardless of whether there are partial transactions, the status will
become `cancelled`

**Iceberg Entrustment**

`iceberg` is used to set the number of iceberg delegations displayed, and does
not support complete hiding. Note that when hidden part of the transaction is
charged according to the taker's handling rate.

**Restrict user transactions**

Set `stp_act` to decide to use strategies that limit user transactions

> Body parameter

```json
{
  "text": "t-abc123",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0"
}
```

### Parameters

#### [#](#detailed-descriptions-10) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

Besides user defined information, reserved contents are listed below, denoting
how the order is created:

- 101: from android
- 102: from IOS
- 103: from IPAD
- 104: from webapp
- 3: from web
- 2: from apiv2
- apiv4: from apiv4

**» type**: Order Type

- limit : Limit Order
- market : Market Order

**» amount**: When `type` is limit, it refers to base currency. For instance,
`BTC_USDT` means `BTC` When `type` is `market`, it refers to different currency
according to `side`

- `side` : `buy` means quote currency, `BTC_USDT` means `USDT`
- `side` : `sell` means base currency，`BTC_USDT` means `BTC`

**» time_in_force**: Time in force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee
- fok: FillOrKill, fill either completely or none Only `ioc` and `fok` are
  supported when `type`\=`market`

**» auto_repay**: Enable or disable automatic repayment for automatic borrow
loan generated by cross margin order. Default is disabled. Note that:

1.  This field is only effective for cross margin orders. Margin account does
    not support setting auto repayment for orders.
2.  `auto_borrow` and `auto_repay` can be both set to true in one order.

**» stp_act**: Self-Trading Prevention Action. Users can use this field to set
self-trade prevetion strategies

1.  After users join the `STP Group`, he can pass `stp_act` to limit the user's
    self-trade prevetion strategy. If `stp_act` is not passed, the default is
    `cn` strategy。
2.  When the user does not join the `STP group`, an error will be returned when
    passing the `stp_act` parameter。
3.  If the user did not use 'stp_act' when placing the order, 'stp_act' will
    return '-'

- cn: Cancel newest, Cancel new orders and keep old ones
- co: Cancel oldest, Cancel old orders and keep new ones
- cb: Cancel both, Both old and new orders will be cancelled

**» action_mode**: Processing Mode: When placing an order, different fields are
returned based on action_mode. This field is only valid during the request and
is not included in the response result ACK: Asynchronous mode, only returns key
order fields RESULT: No clearing information FULL: Full mode (default)

#### [#](#enumerated-values-13) Enumerated Values

> Example responses

> ACK response body example

```json
{
  "id": "12332324",
  "text": "t-123456",
  "amend_text": "test2"
}
```

> RESULT response body example

```json
{
  "id": "12332324",
  "text": "t-123456",
  "create_time": "1548000000",
  "update_time": "1548000100",
  "create_time_ms": 1548000000123,
  "update_time_ms": 1548000100123,
  "currency_pair": "ETH_BTC",
  "status": "cancelled",
  "type": "limit",
  "account": "spot",
  "side": "buy",
  "iceberg": "0",
  "amount": "1",
  "price": "5.00032",
  "time_in_force": "gtc",
  "auto_borrow": false,
  "left": "0.5",
  "filled_total": "2.50016",
  "avg_deal_price": "5.00032",
  "stp_act": "cn",
  "finish_as": "stp",
  "stp_id": 10240
}
```

> FULL response body example

```json
{
  "id": "1852454420",
  "text": "t-abc123",
  "amend_text": "-",
  "create_time": "1710488334",
  "update_time": "1710488334",
  "create_time_ms": 1710488334073,
  "update_time_ms": 1710488334074,
  "status": "closed",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0",
  "left": "0",
  "filled_amount": "0.001",
  "fill_price": "63.4693",
  "filled_total": "63.4693",
  "avg_deal_price": "63469.3",
  "fee": "0.00000022",
  "fee_currency": "BTC",
  "point_fee": "0",
  "gt_fee": "0",
  "gt_maker_fee": "0",
  "gt_taker_fee": "0",
  "gt_discount": false,
  "rebated_fee": "0",
  "rebated_fee_currency": "USDT",
  "finish_as": "filled"
}
```

### Responses

### Response Schema

Status Code **201**

_Spot order details_

#### [#](#enumerated-values-14) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-orders) List orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/orders'
query_param = 'currency_pair=BTC_USDT&status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/orders"
query_param="currency_pair=BTC_USDT&status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/orders`

_List orders_

Note that the query results are spot order lists for spot, unified account and
warehouse-by-site leverage accounts by default.

`status` is set to `open`, that is, when querying the pending order list, only
pagination control of `page` and `limit` is supported. `limit` Maximum setting
is only allowed to 100 . The `side` and `from`, `to` parameters for time range
query are not supported.

`status` is set to `finished`, that is, when querying historical delegations, in
addition to pagination queries, `from` and `to` are also supported by time range
queries. In addition, it supports setting the `side` parameter to filter
one-side history.

The parameters of the time range filtering are processed according to the order
end time.

### Parameters

#### [#](#detailed-descriptions-11) Detailed descriptions

**status**: List orders based on status

`open` - order is waiting to be filled `finished` - order has been filled or
cancelled

> Example responses

> 200 Response

```json
[
  {
    "id": "1852454420",
    "text": "t-abc123",
    "amend_text": "-",
    "create_time": "1710488334",
    "update_time": "1710488334",
    "create_time_ms": 1710488334073,
    "update_time_ms": 1710488334074,
    "status": "closed",
    "currency_pair": "BTC_USDT",
    "type": "limit",
    "account": "unified",
    "side": "buy",
    "amount": "0.001",
    "price": "65000",
    "time_in_force": "gtc",
    "iceberg": "0",
    "left": "0",
    "filled_amount": "0.001",
    "fill_price": "63.4693",
    "filled_total": "63.4693",
    "avg_deal_price": "63469.3",
    "fee": "0.00000022",
    "fee_currency": "BTC",
    "point_fee": "0",
    "gt_fee": "0",
    "gt_maker_fee": "0",
    "gt_taker_fee": "0",
    "gt_discount": false,
    "rebated_fee": "0",
    "rebated_fee_currency": "USDT",
    "finish_as": "filled"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-15) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-in-specified-currency-pair) Cancel all `open` orders in specified currency pair

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/spot/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /spot/orders`

_Cancel all `open` orders in specified currency pair_

When the `account` parameter is not specified, all pending orders including
spot, unified account, and position-by-position leverage will be cancelled. When
`currency_pair` is not specified, all transaction pairs are revoked You can
specify a certain account separately to cancel all orders under the specified
account

### Parameters

#### [#](#detailed-descriptions-12) Detailed descriptions

**account**: Specify Account Type

- Classic Account: If not specified, all include
- Unified Account: Specify `unified`

**action_mode**: Processing Mode

When placing an order, different fields are returned based on the action_mode

- ACK: Asynchronous mode, returns only key order fields
- RESULT: No clearing information
- FULL: Full mode (default)

> Example responses

> 200 Response

```json
[
  {
    "id": "1852454420",
    "text": "t-abc123",
    "amend_text": "-",
    "succeeded": true,
    "create_time": "1710488334",
    "update_time": "1710488334",
    "create_time_ms": 1710488334073,
    "update_time_ms": 1710488334074,
    "status": "closed",
    "currency_pair": "BTC_USDT",
    "type": "limit",
    "account": "unified",
    "side": "buy",
    "amount": "0.001",
    "price": "65000",
    "time_in_force": "gtc",
    "iceberg": "0",
    "left": "0",
    "filled_amount": "0.001",
    "fill_price": "63.4693",
    "filled_total": "63.4693",
    "avg_deal_price": "63469.3",
    "fee": "0.00000022",
    "fee_currency": "BTC",
    "point_fee": "0",
    "gt_fee": "0",
    "gt_maker_fee": "0",
    "gt_taker_fee": "0",
    "gt_discount": false,
    "rebated_fee": "0",
    "rebated_fee_currency": "USDT",
    "finish_as": "filled"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-16) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-batch-of-orders-with-an-id-list) Cancel a batch of orders with an ID list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/cancel_batch_orders'
query_param = ''
body='[{"currency_pair":"BTC_USDT","id":"123456"}]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/cancel_batch_orders"
query_param=""
body_param='[{"currency_pair":"BTC_USDT","id":"123456"}]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/cancel_batch_orders`

_Cancel a batch of orders with an ID list_

Multiple currency pairs can be specified, but maximum 20 orders are allowed per
request

> Body parameter

```json
[
  {
    "currency_pair": "BTC_USDT",
    "id": "123456"
  }
]
```

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC_USDT",
    "id": "123456",
    "text": "123456",
    "succeeded": true,
    "label": null,
    "message": null
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order) Get a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/orders/12345'
query_param = 'currency_pair=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/orders/12345"
query_param="currency_pair=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/orders/{order_id}`

_Get a single order_

By default, orders for spot, unified account and warehouse-by-site leverage
account are checked.

### Parameters

#### [#](#detailed-descriptions-13) Detailed descriptions

**order_id**: The order ID returned when the order was successfully created or
the custom ID specified by the user's creation (i.e. the `text` field).
Operations based on custom IDs can only be checked in pending orders. Only order
ID can be used after the order is finished (transaction/cancel)

> Example responses

> 200 Response

```json
{
  "id": "1852454420",
  "text": "t-abc123",
  "amend_text": "-",
  "create_time": "1710488334",
  "update_time": "1710488334",
  "create_time_ms": 1710488334073,
  "update_time_ms": 1710488334074,
  "status": "closed",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0",
  "left": "0",
  "filled_amount": "0.001",
  "fill_price": "63.4693",
  "filled_total": "63.4693",
  "avg_deal_price": "63469.3",
  "fee": "0.00000022",
  "fee_currency": "BTC",
  "point_fee": "0",
  "gt_fee": "0",
  "gt_maker_fee": "0",
  "gt_taker_fee": "0",
  "gt_discount": false,
  "rebated_fee": "0",
  "rebated_fee_currency": "USDT",
  "finish_as": "filled"
}
```

### Responses

### Response Schema

Status Code **200**

_Spot order details_

#### [#](#enumerated-values-17) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-an-order) Amend an order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/orders/12345'
query_param = ''
body='{"currency_pair":"BTC_USDT","account":"spot","amount":"1"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('PATCH', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('PATCH', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="PATCH"
url="/spot/orders/12345"
query_param=""
body_param='{"currency_pair":"BTC_USDT","account":"spot","amount":"1"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`PATCH /spot/orders/{order_id}`

_Amend an order_

By default modify orders for spot, unified account and leverage account.

At present, both the request body and query support currency_pair and account
parameters, but the request body has higher priority

currency_pair must be filled in the request body or query

Currently, only the price or quantity modification (choose one of two)

About speed limit: Modify orders and create orders to share speed limit rules

About matching priority: Only modifying the quantity will become smaller and
will not affect the priority of matching. If the price is modified or the
quantity is modified, the priority will be adjusted to the end of the new price

Precautions: Modification quantity is less than the transaction quantity will
trigger the order cancellation operation

> Body parameter

```json
{
  "currency_pair": "BTC_USDT",
  "account": "spot",
  "amount": "1"
}
```

### Parameters

#### [#](#detailed-descriptions-14) Detailed descriptions

**order_id**: The order ID returned when the order was successfully created or
the custom ID specified by the user's creation (i.e. the `text` field).
Operations based on custom IDs can only be checked in pending orders. Only order
ID can be used after the order is finished (transaction/cancel)

**» action_mode**: Processing Mode: When placing an order, different fields are
returned based on action_mode. This field is only valid during the request and
is not included in the response result ACK: Asynchronous mode, only returns key
order fields RESULT: No clearing information FULL: Full mode (default)

> Example responses

> 200 Response

```json
{
  "id": "1852454420",
  "text": "t-abc123",
  "amend_text": "-",
  "create_time": "1710488334",
  "update_time": "1710488334",
  "create_time_ms": 1710488334073,
  "update_time_ms": 1710488334074,
  "status": "closed",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0",
  "left": "0",
  "filled_amount": "0.001",
  "fill_price": "63.4693",
  "filled_total": "63.4693",
  "avg_deal_price": "63469.3",
  "fee": "0.00000022",
  "fee_currency": "BTC",
  "point_fee": "0",
  "gt_fee": "0",
  "gt_maker_fee": "0",
  "gt_taker_fee": "0",
  "gt_discount": false,
  "rebated_fee": "0",
  "rebated_fee_currency": "USDT",
  "finish_as": "filled"
}
```

### Responses

### Response Schema

Status Code **200**

_Spot order details_

#### [#](#enumerated-values-18) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order) Cancel a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/orders/12345'
query_param = 'currency_pair=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/spot/orders/12345"
query_param="currency_pair=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /spot/orders/{order_id}`

_Cancel a single order_

By default, orders for spot, unified accounts and leveraged accounts are
revoked.

### Parameters

#### [#](#detailed-descriptions-15) Detailed descriptions

**order_id**: The order ID returned when the order was successfully created or
the custom ID specified by the user's creation (i.e. the `text` field).
Operations based on custom IDs can only be checked in pending orders. Only order
ID can be used after the order is finished (transaction/cancel)

**action_mode**: Processing Mode

When placing an order, different fields are returned based on the action_mode

- ACK: Asynchronous mode, returns only key order fields
- RESULT: No clearing information
- FULL: Full mode (default)

> Example responses

> 200 Response

```json
{
  "id": "1852454420",
  "text": "t-abc123",
  "amend_text": "-",
  "create_time": "1710488334",
  "update_time": "1710488334",
  "create_time_ms": 1710488334073,
  "update_time_ms": 1710488334074,
  "status": "closed",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0",
  "left": "0",
  "filled_amount": "0.001",
  "fill_price": "63.4693",
  "filled_total": "63.4693",
  "avg_deal_price": "63469.3",
  "fee": "0.00000022",
  "fee_currency": "BTC",
  "point_fee": "0",
  "gt_fee": "0",
  "gt_maker_fee": "0",
  "gt_taker_fee": "0",
  "gt_discount": false,
  "rebated_fee": "0",
  "rebated_fee_currency": "USDT",
  "finish_as": "filled"
}
```

### Responses

### Response Schema

Status Code **200**

_Spot order details_

#### [#](#enumerated-values-19) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history) List personal trading history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/my_trades'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/my_trades"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/my_trades`

_List personal trading history_

By default query of transaction records for spot, unified account and
warehouse-by-site leverage accounts.

The history within a specified time range can be queried by specifying `from` or
(and) `to`.

- If no time parameters are specified, only data for the last 7 days can be
  obtained.
- If only any parameter of `from` or `to` is specified, only 7-day data from the
  start (or end) of the specified time is returned.
- The range of `from` and `to` is not allowed to exceed 30 days.

The parameters of the time range filter are processed according to the order end
time.

The maximum number of pages when searching data using limit&page paging function
is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "1232893232",
    "create_time": "1548000000",
    "create_time_ms": "1548000000123.456",
    "order_id": "4128442423",
    "side": "buy",
    "role": "maker",
    "amount": "0.15",
    "price": "0.03",
    "fee": "0.0005",
    "fee_currency": "ETH",
    "point_fee": "0",
    "gt_fee": "0",
    "sequence_id": "588018",
    "text": "t-test"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-20) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-server-current-time) Get server current time

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/time'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/time \
  -H 'Accept: application/json'
```

`GET /spot/time`

_Get server current time_

> Example responses

> 200 Response

```json
{
  "server_time": 1597026383085
}
```

### Responses

### Response Schema

Status Code **200**

_SystemTime_

This operation does not require authentication

## [#](#countdown-cancel-orders) Countdown cancel orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/countdown_cancel_all'
query_param = ''
body='{"timeout":30,"currency_pair":"BTC_USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/countdown_cancel_all"
query_param=""
body_param='{"timeout":30,"currency_pair":"BTC_USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/countdown_cancel_all`

_Countdown cancel orders_

When the timeout set by the user is reached, if there is no cancel or set a new
countdown, the related pending orders will be automatically cancelled. This
endpoint can be called repeatedly to set a new countdown or cancel the
countdown. For example, call this endpoint at 30s intervals, each
countdown`timeout` is set to 30s. If this endpoint is not called again within 30
seconds, all pending orders on the specified `market` will be automatically
cancelled, if no `market` is specified, all market pending orders will be
cancelled. If the `timeout` is set to 0 within 30 seconds, the countdown timer
will expire and the cacnel function will be cancelled.

> Body parameter

```json
{
  "timeout": 30,
  "currency_pair": "BTC_USDT"
}
```

### Parameters

#### [#](#detailed-descriptions-16) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the
countdown

> Example responses

> 200 Response

```json
{
  "triggerTime": "1660039145000"
}
```

### Responses

### Response Schema

Status Code **200**

_triggerTime_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modification-of-orders) Batch modification of orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/amend_batch_orders'
query_param = ''
body='[{"order_id":"121212","currency_pair":"BTC_USDT","account":"spot","amount":"1","amend_text":"test"}]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/amend_batch_orders"
query_param=""
body_param='[{"order_id":"121212","currency_pair":"BTC_USDT","account":"spot","amount":"1","amend_text":"test"}]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/amend_batch_orders`

_Batch modification of orders_

By default modify orders for spot, unified account and leverage account.
Currently, only the price or quantity modification (choose one of two) Modify
unfinished orders, up to 5 orders can be modified in batches at a time. The
request parameters should be passed in array format. When the order modification
fails during batch modification, the modification of the order will continue to
be executed. After execution, the failure information of the corresponding order
will be carried The order of calling the batch modification order is consistent
with the order list The order of return content of batch modification orders is
consistent with the order list

> Body parameter

```json
[
  {
    "order_id": "121212",
    "currency_pair": "BTC_USDT",
    "account": "spot",
    "amount": "1",
    "amend_text": "test"
  }
]
```

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": "12332324",
    "amend_text": "t-123456",
    "text": "t-123456",
    "succeeded": true,
    "label": "",
    "message": "",
    "id": "12332324",
    "create_time": "1548000000",
    "update_time": "1548000100",
    "create_time_ms": 1548000000123,
    "update_time_ms": 1548000100123,
    "currency_pair": "ETC_BTC",
    "status": "cancelled",
    "type": "limit",
    "account": "spot",
    "side": "buy",
    "amount": "1",
    "price": "5.00032",
    "time_in_force": "gtc",
    "iceberg": "0",
    "left": "0.5",
    "filled_amount": "1.242",
    "filled_total": "2.50016",
    "avg_deal_price": "5.00032",
    "fee": "0.005",
    "fee_currency": "ETH",
    "point_fee": "0",
    "gt_fee": "0",
    "gt_discount": false,
    "rebated_fee": "0",
    "rebated_fee_currency": "BTC",
    "stp_act": "cn",
    "finish_as": "stp",
    "stp_id": 10240
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-21) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-spot-insurance-fund-historical-data) Query spot insurance fund historical data

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/insurance_history'
query_param = 'business=margin&currency=BTC&from=1547706332&to=1547706332'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/spot/insurance_history?business=margin&currency=BTC&from=1547706332&to=1547706332 \
  -H 'Accept: application/json'
```

`GET /spot/insurance_history`

_Query spot insurance fund historical data_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "balance": "1021.21",
    "time": 1727054547
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#create-a-price-triggered-order) Create a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/price_orders'
query_param = ''
body='{"trigger":{"price":"100","rule":">=","expiration":3600},"put":{"type":"limit","side":"buy","price":"2.15","amount":"2.00000000","account":"normal","time_in_force":"gtc","text":"api"},"market":"GT_USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/spot/price_orders"
query_param=""
body_param='{"trigger":{"price":"100","rule":">=","expiration":3600},"put":{"type":"limit","side":"buy","price":"2.15","amount":"2.00000000","account":"normal","time_in_force":"gtc","text":"api"},"market":"GT_USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /spot/price_orders`

_Create a price-triggered order_

> Body parameter

```json
{
  "trigger": {
    "price": "100",
    "rule": ">=",
    "expiration": 3600
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "2.15",
    "amount": "2.00000000",
    "account": "normal",
    "time_in_force": "gtc",
    "text": "api"
  },
  "market": "GT_USDT"
}
```

### Parameters

#### [#](#detailed-descriptions-17) Detailed descriptions

**»» rule**: Price trigger condition

- > \=: triggered when market price larger than or equal to `price` field
- <=: triggered when market price less than or equal to `price` field

**»» type**: Order type，default to `limit`

- limit : Limit Order
- market : Market Order

**»» side**: Order side

- buy: buy side
- sell: sell side

**»» amount**: When `type` is limit, it refers to base currency. For instance,
`BTC_USDT` means `BTC` When `type` is `market`, it refers to different currency
according to `side`

- `side` : `buy` means quote currency, `BTC_USDT` means `USDT`
- `side` : `sell` means base currency，`BTC_USDT` means `BTC`

**»» account**: Trading account type. Portfolio margin account must set to
`unified`

- normal: spot trading
- margin: margin trading
- unified: unified trading

**»» time_in_force**: time_in_force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only

**»» text**: The source of the order, including:

- web: web
- api: api
- app: app

#### [#](#enumerated-values-22) Enumerated Values

> Example responses

> 201 Response

```json
{
  "id": 1432329
}
```

### Responses

### Response Schema

Status Code **201**

_TriggerOrderResponse_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-running-auto-order-list) Retrieve running auto order list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/price_orders'
query_param = 'status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/price_orders"
query_param="status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/price_orders`

_Retrieve running auto order list_

### Parameters

#### [#](#enumerated-values-23) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "trigger": {
      "price": "100",
      "rule": ">=",
      "expiration": 3600
    },
    "put": {
      "type": "limit",
      "side": "buy",
      "price": "2.15",
      "amount": "2.00000000",
      "account": "normal",
      "time_in_force": "gtc",
      "text": "api"
    },
    "id": 1283293,
    "user": 1234,
    "market": "GT_USDT",
    "ctime": 1616397800,
    "ftime": 1616397801,
    "fired_order_id": 0,
    "status": "",
    "reason": ""
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders) Cancel All Price-triggered Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/price_orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/spot/price_orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /spot/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

#### [#](#enumerated-values-24) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "trigger": {
      "price": "100",
      "rule": ">=",
      "expiration": 3600
    },
    "put": {
      "type": "limit",
      "side": "buy",
      "price": "2.15",
      "amount": "2.00000000",
      "account": "normal",
      "time_in_force": "gtc",
      "text": "api"
    },
    "id": 1283293,
    "user": 1234,
    "market": "GT_USDT",
    "ctime": 1616397800,
    "ftime": 1616397801,
    "fired_order_id": 0,
    "status": "",
    "reason": ""
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order) Get a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/price_orders/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/spot/price_orders/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /spot/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

> Example responses

> 200 Response

```json
{
  "trigger": {
    "price": "100",
    "rule": ">=",
    "expiration": 3600
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "2.15",
    "amount": "2.00000000",
    "account": "normal",
    "time_in_force": "gtc",
    "text": "api"
  },
  "id": 1283293,
  "user": 1234,
  "market": "GT_USDT",
  "ctime": 1616397800,
  "ftime": 1616397801,
  "fired_order_id": 0,
  "status": "",
  "reason": ""
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order) cancel a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/spot/price_orders/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/spot/price_orders/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /spot/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

> Example responses

> 200 Response

```json
{
  "trigger": {
    "price": "100",
    "rule": ">=",
    "expiration": 3600
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "2.15",
    "amount": "2.00000000",
    "account": "normal",
    "time_in_force": "gtc",
    "text": "api"
  },
  "id": 1283293,
  "user": 1234,
  "market": "GT_USDT",
  "ctime": 1616397800,
  "ftime": 1616397801,
  "fired_order_id": 0,
  "status": "",
  "reason": ""
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#margin) Margin

Margin API; margin trading uses spot trading API

## [#](#margin-account-list) Margin account list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/accounts`

_Margin account list_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC_USDT",
    "account_type": "mmr",
    "leverage": "20",
    "locked": false,
    "risk": "1.3318",
    "mmr": "16.5949188975473644",
    "base": {
      "currency": "BTC",
      "available": "0.047060413211",
      "locked": "0",
      "borrowed": "0.047233",
      "interest": "0"
    },
    "quote": {
      "currency": "USDT",
      "available": "1234",
      "locked": "0",
      "borrowed": "0",
      "interest": "0"
    }
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-margin-account-balance-change-history) List margin account balance change history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/account_book'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/account_book"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/account_book`

_List margin account balance change history_

Only transferals from and to margin account are provided for now. Time range
allows 30 days at most

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "123456",
    "time": "1547633726",
    "time_ms": 1547633726123,
    "currency": "BTC",
    "currency_pair": "BTC_USDT",
    "change": "1.03",
    "balance": "4.59316525194"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#funding-account-list) Funding account list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/funding_accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/funding_accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/funding_accounts`

_Funding account list_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "available": "1.238",
    "locked": "0",
    "lent": "3.32",
    "total_lent": "3.32"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-user-s-auto-repayment-setting) Update user's auto repayment setting

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/auto_repay'
query_param = 'status=on'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/margin/auto_repay"
query_param="status=on"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /margin/auto_repay`

_Update user's auto repayment setting_

### Parameters

> Example responses

> 200 Response

```json
{
  "status": "on"
}
```

### Responses

### Response Schema

Status Code **200**

_AutoRepaySetting_

#### [#](#enumerated-values-25) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-user-auto-repayment-setting) Retrieve user auto repayment setting

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/auto_repay'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/auto_repay"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/auto_repay`

_Retrieve user auto repayment setting_

> Example responses

> 200 Response

```json
{
  "status": "on"
}
```

### Responses

### Response Schema

Status Code **200**

_AutoRepaySetting_

#### [#](#enumerated-values-26) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-max-transferable-amount-for-a-specific-margin-currency) Get the max transferable amount for a specific margin currency

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/transferable'
query_param = 'currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/transferable"
query_param="currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/transferable`

_Get the max transferable amount for a specific margin currency_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "currency_pair": "ETH_USDT",
  "amount": "10000"
}
```

### Responses

### Response Schema

Status Code **200**

_MarginTransferable_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#currencies-supported-by-cross-margin-deprecated) Currencies supported by cross margin.(deprecated)

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/currencies'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/margin/cross/currencies \
  -H 'Accept: application/json'
```

`GET /margin/cross/currencies`

_Currencies supported by cross margin.(deprecated)_

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC",
    "rate": "0.0002",
    "prec": "0.000001",
    "discount": "1",
    "min_borrow_amount": "0.01",
    "user_max_borrow_amount": "1000000",
    "total_max_borrow_amount": "10000000",
    "price": "63015.5214",
    "loanable": true,
    "status": 1
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#retrieve-detail-of-one-single-currency-supported-by-cross-margin-deprecated) Retrieve detail of one single currency supported by cross margin. (deprecated)

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/currencies/BTC'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/margin/cross/currencies/BTC \
  -H 'Accept: application/json'
```

`GET /margin/cross/currencies/{currency}`

_Retrieve detail of one single currency supported by cross margin. (deprecated)_

### Parameters

> Example responses

> 200 Response

```json
{
  "name": "BTC",
  "rate": "0.0002",
  "prec": "0.000001",
  "discount": "1",
  "min_borrow_amount": "0.01",
  "user_max_borrow_amount": "1000000",
  "total_max_borrow_amount": "10000000",
  "price": "63015.5214",
  "loanable": true,
  "status": 1
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#retrieve-cross-margin-account-deprecated) Retrieve cross margin account. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/accounts`

_Retrieve cross margin account. (deprecated)_

> Example responses

> 200 Response

```json
{
  "user_id": 10001,
  "locked": false,
  "balances": {
    "ETH": {
      "available": "0",
      "freeze": "0",
      "borrowed": "0.075393666654",
      "interest": "0.0000106807603333",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "1016.1",
      "total_freeze": "0",
      "total_liab": "0"
    },
    "POINT": {
      "available": "9999999999.017023138734",
      "freeze": "0",
      "borrowed": "0",
      "interest": "0",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "12016.1",
      "total_freeze": "0",
      "total_liab": "0"
    },
    "USDT": {
      "available": "0.00000062023",
      "freeze": "0",
      "borrowed": "0",
      "interest": "0",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "16.1",
      "total_freeze": "0",
      "total_liab": "0"
    }
  },
  "total": "230.94621713",
  "borrowed": "161.66395521",
  "interest": "0.02290237",
  "risk": "1.4284",
  "total_initial_margin": "1025.0524665088",
  "total_margin_balance": "3382495.944473949183",
  "total_maintenance_margin": "205.01049330176",
  "total_initial_margin_rate": "3299.827135672679",
  "total_maintenance_margin_rate": "16499.135678363399",
  "total_available_margin": "3381470.892007440383",
  "portfolio_margin_total": "3381470.892007440383",
  "portfolio_margin_total_liab": "0",
  "portfolio_margin_total_equity": "100016.1"
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-cross-margin-account-change-history-deprecated) Retrieve cross margin account change history. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/account_book'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/account_book"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/account_book`

_Retrieve cross margin account change history. (deprecated)_

The record query time range is not allowed to exceed 30 days.

When using the limit&page paging function to retrieve data, the maximum number
of pages is 100,000, that is, (limit page - 1) <= 100000.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "123456",
    "time": 1547633726123,
    "currency": "BTC",
    "change": "1.03",
    "balance": "4.59316525194",
    "type": "in"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-cross-margin-borrow-loan-deprecated) Create a cross margin borrow loan. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/loans'
query_param = ''
body='{"currency":"EOS","amount":"110.553635","text":"web"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/margin/cross/loans"
query_param=""
body_param='{"currency":"EOS","amount":"110.553635","text":"web"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /margin/cross/loans`

_Create a cross margin borrow loan. (deprecated)_

Borrow amount cannot be less than currency minimum borrow amount

> Body parameter

```json
{
  "currency": "EOS",
  "amount": "110.553635",
  "text": "web"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "id": "17",
  "create_time": 1620381696159,
  "update_time": 1620381696159,
  "currency": "EOS",
  "amount": "110.553635",
  "text": "web",
  "status": 2,
  "repaid": "110.506649705159",
  "repaid_interest": "0.046985294841",
  "unpaid_interest": "0.0000074393366667"
}
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-27) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-cross-margin-borrow-history-deprecated) List cross margin borrow history. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/loans'
query_param = 'status=0'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/loans"
query_param="status=0"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/loans`

_List cross margin borrow history. (deprecated)_

Sort by creation time in descending order by default. Set `reverse=false` to
return ascending results.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "17",
    "create_time": 1620381696159,
    "update_time": 1620381696159,
    "currency": "EOS",
    "amount": "110.553635",
    "text": "web",
    "status": 2,
    "repaid": "110.506649705159",
    "repaid_interest": "0.046985294841",
    "unpaid_interest": "0.0000074393366667"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-28) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-single-borrow-loan-detail-deprecated) Retrieve single borrow loan detail. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/loans/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/loans/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/loans/{loan_id}`

_Retrieve single borrow loan detail. (deprecated)_

### Parameters

> Example responses

> 200 Response

```json
{
  "id": "17",
  "create_time": 1620381696159,
  "update_time": 1620381696159,
  "currency": "EOS",
  "amount": "110.553635",
  "text": "web",
  "status": 2,
  "repaid": "110.506649705159",
  "repaid_interest": "0.046985294841",
  "unpaid_interest": "0.0000074393366667"
}
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-29) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cross-margin-repayments-deprecated) Cross margin repayments. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/repayments'
query_param = ''
body='{"currency":"EOS","amount":"110.553635"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/margin/cross/repayments"
query_param=""
body_param='{"currency":"EOS","amount":"110.553635"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /margin/cross/repayments`

_Cross margin repayments. (deprecated)_

When the liquidity of the currency is insufficient and the transaction risk is
high, the currency will be disabled, and funds cannot be transferred.When the
available balance of cross-margin is insufficient, the balance of the spot
account can be used for repayment. Please ensure that the balance of the spot
account is sufficient, and system uses cross-margin account for repayment first

> Body parameter

```json
{
  "currency": "EOS",
  "amount": "110.553635"
}
```

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "17",
    "create_time": 1620381696159,
    "update_time": 1620381696159,
    "currency": "EOS",
    "amount": "110.553635",
    "text": "web",
    "status": 2,
    "repaid": "110.506649705159",
    "repaid_interest": "0.046985294841",
    "unpaid_interest": "0.0000074393366667"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-30) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-cross-margin-repayments-deprecated) Retrieve cross margin repayments. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/repayments'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/repayments"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/repayments`

_Retrieve cross margin repayments. (deprecated)_

Sort by creation time in descending order by default. Set `reverse=false` to
return ascending results.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": "51",
    "create_time": 1620696347990,
    "loan_id": "30",
    "currency": "BTC",
    "principal": "5.385542",
    "interest": "0.000044879516",
    "repayment_type": "auto_repay"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#interest-records-for-the-cross-margin-account-deprecated) Interest records for the cross margin account. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/interest_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/interest_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/interest_records`

_Interest records for the cross margin account. (deprecated)_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "status": 1,
    "currency_pair": "BTC_USDT",
    "currency": "USDT",
    "actual_rate": "0.00000236",
    "interest": "0.00006136",
    "type": "platform",
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-max-transferable-amount-for-a-specific-cross-margin-currency-deprecated) Get the max transferable amount for a specific cross margin currency. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/transferable'
query_param = 'currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/transferable"
query_param="currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/transferable`

_Get the max transferable amount for a specific cross margin currency.
(deprecated)_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

### Response Schema

Status Code **200**

_CrossMarginTransferable_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#estimated-interest-rates-deprecated) Estimated interest rates. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/estimate_rate'
query_param = 'currencies=BTC,GT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/estimate_rate"
query_param="currencies=BTC,GT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/estimate_rate`

_Estimated interest rates. (deprecated)_

Please note that the interest rates are subject to change based on the borrowing
and lending demand, and therefore, the provided rates may not be entirely
accurate.

### Parameters

> Example responses

> 200 Response

```json
{
  "BTC": "0.000002",
  "GT": "0.000001"
}
```

### Responses

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-max-borrowable-amount-for-a-specific-cross-margin-currency-deprecated) Get the max borrowable amount for a specific cross margin currency. (deprecated)

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/cross/borrowable'
query_param = 'currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/cross/borrowable"
query_param="currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/cross/borrowable`

_Get the max borrowable amount for a specific cross margin currency.
(deprecated)_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

### Response Schema

Status Code **200**

_CrossMarginBorrowable_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#check-the-user-s-own-leverage-lending-gradient-in-the-current-market) Check the user's own leverage lending gradient in the current market

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/user/loan_margin_tiers'
query_param = 'currency_pair=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/user/loan_margin_tiers"
query_param="currency_pair=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/user/loan_margin_tiers`

_Check the user's own leverage lending gradient in the current market_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "tier_amount": "100",
    "mmr": "0.9",
    "leverage": "1"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-the-current-market-leverage-lending-gradient) Query the current market leverage lending gradient

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/loan_margin_tiers'
query_param = 'currency_pair=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/margin/loan_margin_tiers?currency_pair=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /margin/loan_margin_tiers`

_Query the current market leverage lending gradient_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "tier_amount": "100",
    "mmr": "0.9",
    "leverage": "1"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#set-the-user-market-leverage-multiple) Set the user market leverage multiple

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/leverage/user_market_setting'
query_param = ''
body='{"currency_pair":"BTC_USDT","leverage":"10"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/margin/leverage/user_market_setting"
query_param=""
body_param='{"currency_pair":"BTC_USDT","leverage":"10"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /margin/leverage/user_market_setting`

_Set the user market leverage multiple_

> Body parameter

```json
{
  "currency_pair": "BTC_USDT",
  "leverage": "10"
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-the-user-s-leverage-account-list) Query the user's leverage account list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/user/account'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/user/account"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/user/account`

_Query the user's leverage account list_

Support querying risk rate per position account and margin rate per position
account

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC_USDT",
    "account_type": "mmr",
    "leverage": "20",
    "locked": false,
    "risk": "1.3318",
    "mmr": "16.5949188975473644",
    "base": {
      "currency": "BTC",
      "available": "0.047060413211",
      "locked": "0",
      "borrowed": "0.047233",
      "interest": "0"
    },
    "quote": {
      "currency": "USDT",
      "available": "1234",
      "locked": "0",
      "borrowed": "0",
      "interest": "0"
    }
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#marginuni) MarginUni

Margin API; margin trading uses spot trading API

## [#](#list-lending-markets) List lending markets

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/currency_pairs'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/margin/uni/currency_pairs \
  -H 'Accept: application/json'
```

`GET /margin/uni/currency_pairs`

_List lending markets_

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "AE_USDT",
    "base_min_borrow_amount": "100",
    "quote_min_borrow_amount": "100",
    "leverage": "3"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-detail-of-lending-market) Get detail of lending market

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/currency_pairs/AE_USDT'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/margin/uni/currency_pairs/AE_USDT \
  -H 'Accept: application/json'
```

`GET /margin/uni/currency_pairs/{currency_pair}`

_Get detail of lending market_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency_pair": "AE_USDT",
  "base_min_borrow_amount": "100",
  "quote_min_borrow_amount": "100",
  "leverage": "3"
}
```

### Responses

### Response Schema

Status Code **200**

_Currency pair of the loan_

This operation does not require authentication

## [#](#estimate-interest-rate) Estimate interest Rate

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/estimate_rate'
query_param = 'currencies=BTC,GT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/uni/estimate_rate"
query_param="currencies=BTC,GT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/uni/estimate_rate`

_Estimate interest Rate_

Please note that the interest rates are subject to change based on the borrowing
and lending demand, and therefore, the provided rates may not be entirely
accurate.

### Parameters

> Example responses

> 200 Response

```json
{
  "BTC": "0.000002",
  "GT": "0.000001"
}
```

### Responses

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay-2) Borrow or repay

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/loans'
query_param = ''
body='{"currency":"BTC","amount":"0.1","type":"borrow","currency_pair":"BTC_USDT","repaid_all":false}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/margin/uni/loans"
query_param=""
body_param='{"currency":"BTC","amount":"0.1","type":"borrow","currency_pair":"BTC_USDT","repaid_all":false}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /margin/uni/loans`

_Borrow or repay_

> Body parameter

```json
{
  "currency": "BTC",
  "amount": "0.1",
  "type": "borrow",
  "currency_pair": "BTC_USDT",
  "repaid_all": false
}
```

### Parameters

#### [#](#enumerated-values-31) Enumerated Values

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-loans-2) List loans

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/loans'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/uni/loans"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/uni/loans`

_List loans_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "USDT",
    "currency_pari": "GT_USDT",
    "amount": "1",
    "type": "margin",
    "change_time": 1673247054000,
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-load-records-2) Get load records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/loan_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/uni/loan_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/uni/loan_records`

_Get load records_

### Parameters

#### [#](#enumerated-values-32) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "type": "borrow",
    "currency_pair": "AE_USDT",
    "currency": "USDT",
    "amount": "1000",
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records-2) List interest records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/interest_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/uni/interest_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/uni/interest_records`

_List interest records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "status": 1,
    "currency_pair": "BTC_USDT",
    "currency": "USDT",
    "actual_rate": "0.00000236",
    "interest": "0.00006136",
    "type": "platform",
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-maximum-borrowable) Get maximum borrowable

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/margin/uni/borrowable'
query_param = 'currency=BTC&currency_pair=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/margin/uni/borrowable"
query_param="currency=BTC&currency_pair=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /margin/uni/borrowable`

_Get maximum borrowable_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "AE",
  "borrowable": "1123.344",
  "currency_pair": "AE_USDT"
}
```

### Responses

### Response Schema

Status Code **200**

_MaxUniBorrowable_

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#flash-swap) Flash_swap

Flash swap

## [#](#list-all-supported-currency-pairs-in-flash-swap) List All Supported Currency Pairs In Flash Swap

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/flash_swap/currency_pairs'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/flash_swap/currency_pairs \
  -H 'Accept: application/json'
```

`GET /flash_swap/currency_pairs`

_List All Supported Currency Pairs In Flash Swap_

`BTC_GT` represents selling BTC and buying GT. The limits for each currency may
vary across different currency pairs.

It is not necessary that two currencies that can be swapped instantaneously can
be exchanged with each other. For example, it is possible to sell BTC and buy
GT, but it does not necessarily mean that GT can be sold to buy BTC.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC_USDT",
    "sell_currency": "BTC",
    "buy_currency": "USDT",
    "sell_min_amount": "0.00001",
    "sell_max_amount": "100",
    "buy_min_amount": "10",
    "buy_max_amount": "10000000"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#create-a-flash-swap-order) Create a flash swap order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/flash_swap/orders'
query_param = ''
body='{"preview_id":"4564564","sell_currency":"BTC","sell_amount":"0.1","buy_currency":"USDT","buy_amount":"10"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/flash_swap/orders"
query_param=""
body_param='{"preview_id":"4564564","sell_currency":"BTC","sell_amount":"0.1","buy_currency":"USDT","buy_amount":"10"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /flash_swap/orders`

_Create a flash swap order_

Initiate a flash swap preview in advance because order creation requires a
preview result

> Body parameter

```json
{
  "preview_id": "4564564",
  "sell_currency": "BTC",
  "sell_amount": "0.1",
  "buy_currency": "USDT",
  "buy_amount": "10"
}
```

### Parameters

> Example responses

> 201 Response

```json
{
  "id": 54646,
  "create_time": 1651116876378,
  "update_time": 1651116876378,
  "user_id": 11135567,
  "sell_currency": "BTC",
  "sell_amount": "0.01",
  "buy_currency": "USDT",
  "buy_amount": "10",
  "price": "100",
  "status": 1
}
```

### Responses

### Response Schema

Status Code **201**

_Flash swap order_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-flash-swap-orders) List all flash swap orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/flash_swap/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/flash_swap/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /flash_swap/orders`

_List all flash swap orders_

### Parameters

#### [#](#detailed-descriptions-18) Detailed descriptions

**status**: Flash swap order status

`1` - success `2` - failure

**reverse**: If results are sorted by id in reverse order. Default to `true`

- `true`: sort by id in descending order(recent first)
- `false`: sort by id in ascending order(oldest first)

> Example responses

> 200 Response

```json
[
  {
    "id": 54646,
    "create_time": 1651116876378,
    "update_time": 1651116876378,
    "user_id": 11135567,
    "sell_currency": "BTC",
    "sell_amount": "0.01",
    "buy_currency": "USDT",
    "buy_amount": "10",
    "price": "100",
    "status": 1
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-flash-swap-order-s-detail) Get a single flash swap order's detail

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/flash_swap/orders/1'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/flash_swap/orders/1"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /flash_swap/orders/{order_id}`

_Get a single flash swap order's detail_

### Parameters

> Example responses

> 200 Response

```json
{
  "id": 54646,
  "create_time": 1651116876378,
  "update_time": 1651116876378,
  "user_id": 11135567,
  "sell_currency": "BTC",
  "sell_amount": "0.01",
  "buy_currency": "USDT",
  "buy_amount": "10",
  "price": "100",
  "status": 1
}
```

### Responses

### Response Schema

Status Code **200**

_Flash swap order_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#initiate-a-flash-swap-order-preview) Initiate a flash swap order preview

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/flash_swap/orders/preview'
query_param = ''
body='{"sell_currency":"BTC","sell_amount":"0.1","buy_currency":"USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/flash_swap/orders/preview"
query_param=""
body_param='{"sell_currency":"BTC","sell_amount":"0.1","buy_currency":"USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /flash_swap/orders/preview`

_Initiate a flash swap order preview_

> Body parameter

```json
{
  "sell_currency": "BTC",
  "sell_amount": "0.1",
  "buy_currency": "USDT"
}
```

### Parameters

#### [#](#detailed-descriptions-19) Detailed descriptions

**» sell_amount**: Amount to sell. It is required to choose one parameter
between `sell_amount` and `buy_amount`

**» buy_amount**: Amount to buy. It is required to choose one parameter between
`sell_amount` and `buy_amount`

> Example responses

> 200 Response

```json
{
  "preview_id": "3453434",
  "sell_currency": "BTC",
  "sell_amount": "0.1",
  "buy_currency": "USDT",
  "buy_amount": "10",
  "price": "100"
}
```

### Responses

### Response Schema

Status Code **200**

_Initiate a flash swap order preview_

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#futures) Futures

Futures contract API

## [#](#list-all-futures-contracts) List all futures contracts

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/contracts'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/contracts \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/contracts`

_List all futures contracts_

### Parameters

#### [#](#enumerated-values-33) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC_USDT",
    "type": "direct",
    "quanto_multiplier": "0.0001",
    "ref_discount_rate": "0",
    "order_price_deviate": "0.5",
    "maintenance_rate": "0.005",
    "mark_type": "index",
    "last_price": "38026",
    "mark_price": "37985.6",
    "index_price": "37954.92",
    "funding_rate_indicative": "0.000219",
    "mark_price_round": "0.01",
    "funding_offset": 0,
    "in_delisting": false,
    "risk_limit_base": "1000000",
    "interest_rate": "0.0003",
    "order_price_round": "0.1",
    "order_size_min": 1,
    "ref_rebate_rate": "0.2",
    "funding_interval": 28800,
    "risk_limit_step": "1000000",
    "leverage_min": "1",
    "leverage_max": "100",
    "risk_limit_max": "8000000",
    "maker_fee_rate": "-0.00025",
    "taker_fee_rate": "0.00075",
    "funding_rate": "0.002053",
    "order_size_max": 1000000,
    "funding_next_apply": 1610035200,
    "short_users": 977,
    "config_change_time": 1609899548,
    "trade_size": 28530850594,
    "position_size": 5223816,
    "long_users": 455,
    "funding_impact_value": "60000",
    "orders_limit": 50,
    "trade_id": 10851092,
    "orderbook_id": 2129638396,
    "enable_bonus": true,
    "enable_credit": true,
    "create_time": 1669688556,
    "funding_cap_ratio": "0.75"
  }
]
```

### Responses

This operation does not require authentication

## [#](#get-a-single-contract) Get a single contract

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/contracts/BTC_USDT'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/contracts/BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/contracts/{contract}`

_Get a single contract_

### Parameters

#### [#](#enumerated-values-34) Enumerated Values

> Example responses

> 200 Response

```json
{
  "name": "BTC_USDT",
  "type": "direct",
  "quanto_multiplier": "0.0001",
  "ref_discount_rate": "0",
  "order_price_deviate": "0.5",
  "maintenance_rate": "0.005",
  "mark_type": "index",
  "last_price": "38026",
  "mark_price": "37985.6",
  "index_price": "37954.92",
  "funding_rate_indicative": "0.000219",
  "mark_price_round": "0.01",
  "funding_offset": 0,
  "in_delisting": false,
  "risk_limit_base": "1000000",
  "interest_rate": "0.0003",
  "order_price_round": "0.1",
  "order_size_min": 1,
  "ref_rebate_rate": "0.2",
  "funding_interval": 28800,
  "risk_limit_step": "1000000",
  "leverage_min": "1",
  "leverage_max": "100",
  "risk_limit_max": "8000000",
  "maker_fee_rate": "-0.00025",
  "taker_fee_rate": "0.00075",
  "funding_rate": "0.002053",
  "order_size_max": 1000000,
  "funding_next_apply": 1610035200,
  "short_users": 977,
  "config_change_time": 1609899548,
  "trade_size": 28530850594,
  "position_size": 5223816,
  "long_users": 455,
  "funding_impact_value": "60000",
  "orders_limit": 50,
  "trade_id": 10851092,
  "orderbook_id": 2129638396,
  "enable_bonus": true,
  "enable_credit": true,
  "create_time": 1669688556,
  "funding_cap_ratio": "0.75"
}
```

### Responses

This operation does not require authentication

## [#](#futures-order-book) Futures order book

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/order_book'
query_param = 'contract=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/order_book?contract=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/order_book`

_Futures order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

#### [#](#enumerated-values-35) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 123456,
  "current": 1623898993.123,
  "update": 1623898993.121,
  "asks": [
    {
      "p": "1.52",
      "s": 100
    },
    {
      "p": "1.53",
      "s": 40
    }
  ],
  "bids": [
    {
      "p": "1.17",
      "s": 150
    },
    {
      "p": "1.16",
      "s": 203
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#futures-trading-history) Futures trading history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/trades'
query_param = 'contract=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/trades?contract=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/trades`

_Futures trading history_

### Parameters

#### [#](#detailed-descriptions-20) Detailed descriptions

**last_id**: Specify the starting point for this list based on a previously
retrieved id

This parameter is deprecated. Use `from` and `to` instead to limit time range

**from**: Specify starting time in Unix seconds. If not specified, `to` and
`limit` will be used to limit response items. If items between `from` and `to`
are more than `limit`, only `limit` number will be returned.

#### [#](#enumerated-values-36) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 121234231,
    "create_time": 1514764800,
    "contract": "BTC_USDT",
    "size": -100,
    "price": "100.123"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-futures-candlesticks) Get futures candlesticks

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/candlesticks'
query_param = 'contract=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/candlesticks?contract=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/candlesticks`

_Get futures candlesticks_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the
contract's mark price candlesticks are returned; if prefix with `index_`, index
price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the
limit when specifying `from`, `to` and `interval`

### Parameters

#### [#](#enumerated-values-37) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1539852480,
    "v": 97151,
    "c": "1.032",
    "h": "1.032",
    "l": "1.032",
    "o": "1.032",
    "sum": "3580"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#premium-index-k-line) Premium Index K-Line

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/premium_index'
query_param = 'contract=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/premium_index?contract=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/premium_index`

_Premium Index K-Line_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the
limit when specifying from, to and interval

### Parameters

#### [#](#enumerated-values-38) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1539852480,
    "c": "0",
    "h": "0.00023",
    "l": "0",
    "o": "0"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-futures-tickers) List futures tickers

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/tickers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/tickers \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/tickers`

_List futures tickers_

### Parameters

#### [#](#enumerated-values-39) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "contract": "BTC_USDT",
    "last": "6432",
    "low_24h": "6278",
    "high_24h": "6790",
    "change_percentage": "4.43",
    "total_size": "32323904",
    "volume_24h": "184040233284",
    "volume_24h_btc": "28613220",
    "volume_24h_usd": "184040233284",
    "volume_24h_base": "28613220",
    "volume_24h_quote": "184040233284",
    "volume_24h_settle": "28613220",
    "mark_price": "6534",
    "funding_rate": "0.0001",
    "funding_rate_indicative": "0.0001",
    "index_price": "6531",
    "highest_bid": "34089.7",
    "highest_size": "100",
    "lowest_ask": "34217.9",
    "lowest_size": "1000"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#funding-rate-history) Funding rate history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/funding_rate'
query_param = 'contract=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/funding_rate?contract=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/funding_rate`

_Funding rate history_

### Parameters

#### [#](#enumerated-values-40) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1543968000,
    "r": "0.000157"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#futures-insurance-balance-history) Futures insurance balance history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/insurance'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/insurance \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/insurance`

_Futures insurance balance history_

### Parameters

#### [#](#enumerated-values-41) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1543968000,
    "b": "83.0031"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#futures-stats) Futures stats

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/contract_stats'
query_param = 'contract=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/contract_stats?contract=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/contract_stats`

_Futures stats_

### Parameters

#### [#](#enumerated-values-42) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1603865400,
    "lsr_taker": 100,
    "lsr_account": 0.5,
    "long_liq_size": 0,
    "short_liq_size": 0,
    "open_interest": 124724,
    "short_liq_usd": 0,
    "mark_price": "8865",
    "top_lsr_size": 1.02,
    "short_liq_amount": 0,
    "long_liq_amount": 0,
    "open_interest_usd": 1511,
    "top_lsr_account": 1.5,
    "long_liq_usd": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-index-constituents) Get index constituents

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/index_constituents/BTC_USDT'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/index_constituents/BTC_USDT \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/index_constituents/{index}`

_Get index constituents_

### Parameters

#### [#](#enumerated-values-43) Enumerated Values

> Example responses

> 200 Response

```json
{
  "index": "BTC_USDT",
  "constituents": [
    {
      "exchange": "Binance",
      "symbols": ["BTC_USDT"]
    },
    {
      "exchange": "Gate.io",
      "symbols": ["BTC_USDT"]
    },
    {
      "exchange": "Huobi",
      "symbols": ["BTC_USDT"]
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#retrieve-liquidation-history) Retrieve liquidation history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/liq_orders'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/liq_orders \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/liq_orders`

_Retrieve liquidation history_

Interval between `from` and `to` cannot exceeds 3600. Some private fields will
not be returned in public endpoints. Refer to field description for detail.

### Parameters

#### [#](#enumerated-values-44) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1548654951,
    "contract": "BTC_USDT",
    "size": 600,
    "order_size": -600,
    "order_price": "3405",
    "fill_price": "3424",
    "left": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-risk-limit-tiers) List risk limit tiers

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/risk_limit_tiers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/risk_limit_tiers \
  -H 'Accept: application/json'
```

`GET /futures/{settle}/risk_limit_tiers`

_List risk limit tiers_

When the 'contract' parameter is not passed, the default is to query the risk
limits for the top 100 markets.'Limit' and 'offset' correspond to pagination
queries at the market level, not to the length of the returned array. This only
takes effect when the 'contract' parameter is empty.

### Parameters

#### [#](#enumerated-values-45) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "maintenance_rate": "0.01",
    "tier": 1,
    "initial_rate": "0.02",
    "leverage_max": "50",
    "risk_limit": "500000",
    "contract": "BTC_USDT"
  },
  {
    "initial_rate": "0.03",
    "maintenance_rate": "0.02",
    "tier": 2,
    "risk_limit": "1000000",
    "leverage_max": "33.33",
    "contract": "BTC_USDT"
  },
  {
    "maintenance_rate": "0.01",
    "tier": 1,
    "initial_rate": "0.02",
    "leverage_max": "50",
    "risk_limit": "500000",
    "contract": "ETH_USDT"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#query-futures-account) Query futures account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/accounts`

_Query futures account_

### Parameters

#### [#](#enumerated-values-46) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 1666,
  "currency": "USDT",
  "total": "9707.803567115145",
  "unrealised_pnl": "3371.248828",
  "position_margin": "38.712189181",
  "order_margin": "0",
  "available": "9669.091377934145",
  "point": "0",
  "bonus": "0",
  "in_dual_mode": false,
  "enable_evolved_classic": false,
  "cross_initial_margin": "61855.56788525",
  "cross_maintenance_margin": "682.04678105",
  "cross_order_margin": "0",
  "cross_unrealised_pnl": "1501.178222634128",
  "cross_available": "27549.406108813951",
  "cross_margin_balance": "10371.77306201952",
  "cross_mmr": "797.2134",
  "cross_imr": "116.6097",
  "isolated_position_margin": "0",
  "history": {
    "dnw": "10000",
    "pnl": "68.3685",
    "fee": "-1.645812875",
    "refr": "0",
    "fund": "-358.919120009855",
    "point_dnw": "0",
    "point_fee": "0",
    "point_refr": "0",
    "bonus_dnw": "0",
    "bonus_offset": "0"
  }
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book-2) Query account book

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/account_book'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/account_book"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/account_book`

_Query account book_

If the `contract` field is provided, it can only filter records that include
this field after 2023-10-30.

### Parameters

#### [#](#detailed-descriptions-21) Detailed descriptions

**type**: Changing Type：

- dnw: Deposit & Withdraw
- pnl: Profit & Loss by reducing position
- fee: Trading fee
- refr: Referrer rebate
- fund: Funding
- point_dnw: POINT Deposit & Withdraw
- point_fee: POINT Trading fee
- point_refr: POINT Referrer rebate
- bonus_offset: bouns deduction

#### [#](#enumerated-values-47) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1682294400.123456,
    "change": "0.000010152188",
    "balance": "4.59316525194",
    "text": "ETH_USD:6086261",
    "type": "fee",
    "contract": "ETH_USD",
    "trade_id": "1",
    "id": "1"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-48) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-positions-of-a-user) List all positions of a user

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/positions'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/positions"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/positions`

_List all positions of a user_

### Parameters

#### [#](#enumerated-values-49) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user": 10000,
    "contract": "BTC_USDT",
    "size": -9440,
    "leverage": "0",
    "risk_limit": "100",
    "leverage_max": "100",
    "maintenance_rate": "0.005",
    "value": "3568.62",
    "margin": "4.431548146258",
    "entry_price": "3779.55",
    "liq_price": "99999999",
    "mark_price": "3780.32",
    "unrealised_pnl": "-0.000507486844",
    "realised_pnl": "0.045543982432",
    "pnl_pnl": "0.045543982432",
    "pnl_fund": "0",
    "pnl_fee": "0",
    "history_pnl": "0",
    "last_close_pnl": "0",
    "realised_point": "0",
    "history_point": "0",
    "adl_ranking": 5,
    "pending_orders": 16,
    "close_order": {
      "id": 232323,
      "price": "3779",
      "is_liq": false
    },
    "mode": "single",
    "update_time": 1684994406,
    "update_id": 1,
    "cross_leverage_limit": "0"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-single-position) Get single position

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/positions/BTC_USDT'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/positions/BTC_USDT"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/positions/{contract}`

_Get single position_

### Parameters

#### [#](#enumerated-values-50) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin) Update position margin

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/positions/BTC_USDT/margin'
query_param = 'change=0.01'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/positions/BTC_USDT/margin"
query_param="change=0.01"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/positions/{contract}/margin`

_Update position margin_

### Parameters

#### [#](#enumerated-values-51) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage) Update position leverage

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/positions/BTC_USDT/leverage'
query_param = 'leverage=10'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/positions/BTC_USDT/leverage"
query_param="leverage=10"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/positions/{contract}/leverage`

_Update position leverage_

### Parameters

#### [#](#enumerated-values-52) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit) Update position risk limit

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/positions/BTC_USDT/risk_limit'
query_param = 'risk_limit=1000000'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/positions/BTC_USDT/risk_limit"
query_param="risk_limit=1000000"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/positions/{contract}/risk_limit`

_Update position risk limit_

### Parameters

#### [#](#enumerated-values-53) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#enable-or-disable-dual-mode) Enable or disable dual mode

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/dual_mode'
query_param = 'dual_mode=true'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/dual_mode"
query_param="dual_mode=true"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/dual_mode`

_Enable or disable dual mode_

Before setting dual mode, make sure all positions are closed and no orders are
open

### Parameters

#### [#](#enumerated-values-54) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 1666,
  "currency": "USDT",
  "total": "9707.803567115145",
  "unrealised_pnl": "3371.248828",
  "position_margin": "38.712189181",
  "order_margin": "0",
  "available": "9669.091377934145",
  "point": "0",
  "bonus": "0",
  "in_dual_mode": false,
  "enable_evolved_classic": false,
  "cross_initial_margin": "61855.56788525",
  "cross_maintenance_margin": "682.04678105",
  "cross_order_margin": "0",
  "cross_unrealised_pnl": "1501.178222634128",
  "cross_available": "27549.406108813951",
  "cross_margin_balance": "10371.77306201952",
  "cross_mmr": "797.2134",
  "cross_imr": "116.6097",
  "isolated_position_margin": "0",
  "history": {
    "dnw": "10000",
    "pnl": "68.3685",
    "fee": "-1.645812875",
    "refr": "0",
    "fund": "-358.919120009855",
    "point_dnw": "0",
    "point_fee": "0",
    "point_refr": "0",
    "bonus_dnw": "0",
    "bonus_offset": "0"
  }
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-position-detail-in-dual-mode) Retrieve position detail in dual mode

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/dual_comp/positions/BTC_USDT'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/dual_comp/positions/BTC_USDT"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/dual_comp/positions/{contract}`

_Retrieve position detail in dual mode_

### Parameters

#### [#](#enumerated-values-55) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user": 10000,
    "contract": "BTC_USDT",
    "size": -9440,
    "leverage": "0",
    "risk_limit": "100",
    "leverage_max": "100",
    "maintenance_rate": "0.005",
    "value": "3568.62",
    "margin": "4.431548146258",
    "entry_price": "3779.55",
    "liq_price": "99999999",
    "mark_price": "3780.32",
    "unrealised_pnl": "-0.000507486844",
    "realised_pnl": "0.045543982432",
    "pnl_pnl": "0.045543982432",
    "pnl_fund": "0",
    "pnl_fee": "0",
    "history_pnl": "0",
    "last_close_pnl": "0",
    "realised_point": "0",
    "history_point": "0",
    "adl_ranking": 5,
    "pending_orders": 16,
    "close_order": {
      "id": 232323,
      "price": "3779",
      "is_liq": false
    },
    "mode": "single",
    "update_time": 1684994406,
    "update_id": 1,
    "cross_leverage_limit": "0"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin-in-dual-mode) Update position margin in dual mode

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/dual_comp/positions/BTC_USDT/margin'
query_param = 'change=0.01&dual_side=dual_long'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/dual_comp/positions/BTC_USDT/margin"
query_param="change=0.01&dual_side=dual_long"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/dual_comp/positions/{contract}/margin`

_Update position margin in dual mode_

### Parameters

#### [#](#enumerated-values-56) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user": 10000,
    "contract": "BTC_USDT",
    "size": -9440,
    "leverage": "0",
    "risk_limit": "100",
    "leverage_max": "100",
    "maintenance_rate": "0.005",
    "value": "3568.62",
    "margin": "4.431548146258",
    "entry_price": "3779.55",
    "liq_price": "99999999",
    "mark_price": "3780.32",
    "unrealised_pnl": "-0.000507486844",
    "realised_pnl": "0.045543982432",
    "pnl_pnl": "0.045543982432",
    "pnl_fund": "0",
    "pnl_fee": "0",
    "history_pnl": "0",
    "last_close_pnl": "0",
    "realised_point": "0",
    "history_point": "0",
    "adl_ranking": 5,
    "pending_orders": 16,
    "close_order": {
      "id": 232323,
      "price": "3779",
      "is_liq": false
    },
    "mode": "single",
    "update_time": 1684994406,
    "update_id": 1,
    "cross_leverage_limit": "0"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage-in-dual-mode) Update position leverage in dual mode

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/dual_comp/positions/BTC_USDT/leverage'
query_param = 'leverage=10'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/dual_comp/positions/BTC_USDT/leverage"
query_param="leverage=10"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/dual_comp/positions/{contract}/leverage`

_Update position leverage in dual mode_

### Parameters

#### [#](#enumerated-values-57) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user": 10000,
    "contract": "BTC_USDT",
    "size": -9440,
    "leverage": "0",
    "risk_limit": "100",
    "leverage_max": "100",
    "maintenance_rate": "0.005",
    "value": "3568.62",
    "margin": "4.431548146258",
    "entry_price": "3779.55",
    "liq_price": "99999999",
    "mark_price": "3780.32",
    "unrealised_pnl": "-0.000507486844",
    "realised_pnl": "0.045543982432",
    "pnl_pnl": "0.045543982432",
    "pnl_fund": "0",
    "pnl_fee": "0",
    "history_pnl": "0",
    "last_close_pnl": "0",
    "realised_point": "0",
    "history_point": "0",
    "adl_ranking": 5,
    "pending_orders": 16,
    "close_order": {
      "id": 232323,
      "price": "3779",
      "is_liq": false
    },
    "mode": "single",
    "update_time": 1684994406,
    "update_id": 1,
    "cross_leverage_limit": "0"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit-in-dual-mode) Update position risk limit in dual mode

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/dual_comp/positions/BTC_USDT/risk_limit'
query_param = 'risk_limit=1000000'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/dual_comp/positions/BTC_USDT/risk_limit"
query_param="risk_limit=1000000"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/dual_comp/positions/{contract}/risk_limit`

_Update position risk limit in dual mode_

### Parameters

#### [#](#enumerated-values-58) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user": 10000,
    "contract": "BTC_USDT",
    "size": -9440,
    "leverage": "0",
    "risk_limit": "100",
    "leverage_max": "100",
    "maintenance_rate": "0.005",
    "value": "3568.62",
    "margin": "4.431548146258",
    "entry_price": "3779.55",
    "liq_price": "99999999",
    "mark_price": "3780.32",
    "unrealised_pnl": "-0.000507486844",
    "realised_pnl": "0.045543982432",
    "pnl_pnl": "0.045543982432",
    "pnl_fund": "0",
    "pnl_fee": "0",
    "history_pnl": "0",
    "last_close_pnl": "0",
    "realised_point": "0",
    "history_point": "0",
    "adl_ranking": 5,
    "pending_orders": 16,
    "close_order": {
      "id": 232323,
      "price": "3779",
      "is_liq": false
    },
    "mode": "single",
    "update_time": 1684994406,
    "update_id": 1,
    "cross_leverage_limit": "0"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-futures-order) Create a futures order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders'
query_param = ''
body='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/orders"
query_param=""
body_param='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/orders`

_Create a futures order_

- When placing an order, the number of contracts is specified `size`, not the
  number of coins. The number of coins corresponding to each contract is
  returned in the contract details interface `quanto_multiplier`
- 0 The order that was completed cannot be obtained after 10 minutes of
  withdrawal, and the order will be mentioned that the order does not exist
- Setting `reduce_only` to `true` can prevent the position from being penetrated
  when reducing the position
- In single-position mode, if you need to close the position, you need to set
  `size` to 0 and `close` to `true`
- In dual warehouse mode,
- Reduce position: reduce_only=true, size is a positive number that indicates
  short position, negative number that indicates long position
- Add position: reduce_only=false, size is a positive number that indicates
  adding long positions, and negative numbers indicate adding short positions
- Close position: size=0, set the direction of closing position according to
  auto_size, and set `reduce_only` to true at the same time - reduce_only: Make
  sure to only perform position reduction operations to prevent increased
  positions
- Set `stp_act` to determine the use of a strategy that restricts user
  transactions. For detailed usage, refer to the body parameter `stp_act`

> Body parameter

```json
{
  "contract": "BTC_USDT",
  "size": 6024,
  "iceberg": 0,
  "price": "3765",
  "tif": "gtc",
  "text": "t-my-custom-id",
  "stp_act": "-"
}
```

### Parameters

#### [#](#detailed-descriptions-22) Detailed descriptions

**» tif**: Time in force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee
- fok: FillOrKill, fill either completely or none

**» text**: Order custom information, users can use this field to set a custom
ID, and the user-defined field must meet the following conditions:

1.  Must start with `t-`
2.  If `t-` is not calculated, the length cannot exceed 28 bytes
3.  The input content can only contain numbers, letters, underscores (\_),
    midscores (-) or dots (.)

In addition to user-defined information, the following are internal reserved
fields that identifies the source of the order:

- web: web page
- api: API call
- app: mobile terminal
- auto_deleveraging: Automatic position reduction
- liquidation: ⽼Classic mode position forced closing
- liq-xxx: a. The new classic model of forced closing positions, including
  position-by-position, one-way full position, and two-way full position
  non-held position. b. The unified account single currency margin model of
  forced closing positions by position
- hedge-liq-xxx: New classic model two-way full position hedging part of forced
  closing, that is, close long and short positions at the same time
- pm_liquidate: Unified account cross-currency margin model for forced closing
  positions
- cob_margin_liquidate: Unified account combination margin model for forced
  closing position
- scm_liquidate: Unified account single currency margin mode position forced
  closing
- insurance: insurance

**» stp_act**: Self-Trading Prevention Action. Users can use this field to set
self-trade prevetion strategies

1.  After users join the `STP Group`, he can pass `stp_act` to limit the user's
    self-trade prevetion strategy. If `stp_act` is not passed, the default is
    `cn` strategy。
2.  When the user does not join the `STP group`, an error will be returned when
    passing the `stp_act` parameter。
3.  If the user did not use 'stp_act' when placing the order, 'stp_act' will
    return '-'

- cn: Cancel newest, Cancel new orders and keep old ones
- co: Cancel oldest, Cancel old orders and keep new ones
- cb: Cancel both, Both old and new orders will be cancelled

#### [#](#enumerated-values-59) Enumerated Values

> Example responses

> 201 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders) List futures orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders'
query_param = 'status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/orders"
query_param="status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/orders`

_List futures orders_

- Zero-fill order cannot be retrieved for 10 minutes after cancellation
- Historical orders, by default, only data within the past 6 months is
  supported. If you need to query data for a longer period, please use
  `GET /futures/{settle}/orders_timerange`.

### Parameters

#### [#](#enumerated-values-60) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

### [#](#response-headers) Response Headers

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched) Cancel all `open` orders matched

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders'
query_param = 'contract=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/futures/usdt/orders"
query_param="contract=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /futures/{settle}/orders`

_Cancel all `open` orders matched_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

#### [#](#enumerated-values-61) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders-by-time-range) List Futures Orders By Time Range

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders_timerange'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/orders_timerange"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/orders_timerange`

_List Futures Orders By Time Range_

### Parameters

#### [#](#enumerated-values-62) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

### [#](#response-headers-2) Response Headers

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-batch-of-futures-orders) Create a batch of futures orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/batch_orders'
query_param = ''
body='[{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/batch_orders"
query_param=""
body_param='[{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/batch_orders`

_Create a batch of futures orders_

- Up to 10 orders per request
- If any of the order's parameters are missing or in the wrong format, all of
  them will not be executed, and a http status 400 error will be returned
  directly
- If the parameters are checked and passed, all are executed. Even if there is a
  business logic error in the middle (such as insufficient funds), it will not
  affect other execution orders
- The returned result is in array format, and the order corresponds to the
  orders in the request body
- In the returned result, the `succeeded` field of type bool indicates whether
  the execution was successful or not
- If the execution is successful, the normal order content is included; if the
  execution fails, the `label` field is included to indicate the cause of the
  error
- In the rate limiting, each order is counted individually

> Body parameter

```json
[
  {
    "contract": "BTC_USDT",
    "size": 6024,
    "iceberg": 0,
    "price": "3765",
    "tif": "gtc",
    "text": "t-my-custom-id",
    "stp_act": "-"
  }
]
```

### Parameters

#### [#](#enumerated-values-63) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "succeeded": true,
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-64) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-2) Get a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/orders/{order_id}`

_Get a single order_

- Zero-fill order cannot be retrieved for 10 minutes after cancellation
- Historical orders, by default, only data within the past 6 months is
  supported.

### Parameters

#### [#](#detailed-descriptions-23) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 60 seconds after
the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-65) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-2) Cancel a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/futures/usdt/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /futures/{settle}/orders/{order_id}`

_Cancel a single order_

### Parameters

#### [#](#detailed-descriptions-24) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 60 seconds after
the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-66) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-an-order-2) Amend an order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/orders/12345'
query_param = ''
body='{"size":100,"price":"54321"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('PUT', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="PUT"
url="/futures/usdt/orders/12345"
query_param=""
body_param='{"size":100,"price":"54321"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`PUT /futures/{settle}/orders/{order_id}`

_Amend an order_

> Body parameter

```json
{
  "size": 100,
  "price": "54321"
}
```

### Parameters

#### [#](#detailed-descriptions-25) Detailed descriptions

**» size**: New order size, including filled part.

- If new size is less than or equal to filled size, the order will be cancelled.
- Order side must be identical to the original one.
- Close order size cannot be changed.
- For reduce only orders, increasing size may leads to other reduce only orders
  being cancelled.
- If price is not changed, decreasing size will not change its precedence in
  order book, while increasing will move it to the last at current price.

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 60 seconds after
the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-67) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-2) List personal trading history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/my_trades'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/my_trades"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/my_trades`

_List personal trading history_

By default, only data within the past 6 months is supported. If you need to
query data for a longer period, please use
`GET /futures/{settle}/my_trades_timerange`.

### Parameters

#### [#](#detailed-descriptions-26) Detailed descriptions

**last_id**: Specify the starting point for this list based on a previously
retrieved id

This parameter is deprecated. If you need to iterate through and retrieve more
records, we recommend using 'GET /futures/{settle}/my_trades_timerange'.

#### [#](#enumerated-values-68) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 121234231,
    "create_time": 1514764800.123,
    "contract": "BTC_USDT",
    "order_id": "21893289839",
    "size": 100,
    "price": "100.123",
    "text": "t-123456",
    "fee": "0.01",
    "point_fee": "0",
    "role": "taker",
    "close_size": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-69) Enumerated Values

### [#](#response-headers-3) Response Headers

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-by-time-range) List personal trading history by time range

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/my_trades_timerange'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/my_trades_timerange"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/my_trades_timerange`

_List personal trading history by time range_

### Parameters

#### [#](#enumerated-values-70) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "trade_id": "121234231",
    "create_time": 1514764800.123,
    "contract": "BTC_USDT",
    "order_id": "21893289839",
    "size": 100,
    "price": "100.123",
    "text": "t-123456",
    "fee": "0.01",
    "point_fee": "0",
    "role": "taker",
    "close_size": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-71) Enumerated Values

### [#](#response-headers-4) Response Headers

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-position-close-history) List position close history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/position_close'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/position_close"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/position_close`

_List position close history_

### Parameters

#### [#](#enumerated-values-72) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1546487347,
    "pnl": "0.00013",
    "pnl_pnl": "0.00011",
    "pnl_fund": "0.00001",
    "pnl_fee": "0.00001",
    "side": "long",
    "contract": "BTC_USDT",
    "text": "web",
    "max_size": "100",
    "accum_size": "100",
    "first_open_time": 1546487347,
    "long_price": "2026.87",
    "short_price": "2544.4"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-73) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-liquidation-history) List liquidation history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/liquidates'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/liquidates"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/liquidates`

_List liquidation history_

### Parameters

#### [#](#enumerated-values-74) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1548654951,
    "contract": "BTC_USDT",
    "size": 600,
    "leverage": "25",
    "margin": "0.006705256878",
    "entry_price": "3536.123",
    "liq_price": "3421.54",
    "mark_price": "3420.27",
    "order_id": 317393847,
    "order_price": "3405",
    "fill_price": "3424",
    "left": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-auto-deleveraging-history) List Auto-Deleveraging History

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/auto_deleverages'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/auto_deleverages"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/auto_deleverages`

_List Auto-Deleveraging History_

### Parameters

#### [#](#enumerated-values-75) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1675841679,
    "contract": "ACH_USDT",
    "order_id": 73873128,
    "user": 1666,
    "cross_leverage_limit": "0",
    "leverage": "0",
    "entry_price": "2649.648633636364",
    "fill_price": "2790.8082",
    "position_size": 1,
    "trade_size": -10
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-2) Countdown cancel orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/countdown_cancel_all'
query_param = ''
body='{"timeout":30,"contract":"BTC_USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/countdown_cancel_all"
query_param=""
body_param='{"timeout":30,"contract":"BTC_USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/countdown_cancel_all`

_Countdown cancel orders_

When the timeout set by the user is reached, if there is no cancel or set a new
countdown, the related pending orders will be automatically cancelled. This
endpoint can be called repeatedly to set a new countdown or cancel the
countdown. For example, call this endpoint at 30s intervals, each
countdown`timeout` is set to 30s. If this endpoint is not called again within 30
seconds, all pending orders on the specified `market` will be automatically
cancelled, if no `market` is specified, all market pending orders will be
cancelled. If the `timeout` is set to 0 within 30 seconds, the countdown timer
will expire and the cacnel function will be cancelled.

> Body parameter

```json
{
  "timeout": 30,
  "contract": "BTC_USDT"
}
```

### Parameters

#### [#](#detailed-descriptions-27) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the
countdown

#### [#](#enumerated-values-76) Enumerated Values

> Example responses

> 200 Response

```json
{
  "triggerTime": "1660039145000"
}
```

### Responses

### Response Schema

Status Code **200**

_triggerTime_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-trading-fee-rates-2) Query user trading fee rates

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/fee'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/fee"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/fee`

_Query user trading fee rates_

### Parameters

#### [#](#enumerated-values-77) Enumerated Values

> Example responses

> 200 Response

```json
{
  "1INCH_USDT": {
    "taker_fee": "0.00025",
    "maker_fee": "-0.00010"
  },
  "AAVE_USDT": {
    "taker_fee": "0.00025",
    "maker_fee": "-0.00010"
  }
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-batch-of-orders-with-an-id-list-2) Cancel a batch of orders with an ID list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/batch_cancel_orders'
query_param = ''
body='["1","2","3"]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/batch_cancel_orders"
query_param=""
body_param='["1","2","3"]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/batch_cancel_orders`

_Cancel a batch of orders with an ID list_

Multiple distinct order ID list can be specified。Each request can cancel a
maximum of 20 records.

> Body parameter

```json
["1", "2", "3"]
```

### Parameters

#### [#](#enumerated-values-78) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user_id": 111,
    "id": "123456",
    "succeeded": true,
    "message": ""
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modify-orders-with-specified-ids) Batch modify orders with specified IDs

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/batch_amend_orders'
query_param = ''
body='[{"order_id":121212,"amend_text":"batch amend text","size":100,"price":"54321"}]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/batch_amend_orders"
query_param=""
body_param='[{"order_id":121212,"amend_text":"batch amend text","size":100,"price":"54321"}]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/batch_amend_orders`

_Batch modify orders with specified IDs_

You can specify multiple different order IDs. You can only modify up to 10
orders in one request.

> Body parameter

```json
[
  {
    "order_id": 121212,
    "amend_text": "batch amend text",
    "size": 100,
    "price": "54321"
  }
]
```

### Parameters

#### [#](#enumerated-values-79) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "succeeded": true,
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-80) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-price-triggered-order-2) Create a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/price_orders'
query_param = ''
body='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/futures/usdt/price_orders"
query_param=""
body_param='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /futures/{settle}/price_orders`

_Create a price-triggered order_

> Body parameter

```json
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "order_type": "close-long-order"
}
```

### Parameters

#### [#](#detailed-descriptions-28) Detailed descriptions

**»» size**: Represents the number of contracts that need to be closed, full
closing: size=0 Partial closing: plan-close-short-position size>0 Partial
closing: plan-close-long-position size<0

**»» close**: When all positions are closed in a single position mode, it must
be set to true to perform the closing operation When partially closed positions
in single-store mode/double-store mode, you can not set close, or close=false

**»» tif**: Time in force strategy, default is gtc, market order currently only
supports ioc mode Market order currently only supports ioc mode

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled

**»» text**: The source of the order, including:

- web: web
- api: api
- app: app

**»» auto_size**: Do not set auto_size When the dual-position mode is closed all
positions (size=0), auto_size, close_long, close_short, short When the
double-storey mode partially closes the position (size ≠ 0), there is no need to
set auto_size

**»» strategy_type**: Trigger Policy

- 0: Price trigger, that is, when the price meets the conditions
- 1: Price spread trigger, i.e. the last price specified in `price_type` minus
  the second-last price difference At present, only 0 is the latest transaction
  price

**»» rule**: Price Condition Type

- 1: Indicates that the price calculated based on `strategy_type` and
  `price_type` is greater than or equal to `Trigger.Price` Trigger, while
  Trigger.Price must > last_price
- 2: Indicates that the price calculated based on `strategy_type` and
  `price_type` is less than or equal to `Trigger.Price` Trigger, and
  Trigger.Price must < last_price

**» order_type**: Types of stop-profit and stop-loss, including:

- `close-long-order`: Entrusting order stop profit and stop loss, flat long
  position
- `close-short-order`: Entrusted order stop profit and stop loss, short position
- `close-long-position`: Position stop-profit stop loss, used to close long
  positions
- `close-short-position`: Position stop-profit stop loss, used to close all
  short positions
- `plan-close-long-position`: Position plan take profit and stop loss, used to
  close long positions in all or part of long positions
- `plan-close-short-position`: Position plan stop-profit and stop loss, used to
  close all short positions or partially close short positions

The two types of entrusted order stop-profit and stop-loss are read-only and
cannot be passed in through requests

#### [#](#enumerated-values-81) Enumerated Values

> Example responses

> 201 Response

```json
{
  "id": 1432329
}
```

### Responses

### Response Schema

Status Code **201**

_TriggerOrderResponse_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-price-triggered-orders) List All Price-triggered Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/price_orders'
query_param = 'status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/price_orders"
query_param="status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/price_orders`

_List All Price-triggered Orders_

### Parameters

#### [#](#enumerated-values-82) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "initial": {
      "contract": "BTC_USDT",
      "size": 100,
      "price": "5.03"
    },
    "trigger": {
      "strategy_type": 0,
      "price_type": 0,
      "price": "3000",
      "rule": 1,
      "expiration": 86400
    },
    "id": 1283293,
    "user": 1234,
    "create_time": 1514764800,
    "finish_time": 1514764900,
    "trade_id": 13566,
    "status": "finished",
    "finish_as": "cancelled",
    "reason": "",
    "order_type": "close-long-order"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders-2) Cancel All Price-triggered Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/price_orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/futures/usdt/price_orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /futures/{settle}/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

#### [#](#enumerated-values-83) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "initial": {
      "contract": "BTC_USDT",
      "size": 100,
      "price": "5.03"
    },
    "trigger": {
      "strategy_type": 0,
      "price_type": 0,
      "price": "3000",
      "rule": 1,
      "expiration": 86400
    },
    "id": 1283293,
    "user": 1234,
    "create_time": 1514764800,
    "finish_time": 1514764900,
    "trade_id": 13566,
    "status": "finished",
    "finish_as": "cancelled",
    "reason": "",
    "order_type": "close-long-order"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order-2) Get a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/price_orders/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/futures/usdt/price_orders/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /futures/{settle}/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

#### [#](#enumerated-values-84) Enumerated Values

> Example responses

> 200 Response

```json
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "id": 1283293,
  "user": 1234,
  "create_time": 1514764800,
  "finish_time": 1514764900,
  "trade_id": 13566,
  "status": "finished",
  "finish_as": "cancelled",
  "reason": "",
  "order_type": "close-long-order"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order-2) cancel a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/futures/usdt/price_orders/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/futures/usdt/price_orders/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /futures/{settle}/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

#### [#](#enumerated-values-85) Enumerated Values

> Example responses

> 200 Response

```json
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "id": 1283293,
  "user": 1234,
  "create_time": 1514764800,
  "finish_time": 1514764900,
  "trade_id": 13566,
  "status": "finished",
  "finish_as": "cancelled",
  "reason": "",
  "order_type": "close-long-order"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#delivery) Delivery

Delivery contract API

## [#](#list-all-futures-contracts-2) List all futures contracts

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/contracts'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/contracts \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/contracts`

_List all futures contracts_

### Parameters

#### [#](#enumerated-values-86) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC_USDT_20200814",
    "underlying": "BTC_USDT",
    "cycle": "WEEKLY",
    "type": "direct",
    "quanto_multiplier": "0.0001",
    "mark_type": "index",
    "last_price": "9017",
    "mark_price": "9019",
    "index_price": "9005.3",
    "basis_rate": "0.185095",
    "basis_value": "13.7",
    "basis_impact_value": "100000",
    "settle_price": "0",
    "settle_price_interval": 60,
    "settle_price_duration": 1800,
    "settle_fee_rate": "0.0015",
    "expire_time": 1593763200,
    "order_price_round": "0.1",
    "mark_price_round": "0.1",
    "leverage_min": "1",
    "leverage_max": "100",
    "maintenance_rate": "1000000",
    "risk_limit_base": "140.726652109199",
    "risk_limit_step": "1000000",
    "risk_limit_max": "8000000",
    "maker_fee_rate": "-0.00025",
    "taker_fee_rate": "0.00075",
    "ref_discount_rate": "0",
    "ref_rebate_rate": "0.2",
    "order_price_deviate": "0.5",
    "order_size_min": 1,
    "order_size_max": 1000000,
    "orders_limit": 50,
    "orderbook_id": 63,
    "trade_id": 26,
    "trade_size": 435,
    "position_size": 130,
    "config_change_time": 1593158867,
    "in_delisting": false
  }
]
```

### Responses

This operation does not require authentication

## [#](#get-a-single-contract-2) Get a single contract

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/contracts/BTC_USDT_20200814'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/contracts/BTC_USDT_20200814 \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/contracts/{contract}`

_Get a single contract_

### Parameters

#### [#](#enumerated-values-87) Enumerated Values

> Example responses

> 200 Response

```json
{
  "name": "BTC_USDT_20200814",
  "underlying": "BTC_USDT",
  "cycle": "WEEKLY",
  "type": "direct",
  "quanto_multiplier": "0.0001",
  "mark_type": "index",
  "last_price": "9017",
  "mark_price": "9019",
  "index_price": "9005.3",
  "basis_rate": "0.185095",
  "basis_value": "13.7",
  "basis_impact_value": "100000",
  "settle_price": "0",
  "settle_price_interval": 60,
  "settle_price_duration": 1800,
  "settle_fee_rate": "0.0015",
  "expire_time": 1593763200,
  "order_price_round": "0.1",
  "mark_price_round": "0.1",
  "leverage_min": "1",
  "leverage_max": "100",
  "maintenance_rate": "1000000",
  "risk_limit_base": "140.726652109199",
  "risk_limit_step": "1000000",
  "risk_limit_max": "8000000",
  "maker_fee_rate": "-0.00025",
  "taker_fee_rate": "0.00075",
  "ref_discount_rate": "0",
  "ref_rebate_rate": "0.2",
  "order_price_deviate": "0.5",
  "order_size_min": 1,
  "order_size_max": 1000000,
  "orders_limit": 50,
  "orderbook_id": 63,
  "trade_id": 26,
  "trade_size": 435,
  "position_size": 130,
  "config_change_time": 1593158867,
  "in_delisting": false
}
```

### Responses

This operation does not require authentication

## [#](#futures-order-book-2) Futures order book

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/order_book'
query_param = 'contract=BTC_USDT_20200814'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/order_book?contract=BTC_USDT_20200814 \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/order_book`

_Futures order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

#### [#](#enumerated-values-88) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 123456,
  "current": 1623898993.123,
  "update": 1623898993.121,
  "asks": [
    {
      "p": "1.52",
      "s": 100
    },
    {
      "p": "1.53",
      "s": 40
    }
  ],
  "bids": [
    {
      "p": "1.17",
      "s": 150
    },
    {
      "p": "1.16",
      "s": 203
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#futures-trading-history-2) Futures trading history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/trades'
query_param = 'contract=BTC_USDT_20200814'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/trades?contract=BTC_USDT_20200814 \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/trades`

_Futures trading history_

### Parameters

#### [#](#detailed-descriptions-29) Detailed descriptions

**last_id**: Specify the starting point for this list based on a previously
retrieved id

This parameter is deprecated. Use `from` and `to` instead to limit time range

**from**: Specify starting time in Unix seconds. If not specified, `to` and
`limit` will be used to limit response items. If items between `from` and `to`
are more than `limit`, only `limit` number will be returned.

#### [#](#enumerated-values-89) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 121234231,
    "create_time": 1514764800,
    "contract": "BTC_USDT",
    "size": -100,
    "price": "100.123"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-futures-candlesticks-2) Get futures candlesticks

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/candlesticks'
query_param = 'contract=BTC_USDT_20200814'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/candlesticks?contract=BTC_USDT_20200814 \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/candlesticks`

_Get futures candlesticks_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the
contract's mark price candlesticks are returned; if prefix with `index_`, index
price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the
limit when specifying `from`, `to` and `interval`

### Parameters

#### [#](#enumerated-values-90) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1539852480,
    "v": 97151,
    "c": "1.032",
    "h": "1.032",
    "l": "1.032",
    "o": "1.032"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-futures-tickers-2) List futures tickers

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/tickers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/tickers \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/tickers`

_List futures tickers_

### Parameters

#### [#](#enumerated-values-91) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "contract": "BTC_USDT",
    "last": "6432",
    "low_24h": "6278",
    "high_24h": "6790",
    "change_percentage": "4.43",
    "total_size": "32323904",
    "volume_24h": "184040233284",
    "volume_24h_btc": "28613220",
    "volume_24h_usd": "184040233284",
    "volume_24h_base": "28613220",
    "volume_24h_quote": "184040233284",
    "volume_24h_settle": "28613220",
    "mark_price": "6534",
    "funding_rate": "0.0001",
    "funding_rate_indicative": "0.0001",
    "index_price": "6531",
    "highest_bid": "34089.7",
    "highest_size": "100",
    "lowest_ask": "34217.9",
    "lowest_size": "1000"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#futures-insurance-balance-history-2) Futures insurance balance history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/insurance'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/insurance \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/insurance`

_Futures insurance balance history_

### Parameters

#### [#](#enumerated-values-92) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1543968000,
    "b": "83.0031"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#query-futures-account-2) Query futures account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/accounts`

_Query futures account_

### Parameters

#### [#](#enumerated-values-93) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 1666,
  "currency": "USDT",
  "total": "9707.803567115145",
  "unrealised_pnl": "3371.248828",
  "position_margin": "38.712189181",
  "order_margin": "0",
  "available": "9669.091377934145",
  "point": "0",
  "bonus": "0",
  "in_dual_mode": false,
  "enable_evolved_classic": false,
  "cross_initial_margin": "61855.56788525",
  "cross_maintenance_margin": "682.04678105",
  "cross_order_margin": "0",
  "cross_unrealised_pnl": "1501.178222634128",
  "cross_available": "27549.406108813951",
  "cross_margin_balance": "10371.77306201952",
  "cross_mmr": "797.2134",
  "cross_imr": "116.6097",
  "isolated_position_margin": "0",
  "history": {
    "dnw": "10000",
    "pnl": "68.3685",
    "fee": "-1.645812875",
    "refr": "0",
    "fund": "-358.919120009855",
    "point_dnw": "0",
    "point_fee": "0",
    "point_refr": "0",
    "bonus_dnw": "0",
    "bonus_offset": "0"
  }
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book-3) Query account book

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/account_book'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/account_book"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/account_book`

_Query account book_

### Parameters

#### [#](#detailed-descriptions-30) Detailed descriptions

**type**: Changing Type:

- dnw: Deposit & Withdraw
- pnl: Profit & Loss by reducing position
- fee: Trading fee
- refr: Referrer rebate
- fund: Funding
- point_dnw: POINT Deposit & Withdraw
- point_fee: POINT Trading fee
- point_refr: POINT Referrer rebate

#### [#](#enumerated-values-94) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1682294400.123456,
    "change": "0.000010152188",
    "balance": "4.59316525194",
    "text": "ETH_USD:6086261",
    "type": "fee",
    "contract": "ETH_USD",
    "trade_id": "1",
    "id": "1"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-95) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-positions-of-a-user-2) List all positions of a user

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/positions'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/positions"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/positions`

_List all positions of a user_

### Parameters

#### [#](#enumerated-values-96) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "user": 10000,
    "contract": "BTC_USDT",
    "size": -9440,
    "leverage": "0",
    "risk_limit": "100",
    "leverage_max": "100",
    "maintenance_rate": "0.005",
    "value": "3568.62",
    "margin": "4.431548146258",
    "entry_price": "3779.55",
    "liq_price": "99999999",
    "mark_price": "3780.32",
    "unrealised_pnl": "-0.000507486844",
    "realised_pnl": "0.045543982432",
    "pnl_pnl": "0.045543982432",
    "pnl_fund": "0",
    "pnl_fee": "0",
    "history_pnl": "0",
    "last_close_pnl": "0",
    "realised_point": "0",
    "history_point": "0",
    "adl_ranking": 5,
    "pending_orders": 16,
    "close_order": {
      "id": 232323,
      "price": "3779",
      "is_liq": false
    },
    "mode": "single",
    "update_time": 1684994406,
    "update_id": 1,
    "cross_leverage_limit": "0"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-single-position-2) Get single position

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/positions/BTC_USDT_20200814'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/positions/BTC_USDT_20200814"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/positions/{contract}`

_Get single position_

### Parameters

#### [#](#enumerated-values-97) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin-2) Update position margin

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/positions/BTC_USDT_20200814/margin'
query_param = 'change=0.01'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/delivery/usdt/positions/BTC_USDT_20200814/margin"
query_param="change=0.01"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /delivery/{settle}/positions/{contract}/margin`

_Update position margin_

### Parameters

#### [#](#enumerated-values-98) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage-2) Update position leverage

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/positions/BTC_USDT_20200814/leverage'
query_param = 'leverage=10'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/delivery/usdt/positions/BTC_USDT_20200814/leverage"
query_param="leverage=10"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /delivery/{settle}/positions/{contract}/leverage`

_Update position leverage_

### Parameters

#### [#](#enumerated-values-99) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit-2) Update position risk limit

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/positions/BTC_USDT_20200814/risk_limit'
query_param = 'risk_limit=10'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/delivery/usdt/positions/BTC_USDT_20200814/risk_limit"
query_param="risk_limit=10"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /delivery/{settle}/positions/{contract}/risk_limit`

_Update position risk limit_

### Parameters

#### [#](#enumerated-values-100) Enumerated Values

> Example responses

> 200 Response

```json
{
  "user": 10000,
  "contract": "BTC_USDT",
  "size": -9440,
  "leverage": "0",
  "risk_limit": "100",
  "leverage_max": "100",
  "maintenance_rate": "0.005",
  "value": "3568.62",
  "margin": "4.431548146258",
  "entry_price": "3779.55",
  "liq_price": "99999999",
  "mark_price": "3780.32",
  "unrealised_pnl": "-0.000507486844",
  "realised_pnl": "0.045543982432",
  "pnl_pnl": "0.045543982432",
  "pnl_fund": "0",
  "pnl_fee": "0",
  "history_pnl": "0",
  "last_close_pnl": "0",
  "realised_point": "0",
  "history_point": "0",
  "adl_ranking": 5,
  "pending_orders": 16,
  "close_order": {
    "id": 232323,
    "price": "3779",
    "is_liq": false
  },
  "mode": "single",
  "update_time": 1684994406,
  "update_id": 1,
  "cross_leverage_limit": "0"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-futures-order-2) Create a futures order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/orders'
query_param = ''
body='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/delivery/usdt/orders"
query_param=""
body_param='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /delivery/{settle}/orders`

_Create a futures order_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

> Body parameter

```json
{
  "contract": "BTC_USDT",
  "size": 6024,
  "iceberg": 0,
  "price": "3765",
  "tif": "gtc",
  "text": "t-my-custom-id",
  "stp_act": "-"
}
```

### Parameters

#### [#](#detailed-descriptions-31) Detailed descriptions

**» tif**: Time in force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee
- fok: FillOrKill, fill either completely or none

**» text**: Order custom information, users can use this field to set a custom
ID, and the user-defined field must meet the following conditions:

1.  Must start with `t-`
2.  If `t-` is not calculated, the length cannot exceed 28 bytes
3.  The input content can only contain numbers, letters, underscores (\_),
    midscores (-) or dots (.)

In addition to user-defined information, the following are internal reserved
fields that identifies the source of the order:

- web: web page
- api: API call
- app: mobile terminal
- auto_deleveraging: Automatic position reduction
- liquidation: ⽼Classic mode position forced closing
- liq-xxx: a. The new classic model of forced closing positions, including
  position-by-position, one-way full position, and two-way full position
  non-held position. b. The unified account single currency margin model of
  forced closing positions by position
- hedge-liq-xxx: New classic model two-way full position hedging part of forced
  closing, that is, close long and short positions at the same time
- pm_liquidate: Unified account cross-currency margin model for forced closing
  positions
- cob_margin_liquidate: Unified account combination margin model for forced
  closing position
- scm_liquidate: Unified account single currency margin mode position forced
  closing
- insurance: insurance

**» stp_act**: Self-Trading Prevention Action. Users can use this field to set
self-trade prevetion strategies

1.  After users join the `STP Group`, he can pass `stp_act` to limit the user's
    self-trade prevetion strategy. If `stp_act` is not passed, the default is
    `cn` strategy。
2.  When the user does not join the `STP group`, an error will be returned when
    passing the `stp_act` parameter。
3.  If the user did not use 'stp_act' when placing the order, 'stp_act' will
    return '-'

- cn: Cancel newest, Cancel new orders and keep old ones
- co: Cancel oldest, Cancel old orders and keep new ones
- cb: Cancel both, Both old and new orders will be cancelled

#### [#](#enumerated-values-101) Enumerated Values

> Example responses

> 201 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders-2) List futures orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/orders'
query_param = 'status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/orders"
query_param="status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/orders`

_List futures orders_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

#### [#](#enumerated-values-102) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

### [#](#response-headers-5) Response Headers

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched-2) Cancel all `open` orders matched

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/orders'
query_param = 'contract=BTC_USDT_20200814'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/delivery/usdt/orders"
query_param="contract=BTC_USDT_20200814"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /delivery/{settle}/orders`

_Cancel all `open` orders matched_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

#### [#](#enumerated-values-103) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 15675394,
    "user": 100000,
    "contract": "BTC_USDT",
    "create_time": 1546569968,
    "size": 6024,
    "iceberg": 0,
    "left": 6024,
    "price": "3765",
    "fill_price": "0",
    "mkfr": "-0.00025",
    "tkfr": "0.00075",
    "tif": "gtc",
    "refu": 0,
    "is_reduce_only": false,
    "is_close": false,
    "is_liq": false,
    "text": "t-my-custom-id",
    "status": "finished",
    "finish_time": 1514764900,
    "finish_as": "cancelled",
    "stp_id": 0,
    "stp_act": "-",
    "amend_text": "-"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-3) Get a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/orders/{order_id}`

_Get a single order_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

#### [#](#enumerated-values-104) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-3) Cancel a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/delivery/usdt/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /delivery/{settle}/orders/{order_id}`

_Cancel a single order_

### Parameters

#### [#](#enumerated-values-105) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-3) List personal trading history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/my_trades'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/my_trades"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/my_trades`

_List personal trading history_

### Parameters

#### [#](#enumerated-values-106) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "id": 121234231,
    "create_time": 1514764800.123,
    "contract": "BTC_USDT",
    "order_id": "21893289839",
    "size": 100,
    "price": "100.123",
    "text": "t-123456",
    "fee": "0.01",
    "point_fee": "0",
    "role": "taker",
    "close_size": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-107) Enumerated Values

### [#](#response-headers-6) Response Headers

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-position-close-history-2) List position close history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/position_close'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/position_close"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/position_close`

_List position close history_

### Parameters

#### [#](#enumerated-values-108) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1546487347,
    "pnl": "0.00013",
    "pnl_pnl": "0.00011",
    "pnl_fund": "0.00001",
    "pnl_fee": "0.00001",
    "side": "long",
    "contract": "BTC_USDT",
    "text": "web",
    "max_size": "100",
    "accum_size": "100",
    "first_open_time": 1546487347,
    "long_price": "2026.87",
    "short_price": "2544.4"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-109) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-liquidation-history-2) List liquidation history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/liquidates'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/liquidates"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/liquidates`

_List liquidation history_

### Parameters

#### [#](#enumerated-values-110) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1548654951,
    "contract": "BTC_USDT",
    "size": 600,
    "leverage": "25",
    "margin": "0.006705256878",
    "entry_price": "3536.123",
    "liq_price": "3421.54",
    "mark_price": "3420.27",
    "order_id": 317393847,
    "order_price": "3405",
    "fill_price": "3424",
    "left": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-settlement-history) List settlement history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/settlements'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/settlements"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/settlements`

_List settlement history_

### Parameters

#### [#](#enumerated-values-111) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1548654951,
    "contract": "BTC_USDT",
    "size": 600,
    "leverage": "25",
    "margin": "0.006705256878",
    "entry_price": "3536.123",
    "settle_price": "3421.54",
    "profit": "-6.87498",
    "fee": "0.03079386"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-risk-limit-tiers-2) List risk limit tiers

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/risk_limit_tiers'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/risk_limit_tiers \
  -H 'Accept: application/json'
```

`GET /delivery/{settle}/risk_limit_tiers`

_List risk limit tiers_

When the 'contract' parameter is not passed, the default is to query the risk
limits for the top 100 markets.'Limit' and 'offset' correspond to pagination
queries at the market level, not to the length of the returned array. This only
takes effect when the 'contract' parameter is empty.

### Parameters

#### [#](#enumerated-values-112) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "maintenance_rate": "0.01",
    "tier": 1,
    "initial_rate": "0.02",
    "leverage_max": "50",
    "risk_limit": "500000",
    "contract": "BTC_USDT"
  },
  {
    "initial_rate": "0.03",
    "maintenance_rate": "0.02",
    "tier": 2,
    "risk_limit": "1000000",
    "leverage_max": "33.33",
    "contract": "BTC_USDT"
  },
  {
    "maintenance_rate": "0.01",
    "tier": 1,
    "initial_rate": "0.02",
    "leverage_max": "50",
    "risk_limit": "500000",
    "contract": "ETH_USDT"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#create-a-price-triggered-order-3) Create a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/price_orders'
query_param = ''
body='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/delivery/usdt/price_orders"
query_param=""
body_param='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /delivery/{settle}/price_orders`

_Create a price-triggered order_

> Body parameter

```json
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "order_type": "close-long-order"
}
```

### Parameters

#### [#](#detailed-descriptions-32) Detailed descriptions

**»» size**: Represents the number of contracts that need to be closed, full
closing: size=0 Partial closing: plan-close-short-position size>0 Partial
closing: plan-close-long-position size<0

**»» close**: When all positions are closed in a single position mode, it must
be set to true to perform the closing operation When partially closed positions
in single-store mode/double-store mode, you can not set close, or close=false

**»» tif**: Time in force strategy, default is gtc, market order currently only
supports ioc mode Market order currently only supports ioc mode

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled

**»» text**: The source of the order, including:

- web: web
- api: api
- app: app

**»» auto_size**: Do not set auto_size When the dual-position mode is closed all
positions (size=0), auto_size, close_long, close_short, short When the
double-storey mode partially closes the position (size ≠ 0), there is no need to
set auto_size

**»» strategy_type**: Trigger Policy

- 0: Price trigger, that is, when the price meets the conditions
- 1: Price spread trigger, i.e. the last price specified in `price_type` minus
  the second-last price difference At present, only 0 is the latest transaction
  price

**»» rule**: Price Condition Type

- 1: Indicates that the price calculated based on `strategy_type` and
  `price_type` is greater than or equal to `Trigger.Price` Trigger, while
  Trigger.Price must > last_price
- 2: Indicates that the price calculated based on `strategy_type` and
  `price_type` is less than or equal to `Trigger.Price` Trigger, and
  Trigger.Price must < last_price

**» order_type**: Types of stop-profit and stop-loss, including:

- `close-long-order`: Entrusting order stop profit and stop loss, flat long
  position
- `close-short-order`: Entrusted order stop profit and stop loss, short position
- `close-long-position`: Position stop-profit stop loss, used to close long
  positions
- `close-short-position`: Position stop-profit stop loss, used to close all
  short positions
- `plan-close-long-position`: Position plan take profit and stop loss, used to
  close long positions in all or part of long positions
- `plan-close-short-position`: Position plan stop-profit and stop loss, used to
  close all short positions or partially close short positions

The two types of entrusted order stop-profit and stop-loss are read-only and
cannot be passed in through requests

#### [#](#enumerated-values-113) Enumerated Values

> Example responses

> 201 Response

```json
{
  "id": 1432329
}
```

### Responses

### Response Schema

Status Code **201**

_TriggerOrderResponse_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-price-triggered-orders-2) List All Price-triggered Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/price_orders'
query_param = 'status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/price_orders"
query_param="status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/price_orders`

_List All Price-triggered Orders_

### Parameters

#### [#](#enumerated-values-114) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "initial": {
      "contract": "BTC_USDT",
      "size": 100,
      "price": "5.03"
    },
    "trigger": {
      "strategy_type": 0,
      "price_type": 0,
      "price": "3000",
      "rule": 1,
      "expiration": 86400
    },
    "id": 1283293,
    "user": 1234,
    "create_time": 1514764800,
    "finish_time": 1514764900,
    "trade_id": 13566,
    "status": "finished",
    "finish_as": "cancelled",
    "reason": "",
    "order_type": "close-long-order"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders-3) Cancel All Price-triggered Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/price_orders'
query_param = 'contract=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/delivery/usdt/price_orders"
query_param="contract=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /delivery/{settle}/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

#### [#](#enumerated-values-115) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "initial": {
      "contract": "BTC_USDT",
      "size": 100,
      "price": "5.03"
    },
    "trigger": {
      "strategy_type": 0,
      "price_type": 0,
      "price": "3000",
      "rule": 1,
      "expiration": 86400
    },
    "id": 1283293,
    "user": 1234,
    "create_time": 1514764800,
    "finish_time": 1514764900,
    "trade_id": 13566,
    "status": "finished",
    "finish_as": "cancelled",
    "reason": "",
    "order_type": "close-long-order"
  }
]
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order-3) Get a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/price_orders/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/delivery/usdt/price_orders/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /delivery/{settle}/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

#### [#](#enumerated-values-116) Enumerated Values

> Example responses

> 200 Response

```json
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "id": 1283293,
  "user": 1234,
  "create_time": 1514764800,
  "finish_time": 1514764900,
  "trade_id": 13566,
  "status": "finished",
  "finish_as": "cancelled",
  "reason": "",
  "order_type": "close-long-order"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order-3) cancel a price-triggered order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/delivery/usdt/price_orders/string'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/delivery/usdt/price_orders/string"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /delivery/{settle}/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

#### [#](#enumerated-values-117) Enumerated Values

> Example responses

> 200 Response

```json
{
  "initial": {
    "contract": "BTC_USDT",
    "size": 100,
    "price": "5.03"
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "3000",
    "rule": 1,
    "expiration": 86400
  },
  "id": 1283293,
  "user": 1234,
  "create_time": 1514764800,
  "finish_time": 1514764900,
  "trade_id": 13566,
  "status": "finished",
  "finish_as": "cancelled",
  "reason": "",
  "order_type": "close-long-order"
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#options) Options

Options API

## [#](#list-all-underlyings) List all underlyings

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/underlyings'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/underlyings \
  -H 'Accept: application/json'
```

`GET /options/underlyings`

_List all underlyings_

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC_USDT",
    "index_price": "70000"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-all-expiration-times) List all expiration times

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/expirations'
query_param = 'underlying=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/expirations?underlying=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /options/expirations`

_List all expiration times_

### Parameters

> Example responses

> 200 Response

```json
[1637913600]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-all-the-contracts-with-specified-underlying-and-expiration-time) List all the contracts with specified underlying and expiration time

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/contracts'
query_param = 'underlying=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/contracts?underlying=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /options/contracts`

_List all the contracts with specified underlying and expiration time_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC_USDT-20211130-65000-C",
    "tag": "WEEK",
    "create_time": 1636702700,
    "expiration_time": 1637913600,
    "is_call": true,
    "strike_price": "65000",
    "last_price": "13000",
    "mark_price": "14010",
    "orderbook_id": 9,
    "trade_id": 1,
    "trade_size": 10,
    "position_size": 10,
    "underlying": "BTC_USDT",
    "underlying_price": "70000",
    "multiplier": "0.0001",
    "order_price_round": "0.1",
    "mark_price_round": "0.1",
    "maker_fee_rate": "0.0004",
    "taker_fee_rate": "0.0004",
    "price_limit_fee_rate": "0.1",
    "ref_discount_rate": "0",
    "ref_rebate_rate": "0",
    "order_price_deviate": "0.5",
    "order_size_min": 1,
    "order_size_max": 100000,
    "orders_limit": 50
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#query-specified-contract-detail) Query specified contract detail

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/contracts/BTC_USDT-20211130-65000-C'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/contracts/BTC_USDT-20211130-65000-C \
  -H 'Accept: application/json'
```

`GET /options/contracts/{contract}`

_Query specified contract detail_

### Parameters

> Example responses

> 200 Response

```json
{
  "name": "BTC_USDT-20211130-65000-C",
  "tag": "WEEK",
  "create_time": 1636702700,
  "expiration_time": 1637913600,
  "is_call": true,
  "strike_price": "65000",
  "last_price": "13000",
  "mark_price": "14010",
  "orderbook_id": 9,
  "trade_id": 1,
  "trade_size": 10,
  "position_size": 10,
  "underlying": "BTC_USDT",
  "underlying_price": "70000",
  "multiplier": "0.0001",
  "order_price_round": "0.1",
  "mark_price_round": "0.1",
  "maker_fee_rate": "0.0004",
  "taker_fee_rate": "0.0004",
  "price_limit_fee_rate": "0.1",
  "ref_discount_rate": "0",
  "ref_rebate_rate": "0",
  "order_price_deviate": "0.5",
  "order_size_min": 1,
  "order_size_max": 100000,
  "orders_limit": 50
}
```

### Responses

### Response Schema

Status Code **200**

_Options contract detail_

This operation does not require authentication

## [#](#list-settlement-history-2) List settlement history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/settlements'
query_param = 'underlying=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/settlements?underlying=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /options/settlements`

_List settlement history_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "time": 1598839200,
    "profit": "312.35",
    "fee": "0.3284",
    "settle_price": "11687.65",
    "contract": "BTC-WEEKLY-200824-11000-P",
    "strike_price": "12000"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-specified-contract-s-settlement) Get specified contract's settlement

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/settlements/BTC_USDT-20211130-65000-C'
query_param = 'underlying=BTC_USDT&at=0'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/settlements/BTC_USDT-20211130-65000-C?underlying=BTC_USDT&at=0 \
  -H 'Accept: application/json'
```

`GET /options/settlements/{contract}`

_Get specified contract's settlement_

### Parameters

> Example responses

> 200 Response

```json
{
  "time": 1598839200,
  "profit": "312.35",
  "fee": "0.3284",
  "settle_price": "11687.65",
  "contract": "BTC-WEEKLY-200824-11000-P",
  "strike_price": "12000"
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-my-options-settlements) List my options settlements

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/my_settlements'
query_param = 'underlying=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/my_settlements"
query_param="underlying=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/my_settlements`

_List my options settlements_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "size": -1,
    "settle_profit": "0",
    "contract": "BTC_USDT-20220624-26000-C",
    "strike_price": "26000",
    "time": 1656057600,
    "settle_price": "20917.461281337048",
    "underlying": "BTC_USDT",
    "realised_pnl": "-0.00116042",
    "fee": "0"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#options-order-book) Options order book

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/order_book'
query_param = 'contract=BTC_USDT-20210916-5000-C'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/order_book?contract=BTC_USDT-20210916-5000-C \
  -H 'Accept: application/json'
```

`GET /options/order_book`

_Options order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

#### [#](#enumerated-values-118) Enumerated Values

> Example responses

> 200 Response

```json
{
  "id": 123456,
  "current": 1623898993.123,
  "update": 1623898993.121,
  "asks": [
    {
      "p": "1.52",
      "s": 100
    },
    {
      "p": "1.53",
      "s": 40
    }
  ],
  "bids": [
    {
      "p": "1.17",
      "s": 150
    },
    {
      "p": "1.16",
      "s": 203
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-tickers-of-options-contracts) List tickers of options contracts

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/tickers'
query_param = 'underlying=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/tickers?underlying=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /options/tickers`

_List tickers of options contracts_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "name": "BTC_USDT-20211130-65000-C",
    "last_price": "13000",
    "mark_price": "14010",
    "position_size": 10,
    "ask1_size": 0,
    "ask1_price": "0",
    "bid1_size": 1,
    "bid1_price": "11",
    "vega": "41.41202",
    "theta": "-120.1506",
    "rho": "6.52485",
    "gamma": "0.00004",
    "delta": "0.33505",
    "mark_iv": "0.123",
    "bid_iv": "0.023",
    "ask_iv": "0.342",
    "leverage": "13"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-underlying-ticker) Get underlying ticker

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/underlying/tickers/BTC_USDT'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/underlying/tickers/BTC_USDT \
  -H 'Accept: application/json'
```

`GET /options/underlying/tickers/{underlying}`

_Get underlying ticker_

### Parameters

> Example responses

> 200 Response

```json
{
  "trade_put": 33505,
  "trade_call": 123,
  "index_price": "76543.3"
}
```

### Responses

### Response Schema

Status Code **200**

_Options underlying detail_

This operation does not require authentication

## [#](#get-options-candlesticks) Get options candlesticks

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/candlesticks'
query_param = 'contract=BTC_USDT-20210916-5000-C'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/candlesticks?contract=BTC_USDT-20210916-5000-C \
  -H 'Accept: application/json'
```

`GET /options/candlesticks`

_Get options candlesticks_

### Parameters

#### [#](#enumerated-values-119) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1539852480,
    "v": 97151,
    "c": "1.032",
    "h": "1.032",
    "l": "1.032",
    "o": "1.032"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#mark-price-candlesticks-of-an-underlying) Mark price candlesticks of an underlying

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/underlying/candlesticks'
query_param = 'underlying=BTC_USDT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/underlying/candlesticks?underlying=BTC_USDT \
  -H 'Accept: application/json'
```

`GET /options/underlying/candlesticks`

_Mark price candlesticks of an underlying_

### Parameters

#### [#](#enumerated-values-120) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "t": 1539852480,
    "v": 97151,
    "c": "1.032",
    "h": "1.032",
    "l": "1.032",
    "o": "1.032",
    "sum": "3580"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#options-trade-history) Options trade history

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/trades'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/options/trades \
  -H 'Accept: application/json'
```

`GET /options/trades`

_Options trade history_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 121234231,
    "create_time": 1514764800,
    "contract": "BTC_USDT",
    "size": -100,
    "price": "100.123"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#list-options-account) List options account

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/accounts'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/accounts"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/accounts`

_List options account_

> Example responses

> 200 Response

```json
{
  "user": 666,
  "currency": "USDT",
  "short_enabled": true,
  "mmp_enabled": false,
  "liq_triggered": false,
  "margin_mode": 0,
  "total": "1650.443022",
  "position_value": "-40.1136",
  "equity": "1610.329422",
  "unrealised_pnl": "-0.7811",
  "init_margin": "0",
  "maint_margin": "135.541485",
  "order_margin": "139.74496",
  "ask_order_margin": "139.74496",
  "bid_order_margin": "0",
  "available": "1514.901537",
  "point": "0",
  "orders_limit": 10,
  "position_notional_limit": 1000000
}
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-121) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-account-changing-history) List account changing history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/account_book'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/account_book"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/account_book`

_List account changing history_

### Parameters

#### [#](#detailed-descriptions-33) Detailed descriptions

**type**: Changing Type:

- dnw: Deposit & Withdraw
- prem: Trading premium
- fee: Trading fee
- refr: Referrer rebate
- set: settlement PNL

#### [#](#enumerated-values-122) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "time": 1636426005,
    "change": "-0.16",
    "balance": "7378.189",
    "text": "BTC_USDT-20211216-5000-P:25",
    "type": "fee"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-positions-of-specified-underlying) List user's positions of specified underlying

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/positions'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/positions"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/positions`

_List user's positions of specified underlying_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "user": 11027586,
    "underlying": "BTC_USDT",
    "underlying_price": "70000",
    "contract": "BTC_USDT-20211216-5000-P",
    "size": 10,
    "entry_price": "1234",
    "realised_pnl": "120",
    "mark_price": "6000",
    "mark_iv": "0.9638",
    "unrealised_pnl": "-320",
    "pending_orders": 1,
    "close_order": {
      "id": 232323,
      "price": "5779",
      "is_liq": false
    },
    "delta": "-0.0046",
    "gamma": "0",
    "vega": "2.87656",
    "theta": "-1.00247"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-specified-contract-position) Get specified contract position

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/positions/BTC_USDT-20211130-65000-C'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/positions/BTC_USDT-20211130-65000-C"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/positions/{contract}`

_Get specified contract position_

### Parameters

> Example responses

> 200 Response

```json
{
  "user": 11027586,
  "underlying": "BTC_USDT",
  "underlying_price": "70000",
  "contract": "BTC_USDT-20211216-5000-P",
  "size": 10,
  "entry_price": "1234",
  "realised_pnl": "120",
  "mark_price": "6000",
  "mark_iv": "0.9638",
  "unrealised_pnl": "-320",
  "pending_orders": 1,
  "close_order": {
    "id": 232323,
    "price": "5779",
    "is_liq": false
  },
  "delta": "-0.0046",
  "gamma": "0",
  "vega": "2.87656",
  "theta": "-1.00247"
}
```

### Responses

### Response Schema

Status Code **200**

_Options position information_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-liquidation-history-of-specified-underlying) List user's liquidation history of specified underlying

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/position_close'
query_param = 'underlying=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/position_close"
query_param="underlying=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/position_close`

_List user's liquidation history of specified underlying_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "time": 1631764800,
    "pnl": "-42914.291",
    "settle_size": "-10001",
    "side": "short",
    "contract": "BTC_USDT-20210916-5000-C",
    "text": "settled"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-123) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-options-order) Create an options order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/orders'
query_param = ''
body='{"size":-1,"iceberg":0,"contract":"BTC_USDT-20210916-5000-C","text":"-","tif":"gtc","price":"100"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/options/orders"
query_param=""
body_param='{"size":-1,"iceberg":0,"contract":"BTC_USDT-20210916-5000-C","text":"-","tif":"gtc","price":"100"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /options/orders`

_Create an options order_

> Body parameter

```json
{
  "size": -1,
  "iceberg": 0,
  "contract": "BTC_USDT-20210916-5000-C",
  "text": "-",
  "tif": "gtc",
  "price": "100"
}
```

### Parameters

#### [#](#detailed-descriptions-34) Detailed descriptions

**» tif**: Time in force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) Besides
    user defined information, reserved contents are listed below, denoting how
    the order is created:

- web: from web
- api: from API
- app: from mobile phones
- auto_deleveraging: from ADL
- liquidation: from liquidation
- insurance: from insurance

#### [#](#enumerated-values-124) Enumerated Values

> Example responses

> 201 Response

```json
{
  "status": "finished",
  "size": -1,
  "id": 2,
  "iceberg": 0,
  "is_liq": false,
  "is_close": false,
  "is_mmp": false,
  "contract": "BTC_USDT-20210916-5000-C",
  "text": "-",
  "fill_price": "100",
  "finish_as": "filled",
  "left": 0,
  "tif": "gtc",
  "is_reduce_only": false,
  "create_time": 1631763361,
  "finish_time": 1631763397,
  "price": "100"
}
```

### Responses

### Response Schema

Status Code **201**

_Options order detail_

#### [#](#enumerated-values-125) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-options-orders) List options orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/orders'
query_param = 'status=open'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/orders"
query_param="status=open"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/orders`

_List options orders_

### Parameters

#### [#](#enumerated-values-126) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "status": "finished",
    "size": -1,
    "id": 2,
    "iceberg": 0,
    "is_liq": false,
    "is_close": false,
    "is_mmp": false,
    "contract": "BTC_USDT-20210916-5000-C",
    "text": "-",
    "fill_price": "100",
    "finish_as": "filled",
    "left": 0,
    "tif": "gtc",
    "is_reduce_only": false,
    "create_time": 1631763361,
    "finish_time": 1631763397,
    "price": "100"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-127) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched-3) Cancel all `open` orders matched

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/options/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /options/orders`

_Cancel all `open` orders matched_

### Parameters

#### [#](#enumerated-values-128) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "status": "finished",
    "size": -1,
    "id": 2,
    "iceberg": 0,
    "is_liq": false,
    "is_close": false,
    "is_mmp": false,
    "contract": "BTC_USDT-20210916-5000-C",
    "text": "-",
    "fill_price": "100",
    "finish_as": "filled",
    "left": 0,
    "tif": "gtc",
    "is_reduce_only": false,
    "create_time": 1631763361,
    "finish_time": 1631763397,
    "price": "100"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-129) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-4) Get a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/orders/{order_id}`

_Get a single order_

### Parameters

> Example responses

> 200 Response

```json
{
  "status": "finished",
  "size": -1,
  "id": 2,
  "iceberg": 0,
  "is_liq": false,
  "is_close": false,
  "is_mmp": false,
  "contract": "BTC_USDT-20210916-5000-C",
  "text": "-",
  "fill_price": "100",
  "finish_as": "filled",
  "left": 0,
  "tif": "gtc",
  "is_reduce_only": false,
  "create_time": 1631763361,
  "finish_time": 1631763397,
  "price": "100"
}
```

### Responses

### Response Schema

Status Code **200**

_Options order detail_

#### [#](#enumerated-values-130) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-4) Cancel a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/options/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /options/orders/{order_id}`

_Cancel a single order_

### Parameters

> Example responses

> 200 Response

```json
{
  "status": "finished",
  "size": -1,
  "id": 2,
  "iceberg": 0,
  "is_liq": false,
  "is_close": false,
  "is_mmp": false,
  "contract": "BTC_USDT-20210916-5000-C",
  "text": "-",
  "fill_price": "100",
  "finish_as": "filled",
  "left": 0,
  "tif": "gtc",
  "is_reduce_only": false,
  "create_time": 1631763361,
  "finish_time": 1631763397,
  "price": "100"
}
```

### Responses

### Response Schema

Status Code **200**

_Options order detail_

#### [#](#enumerated-values-131) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-3) Countdown cancel orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/countdown_cancel_all'
query_param = ''
body='{"timeout":30,"contract":"BTC_USDT-20241001-46000-C","underlying":"BTC_USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/options/countdown_cancel_all"
query_param=""
body_param='{"timeout":30,"contract":"BTC_USDT-20241001-46000-C","underlying":"BTC_USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /options/countdown_cancel_all`

_Countdown cancel orders_

Option order heartbeat detection, when the `timeout` time set by the user is
reached, if the existing countdown is not canceled or a new countdown is set,
the related `option pending order` will be automatically canceled. This
interface can be called repeatedly to set a new countdown or cancel the
countdown. Usage example: Repeat this interface at intervals of 30 seconds, with
each countdown `timeout` set to 30 (seconds). If this interface is not called
again within 30 seconds, all pending orders on the `underlying` `contract` you
specified will be automatically cancelled. If `underlying` `contract` is not
specified, all pending orders of the user will be automatically cancelled If
`timeout` is set to 0 within 30 seconds, the countdown timer will expire and the
automatic order cancellation function will be cancelled.

> Body parameter

```json
{
  "timeout": 30,
  "contract": "BTC_USDT-20241001-46000-C",
  "underlying": "BTC_USDT"
}
```

### Parameters

#### [#](#detailed-descriptions-35) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the
countdown

> Example responses

> 200 Response

```json
{
  "triggerTime": "1660039145000"
}
```

### Responses

### Response Schema

Status Code **200**

_triggerTime_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-4) List personal trading history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/my_trades'
query_param = 'underlying=BTC_USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/my_trades"
query_param="underlying=BTC_USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/my_trades`

_List personal trading history_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "underlying_price": "48000",
    "size": 1,
    "contract": "BTC_USDT-20210916-5000-C",
    "id": 1,
    "role": "taker",
    "create_time": 1631763397,
    "order_id": 4,
    "price": "100"
  }
]
```

### Responses

### Response Schema

Status Code **200**

#### [#](#enumerated-values-132) Enumerated Values

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-settings) MMP Settings

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/mmp'
query_param = ''
body='{"underlying":"BTC_USDT","window":5000,"frozen_period":200,"qty_limit":"10","delta_limit":"10"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/options/mmp"
query_param=""
body_param='{"underlying":"BTC_USDT","window":5000,"frozen_period":200,"qty_limit":"10","delta_limit":"10"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /options/mmp`

_MMP Settings_

> Body parameter

```json
{
  "underlying": "BTC_USDT",
  "window": 5000,
  "frozen_period": 200,
  "qty_limit": "10",
  "delta_limit": "10"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "underlying": "BTC_USDT",
  "window": 5000,
  "frozen_period": 200,
  "qty_limit": "10",
  "delta_limit": "10",
  "trigger_time_ms": 0,
  "frozen_until_ms": 0
}
```

### Responses

### Response Schema

Status Code **200**

_MMP Settings_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-query) MMP Query

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/mmp'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/options/mmp"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /options/mmp`

_MMP Query_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "underlying": "BTC_USDT",
    "window": 5000,
    "frozen_period": 200,
    "qty_limit": "10",
    "delta_limit": "10",
    "trigger_time_ms": 0,
    "frozen_until_ms": 0
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-reset) MMP Reset

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/options/mmp/reset'
query_param = ''
body='{"underlying":"BTC_USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/options/mmp/reset"
query_param=""
body_param='{"underlying":"BTC_USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /options/mmp/reset`

_MMP Reset_

> Body parameter

```json
{
  "underlying": "BTC_USDT"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "underlying": "BTC_USDT",
  "window": 5000,
  "frozen_period": 200,
  "qty_limit": "10",
  "delta_limit": "10",
  "trigger_time_ms": 0,
  "frozen_until_ms": 0
}
```

### Responses

### Response Schema

Status Code **200**

_MMP Settings_

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#earnuni) EarnUni

Lend & Earn

## [#](#list-currencies-for-lending) List currencies for lending

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/currencies'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/earn/uni/currencies \
  -H 'Accept: application/json'
```

`GET /earn/uni/currencies`

_List currencies for lending_

> Example responses

> 200 Response

```json
[
  {
    "currency": "AE",
    "min_lend_amount": "100",
    "max_lend_amount": "200000000",
    "max_rate": "0.00057",
    "min_rate": "0.000001"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#get-currency-detail-for-lending) Get currency detail for lending

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/currencies/btc'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/earn/uni/currencies/btc \
  -H 'Accept: application/json'
```

`GET /earn/uni/currencies/{currency}`

_Get currency detail for lending_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "AE",
  "min_lend_amount": "100",
  "max_lend_amount": "200000000",
  "max_rate": "0.00057",
  "min_rate": "0.000001"
}
```

### Responses

### Response Schema

Status Code **200**

_Currency detail_

This operation does not require authentication

## [#](#lend-or-redeem) Lend or redeem

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/lends'
query_param = ''
body='{"currency":"AE","amount":"100","min_rate":"0.00001","type":"lend"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/earn/uni/lends"
query_param=""
body_param='{"currency":"AE","amount":"100","min_rate":"0.00001","type":"lend"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /earn/uni/lends`

_Lend or redeem_

`Lending`:

The minimum interest rate is required in lending. The lending result is updated
hourly and the interest profit is paid on the next hour. A high interest rate
might lead to unsuccessful lending and no profit will be gained for that hour.
If the funds are redeemed before the hourly settlement, no interest can be
obtained for that hour. About priority: the orders created or amended first
under the same interest rate will be lent out first

`Redemption`:

Funds that failed to be lent can be redeemed immediately. For the successfully
lent funds, enjoy the hourly income, and the redemption will arrive at the next
hour

`Note`:

Two minutes before and after the hour is the settlement time, lending and
redemption are prohibited.

> Body parameter

```json
{
  "currency": "AE",
  "amount": "100",
  "min_rate": "0.00001",
  "type": "lend"
}
```

### Parameters

#### [#](#enumerated-values-133) Enumerated Values

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-lending-orders) List user's lending orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/lends'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/uni/lends"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/uni/lends`

_List user's lending orders_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "current_amount": "20.999992",
    "amount": "20.999992",
    "lent_amount": "0",
    "frozen_amount": "0",
    "min_rate": "0.1",
    "interest_status": "interest_dividend",
    "reinvest_left_amount": 0,
    "create_time": 1673247054000,
    "update_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-lending-order) Amend lending order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/lends'
query_param = ''
body='{"currency":"AE","min_rate":"0.0001"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('PATCH', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('PATCH', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="PATCH"
url="/earn/uni/lends"
query_param=""
body_param='{"currency":"AE","min_rate":"0.0001"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`PATCH /earn/uni/lends`

_Amend lending order_

Currently only supports amending the minimum interest rate (hour)

> Body parameter

```json
{
  "currency": "AE",
  "min_rate": "0.0001"
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-records-of-lending) List records of lending

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/lend_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/uni/lend_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/uni/lend_records`

_List records of lending_

### Parameters

#### [#](#enumerated-values-134) Enumerated Values

> Example responses

> 200 Response

```json
[
  {
    "type": "lend",
    "currency": "BTC",
    "amount": "1",
    "last_wallet_amount": "0.2",
    "last_lent_amount": "0",
    "last_frozen_amount": "0",
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-user-s-total-interest-income-of-specified-currency) Get the user's total interest income of specified currency

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/interests/btc'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/uni/interests/btc"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/uni/interests/{currency}`

_Get the user's total interest income of specified currency_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "AE",
  "interest": "123.345"
}
```

### Responses

### Response Schema

Status Code **200**

_UniLendInterest_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records-3) List interest records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/interest_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/uni/interest_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/uni/interest_records`

_List interest records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "status": 1,
    "currency": "AE",
    "actual_rate": "0.0005",
    "interest": "0.05",
    "interest_status": "interest_dividend",
    "create_time": 1673247054000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-interest-reinvestment-toggle) Set interest reinvestment toggle

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/interest_reinvest'
query_param = ''
body='{"currency":"BTC","status":true}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('PUT', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="PUT"
url="/earn/uni/interest_reinvest"
query_param=""
body_param='{"currency":"BTC","status":true}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`PUT /earn/uni/interest_reinvest`

_Set interest reinvestment toggle_

> Body parameter

```json
{
  "currency": "BTC",
  "status": true
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-currency-interest-compounding-status) query currency interest compounding status

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/uni/interest_status/btc'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/uni/interest_status/btc"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/uni/interest_status/{currency}`

_query currency interest compounding status_

### Parameters

> Example responses

> 200 Response

```json
{
  "currency": "BTC",
  "interest_status": "interest_dividend"
}
```

### Responses

### Response Schema

Status Code **200**

_UniCurrencyInterest_

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#collateral-loan) Collateral-loan

Collateral Loan

## [#](#place-order) Place order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/orders'
query_param = ''
body='{"collateral_amount":"1","collateral_currency":"BTC","borrow_amount":"49","borrow_currency":"USDT"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/loan/collateral/orders"
query_param=""
body_param='{"collateral_amount":"1","collateral_currency":"BTC","borrow_amount":"49","borrow_currency":"USDT"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /loan/collateral/orders`

_Place order_

> Body parameter

```json
{
  "collateral_amount": "1",
  "collateral_currency": "BTC",
  "borrow_amount": "49",
  "borrow_currency": "USDT"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "order_id": 10005578
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-orders-2) List Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/collateral/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/collateral/orders`

_List Orders_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": 10000421,
    "collateral_currency": "BTC",
    "borrow_currency": "USDT",
    "collateral_amount": "1",
    "borrow_amount": "1000",
    "repaid_amount": "10",
    "repaid_principal": "10",
    "repaid_interest": "0",
    "init_ltv": "0.0003934533764831",
    "current_ltv": "0.0004521768651985",
    "liquidate_ltv": "0.9",
    "status": "initial_status",
    "borrow_time": 1688462668,
    "left_repay_total": "990.0219384",
    "left_repay_interest": "0.0219384"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-5) Get a single order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/orders/100001'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/collateral/orders/100001"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/collateral/orders/{order_id}`

_Get a single order_

### Parameters

> Example responses

> 200 Response

```json
{
  "order_id": 10000421,
  "collateral_currency": "BTC",
  "borrow_currency": "USDT",
  "collateral_amount": "1",
  "borrow_amount": "1000",
  "repaid_amount": "10",
  "repaid_principal": "10",
  "repaid_interest": "0",
  "init_ltv": "0.0003934533764831",
  "current_ltv": "0.0004521768651985",
  "liquidate_ltv": "0.9",
  "status": "initial_status",
  "borrow_time": 1688462668,
  "left_repay_total": "990.0219384",
  "left_repay_interest": "0.0219384"
}
```

### Responses

### Response Schema

Status Code **200**

_Collateral Order_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#repayment) Repayment

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/repay'
query_param = ''
body='{"order_id":37438962,"repay_amount":"1000","repaid_all":false}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/loan/collateral/repay"
query_param=""
body_param='{"order_id":37438962,"repay_amount":"1000","repaid_all":false}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /loan/collateral/repay`

_Repayment_

> Body parameter

```json
{
  "order_id": 37438962,
  "repay_amount": "1000",
  "repaid_all": false
}
```

### Parameters

#### [#](#detailed-descriptions-36) Detailed descriptions

**» repaid_all**: Repayment method, set to `true` for full repayment, and
`false` for partial repayment; When set to false for partial repayment, the
repay_amount parameter cannot be greater than the remaining amount to be repaid
by the user.

> Example responses

> 200 Response

```json
{
  "repaid_principal": "11",
  "repaid_interest": "111"
}
```

### Responses

### Response Schema

Status Code **200**

_Repay_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#repayment-history) Repayment history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/repay_records'
query_param = 'source=repay'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/collateral/repay_records"
query_param="source=repay"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/collateral/repay_records`

_Repayment history_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": 10000425,
    "record_id": 181,
    "repaid_amount": "10.00000000000000000000",
    "borrow_currency": "USDT",
    "collateral_currency": "BTC",
    "collateral_amount": "1.00000000000000000000",
    "init_ltv": "0.00039345337648310000",
    "borrow_time": 1688471851,
    "repay_time": 1688526310,
    "total_interest": "0.25446901544300000000",
    "before_left_principal": "11.00000000",
    "pre_left_principal": "990.00000000000000000000",
    "after_left_principal": "990.00000000000000000000",
    "before_left_collateral": "1.00000000000000000000",
    "after_left_collateral": "1.00000000000000000000"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#increase-or-redeem-collateral) Increase or redeem collateral

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/collaterals'
query_param = ''
body='{"collateral_amount":"1212","collateral_currency":"BTC","order_id":1130,"type":"append"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/loan/collateral/collaterals"
query_param=""
body_param='{"collateral_amount":"1212","collateral_currency":"BTC","order_id":1130,"type":"append"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /loan/collateral/collaterals`

_Increase or redeem collateral_

> Body parameter

```json
{
  "collateral_amount": "1212",
  "collateral_currency": "BTC",
  "order_id": 1130,
  "type": "append"
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-adjustment-records) Query collateral adjustment records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/collaterals'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/collateral/collaterals"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/collateral/collaterals`

_Query collateral adjustment records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": 10000417,
    "record_id": 10000452,
    "borrow_currency": "USDT",
    "borrow_amount": "1000.00000000000000000000",
    "collateral_currency": "BTC",
    "pre_collateral": "1.00000000000000000000",
    "after_collateral": "2.00000000000000000000",
    "pre_ltv": "0.00039345555621480000",
    "after_ltv": "0.00019672777810740000",
    "operate_time": 1688461924
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-the-total-borrowing-and-collateral-amount-for-the-user) Query the total borrowing and collateral amount for the user

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/total_amount'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/collateral/total_amount"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/collateral/total_amount`

_Query the total borrowing and collateral amount for the user_

> Example responses

> 200 Response

```json
{
  "borrow_amount": "11",
  "collateral_amount": "111"
}
```

### Responses

### Response Schema

Status Code **200**

_Total borrowed amount and pledged collateral amount by the user_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-collateralization-ratio) Query user's collateralization ratio

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/ltv'
query_param = 'collateral_currency=BTC&borrow_currency=USDT'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/collateral/ltv"
query_param="collateral_currency=BTC&borrow_currency=USDT"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/collateral/ltv`

_Query user's collateralization ratio_

### Parameters

> Example responses

> 200 Response

```json
{
  "collateral_currency": "BTC",
  "borrow_currency": "USDT",
  "init_ltv": "0.7",
  "alert_ltv": "0.8",
  "liquidate_ltv": "0.9",
  "min_borrow_amount": "3",
  "left_borrowable_amount": "4233030.635065916703"
}
```

### Responses

### Response Schema

Status Code **200**

_User's currency statistics data_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-supported-borrowing-and-collateral-currencies) Query supported borrowing and collateral currencies

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/collateral/currencies'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/loan/collateral/currencies \
  -H 'Accept: application/json'
```

`GET /loan/collateral/currencies`

_Query supported borrowing and collateral currencies_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "loan_currency": "BTC",
    "collateral_currency": ["BTC", "ETH", "GT"]
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

# [#](#multi-collateral-loan) Multi-collateral-loan

Multi-Collateral Loan

## [#](#create-multi-collateral-order) Create Multi-Collateral Order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/orders'
query_param = ''
body='{"order_id":1721387470,"order_type":"fixed","fixed_type":"7d","fixed_rate":0.00001,"auto_renew":true,"auto_repay":true,"borrow_currency":"BTC","borrow_amount":"1","collateral_currencies":[{"currency":"USDT","amount":"1000"}]}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/loan/multi_collateral/orders"
query_param=""
body_param='{"order_id":1721387470,"order_type":"fixed","fixed_type":"7d","fixed_rate":0.00001,"auto_renew":true,"auto_repay":true,"borrow_currency":"BTC","borrow_amount":"1","collateral_currencies":[{"currency":"USDT","amount":"1000"}]}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /loan/multi_collateral/orders`

_Create Multi-Collateral Order_

> Body parameter

```json
{
  "order_id": 1721387470,
  "order_type": "fixed",
  "fixed_type": "7d",
  "fixed_rate": 0.00001,
  "auto_renew": true,
  "auto_repay": true,
  "borrow_currency": "BTC",
  "borrow_amount": "1",
  "collateral_currencies": [
    {
      "currency": "USDT",
      "amount": "1000"
    }
  ]
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "order_id": 10005578
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-multi-collateral-orders) List Multi-Collateral Orders

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/multi_collateral/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/multi_collateral/orders`

_List Multi-Collateral Orders_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": "10005578",
    "order_type": "fixed",
    "fixed_type": "7d",
    "fixed_rate": 0.00001,
    "expire_time": 1703820105,
    "auto_renew": true,
    "auto_repay": true,
    "current_ltv": "0.0001004349664281",
    "status": "lent",
    "borrow_time": 1702615021,
    "total_left_repay_usdt": "106.491212982",
    "total_left_collateral_usdt": "1060300.18",
    "borrow_currencies": [
      {
        "currency": "GT",
        "index_price": "10.6491",
        "left_repay_principal": "10",
        "left_repay_interest": "0.00002",
        "left_repay_usdt": "106.491212982"
      }
    ],
    "collateral_currencies": [
      {
        "currency": "BTC",
        "index_price": "112794.7",
        "left_collateral": "9.4",
        "left_collateral_usdt": "1060270.18"
      },
      {
        "currency": "USDT",
        "index_price": "1",
        "left_collateral": "30",
        "left_collateral_usdt": "30"
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-multi-collateral-order-detail) Get Multi-Collateral Order Detail

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/orders/12345'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/multi_collateral/orders/12345"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/multi_collateral/orders/{order_id}`

_Get Multi-Collateral Order Detail_

### Parameters

> Example responses

> 200 Response

```json
{
  "order_id": "10005578",
  "order_type": "fixed",
  "fixed_type": "7d",
  "fixed_rate": 0.00001,
  "expire_time": 1703820105,
  "auto_renew": true,
  "auto_repay": true,
  "current_ltv": "0.0001004349664281",
  "status": "lent",
  "borrow_time": 1702615021,
  "total_left_repay_usdt": "106.491212982",
  "total_left_collateral_usdt": "1060300.18",
  "borrow_currencies": [
    {
      "currency": "GT",
      "index_price": "10.6491",
      "left_repay_principal": "10",
      "left_repay_interest": "0.00002",
      "left_repay_usdt": "106.491212982"
    }
  ],
  "collateral_currencies": [
    {
      "currency": "BTC",
      "index_price": "112794.7",
      "left_collateral": "9.4",
      "left_collateral_usdt": "1060270.18"
    },
    {
      "currency": "USDT",
      "index_price": "1",
      "left_collateral": "30",
      "left_collateral_usdt": "30"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

_Multi-Collateral Order_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#repay-multi-collateral-loan) Repay Multi-Collateral Loan

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/repay'
query_param = ''
body='{"order_id":10005578,"repay_items":[{"currency":"btc","amount":"1","repaid_all":false}]}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/loan/multi_collateral/repay"
query_param=""
body_param='{"order_id":10005578,"repay_items":[{"currency":"btc","amount":"1","repaid_all":false}]}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /loan/multi_collateral/repay`

_Repay Multi-Collateral Loan_

> Body parameter

```json
{
  "order_id": 10005578,
  "repay_items": [
    {
      "currency": "btc",
      "amount": "1",
      "repaid_all": false
    }
  ]
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "order_id": 10005679,
  "repaid_currencies": [
    {
      "succeeded": false,
      "label": "INVALID_PARAM_VALUE",
      "message": "Invalid parameter value",
      "currency": "BTC",
      "repaid_principal": "1",
      "repaid_interest": "0.0001"
    },
    {
      "succeeded": true,
      "currency": "BTC",
      "repaid_principal": "1",
      "repaid_interest": "0.0001"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

_Repay Multi-Collateral Loan_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-multi-collateral-repay-records) List Multi-Collateral Repay Records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/repay'
query_param = 'type=repay'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/multi_collateral/repay"
query_param="type=repay"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/multi_collateral/repay`

_List Multi-Collateral Repay Records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": 10005679,
    "record_id": 1348,
    "init_ltv": "0.2141",
    "before_ltv": "0.215",
    "after_ltv": "0.312",
    "borrow_time": 1702995889,
    "repay_time": 1703053927,
    "borrow_currencies": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "before_amount": "1",
        "before_amount_usdt": "103.02",
        "after_amount": "0.999017",
        "after_amount_usdt": "102.91873134"
      }
    ],
    "collateral_currencies": [
      {
        "currency": "ETC",
        "index_price": "0.6014228107",
        "before_amount": "1000",
        "before_amount_usdt": "601.4228107",
        "after_amount": "1000",
        "after_amount_usdt": "601.4228107"
      }
    ],
    "repaid_currencies": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "repaid_amount": "0.001",
        "repaid_principal": "0.000983",
        "repaid_interest": "0.000017",
        "repaid_amount_usdt": "0.10302"
      }
    ],
    "total_interest_list": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "amount": "0.000017",
        "amount_usdt": "0.00175134"
      }
    ],
    "left_repay_interest_list": [
      {
        "currency": "BAT",
        "index_price": "103.02",
        "before_amount": "0.000017",
        "before_amount_usdt": "0.00175134",
        "after_amount": "0",
        "after_amount_usdt": "0"
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#operate-multi-collateral) Operate Multi-Collateral

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/mortgage'
query_param = ''
body='{"order_id":10005578,"type":"append","collaterals":[{"currency":"btc","amount":"0.5"}]}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/loan/multi_collateral/mortgage"
query_param=""
body_param='{"order_id":10005578,"type":"append","collaterals":[{"currency":"btc","amount":"0.5"}]}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /loan/multi_collateral/mortgage`

_Operate Multi-Collateral_

> Body parameter

```json
{
  "order_id": 10005578,
  "type": "append",
  "collaterals": [
    {
      "currency": "btc",
      "amount": "0.5"
    }
  ]
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "order_id": 10005679,
  "collateral_currencies": [
    {
      "succeeded": true,
      "currency": "btc",
      "amount": "0.5"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

_Result of multi-collateral adjustment_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-adjustment-records-2) Query collateral adjustment records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/mortgage'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/multi_collateral/mortgage"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/multi_collateral/mortgage`

_Query collateral adjustment records_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "order_id": 10000417,
    "record_id": 10000452,
    "before_ltv": "0.00039345555621480000",
    "after_ltv": "0.00019672777810740000",
    "operate_time": 1688461924,
    "borrow_currencies": [
      {
        "currency": "BTC",
        "index_price": "30000",
        "before_amount": "0.1",
        "before_amount_usdt": "1000",
        "after_amount": "0.6",
        "after_amount_usdt": "1006"
      }
    ],
    "collateral_currencies": [
      {
        "currency": "BTC",
        "index_price": "30000",
        "before_amount": "0.1",
        "before_amount_usdt": "1000",
        "after_amount": "0.6",
        "after_amount_usdt": "1006"
      }
    ]
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-currency-quota) List User Currency Quota

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/currency_quota'
query_param = 'type=collateral&currency=BTC'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/loan/multi_collateral/currency_quota"
query_param="type=collateral&currency=BTC"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /loan/multi_collateral/currency_quota`

_List User Currency Quota_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "index_price": "35306.1",
    "min_quota": "0",
    "left_quota": "2768152.4958445218723677",
    "left_quote_usdt": "97732668833.536273678"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-supported-borrowing-and-collateral-currencies-in-multi-collateral) Query supported borrowing and collateral currencies in Multi-Collateral

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/currencies'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/loan/multi_collateral/currencies \
  -H 'Accept: application/json'
```

`GET /loan/multi_collateral/currencies`

\*Query supported borrowing and collateral currencies in Multi-Collateral \*

> Example responses

> 200 Response

```json
{
  "loan_currencies": [
    {
      "currency": "BTC",
      "price": "1212"
    },
    {
      "currency": "GT",
      "price": "12"
    }
  ],
  "collateral_currencies": [
    {
      "currency": "BTC",
      "index_price": "1212",
      "discount": "0.7"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

_Borrowing and collateral currencies supported for Multi-Collateral._

This operation does not require authentication

## [#](#get-multi-collateral-ratio) Get Multi-Collateral ratio

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/ltv'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/loan/multi_collateral/ltv \
  -H 'Accept: application/json'
```

`GET /loan/multi_collateral/ltv`

_Get Multi-Collateral ratio_

The Multi-Collateral ratio is fixed, irrespective of the currency.

> Example responses

> 200 Response

```json
{
  "init_ltv": "0.7",
  "alert_ltv": "0.8",
  "liquidate_ltv": "0.9"
}
```

### Responses

### Response Schema

Status Code **200**

_Collateral Ratio_

This operation does not require authentication

## [#](#query-fixed-interest-rates-for-the-currency-for-7-days-and-30-days) Query fixed interest rates for the currency for 7 days and 30 days

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/fixed_rate'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/loan/multi_collateral/fixed_rate \
  -H 'Accept: application/json'
```

`GET /loan/multi_collateral/fixed_rate`

_Query fixed interest rates for the currency for 7 days and 30 days_

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "rate_7d": "0.000023",
    "rate_30d": "0.1",
    "update_time": 1703820105
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#query-the-current-interest-rate-of-the-currency) Query the current interest rate of the currency

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/loan/multi_collateral/current_rate'
query_param = 'currencies=BTC,GT'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/loan/multi_collateral/current_rate?currencies=BTC,GT \
  -H 'Accept: application/json'
```

`GET /loan/multi_collateral/current_rate`

_Query the current interest rate of the currency_

Query the current interest rate of the currency in the last hour. The current
interest rate is updated every hour.

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "current_rate": "0.000023"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

# [#](#earn) Earn

earn

## [#](#eth2-swap) ETH2 swap

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/staking/eth2/swap'
query_param = ''
body='{"side":"1","amount":"1.5"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/earn/staking/eth2/swap"
query_param=""
body_param='{"side":"1","amount":"1.5"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /earn/staking/eth2/swap`

_ETH2 swap_

> Body parameter

```json
{
  "side": "1",
  "amount": "1.5"
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#eth2-historical-rate-of-return-query) ETH2 historical rate of return query

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/staking/eth2/rate_records'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/staking/eth2/rate_records"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/staking/eth2/rate_records`

_ETH2 historical rate of return query_

Check the ETH earnings rate record for the last 31 days

> Example responses

> 200 Response

```json
[
  {
    "date_time": 1690348815,
    "date": "2023-07-26",
    "rate": "60.00"
  },
  {
    "date_time": 1690435215,
    "date": "2023-07-27",
    "rate": "20.00"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#dual-investment-product-list) Dual Investment product list

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/dual/investment_plan'
query_param = ''
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/earn/dual/investment_plan \
  -H 'Accept: application/json'
```

`GET /earn/dual/investment_plan`

_Dual Investment product list_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 272,
    "instrument_name": "DOGE-17NOV23-0.067-P",
    "type": "put",
    "invest_currency": "USDT",
    "exercise_currency": "DOGE",
    "exercise_price": 0.067,
    "delivery_time": 1700208000,
    "min_copies": 1,
    "max_copies": 1000,
    "start_time": 1697685172,
    "end_time": 1697685172,
    "status": "ONGOING",
    "apy_display": "0.0114000000",
    "per_value": "1"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#dual-investment-order-list) Dual Investment order list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/dual/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/dual/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/dual/orders`

_Dual Investment order list_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 373,
    "plan_id": 176,
    "copies": "1.0000000000",
    "invest_amount": "0.0000000000",
    "settlement_amount": "0.0000000000",
    "create_time": 1697685172,
    "complete_time": 1697685172,
    "status": "CANCELED",
    "invest_currency": "USDT",
    "exercise_currency": "BTC",
    "settlement_currency": "",
    "exercise_price": "24500.0000000000",
    "settlement_price": "0.0000000000",
    "delivery_time": 1697685172,
    "apy_display": "0.6800000000",
    "apy_settlement": "0.0000000000",
    "text": "t-custom-text"
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-dual-investment-order) Place Dual Investment order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/dual/orders'
query_param = ''
body='{"plan_id":"176","amount":"1","text":"t-custom-text"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/earn/dual/orders"
query_param=""
body_param='{"plan_id":"176","amount":"1","text":"t-custom-text"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /earn/dual/orders`

_Place Dual Investment order_

> Body parameter

```json
{
  "plan_id": "176",
  "amount": "1",
  "text": "t-custom-text"
}
```

### Parameters

#### [#](#detailed-descriptions-37) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#structured-product-list) Structured Product List

> Code samples

```python
# coding: utf-8
import requests

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/structured/products'
query_param = 'status=in_process'
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
curl -X GET https://api.gateio.ws/api/v4/earn/structured/products?status=in_process \
  -H 'Accept: application/json'
```

`GET /earn/structured/products`

_Structured Product List_

### Parameters

#### [#](#detailed-descriptions-38) Detailed descriptions

**type**: Product Type (default all)

`SharkFin2.0`\-SharkFin `BullishSharkFin`\-BullishSharkFin
`BearishSharkFin`\-BearishSharkFin `DoubleNoTouch`\-DoubleNoTouch
`RangeAccrual`\-RangeAccrual `SnowBall`\-SnowBall

**status**: Status (default: all)

`in_process`\-processing `will_begin`\-unstarted `wait_settlement`\-unsettled
`done`\-finish

> Example responses

> 200 Response

```json
[
  {
    "id": 3700,
    "type": "BullishSharkFin",
    "name_en": "Bullish Sharkfin_USDT",
    "investment_period": 7,
    "min_annual_rate": "0.50",
    "mid_annual_rate": "7.50",
    "max_annual_rate": "13.00",
    "watch_market": "BTC_USDT",
    "investment_coin": "USDT",
    "start_time": 1698224400,
    "end_time": 1700902800,
    "status": "in_process"
  }
]
```

### Responses

### Response Schema

Status Code **200**

This operation does not require authentication

## [#](#structured-product-order-list) Structured Product Order List

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/structured/orders'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/earn/structured/orders"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /earn/structured/orders`

_Structured Product Order List_

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 35,
    "pid": "3691",
    "lock_coin": "ETH",
    "amount": "20",
    "status": "SUCCESS",
    "income": "0.000000",
    "create_time": 1697685172
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-structured-product-order) Place Structured Product Order

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/earn/structured/orders'
query_param = ''
body='{"pid":"1","amount":"0.5"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/earn/structured/orders"
query_param=""
body_param='{"pid":"1","amount":"0.5"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /earn/structured/orders`

_Place Structured Product Order_

> Body parameter

```json
{
  "pid": "1",
  "amount": "0.5"
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#account) Account

Get account detail

## [#](#get-account-detail) Get account detail

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/detail'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/account/detail"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /account/detail`

_Get account detail_

> Example responses

> 200 Response

```json
{
  "user_id": 1667201533,
  "ip_whitelist": ["127.0.0.1"],
  "currency_pairs": ["USDT_BTC"],
  "key": {
    "mode": 1
  },
  "tier": 2,
  "copy_trading_role": 1
}
```

### Responses

### Response Schema

Status Code **200**

_AccountDetail_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-transaction-rate-limit-information) Get user transaction rate limit information

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/rate_limit'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/account/rate_limit"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /account/rate_limit`

_Get user transaction rate limit information_

> Example responses

> 200 Response

```json
[
  {
    "type": "spot",
    "tier": "1",
    "ratio": "0",
    "main_ratio": "0",
    "updated_at": "1728230400"
  },
  {
    "type": "futures",
    "tier": "1",
    "ratio": "0",
    "main_ratio": "0",
    "updated_at": "1728230400"
  }
]
```

### Responses

### Response Schema

Status Code **200**

_AccountRateLimit_

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-stp-group) Create STP Group

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/stp_groups'
query_param = ''
body='{"name":"stp_name"}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/account/stp_groups"
query_param=""
body_param='{"name":"stp_name"}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /account/stp_groups`

_Create STP Group_

Only the main account is allowed to create a new STP user group

> Body parameter

```json
{
  "name": "stp_name"
}
```

### Parameters

> Example responses

> 200 Response

```json
{
  "id": 123435,
  "name": "group",
  "create_time": 1548000000,
  "creator_id": 10000
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-stp-groups) List STP Groups

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/stp_groups'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/account/stp_groups"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /account/stp_groups`

_List STP Groups_

Retrieve the list of STP groups created by the main account user only

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "id": 123435,
    "name": "group",
    "create_time": 1548000000,
    "creator_id": 10000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-users-of-the-stp-group) List users of the STP group

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/stp_groups/1/users'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/account/stp_groups/1/users"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /account/stp_groups/{stp_id}/users`

_List users of the STP group_

Only the main account that created this STP group is allowed to list the user ID
of the STP group

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#add-users-to-the-stp-group) Add users to the STP group

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/stp_groups/1/users'
query_param = ''
body='[1,2,3]'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/account/stp_groups/1/users"
query_param=""
body_param='[1,2,3]'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /account/stp_groups/{stp_id}/users`

_Add users to the STP group_

- Only the master account that created the STP user group is allowed to add
  users to the STP user group.- Only accounts under the main account are allowed
  to be added. Cross-account is not permitted

> Body parameter

```json
[1, 2, 3]
```

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-the-user-in-the-stp-group) Delete the user in the STP group

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/stp_groups/1/users'
query_param = 'user_id=1'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('DELETE', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="DELETE"
url="/account/stp_groups/1/users"
query_param="user_id=1"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`DELETE /account/stp_groups/{stp_id}/users`

_Delete the user in the STP group_

- Only the main account that created this STP group is allowed to delete users
  from the STP user group
- Deletion is limited to accounts under the current main account; cross-account
  deletion is not permitted

### Parameters

> Example responses

> 200 Response

```json
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-gt-deduction) Set GT deduction.

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/debit_fee'
query_param = ''
body='{"enabled":true}'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('POST', prefix + url, query_param, body)
headers.update(sign_headers)
r = requests.request('POST', host + prefix + url, headers=headers, data=body)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="POST"
url="/account/debit_fee"
query_param=""
body_param='{"enabled":true}'
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`POST /account/debit_fee`

_Set GT deduction._

Enable or disable GT deduction for the current account.

> Body parameter

```json
{
  "enabled": true
}
```

### Parameters

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-gt-deduction-configuration) Query GT deduction configuration.

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/account/debit_fee'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/account/debit_fee"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /account/debit_fee`

_Query GT deduction configuration._

Query the current GT deduction configuration for the account.

> Example responses

> 200 Response

```json
{
  "enabled": true
}
```

### Responses

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#rebate-2) Rebate

broker rebate endpints

## [#](#the-agency-obtains-the-transaction-history-of-the-recommended-user) The agency obtains the transaction history of the recommended user

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/agency/transaction_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/agency/transaction_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/agency/transaction_history`

_The agency obtains the transaction history of the recommended user_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
{
  "total": 100,
  "list": [
    {
      "transaction_time": 1539852480,
      "user_id": 10000,
      "group_name": "gateio",
      "fee": "1",
      "fee_asset": "GT",
      "currency_pair": "GT_USDT",
      "amount": "1000",
      "source": "SPOT",
      "amount_asset": "GT"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#the-agency-obtains-the-commission-history-of-the-recommended-user) The agency obtains the commission history of the recommended user

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/agency/commission_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/agency/commission_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/agency/commission_history`

_The agency obtains the commission history of the recommended user_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
{
  "total": 100,
  "list": [
    {
      "commission_time": 1539852480,
      "user_id": 10000,
      "group_name": "gateio",
      "commission_amount": "1000",
      "source": "SPOT",
      "commission_asset": "GT"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-obtains-transaction-records-of-recommended-users) Partner obtains transaction records of recommended users

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/partner/transaction_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/partner/transaction_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/partner/transaction_history`

_Partner obtains transaction records of recommended users_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
{
  "total": 15,
  "list": [
    {
      "user_id": 1879032535,
      "group_name": "test",
      "fee": "0.00044800",
      "transaction_time": 1718615824,
      "amount": "29.98688000USDT",
      "amount_asset": "USDT",
      "currency_pair": "BCH_USDT",
      "source": "SPOT",
      "fee_asset": "BCH"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-obtains-commission-records-of-recommended-users) Partner obtains commission records of recommended users

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/partner/commission_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/partner/commission_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/partner/commission_history`

_Partner obtains commission records of recommended users_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
{
  "total": 52,
  "list": [
    {
      "user_id": 1879043947,
      "commission_time": 1718616728,
      "commission_amount": "0.2216934846",
      "commission_asset": "USDT",
      "source": "SPOT",
      "group_name": "test"
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-subordinate-list) Partner subordinate list

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/partner/sub_list'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/partner/sub_list"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/partner/sub_list`

_Partner subordinate list_

Including sub-agents, direct customers, indirect customers

### Parameters

> Example responses

> 200 Response

```json
{
  "total": 3,
  "list": [
    {
      "user_id": 1,
      "user_join_time": 1666255731,
      "type": 1
    },
    {
      "user_id": 2,
      "user_join_time": 1666271213,
      "type": 2
    },
    {
      "user_id": 3,
      "user_join_time": 1666422143,
      "type": 3
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#the-broker-obtains-the-user-s-commission-rebate-records) The broker obtains the user's commission rebate records

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/broker/commission_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/broker/commission_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/broker/commission_history`

_The broker obtains the user's commission rebate records_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
{
  "list": [
    {
      "user_id": 110285442,
      "group_name": "",
      "fee": "0.5000045000",
      "transaction_time": 1702545051,
      "amount": "-1000.00900000",
      "currency_pair": "DOGE_USDT",
      "source": "Futures",
      "fee_asset": "USDT"
    }
  ],
  "total": 47
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#the-broker-obtains-the-user-s-trading-history) The broker obtains the user's trading history

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/broker/transaction_history'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/broker/transaction_history"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/broker/transaction_history`

_The broker obtains the user's trading history_

Record time range cannot exceed 30 days

### Parameters

> Example responses

> 200 Response

```json
{
  "list": [
    {
      "user_id": 110285442,
      "group_name": "",
      "fee": "0.5000045000",
      "transaction_time": 1702545051,
      "amount": "-1000.00900000",
      "currency_pair": "DOGE_USDT",
      "source": "Futures",
      "fee_asset": "USDT"
    }
  ],
  "total": 47
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#user-retrieves-rebate-information) User retrieves rebate information

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/user/info'
query_param = ''
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/user/info"
query_param=""
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/user/info`

_User retrieves rebate information_

> Example responses

> 200 Response

```json
{
  "invite_uid": 987
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#user-subordinate-relationship) User-subordinate relationship

> Code samples

```python
# coding: utf-8
import requests
import time
import hashlib
import hmac

host = "https://api.gateio.ws"
prefix = "/api/v4"
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}

url = '/rebate/user/sub_relation'
query_param = 'user_id_list=1, 2, 3'
# for `gen_sign` implementation, refer to section `Authentication` above
sign_headers = gen_sign('GET', prefix + url, query_param)
headers.update(sign_headers)
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)
print(r.json())
```

```shell
key="YOUR_API_KEY"
secret="YOUR_API_SECRET"
host="https://api.gateio.ws"
prefix="/api/v4"
method="GET"
url="/rebate/user/sub_relation"
query_param="user_id_list=1, 2, 3"
body_param=''
timestamp=$(date +%s)
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')

full_url="$host$prefix$url?$query_param"
curl -X $method $full_url \
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"
```

`GET /rebate/user/sub_relation`

_User-subordinate relationship_

Query whether the specified user is in the system

### Parameters

> Example responses

> 200 Response

```json
{
  "list": [
    {
      "belong": "",
      "ref_uid": 0,
      "type": 0,
      "uid": 9
    },
    {
      "belong": "partner",
      "type": 1,
      "ref_uid": 1,
      "uid": 2
    },
    {
      "belong": "referral",
      "type": 5,
      "ref_uid": 1,
      "uid": 3
    }
  ]
}
```

### Responses

### Response Schema

Status Code **200**

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#schemas) Schemas

## [#](#subaccountkey) SubAccountKey

```json
{
  "user_id": "string",
  "mode": 0,
  "name": "string",
  "perms": [
    {
      "name": "string",
      "read_only": true
    }
  ],
  "ip_whitelist": ["string"],
  "key": "string",
  "state": 0,
  "created_at": 0,
  "updated_at": 0,
  "last_access": 0
}
```

### [#](#properties) Properties

## [#](#estimaterate) EstimateRate

```json
{
  "property1": "string",
  "property2": "string"
}
```

_Estimate the current hourly lending rates, categorized by currency_

### [#](#properties-2) Properties

## [#](#spotpricetriggeredorder) SpotPriceTriggeredOrder

```json
{
  "trigger": {
    "price": "string",
    "rule": ">=",
    "expiration": 0
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "string",
    "amount": "string",
    "account": "normal",
    "time_in_force": "gtc",
    "auto_borrow": false,
    "auto_repay": false,
    "text": "string"
  },
  "id": 0,
  "user": 0,
  "market": "string",
  "ctime": 0,
  "ftime": 0,
  "fired_order_id": 0,
  "status": "string",
  "reason": "string"
}
```

_Spot order detail_

### [#](#properties-3) Properties

#### [#](#enumerated-values-135) Enumerated Values

## [#](#contract) Contract

```json
{
  "name": "string",
  "type": "inverse",
  "quanto_multiplier": "string",
  "leverage_min": "string",
  "leverage_max": "string",
  "maintenance_rate": "string",
  "mark_type": "internal",
  "mark_price": "string",
  "index_price": "string",
  "last_price": "string",
  "maker_fee_rate": "string",
  "taker_fee_rate": "string",
  "order_price_round": "string",
  "mark_price_round": "string",
  "funding_rate": "string",
  "funding_interval": 0,
  "funding_next_apply": 0.1,
  "risk_limit_base": "string",
  "risk_limit_step": "string",
  "risk_limit_max": "string",
  "order_size_min": 0,
  "order_size_max": 0,
  "order_price_deviate": "string",
  "ref_discount_rate": "string",
  "ref_rebate_rate": "string",
  "orderbook_id": 0,
  "trade_id": 0,
  "trade_size": 0,
  "position_size": 0,
  "config_change_time": 0.1,
  "in_delisting": true,
  "orders_limit": 0,
  "enable_bonus": true,
  "enable_credit": true,
  "create_time": 0.1,
  "funding_cap_ratio": "string"
}
```

_Futures contract details_

### [#](#properties-4) Properties

#### [#](#enumerated-values-136) Enumerated Values

## [#](#position) Position

```json
{
  "user": 0,
  "contract": "string",
  "size": 0,
  "leverage": "string",
  "risk_limit": "string",
  "leverage_max": "string",
  "maintenance_rate": "string",
  "value": "string",
  "margin": "string",
  "entry_price": "string",
  "liq_price": "string",
  "mark_price": "string",
  "initial_margin": "string",
  "maintenance_margin": "string",
  "unrealised_pnl": "string",
  "realised_pnl": "string",
  "pnl_pnl": "string",
  "pnl_fund": "string",
  "pnl_fee": "string",
  "history_pnl": "string",
  "last_close_pnl": "string",
  "realised_point": "string",
  "history_point": "string",
  "adl_ranking": 0,
  "pending_orders": 0,
  "close_order": {
    "id": 0,
    "price": "string",
    "is_liq": true
  },
  "mode": "single",
  "cross_leverage_limit": "string",
  "update_time": 0,
  "update_id": 0,
  "open_time": 0
}
```

_Futures position details_

### [#](#properties-5) Properties

#### [#](#enumerated-values-137) Enumerated Values

## [#](#futuresorder) FuturesOrder

```json
{
  "id": 0,
  "user": 0,
  "create_time": 0.1,
  "finish_time": 0.1,
  "finish_as": "filled",
  "status": "open",
  "contract": "string",
  "size": 0,
  "iceberg": 0,
  "price": "string",
  "close": false,
  "is_close": true,
  "reduce_only": false,
  "is_reduce_only": true,
  "is_liq": true,
  "tif": "gtc",
  "left": 0,
  "fill_price": "string",
  "text": "string",
  "tkfr": "string",
  "mkfr": "string",
  "refu": 0,
  "auto_size": "close_long",
  "stp_id": 0,
  "stp_act": "co",
  "amend_text": "string",
  "biz_info": "string"
}
```

_Futures order details_

### [#](#properties-6) Properties

#### [#](#enumerated-values-138) Enumerated Values

## [#](#batchamendorderreq) BatchAmendOrderReq

```json
{
  "order_id": 0,
  "text": "string",
  "size": 0,
  "price": "string",
  "amend_text": "string"
}
```

_Modify contract order parameters_

### [#](#properties-7) Properties

## [#](#futurespricetriggeredorder) FuturesPriceTriggeredOrder

```json
{
  "initial": {
    "contract": "string",
    "size": 0,
    "price": "string",
    "close": false,
    "tif": "gtc",
    "text": "string",
    "reduce_only": false,
    "auto_size": "string",
    "is_reduce_only": true,
    "is_close": true
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "string",
    "rule": 1,
    "expiration": 0
  },
  "id": 0,
  "user": 0,
  "create_time": 0.1,
  "finish_time": 0.1,
  "trade_id": 0,
  "status": "open",
  "finish_as": "cancelled",
  "reason": "string",
  "order_type": "string",
  "me_order_id": 0
}
```

_Futures order details_

### [#](#properties-8) Properties

#### [#](#enumerated-values-139) Enumerated Values

## [#](#deliverycontract) DeliveryContract

```json
{
  "name": "string",
  "underlying": "string",
  "cycle": "WEEKLY",
  "type": "inverse",
  "quanto_multiplier": "string",
  "leverage_min": "string",
  "leverage_max": "string",
  "maintenance_rate": "string",
  "mark_type": "internal",
  "mark_price": "string",
  "index_price": "string",
  "last_price": "string",
  "maker_fee_rate": "string",
  "taker_fee_rate": "string",
  "order_price_round": "string",
  "mark_price_round": "string",
  "basis_rate": "string",
  "basis_value": "string",
  "basis_impact_value": "string",
  "settle_price": "string",
  "settle_price_interval": 0,
  "settle_price_duration": 0,
  "expire_time": 0,
  "risk_limit_base": "string",
  "risk_limit_step": "string",
  "risk_limit_max": "string",
  "order_size_min": 0,
  "order_size_max": 0,
  "order_price_deviate": "string",
  "ref_discount_rate": "string",
  "ref_rebate_rate": "string",
  "orderbook_id": 0,
  "trade_id": 0,
  "trade_size": 0,
  "position_size": 0,
  "config_change_time": 0.1,
  "in_delisting": true,
  "orders_limit": 0
}
```

_Futures contract details_

### [#](#properties-9) Properties

#### [#](#enumerated-values-140) Enumerated Values

## [#](#debitfee) DebitFee

```json
{
  "enabled": true
}
```

### [#](#properties-10) Properties

Last Updated: 1/17/2025, 2:16:19 AM
