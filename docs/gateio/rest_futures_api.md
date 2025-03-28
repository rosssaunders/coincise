

# APIV4/EN/

# [\#](https://www.gate.io/docs/developers/apiv4/en/\#gate-api-v4-v4-94-1) Gate API v4 v4.94.1

Welcome to Gate.io API

APIv4 provides spot, margin and futures trading operations. There are public APIs to retrieve the real-time market statistics, and private APIs which needs authentication to trade on user's behalf.

Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#access-url) Access URL

**REST API BaseURL:**

- Live trading: `https://api.gateio.ws/api/v4`
- Futures TestNet trading: `https://fx-api-testnet.gateio.ws/api/v4`
- Futures live trading alternative (futures only): `https://fx-api.gateio.ws/api/v4`

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#sdk) SDK

Available SDK:

- [Python(opens new window)](https://github.com/gateio/gateapi-python)
- [Java(opens new window)](https://github.com/gateio/gateapi-java)
- [PHP(opens new window)](https://github.com/gateio/gateapi-php)
- [Go(opens new window)](https://github.com/gateio/gateapi-go)
- [C#(opens new window)](https://github.com/gateio/gateapi-csharp)
- [NodeJS(opens new window)](https://github.com/gateio/gateapi-nodejs)
- [Javascript(opens new window)](https://github.com/gateio/gateapi-js)

Besides API examples, some SDK provides an additional demo application.
The demo application is a relatively complete example demonstrating how to use the SDK.
It can be built and run separately. Refer to corresponding repository for details.

- [Python(opens new window)](https://github.com/gateio/gateapi-python/tree/master/example)
- [Java(opens new window)](https://github.com/gateio/gateapi-java/tree/master/example)
- [C#(opens new window)](https://github.com/gateio/gateapi-csharp/tree/master/example)
- [Go(opens new window)](https://github.com/gateio/gateapi-go/tree/master/_example)

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#about-apiv4-key-improvement) About APIv4 key improvement

Previously(before April 2020) futures APIv4 key are separated from spot one, but this is
no longer the case anymore. You can create multiple keys with each key having multiple
permissions now. e.g. you can create one key with spot read/write and futures read/write
permission which can be used in both spot and futures trading.

History API keys will not be affected by this improvement. Previous spot key and futures key
are now one key with only spot permissions enabled, another only futures permission enabled.
You can reconfigure their permissions after migration.

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#comparison-with-apiv2) Comparison with APIv2

APIv4 is a standalone brand-new HTTP REST API, currently used in parallel with APIv2.
APIv4 provides complete trading operations, with more highly secured authentication method.
What's more, APIv4 specification is written following
[OpenAPI Specification(opens new window)](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md).
SDKs and documents are all generated from the same spec, which ensures consistency between
documents and implementation.

The ways APIv4 and APIv2 differ are:

1. Their API keys are separated from each other. Once logged into the web console,
v2 API keys are generated on _"APIKeys"_ page, while v4 _"APIv4Keys"_
page.
2. APIv2 supports only spot trading, while v4 supports all trading operations in spot, margin and futures.

Which one to choose:

1. If margin or futures trading are needed, choose APIv4.
2. If only spot trading or wallet operation is required, choose on your own.

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#application-for-marketers) Application for Marketers

In order to further improve the platform's opening depth and trading liquidity,
we will recruit institutional market makers in an open and transparent way,
and provide a professional market maker's service rate scheme for professional institutional market makers
according to their contribution to the platform's liquidity.

1. Provide Gateio UID
2. Provide other transaction volume screenshot or VIP level
3. Brief introduction of market making method and scale

Provide the above content and submit to [mm@gate.io](mailto:mm@gate.io) , we will accept within 3
working days.

TIP

Vip11 and above need to open GT deduction in the personal center to enjoy the professional
market rate.

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#technical-support) Technical Support

If you have any questions or suggestions during the use, you can contact us in any of the following ways:

- Submit Work Order Feedback
- Online Work Order Feedback
- Send your contact information and questions to [mm@gate.io](mailto:mm@gate.io) We will assign
technical specialists to serve you.

If you encounter API errors, it is recommended that you sort out the following content, so that we can quickly analyze the problem for you:

1. Problem Description
2. Gateio UID
3. Request URI and parameters
4. Error Code
5. Responses

DANGER

Even if you submit a problem, you should not submit the API key information to customer service or others, otherwise there will be serious asset risk. If it has been accidentally leaked, please delete the existing API and rebuild it.



# [\#](https://www.gate.io/docs/developers/apiv4/en/\#changelog) Changelog

**v4.94.0**

- New feature `GET /unified/currencies` endpoint, List of loan currencies supported by unified account
- Add `sub_uid` field in `GET /unified/accounts` query

**v4.93.0**

- Add `plan_id` field in `GET /earn/dual/investment_plan` query
- Add `from`、 `to`、 `page`、 `limit` field in `GET /earn/dual/orders` query
- Add `text` field in `GET /earn/dual/orders` response
- Add `text` field in `POST /earn/dual/orders` response
- New feature `GET /earn/staking/eth2/rate_records` endpoint, Query historical rate of ETH2

**v4.92.0**

2025-02-24

- Add `name` field in `GET /spot/currencies` query
- Add `base_name`、 `quote_name` field in `GET /spot/currency_pairs` response
- Add `unified` field in `GET /spot/price_orders` query
- Add `sub_uid` field in `GET /unified/accounts` query

**v4.91.0**

2025-02-10

`2025-04-01` After that, we will remove the following interface, please migrate to the new interface as soon as possible

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
- New feature `GET /rebate/user/sub_relation` endpoint, Query whether the specified user is in the system
- Add `order_size` field in `GET /futures/{settle}/liq_orders` response
- Add `type` field in `GET /spot/currency_pairs` response

**v4.89.0**

2025-01-08

- Add `text` field in `DELETE /futures/{settle}/close_all_positions` query string

**v4.88.0**

2024-12-24

- New feature `GET /spot/insurance_history` endpoint, Query spot insurance fund historical data
- Add `cross_balance`、 `iso_balance`、 `im`、 `mm`、 `imr`、 `mmr`、 `margin_balance`、 `available_margin` field in `GET /unified/accounts` response
- `PUT /unified/unified_mode` endpoint，Added single-currency margin mode

**v4.87.0**

- New feature `GET /unified/history_loan_rate` endpoint, Get historical lending rates

**v4.86.0**

2024-12-02

- New feature `GET /wallet/order_status` endpoint. Transfer status query
- Add `update_id` field in `GET /futures/{settle}/positions` response

**v4.85.0**

2024-11-11

- Add `x-gate-exptime` field in `POST /futures/{settle}/orders`、 `POST /spot/batch_order` header.
- Add `cross_order_margin`、 `cross_initial_margin`、 `cross_maintenance_margin`、 `cross_unrealised_pnl`、 `cross_available`、 `isolated_position_margin` field in `POST /futures/{settle}/dual_mode` response.

**v4.84.0**

2024-11-04

- New feature `GET /loan/multi_collateral/current_rate` endpoint, Query the current interest rate of the currency
- Add `lowest_size`、 `highest_size` field in `GET /spot/tickers` response
- Add `amount` field in `POST /earn/dual/orders` request body

**v4.83.0**

2024-10-28

- New feature `GET /unified/leverage/user_currency_config` endpoint, Query the maximum and minimum leverage multiples
that users can set for a currency
- New feature `GET /unified/leverage/user_currency_setting` endpoint, Get the user's currency leverage
- New feature `POST /unified/leverage/user_currency_setting` endpoint, Set the currency leverage ratio
- Add `id` field in `GET /futures/{settle}/account_book` response
- Add `leverage` field in `GET /unified/currency_discount_tiers` response

**v4.82.0**

2024-10-14

- New feature `GET /account/rate_limit` endpoint, Get user flow limit information. For details, please refer
to [Trade Ratio Rate Limiting](https://www.gate.io/docs/developers/apiv4/en/#trade-ratio-rate-limiting)
- `GET /account/detail` 接口, 返回值增加 `copy_trading_role` 字段

**v4.81.0**

2024-09-30

- New feature `POST /options/countdown_cancel_all` endpoint, Countdown to cancel order
- Add `message` field in `GET /wallet/push` response
- Add `lowest_size`、 `highest_size` in `GET /futures/{settle}/tickers` response
- Add `from`、 `to` in `GET /futures/{settle}/funding_rate` query
- Add `is_max` field in `POST /earn/dual/orders` response

**v4.80.0**

2024-09-09

- New feature `GET /options/mmp` endpoint, MMP Query
- New feature `POST /options/mmp` endpoint, MMP Settings
- New feature `POST /options/mmp/reset` endpoint, MMP Reset
- Add `block_number` field in `GET /wallet/withdrawals` response

**v4.79.0**

2024-09-02

- Add `from`、 `to` field in `GET /unified/interest_records` query
- Add `options` field in `GET /unified/unified_mode` response
- Add `options` field in `PUT /unified/unified_mode` request body

**v4.78.0**

2024-08-19

- New feature `GET /wallet/push` endpoint, Get Records
- New feature `POST /withdrawals/push` endpoint, Transfer between spot main accounts. Both parties cannot be
sub-accounts.
- New feature `GET /futures/{settle}/batch_amend_orders` endpoint, Batch modify orders with specified IDs
- Add `close_size` field in `GET /futures/{settle}/my_trades` response
- Add `tx_id` field in `POST /wallet/transfers` response

**v4.77.0**

2024-08-05

- New feature: add `GET /sub_accounts/unified_mode` endpoint，Get sub-account mode
- Add `from`、 `to` field in `GET /rebate/broker/commission_history` query
- Add `from`、 `to` field in `GET /rebate/broker/transaction_history` query

**v4.76.0**

2024-07-22

- New feature: add `GET /rebate/partner/sub_list` endpoint，Partner subordinate list
- Add `page`、 `limit` field in `GET /flash_swap/currency_pairs` query
- Add `order_id`、 `currency_pair`、 `account` field in `PATCH /spot/orders/{order_id}`
- Add `order_id`、 `currency_pair`、 `account` field in `DELETE /spot/orders/{order_id}`

**v4.75.1**

2024-07-08

- New feature: add `GET /delivery/{settle}/risk_limit_tiers` endpoint，querying risk limit levels
- New feature: add `GET /rebate/partner/transaction_history` endpoint，partners to get the transaction history of
recommended users
- Add `borrow_type` field in `GET /unified/loan_records` response
- Add `accum_size` field in `GET /futures/{settle}/position_close` response

**v4.75.0**

2024-06-24

- New feature: add `GET /account/debit_fee` endpoint，query GT deduction configuration.
- New feature: add `POST /account/debit_fee` endpoint, to enable or disable GT deduction for the current account.

**v4.74.1**

2024-06-11

- Optimization of DOM for the visible area on mobile devices

**v4.74.0**

2024-05-29

- New feature: add `GET /unified/loan_margin_tiers` endpoint, list loan margin tiers

**v4.73.0**

2024-05-27

- Add `is_all` parameter in `POST /wallet/small_balance` endpoint
- Add `text` field in `POST /spot/cancel_batch_orders` response
- Add `funding`、 `funding_version`、 `use_funding` field in `GET /unified/accounts` response

**v4.72.0**

2024-05-13

- Add `last_access` field in `GET /sub_accounts/{user_id}/keys` response
- Add `contract` field in `GET /futures/{settle}/risk_limit_tiers` response

**v4.71.0**

2024-04-23

- Add `page` parameter in `GET /wallet/saved_address` endpoint
- New feature: add `GET /api/v4/rebate/user/info` endpoint, retrieve user rebate information
- New feature: add `POST /unified/portfolio_calculator` endpoint, portfolio margin calculator
- New feature: add `GET /unified/risk_units` endpoint, retrieve user risk unit
- New feature: add `PUT /unified/unified_mode` endpoint, set unified account mode
- New feature: add `GET /unified/unified_mode` endpoint, retrieve unified account mode

**v4.70.0**

2024-04-08

- Add `pnl_pnl`、 `pnl_fund`、 `pnl_fee` field in `GET /futures/{settle}/positions` response
- Add `pnl_pnl`、 `pnl_fund`、 `pnl_fee` field in `GET /futures/{settle}/position_close` response

**v4.69.0**

2024-03-25

- Add `text` field in `POST /delivery/{settle}/price_orders` response

**v4.68.0**

2024-03-18

- New feature: add `GET /unified/currency_discount_tiers` endpoint, list currency discount tiers
- Add `type` parameter in `GET /unified/loans` endpoint
- Add `type` parameter in `GET /unified/interest_records` endpoint

**v4.67.0**

2024-03-11

- Add `filled_amount` field in `POST /spot/orders`, `POST /spot/batch_orders` response
- In frequency limit rule for the wallet withdrawal interface, the speed limit description has been corrected
from `10r/10s` to `1r/3s`(No modification to the original rate limiting behavior)

**v4.66.1**

2024-02-19

- New feature: add `GET /wallet/small_balance` endpoint, list small balance.
- New feature: add `GET /wallet/small_balance_history` endpoint, list small balance history.
- New feature: add `GET /unified/estimate_rate` endpoint, get unified estimate rate.

**v4.65.0**

2024-01-29

- Add `debit_fee` field in `GET /spot/batch_fee` response
- Add `user_id` parameter in `DELETE /account/stp_groups/{stp_id}/users` endpoint
- Spot API introduces asynchronous support modes for create orders: `ACK`, `RESULT`, `FULL`. For details, please refer
to [SPOT API](https://www.gate.io/docs/developers/apiv4/en/#create-an-order)

**v4.64.0**

2024-01-22

- Add `order_type` parameter in `GET /loan/multi_collateral/orders` endpoint
- Add `order_type`, `fixed_type`, `fixed_rate`, `expire_time`, `auto_renew`, `auto_repay` field
in `GET /loan/multi_collateral/orders` response
- Add `before_ltv`, `after_ltv` field in `GET /loan/multi_collateral/repay` response
- New feature: add `GET /loan/multi_collateral/fixed_rate` endpoint, query multi-collateral fix rate.
- Add `unrealised_pnl`, `borrowed` field in `GET /wallet/total_balance` response

**v4.63.0**

2024-01-15

- Add `decimal` field in `GET /wallet/currency_chains` response
- New feature: add `GET /futures/{settle}/risk_limit_tiers` endpoint, list risk limit tiers.

**v4.62.0**

2024-01-02

- New feature: add `POST /futures/{settle}/batch_cancel_orders` endpoint, users have the ability to batch cancel orders.
- New feature: add multi-collateral-loan api. ( `/loan/multi_collateral/**`)

**v4.61.0**

2023-12-18

- New features: The broker obtains the user's commission rebate records in `GET /rebate/broker/commission_history`
and `GET /rebate/broker/commission_history` endpoints

**v4.60.0**

2023-12-01

- Breaking change: New [Unified API](https://www.gate.io/docs/developers/apiv4/en/#unified-account) is online. The old `/portfoli/*` endpoints are deprecated.
- New features: add earn product api. ( `/earn/**`)
- Add `trade_id` field in `GET /futures/{settle}/account_book` response

**v4.59.0**

2023-11-22

- Add `funding_cap_ratio` field in `GET /futures/{settle}/contracts` response
- Add `contract` field in `GET /delivery/{settle}/account_book` response
- Add `withdraw_percent_on_chains` field in `GET /wallet/withdraw_status` response
- Add `leverage` field in `GET /portfolio/accounts` response

**v4.58.0**

2023-11-03

- Add `loanable` field in `GET /margin/cross/currencies` response
- Add `biz_info` field in `GET /futures/{settle}/orders/{order_id}` response
- Add `tier` field in `GET /account/detail` response
- Add `max_base_amount`、 `max_quote_amount` field in `GET /spot/currency_pairs` response

**v4.57.0**

2023-10-20

- New feature: API Gateway inbound & outbound time, For more details, please refer to
the [API Gateway in/out time](https://www.gate.io/docs/developers/apiv4/en/#api-gateway-in-out-time)
- New feature: support portfolio account in `POST /spot/orders` endpoint
- New feature: add `PUT /earn/uni/interest_reinvest` endpoint, users have the option to enable or disable interest
reinvestment.
- New feature: add `POST /spot/amend_batch_orders` endpoint, users have the ability to batch modify orders.
- Add `sequence_id` field in `GET /spot/trades` response
- Add `text` field in `GET /spot/account_book` response
- Add `text` field in `GET /spot/my_trades` response
- `GET /portfolio/spot/orders`、 `GET /portfolio/spot/orders`、 `GET /portfolio/spot/orders/{order_id}`、 `DELETE /portfolio/spot/orders/{order_id}`
and `PATCH /portfolio/spot/orders/{order_id}` have been deprecated. We will remove the endpoints by the end of October
2023\. Please use `/spot/orders` instead.

**v4.56.0**

2023-09-25

- Add `repayment_type` field in `GET /margin/cross/repayments` and `GET /portfolio/loan_records` endpoints.
- Add request parameter `holding` in `GET /futures/{settle}/positions` endpoint
- Add request parameter `role` in `GET /futures/{settle}/my_trades_timerange` endpoint
- Add request parameter `side` and `pnl` in `GET /futures/{settle}/position_close` endpoint

**v4.55.0**

2023-09-12

- Add new `POST /portfolio/account_mode` endpoint, allow to change the mode.

**v4.54.0**

2023-08-28

- Add `contract_address` field in `GET /wallet/currency_chains` endpoint.
- Add `GET /portfolio/spot/currency_pairs` and `GET /portfolio/spot/currency_pairs/{currency_pair}` endpoints, list
portfolio spot's currency pairs.

**v4.53.0**

2023-08-14

- New feature: delete user in STP group in `DELETE /account/stp_groups/{stp_id}/users` endpoint

**v4.52.0**

2023-08-07

- New feature: add collateral loan api

**v4.51.0**

2023-07-29

- Adjusted and optimized the [account book types](https://www.gate.io/docs/developers/apiv4/en/#accountbook-type)
- Add `mode` field in `GET /account/detail` edpoint.

**v4.50.0**

2023-07-14

- New feature: New [Portfolio API](https://www.gate.io/docs/developers/apiv4/en/#portfolio-account). Currently, these services are only available to whitelisted
users. If you are interested in accessing these APIs, please contact our institutional department for further
information.
- Add new endpoint `GET /flash_swap/currency_pairs`, list all flash swap currency pair

**v4.49.0**

2023-07-03

- Add new [frequency limit rule](https://www.gate.io/docs/developers/apiv4/en/#frequency-limit-rule)，the new rule is expected to take effect on 2023-07-10 (UTC+8)
- In the `GET /futures/{settle}/orders` API endpoint, the request field `contract` has been modified to be optional
instead of mandatory.

**v4.48.0**

2023-06-16

- Add `client_order_id` fields in `GET /wallet/sub_account_transfers` edpoint.

**v4.47.0**

2023-05-23

- New feature: add STP group admin api
- New feature: query estimated interest rates of margin and cross margin in `GET /margin/uni/estimate_rate`
and `GET /margin/cross/estimate_rate` endpoints.
- New feature: list futures order by time range in `GET /futures/{settle}/orders_timerange` endpoint
- Add `underlying`、 `underlying_price`、 `mark_iv`、 `delta`、 `gamma`、 `vega`、 `theta` fields
in `GET /options/positions/{contract}` endpoint.

**v4.46.0**

2023-05-08

- New feature: query spot account book in `GET /spot/account_book` endpoint
- New feature: query user futures trading fee in `GET /futures/{settle}/fee` endpoint
- Add `is_internal` field in `GET /futures/{settle}/trades` endpoint

**v4.45.0**

2023-04-21

- The margin loan has been migrated to the `Lend & Earn`. For more information, please refer to
the [Margin Migration Instructions](https://www.gate.io/docs/developers/apiv4/en/#margin-migration-instructions)
- New feature: Get interest records for the cross margin account in `GET /margin/cross/interest_records` endpoint.
- New feature: Add `Self-Trade Prevention` feature in the `POST /futures/{settle}/batch_orders` endpoint.
- Add `futures_in`、 `futures_out` two fields in `GET /margin/cross/account_book` endpoint.

**v4.44.0**

2023-04-07

- Add `ORDER_BOOK_NOT_FOUND` and `FAILED_RETRIEVE_ASSETS` error messages.

**v4.43.0**

2023-03-27

- New feature: Add `Self-Trade Prevention` feature in the `POST /spot/orders` endpoint. Fore more detail, please refer
to [STP overview](https://www.gate.io/docs/developers/apiv4/en/#self-trade-prevention-stp)
- New feature: Get API key's ip whitelist in `GET /account/detail` endpoint.
- Add `amend_text` in `PATCH /spot/orders/{order_id}` endpoint.
- Add `lowest_ask` and `highest_bid` fields in `GET /futures/{settle}/tickers` endpoint

**v4.42.0**

2023-03-13

- New feature: add `Lend & Earn` API
- New feature: Add `Self-Trade Prevention` feature in the `POST /futures/{settle}/orders` endpoint. Fore more detail,
please refer to [STP overview](https://www.gate.io/docs/developers/apiv4/en/#self-trade-prevention-stp)
- Add `delivery` account type in `POST /wallet/sub_account_transfers` endpoint
- Add `amend_text` field in `PUT /futures/{settle}/orders/{order_id}` endpoint

**v4.41.0**

2023-03-03

Add `negative_liab`, `futures_pos_liab`, `equity`, `total_freeze`, `total_liab`, `portfolio_margin_total_liab`, `portfolio_margin_total_equity`
fields in `GET /margin/cross/accounts` endpoint

**v4.40.0**

2023-02-24

- New feature: List Auto-Deleveraging history endpoint `Get /futures/{settle}/auto_deleverages`
- Add `sum` field in `GET /futures/{settle}/candlesticks` endpoint

**v4.39.0**

2023-02-09

- New feature: Query a batch of user trading fee rate endpoint `GET /spot/batch_fee`
- Add `enable_bonus`、 `enable_credit` fields in `GET /futures/{settle}/contracts` endpoint

**v4.38.0**

2023-02-04

- New feature: time range query for my futures trade endpoint `GET /futures/{settle}/my_trades_timerange`
- Add `withdraw_order_id` field in `POST /withdrawals` endpoint

**v4.37.0**

2023-01-20

- Add new rebate API endpoints.

**v4.36.0**

2022-12-23

- Hiding all amount is not supported any more when using `iceberg` in `POST /spot/orders` and `POST /spot/batch_orders`
endpoints

**v4.35.0**

2022-12-09

- New feature: amend order endpoint `/spot/orders/{order_id}`
- Add `avg_deal_price` field in `GET /spot/orders` response
- Add `portfolio_margin_total` field in \`\`GET /margin/cross/accounts\` response
- Support market order in `POST /spot/batch_orders` endpoint

**v4.34.0**

2022-11-25

- Support market order in `POST /spot/orders` endpoint

**v4.33.0**

2022-11-11

- New feature: Futures Premium Index endpoint `GET /futures/{settle}/premium_index`
- Allow to specify password and email when creating a sub-account.

**v4.32.0**

2022-10-28

- Improve options api document

**v4.31.0**

2022-10-14

- Allow to transfer futures and cross\_margin funds between two sub-accounts in `POST /wallet/sub_account_to_sub_account`
endpoint

**v4.30.0**

2022-09-23

- New feature: manage sub-accounts API Key
- New feature: lock and unlock sub-account endpoint
- Allow to transfer between two sub-accounts in `POST /wallet/sub_account_to_sub_account` endpoint

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

- Add `basis_rate`、 `basis_value` fields in `GET /delivery/{settle}/tickers` response
- Add `X-Client-Request-Id` http header for tracking request
- new create a batch of futures order endpoint `POST /futures/{settle}/batch_orders`
- new `FOK` tif type for futures order

**v4.26.0**

2022-07-15

- Spot Price-Trigger order supports portfolio margin account
- Add `GET /wallet/saved_address` to list saved address
- `POST /wallet/transfers` returns `tx_id` field
- Add `GET /wallet/sub_account_cross_margin_balances` to query subaccount's `cross_margin` account
- Add `status` field in `GET /margin/currency_pairs` response

**v4.25.1**

2022-07-06

- New `GET /spot/time` endpoint which get system's time info.
- New `GET /options/my_settlements` endpoint which list my selttlements.
- Add `change_utc0`, `change_utc8` fields in `GET /spot/tickers` endpoint

**v4.25.0**

2022-06-24

- Support portfolio margin account API
- Cross-margin add more fields. Please refer to endpoint document for more details.
- Add `status` field in `GET /margin/cross/currencies` endpoint, determine whether the cross
currency is disabled `0`-disable `1`-enable
- New `POST /spot/cross_liquidate_orders` spot trading endpoint that close position when the
cross-currency is disabled
- Add `bouns` and `history` fields in `GET /futures/{settle}/accounts` endpoint
- Add `text`、 `fee` and `point_fee` fields in `GET /futures/{settle}/my_trades` endpoint
- Fix typo for `cancel a price-triggered order` endpoints
- `POST /wallet/sub_account_transfers` supports transferring to `cross_margin`

**v4.24.0**

2022-05-20

- Support flash swap operations with new API group `/flash_swap`. Spot operation permission is
required.
- New wallet APIs `GET /wallet/sub_account_margin_balances`
and `GET /wallet/sub_account_futures_balances` to help main account retrieving sub accounts'
margin and perpetual contract balances
- New perpetual contract API `GET /futures/{settle}/index_constituents/{index}` to retrieve index
price constituents
- Fix missing fields like `order_type` in `FuturesPriceTriggeredOrder`

**v4.23.4**

2022-04-25

- Add `PUT /futures/{settle}/orders/{order_id}` to amend perpetual futures orders
- Spot candlesticks supports `30d` interval

**v4.23.3**

2022-04-01

1. Spot candlestick API returns base currency amount
2. Spot currency detail add `chain` field.
3. Add withdrawal and deposit status in `GET /wallet/currency_chains` response
4. Add missing `cross_leverage_limit` in perpetual contract's dual mode position leverage update API
5. Support more intervals in perpetual and delivery contract candlesticks

**v4.23.2**

2022-01-21

1. Add `fee` in withdrawal and deposit history
2. Add fix fee rate in spot `Currency`

**v4.23.1**

2021-12-23

1. Spot orders support new `time_in_force` `FOK`
2. New `FOK_NOT_FILL` error label

**v4.23.0**

2021-12-09

1. Add options API
2. Add detailed rate limiting rules
3. Add `GET /wallet/currency_chains` to retrieve chains supported by currency
4. Add additional status for deposit and withdrawal history

**v4.22.4**

2021-11-01

1. Data type of `ctime` and `ftime` in `SpotPriceTriggeredOrder` should be `int64`

**v4.22.3**

2021-10-27

1. `GET /spot/trades` supports time range based query using `from` and `to`.

**v4.22.2**

2021-09-29

1. Add more status in withdrawal or deposit record model
2. Add new write only field `auto_size` in `FuturesOrder` to support closing dual mode position.

**v4.22.1**

2021-09-07

1. New wallet API `GET /wallet/total_balance` to retrieve all user's estimate balance.
2. Add `locked` and `risk` in margin account response
3. Margin and cross margin loans support custom text input.

**v4.22.0**

2021-08-13

1. Delivery contract API supports BTC settled
2. Spot API `GET /spot/orders` and `GET /spot/my_trades` supports query by time range
3. Add margin and cross margin max borrowable API
4. Multiple document enhancements.

**v4.21.6**

2021-08-12

1. Fix incorrect address field name in `GET /wallet/deposit_address`

**v4.21.5**

2021-06-30

- `GET /spot/orders`, `GET /spot/orders/{order_id}` and `GET /spot/my_trades` allow empty
`currency_pair` if operated against finished orders
- Add fixed withdrawal fee on multiple chains in `GET /wallet/withdraw_status` response
- Add `GET /margin/transferable` and `GET /margin/cross/transferable` to retrieve
maximum transferable amount from margin and cross margin account
- Add `from` and `to` parameter to specify time range for futures position closes history API

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
- Add new millisecond fields `create_time_ms` and `update_time_ms` in spot orders.
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

- Spot and Futures operations based on order ID also accept user custom ID(but only for 30 minutes
since creation)

**v4.19.4**

2021-03-10

- `/wallet/sub_account_transfers` supports transferals with sub user's perpetual contract account

**v4.19.3**

2021-03-04

- Add margin loans auto repay API `/margin/auto_repay`
- Add `multichain_address` in `/wallet/deposit_address` for currencies with multiple deposit
addresses
- Optimize documentation

**v4.19.2**

2021-03-01

- Add `/wallet/fee` API to retrieve trading fee. Previous `/spot/fee` is deprecated in favour of
this one.
- Add new field `chain` in withdrawal operation.
- Add new field `with_id` in `/futures/{settle}/order_book` API and `id` field in its response
- Add new `offset` in API `/futures/{settle}/position_close` to retrieve position close history with
pagination.
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

- Add new spot API `/spot/currencies` and `/spot/currencies/{currency}` to retrieve currency info
- Add more fields, e.g., `top_lsr_account`, `top_lsr_size`, in futures `ContractStat` model.

**v4.17.1**

2020-12-16

- Increase maximum of `limit` in `/spot/order_book` to 100

**v4.17.0**

2020-12-15

- Add `/wallet/sub_account_balances` to retrieve sub accounts' balances.

**v4.16.1**

2020-12-10

- Fix mistaken field name `dual_mode` in futures position model which should be `mode` instead.

**v4.16.0**

2020-12-09

_Spot_

- Increase order number limit each currency pair to 10 in `POST /spot/batch_orders`
- Add new query parameter `reverse` in `GET /spot/trades` to trace back trading history

_Futures_

- Add perpetual contract dual mode position support. Use `/futures/{settle}/dual_mode` to set
position's dual mode. For dual mode position operations, refer
to `/futures/{settle}/dual_comp/positions` API group
- Add perpetual contract new field `in_dual_mode` in futures account response model;
`dual_mode` in position response model.
- Add new perpetual contract public API `/futures/{settle}/liq_orders` to query liquidated orders in
markets

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

- APIv4 now supports withdraw API. Refer to `POST /withdrawals` and "Authentication"
section for details.
- `POST /wallet/transfers` supports transferring between spot and futures account
- Wallet API supports retrieving deposits and withdrawals history
- Futures orders and personal trades retrieving now supports `offset` field
- Futures `Contract` model add new field `in_delisting`

**v4.12.0**

2020-04-08

- APIv4 Key management improved. Keys are no longer separated with different trading types.
Every key can now have multiple operation permissions. Refer to _"About APIv4 key improvement"_
for details.
- Add `POST /wallet/sub_account_transfers` to support transferring between main and sub account
- `GET /spot/candlesticks` adds query parameters `from` and `to` to support retrieving history data
points

**v4.11.2**

2020-03-29

- Add `filled_total` in `Order` to replace `fill_price` (the latter is badly named)
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

- Margin order creation adds new field `auto_borrow`(write only) to borrow
the insufficient part by the system if balance is not enough
- Add new API `POST /spot/cancel_batch_orders` to support batch cancellation
with specified order IDs
- Add new document section "Error handling" and "Which one to choose, APIv4 or APIv2?"

**v4.9.1**

2020-01-07

- Add fee and recent modification time in `Order` and `BatchOrder`
- Add fee in `GET /spot/my_trades` response

**v4.9.0**

2019-12-17

- `last_id` in `GET /futures/{settle}/trades` is deprecated. Use `from` and `to` to retrieve trading
history

**v4.8.2**

2019-12-02

- Add `/spot/batch_orders` to support creating a bundle of spot or margin orders
- Fee rate of margin loan repayment enjoys VIP discount
- `Loan` add new fields `fee_rate`(fee rate of lending loan)
and `orig_id`(original loan ID if loan is auto renewed)

**v4.8.1**

2019-11-27

- Fix missing `settle` in `GET /futures/{settle}/positions` docs and code snippet

**v4.8.0**

2019-11-07

- Futures API now supports settling in USDT.
- Change `/futures` to `/futures/{settle}` in ALL futures API to support
futures operations in different settle currency.
- `currency` field in `/futures/{settle}/accounts` response adds new value: `USDT`
- Add `volume_24h_base`, `volume_24h_quote` and `volume_24h_settle` in `/futures/{setttle}/tickers`
response to replace `volume_24h_btc` and `volume_24h_usd`. The latter two are still
preserved for compatibility usage, but are NOT recommended for any futures operations.

To use USDT futures, just replace `/futures` with `/futures/usdt`, e.g.
use `GET /futures/usdt/accounts` to retrieve futures accounts settled in USDT,
while `GET /futures/btc/accounts` returns accounts in BTC.

For compatibility, `GET /futures/xxx` defaults to `GET /futures/btc/xxx`, e.g.
`GET /futures/accounts` will be treated as `GET /futures/btc/accounts`

**v4.7.3**

2019-07-18

- Add `text` in `/spot/orders` and `/futures/orders` to support user defined order information

**v4.6.3**

2019-06-11

- Add point information in Futures account and position

**v4.7.2**

2019-05-29

- Change `rate` in `Loan` as non-required for lending side.

**v4.7.1**

2019-04-17

- Add wallet v4 API. Support transfers between spot and margin account for now.
- `GET /margin/loans` can sort by `rate` and support an optional parameter `currency_pair`
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

- Rename futures order related function name in SDKs to avoid duplication
with spot order API in Go
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

To avoid version confusion, all versions in APIv4 (documents and SDKs are both included) will start
with `4` from now on

- Add Spot v4 API to provide improved API capability
- Add Margin v4 API to provide support for margin loans and trading
- Add Futures price triggered auto order API support. Refer to `/futures/price_orders` for details
- Base URL of all Gate API v4 real trading changed to `https://api.gateio.ws/api/v4`

**v1.3.0**

2019-02-13

_Important update_

- Domain of base URLs are changed to `fx-api.gateio.ws` and `fx-api-testnet.gateio.ws`
respectively, `*.gateio.io` is deprecated and will soon be out of service.

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
- Change the status code of `DELETE /futures/orders` and `DELETE /futures/orders/{order_id}` from
204 to 200,
with cancelled order details returned on success.
- Request `DELETE /futures/orders/{order_id}` with invalid order ID or order
that has been finished will return 404 instead of ignoring the error
- `POST /futures/orders` now supports POC, iceberg

**v1.0.0**

2018-12-30

- Initial release



# [\#](https://www.gate.io/docs/developers/apiv4/en/\#api) API

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#http-convention) HTTP convention

- All read endpoints use `GET` method. They accept only request parameters. No request body will be
read.
- `DELETE` methods remove resources(like orders), but not all removing operation using `DELETE`,
as `DELETE` s don't read request body either. For complex removing operations, `POST` method is
used with parameters filled in request body.
- Updating is done using `POST`, `PUT` or `PATCH` method. Their parameters are either in body or
request parameters for different endpoints. Refer to endpoint detail for how to send the request.
- All endpoints return HTTP status code `2xx` on success. `401` is returned on authentication
failure. Other `4xx` codes mean the request is malformed. `5xx` means the server encounter some
critical error on processing the request. Commit issues if `5xx` is met.

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#time) Time

All time related fields are unix timestamp in **seconds** if no extra note, but they may differ
in formats(int64, number or string). Possible values like the following may be returned:

- 1596531048
- "1596531048"
- 1596531048.285
- "1596531048.285"

The best way to handle time fields is parsing them as a number with decimal places.
If higher precision is not needed, you can safely cast them to integer(or long). Our SDKs listed
above has already taken proper deserialization to handle them

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#api-gateway-in-out-time) API Gateway in/out time

In every API request, the response header will always include the following fields:

- `X-In-Time`: The timestamp when the API gateway receives a request, in Unix timestamp format, measured in microseconds.

- `X-Out-Time`: The timestamp when the API gateway returns a response, in Unix timestamp format, measured in microseconds.


For example:

```
X-In-Time: 1695715091540163
X-Out-Time: 1695715091551905

```

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#pagination) Pagination

Pagination is achieved using one of the following method

- `page-limit`
- `limit-offset`

In both method, `limit` limits the maximum number of records returned in one request. If no
additional explanation, it defaults to `100` if not provided and its maximum value is limited
to `1000`.

`page` starts from `1`, mimicking common paging used in web pages. To iterate the whole list, use
the same `limit` and increment `page` by `1` until the records' length is shorter than the
`limit`

`offset` starts from `0`, behaving like common DB search. To iterate the whole list, increment
`offset` by `limit` until the records' length is shorter than the `limit`.

For example, if the total number of orders is 201. Using page-limit method, send request parameters
like the following:

1. `page=1&limit=100`
2. `page=2&limit=100`
3. `page=3&limit=100`

Using limit-offset method, send request parameters like:

1. `limit=100&offset=0`
2. `limit=100&offset=100`
3. `limit=100&offset=200`

Some endpoints may return additional pagination metadata. If present, they are sent back through the
response header. Take `GET /futures/{settle}/orders` as an example, following headers will be
returned

- `X-Pagination-Limit`: request limit
- `X-Pagination-Offset`: request offset
- `X-Pagination-Total`: total record number satisfying the request

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#frequency-limit-rule) Frequency limit rule

| Markets | Endpoints | Limits | Based On | Include |
| --- | --- | --- | --- | --- |
| All public endpoints | Public endpoints | 200r/10s per endpoint | IP | Orderbook, Candlestick, Ticker, etc. |
| Wallet | Private endpoints | Withdrawal(POST /withdrawals) : 1r/3s<br> Transfer between trading accounts (POST /wallet/transfers) 80r/10s<br> Transfer between main and sub accounts (POST /wallet/sub\_account\_transfers) 80r/10s<br> Transfer from a sub-account to another sub-account (POST /wallet/sub\_account\_to\_sub\_account) 80r/10s<br> Retrieve user's total balances (GET /wallet/total\_balance) 80r/10s<br> Retrieve sub account balances (GET /wallet/sub\_account\_balances) 80r/10s<br> Query sub accounts' margin balances (GET /wallet/sub\_account\_margin\_balances) 80r/10s<br> Query sub accounts' futures account balances (GET /wallet/sub\_account\_futures\_balances) 80r/10s<br> Query subaccount's cross\_margin account info(GET /wallet/sub\_account\_cross\_margin\_balances) 80r/10s<br> The Others: 200r/10s per endpoint | UID | Withdrawal.<br> Query personal account balance.<br> Query subaccount balance. |
| Spot | Private endpoints | The rate limit for batch/single order placement and amend an order are total of 10r/s (UID+Market)<br> The rate limit for batch/single order cancellation is total of 200r/s<br> The Others: 200r/10s per endpoint | UID | Spot order placement and cancellation.<br> Trade history and fee rates. |
| Perpetual Futures | Private endpoints | The rate limit for batch/single order placement and amend an order are total of 100r/s<br> <br> The maximum rate limit for the order cancellation (bulk/single) is 200r/s<br> <br> The Others: 200r/10s per endpoint | UID | Futures order placement and cancellation<br> Trade history and fee rates |
| Delivery | Private endpoints | The maximum rate limit for the order placement (bulk/single) is 500r/10s<br> <br> The maximum rate limit for the order cancellation (bulk/single) is 500r/10s<br> <br> The Others: 200r/10s per endpoint | UID | Order placement and cancellation |
| Options | Private endpoints | The maximum rate limit for the order placement (bulk/single) is 200r/s<br> <br> The maximum rate limit for the order cancellation (bulk/single) is 200r/s<br> <br> The Others: 200r/10s per endpoint | UID | Order placement and cancellation |
| Subaccount | Private endpoints | 80r/10s per endpoint | UID | Create a sub-account.<br> Retrieve the list of sub-accounts.<br> Disable or enable API key for a sub-account. |
| Unified | Private endpoints | Borrow or repay 15/10s | UID | Borrow or repay(POST /unified/loans) |
| Other Private endpoints | Private endpoints | 150r/10s per endpoint | UID | Earning, collateral etc |

> The rate limit is counted against each sub-account or main account.

**Rate Limit**

Each request to the API response header will contain the following fields:：

- X-Gate-RateLimit-Requests-Remain - your remaining requests for current endpoint
- X-Gate-RateLimit-Limit - your current limit for current endpoint
- X-Gate-RateLimit-Reset-Timestamp - the timestamp indicating when your request limit resets if you have exceeded your rate\_limit. Otherwise, this is just the current timestamp (it may not exactly match timeNow).

WebSocket:

- Spot: Bulk order/single order/single order modification, a total of 10 requests per second (10r/s).
- Futures: Bulk order/single order/single order modification/single order cancellation/bulk cancellation, a total of 100 requests per second (100r/s).
- Others: No limit.

## [\#](https://www.gate.io/docs/developers/apiv4/en/\#rate-limit-based-on-fill-ratio) Rate Limit Based On Fill Ratio

In order to enhance trading efficiency, we have decided to implement more favorable sub-account rate limits for clients with a higher fill ratio. This assessment will be based on trading data from the past seven days and will be calculated daily at 00:00 UTC. Please note that this rule applies only to clients at **VIP level 14 and above**.

### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_1-introduction-of-terminology) 1\. Introduction of Terminology

#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_1-1-symbol-multiplier) 1.1 Symbol Multiplier

To facilitate a more refined management of the impact of different trading products on the fill ratio, we have introduced the concept of the symbol multiplier. This multiplier allows us to adjust the influence of each product on the overall trading volume based on its characteristics. For products with a multiplier of less than 1, they typically involve smaller contract sizes and therefore require more trading orders to achieve the same trading volume. Generally, all trading products come with a default multiplier; however, certain products are assigned independent multipliers based on their specific characteristics. For detailed information regarding the multipliers of relevant products, please refer to the provided table.

| Product Typee | Based On | Independnet Symbol Multiplier | Default Symbol Multiplier |
| --- | --- | --- | --- |
| USDT-Margined Perpetural Futures | Contract Symbol | 1<br> Contract Symbol:<br> BTC-USDT<br> ETH-USDT | 0.4 |
| Spot | Currency Pairst | 1<br> Currency Pairs:<br> BTC-USDT<br> ETH-USDT | 0.4 |

> Please note: The spot trading rate limits will not be launched this time.

#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_1-2-definition-of-trading-volume-weight) 1.2 Definition of Trading Volume Weight

We will assess the behavior patterns of makers and takers based on market fluctuations and design the trading volume weight ratios accordingly. Additionally, we will regularly evaluate these weights and make synchronized adjustments when necessary.

**Current weight of the maker trading volume: 100%, current weight of the taker trading volume: 90%.**

#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_1-3-calculation-formula) 1.3 Calculation Formula

The system will take a snapshot of the data at 00:00 UTC daily and, based on this information, will select the higher value between the fill ratio of the sub-account and the overall fill ratio of the main account to determine the future trading rate limit for the sub-account. For exchange brokers, the system will only consider the fill ratio of their sub-accounts. It is important to note that the main account is also considered a "sub-account."

1. Sub-account Fill Ratio: This ratio is calculated as follows: (Sub-account Taker's USDT trading volume × 0.9 + Maker's USDT trading volume × 1) / (The sum of (Number of new and modified requests for each contract × symbol multipliers) for each subaccount).
2. Main-account Aggregated Fill Ratio: This ratio is calculated as follows: (main account's Taker USDT trading volume × 0.9 + Maker USDT trading volume × 1) / (The sum of (Number of new and modified requests for each contract × symbol multipliers) for all subaccounts).

### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_2-future-rate-limit-rule) 2\. Future Rate Limit Rule

| Contract Frequency Limitation Rules |
| --- |
| Tier | Ratio | Rate Limit (uid) |
| Tier 1 | \[0,1) | 100r/s |\
| Tier 2 | \[1,3) | 150r/s |\
| Tier 3 | \[3,5) | 200r/s |\
| Tier 4 | \[5,10) | 250r/s |\
| Tier 5 | \[10,20) | 300r/s |\
| Tier 6 | \[20,50) | 350r/s |\
| Tier 7 | >= 50 | 400r/s |\
\
> > Please stay tuned for the rate limits for spot trading.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_3-detailed-rules-for-fill-ratio) 3\. Detailed Rules for Fill Ratio\
\
1. Target Client Group: VIP ≥ 14\
2. Calculation Period: 7 days\
3. Update Time: Daily at 08:00 (UTC). The system will update the fill ratio data based on the data from 00:00 UTC.\
1. If the fill ratio and the pre-set rate limit improve, the increase will take effect immediately at 08:00 (UTC).\
2. However, if the fill ratio declines, the rate limit will be reduced immediately.\
3. If a client's VIP level drops below VIP 14, their rate limit will be lowered to the minimum tier, taking effect immediately.\
4. If a client's VIP level rises above VIP 14, their rate limit will be adjusted immediately based on their current level.\
5. If a sub-account's trading volume over the past 7 days is below 1,000,000 USDT, the rate limit will be implemented based on the main-account aggregated fill ratio.\
6. For newly created sub-accounts, the minimum tier rate limit will be applied at the time of creation, and the aforementioned rate limit rules will begin to apply at T+1 08:00 (UTC).\
7. Both WebSocket and REST APIs are subject to these rules.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_4-example) 4\. Example\
\
Assuming the client has three accounts, with the symbol multipliers for trading perpetual contract products BTC-USDT and SOL-USDT being 1 and 0.4, respectively.\
\
1. Account A (Main Account):\
   - BTC-USDT perpetual futures Maker trading volume: 100 USDT, number of order requests: 10; Perpetual futures Taker trading volume: 200 USDT, number of order requests: 20.\
   - SOL-USDT perpetual futures Maker trading volume: 20 USDT, number of order requests: 15; Perpetual futures Taker trading volume: 20 USDT, number of order requests: 20.\
   - Sub-account Fill Ratio = ((100 + 20) \* 1 + (200 + 20) \* 0.9) / ((10 + 20) \* 1 + (15 + 20) \* 0.4) = 7.23\
2. Account B (Sub-account):\
   - BTC-USDT perpetual futures Maker trading volume: 200 USDT, number of order requests: 20; Perpetual futures Taker trading volume: 200 USDT, number of order requests: 30.\
   - SOL-USDT perpetual futures Maker trading volume: 20 USDT, number of order requests: 5; Perpetual futures Taker trading volume: 30 USDT, number of order requests: 5.\
   - Sub-account Fill Ratio = ((200 + 20) \* 1 + (200 + 30) \* 0.9) / ((20 + 30) \* 1 + (5 + 5) \* 0.4) = 7.91\
3. Account C (Sub-account):\
   - BTC-USDT perpetual futures Maker trading volume: 50 USDT, number of order requests: 5; Perpetual futures Taker trading volume: 60 USDT, number of order requests: 8.\
   - SOL-USDT perpetual futures Maker trading volume: 100 USDT, number of order requests: 20; Perpetual futures Taker trading volume: 120 USDT, number of order requests: 25.\
   - Sub-account Fill Ratio = ((50 + 100) \* 1 + (60 + 120) \* 0.9) / ((5 + 8) \* 1 + (20 + 25) \* 0.4) = 10.06\
4. Main Account Aggregated Fill Ratio = ((100 + 20 + 200 + 20 + 50 + 100) \* 1 + (200 + 20 + 200 + 30 + 60 + 120) \* 0.9) / ((10 + 20 + 20 + 30 + 5 + 8) \* 1 + (15 + 20 + 5 + 5 + 20 + 25) \* 0.4) = 8.19\
5. Account Rate Limits:\
   - Account A = max(7.23, 8.19) = 8.19 -> 250 r/s\
   - Account B = max(7.91, 8.19) = 8.19 -> 250 r/s\
   - Account C = max(10.06, 8.19) = 10.06 -> 300 r/s\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#_5-remarks) 5\. Remarks\
\
1. The release date for the rate limit of perpetual contracts based on fill ratio will be announced later. Please stay tuned.\
2. The existing abuse rate limit rules for perpetual contracts will still apply, namely:\
1. Fill Ratio = USDT Training Amount / (Total Number of Order, Cancellation, and Modification Requests)\
2. If the number of requests exceeds 86,400 within 24 hours, with no order fill in the same period. Then the order placement rate limit will be restricted to 10r/10s for the next hour.\
3. If the number of requests exceeds 86,400 within 24 hours, with the fill ratio below 1%. Then the order placement rate limit will be restricted to 20r/10s for the next hour.\
3. Please stay tuned for the fill ratio rate limit for spot trading.\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#return-format) Return Format\
\
All API responses are in JSON format, and users need to transform and extract data by themselves.\
\
The HTTP status code 2XX will be returned when all operations are successful. 401 indicates that\
there is a problem with the certification. Other 4xx status codes indicate that the request is\
invalid. If it is a 5xx error, the server has encountered an unknown serious error when processing\
the request. Please give feedback as soon as possible。\
\
**Return Status**\
\
| Status Code | Description |\
| --- | --- |\
| 200/201 | Request succeeded |\
| 202 | Request accepted by the server, but processing is not done yet |\
| 204 | Request succeeded, but the server doesn't return body |\
| 400 | Invalid request |\
| 401 | Authentication failed |\
| 404 | Not found |\
| 429 | Too many requests |\
| 5xx | Server error |\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#data-type) Data Type\
\
| Type | Description |\
| --- | --- |\
| `string` | String type, in double quotation marks. Price and amount are also formatted in string format |\
| `integer` | 32-bit integer，Mainly related to status codes, size, times, etc. |\
| `integer(int64)` | 64-bit integer，Mainly involves ID and higher precision timestamp |\
| `float` | Floating point number. Some time and stat fields use float. |\
| `object` | Object，Contains a child object{} |\
| `array` | List，Includes multiple groups of content |\
| `boolean` | true is true，false is false |\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#portfolio-margin-account) Portfolio Margin Account\
\
TIP\
\
The Portfolio Margin Account is no longer maintained, please refer to the new version of the [Unified Account](https://www.gate.io/docs/developers/apiv4/en/#unified-account)\
\
Since version `4.25.0`, we start supporting portfolio margin account. Gate.io's Portfolio Margin\
Account is a new feature of Gate.io's trading system. Its main function is to break the capital\
isolation between cross-margin leverage account and USD cross-margin perpetual contract account\
inside a Classic Account and achieve the multi-currency margin sharing among multi-product lines.\
Thanks to the margin sharing, users don't need to transfer funds between the two accounts, and the\
profit and loss of positions among different trading products can offset each other and effectively\
improve the capital utilization rate. See more details in the\
[Help Center](https://www.gate.io/help/trade/leveraged/26421/introductions-to-gate.io-s-portfolio-margin-account)\
\
Before using the portfolio margin account's API key, you should create the API key on the API\
management page.\
The API key supports spot and perpetual contracts trading only.\
\
> If permissions of the API key can't be checked, ensure your cross-margin account has available\
> balance first.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#transfer) Transfer\
\
The classic account and portfolio margin account are two different capital isolation accounts. If\
you want to achieve multi-currency margin sharing among multi-product lines, use\
the portfolio margin account please.\
\
The funds of the portfolio margin account come from the classic account. Due to the change of funds\
in the classic account, the transfer of funds can only be performed using the API Key of the classic\
account.\
\
The portfolio margin account is upgraded based on the cross-margin account of the original classic\
account, so the classic account only needs to transfer its spot funds to the cross-margin account to\
deposit the portfolio margin account. Similarly, withdrawals from portfolio margin account can be\
achieved by the classic account performing transferals from the cross margin to its spot account.\
\
The API Key of the portfolio margin account can only perform transferals among its own multiple\
accounts.\
Due to the sharing of margin, the portfolio margin account does not need to transfer funds\
to its futures account (we also restrict doing so).\
If the futures account has PNL funds that need to be withdrawn, it must be transferred by the\
portfolio margin account's API key to its cross-margin account first, so that the classic\
account can perform withdrawals from portfolio margin account.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#spot-trading) Spot trading\
\
The spot trading of the portfolio margin account is almost the same as the classic account, except\
that `cross_margin` must be specified in the `account` parameter when placing orders. For example,\
if you want to place a buy order for the `BTC_USDT` currency pair, the order request will be similar\
to\
\
```\
POST /spot/orders\
\
{\
  "currency_pair": "BTC_USDT",\
  "account": "cross_margin",\
  "side": "buy",\
  ...\
}\
\
```\
\
For other related restrictions, please refer to the document of the API endpoint directly.\
\
TIP\
\
It should be noted that the portfolio margin account is upgraded from the classic account's\
cross-margin account. The API Key of the classic account originally supports the operation of the\
cross-margin account. In order not to affect the existing operations of the classic account, we\
still retain this function of the classic account. So whether it is the API Key of the classic\
account or the portfolio margin account, both can operate the same the cross margin account (note\
that the futures accounts are separate)\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-trading) Futures trading\
\
The API operation of the perpetual contract of the portfolio margin account is exactly the same as\
that of the classic account, but currently only supports USD settlement\
\
TIP\
\
In the futures trading, it should be noted that there is no compatibility for cross-margin accounts\
like using the API Key of the classic account in spot trading. Therefore, when using the API Key of\
the classic account for futures trading, assets are kept under `classic account-futures`, and when\
using portfolio margin account API Key for futures trading, assets are kept\
under `portfolio margin account-futures`. These two are different futures accounts. In addition,\
funds under `classic account-spot` cannot share margin with `classic account-futures`.\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#trace-id) Trace ID\
\
The API response will carry the header: X-Gate-Trace-ID . This header is used for tracking.\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#self-trade-prevention-stp) Self-Trade Prevention (STP)\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#concepts) Concepts\
\
**Self-Trade Prevention**: STP will prevent any user's orders from being matched with each other.\
\
**CN**: Cancel new, Cancel new orders and keep old ones.\
\
**CO**: Cancel old, Cancel old orders and keep new ones.\
\
**CB**: Cancel both, Both old and new orders will be cancelled.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#stp-strategies) STP Strategies\
\
We support three STP strategies, which are `CN` , `CO` and `CB`.\
\
STP is achieved by adding users to one STP trading group.\
When a user in a STP group place orders, and trading could happen with existing orders of users in the same group, orders will be cancelled.\
The prevention strategy depends on the `stp_act` parameter specified when placing the order as taker.\
If not specified, the `CN` strategy will be used by default.\
\
A user has to be added to a STP trading group before using STP.\
When a user does not belong to any STP trading group, and place orders with the `stp_act` parameter, the orders will be rejected.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#api-parameter-adjustment) API Parameter Adjustment\
\
Take placing futures order as an example:\
\
```\
POST /futures/{settle}/orders\
\
```\
\
New request body parameter:\
\
| Name | Position | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| stp\_act | body | string | No | STP Strategies, including: <br>\- cn<br>\- co<br>\- cb |\
\
New response fields:\
\
| Name | Type | Required | Restriction | Description |\
| --- | --- | --- | --- | --- |\
| stp\_act | string | No | none | STP Strategies, including：<br>\- cn<br>\- co<br>\- cb |\
| stp\_id | integer(int64) | No | readonly | The ID of the STP trading group to which user belongs. |\
| finish\_as | string | No | readonly | order finish type: <br>\- **stp: The order has been canceled due to the `STP`** |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#user-case) User case\
\
There are multiple accounts under `Organization A`, and the IDs of several accounts are `101`, `102`, and `103`\
\
In order to prevent self-trading of orders placed by internal accounts of the organization, the administrator created a STP trading group with group ID `100`,\
and added accounts `101` and `102` to the STP trading group.\
In this case, the members in the group are `[101,102]`.\
\
T1: The `STP` strategy version released.\
\
T2: After the `organization A` account `101` places a short order, there is no matching order in the market order book to match the transaction.\
At this time, the role of the order is `maker`, and the order status is `open`.\
The key response fields returned are:\
\
```\
{\
	"status":"open",\
	"stp_act":"cn",\
	"stp_id":100\
}\
\
```\
\
T3: `Organization A` account `101`/ `102` places a long order, and it can reach a trade with account 101’s short order.\
The match engine finds both two orders' stp\_id are 100, so it applies the STP strategy of the taker order, which defaults to `cn` , and cancels the long order.\
Order's `finish_as` will be set to `stp`.\
The key response fields returned are:\
\
```\
{\
	"status":"finished",\
	"stp_act":"cn",\
	"stp_id":100,\
	"finish_as":"stp"\
}\
\
```\
\
- If `stp_act` is `co` , the order placed by `taker` will be retained, the order status will be `open`,\
and the system will cancel the order of `maker`.\
\
- If `stp_act` is `cb`, both the long and short orders will be cancelled. Orders' `finish_as` will be set to `stp`.\
The key response fields returned are:\
\
\
```\
{\
	"status":"finished",\
	"stp_act":"cb",\
	"stp_id":100,\
	"finish_as":"stp"\
}\
\
```\
\
T3': If account 103 places a long order, and it can reach a trade with account 101’s short order,\
the transaction will be made since account 103 has not been added to account 101’s STP group.\
The key response fields returned are:\
\
```\
{\
	"status":"finished",\
	"stp_id":0,\
	"finish_as":"filled"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#unified-account) Unified Account\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#description) Description\
\
Once a user upgrades their account to the unified account, they can utilize the assets from their spot account as collateral for trading. The assets in the account, denominated in various currencies, will be adjusted based on their liquidity and converted to USD for consistent calculation of the account's assets and position value.\
\
The maximum borrowing limit for margin trading represents the maximum amount that a user can borrow for a given trading market. The platform calculates the user's maximum borrowing limit based on factors such as available margin and platform risk control rules. Once the margin trading generates automatic borrowing, the platform immediately starts accruing interest on the borrowed digital assets.\
\
Currently, the ability to switch to `cross_margin` or `usdt_futures` mode is available. In the future, we will gradually introduce support for various combination margin accounts, including `Futures`, `Delivery`, `Options` and more. Stay tuned for further updates.\
\
Please refer to the documentation for unified API. Once you have upgraded your account, you will be able to make use of these endpoints.\
\
Related endpoint can be found in the Unified Account API doc. After enabling the Unified Account, you can proceed to call them. For more detailed information, please refer to [here](https://www.gate.io/unified-trading-account)\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#api-integration-process) API Integration Process\
\
- Create a new `API KEY` or update the permissions of an existing `API KEY`, checking the `unified` permission\
- Use the classic account's `API KEY` to call the `POST /api/v4/unified/account_mode` endpoint, or upgrade from the WEB page to the Unified Account\
- Use the `/api/v4/spot/**` API for spot-related operations (ordering, modifying orders, querying orders), with the `account=unified` option\
- Use the `/api/v4/futures/**` API for perpetual futures-related operations (ordering, modifying orders, querying orders)\
- Use the `/api/v4/unified/**` API for Unified Account-related operations (account querying, loan querying)\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#spot-trading-2) SPOT Trading\
\
The spot trading in the Unified Account is consistent with that in the classical account. In order operations, specify `account=unified`, or specify `account=spot` and the system will automatically handle the order as a unified account order when detecting the account as a unified account. For example, to place a buy order for the `BTC_USDT` currency pair, the order creation request would be similar to\
\
```\
POST /spot/orders\
\
{\
  "currency_pair": "BTC_USDT",\
  "account": "unified",\
  "side": "buy",\
  ...\
}\
\
```\
\
For other related restrictions, please refer to the document of the API endpoint directly.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#formula) Formula\
\
| Name | Cross Margin |\
| --- | --- |\
| portfolio\_margin\_total\_equity | Account Equity = ∑(Equity \* Index Price） |\
| total\_margin\_balance | Account Margin Balance = ∑(Positive Equity x Index Price x Adjustment Factor) + ∑(Negative Equity x Index Price) - Haircut Loss |\
| total\_initial\_margin\_rate | Account Initial Margin Level = Account Margin Balance / Account Initial Margin |\
| total\_maintenance\_margin\_rate | Account Maintenance Margin Level = Account Margin Balance / Account Maintenance Margin |\
| total\_initial\_margin | Account Initial Margin = Total Liabilities x Spot Initial Margin Rate |\
| total\_maintenance\_margin | Account Maintenance Margin = Total Liabilities x Spot Maintenance Margin Rate |\
| equity | Equity = Coin Balance - Borrowed |\
| available | Available Balance = Principal + Borrowed |\
| freeze | Occupied = Assets Occupied by Spot Open Orders |\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#accountbook-type) AccountBook type\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#general-2) General\
\
- unknown: Unknown\
- login: Log In\
- withdraw: Withdrawals\
- ch\_pass: Change Password\
- ch\_fund\_pass: Change Fund Pass\
- login\_failed: Login Failed\
- axs\_account: Access Account\
- req\_pass\_ch: Request Password Change\
- req\_fund\_pass\_ch: Request Fund Pass Change\
- fund\_pass\_ent: Fund Pass Entered\
- bank\_card\_add: Bank Card Added\
- frw: Face Recognition For Withdrawal\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#order) Order\
\
- new\_order: Order Placed\
- cancel\_order: Order Cancelled\
- order\_fill: Order Filled\
- order\_rej: Order Rejected\
- order\_fee: Trading Fees\
- system\_fee: Trading Fee System Account\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#withdraw-deposit) Withdraw-Deposit\
\
- withdraw: Withdrawals\
- deposit: Deposits\
- deposit\_rej: Deposit Rejected\
- withdraw\_rej: Withdrawal Rejected\
- cancel\_withdraw: Cancel Withdrawal\
- withdraw\_gatecode: GateCode Withdrawals\
- withdraw\_fireblock: Fireblocks Withdrawals\
- withdraw\_copper: Copper Withdrawals\
- startup\_withdraw: Token Withdrawal From Startup\
- deposit\_gatecode: GateCode Deposits\
- deposit\_fireblock: Fireblocks Deposits\
- deposit\_copper: Copper Deposits\
- buy\_cl: Buy Crypto Legend\
- buy\_cc: Buy Crypto Cabital\
- deposit\_finmo: Gate connect Finmo Deposit\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#startup) Startup\
\
- startup\_prtcp: Startup Sale Participation\
- startup\_refund: Startup Sale Refund\
- startup\_sale: Startup Sale\
- startup\_sale\_rb: Startup Sale Rolled Back\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#rebate) Rebate\
\
- referral\_rebate: Referral Superior Rebate\
- sec\_rebate\_out: Secondary Rebate Financial Account Transfer Out\
- sec\_rebate\_in: Affiliate Indirect Superior Rebate Income\
- ab\_rebate: API Broker Rebate Income\
- eb\_rebate: Exchange Broker Rebate Income\
- u\_rebate: Referral Rebate Income\
- ads\_rebate: Affiliate Direct Superior Rebate Income\
- au\_rebate: Affiliate User Rebate Income\
- pis\_rebate: Partner Indirect Superior Rebate Income\
- pds\_rebate: Partner Direct Superior Rebate Income\
- pu\_rebate: Partner User Rebate Income\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#convert) Convert\
\
- eth\_swap: ETH Swap\
- dust\_swap\_dctd: Dust Swap-Small Balances Deducted\
- dust\_swap\_gt\_add: Dust Swap-GT Added\
- dust\_swap\_fee: Dust Swap-Fees Deducted\
- cv\_buy: Quick Buy-Bought\
- cv\_sell: Quick Sell-Sold\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#c2c) C2C\
\
- c2c\_mop: C2C Merchant Order Placed\
- c2c\_moc: C2C Merchant Order Canceled\
- c2c\_rop: C2C Retail Order Placed\
- c2c\_roc: C2C Retail Order Canceled\
- c2c\_om: C2C Order Matched\
- c2c\_or: C2C Order Rejected\
- c2c\_fee: C2C Fees\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#reward) Reward\
\
- deposit\_bonus: Deposit Bonus\
- trading\_rewards: Trading Rewards\
- purchase\_bonus: Purchase Bonus\
- airdrop: Airdrop\
- award: Award\
- mining\_rewards: Mining Rewards\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#account-transfer-in-out) Account Transfer In-Out\
\
- margin\_in: Isolated Margin-Transferred In\
- margin\_out: Isolated Margin- Transferred Out\
- spot\_settle\_out: Spot Settlement Transfer Out\
- spot\_settle\_in: Spot Settlement Transfer Out\
- lending\_in: Lending-Transferred In\
- lending\_out: Lending-Transferred Out\
- cross\_in: PortfolioMarginAccountTransferIn\
- cross\_out: PortfolioMarginAccountTransferOut\
- perp\_in: Perps- Transferred In\
- perp\_out: Perps- Transferred Out\
- perp\_settle\_in: Perpetual Multi-currency Settlement Transfer In\
- perp\_settle\_out: Perpetual Multi-currency Settlement Transfer Out\
- delivery\_in: Delivery- Transferred In\
- delivery\_out: Delivery- Transferred Out\
- ai\_in: Auto-Invest-Transferred In\
- ai\_out: Auto-Invest-Transferred Out\
- e\_options\_in: Easy Options- Transferred In\
- e\_options\_out: Easy Options- Transferred Out\
- options\_in: Options- Transferred In\
- options\_out: Options- Transferred Out\
- cbbc\_in: CBBC- Transferred In\
- cbbc\_out: CBBC- Transferred Out\
- warrant\_in: Warrant- Transferred In\
- warrant\_out: Warrant- Transferred Out\
- subaccount\_trf: Subaccount Transfer\
- quant\_in: Quant- Transferred In\
- quant\_out: Quant- Transferred Out\
- pay\_in: Payment Account- Transferred In\
- pay\_out: Payment Account- Transferred Out\
- fct\_in: Futures Copy Trading - Funds Transfer In\
- fct\_out: Futures Copy Trading - Funds Transfer Out\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#points) Points\
\
- points\_purchase: Points Purchase\
- points\_expiration: Points With Expiration\
- points\_trf: Points Transfer\
- points\_trf\_rej: Points Transfer Rejected\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#finance) Finance\
\
- lending\_lent: Lending-Lent\
- collected: Collected\
- interest\_in: Interest Income\
- lending\_fee: Lending-Fees Deducted\
- hodl\_int: HODL Interest\
- redeem: Redeem\
- lend: Lend\
- dual\_purchased: Dual C-Purchased\
- dual\_settled: Dual C-Settled\
- liq\_add: Liquidity Added\
- liq\_rm: Liquidity Removed\
- liq\_rebalanced: Liquidity Rebalanced\
- slot\_int\_in: Slot Auction Staking Interest Income\
- str\_int\_in: Structured Products Staking Interest Income\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#loan) Loan\
\
- borrow: Borrow\
- repay: Repay\
- margin\_borrow: Isolated Margin-Transferred In\
- margin\_repay: Isolated Margin- Transferred Out\
- margin\_interest\_out: Isolated Margin-Interest Deduction\
- cl\_borrow: Cryptoloan- Borrowed\
- cl\_repay: Cryptoloan- Repaid\
- cl\_dctd: Cryptoloan- Collateral Deducted\
- cl\_rtd: Cryptoloan- Collateral Returned\
- cross\_borrow: PortfolioMarginAccountBorrowIn\
- cross\_repay: PortfolioMarginAccountRepay\
- interest\_out: Interest\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#moments) Moments\
\
- donation: Donation\
- rp\_sent: Red Packet Sent\
- rp\_rcvd: Red Packet Received\
- rp\_rej: Red Packet Rejected\
- ls\_offered: Live Stream-Reward Offered\
- ls\_rcvd: Live Stream- Reward Received\
- pt\_offered: Posts- Reward Offered\
- pt\_rcvd: Posts- Reward Received\
- subs\_deduct: Subscription-Fees Deducted\
- subs\_in: Subscription-Fees Received\
- subs\_refund: Subscription- Refund\
- subs\_in\_rcvd: Subscription- Refunds Received\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#push-trading) PUSH Trading\
\
- push\_dctd: Push- Deduction\
- push\_rcvd\_dctd: Push- Received-Deducted\
- push\_canceled: Push Canceled\
- push\_rej: Push Rejected\
- push\_sent: Push Sent\
- push\_rcvd: Push Received\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#copy-trading) Copy Trading\
\
- quant\_return: Quant- Transaction Returned\
- quant\_cmn\_in: Quant-Commission Transferred In\
- quant\_cmn\_out: Quant-Commission Transferred Out\
- quant\_cmn\_rtd: Quant-Commission Returned\
- fct\_refund: Futures Copy Trading - Funds Auto Transfer Out\
- fct\_rcvd: Futures Lead Trading - Performance Fee Received\
- fct\_fee: Futures Copy Trading - Performance Fee Paid\
- fct\_fee\_refund: Futures Copy Trading - Performance Fee Refund\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#nft) NFT\
\
- nft\_mp: NFT Auction-Margin Paid\
- nft\_bm: NFT Auction-Bid Made\
- nft\_om: NFT Auction-Offer Made\
- ntf\_mr: NFT Auction-Margin Returned\
- nft\_amr: NFT Auction-Aborted-Margin rcvd\
- nft\_ocb: NFT Auction-Order Canceled-Back\
- nft\_fb: Fixed Price-Bought\
- nft\_fs: Fixed Price-For Sale\
- nft\_ob: NFT Make-Offer Bought\
- nft\_os: NFT Make-Offer Sale\
- nft\_cr: Cancel offer refund\
- nft\_ir: Refund for invalid offer\
- nft\_wf: Withdrawal service fee\
- nft\_wfr: Withdrawal service fee\
- ntf\_mf: Multi-copy creation service fee\
- ntf\_mfr: Multi-copy creation service fee refund\
- ntf\_royalty: Royalties\
- nft\_cd: NFT Auction-Order Canceled-Deducted\
- nft\_crd: NFT Auction-Order Canceled-Rotalty-Deducted\
- nft\_cf: crowdfunding\
- nft\_cfr: crowdfunding refund\
- nft\_ammf: Nft-Amm Frozen\
- nft\_ammw: Nft-Amm Withdraw\
- nft\_ammdf: Nft-Amm Deal Fee\
- nft\_ammd: Nft-Amm Deal\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#error-handling) Error Handling\
\
For all abnormal requests, APIv4 will return non-2xx status code, with a response body in JSON\
format to\
explain the error.\
\
The error response body follows a format like:\
\
```\
{\
  "label": "INVALID_PARAM_VALUE",\
  "message": "Invalid parameter `text` with value: abc"\
}\
\
```\
\
- `label`: denotes error type in `string` format. Its value are chosen from a certain list(see\
below).\
Programs can use `label` to identify and catch a specific error.\
- `message`(or `detail`): detailed error message. A longer explanation showing why the error is\
generated\
or how to avoid it. Its purpose is helping to better understand the API. Error handling\
mechanism with this field is highly **NOT** recommended.\
\
Take Python [requests(opens new window)](https://requests.readthedocs.io/en/latest/) for example,\
error handling can be written like:\
\
> Following examples only deal with business-related errors. Network timeout or other\
> common errors need to be handled separately:\
\
```\
import requests\
\
r = requests.get("https://api.gateio.ws/api/v4/futures/btc/contracts/BTC_USD")\
try:\
    r.raise_for_status()\
except requests.HTTPError:\
    # catch 2xx errors, parse error message in body, and do something based on `label`\
    if r.json()['label'] == 'xxx':\
        print(r.json())\
\
```\
\
or with [Python SDK(opens new window)](https://github.com/gateio/gateapi-python):\
\
```\
import json\
from gate_api import FuturesApi\
from gate_api.rest import ApiException\
\
api = FuturesApi()\
try:\
    api.get_futures_contract(settle='btc', contract="BTC_USD")\
except ApiException as e:  # ApiException wraps whole error information, see implementation for details\
    detail = json.loads(e.value.body)\
    if detail['label'] == 'xxx':\
        print(detail)\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#label-list) `label` list\
\
- Request parameter or format related\
\
| `label` | Meaning |\
| --- | --- |\
| INVALID\_PARAM\_VALUE | Invalid parameter value |\
| INVALID\_PROTOCOL | Invalid parameter value |\
| INVALID\_ARGUMENT | Invalid argument |\
| INVALID\_REQUEST\_BODY | Invalid request body |\
| MISSING\_REQUIRED\_PARAM | Missing required parameter |\
| BAD\_REQUEST | Invalid request |\
| INVALID\_CONTENT\_TYPE | Invalid `Content-Type` header |\
| NOT\_ACCEPTABLE | Invalid `Accept-` Header |\
| METHOD\_NOT\_ALLOWED | Request method is not allowed |\
| NOT\_FOUND | Request URL not exists |\
\
- Authentication related\
\
| `label` | Meaning |\
| --- | --- |\
| INVALID\_CREDENTIALS | Invalid credentials provided |\
| INVALID\_KEY | Invalid API Key |\
| IP\_FORBIDDEN | Request IP not in whitelist |\
| READ\_ONLY | API key is read-only |\
| INVALID\_SIGNATURE | Invalid signature |\
| MISSING\_REQUIRED\_HEADER | Missing required authentication header |\
| REQUEST\_EXPIRED | Request `Timestamp` is far from the server time |\
| ACCOUNT\_LOCKED | Account is locked |\
| FORBIDDEN | Account has no permission to request operation |\
\
- Wallet related\
\
| `label` | Meaning |\
| --- | --- |\
| SUB\_ACCOUNT\_NOT\_FOUND | Sub account not found |\
| SUB\_ACCOUNT\_LOCKED | Sub account is locked |\
| MARGIN\_BALANCE\_EXCEPTION | Abnormal margin account |\
| MARGIN\_TRANSFER\_FAILED | Failed to transfer with margin account |\
| TOO\_MUCH\_FUTURES\_AVAILABLE | Futures balance exceeds max allowed |\
| FUTURES\_BALANCE\_NOT\_ENOUGH | Futures balance not enough |\
| ACCOUNT\_EXCEPTION | Abnormal account |\
| SUB\_ACCOUNT\_TRANSFER\_FAILED | Failed to transfer with sub account |\
| ADDRESS\_NOT\_USED | Address never being used in web console |\
| TOO\_FAST | Withdrawing request exceeds frequency limit |\
| WITHDRAWAL\_OVER\_LIMIT | Withdrawal limit exceeded |\
| API\_WITHDRAW\_DISABLED | API withdrawal operation is disabled temporarily |\
| INVALID\_WITHDRAW\_ID | Invalid withdraw ID |\
| INVALID\_WITHDRAW\_CANCEL\_STATUS | Cancelling withdrawal not allowed with current status |\
| DUPLICATE\_REQUEST | Duplicate request |\
| ORDER\_EXISTS | Order already exists, do not resubmit |\
| INVALID\_CLIENT\_ORDER\_ID | The client\_order\_id is invalid |\
\
- Spot and margin trading related\
\
| `label` | Meaning |\
| --- | --- |\
| INVALID\_PRECISION | Invalid precision |\
| INVALID\_CURRENCY | Invalid currency |\
| INVALID\_CURRENCY\_PAIR | Invalid currency pair |\
| POC\_FILL\_IMMEDIATELY | Order would match and take immediately so it's cancelled |\
| ORDER\_NOT\_FOUND | Order not found |\
| ORDER\_CLOSED | Order already closed |\
| ORDER\_CANCELLED | Order already cancelled |\
| QUANTITY\_NOT\_ENOUGH | Amount is not enough |\
| BALANCE\_NOT\_ENOUGH | Balance is not enough |\
| MARGIN\_NOT\_SUPPORTED | Request currency pair doesn't provide margin trading |\
| MARGIN\_BALANCE\_NOT\_ENOUGH | Margin balance is not enough |\
| AMOUNT\_TOO\_LITTLE | Amount does not reach minimum required |\
| AMOUNT\_TOO\_MUCH | Amount exceeds maximum allowed |\
| REPEATED\_CREATION | Repeated creation |\
| LOAN\_NOT\_FOUND | Margin loan is not found |\
| LOAN\_RECORD\_NOT\_FOUND | Margin loan record is not found |\
| NO\_MATCHED\_LOAN | No loan can match request borrow requirement |\
| NOT\_MERGEABLE | Request loans cannot be merged |\
| NO\_CHANGE | No change is made |\
| REPAY\_TOO\_MUCH | Repay more than required |\
| TOO\_MANY\_CURRENCY\_PAIRS | Too many currency pairs in batch orders creation |\
| TOO\_MANY\_ORDERS | Too many orders in one currency pair in batch orders creation |\
| MIXED\_ACCOUNT\_TYPE | More than one account type is used in batch orders creation |\
| AUTO\_BORROW\_TOO\_MUCH | Auto borrow exceeds maximum allowed |\
| TRADE\_RESTRICTED | Trading is restricted due to high debt ratio |\
| FOK\_NOT\_FILL | FOK order cannot be filled completely |\
| INITIAL\_MARGIN\_TOO\_LOW | User's total initial margin rate is too low |\
| NO\_MERGEABLE\_ORDERS | Orders can be merged not found |\
| ORDER\_BOOK\_NOT\_FOUND | Insufficient liquidity |\
| FAILED\_RETRIEVE\_ASSETS | Failed to retrieve account assets |\
| CANCEL\_FAIL | Order cancel failed |\
\
- Futures related\
\
| `label` | Meaning |\
| --- | --- |\
| USER\_NOT\_FOUND | User has no futures account |\
| CONTRACT\_NO\_COUNTER | No counter order found |\
| CONTRACT\_NOT\_FOUND | Contract not found |\
| RISK\_LIMIT\_EXCEEDED | Risk limit exceeded |\
| INSUFFICIENT\_AVAILABLE | Balance is not enough |\
| LIQUIDATE\_IMMEDIATELY | Operation may cause liquidation |\
| LEVERAGE\_TOO\_HIGH | leverage too high |\
| LEVERAGE\_TOO\_LOW | leverage too low |\
| ORDER\_NOT\_FOUND | Order not found |\
| ORDER\_NOT\_OWNED | Order not owned |\
| ORDER\_FINISHED | Order already finished |\
| TOO\_MANY\_ORDERS | Too many open orders |\
| POSITION\_CROSS\_MARGIN | margin updating is not allowed in cross margin |\
| POSITION\_IN\_LIQUIDATION | Position is being liquidated |\
| POSITION\_IN\_CLOSE | Position is closing |\
| POSITION\_EMPTY | Position is empty |\
| REMOVE\_TOO\_MUCH | Changed margin exceeds allowed |\
| RISK\_LIMIT\_NOT\_MULTIPLE | Risk limit is not a multiple of step |\
| RISK\_LIMIT\_TOO\_HIGH | Risk limit too high |\
| RISK\_LIMIT\_TOO\_lOW | Risk limit too low |\
| PRICE\_TOO\_DEVIATED | Order price deviates too much from mark price |\
| SIZE\_TOO\_LARGE | Order size exceeds maximum |\
| SIZE\_TOO\_SMALL | Order size does not reach minimum |\
| PRICE\_OVER\_LIQUIDATION | Price to increase position can not exceeds liquidation price |\
| PRICE\_OVER\_BANKRUPT | Price to decrease position cannot exceeds bankrupting price |\
| ORDER\_POC\_IMMEDIATE | POC order will be finished immediately |\
| INCREASE\_POSITION | POC order will increase position |\
| CONTRACT\_IN\_DELISTING | Contract is delisting, only reduce-only order or close order is allowed |\
| POSITION\_NOT\_FOUND | Position not found |\
| POSITION\_DUAL\_MODE | Operation forbidden in dual-mode |\
| ORDER\_PENDING | Operation forbidden with pending orders |\
| POSITION\_HOLDING | Operation forbidden with holding position |\
| REDUCE\_EXCEEDED | Reduce order would exceed position in dual-mode |\
| NO\_CHANGE | No change is made |\
| AMEND\_WITH\_STOP | Amend forbidden with stop order |\
| ORDER\_FOK | Killed for FOK |\
\
- Collateral Loan related\
\
| `label` | Meaning |\
| --- | --- |\
| COL\_NOT\_ENOUGH | Collateral balance not enough |\
| COL\_TOO\_MUCH | Exceed collateral currency quota |\
| INIT\_LTV\_TOO\_HIGH | Init ltv too high |\
| REDEEMED\_LTV\_TOO\_HIGH | Ltv too high after redeem |\
| BORROWABLE\_NOT\_ENOUGH | Left borrowable not enough |\
| ORDER\_TOO\_MANY\_TOTAL | Exceed platform order count one day |\
| ORDER\_TOO\_MANY\_DAILY | Exceed single user order count one day |\
| ORDER\_TOO\_MANY\_USER | Exceed single user order count total |\
| ORDER\_NOT\_EXIST | Order id not exist |\
| ORDER\_FINISHED | Order id finished |\
| ORDER\_NO\_PAY | Order unpaid amount is zero |\
| ORDER\_EXIST | Order exist |\
| ORDER\_HISTORY\_EXIST | Order history exist |\
| ORDER\_REPAYING | Order is repaying |\
| ORDER\_LIQUIDATING | Order is liquidating |\
| BORROW\_TOO\_LITTLE | Less than currency min borrow amount |\
| BORROW\_TOO\_LARGE | Greater than total max borrow amount quantity |\
| REPAY\_AMOUNT\_INVALID | Repay request amount invalid |\
| REPAY\_GREATER\_THAN\_AVAILABLE | Repay greater than available |\
| POOL\_BALANCE\_NOT\_ENOUGH | Pool balance not enough |\
| CURRENCY\_SETTLING | Currency settlement in progress |\
| RISK\_REJECT | Risk reject, please try again later |\
| LOAN\_FAILED | Loan failed, you can borrow again |\
\
- Portfolio related\
\
| `label` | Meaning |\
| --- | --- |\
| USER\_LIAB | User has liab |\
| USER\_PENDING\_ORDERS | User has pending orders |\
| MODE\_SET | already set portfolio\_margin mode |\
\
- Earn related\
\
| `label` | 含义 |\
| --- | --- |\
| ERR\_BALANCE\_NOT\_ENOUGH | balance not enough |\
| ERR\_PRODUCT\_SELL\_OUT | Target quota reached |\
| ERR\_PRODUCT\_BUY | The project is not yet open for purchase |\
| ERR\_CREATE\_ORDER | Put order fail |\
| ERR\_QUOTA\_LOWER\_LIMIT | Not meeting the minimum order amount |\
| ERR\_QUOTA\_SUPERIOR\_LIMIT | The maximum order limit has been reached |\
| ERR\_ORDER\_NUMBER\_LIMIT | The maximum order quantity has been reached |\
| ERR\_PRODUCT\_CLOSE | Project closed |\
| COPIES\_NOT\_ENOUGH | Not enough shares available to subscribe |\
| COPIES\_TOO\_SMALL | Investment share is too small |\
| COPIES\_TOO\_BIG | The number of investment shares exceeds the upper limit |\
| TOTAL\_AMOUNT\_24 | The total amount of pledge and redemption within 24 hours exceeds the limit |\
| TOTAL\_BUYCOUNT\_24 | Pledge and redemption times exceeding the limit within 24 hours |\
| REDEEM\_24\_LIMIT | Redemption are allowed 24 hours after the last staking |\
\
- Server errors\
\
| `label` | Meaning |\
| --- | --- |\
| INTERNAL | Internal server error |\
| SERVER\_ERROR | Internal server error |\
| TOO\_BUSY | Server is too busy at the moment |\
\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#authentication) Authentication\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#generate-api-key) Generate API key\
\
Before calling the private API interface, the API key of the account needs to be generated to verify\
the identity. You can log in on the website and generate it in\
\[account management\] - > \[APIv4 keys\], or click [here](https://www.gate.io/myaccount/apiv4keys)\
to generate API keys.\
\
Each account can create 20 API keys, and the permission configuration of each key is independent of\
each other. It is recommended to set a note name for each key to indicate its purpose.\
\
**`Key`** Access Key\
**`Secret Key`** The key used for signature authentication encryption\
\
Besides, you can attach an IP whitelist, which requires the server only accept requests from\
specified IPs. Each key can have at most 20 IPs formatted in IPv4(not supporting IP range though).\
If IP whitelist is not set, the server will skip client IP validation.\
\
Each user can create at most 5 keys with separate permissions. It is recommended to set a name for\
key denoting how the key will be used.\
\
TIP\
\
Note: If the key is named with `spot` or `futures`, then it could be the default name after\
APIv4 migration. For details refer to _About APIv4 key improvement_ section\
\
Created key can also be updated or deleted, but any modification(s) can take up to 5 minutes to take\
effect.\
\
Please note that futures TestNet trading is a separate environment from futures real trading. Real\
trading API keys cannot be used in TestNet. If you want to test futures API with TestNet, you need\
to log into the console to generate TestNet API keys(in _"Futures TestNet APIKeys"_ tab on _"_\
_APIv4Keys"_ page). Making futures requests are identical between real and TestNet trading, with the\
only exceptions are different base URLs and different API keys.\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#apiv4-permissions) APIv4 Permissions\
\
When creating a Key, you can configure whether to enable spot, margin, contract, wallet, or\
withdrawal permissions for the Key, and whether to enable read-write or read-only permissions.\
\
| Products | Permissions |\
| --- | --- |\
| `spot/margin` | `Read-only` query orders `Read-write` query orders & place orders |\
| `perpetual contract` | `Read-only` query orders `Read-write` query orders & place orders |\
| `delivery contract` | `Read-only` query orders `Read-write` query orders & place orders |\
| `wallet` | `Read-only` Query for withdrawal transfer records `Read-write` Query for account records & fund transfers |\
| `withdrawal` | `Read-only` Query cash withdrawal records `Read-write` Query cash withdrawal records & withdrawals |\
\
All `GET` operations are read requests, while others are write requests. Each permission group can\
be set to disabled, read-only or read-write.\
\
Please note that even though withdrawal API has only one operation(i.e.\
`POST /withdrawals`), for general concern, it is still separated from wallet API into a standalone\
permission group, while withdrawal history retrieving API stays inside wallet operations(\
i.e., `GET /wallet/withdrawals`).\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#apiv4-signed-request-requirements) APIv4 signed request requirements\
\
1. Generate APIv4 Key pairs in web console, and make sure it has the right permissions.\
2. Set request header `KEY` to the key.\
3. Set request header `Timestamp` to current time formatted in Unix time in seconds. Pay\
attention that the gap between its value and current time cannot exceed 60 seconds.\
4. Set request header `SIGN` to encrypted request signature. Refer to next section for how signature\
string is generated. Signature generation method is\
`HexEncode(HMAC_SHA512(secret, signature_string))`, i.e., the hexadecimal digest output of\
HMAC-SHA512 with APIv4 secret as secret and signature string as message,\
5. Make sure request client's IP is in your APIv4 Key's IP whitelist.\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#api-signature-string-generation) API Signature string generation\
\
In APIv4, signature string is concatenated as the following way:\
\
`Request Method + "\n" 	+ Request URL + "\n" 	+ Query String + "\n" 	+ HexEncode(SHA512(Request Payload)) + "\n" 	+ Timestamp`\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#request-method) Request Method\
\
Request method in UPPERCASE, e.g. `POST`, `GET`\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#request-url) Request URL\
\
Request url. Protocol, host and port are not included, e.g. `/api/v4/futures/orders`\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-string) Query String\
\
Request query string without URL encode. query parameters order should be the\
same as how they are concatenated in the request URL, e.g. `status=finished&limit=50`. Use empty string("") if no query parameters.\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#hexencode-sha512-request-payload) HexEncode(SHA512(Request Payload))\
\
Hash the request body with SHA512 and output its Hex encoded form. If no request body, use empty string's hashed result, i.e.\
`cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e`\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#timestamp) Timestamp\
\
`Timestamp` request header value.\
\
Examples\
\
Note: all example signature string are broken into multiple lines for displaying purpose only.\
Only the `\n` character in signature string is reserved in reality.\
\
Suppose the key we used is `key`, while the secret is `secret`.\
\
1. List all orders\
\
```\
	GET /api/v4/futures/orders?contract=BTC_USD&status=finished&limit=50 HTTP/1.1\
\
```\
\
Signature string：\
\
```\
	GET\n\
	/api/v4/futures/orders\n\
	contract=BTC_USD&status=finished&limit=50\n\
	cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e\n\
	1541993715\
\
```\
\
Explanation：\
\
- `/api/v4/futures/orders`: request url\
- `contract=BTC_USD&status=finished&limit=50`: keep the query string as it is in the request url\
- request body use empty string's hashed result\
- `1541993715`: Unix timestamp in seconds\
\
Signature generated\
\
`55f84ea195d6fe57ce62464daaa7c3c02fa9d1dde954e4c898289c9a2407a3d6fb3faf24deff16790d726b66ac9f74526668b13bd01029199cc4fcc522418b8a`\
\
2. Create an order\
\
```\
	POST /api/v4/futures/orders HTTP/1.1\
\
	{"contract":"BTC_USD","type":"limit","size":100,"price":6800,"time_in_force":"gtc"}\
\
```\
\
Signature string：\
\
```\
	POST\n\
	/api/v4/futures/orders\n\
	\n\
	ad3c169203dc3026558f01b4df307641fa1fa361f086b2306658886d5708767b1854797c68d9e62fef2f991645aa82673622ebf417e091d0bd22bafe5d956cca\n\
	1541993715\
\
```\
\
Explanation：\
\
- request query string is empty, use plain empty string\
- use the hashed result of the json-string-formatted request body\
\
Signature generated\
\
`eae42da914a590ddf727473aff25fc87d50b64783941061f47a3fdb92742541fc4c2c14017581b4199a1418d54471c269c03a38d788d802e2c306c37636389f0`\
\
```\
\


# example authentication implementation in Python\
\
"""\
Python SDK is recommended as it has already implemented the authentication process for every API:\
"""\
\
import time\
import hashlib\
import hmac\
import requests\
import json\
\
def gen_sign(method, url, query_string=None, payload_string=None):\
    key = ''        # api_key\
    secret = ''     # api_secret\
\
    t = time.time()\
    m = hashlib.sha512()\
    m.update((payload_string or "").encode('utf-8'))\
    hashed_payload = m.hexdigest()\
    s = '%s\n%s\n%s\n%s\n%s' % (method, url, query_string or "", hashed_payload, t)\
    sign = hmac.new(secret.encode('utf-8'), s.encode('utf-8'), hashlib.sha512).hexdigest()\
    return {'KEY': key, 'Timestamp': str(t), 'SIGN': sign}\
\
if __name__ == "__main__":\
    host = "https://api.gateio.ws"\
    prefix = "/api/v4"\
    common_headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
    url = '/futures/orders'\
    body = {"contract": "BTC_USD", "size": 100, "price": "30", "tif": "gtc"}\
    request_content = json.dumps(body)\
    sign_headers = gen_sign('POST', prefix + url, "", request_content)\
    sign_headers.update(common_headers)\
    print('signature headers: %s' % sign_headers)\
    res = requests.post(host + prefix + url, headers=sign_headers, data=request_content)\
    print(res.status_code)\
    print(res.content)\
\
```\
\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#faq) FAQ\
\
- How to retrieve `POST /wallet/transfers` history?\
\
Records of transfers generated through `POST /wallet/transfers` has multiple methods to be\
retrieved based on account, including:\
\
  - `GET /margin/account_book` to retrieve transferals from or to margin account.\
  - `GET /futures/{settle}/account_book?type=dnw` to retrieve perpetual contract account history\
  - `GET /delivery/{settle}/account_book?type=dnw` to retrieve delivery contract account history\
- How to create margin orders?\
\
Margin order creation has been merged into spot order APIs. In `POST /spot/orders` or\
`POST /spot/batch_orders`, set `account` to `margin` to create margin orders.\
\
- Futures operation returns error `USER_NOT_FOUND`\
\
Futures account is not initialized yet. Making a deposit to your futures account will help. Note\
that each settle currency is associated with an independent futures account.\
\
- Futures operation returns error `CONTRACT_NOT_FOUND`\
\
Every settle currency has its own contract list. Make sure the contract you specified is supported\
by the settle currency. You can query the list with\
\
`GET /futures/{settle}/contracts` or `GET /delivery/{settle}/contracts`\
\
- Difference between sub account and main account\
\
  - Sub account API Key cannot operate transferals between main and sub account,\
    i.e., `POST /wallet/sub_account_transfers`\
  - Sub account API Key cannot operate withdrawal, i.e., `POST /withdrawals`\
  - If sub account does not have some business permission, even if its API key has the permission,\
    the operations will be rejected too.\
- I have other question(s) not covered above\
\
Contact support for the issue. If the problem is related to one of the SDKs, you can also open an\
issue in the corresponding GitHub repository.\
\
When submitting an issue, please include the following information to help identify the problem:\
\
  - User ID\
    - Original request URL, request parameters and request body\
    - What API key was used and where was it used, TestNet or real trading(API secret is not needed)\
    - Programming language. Providing a code snippet will be better\
    - Whether SDK was used. If so, which method caused the problem\
\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/deposits"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": "210496",\
    "timestamp": "1542000000",\
    "withdraw_order_id": "order_123456",\
    "currency": "USDT",\
    "address": "1HkxtBAMrA3tP5ENnYY2CZortjZvFDH5Cs",\
    "txid": "128988928203223323290",\
    "amount": "222.61",\
    "memo": "",\
    "status": "DONE",\
    "chain": "TRX"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#transfer-between-trading-accounts) Transfer between trading accounts\
\
`POST /wallet/transfers`\
\
_Transfer between trading accounts_\
\
Transfer between different accounts. Currently support transfers between the following:\
\
1. spot - margin\
2. spot - futures(perpetual)\
3. spot - delivery\
4. spot - options\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » currency | body | string | true | Transfer currency. For futures account, `currency` can be set to `POINT` or settle currency |\
| » from | body | string | true | Account to transfer from |\
| » to | body | string | true | Account to transfer to |\
| » amount | body | string | true | Transfer amount |\
| » currency\_pair | body | string | false | Margin currency pair. Required if transfer from or to margin account |\
| » settle | body | string | false | Futures settle currency. Required if transferring from or to futures account |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| » from | spot |\
| » from | margin |\
| » from | futures |\
| » from | delivery |\
| » from | options |\
| » to | spot |\
| » to | margin |\
| » to | futures |\
| » to | delivery |\
| » to | options |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Balance transferred | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_TransactionID_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » tx\_id | integer(int64) | Order id |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/wallet/transfers"\
query_param=""\
body_param='{"currency":"BTC","from":"spot","to":"margin","amount":"1","currency_pair":"BTC_USDT","settle":""}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "currency": "BTC",\
  "from": "spot",\
  "to": "margin",\
  "amount": "1",\
  "currency_pair": "BTC_USDT",\
  "settle": ""\
}\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "tx_id": 59636381286\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#transfer-between-main-and-sub-accounts) Transfer between main and sub accounts\
\
`POST /wallet/sub_account_transfers`\
\
_Transfer between main and sub accounts_\
\
Support transferring with sub user's spot or futures account. Note that only main user's spot account is used no matter which sub user's account is operated.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » currency | body | string | true | Transfer currency name |\
| » sub\_account | body | string | true | Sub account user ID |\
| » direction | body | string | true | Transfer direction. to - transfer into sub account; from - transfer out from sub account |\
| » amount | body | string | true | Transfer amount |\
| » client\_order\_id | body | string | false | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_', with a length ranging from 1 to 64 characters. |\
| » sub\_account\_type | body | string | false | Target sub user's account. `spot` \- spot account, `futures` \- perpetual contract account, `delivery` \- delivery account |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Balance transferred | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_TransactionID_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » tx\_id | integer(int64) | Order id |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/wallet/sub_account_transfers"\
query_param=""\
body_param='{"client_order_id":"da3ce7a088c8b0372b741419c7829033","currency":"BTC","sub_account":"10002","direction":"to","amount":"1","sub_account_type":"spot"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "client_order_id": "da3ce7a088c8b0372b741419c7829033",\
  "currency": "BTC",\
  "sub_account": "10002",\
  "direction": "to",\
  "amount": "1",\
  "sub_account_type": "spot"\
}\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "tx_id": 59636381286\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-transfer-records-between-main-and-sub-accounts) Retrieve transfer records between main and sub accounts\
\
`GET /wallet/sub_account_transfers`\
\
_Retrieve transfer records between main and sub accounts_\
\
Record time range cannot exceed 30 days\
\
> Note: only records after 2020-04-10 can be retrieved\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| sub\_uid | query | string | false | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |\
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » currency | string | Transfer currency name |\
| » sub\_account | string | Sub account user ID |\
| » direction | string | Transfer direction. to - transfer into sub account; from - transfer out from sub account |\
| » amount | string | Transfer amount |\
| » uid | string | Main account user ID |\
| » client\_order\_id | string | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_', with a length ranging from 1 to 64 characters. |\
| » timest | string | Transfer timestamp |\
| » source | string | Where the operation is initiated from |\
| » sub\_account\_type | string | Target sub user's account. `spot` \- spot account, `futures` \- perpetual contract account, `delivery` \- delivery account |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/sub_account_transfers"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "uid": "10001",\
    "timest": "1592809000",\
    "source": "web",\
    "client_order_id": "da3ce7a088c8b0372b741419c7829033",\
    "currency": "BTC",\
    "sub_account": "10002",\
    "direction": "to",\
    "amount": "1",\
    "sub_account_type": "spot"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#sub-account-transfers-to-sub-account) Sub-account transfers to sub-account\
\
`POST /wallet/sub_account_to_sub_account`\
\
_Sub-account transfers to sub-account_\
\
It is possible to perform balance transfers between two sub-accounts under the same main account. You can use either the API Key of the main account or the API Key of the sub-account to initiate the transfer.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » currency | body | string | true | Transfer currency name |\
| » sub\_account\_type | body | string | false | Transfer from the account. (deprecate, use `sub_account_from_type` and `sub_account_to_type` instead) |\
| » sub\_account\_from | body | string | true | Transfer from the user id of the sub-account |\
| » sub\_account\_from\_type | body | string | true | The sub-account's outgoing trading account, spot - spot account, futures - perpetual contract account, delivery - delivery contract account. |\
| » sub\_account\_to | body | string | true | Transfer to the user id of the sub-account |\
| » sub\_account\_to\_type | body | string | true | The sub-account's incoming trading account, spot - spot account, futures - perpetual contract account, delivery - delivery contract account |\
| » amount | body | string | true | Transfer amount |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Balance transferred | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_TransactionID_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » tx\_id | integer(int64) | Order id |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/sub_account_margin_balances"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "uid": "10000",\
    "available": [\
      {\
        "locked": false,\
        "currency_pair": "BTC_USDT",\
        "risk": "9999.99",\
        "base": {\
          "available": "0.1",\
          "borrowed": "0",\
          "interest": "0",\
          "currency": "BTC",\
          "locked": "0"\
        },\
        "quote": {\
          "available": "0",\
          "borrowed": "0",\
          "interest": "0",\
          "currency": "USDT",\
          "locked": "0"\
        }\
      }\
    ]\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-sub-accounts-futures-account-balances) Query sub accounts' futures account balances\
\
`GET /wallet/sub_account_futures_balances`\
\
_Query sub accounts' futures account balances_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| sub\_uid | query | string | false | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |\
| settle | query | string | false | Query only balances of specified settle currency |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » uid | string | User ID |\
| » available | object | Futures account balances |\
| »» **additionalProperties** | object | none |\
| »»» total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. <br>total = SUM(history\_dnw, history\_pnl, history\_fee, history\_refr, history\_fund) |\
| »»» unrealised\_pnl | string | Unrealized PNL |\
| »»» position\_margin | string | Position margin |\
| »»» order\_margin | string | Order margin of unfinished orders |\
| »»» available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |\
| »»» point | string | POINT amount |\
| »»» currency | string | Settle currency |\
| »»» in\_dual\_mode | boolean | Whether dual mode is enabled |\
| »»» enable\_credit | boolean | Whether portfolio margin account mode is enabled |\
| »»» position\_initial\_margin | string | Initial margin position, applicable to the portfolio margin account model |\
| »»» maintenance\_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |\
| »»» bonus | string | Perpetual Contract Bonus |\
| »»» enable\_evolved\_classic | boolean | Classic account margin mode, true-new mode, false-old mode |\
| »»» cross\_order\_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |\
| »»» cross\_initial\_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |\
| »»» cross\_maintenance\_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |\
| »»» cross\_unrealised\_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |\
| »»» cross\_available | string | Full warehouse available amount, suitable for the new classic account margin model |\
| »»» isolated\_position\_margin | string | Ware -position margin, suitable for the new classic account margin model |\
| »»» enable\_new\_dual\_mode | boolean | Whether to open a new two-way position mode |\
| »»» margin\_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |\
| »»» history | object | Statistical data |\
| »»»» dnw | string | total amount of deposit and withdraw |\
| »»»» pnl | string | total amount of trading profit and loss |\
| »»»» fee | string | total amount of fee |\
| »»»» refr | string | total amount of referrer rebates |\
| »»»» fund | string | total amount of funding costs |\
| »»»» point\_dnw | string | total amount of point deposit and withdraw |\
| »»»» point\_fee | string | total amount of point fee |\
| »»»» point\_refr | string | total amount of referrer rebates of point fee |\
| »»»» bonus\_dnw | string | total amount of perpetual contract bonus transfer |\
| »»»» bonus\_offset | string | total amount of perpetual contract bonus deduction |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/wallet/sub_account_futures_balances'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/sub_account_futures_balances"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "uid": "10003",\
    "available": {\
      "BTC": "0.1",\
      "GT": "2000",\
      "USDT": "10"\
    }\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-subaccount-s-cross-margin-account-info) Query subaccount's cross\_margin account info\
\
`GET /wallet/sub_account_cross_margin_balances`\
\
_Query subaccount's cross\_margin account info_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| sub\_uid | query | string | false | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » uid | string | User ID |\
| » available | object | none |\
| »» user\_id | integer(int64) | User ID of the cross margin account. 0 means that the subaccount has not yet opened a cross margin account |\
| »» locked | boolean | Whether account is locked |\
| »» balances | object | none |\
| »»» CrossMarginBalance | object | none |\
| »»»» available | string | Available amount |\
| »»»» freeze | string | Locked amount |\
| »»»» borrowed | string | Borrowed amount |\
| »»»» interest | string | Unpaid interests |\
| »»» total | string | Total account value in USDT, i.e., the sum of all currencies' `(available+freeze)*price*discount` |\
| »»» borrowed | string | Total borrowed value in USDT, i.e., the sum of all currencies' `borrowed*price*discount` |\
| »»» borrowed\_net | string | Total borrowed value in USDT \* borrowed factor |\
| »»» net | string | Total net assets in USDT |\
| »»» leverage | string | Position leverage |\
| »»» interest | string | Total unpaid interests in USDT, i.e., the sum of all currencies' `interest*price*discount` |\
| »»» risk | string | Risk rate. When it belows 110%, liquidation will be triggered. Calculation formula: `total / (borrowed+interest)` |\
| »»» total\_initial\_margin | string | Total initial margin |\
| »»» total\_margin\_balance | string | Total margin balance |\
| »»» total\_maintenance\_margin | string | Total maintenance margin |\
| »»» total\_initial\_margin\_rate | string | Total initial margin rate |\
| »»» total\_maintenance\_margin\_rate | string | Total maintenance margin rate |\
| »»» total\_available\_margin | string | Total available margin |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/saved_address"\
query_param="currency=USDT"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "currency": "usdt",\
    "chain": "TRX",\
    "address": "TWYirLzw2RARB2jfeFcfRPmeuU3rC7rakT",\
    "name": "gate",\
    "tag": "",\
    "verified": "1"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-personal-trading-fee) Retrieve personal trading fee\
\
`GET /wallet/fee`\
\
_Retrieve personal trading fee_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency\_pair | query | string | false | Specify a currency pair to retrieve precise fee rate |\
| settle | query | string | false | Specify the settlement currency of the contract to get more accurate rate settings |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions) Detailed descriptions\
\
**currency\_pair**: Specify a currency pair to retrieve precise fee rate\
\
This field is optional. In most cases, the fee rate is identical among all currency pairs\
\
**settle**: Specify the settlement currency of the contract to get more accurate rate settings\
\
This field is optional. Generally, the rate settings for all settlement currencies are the same.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-2) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | BTC |\
| settle | USDT |\
| settle | USD |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » user\_id | integer(int64) | User ID |\
| » taker\_fee | string | taker fee rate |\
| » maker\_fee | string | maker fee rate |\
| » gt\_discount | boolean | If GT deduction is enabled |\
| » gt\_taker\_fee | string | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |\
| » gt\_maker\_fee | string | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |\
| » loan\_fee | string | Loan fee rate of margin lending |\
| » point\_type | string | Point type. 0 - Initial version. 1 - new version since 202009 |\
| » futures\_taker\_fee | string | Futures trading taker fee |\
| » futures\_maker\_fee | string | Future trading maker fee |\
| » delivery\_taker\_fee | string | Delivery trading taker fee |\
| » delivery\_maker\_fee | string | Delivery trading maker fee |\
| » debit\_fee | integer | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/fee"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user_id": 10001,\
  "taker_fee": "0.002",\
  "maker_fee": "0.002",\
  "futures_taker_fee": "-0.00025",\
  "futures_maker_fee": "0.00075",\
  "gt_discount": false,\
  "gt_taker_fee": "0",\
  "gt_maker_fee": "0",\
  "loan_fee": "0.18",\
  "point_type": "1",\
  "delivery_taker_fee": "0.00016",\
  "delivery_maker_fee": "-0.00015",\
  "debit_fee": 3\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-user-s-total-balances) Retrieve user's total balances\
\
`GET /wallet/total_balance`\
\
_Retrieve user's total balances_\
\
This endpoint returns an approximate sum of exchanged amount from all currencies to input currency for each account.The exchange rate and account balance could have been cached for at most 1 minute. It is not recommended to use its result for any trading calculation.\
\
For trading calculation, use the corresponding account query endpoint for each account type. For example:\
\
- `GET /spot/accounts` to query spot account balance\
- `GET /margin/accounts` to query margin account balance\
- `GET /futures/{settle}/accounts` to query futures account balance\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | false | Currency unit used to calculate the balance amount. BTC, CNY, USD and USDT are allowed. USDT is the default. |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is valid and is successfully responded | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_User's balance in all accounts_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | object | Total balances calculated with specified currency unit |\
| »» amount | string | Account total balance amount |\
| »» currency | string | Currency |\
| »» unrealised\_pnl | string | Unrealised\_pnl, this field will only appear in futures, options, delivery, and total accounts |\
| »» borrowed | string | Borrowed，this field will only appear in margin and cross\_margin accounts |\
| » details | object | Total balances in different accounts<br>\- cross\_margin: cross margin account<br>\- spot: spot account<br>\- finance: finance account<br>\- margin: margin account<br>\- quant: quant account<br>\- futures: futures account<br>\- delivery: delivery account<br>\- warrant: warrant account<br>\- cbbc: cbbc account |\
| »» **additionalProperties** | object | Total balances calculated with specified currency unit |\
| »»» amount | string | Account total balance amount |\
| »»» currency | string | Currency |\
| »»» unrealised\_pnl | string | Unrealised\_pnl, this field will only appear in futures, options, delivery, and total accounts |\
| »»» borrowed | string | Borrowed，this field will only appear in margin and cross\_margin accounts |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-3) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| currency | BTC |\
| currency | CNY |\
| currency | USD |\
| currency | USDT |\
| currency | BTC |\
| currency | CNY |\
| currency | USD |\
| currency | USDT |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/wallet/total_balance"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "details": {\
    "cross_margin": {\
      "amount": "0",\
      "currency": "USDT"\
    },\
    "spot": {\
      "currency": "USDT",\
      "amount": "42264489969935775.5160259954878034182418"\
    },\
    "finance": {\
      "amount": "662714381.70310327810191647181",\
      "currency": "USDT"\
    },\
    "margin": {\
      "amount": "1259175.664137668554329559",\
      "currency": "USDT",\
      "borrowed": "0.00"\
    },\
    "quant": {\
      "amount": "591702859674467879.6488202650892478553852",\
      "currency": "USDT"\
    },\
    "futures": {\
      "amount": "2384175.5606114082065",\
      "currency": "USDT",\
      "unrealised_pnl": "0.00"\
    },\
    "delivery": {\
      "currency": "USDT",\
      "amount": "1519804.9756702",\
      "unrealised_pnl": "0.00"\
    },\
    "warrant": {\
      "amount": "0",\
      "currency": "USDT"\
    },\
    "cbbc": {\
      "currency": "USDT",\
      "amount": "0"\
    }\
  },\
  "total": {\
    "currency": "USDT",\
    "amount": "633967350312281193.068368815439797304437",\
    "unrealised_pnl": "0.00",\
    "borrowed": "0.00"\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-small-balance) List small balance\
\
`GET /wallet/small_balance`\
\
_List small balance_\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » _None_ | object | Convert Small Balance |\
| »» currency | string | Currency |\
| »» available\_balance | string | Available balance |\
| »» estimated\_as\_btc | string | Estimated as BTC |\
| »» convertible\_to\_gt | string | Estimated conversion to GT |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/sub_accounts/0"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "remark": "remark",\
  "login_name": "sub_account_for_trades",\
  "user_id": 10001,\
  "state": 1,\
  "create_time": 168888888\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-api-key-of-the-sub-account) Create API Key of the sub-account\
\
`POST /sub_accounts/{user_id}/keys`\
\
_Create API Key of the sub-account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| user\_id | path | integer(int64) | true | Sub-account user id |\
| body | body | [SubAccountKey](https://www.gate.io/docs/developers/apiv4/en/#schemasubaccountkey) | true | none |\
| » mode | body | integer(int32) | false | Mode: 1 - classic 2 - portfolio account |\
| » name | body | string | false | API key name |\
| » perms | body | array | false | none |\
| »» name | body | string | false | Permission function name (no value will be cleared) |\
| »» read\_only | body | boolean | false | read only |\
| » ip\_whitelist | body | array | false | ip white list (list will be removed if no value is passed) |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-3) Detailed descriptions\
\
**»» name**: Permission function name (no value will be cleared)\
\
- wallet: wallet\
- spot: spot/leverage\
- futures: perpetual contract\
- delivery: delivery contract\
- earn: financial management\
- custody: custody\
- options: options\
- account: account information\
- loan: loan\
- margin: leverage\
- unified: unified account\
- copy: copy\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Created Successfully | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » user\_id | string | User ID |\
| » mode | integer(int32) | Mode: 1 - classic 2 - portfolio account |\
| » name | string | API key name |\
| » perms | array | none |\
| »» name | string | Permission function name (no value will be cleared)<br>\- wallet: wallet<br>\- spot: spot/leverage<br>\- futures: perpetual contract<br>\- delivery: delivery contract<br>\- earn: financial management<br>\- custody: custody<br>\- options: options<br>\- account: account information<br>\- loan: loan<br>\- margin: leverage<br>\- unified: unified account<br>\- copy: copy |\
| »» read\_only | boolean | read only |\
| » ip\_whitelist | array | ip white list (list will be removed if no value is passed) |\
| » key | string | API Key |\
| » state | integer(int32) | State 1 - normal 2 - locked 3 - frozen |\
| » created\_at | integer(int64) | Creation time |\
| » updated\_at | integer(int64) | Last update time |\
| » last\_access | integer(int64) | Last access time |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/sub_accounts/0/keys'\
query_param = ''\
body='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/sub_accounts/0/keys"\
query_param=""\
body_param='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "mode": 1,\
  "name": "spot",\
  "perms": [\
    {\
      "read_only": false,\
      "name": "options"\
    },\
    {\
      "read_only": false,\
      "name": "spot"\
    },\
    {\
      "read_only": false,\
      "name": "delivery"\
    },\
    {\
      "read_only": false,\
      "name": "wallet"\
    },\
    {\
      "read_only": false,\
      "name": "futures"\
    }\
  ],\
  "ip_whitelist": [\
    "127.0.0.1",\
    "127.0.0.2"\
  ]\
}\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "state": 1,\
  "name": "spot",\
  "user_id": 100000,\
  "perms": [\
    {\
      "name": "options",\
      "read_only": false\
    },\
    {\
      "name": "spot",\
      "read_only": false\
    },\
    {\
      "name": "delivery",\
      "read_only": false\
    },\
    {\
      "name": "wallet",\
      "read_only": false\
    },\
    {\
      "name": "futures",\
      "read_only": false\
    }\
  ],\
  "ip_whitelist": [\
    "127.0.0.1",\
    "127.0.0.2"\
  ],\
  "mode": 1,\
  "secret": "cddcc6e5e78060e013860bdbe5e737830b96821c027664586fb38b411808f4fd",\
  "key": "eb8815bf99d7bb5f8ad6497bdc4774a8",\
  "created_at": 1663683330,\
  "updated_at": 1663683330\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-all-api-key-of-the-sub-account) List all API Key of the sub-account\
\
`GET /sub_accounts/{user_id}/keys`\
\
_List all API Key of the sub-account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| user\_id | path | integer | true | Sub-account user id |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [SubAccountKey](https://www.gate.io/docs/developers/apiv4/en/#schemasubaccountkey)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/sub_accounts/0/keys"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "state": 1,\
    "name": "spot",\
    "user_id": 1000000,\
    "perms": [\
      {\
        "name": "futures",\
        "read_only": false\
      },\
      {\
        "name": "wallet",\
        "read_only": false\
      },\
      {\
        "name": "delivery",\
        "read_only": false\
      },\
      {\
        "name": "options",\
        "read_only": false\
      },\
      {\
        "name": "spot",\
        "read_only": false\
      }\
    ],\
    "mode": 1,\
    "ip_whitelist": [\
      "127.0.0.1",\
      "127.0.0.2"\
    ],\
    "key": "75c3264105b74693d8cb5c7f1a8e2420",\
    "created_at": 1663642892,\
    "last_access": 1663642892,\
    "update_at": 1663642892\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-api-key-of-the-sub-account) Update API key of the sub-account\
\
`PUT /sub_accounts/{user_id}/keys/{key}`\
\
_Update API key of the sub-account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| user\_id | path | integer | true | Sub-account user id |\
| key | path | string | true | The API Key of the sub-account |\
| body | body | [SubAccountKey](https://www.gate.io/docs/developers/apiv4/en/#schemasubaccountkey) | true | none |\
| » mode | body | integer(int32) | false | Mode: 1 - classic 2 - portfolio account |\
| » name | body | string | false | API key name |\
| » perms | body | array | false | none |\
| »» name | body | string | false | Permission function name (no value will be cleared) |\
| »» read\_only | body | boolean | false | read only |\
| » ip\_whitelist | body | array | false | ip white list (list will be removed if no value is passed) |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-4) Detailed descriptions\
\
**»» name**: Permission function name (no value will be cleared)\
\
- wallet: wallet\
- spot: spot/leverage\
- futures: perpetual contract\
- delivery: delivery contract\
- earn: financial management\
- custody: custody\
- options: options\
- account: account information\
- loan: loan\
- margin: leverage\
- unified: unified account\
- copy: copy\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 204 | [No Content(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Updated | None |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/sub_accounts/0/keys/string'\
query_param = ''\
body='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('PUT', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="PUT"\
url="/sub_accounts/0/keys/string"\
query_param=""\
body_param='{"mode":1,"name":"spot","perms":[{"read_only":false,"name":"options"},{"read_only":false,"name":"spot"},{"read_only":false,"name":"delivery"},{"read_only":false,"name":"wallet"},{"read_only":false,"name":"futures"}],"ip_whitelist":["127.0.0.1","127.0.0.2"]}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "mode": 1,\
  "name": "spot",\
  "perms": [\
    {\
      "read_only": false,\
      "name": "options"\
    },\
    {\
      "read_only": false,\
      "name": "spot"\
    },\
    {\
      "read_only": false,\
      "name": "delivery"\
    },\
    {\
      "read_only": false,\
      "name": "wallet"\
    },\
    {\
      "read_only": false,\
      "name": "futures"\
    }\
  ],\
  "ip_whitelist": [\
    "127.0.0.1",\
    "127.0.0.2"\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#delete-api-key-of-the-sub-account) Delete API key of the sub-account\
\
`DELETE /sub_accounts/{user_id}/keys/{key}`\
\
_Delete API key of the sub-account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| user\_id | path | integer | true | Sub-account user id |\
| key | path | string | true | The API Key of the sub-account |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 204 | [No Content(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Delete successfully | None |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/sub_accounts/0/keys/string"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "state": 1,\
  "name": "spot",\
  "user_id": 1000000,\
  "perms": [\
    {\
      "name": "futures",\
      "read_only": false\
    },\
    {\
      "name": "wallet",\
      "read_only": false\
    },\
    {\
      "name": "delivery",\
      "read_only": false\
    },\
    {\
      "name": "options",\
      "read_only": false\
    },\
    {\
      "name": "spot",\
      "read_only": false\
    }\
  ],\
  "mode": 1,\
  "ip_whitelist": [\
    "127.0.0.1",\
    "127.0.0.2"\
  ],\
  "key": "75c3264105b74693d8cb5c7f1a8e2420",\
  "created_at": 1663642892,\
  "last_access": 1663642892,\
  "update_at": 1663642892\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#lock-the-sub-account) Lock the sub-account\
\
`POST /sub_accounts/{user_id}/lock`\
\
_Lock the sub-account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| user\_id | path | integer(int64) | true | The user id of the sub-account |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 204 | [No Content(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Lock successfully | None |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#unified) Unified\
\
Unified account\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-unified-account-information) Get unified account information\
\
`GET /unified/accounts`\
\
_Get unified account information_\
\
The assets of each currency in the account will be adjusted according to their liquidity, defined by corresponding adjustment coefficients, and then uniformly converted to USD to calculate the total asset value and position value of the account.\
\
You can refer to the [Formula](https://www.gate.io/docs/developers/apiv4/en/#portfolio-account) in the documentation\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | false | Retrieve data of the specified currency |\
| sub\_uid | query | string | false | Sub account user ID |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » user\_id | integer(int64) | User ID |\
| » refresh\_time | integer(int64) | Time of the most recent refresh |\
| » locked | boolean | Whether the account is locked, valid in cross-currency margin/combined margin mode, false in other modes such as single-currency margin mode |\
| » balances | object | none |\
| »» UnifiedBalance | object | none |\
| »»» available | string | Available amount is valid in single currency margin/cross-currency margin/combined margin mode, and the calculation is different in different modes |\
| »»» freeze | string | The locked amount is valid in single currency margin/cross-currency margin/combined margin mode |\
| »»» borrowed | string | Borrow limit, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »»» negative\_liab | string | Negative balance loan is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode |\
| »»» futures\_pos\_liab | string | Contract opening position borrowing currency (abandoned, to be offline field) |\
| »»» equity | string | Equity, valid in single currency margin/cross currency margin/combined margin mode |\
| »»» total\_freeze | string | Total occupancy (discarded, to be offline field) |\
| »»» total\_liab | string | Total borrowing, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »»» spot\_in\_use | string | The amount of spot hedging is valid in the combined margin mode, and is 0 in other margin modes such as single currency and cross-currency margin modes |\
| »»» funding | string | Uniloan financial management amount, effective when Uniloan financial management is turned on as a unified account margin switch |\
| »»» funding\_version | string | Funding version |\
| »»» cross\_balance | string | Full margin balance is valid in single currency margin mode, and is 0 in other modes such as cross currency margin/combined margin mode |\
| »»» iso\_balance | string | Isolated margin balance is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |\
| »»» im | string | Full-position initial margin is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |\
| »»» mm | string | The full position maintains margin, which is valid in the single currency margin mode, and other cross-currency margin combination margin mode is 0. |\
| »»» imr | string | Full-position initial margin rate is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |\
| »»» mmr | string | Full-position maintenance margin rate is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |\
| »»» margin\_balance | string | Full margin balance is valid in single currency margin mode and is 0 in other modes such as cross currency margin/combined margin mode |\
| »»» available\_margin | string | Full margin available for full position is valid in single currency margin mode, and is 0 in other modes such as cross-currency margin/combined margin mode |\
| »» total | string | Total account assets converted to USD, i.e. the sum of `(available + freeze) * price` in all currencies (deprecated, to be deprecated, replaced by unified\_account\_total) |\
| »» borrowed | string | The total borrowed amount of the account converted into USD, i.e. the sum of `borrowed * price` of all currencies (excluding Point Cards). It is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode. |\
| »» total\_initial\_margin | string | Total initial margin, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »» total\_margin\_balance | string | Total margin balance, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »» total\_maintenance\_margin | string | Total maintenance margin is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode |\
| »» total\_initial\_margin\_rate | string | Total initial margin rate, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »» total\_maintenance\_margin\_rate | string | Total maintenance margin rate, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »» total\_available\_margin | string | Available margin amount, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »» unified\_account\_total | string | Unify the total account assets, valid in single currency margin/cross-currency margin/combined margin mode |\
| »» unified\_account\_total\_liab | string | Unify the total loan of the account, valid in the cross-currency margin/combined margin mode, and 0 in other modes such as single-currency margin mode |\
| »» unified\_account\_total\_equity | string | Unify the total account equity, valid in single currency margin/cross-currency margin/combined margin mode |\
| »» leverage | string | Actual leverage, valid in cross-currency margin/combined margin mode |\
| »» spot\_order\_loss | string | Total pending order loss, in USDT, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |\
| »» spot\_hedge | boolean | Spot hedging status, true - enabled, false - not enabled. |\
| »» use\_funding | boolean | Whether to use funds as margin |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/unified/accounts"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user_id": 10001,\
  "locked": false,\
  "balances": {\
    "ETH": {\
      "available": "0",\
      "freeze": "0",\
      "borrowed": "0.075393666654",\
      "negative_liab": "0",\
      "futures_pos_liab": "0",\
      "equity": "1016.1",\
      "total_freeze": "0",\
      "total_liab": "0",\
      "spot_in_use": "1.111"\
    },\
    "POINT": {\
      "available": "9999999999.017023138734",\
      "freeze": "0",\
      "borrowed": "0",\
      "negative_liab": "0",\
      "futures_pos_liab": "0",\
      "equity": "12016.1",\
      "total_freeze": "0",\
      "total_liab": "0",\
      "spot_in_use": "12"\
    },\
    "USDT": {\
      "available": "0.00000062023",\
      "freeze": "0",\
      "borrowed": "0",\
      "negative_liab": "0",\
      "futures_pos_liab": "0",\
      "equity": "16.1",\
      "total_freeze": "0",\
      "total_liab": "0",\
      "spot_in_use": "12"\
    }\
  },\
  "total": "230.94621713",\
  "borrowed": "161.66395521",\
  "total_initial_margin": "1025.0524665088",\
  "total_margin_balance": "3382495.944473949183",\
  "total_maintenance_margin": "205.01049330176",\
  "total_initial_margin_rate": "3299.827135672679",\
  "total_maintenance_margin_rate": "16499.135678363399",\
  "total_available_margin": "3381470.892007440383",\
  "unified_account_total": "3381470.892007440383",\
  "unified_account_total_liab": "0",\
  "unified_account_total_equity": "100016.1",\
  "leverage": "2",\
  "spot_order_loss": "12",\
  "spot_hedge": false\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-about-the-maximum-borrowing-for-the-unified-account) Query about the maximum borrowing for the unified account\
\
`GET /unified/borrowable`\
\
_Query about the maximum borrowing for the unified account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | true | Retrieve data of the specified currency |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_UnifiedBorrowable_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » currency | string | Currency detail |\
| » amount | string | Max borrowable amount |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/unified/risk_units"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user_id": 0,\
  "spot_hedge": true,\
  "risk_units": [\
    {\
      "symbol": "BTC",\
      "spot_in_use": "-13500.000001223",\
      "maintain_margin": "2334.002",\
      "initial_margin": "2334.002",\
      "delta": "0.22",\
      "gamma": "0.42",\
      "theta": "0.29",\
      "vega": "0.22"\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#set-mode-of-the-unified-account) Set mode of the unified account\
\
`PUT /unified/unified_mode`\
\
_Set mode of the unified account_\
\
Switching each account mode only requires passing the parameters of the corresponding account mode, and supports turning on or off the configuration switch in the corresponding account mode when switching the account mode\
\
- When opening the classic account mode, mode=classic\
\
```\
 PUT /unified/unified_mode\
 {\
 "mode": "classic"\
 }\
\
```\
\
- Open the cross-currency margin mode, mode=multi\_currency\
\
```\
 PUT /unified/unified_mode\
 {\
 "mode": "multi_currency",\
 "settings": {\
 "usdt_futures": true\
 }\
 }\
\
```\
\
- When the portfolio margin mode is enabled, mode=portfolio\
\
```\
 PUT /unified/unified_mode\
 {\
 "mode": "portfolio",\
 "settings": {\
 "spot_hedge": true\
 }\
 }\
\
```\
\
- When opening a single currency margin mode, mode=single\_currency\
\
```\
 PUT /unified/unified_mode\
 {\
 "mode": "single_currency"\
 }\
\
```\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » mode | body | string | true | Unified account mode: |\
| » settings | body | object | false | none |\
| »» usdt\_futures | body | boolean | false | USDT contract switch. In cross-currency margin mode, it can only be turned on and not off |\
| »» spot\_hedge | body | boolean | false | Spot hedging switch. |\
| »» use\_funding | body | boolean | false | switch, when the mode is cross-currency margin mode, whether to use Uniloan financial funds as margin |\
| »» options | body | boolean | false | Option switch. In cross-currency margin mode, it can only be turned on and not off |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-5) Detailed descriptions\
\
**» mode**: Unified account mode:\
\
- `classic`: Classic account mode\
- `multi_currency`: Multi-currency margin mode\
- `portfolio`: Portfolio margin mode\
- `single_currency`: Single Currency Margin Model\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 204 | [No Content(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Success | None |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/unified/unified_mode'\
query_param = ''\
body='{"mode":"portfolio","settings":{"spot_hedge":true,"usdt_futures":true,"options":true}}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('PUT', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="PUT"\
url="/unified/unified_mode"\
query_param=""\
body_param='{"mode":"portfolio","settings":{"spot_hedge":true,"usdt_futures":true,"options":true}}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "mode": "portfolio",\
  "settings": {\
    "spot_hedge": true,\
    "usdt_futures": true,\
    "options": true\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-mode-of-the-unified-account) Query mode of the unified account\
\
`GET /unified/unified_mode`\
\
_Query mode of the unified account_\
\
Unified account mode:\
\
- `classic`: Classic account mode\
- `multi_currency`: Cross-currency margin mode\
- `portfolio`: Portfolio margin mode\
- `single_currency`: Single-currency margin mode\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » mode | string | Unified account mode: <br>\- `classic`: Classic account mode<br>\- `multi_currency`: Multi-currency margin mode<br>\- `portfolio`: Portfolio margin mode<br>\- `single_currency`: Single Currency Margin Model |\
| » settings | object | none |\
| »» usdt\_futures | boolean | USDT contract switch. In cross-currency margin mode, it can only be turned on and not off |\
| »» spot\_hedge | boolean | Spot hedging switch. |\
| »» use\_funding | boolean | switch, when the mode is cross-currency margin mode, whether to use Uniloan financial funds as margin |\
| »» options | boolean | Option switch. In cross-currency margin mode, it can only be turned on and not off |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/unified/unified_mode"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "mode": "portfolio",\
  "settings": {\
    "spot_hedge": true,\
    "usdt_futures": true,\
    "options": true\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-unified-estimate-rate) Get unified estimate rate\
\
`GET /unified/estimate_rate`\
\
_Get unified estimate rate_\
\
Due to fluctuations in lending depth, hourly interest rates may vary, and thus, I cannot provide exact rates. When a currency is not supported, the interest rate returned will be an empty string.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currencies | query | array\[string\] | true | Specify the currency names for querying in an array, separated by commas, with a maximum of 10 currencies. |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_Estimate the current hourly lending rates, categorized by currency_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » **additionalProperties** | string | none |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/unified/loan_margin_tiers'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/unified/loan_margin_tiers \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "currency": "USDT",\
    "margin_tiers": [\
      {\
        "tier": "1",\
        "margin_rate": "0.02",\
        "lower_limit": "200000",\
        "upper_limit": "400000",\
        "leverage": "3"\
      }\
    ]\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#portfolio-margin-calculator) Portfolio margin calculator\
\
`POST /unified/portfolio_calculator`\
\
_Portfolio margin calculator_\
\
Portfolio Margin Calculator\
When inputting a simulated position portfolio, each position includes the position name and quantity held, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets.\
When inputting simulated orders, each order includes the market identifier, order price, and order quantity, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. Market orders are not included.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » spot\_balances | body | array | false | Spot |\
| »» _None_ | body | object | false | Spot |\
| »»» currency | body | string | true | Currency name |\
| »»» equity | body | string | true | Currency equity, where equity = balance - borrowed, represents the net delta exposure |\
| »» spot\_orders | body | array | false | Spot orders |\
| »»» _None_ | body | object | false | Spot orders |\
| »»»» currency\_pairs | body | string | true | Currency pair |\
| »»»» order\_price | body | string | true | Price |\
| »»»» count | body | string | false | Initial order quantity for spot trading pairs, not involved in actual calculation. |\
| »»»» left | body | string | true | Unfilled quantity, involved in actual calculation. |\
| »»»» type | body | string | true | Order type, sell - sell order, buy - buy order. |\
| »»» futures\_positions | body | array | false | Futures positions |\
| »»»» _None_ | body | object | false | Futures positions |\
| »»»»» contract | body | string | true | Futures name, currently only supports perpetual futures for BTC and ETH with USDT. |\
| »»»»» size | body | string | true | Position size, measured in contract units. |\
| »»»» futures\_orders | body | array | false | Futures order |\
| »»»»» _None_ | body | object | false | Futures order |\
| »»»»»» contract | body | string | true | Futures name, currently only supports perpetual futures for BTC and ETH with USDT. |\
| »»»»»» size | body | string | true | Futures quantity, representing the initial order quantity, not involved in actual settlement. |\
| »»»»»» left | body | string | true | Unfilled contract quantity, involved in actual calculation |\
| »»»»» options\_positions | body | array | false | Options positions |\
| »»»»»» _None_ | body | object | false | Options positions |\
| »»»»»»» options\_name | body | string | true | Option name, currently only supports options for BTC and ETH with USDT. |\
| »»»»»»» size | body | string | true | Position size, measured in contract units. |\
| »»»»»» options\_orders | body | array | false | Option orders |\
| »»»»»»» _None_ | body | object | false | Option orders |\
| »»»»»»»» options\_name | body | string | true | Option name, currently only supports options for BTC and ETH with USDT. |\
| »»»»»»»» size | body | string | true | Initial order quantity, not involved in actual calculation |\
| »»»»»»»» left | body | string | true | Unfilled contract quantity, involved in actual calculation |\
| »»»»»»» spot\_hedge | body | boolean | false | Whether to enable spot hedging. |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-6) Detailed descriptions\
\
**»»» equity**: Currency equity, where equity = balance - borrowed, represents the net delta exposure\
of your spot positions, which can be negative. Currently only supports three currencies: BTC, ETH.\
\
**»»»» count**: Initial order quantity for spot trading pairs, not involved in actual calculation.\
Currently only supports three currencies: BTC, ETH.\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_The output of the portfolio margin calculator._\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » maintain\_margin\_total | string | Total maintenance margin, including only the portfolio margin calculation results for positions in the risk unit,<br> excluding borrowed margin. If borrowing exists, conventional borrowing margin requirements will still apply. |\
| » initial\_margin\_total | string | Total initial margin, calculated as the maximum of the following three combinations: position,<br> position + positive delta orders, position + negative delta orders. |\
| » calculate\_time | integer(int64) | Calculate time |\
| » risk\_unit | array | Risk unit |\
| »» _None_ | object | Risk unit |\
| »»» symbol | string | Risk unit name |\
| »»» spot\_in\_use | string | Spot usage |\
| »»» maintain\_margin | string | Maintenance margin |\
| »»» initial\_margin | string | Initial margin |\
| »»» margin\_result | array | Margin result |\
| »»»» _None_ | object | Margin result |\
| »»»»» type | string | Position combination type<br>`original_position` \- Original position<br>`long_delta_original_position` \- Positive delta + Original position<br>`short_delta_original_position` \- Negative delta + Original position |\
| »»»»» profit\_loss\_ranges | array | The results of 33 pressure scenarios for MR1 |\
| »»»»»» _None_ | object | Profit and loss range |\
| »»»»»»» price\_percentage | string | Percentage change in price |\
| »»»»»»» implied\_volatility\_percentage | string | Percentage change in implied volatility |\
| »»»»»»» profit\_loss | string | PNL |\
| »»»»»» max\_loss | object | Profit and loss range |\
| »»»»»»» price\_percentage | string | Percentage change in price |\
| »»»»»»» implied\_volatility\_percentage | string | Percentage change in implied volatility |\
| »»»»»»» profit\_loss | string | PNL |\
| »»»»»» mr1 | string | Stress testing |\
| »»»»»» mr2 | string | Basis spread risk |\
| »»»»»» mr3 | string | Volatility spread risk |\
| »»»»»» mr4 | string | Option short risk |\
| »»»»» delta | string | Total Delta of risk unit |\
| »»»»» gamma | string | Total Gamma of risk unit |\
| »»»»» theta | string | Total Theta of risk unit |\
| »»»»» vega | string | Total Vega of risk unit |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/unified/portfolio_calculator'\
query_param = ''\
body='{"spot_balances":[{"currency":"BTC","equity":"-1","freeze":"10"}],"spot_orders":[{"currency_pairs":"BTC_USDT","order_price":"344","size":"100","left":"100","type":"sell"}],"futures_positions":[{"contract":"BTC_USDT","size":"100"}],"futures_orders":[{"contract":"BTC_USDT","size":"10","left":"8"}],"options_positions":[{"options_name":"BTC_USDT-20240329-32000-C","size":"10"}],"options_orders":[{"options_name":"BTC_USDT-20240329-32000-C","size":"100","left":"80"}],"spot_hedge":false}'\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
\
curl -X POST https://api.gateio.ws/api/v4/unified/portfolio_calculator \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json'\
\
```\
\
> Body parameter\
\
```\
{\
  "spot_balances": [\
    {\
      "currency": "BTC",\
      "equity": "-1",\
      "freeze": "10"\
    }\
  ],\
  "spot_orders": [\
    {\
      "currency_pairs": "BTC_USDT",\
      "order_price": "344",\
      "size": "100",\
      "left": "100",\
      "type": "sell"\
    }\
  ],\
  "futures_positions": [\
    {\
      "contract": "BTC_USDT",\
      "size": "100"\
    }\
  ],\
  "futures_orders": [\
    {\
      "contract": "BTC_USDT",\
      "size": "10",\
      "left": "8"\
    }\
  ],\
  "options_positions": [\
    {\
      "options_name": "BTC_USDT-20240329-32000-C",\
      "size": "10"\
    }\
  ],\
  "options_orders": [\
    {\
      "options_name": "BTC_USDT-20240329-32000-C",\
      "size": "100",\
      "left": "80"\
    }\
  ],\
  "spot_hedge": false\
}\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "maintain_margin_total": "0.000000000000",\
  "initial_margin_total": "0.000000000000",\
  "calculate_time": "1709014486",\
  "risk_unit": [\
    {\
      "symbol": "BTC",\
      "margin_result": [\
        {\
          "type": "original_position",\
          "profit_loss_ranges": [\
            {\
              "price_percentage": "-0.200000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "-0.160000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "-0.120000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "-0.080000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "-0.040000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "0.000000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "0.040000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "0.080000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "0.120000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "0.160000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            },\
            {\
              "price_percentage": "0.200000000000",\
              "implied_volatility_percentage": "-0.300000000000",\
              "profit_loss": "0.000000000000"\
            }\
          ],\
          "max_loss": {\
            "price_percentage": "-0.200000000000",\
            "implied_volatility_percentage": "-0.300000000000",\
            "profit_loss": "0.000000000000"\
          },\
          "mr1": "0.000000000000",\
          "mr2": "0.000000000000",\
          "mr3": "0.000000000000",\
          "mr4": "0.000000000000"\
        }\
      ],\
      "maintain_margin": "0.000000000000",\
      "initial_margin": "0.000000000000"\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#minimum-currency-leverage-that-can-be-set) Minimum currency leverage that can be set\
\
`GET /unified/leverage/user_currency_config`\
\
_Minimum currency leverage that can be set_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | true | Currency |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » current\_leverage | string | Current leverage ratio |\
| » min\_leverage | string | Minimum adjustable leverage ratio |\
| » max\_leverage | string | Maximum adjustable leverage ratio |\
| » debit | string | Current liabilities |\
| » available\_margin | string | Available Margin |\
| » borrowable | string | The current leverage you can choose is |\
| » except\_leverage\_borrowable | string | The maximum amount of margin that can be borrowed and the maximum amount of Uniloan that can be borrowed, whichever is smaller |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/margin/cross/currencies/BTC'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/margin/cross/currencies/BTC \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "name": "BTC",\
  "rate": "0.0002",\
  "prec": "0.000001",\
  "discount": "1",\
  "min_borrow_amount": "0.01",\
  "user_max_borrow_amount": "1000000",\
  "total_max_borrow_amount": "10000000",\
  "price": "63015.5214",\
  "loanable": true,\
  "status": 1\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-cross-margin-account-deprecated) Retrieve cross margin account. (deprecated)\
\
`GET /margin/cross/accounts`\
\
_Retrieve cross margin account. (deprecated)_\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » user\_id | integer(int64) | User ID |\
| » refresh\_time | integer(int64) | Time of the most recent refresh |\
| » locked | boolean | Whether account is locked |\
| » balances | object | none |\
| »» CrossMarginBalance | object | none |\
| »»» available | string | Available amount |\
| »»» freeze | string | Locked amount |\
| »»» borrowed | string | Borrowed amount |\
| »»» interest | string | Unpaid interests |\
| »»» negative\_liab | string | Negative Liabilities. Formula:Min\[available+total+unrealized\_pnl,0\] |\
| »»» futures\_pos\_liab | string | Borrowing to Open Positions in Futures |\
| »»» equity | string | Equity. Formula: available + freeze - borrowed + futures account's total + unrealized\_pnl |\
| »»» total\_freeze | string | Total freeze. Formula: freeze + position\_initial\_margin + order\_margin |\
| »»» total\_liab | string | Total liabilities. Formula: Max\[Abs\[Min\[quity - total\_freeze,0\], borrowed\]\] - futures\_pos\_liab |\
| »» total | string | Total account value in USDT, i.e., the sum of all currencies' `(available+freeze)*price*discount` |\
| »» borrowed | string | Total borrowed value in USDT, i.e., the sum of all currencies' `borrowed*price*discount` |\
| »» interest | string | Total unpaid interests in USDT, i.e., the sum of all currencies' `interest*price*discount` |\
| »» risk | string | Risk rate. When it belows 110%, liquidation will be triggered. Calculation formula: `total / (borrowed+interest)` |\
| »» total\_initial\_margin | string | Total initial margin |\
| »» total\_margin\_balance | string | Total Margin Balance (∑(positive equity ＊ index price \* discount) + ∑(negative equity \* index price)) |\
| »» total\_maintenance\_margin | string | Total maintenance margin |\
| »» total\_initial\_margin\_rate | string | Total initial margin rate |\
| »» total\_maintenance\_margin\_rate | string | Total maintenance margin rate |\
| »» total\_available\_margin | string | Total available margin |\
| »» portfolio\_margin\_total | string | Total amount of the portfolio margin account |\
| »» portfolio\_margin\_total\_liab | string | Total liabilities of the portfolio margin account |\
| »» portfolio\_margin\_total\_equity | string | Total equity of the portfolio margin account |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/margin/cross/accounts"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user_id": 10001,\
  "locked": false,\
  "balances": {\
    "ETH": {\
      "available": "0",\
      "freeze": "0",\
      "borrowed": "0.075393666654",\
      "interest": "0.0000106807603333",\
      "negative_liab": "0",\
      "futures_pos_liab": "0",\
      "equity": "1016.1",\
      "total_freeze": "0",\
      "total_liab": "0"\
    },\
    "POINT": {\
      "available": "9999999999.017023138734",\
      "freeze": "0",\
      "borrowed": "0",\
      "interest": "0",\
      "negative_liab": "0",\
      "futures_pos_liab": "0",\
      "equity": "12016.1",\
      "total_freeze": "0",\
      "total_liab": "0"\
    },\
    "USDT": {\
      "available": "0.00000062023",\
      "freeze": "0",\
      "borrowed": "0",\
      "interest": "0",\
      "negative_liab": "0",\
      "futures_pos_liab": "0",\
      "equity": "16.1",\
      "total_freeze": "0",\
      "total_liab": "0"\
    }\
  },\
  "total": "230.94621713",\
  "borrowed": "161.66395521",\
  "interest": "0.02290237",\
  "risk": "1.4284",\
  "total_initial_margin": "1025.0524665088",\
  "total_margin_balance": "3382495.944473949183",\
  "total_maintenance_margin": "205.01049330176",\
  "total_initial_margin_rate": "3299.827135672679",\
  "total_maintenance_margin_rate": "16499.135678363399",\
  "total_available_margin": "3381470.892007440383",\
  "portfolio_margin_total": "3381470.892007440383",\
  "portfolio_margin_total_liab": "0",\
  "portfolio_margin_total_equity": "100016.1"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-cross-margin-account-change-history-deprecated) Retrieve cross margin account change history. (deprecated)\
\
`GET /margin/cross/account_book`\
\
_Retrieve cross margin account change history. (deprecated)_\
\
The record query time range is not allowed to exceed 30 days.\
\
When using the limit&page paging function to retrieve data, the maximum number of pages is 100,000, that is, (limit page - 1) <= 100000.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | false | Filter by currency |\
| from | query | integer(int64) | false | Start timestamp of the query |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
| page | query | integer(int32) | false | Page number |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| type | query | string | false | Only retrieve changes of the specified type. All types will be returned if not specified. |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | string | Balance change record ID |\
| » time | integer(int64) | The timestamp of the change (in milliseconds) |\
| » currency | string | Currency changed |\
| » change | string | Amount changed. Positive value means transferring in, while negative out |\
| » balance | string | Balance after change |\
| » type | string | Account book type. Please refer to [account book type](https://www.gate.io/docs/developers/apiv4/en/#accountbook-type) for more detail |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures) Futures\
\
Futures contract API\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-all-futures-contracts) List all futures contracts\
\
`GET /futures/{settle}/contracts`\
\
_List all futures contracts_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-25) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [Contract](https://www.gate.io/docs/developers/apiv4/en/#schemacontract)\] |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/contracts'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/contracts \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "name": "BTC_USDT",\
    "type": "direct",\
    "quanto_multiplier": "0.0001",\
    "ref_discount_rate": "0",\
    "order_price_deviate": "0.5",\
    "maintenance_rate": "0.005",\
    "mark_type": "index",\
    "last_price": "38026",\
    "mark_price": "37985.6",\
    "index_price": "37954.92",\
    "funding_rate_indicative": "0.000219",\
    "mark_price_round": "0.01",\
    "funding_offset": 0,\
    "in_delisting": false,\
    "risk_limit_base": "1000000",\
    "interest_rate": "0.0003",\
    "order_price_round": "0.1",\
    "order_size_min": 1,\
    "ref_rebate_rate": "0.2",\
    "funding_interval": 28800,\
    "risk_limit_step": "1000000",\
    "leverage_min": "1",\
    "leverage_max": "100",\
    "risk_limit_max": "8000000",\
    "maker_fee_rate": "-0.00025",\
    "taker_fee_rate": "0.00075",\
    "funding_rate": "0.002053",\
    "order_size_max": 1000000,\
    "funding_next_apply": 1610035200,\
    "short_users": 977,\
    "config_change_time": 1609899548,\
    "trade_size": 28530850594,\
    "position_size": 5223816,\
    "long_users": 455,\
    "funding_impact_value": "60000",\
    "orders_limit": 50,\
    "trade_id": 10851092,\
    "orderbook_id": 2129638396,\
    "enable_bonus": true,\
    "enable_credit": true,\
    "create_time": 1669688556,\
    "funding_cap_ratio": "0.75"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-a-single-contract) Get a single contract\
\
`GET /futures/{settle}/contracts/{contract}`\
\
_Get a single contract_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-26) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Contract information | [Contract](https://www.gate.io/docs/developers/apiv4/en/#schemacontract) |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/contracts/BTC_USDT'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/contracts/BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "name": "BTC_USDT",\
  "type": "direct",\
  "quanto_multiplier": "0.0001",\
  "ref_discount_rate": "0",\
  "order_price_deviate": "0.5",\
  "maintenance_rate": "0.005",\
  "mark_type": "index",\
  "last_price": "38026",\
  "mark_price": "37985.6",\
  "index_price": "37954.92",\
  "funding_rate_indicative": "0.000219",\
  "mark_price_round": "0.01",\
  "funding_offset": 0,\
  "in_delisting": false,\
  "risk_limit_base": "1000000",\
  "interest_rate": "0.0003",\
  "order_price_round": "0.1",\
  "order_size_min": 1,\
  "ref_rebate_rate": "0.2",\
  "funding_interval": 28800,\
  "risk_limit_step": "1000000",\
  "leverage_min": "1",\
  "leverage_max": "100",\
  "risk_limit_max": "8000000",\
  "maker_fee_rate": "-0.00025",\
  "taker_fee_rate": "0.00075",\
  "funding_rate": "0.002053",\
  "order_size_max": 1000000,\
  "funding_next_apply": 1610035200,\
  "short_users": 977,\
  "config_change_time": 1609899548,\
  "trade_size": 28530850594,\
  "position_size": 5223816,\
  "long_users": 455,\
  "funding_impact_value": "60000",\
  "orders_limit": 50,\
  "trade_id": 10851092,\
  "orderbook_id": 2129638396,\
  "enable_bonus": true,\
  "enable_credit": true,\
  "create_time": 1669688556,\
  "funding_cap_ratio": "0.75"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-order-book) Futures order book\
\
`GET /futures/{settle}/order_book`\
\
_Futures order book_\
\
Bids will be sorted by price from high to low, while asks sorted reversely\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |\
| limit | query | integer | false | Maximum number of order depth data in asks or bids |\
| with\_id | query | boolean | false | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-27) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order book retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set `with_id=true` to include this field in response |\
| » current | number(double) | Response data generation timestamp |\
| » update | number(double) | Order book changed timestamp |\
| » asks | array | Asks order depth |\
| »» futures\_order\_book\_item | object | none |\
| »»» p | string | Price (quote currency) |\
| »»» s | integer(int64) | Size |\
| »» bids | array | Bids order depth |\
| »»» futures\_order\_book\_item | object | none |\
| »»»» p | string | Price (quote currency) |\
| »»»» s | integer(int64) | Size |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/order_book'\
query_param = 'contract=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/order_book?contract=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 123456,\
  "current": 1623898993.123,\
  "update": 1623898993.121,\
  "asks": [\
    {\
      "p": "1.52",\
      "s": 100\
    },\
    {\
      "p": "1.53",\
      "s": 40\
    }\
  ],\
  "bids": [\
    {\
      "p": "1.17",\
      "s": 150\
    },\
    {\
      "p": "1.16",\
      "s": 203\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-trading-history) Futures trading history\
\
`GET /futures/{settle}/trades`\
\
_Futures trading history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| last\_id | query | string | false | Specify the starting point for this list based on a previously retrieved id |\
| from | query | integer(int64) | false | Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items. |\
| to | query | integer(int64) | false | Specify end time in Unix seconds, default to current time |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-20) Detailed descriptions\
\
**last\_id**: Specify the starting point for this list based on a previously retrieved id\
\
This parameter is deprecated. Use `from` and `to` instead to limit time range\
\
**from**: Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items.\
If items between `from` and `to` are more than `limit`, only `limit` number will be returned.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-28) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » id | integer(int64) | Trade ID |\
| » create\_time | number(double) | Trading time |\
| » create\_time\_ms | number(double) | Trading time, with milliseconds set to 3 decimal places. |\
| » contract | string | Futures contract |\
| » size | integer(int64) | Trading size |\
| » price | string | Trading price (quote currency) |\
| » is\_internal | boolean | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/trades'\
query_param = 'contract=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/trades?contract=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 121234231,\
    "create_time": 1514764800,\
    "contract": "BTC_USDT",\
    "size": -100,\
    "price": "100.123"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-futures-candlesticks) Get futures candlesticks\
\
`GET /futures/{settle}/candlesticks`\
\
_Get futures candlesticks_\
\
Return specified contract candlesticks.\
If prefix `contract` with `mark_`, the contract's mark price candlesticks are returned;\
if prefix with `index_`, index price candlesticks will be returned.\
\
Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying `from`, `to` and `interval`\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to `to - 100 * interval` if not specified |\
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |\
| limit | query | integer | false | Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |\
| interval | query | string | false | Interval time between data points. Note that `1w` means natual week(Mon-Sun), while `7d` means every 7d since unix 0. Note that 30d means 1 natual month, not 30 days |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-29) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | \[data point in every timestamp\] |\
| » _None_ | object | data point in every timestamp |\
| »» t | number(double) | Unix timestamp in seconds |\
| »» v | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed |\
| »» c | string | Close price (quote currency) |\
| »» h | string | Highest price (quote currency) |\
| »» l | string | Lowest price (quote currency) |\
| »» o | string | Open price (quote currency) |\
| »» sum | string | Trading volume (unit: Quote currency) |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/candlesticks'\
query_param = 'contract=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/candlesticks?contract=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1539852480,\
    "v": 97151,\
    "c": "1.032",\
    "h": "1.032",\
    "l": "1.032",\
    "o": "1.032",\
    "sum": "3580"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#premium-index-k-line) Premium Index K-Line\
\
`GET /futures/{settle}/premium_index`\
\
_Premium Index K-Line_\
\
Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to `to - 100 * interval` if not specified |\
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |\
| limit | query | integer | false | Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |\
| interval | query | string | false | Interval time between data points |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-30) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » _None_ | object | data point in every timestamp |\
| »» t | number(double) | Unix timestamp in seconds |\
| »» c | string | Close price |\
| »» h | string | Highest price |\
| »» l | string | Lowest price\` |\
| »» o | string | Open price |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/premium_index'\
query_param = 'contract=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/premium_index?contract=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1539852480,\
    "c": "0",\
    "h": "0.00023",\
    "l": "0",\
    "o": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-futures-tickers) List futures tickers\
\
`GET /futures/{settle}/tickers`\
\
_List futures tickers_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-31) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » contract | string | Futures contract |\
| » last | string | Last trading price |\
| » change\_percentage | string | Change percentage. |\
| » total\_size | string | Contract total size |\
| » low\_24h | string | Lowest trading price in recent 24h |\
| » high\_24h | string | Highest trading price in recent 24h |\
| » volume\_24h | string | Trade size in recent 24h |\
| » volume\_24h\_btc | string | Trade volumes in recent 24h in BTC(deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead) |\
| » volume\_24h\_usd | string | Trade volumes in recent 24h in USD(deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead) |\
| » volume\_24h\_base | string | Trade volume in recent 24h, in base currency |\
| » volume\_24h\_quote | string | Trade volume in recent 24h, in quote currency |\
| » volume\_24h\_settle | string | Trade volume in recent 24h, in settle currency |\
| » mark\_price | string | Recent mark price |\
| » funding\_rate | string | Funding rate |\
| » funding\_rate\_indicative | string | Indicative Funding rate in next period. (deprecated. use `funding_rate`) |\
| » index\_price | string | Index price |\
| » quanto\_base\_rate | string | Exchange rate of base currency and settlement currency in Quanto contract. Does not exists in contracts of other types |\
| » basis\_rate | string | Basis rate |\
| » basis\_value | string | Basis value |\
| » lowest\_ask | string | Recent lowest ask |\
| » lowest\_size | string | The latest seller's lowest price order quantity |\
| » highest\_bid | string | Recent highest bid |\
| » highest\_size | string | The latest buyer's highest price order volume |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/tickers'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/tickers \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "contract": "BTC_USDT",\
    "last": "6432",\
    "low_24h": "6278",\
    "high_24h": "6790",\
    "change_percentage": "4.43",\
    "total_size": "32323904",\
    "volume_24h": "184040233284",\
    "volume_24h_btc": "28613220",\
    "volume_24h_usd": "184040233284",\
    "volume_24h_base": "28613220",\
    "volume_24h_quote": "184040233284",\
    "volume_24h_settle": "28613220",\
    "mark_price": "6534",\
    "funding_rate": "0.0001",\
    "funding_rate_indicative": "0.0001",\
    "index_price": "6531",\
    "highest_bid": "34089.7",\
    "highest_size": "100",\
    "lowest_ask": "34217.9",\
    "lowest_size": "1000"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#funding-rate-history) Funding rate history\
\
`GET /futures/{settle}/funding_rate`\
\
_Funding rate history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-32) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | History retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » t | integer(int64) | Unix timestamp in seconds |\
| » r | string | Funding rate |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/funding_rate'\
query_param = 'contract=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/funding_rate?contract=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1543968000,\
    "r": "0.000157"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-insurance-balance-history) Futures insurance balance history\
\
`GET /futures/{settle}/insurance`\
\
_Futures insurance balance history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-33) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » t | integer(int64) | Unix timestamp in seconds |\
| » b | string | Insurance balance |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/insurance'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/insurance \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1543968000,\
    "b": "83.0031"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-stats) Futures stats\
\
`GET /futures/{settle}/contract_stats`\
\
_Futures stats_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| from | query | integer(int64) | false | Start timestamp |\
| interval | query | string | false | none |\
| limit | query | integer | false | none |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-34) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » time | integer(int64) | Stat timestamp |\
| » lsr\_taker | number | Long/short account number ratio |\
| » lsr\_account | number | Long/short taker size ratio |\
| » long\_liq\_size | integer(int64) | Long liquidation size |\
| » long\_liq\_amount | number(double) | Long liquidation amount(base currency) |\
| » long\_liq\_usd | number(double) | Long liquidation volume(quote currency) |\
| » short\_liq\_size | integer(int64) | Short liquidation size |\
| » short\_liq\_amount | number(double) | Short liquidation amount(base currency) |\
| » short\_liq\_usd | number(double) | Short liquidation volume(quote currency) |\
| » open\_interest | integer(int64) | Open interest size |\
| » open\_interest\_usd | number(double) | Open interest volume(quote currency) |\
| » top\_lsr\_account | number(double) | Top trader long/short account ratio |\
| » top\_lsr\_size | number(double) | Top trader long/short position ratio |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/contract_stats'\
query_param = 'contract=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/contract_stats?contract=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1603865400,\
    "lsr_taker": 100,\
    "lsr_account": 0.5,\
    "long_liq_size": 0,\
    "short_liq_size": 0,\
    "open_interest": 124724,\
    "short_liq_usd": 0,\
    "mark_price": "8865",\
    "top_lsr_size": 1.02,\
    "short_liq_amount": 0,\
    "long_liq_amount": 0,\
    "open_interest_usd": 1511,\
    "top_lsr_account": 1.5,\
    "long_liq_usd": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-index-constituents) Get index constituents\
\
`GET /futures/{settle}/index_constituents/{index}`\
\
_Get index constituents_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| index | path | string | true | Index name |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-35) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » index | string | Index name |\
| » constituents | array | Constituents |\
| »» IndexConstituent | object | none |\
| »»» exchange | string | Exchange |\
| »»» symbols | array | Symbol list |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/index_constituents/BTC_USDT'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/index_constituents/BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "index": "BTC_USDT",\
  "constituents": [\
    {\
      "exchange": "Binance",\
      "symbols": [\
        "BTC_USDT"\
      ]\
    },\
    {\
      "exchange": "Gate.io",\
      "symbols": [\
        "BTC_USDT"\
      ]\
    },\
    {\
      "exchange": "Huobi",\
      "symbols": [\
        "BTC_USDT"\
      ]\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-liquidation-history) Retrieve liquidation history\
\
`GET /futures/{settle}/liq_orders`\
\
_Retrieve liquidation history_\
\
Interval between `from` and `to` cannot exceeds 3600. Some private fields will not be returned in public endpoints. Refer to field description for detail.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-36) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » time | integer(int64) | Liquidation time |\
| » contract | string | Futures contract |\
| » size | integer(int64) | User position size |\
| » order\_size | integer(int64) | Number of forced liquidation orders |\
| » order\_price | string | Liquidation order price |\
| » fill\_price | string | Liquidation order average taker price |\
| » left | integer(int64) | System liquidation order maker size |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/liq_orders'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/liq_orders \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1548654951,\
    "contract": "BTC_USDT",\
    "size": 600,\
    "order_size": -600,\
    "order_price": "3405",\
    "fill_price": "3424",\
    "left": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-risk-limit-tiers) List risk limit tiers\
\
`GET /futures/{settle}/risk_limit_tiers`\
\
_List risk limit tiers_\
\
When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array. This only takes effect when the 'contract' parameter is empty.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-37) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | \[Retrieve risk limit configurations for different tiers under a specified contract.\] |\
| » _None_ | object | Retrieve risk limit configurations for different tiers under a specified contract. |\
| »» tier | integer(int) | Tier |\
| »» risk\_limit | string | Position risk limit |\
| »» initial\_rate | string | Initial margin rate |\
| »» maintenance\_rate | string | Maintenance margin rate |\
| »» leverage\_max | string | Maximum leverage |\
| »» contract | string | Markets, visible only during market pagination requests |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/risk_limit_tiers'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/futures/usdt/risk_limit_tiers \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "maintenance_rate": "0.01",\
    "tier": 1,\
    "initial_rate": "0.02",\
    "leverage_max": "50",\
    "risk_limit": "500000",\
    "contract": "BTC_USDT"\
  },\
  {\
    "initial_rate": "0.03",\
    "maintenance_rate": "0.02",\
    "tier": 2,\
    "risk_limit": "1000000",\
    "leverage_max": "33.33",\
    "contract": "BTC_USDT"\
  },\
  {\
    "maintenance_rate": "0.01",\
    "tier": 1,\
    "initial_rate": "0.02",\
    "leverage_max": "50",\
    "risk_limit": "500000",\
    "contract": "ETH_USDT"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-futures-account) Query futures account\
\
`GET /futures/{settle}/accounts`\
\
_Query futures account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-38) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. <br>total = SUM(history\_dnw, history\_pnl, history\_fee, history\_refr, history\_fund) |\
| » unrealised\_pnl | string | Unrealized PNL |\
| » position\_margin | string | Position margin |\
| » order\_margin | string | Order margin of unfinished orders |\
| » available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |\
| » point | string | POINT amount |\
| » currency | string | Settle currency |\
| » in\_dual\_mode | boolean | Whether dual mode is enabled |\
| » enable\_credit | boolean | Whether portfolio margin account mode is enabled |\
| » position\_initial\_margin | string | Initial margin position, applicable to the portfolio margin account model |\
| » maintenance\_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |\
| » bonus | string | Perpetual Contract Bonus |\
| » enable\_evolved\_classic | boolean | Classic account margin mode, true-new mode, false-old mode |\
| » cross\_order\_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |\
| » cross\_initial\_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |\
| » cross\_maintenance\_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |\
| » cross\_unrealised\_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |\
| » cross\_available | string | Full warehouse available amount, suitable for the new classic account margin model |\
| » isolated\_position\_margin | string | Ware -position margin, suitable for the new classic account margin model |\
| » enable\_new\_dual\_mode | boolean | Whether to open a new two-way position mode |\
| » margin\_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |\
| » history | object | Statistical data |\
| »» dnw | string | total amount of deposit and withdraw |\
| »» pnl | string | total amount of trading profit and loss |\
| »» fee | string | total amount of fee |\
| »» refr | string | total amount of referrer rebates |\
| »» fund | string | total amount of funding costs |\
| »» point\_dnw | string | total amount of point deposit and withdraw |\
| »» point\_fee | string | total amount of point fee |\
| »» point\_refr | string | total amount of referrer rebates of point fee |\
| »» bonus\_dnw | string | total amount of perpetual contract bonus transfer |\
| »» bonus\_offset | string | total amount of perpetual contract bonus deduction |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/accounts'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/accounts"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 1666,\
  "currency": "USDT",\
  "total": "9707.803567115145",\
  "unrealised_pnl": "3371.248828",\
  "position_margin": "38.712189181",\
  "order_margin": "0",\
  "available": "9669.091377934145",\
  "point": "0",\
  "bonus": "0",\
  "in_dual_mode": false,\
  "enable_evolved_classic": false,\
  "cross_initial_margin": "61855.56788525",\
  "cross_maintenance_margin": "682.04678105",\
  "cross_order_margin": "0",\
  "cross_unrealised_pnl": "1501.178222634128",\
  "cross_available": "27549.406108813951",\
  "isolated_position_margin": "0",\
  "history": {\
    "dnw": "10000",\
    "pnl": "68.3685",\
    "fee": "-1.645812875",\
    "refr": "0",\
    "fund": "-358.919120009855",\
    "point_dnw": "0",\
    "point_fee": "0",\
    "point_refr": "0",\
    "bonus_dnw": "0",\
    "bonus_offset": "0"\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-account-book-2) Query account book\
\
`GET /futures/{settle}/account_book`\
\
_Query account book_\
\
If the `contract` field is provided, it can only filter records that include this field after 2023-10-30.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
| type | query | string | false | Changing Type： |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-21) Detailed descriptions\
\
**type**: Changing Type：\
\
- dnw: Deposit & Withdraw\
- pnl: Profit & Loss by reducing position\
- fee: Trading fee\
- refr: Referrer rebate\
- fund: Funding\
- point\_dnw: POINT Deposit & Withdraw\
- point\_fee: POINT Trading fee\
- point\_refr: POINT Referrer rebate\
- bonus\_offset: bouns deduction\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-39) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » time | number(double) | Change time |\
| » change | string | Change amount |\
| » balance | string | Balance after change |\
| » type | string | Changing Type：<br>\- dnw: Deposit & Withdraw<br>\- pnl: Profit & Loss by reducing position<br>\- fee: Trading fee<br>\- refr: Referrer rebate<br>\- fund: Funding<br>\- point\_dnw: POINT Deposit & Withdraw<br>\- point\_fee: POINT Trading fee<br>\- point\_refr: POINT Referrer rebate<br>\- bonus\_offset: bouns deduction |\
| » text | string | Comment |\
| » contract | string | Futures contract, the field is only available for data after 2023-10-30. |\
| » trade\_id | string | trade id |\
| » id | string | 账户变更记录 id |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-40) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| type | dnw |\
| type | pnl |\
| type | fee |\
| type | refr |\
| type | fund |\
| type | point\_dnw |\
| type | point\_fee |\
| type | point\_refr |\
| type | bonus\_offset |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/account_book'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/account_book"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1682294400.123456,\
    "change": "0.000010152188",\
    "balance": "4.59316525194",\
    "text": "ETH_USD:6086261",\
    "type": "fee",\
    "contract": "ETH_USD",\
    "trade_id": "1",\
    "id": "1"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-all-positions-of-a-user) List all positions of a user\
\
`GET /futures/{settle}/positions`\
\
_List all positions of a user_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| holding | query | boolean | false | Return only real positions - true, return all - false. |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-41) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/positions'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/positions"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user": 10000,\
    "contract": "BTC_USDT",\
    "size": -9440,\
    "leverage": "0",\
    "risk_limit": "100",\
    "leverage_max": "100",\
    "maintenance_rate": "0.005",\
    "value": "3568.62",\
    "margin": "4.431548146258",\
    "entry_price": "3779.55",\
    "liq_price": "99999999",\
    "mark_price": "3780.32",\
    "unrealised_pnl": "-0.000507486844",\
    "realised_pnl": "0.045543982432",\
    "pnl_pnl": "0.045543982432",\
    "pnl_fund": "0",\
    "pnl_fee": "0",\
    "history_pnl": "0",\
    "last_close_pnl": "0",\
    "realised_point": "0",\
    "history_point": "0",\
    "adl_ranking": 5,\
    "pending_orders": 16,\
    "close_order": {\
      "id": 232323,\
      "price": "3779",\
      "is_liq": false\
    },\
    "mode": "single",\
    "update_time": 1684994406,\
    "update_id": 1,\
    "cross_leverage_limit": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-single-position) Get single position\
\
`GET /futures/{settle}/positions/{contract}`\
\
_Get single position_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-42) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/positions/BTC_USDT'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/positions/BTC_USDT"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-margin) Update position margin\
\
`POST /futures/{settle}/positions/{contract}/margin`\
\
_Update position margin_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| change | query | string | true | Margin change. Use positive number to increase margin, negative number otherwise. |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-43) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/positions/BTC_USDT/margin'\
query_param = 'change=0.01'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/positions/BTC_USDT/margin"\
query_param="change=0.01"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-leverage) Update position leverage\
\
`POST /futures/{settle}/positions/{contract}/leverage`\
\
_Update position leverage_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| leverage | query | string | true | New position leverage |\
| cross\_leverage\_limit | query | string | false | Cross margin leverage(valid only when `leverage` is 0) |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-44) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/positions/BTC_USDT/leverage'\
query_param = 'leverage=10'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/positions/BTC_USDT/leverage"\
query_param="leverage=10"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-risk-limit) Update position risk limit\
\
`POST /futures/{settle}/positions/{contract}/risk_limit`\
\
_Update position risk limit_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| risk\_limit | query | string | true | New Risk Limit Value |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-45) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/positions/BTC_USDT/risk_limit'\
query_param = 'risk_limit=1000000'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/positions/BTC_USDT/risk_limit"\
query_param="risk_limit=1000000"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#enable-or-disable-dual-mode) Enable or disable dual mode\
\
`POST /futures/{settle}/dual_mode`\
\
_Enable or disable dual mode_\
\
Before setting dual mode, make sure all positions are closed and no orders are open\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| dual\_mode | query | boolean | true | Whether to enable dual mode |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-46) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Updated | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. <br>total = SUM(history\_dnw, history\_pnl, history\_fee, history\_refr, history\_fund) |\
| » unrealised\_pnl | string | Unrealized PNL |\
| » position\_margin | string | Position margin |\
| » order\_margin | string | Order margin of unfinished orders |\
| » available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |\
| » point | string | POINT amount |\
| » currency | string | Settle currency |\
| » in\_dual\_mode | boolean | Whether dual mode is enabled |\
| » enable\_credit | boolean | Whether portfolio margin account mode is enabled |\
| » position\_initial\_margin | string | Initial margin position, applicable to the portfolio margin account model |\
| » maintenance\_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |\
| » bonus | string | Perpetual Contract Bonus |\
| » enable\_evolved\_classic | boolean | Classic account margin mode, true-new mode, false-old mode |\
| » cross\_order\_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |\
| » cross\_initial\_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |\
| » cross\_maintenance\_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |\
| » cross\_unrealised\_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |\
| » cross\_available | string | Full warehouse available amount, suitable for the new classic account margin model |\
| » isolated\_position\_margin | string | Ware -position margin, suitable for the new classic account margin model |\
| » enable\_new\_dual\_mode | boolean | Whether to open a new two-way position mode |\
| » margin\_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |\
| » history | object | Statistical data |\
| »» dnw | string | total amount of deposit and withdraw |\
| »» pnl | string | total amount of trading profit and loss |\
| »» fee | string | total amount of fee |\
| »» refr | string | total amount of referrer rebates |\
| »» fund | string | total amount of funding costs |\
| »» point\_dnw | string | total amount of point deposit and withdraw |\
| »» point\_fee | string | total amount of point fee |\
| »» point\_refr | string | total amount of referrer rebates of point fee |\
| »» bonus\_dnw | string | total amount of perpetual contract bonus transfer |\
| »» bonus\_offset | string | total amount of perpetual contract bonus deduction |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/dual_mode'\
query_param = 'dual_mode=true'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/dual_mode"\
query_param="dual_mode=true"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 1666,\
  "currency": "USDT",\
  "total": "9707.803567115145",\
  "unrealised_pnl": "3371.248828",\
  "position_margin": "38.712189181",\
  "order_margin": "0",\
  "available": "9669.091377934145",\
  "point": "0",\
  "bonus": "0",\
  "in_dual_mode": false,\
  "enable_evolved_classic": false,\
  "cross_initial_margin": "61855.56788525",\
  "cross_maintenance_margin": "682.04678105",\
  "cross_order_margin": "0",\
  "cross_unrealised_pnl": "1501.178222634128",\
  "cross_available": "27549.406108813951",\
  "isolated_position_margin": "0",\
  "history": {\
    "dnw": "10000",\
    "pnl": "68.3685",\
    "fee": "-1.645812875",\
    "refr": "0",\
    "fund": "-358.919120009855",\
    "point_dnw": "0",\
    "point_fee": "0",\
    "point_refr": "0",\
    "bonus_dnw": "0",\
    "bonus_offset": "0"\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#retrieve-position-detail-in-dual-mode) Retrieve position detail in dual mode\
\
`GET /futures/{settle}/dual_comp/positions/{contract}`\
\
_Retrieve position detail in dual mode_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-47) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[ [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/dual_comp/positions/BTC_USDT'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/dual_comp/positions/BTC_USDT"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user": 10000,\
    "contract": "BTC_USDT",\
    "size": -9440,\
    "leverage": "0",\
    "risk_limit": "100",\
    "leverage_max": "100",\
    "maintenance_rate": "0.005",\
    "value": "3568.62",\
    "margin": "4.431548146258",\
    "entry_price": "3779.55",\
    "liq_price": "99999999",\
    "mark_price": "3780.32",\
    "unrealised_pnl": "-0.000507486844",\
    "realised_pnl": "0.045543982432",\
    "pnl_pnl": "0.045543982432",\
    "pnl_fund": "0",\
    "pnl_fee": "0",\
    "history_pnl": "0",\
    "last_close_pnl": "0",\
    "realised_point": "0",\
    "history_point": "0",\
    "adl_ranking": 5,\
    "pending_orders": 16,\
    "close_order": {\
      "id": 232323,\
      "price": "3779",\
      "is_liq": false\
    },\
    "mode": "single",\
    "update_time": 1684994406,\
    "update_id": 1,\
    "cross_leverage_limit": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-margin-in-dual-mode) Update position margin in dual mode\
\
`POST /futures/{settle}/dual_comp/positions/{contract}/margin`\
\
_Update position margin in dual mode_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| change | query | string | true | Margin change. Use positive number to increase margin, negative number otherwise. |\
| dual\_side | query | string | true | Long or short position |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-48) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[ [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/dual_comp/positions/BTC_USDT/margin'\
query_param = 'change=0.01&dual_side=dual_long'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/dual_comp/positions/BTC_USDT/margin"\
query_param="change=0.01&dual_side=dual_long"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user": 10000,\
    "contract": "BTC_USDT",\
    "size": -9440,\
    "leverage": "0",\
    "risk_limit": "100",\
    "leverage_max": "100",\
    "maintenance_rate": "0.005",\
    "value": "3568.62",\
    "margin": "4.431548146258",\
    "entry_price": "3779.55",\
    "liq_price": "99999999",\
    "mark_price": "3780.32",\
    "unrealised_pnl": "-0.000507486844",\
    "realised_pnl": "0.045543982432",\
    "pnl_pnl": "0.045543982432",\
    "pnl_fund": "0",\
    "pnl_fee": "0",\
    "history_pnl": "0",\
    "last_close_pnl": "0",\
    "realised_point": "0",\
    "history_point": "0",\
    "adl_ranking": 5,\
    "pending_orders": 16,\
    "close_order": {\
      "id": 232323,\
      "price": "3779",\
      "is_liq": false\
    },\
    "mode": "single",\
    "update_time": 1684994406,\
    "update_id": 1,\
    "cross_leverage_limit": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-leverage-in-dual-mode) Update position leverage in dual mode\
\
`POST /futures/{settle}/dual_comp/positions/{contract}/leverage`\
\
_Update position leverage in dual mode_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| leverage | query | string | true | New position leverage |\
| cross\_leverage\_limit | query | string | false | Cross margin leverage(valid only when `leverage` is 0) |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-49) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[ [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/dual_comp/positions/BTC_USDT/leverage'\
query_param = 'leverage=10'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/dual_comp/positions/BTC_USDT/leverage"\
query_param="leverage=10"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user": 10000,\
    "contract": "BTC_USDT",\
    "size": -9440,\
    "leverage": "0",\
    "risk_limit": "100",\
    "leverage_max": "100",\
    "maintenance_rate": "0.005",\
    "value": "3568.62",\
    "margin": "4.431548146258",\
    "entry_price": "3779.55",\
    "liq_price": "99999999",\
    "mark_price": "3780.32",\
    "unrealised_pnl": "-0.000507486844",\
    "realised_pnl": "0.045543982432",\
    "pnl_pnl": "0.045543982432",\
    "pnl_fund": "0",\
    "pnl_fee": "0",\
    "history_pnl": "0",\
    "last_close_pnl": "0",\
    "realised_point": "0",\
    "history_point": "0",\
    "adl_ranking": 5,\
    "pending_orders": 16,\
    "close_order": {\
      "id": 232323,\
      "price": "3779",\
      "is_liq": false\
    },\
    "mode": "single",\
    "update_time": 1684994406,\
    "update_id": 1,\
    "cross_leverage_limit": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-risk-limit-in-dual-mode) Update position risk limit in dual mode\
\
`POST /futures/{settle}/dual_comp/positions/{contract}/risk_limit`\
\
_Update position risk limit in dual mode_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| risk\_limit | query | string | true | New Risk Limit Value |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-50) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[ [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/dual_comp/positions/BTC_USDT/risk_limit'\
query_param = 'risk_limit=1000000'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/dual_comp/positions/BTC_USDT/risk_limit"\
query_param="risk_limit=1000000"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user": 10000,\
    "contract": "BTC_USDT",\
    "size": -9440,\
    "leverage": "0",\
    "risk_limit": "100",\
    "leverage_max": "100",\
    "maintenance_rate": "0.005",\
    "value": "3568.62",\
    "margin": "4.431548146258",\
    "entry_price": "3779.55",\
    "liq_price": "99999999",\
    "mark_price": "3780.32",\
    "unrealised_pnl": "-0.000507486844",\
    "realised_pnl": "0.045543982432",\
    "pnl_pnl": "0.045543982432",\
    "pnl_fund": "0",\
    "pnl_fee": "0",\
    "history_pnl": "0",\
    "last_close_pnl": "0",\
    "realised_point": "0",\
    "history_point": "0",\
    "adl_ranking": 5,\
    "pending_orders": 16,\
    "close_order": {\
      "id": 232323,\
      "price": "3779",\
      "is_liq": false\
    },\
    "mode": "single",\
    "update_time": 1684994406,\
    "update_id": 1,\
    "cross_leverage_limit": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-a-futures-order) Create a futures order\
\
`POST /futures/{settle}/orders`\
\
_Create a futures order_\
\
- Creating futures orders requires `size`, which is number of contracts instead of currency amount. You can use `quanto_multiplier` in contract detail response to know how much currency 1 size contract represents\
- Zero-filled order cannot be retrieved 10 minutes after order cancellation. You will get a 404 not found for such orders\
- Set `reduce_only` to `true` can keep the position from changing side when reducing position size\
- In single position mode, to close a position, you need to set `size` to 0 and `close` to `true`\
- In dual position mode, to close one side position, you need to set `auto_size` side, `reduce_only` to true and `size` to 0\
- Set `stp_act` to decide the strategy of self-trade prevention. For detailed usage, refer to the `stp_act` parameter in request body\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| body | body | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) | true | none |\
| » contract | body | string | true | Futures contract |\
| » size | body | integer(int64) | true | Order size. Specify positive number to make a bid, and negative number to ask |\
| » iceberg | body | integer(int64) | false | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |\
| » price | body | string | false | Order price. 0 for market order with `tif` set as `ioc` |\
| » close | body | boolean | false | Set as `true` to close the position, with `size` set to 0 |\
| » reduce\_only | body | boolean | false | Set as `true` to be reduce-only order |\
| » tif | body | string | false | Time in force |\
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |\
| » auto\_size | body | string | false | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |\
| » stp\_act | body | string | false | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-22) Detailed descriptions\
\
**» tif**: Time in force\
\
- gtc: GoodTillCancelled\
- ioc: ImmediateOrCancelled, taker only\
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee\
- fok: FillOrKill, fill either completely or none\
\
**» text**: User defined information. If not empty, must follow the rules below:\
\
1. prefixed with `t-`\
2. no longer than 28 bytes without `t-` prefix\
3. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)\
Besides user defined information, reserved contents are listed below, denoting how the order is created:\
\
- web: from web\
- api: from API\
- app: from mobile phones\
- auto\_deleveraging: from ADL\
- liquidation: from liquidation\
- insurance: from insurance\
\
**» stp\_act**: Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies\
\
1. After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。\
2. When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。\
3. If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'\
\
- cn: Cancel newest, Cancel new orders and keep old ones\
- co: Cancel oldest, Cancel old orders and keep new ones\
- cb: Cancel both, Both old and new orders will be cancelled\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-51) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| » tif | gtc |\
| » tif | ioc |\
| » tif | poc |\
| » tif | fok |\
| » auto\_size | close\_long |\
| » auto\_size | close\_short |\
| » stp\_act | co |\
| » stp\_act | cn |\
| » stp\_act | cb |\
| » stp\_act | - |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 201 | [Created(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders'\
query_param = ''\
body='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/orders"\
query_param=""\
body_param='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "contract": "BTC_USDT",\
  "size": 6024,\
  "iceberg": 0,\
  "price": "3765",\
  "tif": "gtc",\
  "text": "t-my-custom-id",\
  "stp_act": "-"\
}\
\
```\
\
> Example responses\
\
> 201 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-futures-orders) List futures orders\
\
`GET /futures/{settle}/orders`\
\
_List futures orders_\
\
- Zero-fill order cannot be retrieved for 10 minutes after cancellation\
- Historical orders, by default, only data within the past 6 months is supported.\
If you need to query data for a longer period, please use `GET /futures/{settle}/orders_timerange`.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| status | query | string | true | Only list the orders with this status |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| last\_id | query | string | false | Specify list staring point using the `id` of last record in previous list-query results |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-52) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder)\] |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#response-headers) Response Headers\
\
| Status | Header | Type | Format | Description |\
| --- | --- | --- | --- | --- |\
| 200 | X-Pagination-Limit | integer |  | Request limit specified |\
| 200 | X-Pagination-Offset | integer |  | Request offset specified |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders'\
query_param = 'status=open'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/orders"\
query_param="status=open"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-all-open-orders-matched) Cancel all `open` orders matched\
\
`DELETE /futures/{settle}/orders`\
\
_Cancel all `open` orders matched_\
\
Zero-filled order cannot be retrieved 10 minutes after order cancellation\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| contract | query | string | true | Futures contract |\
| side | query | string | false | All bids or asks. Both included if not specified |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-53) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | All orders matched cancelled | \[ [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders'\
query_param = 'contract=BTC_USDT'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/futures/usdt/orders"\
query_param="contract=BTC_USDT"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-futures-orders-by-time-range) List Futures Orders By Time Range\
\
`GET /futures/{settle}/orders_timerange`\
\
_List Futures Orders By Time Range_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-54) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder)\] |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#response-headers-2) Response Headers\
\
| Status | Header | Type | Format | Description |\
| --- | --- | --- | --- | --- |\
| 200 | X-Pagination-Limit | integer |  | Request limit specified |\
| 200 | X-Pagination-Offset | integer |  | Request offset specified |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders_timerange'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/orders_timerange"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-a-batch-of-futures-orders) Create a batch of futures orders\
\
`POST /futures/{settle}/batch_orders`\
\
_Create a batch of futures orders_\
\
- Up to 10 orders per request\
- If any of the order's parameters are missing or in the wrong format, all of them will not be executed, and a http status 400 error will be returned directly\
- If the parameters are checked and passed, all are executed. Even if there is a business logic error in the middle (such as insufficient funds), it will not affect other execution orders\
- The returned result is in array format, and the order corresponds to the orders in the request body\
- In the returned result, the `succeeded` field of type bool indicates whether the execution was successful or not\
- If the execution is successful, the normal order content is included; if the execution fails, the `label` field is included to indicate the cause of the error\
- In the rate limiting, each order is counted individually\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| body | body | array\[ [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder)\] | true | none |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-55) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is completed | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | \[Futures order details\] |\
| » _None_ | object | Futures order details |\
| »» succeeded | boolean | Whether the batch of orders succeeded |\
| »» label | string | Error label, only exists if execution fails |\
| »» detail | string | Error detail, only present if execution failed and details need to be given |\
| »» id | integer(int64) | Futures order ID |\
| »» user | integer | User ID |\
| »» create\_time | number(double) | Creation time of order |\
| »» finish\_time | number(double) | Order finished time. Not returned if order is open |\
| »» finish\_as | string | How the order was finished.<br>\- filled: all filled<br>\- cancelled: manually cancelled<br>\- liquidated: cancelled because of liquidation<br>\- ioc: time in force is `IOC`, finish immediately<br>\- auto\_deleveraged: finished by ADL<br>\- reduce\_only: cancelled because of increasing position while `reduce-only` set- position\_closed: cancelled because of position close<br>\- position\_closed: canceled because the position was closed<br>\- reduce\_out: only reduce positions by excluding hard-to-fill orders<br>\- stp: cancelled because self trade prevention |\
| »» status | string | Order status<br>\- `open`: waiting to be traded<br>\- `finished`: finished |\
| »» contract | string | Futures contract |\
| »» size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |\
| »» iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |\
| »» price | string | Order price. 0 for market order with `tif` set as `ioc` |\
| »» is\_close | boolean | Is the order to close position |\
| »» is\_reduce\_only | boolean | Is the order reduce-only |\
| »» is\_liq | boolean | Is the order for liquidation |\
| »» tif | string | Time in force<br>\- gtc: GoodTillCancelled<br>\- ioc: ImmediateOrCancelled, taker only<br>\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee<br>\- fok: FillOrKill, fill either completely or none |\
| »» left | integer(int64) | Size left to be traded |\
| »» fill\_price | string | Fill price of the order |\
| »» text | string | User defined information. If not empty, must follow the rules below:<br>1\. prefixed with `t-`<br>2\. no longer than 28 bytes without `t-` prefix<br>3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)<br>Besides user defined information, reserved contents are listed below, denoting how the order is created:<br>\- web: from web<br>\- api: from API<br>\- app: from mobile phones<br>\- auto\_deleveraging: from ADL<br>\- liquidation: from liquidation<br>\- insurance: from insurance |\
| »» tkfr | string | Taker fee |\
| »» mkfr | string | Maker fee |\
| »» refu | integer | Reference user ID |\
| »» stp\_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies<br>1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。<br>2\. When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。<br>3\. If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'<br>\- cn: Cancel newest, Cancel new orders and keep old ones<br>\- co: Cancel oldest, Cancel old orders and keep new ones<br>\- cb: Cancel both, Both old and new orders will be cancelled |\
| »» stp\_id | integer | Orders between users in the same `stp_id` group are not allowed to be self-traded<br>1\. If the `stp_id` of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the `stp_act` of the taker.<br>2\. `stp_id` returns `0` by default for orders that have not been set for `STP group` |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-56) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| finish\_as | filled |\
| finish\_as | cancelled |\
| finish\_as | liquidated |\
| finish\_as | ioc |\
| finish\_as | auto\_deleveraged |\
| finish\_as | reduce\_only |\
| finish\_as | position\_closed |\
| finish\_as | reduce\_out |\
| finish\_as | stp |\
| status | open |\
| status | finished |\
| tif | gtc |\
| tif | ioc |\
| tif | poc |\
| tif | fok |\
| stp\_act | co |\
| stp\_act | cn |\
| stp\_act | cb |\
| stp\_act | - |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/batch_orders'\
query_param = ''\
body='[{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}]'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/batch_orders"\
query_param=""\
body_param='[{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}]'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
[\
  {\
    "contract": "BTC_USDT",\
    "size": 6024,\
    "iceberg": 0,\
    "price": "3765",\
    "tif": "gtc",\
    "text": "t-my-custom-id",\
    "stp_act": "-"\
  }\
]\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "succeeded": true,\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-a-single-order-2) Get a single order\
\
`GET /futures/{settle}/orders/{order_id}`\
\
_Get a single order_\
\
- Zero-fill order cannot be retrieved for 10 minutes after cancellation\
- Historical orders, by default, only data within the past 6 months is supported.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Order ID returned, or user custom ID(i.e., `text` field). |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-23) Detailed descriptions\
\
**order\_id**: Order ID returned, or user custom ID(i.e., `text` field).\
Operations based on custom ID can only be checked when the order is in orderbook. When the order is finished, it can be checked within 60 seconds after the end of the order. After that, only order ID is accepted.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-57) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders/12345'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/orders/12345"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-a-single-order-2) Cancel a single order\
\
`DELETE /futures/{settle}/orders/{order_id}`\
\
_Cancel a single order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Order ID returned, or user custom ID(i.e., `text` field). |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-24) Detailed descriptions\
\
**order\_id**: Order ID returned, or user custom ID(i.e., `text` field).\
Operations based on custom ID can only be checked when the order is in orderbook. When the order is finished, it can be checked within 60 seconds after the end of the order. After that, only order ID is accepted.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-58) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders/12345'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/futures/usdt/orders/12345"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#amend-an-order-2) Amend an order\
\
`PUT /futures/{settle}/orders/{order_id}`\
\
_Amend an order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| body | body | object | true | none |\
| » size | body | integer(int64) | false | New order size, including filled part. |\
| » price | body | string | false | New order price. |\
| » amend\_text | body | string | false | Custom info during amending order |\
| » biz\_info | body | string | false | Users can annotate this modification with information. |\
| » bbo | body | string | false | Users are able to modify the offer price manually. |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Order ID returned, or user custom ID(i.e., `text` field). |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-25) Detailed descriptions\
\
**» size**: New order size, including filled part.\
\
- If new size is less than or equal to filled size, the order will be cancelled.\
- Order side must be identical to the original one.\
- Close order size cannot be changed.\
- For reduce only orders, increasing size may leads to other reduce only orders being cancelled.\
- If price is not changed, decreasing size will not change its precedence in order book, while increasing will move it to the last at current price.\
\
**order\_id**: Order ID returned, or user custom ID(i.e., `text` field).\
Operations based on custom ID can only be checked when the order is in orderbook. When the order is finished, it can be checked within 60 seconds after the end of the order. After that, only order ID is accepted.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-59) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/orders/12345'\
query_param = ''\
body='{"size":100,"price":"54321"}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('PUT', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('PUT', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="PUT"\
url="/futures/usdt/orders/12345"\
query_param=""\
body_param='{"size":100,"price":"54321"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "size": 100,\
  "price": "54321"\
}\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-personal-trading-history-2) List personal trading history\
\
`GET /futures/{settle}/my_trades`\
\
_List personal trading history_\
\
By default, only data within the past 6 months is supported.\
If you need to query data for a longer period, please use `GET /futures/{settle}/my_trades_timerange`.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| order | query | integer(int64) | false | Futures order ID, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| last\_id | query | string | false | Specify the starting point for this list based on a previously retrieved id |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-26) Detailed descriptions\
\
**last\_id**: Specify the starting point for this list based on a previously retrieved id\
\
This parameter is deprecated. If you need to iterate through and retrieve more records, we recommend using 'GET /futures/{settle}/my\_trades\_timerange'.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-60) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » id | integer(int64) | Trade ID |\
| » create\_time | number(double) | Trading time |\
| » contract | string | Futures contract |\
| » order\_id | string | Order ID related |\
| » size | integer(int64) | Trading size |\
| » close\_size | integer(int64) | Number of closed positions:<br>close\_size=0 && size＞0 Open long position<br>close\_size=0 && size＜0 Open short position<br>close\_size>0 && size>0 && size <= close\_size Close short postion<br>close\_size>0 && size>0 && size > close\_size Close short position and open long position<br>close\_size<0 && size<0 && size >= close\_size Close long postion<br>close\_size<0 && size<0 && size < close\_size Close long position and open short position |\
| » price | string | Trading price |\
| » role | string | Trade role. Available values are `taker` and `maker` |\
| » text | string | User defined information |\
| » fee | string | Fee deducted |\
| » point\_fee | string | Points used to deduct fee |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-61) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| role | taker |\
| role | maker |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#response-headers-3) Response Headers\
\
| Status | Header | Type | Format | Description |\
| --- | --- | --- | --- | --- |\
| 200 | X-Pagination-Limit | integer |  | Request limit specified |\
| 200 | X-Pagination-Offset | integer |  | Request offset specified |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/my_trades'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/my_trades"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 121234231,\
    "create_time": 1514764800.123,\
    "contract": "BTC_USDT",\
    "order_id": "21893289839",\
    "size": 100,\
    "price": "100.123",\
    "text": "t-123456",\
    "fee": "0.01",\
    "point_fee": "0",\
    "role": "taker",\
    "close_size": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-personal-trading-history-by-time-range) List personal trading history by time range\
\
`GET /futures/{settle}/my_trades_timerange`\
\
_List personal trading history by time range_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| role | query | string | false | Query role, maker or taker. |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-62) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » trade\_id | string | Trade ID |\
| » create\_time | number(double) | Trading time |\
| » contract | string | Futures contract |\
| » order\_id | string | Order ID related |\
| » size | integer(int64) | Trading size |\
| » close\_size | integer(int64) | Number of closed positions:<br>close\_size=0 && size＞0 Open long position<br>close\_size=0 && size＜0 Open short position<br>close\_size>0 && size>0 && size <= close\_size Close short postion<br>close\_size>0 && size>0 && size > close\_size Close short position and open long position<br>close\_size<0 && size<0 && size >= close\_size Close long postion<br>close\_size<0 && size<0 && size < close\_size Close long position and open short position |\
| » price | string | Trading price |\
| » role | string | Trade role. Available values are `taker` and `maker` |\
| » text | string | User defined information |\
| » fee | string | Fee deducted |\
| » point\_fee | string | Points used to deduct fee |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-63) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| role | taker |\
| role | maker |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#response-headers-4) Response Headers\
\
| Status | Header | Type | Format | Description |\
| --- | --- | --- | --- | --- |\
| 200 | X-Pagination-Limit | integer |  | Request limit specified |\
| 200 | X-Pagination-Offset | integer |  | Request offset specified |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/my_trades_timerange'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/my_trades_timerange"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "trade_id": "121234231",\
    "create_time": 1514764800.123,\
    "contract": "BTC_USDT",\
    "order_id": "21893289839",\
    "size": 100,\
    "price": "100.123",\
    "text": "t-123456",\
    "fee": "0.01",\
    "point_fee": "0",\
    "role": "taker",\
    "close_size": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-position-close-history) List position close history\
\
`GET /futures/{settle}/position_close`\
\
_List position close history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
| side | query | string | false | Query side. long or shot |\
| pnl | query | string | false | Query profit or loss |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-64) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » time | number(double) | Position close time |\
| » contract | string | Futures contract |\
| » side | string | Position side, long or short |\
| » pnl | string | PNL |\
| » pnl\_pnl | string | PNL - Position P/L |\
| » pnl\_fund | string | PNL - Funding Fees |\
| » pnl\_fee | string | PNL - Transaction Fees |\
| » text | string | Text of close order |\
| » max\_size | string | Max Trade Size |\
| » accum\_size | string | Cumulative closed position volume |\
| » first\_open\_time | integer(int64) | First Open Time |\
| » long\_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price. |\
| » short\_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-65) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| side | long |\
| side | short |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/position_close'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/position_close"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1546487347,\
    "pnl": "0.00013",\
    "pnl_pnl": "0.00011",\
    "pnl_fund": "0.00001",\
    "pnl_fee": "0.00001",\
    "side": "long",\
    "contract": "BTC_USDT",\
    "text": "web",\
    "max_size": "100",\
    "accum_size": "100",\
    "first_open_time": 1546487347,\
    "long_price": "2026.87",\
    "short_price": "2544.4"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-liquidation-history) List liquidation history\
\
`GET /futures/{settle}/liquidates`\
\
_List liquidation history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| at | query | integer | false | Specify a liquidation timestamp |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-66) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » time | integer(int64) | Liquidation time |\
| » contract | string | Futures contract |\
| » leverage | string | Position leverage. Not returned in public endpoints. |\
| » size | integer(int64) | Position size |\
| » margin | string | Position margin. Not returned in public endpoints. |\
| » entry\_price | string | Average entry price. Not returned in public endpoints. |\
| » liq\_price | string | Liquidation price. Not returned in public endpoints. |\
| » mark\_price | string | Mark price. Not returned in public endpoints. |\
| » order\_id | integer(int64) | Liquidation order ID. Not returned in public endpoints. |\
| » order\_price | string | Liquidation order price |\
| » fill\_price | string | Liquidation order average taker price |\
| » left | integer(int64) | Liquidation order maker size |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/liquidates'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/liquidates"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1548654951,\
    "contract": "BTC_USDT",\
    "size": 600,\
    "leverage": "25",\
    "margin": "0.006705256878",\
    "entry_price": "3536.123",\
    "liq_price": "3421.54",\
    "mark_price": "3420.27",\
    "order_id": 317393847,\
    "order_price": "3405",\
    "fill_price": "3424",\
    "left": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-auto-deleveraging-history) List Auto-Deleveraging History\
\
`GET /futures/{settle}/auto_deleverages`\
\
_List Auto-Deleveraging History_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| at | query | integer | false | Specify an auto-deleveraging timestamp |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-67) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » time | integer(int64) | Automatic deleveraging time |\
| » user | integer(int64) | User ID |\
| » order\_id | integer(int64) | Order ID. Order IDs before 2023-02-20 are null |\
| » contract | string | Futures contract |\
| » leverage | string | Position leverage |\
| » cross\_leverage\_limit | string | Cross margin leverage(valid only when `leverage` is 0) |\
| » entry\_price | string | Average entry price |\
| » fill\_price | string | Average fill price |\
| » trade\_size | integer(int64) | Trading size |\
| » position\_size | integer(int64) | Positions after auto-deleveraging |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/auto_deleverages'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/auto_deleverages"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1675841679,\
    "contract": "ACH_USDT",\
    "order_id": 73873128,\
    "user": 1666,\
    "cross_leverage_limit": "0",\
    "leverage": "0",\
    "entry_price": "2649.648633636364",\
    "fill_price": "2790.8082",\
    "position_size": 1,\
    "trade_size": -10\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#countdown-cancel-orders-2) Countdown cancel orders\
\
`POST /futures/{settle}/countdown_cancel_all`\
\
_Countdown cancel orders_\
\
When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled.\
This endpoint can be called repeatedly to set a new countdown or cancel the countdown.\
For example, call this endpoint at 30s intervals, each countdown `timeout` is set to 30s.\
If this endpoint is not called again within 30 seconds, all pending orders on the specified `market` will be automatically cancelled, if no `market` is specified, all market pending orders will be cancelled.\
If the `timeout` is set to 0 within 30 seconds, the countdown timer will expire and the cacnel function will be cancelled.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » timeout | body | integer(int32) | true | Countdown time, in seconds |\
| » contract | body | string | false | Futures contract |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-27) Detailed descriptions\
\
**» timeout**: Countdown time, in seconds\
At least 5 seconds, 0 means cancel the countdown\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-68) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Set countdown successfully | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
_triggerTime_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » triggerTime | integer(int64) | Timestamp of the end of the countdown, in milliseconds |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/countdown_cancel_all'\
query_param = ''\
body='{"timeout":30,"contract":"BTC_USDT"}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/countdown_cancel_all"\
query_param=""\
body_param='{"timeout":30,"contract":"BTC_USDT"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "timeout": 30,\
  "contract": "BTC_USDT"\
}\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "triggerTime": "1660039145000"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-user-trading-fee-rates-2) Query user trading fee rates\
\
`GET /futures/{settle}/fee`\
\
_Query user trading fee rates_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract, return related data only if specified |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-69) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » **additionalProperties** | object | The returned result is a map type, where the key represents the market and the value represents the taker and maker fee rates. |\
| »» taker\_fee | string | Taker fee |\
| »» maker\_fee | string | maker fee |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/fee'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/fee"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "1INCH_USDT": {\
    "taker_fee": "0.00025",\
    "maker_fee": "-0.00010"\
  },\
  "AAVE_USDT": {\
    "taker_fee": "0.00025",\
    "maker_fee": "-0.00010"\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-a-batch-of-orders-with-an-id-list-2) Cancel a batch of orders with an ID list\
\
`POST /futures/{settle}/batch_cancel_orders`\
\
_Cancel a batch of orders with an ID list_\
\
Multiple distinct order ID list can be specified。Each request can cancel a maximum of 20 records.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| body | body | array\[string\] | true | none |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-70) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order cancellation operation completed | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » FutureCancelOrderResult | object | Order cancellation result |\
| »» id | string | Order ID |\
| »» user\_id | integer(int64) | User ID |\
| »» succeeded | boolean | Whether cancellation succeeded |\
| »» message | string | Error message when failed to cancel the order; empty if succeeded |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/batch_cancel_orders'\
query_param = ''\
body='["1","2","3"]'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/batch_cancel_orders"\
query_param=""\
body_param='["1","2","3"]'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
[\
  "1",\
  "2",\
  "3"\
]\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user_id": 111,\
    "id": "123456",\
    "succeeded": true,\
    "message": ""\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#batch-modify-orders-with-specified-ids) Batch modify orders with specified IDs\
\
`POST /futures/{settle}/batch_amend_orders`\
\
_Batch modify orders with specified IDs_\
\
You can specify multiple different order IDs. You can only modify up to 10 orders in one request.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |\
| body | body | array\[ [BatchAmendOrderReq](https://www.gate.io/docs/developers/apiv4/en/#schemabatchamendorderreq)\] | true | none |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-71) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is completed | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | \[Futures order details\] |\
| » _None_ | object | Futures order details |\
| »» succeeded | boolean | Whether the batch of orders succeeded |\
| »» label | string | Error label, only exists if execution fails |\
| »» detail | string | Error detail, only present if execution failed and details need to be given |\
| »» id | integer(int64) | Futures order ID |\
| »» user | integer | User ID |\
| »» create\_time | number(double) | Creation time of order |\
| »» finish\_time | number(double) | Order finished time. Not returned if order is open |\
| »» finish\_as | string | How the order was finished.<br>\- filled: all filled<br>\- cancelled: manually cancelled<br>\- liquidated: cancelled because of liquidation<br>\- ioc: time in force is `IOC`, finish immediately<br>\- auto\_deleveraged: finished by ADL<br>\- reduce\_only: cancelled because of increasing position while `reduce-only` set- position\_closed: cancelled because of position close<br>\- position\_closed: canceled because the position was closed<br>\- reduce\_out: only reduce positions by excluding hard-to-fill orders<br>\- stp: cancelled because self trade prevention |\
| »» status | string | Order status<br>\- `open`: waiting to be traded<br>\- `finished`: finished |\
| »» contract | string | Futures contract |\
| »» size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |\
| »» iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |\
| »» price | string | Order price. 0 for market order with `tif` set as `ioc` |\
| »» is\_close | boolean | Is the order to close position |\
| »» is\_reduce\_only | boolean | Is the order reduce-only |\
| »» is\_liq | boolean | Is the order for liquidation |\
| »» tif | string | Time in force<br>\- gtc: GoodTillCancelled<br>\- ioc: ImmediateOrCancelled, taker only<br>\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee<br>\- fok: FillOrKill, fill either completely or none |\
| »» left | integer(int64) | Size left to be traded |\
| »» fill\_price | string | Fill price of the order |\
| »» text | string | User defined information. If not empty, must follow the rules below:<br>1\. prefixed with `t-`<br>2\. no longer than 28 bytes without `t-` prefix<br>3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)<br>Besides user defined information, reserved contents are listed below, denoting how the order is created:<br>\- web: from web<br>\- api: from API<br>\- app: from mobile phones<br>\- auto\_deleveraging: from ADL<br>\- liquidation: from liquidation<br>\- insurance: from insurance |\
| »» tkfr | string | Taker fee |\
| »» mkfr | string | Maker fee |\
| »» refu | integer | Reference user ID |\
| »» stp\_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies<br>1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。<br>2\. When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。<br>3\. If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'<br>\- cn: Cancel newest, Cancel new orders and keep old ones<br>\- co: Cancel oldest, Cancel old orders and keep new ones<br>\- cb: Cancel both, Both old and new orders will be cancelled |\
| »» stp\_id | integer | Orders between users in the same `stp_id` group are not allowed to be self-traded<br>1\. If the `stp_id` of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the `stp_act` of the taker.<br>2\. `stp_id` returns `0` by default for orders that have not been set for `STP group` |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-72) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| finish\_as | filled |\
| finish\_as | cancelled |\
| finish\_as | liquidated |\
| finish\_as | ioc |\
| finish\_as | auto\_deleveraged |\
| finish\_as | reduce\_only |\
| finish\_as | position\_closed |\
| finish\_as | reduce\_out |\
| finish\_as | stp |\
| status | open |\
| status | finished |\
| tif | gtc |\
| tif | ioc |\
| tif | poc |\
| tif | fok |\
| stp\_act | co |\
| stp\_act | cn |\
| stp\_act | cb |\
| stp\_act | - |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/batch_amend_orders'\
query_param = ''\
body='[{"order_id":121212,"amend_text":"batch amend text","size":100,"price":"54321"}]'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/batch_amend_orders"\
query_param=""\
body_param='[{"order_id":121212,"amend_text":"batch amend text","size":100,"price":"54321"}]'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
[\
  {\
    "order_id": 121212,\
    "amend_text": "batch amend text",\
    "size": 100,\
    "price": "54321"\
  }\
]\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "succeeded": true,\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-a-price-triggered-order-2) Create a price-triggered order\
\
`POST /futures/{settle}/price_orders`\
\
_Create a price-triggered order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder) | true | none |\
| » initial | body | object | true | none |\
| »» contract | body | string | true | Futures contract |\
| »» size | body | integer(int64) | false | Order size. Positive size means to buy, while negative one means to sell. Set to 0 to close the position |\
| »» price | body | string | true | Order price. Set to 0 to use market price |\
| »» close | body | boolean | false | Set to true if trying to close the position |\
| »» tif | body | string | false | Time in force. If using market price, only `ioc` is supported. |\
| »» text | body | string | false | The source of the order, including: |\
| »» reduce\_only | body | boolean | false | Set to true to create a reduce-only order |\
| »» auto\_size | body | string | false | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |\
| » trigger | body | object | true | none |\
| »» strategy\_type | body | integer(int32) | false | How the order will be triggered |\
| »» price\_type | body | integer(int32) | false | Price type. 0 - latest deal price, 1 - mark price, 2 - index price |\
| »» price | body | string | false | Value of price on price triggered, or price gap on price gap triggered |\
| »» rule | body | integer(int32) | false | Trigger condition type |\
| »» expiration | body | integer | false | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |\
| » order\_type | body | string | false | Take-profit/stop-loss types, which include: |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-28) Detailed descriptions\
\
**»» tif**: Time in force. If using market price, only `ioc` is supported.\
\
- gtc: GoodTillCancelled\
- ioc: ImmediateOrCancelled\
\
**»» text**: The source of the order, including:\
\
- web: web\
- api: api\
- app: app\
\
**»» strategy\_type**: How the order will be triggered\
\
- `0`: by price, which means the order will be triggered if price condition is satisfied\
- `1`: by price gap, which means the order will be triggered if gap of recent two prices of specified `price_type` are satisfied.\
Only `0` is supported currently\
\
**»» rule**: Trigger condition type\
\
- `1`: calculated price based on `strategy_type` and `price_type` >= `price`\
- `2`: calculated price based on `strategy_type` and `price_type` <= `price`\
\
**» order\_type**: Take-profit/stop-loss types, which include:\
\
- `close-long-order`: order take-profit/stop-loss, close long position\
- `close-short-order`: order take-profit/stop-loss, close short position\
- `close-long-position`: position take-profit/stop-loss, close long position\
- `close-short-position`: position take-profit/stop-loss, close short position\
- `plan-close-long-position`: position planned take-profit/stop-loss, close long position\
- `plan-close-short-position`: position planned take-profit/stop-loss, close short position\
\
The order take-profit/stop-loss can not be passed by request. These two types are read only.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-73) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| »» tif | gtc |\
| »» tif | ioc |\
| »» strategy\_type | 0 |\
| »» strategy\_type | 1 |\
| »» price\_type | 0 |\
| »» price\_type | 1 |\
| »» price\_type | 2 |\
| »» rule | 1 |\
| »» rule | 2 |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 201 | [Created(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created | Inline |\
\
### Response Schema\
\
Status Code **201**\
\
_TriggerOrderResponse_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | integer(int64) | Auto order ID |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/price_orders'\
query_param = ''\
body='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/futures/usdt/price_orders"\
query_param=""\
body_param='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "initial": {\
    "contract": "BTC_USDT",\
    "size": 100,\
    "price": "5.03"\
  },\
  "trigger": {\
    "strategy_type": 0,\
    "price_type": 0,\
    "price": "3000",\
    "rule": 1,\
    "expiration": 86400\
  },\
  "order_type": "close-long-order"\
}\
\
```\
\
> Example responses\
\
> 201 Response\
\
```\
{\
  "id": 1432329\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-all-price-triggered-orders) List All Price-triggered Orders\
\
`GET /futures/{settle}/price_orders`\
\
_List All Price-triggered Orders_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| status | query | string | true | Only list the orders with this status |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-74) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| status | open |\
| status | finished |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/price_orders'\
query_param = 'status=open'\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/price_orders"\
query_param="status=open"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "initial": {\
      "contract": "BTC_USDT",\
      "size": 100,\
      "price": "5.03"\
    },\
    "trigger": {\
      "strategy_type": 0,\
      "price_type": 0,\
      "price": "3000",\
      "rule": 1,\
      "expiration": 86400\
    },\
    "id": 1283293,\
    "user": 1234,\
    "create_time": 1514764800,\
    "finish_time": 1514764900,\
    "trade_id": 13566,\
    "status": "finished",\
    "finish_as": "cancelled",\
    "reason": "",\
    "order_type": "close-long-order"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-all-price-triggered-orders-2) Cancel All Price-triggered Orders\
\
`DELETE /futures/{settle}/price_orders`\
\
_Cancel All Price-triggered Orders_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-75) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted. Query order status by listing orders | \[ [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/price_orders'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/futures/usdt/price_orders"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "initial": {\
      "contract": "BTC_USDT",\
      "size": 100,\
      "price": "5.03"\
    },\
    "trigger": {\
      "strategy_type": 0,\
      "price_type": 0,\
      "price": "3000",\
      "rule": 1,\
      "expiration": 86400\
    },\
    "id": 1283293,\
    "user": 1234,\
    "create_time": 1514764800,\
    "finish_time": 1514764900,\
    "trade_id": 13566,\
    "status": "finished",\
    "finish_as": "cancelled",\
    "reason": "",\
    "order_type": "close-long-order"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-a-price-triggered-order-2) Get a price-triggered order\
\
`GET /futures/{settle}/price_orders/{order_id}`\
\
_Get a price-triggered order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Retrieve the data of the order with the specified ID |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-76) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/price_orders/string'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/futures/usdt/price_orders/string"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "initial": {\
    "contract": "BTC_USDT",\
    "size": 100,\
    "price": "5.03"\
  },\
  "trigger": {\
    "strategy_type": 0,\
    "price_type": 0,\
    "price": "3000",\
    "rule": 1,\
    "expiration": 86400\
  },\
  "id": 1283293,\
  "user": 1234,\
  "create_time": 1514764800,\
  "finish_time": 1514764900,\
  "trade_id": 13566,\
  "status": "finished",\
  "finish_as": "cancelled",\
  "reason": "",\
  "order_type": "close-long-order"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-a-price-triggered-order-2) cancel a price-triggered order\
\
`DELETE /futures/{settle}/price_orders/{order_id}`\
\
_cancel a price-triggered order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Retrieve the data of the order with the specified ID |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-77) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | btc |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
import time\
import hashlib\
import hmac\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/futures/usdt/price_orders/string'\
query_param = ''\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/futures/usdt/price_orders/string"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "initial": {\
    "contract": "BTC_USDT",\
    "size": 100,\
    "price": "5.03"\
  },\
  "trigger": {\
    "strategy_type": 0,\
    "price_type": 0,\
    "price": "3000",\
    "rule": 1,\
    "expiration": 86400\
  },\
  "id": 1283293,\
  "user": 1234,\
  "create_time": 1514764800,\
  "finish_time": 1514764900,\
  "trade_id": 13566,\
  "status": "finished",\
  "finish_as": "cancelled",\
  "reason": "",\
  "order_type": "close-long-order"\
}\
\
```\
\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#delivery) Delivery\
\
Delivery contract API\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-all-futures-contracts-2) List all futures contracts\
\
`GET /delivery/{settle}/contracts`\
\
_List all futures contracts_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-78) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [DeliveryContract](https://www.gate.io/docs/developers/apiv4/en/#schemadeliverycontract)\] |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/contracts'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/contracts \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "name": "BTC_USDT_20200814",\
    "underlying": "BTC_USDT",\
    "cycle": "WEEKLY",\
    "type": "direct",\
    "quanto_multiplier": "0.0001",\
    "mark_type": "index",\
    "last_price": "9017",\
    "mark_price": "9019",\
    "index_price": "9005.3",\
    "basis_rate": "0.185095",\
    "basis_value": "13.7",\
    "basis_impact_value": "100000",\
    "settle_price": "0",\
    "settle_price_interval": 60,\
    "settle_price_duration": 1800,\
    "settle_fee_rate": "0.0015",\
    "expire_time": 1593763200,\
    "order_price_round": "0.1",\
    "mark_price_round": "0.1",\
    "leverage_min": "1",\
    "leverage_max": "100",\
    "maintenance_rate": "1000000",\
    "risk_limit_base": "140.726652109199",\
    "risk_limit_step": "1000000",\
    "risk_limit_max": "8000000",\
    "maker_fee_rate": "-0.00025",\
    "taker_fee_rate": "0.00075",\
    "ref_discount_rate": "0",\
    "ref_rebate_rate": "0.2",\
    "order_price_deviate": "0.5",\
    "order_size_min": 1,\
    "order_size_max": 1000000,\
    "orders_limit": 50,\
    "orderbook_id": 63,\
    "trade_id": 26,\
    "trade_size": 435,\
    "position_size": 130,\
    "config_change_time": 1593158867,\
    "in_delisting": false\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-a-single-contract-2) Get a single contract\
\
`GET /delivery/{settle}/contracts/{contract}`\
\
_Get a single contract_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-79) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Contract information | [DeliveryContract](https://www.gate.io/docs/developers/apiv4/en/#schemadeliverycontract) |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/contracts/BTC_USDT_20200814'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/contracts/BTC_USDT_20200814 \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "name": "BTC_USDT_20200814",\
  "underlying": "BTC_USDT",\
  "cycle": "WEEKLY",\
  "type": "direct",\
  "quanto_multiplier": "0.0001",\
  "mark_type": "index",\
  "last_price": "9017",\
  "mark_price": "9019",\
  "index_price": "9005.3",\
  "basis_rate": "0.185095",\
  "basis_value": "13.7",\
  "basis_impact_value": "100000",\
  "settle_price": "0",\
  "settle_price_interval": 60,\
  "settle_price_duration": 1800,\
  "settle_fee_rate": "0.0015",\
  "expire_time": 1593763200,\
  "order_price_round": "0.1",\
  "mark_price_round": "0.1",\
  "leverage_min": "1",\
  "leverage_max": "100",\
  "maintenance_rate": "1000000",\
  "risk_limit_base": "140.726652109199",\
  "risk_limit_step": "1000000",\
  "risk_limit_max": "8000000",\
  "maker_fee_rate": "-0.00025",\
  "taker_fee_rate": "0.00075",\
  "ref_discount_rate": "0",\
  "ref_rebate_rate": "0.2",\
  "order_price_deviate": "0.5",\
  "order_size_min": 1,\
  "order_size_max": 1000000,\
  "orders_limit": 50,\
  "orderbook_id": 63,\
  "trade_id": 26,\
  "trade_size": 435,\
  "position_size": 130,\
  "config_change_time": 1593158867,\
  "in_delisting": false\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-order-book-2) Futures order book\
\
`GET /delivery/{settle}/order_book`\
\
_Futures order book_\
\
Bids will be sorted by price from high to low, while asks sorted reversely\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |\
| limit | query | integer | false | Maximum number of order depth data in asks or bids |\
| with\_id | query | boolean | false | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-80) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
| interval | 0 |\
| interval | 0.1 |\
| interval | 0.01 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order book retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set `with_id=true` to include this field in response |\
| » current | number(double) | Response data generation timestamp |\
| » update | number(double) | Order book changed timestamp |\
| » asks | array | Asks order depth |\
| »» futures\_order\_book\_item | object | none |\
| »»» p | string | Price (quote currency) |\
| »»» s | integer(int64) | Size |\
| »» bids | array | Bids order depth |\
| »»» futures\_order\_book\_item | object | none |\
| »»»» p | string | Price (quote currency) |\
| »»»» s | integer(int64) | Size |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/order_book'\
query_param = 'contract=BTC_USDT_20200814'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/order_book?contract=BTC_USDT_20200814 \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 123456,\
  "current": 1623898993.123,\
  "update": 1623898993.121,\
  "asks": [\
    {\
      "p": "1.52",\
      "s": 100\
    },\
    {\
      "p": "1.53",\
      "s": 40\
    }\
  ],\
  "bids": [\
    {\
      "p": "1.17",\
      "s": 150\
    },\
    {\
      "p": "1.16",\
      "s": 203\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-trading-history-2) Futures trading history\
\
`GET /delivery/{settle}/trades`\
\
_Futures trading history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| last\_id | query | string | false | Specify the starting point for this list based on a previously retrieved id |\
| from | query | integer(int64) | false | Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items. |\
| to | query | integer(int64) | false | Specify end time in Unix seconds, default to current time |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-29) Detailed descriptions\
\
**last\_id**: Specify the starting point for this list based on a previously retrieved id\
\
This parameter is deprecated. Use `from` and `to` instead to limit time range\
\
**from**: Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items.\
If items between `from` and `to` are more than `limit`, only `limit` number will be returned.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-81) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » id | integer(int64) | Trade ID |\
| » create\_time | number(double) | Trading time |\
| » create\_time\_ms | number(double) | Trading time, with milliseconds set to 3 decimal places. |\
| » contract | string | Futures contract |\
| » size | integer(int64) | Trading size |\
| » price | string | Trading price (quote currency) |\
| » is\_internal | boolean | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/trades'\
query_param = 'contract=BTC_USDT_20200814'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/trades?contract=BTC_USDT_20200814 \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 121234231,\
    "create_time": 1514764800,\
    "contract": "BTC_USDT",\
    "size": -100,\
    "price": "100.123"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-futures-candlesticks-2) Get futures candlesticks\
\
`GET /delivery/{settle}/candlesticks`\
\
_Get futures candlesticks_\
\
Return specified contract candlesticks.\
If prefix `contract` with `mark_`, the contract's mark price candlesticks are returned;\
if prefix with `index_`, index price candlesticks will be returned.\
\
Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying `from`, `to` and `interval`\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | true | Futures contract |\
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to `to - 100 * interval` if not specified |\
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |\
| limit | query | integer | false | Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |\
| interval | query | string | false | Interval time between data points. Note that `1w` means natual week(Mon-Sun), while `7d` means every 7d since unix 0 |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-82) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
| interval | 10s |\
| interval | 30s |\
| interval | 1m |\
| interval | 5m |\
| interval | 15m |\
| interval | 30m |\
| interval | 1h |\
| interval | 2h |\
| interval | 4h |\
| interval | 6h |\
| interval | 8h |\
| interval | 12h |\
| interval | 1d |\
| interval | 7d |\
| interval | 1w |\
| interval | 30d |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » _None_ | object | data point in every timestamp |\
| »» t | number(double) | Unix timestamp in seconds |\
| »» v | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed |\
| »» c | string | Close price (quote currency) |\
| »» h | string | Highest price (quote currency) |\
| »» l | string | Lowest price (quote currency) |\
| »» o | string | Open price (quote currency) |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/candlesticks'\
query_param = 'contract=BTC_USDT_20200814'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/candlesticks?contract=BTC_USDT_20200814 \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1539852480,\
    "v": 97151,\
    "c": "1.032",\
    "h": "1.032",\
    "l": "1.032",\
    "o": "1.032"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-futures-tickers-2) List futures tickers\
\
`GET /delivery/{settle}/tickers`\
\
_List futures tickers_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-83) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » contract | string | Futures contract |\
| » last | string | Last trading price |\
| » change\_percentage | string | Change percentage. |\
| » total\_size | string | Contract total size |\
| » low\_24h | string | Lowest trading price in recent 24h |\
| » high\_24h | string | Highest trading price in recent 24h |\
| » volume\_24h | string | Trade size in recent 24h |\
| » volume\_24h\_btc | string | Trade volumes in recent 24h in BTC(deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead) |\
| » volume\_24h\_usd | string | Trade volumes in recent 24h in USD(deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead) |\
| » volume\_24h\_base | string | Trade volume in recent 24h, in base currency |\
| » volume\_24h\_quote | string | Trade volume in recent 24h, in quote currency |\
| » volume\_24h\_settle | string | Trade volume in recent 24h, in settle currency |\
| » mark\_price | string | Recent mark price |\
| » funding\_rate | string | Funding rate |\
| » funding\_rate\_indicative | string | Indicative Funding rate in next period. (deprecated. use `funding_rate`) |\
| » index\_price | string | Index price |\
| » quanto\_base\_rate | string | Exchange rate of base currency and settlement currency in Quanto contract. Does not exists in contracts of other types |\
| » basis\_rate | string | Basis rate |\
| » basis\_value | string | Basis value |\
| » lowest\_ask | string | Recent lowest ask |\
| » lowest\_size | string | The latest seller's lowest price order quantity |\
| » highest\_bid | string | Recent highest bid |\
| » highest\_size | string | The latest buyer's highest price order volume |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/tickers'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/tickers \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "contract": "BTC_USDT",\
    "last": "6432",\
    "low_24h": "6278",\
    "high_24h": "6790",\
    "change_percentage": "4.43",\
    "total_size": "32323904",\
    "volume_24h": "184040233284",\
    "volume_24h_btc": "28613220",\
    "volume_24h_usd": "184040233284",\
    "volume_24h_base": "28613220",\
    "volume_24h_quote": "184040233284",\
    "volume_24h_settle": "28613220",\
    "mark_price": "6534",\
    "funding_rate": "0.0001",\
    "funding_rate_indicative": "0.0001",\
    "index_price": "6531",\
    "highest_bid": "34089.7",\
    "highest_size": "100",\
    "lowest_ask": "34217.9",\
    "lowest_size": "1000"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futures-insurance-balance-history-2) Futures insurance balance history\
\
`GET /delivery/{settle}/insurance`\
\
_Futures insurance balance history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-84) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » t | integer(int64) | Unix timestamp in seconds |\
| » b | string | Insurance balance |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/insurance'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/insurance \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1543968000,\
    "b": "83.0031"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-futures-account-2) Query futures account\
\
`GET /delivery/{settle}/accounts`\
\
_Query futures account_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-85) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. <br>total = SUM(history\_dnw, history\_pnl, history\_fee, history\_refr, history\_fund) |\
| » unrealised\_pnl | string | Unrealized PNL |\
| » position\_margin | string | Position margin |\
| » order\_margin | string | Order margin of unfinished orders |\
| » available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |\
| » point | string | POINT amount |\
| » currency | string | Settle currency |\
| » in\_dual\_mode | boolean | Whether dual mode is enabled |\
| » enable\_credit | boolean | Whether portfolio margin account mode is enabled |\
| » position\_initial\_margin | string | Initial margin position, applicable to the portfolio margin account model |\
| » maintenance\_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |\
| » bonus | string | Perpetual Contract Bonus |\
| » enable\_evolved\_classic | boolean | Classic account margin mode, true-new mode, false-old mode |\
| » cross\_order\_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |\
| » cross\_initial\_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |\
| » cross\_maintenance\_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |\
| » cross\_unrealised\_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |\
| » cross\_available | string | Full warehouse available amount, suitable for the new classic account margin model |\
| » isolated\_position\_margin | string | Ware -position margin, suitable for the new classic account margin model |\
| » enable\_new\_dual\_mode | boolean | Whether to open a new two-way position mode |\
| » margin\_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |\
| » history | object | Statistical data |\
| »» dnw | string | total amount of deposit and withdraw |\
| »» pnl | string | total amount of trading profit and loss |\
| »» fee | string | total amount of fee |\
| »» refr | string | total amount of referrer rebates |\
| »» fund | string | total amount of funding costs |\
| »» point\_dnw | string | total amount of point deposit and withdraw |\
| »» point\_fee | string | total amount of point fee |\
| »» point\_refr | string | total amount of referrer rebates of point fee |\
| »» bonus\_dnw | string | total amount of perpetual contract bonus transfer |\
| »» bonus\_offset | string | total amount of perpetual contract bonus deduction |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/accounts"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 1666,\
  "currency": "USDT",\
  "total": "9707.803567115145",\
  "unrealised_pnl": "3371.248828",\
  "position_margin": "38.712189181",\
  "order_margin": "0",\
  "available": "9669.091377934145",\
  "point": "0",\
  "bonus": "0",\
  "in_dual_mode": false,\
  "enable_evolved_classic": false,\
  "cross_initial_margin": "61855.56788525",\
  "cross_maintenance_margin": "682.04678105",\
  "cross_order_margin": "0",\
  "cross_unrealised_pnl": "1501.178222634128",\
  "cross_available": "27549.406108813951",\
  "isolated_position_margin": "0",\
  "history": {\
    "dnw": "10000",\
    "pnl": "68.3685",\
    "fee": "-1.645812875",\
    "refr": "0",\
    "fund": "-358.919120009855",\
    "point_dnw": "0",\
    "point_fee": "0",\
    "point_refr": "0",\
    "bonus_dnw": "0",\
    "bonus_offset": "0"\
  }\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#query-account-book-3) Query account book\
\
`GET /delivery/{settle}/account_book`\
\
_Query account book_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
| type | query | string | false | Changing Type: |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-30) Detailed descriptions\
\
**type**: Changing Type:\
\
- dnw: Deposit & Withdraw\
- pnl: Profit & Loss by reducing position\
- fee: Trading fee\
- refr: Referrer rebate\
- fund: Funding\
- point\_dnw: POINT Deposit & Withdraw\
- point\_fee: POINT Trading fee\
- point\_refr: POINT Referrer rebate\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-86) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
| type | dnw |\
| type | pnl |\
| type | fee |\
| type | refr |\
| type | fund |\
| type | point\_dnw |\
| type | point\_fee |\
| type | point\_refr |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » time | number(double) | Change time |\
| » change | string | Change amount |\
| » balance | string | Balance after change |\
| » type | string | Changing Type：<br>\- dnw: Deposit & Withdraw<br>\- pnl: Profit & Loss by reducing position<br>\- fee: Trading fee<br>\- refr: Referrer rebate<br>\- fund: Funding<br>\- point\_dnw: POINT Deposit & Withdraw<br>\- point\_fee: POINT Trading fee<br>\- point\_refr: POINT Referrer rebate<br>\- bonus\_offset: bouns deduction |\
| » text | string | Comment |\
| » contract | string | Futures contract, the field is only available for data after 2023-10-30. |\
| » trade\_id | string | trade id |\
| » id | string | 账户变更记录 id |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-87) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| type | dnw |\
| type | pnl |\
| type | fee |\
| type | refr |\
| type | fund |\
| type | point\_dnw |\
| type | point\_fee |\
| type | point\_refr |\
| type | bonus\_offset |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/positions"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "user": 10000,\
    "contract": "BTC_USDT",\
    "size": -9440,\
    "leverage": "0",\
    "risk_limit": "100",\
    "leverage_max": "100",\
    "maintenance_rate": "0.005",\
    "value": "3568.62",\
    "margin": "4.431548146258",\
    "entry_price": "3779.55",\
    "liq_price": "99999999",\
    "mark_price": "3780.32",\
    "unrealised_pnl": "-0.000507486844",\
    "realised_pnl": "0.045543982432",\
    "pnl_pnl": "0.045543982432",\
    "pnl_fund": "0",\
    "pnl_fee": "0",\
    "history_pnl": "0",\
    "last_close_pnl": "0",\
    "realised_point": "0",\
    "history_point": "0",\
    "adl_ranking": 5,\
    "pending_orders": 16,\
    "close_order": {\
      "id": 232323,\
      "price": "3779",\
      "is_liq": false\
    },\
    "mode": "single",\
    "update_time": 1684994406,\
    "update_id": 1,\
    "cross_leverage_limit": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-single-position-2) Get single position\
\
`GET /delivery/{settle}/positions/{contract}`\
\
_Get single position_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-89) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/positions/BTC_USDT_20200814"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-margin-2) Update position margin\
\
`POST /delivery/{settle}/positions/{contract}/margin`\
\
_Update position margin_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| change | query | string | true | Margin change. Use positive number to increase margin, negative number otherwise. |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-90) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/delivery/usdt/positions/BTC_USDT_20200814/margin"\
query_param="change=0.01"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-leverage-2) Update position leverage\
\
`POST /delivery/{settle}/positions/{contract}/leverage`\
\
_Update position leverage_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| leverage | query | string | true | New position leverage |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-91) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/delivery/usdt/positions/BTC_USDT_20200814/leverage"\
query_param="leverage=10"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#update-position-risk-limit-2) Update position risk limit\
\
`POST /delivery/{settle}/positions/{contract}/risk_limit`\
\
_Update position risk limit_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | path | string | true | Futures contract |\
| risk\_limit | query | string | true | New position risk limit |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-92) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](https://www.gate.io/docs/developers/apiv4/en/#schemaposition) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/delivery/usdt/positions/BTC_USDT_20200814/risk_limit"\
query_param="risk_limit=10"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "user": 10000,\
  "contract": "BTC_USDT",\
  "size": -9440,\
  "leverage": "0",\
  "risk_limit": "100",\
  "leverage_max": "100",\
  "maintenance_rate": "0.005",\
  "value": "3568.62",\
  "margin": "4.431548146258",\
  "entry_price": "3779.55",\
  "liq_price": "99999999",\
  "mark_price": "3780.32",\
  "unrealised_pnl": "-0.000507486844",\
  "realised_pnl": "0.045543982432",\
  "pnl_pnl": "0.045543982432",\
  "pnl_fund": "0",\
  "pnl_fee": "0",\
  "history_pnl": "0",\
  "last_close_pnl": "0",\
  "realised_point": "0",\
  "history_point": "0",\
  "adl_ranking": 5,\
  "pending_orders": 16,\
  "close_order": {\
    "id": 232323,\
    "price": "3779",\
    "is_liq": false\
  },\
  "mode": "single",\
  "update_time": 1684994406,\
  "update_id": 1,\
  "cross_leverage_limit": "0"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-a-futures-order-2) Create a futures order\
\
`POST /delivery/{settle}/orders`\
\
_Create a futures order_\
\
Zero-filled order cannot be retrieved 10 minutes after order cancellation\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) | true | none |\
| » contract | body | string | true | Futures contract |\
| » size | body | integer(int64) | true | Order size. Specify positive number to make a bid, and negative number to ask |\
| » iceberg | body | integer(int64) | false | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |\
| » price | body | string | false | Order price. 0 for market order with `tif` set as `ioc` |\
| » close | body | boolean | false | Set as `true` to close the position, with `size` set to 0 |\
| » reduce\_only | body | boolean | false | Set as `true` to be reduce-only order |\
| » tif | body | string | false | Time in force |\
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |\
| » auto\_size | body | string | false | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |\
| » stp\_act | body | string | false | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-31) Detailed descriptions\
\
**» tif**: Time in force\
\
- gtc: GoodTillCancelled\
- ioc: ImmediateOrCancelled, taker only\
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee\
- fok: FillOrKill, fill either completely or none\
\
**» text**: User defined information. If not empty, must follow the rules below:\
\
1. prefixed with `t-`\
2. no longer than 28 bytes without `t-` prefix\
3. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)\
Besides user defined information, reserved contents are listed below, denoting how the order is created:\
\
- web: from web\
- api: from API\
- app: from mobile phones\
- auto\_deleveraging: from ADL\
- liquidation: from liquidation\
- insurance: from insurance\
\
**» stp\_act**: Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies\
\
1. After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。\
2. When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。\
3. If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'\
\
- cn: Cancel newest, Cancel new orders and keep old ones\
- co: Cancel oldest, Cancel old orders and keep new ones\
- cb: Cancel both, Both old and new orders will be cancelled\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-93) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| » tif | gtc |\
| » tif | ioc |\
| » tif | poc |\
| » tif | fok |\
| » auto\_size | close\_long |\
| » auto\_size | close\_short |\
| » stp\_act | co |\
| » stp\_act | cn |\
| » stp\_act | cb |\
| » stp\_act | - |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 201 | [Created(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/delivery/usdt/orders"\
query_param=""\
body_param='{"contract":"BTC_USDT","size":6024,"iceberg":0,"price":"3765","tif":"gtc","text":"t-my-custom-id","stp_act":"-"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "contract": "BTC_USDT",\
  "size": 6024,\
  "iceberg": 0,\
  "price": "3765",\
  "tif": "gtc",\
  "text": "t-my-custom-id",\
  "stp_act": "-"\
}\
\
```\
\
> Example responses\
\
> 201 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-futures-orders-2) List futures orders\
\
`GET /delivery/{settle}/orders`\
\
_List futures orders_\
\
Zero-filled order cannot be retrieved 10 minutes after order cancellation\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | false | Futures contract |\
| status | query | string | true | Only list the orders with this status |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| last\_id | query | string | false | Specify list staring point using the `id` of last record in previous list-query results |\
| count\_total | query | integer | false | Whether to return total number matched. Default to 0(no return) |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-94) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| status | open |\
| status | finished |\
| count\_total | 0 |\
| count\_total | 1 |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder)\] |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#response-headers-5) Response Headers\
\
| Status | Header | Type | Format | Description |\
| --- | --- | --- | --- | --- |\
| 200 | X-Pagination-Limit | integer |  | Request limit specified |\
| 200 | X-Pagination-Offset | integer |  | Request offset specified |\
| 200 | X-Pagination-Total | integer |  | Total number matched. Only returned if `count_total` set to 1 |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/orders"\
query_param="status=open"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-all-open-orders-matched-2) Cancel all `open` orders matched\
\
`DELETE /delivery/{settle}/orders`\
\
_Cancel all `open` orders matched_\
\
Zero-filled order cannot be retrieved 10 minutes after order cancellation\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | true | Futures contract |\
| side | query | string | false | All bids or asks. Both included if not specified |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-95) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| side | ask |\
| side | bid |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | All orders matched cancelled | \[ [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/delivery/usdt/orders"\
query_param="contract=BTC_USDT_20200814"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 15675394,\
    "user": 100000,\
    "contract": "BTC_USDT",\
    "create_time": 1546569968,\
    "size": 6024,\
    "iceberg": 0,\
    "left": 6024,\
    "price": "3765",\
    "fill_price": "0",\
    "mkfr": "-0.00025",\
    "tkfr": "0.00075",\
    "tif": "gtc",\
    "refu": 0,\
    "is_reduce_only": false,\
    "is_close": false,\
    "is_liq": false,\
    "text": "t-my-custom-id",\
    "status": "finished",\
    "finish_time": 1514764900,\
    "finish_as": "cancelled",\
    "stp_id": 0,\
    "stp_act": "-",\
    "amend_text": "-"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-a-single-order-3) Get a single order\
\
`GET /delivery/{settle}/orders/{order_id}`\
\
_Get a single order_\
\
Zero-filled order cannot be retrieved 10 minutes after order cancellation\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Retrieve the data of the order with the specified ID |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-96) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/orders/12345"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-a-single-order-3) Cancel a single order\
\
`DELETE /delivery/{settle}/orders/{order_id}`\
\
_Cancel a single order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Retrieve the data of the order with the specified ID |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-97) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturesorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/delivery/usdt/orders/12345"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "id": 15675394,\
  "user": 100000,\
  "contract": "BTC_USDT",\
  "create_time": 1546569968,\
  "size": 6024,\
  "iceberg": 0,\
  "left": 6024,\
  "price": "3765",\
  "fill_price": "0",\
  "mkfr": "-0.00025",\
  "tkfr": "0.00075",\
  "tif": "gtc",\
  "refu": 0,\
  "is_reduce_only": false,\
  "is_close": false,\
  "is_liq": false,\
  "text": "t-my-custom-id",\
  "status": "finished",\
  "finish_time": 1514764900,\
  "finish_as": "cancelled",\
  "stp_id": 0,\
  "stp_act": "-",\
  "amend_text": "-"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-personal-trading-history-3) List personal trading history\
\
`GET /delivery/{settle}/my_trades`\
\
_List personal trading history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract |\
| order | query | integer(int64) | false | Futures order ID, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| last\_id | query | string | false | Specify list staring point using the `id` of last record in previous list-query results |\
| count\_total | query | integer | false | Whether to return total number matched. Default to 0(no return) |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-98) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
| count\_total | 0 |\
| count\_total | 1 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » id | integer(int64) | Trade ID |\
| » create\_time | number(double) | Trading time |\
| » contract | string | Futures contract |\
| » order\_id | string | Order ID related |\
| » size | integer(int64) | Trading size |\
| » close\_size | integer(int64) | Number of closed positions:<br>close\_size=0 && size＞0 Open long position<br>close\_size=0 && size＜0 Open short position<br>close\_size>0 && size>0 && size <= close\_size Close short postion<br>close\_size>0 && size>0 && size > close\_size Close short position and open long position<br>close\_size<0 && size<0 && size >= close\_size Close long postion<br>close\_size<0 && size<0 && size < close\_size Close long position and open short position |\
| » price | string | Trading price |\
| » role | string | Trade role. Available values are `taker` and `maker` |\
| » text | string | User defined information |\
| » fee | string | Fee deducted |\
| » point\_fee | string | Points used to deduct fee |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-99) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| role | taker |\
| role | maker |\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#response-headers-6) Response Headers\
\
| Status | Header | Type | Format | Description |\
| --- | --- | --- | --- | --- |\
| 200 | X-Pagination-Limit | integer |  | Request limit specified |\
| 200 | X-Pagination-Offset | integer |  | Request offset specified |\
| 200 | X-Pagination-Total | integer |  | Total number matched. Only returned if `count_total` set to 1 |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/my_trades"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "id": 121234231,\
    "create_time": 1514764800.123,\
    "contract": "BTC_USDT",\
    "order_id": "21893289839",\
    "size": 100,\
    "price": "100.123",\
    "text": "t-123456",\
    "fee": "0.01",\
    "point_fee": "0",\
    "role": "taker",\
    "close_size": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-position-close-history-2) List position close history\
\
`GET /delivery/{settle}/position_close`\
\
_List position close history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-100) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » time | number(double) | Position close time |\
| » contract | string | Futures contract |\
| » side | string | Position side, long or short |\
| » pnl | string | PNL |\
| » pnl\_pnl | string | PNL - Position P/L |\
| » pnl\_fund | string | PNL - Funding Fees |\
| » pnl\_fee | string | PNL - Transaction Fees |\
| » text | string | Text of close order |\
| » max\_size | string | Max Trade Size |\
| » accum\_size | string | Cumulative closed position volume |\
| » first\_open\_time | integer(int64) | First Open Time |\
| » long\_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price. |\
| » short\_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-101) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| side | long |\
| side | short |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/position_close"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1546487347,\
    "pnl": "0.00013",\
    "pnl_pnl": "0.00011",\
    "pnl_fund": "0.00001",\
    "pnl_fee": "0.00001",\
    "side": "long",\
    "contract": "BTC_USDT",\
    "text": "web",\
    "max_size": "100",\
    "accum_size": "100",\
    "first_open_time": 1546487347,\
    "long_price": "2026.87",\
    "short_price": "2544.4"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-liquidation-history-2) List liquidation history\
\
`GET /delivery/{settle}/liquidates`\
\
_List liquidation history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| at | query | integer | false | Specify a liquidation timestamp |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-102) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » time | integer(int64) | Liquidation time |\
| » contract | string | Futures contract |\
| » leverage | string | Position leverage. Not returned in public endpoints. |\
| » size | integer(int64) | Position size |\
| » margin | string | Position margin. Not returned in public endpoints. |\
| » entry\_price | string | Average entry price. Not returned in public endpoints. |\
| » liq\_price | string | Liquidation price. Not returned in public endpoints. |\
| » mark\_price | string | Mark price. Not returned in public endpoints. |\
| » order\_id | integer(int64) | Liquidation order ID. Not returned in public endpoints. |\
| » order\_price | string | Liquidation order price |\
| » fill\_price | string | Liquidation order average taker price |\
| » left | integer(int64) | Liquidation order maker size |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/liquidates"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1548654951,\
    "contract": "BTC_USDT",\
    "size": 600,\
    "leverage": "25",\
    "margin": "0.006705256878",\
    "entry_price": "3536.123",\
    "liq_price": "3421.54",\
    "mark_price": "3420.27",\
    "order_id": 317393847,\
    "order_price": "3405",\
    "fill_price": "3424",\
    "left": 0\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-settlement-history) List settlement history\
\
`GET /delivery/{settle}/settlements`\
\
_List settlement history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| at | query | integer | false | Specify a settlement timestamp |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-103) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » time | integer(int64) | Liquidation time |\
| » contract | string | Futures contract |\
| » leverage | string | Position leverage |\
| » size | integer(int64) | Position size |\
| » margin | string | Position margin |\
| » entry\_price | string | Average entry price |\
| » settle\_price | string | Settled price |\
| » profit | string | Profit |\
| » fee | string | Fee deducted |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/settlements"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "time": 1548654951,\
    "contract": "BTC_USDT",\
    "size": 600,\
    "leverage": "25",\
    "margin": "0.006705256878",\
    "entry_price": "3536.123",\
    "settle_price": "3421.54",\
    "profit": "-6.87498",\
    "fee": "0.03079386"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-risk-limit-tiers-2) List risk limit tiers\
\
`GET /delivery/{settle}/risk_limit_tiers`\
\
_List risk limit tiers_\
\
When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array. This only takes effect when the 'contract' parameter is empty.\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| contract | query | string | false | Futures contract |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-104) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | \[Retrieve risk limit configurations for different tiers under a specified contract.\] |\
| » _None_ | object | Retrieve risk limit configurations for different tiers under a specified contract. |\
| »» tier | integer(int) | Tier |\
| »» risk\_limit | string | Position risk limit |\
| »» initial\_rate | string | Initial margin rate |\
| »» maintenance\_rate | string | Maintenance margin rate |\
| »» leverage\_max | string | Maximum leverage |\
| »» contract | string | Markets, visible only during market pagination requests |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/delivery/usdt/risk_limit_tiers'\
query_param = ''\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/delivery/usdt/risk_limit_tiers \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "maintenance_rate": "0.01",\
    "tier": 1,\
    "initial_rate": "0.02",\
    "leverage_max": "50",\
    "risk_limit": "500000",\
    "contract": "BTC_USDT"\
  },\
  {\
    "initial_rate": "0.03",\
    "maintenance_rate": "0.02",\
    "tier": 2,\
    "risk_limit": "1000000",\
    "leverage_max": "33.33",\
    "contract": "BTC_USDT"\
  },\
  {\
    "maintenance_rate": "0.01",\
    "tier": 1,\
    "initial_rate": "0.02",\
    "leverage_max": "50",\
    "risk_limit": "500000",\
    "contract": "ETH_USDT"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-a-price-triggered-order-3) Create a price-triggered order\
\
`POST /delivery/{settle}/price_orders`\
\
_Create a price-triggered order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder) | true | none |\
| » initial | body | object | true | none |\
| »» contract | body | string | true | Futures contract |\
| »» size | body | integer(int64) | false | Order size. Positive size means to buy, while negative one means to sell. Set to 0 to close the position |\
| »» price | body | string | true | Order price. Set to 0 to use market price |\
| »» close | body | boolean | false | Set to true if trying to close the position |\
| »» tif | body | string | false | Time in force. If using market price, only `ioc` is supported. |\
| »» text | body | string | false | The source of the order, including: |\
| »» reduce\_only | body | boolean | false | Set to true to create a reduce-only order |\
| »» auto\_size | body | string | false | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |\
| » trigger | body | object | true | none |\
| »» strategy\_type | body | integer(int32) | false | How the order will be triggered |\
| »» price\_type | body | integer(int32) | false | Price type. 0 - latest deal price, 1 - mark price, 2 - index price |\
| »» price | body | string | false | Value of price on price triggered, or price gap on price gap triggered |\
| »» rule | body | integer(int32) | false | Trigger condition type |\
| »» expiration | body | integer | false | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |\
| » order\_type | body | string | false | Take-profit/stop-loss types, which include: |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#detailed-descriptions-32) Detailed descriptions\
\
**»» tif**: Time in force. If using market price, only `ioc` is supported.\
\
- gtc: GoodTillCancelled\
- ioc: ImmediateOrCancelled\
\
**»» text**: The source of the order, including:\
\
- web: web\
- api: api\
- app: app\
\
**»» strategy\_type**: How the order will be triggered\
\
- `0`: by price, which means the order will be triggered if price condition is satisfied\
- `1`: by price gap, which means the order will be triggered if gap of recent two prices of specified `price_type` are satisfied.\
Only `0` is supported currently\
\
**»» rule**: Trigger condition type\
\
- `1`: calculated price based on `strategy_type` and `price_type` >= `price`\
- `2`: calculated price based on `strategy_type` and `price_type` <= `price`\
\
**» order\_type**: Take-profit/stop-loss types, which include:\
\
- `close-long-order`: order take-profit/stop-loss, close long position\
- `close-short-order`: order take-profit/stop-loss, close short position\
- `close-long-position`: position take-profit/stop-loss, close long position\
- `close-short-position`: position take-profit/stop-loss, close short position\
- `plan-close-long-position`: position planned take-profit/stop-loss, close long position\
- `plan-close-short-position`: position planned take-profit/stop-loss, close short position\
\
The order take-profit/stop-loss can not be passed by request. These two types are read only.\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-105) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| »» tif | gtc |\
| »» tif | ioc |\
| »» strategy\_type | 0 |\
| »» strategy\_type | 1 |\
| »» price\_type | 0 |\
| »» price\_type | 1 |\
| »» price\_type | 2 |\
| »» rule | 1 |\
| »» rule | 2 |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 201 | [Created(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created | Inline |\
\
### Response Schema\
\
Status Code **201**\
\
_TriggerOrderResponse_\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | integer(int64) | Auto order ID |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('POST', prefix + url, query_param, body)\
headers.update(sign_headers)\
r = requests.request('POST', host + prefix + url, headers=headers, data=body)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="POST"\
url="/delivery/usdt/price_orders"\
query_param=""\
body_param='{"initial":{"contract":"BTC_USDT","size":100,"price":"5.03"},"trigger":{"strategy_type":0,"price_type":0,"price":"3000","rule":1,"expiration":86400},"order_type":"close-long-order"}'\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url -d "$body_param" -H "Content-Type: application/json" \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Body parameter\
\
```\
{\
  "initial": {\
    "contract": "BTC_USDT",\
    "size": 100,\
    "price": "5.03"\
  },\
  "trigger": {\
    "strategy_type": 0,\
    "price_type": 0,\
    "price": "3000",\
    "rule": 1,\
    "expiration": 86400\
  },\
  "order_type": "close-long-order"\
}\
\
```\
\
> Example responses\
\
> 201 Response\
\
```\
{\
  "id": 1432329\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#list-all-price-triggered-orders-2) List All Price-triggered Orders\
\
`GET /delivery/{settle}/price_orders`\
\
_List All Price-triggered Orders_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| status | query | string | true | Only list the orders with this status |\
| contract | query | string | false | Futures contract, return related data only if specified |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-106) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| status | open |\
| status | finished |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[ [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/price_orders"\
query_param="status=open"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "initial": {\
      "contract": "BTC_USDT",\
      "size": 100,\
      "price": "5.03"\
    },\
    "trigger": {\
      "strategy_type": 0,\
      "price_type": 0,\
      "price": "3000",\
      "rule": 1,\
      "expiration": 86400\
    },\
    "id": 1283293,\
    "user": 1234,\
    "create_time": 1514764800,\
    "finish_time": 1514764900,\
    "trade_id": 13566,\
    "status": "finished",\
    "finish_as": "cancelled",\
    "reason": "",\
    "order_type": "close-long-order"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-all-price-triggered-orders-3) Cancel All Price-triggered Orders\
\
`DELETE /delivery/{settle}/price_orders`\
\
_Cancel All Price-triggered Orders_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | true | Futures contract |\
| settle | path | string | true | Settle currency |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-107) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted. Query order status by listing orders | \[ [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder)\] |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('DELETE', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('DELETE', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="DELETE"\
url="/delivery/usdt/price_orders"\
query_param="contract=BTC_USDT"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "initial": {\
      "contract": "BTC_USDT",\
      "size": 100,\
      "price": "5.03"\
    },\
    "trigger": {\
      "strategy_type": 0,\
      "price_type": 0,\
      "price": "3000",\
      "rule": 1,\
      "expiration": 86400\
    },\
    "id": 1283293,\
    "user": 1234,\
    "create_time": 1514764800,\
    "finish_time": 1514764900,\
    "trade_id": 13566,\
    "status": "finished",\
    "finish_as": "cancelled",\
    "reason": "",\
    "order_type": "close-long-order"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#get-a-price-triggered-order-3) Get a price-triggered order\
\
`GET /delivery/{settle}/price_orders/{order_id}`\
\
_Get a price-triggered order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Retrieve the data of the order with the specified ID |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-108) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/delivery/usdt/price_orders/string"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "initial": {\
    "contract": "BTC_USDT",\
    "size": 100,\
    "price": "5.03"\
  },\
  "trigger": {\
    "strategy_type": 0,\
    "price_type": 0,\
    "price": "3000",\
    "rule": 1,\
    "expiration": 86400\
  },\
  "id": 1283293,\
  "user": 1234,\
  "create_time": 1514764800,\
  "finish_time": 1514764900,\
  "trade_id": 13566,\
  "status": "finished",\
  "finish_as": "cancelled",\
  "reason": "",\
  "order_type": "close-long-order"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancel-a-price-triggered-order-3) cancel a price-triggered order\
\
`DELETE /delivery/{settle}/price_orders/{order_id}`\
\
_cancel a price-triggered order_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| settle | path | string | true | Settle currency |\
| order\_id | path | string | true | Retrieve the data of the order with the specified ID |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-109) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| settle | usdt |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [FuturesPriceTriggeredOrder](https://www.gate.io/docs/developers/apiv4/en/#schemafuturespricetriggeredorder) |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/options/my_settlements"\
query_param="underlying=BTC_USDT"\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url?$query_param"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "size": -1,\
    "settle_profit": "0",\
    "contract": "BTC_USDT-20220624-26000-C",\
    "strike_price": "26000",\
    "time": 1656057600,\
    "settle_price": "20917.461281337048",\
    "underlying": "BTC_USDT",\
    "realised_pnl": "-0.00116042",\
    "fee": "0"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#options-order-book) Options order book\
\
`GET /options/order_book`\
\
_Options order book_\
\
Bids will be sorted by price from high to low, while asks sorted reversely\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | true | Options contract name |\
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |\
| limit | query | integer | false | Maximum number of order depth data in asks or bids |\
| with\_id | query | boolean | false | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-110) Enumerated Values\
\
| Parameter | Value |\
| --- | --- |\
| interval | 0 |\
| interval | 0.1 |\
| interval | 0.01 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order book retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set `with_id=true` to include this field in response |\
| » current | number(double) | Response data generation timestamp |\
| » update | number(double) | Order book changed timestamp |\
| » asks | array | Asks order depth |\
| »» futures\_order\_book\_item | object | none |\
| »»» p | string | Price (quote currency) |\
| »»» s | integer(int64) | Size |\
| »» bids | array | Bids order depth |\
| »»» futures\_order\_book\_item | object | none |\
| »»»» p | string | Price (quote currency) |\
| »»»» s | integer(int64) | Size |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# coding: utf-8\
import requests\
\
host = "https://api.gateio.ws"\
prefix = "/api/v4"\
headers = {'Accept': 'application/json', 'Content-Type': 'application/json'}\
\
url = '/options/underlying/candlesticks'\
query_param = 'underlying=BTC_USDT'\
r = requests.request('GET', host + prefix + url + "?" + query_param, headers=headers)\
print(r.json())\
\
```\
\
```\
\
curl -X GET https://api.gateio.ws/api/v4/options/underlying/candlesticks?underlying=BTC_USDT \\
  -H 'Accept: application/json'\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "t": 1539852480,\
    "v": 97151,\
    "c": "1.032",\
    "h": "1.032",\
    "l": "1.032",\
    "o": "1.032",\
    "sum": "3580"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#options-trade-history) Options trade history\
\
`GET /options/trades`\
\
_Options trade history_\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| contract | query | string | false | Options contract name |\
| type | query | string(P) | false | `C` is call, while `P` is put |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| from | query | integer(int64) | false | Start timestamp |\
| to | query | integer(int64) | false | End timestamp |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| _None_ | array | none |\
| » id | integer(int64) | Trade ID |\
| » create\_time | number(double) | Trading time |\
| » create\_time\_ms | number(double) | Trading time, with milliseconds set to 3 decimal places. |\
| » contract | string | Futures contract |\
| » size | integer(int64) | Trading size |\
| » price | string | Trading price (quote currency) |\
| » is\_internal | boolean | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |\
\
This operation does not require authentication\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/account/rate_limit"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
[\
  {\
    "type": "spot",\
    "tier": "1",\
    "ratio": "0",\
    "main_ratio": "0",\
    "updated_at": "1728230400"\
  },\
  {\
    "type": "futures",\
    "tier": "1",\
    "ratio": "0",\
    "main_ratio": "0",\
    "updated_at": "1728230400"\
  }\
]\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#create-stp-group) Create STP Group\
\
`POST /account/stp_groups`\
\
_Create STP Group_\
\
Only the main account is allowed to create a new STP user group\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| body | body | object | true | none |\
| » id | body | integer(int64) | false | STP Group ID |\
| » name | body | string | true | STP Group name |\
| » creator\_id | body | integer(int64) | false | Creator ID |\
| » create\_time | body | integer(int64) | false | Creation time |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User added successfully. Returning the current users within the STP group. | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » id | integer(int64) | STP Group ID |\
| » name | string | STP Group name |\
| » creator\_id | integer(int64) | Creator ID |\
| » create\_time | integer(int64) | Creation time |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#rebate-2) Rebate\
\
broker rebate endpints\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#the-agency-obtains-the-transaction-history-of-the-recommended-user) The agency obtains the transaction history of the recommended user\
\
`GET /rebate/agency/transaction_history`\
\
_The agency obtains the transaction history of the recommended user_\
\
Record time range cannot exceed 30 days\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency\_pair | query | string | false | Specify the currency pair, if not specified, return all currency pairs |\
| user\_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |\
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » currency\_pair | string | Currency pair |\
| » total | integer(int64) | Total |\
| » list | array | List of transaction history |\
| »» AgencyTransaction | object | none |\
| »»» transaction\_time | integer(int64) | Transaction Time. (unix timestamp) |\
| »»» user\_id | integer(int64) | User ID |\
| »»» group\_name | string | Group name |\
| »»» fee | string | Fee |\
| »»» fee\_asset | string | Fee currency |\
| »»» currency\_pair | string | Currency pair |\
| »»» amount | string | Commission Amount |\
| »»» amount\_asset | string | Commission Asset |\
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/rebate/agency/transaction_history"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "total": 100,\
  "list": [\
    {\
      "transaction_time": 1539852480,\
      "user_id": 10000,\
      "group_name": "gateio",\
      "fee": "1",\
      "fee_asset": "GT",\
      "currency_pair": "GT_USDT",\
      "amount": "1000",\
      "source": "SPOT",\
      "amount_asset": "GT"\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#the-agency-obtains-the-commission-history-of-the-recommended-user) The agency obtains the commission history of the recommended user\
\
`GET /rebate/agency/commission_history`\
\
_The agency obtains the commission history of the recommended user_\
\
Record time range cannot exceed 30 days\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | false | Filter by currency. Return all currency records if not specified |\
| user\_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |\
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » currency\_pair | string | Currency pair |\
| » total | integer(int64) | Total |\
| » list | array | List of comission history |\
| »» AgencyCommission | object | none |\
| »»» commission\_time | integer(int64) | Commission Time. (unix timestamp) |\
| »»» user\_id | integer(int64) | User ID |\
| »»» group\_name | string | Group name |\
| »»» commission\_amount | string | Commission Amount |\
| »»» commission\_asset | string | Commission Asset |\
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/rebate/agency/commission_history"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "total": 100,\
  "list": [\
    {\
      "commission_time": 1539852480,\
      "user_id": 10000,\
      "group_name": "gateio",\
      "commission_amount": "1000",\
      "source": "SPOT",\
      "commission_asset": "GT"\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#partner-obtains-transaction-records-of-recommended-users) Partner obtains transaction records of recommended users\
\
`GET /rebate/partner/transaction_history`\
\
_Partner obtains transaction records of recommended users_\
\
Record time range cannot exceed 30 days\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency\_pair | query | string | false | Specify the currency pair, if not specified, return all currency pairs |\
| user\_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |\
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | integer(int64) | Total |\
| » list | array | List of transaction history |\
| »» PartnerTransaction | object | none |\
| »»» transaction\_time | integer(int64) | Transaction Time. (unix timestamp) |\
| »»» user\_id | integer(int64) | User ID |\
| »»» group\_name | string | Group name |\
| »»» fee | string | Fee |\
| »»» fee\_asset | string | Fee currency |\
| »»» currency\_pair | string | Currency pair |\
| »»» amount | string | Commission Amount |\
| »»» amount\_asset | string | Commission Asset |\
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/rebate/partner/transaction_history"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "total": 15,\
  "list": [\
    {\
      "user_id": 1879032535,\
      "group_name": "test",\
      "fee": "0.00044800",\
      "transaction_time": 1718615824,\
      "amount": "29.98688000USDT",\
      "amount_asset": "USDT",\
      "currency_pair": "BCH_USDT",\
      "source": "SPOT",\
      "fee_asset": "BCH"\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#partner-obtains-commission-records-of-recommended-users) Partner obtains commission records of recommended users\
\
`GET /rebate/partner/commission_history`\
\
_Partner obtains commission records of recommended users_\
\
Record time range cannot exceed 30 days\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| currency | query | string | false | Filter by currency. Return all currency records if not specified |\
| user\_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |\
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | integer(int64) | Total |\
| » list | array | List of comission history |\
| »» PartnerCommission | object | none |\
| »»» commission\_time | integer(int64) | Commission Time. (unix timestamp) |\
| »»» user\_id | integer(int64) | User ID |\
| »»» group\_name | string | Group name |\
| »»» commission\_amount | string | Commission Amount |\
| »»» commission\_asset | string | Commission Asset |\
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/rebate/partner/sub_list"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "total": 3,\
  "list": [\
    {\
      "user_id": 1,\
      "user_join_time": 1666255731,\
      "type": 1\
    },\
    {\
      "user_id": 2,\
      "user_join_time": 1666271213,\
      "type": 2\
    },\
    {\
      "user_id": 3,\
      "user_join_time": 1666422143,\
      "type": 3\
    }\
  ]\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#the-broker-obtains-the-user-s-commission-rebate-records) The broker obtains the user's commission rebate records\
\
`GET /rebate/broker/commission_history`\
\
_The broker obtains the user's commission rebate records_\
\
Record time range cannot exceed 30 days\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| user\_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |\
| from | query | integer(int64) | false | The start time of the query record. If not specified, the default is to push forward 30 days from the current time. |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | integer(int64) | Total |\
| » list | array | List of comission history |\
| »» BrokerCommission | object | none |\
| »»» commission\_time | integer(int64) | Commission Time. (unix timestamp) |\
| »»» user\_id | integer(int64) | User ID |\
| »»» group\_name | string | Group name |\
| »»» amount | string | The amount of commission rebates |\
| »»» fee | string | Fee |\
| »»» fee\_asset | string | Fee currency |\
| »»» rebate\_fee | string | The income from rebates, converted to USDT |\
| »»» source | string | Rebate Type: Spot、Futures、Options |\
| »»» currency\_pair | string | Currency pair |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/rebate/broker/commission_history"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "list": [\
    {\
      "user_id": 110285442,\
      "group_name": "",\
      "fee": "0.5000045000",\
      "transaction_time": 1702545051,\
      "amount": "-1000.00900000",\
      "currency_pair": "DOGE_USDT",\
      "source": "Futures",\
      "fee_asset": "USDT"\
    }\
  ],\
  "total": 47\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#the-broker-obtains-the-user-s-trading-history) The broker obtains the user's trading history\
\
`GET /rebate/broker/transaction_history`\
\
_The broker obtains the user's trading history_\
\
Record time range cannot exceed 30 days\
\
### Parameters\
\
| Name | In | Type | Required | Description |\
| --- | --- | --- | --- | --- |\
| limit | query | integer | false | Maximum number of records to be returned in a single list |\
| offset | query | integer | false | List offset, starting from 0 |\
| user\_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |\
| from | query | integer(int64) | false | The start time of the query record. If not specified, the default is to push forward 30 days from the current time. |\
| to | query | integer(int64) | false | Time range ending, default to current time |\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » total | integer(int64) | Total |\
| » list | array | List of transaction history |\
| »» BrokerTransaction | object | none |\
| »»» transaction\_time | integer(int64) | Transaction Time. (unix timestamp) |\
| »»» user\_id | integer(int64) | User ID |\
| »»» group\_name | string | Group name |\
| »»» fee | string | fee (usdt) |\
| »»» currency\_pair | string | Currency pair |\
| »»» amount | string | Commission Amount |\
| »»» fee\_asset | string | Fee currency |\
| »»» source | string | Rebate Type: Spot、Futures、Options |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# for `gen_sign` implementation, refer to section `Authentication` above\
sign_headers = gen_sign('GET', prefix + url, query_param)\
headers.update(sign_headers)\
r = requests.request('GET', host + prefix + url, headers=headers)\
print(r.json())\
\
```\
\
```\
key="YOUR_API_KEY"\
secret="YOUR_API_SECRET"\
host="https://api.gateio.ws"\
prefix="/api/v4"\
method="GET"\
url="/rebate/broker/transaction_history"\
query_param=""\
body_param=''\
timestamp=$(date +%s)\
body_hash=$(printf "$body_param" | openssl sha512 | awk '{print $NF}')\
sign_string="$method\n$prefix$url\n$query_param\n$body_hash\n$timestamp"\
sign=$(printf "$sign_string" | openssl sha512 -hmac "$secret" | awk '{print $NF}')\
\
full_url="$host$prefix$url"\
curl -X $method $full_url \\
    -H "Timestamp: $timestamp" -H "KEY: $key" -H "SIGN: $sign"\
\
```\
\
> Example responses\
\
> 200 Response\
\
```\
{\
  "list": [\
    {\
      "user_id": 110285442,\
      "group_name": "",\
      "fee": "0.5000045000",\
      "transaction_time": 1702545051,\
      "amount": "-1000.00900000",\
      "currency_pair": "DOGE_USDT",\
      "source": "Futures",\
      "fee_asset": "USDT"\
    }\
  ],\
  "total": 47\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#user-retrieves-rebate-information) User retrieves rebate information\
\
`GET /rebate/user/info`\
\
_User retrieves rebate information_\
\
### Responses\
\
| Status | Meaning | Description | Schema |\
| --- | --- | --- | --- |\
| 200 | [OK(opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |\
\
### Response Schema\
\
Status Code **200**\
\
| Name | Type | Description |\
| --- | --- | --- |\
| » _None_ | object | Retrieve user rebate information |\
| »» invite\_uid | integer(int64) | My inviter's UID |\
\
WARNING\
\
To perform this operation, you must be authenticated by API key and secret\
\
> Code samples\
\
```\


# [\#](https://www.gate.io/docs/developers/apiv4/en/\#schemas) Schemas\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#subaccountkey) SubAccountKey\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| user\_id | string | false | read-only | User ID |\
| mode | integer(int32) | false | none | Mode: 1 - classic 2 - portfolio account |\
| name | string | false | none | API key name |\
| perms | array | false | none | none |\
| » name | string | false | none | Permission function name (no value will be cleared)<br>\- wallet: wallet<br>\- spot: spot/leverage<br>\- futures: perpetual contract<br>\- delivery: delivery contract<br>\- earn: financial management<br>\- custody: custody<br>\- options: options<br>\- account: account information<br>\- loan: loan<br>\- margin: leverage<br>\- unified: unified account<br>\- copy: copy |\
| » read\_only | boolean | false | none | read only |\
| ip\_whitelist | array | false | none | ip white list (list will be removed if no value is passed) |\
| key | string | false | read-only | API Key |\
| state | integer(int32) | false | read-only | State 1 - normal 2 - locked 3 - frozen |\
| created\_at | integer(int64) | false | read-only | Creation time |\
| updated\_at | integer(int64) | false | read-only | Last update time |\
| last\_access | integer(int64) | false | read-only | Last access time |\
\
```\
{\
  "user_id": "string",\
  "mode": 0,\
  "name": "string",\
  "perms": [\
    {\
      "name": "string",\
      "read_only": true\
    }\
  ],\
  "ip_whitelist": [\
    "string"\
  ],\
  "key": "string",\
  "state": 0,\
  "created_at": 0,\
  "updated_at": 0,\
  "last_access": 0\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#estimaterate) EstimateRate\
\
_Estimate the current hourly lending rates, categorized by currency_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-2) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| **additionalProperties** | string | false | none | none |\
\
```\
{\
  "property1": "string",\
  "property2": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#currencypair) CurrencyPair\
\
_Spot currency pair_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-3) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| id | string | false | none | Currency pair |\
| base | string | false | none | Base currency |\
| base\_name | string | false | none | Transaction currency name |\
| quote | string | false | none | Quote currency |\
| quote\_name | string | false | none | Name of the denominated currency |\
| fee | string | false | none | Trading fee |\
| min\_base\_amount | string | false | none | Minimum amount of base currency to trade, `null` means no limit |\
| min\_quote\_amount | string | false | none | Minimum amount of quote currency to trade, `null` means no limit |\
| max\_base\_amount | string | false | none | Maximum amount of base currency to trade, `null` means no limit |\
| max\_quote\_amount | string | false | none | Maximum amount of quote currency to trade, `null` means no limit |\
| amount\_precision | integer | false | none | Amount scale |\
| precision | integer | false | none | Price scale |\
| trade\_status | string | false | none | How currency pair can be traded<br>\- untradable: cannot be bought or sold<br>\- buyable: can be bought<br>\- sellable: can be sold<br>\- tradable: can be bought or sold |\
| sell\_start | integer(int64) | false | none | Sell start unix timestamp in seconds |\
| buy\_start | integer(int64) | false | none | Buy start unix timestamp in seconds |\
| type | string | false | none | Trading pair type, normal: normal, premarket: pre-market |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-127) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| trade\_status | untradable |\
| trade\_status | buyable |\
| trade\_status | sellable |\
| trade\_status | tradable |\
\
```\
{\
  "id": "string",\
  "base": "string",\
  "base_name": "string",\
  "quote": "string",\
  "quote_name": "string",\
  "fee": "string",\
  "min_base_amount": "string",\
  "min_quote_amount": "string",\
  "max_base_amount": "string",\
  "max_quote_amount": "string",\
  "amount_precision": 0,\
  "precision": 0,\
  "trade_status": "untradable",\
  "sell_start": 0,\
  "buy_start": 0,\
  "type": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#order-2) Order\
\
_Spot order details_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-4) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| id | string | false | read-only | Order ID |\
| text | string | false | none | User defined information. If not empty, must follow the rules below:<br>1\. prefixed with `t-`<br>2\. no longer than 28 bytes without `t-` prefix<br>3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)<br>Besides user defined information, reserved contents are listed below, denoting how the order is created:<br>\- 101: from android<br>\- 102: from IOS<br>\- 103: from IPAD<br>\- 104: from webapp<br>\- 3: from web<br>\- 2: from apiv2<br>\- apiv4: from apiv4 |\
| amend\_text | string | false | read-only | The custom data that the user remarked when amending the order |\
| create\_time | string | false | read-only | Creation time of order |\
| update\_time | string | false | read-only | Last modification time of order |\
| create\_time\_ms | integer(int64) | false | read-only | Creation time of order (in milliseconds) |\
| update\_time\_ms | integer(int64) | false | read-only | Last modification time of order (in milliseconds) |\
| status | string | false | read-only | Order status<br>\- `open`: to be filled<br>\- `closed`: filled<br>\- `cancelled`: cancelled |\
| currency\_pair | string | true | none | Currency pair |\
| type | string | false | none | Order Type <br>\- limit : Limit Order<br>\- market : Market Order |\
| account | string | false | none | Account type, spot - spot account, margin - leveraged account, unified - unified account |\
| side | string | true | none | Order side |\
| amount | string | true | none | When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC`<br>When `type` is `market`, it refers to different currency according to `side`<br>\- `side` : `buy` means quote currency, `BTC_USDT` means `USDT`<br>\- `side` : `sell` means base currency， `BTC_USDT` means `BTC` |\
| price | string | false | none | Price can't be empty when `type` = `limit` |\
| time\_in\_force | string | false | none | Time in force<br>\- gtc: GoodTillCancelled<br>\- ioc: ImmediateOrCancelled, taker only<br>\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee<br>\- fok: FillOrKill, fill either completely or none<br>Only `ioc` and `fok` are supported when `type` = `market` |\
| iceberg | string | false | none | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |\
| auto\_borrow | boolean | false | write-only | Used in margin or cross margin trading to allow automatic loan of insufficient amount if balance is not enough. |\
| auto\_repay | boolean | false | none | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:<br>1\. This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.<br>2\. `auto_borrow` and `auto_repay` can be both set to true in one order. |\
| left | string | false | read-only | Amount left to fill |\
| filled\_amount | string | false | read-only | Amount traded to fill |\
| fill\_price | string | false | read-only | Total filled in quote currency. Deprecated in favor of `filled_total` |\
| filled\_total | string | false | read-only | Total filled in quote currency |\
| avg\_deal\_price | string | false | read-only | Average fill price |\
| fee | string | false | read-only | Fee deducted |\
| fee\_currency | string | false | read-only | Fee currency unit |\
| point\_fee | string | false | read-only | Points used to deduct fee |\
| gt\_fee | string | false | read-only | GT used to deduct fee |\
| gt\_maker\_fee | string | false | read-only | GT used to deduct maker fee |\
| gt\_taker\_fee | string | false | read-only | GT used to deduct taker fee |\
| gt\_discount | boolean | false | read-only | Whether GT fee discount is used |\
| rebated\_fee | string | false | read-only | Rebated fee |\
| rebated\_fee\_currency | string | false | read-only | Rebated fee currency unit |\
| stp\_id | integer | false | read-only | Orders between users in the same `stp_id` group are not allowed to be self-traded<br>1\. If the `stp_id` of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the `stp_act` of the taker.<br>2\. `stp_id` returns `0` by default for orders that have not been set for `STP group` |\
| stp\_act | string | false | none | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies<br>1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。<br>2\. When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。<br>3\. If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'<br>\- cn: Cancel newest, Cancel new orders and keep old ones<br>\- co: Cancel oldest, Cancel old orders and keep new ones<br>\- cb: Cancel both, Both old and new orders will be cancelled |\
| finish\_as | string | false | read-only | Order completion statuses include:<br>\- open: Awaiting processing<br>\- filled: Fully filled<br>\- cancelled: Cancelled by user<br>\- liquidate\_cancelled: Cancelled due to liquidation<br>\- small: Order quantity too small<br>\- depth\_not\_enough: Cancelled due to insufficient market depth<br>\- trader\_not\_enough: Cancelled due to insufficient counterparty<br>\- ioc: Not immediately filled because tif is set to ioc<br>\- poc: Not met the order strategy because tif is set to poc<br>\- fok: Not fully filled immediately because tif is set to fok<br>\- stp: Cancelled due to self-trade prevention<br>\- unknown: Unknown |\
| action\_mode | string | false | write-only | Processing Mode:<br>When placing an order, different fields are returned based on action\_mode. This field is only valid during the request and is not included in the response result<br>ACK: Asynchronous mode, only returns key order fields<br>RESULT: No clearing information<br>FULL: Full mode (default) |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-128) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| status | open |\
| status | closed |\
| status | cancelled |\
| type | limit |\
| type | market |\
| side | buy |\
| side | sell |\
| time\_in\_force | gtc |\
| time\_in\_force | ioc |\
| time\_in\_force | poc |\
| time\_in\_force | fok |\
| stp\_act | cn |\
| stp\_act | co |\
| stp\_act | cb |\
| stp\_act | - |\
| finish\_as | open |\
| finish\_as | filled |\
| finish\_as | cancelled |\
| finish\_as | liquidate\_cancelled |\
| finish\_as | depth\_not\_enough |\
| finish\_as | trader\_not\_enough |\
| finish\_as | small |\
| finish\_as | ioc |\
| finish\_as | poc |\
| finish\_as | fok |\
| finish\_as | stp |\
| finish\_as | unknown |\
\
```\
{\
  "id": "string",\
  "text": "string",\
  "amend_text": "string",\
  "create_time": "string",\
  "update_time": "string",\
  "create_time_ms": 0,\
  "update_time_ms": 0,\
  "status": "open",\
  "currency_pair": "string",\
  "type": "limit",\
  "account": "spot",\
  "side": "buy",\
  "amount": "string",\
  "price": "string",\
  "time_in_force": "gtc",\
  "iceberg": "string",\
  "auto_borrow": true,\
  "auto_repay": true,\
  "left": "string",\
  "filled_amount": "string",\
  "fill_price": "string",\
  "filled_total": "string",\
  "avg_deal_price": "string",\
  "fee": "string",\
  "fee_currency": "string",\
  "point_fee": "string",\
  "gt_fee": "string",\
  "gt_maker_fee": "string",\
  "gt_taker_fee": "string",\
  "gt_discount": true,\
  "rebated_fee": "string",\
  "rebated_fee_currency": "string",\
  "stp_id": 0,\
  "stp_act": "cn",\
  "finish_as": "open",\
  "action_mode": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#cancelbatchorder) CancelBatchOrder\
\
_Info of order to be cancelled_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-5) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| currency\_pair | string | true | none | Order currency pair |\
| id | string | true | none | Order ID or user custom ID.<br>Custom ID are accepted only within 30 minutes after order creation |\
| action\_mode | string | false | none | Processing Mode:<br>When placing an order, different fields are returned based on action\_mode. This field is only valid during the request and is not included in the response result<br>ACK: Asynchronous mode, only returns key order fields<br>RESULT: No clearing information<br>FULL: Full mode (default) |\
\
```\
{\
  "currency_pair": "string",\
  "id": "string",\
  "action_mode": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#batchamenditem) BatchAmendItem\
\
_Order information that needs to be modified_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-6) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| order\_id | string | true | none | The order ID returned upon successful creation or the custom ID specified by the user during creation (i.e., the 'text' field). |\
| currency\_pair | string | true | none | Currency pair |\
| account | string | false | none | Default spot, unified account and warehouse-by-store leverage account. |\
| amount | string | false | none | trade amount, only one of amount and price can be specified |\
| price | string | false | none | trade price, only one of amount and price can be specified |\
| amend\_text | string | false | none | Custom info during amending order |\
| action\_mode | string | false | none | Processing Mode:<br>When placing an order, different fields are returned based on action\_mode. This field is only valid during the request and is not included in the response result<br>ACK: Asynchronous mode, only returns key order fields<br>RESULT: No clearing information<br>FULL: Full mode (default) |\
\
```\
{\
  "order_id": "string",\
  "currency_pair": "string",\
  "account": "string",\
  "amount": "string",\
  "price": "string",\
  "amend_text": "string",\
  "action_mode": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#spotpricetriggeredorder) SpotPriceTriggeredOrder\
\
_Spot order detail_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-7) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| trigger | object | true | none | none |\
| » price | string | true | none | Trigger price |\
| » rule | string | true | none | Price trigger condition<br>\- >=: triggered when market price larger than or equal to `price` field<br>\- <=: triggered when market price less than or equal to `price` field |\
| » expiration | integer | true | none | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |\
| put | object | true | none | none |\
| » type | string | false | none | Order type，default to `limit`<br>\- limit : Limit Order<br>\- market : Market Order |\
| » side | string | true | none | Order side<br>\- buy: buy side<br>\- sell: sell side |\
| » price | string | true | none | Order price |\
| » amount | string | true | none | When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC`<br>When `type` is `market`, it refers to different currency according to `side`<br>\- `side` : `buy` means quote currency, `BTC_USDT` means `USDT`<br>\- `side` : `sell` means base currency， `BTC_USDT` means `BTC` |\
| » account | string | true | none | Trading account type. Portfolio margin account must set to `unified`<br>\- normal: spot trading<br>\- margin: margin trading<br>\- unified: unified trading |\
| » time\_in\_force | string | false | none | time\_in\_force<br>\- gtc: GoodTillCancelled<br>\- ioc: ImmediateOrCancelled, taker only |\
| » auto\_borrow | boolean | false | none | Whether to borrow coins automatically |\
| » auto\_repay | boolean | false | none | Whether to repay the loan automatically |\
| » text | string | false | none | The source of the order, including:<br>\- web: web<br>\- api: api<br>\- app: app |\
| id | integer(int64) | false | read-only | Auto order ID |\
| user | integer | false | read-only | User ID |\
| market | string | true | none | Currency pair |\
| ctime | integer(int64) | false | read-only | Creation time |\
| ftime | integer(int64) | false | read-only | Finished time |\
| fired\_order\_id | integer(int64) | false | read-only | ID of the newly created order on condition triggered |\
| status | string | false | read-only | Status<br>\- open: open<br>\- cancelled: being manually cancelled<br>\- finish: successfully executed<br>\- failed: failed to execute<br>\- expired - expired |\
| reason | string | false | read-only | Additional remarks on how the order was finished |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-129) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| rule | >= |\
| rule | <= |\
| type | limit |\
| type | market |\
| side | buy |\
| side | sell |\
| account | normal |\
| account | margin |\
| account | unified |\
| time\_in\_force | gtc |\
| time\_in\_force | ioc |\
\
```\
{\
  "trigger": {\
    "price": "string",\
    "rule": ">=",\
    "expiration": 0\
  },\
  "put": {\
    "type": "limit",\
    "side": "buy",\
    "price": "string",\
    "amount": "string",\
    "account": "normal",\
    "time_in_force": "gtc",\
    "auto_borrow": false,\
    "auto_repay": false,\
    "text": "string"\
  },\
  "id": 0,\
  "user": 0,\
  "market": "string",\
  "ctime": 0,\
  "ftime": 0,\
  "fired_order_id": 0,\
  "status": "string",\
  "reason": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#contract) Contract\
\
_Futures contract details_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-8) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| name | string | false | none | Futures contract |\
| type | string | false | none | Futures contract type |\
| quanto\_multiplier | string | false | none | Multiplier used in converting from invoicing to settlement currency |\
| leverage\_min | string | false | none | Minimum leverage |\
| leverage\_max | string | false | none | Maximum leverage |\
| maintenance\_rate | string | false | none | Maintenance rate of margin |\
| mark\_type | string | false | none | Mark price type, internal - based on internal trading, index - based on external index price |\
| mark\_price | string | false | none | Current mark price |\
| index\_price | string | false | none | Current index price |\
| last\_price | string | false | none | Last trading price |\
| maker\_fee\_rate | string | false | none | Maker fee rate, where negative means rebate |\
| taker\_fee\_rate | string | false | none | Taker fee rate |\
| order\_price\_round | string | false | none | Minimum order price increment |\
| mark\_price\_round | string | false | none | Minimum mark price increment |\
| funding\_rate | string | false | none | Current funding rate |\
| funding\_interval | integer | false | none | Funding application interval, unit in seconds |\
| funding\_next\_apply | number(double) | false | none | Next funding time |\
| risk\_limit\_base | string | false | none | Risk limit base,deprecated |\
| risk\_limit\_step | string | false | none | Step of adjusting risk limit,deprecated |\
| risk\_limit\_max | string | false | none | Maximum risk limit the contract allowed,deprecated,It is recommended to use /futures/{settle}/risk\_limit\_tiers to query risk limits. |\
| order\_size\_min | integer(int64) | false | none | Minimum order size the contract allowed |\
| order\_size\_max | integer(int64) | false | none | Maximum order size the contract allowed |\
| order\_price\_deviate | string | false | none | deviation between order price and current index price. If price of an order is denoted as order\_price, it must meet the following condition:<br> abs(order\_price - mark\_price) <= mark\_price \* order\_price\_deviate |\
| ref\_discount\_rate | string | false | none | Referral fee rate discount |\
| ref\_rebate\_rate | string | false | none | Referrer commission rate |\
| orderbook\_id | integer(int64) | false | none | Current orderbook ID |\
| trade\_id | integer(int64) | false | none | Current trade ID |\
| trade\_size | integer(int64) | false | none | Historical accumulated trade size |\
| position\_size | integer(int64) | false | none | Current total long position size |\
| config\_change\_time | number(double) | false | none | Last changed time of configuration |\
| in\_delisting | boolean | false | none | `in_delisting=true` And when position\_size>0, it means the contract is in the offline transition period<br>`in_delisting=true` And when position\_size=0, it means the contract is offline |\
| orders\_limit | integer | false | none | Maximum number of open orders |\
| enable\_bonus | boolean | false | none | Whether bouns is enabled |\
| enable\_credit | boolean | false | none | Whether portfolio margin account is enabled |\
| create\_time | number(double) | false | none | Created time of the contract |\
| funding\_cap\_ratio | string | false | none | The factor for the maximum of the funding rate. Maximum of funding rate = (1/market maximum leverage - maintenance margin rate) \* funding\_cap\_ratio |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-130) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| type | inverse |\
| type | direct |\
| mark\_type | internal |\
| mark\_type | index |\
\
```\
{\
  "name": "string",\
  "type": "inverse",\
  "quanto_multiplier": "string",\
  "leverage_min": "string",\
  "leverage_max": "string",\
  "maintenance_rate": "string",\
  "mark_type": "internal",\
  "mark_price": "string",\
  "index_price": "string",\
  "last_price": "string",\
  "maker_fee_rate": "string",\
  "taker_fee_rate": "string",\
  "order_price_round": "string",\
  "mark_price_round": "string",\
  "funding_rate": "string",\
  "funding_interval": 0,\
  "funding_next_apply": 0.1,\
  "risk_limit_base": "string",\
  "risk_limit_step": "string",\
  "risk_limit_max": "string",\
  "order_size_min": 0,\
  "order_size_max": 0,\
  "order_price_deviate": "string",\
  "ref_discount_rate": "string",\
  "ref_rebate_rate": "string",\
  "orderbook_id": 0,\
  "trade_id": 0,\
  "trade_size": 0,\
  "position_size": 0,\
  "config_change_time": 0.1,\
  "in_delisting": true,\
  "orders_limit": 0,\
  "enable_bonus": true,\
  "enable_credit": true,\
  "create_time": 0.1,\
  "funding_cap_ratio": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#position) Position\
\
_Futures position details_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-9) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| user | integer(int64) | false | read-only | User ID |\
| contract | string | false | read-only | Futures contract |\
| size | integer(int64) | false | read-only | Position size |\
| leverage | string | false | none | Position leverage. 0 means cross margin; positive number means isolated margin |\
| risk\_limit | string | false | none | Position risk limit |\
| leverage\_max | string | false | read-only | Maximum leverage under current risk limit |\
| maintenance\_rate | string | false | read-only | Maintenance rate under current risk limit |\
| value | string | false | read-only | Position value calculated in settlement currency |\
| margin | string | false | none | Position margin |\
| entry\_price | string | false | read-only | Entry price |\
| liq\_price | string | false | read-only | Liquidation price |\
| mark\_price | string | false | read-only | Current mark price |\
| initial\_margin | string | false | read-only | The initial margin occupied by the position, applicable to the portfolio margin account |\
| maintenance\_margin | string | false | read-only | Maintenance margin required for the position, applicable to portfolio margin account |\
| unrealised\_pnl | string | false | read-only | Unrealized PNL |\
| realised\_pnl | string | false | read-only | Realized PNL |\
| pnl\_pnl | string | false | read-only | Realized PNL - Position P/L |\
| pnl\_fund | string | false | read-only | Realized PNL - Funding Fees |\
| pnl\_fee | string | false | read-only | Realized PNL - Transaction Fees |\
| history\_pnl | string | false | read-only | History realized PNL |\
| last\_close\_pnl | string | false | read-only | PNL of last position close |\
| realised\_point | string | false | read-only | Realized POINT PNL |\
| history\_point | string | false | read-only | History realized POINT PNL |\
| adl\_ranking | integer | false | read-only | Ranking of auto deleveraging, a total of 1-5 grades, `1` is the highest, `5` is the lowest, and `6` is the special case when there is no position held or in liquidation |\
| pending\_orders | integer | false | read-only | Current open orders |\
| close\_order | object\|null | false | read-only | Current close order if any, or `null` |\
| » id | integer(int64) | false | none | Close order ID |\
| » price | string | false | none | Close order price |\
| » is\_liq | boolean | false | none | Is the close order from liquidation |\
| mode | string | false | none | Position mode, including:<br>\- `single`: dual mode is not enabled- `dual_long`: long position in dual mode- `dual_short`: short position in dual mode |\
| cross\_leverage\_limit | string | false | none | Cross margin leverage(valid only when `leverage` is 0) |\
| update\_time | integer(int64) | false | read-only | Last update time |\
| update\_id | integer(int64) | false | read-only | Update id. Each time the position is updated, the value will be +1. |\
| open\_time | integer(int64) | false | none | First Open Time |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-131) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| mode | single |\
| mode | dual\_long |\
| mode | dual\_short |\
\
```\
{\
  "user": 0,\
  "contract": "string",\
  "size": 0,\
  "leverage": "string",\
  "risk_limit": "string",\
  "leverage_max": "string",\
  "maintenance_rate": "string",\
  "value": "string",\
  "margin": "string",\
  "entry_price": "string",\
  "liq_price": "string",\
  "mark_price": "string",\
  "initial_margin": "string",\
  "maintenance_margin": "string",\
  "unrealised_pnl": "string",\
  "realised_pnl": "string",\
  "pnl_pnl": "string",\
  "pnl_fund": "string",\
  "pnl_fee": "string",\
  "history_pnl": "string",\
  "last_close_pnl": "string",\
  "realised_point": "string",\
  "history_point": "string",\
  "adl_ranking": 0,\
  "pending_orders": 0,\
  "close_order": {\
    "id": 0,\
    "price": "string",\
    "is_liq": true\
  },\
  "mode": "single",\
  "cross_leverage_limit": "string",\
  "update_time": 0,\
  "update_id": 0,\
  "open_time": 0\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futuresorder) FuturesOrder\
\
_Futures order details_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-10) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| id | integer(int64) | false | read-only | Futures order ID |\
| user | integer | false | read-only | User ID |\
| create\_time | number(double) | false | read-only | Creation time of order |\
| finish\_time | number(double) | false | read-only | Order finished time. Not returned if order is open |\
| finish\_as | string | false | read-only | How the order was finished.<br>\- filled: all filled<br>\- cancelled: manually cancelled<br>\- liquidated: cancelled because of liquidation<br>\- ioc: time in force is `IOC`, finish immediately<br>\- auto\_deleveraged: finished by ADL<br>\- reduce\_only: cancelled because of increasing position while `reduce-only` set- position\_closed: cancelled because of position close<br>\- position\_closed: canceled because the position was closed<br>\- reduce\_out: only reduce positions by excluding hard-to-fill orders<br>\- stp: cancelled because self trade prevention |\
| status | string | false | read-only | Order status<br>\- `open`: waiting to be traded<br>\- `finished`: finished |\
| contract | string | true | none | Futures contract |\
| size | integer(int64) | true | none | Order size. Specify positive number to make a bid, and negative number to ask |\
| iceberg | integer(int64) | false | none | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |\
| price | string | false | none | Order price. 0 for market order with `tif` set as `ioc` |\
| close | boolean | false | write-only | Set as `true` to close the position, with `size` set to 0 |\
| is\_close | boolean | false | read-only | Is the order to close position |\
| reduce\_only | boolean | false | write-only | Set as `true` to be reduce-only order |\
| is\_reduce\_only | boolean | false | read-only | Is the order reduce-only |\
| is\_liq | boolean | false | read-only | Is the order for liquidation |\
| tif | string | false | none | Time in force<br>\- gtc: GoodTillCancelled<br>\- ioc: ImmediateOrCancelled, taker only<br>\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee<br>\- fok: FillOrKill, fill either completely or none |\
| left | integer(int64) | false | read-only | Size left to be traded |\
| fill\_price | string | false | read-only | Fill price of the order |\
| text | string | false | none | User defined information. If not empty, must follow the rules below:<br>1\. prefixed with `t-`<br>2\. no longer than 28 bytes without `t-` prefix<br>3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)<br>Besides user defined information, reserved contents are listed below, denoting how the order is created:<br>\- web: from web<br>\- api: from API<br>\- app: from mobile phones<br>\- auto\_deleveraging: from ADL<br>\- liquidation: from liquidation<br>\- insurance: from insurance |\
| tkfr | string | false | read-only | Taker fee |\
| mkfr | string | false | read-only | Maker fee |\
| refu | integer | false | read-only | Reference user ID |\
| auto\_size | string | false | write-only | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |\
| stp\_id | integer | false | read-only | Orders between users in the same `stp_id` group are not allowed to be self-traded<br>1\. If the `stp_id` of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the `stp_act` of the taker.<br>2\. `stp_id` returns `0` by default for orders that have not been set for `STP group` |\
| stp\_act | string | false | none | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies<br>1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。<br>2\. When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。<br>3\. If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'<br>\- cn: Cancel newest, Cancel new orders and keep old ones<br>\- co: Cancel oldest, Cancel old orders and keep new ones<br>\- cb: Cancel both, Both old and new orders will be cancelled |\
| amend\_text | string | false | read-only | The custom data that the user remarked when amending the order |\
| biz\_info | string | false | read-only | Additional information |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-132) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| finish\_as | filled |\
| finish\_as | cancelled |\
| finish\_as | liquidated |\
| finish\_as | ioc |\
| finish\_as | auto\_deleveraged |\
| finish\_as | reduce\_only |\
| finish\_as | position\_closed |\
| finish\_as | reduce\_out |\
| finish\_as | stp |\
| status | open |\
| status | finished |\
| tif | gtc |\
| tif | ioc |\
| tif | poc |\
| tif | fok |\
| auto\_size | close\_long |\
| auto\_size | close\_short |\
| stp\_act | co |\
| stp\_act | cn |\
| stp\_act | cb |\
| stp\_act | - |\
\
```\
{\
  "id": 0,\
  "user": 0,\
  "create_time": 0.1,\
  "finish_time": 0.1,\
  "finish_as": "filled",\
  "status": "open",\
  "contract": "string",\
  "size": 0,\
  "iceberg": 0,\
  "price": "string",\
  "close": false,\
  "is_close": true,\
  "reduce_only": false,\
  "is_reduce_only": true,\
  "is_liq": true,\
  "tif": "gtc",\
  "left": 0,\
  "fill_price": "string",\
  "text": "string",\
  "tkfr": "string",\
  "mkfr": "string",\
  "refu": 0,\
  "auto_size": "close_long",\
  "stp_id": 0,\
  "stp_act": "co",\
  "amend_text": "string",\
  "biz_info": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#batchamendorderreq) BatchAmendOrderReq\
\
_Modify contract order parameters_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-11) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| order\_id | integer(int64) | false | none | Order id, order\_id and text must contain at least one |\
| text | string | false | none | User-defined order text, at least one of order\_id and text must be passed |\
| size | integer(int64) | false | none | The new order size, including the executed order size.<br>\- If it is less than or equal to the executed quantity, the order will be cancelled.<br>\- The new order direction must be consistent with the original one.<br>\- The size of the closing order cannot be modified.<br>\- For orders that only reduce positions, if the size is increased, other orders that only reduce positions may be kicked out.<br>\- If the price is not modified, reducing the size will not affect the depth of the queue, and increasing the size will place it at the end of the current price. |\
| price | string | false | none | New order price. |\
| amend\_text | string | false | none | Custom info during amending order |\
\
```\
{\
  "order_id": 0,\
  "text": "string",\
  "size": 0,\
  "price": "string",\
  "amend_text": "string"\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#futurespricetriggeredorder) FuturesPriceTriggeredOrder\
\
_Futures order details_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-12) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| initial | object | true | none | none |\
| » contract | string | true | none | Futures contract |\
| » size | integer(int64) | false | none | Order size. Positive size means to buy, while negative one means to sell. Set to 0 to close the position |\
| » price | string | true | none | Order price. Set to 0 to use market price |\
| » close | boolean | false | write-only | Set to true if trying to close the position |\
| » tif | string | false | none | Time in force. If using market price, only `ioc` is supported.<br>\- gtc: GoodTillCancelled<br>\- ioc: ImmediateOrCancelled |\
| » text | string | false | none | The source of the order, including:<br>\- web: web<br>\- api: api<br>\- app: app |\
| » reduce\_only | boolean | false | none | Set to true to create a reduce-only order |\
| » auto\_size | string | false | write-only | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |\
| » is\_reduce\_only | boolean | false | read-only | Is the order reduce-only |\
| » is\_close | boolean | false | read-only | Is the order to close position |\
| trigger | object | true | none | none |\
| » strategy\_type | integer(int32) | false | none | How the order will be triggered<br> \- `0`: by price, which means the order will be triggered if price condition is satisfied<br> \- `1`: by price gap, which means the order will be triggered if gap of recent two prices of specified `price_type` are satisfied. <br>Only `0` is supported currently |\
| » price\_type | integer(int32) | false | none | Price type. 0 - latest deal price, 1 - mark price, 2 - index price |\
| » price | string | false | none | Value of price on price triggered, or price gap on price gap triggered |\
| » rule | integer(int32) | false | none | Trigger condition type<br>\- `1`: calculated price based on `strategy_type` and `price_type` >= `price`<br>\- `2`: calculated price based on `strategy_type` and `price_type` <= `price` |\
| » expiration | integer | false | none | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |\
| id | integer(int64) | false | read-only | Auto order ID |\
| user | integer | false | read-only | User ID |\
| create\_time | number(double) | false | read-only | Creation time |\
| finish\_time | number(double) | false | read-only | Finished time |\
| trade\_id | integer(int64) | false | read-only | ID of the newly created order on condition triggered |\
| status | string | false | read-only | Auto order status<br>\- `open`: order is active<br>\- `finished`: order is finished<br>\- `inactive`: order is not active, only for close-long-order or close-short-order<br>\- `invalid`: order is invalid, only for close-long-order or close-short-order |\
| finish\_as | string | false | read-only | How order is finished |\
| reason | string | false | read-only | Additional remarks on how the order was finished |\
| order\_type | string | false | none | Take-profit/stop-loss types, which include:<br>\- `close-long-order`: order take-profit/stop-loss, close long position<br>\- `close-short-order`: order take-profit/stop-loss, close short position<br>\- `close-long-position`: position take-profit/stop-loss, close long position<br>\- `close-short-position`: position take-profit/stop-loss, close short position<br>\- `plan-close-long-position`: position planned take-profit/stop-loss, close long position<br>\- `plan-close-short-position`: position planned take-profit/stop-loss, close short position<br>The order take-profit/stop-loss can not be passed by request. These two types are read only. |\
| me\_order\_id | integer(int64) | false | read-only | Corresponding order ID of order take-profit/stop-loss. |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-133) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| tif | gtc |\
| tif | ioc |\
| strategy\_type | 0 |\
| strategy\_type | 1 |\
| price\_type | 0 |\
| price\_type | 1 |\
| price\_type | 2 |\
| rule | 1 |\
| rule | 2 |\
| status | open |\
| status | finished |\
| status | inactive |\
| status | invalid |\
| finish\_as | cancelled |\
| finish\_as | succeeded |\
| finish\_as | failed |\
| finish\_as | expired |\
\
```\
{\
  "initial": {\
    "contract": "string",\
    "size": 0,\
    "price": "string",\
    "close": false,\
    "tif": "gtc",\
    "text": "string",\
    "reduce_only": false,\
    "auto_size": "string",\
    "is_reduce_only": true,\
    "is_close": true\
  },\
  "trigger": {\
    "strategy_type": 0,\
    "price_type": 0,\
    "price": "string",\
    "rule": 1,\
    "expiration": 0\
  },\
  "id": 0,\
  "user": 0,\
  "create_time": 0.1,\
  "finish_time": 0.1,\
  "trade_id": 0,\
  "status": "open",\
  "finish_as": "cancelled",\
  "reason": "string",\
  "order_type": "string",\
  "me_order_id": 0\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#deliverycontract) DeliveryContract\
\
_Futures contract details_\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-13) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| name | string | false | none | Futures contract |\
| underlying | string | false | none | Underlying |\
| cycle | string | false | none | Cycle type, e.g. WEEKLY, QUARTERLY |\
| type | string | false | none | Futures contract type |\
| quanto\_multiplier | string | false | none | Multiplier used in converting from invoicing to settlement currency |\
| leverage\_min | string | false | none | Minimum leverage |\
| leverage\_max | string | false | none | Maximum leverage |\
| maintenance\_rate | string | false | none | Maintenance rate of margin |\
| mark\_type | string | false | none | Mark price type, internal - based on internal trading, index - based on external index price |\
| mark\_price | string | false | none | Current mark price |\
| index\_price | string | false | none | Current index price |\
| last\_price | string | false | none | Last trading price |\
| maker\_fee\_rate | string | false | none | Maker fee rate, where negative means rebate |\
| taker\_fee\_rate | string | false | none | Taker fee rate |\
| order\_price\_round | string | false | none | Minimum order price increment |\
| mark\_price\_round | string | false | none | Minimum mark price increment |\
| basis\_rate | string | false | none | Fair basis rate |\
| basis\_value | string | false | none | Fair basis value |\
| basis\_impact\_value | string | false | none | Funding used for calculating impact bid, ask price |\
| settle\_price | string | false | none | Settle price |\
| settle\_price\_interval | integer | false | none | Settle price update interval |\
| settle\_price\_duration | integer | false | none | Settle price update duration in seconds |\
| expire\_time | integer(int64) | false | none | Contract expiry timestamp |\
| risk\_limit\_base | string | false | none | Risk limit base |\
| risk\_limit\_step | string | false | none | Step of adjusting risk limit |\
| risk\_limit\_max | string | false | none | Maximum risk limit the contract allowed |\
| order\_size\_min | integer(int64) | false | none | Minimum order size the contract allowed |\
| order\_size\_max | integer(int64) | false | none | Maximum order size the contract allowed |\
| order\_price\_deviate | string | false | none | deviation between order price and current index price. If price of an order is denoted as order\_price, it must meet the following condition:<br> abs(order\_price - mark\_price) <= mark\_price \* order\_price\_deviate |\
| ref\_discount\_rate | string | false | none | Referral fee rate discount |\
| ref\_rebate\_rate | string | false | none | Referrer commission rate |\
| orderbook\_id | integer(int64) | false | none | Current orderbook ID |\
| trade\_id | integer(int64) | false | none | Current trade ID |\
| trade\_size | integer(int64) | false | none | Historical accumulated trade size |\
| position\_size | integer(int64) | false | none | Current total long position size |\
| config\_change\_time | number(double) | false | none | Last changed time of configuration |\
| in\_delisting | boolean | false | none | Contract is delisting |\
| orders\_limit | integer | false | none | Maximum number of open orders |\
\
#### [\#](https://www.gate.io/docs/developers/apiv4/en/\#enumerated-values-134) Enumerated Values\
\
| Property | Value |\
| --- | --- |\
| cycle | WEEKLY |\
| cycle | BI-WEEKLY |\
| cycle | QUARTERLY |\
| cycle | BI-QUARTERLY |\
| type | inverse |\
| type | direct |\
| mark\_type | internal |\
| mark\_type | index |\
\
```\
{\
  "name": "string",\
  "underlying": "string",\
  "cycle": "WEEKLY",\
  "type": "inverse",\
  "quanto_multiplier": "string",\
  "leverage_min": "string",\
  "leverage_max": "string",\
  "maintenance_rate": "string",\
  "mark_type": "internal",\
  "mark_price": "string",\
  "index_price": "string",\
  "last_price": "string",\
  "maker_fee_rate": "string",\
  "taker_fee_rate": "string",\
  "order_price_round": "string",\
  "mark_price_round": "string",\
  "basis_rate": "string",\
  "basis_value": "string",\
  "basis_impact_value": "string",\
  "settle_price": "string",\
  "settle_price_interval": 0,\
  "settle_price_duration": 0,\
  "expire_time": 0,\
  "risk_limit_base": "string",\
  "risk_limit_step": "string",\
  "risk_limit_max": "string",\
  "order_size_min": 0,\
  "order_size_max": 0,\
  "order_price_deviate": "string",\
  "ref_discount_rate": "string",\
  "ref_rebate_rate": "string",\
  "orderbook_id": 0,\
  "trade_id": 0,\
  "trade_size": 0,\
  "position_size": 0,\
  "config_change_time": 0.1,\
  "in_delisting": true,\
  "orders_limit": 0\
}\
\
```\
\
## [\#](https://www.gate.io/docs/developers/apiv4/en/\#debitfee) DebitFee\
\
### [\#](https://www.gate.io/docs/developers/apiv4/en/\#properties-14) Properties\
\
| Name | Type | Required | Restrictions | Description |\
| --- | --- | --- | --- | --- |\
| enabled | boolean | true | none | Whether GT fee discount is used |\
\
```\
{\
  "enabled": true\
}\
\
```\
\
Last Updated:1/17/2025, 2:16:19 AM