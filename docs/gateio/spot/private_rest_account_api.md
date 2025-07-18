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

# [#](#withdrawal) Withdrawal

Withdrawal operations

## [#](#withdraw) Withdraw

> Code samples

`POST /withdrawals`

_Withdraw_

Withdrawals to Gate addresses do not incur transaction fees.

> Body parameter

```
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

| Name                | In   | Type   | Required | Description                                                                                                                                                                 |
| ------------------- | ---- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body                | body | object | true     | none                                                                                                                                                                        |
| » withdraw_order_id | body | string | false    | User-defined order number when withdrawing. Default is empty. When not empty, the specified user-defined order number record will be queried                                |
| » amount            | body | string | true     | Currency amount                                                                                                                                                             |
| » currency          | body | string | true     | Currency name                                                                                                                                                               |
| » address           | body | string | false    | Withdrawal address. Required for withdrawals                                                                                                                                |
| » memo              | body | string | false    | Additional remarks with regards to the withdrawal                                                                                                                           |
| » withdraw_id       | body | string | false    | The withdrawal record id starts with w, such as: w1879219868. When withdraw_id is not empty, the value querys this withdrawal record and no longer querys according to time |
| » asset_class       | body | string | false    | The currency type of withdrawal record is empty by default. It supports users to query the withdrawal records in the main and innovation areas on demand.                   |
| » chain             | body | string | true     | Name of the chain used in withdrawals                                                                                                                                       |

#### [#](#detailed-descriptions) Detailed descriptions

**» asset_class**: The currency type of withdrawal record is empty by default.
It supports users to query the withdrawal records in the main and innovation
areas on demand. Value range: SPOT, PILOT

SPOT: Main Zone PILOT: Innovation Zone

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                                                          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Withdraw request is accepted. Refer to withdrawal records for status | Inline |

### Response Schema

Status Code **200**

| Name                | Type   | Description                                                                                                                                                                 |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                                                                                   |
| » txid              | string | Hash record of the withdrawal                                                                                                                                               |
| » withdraw_order_id | string | User-defined order number when withdrawing. Default is empty. When not empty, the specified user-defined order number record will be queried                                |
| » timestamp         | string | Operation time                                                                                                                                                              |
| » amount            | string | Currency amount                                                                                                                                                             |
| » currency          | string | Currency name                                                                                                                                                               |
| » address           | string | Withdrawal address. Required for withdrawals                                                                                                                                |
| » memo              | string | Additional remarks with regards to the withdrawal                                                                                                                           |
| » withdraw_id       | string | The withdrawal record id starts with w, such as: w1879219868. When withdraw_id is not empty, the value querys this withdrawal record and no longer querys according to time |
| » asset_class       | string | The currency type of withdrawal record is empty by default. It supports users to query the withdrawal records in the main and innovation areas on demand.                   |

Value range: SPOT, PILOT

SPOT: Main Zone  
PILOT: Innovation Zone | | » status | string | Record status.

\- DONE: done  
\- CANCEL: cancelled  
\- REQUEST: requesting  
\- MANUAL: pending manual approval  
\- BCODE: GateCode operation  
\- EXTPEND: pending confirm after sending  
\- FAIL: pending confirm when fail  
\- INVALID: invalid order  
\- VERIFY: verifying  
\- PROCES: processing  
\- PEND: pending  
\- DMOVE: required manual approval  
\- REVIEW: Under review | | » chain | string | Name of the chain used in
withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#uid-transfer) UID transfer

> Code samples

`POST /withdrawals/push`

_UID transfer_

Transfers between main spot accounts are allowed; however, both parties cannot
be sub-accounts

> Body parameter

```
{
  "receive_uid": 12233,
  "currency": "USDT",
  "amount": "1.1"
}
```

### Parameters

| Name          | In   | Type           | Required | Description     |
| ------------- | ---- | -------------- | -------- | --------------- |
| body          | body | object         | true     | none            |
| » receive_uid | body | integer(int64) | true     | Recipient UID   |
| » currency    | body | string         | true     | Currency name   |
| » amount      | body | string         | true     | Transfer amount |

> Example responses

> 200 Response

```
{
  "id": 111
}
```

### Responses

| Status | Meaning                                                                    | Description                                                                                  | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | The request has been accepted. Check the withdrawal record status for the processing result. | Inline |

### Response Schema

Status Code **200**

| Name | Type           | Description |
| ---- | -------------- | ----------- |
| » id | integer(int64) | Order ID    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-withdrawal-with-specified-id) Cancel withdrawal with specified ID

> Code samples

`DELETE /withdrawals/{withdrawal_id}`

_Cancel withdrawal with specified ID_

### Parameters

| Name          | In   | Type   | Required | Description |
| ------------- | ---- | ------ | -------- | ----------- |
| withdrawal_id | path | string | true     | none        |

> Example responses

> 202 Response

```
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

| Status | Meaning                                                                          | Description                                                               | Schema |
| ------ | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------ |
| 202    | [Accepted (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.3) | Cancellation accepted. Refer to record status for the cancellation result | Inline |

### Response Schema

Status Code **202**

| Name                | Type   | Description                                                                                                                                                                 |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                                                                                   |
| » txid              | string | Hash record of the withdrawal                                                                                                                                               |
| » withdraw_order_id | string | User-defined order number when withdrawing. Default is empty. When not empty, the specified user-defined order number record will be queried                                |
| » timestamp         | string | Operation time                                                                                                                                                              |
| » amount            | string | Currency amount                                                                                                                                                             |
| » currency          | string | Currency name                                                                                                                                                               |
| » address           | string | Withdrawal address. Required for withdrawals                                                                                                                                |
| » memo              | string | Additional remarks with regards to the withdrawal                                                                                                                           |
| » withdraw_id       | string | The withdrawal record id starts with w, such as: w1879219868. When withdraw_id is not empty, the value querys this withdrawal record and no longer querys according to time |
| » asset_class       | string | The currency type of withdrawal record is empty by default. It supports users to query the withdrawal records in the main and innovation areas on demand.                   |

Value range: SPOT, PILOT

SPOT: Main Zone  
PILOT: Innovation Zone | | » status | string | Record status.

\- DONE: done  
\- CANCEL: cancelled  
\- REQUEST: requesting  
\- MANUAL: pending manual approval  
\- BCODE: GateCode operation  
\- EXTPEND: pending confirm after sending  
\- FAIL: pending confirm when fail  
\- INVALID: invalid order  
\- VERIFY: verifying  
\- PROCES: processing  
\- PEND: pending  
\- DMOVE: required manual approval  
\- REVIEW: Under review | | » chain | string | Name of the chain used in
withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#wallet) Wallet

Wallet

## [#](#list-chains-supported-for-specified-currency) List chains supported for specified currency

> Code samples

`GET /wallet/currency_chains`

_List chains supported for specified currency_

### Parameters

| Name     | In    | Type   | Required | Description   |
| -------- | ----- | ------ | -------- | ------------- |
| currency | query | string | true     | Currency name |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                   | Type           | Description                                                                                     |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| » chain                | string         | Chain name                                                                                      |
| » name_cn              | string         | Chain name in Chinese                                                                           |
| » name_en              | string         | Chain name in English                                                                           |
| » contract_address     | string         | Smart contract address for the currency; if no address is available, it will be an empty string |
| » is_disabled          | integer(int32) | If it is disabled. 0 means NOT being disabled                                                   |
| » is_deposit_disabled  | integer(int32) | Is deposit disabled. 0 means not                                                                |
| » is_withdraw_disabled | integer(int32) | Is withdrawal disabled. 0 means not                                                             |
| » decimal              | string         | Withdrawal precision                                                                            |

This operation does not require authentication

## [#](#generate-currency-deposit-address) Generate currency deposit address

> Code samples

`GET /wallet/deposit_address`

_Generate currency deposit address_

### Parameters

| Name     | In    | Type   | Required | Description   |
| -------- | ----- | ------ | -------- | ------------- |
| currency | query | string | true     | Currency name |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                    | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------------ | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Address successfully generated | Inline |

### Response Schema

Status Code **200**

| Name                     | Type    | Description                                                                             |
| ------------------------ | ------- | --------------------------------------------------------------------------------------- |
| » currency               | string  | Currency detail                                                                         |
| » address                | string  | Deposit address                                                                         |
| » multichain_addresses   | array   | none                                                                                    |
| »» MultiChainAddressItem | object  | none                                                                                    |
| »»» chain                | string  | Name of the chain                                                                       |
| »»» address              | string  | Deposit address                                                                         |
| »»» payment_id           | string  | Notes that some currencies required(e.g., Tag, Memo) when depositing                    |
| »»» payment_name         | string  | Note type, `Tag` or `Memo`                                                              |
| »»» obtain_failed        | integer | The obtain failed status- 0: address successfully obtained- 1: failed to obtain address |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-withdrawal-records) Retrieve withdrawal records

