# [#](#gate-api-v4-102-1) Gate API v4.102.1

Scroll down for code samples, example requests and responses. Select a language
for code samples from the tabs above or the mobile navigation menu.

Welcome to Gate API APIv4 provides operations related to spot, margin, and
contract trading, including public interfaces for querying market data and
authenticated private interfaces for implementing API-based automated trading.

## [#](#access-url) Access URL

**REST API BaseURL:**

- Live trading: `https://api.gateio.ws/api/v4`
- TestNet trading: `https://api-testnet.gateapi.io/api/v4`
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

1.  Provide Gate UID
2.  Provide other transaction volume screenshot or VIP level
3.  Brief introduction of market making method and scale

Provide the above content and submit to [mm@gate.com](mailto:mm@gate.com) , we
will accept within 3 working days.

TIP

Vip11 and above need to open GT deduction in the personal center to enjoy the
professional market rate.

## [#](#technical-support) Technical Support

If you have any questions or suggestions during the use, you can contact us in
any of the following ways:

- Submit Work Order Feedback
- Online Work Order Feedback
- Send your contact information and questions to
  [mm@gate.com](mailto:mm@gate.com) We will assign technical specialists to
  serve you.

If you encounter API errors, it is recommended that you sort out the following
content, so that we can quickly analyze the problem for you:

1.  Problem Description
2.  Gate UID
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

Gate Order matching follows Price Priority > Time priority principle.

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

Gate data center is located in AWS Japan's ap-northeast-1 region.

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

- Spot: Bulk order/single order/single order modification, a total of 10
  requests per second (10r/s).
- Futures: Bulk order/single order/single order modification/single order
  cancellation/bulk cancellation, a total of 100 requests per second (100r/s).
- Others: No limit.
- Number of connections per IP: ≤ 300

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

| Product Typee                    | Based On        | Independnet Symbol Multiplier | Default Symbol Multiplier |
| -------------------------------- | --------------- | ----------------------------- | ------------------------- |
| USDT-Margined Perpetural Futures | Contract Symbol | 1                             |

Contract Symbol:  
BTC-USDT  
ETH-USDT | 0.4 | | Spot | Currency Pairst | 1  
Currency Pairs:  
BTC-USDT  
ETH-USDT | 0.4 |

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

| Contract Frequency Limitation Rules |
| ----------------------------------- | -------- | ---------------- |
| Tier                                | Ratio    | Rate Limit (uid) |
| Tier 1                              | \[0,1)   | 100r/s           |
| Tier 2                              | \[1,3)   | 150r/s           |
| Tier 3                              | \[3,5)   | 200r/s           |
| Tier 4                              | \[5,10)  | 250r/s           |
| Tier 5                              | \[10,20) | 300r/s           |
| Tier 6                              | \[20,50) | 350r/s           |
| Tier 7                              | \>= 50   | 400r/s           |

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

