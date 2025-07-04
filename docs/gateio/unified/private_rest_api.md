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

# [#](#unified) Unified

Unified account

## [#](#get-unified-account-information) Get unified account information

> Code samples

`GET /unified/accounts`

_Get unified account information_

The assets of each currency in the account will be adjusted according to their
liquidity, defined by corresponding adjustment coefficients, and then uniformly
converted to USD to calculate the total asset value and position value of the
account.

You can refer to the [Formula](#portfolio-account) in the documentation

### Parameters

| Name     | In    | Type   | Required | Description                             |
| -------- | ----- | ------ | -------- | --------------------------------------- |
| currency | query | string | false    | Retrieve data of the specified currency |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema |
| ------ | -------------------------------------------------------------------------- | -------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name                             | Type           | Description                                                                                                                               |
| -------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| » user_id                        | integer(int64) | User ID                                                                                                                                   |
| » refresh_time                   | integer(int64) | Time of the most recent refresh                                                                                                           |
| » locked                         | boolean        | Whether account is locked                                                                                                                 |
| » balances                       | object         | none                                                                                                                                      |
| »» UnifiedBalance                | object         | none                                                                                                                                      |
| »»» available                    | string         | Available amount                                                                                                                          |
| »»» freeze                       | string         | Locked amount                                                                                                                             |
| »»» borrowed                     | string         | Borrowed amount                                                                                                                           |
| »»» negative_liab                | string         | Negative Liabilities                                                                                                                      |
| »»» futures_pos_liab             | string         | Borrowing to Open Positions in Futures                                                                                                    |
| »»» equity                       | string         | Equity                                                                                                                                    |
| »»» total_freeze                 | string         | Total freeze                                                                                                                              |
| »»» total_liab                   | string         | Total liabilities                                                                                                                         |
| »»» spot_in_use                  | string         | Spot hedging utilization                                                                                                                  |
| »»» funding                      | string         | Quantity of funding                                                                                                                       |
| »»» funding_version              | string         | Funding version                                                                                                                           |
| »» total                         | string         | The total asset value in USD, calculated as the sum of the product of `(available + freeze) * price` for all currencies.                  |
| »» borrowed                      | string         | The total borrowed amount in USD, calculated as the sum of the product of `borrowed * price` for all currencies (excluding points cards). |
| »» total_initial_margin          | string         | Total initial margin                                                                                                                      |
| »» total_margin_balance          | string         | Total margin balance                                                                                                                      |
| »» total_maintenance_margin      | string         | Total maintenance margin                                                                                                                  |
| »» total_initial_margin_rate     | string         | Total initial margin rate                                                                                                                 |
| »» total_maintenance_margin_rate | string         | Total maintenance margin rate                                                                                                             |
| »» total_available_margin        | string         | Total available margin                                                                                                                    |
| »» unified_account_total         | string         | Total amount of the portfolio margin account                                                                                              |
| »» unified_account_total_liab    | string         | Total liabilities of the portfolio margin account                                                                                         |
| »» unified_account_total_equity  | string         | Total equity of the portfolio margin account                                                                                              |
| »» leverage                      | string         | Leverage                                                                                                                                  |
| »» spot_order_loss               | string         | Total order loss, in USDT                                                                                                                 |
| »» spot_hedge                    | boolean        | Spot hedging status, true - enabled, false - not enabled.                                                                                 |
| »» use_funding                   | boolean        | Whether to use funds as margin                                                                                                            |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-unified-account-mode-deprecated) Set unified account mode (deprecated)

> Code samples

`POST /unified/account_mode`

_Set unified account mode (deprecated)_

> Body parameter

```
{
  "mode": "cross_margin",
  "enabled": true
}
```

### Parameters

| Name      | In   | Type    | Required | Description    |
| --------- | ---- | ------- | -------- | -------------- |
| body      | body | object  | true     | none           |
| » mode    | body | string  | true     | Portfolio mode |
| » enabled | body | boolean | true     | Is it enabled? |

#### [#](#detailed-descriptions-5) Detailed descriptions

**» mode**: Portfolio mode

- cross_margin : cross margin
- usdt_futures : usdt futures

> Example responses

> 200 Response

```
{
  "cross_margin": true,
  "usdt_futures": true
}
```

### Responses

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | Inline |

### Response Schema

Status Code **200**

| Name                       | Type    | Description |
| -------------------------- | ------- | ----------- |
| » **additionalProperties** | boolean | none        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#inquire-about-unified-account-mode-deprecated) Inquire about unified account mode (deprecated)

> Code samples

`GET /unified/account_mode`

_Inquire about unified account mode (deprecated)_

cross_margin - Spot full-margin trading, usdt_futures - USDT perpetual futures

> Example responses

> 200 Response

```
{
  "cross_margin": true,
  "usdt_futures": true
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                       | Type    | Description |
| -------------------------- | ------- | ----------- |
| » **additionalProperties** | boolean | none        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-about-the-maximum-borrowing-for-the-unified-account) Query about the maximum borrowing for the unified account

> Code samples

`GET /unified/borrowable`

_Query about the maximum borrowing for the unified account_

### Parameters

| Name     | In    | Type   | Required | Description                             |
| -------- | ----- | ------ | -------- | --------------------------------------- |
| currency | query | string | true     | Retrieve data of the specified currency |

> Example responses

> 200 Response

```
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_UnifiedBorrowable_

| Name       | Type   | Description           |
| ---------- | ------ | --------------------- |
| » currency | string | Currency detail       |
| » amount   | string | Max borrowable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-about-the-maximum-transferable-for-the-unified-account) Query about the maximum transferable for the unified account

> Code samples

`GET /unified/transferable`

_Query about the maximum transferable for the unified account_

### Parameters

| Name     | In    | Type   | Required | Description                             |
| -------- | ----- | ------ | -------- | --------------------------------------- |
| currency | query | string | true     | Retrieve data of the specified currency |

> Example responses

> 200 Response