> Code samples

`GET /wallet/withdrawals`

_Retrieve withdrawal records_

Record time range cannot exceed 30 days

### Parameters

| Name              | In    | Type           | Required | Description                                                                                                                                                                 |
| ----------------- | ----- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| currency          | query | string         | false    | Filter by currency. Return all currency records if not specified                                                                                                            |
| withdraw_id       | query | string         | false    | The withdrawal record id starts with w, such as: w1879219868. When withdraw_id is not empty, the value querys this withdrawal record and no longer querys according to time |
| asset_class       | query | string         | false    | The currency type of withdrawal record is empty by default. It supports users to query the withdrawal records in the main and innovation areas on demand.                   |
| withdraw_order_id | query | string         | false    | User-defined order number when withdrawing. Default is empty. When not empty, the specified user-defined order number record will be queried                                |
| from              | query | integer(int64) | false    | Time range beginning, default to 7 days before current time                                                                                                                 |
| to                | query | integer(int64) | false    | Time range ending, default to current time                                                                                                                                  |
| limit             | query | integer        | false    | Maximum number of records to be returned in a single list                                                                                                                   |
| offset            | query | integer        | false    | List offset, starting from 0                                                                                                                                                |

#### [#](#detailed-descriptions-2) Detailed descriptions

**asset_class**: The currency type of withdrawal record is empty by default. It
supports users to query the withdrawal records in the main and innovation areas
on demand. Value range: SPOT, PILOT

SPOT: Main Zone PILOT: Innovation Zone

> Example responses

> 200 Response

```
[
  [
    {
      "id": "w1879219868",
      "currency": "USDT",
      "address": "THISISTESTADDRESSFORGATEPAY",
      "amount": "4.023",
      "fee": "0",
      "txid": "Internal transaction 260594131",
      "chain": "BSC",
      "timestamp": "1745220149",
      "status": "DONE",
      "withdraw_order_id": "202504211521368538928",
      "block_number": "1000",
      "fail_reason": "",
      "type": "appbankgp",
      "timestamp2": "1745220149",
      "memo": ""
    }
  ]
]
```

### Responses

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type   | Description                                                                                                         |
| ------------------- | ------ | ------------------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                           |
| » txid              | string | Hash record of the withdrawal                                                                                       |
| » block_number      | string | Block Number                                                                                                        |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)            |
| » timestamp         | string | Operation time                                                                                                      |
| » amount            | string | Currency amount                                                                                                     |
| » fee               | string | fee                                                                                                                 |
| » currency          | string | Currency name                                                                                                       |
| » address           | string | Withdrawal address                                                                                                  |
| » fail_reason       | string | The reason for withdrawal failure is that there is a value when status = CANCEL, and the rest of the state is empty |
| » timestamp2        | string | The withdrawal end time, i.e.: withdrawal cancel time or withdrawal success time                                    |

When status = CANCEL, the corresponding cancel time  
When status = DONE and block_number > 0, it is the time to withdrawal success |
| » memo | string | Additional remarks with regards to the withdrawal | | »
status | string | Transaction status

\- DONE: Completed (block_number > 0 is considered to be truly completed)  
\- CANCEL: Canceled  
\- REQUEST: Requesting  
\- MANUAL: Pending manual review  
\- BCODE: Recharge code operation  
\- EXTPEND: Sent awaiting confirmation  
\- FAIL: Failure on the chain awaiting confirmation  
\- INVALID: Invalid order  
\- VERIFY: Verifying  
\- PROCES: Processing  
\- PEND: Processing  
\- DMOVE: pending manual review  
\- REVIEW: Under review | | » chain | string | Name of the chain used in
withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-deposit-records) Retrieve deposit records

> Code samples

`GET /wallet/deposits`

_Retrieve deposit records_

Record time range cannot exceed 30 days

### Parameters

| Name     | In    | Type           | Required | Description                                                                        |
| -------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------- |
| currency | query | string         | false    | Filter by currency. Return all currency records if not specified                   |
| from     | query | integer(int64) | false    | Time range beginning, default to 7 days before current time                        |
| to       | query | integer(int64) | false    | Time range ending, default to current time                                         |
| limit    | query | integer        | false    | The maximum number of entries returned in the list is limited to 500 transactions. |
| offset   | query | integer        | false    | List offset, starting from 0                                                       |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type   | Description                                                                                              |
| ------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| » id                | string | Record ID                                                                                                |
| » txid              | string | Hash record of the withdrawal                                                                            |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) |
| » timestamp         | string | Operation time                                                                                           |
| » amount            | string | Currency amount                                                                                          |
| » currency          | string | Currency name                                                                                            |
| » address           | string | Withdrawal address. Required for withdrawals                                                             |
| » memo              | string | Additional remarks with regards to the withdrawal                                                        |
| » status            | string | Trading Status                                                                                           |

\- REVIEW: Recharge review (compliance review)  
\- PEND: Processing  
\- DONE: Waiting for funds to be unlocked  
\- INVALID: Invalid data  
\- TRACK: Track the number of confirmations, waiting to add funds to the user
(spot)  
\- BLOCKED: Rejected Recharge  
\- DEP_CREDITED: Recharge to account, withdrawal is not unlocked | | » chain |
string | Name of the chain used in withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-trading-accounts) Transfer between trading accounts

> Code samples

`POST /wallet/transfers`

_Transfer between trading accounts_

Transfer between different accounts. Currently support transfers between the
following:

1.  spot - margin
2.  spot - futures(perpetual)
3.  spot - delivery
4.  spot - options

> Body parameter

```
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

| Name            | In   | Type   | Required | Description                                                                                 |
| --------------- | ---- | ------ | -------- | ------------------------------------------------------------------------------------------- |
| body            | body | object | true     | none                                                                                        |
| » currency      | body | string | true     | Transfer currency. For futures account, `currency` can be set to `POINT` or settle currency |
| » from          | body | string | true     | Account to transfer from                                                                    |
| » to            | body | string | true     | Account to transfer to                                                                      |
| » amount        | body | string | true     | Transfer amount                                                                             |
| » currency_pair | body | string | false    | Margin currency pair. Required if transfer from or to margin account                        |
| » settle        | body | string | false    | Futures settle currency. Required if transferring from or to futures account                |

#### [#](#enumerated-values) Enumerated Values

| Parameter | Value    |
| --------- | -------- |
| » from    | spot     |
| » from    | margin   |
| » from    | futures  |
| » from    | delivery |
| » from    | options  |
| » to      | spot     |
| » to      | margin   |
| » to      | futures  |
| » to      | delivery |
| » to      | options  |

> Example responses

> 200 Response

```
{
  "tx_id": 59636381286
}
```

### Responses

| Status | Meaning                                                                    | Description         | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Balance transferred | Inline |

### Response Schema

Status Code **200**

_TransactionID_

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » tx_id | integer(int64) | Order id    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-main-and-sub-accounts) Transfer between main and sub accounts

> Code samples

`POST /wallet/sub_account_transfers`

_Transfer between main and sub accounts_

Support transferring with sub user's spot or futures account. Note that only
main user's spot account is used no matter which sub user's account is operated.

> Body parameter

```
{
  "sub_account": "10002",
  "sub_account_type": "spot",
  "currency": "BTC",
  "amount": "1",
  "direction": "to",
  "client_order_id": "da3ce7a088c8b0372b741419c7829033"
}
```

### Parameters

| Name               | In   | Type   | Required | Description                                                                                                                                                                                                                               |
| ------------------ | ---- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body               | body | object | true     | none                                                                                                                                                                                                                                      |
| » sub_account      | body | string | true     | Sub account user ID                                                                                                                                                                                                                       |
| » sub_account_type | body | string | false    | Target sub user's account. `spot` - spot account, `futures` - perpetual contract account, `delivery` - delivery account                                                                                                                   |
| » currency         | body | string | true     | Transfer currency name                                                                                                                                                                                                                    |
| » amount           | body | string | true     | Transfer amount                                                                                                                                                                                                                           |
| » direction        | body | string | true     | Transfer direction. to - transfer into sub account; from - transfer out from sub account                                                                                                                                                  |
| » client_order_id  | body | string | false    | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_', with a length ranging from 1 to 64 characters. |

> Example responses

> 200 Response

```
{
  "tx_id": 59636381286
}
```

### Responses

| Status | Meaning                                                                    | Description         | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Balance transferred | Inline |

### Response Schema

Status Code **200**

_TransactionID_

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » tx_id | integer(int64) | Order id    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-transfer-records-between-main-and-sub-accounts) Retrieve transfer records between main and sub accounts

> Code samples

`GET /wallet/sub_account_transfers`

_Retrieve transfer records between main and sub accounts_

Record time range cannot exceed 30 days

> Note: only records after 20-04-10can be retrieved

### Parameters

| Name    | In    | Type           | Required | Description                                                                                                                               |
| ------- | ----- | -------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string         | false    | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |
| from    | query | integer(int64) | false    | Time range beginning, default to 7 days before current time                                                                               |
| to      | query | integer(int64) | false    | Time range ending, default to current time                                                                                                |
| limit   | query | integer        | false    | Maximum number of records to be returned in a single list                                                                                 |
| offset  | query | integer        | false    | List offset, starting from 0                                                                                                              |

> Example responses

> 200 Response

```
[
  {
    "timest": "1592809000",
    "uid": "10001",
    "sub_account": "10002",
    "sub_account_type": "spot",
    "currency": "BTC",
    "amount": "1",
    "direction": "to",
    "source": "web",
    "client_order_id": "da3ce7a088c8b0372b741419c7829033",
    "status": "success"
  }
]
```

### Responses

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name               | Type   | Description                                                                                                                                                                                                                               |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » timest           | string | Transfer timestamp                                                                                                                                                                                                                        |
| » uid              | string | Main account user ID                                                                                                                                                                                                                      |
| » sub_account      | string | Sub account user ID                                                                                                                                                                                                                       |
| » sub_account_type | string | Target sub user's account. `spot` - spot account, `futures` - perpetual contract account, `delivery` - delivery account                                                                                                                   |
| » currency         | string | Transfer currency name                                                                                                                                                                                                                    |
| » amount           | string | Transfer amount                                                                                                                                                                                                                           |
| » direction        | string | Transfer direction. to - transfer into sub account; from - transfer out from sub account                                                                                                                                                  |
| » source           | string | Where the operation is initiated from                                                                                                                                                                                                     |
| » client_order_id  | string | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_', with a length ranging from 1 to 64 characters. |
| » status           | string | Sub-account transfer record status, currently only success                                                                                                                                                                                |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#sub-account-transfers-to-sub-account) Sub-account transfers to sub-account

> Code samples

`POST /wallet/sub_account_to_sub_account`

_Sub-account transfers to sub-account_

It is possible to perform balance transfers between two sub-accounts under the
same main account. You can use either the API Key of the main account or the API
Key of the sub-account to initiate the transfer.

> Body parameter

```
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

| Name                    | In   | Type   | Required | Description                                                                                                                                  |
| ----------------------- | ---- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| body                    | body | object | true     | none                                                                                                                                         |
| » currency              | body | string | true     | Transfer currency name                                                                                                                       |
| » sub_account_type      | body | string | false    | Transfer from the account. (deprecate, use `sub_account_from_type` and `sub_account_to_type` instead)                                        |
| » sub_account_from      | body | string | true     | Transfer from the user id of the sub-account                                                                                                 |
| » sub_account_from_type | body | string | true     | The sub-account's outgoing trading account, spot - spot account, futures - perpetual contract account, delivery - delivery contract account. |
| » sub_account_to        | body | string | true     | Transfer to the user id of the sub-account                                                                                                   |
| » sub_account_to_type   | body | string | true     | Transferred sub-account trading account: spot - spot account, futures - perpetual contract account, delivery - delivery contract account     |
| » amount                | body | string | true     | Transfer amount                                                                                                                              |

> Example responses

> 200 Response

```
{
  "tx_id": 59636381286
}
```

### Responses

| Status | Meaning                                                                    | Description         | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Balance transferred | Inline |

### Response Schema

Status Code **200**

_TransactionID_

| Name    | Type           | Description |
| ------- | -------------- | ----------- |
| » tx_id | integer(int64) | Order id    |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-status-query) Transfer status query

> Code samples

`GET /wallet/order_status`

_Transfer status query_

Support querying transfer status based on user-defined client_order_id or tx_id
returned by the transfer interface

### Parameters

| Name            | In    | Type   | Required | Description                                                                                                                                                                                                                               |
| --------------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| client_order_id | query | string | false    | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '\_', with a length ranging from 1 to 64 characters. |
| tx_id           | query | string | false    | The transfer operation number and client_order_id cannot be empty at the same time                                                                                                                                                        |

> Example responses

> 200 Response

```
{
  "tx_id": "59636381286",
  "status": "SUCCESS"
}
```

### Responses

| Status | Meaning                                                                    | Description                           | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Transfer status obtained successfully | Inline |

### Response Schema

Status Code **200**

_TransferOrderStatus_

| Name     | Type   | Description                                                                                                                                                                                       |
| -------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » tx_id  | string | Order id                                                                                                                                                                                          |
| » status | string | Transfer status, PENDING - in process, SUCCESS - successful transfer, FAIL - failed transfer, PARTIAL_SUCCESS - Partially successful (this status will appear when transferring between sub-subs) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-withdrawal-status) Retrieve withdrawal status

> Code samples

`GET /wallet/withdraw_status`

_Retrieve withdrawal status_

### Parameters

| Name     | In    | Type   | Required | Description                             |
| -------- | ----- | ------ | -------- | --------------------------------------- |
| currency | query | string | false    | Retrieve data of the specified currency |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                         | Type   | Description                                  |
| ---------------------------- | ------ | -------------------------------------------- |
| » currency                   | string | Currency                                     |
| » name                       | string | Currency name                                |
| » name_cn                    | string | Currency Chinese name                        |
| » deposit                    | string | Deposits fee                                 |
| » withdraw_percent           | string | Withdrawal fee rate percentage               |
| » withdraw_fix               | string | Fixed withdrawal fee                         |
| » withdraw_day_limit         | string | Daily allowed withdrawal amount              |
| » withdraw_amount_mini       | string | Minimum withdrawal amount                    |
| » withdraw_day_limit_remain  | string | Daily withdrawal amount left                 |
| » withdraw_eachtime_limit    | string | Maximum amount for each withdrawal           |
| » withdraw_fix_on_chains     | object | Fixed withdrawal fee on multiple chains      |
| »» **additionalProperties**  | string | none                                         |
| » withdraw_percent_on_chains | object | Percentage withdrawal fee on multiple chains |
| »» **additionalProperties**  | string | none                                         |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-sub-account-balances) Retrieve sub account balances

> Code samples

`GET /wallet/sub_account_balances`

_Retrieve sub account balances_

### Parameters

| Name    | In    | Type   | Required | Description                                                                                                                               |
| ------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                        | Type   | Description                      |
| --------------------------- | ------ | -------------------------------- |
| » uid                       | string | User ID                          |
| » available                 | object | Available balances of currencies |
| »» **additionalProperties** | string | none                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-accounts-margin-balances) Query sub accounts' margin balances

> Code samples

`GET /wallet/sub_account_margin_balances`

_Query sub accounts' margin balances_

### Parameters