Since version `4.25.0`, we start supporting portfolio margin account. Gate's
Portfolio Margin Account is a new feature of Gate's trading system. Its main
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
please refer to [here](https://www.gate.com/unified-trading-account)

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
- 3302 : Gate.TR&Gate Transfer
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

# [#](#options) Options

Options API

## [#](#list-all-underlyings) List all underlyings

> Code samples

`GET /options/underlyings`

_List all underlyings_

> Example responses

> 200 Response

```
[
  {
    "name": "BTC_USDT",
    "index_price": "70000"
  }
]
```

### Responses

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type   | Description                       |
| ------------- | ------ | --------------------------------- |
| » name        | string | Underlying name                   |
| » index_price | string | Spot index price (quote currency) |

This operation does not require authentication

## [#](#list-all-expiration-times) List all expiration times

> Code samples

`GET /options/expirations`

_List all expiration times_

### Parameters

| Name       | In    | Type   | Required | Description                                          |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------- |
| underlying | query | string | true     | Underlying (Obtained by listing underlying endpoint) |

> Example responses

> 200 Response

```
[
  1637913600
]
```

### Responses

| Status | Meaning                                                                    | Description                                   | Schema      |
| ------ | -------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List expiration times of specified underlying | \[integer\] |

### Response Schema

Status Code **200**

| Name     | Type           | Description                           |
| -------- | -------------- | ------------------------------------- |
| » _None_ | integer(int64) | Unix timestamp of the expiration time |

This operation does not require authentication

## [#](#list-all-the-contracts-with-specified-underlying-and-expiration-time) List all the contracts with specified underlying and expiration time

> Code samples

`GET /options/contracts`

_List all the contracts with specified underlying and expiration time_

### Parameters

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| expiration | query | integer(int64) | false    | Unix timestamp of the expiration time                |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                   | Type           | Description                                                                                                                                                             |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _None_                 | array          | \[Options contract detail\]                                                                                                                                             |
| » _None_               | object         | Options contract detail                                                                                                                                                 |
| »» name                | string         | Options contract name                                                                                                                                                   |
| »» tag                 | string         | tag                                                                                                                                                                     |
| »» create_time         | number(double) | Creation time                                                                                                                                                           |
| »» expiration_time     | number(double) | Expiration time                                                                                                                                                         |
| »» is_call             | boolean        | `true` means call options, while `false` is put options                                                                                                                 |
| »» multiplier          | string         | Multiplier used in converting from invoicing to settlement currency                                                                                                     |
| »» underlying          | string         | Underlying                                                                                                                                                              |
| »» underlying_price    | string         | Underlying price (quote currency)                                                                                                                                       |
| »» last_price          | string         | Last trading price                                                                                                                                                      |
| »» mark_price          | string         | Current mark price (quote currency)                                                                                                                                     |
| »» index_price         | string         | Current index price (quote currency)                                                                                                                                    |
| »» maker_fee_rate      | string         | Maker fee rate, where negative means rebate                                                                                                                             |
| »» taker_fee_rate      | string         | Taker fee rate                                                                                                                                                          |
| »» order_price_round   | string         | Minimum order price increment                                                                                                                                           |
| »» mark_price_round    | string         | Minimum mark price increment                                                                                                                                            |
| »» order_size_min      | integer(int64) | Minimum order size the contract allowed                                                                                                                                 |
| »» order_size_max      | integer(int64) | Maximum order size the contract allowed                                                                                                                                 |
| »» order_price_deviate | string         | The positive and negative offset allowed between the order price and the current mark price, that is, the order price `order_price` must meet the following conditions: |

order_price is within the range of mark_price +/- order_price_deviate \*
underlying_price and does not distinguish between buy and sell orders | | »»
ref_discount_rate | string | Referral fee rate discount | | »» ref_rebate_rate |
string | Referrer commission rate | | »» orderbook_id | integer(int64) | Current
orderbook ID | | »» trade_id | integer(int64) | Current trade ID | | »»
trade_size | integer(int64) | Historical accumulated trade size | | »»
position_size | integer(int64) | Current total long position size | | »»
orders_limit | integer | Maximum number of open orders |

This operation does not require authentication

## [#](#query-specified-contract-detail) Query specified contract detail

> Code samples

`GET /options/contracts/{contract}`

_Query specified contract detail_

### Parameters

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| contract | path | string | true     | none        |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Options contract detail_

| Name                  | Type           | Description                                                                                                                                                             |
| --------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » name                | string         | Options contract name                                                                                                                                                   |
| » tag                 | string         | tag                                                                                                                                                                     |
| » create_time         | number(double) | Creation time                                                                                                                                                           |
| » expiration_time     | number(double) | Expiration time                                                                                                                                                         |
| » is_call             | boolean        | `true` means call options, while `false` is put options                                                                                                                 |
| » multiplier          | string         | Multiplier used in converting from invoicing to settlement currency                                                                                                     |
| » underlying          | string         | Underlying                                                                                                                                                              |
| » underlying_price    | string         | Underlying price (quote currency)                                                                                                                                       |
| » last_price          | string         | Last trading price                                                                                                                                                      |
| » mark_price          | string         | Current mark price (quote currency)                                                                                                                                     |
| » index_price         | string         | Current index price (quote currency)                                                                                                                                    |
| » maker_fee_rate      | string         | Maker fee rate, where negative means rebate                                                                                                                             |
| » taker_fee_rate      | string         | Taker fee rate                                                                                                                                                          |
| » order_price_round   | string         | Minimum order price increment                                                                                                                                           |
| » mark_price_round    | string         | Minimum mark price increment                                                                                                                                            |
| » order_size_min      | integer(int64) | Minimum order size the contract allowed                                                                                                                                 |
| » order_size_max      | integer(int64) | Maximum order size the contract allowed                                                                                                                                 |
| » order_price_deviate | string         | The positive and negative offset allowed between the order price and the current mark price, that is, the order price `order_price` must meet the following conditions: |

order_price is within the range of mark_price +/- order_price_deviate \*
underlying_price and does not distinguish between buy and sell orders | | »
ref_discount_rate | string | Referral fee rate discount | | » ref_rebate_rate |
string | Referrer commission rate | | » orderbook_id | integer(int64) | Current
orderbook ID | | » trade_id | integer(int64) | Current trade ID | | » trade_size
| integer(int64) | Historical accumulated trade size | | » position_size |
integer(int64) | Current total long position size | | » orders_limit | integer |
Maximum number of open orders |

This operation does not require authentication

## [#](#list-settlement-history-2) List settlement history

> Code samples

`GET /options/settlements`

_List settlement history_

### Parameters

| Name       | In    | Type           | Required | Description                                               |
| ---------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint)      |
| limit      | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset     | query | integer        | false    | List offset, starting from 0                              |
| from       | query | integer(int64) | false    | Start timestamp                                           |
| to         | query | integer(int64) | false    | Termination Timestamp                                     |

#### [#](#detailed-descriptions-42) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name           | Type           | Description                                 |
| -------------- | -------------- | ------------------------------------------- |
| _None_         | array          | none                                        |
| » time         | number(double) | Last changed time of configuration          |
| » contract     | string         | Options contract name                       |
| » profit       | string         | Settlement profit per size (quote currency) |
| » fee          | string         | Settlement fee per size (quote currency)    |
| » strike_price | string         | Strike price (quote currency)               |
| » settle_price | string         | Settlement price (quote currency)           |

This operation does not require authentication

## [#](#get-specified-contract-s-settlement) Get specified contract's settlement

> Code samples

`GET /options/settlements/{contract}`

_Get specified contract's settlement_

### Parameters

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| contract   | path  | string         | true     | none                                                 |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| at         | query | integer(int64) | true     | none                                                 |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name           | Type           | Description                                 |
| -------------- | -------------- | ------------------------------------------- |
| » time         | number(double) | Last changed time of configuration          |
| » contract     | string         | Options contract name                       |
| » profit       | string         | Settlement profit per size (quote currency) |
| » fee          | string         | Settlement fee per size (quote currency)    |
| » strike_price | string         | Strike price (quote currency)               |
| » settle_price | string         | Settlement price (quote currency)           |

This operation does not require authentication

## [#](#list-my-options-settlements) List my options settlements

> Code samples

`GET /options/my_settlements`

_List my options settlements_

### Parameters

| Name       | In    | Type           | Required | Description                                               |
| ---------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint)      |
| contract   | query | string         | false    | Options contract name                                     |
| limit      | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset     | query | integer        | false    | List offset, starting from 0                              |
| from       | query | integer(int64) | false    | Start timestamp                                           |
| to         | query | integer(int64) | false    | Termination Timestamp                                     |

#### [#](#detailed-descriptions-43) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name            | Type           | Description                                                                                                             |
| --------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| » time          | number(double) | Settlement time                                                                                                         |
| » underlying    | string         | Underlying                                                                                                              |
| » contract      | string         | Options contract name                                                                                                   |
| » strike_price  | string         | Strike price (quote currency)                                                                                           |
| » settle_price  | string         | Settlement price (quote currency)                                                                                       |
| » size          | integer(int64) | Size                                                                                                                    |
| » settle_profit | string         | Settlement profit (quote currency)                                                                                      |
| » fee           | string         | Fee (quote currency)                                                                                                    |
| » realised_pnl  | string         | The accumulated profit and loss of opening a position, including premium, fee, settlement profit, etc. (quote currency) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#options-order-book) Options order book

