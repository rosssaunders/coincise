# [#](#gate-api-v4-v4-98-1) Gate API v4 v4.98.1

Scroll down for code samples, example requests and responses. Select a language
for code samples from the tabs above or the mobile navigation menu.

Welcome to Gate API

APIv4 provides spot, margin and futures trading operations. There are public
APIs to retrieve the real-time market statistics, and private APIs which needs
authentication to trade on user's behalf.

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

# [#](#futures) Futures

Futures contract API

## [#](#list-all-futures-contracts) List all futures contracts

> Code samples

`GET /futures/{settle}/contracts`

_List all futures contracts_

### Parameters

| Name   | In    | Type    | Required | Description                                               |
| ------ | ----- | ------- | -------- | --------------------------------------------------------- |
| settle | path  | string  | true     | Settle currency                                           |
| limit  | query | integer | false    | Maximum number of records to be returned in a single list |
| offset | query | integer | false    | List offset, starting from 0                              |

#### [#](#enumerated-values-30) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                          |
| ------ | -------------------------------------------------------------------------- | -------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[Contract](#schemacontract)\] |

This operation does not require authentication

## [#](#get-a-single-contract) Get a single contract

> Code samples

`GET /futures/{settle}/contracts/{contract}`

_Get a single contract_

### Parameters

| Name     | In   | Type   | Required | Description      |
| -------- | ---- | ------ | -------- | ---------------- |
| settle   | path | string | true     | Settle currency  |
| contract | path | string | true     | Futures contract |

#### [#](#enumerated-values-31) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Contract information | [Contract](#schemacontract) |

This operation does not require authentication

## [#](#futures-order-book) Futures order book

> Code samples

`GET /futures/{settle}/order_book`

_Futures order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

| Name     | In    | Type    | Required | Description                                                                                          |
| -------- | ----- | ------- | -------- | ---------------------------------------------------------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                                                                      |
| contract | query | string  | true     | Futures contract                                                                                     |
| interval | query | string  | false    | Order depth. 0 means no aggregation is applied. default to 0                                         |
| limit    | query | integer | false    | Maximum number of order depth data in asks or bids                                                   |
| with_id  | query | boolean | false    | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |

#### [#](#enumerated-values-32) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

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

| Status | Meaning                                                                    | Description          | Schema |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order book retrieved | Inline |

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

## [#](#futures-trading-history) Futures trading history

> Code samples

`GET /futures/{settle}/trades`

_Futures trading history_

### Parameters

| Name     | In    | Type           | Required | Description                                                                                                     |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                                                                 |
| contract | query | string         | true     | Futures contract                                                                                                |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list                                                       |
| offset   | query | integer        | false    | List offset, starting from 0                                                                                    |
| last_id  | query | string         | false    | Specify the starting point for this list based on a previously retrieved id                                     |
| from     | query | integer(int64) | false    | Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items. |
| to       | query | integer(int64) | false    | Specify end time in Unix seconds, default to current time                                                       |

#### [#](#detailed-descriptions-22) Detailed descriptions

**last_id**: Specify the starting point for this list based on a previously
retrieved id

This parameter is deprecated. Use `from` and `to` instead to limit time range

**from**: Specify starting time in Unix seconds. If not specified, `to` and
`limit` will be used to limit response items. If items between `from` and `to`
are more than `limit`, only `limit` number will be returned.

#### [#](#enumerated-values-33) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

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

## [#](#get-futures-candlesticks) Get futures candlesticks

> Code samples

`GET /futures/{settle}/candlesticks`

_Get futures candlesticks_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the
contract's mark price candlesticks are returned; if prefix with `index_`, index
price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the
limit when specifying `from`, `to` and `interval`

### Parameters

| Name     | In    | Type           | Required | Description                                                                                                                                                           |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                                                                                                                       |
| contract | query | string         | true     | Futures contract                                                                                                                                                      |
| from     | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                                                  |
| to       | query | integer(int64) | false    | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time                                                                             |
| limit    | query | integer        | false    | Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected.                    |
| interval | query | string         | false    | Interval time between data points. Note that `1w` means natual week(Mon-Sun), while `7d` means every 7d since unix 0. Note that 30d means 1 natual month, not 30 days |

#### [#](#enumerated-values-34) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

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

## [#](#premium-index-k-line) Premium Index K-Line

> Code samples

`GET /futures/{settle}/premium_index`

_Premium Index K-Line_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the
limit when specifying from, to and interval

### Parameters

| Name     | In    | Type           | Required | Description                                                                                                                                        |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                                                                                                    |
| contract | query | string         | true     | Futures contract                                                                                                                                   |
| from     | query | integer(int64) | false    | Start time of candlesticks, formatted in Unix timestamp in seconds. Default to`to - 100 * interval` if not specified                               |
| to       | query | integer(int64) | false    | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time                                                          |
| limit    | query | integer        | false    | Maximum recent data points to return. `limit` is conflicted with `from` and `to`. If either `from` or `to` is specified, request will be rejected. |
| interval | query | string         | false    | Interval time between data points                                                                                                                  |

#### [#](#enumerated-values-35) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name     | Type           | Description                   |
| -------- | -------------- | ----------------------------- |
| » _None_ | object         | data point in every timestamp |
| »» t     | number(double) | Unix timestamp in seconds     |
| »» c     | string         | Close price                   |
| »» h     | string         | Highest price                 |
| »» l     | string         | Lowest price\`                |
| »» o     | string         | Open price                    |

This operation does not require authentication

## [#](#list-futures-tickers) List futures tickers

> Code samples

`GET /futures/{settle}/tickers`

_List futures tickers_

### Parameters

| Name     | In    | Type   | Required | Description                                             |
| -------- | ----- | ------ | -------- | ------------------------------------------------------- |
| settle   | path  | string | true     | Settle currency                                         |
| contract | query | string | false    | Futures contract, return related data only if specified |

#### [#](#enumerated-values-36) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                      | Type   | Description                                                                                                            |
| ------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------- |
| » contract                | string | Futures contract                                                                                                       |
| » last                    | string | Last trading price                                                                                                     |
| » change_percentage       | string | Change percentage.                                                                                                     |
| » total_size              | string | Contract total size                                                                                                    |
| » low_24h                 | string | Lowest trading price in recent 24h                                                                                     |
| » high_24h                | string | Highest trading price in recent 24h                                                                                    |
| » volume_24h              | string | Trade size in recent 24h                                                                                               |
| » volume_24h_btc          | string | Trade volumes in recent 24h in BTC(deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead) |
| » volume_24h_usd          | string | Trade volumes in recent 24h in USD(deprecated, use `volume_24h_base`, `volume_24h_quote`, `volume_24h_settle` instead) |
| » volume_24h_base         | string | Trade volume in recent 24h, in base currency                                                                           |
| » volume_24h_quote        | string | Trade volume in recent 24h, in quote currency                                                                          |
| » volume_24h_settle       | string | Trade volume in recent 24h, in settle currency                                                                         |
| » mark_price              | string | Recent mark price                                                                                                      |
| » funding_rate            | string | Funding rate                                                                                                           |
| » funding_rate_indicative | string | Indicative Funding rate in next period. (deprecated. use `funding_rate`)                                               |
| » index_price             | string | Index price                                                                                                            |
| » quanto_base_rate        | string | Exchange rate of base currency and settlement currency in Quanto contract. Does not exists in contracts of other types |
| » lowest_ask              | string | Recent lowest ask                                                                                                      |
| » lowest_size             | string | The latest seller's lowest price order quantity                                                                        |
| » highest_bid             | string | Recent highest bid                                                                                                     |
| » highest_size            | string | The latest buyer's highest price order volume                                                                          |

This operation does not require authentication

## [#](#funding-rate-history) Funding rate history

> Code samples

`GET /futures/{settle}/funding_rate`

_Funding rate history_

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                           |
| contract | query | string         | true     | Futures contract                                          |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | End timestamp                                             |

#### [#](#enumerated-values-37) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "t": 1543968000,
    "r": "0.000157"
  }
]
```

### Responses

| Status | Meaning                                                                    | Description       | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | History retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name | Type           | Description               |
| ---- | -------------- | ------------------------- |
| » t  | integer(int64) | Unix timestamp in seconds |
| » r  | string         | Funding rate              |

This operation does not require authentication

## [#](#futures-insurance-balance-history) Futures insurance balance history

> Code samples

`GET /futures/{settle}/insurance`

_Futures insurance balance history_

### Parameters

| Name   | In    | Type    | Required | Description                                               |
| ------ | ----- | ------- | -------- | --------------------------------------------------------- |
| settle | path  | string  | true     | Settle currency                                           |
| limit  | query | integer | false    | Maximum number of records to be returned in a single list |

#### [#](#enumerated-values-38) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "t": 1543968000,
    "b": "83.0031"
  }
]
```

### Responses

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name   | Type           | Description               |
| ------ | -------------- | ------------------------- |
| _None_ | array          | none                      |
| » t    | integer(int64) | Unix timestamp in seconds |
| » b    | string         | Insurance balance         |

This operation does not require authentication

## [#](#futures-stats) Futures stats

> Code samples

`GET /futures/{settle}/contract_stats`

_Futures stats_

### Parameters

| Name     | In    | Type           | Required | Description      |
| -------- | ----- | -------------- | -------- | ---------------- |
| settle   | path  | string         | true     | Settle currency  |
| contract | query | string         | true     | Futures contract |
| from     | query | integer(int64) | false    | Start timestamp  |
| interval | query | string         | false    | none             |
| limit    | query | integer        | false    | none             |

#### [#](#enumerated-values-39) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type           | Description                              |
| ------------------- | -------------- | ---------------------------------------- |
| » time              | integer(int64) | Stat timestamp                           |
| » lsr_taker         | number         | Long/short account number ratio          |
| » lsr_account       | number         | Long/short taker size ratio              |
| » long_liq_size     | integer(int64) | Long liquidation size                    |
| » long_liq_amount   | number(double) | Long liquidation amount(base currency)   |
| » long_liq_usd      | number(double) | Long liquidation volume(quote currency)  |
| » short_liq_size    | integer(int64) | Short liquidation size                   |
| » short_liq_amount  | number(double) | Short liquidation amount(base currency)  |
| » short_liq_usd     | number(double) | Short liquidation volume(quote currency) |
| » open_interest     | integer(int64) | Open interest size                       |
| » open_interest_usd | number(double) | Open interest volume(quote currency)     |
| » top_lsr_account   | number(double) | Top trader long/short account ratio      |
| » top_lsr_size      | number(double) | Top trader long/short position ratio     |

This operation does not require authentication

## [#](#get-index-constituents) Get index constituents

> Code samples

`GET /futures/{settle}/index_constituents/{index}`

_Get index constituents_

### Parameters

| Name   | In   | Type   | Required | Description     |
| ------ | ---- | ------ | -------- | --------------- |
| settle | path | string | true     | Settle currency |
| index  | path | string | true     | Index name      |

#### [#](#enumerated-values-40) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
{
  "index": "BTC_USDT",
  "constituents": [
    {
      "exchange": "Binance",
      "symbols": [
        "BTC_USDT"
      ]
    },
    {
      "exchange": "Gate.io",
      "symbols": [
        "BTC_USDT"
      ]
    },
    {
      "exchange": "Huobi",
      "symbols": [
        "BTC_USDT"
      ]
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

| Name                | Type   | Description  |
| ------------------- | ------ | ------------ |
| » index             | string | Index name   |
| » constituents      | array  | Constituents |
| »» IndexConstituent | object | none         |
| »»» exchange        | string | Exchange     |
| »»» symbols         | array  | Symbol list  |

This operation does not require authentication

## [#](#retrieve-liquidation-history) Retrieve liquidation history

> Code samples

`GET /futures/{settle}/liq_orders`

_Retrieve liquidation history_

Interval between `from` and `to` cannot exceeds 3600. Some private fields will
not be returned in public endpoints. Refer to field description for detail.

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                           |
| contract | query | string         | false    | Futures contract, return related data only if specified   |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | End timestamp                                             |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |

#### [#](#enumerated-values-41) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description                           |
| ------------- | -------------- | ------------------------------------- |
| » time        | integer(int64) | Liquidation time                      |
| » contract    | string         | Futures contract                      |
| » size        | integer(int64) | User position size                    |
| » order_size  | integer(int64) | Number of forced liquidation orders   |
| » order_price | string         | Liquidation order price               |
| » fill_price  | string         | Liquidation order average taker price |
| » left        | integer(int64) | System liquidation order maker size   |

This operation does not require authentication

## [#](#list-risk-limit-tiers) List risk limit tiers

> Code samples

`GET /futures/{settle}/risk_limit_tiers`

_List risk limit tiers_

When the 'contract' parameter is not passed, the default is to query the risk
limits for the top 100 markets.'Limit' and 'offset' correspond to pagination
queries at the market level, not to the length of the returned array. This only
takes effect when the 'contract' parameter is empty.

### Parameters

| Name     | In    | Type    | Required | Description                                               |
| -------- | ----- | ------- | -------- | --------------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                           |
| contract | query | string  | false    | Futures contract, return related data only if specified   |
| limit    | query | integer | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer | false    | List offset, starting from 0                              |

#### [#](#enumerated-values-42) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                | Type         | Description                                                                            |
| ------------------- | ------------ | -------------------------------------------------------------------------------------- |
| _None_              | array        | \[Retrieve risk limit configurations for different tiers under a specified contract.\] |
| » _None_            | object       | Retrieve risk limit configurations for different tiers under a specified contract.     |
| »» tier             | integer(int) | Tier                                                                                   |
| »» risk_limit       | string       | Position risk limit                                                                    |
| »» initial_rate     | string       | Initial margin rate                                                                    |
| »» maintenance_rate | string       | Maintenance margin rate                                                                |
| »» leverage_max     | string       | Maximum leverage                                                                       |
| »» contract         | string       | Markets, visible only during market pagination requests                                |

This operation does not require authentication

## [#](#query-futures-account) Query futures account

> Code samples

`GET /futures/{settle}/accounts`

_Query futures account_

### Parameters

| Name   | In   | Type   | Required | Description     |
| ------ | ---- | ------ | -------- | --------------- |
| settle | path | string | true     | Settle currency |

#### [#](#enumerated-values-43) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                                                                           | Type    | Description                                                                                                                                                                                     |
| ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » total                                                                        | string  | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. |
| total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| » unrealised_pnl                                                               | string  | Unrealized PNL                                                                                                                                                                                  |
| » position_margin                                                              | string  | Position margin                                                                                                                                                                                 |
| » order_margin                                                                 | string  | Order margin of unfinished orders                                                                                                                                                               |
| » available                                                                    | string  | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus)                                                  |
| » point                                                                        | string  | POINT amount                                                                                                                                                                                    |
| » currency                                                                     | string  | Settle currency                                                                                                                                                                                 |
| » in_dual_mode                                                                 | boolean | Whether dual mode is enabled                                                                                                                                                                    |
| » enable_credit                                                                | boolean | Whether portfolio margin account mode is enabled                                                                                                                                                |
| » position_initial_margin                                                      | string  | Initial margin position, applicable to the portfolio margin account model                                                                                                                       |
| » maintenance_margin                                                           | string  | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model                                                                 |
| » bonus                                                                        | string  | Perpetual Contract Bonus                                                                                                                                                                        |
| » enable_evolved_classic                                                       | boolean | Classic account margin mode, true-new mode, false-old mode                                                                                                                                      |
| » cross_order_margin                                                           | string  | Full -warehouse hanging order deposit, suitable for the new classic account margin model                                                                                                        |
| » cross_initial_margin                                                         | string  | The initial security deposit of the full warehouse is suitable for the new classic account margin model                                                                                         |
| » cross_maintenance_margin                                                     | string  | Maintain deposit in full warehouse, suitable for new classic account margin models                                                                                                              |
| » cross_unrealised_pnl                                                         | string  | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model                                                                                          |
| » cross_available                                                              | string  | Full warehouse available amount, suitable for the new classic account margin model                                                                                                              |
| » cross_margin_balance                                                         | string  | Full margin balance, suitable for the new classic account margin model                                                                                                                          |
| » cross_mmr                                                                    | string  | Maintain margin ratio for the full position, suitable for the new classic account margin model                                                                                                  |
| » cross_imr                                                                    | string  | The initial margin rate of the full position is suitable for the new classic account margin model                                                                                               |
| » isolated_position_margin                                                     | string  | Ware -position margin, suitable for the new classic account margin model                                                                                                                        |
| » enable_new_dual_mode                                                         | boolean | Whether to open a new two-way position mode                                                                                                                                                     |
| » margin_mode                                                                  | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode                                                                                                        |
| » history                                                                      | object  | Statistical data                                                                                                                                                                                |
| »» dnw                                                                         | string  | total amount of deposit and withdraw                                                                                                                                                            |
| »» pnl                                                                         | string  | total amount of trading profit and loss                                                                                                                                                         |
| »» fee                                                                         | string  | total amount of fee                                                                                                                                                                             |
| »» refr                                                                        | string  | total amount of referrer rebates                                                                                                                                                                |
| »» fund                                                                        | string  | total amount of funding costs                                                                                                                                                                   |
| »» point_dnw                                                                   | string  | total amount of point deposit and withdraw                                                                                                                                                      |
| »» point_fee                                                                   | string  | total amount of point fee                                                                                                                                                                       |
| »» point_refr                                                                  | string  | total amount of referrer rebates of point fee                                                                                                                                                   |
| »» bonus_dnw                                                                   | string  | total amount of perpetual contract bonus transfer                                                                                                                                               |
| »» bonus_offset                                                                | string  | total amount of perpetual contract bonus deduction                                                                                                                                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book-2) Query account book

> Code samples

`GET /futures/{settle}/account_book`

_Query account book_

If the `contract` field is provided, it can only filter records that include
this field after 2023-10-30.

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                           |
| contract | query | string         | false    | Futures contract, return related data only if specified   |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer        | false    | List offset, starting from 0                              |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | End timestamp                                             |
| type     | query | string         | false    | Changing Type：                                           |

#### [#](#detailed-descriptions-23) Detailed descriptions

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

#### [#](#enumerated-values-44) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name      | Type           | Description          |
| --------- | -------------- | -------------------- |
| _None_    | array          | none                 |
| » time    | number(double) | Change time          |
| » change  | string         | Change amount        |
| » balance | string         | Balance after change |
| » type    | string         | Changing Type：      |

\- dnw: Deposit & Withdraw  
\- pnl: Profit & Loss by reducing position  
\- fee: Trading fee  
\- refr: Referrer rebate  
\- fund: Funding  
\- point_dnw: POINT Deposit & Withdraw  
\- point_fee: POINT Trading fee  
\- point_refr: POINT Referrer rebate  
\- bonus_offset: bouns deduction | | » text | string | Comment | | » contract |
string | Futures contract, the field is only available for data after
2023-10-30. | | » trade_id | string | trade id | | » id | string
| 账户变更记录 id |

#### [#](#enumerated-values-45) Enumerated Values

| Property | Value        |
| -------- | ------------ |
| type     | dnw          |
| type     | pnl          |
| type     | fee          |
| type     | refr         |
| type     | fund         |
| type     | point_dnw    |
| type     | point_fee    |
| type     | point_refr   |
| type     | bonus_offset |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-positions-of-a-user) List all positions of a user

> Code samples

`GET /futures/{settle}/positions`

_List all positions of a user_

### Parameters

| Name    | In    | Type    | Required | Description                                               |
| ------- | ----- | ------- | -------- | --------------------------------------------------------- |
| settle  | path  | string  | true     | Settle currency                                           |
| holding | query | boolean | false    | Return only real positions - true, return all - false.    |
| limit   | query | integer | false    | Maximum number of records to be returned in a single list |
| offset  | query | integer | false    | List offset, starting from 0                              |

#### [#](#enumerated-values-46) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                          |
| ------ | -------------------------------------------------------------------------- | -------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[Position](#schemaposition)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-single-position) Get single position

> Code samples

`GET /futures/{settle}/positions/{contract}`

_Get single position_

### Parameters

| Name     | In   | Type   | Required | Description      |
| -------- | ---- | ------ | -------- | ---------------- |
| settle   | path | string | true     | Settle currency  |
| contract | path | string | true     | Futures contract |

#### [#](#enumerated-values-47) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](#schemaposition) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin) Update position margin

> Code samples

`POST /futures/{settle}/positions/{contract}/margin`

_Update position margin_

### Parameters

| Name     | In    | Type   | Required | Description                                                                       |
| -------- | ----- | ------ | -------- | --------------------------------------------------------------------------------- |
| settle   | path  | string | true     | Settle currency                                                                   |
| contract | path  | string | true     | Futures contract                                                                  |
| change   | query | string | true     | Margin change. Use positive number to increase margin, negative number otherwise. |

#### [#](#enumerated-values-48) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](#schemaposition) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage) Update position leverage

> Code samples

`POST /futures/{settle}/positions/{contract}/leverage`

_Update position leverage_

### Parameters

| Name                 | In    | Type   | Required | Description                                            |
| -------------------- | ----- | ------ | -------- | ------------------------------------------------------ |
| settle               | path  | string | true     | Settle currency                                        |
| contract             | path  | string | true     | Futures contract                                       |
| leverage             | query | string | true     | New position leverage                                  |
| cross_leverage_limit | query | string | false    | Cross margin leverage(valid only when `leverage` is 0) |

#### [#](#enumerated-values-49) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](#schemaposition) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#switch-to-the-full-position-by-store-mode) Switch to the full position-by-store mode

> Code samples

`POST /futures/{settle}/positions/cross_mode`

_Switch to the full position-by-store mode_

> Body parameter

```
{
  "mode": "ISOLATED",
  "contract": "BTC_USDT"
}
```

### Parameters

| Name       | In   | Type   | Required | Description                                                                |
| ---------- | ---- | ------ | -------- | -------------------------------------------------------------------------- |
| settle     | path | string | true     | Settle currency                                                            |
| body       | body | object | true     | none                                                                       |
| » mode     | body | string | true     | Full position-by-position model, ISOLATED-by-position, CROSS-full position |
| » contract | body | string | true     | Contract Market                                                            |

#### [#](#enumerated-values-50) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](#schemaposition) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit) Update position risk limit

> Code samples

`POST /futures/{settle}/positions/{contract}/risk_limit`

_Update position risk limit_

### Parameters

| Name       | In    | Type   | Required | Description          |
| ---------- | ----- | ------ | -------- | -------------------- |
| settle     | path  | string | true     | Settle currency      |
| contract   | path  | string | true     | Futures contract     |
| risk_limit | query | string | true     | New Risk Limit Value |

#### [#](#enumerated-values-51) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema                      |
| ------ | -------------------------------------------------------------------------- | -------------------- | --------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Position information | [Position](#schemaposition) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#enable-or-disable-dual-mode) Enable or disable dual mode

> Code samples

`POST /futures/{settle}/dual_mode`

_Enable or disable dual mode_

Before setting dual mode, make sure all positions are closed and no orders are
open

### Parameters

| Name      | In    | Type    | Required | Description                 |
| --------- | ----- | ------- | -------- | --------------------------- |
| settle    | path  | string  | true     | Settle currency             |
| dual_mode | query | boolean | true     | Whether to enable dual mode |

#### [#](#enumerated-values-52) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description | Schema |
| ------ | -------------------------------------------------------------------------- | ----------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Updated     | Inline |

### Response Schema

Status Code **200**

| Name                                                                           | Type    | Description                                                                                                                                                                                     |
| ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » total                                                                        | string  | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. |
| total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| » unrealised_pnl                                                               | string  | Unrealized PNL                                                                                                                                                                                  |
| » position_margin                                                              | string  | Position margin                                                                                                                                                                                 |
| » order_margin                                                                 | string  | Order margin of unfinished orders                                                                                                                                                               |
| » available                                                                    | string  | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus)                                                  |
| » point                                                                        | string  | POINT amount                                                                                                                                                                                    |
| » currency                                                                     | string  | Settle currency                                                                                                                                                                                 |
| » in_dual_mode                                                                 | boolean | Whether dual mode is enabled                                                                                                                                                                    |
| » enable_credit                                                                | boolean | Whether portfolio margin account mode is enabled                                                                                                                                                |
| » position_initial_margin                                                      | string  | Initial margin position, applicable to the portfolio margin account model                                                                                                                       |
| » maintenance_margin                                                           | string  | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model                                                                 |
| » bonus                                                                        | string  | Perpetual Contract Bonus                                                                                                                                                                        |
| » enable_evolved_classic                                                       | boolean | Classic account margin mode, true-new mode, false-old mode                                                                                                                                      |
| » cross_order_margin                                                           | string  | Full -warehouse hanging order deposit, suitable for the new classic account margin model                                                                                                        |
| » cross_initial_margin                                                         | string  | The initial security deposit of the full warehouse is suitable for the new classic account margin model                                                                                         |
| » cross_maintenance_margin                                                     | string  | Maintain deposit in full warehouse, suitable for new classic account margin models                                                                                                              |
| » cross_unrealised_pnl                                                         | string  | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model                                                                                          |
| » cross_available                                                              | string  | Full warehouse available amount, suitable for the new classic account margin model                                                                                                              |
| » cross_margin_balance                                                         | string  | Full margin balance, suitable for the new classic account margin model                                                                                                                          |
| » cross_mmr                                                                    | string  | Maintain margin ratio for the full position, suitable for the new classic account margin model                                                                                                  |
| » cross_imr                                                                    | string  | The initial margin rate of the full position is suitable for the new classic account margin model                                                                                               |
| » isolated_position_margin                                                     | string  | Ware -position margin, suitable for the new classic account margin model                                                                                                                        |
| » enable_new_dual_mode                                                         | boolean | Whether to open a new two-way position mode                                                                                                                                                     |
| » margin_mode                                                                  | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode                                                                                                        |
| » history                                                                      | object  | Statistical data                                                                                                                                                                                |
| »» dnw                                                                         | string  | total amount of deposit and withdraw                                                                                                                                                            |
| »» pnl                                                                         | string  | total amount of trading profit and loss                                                                                                                                                         |
| »» fee                                                                         | string  | total amount of fee                                                                                                                                                                             |
| »» refr                                                                        | string  | total amount of referrer rebates                                                                                                                                                                |
| »» fund                                                                        | string  | total amount of funding costs                                                                                                                                                                   |
| »» point_dnw                                                                   | string  | total amount of point deposit and withdraw                                                                                                                                                      |
| »» point_fee                                                                   | string  | total amount of point fee                                                                                                                                                                       |
| »» point_refr                                                                  | string  | total amount of referrer rebates of point fee                                                                                                                                                   |
| »» bonus_dnw                                                                   | string  | total amount of perpetual contract bonus transfer                                                                                                                                               |
| »» bonus_offset                                                                | string  | total amount of perpetual contract bonus deduction                                                                                                                                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-position-detail-in-dual-mode) Retrieve position detail in dual mode

> Code samples

`GET /futures/{settle}/dual_comp/positions/{contract}`

_Retrieve position detail in dual mode_

### Parameters

| Name     | In   | Type   | Required | Description      |
| -------- | ---- | ------ | -------- | ---------------- |
| settle   | path | string | true     | Settle currency  |
| contract | path | string | true     | Futures contract |

#### [#](#enumerated-values-53) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema                          |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[[Position](#schemaposition)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin-in-dual-mode) Update position margin in dual mode

> Code samples

`POST /futures/{settle}/dual_comp/positions/{contract}/margin`

_Update position margin in dual mode_

### Parameters

| Name      | In    | Type   | Required | Description                                                                       |
| --------- | ----- | ------ | -------- | --------------------------------------------------------------------------------- |
| settle    | path  | string | true     | Settle currency                                                                   |
| contract  | path  | string | true     | Futures contract                                                                  |
| change    | query | string | true     | Margin change. Use positive number to increase margin, negative number otherwise. |
| dual_side | query | string | true     | Long or short position                                                            |

#### [#](#enumerated-values-54) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema                          |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[[Position](#schemaposition)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage-in-dual-mode) Update position leverage in dual mode

> Code samples

`POST /futures/{settle}/dual_comp/positions/{contract}/leverage`

_Update position leverage in dual mode_

### Parameters

| Name                 | In    | Type   | Required | Description                                            |
| -------------------- | ----- | ------ | -------- | ------------------------------------------------------ |
| settle               | path  | string | true     | Settle currency                                        |
| contract             | path  | string | true     | Futures contract                                       |
| leverage             | query | string | true     | New position leverage                                  |
| cross_leverage_limit | query | string | false    | Cross margin leverage(valid only when `leverage` is 0) |

#### [#](#enumerated-values-55) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema                          |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[[Position](#schemaposition)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit-in-dual-mode) Update position risk limit in dual mode

> Code samples

`POST /futures/{settle}/dual_comp/positions/{contract}/risk_limit`

_Update position risk limit in dual mode_

### Parameters

| Name       | In    | Type   | Required | Description          |
| ---------- | ----- | ------ | -------- | -------------------- |
| settle     | path  | string | true     | Settle currency      |
| contract   | path  | string | true     | Futures contract     |
| risk_limit | query | string | true     | New Risk Limit Value |

#### [#](#enumerated-values-56) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema                          |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[[Position](#schemaposition)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-futures-order) Create a futures order

> Code samples

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

```
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