| Name    | In    | Type   | Required | Description                                                                                                                               |
| ------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name              | Type    | Description                                                                                                        |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| » uid             | string  | User ID                                                                                                            |
| » available       | array   | Margin account balances                                                                                            |
| »» _None_         | object  | Margin account detail. `base` refers to base currency, while \`quotes to quote currency                            |
| »»» currency_pair | string  | Currency pair                                                                                                      |
| »»» account_type  | string  | Account type, risk - risk rate account, mmr - maintenance margin rate account, inactive - market not activated     |
| »»» leverage      | string  | User current market leverage multiple                                                                              |
| »»» locked        | boolean | Whether account is locked                                                                                          |
| »»» risk          | string  | Leveraged Account Current Risk Rate (Returned when the Account is a Risk Rate Account)                             |
| »»» mmr           | string  | Leveraged Account Current Maintenance Margin Rate (returned when the Account is a Maintenance Margin Rate Account) |
| »»» base          | object  | Account currency details                                                                                           |
| »»»» currency     | string  | Currency name                                                                                                      |
| »»»» available    | string  | Amount suitable for margin trading.                                                                                |
| »»»» locked       | string  | Locked amount, used in margin trading                                                                              |
| »»»» borrowed     | string  | Borrowed amount                                                                                                    |
| »»»» interest     | string  | Unpaid interests                                                                                                   |
| »»» quote         | object  | Account currency details                                                                                           |
| »»»» currency     | string  | Currency name                                                                                                      |
| »»»» available    | string  | Amount suitable for margin trading.                                                                                |
| »»»» locked       | string  | Locked amount, used in margin trading                                                                              |
| »»»» borrowed     | string  | Borrowed amount                                                                                                    |
| »»»» interest     | string  | Unpaid interests                                                                                                   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-accounts-futures-account-balances) Query sub accounts' futures account balances

> Code samples

`GET /wallet/sub_account_futures_balances`

_Query sub accounts' futures account balances_

### Parameters

| Name    | In    | Type   | Required | Description                                                                                                                               |
| ------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |
| settle  | query | string | false    | Query only balances of specified settle currency                                                                                          |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                                                                           | Type    | Description                                                                                                                                                                                     |
| ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » uid                                                                          | string  | User ID                                                                                                                                                                                         |
| » available                                                                    | object  | Futures account balances                                                                                                                                                                        |
| »» **additionalProperties**                                                    | object  | none                                                                                                                                                                                            |
| »»» total                                                                      | string  | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. |
| total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| »»» unrealised_pnl                                                             | string  | Unrealized PNL                                                                                                                                                                                  |
| »»» position_margin                                                            | string  | Position margin                                                                                                                                                                                 |
| »»» order_margin                                                               | string  | Order margin of unfinished orders                                                                                                                                                               |
| »»» available                                                                  | string  | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus)                                                  |
| »»» point                                                                      | string  | POINT amount                                                                                                                                                                                    |
| »»» currency                                                                   | string  | Settle currency                                                                                                                                                                                 |
| »»» in_dual_mode                                                               | boolean | Whether dual mode is enabled                                                                                                                                                                    |
| »»» enable_credit                                                              | boolean | Whether portfolio margin account mode is enabled                                                                                                                                                |
| »»» position_initial_margin                                                    | string  | Initial margin position, applicable to the portfolio margin account model                                                                                                                       |
| »»» maintenance_margin                                                         | string  | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model                                                                 |
| »»» bonus                                                                      | string  | Perpetual Contract Bonus                                                                                                                                                                        |
| »»» enable_evolved_classic                                                     | boolean | Classic account margin mode, true-new mode, false-old mode                                                                                                                                      |
| »»» cross_order_margin                                                         | string  | Full -warehouse hanging order deposit, suitable for the new classic account margin model                                                                                                        |
| »»» cross_initial_margin                                                       | string  | The initial security deposit of the full warehouse is suitable for the new classic account margin model                                                                                         |
| »»» cross_maintenance_margin                                                   | string  | Maintain deposit in full warehouse, suitable for new classic account margin models                                                                                                              |
| »»» cross_unrealised_pnl                                                       | string  | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model                                                                                          |
| »»» cross_available                                                            | string  | Full warehouse available amount, suitable for the new classic account margin model                                                                                                              |
| »»» cross_margin_balance                                                       | string  | Full margin balance, suitable for the new classic account margin model                                                                                                                          |
| »»» cross_mmr                                                                  | string  | Maintain margin ratio for the full position, suitable for the new classic account margin model                                                                                                  |
| »»» cross_imr                                                                  | string  | The initial margin rate of the full position is suitable for the new classic account margin model                                                                                               |
| »»» isolated_position_margin                                                   | string  | Ware -position margin, suitable for the new classic account margin model                                                                                                                        |
| »»» enable_new_dual_mode                                                       | boolean | Whether to open a new two-way position mode                                                                                                                                                     |
| »»» margin_mode                                                                | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode                                                                                                        |
| »»» enable_tiered_mm                                                           | boolean | Whether to enable tiered maintenance margin calculation                                                                                                                                         |
| »»» position_voucher_total                                                     | string  | Total Position Experience Coupon Amount in Account                                                                                                                                              |
| »»» history                                                                    | object  | Statistical data                                                                                                                                                                                |
| »»»» dnw                                                                       | string  | total amount of deposit and withdraw                                                                                                                                                            |
| »»»» pnl                                                                       | string  | total amount of trading profit and loss                                                                                                                                                         |
| »»»» fee                                                                       | string  | total amount of fee                                                                                                                                                                             |
| »»»» refr                                                                      | string  | total amount of referrer rebates                                                                                                                                                                |
| »»»» fund                                                                      | string  | total amount of funding costs                                                                                                                                                                   |
| »»»» point_dnw                                                                 | string  | total amount of point deposit and withdraw                                                                                                                                                      |
| »»»» point_fee                                                                 | string  | total amount of point fee                                                                                                                                                                       |
| »»»» point_refr                                                                | string  | total amount of referrer rebates of point fee                                                                                                                                                   |
| »»»» bonus_dnw                                                                 | string  | total amount of perpetual contract bonus transfer                                                                                                                                               |
| »»»» bonus_offset                                                              | string  | total amount of perpetual contract bonus deduction                                                                                                                                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-subaccount-s-cross-margin-account-info) Query subaccount's cross_margin account info

> Code samples

`GET /wallet/sub_account_cross_margin_balances`

_Query subaccount's cross_margin account info_

### Parameters

| Name    | In    | Type   | Required | Description                                                                                                                               |
| ------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | User ID of sub-account, you can query multiple records separated by `,`. If not specified, it will return the records of all sub accounts |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                              | Type           | Description                                                                                                       |
| --------------------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------- |
| » uid                             | string         | User ID                                                                                                           |
| » available                       | object         | none                                                                                                              |
| »» user_id                        | integer(int64) | User ID of the cross margin account. 0 means that the subaccount has not yet opened a cross margin account        |
| »» locked                         | boolean        | Whether account is locked                                                                                         |
| »» balances                       | object         | none                                                                                                              |
| »»» CrossMarginBalance            | object         | none                                                                                                              |
| »»»» available                    | string         | Available amount                                                                                                  |
| »»»» freeze                       | string         | Locked amount                                                                                                     |
| »»»» borrowed                     | string         | Borrowed amount                                                                                                   |
| »»»» interest                     | string         | Unpaid interests                                                                                                  |
| »»» total                         | string         | Total account value in USDT, i.e., the sum of all currencies' `(available+freeze)*price*discount`                 |
| »»» borrowed                      | string         | Total borrowed value in USDT, i.e., the sum of all currencies' `borrowed*price*discount`                          |
| »»» borrowed_net                  | string         | Total borrowed value in USDT \* borrowed factor                                                                   |
| »»» net                           | string         | Total net assets in USDT                                                                                          |
| »»» leverage                      | string         | Position leverage                                                                                                 |
| »»» interest                      | string         | Total unpaid interests in USDT, i.e., the sum of all currencies' `interest*price*discount`                        |
| »»» risk                          | string         | Risk rate. When it belows 110%, liquidation will be triggered. Calculation formula: `total / (borrowed+interest)` |
| »»» total_initial_margin          | string         | Total initial margin                                                                                              |
| »»» total_margin_balance          | string         | Total margin balance                                                                                              |
| »»» total_maintenance_margin      | string         | Total maintenance margin                                                                                          |
| »»» total_initial_margin_rate     | string         | Total initial margin rate                                                                                         |
| »»» total_maintenance_margin_rate | string         | Total maintenance margin rate                                                                                     |
| »»» total_available_margin        | string         | Total available margin                                                                                            |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-saved-address) Query saved address

> Code samples

`GET /wallet/saved_address`

_Query saved address_

### Parameters

| Name     | In    | Type    | Required | Description                          |
| -------- | ----- | ------- | -------- | ------------------------------------ |
| currency | query | string  | true     | Currency                             |
| chain    | query | string  | false    | Chain name                           |
| limit    | query | string  | false    | Maximum number returned, 100 at most |
| page     | query | integer | false    | Page number                          |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name       | Type   | Description                                               |
| ---------- | ------ | --------------------------------------------------------- |
| » currency | string | Currency                                                  |
| » chain    | string | Chain name                                                |
| » address  | string | Address                                                   |
| » name     | string | Name                                                      |
| » tag      | string | Tag                                                       |
| » verified | string | Whether to pass the verification 0-unverified, 1-verified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-personal-trading-fee) Retrieve personal trading fee

> Code samples

`GET /wallet/fee`

_Retrieve personal trading fee_

### Parameters

| Name          | In    | Type   | Required | Description                                                                        |
| ------------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------- |
| currency_pair | query | string | false    | Specify a currency pair to retrieve precise fee rate                               |
| settle        | query | string | false    | Specify the settlement currency of the contract to get more accurate rate settings |

#### [#](#detailed-descriptions-3) Detailed descriptions

**currency_pair**: Specify a currency pair to retrieve precise fee rate

This field is optional. In most cases, the fee rate is identical among all
currency pairs

**settle**: Specify the settlement currency of the contract to get more accurate
rate settings

This field is optional. Generally, the rate settings for all settlement
currencies are the same.

#### [#](#enumerated-values-2) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | BTC   |
| settle    | USDT  |
| settle    | USD   |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                 | Type           | Description                                                                          |
| -------------------- | -------------- | ------------------------------------------------------------------------------------ |
| » user_id            | integer(int64) | User ID                                                                              |
| » taker_fee          | string         | taker fee rate                                                                       |
| » maker_fee          | string         | maker fee rate                                                                       |
| » gt_discount        | boolean        | If GT deduction is enabled                                                           |
| » gt_taker_fee       | string         | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| » gt_maker_fee       | string         | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| » loan_fee           | string         | Loan fee rate of margin lending                                                      |
| » point_type         | string         | Point type. 0 - Initial version. 1 - new version since 202009                        |
| » futures_taker_fee  | string         | Futures trading taker fee                                                            |
| » futures_maker_fee  | string         | Future trading maker fee                                                             |
| » delivery_taker_fee | string         | Delivery trading taker fee                                                           |
| » delivery_maker_fee | string         | Delivery trading maker fee                                                           |
| » debit_fee          | integer        | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-user-s-total-balances) Retrieve user's total balances

> Code samples

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

| Name     | In    | Type   | Required | Description                                                                                                  |
| -------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------ |
| currency | query | string | false    | Currency unit used to calculate the balance amount. BTC, CNY, USD and USDT are allowed. USDT is the default. |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                                    | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is valid and is successfully responded | Inline |

### Response Schema

Status Code **200**

_User's balance in all accounts_

| Name              | Type   | Description                                                                                   |
| ----------------- | ------ | --------------------------------------------------------------------------------------------- |
| » total           | object | Total balances calculated with specified currency unit                                        |
| »» amount         | string | Account total balance amount                                                                  |
| »» currency       | string | Currency                                                                                      |
| »» unrealised_pnl | string | Unrealised_pnl, this field will only appear in futures, options, delivery, and total accounts |
| »» borrowed       | string | Borrowed，this field will only appear in margin and cross_margin accounts                     |
| » details         | object | Total balances in different accounts                                                          |

\- cross_margin: cross margin account  
\- spot: spot account  
\- finance: finance account  
\- margin: margin account  
\- quant: quant account  
\- futures: futures account  
\- delivery: delivery account  
\- warrant: warrant account  
\- cbbc: cbbc account | | »» **additionalProperties** | object | Total balances
calculated with specified currency unit | | »»» amount | string | Account total
balance amount | | »»» currency | string | Currency | | »»» unrealised_pnl |
string | Unrealised_pnl, this field will only appear in futures, options,
delivery, and total accounts | | »»» borrowed | string | Borrowed，this field
will only appear in margin and cross_margin accounts |

#### [#](#enumerated-values-3) Enumerated Values

| Property | Value |
| -------- | ----- |
| currency | BTC   |
| currency | CNY   |
| currency | USD   |
| currency | USDT  |
| currency | BTC   |
| currency | CNY   |
| currency | USD   |
| currency | USDT  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-small-balance) List small balance

> Code samples

`GET /wallet/small_balance`

_List small balance_

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

Status Code **200**

| Name                 | Type   | Description                |
| -------------------- | ------ | -------------------------- |
| » _None_             | object | Convert Small Balance      |
| »» currency          | string | Currency                   |
| »» available_balance | string | Available balance          |
| »» estimated_as_btc  | string | Estimated as BTC           |
| »» convertible_to_gt | string | Estimated conversion to GT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#convert-small-balance) Convert small balance

> Code samples

`POST /wallet/small_balance`

_Convert small balance_

> Body parameter

```
{
  "currency": [
    "FLOKI",
    "MBLK"
  ],
  "is_all": true
}
```

### Parameters

| Name       | In   | Type    | Required | Description             |
| ---------- | ---- | ------- | -------- | ----------------------- |
| body       | body | object  | true     | none                    |
| » currency | body | array   | false    | Currency                |
| » is_all   | body | boolean | false    | Whether to exchange all |

### Responses

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-small-balance-history) List small balance history

> Code samples

`GET /wallet/small_balance_history`

_List small balance history_

### Parameters

| Name     | In    | Type           | Required | Description                                                    |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------- |
| currency | query | string         | false    | Currency                                                       |
| page     | query | integer(int32) | false    | Page number                                                    |
| limit    | query | integer(int32) | false    | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

Status Code **200**

| Name           | Type           | Description                |
| -------------- | -------------- | -------------------------- |
| » _None_       | object         | Convert Small Balance      |
| »» id          | string         | Order ID                   |
| »» currency    | string         | Currency                   |
| »» amount      | string         | amount                     |
| »» gt_amount   | string         | GT amount                  |
| »» create_time | integer(int64) | Exchange time (in seconds) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-the-uid-transfer-history) Retrieve the UID transfer history

> Code samples

`GET /wallet/push`

_Retrieve the UID transfer history_

### Parameters

| Name             | In    | Type           | Required | Description                                                                                                                          |
| ---------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| id               | query | integer(int32) | false    | Order ID                                                                                                                             |
| from             | query | integer(int32) | false    | The start time of the query record. If not specified, it defaults to 7 days forward from the current time, in seconds Unix timestamp |
| to               | query | integer(int32) | false    | The end time of the query record. If not specified, the default is the current time, which is a Unix timestamp in seconds.           |
| limit            | query | integer(int32) | false    | The maximum number of items returned in the list, the default value is 100                                                           |
| offset           | query | integer(int32) | false    | List offset, starting from 0                                                                                                         |
| transaction_type | query | string         | false    | The list returns the order type `withdraw`, `deposit`, the default is `withdraw`.                                                    |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description       |
| ------------- | -------------- | ----------------- |
| » id          | integer(int64) | Order ID          |
| » push_uid    | integer(int64) | Initiator User ID |
| » receive_uid | integer(int64) | Recipient User ID |
| » currency    | string         | Currency name     |
| » amount      | string         | Transfer amount   |
| » create_time | integer(int64) | Creation time     |
| » status      | string         | Withdrawal Status |

\- CREATING: Creating  
\- PENDING: Waiting for receiving(Please contact the other party to accept the
transfer on the Gate official website)  
\- CANCELLING: Cancelling  
\- CANCELLED: Revoked  
\- REFUSING: Rejection  
\- REFUSED: Rejected  
\- RECEIVING: Receiving  
\- RECEIVED: Success | | » message | string | PENDING Reason Tips | | »
transaction_type | string | Order Type |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#subaccount) SubAccount

Sub-accounts management

## [#](#create-a-new-sub-account) Create a new sub-account

> Code samples

`POST /sub_accounts`

_Create a new sub-account_

> Body parameter

```
{
  "remark": "remark",
  "login_name": "sub_account_for_trades"
}
```

### Parameters

| Name         | In   | Type   | Required | Description                                                                                                              |
| ------------ | ---- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------ |
| body         | body | object | true     | none                                                                                                                     |
| » remark     | body | string | false    | custom text                                                                                                              |
| » login_name | body | string | true     | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password   | body | string | false    | The sub-account's password. (Default: the same as main account's password)                                               |
| » email      | body | string | false    | The sub-account's email address. (Default: the same as main account's email address)                                     |

> Example responses

> 201 Response

```
{
  "remark": "remark",
  "login_name": "sub_account_for_trades",
  "user_id": 10001,
  "state": 1,
  "create_time": 168888888
}
```

### Responses

| Status | Meaning                                                                         | Description          | Schema |
| ------ | ------------------------------------------------------------------------------- | -------------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Created Successfully | Inline |

### Response Schema

Status Code **201**

| Name          | Type           | Description                                                                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| » remark      | string         | custom text                                                                                                              |
| » login_name  | string         | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password    | string         | The sub-account's password. (Default: the same as main account's password)                                               |
| » email       | string         | The sub-account's email address. (Default: the same as main account's email address)                                     |
| » state       | integer(int32) | State: 1-normal, 2-locked"                                                                                               |
| » type        | integer(int32) | "Sub-account type: 1 - sub-account, 3 - cross margin account                                                             |
| » user_id     | integer(int64) | The user id of the sub-account                                                                                           |
| » create_time | integer(int64) | Created time                                                                                                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-sub-accounts) List sub-accounts

> Code samples

`GET /sub_accounts`

_List sub-accounts_

### Parameters

| Name | In    | Type   | Required | Description                                                                                          |
| ---- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------- |
| type | query | string | false    | `0` to list all types of sub-accounts (currently supporting cross margin accounts and sub-accounts). |

#### [#](#detailed-descriptions-4) Detailed descriptions

**type**: `0` to list all types of sub-accounts (currently supporting cross
margin accounts and sub-accounts). `1` to list sub-accounts only. If no
parameter is passed, only sub-accounts will be listed by default.

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description                                                                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| _None_        | array          | none                                                                                                                     |
| » remark      | string         | custom text                                                                                                              |
| » login_name  | string         | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password    | string         | The sub-account's password. (Default: the same as main account's password)                                               |
| » email       | string         | The sub-account's email address. (Default: the same as main account's email address)                                     |
| » state       | integer(int32) | State: 1-normal, 2-locked"                                                                                               |
| » type        | integer(int32) | "Sub-account type: 1 - sub-account, 3 - cross margin account                                                             |
| » user_id     | integer(int64) | The user id of the sub-account                                                                                           |
| » create_time | integer(int64) | Created time                                                                                                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-sub-account) Get the sub-account

> Code samples

`GET /sub_accounts/{user_id}`

_Get the sub-account_

### Parameters

| Name    | In   | Type           | Required | Description         |
| ------- | ---- | -------------- | -------- | ------------------- |
| user_id | path | integer(int64) | true     | Sub-account user id |

> Example responses

> 200 Response

```
{
  "remark": "remark",
  "login_name": "sub_account_for_trades",
  "user_id": 10001,
  "state": 1,
  "create_time": 168888888
}
```

### Responses

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successful  | Inline |

### Response Schema

Status Code **200**

| Name          | Type           | Description                                                                                                              |
| ------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| » remark      | string         | custom text                                                                                                              |
| » login_name  | string         | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password    | string         | The sub-account's password. (Default: the same as main account's password)                                               |
| » email       | string         | The sub-account's email address. (Default: the same as main account's email address)                                     |
| » state       | integer(int32) | State: 1-normal, 2-locked"                                                                                               |
| » type        | integer(int32) | "Sub-account type: 1 - sub-account, 3 - cross margin account                                                             |
| » user_id     | integer(int64) | The user id of the sub-account                                                                                           |
| » create_time | integer(int64) | Created time                                                                                                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-api-key-of-the-sub-account) Create API Key of the sub-account

> Code samples

`POST /sub_accounts/{user_id}/keys`

_Create API Key of the sub-account_

> Body parameter

```
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
  "ip_whitelist": [
    "127.0.0.1",
    "127.0.0.2"
  ]
}
```

### Parameters

| Name           | In   | Type                                  | Required | Description                                                |
| -------------- | ---- | ------------------------------------- | -------- | ---------------------------------------------------------- |
| user_id        | path | integer(int64)                        | true     | Sub-account user id                                        |
| body           | body | [SubAccountKey](#schemasubaccountkey) | true     | none                                                       |
| » mode         | body | integer(int32)                        | false    | Mode: 1 - classic 2 - portfolio account                    |
| » name         | body | string                                | false    | API key name                                               |
| » perms        | body | array                                 | false    | none                                                       |
| »» name        | body | string                                | false    | Permission function name (no value will be cleared)        |
| »» read_only   | body | boolean                               | false    | read only                                                  |
| » ip_whitelist | body | array                                 | false    | ip white list (list will be removed if no value is passed) |

#### [#](#detailed-descriptions-5) Detailed descriptions

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

```
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
  "ip_whitelist": [
    "127.0.0.1",
    "127.0.0.2"
  ],
  "mode": 1,
  "secret": "cddcc6e5e78060e013860bdbe5e737830b96821c027664586fb38b411808f4fd",
  "key": "eb8815bf99d7bb5f8ad6497bdc4774a8",
  "created_at": 1663683330,
  "updated_at": 1663683330
}
```

### Responses

| Status | Meaning                                                                    | Description          | Schema                                |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Created Successfully | [SubAccountKey](#schemasubaccountkey) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-api-key-of-the-sub-account) List all API Key of the sub-account

> Code samples

`GET /sub_accounts/{user_id}/keys`

_List all API Key of the sub-account_

### Parameters

| Name    | In   | Type    | Required | Description         |
| ------- | ---- | ------- | -------- | ------------------- |
| user_id | path | integer | true     | Sub-account user id |

> Example responses

> 200 Response

```
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
    "ip_whitelist": [
      "127.0.0.1",
      "127.0.0.2"
    ],
    "key": "75c3264105b74693d8cb5c7f1a8e2420",
    "created_at": 1663642892,
    "last_access": 1663642892,
    "update_at": 1663642892
  }
]
```

### Responses

| Status | Meaning                                                                    | Description    | Schema                                    |
| ------ | -------------------------------------------------------------------------- | -------------- | ----------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[SubAccountKey](#schemasubaccountkey)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-api-key-of-the-sub-account) Update API key of the sub-account

> Code samples

`PUT /sub_accounts/{user_id}/keys/{key}`

_Update API key of the sub-account_

> Body parameter

```
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
  "ip_whitelist": [
    "127.0.0.1",
    "127.0.0.2"
  ]
}
```

### Parameters

| Name           | In   | Type                                  | Required | Description                                                |
| -------------- | ---- | ------------------------------------- | -------- | ---------------------------------------------------------- |
| user_id        | path | integer                               | true     | Sub-account user id                                        |
| key            | path | string                                | true     | The API Key of the sub-account                             |
| body           | body | [SubAccountKey](#schemasubaccountkey) | true     | none                                                       |
| » mode         | body | integer(int32)                        | false    | Mode: 1 - classic 2 - portfolio account                    |
| » name         | body | string                                | false    | API key name                                               |
| » perms        | body | array                                 | false    | none                                                       |
| »» name        | body | string                                | false    | Permission function name (no value will be cleared)        |
| »» read_only   | body | boolean                               | false    | read only                                                  |
| » ip_whitelist | body | array                                 | false    | ip white list (list will be removed if no value is passed) |

#### [#](#detailed-descriptions-6) Detailed descriptions

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

| Status | Meaning                                                                            | Description | Schema |
| ------ | ---------------------------------------------------------------------------------- | ----------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Updated     | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-api-key-of-the-sub-account) Delete API key of the sub-account

> Code samples

`DELETE /sub_accounts/{user_id}/keys/{key}`

_Delete API key of the sub-account_

### Parameters

| Name    | In   | Type    | Required | Description                    |
| ------- | ---- | ------- | -------- | ------------------------------ |
| user_id | path | integer | true     | Sub-account user id            |
| key     | path | string  | true     | The API Key of the sub-account |

### Responses

| Status | Meaning                                                                            | Description         | Schema |
| ------ | ---------------------------------------------------------------------------------- | ------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Delete successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-api-key-of-the-sub-account) Get the API Key of the sub-account

> Code samples

`GET /sub_accounts/{user_id}/keys/{key}`

_Get the API Key of the sub-account_

### Parameters

| Name    | In   | Type    | Required | Description                    |
| ------- | ---- | ------- | -------- | ------------------------------ |
| user_id | path | integer | true     | Sub-account user id            |
| key     | path | string  | true     | The API Key of the sub-account |

> Example responses

> 200 Response

```
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
  "ip_whitelist": [
    "127.0.0.1",
    "127.0.0.2"
  ],
  "key": "75c3264105b74693d8cb5c7f1a8e2420",
  "created_at": 1663642892,
  "last_access": 1663642892,
  "update_at": 1663642892
}
```

### Responses

| Status | Meaning                                                                    | Description | Schema                                |
| ------ | -------------------------------------------------------------------------- | ----------- | ------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successful  | [SubAccountKey](#schemasubaccountkey) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#lock-the-sub-account) Lock the sub-account

> Code samples

`POST /sub_accounts/{user_id}/lock`

_Lock the sub-account_

### Parameters

| Name    | In   | Type           | Required | Description                    |
| ------- | ---- | -------------- | -------- | ------------------------------ |
| user_id | path | integer(int64) | true     | The user id of the sub-account |

### Responses

| Status | Meaning                                                                            | Description       | Schema |
| ------ | ---------------------------------------------------------------------------------- | ----------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Lock successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#unlock-the-sub-account) Unlock the sub-account

> Code samples

`POST /sub_accounts/{user_id}/unlock`

_Unlock the sub-account_

### Parameters

| Name    | In   | Type           | Required | Description                    |
| ------- | ---- | -------------- | -------- | ------------------------------ |
| user_id | path | integer(int64) | true     | The user id of the sub-account |

### Responses

| Status | Meaning                                                                            | Description         | Schema |
| ------ | ---------------------------------------------------------------------------------- | ------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Unlock successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-sub-account-mode) Get sub-account mode

> Code samples

`GET /sub_accounts/unified_mode`

_Get sub-account mode_

Unified account mode：

- `classic`: Classic account mode
- `multi_currency`: Multi-currency margin mode
- `portfolio`: Portfolio margin mode

> Example responses

> 200 Response

```
[
  {
    "user_id": 110285555,
    "is_unified": true,
    "mode": "multi_currency"
  }
]
```

### Responses

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name         | Type           | Description              |
| ------------ | -------------- | ------------------------ |
| » user_id    | integer(int64) | User ID                  |
| » is_unified | boolean        | Is it a unified account? |
| » mode       | string         | Unified account mode：   |

\- `classic`: Classic account mode  
\- `multi_currency`: Multi-currency margin mode  
\- `portfolio`: Portfolio margin mode |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#account) Account

Get account detail

## [#](#get-account-detail) Get account detail

> Code samples

`GET /account/detail`

_Get account detail_

> Example responses

> 200 Response

```
{
  "user_id": 1667201533,
  "ip_whitelist": [
    "127.0.0.1"
  ],
  "currency_pairs": [
    "USDT_BTC"
  ],
  "key": {
    "mode": 1
  },
  "tier": 2,
  "copy_trading_role": 1
}
```

### Responses

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successful  | Inline |

### Response Schema

Status Code **200**

_AccountDetail_

| Name                | Type           | Description                                                                                               |
| ------------------- | -------------- | --------------------------------------------------------------------------------------------------------- |
| » ip_whitelist      | array          | IP whitelist                                                                                              |
| » currency_pairs    | array          | CurrencyPair whitelisting                                                                                 |
| » user_id           | integer(int64) | User ID                                                                                                   |
| » tier              | integer(int64) | User VIP level                                                                                            |
| » key               | object         | API Key detail                                                                                            |
| »» mode             | integer(int32) | mode: 1 - classic account 2 - portfolio margin account                                                    |
| » copy_trading_role | integer(int32) | User role: 0 - Normal user 1 - Copy trading leader 2 - Copy trading follower 3 - Both leader and follower |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-transaction-rate-limit-information) Get user transaction rate limit information

> Code samples

`GET /account/rate_limit`

_Get user transaction rate limit information_

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successful  | \[Inline\] |

### Response Schema

Status Code **200**

_AccountRateLimit_

| Name             | Type   | Description                                                                                                                          |
| ---------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| AccountRateLimit | array  | Account flow limit                                                                                                                   |
| » tier           | string | Frequency limit level (For detailed frequency limit rules, see [Transaction ratio frequency limit](#rate-limit-based-on-fill-ratio)) |
| » ratio          | string | Transaction rate                                                                                                                     |
| » main_ratio     | string | Total transaction ratio of main account                                                                                              |
| » updated_at     | string | Update time                                                                                                                          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-stp-group) Create STP Group

> Code samples

`POST /account/stp_groups`

_Create STP Group_

Only the main account is allowed to create a new STP user group

> Body parameter

```
{
  "name": "stp_name"
}
```

### Parameters

| Name          | In   | Type           | Required | Description    |
| ------------- | ---- | -------------- | -------- | -------------- |
| body          | body | object         | true     | none           |
| » id          | body | integer(int64) | false    | STP Group ID   |
| » name        | body | string         | true     | STP Group name |
| » creator_id  | body | integer(int64) | false    | Creator ID     |
| » create_time | body | integer(int64) | false    | Creation time  |

> Example responses

> 200 Response

```
{
  "id": 123435,
  "name": "group",
  "create_time": 1548000000,
  "creator_id": 10000
}
```

### Responses

| Status | Meaning                                                                    | Description                                                                | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User added successfully. Returning the current users within the STP group. | Inline |

### Response Schema

Status Code **200**

| Name          | Type           | Description    |
| ------------- | -------------- | -------------- |
| » id          | integer(int64) | STP Group ID   |
| » name        | string         | STP Group name |
| » creator_id  | integer(int64) | Creator ID     |
| » create_time | integer(int64) | Creation time  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-stp-groups) List STP Groups

> Code samples

`GET /account/stp_groups`

_List STP Groups_

Retrieve the list of STP groups created by the main account user only

### Parameters

| Name | In    | Type   | Required | Description                              |
| ---- | ----- | ------ | -------- | ---------------------------------------- |
| name | query | string | false    | Perform a fuzzy search based on the name |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description    |
| ------------- | -------------- | -------------- |
| _None_        | array          | none           |
| » id          | integer(int64) | STP Group ID   |
| » name        | string         | STP Group name |
| » creator_id  | integer(int64) | Creator ID     |
| » create_time | integer(int64) | Creation time  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-users-of-the-stp-group) List users of the STP group

> Code samples

`GET /account/stp_groups/{stp_id}/users`

_List users of the STP group_

Only the main account that created this STP group can query the account

### Parameters

| Name   | In   | Type           | Required | Description  |
| ------ | ---- | -------------- | -------- | ------------ |
| stp_id | path | integer(int64) | true     | STP Group ID |

> Example responses

> 200 Response

```
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description   |
| ------------- | -------------- | ------------- |
| _None_        | array          | none          |
| » user_id     | integer(int64) | User ID       |
| » stp_id      | integer(int64) | STP Group ID  |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#add-users-to-the-stp-group) Add users to the STP group

> Code samples

`POST /account/stp_groups/{stp_id}/users`

_Add users to the STP group_

- Only the master account that created the STP user group is allowed to add
  users to the STP user group.- Only accounts under the main account are allowed
  to be added. Cross-account is not permitted

> Body parameter

```
[
  1,
  2,
  3
]
```

### Parameters

| Name   | In   | Type             | Required | Description  |
| ------ | ---- | ---------------- | -------- | ------------ |
| stp_id | path | integer(int64)   | true     | STP Group ID |
| body   | body | array\[integer\] | true     | User ID      |

> Example responses

> 200 Response

```
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

| Status | Meaning                                                                    | Description                                                                | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User added successfully. Returning the current users within the STP group. | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description   |
| ------------- | -------------- | ------------- |
| _None_        | array          | none          |
| » user_id     | integer(int64) | User ID       |
| » stp_id      | integer(int64) | STP Group ID  |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-the-user-in-the-stp-group) Delete the user in the STP group

> Code samples

`DELETE /account/stp_groups/{stp_id}/users`

_Delete the user in the STP group_

- Only the main account that created this STP group is allowed to delete users
  from the STP user group
- Deletion is limited to accounts under the current main account; cross-account
  deletion is not permitted

### Parameters

| Name    | In    | Type           | Required | Description                                      |
| ------- | ----- | -------------- | -------- | ------------------------------------------------ |
| stp_id  | path  | integer(int64) | true     | STP Group ID                                     |
| user_id | query | integer(int64) | true     | STP user ID, multiple can be separated by commas |

> Example responses

> 200 Response

```
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

| Status | Meaning                                                                    | Description | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description   |
| ------------- | -------------- | ------------- |
| _None_        | array          | none          |
| » user_id     | integer(int64) | User ID       |
| » stp_id      | integer(int64) | STP Group ID  |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-gt-deduction) Set GT deduction.

> Code samples

`POST /account/debit_fee`

_Set GT deduction._

Enable or disable GT deduction for the current account.

> Body parameter

```
{
  "enabled": true
}
```

### Parameters

| Name      | In   | Type                        | Required | Description                     |
| --------- | ---- | --------------------------- | -------- | ------------------------------- |
| body      | body | [DebitFee](#schemadebitfee) | true     | none                            |
| » enabled | body | boolean                     | true     | Whether GT fee discount is used |

### Responses

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-gt-deduction-configuration) Query GT deduction configuration.

> Code samples

`GET /account/debit_fee`

_Query GT deduction configuration._

Query the current GT deduction configuration for the account.

> Example responses

> 200 Response

```
{
  "enabled": true
}
```

### Responses

| Status | Meaning                                                                    | Description | Schema                      |
| ------ | -------------------------------------------------------------------------- | ----------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Success     | [DebitFee](#schemadebitfee) |

WARNING

To perform this operation, you must be authenticated by API key and secret