> Code samples

`GET /options/order_book`

_Options order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

| Name     | In    | Type    | Required | Description                                                           |
| -------- | ----- | ------- | -------- | --------------------------------------------------------------------- |
| contract | query | string  | true     | Options contract name                                                 |
| interval | query | string  | false    | Order depth. 0 means no aggregation is applied. default to 0          |
| limit    | query | integer | false    | Maximum number of order depth data in asks or bids                    |
| with_id  | query | boolean | false    | Whether to return depth update ID. This ID increments by 1 each time. |

#### [#](#enumerated-values-117) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 0     |
| interval  | 0.1   |
| interval  | 0.01  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Depth query successful | Inline |

### Response Schema

Status Code **200**

| Name                        | Type           | Description                                                                                                    |
| --------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------- |
| » id                        | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set `with_id=true` to include this field in response |
| » current                   | number(double) | Response data generation timestamp                                                                             |
| » update                    | number(double) | Order book changed timestamp                                                                                   |
| » asks                      | array          | Asks order depth                                                                                               |
| »» futures_order_book_item  | object         | none                                                                                                           |
| »»» p                       | string         | Price (quote currency)                                                                                         |
| »»» s                       | integer(int64) | Size                                                                                                           |
| »» bids                     | array          | Bids order depth                                                                                               |
| »»» futures_order_book_item | object         | none                                                                                                           |
| »»»» p                      | string         | Price (quote currency)                                                                                         |
| »»»» s                      | integer(int64) | Size                                                                                                           |

This operation does not require authentication

## [#](#list-tickers-of-options-contracts) List tickers of options contracts

> Code samples

`GET /options/tickers`

_List tickers of options contracts_

### Parameters

| Name       | In    | Type   | Required | Description                                          |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------- |
| underlying | query | string | true     | Underlying (Obtained by listing underlying endpoint) |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name             | Type           | Description                                                       |
| ---------------- | -------------- | ----------------------------------------------------------------- |
| » _None_         | object         | Options contract detail                                           |
| »» name          | string         | Options contract name                                             |
| »» last_price    | string         | Last trading price (quote currency)                               |
| »» mark_price    | string         | Current mark price (quote currency)                               |
| »» index_price   | string         | Current index price (quote currency)                              |
| »» ask1_size     | integer(int64) | Best ask size                                                     |
| »» ask1_price    | string         | Best ask price                                                    |
| »» bid1_size     | integer(int64) | Best bid size                                                     |
| »» bid1_price    | string         | Best bid price                                                    |
| »» position_size | integer(int64) | Current total long position size                                  |
| »» mark_iv       | string         | Implied volatility                                                |
| »» bid_iv        | string         | Bid side implied volatility                                       |
| »» ask_iv        | string         | Ask side implied volatility                                       |
| »» leverage      | string         | Current leverage. Formula: underlying_price / mark_price \* delta |
| »» delta         | string         | Delta                                                             |
| »» gamma         | string         | Gamma                                                             |
| »» vega          | string         | Vega                                                              |
| »» theta         | string         | Theta                                                             |
| »» rho           | string         | Rho                                                               |

This operation does not require authentication

## [#](#get-underlying-ticker) Get underlying ticker

> Code samples

`GET /options/underlying/tickers/{underlying}`

_Get underlying ticker_

### Parameters

| Name       | In   | Type   | Required | Description |
| ---------- | ---- | ------ | -------- | ----------- |
| underlying | path | string | true     | Underlying  |

> Example responses

> 200 Response

```
{
  "trade_put": 33505,
  "trade_call": 123,
  "index_price": "76543.3"
}
```

### Responses

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Options underlying detail_

| Name          | Type           | Description                                  |
| ------------- | -------------- | -------------------------------------------- |
| » trade_put   | integer(int64) | Total put options trades amount in last 24h  |
| » trade_call  | integer(int64) | Total call options trades amount in last 24h |
| » index_price | string         | Index price (quote currency)                 |

This operation does not require authentication

## [#](#get-options-candlesticks) Get options candlesticks

> Code samples

`GET /options/candlesticks`

_Get options candlesticks_

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| contract | query | string         | true     | Options contract name                                     |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | Termination Timestamp                                     |
| interval | query | string         | false    | Interval time between data points                         |

#### [#](#detailed-descriptions-44) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-118) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name     | Type           | Description                                                                 |
| -------- | -------------- | --------------------------------------------------------------------------- |
| » _None_ | object         | data point in every timestamp                                               |
| »» t     | number(double) | Unix timestamp in seconds                                                   |
| »» v     | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed    |
| »» c     | string         | Close price (quote currency, unit: underlying corresponding option price)   |
| »» h     | string         | Highest price (quote currency, unit: underlying corresponding option price) |
| »» l     | string         | Lowest price (quote currency, unit: underlying corresponding option price)  |
| »» o     | string         | Open price (quote currency, unit: underlying corresponding option price)    |

This operation does not require authentication

## [#](#mark-price-candlesticks-of-an-underlying) Mark price candlesticks of an underlying

> Code samples

`GET /options/underlying/candlesticks`

_Mark price candlesticks of an underlying_

### Parameters

| Name       | In    | Type           | Required | Description                                               |
| ---------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint)      |
| limit      | query | integer        | false    | Maximum number of records to be returned in a single list |
| from       | query | integer(int64) | false    | Start timestamp                                           |
| to         | query | integer(int64) | false    | Termination Timestamp                                     |
| interval   | query | string         | false    | Interval time between data points                         |

#### [#](#detailed-descriptions-45) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-119) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| interval  | 1m    |
| interval  | 5m    |
| interval  | 15m   |
| interval  | 30m   |
| interval  | 1h    |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name     | Type           | Description                                                              |
| -------- | -------------- | ------------------------------------------------------------------------ |
| _None_   | array          | \[data point in every timestamp\]                                        |
| » _None_ | object         | data point in every timestamp                                            |
| »» t     | number(double) | Unix timestamp in seconds                                                |
| »» v     | integer(int64) | size volume (contract size). Only returned if `contract` is not prefixed |
| »» c     | string         | Close price (quote currency)                                             |
| »» h     | string         | Highest price (quote currency)                                           |
| »» l     | string         | Lowest price (quote currency)                                            |
| »» o     | string         | Open price (quote currency)                                              |
| »» sum   | string         | Trading volume (unit: Quote currency)                                    |

This operation does not require authentication

## [#](#options-trade-history) Options trade history

> Code samples

`GET /options/trades`

_Options trade history_

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| contract | query | string         | false    | Options contract name                                     |
| type     | query | string(P)      | false    | `C` is call, while `P` is put                             |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer        | false    | List offset, starting from 0                              |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | Termination Timestamp                                     |

#### [#](#detailed-descriptions-46) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name             | Type           | Description                                                                                                                                                                                                                                                                                                                    |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _None_           | array          | none                                                                                                                                                                                                                                                                                                                           |
| » id             | integer(int64) | Trade ID                                                                                                                                                                                                                                                                                                                       |
| » create_time    | number(double) | Trading time                                                                                                                                                                                                                                                                                                                   |
| » create_time_ms | number(double) | Trading time, with milliseconds set to 3 decimal places.                                                                                                                                                                                                                                                                       |
| » contract       | string         | Futures contract                                                                                                                                                                                                                                                                                                               |
| » size           | integer(int64) | Trading size                                                                                                                                                                                                                                                                                                                   |
| » price          | string         | Trading price (quote currency)                                                                                                                                                                                                                                                                                                 |
| » is_internal    | boolean        | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |

This operation does not require authentication

## [#](#list-options-account) List options account

> Code samples

`GET /options/accounts`

_List options account_

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                                                               | Type           | Description                                                                                 |
| ------------------------------------------------------------------ | -------------- | ------------------------------------------------------------------------------------------- |
| » user                                                             | integer(int64) | User ID                                                                                     |
| » total                                                            | string         | Account balance                                                                             |
| » position_value                                                   | string         | Position value, long position value is positive, short position value is negative           |
| » equity                                                           | string         | Account equity, the sum of account balance and position value                               |
| » short_enabled                                                    | boolean        | If the account is allowed to short                                                          |
| » mmp_enabled                                                      | boolean        | Whether to enable MMP                                                                       |
| » liq_triggered                                                    | boolean        | Whether to trigger position liquidation                                                     |
| » margin_mode                                                      | integer(int32) | ｜ 保证金模式：                                                                             |
| \- 0：经典现货保证金模式 - 1：跨币种保证金模式 - 2：组合保证金模式 |
| » unrealised_pnl                                                   | string         | Unrealized PNL                                                                              |
| » init_margin                                                      | string         | Initial position margin                                                                     |
| » maint_margin                                                     | string         | Position maintenance margin                                                                 |
| » order_margin                                                     | string         | Order margin of unfinished orders                                                           |
| » ask_order_margin                                                 | string         | Margin for outstanding sell orders                                                          |
| » bid_order_margin                                                 | string         | Margin for outstanding buy orders                                                           |
| » available                                                        | string         | Available balance to transfer out or trade                                                  |
| » point                                                            | string         | POINT amount                                                                                |
| » currency                                                         | string         | Settle currency                                                                             |
| » orders_limit                                                     | integer(int32) | Maximum number of outstanding orders                                                        |
| » position_notional_limit                                          | integer(int64) | Notional value upper limit, including the nominal value of positions and outstanding orders |

#### [#](#enumerated-values-120) Enumerated Values

| Property    | Value |
| ----------- | ----- |
| margin_mode | 0     |
| margin_mode | 1     |
| margin_mode | 2     |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-account-changing-history) List account changing history

> Code samples

`GET /options/account_book`

_List account changing history_

### Parameters

| Name   | In    | Type           | Required | Description                                               |
| ------ | ----- | -------------- | -------- | --------------------------------------------------------- |
| limit  | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset | query | integer        | false    | List offset, starting from 0                              |
| from   | query | integer(int64) | false    | Start timestamp                                           |
| to     | query | integer(int64) | false    | Termination Timestamp                                     |
| type   | query | string         | false    | Changing Type:                                            |

#### [#](#detailed-descriptions-47) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

**type**: Changing Type:

- dnw: Deposit & Withdraw
- prem: Trading premium
- fee: Trading fee
- refr: Referrer rebate
- set: settlement PNL

#### [#](#enumerated-values-121) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| type      | dnw   |
| type      | prem  |
| type      | fee   |
| type      | refr  |
| type      | set   |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name      | Type           | Description                               |
| --------- | -------------- | ----------------------------------------- |
| » time    | number(double) | Change time                               |
| » change  | string         | Amount changed (USDT)                     |
| » balance | string         | Account total balance after change (USDT) |
| » type    | string         | Changing Type:                            |

\- dnw: Deposit & Withdraw  
\- prem: Trading premium  
\- fee: Trading fee  
\- refr: Referrer rebate  
\- point_dnw: POINT Deposit & Withdraw  
\- point_fee: POINT Trading fee  
\- point_refr: POINT Referrer rebate | | » text | string | custom text |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-positions-of-specified-underlying) List user's positions of specified underlying

> Code samples

`GET /options/positions`

_List user's positions of specified underlying_

### Parameters

| Name       | In    | Type   | Required | Description |
| ---------- | ----- | ------ | -------- | ----------- |
| underlying | query | string | false    | Underlying  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type           | Description                         |
| ------------------- | -------------- | ----------------------------------- | ------------------------------------- |
| _None_              | array          | \[Options position information\]    |
| » _None_            | object         | Options position information        |
| »» user             | integer        | User ID                             |
| »» underlying       | string         | Underlying                          |
| »» underlying_price | string         | Underlying price (quote currency)   |
| »» contract         | string         | Options contract name               |
| »» size             | integer(int64) | Position size (contract size)       |
| »» entry_price      | string         | Entry size (quote currency)         |
| »» mark_price       | string         | Current mark price (quote currency) |
| »» mark_iv          | string         | Implied volatility                  |
| »» realised_pnl     | string         | Realized PNL                        |
| »» unrealised_pnl   | string         | Unrealized PNL                      |
| »» pending_orders   | integer        | Current open orders                 |
| »» close_order      | object         | null                                | Current close order if any, or `null` |
| »»» id              | integer(int64) | Close order ID                      |
| »»» price           | string         | Close order price （quote currency) |
| »»» is_liq          | boolean        | Is the close order from liquidation |
| »» delta            | string         | Delta                               |
| »» gamma            | string         | Gamma                               |
| »» vega             | string         | Vega                                |
| »» theta            | string         | Theta                               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-specified-contract-position) Get specified contract position

> Code samples

`GET /options/positions/{contract}`

_Get specified contract position_

### Parameters

| Name     | In   | Type   | Required | Description |
| -------- | ---- | ------ | -------- | ----------- |
| contract | path | string | true     | none        |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Options position information_

| Name               | Type           | Description                         |
| ------------------ | -------------- | ----------------------------------- | ------------------------------------- |
| » user             | integer        | User ID                             |
| » underlying       | string         | Underlying                          |
| » underlying_price | string         | Underlying price (quote currency)   |
| » contract         | string         | Options contract name               |
| » size             | integer(int64) | Position size (contract size)       |
| » entry_price      | string         | Entry size (quote currency)         |
| » mark_price       | string         | Current mark price (quote currency) |
| » mark_iv          | string         | Implied volatility                  |
| » realised_pnl     | string         | Realized PNL                        |
| » unrealised_pnl   | string         | Unrealized PNL                      |
| » pending_orders   | integer        | Current open orders                 |
| » close_order      | object         | null                                | Current close order if any, or `null` |
| »» id              | integer(int64) | Close order ID                      |
| »» price           | string         | Close order price （quote currency) |
| »» is_liq          | boolean        | Is the close order from liquidation |
| » delta            | string         | Delta                               |
| » gamma            | string         | Gamma                               |
| » vega             | string         | Vega                                |
| » theta            | string         | Theta                               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-liquidation-history-of-specified-underlying) List user's liquidation history of specified underlying

> Code samples

`GET /options/position_close`

_List user's liquidation history of specified underlying_

### Parameters

| Name       | In    | Type   | Required | Description                                          |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------- |
| underlying | query | string | true     | Underlying (Obtained by listing underlying endpoint) |
| contract   | query | string | false    | Options contract name                                |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description                  |
| ------------- | -------------- | ---------------------------- |
| » time        | number(double) | Position close time          |
| » contract    | string         | Options contract name        |
| » side        | string         | Position side, long or short |
| » pnl         | string         | PNL                          |
| » text        | string         | Text of close order          |
| » settle_size | string         | settlement size              |

#### [#](#enumerated-values-122) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | long  |
| side     | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-options-order) Create an options order

> Code samples

`POST /options/orders`

_Create an options order_

> Body parameter

```
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

| Name          | In   | Type           | Required | Description                                                                                                         |
| ------------- | ---- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| body          | body | object         | true     | none                                                                                                                |
| » contract    | body | string         | true     | Contract name                                                                                                       |
| » size        | body | integer(int64) | true     | Order size. Specify positive number to make a bid, and negative number to ask                                       |
| » iceberg     | body | integer(int64) | false    | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price       | body | string         | false    | Order price. 0 for market order with `tif` set as `ioc` (USDT)                                                      |
| » close       | body | boolean        | false    | Set as `true` to close the position, with `size` set to 0                                                           |
| » reduce_only | body | boolean        | false    | Set as `true` to be reduce-only order                                                                               |
| » mmp         | body | boolean        | false    | When set to true, delegate to MMP                                                                                   |
| » tif         | body | string         | false    | Time in force                                                                                                       |
| » text        | body | string         | false    | User defined information. If not empty, must follow the rules below:                                                |

#### [#](#detailed-descriptions-48) Detailed descriptions

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

#### [#](#enumerated-values-123) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| » tif     | gtc   |
| » tif     | ioc   |
| » tif     | poc   |

> Example responses

> 201 Response

```
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

| Status | Meaning                                                                         | Description  | Schema |
| ------ | ------------------------------------------------------------------------------- | ------------ | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order detail | Inline |

### Response Schema

Status Code **201**

_Options order detail_

| Name          | Type           | Description                                        |
| ------------- | -------------- | -------------------------------------------------- |
| » id          | integer(int64) | Options order ID                                   |
| » user        | integer        | User ID                                            |
| » create_time | number(double) | Creation time of order                             |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as   | string         | Ending method, including:                          |

\- filled: fully completed  
\- canceled: user canceled  
\- liquidated: forced liquidation cancellation  
\- ioc: Not fully filled immediately because tif is set to ioc  
\- auto_deleveraged: automatic deleveraging cancel  
\- reduce_only: Increased position is cancelled, because reduce_only is set or
the position is closed  
\- position_closed: Because the position was closed, the pending order was
canceled  
\- reduce_out: Only reduce the excluded pending orders that are not easy to be
filled  
\- mmp_cancelled: MMP canceled | | » status | string | Order status

\- `open`: waiting to be traded  
\- `finished`: finished | | » contract | string | Contract name | | » size |
integer(int64) | Order size. Specify positive number to make a bid, and negative
number to ask | | » iceberg | integer(int64) | Display size for iceberg order. 0
for non-iceberg. Note that you will have to pay the taker fee for the hidden
size | | » price | string | Order price. 0 for market order with `tif` set as
`ioc` (USDT) | | » is_close | boolean | Is the order to close position | | »
is_reduce_only | boolean | Is the order reduce-only | | » is_liq | boolean | Is
the order for liquidation | | » is_mmp | boolean | Whether it is MMP delegation.
Corresponds to `mmp` in the request. | | » tif | string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | » left | integer(int64) | Size left to be traded | | » fill_price |
string | Fill price of the order | | » text | string | User defined information.
If not empty, must follow the rules below:

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)  
Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- web: from web  
\- api: from API  
\- app: from mobile phones  
\- auto_deleveraging: from ADL  
\- liquidation: from liquidation  
\- insurance: from insurance | | » tkfr | string | Taker fee | | » mkfr | string
| Maker fee | | » refu | integer | Reference user ID | | » refr | string |
Referrer rebate |

#### [#](#enumerated-values-124) Enumerated Values

| Property  | Value            |
| --------- | ---------------- |
| finish_as | filled           |
| finish_as | cancelled        |
| finish_as | liquidated       |
| finish_as | ioc              |
| finish_as | auto_deleveraged |
| finish_as | reduce_only      |
| finish_as | position_closed  |
| finish_as | reduce_out       |
| finish_as | mmp_cancelled    |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-options-orders) List options orders

> Code samples

`GET /options/orders`

_List options orders_

### Parameters

| Name       | In    | Type           | Required | Description                                               |
| ---------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| contract   | query | string         | false    | Options contract name                                     |
| underlying | query | string         | false    | Underlying                                                |
| status     | query | string         | true     | Only list the orders with this status                     |
| limit      | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset     | query | integer        | false    | List offset, starting from 0                              |
| from       | query | integer(int64) | false    | Start timestamp                                           |
| to         | query | integer(int64) | false    | Termination Timestamp                                     |

#### [#](#detailed-descriptions-49) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-125) Enumerated Values

| Parameter | Value    |
| --------- | -------- |
| status    | open     |
| status    | finished |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name           | Type           | Description                                        |
| -------------- | -------------- | -------------------------------------------------- |
| _None_         | array          | \[Options order detail\]                           |
| » _None_       | object         | Options order detail                               |
| »» id          | integer(int64) | Options order ID                                   |
| »» user        | integer        | User ID                                            |
| »» create_time | number(double) | Creation time of order                             |
| »» finish_time | number(double) | Order finished time. Not returned if order is open |
| »» finish_as   | string         | Ending method, including:                          |

\- filled: fully completed  
\- canceled: user canceled  
\- liquidated: forced liquidation cancellation  
\- ioc: Not fully filled immediately because tif is set to ioc  
\- auto_deleveraged: automatic deleveraging cancel  
\- reduce_only: Increased position is cancelled, because reduce_only is set or
the position is closed  
\- position_closed: Because the position was closed, the pending order was
canceled  
\- reduce_out: Only reduce the excluded pending orders that are not easy to be
filled  
\- mmp_cancelled: MMP canceled | | »» status | string | Order status

\- `open`: waiting to be traded  
\- `finished`: finished | | »» contract | string | Contract name | | »» size |
integer(int64) | Order size. Specify positive number to make a bid, and negative
number to ask | | »» iceberg | integer(int64) | Display size for iceberg order.
0 for non-iceberg. Note that you will have to pay the taker fee for the hidden
size | | »» price | string | Order price. 0 for market order with `tif` set as
`ioc` (USDT) | | »» is_close | boolean | Is the order to close position | | »»
is_reduce_only | boolean | Is the order reduce-only | | »» is_liq | boolean | Is
the order for liquidation | | »» is_mmp | boolean | Whether it is MMP
delegation. Corresponds to `mmp` in the request. | | »» tif | string | Time in
force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | »» left | integer(int64) | Size left to be traded | | »» fill_price |
string | Fill price of the order | | »» text | string | User defined
information. If not empty, must follow the rules below:

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)  
Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- web: from web  
\- api: from API  
\- app: from mobile phones  
\- auto_deleveraging: from ADL  
\- liquidation: from liquidation  
\- insurance: from insurance | | »» tkfr | string | Taker fee | | »» mkfr |
string | Maker fee | | »» refu | integer | Reference user ID | | »» refr |
string | Referrer rebate |

#### [#](#enumerated-values-126) Enumerated Values

| Property  | Value            |
| --------- | ---------------- |
| finish_as | filled           |
| finish_as | cancelled        |
| finish_as | liquidated       |
| finish_as | ioc              |
| finish_as | auto_deleveraged |
| finish_as | reduce_only      |
| finish_as | position_closed  |
| finish_as | reduce_out       |
| finish_as | mmp_cancelled    |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched-3) Cancel all `open` orders matched

> Code samples

`DELETE /options/orders`

_Cancel all `open` orders matched_

### Parameters

| Name       | In    | Type   | Required | Description                                      |
| ---------- | ----- | ------ | -------- | ------------------------------------------------ |
| contract   | query | string | false    | Options contract name                            |
| underlying | query | string | false    | Underlying                                       |
| side       | query | string | false    | All bids or asks. Both included if not specified |

#### [#](#enumerated-values-127) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| side      | ask   |
| side      | bid   |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                  | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | All orders matched cancelled | \[Inline\] |

### Response Schema

Status Code **200**

| Name           | Type           | Description                                        |
| -------------- | -------------- | -------------------------------------------------- |
| _None_         | array          | \[Options order detail\]                           |
| » _None_       | object         | Options order detail                               |
| »» id          | integer(int64) | Options order ID                                   |
| »» user        | integer        | User ID                                            |
| »» create_time | number(double) | Creation time of order                             |
| »» finish_time | number(double) | Order finished time. Not returned if order is open |
| »» finish_as   | string         | Ending method, including:                          |

\- filled: fully completed  
\- canceled: user canceled  
\- liquidated: forced liquidation cancellation  
\- ioc: Not fully filled immediately because tif is set to ioc  
\- auto_deleveraged: automatic deleveraging cancel  
\- reduce_only: Increased position is cancelled, because reduce_only is set or
the position is closed  
\- position_closed: Because the position was closed, the pending order was
canceled  
\- reduce_out: Only reduce the excluded pending orders that are not easy to be
filled  
\- mmp_cancelled: MMP canceled | | »» status | string | Order status

\- `open`: waiting to be traded  
\- `finished`: finished | | »» contract | string | Contract name | | »» size |
integer(int64) | Order size. Specify positive number to make a bid, and negative
number to ask | | »» iceberg | integer(int64) | Display size for iceberg order.
0 for non-iceberg. Note that you will have to pay the taker fee for the hidden
size | | »» price | string | Order price. 0 for market order with `tif` set as
`ioc` (USDT) | | »» is_close | boolean | Is the order to close position | | »»
is_reduce_only | boolean | Is the order reduce-only | | »» is_liq | boolean | Is
the order for liquidation | | »» is_mmp | boolean | Whether it is MMP
delegation. Corresponds to `mmp` in the request. | | »» tif | string | Time in
force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | »» left | integer(int64) | Size left to be traded | | »» fill_price |
string | Fill price of the order | | »» text | string | User defined
information. If not empty, must follow the rules below:

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)  
Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- web: from web  
\- api: from API  
\- app: from mobile phones  
\- auto_deleveraging: from ADL  
\- liquidation: from liquidation  
\- insurance: from insurance | | »» tkfr | string | Taker fee | | »» mkfr |
string | Maker fee | | »» refu | integer | Reference user ID | | »» refr |
string | Referrer rebate |

#### [#](#enumerated-values-128) Enumerated Values

| Property  | Value            |
| --------- | ---------------- |
| finish_as | filled           |
| finish_as | cancelled        |
| finish_as | liquidated       |
| finish_as | ioc              |
| finish_as | auto_deleveraged |
| finish_as | reduce_only      |
| finish_as | position_closed  |
| finish_as | reduce_out       |
| finish_as | mmp_cancelled    |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-4) Get a single order

> Code samples

`GET /options/orders/{order_id}`

_Get a single order_

### Parameters

| Name     | In   | Type           | Required | Description                                    |
| -------- | ---- | -------------- | -------- | ---------------------------------------------- |
| order_id | path | integer(int64) | true     | Order ID returned on successful order creation |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description  | Schema |
| ------ | -------------------------------------------------------------------------- | ------------ | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order detail | Inline |

### Response Schema

Status Code **200**

_Options order detail_

| Name          | Type           | Description                                        |
| ------------- | -------------- | -------------------------------------------------- |
| » id          | integer(int64) | Options order ID                                   |
| » user        | integer        | User ID                                            |
| » create_time | number(double) | Creation time of order                             |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as   | string         | Ending method, including:                          |

\- filled: fully completed  
\- canceled: user canceled  
\- liquidated: forced liquidation cancellation  
\- ioc: Not fully filled immediately because tif is set to ioc  
\- auto_deleveraged: automatic deleveraging cancel  
\- reduce_only: Increased position is cancelled, because reduce_only is set or
the position is closed  
\- position_closed: Because the position was closed, the pending order was
canceled  
\- reduce_out: Only reduce the excluded pending orders that are not easy to be
filled  
\- mmp_cancelled: MMP canceled | | » status | string | Order status

\- `open`: waiting to be traded  
\- `finished`: finished | | » contract | string | Contract name | | » size |
integer(int64) | Order size. Specify positive number to make a bid, and negative
number to ask | | » iceberg | integer(int64) | Display size for iceberg order. 0
for non-iceberg. Note that you will have to pay the taker fee for the hidden
size | | » price | string | Order price. 0 for market order with `tif` set as
`ioc` (USDT) | | » is_close | boolean | Is the order to close position | | »
is_reduce_only | boolean | Is the order reduce-only | | » is_liq | boolean | Is
the order for liquidation | | » is_mmp | boolean | Whether it is MMP delegation.
Corresponds to `mmp` in the request. | | » tif | string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | » left | integer(int64) | Size left to be traded | | » fill_price |
string | Fill price of the order | | » text | string | User defined information.
If not empty, must follow the rules below:

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)  
Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- web: from web  
\- api: from API  
\- app: from mobile phones  
\- auto_deleveraging: from ADL  
\- liquidation: from liquidation  
\- insurance: from insurance | | » tkfr | string | Taker fee | | » mkfr | string
| Maker fee | | » refu | integer | Reference user ID | | » refr | string |
Referrer rebate |

#### [#](#enumerated-values-129) Enumerated Values

| Property  | Value            |
| --------- | ---------------- |
| finish_as | filled           |
| finish_as | cancelled        |
| finish_as | liquidated       |
| finish_as | ioc              |
| finish_as | auto_deleveraged |
| finish_as | reduce_only      |
| finish_as | position_closed  |
| finish_as | reduce_out       |
| finish_as | mmp_cancelled    |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-4) Cancel a single order

> Code samples

`DELETE /options/orders/{order_id}`

_Cancel a single order_

### Parameters

| Name     | In   | Type           | Required | Description                                    |
| -------- | ---- | -------------- | -------- | ---------------------------------------------- |
| order_id | path | integer(int64) | true     | Order ID returned on successful order creation |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description  | Schema |
| ------ | -------------------------------------------------------------------------- | ------------ | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order detail | Inline |

### Response Schema

Status Code **200**

_Options order detail_

| Name          | Type           | Description                                        |
| ------------- | -------------- | -------------------------------------------------- |
| » id          | integer(int64) | Options order ID                                   |
| » user        | integer        | User ID                                            |
| » create_time | number(double) | Creation time of order                             |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as   | string         | Ending method, including:                          |

\- filled: fully completed  
\- canceled: user canceled  
\- liquidated: forced liquidation cancellation  
\- ioc: Not fully filled immediately because tif is set to ioc  
\- auto_deleveraged: automatic deleveraging cancel  
\- reduce_only: Increased position is cancelled, because reduce_only is set or
the position is closed  
\- position_closed: Because the position was closed, the pending order was
canceled  
\- reduce_out: Only reduce the excluded pending orders that are not easy to be
filled  
\- mmp_cancelled: MMP canceled | | » status | string | Order status

\- `open`: waiting to be traded  
\- `finished`: finished | | » contract | string | Contract name | | » size |
integer(int64) | Order size. Specify positive number to make a bid, and negative
number to ask | | » iceberg | integer(int64) | Display size for iceberg order. 0
for non-iceberg. Note that you will have to pay the taker fee for the hidden
size | | » price | string | Order price. 0 for market order with `tif` set as
`ioc` (USDT) | | » is_close | boolean | Is the order to close position | | »
is_reduce_only | boolean | Is the order reduce-only | | » is_liq | boolean | Is
the order for liquidation | | » is_mmp | boolean | Whether it is MMP delegation.
Corresponds to `mmp` in the request. | | » tif | string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee | | » left | integer(int64) | Size left to be traded | | » fill_price |
string | Fill price of the order | | » text | string | User defined information.
If not empty, must follow the rules below:

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)  
Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- web: from web  
\- api: from API  
\- app: from mobile phones  
\- auto_deleveraging: from ADL  
\- liquidation: from liquidation  
\- insurance: from insurance | | » tkfr | string | Taker fee | | » mkfr | string
| Maker fee | | » refu | integer | Reference user ID | | » refr | string |
Referrer rebate |

#### [#](#enumerated-values-130) Enumerated Values

| Property  | Value            |
| --------- | ---------------- |
| finish_as | filled           |
| finish_as | cancelled        |
| finish_as | liquidated       |
| finish_as | ioc              |
| finish_as | auto_deleveraged |
| finish_as | reduce_only      |
| finish_as | position_closed  |
| finish_as | reduce_out       |
| finish_as | mmp_cancelled    |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-3) Countdown cancel orders

> Code samples

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

```
{
  "timeout": 30,
  "contract": "BTC_USDT-20241001-46000-C",
  "underlying": "BTC_USDT"
}
```

### Parameters

| Name         | In   | Type           | Required | Description               |
| ------------ | ---- | -------------- | -------- | ------------------------- |
| body         | body | object         | true     | none                      |
| » timeout    | body | integer(int32) | true     | Countdown time in seconds |
| » contract   | body | string         | false    | Options contract name     |
| » underlying | body | string         | false    | Underlying                |

#### [#](#detailed-descriptions-50) Detailed descriptions

**» timeout**: Countdown time in seconds At least 5 seconds, 0 means cancel
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

## [#](#list-personal-trading-history-4) List personal trading history

> Code samples

`GET /options/my_trades`

_List personal trading history_

### Parameters

| Name       | In    | Type           | Required | Description                                               |
| ---------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint)      |
| contract   | query | string         | false    | Options contract name                                     |
| limit      | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset     | query | integer        | false    | List offset, starting from 0                              |
| from       | query | integer(int64) | false    | Start timestamp                                           |
| to         | query | integer(int64) | false    | Termination Timestamp                                     |

#### [#](#detailed-descriptions-51) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name               | Type           | Description                                          |
| ------------------ | -------------- | ---------------------------------------------------- |
| » id               | integer(int64) | Trade ID                                             |
| » create_time      | number(double) | Trading time                                         |
| » contract         | string         | Options contract name                                |
| » order_id         | integer        | Order ID related                                     |
| » size             | integer(int64) | Trading size                                         |
| » price            | string         | Trading price (quote currency)                       |
| » underlying_price | string         | Underlying price (quote currency)                    |
| » role             | string         | Trade role. Available values are `taker` and `maker` |

#### [#](#enumerated-values-131) Enumerated Values

| Property | Value |
| -------- | ----- |
| role     | taker |
| role     | maker |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-settings) MMP Settings

> Code samples

`POST /options/mmp`

_MMP Settings_

> Body parameter

```
{
  "underlying": "BTC_USDT",
  "window": 5000,
  "frozen_period": 200,
  "qty_limit": "10",
  "delta_limit": "10"
}
```

### Parameters

| Name            | In   | Type           | Required | Description                                                                               |
| --------------- | ---- | -------------- | -------- | ----------------------------------------------------------------------------------------- |
| body            | body | object         | true     | none                                                                                      |
| » underlying    | body | string         | true     | Underlying                                                                                |
| » window        | body | integer(int32) | true     | Time window (milliseconds), between 1-5000, 0 means disabling MMP                         |
| » frozen_period | body | integer(int32) | true     | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze |
| » qty_limit     | body | string         | true     | Trading volume upper limit (positive number, up to 2 decimal places)                      |
| » delta_limit   | body | string         | true     | Upper limit of net delta value (positive number, up to 2 decimal places)                  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description     | Schema |
| ------ | -------------------------------------------------------------------------- | --------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | MMP Information | Inline |

### Response Schema

Status Code **200**

_MMP Settings_

| Name              | Type           | Description                                                                                                                           |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| » underlying      | string         | Underlying                                                                                                                            |
| » window          | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disabling MMP                                                                     |
| » frozen_period   | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze                                             |
| » qty_limit       | string         | Trading volume upper limit (positive number, up to 2 decimal places)                                                                  |
| » delta_limit     | string         | Upper limit of net delta value (positive number, up to 2 decimal places)                                                              |
| » trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered                                                                    |
| » frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered. |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-query) MMP Query

> Code samples

`GET /options/mmp`

_MMP Query_

### Parameters

| Name       | In    | Type   | Required | Description |
| ---------- | ----- | ------ | -------- | ----------- |
| underlying | query | string | false    | Underlying  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name               | Type           | Description                                                                                                                           |
| ------------------ | -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| _None_             | array          | \[MMP Settings\]                                                                                                                      |
| » _None_           | object         | MMP Settings                                                                                                                          |
| »» underlying      | string         | Underlying                                                                                                                            |
| »» window          | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disabling MMP                                                                     |
| »» frozen_period   | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze                                             |
| »» qty_limit       | string         | Trading volume upper limit (positive number, up to 2 decimal places)                                                                  |
| »» delta_limit     | string         | Upper limit of net delta value (positive number, up to 2 decimal places)                                                              |
| »» trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered                                                                    |
| »» frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered. |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-reset) MMP Reset

> Code samples

`POST /options/mmp/reset`

_MMP Reset_

> Body parameter

```
{
  "underlying": "BTC_USDT"
}
```

### Parameters

| Name         | In   | Type   | Required | Description |
| ------------ | ---- | ------ | -------- | ----------- |
| body         | body | object | true     | none        |
| » underlying | body | string | true     | Underlying  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description     | Schema |
| ------ | -------------------------------------------------------------------------- | --------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | MMP Information | Inline |

### Response Schema

Status Code **200**

_MMP Settings_

| Name              | Type           | Description                                                                                                                           |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| » underlying      | string         | Underlying                                                                                                                            |
| » window          | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disabling MMP                                                                     |
| » frozen_period   | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze                                             |
| » qty_limit       | string         | Trading volume upper limit (positive number, up to 2 decimal places)                                                                  |
| » delta_limit     | string         | Upper limit of net delta value (positive number, up to 2 decimal places)                                                              |
| » trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered                                                                    |
| » frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered. |

WARNING

To perform this operation, you must be authenticated by API key and secret