```
{
  "currency": "ETH",
  "amount": "10000"
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_UnifiedTransferable_

| Name       | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| » currency | string | Currency detail                                |
| » amount   | string | The maximum amount that can be transferred out |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay) Borrow or repay

> Code samples

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

```
{
  "currency": "BTC",
  "amount": "0.1",
  "type": "borrow",
  "repaid_all": false,
  "text": "t-test"
}
```

### Parameters

| Name         | In   | Type    | Required | Description                                                                                                                           |
| ------------ | ---- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| body         | body | object  | true     | none                                                                                                                                  |
| » currency   | body | string  | true     | Currency                                                                                                                              |
| » type       | body | string  | true     | type: borrow - borrow, repay - repay                                                                                                  |
| » amount     | body | string  | true     | The amount of lending or repaying                                                                                                     |
| » repaid_all | body | boolean | false    | Full repayment is solely for repayment operations. When set to 'true,' it overrides the 'amount,' allowing for direct full repayment. |
| » text       | body | string  | false    | User defined custom ID                                                                                                                |

#### [#](#enumerated-values-11) Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| » type    | borrow |
| » type    | repay  |

### Responses

| Status | Meaning                                                                            | Description           | Schema |
| ------ | ---------------------------------------------------------------------------------- | --------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Operated successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-loans) List loans

> Code samples

`GET /unified/loans`

_List loans_

### Parameters

| Name     | In    | Type           | Required | Description                                                    |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------- |
| currency | query | string         | false    | Retrieve data of the specified currency                        |
| page     | query | integer(int32) | false    | Page number                                                    |
| limit    | query | integer(int32) | false    | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| type     | query | string         | false    | Loan type, platform - platform, margin - margin                |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name             | Type           | Description                                     |
| ---------------- | -------------- | ----------------------------------------------- |
| _None_           | array          | \[Loan\]                                        |
| » _None_         | object         | Loan                                            |
| »» currency      | string         | Currency                                        |
| »» currency_pair | string         | Currency pair                                   |
| »» amount        | string         | amount                                          |
| »» type          | string         | Loan type, platform - platform, margin - margin |
| »» create_time   | integer(int64) | Created time                                    |
| »» update_time   | integer(int64) | Updated time                                    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-load-records) Get load records

> Code samples

`GET /unified/loan_records`

_Get load records_

### Parameters

| Name     | In    | Type           | Required | Description                                                                                                                                 |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| type     | query | string         | false    | The types of lending records, borrow - indicates the action of borrowing funds, repay - indicates the action of repaying the borrowed funds |
| currency | query | string         | false    | Retrieve data of the specified currency                                                                                                     |
| page     | query | integer(int32) | false    | Page number                                                                                                                                 |
| limit    | query | integer(int32) | false    | Maximum response items. Default: 100, minimum: 1, Maximum: 100                                                                              |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name              | Type           | Description                                                                                                                                                             |
| ----------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » _None_          | object         | Loan records                                                                                                                                                            |
| »» id             | integer(int64) | id                                                                                                                                                                      |
| »» type           | string         | type: borrow - borrow, repay - repay                                                                                                                                    |
| »» repayment_type | string         | Repayment type: none - no repayment type, manual_repay - manual repayment, auto_repay - automatic repayment, cancel_auto_repay - automatic repayment after cancellation |
| »» currency_pair  | string         | Currency pair                                                                                                                                                           |
| »» currency       | string         | Currency                                                                                                                                                                |
| »» amount         | string         | The amount of lending or repaying                                                                                                                                       |
| »» create_time    | integer(int64) | Created time                                                                                                                                                            |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records) List interest records

> Code samples

`GET /unified/interest_records`

_List interest records_

### Parameters

| Name     | In    | Type           | Required | Description                                                    |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------- |
| currency | query | string         | false    | Retrieve data of the specified currency                        |
| page     | query | integer(int32) | false    | Page number                                                    |
| limit    | query | integer(int32) | false    | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| type     | query | string         | false    | Loan type, platform - platform, margin - margin                |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name             | Type           | Description                                |
| ---------------- | -------------- | ------------------------------------------ |
| _None_           | array          | \[Interest record\]                        |
| » _None_         | object         | Interest record                            |
| »» currency      | string         | Currency name                              |
| »» currency_pair | string         | Currency pair                              |
| »» actual_rate   | string         | Actual rate                                |
| »» interest      | string         | Interest                                   |
| »» status        | integer        | Status: 0 - fail, 1 - success              |
| »» type          | string         | Type, platform - platform，margin - margin |
| »» create_time   | integer(int64) | Created time                               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-user-risk-unit-details-only-valid-in-portfolio-margin-mode) Retrieve user risk unit details, only valid in portfolio margin mode

> Code samples

`GET /unified/risk_units`

_Retrieve user risk unit details, only valid in portfolio margin mode_

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                | Type           | Description                                               |
| ------------------- | -------------- | --------------------------------------------------------- |
| » user_id           | integer(int64) | User ID                                                   |
| » spot_hedge        | boolean        | Spot hedging status, true - enabled, false - not enabled. |
| » risk_units        | array          | Risk unit                                                 |
| »» RiskUnits        | object         | none                                                      |
| »»» symbol          | string         | Risk unit flag                                            |
| »»» spot_in_use     | string         | Spot hedging utilization                                  |
| »»» maintain_margin | string         | Maintenance margin for risk unit                          |
| »»» initial_margin  | string         | Initial margin for risk unit                              |
| »»» delta           | string         | Total Delta of risk unit                                  |
| »»» gamma           | string         | Total Gamma of risk unit                                  |
| »»» theta           | string         | Total Theta of risk unit                                  |
| »»» vega            | string         | Total Vega of risk unit                                   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-mode-of-the-unified-account) Set mode of the unified account

> Code samples

`PUT /unified/unified_mode`

_Set mode of the unified account_

Switching between different account modes requires only passing the parameters
n\\corresponding to the target account mode. It also supports opening or closing
configuration switches for the corresponding account mode when switching- When
enabling classic account mode,mode=classic

```
    PUT /unified/unified_mode
    {
      "mode": "classic"
    }
```

- When enabling multi-currency margin mode, mode=multi_currency

```
    PUT /unified/unified_mode
    {
      "mode": "multi_currency",
      "settings": {
         "usdt_futures": true
      }
    }
```

- When enabling portfolio margin mode,mode=portfolio

```
    PUT /unified/unified_mode
    {
      "mode": "portfolio",
      "settings": {
         "spot_hedge": true
      }
    }
```

> Body parameter

```
{
  "mode": "portfolio",
  "settings": {
    "spot_hedge": true
  }
}
```

### Parameters

| Name            | In   | Type    | Required | Description                                                                                  |
| --------------- | ---- | ------- | -------- | -------------------------------------------------------------------------------------------- |
| body            | body | object  | true     | none                                                                                         |
| » mode          | body | string  | true     | Unified account mode:                                                                        |
| » settings      | body | object  | false    | none                                                                                         |
| »» usdt_futures | body | boolean | false    | USDT contract switch. This parameter is required when the mode is multi-currency margin mode |
| »» spot_hedge   | body | boolean | false    | Spot hedging switch. This parameter is required when the mode is portfolio margin mode       |
| »» use_funding  | body | boolean | false    | When the mode is set to combined margin mode, will funds be used as margin                   |

#### [#](#detailed-descriptions-6) Detailed descriptions

**» mode**: Unified account mode:

- `classic`: Classic account mode
- `multi_currency`: Multi-currency margin mode
- `portfolio`: Portfolio margin mode

### Responses

| Status | Meaning                                                                            | Description | Schema |
| ------ | ---------------------------------------------------------------------------------- | ----------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Success     | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-mode-of-the-unified-account) Query mode of the unified account

> Code samples

`GET /unified/unified_mode`

_Query mode of the unified account_

Unified account mode：

- `classic`: Classic account mode
- `multi_currency`: Multi-currency margin mode
- `portfolio`: Portfolio margin mode

> Example responses

> 200 Response

```
{
  "mode": "portfolio",
  "settings": {
    "spot_hedge": true
  }
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name   | Type   | Description           |
| ------ | ------ | --------------------- |
| » mode | string | Unified account mode: |

\- `classic`: Classic account mode  
\- `multi_currency`: Multi-currency margin mode  
\- `portfolio`: Portfolio margin mode | | » settings | object | none | | »»
usdt_futures | boolean | USDT contract switch. This parameter is required when
the mode is multi-currency margin mode | | »» spot_hedge | boolean | Spot
hedging switch. This parameter is required when the mode is portfolio margin
mode | | »» use_funding | boolean | When the mode is set to combined margin
mode, will funds be used as margin |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-unified-estimate-rate) Get unified estimate rate

> Code samples

`GET /unified/estimate_rate`

_Get unified estimate rate_

Due to fluctuations in lending depth, hourly interest rates may vary, and thus,
I cannot provide exact rates. When a currency is not supported, the interest
rate returned will be an empty string.

### Parameters

| Name       | In    | Type            | Required | Description                                                                                                |
| ---------- | ----- | --------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| currencies | query | array\[string\] | true     | Specify the currency names for querying in an array, separated by commas, with a maximum of 10 currencies. |

> Example responses

> 200 Response

```
{
  "BTC": "0.000002",
  "GT": "0.000001",
  "ETH": ""
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

| Name                       | Type   | Description |
| -------------------------- | ------ | ----------- |
| » **additionalProperties** | string | none        |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-currency-discount-tiers) List currency discount tiers

> Code samples

`GET /unified/currency_discount_tiers`

_List currency discount tiers_

> Example responses

> 200 Response

```
[
  [
    {
      "currency": "USDT",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "1",
          "lower_limit": "0",
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
          "upper_limit": "10000000"
        },
        {
          "tier": "2",
          "discount": "0.98",
          "lower_limit": "10000000",
          "upper_limit": "15000000"
        },
        {
          "tier": "3",
          "discount": "0.95",
          "lower_limit": "15000000",
          "upper_limit": "20000000"
        },
        {
          "tier": "4",
          "discount": "0.925",
          "lower_limit": "20000000",
          "upper_limit": "50000000"
        },
        {
          "tier": "5",
          "discount": "0.9",
          "lower_limit": "50000000",
          "upper_limit": "100000000"
        },
        {
          "tier": "6",
          "discount": "0",
          "lower_limit": "100000000",
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
          "upper_limit": "1000"
        },
        {
          "tier": "2",
          "discount": "0.95",
          "lower_limit": "1000",
          "upper_limit": "10000"
        },
        {
          "tier": "3",
          "discount": "0.9",
          "lower_limit": "10000",
          "upper_limit": "50000"
        },
        {
          "tier": "4",
          "discount": "0.85",
          "lower_limit": "50000",
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
          "upper_limit": "1000"
        },
        {
          "tier": "2",
          "discount": "0.95",
          "lower_limit": "1000",
          "upper_limit": "10000"
        },
        {
          "tier": "3",
          "discount": "0.9",
          "lower_limit": "10000",
          "upper_limit": "50000"
        },
        {
          "tier": "4",
          "discount": "0.85",
          "lower_limit": "50000",
          "upper_limit": "+"
        }
      ]
    }
  ]
]
```

### Responses

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name              | Type   | Description                                |
| ----------------- | ------ | ------------------------------------------ |
| » _None_          | object | Currency discount tiers                    |
| »» currency       | string | Currency name                              |
| »» discount_tiers | array  | Tiered discount                            |
| »»» tier          | string | Tier                                       |
| »»» discount      | string | Discount                                   |
| »»» lower_limit   | string | Lower limit                                |
| »»» upper_limit   | string | Upper limit,＋ indicates positive infinity |

This operation does not require authentication

## [#](#list-loan-margin-tiers) List loan margin tiers

> Code samples

`GET /unified/loan_margin_tiers`

_List loan margin tiers_

> Example responses

> 200 Response

```
[
  {
    "currency": "USDT",
    "margin_tiers": [
      {
        "tier": "1",
        "margin_rate": "0.02",
        "lower_limit": "200000",
        "upper_limit": "400000"
      }
    ]
  }
]
```

### Responses

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name             | Type   | Description                                            |
| ---------------- | ------ | ------------------------------------------------------ |
| » _None_         | object | Unified margin tiers                                   |
| »» currency      | string | Currency name                                          |
| »» margin_tiers  | array  | Margin tiers                                           |
| »»» MarginTiers  | object | none                                                   |
| »»»» tier        | string | Tier                                                   |
| »»»» margin_rate | string | Discount                                               |
| »»»» lower_limit | string | Lower limit                                            |
| »»»» upper_limit | string | Upper limit, "" indicates greater than (the last tier) |

This operation does not require authentication

## [#](#portfolio-margin-calculator) Portfolio margin calculator

> Code samples

`POST /unified/portfolio_calculator`

_Portfolio margin calculator_

Portfolio Margin Calculator When inputting a simulated position portfolio, each
position includes the position name and quantity held, supporting markets within
the range of BTC and ETH perpetual contracts, options, and spot markets. When
inputting simulated orders, each order includes the market identifier, order
price, and order quantity, supporting markets within the range of BTC and ETH
perpetual contracts, options, and spot markets. Market orders are not included.

> Body parameter

```
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

| Name                    | In   | Type    | Required | Description                                                                                   |
| ----------------------- | ---- | ------- | -------- | --------------------------------------------------------------------------------------------- |
| body                    | body | object  | true     | none                                                                                          |
| » spot_balances         | body | array   | false    | Spot                                                                                          |
| »» _None_               | body | object  | false    | Spot                                                                                          |
| »»» currency            | body | string  | true     | Currency name                                                                                 |
| »»» equity              | body | string  | true     | Currency equity, where equity = balance - borrowed, represents the net delta exposure         |
| »» spot_orders          | body | array   | false    | Spot orders                                                                                   |
| »»» _None_              | body | object  | false    | Spot orders                                                                                   |
| »»»» currency_pairs     | body | string  | true     | Currency pair                                                                                 |
| »»»» order_price        | body | string  | true     | Price                                                                                         |
| »»»» count              | body | string  | false    | Initial order quantity for spot trading pairs, not involved in actual calculation.            |
| »»»» left               | body | string  | true     | Unfilled quantity, involved in actual calculation.                                            |
| »»»» type               | body | string  | true     | Order type, sell - sell order, buy - buy order.                                               |
| »»» futures_positions   | body | array   | false    | Futures positions                                                                             |
| »»»» _None_             | body | object  | false    | Futures positions                                                                             |
| »»»»» contract          | body | string  | true     | Futures name, currently only supports perpetual futures for BTC and ETH with USDT.            |
| »»»»» size              | body | string  | true     | Position size, measured in contract units.                                                    |
| »»»» futures_orders     | body | array   | false    | Futures order                                                                                 |
| »»»»» _None_            | body | object  | false    | Futures order                                                                                 |
| »»»»»» contract         | body | string  | true     | Futures name, currently only supports perpetual futures for BTC and ETH with USDT.            |
| »»»»»» size             | body | string  | true     | Futures quantity, representing the initial order quantity, not involved in actual settlement. |
| »»»»»» left             | body | string  | true     | Unfilled contract quantity, involved in actual calculation                                    |
| »»»»» options_positions | body | array   | false    | Options positions                                                                             |
| »»»»»» _None_           | body | object  | false    | Options positions                                                                             |
| »»»»»»» options_name    | body | string  | true     | Option name, currently only supports options for BTC and ETH with USDT.                       |
| »»»»»»» size            | body | string  | true     | Position size, measured in contract units.                                                    |
| »»»»»» options_orders   | body | array   | false    | Option orders                                                                                 |
| »»»»»»» _None_          | body | object  | false    | Option orders                                                                                 |
| »»»»»»»» options_name   | body | string  | true     | Option name, currently only supports options for BTC and ETH with USDT.                       |
| »»»»»»»» size           | body | string  | true     | Initial order quantity, not involved in actual calculation                                    |
| »»»»»»»» left           | body | string  | true     | Unfilled contract quantity, involved in actual calculation                                    |
| »»»»»»» spot_hedge      | body | boolean | false    | Whether to enable spot hedging.                                                               |

#### [#](#detailed-descriptions-7) Detailed descriptions

**»»» equity**: Currency equity, where equity = balance - borrowed, represents
the net delta exposure of your spot positions, which can be negative. Currently
only supports three currencies: BTC, ETH.

**»»»» count**: Initial order quantity for spot trading pairs, not involved in
actual calculation. Currently only supports three currencies: BTC, ETH.

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_The output of the portfolio margin calculator._

| Name                                                                                                         | Type           | Description                                                                                                       |
| ------------------------------------------------------------------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| » maintain_margin_total                                                                                      | string         | Total maintenance margin, including only the portfolio margin calculation results for positions in the risk unit, |
| excluding borrowed margin. If borrowing exists, conventional borrowing margin requirements will still apply. |
| » initial_margin_total                                                                                       | string         | Total initial margin, calculated as the maximum of the following three combinations: position,                    |
| position + positive delta orders, position + negative delta orders.                                          |
| » calculate_time                                                                                             | integer(int64) | Calculate time                                                                                                    |
| » risk_unit                                                                                                  | array          | Risk unit                                                                                                         |
| »» _None_                                                                                                    | object         | Risk unit                                                                                                         |
| »»» symbol                                                                                                   | string         | Risk unit name                                                                                                    |
| »»» spot_in_use                                                                                              | string         | Spot usage                                                                                                        |
| »»» maintain_margin                                                                                          | string         | Maintenance margin                                                                                                |
| »»» initial_margin                                                                                           | string         | Initial margin                                                                                                    |
| »»» margin_result                                                                                            | array          | Margin result                                                                                                     |
| »»»» _None_                                                                                                  | object         | Margin result                                                                                                     |
| »»»»» type                                                                                                   | string         | Position combination type                                                                                         |

`original_position` - Original position  
`long_delta_original_position` - Positive delta + Original position  
`short_delta_original_position` - Negative delta + Original position | | »»»»»
profit_loss_ranges | array | The results of 33 pressure scenarios for MR1 | |
»»»»»» _None_ | object | Profit and loss range | | »»»»»»» price_percentage |
string | Percentage change in price | | »»»»»»» implied_volatility_percentage |
string | Percentage change in implied volatility | | »»»»»»» profit_loss |
string | PNL | | »»»»»» max_loss | object | Profit and loss range | | »»»»»»»
price_percentage | string | Percentage change in price | | »»»»»»»
implied_volatility_percentage | string | Percentage change in implied volatility
| | »»»»»»» profit_loss | string | PNL | | »»»»»» mr1 | string | Stress testing
| | »»»»»» mr2 | string | Basis spread risk | | »»»»»» mr3 | string | Volatility
spread risk | | »»»»»» mr4 | string | Option short risk | | »»»»» delta | string
| Total Delta of risk unit | | »»»»» gamma | string | Total Gamma of risk unit |
| »»»»» theta | string | Total Theta of risk unit | | »»»»» vega | string |
Total Vega of risk unit |

This operation does not require authentication