| Name           | In     | Type                                | Required | Description                                                                                                                                       |
| -------------- | ------ | ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-gate-exptime | header | string                              | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected  |
| body           | body   | [FuturesOrder](#schemafuturesorder) | true     | none                                                                                                                                              |
| » contract     | body   | string                              | true     | Futures contract                                                                                                                                  |
| » size         | body   | integer(int64)                      | true     | Order size. Specify positive number to make a bid, and negative number to ask                                                                     |
| » iceberg      | body   | integer(int64)                      | false    | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size                               |
| » price        | body   | string                              | false    | Order price. 0 for market order with `tif` set as `ioc`                                                                                           |
| » close        | body   | boolean                             | false    | Set as `true` to close the position, with `size` set to 0                                                                                         |
| » reduce_only  | body   | boolean                             | false    | Set as `true` to be reduce-only order                                                                                                             |
| » tif          | body   | string                              | false    | Time in force                                                                                                                                     |
| » text         | body   | string                              | false    | Order custom information, users can use this field to set a custom ID, and the user-defined field must meet the following conditions:             |
| » auto_size    | body   | string                              | false    | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |
| » stp_act      | body   | string                              | false    | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies                                                   |
| settle         | path   | string                              | true     | Settle currency                                                                                                                                   |

#### [#](#detailed-descriptions-24) Detailed descriptions

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
- liquidation: Liquidation under the classic account’s old liquidation mode
- liq-xxx: a. Liquidation under the classic account’s new liquidation mode
  (isolated, cross margin one-way mode, non-hedging part of cross margin hedge
  mode) b. Liquidation under isolated margin in unified account single currency
  margin mode
- hedge-liq-xxx: Liquidation under the new liquidation mode of the classic
  account hedge mode, the cross margin hedged part undergoes liquidation,
  meaning both long and short positions are liquidated simultaneously.
- pm_liquidate: Unified account multi-currency margin mode liquidation
- comb_margin_liquidate: Unified account portfolio margin mode liquidation
- scm_liquidate: Unified account single currency margin mode liquidation
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

#### [#](#enumerated-values-57) Enumerated Values

| Parameter   | Value       |
| ----------- | ----------- |
| » tif       | gtc         |
| » tif       | ioc         |
| » tif       | poc         |
| » tif       | fok         |
| » auto_size | close_long  |
| » auto_size | close_short |
| » stp_act   | co          |
| » stp_act   | cn          |
| » stp_act   | cb          |
| » stp_act   | \-          |
| settle      | btc         |
| settle      | usdt        |

> Example responses

> 201 Response

```
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

| Status | Meaning                                                                         | Description   | Schema                              |
| ------ | ------------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders) List futures orders

> Code samples

`GET /futures/{settle}/orders`

_List futures orders_

- Zero-fill order cannot be retrieved for 10 minutes after cancellation
- Historical orders, by default, only data within the past 6 months is
  supported. If you need to query data for a longer period, please use
  `GET /futures/{settle}/orders_timerange`.

### Parameters

| Name     | In    | Type    | Required | Description                                                                             |
| -------- | ----- | ------- | -------- | --------------------------------------------------------------------------------------- |
| contract | query | string  | false    | Futures contract, return related data only if specified                                 |
| status   | query | string  | true     | Only list the orders with this status                                                   |
| limit    | query | integer | false    | Maximum number of records to be returned in a single list                               |
| offset   | query | integer | false    | List offset, starting from 0                                                            |
| last_id  | query | string  | false    | Specify list staring point using the `id` of last record in previous list-query results |
| settle   | path  | string  | true     | Settle currency                                                                         |

#### [#](#enumerated-values-58) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                                  |
| ------ | -------------------------------------------------------------------------- | -------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[FuturesOrder](#schemafuturesorder)\] |

### [#](#response-headers) Response Headers

| Status | Header              | Type    | Format | Description              |
| ------ | ------------------- | ------- | ------ | ------------------------ |
| 200    | X-Pagination-Limit  | integer |        | Request limit specified  |
| 200    | X-Pagination-Offset | integer |        | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched) Cancel all `open` orders matched

> Code samples

`DELETE /futures/{settle}/orders`

_Cancel all `open` orders matched_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

| Name           | In     | Type   | Required | Description                                                                                                                                      |
| -------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| contract       | query  | string | true     | Futures contract                                                                                                                                 |
| side           | query  | string | false    | Specify all buy orders or all sell orders, if not specify them, both are included. Revoke all buy orders and revoke all sell orders and make ask |
| settle         | path   | string | true     | Settle currency                                                                                                                                  |

#### [#](#enumerated-values-59) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                  | Schema                                  |
| ------ | -------------------------------------------------------------------------- | ---------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | All orders matched cancelled | \[[FuturesOrder](#schemafuturesorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders-by-time-range) List Futures Orders By Time Range

> Code samples

`GET /futures/{settle}/orders_timerange`

_List Futures Orders By Time Range_

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                           |
| contract | query | string         | false    | Futures contract, return related data only if specified   |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | End timestamp                                             |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer        | false    | List offset, starting from 0                              |

#### [#](#enumerated-values-60) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                                  |
| ------ | -------------------------------------------------------------------------- | -------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[FuturesOrder](#schemafuturesorder)\] |

### [#](#response-headers-2) Response Headers

| Status | Header              | Type    | Format | Description              |
| ------ | ------------------- | ------- | ------ | ------------------------ |
| 200    | X-Pagination-Limit  | integer |        | Request limit specified  |
| 200    | X-Pagination-Offset | integer |        | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-batch-of-futures-orders) Create a batch of futures orders

> Code samples

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

```
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

| Name           | In     | Type                                         | Required | Description                                                                                                                                      |
| -------------- | ------ | -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string                                       | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array\[[FuturesOrder](#schemafuturesorder)\] | true     | none                                                                                                                                             |
| settle         | path   | string                                       | true     | Settle currency                                                                                                                                  |

#### [#](#enumerated-values-61) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is completed | \[Inline\] |

### Response Schema

Status Code **200**

| Name           | Type           | Description                                                                 |
| -------------- | -------------- | --------------------------------------------------------------------------- |
| _None_         | array          | \[Futures order details\]                                                   |
| » _None_       | object         | Futures order details                                                       |
| »» succeeded   | boolean        | Whether the batch of orders succeeded                                       |
| »» label       | string         | Error label, only exists if execution fails                                 |
| »» detail      | string         | Error detail, only present if execution failed and details need to be given |
| »» id          | integer(int64) | Futures order ID                                                            |
| »» user        | integer        | User ID                                                                     |
| »» create_time | number(double) | Creation time of order                                                      |
| »» finish_time | number(double) | Order finished time. Not returned if order is open                          |
| »» finish_as   | string         | How the order was finished.                                                 |

\- filled: all filled  
\- cancelled: manually cancelled  
\- liquidated: cancelled because of liquidation  
\- ioc: time in force is `IOC`, finish immediately  
\- auto_deleveraged: finished by ADL  
\- reduce_only: cancelled because of increasing position while `reduce-only`
set- position_closed: cancelled because of position close  
\- position_closed: canceled because the position was closed  
\- reduce_out: only reduce positions by excluding hard-to-fill orders  
\- stp: cancelled because self trade prevention | | »» status | string | Order
status

\- `open`: waiting to be traded  
\- `finished`: finished | | »» contract | string | Futures contract | | »» size
| integer(int64) | Order size. Specify positive number to make a bid, and
negative number to ask | | »» iceberg | integer(int64) | Display size for
iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee
for the hidden size | | »» price | string | Order price. 0 for market order with
`tif` set as `ioc` | | »» is_close | boolean | Is the order to close position |
| »» is_reduce_only | boolean | Is the order reduce-only | | »» is_liq | boolean
| Is the order for liquidation | | »» tif | string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | »» left | integer(int64)
| Size left to be traded | | »» fill_price | string | Fill price of the order |
| »» text | string | User defined information. If not empty, must follow the
rules below:

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
string | Maker fee | | »» refu | integer | Reference user ID | | »» stp_act |
string | Self-Trading Prevention Action. Users can use this field to set
self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, Cancel old orders and keep new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »» stp_id |
integer | Orders between users in the same `stp_id` group are not allowed to be
self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` |

#### [#](#enumerated-values-62) Enumerated Values

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
| finish_as | stp              |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |
| tif       | fok              |
| stp_act   | co               |
| stp_act   | cn               |
| stp_act   | cb               |
| stp_act   | \-               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-2) Get a single order

> Code samples

`GET /futures/{settle}/orders/{order_id}`

_Get a single order_

- Zero-fill order cannot be retrieved for 10 minutes after cancellation
- Historical orders, by default, only data within the past 6 months is
  supported.

### Parameters

| Name     | In   | Type   | Required | Description                                               |
| -------- | ---- | ------ | -------- | --------------------------------------------------------- |
| settle   | path | string | true     | Settle currency                                           |
| order_id | path | string | true     | Order ID returned, or user custom ID(i.e., `text` field). |

#### [#](#detailed-descriptions-25) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 60 seconds after
the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-63) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-2) Cancel a single order

> Code samples

`DELETE /futures/{settle}/orders/{order_id}`

_Cancel a single order_

### Parameters

| Name           | In     | Type   | Required | Description                                                                                                                                      |
| -------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| settle         | path   | string | true     | Settle currency                                                                                                                                  |
| order_id       | path   | string | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                        |

#### [#](#detailed-descriptions-26) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. When the order is finished, it can be checked within 60 seconds after
the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-64) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-an-order-2) Amend an order

> Code samples

`PUT /futures/{settle}/orders/{order_id}`

_Amend an order_

> Body parameter

```
{
  "size": 100,
  "price": "54321"
}
```

### Parameters

| Name           | In     | Type           | Required | Description                                                                                                                                      |
| -------------- | ------ | -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string         | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | object         | true     | none                                                                                                                                             |
| » size         | body   | integer(int64) | false    | New order size, including filled part.                                                                                                           |
| » price        | body   | string         | false    | New order price.                                                                                                                                 |
| » amend_text   | body   | string         | false    | Custom info during amending order                                                                                                                |
| » biz_info     | body   | string         | false    | Users can annotate this modification with information.                                                                                           |
| » bbo          | body   | string         | false    | Users are able to modify the offer price manually.                                                                                               |
| settle         | path   | string         | true     | Settle currency                                                                                                                                  |
| order_id       | path   | string         | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                        |

#### [#](#detailed-descriptions-27) Detailed descriptions

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

#### [#](#enumerated-values-65) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-2) List personal trading history

> Code samples

`GET /futures/{settle}/my_trades`

_List personal trading history_

By default, only data within the past 6 months is supported. If you need to
query data for a longer period, please use
`GET /futures/{settle}/my_trades_timerange`.

### Parameters

| Name     | In    | Type           | Required | Description                                                                 |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                             |
| contract | query | string         | false    | Futures contract, return related data only if specified                     |
| order    | query | integer(int64) | false    | Futures order ID, return related data only if specified                     |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list                   |
| offset   | query | integer        | false    | List offset, starting from 0                                                |
| last_id  | query | string         | false    | Specify the starting point for this list based on a previously retrieved id |

#### [#](#detailed-descriptions-28) Detailed descriptions

**last_id**: Specify the starting point for this list based on a previously
retrieved id

This parameter is deprecated. If you need to iterate through and retrieve more
records, we recommend using 'GET /futures/{settle}/my_trades_timerange'.

#### [#](#enumerated-values-66) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description                 |
| ------------- | -------------- | --------------------------- |
| _None_        | array          | none                        |
| » id          | integer(int64) | Trade ID                    |
| » create_time | number(double) | Trading time                |
| » contract    | string         | Futures contract            |
| » order_id    | string         | Order ID related            |
| » size        | integer(int64) | Trading size                |
| » close_size  | integer(int64) | Number of closed positions: |

close_size=0 && size＞0 Open long position  
close_size=0 && size＜0 Open short position  
close_size>0 && size>0 && size <= close_size Close short postion  
close_size>0 && size>0 && size > close_size Close short position and open long
position  
close_size<0 && size<0 && size >= close_size Close long postion  
close_size<0 && size<0 && size < close_size Close long position and open short
position | | » price | string | Trading price | | » role | string | Trade role.
Available values are `taker` and `maker` | | » text | string | User defined
information | | » fee | string | Fee deducted | | » point_fee | string | Points
used to deduct fee |

#### [#](#enumerated-values-67) Enumerated Values

| Property | Value |
| -------- | ----- |
| role     | taker |
| role     | maker |

### [#](#response-headers-3) Response Headers

| Status | Header              | Type    | Format | Description              |
| ------ | ------------------- | ------- | ------ | ------------------------ |
| 200    | X-Pagination-Limit  | integer |        | Request limit specified  |
| 200    | X-Pagination-Offset | integer |        | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-by-time-range) List personal trading history by time range

> Code samples

`GET /futures/{settle}/my_trades_timerange`

_List personal trading history by time range_

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                           |
| contract | query | string         | false    | Futures contract, return related data only if specified   |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | End timestamp                                             |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer        | false    | List offset, starting from 0                              |
| role     | query | string         | false    | Query role, maker or taker.                               |

#### [#](#enumerated-values-68) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description                 |
| ------------- | -------------- | --------------------------- |
| » trade_id    | string         | Trade ID                    |
| » create_time | number(double) | Trading time                |
| » contract    | string         | Futures contract            |
| » order_id    | string         | Order ID related            |
| » size        | integer(int64) | Trading size                |
| » close_size  | integer(int64) | Number of closed positions: |

close_size=0 && size＞0 Open long position  
close_size=0 && size＜0 Open short position  
close_size>0 && size>0 && size <= close_size Close short postion  
close_size>0 && size>0 && size > close_size Close short position and open long
position  
close_size<0 && size<0 && size >= close_size Close long postion  
close_size<0 && size<0 && size < close_size Close long position and open short
position | | » price | string | Trading price | | » role | string | Trade role.
Available values are `taker` and `maker` | | » text | string | User defined
information | | » fee | string | Fee deducted | | » point_fee | string | Points
used to deduct fee |

#### [#](#enumerated-values-69) Enumerated Values

| Property | Value |
| -------- | ----- |
| role     | taker |
| role     | maker |

### [#](#response-headers-4) Response Headers

| Status | Header              | Type    | Format | Description              |
| ------ | ------------------- | ------- | ------ | ------------------------ |
| 200    | X-Pagination-Limit  | integer |        | Request limit specified  |
| 200    | X-Pagination-Offset | integer |        | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-position-close-history) List position close history

> Code samples

`GET /futures/{settle}/position_close`

_List position close history_

### Parameters

| Name     | In    | Type           | Required | Description                                               |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                           |
| contract | query | string         | false    | Futures contract, return related data only if specified   |
| limit    | query | integer        | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer        | false    | List offset, starting from 0                              |
| from     | query | integer(int64) | false    | Start timestamp                                           |
| to       | query | integer(int64) | false    | End timestamp                                             |
| side     | query | string         | false    | Query side. long or shot                                  |
| pnl      | query | string         | false    | Query profit or loss                                      |

#### [#](#enumerated-values-70) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name              | Type           | Description                                                                                                                    |
| ----------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| _None_            | array          | none                                                                                                                           |
| » time            | number(double) | Position close time                                                                                                            |
| » contract        | string         | Futures contract                                                                                                               |
| » side            | string         | Position side, long or short                                                                                                   |
| » pnl             | string         | PNL                                                                                                                            |
| » pnl_pnl         | string         | PNL - Position P/L                                                                                                             |
| » pnl_fund        | string         | PNL - Funding Fees                                                                                                             |
| » pnl_fee         | string         | PNL - Transaction Fees                                                                                                         |
| » text            | string         | Text of close order                                                                                                            |
| » max_size        | string         | Max Trade Size                                                                                                                 |
| » accum_size      | string         | Cumulative closed position volume                                                                                              |
| » first_open_time | integer(int64) | First Open Time                                                                                                                |
| » long_price      | string         | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price. |
| » short_price     | string         | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price  |

#### [#](#enumerated-values-71) Enumerated Values

| Property | Value |
| -------- | ----- |
| side     | long  |
| side     | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-liquidation-history) List liquidation history

> Code samples

`GET /futures/{settle}/liquidates`

_List liquidation history_

### Parameters

| Name     | In    | Type    | Required | Description                                               |
| -------- | ----- | ------- | -------- | --------------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                           |
| contract | query | string  | false    | Futures contract, return related data only if specified   |
| limit    | query | integer | false    | Maximum number of records to be returned in a single list |
| at       | query | integer | false    | Specify a liquidation timestamp                           |

#### [#](#enumerated-values-72) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name          | Type           | Description                                             |
| ------------- | -------------- | ------------------------------------------------------- |
| _None_        | array          | none                                                    |
| » time        | integer(int64) | Liquidation time                                        |
| » contract    | string         | Futures contract                                        |
| » leverage    | string         | Position leverage. Not returned in public endpoints.    |
| » size        | integer(int64) | Position size                                           |
| » margin      | string         | Position margin. Not returned in public endpoints.      |
| » entry_price | string         | Average entry price. Not returned in public endpoints.  |
| » liq_price   | string         | Liquidation price. Not returned in public endpoints.    |
| » mark_price  | string         | Mark price. Not returned in public endpoints.           |
| » order_id    | integer(int64) | Liquidation order ID. Not returned in public endpoints. |
| » order_price | string         | Liquidation order price                                 |
| » fill_price  | string         | Liquidation order average taker price                   |
| » left        | integer(int64) | Liquidation order maker size                            |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-auto-deleveraging-history) List Auto-Deleveraging History

> Code samples

`GET /futures/{settle}/auto_deleverages`

_List Auto-Deleveraging History_

### Parameters

| Name     | In    | Type    | Required | Description                                               |
| -------- | ----- | ------- | -------- | --------------------------------------------------------- |
| settle   | path  | string  | true     | Settle currency                                           |
| contract | query | string  | false    | Futures contract, return related data only if specified   |
| limit    | query | integer | false    | Maximum number of records to be returned in a single list |
| at       | query | integer | false    | Specify an auto-deleveraging timestamp                    |

#### [#](#enumerated-values-73) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[Inline\] |

### Response Schema

Status Code **200**

| Name                   | Type           | Description                                            |
| ---------------------- | -------------- | ------------------------------------------------------ |
| » time                 | integer(int64) | Automatic deleveraging time                            |
| » user                 | integer(int64) | User ID                                                |
| » order_id             | integer(int64) | Order ID. Order IDs before 2023-02-20 are null         |
| » contract             | string         | Futures contract                                       |
| » leverage             | string         | Position leverage                                      |
| » cross_leverage_limit | string         | Cross margin leverage(valid only when `leverage` is 0) |
| » entry_price          | string         | Average entry price                                    |
| » fill_price           | string         | Average fill price                                     |
| » trade_size           | integer(int64) | Trading size                                           |
| » position_size        | integer(int64) | Positions after auto-deleveraging                      |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-2) Countdown cancel orders

> Code samples

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

```
{
  "timeout": 30,
  "contract": "BTC_USDT"
}
```

### Parameters

| Name       | In   | Type           | Required | Description                |
| ---------- | ---- | -------------- | -------- | -------------------------- |
| body       | body | object         | true     | none                       |
| » timeout  | body | integer(int32) | true     | Countdown time, in seconds |
| » contract | body | string         | false    | Futures contract           |
| settle     | path | string         | true     | Settle currency            |

#### [#](#detailed-descriptions-29) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the
countdown

#### [#](#enumerated-values-74) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

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

## [#](#query-user-trading-fee-rates-2) Query user trading fee rates

> Code samples

`GET /futures/{settle}/fee`

_Query user trading fee rates_

### Parameters

| Name     | In    | Type   | Required | Description                                             |
| -------- | ----- | ------ | -------- | ------------------------------------------------------- |
| settle   | path  | string | true     | Settle currency                                         |
| contract | query | string | false    | Futures contract, return related data only if specified |

#### [#](#enumerated-values-75) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name                       | Type   | Description                                                                                                                    |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| » **additionalProperties** | object | The returned result is a map type, where the key represents the market and the value represents the taker and maker fee rates. |
| »» taker_fee               | string | Taker fee                                                                                                                      |
| »» maker_fee               | string | maker fee                                                                                                                      |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-batch-of-orders-with-an-id-list-2) Cancel a batch of orders with an ID list

> Code samples

`POST /futures/{settle}/batch_cancel_orders`

_Cancel a batch of orders with an ID list_

Multiple distinct order ID list can be specified。Each request can cancel a
maximum of 20 records.

> Body parameter

```
[
  "1",
  "2",
  "3"
]
```

### Parameters

| Name           | In     | Type            | Required | Description                                                                                                                                      |
| -------------- | ------ | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string          | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array\[string\] | true     | none                                                                                                                                             |
| settle         | path   | string          | true     | Settle currency                                                                                                                                  |

#### [#](#enumerated-values-76) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                            | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order cancellation operation completed | \[Inline\] |

### Response Schema

Status Code **200**

| Name                      | Type           | Description                                                       |
| ------------------------- | -------------- | ----------------------------------------------------------------- |
| » FutureCancelOrderResult | object         | Order cancellation result                                         |
| »» id                     | string         | Order ID                                                          |
| »» user_id                | integer(int64) | User ID                                                           |
| »» succeeded              | boolean        | Whether cancellation succeeded                                    |
| »» message                | string         | Error message when failed to cancel the order; empty if succeeded |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modify-orders-with-specified-ids) Batch modify orders with specified IDs

> Code samples

`POST /futures/{settle}/batch_amend_orders`

_Batch modify orders with specified IDs_

You can specify multiple different order IDs. You can only modify up to 10
orders in one request.

> Body parameter

```
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

| Name           | In     | Type                                                     | Required | Description                                                                                                                                      |
| -------------- | ------ | -------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string                                                   | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array\[[BatchAmendOrderReq](#schemabatchamendorderreq)\] | true     | none                                                                                                                                             |
| settle         | path   | string                                                   | true     | Settle currency                                                                                                                                  |

#### [#](#enumerated-values-77) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description          | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is completed | \[Inline\] |

### Response Schema

Status Code **200**

| Name           | Type           | Description                                                                 |
| -------------- | -------------- | --------------------------------------------------------------------------- |
| _None_         | array          | \[Futures order details\]                                                   |
| » _None_       | object         | Futures order details                                                       |
| »» succeeded   | boolean        | Whether the batch of orders succeeded                                       |
| »» label       | string         | Error label, only exists if execution fails                                 |
| »» detail      | string         | Error detail, only present if execution failed and details need to be given |
| »» id          | integer(int64) | Futures order ID                                                            |
| »» user        | integer        | User ID                                                                     |
| »» create_time | number(double) | Creation time of order                                                      |
| »» finish_time | number(double) | Order finished time. Not returned if order is open                          |
| »» finish_as   | string         | How the order was finished.                                                 |

\- filled: all filled  
\- cancelled: manually cancelled  
\- liquidated: cancelled because of liquidation  
\- ioc: time in force is `IOC`, finish immediately  
\- auto_deleveraged: finished by ADL  
\- reduce_only: cancelled because of increasing position while `reduce-only`
set- position_closed: cancelled because of position close  
\- position_closed: canceled because the position was closed  
\- reduce_out: only reduce positions by excluding hard-to-fill orders  
\- stp: cancelled because self trade prevention | | »» status | string | Order
status

\- `open`: waiting to be traded  
\- `finished`: finished | | »» contract | string | Futures contract | | »» size
| integer(int64) | Order size. Specify positive number to make a bid, and
negative number to ask | | »» iceberg | integer(int64) | Display size for
iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee
for the hidden size | | »» price | string | Order price. 0 for market order with
`tif` set as `ioc` | | »» is_close | boolean | Is the order to close position |
| »» is_reduce_only | boolean | Is the order reduce-only | | »» is_liq | boolean
| Is the order for liquidation | | »» tif | string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | »» left | integer(int64)
| Size left to be traded | | »» fill_price | string | Fill price of the order |
| »» text | string | User defined information. If not empty, must follow the
rules below:

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
string | Maker fee | | »» refu | integer | Reference user ID | | »» stp_act |
string | Self-Trading Prevention Action. Users can use this field to set
self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, Cancel old orders and keep new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »» stp_id |
integer | Orders between users in the same `stp_id` group are not allowed to be
self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` |

#### [#](#enumerated-values-78) Enumerated Values

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
| finish_as | stp              |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |
| tif       | fok              |
| stp_act   | co               |
| stp_act   | cn               |
| stp_act   | cb               |
| stp_act   | \-               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-price-triggered-order-2) Create a price-triggered order

> Code samples

`POST /futures/{settle}/price_orders`

_Create a price-triggered order_

> Body parameter

```
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

| Name             | In   | Type                                                            | Required | Description                                                                                                                                                                        |
| ---------------- | ---- | --------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body             | body | [FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder) | true     | none                                                                                                                                                                               |
| » initial        | body | object                                                          | true     | none                                                                                                                                                                               |
| »» contract      | body | string                                                          | true     | Futures contract                                                                                                                                                                   |
| »» size          | body | integer(int64)                                                  | false    | Represents the number of contracts that need to be closed, full closing: size=0                                                                                                    |
| »» price         | body | string                                                          | true     | Order price. Set to 0 to use market price                                                                                                                                          |
| »» close         | body | boolean                                                         | false    | When all positions are closed in a single position mode, it must be set to true to perform the closing operation                                                                   |
| »» tif           | body | string                                                          | false    | Time in force strategy, default is gtc, market order currently only supports ioc mode Market order currently only supports ioc mode                                                |
| »» text          | body | string                                                          | false    | The source of the order, including:                                                                                                                                                |
| »» reduce_only   | body | boolean                                                         | false    | When set to true, perform automatic position reduction operation. Set to true to ensure that the order will not open a new position, and is only used to close or reduce positions |
| »» auto_size     | body | string                                                          | false    | Do not set auto_size                                                                                                                                                               |
| » trigger        | body | object                                                          | true     | none                                                                                                                                                                               |
| »» strategy_type | body | integer(int32)                                                  | false    | Trigger Policy                                                                                                                                                                     |
| »» price_type    | body | integer(int32)                                                  | false    | Price type. 0 - latest deal price, 1 - mark price, 2 - index price                                                                                                                 |
| »» price         | body | string                                                          | false    | Value of price on price triggered, or price gap on price gap triggered                                                                                                             |
| »» rule          | body | integer(int32)                                                  | false    | Price Condition Type                                                                                                                                                               |
| »» expiration    | body | integer                                                         | false    | How long (in seconds) to wait for the condition to be triggered before cancelling the order.                                                                                       |
| » order_type     | body | string                                                          | false    | Types of stop-profit and stop-loss, including:                                                                                                                                     |
| settle           | path | string                                                          | true     | Settle currency                                                                                                                                                                    |

#### [#](#detailed-descriptions-30) Detailed descriptions

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

#### [#](#enumerated-values-79) Enumerated Values

| Parameter        | Value |
| ---------------- | ----- |
| »» tif           | gtc   |
| »» tif           | ioc   |
| »» strategy_type | 0     |
| »» strategy_type | 1     |
| »» price_type    | 0     |
| »» price_type    | 1     |
| »» price_type    | 2     |
| »» rule          | 1     |
| »» rule          | 2     |
| settle           | btc   |
| settle           | usdt  |

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

## [#](#list-all-price-triggered-orders) List All Price-triggered Orders

> Code samples

`GET /futures/{settle}/price_orders`

_List All Price-triggered Orders_

### Parameters

| Name     | In    | Type    | Required | Description                                               |
| -------- | ----- | ------- | -------- | --------------------------------------------------------- |
| status   | query | string  | true     | Only list the orders with this status                     |
| contract | query | string  | false    | Futures contract, return related data only if specified   |
| limit    | query | integer | false    | Maximum number of records to be returned in a single list |
| offset   | query | integer | false    | List offset, starting from 0                              |
| settle   | path  | string  | true     | Settle currency                                           |

#### [#](#enumerated-values-80) Enumerated Values

| Parameter | Value    |
| --------- | -------- |
| status    | open     |
| status    | finished |
| settle    | btc      |
| settle    | usdt     |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description    | Schema                                                              |
| ------ | -------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved | \[[FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders-2) Cancel All Price-triggered Orders

> Code samples

`DELETE /futures/{settle}/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

| Name     | In    | Type   | Required | Description                                             |
| -------- | ----- | ------ | -------- | ------------------------------------------------------- |
| contract | query | string | false    | Futures contract, return related data only if specified |
| settle   | path  | string | true     | Settle currency                                         |

#### [#](#enumerated-values-81) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description                                                               | Schema                                                              |
| ------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted. Query order status by listing orders | \[[FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order-2) Get a price-triggered order

> Code samples

`GET /futures/{settle}/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

| Name     | In   | Type   | Required | Description                                          |
| -------- | ---- | ------ | -------- | ---------------------------------------------------- |
| settle   | path | string | true     | Settle currency                                      |
| order_id | path | string | true     | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-82) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description       | Schema                                                          |
| ------ | -------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order-2) cancel a price-triggered order

> Code samples

`DELETE /futures/{settle}/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

| Name     | In   | Type   | Required | Description                                          |
| -------- | ---- | ------ | -------- | ---------------------------------------------------- |
| settle   | path | string | true     | Settle currency                                      |
| order_id | path | string | true     | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-83) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
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

| Status | Meaning                                                                    | Description       | Schema                                                          |
| ------ | -------------------------------------------------------------------------- | ----------------- | --------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order detail | [FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret
