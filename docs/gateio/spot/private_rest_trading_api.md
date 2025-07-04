# [#](#gate-api-v4-v4-75-0) Gate API v4 v4.75.0

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

# [#](#general) General

## [#](#matching-mechanism) Matching mechanism

### [#](#matching-priority) Matching priority

Gate.io Order matching follows Price Priority > Time priority principle.

Suppose that the order book is as follows：

| Order | Order time | Ask/Selling price |
| ----- | ---------- | ----------------- |
| A     | 10:00      | 100               |
| B     | 10:00      | 102               |
| C     | 10:01      | 100               |

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

| API Classification             | Category Links    | Overview                                                                                      |
| ------------------------------ | ----------------- | --------------------------------------------------------------------------------------------- |
| host + `/api/v4/spot/*`        | Spot Trading      | Including currency status, market information, order, transaction records and other functions |
| host + `/api/v4/margin/*`      | Margin Trading    | Margin account management, lending, repayment, etc                                            |
| host + `/api/v4/wallet/*`      | Wallet Management | Charge and withdrawal records, balance inquiries, fund transfers, etc.                        |
| host + `/api/v4/withdrawals/*` | Withdrawal        | Withdrawal of digital currency                                                                |

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

| Name                                                           | Path                         | Deprecated | New Path |
| -------------------------------------------------------------- | ---------------------------- | ---------- | -------- |
| Margin account list                                            | GET /margin/accounts         | No         | `-`      |
| List margin account balance change history                     | GET /margin/account_book     | No         | `-`      |
| Funding account list                                           | GET /margin/funding_accounts | No         | `-`      |
| Update user's auto repayment setting                           | POST /margin/auto_repay      | No         | `-`      |
| Querying user's automatic repayment settings                   | GET /margin/auto_repay       | No         | `-`      |
| Get the max transferable amount for a specific margin currency | GET /margin/transferable     | No         | `-`      |

The margin lending and borrowing related APIs have been migrated to the
`/margin/uni` API group：

| Name                                                          | Old Path                                   | Deprecated | New Path                                       |
| ------------------------------------------------------------- | ------------------------------------------ | ---------- | ---------------------------------------------- |
| List all supported currency pairs supported in margin trading | GET /margin/currency_pairs                 | Yes        | GET /margin/uni/currency_pairs                 |
| Query one single margin currency pair                         | GET /margin/currency_pairs/{currency_pair} | Yes        | GET /margin/uni/currency_pairs/{currency_pair} |
| Lend or borrow                                                | POST /margin/loans                         | Yes        | POST /margin/uni/loans                         |
| Retrieve one single loan detail                               | GET /margin/loans/{loan_id}                | Yes        | `-`                                            |
| List all loans                                                | GET /margin/loans                          | Yes        | GET /margin/uni/loans                          |
| Repay a loan                                                  | POST /margin/loans/{loan_id}/repayment     | Yes        | POST /margin/uni/loans                         |
| List loan repayment records                                   | GET /margin/loans/{loan_id}/repayment      | Yes        | GET /margin/uni/loan_records                   |
| Get the max borrowable amount for a specific margin currency  | GET /margin/borrowable                     | Yes        | GET /margin/uni/borrowable                     |
| List interest records                                         | `-`                                        | `-`        | GET /margin/uni/interest_records               |

The earn related APIs have been migrated to the `/earn/uni` API group):

| Name                                                          | Old Path                                    | Deprecated | New Path                            |
| ------------------------------------------------------------- | ------------------------------------------- | ---------- | ----------------------------------- |
| List all supported currency pairs supported in margin trading | GET /margin/currency_pairs                  | Yes        | GET /earn/uni/currencies            |
| Query one single margin currency pair                         | GET /margin/currency_pairs/{currency_pair}  | Yes        | GET /earn/uni/currencies/{currency} |
| Lend or borrow                                                | POST /margin/loans                          | Yes        | POST /earn/uni/lends                |
| List all loans                                                | GET /margin/loans                           | Yes        | GET /earn/uni/lends                 |
| Order book of lending loans                                   | GET /margin/funding_book                    | Yes        | \-                                  |
| Merge multiple lending loans                                  | POST /margin/merged_loans                   | Yes        | \-                                  |
| Modify a loan                                                 | PATCH /margin/loans/{loan_id}               | Yes        | PATCH /earn/uni/lends               |
| Cancel lending loan                                           | DELETE /margin/loans/{loan_id}              | Yes        | POST /earn/uni/lends                |
| List repayment records of a specific loan                     | GET /margin/loan_records                    | Yes        | GET /earn/uni/lend_records          |
| Get one single loan record                                    | GET /margin/loan_records/{loan_record_id}   | Yes        | `-`                                 |
| Modify a loan record                                          | PATCH /margin/loan_records/{loan_record_id} | Yes        | `-`                                 |
| List interest records                                         | `-`                                         | `-`        | GET /earn/uni/interest_records      |

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

```
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

| Markets              | Endpoints         | Limits                                | Based On | Include                              |
| -------------------- | ----------------- | ------------------------------------- | -------- | ------------------------------------ |
| All public endpoints | Public endpoints  | 200r/10s per endpoint                 | IP       | Orderbook, Candlestick, Ticker, etc. |
| Wallet               | Private endpoints | Withdrawal(POST /withdrawals) : 1r/3s |

Transfer between trading accounts (POST /wallet/transfers) 80r/10s  
Transfer between main and sub accounts (POST /wallet/sub_account_transfers)
80r/10s  
Transfer from a sub-account to another sub-account (POST
/wallet/sub_account_to_sub_account) 80r/10s  
Retrieve user's total balances (GET /wallet/total_balance) 80r/10s  
Retrieve sub account balances (GET /wallet/sub_account_balances) 80r/10s  
Query sub accounts' margin balances (GET /wallet/sub_account_margin_balances)
80r/10s  
Query sub accounts' futures account balances (GET
/wallet/sub_account_futures_balances) 80r/10s  
Query subaccount's cross_margin account info(GET
/wallet/sub_account_cross_margin_balances) 80r/10s  
The Others: 200r/10s per endpoint  
 | UID | Withdrawal.  
Query personal account balance.  
Query subaccount balance.  
 | | Spot | Private endpoints | The rate limit for batch/single order placement
and amend an order are total of 10r/s (UID+Market)  
The rate limit for batch/single order cancellation is total of 200r/s  
The Others: 200r/10s per endpoint  
 | UID | Spot order placement and cancellation.  
Trade history and fee rates.  
 | | Perpetual Futures | Private endpoints | The rate limit for batch/single
order placement and amend an order are total of 100r/s  
The maximum rate limit for the order cancellation (bulk/single) is 200r/s  
The Others: 200r/10s per endpoint  
 | UID | Futures order placement and cancellation  
Trade history and fee rates  
 | | Delivery | Private endpoints | The maximum rate limit for the order
placement (bulk/single) is 500r/10s  
The maximum rate limit for the order cancellation (bulk/single) is 500r/10s  
The Others: 200r/10s per endpoint  
 | UID | Order placement and cancellation  
 | | Options | Private endpoints | The maximum rate limit for the order
placement (bulk/single) is 200r/s  
The maximum rate limit for the order cancellation (bulk/single) is 200r/s  
The Others: 200r/10s per endpoint  
 | UID | Order placement and cancellation  
 | | Subaccount | Private endpoints | 80r/10s per endpoint | UID | Create a
sub-account.  
Retrieve the list of sub-accounts.  
Disable or enable API key for a sub-account.  
 | | Unified | Private endpoints | Borrow or repay 15/10s | UID | Borrow or
repay(POST /unified/loans)  
 | | Other Private endpoints | Private endpoints | 150r/10s per endpoint | UID |
Earning, collateral etc |

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

- Spot: The rate limit for batch/single order placement and amend an order are
  total of 10r/s (Market)
- Futures: The rate limit for batch/single order placement, amend an order and
  order cancellation (batch/single) are total of 100r/s
- Other: Unlimited

## [#](#return-format) Return Format

All API responses are in JSON format, and users need to transform and extract
data by themselves.

The HTTP status code 2XX will be returned when all operations are successful.
401 indicates that there is a problem with the certification. Other 4xx status
codes indicate that the request is invalid. If it is a 5xx error, the server has
encountered an unknown serious error when processing the request. Please give
feedback as soon as possible。

**Return Status**

| Status Code | Description                                                    |
| ----------- | -------------------------------------------------------------- |
| 200/201     | Request succeeded                                              |
| 202         | Request accepted by the server, but processing is not done yet |
| 204         | Request succeeded, but the server doesn't return body          |
| 400         | Invalid request                                                |
| 401         | Authentication failed                                          |
| 404         | Not found                                                      |
| 429         | Too many requests                                              |
| 5xx         | Server error                                                   |

## [#](#data-type) Data Type

| Type             | Description                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| `string`         | String type, in double quotation marks. Price and amount are also formatted in string format |
| `integer`        | 32-bit integer，Mainly related to status codes, size, times, etc.                            |
| `integer(int64)` | 64-bit integer，Mainly involves ID and higher precision timestamp                            |
| `float`          | Floating point number. Some time and stat fields use float.                                  |
| `object`         | Object，Contains a child object{}                                                            |
| `array`          | List，Includes multiple groups of content                                                    |
| `boolean`        | true is true，false is false                                                                 |

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

```
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

## [#](#request-id) Request ID

It is allowed to set an X-Client-Request-Id header in the request, and the API
will also carry this header in the response. You can use this field to locate
the corresponding request that the API responds to, which is convenient for
users to set the request id for tracking.

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

```
POST /futures/{settle}/orders
```

New request body parameter:

| Name    | Position | Type   | Required | Description                |
| ------- | -------- | ------ | -------- | -------------------------- |
| stp_act | body     | string | No       | STP Strategies, including: |

\- cn  
\- co  
\- cb |

New response fields:

| Name    | Type   | Required | Restriction | Description                 |
| ------- | ------ | -------- | ----------- | --------------------------- |
| stp_act | string | No       | none        | STP Strategies, including： |

\- cn  
\- co  
\- cb | | stp_id | integer(int64) | No | readonly | The ID of the STP trading
group to which user belongs. | | finish_as | string | No | readonly | order
finish type:  
\- **stp: The order has been canceled due to the `STP`** |

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

```
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

```
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

```
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

```
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

```
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

| Name                          | Cross Margin                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| portfolio_margin_total_equity | Account Equity = ∑(Equity \* Index Price）                                                                                      |
| total_margin_balance          | Account Margin Balance = ∑(Positive Equity x Index Price x Adjustment Factor) + ∑(Negative Equity x Index Price) - Haircut Loss |
| total_initial_margin_rate     | Account Initial Margin Level = Account Margin Balance / Account Initial Margin                                                  |
| total_maintenance_margin_rate | Account Maintenance Margin Level = Account Margin Balance / Account Maintenance Margin                                          |
| total_initial_margin          | Account Initial Margin = Total Liabilities x Spot Initial Margin Rate                                                           |
| total_maintenance_margin      | Account Maintenance Margin = Total Liabilities x Spot Maintenance Margin Rate                                                   |
| equity                        | Equity = Coin Balance - Borrowed                                                                                                |
| available                     | Available Balance = Principal + Borrowed                                                                                        |
| freeze                        | Occupied = Assets Occupied by Spot Open Orders                                                                                  |

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

## [#](#error-handling) Error Handling

For all abnormal requests, APIv4 will return non-2xx status code, with a
response body in JSON format to explain the error.

The error response body follows a format like:

```
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

or with
[Python SDK (opens new window)](https://github.com/gateio/gateapi-python):

## [#](#label-list) `label` list

- Request parameter or format related

| `label`                | Meaning                       |
| ---------------------- | ----------------------------- |
| INVALID_PARAM_VALUE    | Invalid parameter value       |
| INVALID_PROTOCOL       | Invalid parameter value       |
| INVALID_ARGUMENT       | Invalid argument              |
| INVALID_REQUEST_BODY   | Invalid request body          |
| MISSING_REQUIRED_PARAM | Missing required parameter    |
| BAD_REQUEST            | Invalid request               |
| INVALID_CONTENT_TYPE   | Invalid `Content-Type` header |
| NOT_ACCEPTABLE         | Invalid `Accept-` Header      |
| METHOD_NOT_ALLOWED     | Request method is not allowed |
| NOT_FOUND              | Request URL not exists        |

- Authentication related

| `label`                 | Meaning                                         |
| ----------------------- | ----------------------------------------------- |
| INVALID_CREDENTIALS     | Invalid credentials provided                    |
| INVALID_KEY             | Invalid API Key                                 |
| IP_FORBIDDEN            | Request IP not in whitelist                     |
| READ_ONLY               | API key is read-only                            |
| INVALID_SIGNATURE       | Invalid signature                               |
| MISSING_REQUIRED_HEADER | Missing required authentication header          |
| REQUEST_EXPIRED         | Request `Timestamp` is far from the server time |
| ACCOUNT_LOCKED          | Account is locked                               |
| FORBIDDEN               | Account has no permission to request operation  |

- Wallet related

| `label`                        | Meaning                                               |
| ------------------------------ | ----------------------------------------------------- |
| SUB_ACCOUNT_NOT_FOUND          | Sub account not found                                 |
| SUB_ACCOUNT_LOCKED             | Sub account is locked                                 |
| MARGIN_BALANCE_EXCEPTION       | Abnormal margin account                               |
| MARGIN_TRANSFER_FAILED         | Failed to transfer with margin account                |
| TOO_MUCH_FUTURES_AVAILABLE     | Futures balance exceeds max allowed                   |
| FUTURES_BALANCE_NOT_ENOUGH     | Futures balance not enough                            |
| ACCOUNT_EXCEPTION              | Abnormal account                                      |
| SUB_ACCOUNT_TRANSFER_FAILED    | Failed to transfer with sub account                   |
| ADDRESS_NOT_USED               | Address never being used in web console               |
| TOO_FAST                       | Withdrawing request exceeds frequency limit           |
| WITHDRAWAL_OVER_LIMIT          | Withdrawal limit exceeded                             |
| API_WITHDRAW_DISABLED          | API withdrawal operation is disabled temporarily      |
| INVALID_WITHDRAW_ID            | Invalid withdraw ID                                   |
| INVALID_WITHDRAW_CANCEL_STATUS | Cancelling withdrawal not allowed with current status |
| DUPLICATE_REQUEST              | Duplicate request                                     |
| ORDER_EXISTS                   | Order already exists, do not resubmit                 |
| INVALID_CLIENT_ORDER_ID        | The client_order_id is invalid                        |

- Spot and margin trading related

| `label`                   | Meaning                                                       |
| ------------------------- | ------------------------------------------------------------- |
| INVALID_PRECISION         | Invalid precision                                             |
| INVALID_CURRENCY          | Invalid currency                                              |
| INVALID_CURRENCY_PAIR     | Invalid currency pair                                         |
| POC_FILL_IMMEDIATELY      | Order would match and take immediately so it's cancelled      |
| ORDER_NOT_FOUND           | Order not found                                               |
| ORDER_CLOSED              | Order already closed                                          |
| ORDER_CANCELLED           | Order already cancelled                                       |
| QUANTITY_NOT_ENOUGH       | Amount is not enough                                          |
| BALANCE_NOT_ENOUGH        | Balance is not enough                                         |
| MARGIN_NOT_SUPPORTED      | Request currency pair doesn't provide margin trading          |
| MARGIN_BALANCE_NOT_ENOUGH | Margin balance is not enough                                  |
| AMOUNT_TOO_LITTLE         | Amount does not reach minimum required                        |
| AMOUNT_TOO_MUCH           | Amount exceeds maximum allowed                                |
| REPEATED_CREATION         | Repeated creation                                             |
| LOAN_NOT_FOUND            | Margin loan is not found                                      |
| LOAN_RECORD_NOT_FOUND     | Margin loan record is not found                               |
| NO_MATCHED_LOAN           | No loan can match request borrow requirement                  |
| NOT_MERGEABLE             | Request loans cannot be merged                                |
| NO_CHANGE                 | No change is made                                             |
| REPAY_TOO_MUCH            | Repay more than required                                      |
| TOO_MANY_CURRENCY_PAIRS   | Too many currency pairs in batch orders creation              |
| TOO_MANY_ORDERS           | Too many orders in one currency pair in batch orders creation |
| MIXED_ACCOUNT_TYPE        | More than one account type is used in batch orders creation   |
| AUTO_BORROW_TOO_MUCH      | Auto borrow exceeds maximum allowed                           |
| TRADE_RESTRICTED          | Trading is restricted due to high debt ratio                  |
| FOK_NOT_FILL              | FOK order cannot be filled completely                         |
| INITIAL_MARGIN_TOO_LOW    | User's total initial margin rate is too low                   |
| NO_MERGEABLE_ORDERS       | Orders can be merged not found                                |
| ORDER_BOOK_NOT_FOUND      | Insufficient liquidity                                        |
| FAILED_RETRIEVE_ASSETS    | Failed to retrieve account assets                             |
| CANCEL_FAIL               | Order cancel failed                                           |

- Futures related

| `label`                 | Meaning                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| USER_NOT_FOUND          | User has no futures account                                             |
| CONTRACT_NO_COUNTER     | No counter order found                                                  |
| CONTRACT_NOT_FOUND      | Contract not found                                                      |
| RISK_LIMIT_EXCEEDED     | Risk limit exceeded                                                     |
| INSUFFICIENT_AVAILABLE  | Balance is not enough                                                   |
| LIQUIDATE_IMMEDIATELY   | Operation may cause liquidation                                         |
| LEVERAGE_TOO_HIGH       | leverage too high                                                       |
| LEVERAGE_TOO_LOW        | leverage too low                                                        |
| ORDER_NOT_FOUND         | Order not found                                                         |
| ORDER_NOT_OWNED         | Order not owned                                                         |
| ORDER_FINISHED          | Order already finished                                                  |
| TOO_MANY_ORDERS         | Too many open orders                                                    |
| POSITION_CROSS_MARGIN   | margin updating is not allowed in cross margin                          |
| POSITION_IN_LIQUIDATION | Position is being liquidated                                            |
| POSITION_IN_CLOSE       | Position is closing                                                     |
| POSITION_EMPTY          | Position is empty                                                       |
| REMOVE_TOO_MUCH         | Changed margin exceeds allowed                                          |
| RISK_LIMIT_NOT_MULTIPLE | Risk limit is not a multiple of step                                    |
| RISK_LIMIT_TOO_HIGH     | Risk limit too high                                                     |
| RISK_LIMIT_TOO_lOW      | Risk limit too low                                                      |
| PRICE_TOO_DEVIATED      | Order price deviates too much from mark price                           |
| SIZE_TOO_LARGE          | Order size exceeds maximum                                              |
| SIZE_TOO_SMALL          | Order size does not reach minimum                                       |
| PRICE_OVER_LIQUIDATION  | Price to increase position can not exceeds liquidation price            |
| PRICE_OVER_BANKRUPT     | Price to decrease position cannot exceeds bankrupting price             |
| ORDER_POC_IMMEDIATE     | POC order will be finished immediately                                  |
| INCREASE_POSITION       | POC order will increase position                                        |
| CONTRACT_IN_DELISTING   | Contract is delisting, only reduce-only order or close order is allowed |
| POSITION_NOT_FOUND      | Position not found                                                      |
| POSITION_DUAL_MODE      | Operation forbidden in dual-mode                                        |
| ORDER_PENDING           | Operation forbidden with pending orders                                 |
| POSITION_HOLDING        | Operation forbidden with holding position                               |
| REDUCE_EXCEEDED         | Reduce order would exceed position in dual-mode                         |
| NO_CHANGE               | No change is made                                                       |
| AMEND_WITH_STOP         | Amend forbidden with stop order                                         |
| ORDER_FOK               | Killed for FOK                                                          |

- Collateral Loan related

| `label`                      | Meaning                                       |
| ---------------------------- | --------------------------------------------- |
| COL_NOT_ENOUGH               | Collateral balance not enough                 |
| COL_TOO_MUCH                 | Exceed collateral currency quota              |
| INIT_LTV_TOO_HIGH            | Init ltv too high                             |
| REDEEMED_LTV_TOO_HIGH        | Ltv too high after redeem                     |
| BORROWABLE_NOT_ENOUGH        | Left borrowable not enough                    |
| ORDER_TOO_MANY_TOTAL         | Exceed platform order count one day           |
| ORDER_TOO_MANY_DAILY         | Exceed single user order count one day        |
| ORDER_TOO_MANY_USER          | Exceed single user order count total          |
| ORDER_NOT_EXIST              | Order id not exist                            |
| ORDER_FINISHED               | Order id finished                             |
| ORDER_NO_PAY                 | Order unpaid amount is zero                   |
| ORDER_EXIST                  | Order exist                                   |
| ORDER_HISTORY_EXIST          | Order history exist                           |
| ORDER_REPAYING               | Order is repaying                             |
| ORDER_LIQUIDATING            | Order is liquidating                          |
| BORROW_TOO_LITTLE            | Less than currency min borrow amount          |
| BORROW_TOO_LARGE             | Greater than total max borrow amount quantity |
| REPAY_AMOUNT_INVALID         | Repay request amount invalid                  |
| REPAY_GREATER_THAN_AVAILABLE | Repay greater than available                  |
| POOL_BALANCE_NOT_ENOUGH      | Pool balance not enough                       |
| CURRENCY_SETTLING            | Currency settlement in progress               |
| RISK_REJECT                  | Risk reject, please try again later           |
| LOAN_FAILED                  | Loan failed, you can borrow again             |

- Portfolio related

| `label`             | Meaning                           |
| ------------------- | --------------------------------- |
| USER_LIAB           | User has liab                     |
| USER_PENDING_ORDERS | User has pending orders           |
| MODE_SET            | already set portfolio_margin mode |

- Earn related

| `label`                  | 含义                                                                        |
| ------------------------ | --------------------------------------------------------------------------- |
| ERR_BALANCE_NOT_ENOUGH   | balance not enough                                                          |
| ERR_PRODUCT_SELL_OUT     | Target quota reached                                                        |
| ERR_PRODUCT_BUY          | The project is not yet open for purchase                                    |
| ERR_CREATE_ORDER         | Put order fail                                                              |
| ERR_QUOTA_LOWER_LIMIT    | Not meeting the minimum order amount                                        |
| ERR_QUOTA_SUPERIOR_LIMIT | The maximum order limit has been reached                                    |
| ERR_ORDER_NUMBER_LIMIT   | The maximum order quantity has been reached                                 |
| ERR_PRODUCT_CLOSE        | Project closed                                                              |
| COPIES_NOT_ENOUGH        | Not enough shares available to subscribe                                    |
| COPIES_TOO_SMALL         | Investment share is too small                                               |
| COPIES_TOO_BIG           | The number of investment shares exceeds the upper limit                     |
| TOTAL_AMOUNT_24          | The total amount of pledge and redemption within 24 hours exceeds the limit |
| TOTAL_BUYCOUNT_24        | Pledge and redemption times exceeding the limit within 24 hours             |
| REDEEM_24_LIMIT          | Redemption are allowed 24 hours after the last staking                      |

- Server errors

| `label`      | Meaning                          |
| ------------ | -------------------------------- |
| INTERNAL     | Internal server error            |
| SERVER_ERROR | Internal server error            |
| TOO_BUSY     | Server is too busy at the moment |

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

| Products             | Permissions                                                                                               |
| -------------------- | --------------------------------------------------------------------------------------------------------- |
| `spot/margin`        | `Read-only` query orders `Read-write` query orders & place orders                                         |
| `perpetual contract` | `Read-only` query orders `Read-write` query orders & place orders                                         |
| `delivery contract`  | `Read-only` query orders `Read-write` query orders & place orders                                         |
| `wallet`             | `Read-only` Query for withdrawal transfer records `Read-write` Query for account records & fund transfers |
| `withdrawal`         | `Read-only` Query cash withdrawal records `Read-write` Query cash withdrawal records & withdrawals        |

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

```
	GET /api/v4/futures/orders?contract=BTC_USD&status=finished&limit=50 HTTP/1.1
```

Signature string：

```
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

```
	POST /api/v4/futures/orders HTTP/1.1

	{"contract":"BTC_USD","type":"limit","size":100,"price":6800,"time_in_force":"gtc"}
```

Signature string：

```
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

# [#](#spot) Spot

Spot trading

## [#](#list-all-currencies-details) List all currencies' details

> Code samples

`GET /spot/currencies`

_List all currencies' details_

Currency has two forms:

1.  Only currency name, e.g., BTC, USDT
2.  `<currency>_<chain>`, e.g., `HT_ETH`

The latter one occurs when one currency has multiple chains. Currency detail
contains a `chain` field whatever the form is. To retrieve all chains of one
currency, you can use use all the details which has the name of the currency or
name starting with `<currency>_`.

> Example responses

> 200 Response

```
[
  {
    "currency": "GT",
    "delisted": false,
    "withdraw_disabled": false,
    "withdraw_delayed": false,
    "deposit_disabled": false,
    "trade_disabled": false,
    "chain": "GT"
  }
]
```

### Responses

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type    | Description                                                                     |
| ------------------- | ------- | ------------------------------------------------------------------------------- |
| _None_              | array   | none                                                                            |
| » currency          | string  | Currency name                                                                   |
| » delisted          | boolean | Whether currency is de-listed                                                   |
| » withdraw_disabled | boolean | Whether currency's withdrawal is disabled                                       |
| » withdraw_delayed  | boolean | Whether currency's withdrawal is delayed                                        |
| » deposit_disabled  | boolean | Whether currency's deposit is disabled                                          |
| » trade_disabled    | boolean | Whether currency's trading is disabled                                          |
| » fixed_rate        | string  | Fixed fee rate. Only for fixed rate currencies, not valid for normal currencies |
| » chain             | string  | Chain of currency                                                               |

This operation does not require authentication

## [#](#get-details-of-a-specific-currency) Get details of a specific currency

> Code samples

`GET /spot/currencies/{currency}`

_Get details of a specific currency_

### Parameters

| Name     | In   | Type   | Required | Description   |
| -------- | ---- | ------ | -------- | ------------- |
| currency | path | string | true     | Currency name |

> Example responses

> 200 Response

```
{
  "currency": "GT",
  "delisted": false,
  "withdraw_disabled": false,
  "withdraw_delayed": false,
  "deposit_disabled": false,
  "trade_disabled": false,
  "chain": "GT"
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                | Type    | Description                                                                     |
| ------------------- | ------- | ------------------------------------------------------------------------------- |
| » currency          | string  | Currency name                                                                   |
| » delisted          | boolean | Whether currency is de-listed                                                   |
| » withdraw_disabled | boolean | Whether currency's withdrawal is disabled                                       |
| » withdraw_delayed  | boolean | Whether currency's withdrawal is delayed                                        |
| » deposit_disabled  | boolean | Whether currency's deposit is disabled                                          |
| » trade_disabled    | boolean | Whether currency's trading is disabled                                          |
| » fixed_rate        | string  | Fixed fee rate. Only for fixed rate currencies, not valid for normal currencies |
| » chain             | string  | Chain of currency                                                               |

This operation does not require authentication

## [#](#list-all-currency-pairs-supported) List all currency pairs supported

> Code samples

`GET /spot/currency_pairs`

_List all currency pairs supported_

> Example responses

> 200 Response

```
[
  {
    "id": "ETH_USDT",
    "base": "ETH",
    "quote": "USDT",
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

| Status | Meaning                                                                    | Description                  | Schema                                  |
| ------ | -------------------------------------------------------------------------- | ---------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | All currency pairs retrieved | \[[CurrencyPair](#schemacurrencypair)\] |

This operation does not require authentication

## [#](#get-details-of-a-specifc-currency-pair) Get details of a specifc currency pair

> Code samples

`GET /spot/currency_pairs/{currency_pair}`

_Get details of a specifc currency pair_

### Parameters

| Name          | In   | Type   | Required | Description   |
| ------------- | ---- | ------ | -------- | ------------- |
| currency_pair | path | string | true     | Currency pair |

> Example responses

> 200 Response

```
{
  "id": "ETH_USDT",
  "base": "ETH",
  "quote": "USDT",
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

| Status | Meaning                                                                    | Description            | Schema                              |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | [CurrencyPair](#schemacurrencypair) |

This operation does not require authentication

## [#](#retrieve-ticker-information) Retrieve ticker information

> Code samples

`GET /spot/tickers`

_Retrieve ticker information_

Return only related data if `currency_pair` is specified; otherwise return all
of them

### Parameters

| Name          | In    | Type   | Required | Description   |
| ------------- | ----- | ------ | -------- | ------------- |
| currency_pair | query | string | false    | Currency pair |
| timezone      | query | string | false    | Timezone      |

#### [#](#enumerated-values-12) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| timezone  | utc0  |
| timezone  | utc8  |
| timezone  | all   |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type           | Description                                               |
| ------------------- | -------------- | --------------------------------------------------------- | ------------------------------------------- |
| » currency_pair     | string         | Currency pair                                             |
| » last              | string         | Last trading price                                        |
| » lowest_ask        | string         | Recent lowest ask                                         |
| » highest_bid       | string         | Recent highest bid                                        |
| » change_percentage | string         | Change percentage in the last 24h                         |
| » change_utc0       | string         | utc0 timezone, the percentage change in the last 24 hours |
| » change_utc8       | string         | utc8 timezone, the percentage change in the last 24 hours |
| » base_volume       | string         | Base currency trade volume in the last 24h                |
| » quote_volume      | string         | Quote currency trade volume in the last 24h               |
| » high_24h          | string         | Highest price in 24h                                      |
| » low_24h           | string         | Lowest price in 24h                                       |
| » etf_net_value     | string         | ETF net value                                             |
| » etf_pre_net_value | string         | null                                                      | ETF previous net value at re-balancing time |
| » etf_pre_timestamp | integer(int64) | null                                                      | ETF previous re-balancing time              |
| » etf_leverage      | string         | null                                                      | ETF current leverage                        |

This operation does not require authentication

## [#](#retrieve-order-book) Retrieve order book

> Code samples

`GET /spot/order_book`

_Retrieve order book_

Order book will be sorted by price from high to low on bids; low to high on asks

### Parameters

| Name          | In    | Type    | Required | Description                                                  |
| ------------- | ----- | ------- | -------- | ------------------------------------------------------------ |
| currency_pair | query | string  | true     | Currency pair                                                |
| interval      | query | string  | false    | Order depth. 0 means no aggregation is applied. default to 0 |
| limit         | query | integer | false    | Maximum number of order depth data in asks or bids           |
| with_id       | query | boolean | false    | Return order book ID                                         |

> Example responses

> 200 Response

```
{
  "id": 123456,
  "current": 1623898993123,
  "update": 1623898993121,
  "asks": [
    [
      "1.52",
      "1.151"
    ],
    [
      "1.53",
      "1.218"
    ]
  ],
  "bids": [
    [
      "1.17",
      "201.863"
    ],
    [
      "1.16",
      "725.464"
    ]
  ]
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name      | Type           | Description                                                                                                    |
| --------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| » id      | integer(int64) | Order book ID, which is updated whenever the order book is changed. Valid only when `with_id` is set to `true` |
| » current | integer(int64) | The timestamp of the response data being generated (in milliseconds)                                           |
| » update  | integer(int64) | The timestamp of when the orderbook last changed (in milliseconds)                                             |
| » asks    | array          | Asks order depth                                                                                               |
| »» _None_ | array          | price and amount                                                                                               |
| » bids    | array          | Bids order depth                                                                                               |
| »» _None_ | array          | price and amount                                                                                               |

This operation does not require authentication

## [#](#retrieve-market-trades) Retrieve market trades

> Code samples

`GET /spot/trades`

_Retrieve market trades_

You can use `from` and `to` to query by time range, or use `last_id` by
scrolling page. The default behavior is by time range.

Scrolling query using `last_id` is not recommended any more. If `last_id` is
specified, time range query parameters will be ignored.

### Parameters

| Name          | In    | Type           | Required | Description                                                                                            |
| ------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------ |
| currency_pair | query | string         | true     | Currency pair                                                                                          |
| limit         | query | integer(int32) | false    | Maximum number of records to be returned in a single list. Default: 100, Minimum: 1, Maximum: 1000     |
| last_id       | query | string         | false    | Specify list staring point using the `id` of last record in previous list-query results                |
| reverse       | query | boolean        | false    | Whether the id of records to be retrieved should be less than the last_id specified. Default to false. |
| from          | query | integer(int64) | false    | Start timestamp of the query                                                                           |
| to            | query | integer(int64) | false    | Time range ending, default to current time                                                             |
| page          | query | integer(int32) | false    | Page number                                                                                            |

#### [#](#detailed-descriptions-8) Detailed descriptions

**reverse**: Whether the id of records to be retrieved should be less than the
last_id specified. Default to false.

When `last_id` is specified. Set `reverse` to `true` to trace back trading
history; `false` to retrieve latest tradings.

No effect if `last_id` is not specified.

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                                                           | Type   | Description                                                          |
| -------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| _None_                                                         | array  | none                                                                 |
| » id                                                           | string | Trade ID                                                             |
| » create_time                                                  | string | Trading time                                                         |
| » create_time_ms                                               | string | Trading time, with millisecond precision                             |
| » currency_pair                                                | string | Currency pair                                                        |
| » side                                                         | string | Order side                                                           |
| » role                                                         | string | Trade role. No value in public endpoints                             |
| » amount                                                       | string | Trade amount                                                         |
| » price                                                        | string | Order price                                                          |
| » order_id                                                     | string | Related order ID. No value in public endpoints                       |
| » fee                                                          | string | Fee deducted. No value in public endpoints                           |
| » fee_currency                                                 | string | Fee currency unit. No value in public endpoints                      |
| » point_fee                                                    | string | Points used to deduct fee. No value in public endpoints              |
| » gt_fee                                                       | string | GT used to deduct fee. No value in public endpoints                  |
| » amend_text                                                   | string | The custom data that the user remarked when amending the order       |
| » sequence_id                                                  | string | Represents a unique and consecutive trade ID within a single market. |
| It is used to track and identify trades in the specific market |
| » text                                                         | string | User defined information. No value in public endpoints               |

#### [#](#enumerated-values-13) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |
| role     | taker |
| role     | maker |

This operation does not require authentication

## [#](#market-candlesticks) Market candlesticks

> Code samples

`GET /spot/candlesticks`

_Market candlesticks_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the
limit when specifying from, to and interval

### Parameters

| Name          | In    | Type           | Required | Description                                                                                                                                        |
| ------------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency_pair | query | string         | true     | Currency pair                                                                                                                                      |
| limit         | query | integer        | false    | Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |
| from          | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                               |
| to            | query | integer(int64) | false    | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time                                                          |
| interval      | query | string         | false    | Interval time between data points. Note that `30d` means 1 natual month, not 30 days                                                               |

#### [#](#enumerated-values-14) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 10s   |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |
| interval  | 4h    |
| interval  | 8h    |
| interval  | 1d    |
| interval  | 7d    |
| interval  | 30d   |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema         |
| ------ | -------------------------------------------------------------------------- | ---------------------- | -------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[\[string\]\] |

### Response Schema

Status Code **200**

| Name     | Type  | Description                                                         |
| -------- | ----- | ------------------------------------------------------------------- |
| » _None_ | array | K-line data for each time granularity, arranged from left to right: |

\- Unix timestamp with second precision  
\- Trading volume in quote currency  
\- Closing price  
\- Highest price  
\- Lowest price  
\- Opening price  
\- Trading volume in base currency  
\- Whether the window is closed; true indicates the end of this segment of
candlestick chart data, false indicates that this segment of candlestick chart
data is not yet complete |

This operation does not require authentication

## [#](#query-user-trading-fee-rates) Query user trading fee rates

> Code samples

`GET /spot/fee`

_Query user trading fee rates_

This API is deprecated in favour of new fee retrieving API `/wallet/fee`.

### Parameters

| Name          | In    | Type   | Required | Description                                          |
| ------------- | ----- | ------ | -------- | ---------------------------------------------------- |
| currency_pair | query | string | false    | Specify a currency pair to retrieve precise fee rate |

#### [#](#detailed-descriptions-9) Detailed descriptions

**currency_pair**: Specify a currency pair to retrieve precise fee rate

This field is optional. In most cases, the fee rate is identical among all
currency pairs

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name            | Type           | Description                                                                          |
| --------------- | -------------- | ------------------------------------------------------------------------------------ |
| » user_id       | integer(int64) | User ID                                                                              |
| » taker_fee     | string         | taker fee rate                                                                       |
| » maker_fee     | string         | maker fee rate                                                                       |
| » gt_discount   | boolean        | If GT deduction is enabled                                                           |
| » gt_taker_fee  | string         | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| » gt_maker_fee  | string         | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| » loan_fee      | string         | Loan fee rate of margin lending                                                      |
| » point_type    | string         | Point type. 0 - Initial version. 1 - new version since 202009                        |
| » currency_pair | string         | Currency pair                                                                        |
| » debit_fee     | integer        | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-a-batch-of-user-trading-fee-rates) Query a batch of user trading fee rates

> Code samples

`GET /spot/batch_fee`

_Query a batch of user trading fee rates_

### Parameters

| Name           | In    | Type   | Required | Description                                      |
| -------------- | ----- | ------ | -------- | ------------------------------------------------ |
| currency_pairs | query | string | true     | A request can only query up to 50 currency pairs |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                       | Type           | Description                                                                          |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| » **additionalProperties** | object         | none                                                                                 |
| »» user_id                 | integer(int64) | User ID                                                                              |
| »» taker_fee               | string         | taker fee rate                                                                       |
| »» maker_fee               | string         | maker fee rate                                                                       |
| »» gt_discount             | boolean        | If GT deduction is enabled                                                           |
| »» gt_taker_fee            | string         | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| »» gt_maker_fee            | string         | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| »» loan_fee                | string         | Loan fee rate of margin lending                                                      |
| »» point_type              | string         | Point type. 0 - Initial version. 1 - new version since 202009                        |
| »» currency_pair           | string         | Currency pair                                                                        |
| »» debit_fee               | integer        | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-spot-accounts) List spot accounts

> Code samples

`GET /spot/accounts`

_List spot accounts_

### Parameters

| Name     | In    | Type   | Required | Description                             |
| -------- | ----- | ------ | -------- | --------------------------------------- |
| currency | query | string | false    | Retrieve data of the specified currency |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name        | Type    | Description                    |
| ----------- | ------- | ------------------------------ |
| » currency  | string  | Currency detail                |
| » available | string  | Available amount               |
| » locked    | string  | Locked amount, used in trading |
| » update_id | integer | Version number                 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book) Query account book

> Code samples

`GET /spot/account_book`

_Query account book_

Record time range cannot exceed 30 days

### Parameters

| Name     | In    | Type           | Required | Description                                                                               |
| -------- | ----- | -------------- | -------- | ----------------------------------------------------------------------------------------- |
| currency | query | string         | false    | Retrieve data of the specified currency                                                   |
| from     | query | integer(int64) | false    | Start timestamp of the query                                                              |
| to       | query | integer(int64) | false    | Time range ending, default to current time                                                |
| page     | query | integer(int32) | false    | Page number                                                                               |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list                                 |
| type     | query | string         | false    | Only retrieve changes of the specified type. All types will be returned if not specified. |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name       | Type           | Description                                                                               |
| ---------- | -------------- | ----------------------------------------------------------------------------------------- |
| » id       | string         | Balance change record ID                                                                  |
| » time     | integer(int64) | The timestamp of the change (in milliseconds)                                             |
| » currency | string         | Currency changed                                                                          |
| » change   | string         | Amount changed. Positive value means transferring in, while negative out                  |
| » balance  | string         | Balance after change                                                                      |
| » type     | string         | Account book type. Please refer to [account book type](#accountbook-type) for more detail |
| » text     | string         | Additional information                                                                    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-batch-of-orders) Create a batch of orders

> Code samples

`POST /spot/batch_orders`

_Create a batch of orders_

Batch orders requirements:

1.  custom order field `text` is required
2.  At most 4 currency pairs, maximum 10 orders each, are allowed in one request
3.  No mixture of spot orders and margin orders, i.e. `account` must be
    identical for all orders

> Body parameter

```
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

| Name | In   | Type                           | Required | Description |
| ---- | ---- | ------------------------------ | -------- | ----------- |
| body | body | array\[[Order](#schemaorder)\] | true     | none        |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is completed | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type   | Description                                                          |
| ------------- | ------ | -------------------------------------------------------------------- |
| _None_        | array  | \[Batch order details\]                                              |
| » _None_      | object | Batch order details                                                  |
| »» order_id   | string | Order ID                                                             |
| »» amend_text | string | The custom data that the user remarked when amending the order       |
| »» text       | string | User defined information. If not empty, must follow the rules below: |

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) | | »»
succeeded | boolean | Whether the batch of orders succeeded | | »» label |
string | Error label, if any, otherwise an empty string | | »» message | string
| Detailed error message, if any, otherwise an empty string | | »» id | string |
Order ID | | »» create_time | string | Creation time of order | | »» update_time
| string | Last modification time of order | | »» create_time_ms |
integer(int64) | Creation time of order (in milliseconds) | | »» update_time_ms
| integer(int64) | Last modification time of order (in milliseconds) | | »»
status | string | Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | »» currency_pair | string | Currency pair | | »»
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | »» account | string | Account type. spot - use spot
account; margin - use margin account; cross_margin - use cross margin account,
unified - unified account | | »» side | string | Order side | | »» amount |
string | Trade amount | | »» price | string | Order price | | »» time_in_force |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | »» iceberg | string |
Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all
amount is not supported. | | »» auto_repay | boolean | Enable or disable
automatic repayment for automatic borrow loan generated by cross margin order.
Default is disabled. Note that:

1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` can be both set to true in one order. | | »»
left | string | Amount left to fill | | »» filled_amount | string | Amount
traded to fill | | »» fill_price | string | Total filled in quote currency.
Deprecated in favor of `filled_total` | | »» filled_total | string | Total
filled in quote currency | | »» avg_deal_price | string | Average fill price | |
»» fee | string | Fee deducted | | »» fee_currency | string | Fee currency unit
| | »» point_fee | string | Points used to deduct fee | | »» gt_fee | string |
GT used to deduct fee | | »» gt_discount | boolean | Whether GT fee discount is
used | | »» rebated_fee | string | Rebated fee | | »» rebated_fee_currency |
string | Rebated fee currency unit | | »» stp_id | integer | Orders between
users in the same `stp_id` group are not allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | »» stp_act | string | Self-Trading Prevention Action. Users can
use this field to set self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, Cancel old orders and keep new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »» finish_as |
string | How the order was finished.

\- open: processing  
\- filled: filled totally  
\- cancelled: manually cancelled  
\- ioc: time in force is `IOC`, finish immediately  
\- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-15) Enumerated Values

| Property      | Value        |
| ------------- | ------------ |
| status        | open         |
| status        | closed       |
| status        | cancelled    |
| type          | limit        |
| type          | market       |
| account       | spot         |
| account       | margin       |
| account       | cross_margin |
| account       | unified      |
| side          | buy          |
| side          | sell         |
| time_in_force | gtc          |
| time_in_force | ioc          |
| time_in_force | poc          |
| time_in_force | fok          |
| stp_act       | cn           |
| stp_act       | co           |
| stp_act       | cb           |
| stp_act       | \-           |
| finish_as     | open         |
| finish_as     | filled       |
| finish_as     | cancelled    |
| finish_as     | ioc          |
| finish_as     | stp          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-open-orders) List all open orders

> Code samples

`GET /spot/open_orders`

_List all open orders_

List open orders in all currency pairs.

Note that pagination parameters affect record number in each currency pair's
open order list. No pagination is applied to the number of currency pairs
returned. All currency pairs with open orders will be returned.

Spot,portfolio and margin orders are returned by default. To list cross margin
orders, `account` must be set to `cross_margin`

### Parameters

| Name    | In    | Type           | Required | Description                                                                                                                                                                                                  |
| ------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| page    | query | integer(int32) | false    | Page number                                                                                                                                                                                                  |
| limit   | query | integer        | false    | Maximum number of records returned in one page in each currency pair                                                                                                                                         |
| account | query | string         | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name            | Type    | Description                                                                  |
| --------------- | ------- | ---------------------------------------------------------------------------- |
| » currency_pair | string  | Currency pair                                                                |
| » total         | integer | The total number of pending orders for this trading pair on the current page |
| » orders        | array   | none                                                                         |
| »» _None_       | object  | Spot order details                                                           |
| »»» id          | string  | Order ID                                                                     |
| »»» text        | string  | User defined information. If not empty, must follow the rules below:         |

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- 101: from android  
\- 102: from IOS  
\- 103: from IPAD  
\- 104: from webapp  
\- 3: from web  
\- 2: from apiv2  
\- apiv4: from apiv4 | | »»» amend_text | string | The custom data that the user
remarked when amending the order | | »»» create_time | string | Creation time of
order | | »»» update_time | string | Last modification time of order | | »»»
create_time_ms | integer(int64) | Creation time of order (in milliseconds) | |
»»» update_time_ms | integer(int64) | Last modification time of order (in
milliseconds) | | »»» status | string | Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | »»» currency_pair | string | Currency pair | | »»»
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | »»» account | string | Account types， spot - spot
account, margin - margin account, unified - unified account, cross_margin -
cross margin account. Portfolio margin accounts can only be set to
`cross_margin` | | »»» side | string | Order side | | »»» amount | string | When
`type` is limit, it refers to base currency. For instance, `BTC_USDT` means
`BTC`  
When `type` is `market`, it refers to different currency according to `side`  
\- `side` : `buy` means quote currency, `BTC_USDT` means `USDT`  
\- `side` : `sell` means base currency，`BTC_USDT` means `BTC` | | »»» price |
string | Price can't be empty when `type`\= `limit` | | »»» time_in_force |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none  
Only `ioc` and `fok` are supported when `type`\=`market` | | »»» iceberg |
string | Amount to display for the iceberg order. Null or 0 for normal orders.
Hiding all amount is not supported. | | »»» auto_repay | boolean | Enable or
disable automatic repayment for automatic borrow loan generated by cross margin
order. Default is disabled. Note that:

1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` can be both set to true in one order. | | »»»
left | string | Amount left to fill | | »»» filled_amount | string | Amount
traded to fill | | »»» fill_price | string | Total filled in quote currency.
Deprecated in favor of `filled_total` | | »»» filled_total | string | Total
filled in quote currency | | »»» avg_deal_price | string | Average fill price |
| »»» fee | string | Fee deducted | | »»» fee_currency | string | Fee currency
unit | | »»» point_fee | string | Points used to deduct fee | | »»» gt_fee |
string | GT used to deduct fee | | »»» gt_maker_fee | string | GT used to deduct
maker fee | | »»» gt_taker_fee | string | GT used to deduct taker fee | | »»»
gt_discount | boolean | Whether GT fee discount is used | | »»» rebated_fee |
string | Rebated fee | | »»» rebated_fee_currency | string | Rebated fee
currency unit | | »»» stp_id | integer | Orders between users in the same
`stp_id` group are not allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | »»» stp_act | string | Self-Trading Prevention Action. Users can
use this field to set self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, Cancel old orders and keep new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »»» finish_as
| string | Order completion statuses include:

\- open: Awaiting processing  
\- filled: Fully filled  
\- cancelled: Cancelled by user  
\- liquidate_cancelled: Cancelled due to liquidation  
\- small: Order quantity too small  
\- depth_not_enough: Cancelled due to insufficient market depth  
\- trader_not_enough: Cancelled due to insufficient counterparty  
\- ioc: Not immediately filled because tif is set to ioc  
\- poc: Not met the order strategy because tif is set to poc  
\- fok: Not fully filled immediately because tif is set to fok  
\- stp: Cancelled due to self-trade prevention  
\- unknown: Unknown |

#### [#](#enumerated-values-16) Enumerated Values

| Property      | Value               |
| ------------- | ------------------- |
| status        | open                |
| status        | closed              |
| status        | cancelled           |
| type          | limit               |
| type          | market              |
| side          | buy                 |
| side          | sell                |
| time_in_force | gtc                 |
| time_in_force | ioc                 |
| time_in_force | poc                 |
| time_in_force | fok                 |
| stp_act       | cn                  |
| stp_act       | co                  |
| stp_act       | cb                  |
| stp_act       | \-                  |
| finish_as     | open                |
| finish_as     | filled              |
| finish_as     | cancelled           |
| finish_as     | liquidate_cancelled |
| finish_as     | depth_not_enough    |
| finish_as     | trader_not_enough   |
| finish_as     | small               |
| finish_as     | ioc                 |
| finish_as     | poc                 |
| finish_as     | fok                 |
| finish_as     | stp                 |
| finish_as     | unknown             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#close-position-when-cross-currency-is-disabled) close position when cross-currency is disabled

> Code samples

`POST /spot/cross_liquidate_orders`

_close position when cross-currency is disabled_

Currently, only cross-margin accounts are supported to close position when cross
currencies are disabled. Maximum buy quantity = (unpaid principal and interest -
currency balance - the amount of the currency in the order book) / 0.998

> Body parameter

```
{
  "currency_pair": "GT_USDT",
  "amount": "12",
  "price": "10.15",
  "text": "t-34535"
}
```

### Parameters

| Name            | In   | Type   | Required | Description                                                          |
| --------------- | ---- | ------ | -------- | -------------------------------------------------------------------- |
| body            | body | object | true     | none                                                                 |
| » text          | body | string | false    | User defined information. If not empty, must follow the rules below: |
| » currency_pair | body | string | true     | Currency pair                                                        |
| » amount        | body | string | true     | Trade amount                                                         |
| » price         | body | string | true     | Order price                                                          |
| » action_mode   | body | string | false    | Processing Mode:                                                     |

#### [#](#detailed-descriptions-10) Detailed descriptions

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

```
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

| Status | Meaning                                                                         | Description   | Schema                |
| ------ | ------------------------------------------------------------------------------- | ------------- | --------------------- |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | order created | [Order](#schemaorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-order) Create an order

> Code samples

`POST /spot/orders`

_Create an order_

You can place orders with spot, portfolio, margin or cross margin account
through setting the `account`field. It defaults to `spot`, which means spot
account is used to place orders. If the user is using unified account, it
defaults to the unified account.

When margin account is used, i.e., `account` is `margin`, `auto_borrow` field
can be set to `true` to enable the server to borrow the amount lacked using
`POST /margin/loans` when your account's balance is not enough. Whether margin
orders' fill will be used to repay margin loans automatically is determined by
the auto repayment setting in your **margin account**, which can be updated or
queried using `/margin/auto_repay` API.

When cross margin account is used, i.e., `account` is `cross_margin`,
`auto_borrow` can also be enabled to achieve borrowing the insufficient amount
automatically if cross account's balance is not enough. But it differs from
margin account that automatic repayment is determined by order's `auto_repay`
field and only current order's fill will be used to repay cross margin loans.

Automatic repayment will be triggered when the order is finished, i.e., its
status is either `cancelled` or `closed`.

**Order status**

An order waiting to be filled is `open`, and it stays `open` until it is filled
totally. If fully filled, order is finished and its status turns to `closed`.If
the order is cancelled before it is totally filled, whether or not partially
filled, its status is `cancelled`. **Iceberg order**

`iceberg` field can be used to set the amount shown. Set to `-1` to hide the
order completely. Note that the hidden part's fee will be charged using taker's
fee rate. **Self Trade Prevention**

- Set `stp_act` to decide the strategy of self-trade prevention. For detailed
  usage, refer to the `stp_act` parameter in request body

> Body parameter

```
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

| Name            | In   | Type                  | Required | Description                                                                                                                                                                               |
| --------------- | ---- | --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body            | body | [Order](#schemaorder) | true     | none                                                                                                                                                                                      |
| » text          | body | string                | false    | User defined information. If not empty, must follow the rules below:                                                                                                                      |
| » currency_pair | body | string                | true     | Currency pair                                                                                                                                                                             |
| » type          | body | string                | false    | Order Type                                                                                                                                                                                |
| » account       | body | string                | false    | Account types， spot - spot account, margin - margin account, unified - unified account, cross_margin - cross margin account. Portfolio margin accounts can only be set to `cross_margin` |
| » side          | body | string                | true     | Order side                                                                                                                                                                                |
| » amount        | body | string                | true     | When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC`                                                                                                    |
| » price         | body | string                | false    | Price can't be empty when `type`\= `limit`                                                                                                                                                |
| » time_in_force | body | string                | false    | Time in force                                                                                                                                                                             |
| » iceberg       | body | string                | false    | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported.                                                                                 |
| » auto_borrow   | body | boolean               | false    | Used in margin or cross margin trading to allow automatic loan of insufficient amount if balance is not enough.                                                                           |
| » auto_repay    | body | boolean               | false    | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:                                                          |
| » stp_act       | body | string                | false    | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies                                                                                           |
| » action_mode   | body | string                | false    | Processing Mode:                                                                                                                                                                          |

#### [#](#detailed-descriptions-11) Detailed descriptions

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

#### [#](#enumerated-values-17) Enumerated Values

| Parameter       | Value  |
| --------------- | ------ |
| » type          | limit  |
| » type          | market |
| » side          | buy    |
| » side          | sell   |
| » time_in_force | gtc    |
| » time_in_force | ioc    |
| » time_in_force | poc    |
| » time_in_force | fok    |
| » stp_act       | cn     |
| » stp_act       | co     |
| » stp_act       | cb     |
| » stp_act       | \-     |

> Example responses

> ACK response body example

```
{
  "id": "12332324",
  "text": "t-123456",
  "amend_text": "test2"
}
```

> RESULT response body example

```
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

```
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

| Status | Meaning                                                                         | Description    | Schema                |
| ------ | ------------------------------------------------------------------------------- | -------------- | --------------------- |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created. | [Order](#schemaorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-orders) List orders

> Code samples

`GET /spot/orders`

_List orders_

Spot, portfolio and margin orders are returned by default. If cross margin
orders are needed, `account` must be set to `cross_margin`

When `status` is `open`, i.e., listing open orders, only pagination parameters
`page` and `limit` are supported and `limit` cannot be larger than 100. Query by
`side` and time range parameters `from` and `to` are not supported.

When `status` is `finished`, i.e., listing finished orders, pagination
parameters, time range parameters `from` and `to`, and `side` parameters are all
supported. Time range parameters are handled as order finish time.

### Parameters

| Name          | In    | Type           | Required | Description                                                                                                                                                                                                  |
| ------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| currency_pair | query | string         | true     | Retrieve results with specified currency pair. It is required for open orders, but optional for finished ones.                                                                                               |
| status        | query | string         | true     | List orders based on status                                                                                                                                                                                  |
| page          | query | integer(int32) | false    | Page number                                                                                                                                                                                                  |
| limit         | query | integer        | false    | Maximum number of records to be returned. If `status` is `open`, maximum of `limit` is 100                                                                                                                   |
| account       | query | string         | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |
| from          | query | integer(int64) | false    | Start timestamp of the query                                                                                                                                                                                 |
| to            | query | integer(int64) | false    | Time range ending, default to current time                                                                                                                                                                   |
| side          | query | string         | false    | All bids or asks. Both included if not specified                                                                                                                                                             |

#### [#](#detailed-descriptions-12) Detailed descriptions

**status**: List orders based on status

`open` - order is waiting to be filled `finished` - order has been filled or
cancelled

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                    |
| ------ | -------------------------------------------------------------------------- | -------------- | ------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[Order](#schemaorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-in-specified-currency-pair) Cancel all `open` orders in specified currency pair

> Code samples

`DELETE /spot/orders`

_Cancel all `open` orders in specified currency pair_

If `account` is not set, all open orders, including spot, portfolio, margin and
cross margin ones, will be cancelled.

You can set `account` to cancel only orders within the specified account

### Parameters

| Name          | In    | Type   | Required | Description                                      |
| ------------- | ----- | ------ | -------- | ------------------------------------------------ |
| currency_pair | query | string | true     | Currency pair                                    |
| side          | query | string | false    | All bids or asks. Both included if not specified |
| account       | query | string | false    | Specify account type:                            |
| action_mode   | query | string | false    | Processing Mode                                  |

#### [#](#detailed-descriptions-13) Detailed descriptions

**account**: Specify account type:

- Classic account: Includes all if not specified
- Unified account: Specify `unified`
- Unified account (legacy): Can only specify `cross_margin`

**action_mode**: Processing Mode

When placing an order, different fields are returned based on the action_mode

- ACK: Asynchronous mode, returns only key order fields
- RESULT: No clearing information
- FULL: Full mode (default)

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                                                               | Schema     |
| ------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted. Query order status by listing orders | \[Inline\] |

### Response Schema

Status Code **200**

| Name     | Type   | Description                                                          |
| -------- | ------ | -------------------------------------------------------------------- |
| » _None_ | object | Spot order details                                                   |
| »» id    | string | Order ID                                                             |
| »» text  | string | User defined information. If not empty, must follow the rules below: |

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- 101: from android  
\- 102: from IOS  
\- 103: from IPAD  
\- 104: from webapp  
\- 3: from web  
\- 2: from apiv2  
\- apiv4: from apiv4 | | »» amend_text | string | The custom data that the user
remarked when amending the order | | »» succeeded | boolean | Whether the batch
of orders succeeded | | »» label | string | Error label, if any, otherwise an
empty string | | »» message | string | Detailed error message, if any, otherwise
an empty string | | »» create_time | string | Creation time of order | | »»
update_time | string | Last modification time of order | | »» create_time_ms |
integer(int64) | Creation time of order (in milliseconds) | | »» update_time_ms
| integer(int64) | Last modification time of order (in milliseconds) | | »»
status | string | Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | »» currency_pair | string | Currency pair | | »»
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | »» account | string | Account types， spot - spot
account, margin - margin account, unified - unified account, cross_margin -
cross margin account. Portfolio margin accounts can only be set to
`cross_margin` | | »» side | string | Order side | | »» amount | string | When
`type` is limit, it refers to base currency. For instance, `BTC_USDT` means
`BTC`  
When `type` is `market`, it refers to different currency according to `side`  
\- `side` : `buy` means quote currency, `BTC_USDT` means `USDT`  
\- `side` : `sell` means base currency，`BTC_USDT` means `BTC` | | »» price |
string | Price can't be empty when `type`\= `limit` | | »» time_in_force |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none  
Only `ioc` and `fok` are supported when `type`\=`market` | | »» iceberg | string
| Amount to display for the iceberg order. Null or 0 for normal orders. Hiding
all amount is not supported. | | »» auto_repay | boolean | Enable or disable
automatic repayment for automatic borrow loan generated by cross margin order.
Default is disabled. Note that:

1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` can be both set to true in one order. | | »»
left | string | Amount left to fill | | »» filled_amount | string | Amount
traded to fill | | »» fill_price | string | Total filled in quote currency.
Deprecated in favor of `filled_total` | | »» filled_total | string | Total
filled in quote currency | | »» avg_deal_price | string | Average fill price | |
»» fee | string | Fee deducted | | »» fee_currency | string | Fee currency unit
| | »» point_fee | string | Points used to deduct fee | | »» gt_fee | string |
GT used to deduct fee | | »» gt_maker_fee | string | GT used to deduct maker fee
| | »» gt_taker_fee | string | GT used to deduct taker fee | | »» gt_discount |
boolean | Whether GT fee discount is used | | »» rebated_fee | string | Rebated
fee | | »» rebated_fee_currency | string | Rebated fee currency unit | | »»
stp_id | integer | Orders between users in the same `stp_id` group are not
allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | »» stp_act | string | Self-Trading Prevention Action. Users can
use this field to set self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, Cancel old orders and keep new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »» finish_as |
string | How the order was finished.

\- open: processing  
\- filled: filled totally  
\- cancelled: manually cancelled  
\- ioc: time in force is `IOC`, finish immediately  
\- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-18) Enumerated Values

| Property      | Value     |
| ------------- | --------- |
| status        | open      |
| status        | closed    |
| status        | cancelled |
| type          | limit     |
| type          | market    |
| side          | buy       |
| side          | sell      |
| time_in_force | gtc       |
| time_in_force | ioc       |
| time_in_force | poc       |
| time_in_force | fok       |
| stp_act       | cn        |
| stp_act       | co        |
| stp_act       | cb        |
| stp_act       | \-        |
| finish_as     | open      |
| finish_as     | filled    |
| finish_as     | cancelled |
| finish_as     | ioc       |
| finish_as     | stp       |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-batch-of-orders-with-an-id-list) Cancel a batch of orders with an ID list

> Code samples

`POST /spot/cancel_batch_orders`

_Cancel a batch of orders with an ID list_

Multiple currency pairs can be specified, but maximum 20 orders are allowed per
request

> Body parameter

```
[
  {
    "currency_pair": "BTC_USDT",
    "id": "123456"
  }
]
```

### Parameters

| Name | In   | Type                                                 | Required | Description |
| ---- | ---- | ---------------------------------------------------- | -------- | ----------- |
| body | body | array\[[CancelBatchOrder](#schemacancelbatchorder)\] | true     | none        |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                  | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation completed | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type    | Description                                                                                     |
| ------------------- | ------- | ----------------------------------------------------------------------------------------------- |
| » CancelOrderResult | object  | Order cancellation result                                                                       |
| »» currency_pair    | string  | Order currency pair                                                                             |
| »» id               | string  | Order ID                                                                                        |
| »» text             | string  | Custom order information                                                                        |
| »» succeeded        | boolean | Whether cancellation succeeded                                                                  |
| »» label            | string  | Error label when failed to cancel the order; emtpy if succeeded                                 |
| »» message          | string  | Error message when failed to cancel the order; empty if succeeded                               |
| »» account          | string  | Empty by default. If cancelled order is cross margin order, this field is set to `cross_margin` |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order) Get a single order

> Code samples

`GET /spot/orders/{order_id}`

_Get a single order_

Spot, portfolio and margin orders are queried by default. If cross margin orders
are needed or portfolio margin account are used, account must be set to
cross_margin.

### Parameters

| Name          | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| order_id      | path  | string | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                                                                                    |
| currency_pair | query | string | true     | Currency pair                                                                                                                                                                                                |
| account       | query | string | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

#### [#](#detailed-descriptions-14) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 1 hour after the
end of the order. After that, only order ID is accepted.

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description      | Schema                |
| ------ | -------------------------------------------------------------------------- | ---------------- | --------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Detail retrieved | [Order](#schemaorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-an-order) Amend an order

> Code samples

`PATCH /spot/orders/{order_id}`

_Amend an order_

By default, the orders of spot, portfolio and margin account are updated. If you
need to modify orders of the `cross-margin` account, you must specify account as
`cross_margin`. For portfolio margin account, only `cross_margin` account is
supported.

Currently, only supports modification of `price` or `amount` fields.

Regarding rate limiting: modify order and create order sharing rate limiting
rules. Regarding matching priority: Only reducing the quantity without modifying
the priority of matching, altering the price or increasing the quantity will
adjust the priority to the new price at the end Note: If the modified amount is
less than the fill amount, the order will be cancelled.

> Body parameter

```
{
  "amount": "1",
  "price": "14"
}
```

### Parameters

| Name          | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| body          | body  | object | true     | none                                                                                                                                                                                                         |
| » amount      | body  | string | false    | New order amount. `amount` and `price` must specify one of them                                                                                                                                              |
| » price       | body  | string | false    | New order price. `amount` and `Price` must specify one of them"                                                                                                                                              |
| » amend_text  | body  | string | false    | Custom info during amending order                                                                                                                                                                            |
| » action_mode | body  | string | false    | Processing Mode:                                                                                                                                                                                             |
| order_id      | path  | string | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                                                                                    |
| currency_pair | query | string | true     | Currency pair                                                                                                                                                                                                |
| account       | query | string | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

#### [#](#detailed-descriptions-15) Detailed descriptions

**» action_mode**: Processing Mode: When placing an order, different fields are
returned based on action_mode. This field is only valid during the request and
is not included in the response result ACK: Asynchronous mode, only returns key
order fields RESULT: No clearing information FULL: Full mode (default)

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 1 hour after the
end of the order. After that, only order ID is accepted.

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description | Schema                |
| ------ | -------------------------------------------------------------------------- | ----------- | --------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Updated     | [Order](#schemaorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order) Cancel a single order

> Code samples

`DELETE /spot/orders/{order_id}`

_Cancel a single order_

Spot,portfolio and margin orders are cancelled by default. If trying to cancel
cross margin orders or portfolio margin account are used, account must be set to
cross_margin

### Parameters

| Name          | In    | Type   | Required | Description                                                                                                                                                                                                  |
| ------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| action_mode   | query | string | false    | Processing Mode                                                                                                                                                                                              |
| order_id      | path  | string | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                                                                                    |
| currency_pair | query | string | true     | Currency pair                                                                                                                                                                                                |
| account       | query | string | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |

#### [#](#detailed-descriptions-16) Detailed descriptions

**action_mode**: Processing Mode

When placing an order, different fields are returned based on the action_mode

- ACK: Asynchronous mode, returns only key order fields
- RESULT: No clearing information
- FULL: Full mode (default)

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 1 hour after the
end of the order. After that, only order ID is accepted.

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description     | Schema                |
| ------ | -------------------------------------------------------------------------- | --------------- | --------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order cancelled | [Order](#schemaorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history) List personal trading history

> Code samples

`GET /spot/my_trades`

_List personal trading history_

Spot,portfolio and margin trades are queried by default. If cross margin trades
are needed, `account` must be set to `cross_margin`

You can also set `from` and(or) `to` to query by time range. If you don't
specify `from` and/or `to` parameters, only the last 7 days of data will be
retured. The range of `from` and `to` is not alloed to exceed 30 days. Time
range parameters are handled as order finish time.

### Parameters

| Name          | In    | Type           | Required | Description                                                                                                                                                                                                  |
| ------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| currency_pair | query | string         | false    | Retrieve results with specified currency pair                                                                                                                                                                |
| limit         | query | integer        | false    | Maximum number of records to be returned in a single list                                                                                                                                                    |
| page          | query | integer(int32) | false    | Page number                                                                                                                                                                                                  |
| order_id      | query | string         | false    | Filter trades with specified order ID. `currency_pair` is also required if this field is present                                                                                                             |
| account       | query | string         | false    | Specify operation account. Default to spot ,portfolio and margin account if not specified. Set to `cross_margin` to operate against margin account. Portfolio margin account must set to `cross_margin` only |
| from          | query | integer(int64) | false    | Start timestamp of the query                                                                                                                                                                                 |
| to            | query | integer(int64) | false    | Time range ending, default to current time                                                                                                                                                                   |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                                                           | Type   | Description                                                          |
| -------------------------------------------------------------- | ------ | -------------------------------------------------------------------- |
| _None_                                                         | array  | none                                                                 |
| » id                                                           | string | Trade ID                                                             |
| » create_time                                                  | string | Trading time                                                         |
| » create_time_ms                                               | string | Trading time, with millisecond precision                             |
| » currency_pair                                                | string | Currency pair                                                        |
| » side                                                         | string | Order side                                                           |
| » role                                                         | string | Trade role. No value in public endpoints                             |
| » amount                                                       | string | Trade amount                                                         |
| » price                                                        | string | Order price                                                          |
| » order_id                                                     | string | Related order ID. No value in public endpoints                       |
| » fee                                                          | string | Fee deducted. No value in public endpoints                           |
| » fee_currency                                                 | string | Fee currency unit. No value in public endpoints                      |
| » point_fee                                                    | string | Points used to deduct fee. No value in public endpoints              |
| » gt_fee                                                       | string | GT used to deduct fee. No value in public endpoints                  |
| » amend_text                                                   | string | The custom data that the user remarked when amending the order       |
| » sequence_id                                                  | string | Represents a unique and consecutive trade ID within a single market. |
| It is used to track and identify trades in the specific market |
| » text                                                         | string | User defined information. No value in public endpoints               |

#### [#](#enumerated-values-19) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | buy   |
| side     | sell  |
| role     | taker |
| role     | maker |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-server-current-time) Get server current time

> Code samples

`GET /spot/time`

_Get server current time_

> Example responses

> 200 Response

```
{
  "server_time": 1597026383085
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_SystemTime_

| Name          | Type           | Description             |
| ------------- | -------------- | ----------------------- |
| » server_time | integer(int64) | Server current time(ms) |

This operation does not require authentication

## [#](#countdown-cancel-orders) Countdown cancel orders

> Code samples

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

```
{
  "timeout": 30,
  "currency_pair": "BTC_USDT"
}
```

### Parameters

| Name            | In   | Type           | Required | Description                |
| --------------- | ---- | -------------- | -------- | -------------------------- |
| body            | body | object         | true     | none                       |
| » timeout       | body | integer(int32) | true     | Countdown time, in seconds |
| » currency_pair | body | string         | false    | Currency pair              |

#### [#](#detailed-descriptions-17) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the
countdown

> Example responses

> 200 Response

```
{
  "triggerTime": "1660039145000"
}
```

### Responses

| Status | Meaning                                                                    | Description                | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Set countdown successfully | Inline |

### Response Schema

Status Code **200**

_triggerTime_

| Name          | Type           | Description                                            |
| ------------- | -------------- | ------------------------------------------------------ |
| » triggerTime | integer(int64) | Timestamp of the end of the countdown, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modification-of-orders) Batch modification of orders

> Code samples

`POST /spot/amend_batch_orders`

_Batch modification of orders_

Default modification of orders for spot, portfolio, and margin accounts. To
modify orders for a cross margin account, the `account` parameter must be
specified as `cross_margin`. For portfolio margin accounts, the `account`
parameter can only be specified as `cross_margin`. Currently, only modifications
to price or quantity (choose one) are supported. When modifying unfinished
orders, a maximum of 5 orders can be batch-modified in one request. The request
parameters should be passed in an array format. During batch modification, if
one order modification fails, the modification process will continue with the
next order. After execution, the response will include corresponding failure
information for the failed orders. The sequence of calling for batch order
modification should be consistent with the order in the order list. The response
content order for batch order modification will also be consistent with the
order in the order list.

> Body parameter

```
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

| Name | In   | Type            | Required | Description |
| ---- | ---- | --------------- | -------- | ----------- |
| body | body | array\[object\] | true     | none        |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                              | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order modification executed successfully | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type   | Description                                                          |
| ------------- | ------ | -------------------------------------------------------------------- |
| _None_        | array  | \[Batch order details\]                                              |
| » _None_      | object | Batch order details                                                  |
| »» order_id   | string | Order ID                                                             |
| »» amend_text | string | The custom data that the user remarked when amending the order       |
| »» text       | string | User defined information. If not empty, must follow the rules below: |

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) | | »»
succeeded | boolean | Whether the batch of orders succeeded | | »» label |
string | Error label, if any, otherwise an empty string | | »» message | string
| Detailed error message, if any, otherwise an empty string | | »» id | string |
Order ID | | »» create_time | string | Creation time of order | | »» update_time
| string | Last modification time of order | | »» create_time_ms |
integer(int64) | Creation time of order (in milliseconds) | | »» update_time_ms
| integer(int64) | Last modification time of order (in milliseconds) | | »»
status | string | Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | »» currency_pair | string | Currency pair | | »»
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | »» account | string | Account type. spot - use spot
account; margin - use margin account; cross_margin - use cross margin account,
unified - unified account | | »» side | string | Order side | | »» amount |
string | Trade amount | | »» price | string | Order price | | »» time_in_force |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | »» iceberg | string |
Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all
amount is not supported. | | »» auto_repay | boolean | Enable or disable
automatic repayment for automatic borrow loan generated by cross margin order.
Default is disabled. Note that:

1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` can be both set to true in one order. | | »»
left | string | Amount left to fill | | »» filled_amount | string | Amount
traded to fill | | »» fill_price | string | Total filled in quote currency.
Deprecated in favor of `filled_total` | | »» filled_total | string | Total
filled in quote currency | | »» avg_deal_price | string | Average fill price | |
»» fee | string | Fee deducted | | »» fee_currency | string | Fee currency unit
| | »» point_fee | string | Points used to deduct fee | | »» gt_fee | string |
GT used to deduct fee | | »» gt_discount | boolean | Whether GT fee discount is
used | | »» rebated_fee | string | Rebated fee | | »» rebated_fee_currency |
string | Rebated fee currency unit | | »» stp_id | integer | Orders between
users in the same `stp_id` group are not allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | »» stp_act | string | Self-Trading Prevention Action. Users can
use this field to set self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, Cancel old orders and keep new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »» finish_as |
string | How the order was finished.

\- open: processing  
\- filled: filled totally  
\- cancelled: manually cancelled  
\- ioc: time in force is `IOC`, finish immediately  
\- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-20) Enumerated Values

| Property      | Value        |
| ------------- | ------------ |
| status        | open         |
| status        | closed       |
| status        | cancelled    |
| type          | limit        |
| type          | market       |
| account       | spot         |
| account       | margin       |
| account       | cross_margin |
| account       | unified      |
| side          | buy          |
| side          | sell         |
| time_in_force | gtc          |
| time_in_force | ioc          |
| time_in_force | poc          |
| time_in_force | fok          |
| stp_act       | cn           |
| stp_act       | co           |
| stp_act       | cb           |
| stp_act       | \-           |
| finish_as     | open         |
| finish_as     | filled       |
| finish_as     | cancelled    |
| finish_as     | ioc          |
| finish_as     | stp          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-price-triggered-order) Create a price-triggered order

> Code samples

`POST /spot/price_orders`

_Create a price-triggered order_

> Body parameter

```
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

| Name             | In   | Type                                                      | Required | Description                                                                                  |
| ---------------- | ---- | --------------------------------------------------------- | -------- | -------------------------------------------------------------------------------------------- |
| body             | body | [SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder) | true     | none                                                                                         |
| » trigger        | body | object                                                    | true     | none                                                                                         |
| »» price         | body | string                                                    | true     | Trigger price                                                                                |
| »» rule          | body | string                                                    | true     | Price trigger condition                                                                      |
| »» expiration    | body | integer                                                   | true     | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |
| » put            | body | object                                                    | true     | none                                                                                         |
| »» type          | body | string                                                    | false    | Order type，default to `limit`                                                               |
| »» side          | body | string                                                    | true     | Order side                                                                                   |
| »» price         | body | string                                                    | true     | Order price                                                                                  |
| »» amount        | body | string                                                    | true     | When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC`       |
| »» account       | body | string                                                    | true     | Trading account type. Portfolio margin account must set to `cross_margin`                    |
| »» time_in_force | body | string                                                    | false    | time_in_force                                                                                |
| »» text          | body | string                                                    | false    | The source of the order, including:                                                          |
| » market         | body | string                                                    | true     | Currency pair                                                                                |

#### [#](#detailed-descriptions-18) Detailed descriptions

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
`cross_margin`

- normal: spot trading
- margin: margin trading
- cross_margin: cross_margin trading

**»» time_in_force**: time_in_force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only

**»» text**: The source of the order, including:

- web: web
- api: api
- app: app

#### [#](#enumerated-values-21) Enumerated Values

| Parameter        | Value        |
| ---------------- | ------------ |
| »» rule          | \>=          |
| »» rule          | <=           |
| »» type          | limit        |
| »» type          | market       |
| »» side          | buy          |
| »» side          | sell         |
| »» account       | normal       |
| »» account       | margin       |
| »» account       | cross_margin |
| »» time_in_force | gtc          |
| »» time_in_force | ioc          |

> Example responses

> 201 Response

```
{
  "id": 1432329
}
```

### Responses

| Status | Meaning                                                                         | Description   | Schema |
| ------ | ------------------------------------------------------------------------------- | ------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created | Inline |

### Response Schema

Status Code **201**

_TriggerOrderResponse_

| Name | Type           | Description   |
| ---- | -------------- | ------------- |
| » id | integer(int64) | Auto order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-running-auto-order-list) Retrieve running auto order list

> Code samples

`GET /spot/price_orders`

_Retrieve running auto order list_

### Parameters

| Name    | In    | Type    | Required | Description                                                               |
| ------- | ----- | ------- | -------- | ------------------------------------------------------------------------- |
| status  | query | string  | true     | Only list the orders with this status                                     |
| market  | query | string  | false    | Currency pair                                                             |
| account | query | string  | false    | Trading account type. Portfolio margin account must set to `cross_margin` |
| limit   | query | integer | false    | Maximum number of records to be returned in a single list                 |
| offset  | query | integer | false    | List offset, starting from 0                                              |

#### [#](#enumerated-values-22) Enumerated Values

| Parameter | Value        |
| --------- | ------------ |
| status    | open         |
| status    | finished     |
| account   | normal       |
| account   | margin       |
| account   | cross_margin |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                                                        |
| ------ | -------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders) Cancel all open orders

> Code samples

`DELETE /spot/price_orders`

_Cancel all open orders_

### Parameters

| Name    | In    | Type   | Required | Description                                                               |
| ------- | ----- | ------ | -------- | ------------------------------------------------------------------------- |
| market  | query | string | false    | Currency pair                                                             |
| account | query | string | false    | Trading account type. Portfolio margin account must set to `cross_margin` |

#### [#](#enumerated-values-23) Enumerated Values

| Parameter | Value        |
| --------- | ------------ |
| account   | normal       |
| account   | margin       |
| account   | cross_margin |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                                                               | Schema                                                        |
| ------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted. Query order status by listing orders | \[[SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order) Get a price-triggered order

> Code samples

`GET /spot/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

| Name     | In   | Type   | Required | Description                                          |
| -------- | ---- | ------ | -------- | ---------------------------------------------------- |
| order_id | path | string | true     | Retrieve the data of the order with the specified ID |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description       | Schema                                                    |
| ------ | -------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order) cancel a price-triggered order

> Code samples

`DELETE /spot/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

| Name     | In   | Type   | Required | Description                                          |
| -------- | ---- | ------ | -------- | ---------------------------------------------------- |
| order_id | path | string | true     | Retrieve the data of the order with the specified ID |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description       | Schema                                                    |
| ------ | -------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret
