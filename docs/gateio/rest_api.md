# [#](#gate-api-v4-v4-94-1) Gate API v4 v4.94.1

Welcome to Gate.io API

APIv4 provides spot, margin and futures trading operations. There are public APIs to retrieve the real-time market statistics, and private APIs which needs authentication to trade on user's behalf.

## [#](#access-url) Access URL

**REST API BaseURL:**

*   Live trading: `https://api.gateio.ws/api/v4`
*   Futures TestNet trading: `https://fx-api-testnet.gateio.ws/api/v4`
*   Futures live trading alternative (futures only): `https://fx-api.gateio.ws/api/v4`

## [#](#sdk) SDK

Available SDK:

*   [Python (opens new window)](https://github.com/gateio/gateapi-python)
*   [Java (opens new window)](https://github.com/gateio/gateapi-java)
*   [PHP (opens new window)](https://github.com/gateio/gateapi-php)
*   [Go (opens new window)](https://github.com/gateio/gateapi-go)
*   [C# (opens new window)](https://github.com/gateio/gateapi-csharp)
*   [NodeJS (opens new window)](https://github.com/gateio/gateapi-nodejs)
*   [Javascript (opens new window)](https://github.com/gateio/gateapi-js)

Besides API examples, some SDK provides an additional demo application. The demo application is a relatively complete example demonstrating how to use the SDK. It can be built and run separately. Refer to corresponding repository for details.

*   [Python (opens new window)](https://github.com/gateio/gateapi-python/tree/master/example)
*   [Java (opens new window)](https://github.com/gateio/gateapi-java/tree/master/example)
*   [C# (opens new window)](https://github.com/gateio/gateapi-csharp/tree/master/example)
*   [Go (opens new window)](https://github.com/gateio/gateapi-go/tree/master/_example)

## [#](#about-apiv4-key-improvement) About APIv4 key improvement

Previously(before April 2020) futures APIv4 key are separated from spot one, but this is no longer the case anymore. You can create multiple keys with each key having multiple permissions now. e.g. you can create one key with spot read/write and futures read/write permission which can be used in both spot and futures trading.

History API keys will not be affected by this improvement. Previous spot key and futures key are now one key with only spot permissions enabled, another only futures permission enabled. You can reconfigure their permissions after migration.

## [#](#comparison-with-apiv2) Comparison with APIv2

APIv4 is a standalone brand-new HTTP REST API, currently used in parallel with APIv2. APIv4 provides complete trading operations, with more highly secured authentication method. What's more, APIv4 specification is written following [OpenAPI Specification (opens new window)](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md). SDKs and documents are all generated from the same spec, which ensures consistency between documents and implementation.

The ways APIv4 and APIv2 differ are:

1.  Their API keys are separated from each other. Once logged into the web console, v2 API keys are generated on _"APIKeys"_ page, while v4 _"APIv4Keys"_ page.
2.  APIv2 supports only spot trading, while v4 supports all trading operations in spot, margin and futures.

Which one to choose:

1.  If margin or futures trading are needed, choose APIv4.
2.  If only spot trading or wallet operation is required, choose on your own.

## [#](#application-for-marketers) Application for Marketers

In order to further improve the platform's opening depth and trading liquidity, we will recruit institutional market makers in an open and transparent way, and provide a professional market maker's service rate scheme for professional institutional market makers according to their contribution to the platform's liquidity.

1.  Provide Gateio UID
2.  Provide other transaction volume screenshot or VIP level
3.  Brief introduction of market making method and scale

Provide the above content and submit to [mm@gate.io](mailto:mm@gate.io) , we will accept within 3 working days.

TIP

Vip11 and above need to open GT deduction in the personal center to enjoy the professional market rate.

## [#](#technical-support) Technical Support

If you have any questions or suggestions during the use, you can contact us in any of the following ways:

*   Submit Work Order Feedback
*   Online Work Order Feedback
*   Send your contact information and questions to [mm@gate.io](mailto:mm@gate.io) We will assign technical specialists to serve you.

If you encounter API errors, it is recommended that you sort out the following content, so that we can quickly analyze the problem for you:

1.  Problem Description
2.  Gateio UID
3.  Request URI and parameters
4.  Error Code
5.  Responses

DANGER

Even if you submit a problem, you should not submit the API key information to customer service or others, otherwise there will be serious asset risk. If it has been accidentally leaked, please delete the existing API and rebuild it.

# [#](#general) General

## [#](#matching-mechanism) Matching mechanism

### [#](#matching-priority) Matching priority

Gate.io Order matching follows Price Priority > Time priority principle.

Suppose that the order book is as follows：

| Order | Order time | Ask/Selling price |
| --- | --- | --- |
| A | 10:00 | 100 |
| B | 10:00 | 102 |
| C | 10:01 | 100 |

If the current price of 10:02 pays 102, the final transaction order is: A, C, B

### [#](#order-life-cycle) Order life cycle

A valid order sent to the matching engine is immediately confirmed and executed with existing orders, with the executing result sent back to the client.

If an order is fully executed, then it is closed. If any part of the order is not executed immediately, orders with TimeInForce set to `IOC` will be cancelled, while others will be appended to the price list, waiting for subsequent filling or being cancelled.

## [#](#data-center) Data Center

Gate.io data center is located in AWS Japan's ap-northeast-1 region.

## [#](#api-overview) API Overview

| API Classification | Category Links | Overview |
| --- | --- | --- |
| host + /api/v4/spot/* | Spot Trading | Including currency status, market information, order, transaction records and other functions |
| host + /api/v4/margin/* | Margin Trading | Margin account management, lending, repayment, etc |
| host + /api/v4/wallet/* | Wallet Management | Charge and withdrawal records, balance inquiries, fund transfers, etc. |
| host + /api/v4/withdrawals/* | Withdrawal | Withdrawal of digital currency |

## [#](#margin-migration-instructions) Margin Migration Instructions

Between 14:00 (UTC+8) on April 13, 2023 and 14:00 (UTC+8) on April 23, 2023, the platform will gradually migrate the assets that have not been borrowed in the lending market to the `Lend & Earn` through an automated system process. At the same time, assets that have already been borrowed will be cancelled for automatic lending. After the migration is complete, you can check your investment details in the `Lend & Earn`. During this period, borrowing funds through the lending market will be temporarily suspended. You can also manually transfer your assets from the lending market to the `Lend & Earn` to obtain investment returns in advance.

After the automatic migration, the old version of the borrowing and lending endpoint will be deprecated, and the new version of the endpoint can be found in the /margin/uni endpoint group. For detailed endpoint migration, please refer to the following table:"

Margin account related endpoints：

| Name | Path | Deprecated | New Path |
| --- | --- | --- | --- |
| Margin account list | GET /margin/accounts | No | - |
| List margin account balance change history | GET /margin/account_book | No | - |
| Funding account list | GET /margin/funding_accounts | No | - |
| Update user's auto repayment setting | POST /margin/auto_repay | No | - |
| Querying user's automatic repayment settings | GET /margin/auto_repay | No | - |
| Get the max transferable amount for a specific margin currency | GET /margin/transferable | No | - |

The margin lending and borrowing related APIs have been migrated to the `/margin/uni` API group：

| Name | Old Path | Deprecated | New Path |
| --- | --- | --- | --- |
| List all supported currency pairs supported in margin trading | GET /margin/currency_pairs | Yes | GET /margin/uni/currency_pairs |
| Query one single margin currency pair | GET /margin/currency_pairs/{currency_pair} | Yes | GET /margin/uni/currency_pairs/{currency_pair} |
| Lend or borrow | POST /margin/loans | Yes | POST /margin/uni/loans |
| Retrieve one single loan detail | GET /margin/loans/{loan_id} | Yes | - |
| List all loans | GET /margin/loans | Yes | GET /margin/uni/loans |
| Repay a loan | POST /margin/loans/{loan_id}/repayment | Yes | POST /margin/uni/loans |
| List loan repayment records | GET /margin/loans/{loan_id}/repayment | Yes | GET /margin/uni/loan_records |
| Get the max borrowable amount for a specific margin currency | GET /margin/borrowable | Yes | GET /margin/uni/borrowable |
| List interest records | - | - | GET /margin/uni/interest_records |

The earn related APIs have been migrated to the `/earn/uni` API group):

| Name | Old Path | Deprecated | New Path |
| --- | --- | --- | --- |
| List all supported currency pairs supported in margin trading | GET /margin/currency_pairs | Yes | GET /earn/uni/currencies |
| Query one single margin currency pair | GET /margin/currency_pairs/{currency_pair} | Yes | GET /earn/uni/currencies/{currency} |
| Lend or borrow | POST /margin/loans | Yes | POST /earn/uni/lends |
| List all loans | GET /margin/loans | Yes | GET /earn/uni/lends |
| Order book of lending loans | GET /margin/funding_book | Yes | - |
| Merge multiple lending loans | POST /margin/merged_loans | Yes | - |
| Modify a loan | PATCH /margin/loans/{loan_id} | Yes | PATCH /earn/uni/lends |
| Cancel lending loan | DELETE /margin/loans/{loan_id} | Yes | POST /earn/uni/lends |
| List repayment records of a specific loan | GET /margin/loan_records | Yes | GET /earn/uni/lend_records |
| Get one single loan record | GET /margin/loan_records/{loan_record_id} | Yes | - |
| Modify a loan record | PATCH /margin/loan_records/{loan_record_id} | Yes | - |
| List interest records | - | - | GET /earn/uni/interest_records |

# [#](#api) API

## [#](#http-convention) HTTP convention

*   All read endpoints use `GET` method. They accept only request parameters. No request body will be read.
*   `DELETE` methods remove resources(like orders), but not all removing operation using `DELETE`, as `DELETE`s don't read request body either. For complex removing operations, `POST` method is used with parameters filled in request body.
*   Updating is done using `POST`, `PUT` or `PATCH` method. Their parameters are either in body or request parameters for different endpoints. Refer to endpoint detail for how to send the request.
*   All endpoints return HTTP status code `2xx` on success. `401` is returned on authentication failure. Other `4xx` codes mean the request is malformed. `5xx` means the server encounter some critical error on processing the request. Commit issues if `5xx` is met.

## [#](#time) Time

All time related fields are unix timestamp in **seconds** if no extra note, but they may differ in formats(int64, number or string). Possible values like the following may be returned:

*   1596531048
*   "1596531048"
*   1596531048.285
*   "1596531048.285"

The best way to handle time fields is parsing them as a number with decimal places. If higher precision is not needed, you can safely cast them to integer(or long). Our SDKs listed above has already taken proper deserialization to handle them

## [#](#api-gateway-in-out-time) API Gateway in/out time

In every API request, the response header will always include the following fields:

*   `X-In-Time`: The timestamp when the API gateway receives a request, in Unix timestamp format, measured in microseconds.
    
*   `X-Out-Time`: The timestamp when the API gateway returns a response, in Unix timestamp format, measured in microseconds.
    

For example:

```text
X-In-Time: 1695715091540163
X-Out-Time: 1695715091551905
```

## [#](#pagination) Pagination

Pagination is achieved using one of the following method

*   `page-limit`
*   `limit-offset`

In both method, `limit` limits the maximum number of records returned in one request. If no additional explanation, it defaults to `100` if not provided and its maximum value is limited to `1000`.

`page` starts from `1`, mimicking common paging used in web pages. To iterate the whole list, use the same `limit` and increment `page` by `1` until the records' length is shorter than the `limit`

`offset` starts from `0`, behaving like common DB search. To iterate the whole list, increment `offset` by `limit` until the records' length is shorter than the `limit`.

For example, if the total number of orders is 201. Using page-limit method, send request parameters like the following:

1.  `page=1&limit=100`
2.  `page=2&limit=100`
3.  `page=3&limit=100`

Using limit-offset method, send request parameters like:

1.  `limit=100&offset=0`
2.  `limit=100&offset=100`
3.  `limit=100&offset=200`

Some endpoints may return additional pagination metadata. If present, they are sent back through the response header. Take `GET /futures/{settle}/orders` as an example, following headers will be returned

*   `X-Pagination-Limit`: request limit
*   `X-Pagination-Offset`: request offset
*   `X-Pagination-Total`: total record number satisfying the request

## [#](#frequency-limit-rule) Frequency limit rule

| Markets | Endpoints | Limits | Based On | Include |
| --- | --- | --- | --- | --- |
| All public endpoints | Public endpoints | 200r/10s per endpoint | IP | Orderbook, Candlestick, Ticker, etc. |
| Wallet | Private endpoints | Withdrawal(POST /withdrawals) : 1r/3sTransfer between trading accounts (POST /wallet/transfers) 80r/10sTransfer between main and sub accounts (POST /wallet/sub_account_transfers) 80r/10sTransfer from a sub-account to another sub-account (POST /wallet/sub_account_to_sub_account) 80r/10sRetrieve user's total balances (GET /wallet/total_balance) 80r/10sRetrieve sub account balances (GET /wallet/sub_account_balances) 80r/10sQuery sub accounts' margin balances (GET /wallet/sub_account_margin_balances) 80r/10sQuery sub accounts' futures account balances (GET /wallet/sub_account_futures_balances) 80r/10sQuery subaccount's cross_margin account info(GET /wallet/sub_account_cross_margin_balances) 80r/10sThe Others: 200r/10s per endpoint | UID | Withdrawal.Query personal account balance.Query subaccount balance. |
| Spot | Private endpoints | The rate limit for batch/single order placement and amend an order are total of 10r/s (UID+Market)The rate limit for batch/single order cancellation is total of 200r/sThe Others: 200r/10s per endpoint | UID | Spot order placement and cancellation.Trade history and fee rates. |
| Perpetual Futures | Private endpoints | The rate limit for batch/single order placement and amend an order are total of 100r/sThe maximum rate limit for the order cancellation (bulk/single) is 200r/sThe Others: 200r/10s per endpoint | UID | Futures order placement and cancellationTrade history and fee rates |
| Delivery | Private endpoints | The maximum rate limit for the order placement (bulk/single) is 500r/10sThe maximum rate limit for the order cancellation (bulk/single) is 500r/10sThe Others: 200r/10s per endpoint | UID | Order placement and cancellation |
| Options | Private endpoints | The maximum rate limit for the order placement (bulk/single) is 200r/sThe maximum rate limit for the order cancellation (bulk/single) is 200r/sThe Others: 200r/10s per endpoint | UID | Order placement and cancellation |
| Subaccount | Private endpoints | 80r/10s per endpoint | UID | Create a sub-account.Retrieve the list of sub-accounts.Disable or enable API key for a sub-account. |
| Unified | Private endpoints | Borrow or repay 15/10s | UID | Borrow or repay(POST /unified/loans) |
| Other Private endpoints | Private endpoints | 150r/10s per endpoint | UID | Earning, collateral etc |

> The rate limit is counted against each sub-account or main account.

**Rate Limit**

Each request to the API response header will contain the following fields:：

*   X-Gate-RateLimit-Requests-Remain - your remaining requests for current endpoint
*   X-Gate-RateLimit-Limit - your current limit for current endpoint
*   X-Gate-RateLimit-Reset-Timestamp - the timestamp indicating when your request limit resets if you have exceeded your rate\_limit. Otherwise, this is just the current timestamp (it may not exactly match timeNow).

WebSocket:

*   Spot: Bulk order/single order/single order modification, a total of 10 requests per second (10r/s).
*   Futures: Bulk order/single order/single order modification/single order cancellation/bulk cancellation, a total of 100 requests per second (100r/s).
*   Others: No limit.

## [#](#rate-limit-based-on-fill-ratio) Rate Limit Based On Fill Ratio

In order to enhance trading efficiency, we have decided to implement more favorable sub-account rate limits for clients with a higher fill ratio. This assessment will be based on trading data from the past seven days and will be calculated daily at 00:00 UTC. Please note that this rule applies only to clients at **VIP level 14 and above**.

### [#](#_1-introduction-of-terminology) 1. Introduction of Terminology

#### [#](#_1-1-symbol-multiplier) 1.1 Symbol Multiplier

To facilitate a more refined management of the impact of different trading products on the fill ratio, we have introduced the concept of the symbol multiplier. This multiplier allows us to adjust the influence of each product on the overall trading volume based on its characteristics. For products with a multiplier of less than 1, they typically involve smaller contract sizes and therefore require more trading orders to achieve the same trading volume. Generally, all trading products come with a default multiplier; however, certain products are assigned independent multipliers based on their specific characteristics. For detailed information regarding the multipliers of relevant products, please refer to the provided table.

| Product Typee | Based On | Independnet Symbol Multiplier | Default Symbol Multiplier |
| --- | --- | --- | --- |
| USDT-Margined Perpetural Futures | Contract Symbol | 1Contract Symbol:BTC-USDTETH-USDT | 0.4 |
| Spot | Currency Pairst | 1Currency Pairs:BTC-USDTETH-USDT | 0.4 |

> Please note: The spot trading rate limits will not be launched this time.

#### [#](#_1-2-definition-of-trading-volume-weight) 1.2 Definition of Trading Volume Weight

We will assess the behavior patterns of makers and takers based on market fluctuations and design the trading volume weight ratios accordingly. Additionally, we will regularly evaluate these weights and make synchronized adjustments when necessary.

**Current weight of the maker trading volume: 100%, current weight of the taker trading volume: 90%.**

#### [#](#_1-3-calculation-formula) 1.3 Calculation Formula

The system will take a snapshot of the data at 00:00 UTC daily and, based on this information, will select the higher value between the fill ratio of the sub-account and the overall fill ratio of the main account to determine the future trading rate limit for the sub-account. For exchange brokers, the system will only consider the fill ratio of their sub-accounts. It is important to note that the main account is also considered a "sub-account."

1.  Sub-account Fill Ratio: This ratio is calculated as follows: (Sub-account Taker's USDT trading volume × 0.9 + Maker's USDT trading volume × 1) / (The sum of (Number of new and modified requests for each contract × symbol multipliers) for each subaccount).
2.  Main-account Aggregated Fill Ratio: This ratio is calculated as follows: (main account's Taker USDT trading volume × 0.9 + Maker USDT trading volume × 1) / (The sum of (Number of new and modified requests for each contract × symbol multipliers) for all subaccounts).

### [#](#_2-future-rate-limit-rule) 2. Future Rate Limit Rule

| Contract Frequency Limitation Rules |
| --- |
| Tier 1 | [0,1) | 100r/s |
| Tier 2 | [1,3) | 150r/s |
| Tier 3 | [3,5) | 200r/s |
| Tier 4 | [5,10) | 250r/s |
| Tier 5 | [10,20) | 300r/s |
| Tier 6 | [20,50) | 350r/s |
| Tier 7 | >= 50 | 400r/s |

> > Please stay tuned for the rate limits for spot trading.

### [#](#_3-detailed-rules-for-fill-ratio) 3. Detailed Rules for Fill Ratio

1.  Target Client Group: VIP ≥ 14
2.  Calculation Period: 7 days
3.  Update Time: Daily at 08:00 (UTC). The system will update the fill ratio data based on the data from 00:00 UTC.
    1.  If the fill ratio and the pre-set rate limit improve, the increase will take effect immediately at 08:00 (UTC).
    2.  However, if the fill ratio declines, the rate limit will be reduced immediately.
    3.  If a client's VIP level drops below VIP 14, their rate limit will be lowered to the minimum tier, taking effect immediately.
    4.  If a client's VIP level rises above VIP 14, their rate limit will be adjusted immediately based on their current level.
    5.  If a sub-account's trading volume over the past 7 days is below 1,000,000 USDT, the rate limit will be implemented based on the main-account aggregated fill ratio.
    6.  For newly created sub-accounts, the minimum tier rate limit will be applied at the time of creation, and the aforementioned rate limit rules will begin to apply at T+1 08:00 (UTC).
    7.  Both WebSocket and REST APIs are subject to these rules.

### [#](#_4-example) 4. Example

Assuming the client has three accounts, with the symbol multipliers for trading perpetual contract products BTC-USDT and SOL-USDT being 1 and 0.4, respectively.

1.  Account A (Main Account):
    *   BTC-USDT perpetual futures Maker trading volume: 100 USDT, number of order requests: 10; Perpetual futures Taker trading volume: 200 USDT, number of order requests: 20.
    *   SOL-USDT perpetual futures Maker trading volume: 20 USDT, number of order requests: 15; Perpetual futures Taker trading volume: 20 USDT, number of order requests: 20.
    *   Sub-account Fill Ratio = ((100 + 20) \* 1 + (200 + 20) \* 0.9) / ((10 + 20) \* 1 + (15 + 20) \* 0.4) = 7.23
2.  Account B (Sub-account):
    *   BTC-USDT perpetual futures Maker trading volume: 200 USDT, number of order requests: 20; Perpetual futures Taker trading volume: 200 USDT, number of order requests: 30.
    *   SOL-USDT perpetual futures Maker trading volume: 20 USDT, number of order requests: 5; Perpetual futures Taker trading volume: 30 USDT, number of order requests: 5.
    *   Sub-account Fill Ratio = ((200 + 20) \* 1 + (200 + 30) \* 0.9) / ((20 + 30) \* 1 + (5 + 5) \* 0.4) = 7.91
3.  Account C (Sub-account):
    *   BTC-USDT perpetual futures Maker trading volume: 50 USDT, number of order requests: 5; Perpetual futures Taker trading volume: 60 USDT, number of order requests: 8.
    *   SOL-USDT perpetual futures Maker trading volume: 100 USDT, number of order requests: 20; Perpetual futures Taker trading volume: 120 USDT, number of order requests: 25.
    *   Sub-account Fill Ratio = ((50 + 100) \* 1 + (60 + 120) \* 0.9) / ((5 + 8) \* 1 + (20 + 25) \* 0.4) = 10.06
4.  Main Account Aggregated Fill Ratio = ((100 + 20 + 200 + 20 + 50 + 100) \* 1 + (200 + 20 + 200 + 30 + 60 + 120) \* 0.9) / ((10 + 20 + 20 + 30 + 5 + 8) \* 1 + (15 + 20 + 5 + 5 + 20 + 25) \* 0.4) = 8.19
5.  Account Rate Limits:
    *   Account A = max(7.23, 8.19) = 8.19 -> 250 r/s
    *   Account B = max(7.91, 8.19) = 8.19 -> 250 r/s
    *   Account C = max(10.06, 8.19) = 10.06 -> 300 r/s

### [#](#_5-remarks) 5. Remarks

1.  The release date for the rate limit of perpetual contracts based on fill ratio will be announced later. Please stay tuned.
2.  The existing abuse rate limit rules for perpetual contracts will still apply, namely:
    1.  Fill Ratio = USDT Training Amount / (Total Number of Order, Cancellation, and Modification Requests)
    2.  If the number of requests exceeds 86,400 within 24 hours, with no order fill in the same period. Then the order placement rate limit will be restricted to 10r/10s for the next hour.
    3.  If the number of requests exceeds 86,400 within 24 hours, with the fill ratio below 1%. Then the order placement rate limit will be restricted to 20r/10s for the next hour.
3.  Please stay tuned for the fill ratio rate limit for spot trading.

## [#](#return-format) Return Format

All API responses are in JSON format, and users need to transform and extract data by themselves.

The HTTP status code 2XX will be returned when all operations are successful. 401 indicates that there is a problem with the certification. Other 4xx status codes indicate that the request is invalid. If it is a 5xx error, the server has encountered an unknown serious error when processing the request. Please give feedback as soon as possible。

**Return Status**

| Status Code | Description |
| --- | --- |
| 200/201 | Request succeeded |
| 202 | Request accepted by the server, but processing is not done yet |
| 204 | Request succeeded, but the server doesn't return body |
| 400 | Invalid request |
| 401 | Authentication failed |
| 404 | Not found |
| 429 | Too many requests |
| 5xx | Server error |

## [#](#data-type) Data Type

| Type | Description |
| --- | --- |
| string | String type, in double quotation marks. Price and amount are also formatted in string format |
| integer | 32-bit integer，Mainly related to status codes, size, times, etc. |
| integer(int64) | 64-bit integer，Mainly involves ID and higher precision timestamp |
| float | Floating point number. Some time and stat fields use float. |
| object | Object，Contains a child object{} |
| array | List，Includes multiple groups of content |
| boolean | true is true，false is false |

## [#](#portfolio-margin-account) Portfolio Margin Account

TIP

The Portfolio Margin Account is no longer maintained, please refer to the new version of the [Unified Account](#unified-account)

Since version `4.25.0`, we start supporting portfolio margin account. Gate.io's Portfolio Margin Account is a new feature of Gate.io's trading system. Its main function is to break the capital isolation between cross-margin leverage account and USD cross-margin perpetual contract account inside a Classic Account and achieve the multi-currency margin sharing among multi-product lines. Thanks to the margin sharing, users don't need to transfer funds between the two accounts, and the profit and loss of positions among different trading products can offset each other and effectively improve the capital utilization rate. See more details in the [Help Center](/help/trade/leveraged/26421/introductions-to-gate.io-s-portfolio-margin-account)

Before using the portfolio margin account's API key, you should create the API key on the API management page. The API key supports spot and perpetual contracts trading only.

> If permissions of the API key can't be checked, ensure your cross-margin account has available balance first.

### [#](#transfer) Transfer

The classic account and portfolio margin account are two different capital isolation accounts. If you want to achieve multi-currency margin sharing among multi-product lines, use the portfolio margin account please.

The funds of the portfolio margin account come from the classic account. Due to the change of funds in the classic account, the transfer of funds can only be performed using the API Key of the classic account.

The portfolio margin account is upgraded based on the cross-margin account of the original classic account, so the classic account only needs to transfer its spot funds to the cross-margin account to deposit the portfolio margin account. Similarly, withdrawals from portfolio margin account can be achieved by the classic account performing transferals from the cross margin to its spot account.

The API Key of the portfolio margin account can only perform transferals among its own multiple accounts. Due to the sharing of margin, the portfolio margin account does not need to transfer funds to its futures account (we also restrict doing so). If the futures account has PNL funds that need to be withdrawn, it must be transferred by the portfolio margin account's API key to its cross-margin account first, so that the classic account can perform withdrawals from portfolio margin account.

### [#](#spot-trading) Spot trading

The spot trading of the portfolio margin account is almost the same as the classic account, except that `cross_margin` must be specified in the `account` parameter when placing orders. For example, if you want to place a buy order for the `BTC_USDT` currency pair, the order request will be similar to

```text
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "cross_margin",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint directly.

TIP

It should be noted that the portfolio margin account is upgraded from the classic account's cross-margin account. The API Key of the classic account originally supports the operation of the cross-margin account. In order not to affect the existing operations of the classic account, we still retain this function of the classic account. So whether it is the API Key of the classic account or the portfolio margin account, both can operate the same the cross margin account (note that the futures accounts are separate)

### [#](#futures-trading) Futures trading

The API operation of the perpetual contract of the portfolio margin account is exactly the same as that of the classic account, but currently only supports USD settlement

TIP

In the futures trading, it should be noted that there is no compatibility for cross-margin accounts like using the API Key of the classic account in spot trading. Therefore, when using the API Key of the classic account for futures trading, assets are kept under `classic account-futures`, and when using portfolio margin account API Key for futures trading, assets are kept under `portfolio margin account-futures`. These two are different futures accounts. In addition, funds under `classic account-spot` cannot share margin with `classic account-futures`.

## [#](#trace-id) Trace ID

The API response will carry the header: X-Gate-Trace-ID . This header is used for tracking.

## [#](#self-trade-prevention-stp) Self-Trade Prevention (STP)

### [#](#concepts) Concepts

**Self-Trade Prevention**: STP will prevent any user's orders from being matched with each other.

**CN**: Cancel new, Cancel new orders and keep old ones.

**CO**: Cancel old, Cancel old orders and keep new ones.

**CB**: Cancel both, Both old and new orders will be cancelled.

### [#](#stp-strategies) STP Strategies

We support three STP strategies, which are `CN` , `CO` and `CB`.

STP is achieved by adding users to one STP trading group. When a user in a STP group place orders, and trading could happen with existing orders of users in the same group, orders will be cancelled. The prevention strategy depends on the `stp_act` parameter specified when placing the order as taker. If not specified, the `CN` strategy will be used by default.

A user has to be added to a STP trading group before using STP. When a user does not belong to any STP trading group, and place orders with the `stp_act` parameter, the orders will be rejected.

### [#](#api-parameter-adjustment) API Parameter Adjustment

Take placing futures order as an example:

```text
POST /futures/{settle}/orders
```

New request body parameter:

| Name | Position | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stp_act | body | string | No | STP Strategies, including:- cn- co- cb |

New response fields:

| Name | Type | Required | Restriction | Description |
| --- | --- | --- | --- | --- |
| stp_act | string | No | none | STP Strategies, including：- cn- co- cb |
| stp_id | integer(int64) | No | readonly | The ID of the STP trading group to which user belongs. |
| finish_as | string | No | readonly | order finish type:- stp: The order has been canceled due to the STP |

### [#](#user-case) User case

There are multiple accounts under `Organization A`, and the IDs of several accounts are `101`, `102`, and `103`

In order to prevent self-trading of orders placed by internal accounts of the organization, the administrator created a STP trading group with group ID `100`, and added accounts `101` and `102` to the STP trading group. In this case, the members in the group are `[101,102]`.

T1: The `STP` strategy version released.

T2: After the `organization A` account `101` places a short order, there is no matching order in the market order book to match the transaction. At this time, the role of the order is `maker`, and the order status is `open`. The key response fields returned are:

```text
{
	"status":"open",
	"stp_act":"cn",
	"stp_id":100
}
```

T3: `Organization A` account `101`/`102` places a long order, and it can reach a trade with account 101’s short order. The match engine finds both two orders' stp\_id are 100, so it applies the STP strategy of the taker order, which defaults to `cn` , and cancels the long order. Order's `finish_as` will be set to `stp`. The key response fields returned are:

```text
{
	"status":"finished",
	"stp_act":"cn",
	"stp_id":100,
	"finish_as":"stp"
}
```

*   If `stp_act` is `co` , the order placed by `taker` will be retained, the order status will be `open`, and the system will cancel the order of `maker`.
    
*   If `stp_act` is `cb`, both the long and short orders will be cancelled. Orders' `finish_as` will be set to `stp`. The key response fields returned are:
    

```text
{
	"status":"finished",
	"stp_act":"cb",
	"stp_id":100,
	"finish_as":"stp"
}
```

T3': If account 103 places a long order, and it can reach a trade with account 101’s short order, the transaction will be made since account 103 has not been added to account 101’s STP group. The key response fields returned are:

```text
{
	"status":"finished",
	"stp_id":0,
	"finish_as":"filled"
}
```

## [#](#unified-account) Unified Account

### [#](#description) Description

Once a user upgrades their account to the unified account, they can utilize the assets from their spot account as collateral for trading. The assets in the account, denominated in various currencies, will be adjusted based on their liquidity and converted to USD for consistent calculation of the account's assets and position value.

The maximum borrowing limit for margin trading represents the maximum amount that a user can borrow for a given trading market. The platform calculates the user's maximum borrowing limit based on factors such as available margin and platform risk control rules. Once the margin trading generates automatic borrowing, the platform immediately starts accruing interest on the borrowed digital assets.

Currently, the ability to switch to `cross_margin` or`usdt_futures` mode is available. In the future, we will gradually introduce support for various combination margin accounts, including `Futures`, `Delivery`, `Options` and more. Stay tuned for further updates.

Please refer to the documentation for unified API. Once you have upgraded your account, you will be able to make use of these endpoints.

Related endpoint can be found in the Unified Account API doc. After enabling the Unified Account, you can proceed to call them. For more detailed information, please refer to [here](https://www.gate.io/unified-trading-account)

### [#](#api-integration-process) API Integration Process

*   Create a new `API KEY` or update the permissions of an existing `API KEY`, checking the `unified` permission
*   Use the classic account's `API KEY` to call the `POST /api/v4/unified/account_mode` endpoint, or upgrade from the WEB page to the Unified Account
*   Use the `/api/v4/spot/**` API for spot-related operations (ordering, modifying orders, querying orders), with the `account=unified` option
*   Use the `/api/v4/futures/**` API for perpetual futures-related operations (ordering, modifying orders, querying orders)
*   Use the `/api/v4/unified/**` API for Unified Account-related operations (account querying, loan querying)

### [#](#spot-trading-2) SPOT Trading

The spot trading in the Unified Account is consistent with that in the classical account. In order operations, specify `account=unified`, or specify `account=spot` and the system will automatically handle the order as a unified account order when detecting the account as a unified account. For example, to place a buy order for the `BTC_USDT` currency pair, the order creation request would be similar to

```text
POST /spot/orders

{
  "currency_pair": "BTC_USDT",
  "account": "unified",
  "side": "buy",
  ...
}
```

For other related restrictions, please refer to the document of the API endpoint directly.

### [#](#formula) Formula

| Name | Cross Margin |
| --- | --- |
| portfolio_margin_total_equity | Account Equity = ∑(Equity * Index Price） |
| total_margin_balance | Account Margin Balance = ∑(Positive Equity x Index Price x Adjustment Factor) + ∑(Negative Equity x Index Price) - Haircut Loss |
| total_initial_margin_rate | Account Initial Margin Level = Account Margin Balance / Account Initial Margin |
| total_maintenance_margin_rate | Account Maintenance Margin Level = Account Margin Balance / Account Maintenance Margin |
| total_initial_margin | Account Initial Margin = Total Liabilities x Spot Initial Margin Rate |
| total_maintenance_margin | Account Maintenance Margin = Total Liabilities x Spot Maintenance Margin Rate |
| equity | Equity = Coin Balance - Borrowed |
| available | Available Balance = Principal + Borrowed |
| freeze | Occupied = Assets Occupied by Spot Open Orders |

## [#](#accountbook-type) AccountBook type

### [#](#general-2) General

*   unknown: Unknown
*   login: Log In
*   withdraw: Withdrawals
*   ch\_pass: Change Password
*   ch\_fund\_pass: Change Fund Pass
*   login\_failed: Login Failed
*   axs\_account: Access Account
*   req\_pass\_ch: Request Password Change
*   req\_fund\_pass\_ch: Request Fund Pass Change
*   fund\_pass\_ent: Fund Pass Entered
*   bank\_card\_add: Bank Card Added
*   frw: Face Recognition For Withdrawal

### [#](#order) Order

*   new\_order: Order Placed
*   cancel\_order: Order Cancelled
*   order\_fill: Order Filled
*   order\_rej: Order Rejected
*   order\_fee: Trading Fees
*   system\_fee: Trading Fee System Account

### [#](#withdraw-deposit) Withdraw-Deposit

*   withdraw: Withdrawals
*   deposit: Deposits
*   deposit\_rej: Deposit Rejected
*   withdraw\_rej: Withdrawal Rejected
*   cancel\_withdraw: Cancel Withdrawal
*   withdraw\_gatecode: GateCode Withdrawals
*   withdraw\_fireblock: Fireblocks Withdrawals
*   withdraw\_copper: Copper Withdrawals
*   startup\_withdraw: Token Withdrawal From Startup
*   deposit\_gatecode: GateCode Deposits
*   deposit\_fireblock: Fireblocks Deposits
*   deposit\_copper: Copper Deposits
*   buy\_cl: Buy Crypto Legend
*   buy\_cc: Buy Crypto Cabital
*   deposit\_finmo: Gate connect Finmo Deposit

### [#](#startup) Startup

*   startup\_prtcp: Startup Sale Participation
*   startup\_refund: Startup Sale Refund
*   startup\_sale: Startup Sale
*   startup\_sale\_rb: Startup Sale Rolled Back

### [#](#rebate) Rebate

*   referral\_rebate: Referral Superior Rebate
*   sec\_rebate\_out: Secondary Rebate Financial Account Transfer Out
*   sec\_rebate\_in: Affiliate Indirect Superior Rebate Income
*   ab\_rebate: API Broker Rebate Income
*   eb\_rebate: Exchange Broker Rebate Income
*   u\_rebate: Referral Rebate Income
*   ads\_rebate: Affiliate Direct Superior Rebate Income
*   au\_rebate: Affiliate User Rebate Income
*   pis\_rebate: Partner Indirect Superior Rebate Income
*   pds\_rebate: Partner Direct Superior Rebate Income
*   pu\_rebate: Partner User Rebate Income

### [#](#convert) Convert

*   eth\_swap: ETH Swap
*   dust\_swap\_dctd: Dust Swap-Small Balances Deducted
*   dust\_swap\_gt\_add: Dust Swap-GT Added
*   dust\_swap\_fee: Dust Swap-Fees Deducted
*   cv\_buy: Quick Buy-Bought
*   cv\_sell: Quick Sell-Sold

### [#](#c2c) C2C

*   c2c\_mop: C2C Merchant Order Placed
*   c2c\_moc: C2C Merchant Order Canceled
*   c2c\_rop: C2C Retail Order Placed
*   c2c\_roc: C2C Retail Order Canceled
*   c2c\_om: C2C Order Matched
*   c2c\_or: C2C Order Rejected
*   c2c\_fee: C2C Fees

### [#](#reward) Reward

*   deposit\_bonus: Deposit Bonus
*   trading\_rewards: Trading Rewards
*   purchase\_bonus: Purchase Bonus
*   airdrop: Airdrop
*   award: Award
*   mining\_rewards: Mining Rewards

### [#](#account-transfer-in-out) Account Transfer In-Out

*   margin\_in: Isolated Margin-Transferred In
*   margin\_out: Isolated Margin- Transferred Out
*   spot\_settle\_out: Spot Settlement Transfer Out
*   spot\_settle\_in: Spot Settlement Transfer Out
*   lending\_in: Lending-Transferred In
*   lending\_out: Lending-Transferred Out
*   cross\_in: PortfolioMarginAccountTransferIn
*   cross\_out: PortfolioMarginAccountTransferOut
*   perp\_in: Perps- Transferred In
*   perp\_out: Perps- Transferred Out
*   perp\_settle\_in: Perpetual Multi-currency Settlement Transfer In
*   perp\_settle\_out: Perpetual Multi-currency Settlement Transfer Out
*   delivery\_in: Delivery- Transferred In
*   delivery\_out: Delivery- Transferred Out
*   ai\_in: Auto-Invest-Transferred In
*   ai\_out: Auto-Invest-Transferred Out
*   e\_options\_in: Easy Options- Transferred In
*   e\_options\_out: Easy Options- Transferred Out
*   options\_in: Options- Transferred In
*   options\_out: Options- Transferred Out
*   cbbc\_in: CBBC- Transferred In
*   cbbc\_out: CBBC- Transferred Out
*   warrant\_in: Warrant- Transferred In
*   warrant\_out: Warrant- Transferred Out
*   subaccount\_trf: Subaccount Transfer
*   quant\_in: Quant- Transferred In
*   quant\_out: Quant- Transferred Out
*   pay\_in: Payment Account- Transferred In
*   pay\_out: Payment Account- Transferred Out
*   fct\_in: Futures Copy Trading - Funds Transfer In
*   fct\_out: Futures Copy Trading - Funds Transfer Out

### [#](#points) Points

*   points\_purchase: Points Purchase
*   points\_expiration: Points With Expiration
*   points\_trf: Points Transfer
*   points\_trf\_rej: Points Transfer Rejected

### [#](#finance) Finance

*   lending\_lent: Lending-Lent
*   collected: Collected
*   interest\_in: Interest Income
*   lending\_fee: Lending-Fees Deducted
*   hodl\_int: HODL Interest
*   redeem: Redeem
*   lend: Lend
*   dual\_purchased: Dual C-Purchased
*   dual\_settled: Dual C-Settled
*   liq\_add: Liquidity Added
*   liq\_rm: Liquidity Removed
*   liq\_rebalanced: Liquidity Rebalanced
*   slot\_int\_in: Slot Auction Staking Interest Income
*   str\_int\_in: Structured Products Staking Interest Income

### [#](#loan) Loan

*   borrow: Borrow
*   repay: Repay
*   margin\_borrow: Isolated Margin-Transferred In
*   margin\_repay: Isolated Margin- Transferred Out
*   margin\_interest\_out: Isolated Margin-Interest Deduction
*   cl\_borrow: Cryptoloan- Borrowed
*   cl\_repay: Cryptoloan- Repaid
*   cl\_dctd: Cryptoloan- Collateral Deducted
*   cl\_rtd: Cryptoloan- Collateral Returned
*   cross\_borrow: PortfolioMarginAccountBorrowIn
*   cross\_repay: PortfolioMarginAccountRepay
*   interest\_out: Interest

### [#](#moments) Moments

*   donation: Donation
*   rp\_sent: Red Packet Sent
*   rp\_rcvd: Red Packet Received
*   rp\_rej: Red Packet Rejected
*   ls\_offered: Live Stream-Reward Offered
*   ls\_rcvd: Live Stream- Reward Received
*   pt\_offered: Posts- Reward Offered
*   pt\_rcvd: Posts- Reward Received
*   subs\_deduct: Subscription-Fees Deducted
*   subs\_in: Subscription-Fees Received
*   subs\_refund: Subscription- Refund
*   subs\_in\_rcvd: Subscription- Refunds Received

### [#](#push-trading) PUSH Trading

*   push\_dctd: Push- Deduction
*   push\_rcvd\_dctd: Push- Received-Deducted
*   push\_canceled: Push Canceled
*   push\_rej: Push Rejected
*   push\_sent: Push Sent
*   push\_rcvd: Push Received

### [#](#copy-trading) Copy Trading

*   quant\_return: Quant- Transaction Returned
*   quant\_cmn\_in: Quant-Commission Transferred In
*   quant\_cmn\_out: Quant-Commission Transferred Out
*   quant\_cmn\_rtd: Quant-Commission Returned
*   fct\_refund: Futures Copy Trading - Funds Auto Transfer Out
*   fct\_rcvd: Futures Lead Trading - Performance Fee Received
*   fct\_fee: Futures Copy Trading - Performance Fee Paid
*   fct\_fee\_refund: Futures Copy Trading - Performance Fee Refund

### [#](#nft) NFT

*   nft\_mp: NFT Auction-Margin Paid
*   nft\_bm: NFT Auction-Bid Made
*   nft\_om: NFT Auction-Offer Made
*   ntf\_mr: NFT Auction-Margin Returned
*   nft\_amr: NFT Auction-Aborted-Margin rcvd
*   nft\_ocb: NFT Auction-Order Canceled-Back
*   nft\_fb: Fixed Price-Bought
*   nft\_fs: Fixed Price-For Sale
*   nft\_ob: NFT Make-Offer Bought
*   nft\_os: NFT Make-Offer Sale
*   nft\_cr: Cancel offer refund
*   nft\_ir: Refund for invalid offer
*   nft\_wf: Withdrawal service fee
*   nft\_wfr: Withdrawal service fee
*   ntf\_mf: Multi-copy creation service fee
*   ntf\_mfr: Multi-copy creation service fee refund
*   ntf\_royalty: Royalties
*   nft\_cd: NFT Auction-Order Canceled-Deducted
*   nft\_crd: NFT Auction-Order Canceled-Rotalty-Deducted
*   nft\_cf: crowdfunding
*   nft\_cfr: crowdfunding refund
*   nft\_ammf: Nft-Amm Frozen
*   nft\_ammw: Nft-Amm Withdraw
*   nft\_ammdf: Nft-Amm Deal Fee
*   nft\_ammd: Nft-Amm Deal

## [#](#error-handling) Error Handling

For all abnormal requests, APIv4 will return non-2xx status code, with a response body in JSON format to explain the error.

The error response body follows a format like:

```json
{
  "label": "INVALID_PARAM_VALUE",
  "message": "Invalid parameter `text` with value: abc"
}
```

*   `label`: denotes error type in `string` format. Its value are chosen from a certain list(see below). Programs can use `label` to identify and catch a specific error.
*   `message`(or `detail`): detailed error message. A longer explanation showing why the error is generated or how to avoid it. Its purpose is helping to better understand the API. Error handling mechanism with this field is highly **NOT** recommended.

Take Python [requests (opens new window)](https://requests.readthedocs.io/en/latest/) for example, error handling can be written like:

> Following examples only deal with business-related errors. Network timeout or other common errors need to be handled separately:

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

or with [Python SDK (opens new window)](https://github.com/gateio/gateapi-python):

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

*   Request parameter or format related

| label | Meaning |
| --- | --- |
| INVALID_PARAM_VALUE | Invalid parameter value |
| INVALID_PROTOCOL | Invalid parameter value |
| INVALID_ARGUMENT | Invalid argument |
| INVALID_REQUEST_BODY | Invalid request body |
| MISSING_REQUIRED_PARAM | Missing required parameter |
| BAD_REQUEST | Invalid request |
| INVALID_CONTENT_TYPE | Invalid Content-Type header |
| NOT_ACCEPTABLE | Invalid Accept- Header |
| METHOD_NOT_ALLOWED | Request method is not allowed |
| NOT_FOUND | Request URL not exists |

*   Authentication related

| label | Meaning |
| --- | --- |
| INVALID_CREDENTIALS | Invalid credentials provided |
| INVALID_KEY | Invalid API Key |
| IP_FORBIDDEN | Request IP not in whitelist |
| READ_ONLY | API key is read-only |
| INVALID_SIGNATURE | Invalid signature |
| MISSING_REQUIRED_HEADER | Missing required authentication header |
| REQUEST_EXPIRED | Request Timestamp is far from the server time |
| ACCOUNT_LOCKED | Account is locked |
| FORBIDDEN | Account has no permission to request operation |

*   Wallet related

| label | Meaning |
| --- | --- |
| SUB_ACCOUNT_NOT_FOUND | Sub account not found |
| SUB_ACCOUNT_LOCKED | Sub account is locked |
| MARGIN_BALANCE_EXCEPTION | Abnormal margin account |
| MARGIN_TRANSFER_FAILED | Failed to transfer with margin account |
| TOO_MUCH_FUTURES_AVAILABLE | Futures balance exceeds max allowed |
| FUTURES_BALANCE_NOT_ENOUGH | Futures balance not enough |
| ACCOUNT_EXCEPTION | Abnormal account |
| SUB_ACCOUNT_TRANSFER_FAILED | Failed to transfer with sub account |
| ADDRESS_NOT_USED | Address never being used in web console |
| TOO_FAST | Withdrawing request exceeds frequency limit |
| WITHDRAWAL_OVER_LIMIT | Withdrawal limit exceeded |
| API_WITHDRAW_DISABLED | API withdrawal operation is disabled temporarily |
| INVALID_WITHDRAW_ID | Invalid withdraw ID |
| INVALID_WITHDRAW_CANCEL_STATUS | Cancelling withdrawal not allowed with current status |
| DUPLICATE_REQUEST | Duplicate request |
| ORDER_EXISTS | Order already exists, do not resubmit |
| INVALID_CLIENT_ORDER_ID | The client_order_id is invalid |

*   Spot and margin trading related

| label | Meaning |
| --- | --- |
| INVALID_PRECISION | Invalid precision |
| INVALID_CURRENCY | Invalid currency |
| INVALID_CURRENCY_PAIR | Invalid currency pair |
| POC_FILL_IMMEDIATELY | Order would match and take immediately so it's cancelled |
| ORDER_NOT_FOUND | Order not found |
| ORDER_CLOSED | Order already closed |
| ORDER_CANCELLED | Order already cancelled |
| QUANTITY_NOT_ENOUGH | Amount is not enough |
| BALANCE_NOT_ENOUGH | Balance is not enough |
| MARGIN_NOT_SUPPORTED | Request currency pair doesn't provide margin trading |
| MARGIN_BALANCE_NOT_ENOUGH | Margin balance is not enough |
| AMOUNT_TOO_LITTLE | Amount does not reach minimum required |
| AMOUNT_TOO_MUCH | Amount exceeds maximum allowed |
| REPEATED_CREATION | Repeated creation |
| LOAN_NOT_FOUND | Margin loan is not found |
| LOAN_RECORD_NOT_FOUND | Margin loan record is not found |
| NO_MATCHED_LOAN | No loan can match request borrow requirement |
| NOT_MERGEABLE | Request loans cannot be merged |
| NO_CHANGE | No change is made |
| REPAY_TOO_MUCH | Repay more than required |
| TOO_MANY_CURRENCY_PAIRS | Too many currency pairs in batch orders creation |
| TOO_MANY_ORDERS | Too many orders in one currency pair in batch orders creation |
| MIXED_ACCOUNT_TYPE | More than one account type is used in batch orders creation |
| AUTO_BORROW_TOO_MUCH | Auto borrow exceeds maximum allowed |
| TRADE_RESTRICTED | Trading is restricted due to high debt ratio |
| FOK_NOT_FILL | FOK order cannot be filled completely |
| INITIAL_MARGIN_TOO_LOW | User's total initial margin rate is too low |
| NO_MERGEABLE_ORDERS | Orders can be merged not found |
| ORDER_BOOK_NOT_FOUND | Insufficient liquidity |
| FAILED_RETRIEVE_ASSETS | Failed to retrieve account assets |
| CANCEL_FAIL | Order cancel failed |

*   Futures related

| label | Meaning |
| --- | --- |
| USER_NOT_FOUND | User has no futures account |
| CONTRACT_NO_COUNTER | No counter order found |
| CONTRACT_NOT_FOUND | Contract not found |
| RISK_LIMIT_EXCEEDED | Risk limit exceeded |
| INSUFFICIENT_AVAILABLE | Balance is not enough |
| LIQUIDATE_IMMEDIATELY | Operation may cause liquidation |
| LEVERAGE_TOO_HIGH | leverage too high |
| LEVERAGE_TOO_LOW | leverage too low |
| ORDER_NOT_FOUND | Order not found |
| ORDER_NOT_OWNED | Order not owned |
| ORDER_FINISHED | Order already finished |
| TOO_MANY_ORDERS | Too many open orders |
| POSITION_CROSS_MARGIN | margin updating is not allowed in cross margin |
| POSITION_IN_LIQUIDATION | Position is being liquidated |
| POSITION_IN_CLOSE | Position is closing |
| POSITION_EMPTY | Position is empty |
| REMOVE_TOO_MUCH | Changed margin exceeds allowed |
| RISK_LIMIT_NOT_MULTIPLE | Risk limit is not a multiple of step |
| RISK_LIMIT_TOO_HIGH | Risk limit too high |
| RISK_LIMIT_TOO_lOW | Risk limit too low |
| PRICE_TOO_DEVIATED | Order price deviates too much from mark price |
| SIZE_TOO_LARGE | Order size exceeds maximum |
| SIZE_TOO_SMALL | Order size does not reach minimum |
| PRICE_OVER_LIQUIDATION | Price to increase position can not exceeds liquidation price |
| PRICE_OVER_BANKRUPT | Price to decrease position cannot exceeds bankrupting price |
| ORDER_POC_IMMEDIATE | POC order will be finished immediately |
| INCREASE_POSITION | POC order will increase position |
| CONTRACT_IN_DELISTING | Contract is delisting, only reduce-only order or close order is allowed |
| POSITION_NOT_FOUND | Position not found |
| POSITION_DUAL_MODE | Operation forbidden in dual-mode |
| ORDER_PENDING | Operation forbidden with pending orders |
| POSITION_HOLDING | Operation forbidden with holding position |
| REDUCE_EXCEEDED | Reduce order would exceed position in dual-mode |
| NO_CHANGE | No change is made |
| AMEND_WITH_STOP | Amend forbidden with stop order |
| ORDER_FOK | Killed for FOK |

*   Collateral Loan related

| label | Meaning |
| --- | --- |
| COL_NOT_ENOUGH | Collateral balance not enough |
| COL_TOO_MUCH | Exceed collateral currency quota |
| INIT_LTV_TOO_HIGH | Init ltv too high |
| REDEEMED_LTV_TOO_HIGH | Ltv too high after redeem |
| BORROWABLE_NOT_ENOUGH | Left borrowable not enough |
| ORDER_TOO_MANY_TOTAL | Exceed platform order count one day |
| ORDER_TOO_MANY_DAILY | Exceed single user order count one day |
| ORDER_TOO_MANY_USER | Exceed single user order count total |
| ORDER_NOT_EXIST | Order id not exist |
| ORDER_FINISHED | Order id finished |
| ORDER_NO_PAY | Order unpaid amount is zero |
| ORDER_EXIST | Order exist |
| ORDER_HISTORY_EXIST | Order history exist |
| ORDER_REPAYING | Order is repaying |
| ORDER_LIQUIDATING | Order is liquidating |
| BORROW_TOO_LITTLE | Less than currency min borrow amount |
| BORROW_TOO_LARGE | Greater than total max borrow amount quantity |
| REPAY_AMOUNT_INVALID | Repay request amount invalid |
| REPAY_GREATER_THAN_AVAILABLE | Repay greater than available |
| POOL_BALANCE_NOT_ENOUGH | Pool balance not enough |
| CURRENCY_SETTLING | Currency settlement in progress |
| RISK_REJECT | Risk reject, please try again later |
| LOAN_FAILED | Loan failed, you can borrow again |

*   Portfolio related

| label | Meaning |
| --- | --- |
| USER_LIAB | User has liab |
| USER_PENDING_ORDERS | User has pending orders |
| MODE_SET | already set portfolio_margin mode |

*   Earn related

| label | 含义 |
| --- | --- |
| ERR_BALANCE_NOT_ENOUGH | balance not enough |
| ERR_PRODUCT_SELL_OUT | Target quota reached |
| ERR_PRODUCT_BUY | The project is not yet open for purchase |
| ERR_CREATE_ORDER | Put order fail |
| ERR_QUOTA_LOWER_LIMIT | Not meeting the minimum order amount |
| ERR_QUOTA_SUPERIOR_LIMIT | The maximum order limit has been reached |
| ERR_ORDER_NUMBER_LIMIT | The maximum order quantity has been reached |
| ERR_PRODUCT_CLOSE | Project closed |
| COPIES_NOT_ENOUGH | Not enough shares available to subscribe |
| COPIES_TOO_SMALL | Investment share is too small |
| COPIES_TOO_BIG | The number of investment shares exceeds the upper limit |
| TOTAL_AMOUNT_24 | The total amount of pledge and redemption within 24 hours exceeds the limit |
| TOTAL_BUYCOUNT_24 | Pledge and redemption times exceeding the limit within 24 hours |
| REDEEM_24_LIMIT | Redemption are allowed 24 hours after the last staking |

*   Server errors

| label | Meaning |
| --- | --- |
| INTERNAL | Internal server error |
| SERVER_ERROR | Internal server error |
| TOO_BUSY | Server is too busy at the moment |

# [#](#authentication) Authentication

## [#](#generate-api-key) Generate API key

Before calling the private API interface, the API key of the account needs to be generated to verify the identity. You can log in on the website and generate it in \[account management\] - > \[APIv4 keys\], or click [here](/myaccount/apiv4keys) to generate API keys.

Each account can create 20 API keys, and the permission configuration of each key is independent of each other. It is recommended to set a note name for each key to indicate its purpose.

**`Key`** Access Key **`Secret Key`** The key used for signature authentication encryption

Besides, you can attach an IP whitelist, which requires the server only accept requests from specified IPs. Each key can have at most 20 IPs formatted in IPv4(not supporting IP range though). If IP whitelist is not set, the server will skip client IP validation.

Each user can create at most 5 keys with separate permissions. It is recommended to set a name for key denoting how the key will be used.

TIP

Note: If the key is named with `spot` or `futures`, then it could be the default name after APIv4 migration. For details refer to _About APIv4 key improvement_ section

Created key can also be updated or deleted, but any modification(s) can take up to 5 minutes to take effect.

Please note that futures TestNet trading is a separate environment from futures real trading. Real trading API keys cannot be used in TestNet. If you want to test futures API with TestNet, you need to log into the console to generate TestNet API keys(in _"Futures TestNet APIKeys"_ tab on _" APIv4Keys"_ page). Making futures requests are identical between real and TestNet trading, with the only exceptions are different base URLs and different API keys.

## [#](#apiv4-permissions) APIv4 Permissions

When creating a Key, you can configure whether to enable spot, margin, contract, wallet, or withdrawal permissions for the Key, and whether to enable read-write or read-only permissions.

| Products | Permissions |
| --- | --- |
| spot/margin | Read-only query orders Read-write query orders & place orders |
| perpetual contract | Read-only query orders Read-write query orders & place orders |
| delivery contract | Read-only query orders Read-write query orders & place orders |
| wallet | Read-only Query for withdrawal transfer records Read-write Query for account records & fund transfers |
| withdrawal | Read-only Query cash withdrawal records Read-write Query cash withdrawal records & withdrawals |

All `GET` operations are read requests, while others are write requests. Each permission group can be set to disabled, read-only or read-write.

Please note that even though withdrawal API has only one operation(i.e. `POST /withdrawals`), for general concern, it is still separated from wallet API into a standalone permission group, while withdrawal history retrieving API stays inside wallet operations( i.e., `GET /wallet/withdrawals`).

## [#](#apiv4-signed-request-requirements) APIv4 signed request requirements

1.  Generate APIv4 Key pairs in web console, and make sure it has the right permissions.
2.  Set request header `KEY` to the key.
3.  Set request header `Timestamp` to current time formatted in Unix time in seconds. Pay attention that the gap between its value and current time cannot exceed 60 seconds.
4.  Set request header `SIGN` to encrypted request signature. Refer to next section for how signature string is generated. Signature generation method is `HexEncode(HMAC_SHA512(secret, signature_string))`, i.e., the hexadecimal digest output of HMAC-SHA512 with APIv4 secret as secret and signature string as message,
5.  Make sure request client's IP is in your APIv4 Key's IP whitelist.

## [#](#api-signature-string-generation) API Signature string generation

In APIv4, signature string is concatenated as the following way:

`Request Method + "\n" + Request URL + "\n" + Query String + "\n" + HexEncode(SHA512(Request Payload)) + "\n" + Timestamp`

### [#](#request-method) Request Method

Request method in UPPERCASE, e.g. `POST`, `GET`

### [#](#request-url) Request URL

Request url. Protocol, host and port are not included, e.g. `/api/v4/futures/orders`

### [#](#query-string) Query String

Request query string without URL encode. query parameters order should be the same as how they are concatenated in the request URL, e.g. `status=finished&limit=50`. Use empty string("") if no query parameters.

### [#](#hexencode-sha512-request-payload) HexEncode(SHA512(Request Payload))

Hash the request body with SHA512 and output its Hex encoded form. If no request body, use empty string's hashed result, i.e. `cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e`

### [#](#timestamp) Timestamp

`Timestamp` request header value.

# [#](#faq) FAQ

*   How to retrieve `POST /wallet/transfers` history?
    
    Records of transfers generated through `POST /wallet/transfers` has multiple methods to be retrieved based on account, including:
    
    *   `GET /margin/account_book` to retrieve transferals from or to margin account.
    *   `GET /futures/{settle}/account_book?type=dnw` to retrieve perpetual contract account history
    *   `GET /delivery/{settle}/account_book?type=dnw` to retrieve delivery contract account history
*   How to create margin orders?
    
    Margin order creation has been merged into spot order APIs. In `POST /spot/orders` or `POST /spot/batch_orders`, set `account` to `margin` to create margin orders.
    
*   Futures operation returns error `USER_NOT_FOUND`
    
    Futures account is not initialized yet. Making a deposit to your futures account will help. Note that each settle currency is associated with an independent futures account.
    
*   Futures operation returns error `CONTRACT_NOT_FOUND`
    
    Every settle currency has its own contract list. Make sure the contract you specified is supported by the settle currency. You can query the list with
    
    `GET /futures/{settle}/contracts` or `GET /delivery/{settle}/contracts`
    
*   Difference between sub account and main account
    
    *   Sub account API Key cannot operate transferals between main and sub account, i.e., `POST /wallet/sub_account_transfers`
    *   Sub account API Key cannot operate withdrawal, i.e., `POST /withdrawals`
    *   If sub account does not have some business permission, even if its API key has the permission, the operations will be rejected too.
*   I have other question(s) not covered above
    
    Contact support for the issue. If the problem is related to one of the SDKs, you can also open an issue in the corresponding GitHub repository.
    
    When submitting an issue, please include the following information to help identify the problem:
    
    *   User ID
        *   Original request URL, request parameters and request body
        *   What API key was used and where was it used, TestNet or real trading(API secret is not needed)
        *   Programming language. Providing a code snippet will be better
        *   Whether SDK was used. If so, which method caused the problem

# [#](#withdrawal) Withdrawal

Withdrawal operations

## [#](#withdraw) Withdraw

`POST /withdrawals`

_Withdraw_

Withdrawals to Gate addresses do not incur transaction fees.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » withdraw_order_id | body | string | false | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| » amount | body | string | true | Currency amount |
| » currency | body | string | true | Currency name |
| » address | body | string | false | Withdrawal address. Required for withdrawals |
| » memo | body | string | false | Additional remarks with regards to the withdrawal |
| » chain | body | string | true | Name of the chain used in withdrawals |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Withdraw request is accepted. Refer to withdrawal records for status | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Record ID |
| » txid | string | Hash record of the withdrawal |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| » timestamp | string | Operation time |
| » amount | string | Currency amount |
| » currency | string | Currency name |
| » address | string | Withdrawal address. Required for withdrawals |
| » memo | string | Additional remarks with regards to the withdrawal |
| » status | string | Record status.- DONE: done- CANCEL: cancelled- REQUEST: requesting- MANUAL: pending manual approval- BCODE: GateCode operation- EXTPEND: pending confirm after sending- FAIL: pending confirm when fail- INVALID: invalid order- VERIFY: verifying- PROCES: processing- PEND: pending- DMOVE: required manual approval |
| » chain | string | Name of the chain used in withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#uid-transfer) UID transfer

`POST /withdrawals/push`

_UID transfer_

Transfers between main spot accounts are allowed; however, both parties cannot be sub-accounts

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » receive_uid | body | integer(int64) | true | Recipient UID |
| » currency | body | string | true | Currency name |
| » amount | body | string | true | Transfer amount |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | The request has been accepted. Check the withdrawal record status for the processing result. | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-withdrawal-with-specified-id) Cancel withdrawal with specified ID

`DELETE /withdrawals/{withdrawal_id}`

_Cancel withdrawal with specified ID_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| withdrawal_id | path | string | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 202 | Accepted (opens new window) | Cancellation accepted. Refer to record status for the cancellation result | Inline |

### Response Schema

Status Code **202**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Record ID |
| » txid | string | Hash record of the withdrawal |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| » timestamp | string | Operation time |
| » amount | string | Currency amount |
| » currency | string | Currency name |
| » address | string | Withdrawal address. Required for withdrawals |
| » memo | string | Additional remarks with regards to the withdrawal |
| » status | string | Record status.- DONE: done- CANCEL: cancelled- REQUEST: requesting- MANUAL: pending manual approval- BCODE: GateCode operation- EXTPEND: pending confirm after sending- FAIL: pending confirm when fail- INVALID: invalid order- VERIFY: verifying- PROCES: processing- PEND: pending- DMOVE: required manual approval |
| » chain | string | Name of the chain used in withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#wallet) Wallet

Wallet

## [#](#list-chains-supported-for-specified-currency) List chains supported for specified currency

`GET /wallet/currency_chains`

_List chains supported for specified currency_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Currency name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » chain | string | Chain name |
| » name_cn | string | Chain name in Chinese |
| » name_en | string | Chain name in English |
| » contract_address | string | Smart contract address for the currency; if no address is available, it will be an empty string |
| » is_disabled | integer(int32) | If it is disabled. 0 means NOT being disabled |
| » is_deposit_disabled | integer(int32) | Is deposit disabled. 0 means not |
| » is_withdraw_disabled | integer(int32) | Is withdrawal disabled. 0 means not |
| » decimal | string | Withdrawal precision |

This operation does not require authentication

## [#](#generate-currency-deposit-address) Generate currency deposit address

`GET /wallet/deposit_address`

_Generate currency deposit address_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Currency name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Address successfully generated | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » address | string | Deposit address |
| » multichain_addresses | array | none |
| »» MultiChainAddressItem | object | none |
| »»» chain | string | Name of the chain |
| »»» address | string | Deposit address |
| »»» payment_id | string | Notes that some currencies required(e.g., Tag, Memo) when depositing |
| »»» payment_name | string | Note type, Tag or Memo |
| »»» obtain_failed | integer | The obtain failed status- 0: address successfully obtained- 1: failed to obtain address |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-withdrawal-records) Retrieve withdrawal records

`GET /wallet/withdrawals`

_Retrieve withdrawal records_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Filter by currency. Return all currency records if not specified |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Record ID |
| » txid | string | Hash record of the withdrawal |
| » block_number | string | 区块编号 |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| » timestamp | string | Operation time |
| » amount | string | Currency amount |
| » fee | string | fee |
| » currency | string | Currency name |
| » address | string | Withdrawal address. Required for withdrawals |
| » memo | string | Additional remarks with regards to the withdrawal |
| » status | string | Transaction status- DONE: Completed (block_number > 0 is considered to be truly completed)- CANCEL: Canceled- REQUEST: Requesting- MANUAL: Pending manual review- BCODE: Recharge code operation- EXTPEND: Sent awaiting confirmation- FAIL: Failure on the chain awaiting confirmation- INVALID: Invalid order- VERIFY: Verifying- PROCES: Processing- PEND: Processing- DMOVE: pending manual review |
| » chain | string | Name of the chain used in withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-deposit-records) Retrieve deposit records

`GET /wallet/deposits`

_Retrieve deposit records_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Filter by currency. Return all currency records if not specified |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | The maximum number of entries returned in the list is limited to 500 transactions. |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | string | Record ID |
| » txid | string | Hash record of the withdrawal |
| » withdraw_order_id | string | Client order id, up to 32 length and can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| » timestamp | string | Operation time |
| » amount | string | Currency amount |
| » currency | string | Currency name |
| » address | string | Withdrawal address. Required for withdrawals |
| » memo | string | Additional remarks with regards to the withdrawal |
| » status | string | Record status.- DONE: done- CANCEL: cancelled- REQUEST: requesting- MANUAL: pending manual approval- BCODE: GateCode operation- EXTPEND: pending confirm after sending- FAIL: pending confirm when fail- INVALID: invalid order- VERIFY: verifying- PROCES: processing- PEND: pending- DMOVE: required manual approval |
| » chain | string | Name of the chain used in withdrawals |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-trading-accounts) Transfer between trading accounts

`POST /wallet/transfers`

_Transfer between trading accounts_

Transfer between different accounts. Currently support transfers between the following:

1.  spot - margin
2.  spot - futures(perpetual)
3.  spot - delivery
4.  spot - options

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Transfer currency. For futures account, currency can be set to POINT or settle currency |
| » from | body | string | true | Account to transfer from |
| » to | body | string | true | Account to transfer to |
| » amount | body | string | true | Transfer amount |
| » currency_pair | body | string | false | Margin currency pair. Required if transfer from or to margin account |
| » settle | body | string | false | Futures settle currency. Required if transferring from or to futures account |

#### [#](#enumerated-values) Enumerated Values

| Parameter | Value |
| --- | --- |
| » from | spot |
| » from | margin |
| » from | futures |
| » from | delivery |
| » from | options |
| » to | spot |
| » to | margin |
| » to | futures |
| » to | delivery |
| » to | options |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Balance transferred | Inline |

### Response Schema

Status Code **200**

_TransactionID_

| Name | Type | Description |
| --- | --- | --- |
| » tx_id | integer(int64) | Order id |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-between-main-and-sub-accounts) Transfer between main and sub accounts

`POST /wallet/sub_account_transfers`

_Transfer between main and sub accounts_

Support transferring with sub user's spot or futures account. Note that only main user's spot account is used no matter which sub user's account is operated.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Transfer currency name |
| » sub_account | body | string | true | Sub account user ID |
| » direction | body | string | true | Transfer direction. to - transfer into sub account; from - transfer out from sub account |
| » amount | body | string | true | Transfer amount |
| » client_order_id | body | string | false | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '_', with a length ranging from 1 to 64 characters. |
| » sub_account_type | body | string | false | Target sub user's account. spot - spot account, futures - perpetual contract account, delivery - delivery account |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Balance transferred | Inline |

### Response Schema

Status Code **200**

_TransactionID_

| Name | Type | Description |
| --- | --- | --- |
| » tx_id | integer(int64) | Order id |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-transfer-records-between-main-and-sub-accounts) Retrieve transfer records between main and sub accounts

`GET /wallet/sub_account_transfers`

_Retrieve transfer records between main and sub accounts_

Record time range cannot exceed 30 days

> Note: only records after 2020-04-10 can be retrieved

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| sub_uid | query | string | false | User ID of sub-account, you can query multiple records separated by ,. If not specified, it will return the records of all sub accounts |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » currency | string | Transfer currency name |
| » sub_account | string | Sub account user ID |
| » direction | string | Transfer direction. to - transfer into sub account; from - transfer out from sub account |
| » amount | string | Transfer amount |
| » uid | string | Main account user ID |
| » client_order_id | string | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '_', with a length ranging from 1 to 64 characters. |
| » timest | string | Transfer timestamp |
| » source | string | Where the operation is initiated from |
| » sub_account_type | string | Target sub user's account. spot - spot account, futures - perpetual contract account, delivery - delivery account |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#sub-account-transfers-to-sub-account) Sub-account transfers to sub-account

`POST /wallet/sub_account_to_sub_account`

_Sub-account transfers to sub-account_

It is possible to perform balance transfers between two sub-accounts under the same main account. You can use either the API Key of the main account or the API Key of the sub-account to initiate the transfer.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Transfer currency name |
| » sub_account_type | body | string | false | Transfer from the account. (deprecate, use sub_account_from_type and sub_account_to_type instead) |
| » sub_account_from | body | string | true | Transfer from the user id of the sub-account |
| » sub_account_from_type | body | string | true | The sub-account's outgoing trading account, spot - spot account, futures - perpetual contract account, delivery - delivery contract account. |
| » sub_account_to | body | string | true | Transfer to the user id of the sub-account |
| » sub_account_to_type | body | string | true | The sub-account's incoming trading account, spot - spot account, futures - perpetual contract account, delivery - delivery contract account |
| » amount | body | string | true | Transfer amount |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Balance transferred | Inline |

### Response Schema

Status Code **200**

_TransactionID_

| Name | Type | Description |
| --- | --- | --- |
| » tx_id | integer(int64) | Order id |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#transfer-status-query) Transfer status query

`GET /wallet/order_status`

_Transfer status query_

Support querying transfer status based on user-defined client\_order\_id or tx\_id returned by the transfer interface

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| client_order_id | query | string | false | The custom ID provided by the customer serves as a safeguard against duplicate transfers. It can be a combination of letters (case-sensitive), numbers, hyphens '-', and underscores '_', with a length ranging from 1 to 64 characters. |
| tx_id | query | string | false | The transfer operation number and client_order_id cannot be empty at the same time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Transfer status obtained successfully | Inline |

### Response Schema

Status Code **200**

_TransferOrderStatus_

| Name | Type | Description |
| --- | --- | --- |
| » tx_id | string | Order id |
| » status | string | Transfer status, PENDING - in process, SUCCESS - successful transfer, FAIL - failed transfer, PARTIAL_SUCCESS - Partially successful (this status will appear when transferring between sub-subs) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-withdrawal-status) Retrieve withdrawal status

`GET /wallet/withdraw_status`

_Retrieve withdrawal status_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency |
| » name | string | Currency name |
| » name_cn | string | Currency Chinese name |
| » deposit | string | Deposits fee |
| » withdraw_percent | string | Withdrawal fee rate percentage |
| » withdraw_fix | string | Fixed withdrawal fee |
| » withdraw_day_limit | string | Daily allowed withdrawal amount |
| » withdraw_amount_mini | string | Minimum withdrawal amount |
| » withdraw_day_limit_remain | string | Daily withdrawal amount left |
| » withdraw_eachtime_limit | string | Maximum amount for each withdrawal |
| » withdraw_fix_on_chains | object | Fixed withdrawal fee on multiple chains |
| »» additionalProperties | string | none |
| » withdraw_percent_on_chains | object | Percentage withdrawal fee on multiple chains |
| »» additionalProperties | string | none |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-sub-account-balances) Retrieve sub account balances

`GET /wallet/sub_account_balances`

_Retrieve sub account balances_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| sub_uid | query | string | false | User ID of sub-account, you can query multiple records separated by ,. If not specified, it will return the records of all sub accounts |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » uid | string | User ID |
| » available | object | Available balances of currencies |
| »» additionalProperties | string | none |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-accounts-margin-balances) Query sub accounts' margin balances

`GET /wallet/sub_account_margin_balances`

_Query sub accounts' margin balances_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| sub_uid | query | string | false | User ID of sub-account, you can query multiple records separated by ,. If not specified, it will return the records of all sub accounts |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » uid | string | User ID |
| » available | array | Margin account balances |
| »» None | object | Margin account detail. base refers to base currency, while `quotes to quote currency |
| »»» currency_pair | string | Currency pair |
| »»» locked | boolean | Whether account is locked |
| »»» risk | string | Current risk rate of margin account |
| »»» base | object | Account currency details |
| »»»» currency | string | Currency name |
| »»»» available | string | Amount suitable for margin trading. |
| »»»» locked | string | Locked amount, used in margin trading |
| »»»» borrowed | string | Borrowed amount |
| »»»» interest | string | Unpaid interests |
| »»» quote | object | Account currency details |
| »»»» currency | string | Currency name |
| »»»» available | string | Amount suitable for margin trading. |
| »»»» locked | string | Locked amount, used in margin trading |
| »»»» borrowed | string | Borrowed amount |
| »»»» interest | string | Unpaid interests |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-accounts-futures-account-balances) Query sub accounts' futures account balances

`GET /wallet/sub_account_futures_balances`

_Query sub accounts' futures account balances_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| sub_uid | query | string | false | User ID of sub-account, you can query multiple records separated by ,. If not specified, it will return the records of all sub accounts |
| settle | query | string | false | Query only balances of specified settle currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » uid | string | User ID |
| » available | object | Futures account balances |
| »» additionalProperties | object | none |
| »»» total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss.total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| »»» unrealised_pnl | string | Unrealized PNL |
| »»» position_margin | string | Position margin |
| »»» order_margin | string | Order margin of unfinished orders |
| »»» available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |
| »»» point | string | POINT amount |
| »»» currency | string | Settle currency |
| »»» in_dual_mode | boolean | Whether dual mode is enabled |
| »»» enable_credit | boolean | Whether portfolio margin account mode is enabled |
| »»» position_initial_margin | string | Initial margin position, applicable to the portfolio margin account model |
| »»» maintenance_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |
| »»» bonus | string | Perpetual Contract Bonus |
| »»» enable_evolved_classic | boolean | Classic account margin mode, true-new mode, false-old mode |
| »»» cross_order_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |
| »»» cross_initial_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |
| »»» cross_maintenance_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |
| »»» cross_unrealised_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |
| »»» cross_available | string | Full warehouse available amount, suitable for the new classic account margin model |
| »»» isolated_position_margin | string | Ware -position margin, suitable for the new classic account margin model |
| »»» enable_new_dual_mode | boolean | Whether to open a new two-way position mode |
| »»» margin_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |
| »»» history | object | Statistical data |
| »»»» dnw | string | total amount of deposit and withdraw |
| »»»» pnl | string | total amount of trading profit and loss |
| »»»» fee | string | total amount of fee |
| »»»» refr | string | total amount of referrer rebates |
| »»»» fund | string | total amount of funding costs |
| »»»» point_dnw | string | total amount of point deposit and withdraw |
| »»»» point_fee | string | total amount of point fee |
| »»»» point_refr | string | total amount of referrer rebates of point fee |
| »»»» bonus_dnw | string | total amount of perpetual contract bonus transfer |
| »»»» bonus_offset | string | total amount of perpetual contract bonus deduction |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-subaccount-s-cross-margin-account-info) Query subaccount's cross\_margin account info

`GET /wallet/sub_account_cross_margin_balances`

_Query subaccount's cross\_margin account info_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| sub_uid | query | string | false | User ID of sub-account, you can query multiple records separated by ,. If not specified, it will return the records of all sub accounts |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » uid | string | User ID |
| » available | object | none |
| »» user_id | integer(int64) | User ID of the cross margin account. 0 means that the subaccount has not yet opened a cross margin account |
| »» locked | boolean | Whether account is locked |
| »» balances | object | none |
| »»» CrossMarginBalance | object | none |
| »»»» available | string | Available amount |
| »»»» freeze | string | Locked amount |
| »»»» borrowed | string | Borrowed amount |
| »»»» interest | string | Unpaid interests |
| »»» total | string | Total account value in USDT, i.e., the sum of all currencies' (available+freeze)*price*discount |
| »»» borrowed | string | Total borrowed value in USDT, i.e., the sum of all currencies' borrowed*price*discount |
| »»» borrowed_net | string | Total borrowed value in USDT * borrowed factor |
| »»» net | string | Total net assets in USDT |
| »»» leverage | string | Position leverage |
| »»» interest | string | Total unpaid interests in USDT, i.e., the sum of all currencies' interest*price*discount |
| »»» risk | string | Risk rate. When it belows 110%, liquidation will be triggered. Calculation formula: total / (borrowed+interest) |
| »»» total_initial_margin | string | Total initial margin |
| »»» total_margin_balance | string | Total margin balance |
| »»» total_maintenance_margin | string | Total maintenance margin |
| »»» total_initial_margin_rate | string | Total initial margin rate |
| »»» total_maintenance_margin_rate | string | Total maintenance margin rate |
| »»» total_available_margin | string | Total available margin |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-saved-address) Query saved address

`GET /wallet/saved_address`

_Query saved address_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Currency |
| chain | query | string | false | Chain name |
| limit | query | string | false | Maximum number returned, 100 at most |
| page | query | integer | false | Page number |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency |
| » chain | string | Chain name |
| » address | string | Address |
| » name | string | Name |
| » tag | string | Tag |
| » verified | string | Whether to pass the verification 0-unverified, 1-verified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-personal-trading-fee) Retrieve personal trading fee

`GET /wallet/fee`

_Retrieve personal trading fee_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Specify a currency pair to retrieve precise fee rate |
| settle | query | string | false | Specify the settlement currency of the contract to get more accurate rate settings |

#### [#](#detailed-descriptions) Detailed descriptions

**currency\_pair**: Specify a currency pair to retrieve precise fee rate

This field is optional. In most cases, the fee rate is identical among all currency pairs

**settle**: Specify the settlement currency of the contract to get more accurate rate settings

This field is optional. Generally, the rate settings for all settlement currencies are the same.

#### [#](#enumerated-values-2) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | BTC |
| settle | USDT |
| settle | USD |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | integer(int64) | User ID |
| » taker_fee | string | taker fee rate |
| » maker_fee | string | maker fee rate |
| » gt_discount | boolean | If GT deduction is enabled |
| » gt_taker_fee | string | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |
| » gt_maker_fee | string | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |
| » loan_fee | string | Loan fee rate of margin lending |
| » point_type | string | Point type. 0 - Initial version. 1 - new version since 202009 |
| » futures_taker_fee | string | Futures trading taker fee |
| » futures_maker_fee | string | Future trading maker fee |
| » delivery_taker_fee | string | Delivery trading taker fee |
| » delivery_maker_fee | string | Delivery trading maker fee |
| » debit_fee | integer | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-user-s-total-balances) Retrieve user's total balances

`GET /wallet/total_balance`

_Retrieve user's total balances_

This endpoint returns an approximate sum of exchanged amount from all currencies to input currency for each account.The exchange rate and account balance could have been cached for at most 1 minute. It is not recommended to use its result for any trading calculation.

For trading calculation, use the corresponding account query endpoint for each account type. For example:

*   `GET /spot/accounts` to query spot account balance
*   `GET /margin/accounts` to query margin account balance
*   `GET /futures/{settle}/accounts` to query futures account balance

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Currency unit used to calculate the balance amount. BTC, CNY, USD and USDT are allowed. USDT is the default. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Request is valid and is successfully responded | Inline |

### Response Schema

Status Code **200**

_User's balance in all accounts_

| Name | Type | Description |
| --- | --- | --- |
| » total | object | Total balances calculated with specified currency unit |
| »» amount | string | Account total balance amount |
| »» currency | string | Currency |
| »» unrealised_pnl | string | Unrealised_pnl, this field will only appear in futures, options, delivery, and total accounts |
| »» borrowed | string | Borrowed，this field will only appear in margin and cross_margin accounts |
| » details | object | Total balances in different accounts- cross_margin: cross margin account- spot: spot account- finance: finance account- margin: margin account- quant: quant account- futures: futures account- delivery: delivery account- warrant: warrant account- cbbc: cbbc account |
| »» additionalProperties | object | Total balances calculated with specified currency unit |
| »»» amount | string | Account total balance amount |
| »»» currency | string | Currency |
| »»» unrealised_pnl | string | Unrealised_pnl, this field will only appear in futures, options, delivery, and total accounts |
| »»» borrowed | string | Borrowed，this field will only appear in margin and cross_margin accounts |

#### [#](#enumerated-values-3) Enumerated Values

| Property | Value |
| --- | --- |
| currency | BTC |
| currency | CNY |
| currency | USD |
| currency | USDT |
| currency | BTC |
| currency | CNY |
| currency | USD |
| currency | USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-small-balance) List small balance

`GET /wallet/small_balance`

_List small balance_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Convert Small Balance |
| »» currency | string | Currency |
| »» available_balance | string | Available balance |
| »» estimated_as_btc | string | Estimated as BTC |
| »» convertible_to_gt | string | Estimated conversion to GT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#convert-small-balance) Convert small balance

`POST /wallet/small_balance`

_Convert small balance_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | array | false | Currency |
| » is_all | body | boolean | false | Whether to exchange all |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-small-balance-history) List small balance history

`GET /wallet/small_balance_history`

_List small balance history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Convert Small Balance |
| »» id | string | Order ID |
| »» currency | string | Currency |
| »» amount | string | amount |
| »» gt_amount | string | GT amount |
| »» create_time | integer(int64) | Exchange time (in seconds) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-the-uid-transfer-history) Retrieve the UID transfer history

`GET /wallet/push`

_Retrieve the UID transfer history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| id | query | integer(int32) | false | Order ID |
| from | query | integer(int32) | false | The start time of the query record. If not specified, it defaults to 7 days forward from the current time, in seconds Unix timestamp |
| to | query | integer(int32) | false | The end time of the query record. If not specified, the default is the current time, which is a Unix timestamp in seconds. |
| limit | query | integer(int32) | false | The maximum number of items returned in the list, the default value is 100 |
| offset | query | integer(int32) | false | List offset, starting from 0 |
| transaction_type | query | string | false | The list returns the order type withdraw, deposit, the default is withdraw. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Order ID |
| » push_uid | integer(int64) | Initiator User ID |
| » receive_uid | integer(int64) | Recipient User ID |
| » currency | string | Currency name |
| » amount | string | Transfer amount |
| » create_time | integer(int64) | Creation time |
| » status | string | Withdrawal Status- CREATING: Creating- PENDING: Waiting for receiving(Please contact the other party to accept the transfer on the Gate official website)- CANCELLING: Cancelling- CANCELLED: Revoked- REFUSING: Rejection- REFUSED: Rejected- RECEIVING: Receiving- RECEIVED: Success |
| » message | string | PENDING Reason Tips |
| » transaction_type | string | Order Type |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#subaccount) SubAccount

Sub-accounts management

## [#](#create-a-new-sub-account) Create a new sub-account

`POST /sub_accounts`

_Create a new sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » remark | body | string | false | custom text |
| » login_name | body | string | true | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password | body | string | false | The sub-account's password. (Default: the same as main account's password) |
| » email | body | string | false | The sub-account's email address. (Default: the same as main account's email address) |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Created Successfully | Inline |

### Response Schema

Status Code **201**

| Name | Type | Description |
| --- | --- | --- |
| » remark | string | custom text |
| » login_name | string | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password | string | The sub-account's password. (Default: the same as main account's password) |
| » email | string | The sub-account's email address. (Default: the same as main account's email address) |
| » state | integer(int32) | State: 1-normal, 2-locked" |
| » type | integer(int32) | "Sub-account type: 1 - sub-account, 3 - cross margin account |
| » user_id | integer(int64) | The user id of the sub-account |
| » create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-sub-accounts) List sub-accounts

`GET /sub_accounts`

_List sub-accounts_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| type | query | string | false | 0 to list all types of sub-accounts (currently supporting cross margin accounts and sub-accounts). |

#### [#](#detailed-descriptions-2) Detailed descriptions

**type**: `0` to list all types of sub-accounts (currently supporting cross margin accounts and sub-accounts). `1` to list sub-accounts only. If no parameter is passed, only sub-accounts will be listed by default.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » remark | string | custom text |
| » login_name | string | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password | string | The sub-account's password. (Default: the same as main account's password) |
| » email | string | The sub-account's email address. (Default: the same as main account's email address) |
| » state | integer(int32) | State: 1-normal, 2-locked" |
| » type | integer(int32) | "Sub-account type: 1 - sub-account, 3 - cross margin account |
| » user_id | integer(int64) | The user id of the sub-account |
| » create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-sub-account) Get the sub-account

`GET /sub_accounts/{user_id}`

_Get the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer(int64) | true | Sub-account user id |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » remark | string | custom text |
| » login_name | string | Sub-account login name: Only letters, numbers and underscores are supported, and cannot contain other illegal characters |
| » password | string | The sub-account's password. (Default: the same as main account's password) |
| » email | string | The sub-account's email address. (Default: the same as main account's email address) |
| » state | integer(int32) | State: 1-normal, 2-locked" |
| » type | integer(int32) | "Sub-account type: 1 - sub-account, 3 - cross margin account |
| » user_id | integer(int64) | The user id of the sub-account |
| » create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-api-key-of-the-sub-account) Create API Key of the sub-account

`POST /sub_accounts/{user_id}/keys`

_Create API Key of the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer(int64) | true | Sub-account user id |
| body | body | SubAccountKey | true | none |
| » mode | body | integer(int32) | false | Mode: 1 - classic 2 - portfolio account |
| » name | body | string | false | API key name |
| » perms | body | array | false | none |
| »» name | body | string | false | Permission function name (no value will be cleared) |
| »» read_only | body | boolean | false | read only |
| » ip_whitelist | body | array | false | ip white list (list will be removed if no value is passed) |

#### [#](#detailed-descriptions-3) Detailed descriptions

**»» name**: Permission function name (no value will be cleared)

*   wallet: wallet
*   spot: spot/leverage
*   futures: perpetual contract
*   delivery: delivery contract
*   earn: financial management
*   custody: custody
*   options: options
*   account: account information
*   loan: loan
*   margin: leverage
*   unified: unified account
*   copy: copy

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Created Successfully | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | string | User ID |
| » mode | integer(int32) | Mode: 1 - classic 2 - portfolio account |
| » name | string | API key name |
| » perms | array | none |
| »» name | string | Permission function name (no value will be cleared)- wallet: wallet- spot: spot/leverage- futures: perpetual contract- delivery: delivery contract- earn: financial management- custody: custody- options: options- account: account information- loan: loan- margin: leverage- unified: unified account- copy: copy |
| »» read_only | boolean | read only |
| » ip_whitelist | array | ip white list (list will be removed if no value is passed) |
| » key | string | API Key |
| » state | integer(int32) | State 1 - normal 2 - locked 3 - frozen |
| » created_at | integer(int64) | Creation time |
| » updated_at | integer(int64) | Last update time |
| » last_access | integer(int64) | Last access time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-api-key-of-the-sub-account) List all API Key of the sub-account

`GET /sub_accounts/{user_id}/keys`

_List all API Key of the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer | true | Sub-account user id |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [SubAccountKey] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-api-key-of-the-sub-account) Update API key of the sub-account

`PUT /sub_accounts/{user_id}/keys/{key}`

_Update API key of the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer | true | Sub-account user id |
| key | path | string | true | The API Key of the sub-account |
| body | body | SubAccountKey | true | none |
| » mode | body | integer(int32) | false | Mode: 1 - classic 2 - portfolio account |
| » name | body | string | false | API key name |
| » perms | body | array | false | none |
| »» name | body | string | false | Permission function name (no value will be cleared) |
| »» read_only | body | boolean | false | read only |
| » ip_whitelist | body | array | false | ip white list (list will be removed if no value is passed) |

#### [#](#detailed-descriptions-4) Detailed descriptions

**»» name**: Permission function name (no value will be cleared)

*   wallet: wallet
*   spot: spot/leverage
*   futures: perpetual contract
*   delivery: delivery contract
*   earn: financial management
*   custody: custody
*   options: options
*   account: account information
*   loan: loan
*   margin: leverage
*   unified: unified account
*   copy: copy

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Updated | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-api-key-of-the-sub-account) Delete API key of the sub-account

`DELETE /sub_accounts/{user_id}/keys/{key}`

_Delete API key of the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer | true | Sub-account user id |
| key | path | string | true | The API Key of the sub-account |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Delete successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-api-key-of-the-sub-account) Get the API Key of the sub-account

`GET /sub_accounts/{user_id}/keys/{key}`

_Get the API Key of the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer | true | Sub-account user id |
| key | path | string | true | The API Key of the sub-account |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | SubAccountKey |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#lock-the-sub-account) Lock the sub-account

`POST /sub_accounts/{user_id}/lock`

_Lock the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer(int64) | true | The user id of the sub-account |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Lock successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#unlock-the-sub-account) Unlock the sub-account

`POST /sub_accounts/{user_id}/unlock`

_Unlock the sub-account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | path | integer(int64) | true | The user id of the sub-account |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Unlock successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-sub-account-mode) Get sub-account mode

`GET /sub_accounts/unified_mode`

_Get sub-account mode_

Unified account mode：

*   `classic`: Classic account mode
*   `multi_currency`: Multi-currency margin mode
*   `portfolio`: Portfolio margin mode

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | integer(int64) | User ID |
| » is_unified | boolean | Is it a unified account? |
| » mode | string | Unified account mode：- classic: Classic account mode- multi_currency: Multi-currency margin mode- portfolio: Portfolio margin mode |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#unified) Unified

Unified account

## [#](#get-unified-account-information) Get unified account information

`GET /unified/accounts`

_Get unified account information_

The assets of each currency in the account will be adjusted according to their liquidity, defined by corresponding adjustment coefficients, and then uniformly converted to USD to calculate the total asset value and position value of the account.

You can refer to the [Formula](#portfolio-account) in the documentation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| sub_uid | query | string | false | Sub account user ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | integer(int64) | User ID |
| » refresh_time | integer(int64) | Time of the most recent refresh |
| » locked | boolean | Whether the account is locked, valid in cross-currency margin/combined margin mode, false in other modes such as single-currency margin mode |
| » balances | object | none |
| »» UnifiedBalance | object | none |
| »»» available | string | Available amount is valid in single currency margin/cross-currency margin/combined margin mode, and the calculation is different in different modes |
| »»» freeze | string | The locked amount is valid in single currency margin/cross-currency margin/combined margin mode |
| »»» borrowed | string | Borrow limit, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »»» negative_liab | string | Negative balance loan is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode |
| »»» futures_pos_liab | string | Contract opening position borrowing currency (abandoned, to be offline field) |
| »»» equity | string | Equity, valid in single currency margin/cross currency margin/combined margin mode |
| »»» total_freeze | string | Total occupancy (discarded, to be offline field) |
| »»» total_liab | string | Total borrowing, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »»» spot_in_use | string | The amount of spot hedging is valid in the combined margin mode, and is 0 in other margin modes such as single currency and cross-currency margin modes |
| »»» funding | string | Uniloan financial management amount, effective when Uniloan financial management is turned on as a unified account margin switch |
| »»» funding_version | string | Funding version |
| »»» cross_balance | string | Full margin balance is valid in single currency margin mode, and is 0 in other modes such as cross currency margin/combined margin mode |
| »»» iso_balance | string | Isolated margin balance is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |
| »»» im | string | Full-position initial margin is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |
| »»» mm | string | The full position maintains margin, which is valid in the single currency margin mode, and other cross-currency margin combination margin mode is 0. |
| »»» imr | string | Full-position initial margin rate is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |
| »»» mmr | string | Full-position maintenance margin rate is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode |
| »»» margin_balance | string | Full margin balance is valid in single currency margin mode and is 0 in other modes such as cross currency margin/combined margin mode |
| »»» available_margin | string | Full margin available for full position is valid in single currency margin mode, and is 0 in other modes such as cross-currency margin/combined margin mode |
| »» total | string | Total account assets converted to USD, i.e. the sum of (available + freeze) * price in all currencies (deprecated, to be deprecated, replaced by unified_account_total) |
| »» borrowed | string | The total borrowed amount of the account converted into USD, i.e. the sum of borrowed * price of all currencies (excluding Point Cards). It is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode. |
| »» total_initial_margin | string | Total initial margin, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» total_margin_balance | string | Total margin balance, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» total_maintenance_margin | string | Total maintenance margin is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode |
| »» total_initial_margin_rate | string | Total initial margin rate, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» total_maintenance_margin_rate | string | Total maintenance margin rate, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» total_available_margin | string | Available margin amount, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» unified_account_total | string | Unify the total account assets, valid in single currency margin/cross-currency margin/combined margin mode |
| »» unified_account_total_liab | string | Unify the total loan of the account, valid in the cross-currency margin/combined margin mode, and 0 in other modes such as single-currency margin mode |
| »» unified_account_total_equity | string | Unify the total account equity, valid in single currency margin/cross-currency margin/combined margin mode |
| »» leverage | string | Actual leverage, valid in cross-currency margin/combined margin mode |
| »» spot_order_loss | string | Total pending order loss, in USDT, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» spot_hedge | boolean | Spot hedging status, true - enabled, false - not enabled. |
| »» use_funding | boolean | Whether to use funds as margin |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-about-the-maximum-borrowing-for-the-unified-account) Query about the maximum borrowing for the unified account

`GET /unified/borrowable`

_Query about the maximum borrowing for the unified account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_UnifiedBorrowable_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » amount | string | Max borrowable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-about-the-maximum-transferable-for-the-unified-account) Query about the maximum transferable for the unified account

`GET /unified/transferable`

_Query about the maximum transferable for the unified account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_UnifiedTransferable_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » amount | string | The maximum amount that can be transferred out |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay) Borrow or repay

`POST /unified/loans`

_Borrow or repay_

When borrowing, it is essential to ensure that the borrowed amount is not below the minimum borrowing threshold for the specific cryptocurrency and does not exceed the maximum borrowing limit set by the platform and the user.

The interest on the loan will be automatically deducted from the account at regular intervals. It is the user's responsibility to manage the repayment of the borrowed amount.

For repayment, the option to repay the entire borrowed amount is available by setting the parameter `repaid_all=true`

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Currency |
| » type | body | string | true | type: borrow - borrow, repay - repay |
| » amount | body | string | true | The amount of lending or repaying |
| » repaid_all | body | boolean | false | Full repayment is solely for repayment operations. When set to 'true,' it overrides the 'amount,' allowing for direct full repayment. |
| » text | body | string | false | User defined custom ID |

#### [#](#enumerated-values-4) Enumerated Values

| Parameter | Value |
| --- | --- |
| » type | borrow |
| » type | repay |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Operated successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-loans) List loans

`GET /unified/loans`

_List loans_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| type | query | string | false | Loan type, platform - platform, margin - margin |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Loan] |
| » None | object | Loan |
| »» currency | string | Currency |
| »» currency_pair | string | Currency pair |
| »» amount | string | amount |
| »» type | string | Loan type, platform - platform, margin - margin |
| »» create_time | integer(int64) | Created time |
| »» update_time | integer(int64) | Updated time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-load-records) Get load records

`GET /unified/loan_records`

_Get load records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| type | query | string | false | The types of lending records, borrow - indicates the action of borrowing funds, repay - indicates the action of repaying the borrowed funds |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Loan records |
| »» id | integer(int64) | id |
| »» type | string | type: borrow - borrow, repay - repay |
| »» repayment_type | string | Repayment type: none - no repayment type, manual_repay - manual repayment, auto_repay - automatic repayment, cancel_auto_repay - automatic repayment after cancellation |
| »» borrow_type | string | Loan type, returned when querying loan records. manual_borrow - Manual repayment , auto_borrow - Automatic repayment |
| »» currency_pair | string | Currency pair |
| »» currency | string | Currency |
| »» amount | string | The amount of lending or repaying |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records) List interest records

`GET /unified/interest_records`

_List interest records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| type | query | string | false | Loan type, platform loan - platform, leverage loan - margin, if not passed, defaults to margin |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Interest record] |
| » None | object | Interest record |
| »» currency | string | Currency name |
| »» currency_pair | string | Currency pair |
| »» actual_rate | string | Actual rate |
| »» interest | string | Interest |
| »» status | integer | Status: 0 - fail, 1 - success |
| »» type | string | Type, platform - platform，margin - margin |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-risk-unit-details) Get user risk unit details

`GET /unified/risk_units`

_Get user risk unit details_

Retrieve user risk unit details, only valid in portfolio margin mode

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | integer(int64) | User ID |
| » spot_hedge | boolean | Spot hedging status, true - enabled, false - not enabled. |
| » risk_units | array | Risk unit |
| »» RiskUnits | object | none |
| »»» symbol | string | Risk unit flag |
| »»» spot_in_use | string | Spot hedging utilization |
| »»» maintain_margin | string | Maintenance margin for risk unit |
| »»» initial_margin | string | Initial margin for risk unit |
| »»» delta | string | Total Delta of risk unit |
| »»» gamma | string | Total Gamma of risk unit |
| »»» theta | string | Total Theta of risk unit |
| »»» vega | string | Total Vega of risk unit |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-mode-of-the-unified-account) Set mode of the unified account

`PUT /unified/unified_mode`

_Set mode of the unified account_

Switching each account mode only requires passing the parameters of the corresponding account mode, and supports turning on or off the configuration switch in the corresponding account mode when switching the account mode

*   When opening the classic account mode, mode=classic

```text
PUT /unified/unified_mode
 {
 "mode": "classic"
 }
```

*   Open the cross-currency margin mode, mode=multi\_currency

```text
PUT /unified/unified_mode
 {
 "mode": "multi_currency",
 "settings": {
 "usdt_futures": true
 }
 }
```

*   When the portfolio margin mode is enabled, mode=portfolio

```text
PUT /unified/unified_mode
 {
 "mode": "portfolio",
 "settings": {
 "spot_hedge": true
 }
 }
```

*   When opening a single currency margin mode, mode=single\_currency

```text
PUT /unified/unified_mode
 {
 "mode": "single_currency"
 }
```

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » mode | body | string | true | Unified account mode: |
| » settings | body | object | false | none |
| »» usdt_futures | body | boolean | false | USDT contract switch. In cross-currency margin mode, it can only be turned on and not off |
| »» spot_hedge | body | boolean | false | Spot hedging switch. |
| »» use_funding | body | boolean | false | switch, when the mode is cross-currency margin mode, whether to use Uniloan financial funds as margin |
| »» options | body | boolean | false | Option switch. In cross-currency margin mode, it can only be turned on and not off |

#### [#](#detailed-descriptions-5) Detailed descriptions

**» mode**: Unified account mode:

*   `classic`: Classic account mode
*   `multi_currency`: Multi-currency margin mode
*   `portfolio`: Portfolio margin mode
*   `single_currency`: Single Currency Margin Model

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-mode-of-the-unified-account) Query mode of the unified account

`GET /unified/unified_mode`

_Query mode of the unified account_

Unified account mode:

*   `classic`: Classic account mode
*   `multi_currency`: Cross-currency margin mode
*   `portfolio`: Portfolio margin mode
*   `single_currency`: Single-currency margin mode

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » mode | string | Unified account mode:- classic: Classic account mode- multi_currency: Multi-currency margin mode- portfolio: Portfolio margin mode- single_currency: Single Currency Margin Model |
| » settings | object | none |
| »» usdt_futures | boolean | USDT contract switch. In cross-currency margin mode, it can only be turned on and not off |
| »» spot_hedge | boolean | Spot hedging switch. |
| »» use_funding | boolean | switch, when the mode is cross-currency margin mode, whether to use Uniloan financial funds as margin |
| »» options | boolean | Option switch. In cross-currency margin mode, it can only be turned on and not off |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-unified-estimate-rate) Get unified estimate rate

`GET /unified/estimate_rate`

_Get unified estimate rate_

Due to fluctuations in lending depth, hourly interest rates may vary, and thus, I cannot provide exact rates. When a currency is not supported, the interest rate returned will be an empty string.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currencies | query | array[string] | true | Specify the currency names for querying in an array, separated by commas, with a maximum of 10 currencies. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

| Name | Type | Description |
| --- | --- | --- |
| » additionalProperties | string | none |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-currency-discount-tiers) List currency discount tiers

`GET /unified/currency_discount_tiers`

_List currency discount tiers_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Currency discount tiers |
| »» currency | string | Currency name |
| »» discount_tiers | array | Tiered discount |
| »»» tier | string | Tier |
| »»» discount | string | Discount |
| »»» lower_limit | string | Lower limit |
| »»» upper_limit | string | Upper limit,＋ indicates positive infinity |
| »»» leverage | string | Position leverage |

This operation does not require authentication

## [#](#list-loan-margin-tiers) List loan margin tiers

`GET /unified/loan_margin_tiers`

_List loan margin tiers_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Unified margin tiers |
| »» currency | string | Currency name |
| »» margin_tiers | array | Margin tiers |
| »»» MarginTiers | object | none |
| »»»» tier | string | Tier |
| »»»» margin_rate | string | Discount |
| »»»» lower_limit | string | Lower limit |
| »»»» upper_limit | string | Upper limit, "" indicates greater than (the last tier) |
| »»»» leverage | string | Position leverage |

This operation does not require authentication

## [#](#portfolio-margin-calculator) Portfolio margin calculator

`POST /unified/portfolio_calculator`

_Portfolio margin calculator_

Portfolio Margin Calculator When inputting a simulated position portfolio, each position includes the position name and quantity held, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. When inputting simulated orders, each order includes the market identifier, order price, and order quantity, supporting markets within the range of BTC and ETH perpetual contracts, options, and spot markets. Market orders are not included.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » spot_balances | body | array | false | Spot |
| »» None | body | object | false | Spot |
| »»» currency | body | string | true | Currency name |
| »»» equity | body | string | true | Currency equity, where equity = balance - borrowed, represents the net delta exposure |
| »» spot_orders | body | array | false | Spot orders |
| »»» None | body | object | false | Spot orders |
| »»»» currency_pairs | body | string | true | Currency pair |
| »»»» order_price | body | string | true | Price |
| »»»» count | body | string | false | Initial order quantity for spot trading pairs, not involved in actual calculation. |
| »»»» left | body | string | true | Unfilled quantity, involved in actual calculation. |
| »»»» type | body | string | true | Order type, sell - sell order, buy - buy order. |
| »»» futures_positions | body | array | false | Futures positions |
| »»»» None | body | object | false | Futures positions |
| »»»»» contract | body | string | true | Futures name, currently only supports perpetual futures for BTC and ETH with USDT. |
| »»»»» size | body | string | true | Position size, measured in contract units. |
| »»»» futures_orders | body | array | false | Futures order |
| »»»»» None | body | object | false | Futures order |
| »»»»»» contract | body | string | true | Futures name, currently only supports perpetual futures for BTC and ETH with USDT. |
| »»»»»» size | body | string | true | Futures quantity, representing the initial order quantity, not involved in actual settlement. |
| »»»»»» left | body | string | true | Unfilled contract quantity, involved in actual calculation |
| »»»»» options_positions | body | array | false | Options positions |
| »»»»»» None | body | object | false | Options positions |
| »»»»»»» options_name | body | string | true | Option name, currently only supports options for BTC and ETH with USDT. |
| »»»»»»» size | body | string | true | Position size, measured in contract units. |
| »»»»»» options_orders | body | array | false | Option orders |
| »»»»»»» None | body | object | false | Option orders |
| »»»»»»»» options_name | body | string | true | Option name, currently only supports options for BTC and ETH with USDT. |
| »»»»»»»» size | body | string | true | Initial order quantity, not involved in actual calculation |
| »»»»»»»» left | body | string | true | Unfilled contract quantity, involved in actual calculation |
| »»»»»»» spot_hedge | body | boolean | false | Whether to enable spot hedging. |

#### [#](#detailed-descriptions-6) Detailed descriptions

**»»» equity**: Currency equity, where equity = balance - borrowed, represents the net delta exposure of your spot positions, which can be negative. Currently only supports three currencies: BTC, ETH.

**»»»» count**: Initial order quantity for spot trading pairs, not involved in actual calculation. Currently only supports three currencies: BTC, ETH.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_The output of the portfolio margin calculator._

| Name | Type | Description |
| --- | --- | --- |
| » maintain_margin_total | string | Total maintenance margin, including only the portfolio margin calculation results for positions in the risk unit,excluding borrowed margin. If borrowing exists, conventional borrowing margin requirements will still apply. |
| » initial_margin_total | string | Total initial margin, calculated as the maximum of the following three combinations: position,position + positive delta orders, position + negative delta orders. |
| » calculate_time | integer(int64) | Calculate time |
| » risk_unit | array | Risk unit |
| »» None | object | Risk unit |
| »»» symbol | string | Risk unit name |
| »»» spot_in_use | string | Spot usage |
| »»» maintain_margin | string | Maintenance margin |
| »»» initial_margin | string | Initial margin |
| »»» margin_result | array | Margin result |
| »»»» None | object | Margin result |
| »»»»» type | string | Position combination typeoriginal_position - Original positionlong_delta_original_position - Positive delta + Original positionshort_delta_original_position - Negative delta + Original position |
| »»»»» profit_loss_ranges | array | The results of 33 pressure scenarios for MR1 |
| »»»»»» None | object | Profit and loss range |
| »»»»»»» price_percentage | string | Percentage change in price |
| »»»»»»» implied_volatility_percentage | string | Percentage change in implied volatility |
| »»»»»»» profit_loss | string | PNL |
| »»»»»» max_loss | object | Profit and loss range |
| »»»»»»» price_percentage | string | Percentage change in price |
| »»»»»»» implied_volatility_percentage | string | Percentage change in implied volatility |
| »»»»»»» profit_loss | string | PNL |
| »»»»»» mr1 | string | Stress testing |
| »»»»»» mr2 | string | Basis spread risk |
| »»»»»» mr3 | string | Volatility spread risk |
| »»»»»» mr4 | string | Option short risk |
| »»»»» delta | string | Total Delta of risk unit |
| »»»»» gamma | string | Total Gamma of risk unit |
| »»»»» theta | string | Total Theta of risk unit |
| »»»»» vega | string | Total Vega of risk unit |

This operation does not require authentication

## [#](#minimum-currency-leverage-that-can-be-set) Minimum currency leverage that can be set

`GET /unified/leverage/user_currency_config`

_Minimum currency leverage that can be set_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » current_leverage | string | Current leverage ratio |
| » min_leverage | string | Minimum adjustable leverage ratio |
| » max_leverage | string | Maximum adjustable leverage ratio |
| » debit | string | Current liabilities |
| » available_margin | string | Available Margin |
| » borrowable | string | The current leverage you can choose is |
| » except_leverage_borrowable | string | The maximum amount of margin that can be borrowed and the maximum amount of Uniloan that can be borrowed, whichever is smaller |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-leverage-multiple-of-the-user-currency) Get the leverage multiple of the user currency

`GET /unified/leverage/user_currency_setting`

_Get the leverage multiple of the user currency_

Get the user's currency leverage. If currency is not passed, query all currencies.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Loan currency leverage_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency name |
| » leverage | string | multiple |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-the-loan-currency-leverage) Set the loan currency leverage

`POST /unified/leverage/user_currency_setting`

_Set the loan currency leverage_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Currency name |
| » leverage | body | string | true | multiple |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-of-loan-currencies-supported-by-unified-account) List of loan currencies supported by unified account

`GET /unified/currencies`

_List of loan currencies supported by unified account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » name | string | Currency name |
| » prec | string | Currency precision |
| » min_borrow_amount | string | The minimum debit limit is the unit of currency |
| » user_max_borrow_amount | string | The minimum debit limit is the unit of currency |
| » total_max_borrow_amount | string | The maximum debit limit for the platform is USDT |
| » loan_status | string | Does the lending status- disable : Loans are prohibited- enable: Support lending |

This operation does not require authentication

## [#](#get-historical-lending-rates) get historical lending rates

`GET /unified/history_loan_rate`

_get historical lending rates_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| tier | query | string | false | The VIP level of the floating rate that needs to be queried |
| currency | query | string | true | Currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency name |
| » tier | string | The VIP level of the floating rate required |
| » tier_up_rate | string | VIP level corresponding floating rate |
| » rates | array | Historical interest rate information, one data per hour, the array size is determined by the page and limit parameters provided by the interface request parameters, sorted from recent to far in time |
| »» time | integer(int64) | The hourly timestamp corresponding to the interest rate, in milliseconds |
| »» rate | string | Historical interest rates for this hour |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#spot) Spot

Spot trading

## [#](#list-all-currencies-details) List all currencies' details

`GET /spot/currencies`

_List all currencies' details_

When a currency corresponds to multiple chains, you can query the information of multiple chains through the `chains` field, such as the charging and recharge status, identification, etc. of the chain.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » currency | string | Currency symbol |
| » name | string | Currency name |
| » delisted | boolean | Whether currency is de-listed |
| » withdraw_disabled | boolean | Whether currency's withdrawal is disabled (deprecated) |
| » withdraw_delayed | boolean | Whether currency's withdrawal is delayed (deprecated) |
| » deposit_disabled | boolean | Whether currency's deposit is disabled (deprecated) |
| » trade_disabled | boolean | Whether currency's trading is disabled |
| » fixed_rate | string | Fixed fee rate. Only for fixed rate currencies, not valid for normal currencies |
| » chain | string | The main chain corresponding to the coin |
| » chains | array | All links corresponding to coins |
| »» SpotCurrencyChain | object | none |
| »»» name | string | Chain name |
| »»» addr | string | token address |
| »»» withdraw_disabled | boolean | Whether currency's withdrawal is disabled |
| »»» withdraw_delayed | boolean | Whether currency's withdrawal is delayed |
| »»» deposit_disabled | boolean | Whether currency's deposit is disabled |

This operation does not require authentication

## [#](#get-details-of-a-specific-currency) Get details of a specific currency

`GET /spot/currencies/{currency}`

_Get details of a specific currency_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | path | string | true | Currency name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency symbol |
| » name | string | Currency name |
| » delisted | boolean | Whether currency is de-listed |
| » withdraw_disabled | boolean | Whether currency's withdrawal is disabled (deprecated) |
| » withdraw_delayed | boolean | Whether currency's withdrawal is delayed (deprecated) |
| » deposit_disabled | boolean | Whether currency's deposit is disabled (deprecated) |
| » trade_disabled | boolean | Whether currency's trading is disabled |
| » fixed_rate | string | Fixed fee rate. Only for fixed rate currencies, not valid for normal currencies |
| » chain | string | The main chain corresponding to the coin |
| » chains | array | All links corresponding to coins |
| »» SpotCurrencyChain | object | none |
| »»» name | string | Chain name |
| »»» addr | string | token address |
| »»» withdraw_disabled | boolean | Whether currency's withdrawal is disabled |
| »»» withdraw_delayed | boolean | Whether currency's withdrawal is delayed |
| »»» deposit_disabled | boolean | Whether currency's deposit is disabled |

This operation does not require authentication

## [#](#list-all-currency-pairs-supported) List all currency pairs supported

`GET /spot/currency_pairs`

_List all currency pairs supported_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | All currency pairs retrieved | [CurrencyPair] |

This operation does not require authentication

## [#](#get-details-of-a-specifc-currency-pair) Get details of a specifc currency pair

`GET /spot/currency_pairs/{currency_pair}`

_Get details of a specifc currency pair_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | path | string | true | Currency pair |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | CurrencyPair |

This operation does not require authentication

## [#](#retrieve-ticker-information) Retrieve ticker information

`GET /spot/tickers`

_Retrieve ticker information_

Return only related data if `currency_pair` is specified; otherwise return all of them

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Currency pair |
| timezone | query | string | false | Timezone |

#### [#](#enumerated-values-5) Enumerated Values

| Parameter | Value |
| --- | --- |
| timezone | utc0 |
| timezone | utc8 |
| timezone | all |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency_pair | string | Currency pair |
| » last | string | Last trading price |
| » lowest_ask | string | Recent lowest ask |
| » lowest_size | string | The latest seller's lowest price quantity; does not exist for batch query; exists for single query, and is empty if there is no data |
| » highest_bid | string | Recent highest bid |
| » highest_size | string | The latest buyer's highest price quantity; does not exist for batch query; exists for single query, and is empty if there is no data |
| » change_percentage | string | Change percentage in the last 24h |
| » change_utc0 | string | utc0 timezone, the percentage change in the last 24 hours |
| » change_utc8 | string | utc8 timezone, the percentage change in the last 24 hours |
| » base_volume | string | Base currency trade volume in the last 24h |
| » quote_volume | string | Quote currency trade volume in the last 24h |
| » high_24h | string | Highest price in 24h |
| » low_24h | string | Lowest price in 24h |
| » etf_net_value | string | ETF net value |
| » etf_pre_net_value | string|null | ETF previous net value at re-balancing time |
| » etf_pre_timestamp | integer(int64)|null | ETF previous re-balancing time |
| » etf_leverage | string|null | ETF current leverage |

This operation does not require authentication

## [#](#retrieve-order-book) Retrieve order book

`GET /spot/order_book`

_Retrieve order book_

Order book will be sorted by price from high to low on bids; low to high on asks

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | true | Currency pair |
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |
| limit | query | integer | false | Maximum number of order depth data in asks or bids |
| with_id | query | boolean | false | Return order book ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Order book ID, which is updated whenever the order book is changed. Valid only when with_id is set to true |
| » current | integer(int64) | The timestamp of the response data being generated (in milliseconds) |
| » update | integer(int64) | The timestamp of when the orderbook last changed (in milliseconds) |
| » asks | array | Asks order depth |
| »» None | array | price and amount |
| » bids | array | Bids order depth |
| »» None | array | price and amount |

This operation does not require authentication

## [#](#retrieve-market-trades) Retrieve market trades

`GET /spot/trades`

_Retrieve market trades_

Supports `from` and `to` by time range query or page-turn query based on `last_id`. By default, query by time range is the last 30 days.

The query method based on `last_id` page turn is no longer recommended. If `last_id` is specified, the time range query parameters will be ignored.

The maximum number of pages when searching data using limit&page paging function is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | true | Currency pair |
| limit | query | integer(int32) | false | Maximum number of records to be returned in a single list. Default: 100, Minimum: 1, Maximum: 1000 |
| last_id | query | string | false | Specify list staring point using the id of last record in previous list-query results |
| reverse | query | boolean | false | Whether the id of records to be retrieved should be less than the last_id specified. Default to false. |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| page | query | integer(int32) | false | Page number |

#### [#](#detailed-descriptions-7) Detailed descriptions

**reverse**: Whether the id of records to be retrieved should be less than the last\_id specified. Default to false.

When `last_id` is specified. Set `reverse` to `true` to trace back trading history; `false` to retrieve latest tradings.

No effect if `last_id` is not specified.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | string | Trade ID |
| » create_time | string | Trading time |
| » create_time_ms | string | Trading time, with millisecond precision |
| » currency_pair | string | Currency pair |
| » side | string | Order side |
| » role | string | Trade role. No value in public endpoints |
| » amount | string | Trade amount |
| » price | string | Order price |
| » order_id | string | Related order ID. No value in public endpoints |
| » fee | string | Fee deducted. No value in public endpoints |
| » fee_currency | string | Fee currency unit. No value in public endpoints |
| » point_fee | string | Points used to deduct fee. No value in public endpoints |
| » gt_fee | string | GT used to deduct fee. No value in public endpoints |
| » amend_text | string | The custom data that the user remarked when amending the order |
| » sequence_id | string | Represents a unique and consecutive trade ID within a single market.It is used to track and identify trades in the specific market |
| » text | string | User defined information. No value in public endpoints |

#### [#](#enumerated-values-6) Enumerated Values

| Property | Value |
| --- | --- |
| side | buy |
| side | sell |
| role | taker |
| role | maker |

This operation does not require authentication

## [#](#market-candlesticks) Market candlesticks

`GET /spot/candlesticks`

_Market candlesticks_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | true | Currency pair |
| limit | query | integer | false | Maximum recent data points to return. limit is conflicted with from and to. If either from or to is specified, request will be rejected. |
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default toto - 100 * interval if not specified |
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |
| interval | query | string | false | Interval time between data points. Note that 30d means 1 natual month, not 30 days |

#### [#](#enumerated-values-7) Enumerated Values

| Parameter | Value |
| --- | --- |
| interval | 10s |
| interval | 1m |
| interval | 5m |
| interval | 15m |
| interval | 30m |
| interval | 1h |
| interval | 4h |
| interval | 8h |
| interval | 1d |
| interval | 7d |
| interval | 30d |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [[string]] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | array | K-line data for each time granularity, arranged from left to right:- Unix timestamp with second precision- Trading volume in quote currency- Closing price- Highest price- Lowest price- Opening price- Trading volume in base currency- Whether the window is closed; true indicates the end of this segment of candlestick chart data, false indicates that this segment of candlestick chart data is not yet complete |

This operation does not require authentication

## [#](#query-user-trading-fee-rates) Query user trading fee rates

`GET /spot/fee`

_Query user trading fee rates_

This API is deprecated in favour of new fee retrieving API `/wallet/fee`.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Specify a currency pair to retrieve precise fee rate |

#### [#](#detailed-descriptions-8) Detailed descriptions

**currency\_pair**: Specify a currency pair to retrieve precise fee rate

This field is optional. In most cases, the fee rate is identical among all currency pairs

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | integer(int64) | User ID |
| » taker_fee | string | taker fee rate |
| » maker_fee | string | maker fee rate |
| » gt_discount | boolean | If GT deduction is enabled |
| » gt_taker_fee | string | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |
| » gt_maker_fee | string | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |
| » loan_fee | string | Loan fee rate of margin lending |
| » point_type | string | Point type. 0 - Initial version. 1 - new version since 202009 |
| » currency_pair | string | Currency pair |
| » debit_fee | integer | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-a-batch-of-user-trading-fee-rates) Query a batch of user trading fee rates

`GET /spot/batch_fee`

_Query a batch of user trading fee rates_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pairs | query | string | true | A request can only query up to 50 currency pairs |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » additionalProperties | object | none |
| »» user_id | integer(int64) | User ID |
| »» taker_fee | string | taker fee rate |
| »» maker_fee | string | maker fee rate |
| »» gt_discount | boolean | If GT deduction is enabled |
| »» gt_taker_fee | string | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |
| »» gt_maker_fee | string | Maker fee rate if using GT deduction. It will be 0 if GT deduction is disabled |
| »» loan_fee | string | Loan fee rate of margin lending |
| »» point_type | string | Point type. 0 - Initial version. 1 - new version since 202009 |
| »» currency_pair | string | Currency pair |
| »» debit_fee | integer | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-spot-accounts) List spot accounts

`GET /spot/accounts`

_List spot accounts_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » available | string | Available amount |
| » locked | string | Locked amount, used in trading |
| » update_id | integer(int64) | Version number |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book) Query account book

`GET /spot/account_book`

_Query account book_

Record query time range is not allowed to exceed 30 days.

The maximum number of pages when searching data using limit&page paging function is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| type | query | string | false | Only retrieve changes of the specified type. All types will be returned if not specified. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Balance change record ID |
| » time | integer(int64) | The timestamp of the change (in milliseconds) |
| » currency | string | Currency changed |
| » change | string | Amount changed. Positive value means transferring in, while negative out |
| » balance | string | Balance after change |
| » type | string | Account book type. Please refer to account book type for more detail |
| » text | string | Additional information |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-batch-of-orders) Create a batch of orders

`POST /spot/batch_orders`

_Create a batch of orders_

Batch orders requirements:

1.  custom order field `text` is required
2.  At most 4 currency pairs, maximum 10 orders each, are allowed in one request
3.  No mixture of spot orders and margin orders, i.e. `account` must be identical for all orders

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | array[Order] | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Request is completed | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Batch order details] |
| » None | object | Batch order details |
| »» order_id | string | Order ID |
| »» amend_text | string | The custom data that the user remarked when amending the order |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| »» succeeded | boolean | Whether the batch of orders succeeded |
| »» label | string | Error label, if any, otherwise an empty string |
| »» message | string | Detailed error message, if any, otherwise an empty string |
| »» id | string | Order ID |
| »» create_time | string | Creation time of order |
| »» update_time | string | Last modification time of order |
| »» create_time_ms | integer(int64) | Creation time of order (in milliseconds) |
| »» update_time_ms | integer(int64) | Last modification time of order (in milliseconds) |
| »» status | string | Order status- open: to be filled- closed: filled- cancelled: cancelled |
| »» currency_pair | string | Currency pair |
| »» type | string | Order Type- limit : Limit Order- market : Market Order |
| »» account | string | Account type, spot - spot account, margin - leveraged account, unified - unified account |
| »» side | string | Order side |
| »» amount | string | Trade amount |
| »» price | string | Order price |
| »» time_in_force | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or none |
| »» iceberg | string | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |
| »» auto_repay | boolean | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:1. This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.2. auto_borrow and auto_repay can be both set to true in one order. |
| »» left | string | Amount left to fill |
| »» filled_amount | string | Amount traded to fill |
| »» fill_price | string | Total filled in quote currency. Deprecated in favor of filled_total |
| »» filled_total | string | Total filled in quote currency |
| »» avg_deal_price | string | Average fill price |
| »» fee | string | Fee deducted |
| »» fee_currency | string | Fee currency unit |
| »» point_fee | string | Points used to deduct fee |
| »» gt_fee | string | GT used to deduct fee |
| »» gt_discount | boolean | Whether GT fee discount is used |
| »» rebated_fee | string | Rebated fee |
| »» rebated_fee_currency | string | Rebated fee currency unit |
| »» stp_id | integer | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |
| »» stp_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| »» finish_as | string | How the order was finished.- open: processing- filled: filled totally- cancelled: manually cancelled- ioc: time in force is IOC, finish immediately- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-8) Enumerated Values

| Property | Value |
| --- | --- |
| status | open |
| status | closed |
| status | cancelled |
| type | limit |
| type | market |
| account | spot |
| account | margin |
| account | cross_margin |
| account | unified |
| side | buy |
| side | sell |
| time_in_force | gtc |
| time_in_force | ioc |
| time_in_force | poc |
| time_in_force | fok |
| stp_act | cn |
| stp_act | co |
| stp_act | cb |
| stp_act | - |
| finish_as | open |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | ioc |
| finish_as | stp |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-open-orders) List all open orders

`GET /spot/open_orders`

_List all open orders_

Query the current order list of all trading pairs. Please note that the paging parameter controls the number of pending orders in each trading pair. There is no paging control for the number of trading pairs. All trading pairs with pending orders will be returned.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records returned in one page in each currency pair |
| account | query | string | false | Specify query account. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency_pair | string | Currency pair |
| » total | integer | The total number of pending orders for this trading pair on the current page |
| » orders | array | none |
| »» None | object | Spot order details |
| »»» id | string | Order ID |
| »»» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- 101: from android- 102: from IOS- 103: from IPAD- 104: from webapp- 3: from web- 2: from apiv2- apiv4: from apiv4 |
| »»» amend_text | string | The custom data that the user remarked when amending the order |
| »»» create_time | string | Creation time of order |
| »»» update_time | string | Last modification time of order |
| »»» create_time_ms | integer(int64) | Creation time of order (in milliseconds) |
| »»» update_time_ms | integer(int64) | Last modification time of order (in milliseconds) |
| »»» status | string | Order status- open: to be filled- closed: filled- cancelled: cancelled |
| »»» currency_pair | string | Currency pair |
| »»» type | string | Order Type- limit : Limit Order- market : Market Order |
| »»» account | string | Account type, spot - spot account, margin - leveraged account, unified - unified account |
| »»» side | string | Order side |
| »»» amount | string | When type is limit, it refers to base currency. For instance, BTC_USDT means BTCWhen type is market, it refers to different currency according to side- side : buy means quote currency, BTC_USDT means USDT- side : sell means base currency，BTC_USDT means BTC |
| »»» price | string | Price can't be empty when type= limit |
| »»» time_in_force | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or noneOnly ioc and fok are supported when type=market |
| »»» iceberg | string | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |
| »»» auto_repay | boolean | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:1. This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.2. auto_borrow and auto_repay can be both set to true in one order. |
| »»» left | string | Amount left to fill |
| »»» filled_amount | string | Amount traded to fill |
| »»» fill_price | string | Total filled in quote currency. Deprecated in favor of filled_total |
| »»» filled_total | string | Total filled in quote currency |
| »»» avg_deal_price | string | Average fill price |
| »»» fee | string | Fee deducted |
| »»» fee_currency | string | Fee currency unit |
| »»» point_fee | string | Points used to deduct fee |
| »»» gt_fee | string | GT used to deduct fee |
| »»» gt_maker_fee | string | GT used to deduct maker fee |
| »»» gt_taker_fee | string | GT used to deduct taker fee |
| »»» gt_discount | boolean | Whether GT fee discount is used |
| »»» rebated_fee | string | Rebated fee |
| »»» rebated_fee_currency | string | Rebated fee currency unit |
| »»» stp_id | integer | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |
| »»» stp_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| »»» finish_as | string | Order completion statuses include:- open: Awaiting processing- filled: Fully filled- cancelled: Cancelled by user- liquidate_cancelled: Cancelled due to liquidation- small: Order quantity too small- depth_not_enough: Cancelled due to insufficient market depth- trader_not_enough: Cancelled due to insufficient counterparty- ioc: Not immediately filled because tif is set to ioc- poc: Not met the order strategy because tif is set to poc- fok: Not fully filled immediately because tif is set to fok- stp: Cancelled due to self-trade prevention- unknown: Unknown |

#### [#](#enumerated-values-9) Enumerated Values

| Property | Value |
| --- | --- |
| status | open |
| status | closed |
| status | cancelled |
| type | limit |
| type | market |
| side | buy |
| side | sell |
| time_in_force | gtc |
| time_in_force | ioc |
| time_in_force | poc |
| time_in_force | fok |
| stp_act | cn |
| stp_act | co |
| stp_act | cb |
| stp_act | - |
| finish_as | open |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidate_cancelled |
| finish_as | depth_not_enough |
| finish_as | trader_not_enough |
| finish_as | small |
| finish_as | ioc |
| finish_as | poc |
| finish_as | fok |
| finish_as | stp |
| finish_as | unknown |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#close-position-when-cross-currency-is-disabled) close position when cross-currency is disabled

`POST /spot/cross_liquidate_orders`

_close position when cross-currency is disabled_

Currently, only cross-margin accounts are supported to close position when cross currencies are disabled. Maximum buy quantity = (unpaid principal and interest - currency balance - the amount of the currency in the order book) / 0.998

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |
| » currency_pair | body | string | true | Currency pair |
| » amount | body | string | true | Trade amount |
| » price | body | string | true | Order price |
| » action_mode | body | string | false | Processing Mode: |

#### [#](#detailed-descriptions-9) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

**» action\_mode**: Processing Mode:

Different fields are returned when placing an order based on action\_mode. This field is only valid during the request, and it is not included in the response result ACK: Asynchronous mode, only returns key order fields RESULT: No clearing information FULL: Full mode (default)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | order created | Order |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-order) Create an order

`POST /spot/orders`

_Create an order_

Support spot, margin, leverage, and full-position leverage orders. Use different accounts through the `account` field, default is `spot`, that is, use the spot account to place an order if the user is `unified` account, default is to place an order with a unified account

When using leveraged account trading, that is, when `account` is set to `margin`, you can set `auto_borrow` to `true`, In the case of insufficient account balance, the system will automatically execute the `POST /margin/uni/loans` to borrow the insufficient part. Whether the assets obtained after the leveraged order is automatically used to return the borrowing orders of the leveraged account in a position-by-store leverage account depends on the automatic repayment settings of the user's position-by-store leverage account\*\*, The account automatic repayment settings can be queried and set through `/margin/auto_repay`.

Use unified account transactions, that is, when `account` is set to `unified`, `auto_borrow` " can also be enableTo realize the insufficient part of automatic borrowing, but unlike the leverage account, whether the entrustment of a unified account is automatically repayable depends on the when placing an order`auto_repay` setting, this setting is only effective for the current entrustment, that is, only the assets obtained after the entrustment transaction will be used to repay the borrowing orders of the full-position leverage account. Unified account ordering currently supports `auto_borrow` and `auto_repay` at the same time.

Auto repayment will be triggered at the end of the order, i.e. `status` is `cancelled` or `closed` .

**Delegation Status**

The entrustment status in the pending order is `open`, which remains at `open` until all the quantity is traded. If it is eaten, the order ends and the status becomes `closed`. If the order is cancelled before all transactions are completed, regardless of whether there are partial transactions, the status will become `cancelled`

**Iceberg Entrustment**

`iceberg` is used to set the number of iceberg delegations displayed, and does not support complete hiding. Note that when hidden part of the transaction is charged according to the taker's handling rate.

**Restrict user transactions**

Set `stp_act` to decide to use strategies that limit user transactions

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | Order | true | none |
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |
| » currency_pair | body | string | true | Currency pair |
| » type | body | string | false | Order Type |
| » account | body | string | false | Account type, spot - spot account, margin - leveraged account, unified - unified account |
| » side | body | string | true | Order side |
| » amount | body | string | true | When type is limit, it refers to base currency. For instance, BTC_USDT means BTC |
| » price | body | string | false | Price can't be empty when type= limit |
| » time_in_force | body | string | false | Time in force |
| » iceberg | body | string | false | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |
| » auto_borrow | body | boolean | false | Used in margin or cross margin trading to allow automatic loan of insufficient amount if balance is not enough. |
| » auto_repay | body | boolean | false | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that: |
| » stp_act | body | string | false | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies |
| » action_mode | body | string | false | Processing Mode: |

#### [#](#detailed-descriptions-10) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

Besides user defined information, reserved contents are listed below, denoting how the order is created:

*   101: from android
*   102: from IOS
*   103: from IPAD
*   104: from webapp
*   3: from web
*   2: from apiv2
*   apiv4: from apiv4

**» type**: Order Type

*   limit : Limit Order
*   market : Market Order

**» amount**: When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC` When `type` is `market`, it refers to different currency according to `side`

*   `side` : `buy` means quote currency, `BTC_USDT` means `USDT`
*   `side` : `sell` means base currency，`BTC_USDT` means `BTC`

**» time\_in\_force**: Time in force

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled, taker only
*   poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee
*   fok: FillOrKill, fill either completely or none Only `ioc` and `fok` are supported when `type`\=`market`

**» auto\_repay**: Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:

1.  This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.
2.  `auto_borrow` and `auto_repay` can be both set to true in one order.

**» stp\_act**: Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies

1.  After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。
2.  When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。
3.  If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'

*   cn: Cancel newest, Cancel new orders and keep old ones
*   co: Cancel oldest, Cancel old orders and keep new ones
*   cb: Cancel both, Both old and new orders will be cancelled

**» action\_mode**: Processing Mode: When placing an order, different fields are returned based on action\_mode. This field is only valid during the request and is not included in the response result ACK: Asynchronous mode, only returns key order fields RESULT: No clearing information FULL: Full mode (default)

#### [#](#enumerated-values-10) Enumerated Values

| Parameter | Value |
| --- | --- |
| » type | limit |
| » type | market |
| » side | buy |
| » side | sell |
| » time_in_force | gtc |
| » time_in_force | ioc |
| » time_in_force | poc |
| » time_in_force | fok |
| » stp_act | cn |
| » stp_act | co |
| » stp_act | cb |
| » stp_act | - |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order created. | Order |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-orders) List orders

`GET /spot/orders`

_List orders_

Note that the query results are spot order lists for spot, unified account and warehouse-by-site leverage accounts by default.

`status` is set to `open`, that is, when querying the pending order list, only pagination control of `page` and `limit` is supported. `limit` Maximum setting is only allowed to 100 . The `side` and `from`, `to` parameters for time range query are not supported.

`status` is set to `finished`, that is, when querying historical delegations, in addition to pagination queries, `from` and `to` are also supported by time range queries. In addition, it supports setting the `side` parameter to filter one-side history.

The parameters of the time range filtering are processed according to the order end time.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | true | Retrieve results with specified currency pair. It is required for open orders, but optional for finished ones. |
| status | query | string | true | List orders based on status |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned. If status is open, maximum of limit is 100 |
| account | query | string | false | Specify query account. |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| side | query | string | false | All bids or asks. Both included if not specified |

#### [#](#detailed-descriptions-11) Detailed descriptions

**status**: List orders based on status

`open` - order is waiting to be filled `finished` - order has been filled or cancelled

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Order] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-in-specified-currency-pair) Cancel all `open` orders in specified currency pair

`DELETE /spot/orders`

_Cancel all `open` orders in specified currency pair_

When the `account` parameter is not specified, all pending orders including spot, unified account, and position-by-position leverage will be cancelled. When `currency_pair` is not specified, all transaction pairs are revoked You can specify a certain account separately to cancel all orders under the specified account

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Currency pair |
| side | query | string | false | All bids or asks. Both included if not specified |
| account | query | string | false | Specify Account Type |
| action_mode | query | string | false | Processing Mode |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |

#### [#](#detailed-descriptions-12) Detailed descriptions

**account**: Specify Account Type

*   Classic Account: If not specified, all include
*   Unified Account: Specify `unified`

**action\_mode**: Processing Mode

When placing an order, different fields are returned based on the action\_mode

*   ACK: Asynchronous mode, returns only key order fields
*   RESULT: No clearing information
*   FULL: Full mode (default)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Batch cancellation request accepted. Query order status by listing orders | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Spot order details |
| »» id | string | Order ID |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- 101: from android- 102: from IOS- 103: from IPAD- 104: from webapp- 3: from web- 2: from apiv2- apiv4: from apiv4 |
| »» amend_text | string | The custom data that the user remarked when amending the order |
| »» succeeded | boolean | Whether the batch of orders succeeded |
| »» label | string | Error label, if any, otherwise an empty string |
| »» message | string | Detailed error message, if any, otherwise an empty string |
| »» create_time | string | Creation time of order |
| »» update_time | string | Last modification time of order |
| »» create_time_ms | integer(int64) | Creation time of order (in milliseconds) |
| »» update_time_ms | integer(int64) | Last modification time of order (in milliseconds) |
| »» status | string | Order status- open: to be filled- closed: filled- cancelled: cancelled |
| »» currency_pair | string | Currency pair |
| »» type | string | Order Type- limit : Limit Order- market : Market Order |
| »» account | string | Account type, spot - spot account, margin - leveraged account, unified - unified account |
| »» side | string | Order side |
| »» amount | string | When type is limit, it refers to base currency. For instance, BTC_USDT means BTCWhen type is market, it refers to different currency according to side- side : buy means quote currency, BTC_USDT means USDT- side : sell means base currency，BTC_USDT means BTC |
| »» price | string | Price can't be empty when type= limit |
| »» time_in_force | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or noneOnly ioc and fok are supported when type=market |
| »» iceberg | string | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |
| »» auto_repay | boolean | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:1. This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.2. auto_borrow and auto_repay can be both set to true in one order. |
| »» left | string | Amount left to fill |
| »» filled_amount | string | Amount traded to fill |
| »» fill_price | string | Total filled in quote currency. Deprecated in favor of filled_total |
| »» filled_total | string | Total filled in quote currency |
| »» avg_deal_price | string | Average fill price |
| »» fee | string | Fee deducted |
| »» fee_currency | string | Fee currency unit |
| »» point_fee | string | Points used to deduct fee |
| »» gt_fee | string | GT used to deduct fee |
| »» gt_maker_fee | string | GT used to deduct maker fee |
| »» gt_taker_fee | string | GT used to deduct taker fee |
| »» gt_discount | boolean | Whether GT fee discount is used |
| »» rebated_fee | string | Rebated fee |
| »» rebated_fee_currency | string | Rebated fee currency unit |
| »» stp_id | integer | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |
| »» stp_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| »» finish_as | string | How the order was finished.- open: processing- filled: filled totally- cancelled: manually cancelled- ioc: time in force is IOC, finish immediately- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-11) Enumerated Values

| Property | Value |
| --- | --- |
| status | open |
| status | closed |
| status | cancelled |
| type | limit |
| type | market |
| side | buy |
| side | sell |
| time_in_force | gtc |
| time_in_force | ioc |
| time_in_force | poc |
| time_in_force | fok |
| stp_act | cn |
| stp_act | co |
| stp_act | cb |
| stp_act | - |
| finish_as | open |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | ioc |
| finish_as | stp |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-batch-of-orders-with-an-id-list) Cancel a batch of orders with an ID list

`POST /spot/cancel_batch_orders`

_Cancel a batch of orders with an ID list_

Multiple currency pairs can be specified, but maximum 20 orders are allowed per request

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | array[CancelBatchOrder] | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Batch cancellation completed | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » CancelOrderResult | object | Order cancellation result |
| »» currency_pair | string | Order currency pair |
| »» id | string | Order ID |
| »» text | string | Custom order information |
| »» succeeded | boolean | Whether cancellation succeeded |
| »» label | string | Error label when failed to cancel the order; emtpy if succeeded |
| »» message | string | Error message when failed to cancel the order; empty if succeeded |
| »» account | string | Default is empty (deprecated) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order) Get a single order

`GET /spot/orders/{order_id}`

_Get a single order_

By default, orders for spot, unified account and warehouse-by-site leverage account are checked.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | string | true | The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the text field). |
| currency_pair | query | string | true | Specify the transaction pair to query. If you are querying pending order records, this field is required. If you are querying traded records, this field can be left blank. |
| account | query | string | false | Specify query account. |

#### [#](#detailed-descriptions-13) Detailed descriptions

**order\_id**: The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the `text` field). Operations based on custom IDs can only be checked in pending orders. Only order ID can be used after the order is finished (transaction/cancel)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Detail retrieved | Order |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-an-order) Amend an order

`PATCH /spot/orders/{order_id}`

_Amend an order_

By default modify orders for spot, unified account and leverage account.

At present, both the request body and query support currency\_pair and account parameters, but the request body has higher priority

currency\_pair must be filled in the request body or query

Currently, only the price or quantity modification (choose one of two)

About speed limit: Modify orders and create orders to share speed limit rules

About matching priority: Only modifying the quantity will become smaller and will not affect the priority of matching. If the price is modified or the quantity is modified, the priority will be adjusted to the end of the new price

Precautions: Modification quantity is less than the transaction quantity will trigger the order cancellation operation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | string | true | The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the text field). |
| currency_pair | query | string | false | Currency pair |
| account | query | string | false | Specify query account. |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | object | true | none |
| » currency_pair | body | string | false | Currency pair |
| » account | body | string | false | Specify query account. |
| » amount | body | string | false | New order amount. amount and price must specify one of them |
| » price | body | string | false | New order price. amount and Price must specify one of them" |
| » amend_text | body | string | false | Custom info during amending order |
| » action_mode | body | string | false | Processing Mode: |

#### [#](#detailed-descriptions-14) Detailed descriptions

**order\_id**: The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the `text` field). Operations based on custom IDs can only be checked in pending orders. Only order ID can be used after the order is finished (transaction/cancel)

**» action\_mode**: Processing Mode: When placing an order, different fields are returned based on action\_mode. This field is only valid during the request and is not included in the response result ACK: Asynchronous mode, only returns key order fields RESULT: No clearing information FULL: Full mode (default)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Updated | Order |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order) Cancel a single order

`DELETE /spot/orders/{order_id}`

_Cancel a single order_

By default, orders for spot, unified accounts and leveraged accounts are revoked.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | string | true | The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the text field). |
| currency_pair | query | string | true | Currency pair |
| account | query | string | false | Specify query account. |
| action_mode | query | string | false | Processing Mode |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |

#### [#](#detailed-descriptions-15) Detailed descriptions

**order\_id**: The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the `text` field). Operations based on custom IDs can only be checked in pending orders. Only order ID can be used after the order is finished (transaction/cancel)

**action\_mode**: Processing Mode

When placing an order, different fields are returned based on the action\_mode

*   ACK: Asynchronous mode, returns only key order fields
*   RESULT: No clearing information
*   FULL: Full mode (default)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order cancelled | Order |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history) List personal trading history

`GET /spot/my_trades`

_List personal trading history_

By default query of transaction records for spot, unified account and warehouse-by-site leverage accounts.

The history within a specified time range can be queried by specifying `from` or (and) `to`.

*   If no time parameters are specified, only data for the last 7 days can be obtained.
*   If only any parameter of `from` or `to` is specified, only 7-day data from the start (or end) of the specified time is returned.
*   The range of `from` and `to` is not allowed to exceed 30 days.

The parameters of the time range filter are processed according to the order end time.

The maximum number of pages when searching data using limit&page paging function is 100,000, that is, limit \* (page - 1) <= 100,000.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Retrieve results with specified currency pair |
| limit | query | integer | false | Maximum number of records to be returned in a single list. Default: 100, Minimum: 1, Maximum: 1000 |
| page | query | integer(int32) | false | Page number |
| order_id | query | string | false | Filter trades with specified order ID. currency_pair is also required if this field is present |
| account | query | string | false | Specify query account. |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | string | Trade ID |
| » create_time | string | Trading time |
| » create_time_ms | string | Trading time, with millisecond precision |
| » currency_pair | string | Currency pair |
| » side | string | Order side |
| » role | string | Trade role. No value in public endpoints |
| » amount | string | Trade amount |
| » price | string | Order price |
| » order_id | string | Related order ID. No value in public endpoints |
| » fee | string | Fee deducted. No value in public endpoints |
| » fee_currency | string | Fee currency unit. No value in public endpoints |
| » point_fee | string | Points used to deduct fee. No value in public endpoints |
| » gt_fee | string | GT used to deduct fee. No value in public endpoints |
| » amend_text | string | The custom data that the user remarked when amending the order |
| » sequence_id | string | Represents a unique and consecutive trade ID within a single market.It is used to track and identify trades in the specific market |
| » text | string | User defined information. No value in public endpoints |

#### [#](#enumerated-values-12) Enumerated Values

| Property | Value |
| --- | --- |
| side | buy |
| side | sell |
| role | taker |
| role | maker |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-server-current-time) Get server current time

`GET /spot/time`

_Get server current time_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_SystemTime_

| Name | Type | Description |
| --- | --- | --- |
| » server_time | integer(int64) | Server current time(ms) |

This operation does not require authentication

## [#](#countdown-cancel-orders) Countdown cancel orders

`POST /spot/countdown_cancel_all`

_Countdown cancel orders_

When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled. This endpoint can be called repeatedly to set a new countdown or cancel the countdown. For example, call this endpoint at 30s intervals, each countdown`timeout` is set to 30s. If this endpoint is not called again within 30 seconds, all pending orders on the specified `market` will be automatically cancelled, if no `market` is specified, all market pending orders will be cancelled. If the `timeout` is set to 0 within 30 seconds, the countdown timer will expire and the cacnel function will be cancelled.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » timeout | body | integer(int32) | true | Countdown time, in seconds |
| » currency_pair | body | string | false | Currency pair |

#### [#](#detailed-descriptions-16) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the countdown

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Set countdown successfully | Inline |

### Response Schema

Status Code **200**

_triggerTime_

| Name | Type | Description |
| --- | --- | --- |
| » triggerTime | integer(int64) | Timestamp of the end of the countdown, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modification-of-orders) Batch modification of orders

`POST /spot/amend_batch_orders`

_Batch modification of orders_

By default modify orders for spot, unified account and leverage account. Currently, only the price or quantity modification (choose one of two) Modify unfinished orders, up to 5 orders can be modified in batches at a time. The request parameters should be passed in array format. When the order modification fails during batch modification, the modification of the order will continue to be executed. After execution, the failure information of the corresponding order will be carried The order of calling the batch modification order is consistent with the order list The order of return content of batch modification orders is consistent with the order list

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | array[BatchAmendItem] | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order modification executed successfully | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Batch order details] |
| » None | object | Batch order details |
| »» order_id | string | Order ID |
| »» amend_text | string | The custom data that the user remarked when amending the order |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.) |
| »» succeeded | boolean | Whether the batch of orders succeeded |
| »» label | string | Error label, if any, otherwise an empty string |
| »» message | string | Detailed error message, if any, otherwise an empty string |
| »» id | string | Order ID |
| »» create_time | string | Creation time of order |
| »» update_time | string | Last modification time of order |
| »» create_time_ms | integer(int64) | Creation time of order (in milliseconds) |
| »» update_time_ms | integer(int64) | Last modification time of order (in milliseconds) |
| »» status | string | Order status- open: to be filled- closed: filled- cancelled: cancelled |
| »» currency_pair | string | Currency pair |
| »» type | string | Order Type- limit : Limit Order- market : Market Order |
| »» account | string | Account type, spot - spot account, margin - leveraged account, unified - unified account |
| »» side | string | Order side |
| »» amount | string | Trade amount |
| »» price | string | Order price |
| »» time_in_force | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or none |
| »» iceberg | string | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |
| »» auto_repay | boolean | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:1. This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.2. auto_borrow and auto_repay can be both set to true in one order. |
| »» left | string | Amount left to fill |
| »» filled_amount | string | Amount traded to fill |
| »» fill_price | string | Total filled in quote currency. Deprecated in favor of filled_total |
| »» filled_total | string | Total filled in quote currency |
| »» avg_deal_price | string | Average fill price |
| »» fee | string | Fee deducted |
| »» fee_currency | string | Fee currency unit |
| »» point_fee | string | Points used to deduct fee |
| »» gt_fee | string | GT used to deduct fee |
| »» gt_discount | boolean | Whether GT fee discount is used |
| »» rebated_fee | string | Rebated fee |
| »» rebated_fee_currency | string | Rebated fee currency unit |
| »» stp_id | integer | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |
| »» stp_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| »» finish_as | string | How the order was finished.- open: processing- filled: filled totally- cancelled: manually cancelled- ioc: time in force is IOC, finish immediately- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-13) Enumerated Values

| Property | Value |
| --- | --- |
| status | open |
| status | closed |
| status | cancelled |
| type | limit |
| type | market |
| account | spot |
| account | margin |
| account | cross_margin |
| account | unified |
| side | buy |
| side | sell |
| time_in_force | gtc |
| time_in_force | ioc |
| time_in_force | poc |
| time_in_force | fok |
| stp_act | cn |
| stp_act | co |
| stp_act | cb |
| stp_act | - |
| finish_as | open |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | ioc |
| finish_as | stp |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-spot-insurance-fund-historical-data) Query spot insurance fund historical data

`GET /spot/insurance_history`

_Query spot insurance fund historical data_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| business | query | string | true | Leverage business, margin - position by position; unified - unified account |
| currency | query | string | true | Currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | The maximum number of items returned in the list, the default value is 30 |
| from | query | integer(int64) | true | Start timestamp, seconds |
| to | query | integer(int64) | true | End timestamp, in seconds |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency |
| » balance | string | balance |
| » time | integer(int64) | Creation time, timestamp, milliseconds |

This operation does not require authentication

## [#](#create-a-price-triggered-order) Create a price-triggered order

`POST /spot/price_orders`

_Create a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | SpotPriceTriggeredOrder | true | none |
| » trigger | body | object | true | none |
| »» price | body | string | true | Trigger price |
| »» rule | body | string | true | Price trigger condition |
| »» expiration | body | integer | true | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |
| » put | body | object | true | none |
| »» type | body | string | false | Order type，default to limit |
| »» side | body | string | true | Order side |
| »» price | body | string | true | Order price |
| »» amount | body | string | true | When type is limit, it refers to base currency. For instance, BTC_USDT means BTC |
| »» account | body | string | true | Trading account type. Portfolio margin account must set to unified |
| »» time_in_force | body | string | false | time_in_force |
| »» auto_borrow | body | boolean | false | Whether to borrow coins automatically |
| »» auto_repay | body | boolean | false | Whether to repay the loan automatically |
| »» text | body | string | false | The source of the order, including: |
| » market | body | string | true | Currency pair |

#### [#](#detailed-descriptions-17) Detailed descriptions

**»» rule**: Price trigger condition

*   > \=: triggered when market price larger than or equal to `price` field
    
*   <=: triggered when market price less than or equal to `price` field

**»» type**: Order type，default to `limit`

*   limit : Limit Order
*   market : Market Order

**»» side**: Order side

*   buy: buy side
*   sell: sell side

**»» amount**: When `type` is limit, it refers to base currency. For instance, `BTC_USDT` means `BTC` When `type` is `market`, it refers to different currency according to `side`

*   `side` : `buy` means quote currency, `BTC_USDT` means `USDT`
*   `side` : `sell` means base currency，`BTC_USDT` means `BTC`

**»» account**: Trading account type. Portfolio margin account must set to `unified`

*   normal: spot trading
*   margin: margin trading
*   unified: unified trading

**»» time\_in\_force**: time\_in\_force

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled, taker only

**»» text**: The source of the order, including:

*   web: web
*   api: api
*   app: app

#### [#](#enumerated-values-14) Enumerated Values

| Parameter | Value |
| --- | --- |
| »» rule | >= |
| »» rule | <= |
| »» type | limit |
| »» type | market |
| »» side | buy |
| »» side | sell |
| »» account | normal |
| »» account | margin |
| »» account | unified |
| »» time_in_force | gtc |
| »» time_in_force | ioc |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order created | Inline |

### Response Schema

Status Code **201**

_TriggerOrderResponse_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Auto order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-running-auto-order-list) Retrieve running auto order list

`GET /spot/price_orders`

_Retrieve running auto order list_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| status | query | string | true | Only list the orders with this status |
| market | query | string | false | Currency pair |
| account | query | string | false | Trading account type. Portfolio margin account must set to unified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

#### [#](#enumerated-values-15) Enumerated Values

| Parameter | Value |
| --- | --- |
| status | open |
| status | finished |
| account | normal |
| account | margin |
| account | unified |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [SpotPriceTriggeredOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders) Cancel All Price-triggered Orders

`DELETE /spot/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| market | query | string | false | Currency pair |
| account | query | string | false | Trading account type. Portfolio margin account must set to unified |

#### [#](#enumerated-values-16) Enumerated Values

| Parameter | Value |
| --- | --- |
| account | normal |
| account | margin |
| account | unified |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Batch cancellation request accepted. Query order status by listing orders | [SpotPriceTriggeredOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order) Get a price-triggered order

`GET /spot/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Auto order detail | SpotPriceTriggeredOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order) cancel a price-triggered order

`DELETE /spot/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Auto order detail | SpotPriceTriggeredOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#margin) Margin

Margin API; margin trading uses spot trading API

## [#](#margin-account-list) Margin account list

`GET /margin/accounts`

_Margin account list_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Currency pair |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Margin account detail. base refers to base currency, while `quotes to quote currency |
| »» currency_pair | string | Currency pair |
| »» locked | boolean | Whether account is locked |
| »» risk | string | Current risk rate of margin account |
| »» base | object | Account currency details |
| »»» currency | string | Currency name |
| »»» available | string | Amount suitable for margin trading. |
| »»» locked | string | Locked amount, used in margin trading |
| »»» borrowed | string | Borrowed amount |
| »»» interest | string | Unpaid interests |
| »» quote | object | Account currency details |
| »»» currency | string | Currency name |
| »»» available | string | Amount suitable for margin trading. |
| »»» locked | string | Locked amount, used in margin trading |
| »»» borrowed | string | Borrowed amount |
| »»» interest | string | Unpaid interests |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-margin-account-balance-change-history) List margin account balance change history

`GET /margin/account_book`

_List margin account balance change history_

Only transferals from and to margin account are provided for now. Time range allows 30 days at most

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | List records related to specified currency only. If specified, currency_pair is also required. |
| currency_pair | query | string | false | List records related to specified currency pair. Used in combination with currency. Ignored if currency is not provided |
| type | query | string | false | Only retrieve changes of the specified type. All types will be returned if not specified. |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Balance change record ID |
| » time | string | Balance changed timestamp |
| » time_ms | integer(int64) | The timestamp of the change (in milliseconds) |
| » currency | string | Currency changed |
| » currency_pair | string | Account currency pair |
| » change | string | Amount changed. Positive value means transferring in, while negative out |
| » balance | string | Balance after change |
| » type | string | Account book type. Please refer to account book type for more detail |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#funding-account-list) Funding account list

`GET /margin/funding_accounts`

_Funding account list_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency name |
| » available | string | Available assets to lend, which is identical to spot account available |
| » locked | string | Locked amount. i.e. amount in open loans |
| » lent | string | Outstanding loan amount yet to be repaid |
| » total_lent | string | Amount used for lending. total_lent = lent + locked |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-user-s-auto-repayment-setting) Update user's auto repayment setting

`POST /margin/auto_repay`

_Update user's auto repayment setting_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| status | query | string | true | New auto repayment status. on - enabled, off - disabled |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Current auto repayment setting | Inline |

### Response Schema

Status Code **200**

_AutoRepaySetting_

| Name | Type | Description |
| --- | --- | --- |
| » status | string | Auto repayment status. on - enabled, off - disabled |

#### [#](#enumerated-values-17) Enumerated Values

| Property | Value |
| --- | --- |
| status | on |
| status | off |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-user-auto-repayment-setting) Retrieve user auto repayment setting

`GET /margin/auto_repay`

_Retrieve user auto repayment setting_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Current auto repayment setting | Inline |

### Response Schema

Status Code **200**

_AutoRepaySetting_

| Name | Type | Description |
| --- | --- | --- |
| » status | string | Auto repayment status. on - enabled, off - disabled |

#### [#](#enumerated-values-18) Enumerated Values

| Property | Value |
| --- | --- |
| status | on |
| status | off |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-max-transferable-amount-for-a-specific-margin-currency) Get the max transferable amount for a specific margin currency

`GET /margin/transferable`

_Get the max transferable amount for a specific margin currency_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Retrieve data of the specified currency |
| currency_pair | query | string | false | Currency pair |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_MarginTransferable_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » currency_pair | string | Currency pair |
| » amount | string | Max transferable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#currencies-supported-by-cross-margin-deprecated) Currencies supported by cross margin.(deprecated)

`GET /margin/cross/currencies`

_Currencies supported by cross margin.(deprecated)_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » name | string | Currency name |
| » rate | string | Minimum lending rate (hourly rate) |
| » prec | string | Currency precision |
| » discount | string | Currency value discount, which is used in total value calculation |
| » min_borrow_amount | string | Minimum currency borrow amount. Unit is currency itself |
| » user_max_borrow_amount | string | Maximum borrow value allowed per user, in USDT |
| » total_max_borrow_amount | string | Maximum borrow value allowed for this currency, in USDT |
| » price | string | Price change between this currency and USDT |
| » loanable | boolean | Whether currency is borrowed |
| » status | integer | status- 0 : disable- 1 : enable |

This operation does not require authentication

## [#](#retrieve-detail-of-one-single-currency-supported-by-cross-margin-deprecated) Retrieve detail of one single currency supported by cross margin. (deprecated)

`GET /margin/cross/currencies/{currency}`

_Retrieve detail of one single currency supported by cross margin. (deprecated)_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | path | string | true | Currency name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » name | string | Currency name |
| » rate | string | Minimum lending rate (hourly rate) |
| » prec | string | Currency precision |
| » discount | string | Currency value discount, which is used in total value calculation |
| » min_borrow_amount | string | Minimum currency borrow amount. Unit is currency itself |
| » user_max_borrow_amount | string | Maximum borrow value allowed per user, in USDT |
| » total_max_borrow_amount | string | Maximum borrow value allowed for this currency, in USDT |
| » price | string | Price change between this currency and USDT |
| » loanable | boolean | Whether currency is borrowed |
| » status | integer | status- 0 : disable- 1 : enable |

This operation does not require authentication

## [#](#retrieve-cross-margin-account-deprecated) Retrieve cross margin account. (deprecated)

`GET /margin/cross/accounts`

_Retrieve cross margin account. (deprecated)_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user_id | integer(int64) | User ID |
| » refresh_time | integer(int64) | Time of the most recent refresh |
| » locked | boolean | Whether account is locked |
| » balances | object | none |
| »» CrossMarginBalance | object | none |
| »»» available | string | Available amount |
| »»» freeze | string | Locked amount |
| »»» borrowed | string | Borrowed amount |
| »»» interest | string | Unpaid interests |
| »»» negative_liab | string | Negative Liabilities. Formula:Min[available+total+unrealized_pnl,0] |
| »»» futures_pos_liab | string | Borrowing to Open Positions in Futures |
| »»» equity | string | Equity. Formula: available + freeze - borrowed + futures account's total + unrealized_pnl |
| »»» total_freeze | string | Total freeze. Formula: freeze + position_initial_margin + order_margin |
| »»» total_liab | string | Total liabilities. Formula: Max[Abs[Min[quity - total_freeze,0], borrowed]] - futures_pos_liab |
| »» total | string | Total account value in USDT, i.e., the sum of all currencies' (available+freeze)*price*discount |
| »» borrowed | string | Total borrowed value in USDT, i.e., the sum of all currencies' borrowed*price*discount |
| »» interest | string | Total unpaid interests in USDT, i.e., the sum of all currencies' interest*price*discount |
| »» risk | string | Risk rate. When it belows 110%, liquidation will be triggered. Calculation formula: total / (borrowed+interest) |
| »» total_initial_margin | string | Total initial margin |
| »» total_margin_balance | string | Total Margin Balance (∑(positive equity ＊ index price * discount) + ∑(negative equity * index price)) |
| »» total_maintenance_margin | string | Total maintenance margin |
| »» total_initial_margin_rate | string | Total initial margin rate |
| »» total_maintenance_margin_rate | string | Total maintenance margin rate |
| »» total_available_margin | string | Total available margin |
| »» portfolio_margin_total | string | Total amount of the portfolio margin account |
| »» portfolio_margin_total_liab | string | Total liabilities of the portfolio margin account |
| »» portfolio_margin_total_equity | string | Total equity of the portfolio margin account |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-cross-margin-account-change-history-deprecated) Retrieve cross margin account change history. (deprecated)

`GET /margin/cross/account_book`

_Retrieve cross margin account change history. (deprecated)_

The record query time range is not allowed to exceed 30 days.

When using the limit&page paging function to retrieve data, the maximum number of pages is 100,000, that is, (limit page - 1) <= 100000.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Filter by currency |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| type | query | string | false | Only retrieve changes of the specified type. All types will be returned if not specified. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Balance change record ID |
| » time | integer(int64) | The timestamp of the change (in milliseconds) |
| » currency | string | Currency changed |
| » change | string | Amount changed. Positive value means transferring in, while negative out |
| » balance | string | Balance after change |
| » type | string | Account book type. Please refer to account book type for more detail |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-cross-margin-borrow-loan-deprecated) Create a cross margin borrow loan. (deprecated)

`POST /margin/cross/loans`

_Create a cross margin borrow loan. (deprecated)_

Borrow amount cannot be less than currency minimum borrow amount

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Currency name |
| » amount | body | string | true | Borrowed amount |
| » text | body | string | false | User defined custom ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully borrowed | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Loan record ID |
| » create_time | integer(int64) | Creation timestamp, in milliseconds |
| » update_time | integer(int64) | Update timestamp, in milliseconds |
| » currency | string | Currency name |
| » amount | string | Borrowed amount |
| » text | string | User defined custom ID |
| » status | integer(int32) | Deprecated. Currently, all statuses have been set to 2.Borrow loan status, which includes:- 1: failed to borrow- 2: borrowed but not repaid- 3: repayment complete |
| » repaid | string | Repaid amount |
| » repaid_interest | string | Repaid interest |
| » unpaid_interest | string | Outstanding interest yet to be paid |

#### [#](#enumerated-values-19) Enumerated Values

| Property | Value |
| --- | --- |
| status | 1 |
| status | 2 |
| status | 3 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-cross-margin-borrow-history-deprecated) List cross margin borrow history. (deprecated)

`GET /margin/cross/loans`

_List cross margin borrow history. (deprecated)_

Sort by creation time in descending order by default. Set `reverse=false` to return ascending results.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| status | query | integer | true | Filter by status. Supported values are 2 and 3. (deprecated.) |
| currency | query | string | false | Filter by currency |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| reverse | query | boolean | false | Whether to sort in descending order, which is the default. Set reverse=false to return ascending results |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | string | Loan record ID |
| » create_time | integer(int64) | Creation timestamp, in milliseconds |
| » update_time | integer(int64) | Update timestamp, in milliseconds |
| » currency | string | Currency name |
| » amount | string | Borrowed amount |
| » text | string | User defined custom ID |
| » status | integer(int32) | Deprecated. Currently, all statuses have been set to 2.Borrow loan status, which includes:- 1: failed to borrow- 2: borrowed but not repaid- 3: repayment complete |
| » repaid | string | Repaid amount |
| » repaid_interest | string | Repaid interest |
| » unpaid_interest | string | Outstanding interest yet to be paid |

#### [#](#enumerated-values-20) Enumerated Values

| Property | Value |
| --- | --- |
| status | 1 |
| status | 2 |
| status | 3 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-single-borrow-loan-detail-deprecated) Retrieve single borrow loan detail. (deprecated)

`GET /margin/cross/loans/{loan_id}`

_Retrieve single borrow loan detail. (deprecated)_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| loan_id | path | string | true | Borrow loan ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Loan record ID |
| » create_time | integer(int64) | Creation timestamp, in milliseconds |
| » update_time | integer(int64) | Update timestamp, in milliseconds |
| » currency | string | Currency name |
| » amount | string | Borrowed amount |
| » text | string | User defined custom ID |
| » status | integer(int32) | Deprecated. Currently, all statuses have been set to 2.Borrow loan status, which includes:- 1: failed to borrow- 2: borrowed but not repaid- 3: repayment complete |
| » repaid | string | Repaid amount |
| » repaid_interest | string | Repaid interest |
| » unpaid_interest | string | Outstanding interest yet to be paid |

#### [#](#enumerated-values-21) Enumerated Values

| Property | Value |
| --- | --- |
| status | 1 |
| status | 2 |
| status | 3 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cross-margin-repayments-deprecated) Cross margin repayments. (deprecated)

`POST /margin/cross/repayments`

_Cross margin repayments. (deprecated)_

When the liquidity of the currency is insufficient and the transaction risk is high, the currency will be disabled, and funds cannot be transferred.When the available balance of cross-margin is insufficient, the balance of the spot account can be used for repayment. Please ensure that the balance of the spot account is sufficient, and system uses cross-margin account for repayment first

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Repayment currency |
| » amount | body | string | true | Repayment amount |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Loan repaid | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | string | Loan record ID |
| » create_time | integer(int64) | Creation timestamp, in milliseconds |
| » update_time | integer(int64) | Update timestamp, in milliseconds |
| » currency | string | Currency name |
| » amount | string | Borrowed amount |
| » text | string | User defined custom ID |
| » status | integer(int32) | Deprecated. Currently, all statuses have been set to 2.Borrow loan status, which includes:- 1: failed to borrow- 2: borrowed but not repaid- 3: repayment complete |
| » repaid | string | Repaid amount |
| » repaid_interest | string | Repaid interest |
| » unpaid_interest | string | Outstanding interest yet to be paid |

#### [#](#enumerated-values-22) Enumerated Values

| Property | Value |
| --- | --- |
| status | 1 |
| status | 2 |
| status | 3 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-cross-margin-repayments-deprecated) Retrieve cross margin repayments. (deprecated)

`GET /margin/cross/repayments`

_Retrieve cross margin repayments. (deprecated)_

Sort by creation time in descending order by default. Set `reverse=false` to return ascending results.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | none |
| loan_id | query | string | false | none |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| reverse | query | boolean | false | Whether to sort in descending order, which is the default. Set reverse=false to return ascending results |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | string | Loan record ID |
| » create_time | integer(int64) | Repayment time |
| » loan_id | string | Loan record ID |
| » currency | string | Currency name |
| » principal | string | Repaid principal |
| » interest | string | Repaid interest |
| » repayment_type | string | Repayment type: none - no repayment type, manual_repay - manual repayment, auto_repay - automatic repayment, cancel_auto_repay - automatic repayment after cancellation |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#interest-records-for-the-cross-margin-account-deprecated) Interest records for the cross margin account. (deprecated)

`GET /margin/cross/interest_records`

_Interest records for the cross margin account. (deprecated)_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Interest record] |
| » None | object | Interest record |
| »» currency | string | Currency name |
| »» currency_pair | string | Currency pair |
| »» actual_rate | string | Actual rate |
| »» interest | string | Interest |
| »» status | integer | Status: 0 - fail, 1 - success |
| »» type | string | Type, platform - platform，margin - margin |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-max-transferable-amount-for-a-specific-cross-margin-currency-deprecated) Get the max transferable amount for a specific cross margin currency. (deprecated)

`GET /margin/cross/transferable`

_Get the max transferable amount for a specific cross margin currency. (deprecated)_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_CrossMarginTransferable_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » amount | string | Max transferable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#estimated-interest-rates-deprecated) Estimated interest rates. (deprecated)

`GET /margin/cross/estimate_rate`

_Estimated interest rates. (deprecated)_

Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currencies | query | array[string] | true | An array of up to 10 specifying the currency name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

| Name | Type | Description |
| --- | --- | --- |
| » additionalProperties | string | none |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-max-borrowable-amount-for-a-specific-cross-margin-currency-deprecated) Get the max borrowable amount for a specific cross margin currency. (deprecated)

`GET /margin/cross/borrowable`

_Get the max borrowable amount for a specific cross margin currency. (deprecated)_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Retrieve data of the specified currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_CrossMarginBorrowable_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency detail |
| » amount | string | Max borrowable amount |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#marginuni) MarginUni

Margin API; margin trading uses spot trading API

## [#](#list-lending-markets) List lending markets

`GET /margin/uni/currency_pairs`

_List lending markets_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Currency pair of the loan] |
| » None | object | Currency pair of the loan |
| »» currency_pair | string | Currency pair |
| »» base_min_borrow_amount | string | Minimum borrow amount of base currency |
| »» quote_min_borrow_amount | string | Minimum borrow amount of quote currency |
| »» leverage | string | Position leverage |

This operation does not require authentication

## [#](#get-detail-of-lending-market) Get detail of lending market

`GET /margin/uni/currency_pairs/{currency_pair}`

_Get detail of lending market_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | path | string | true | Currency pair |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Currency pair of the loan_

| Name | Type | Description |
| --- | --- | --- |
| » currency_pair | string | Currency pair |
| » base_min_borrow_amount | string | Minimum borrow amount of base currency |
| » quote_min_borrow_amount | string | Minimum borrow amount of quote currency |
| » leverage | string | Position leverage |

This operation does not require authentication

## [#](#estimate-interest-rate) Estimate interest Rate

`GET /margin/uni/estimate_rate`

_Estimate interest Rate_

Please note that the interest rates are subject to change based on the borrowing and lending demand, and therefore, the provided rates may not be entirely accurate.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currencies | query | array[string] | true | An array of up to 10 specifying the currency name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Estimate the current hourly lending rates, categorized by currency_

| Name | Type | Description |
| --- | --- | --- |
| » additionalProperties | string | none |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#borrow-or-repay-2) Borrow or repay

`POST /margin/uni/loans`

_Borrow or repay_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Currency |
| » type | body | string | true | type: borrow - borrow, repay - repay |
| » amount | body | string | true | The amount of lending or repaying |
| » repaid_all | body | boolean | false | Full repayment. Repay operation only. If the value is true, the amount will be ignored and the loan will be repaid in full. |
| » currency_pair | body | string | true | Currency pair |

#### [#](#enumerated-values-23) Enumerated Values

| Parameter | Value |
| --- | --- |
| » type | borrow |
| » type | repay |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Operated successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-loans-2) List loans

`GET /margin/uni/loans`

_List loans_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Currency pair |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Loan] |
| » None | object | Loan |
| »» currency | string | Currency |
| »» currency_pair | string | Currency pair |
| »» amount | string | amount |
| »» type | string | Loan type, platform - platform, margin - margin |
| »» create_time | integer(int64) | Created time |
| »» update_time | integer(int64) | Updated time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-load-records-2) Get load records

`GET /margin/uni/loan_records`

_Get load records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| type | query | string | false | type: borrow - borrow, repay - repay |
| currency | query | string | false | Retrieve data of the specified currency |
| currency_pair | query | string | false | Currency pair |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

#### [#](#enumerated-values-24) Enumerated Values

| Parameter | Value |
| --- | --- |
| type | borrow |
| type | repay |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Loan records |
| »» type | string | type: borrow - borrow, repay - repay |
| »» currency_pair | string | Currency pair |
| »» currency | string | Currency |
| »» amount | string | The amount of lending or repaying |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records-2) List interest records

`GET /margin/uni/interest_records`

_List interest records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Currency pair |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Interest record] |
| » None | object | Interest record |
| »» currency | string | Currency name |
| »» currency_pair | string | Currency pair |
| »» actual_rate | string | Actual rate |
| »» interest | string | Interest |
| »» status | integer | Status: 0 - fail, 1 - success |
| »» type | string | Type, platform - platform，margin - margin |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-maximum-borrowable) Get maximum borrowable

`GET /margin/uni/borrowable`

_Get maximum borrowable_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | true | Retrieve data of the specified currency |
| currency_pair | query | string | true | Currency pair |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_MaxUniBorrowable_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency |
| » currency_pair | string | Currency pair |
| » borrowable | string | Maximum borrowable |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#flash-swap) Flash\_swap

Flash swap

## [#](#list-all-supported-currency-pairs-in-flash-swap) List All Supported Currency Pairs In Flash Swap

`GET /flash_swap/currency_pairs`

_List All Supported Currency Pairs In Flash Swap_

`BTC_GT` represents selling BTC and buying GT. The limits for each currency may vary across different currency pairs.

It is not necessary that two currencies that can be swapped instantaneously can be exchanged with each other. For example, it is possible to sell BTC and buy GT, but it does not necessarily mean that GT can be sold to buy BTC.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 1000 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | List all supported currencies in flash swap |
| »» currency_pair | string | The currency pair, BTC_USDT represents selling Bitcoin (BTC) and buying Tether (USDT). |
| »» sell_currency | string | The currency to be sold |
| »» buy_currency | string | The currency to be bought |
| »» sell_min_amount | string | The minimum quantity required for selling |
| »» sell_max_amount | string | The maximum quantity allowed for selling |
| »» buy_min_amount | string | The minimum quantity required for buying |
| »» buy_max_amount | string | The maximum quantity allowed for buying |

This operation does not require authentication

## [#](#create-a-flash-swap-order) Create a flash swap order

`POST /flash_swap/orders`

_Create a flash swap order_

Initiate a flash swap preview in advance because order creation requires a preview result

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » preview_id | body | string | true | Preview result ID |
| » sell_currency | body | string | true | The name of the asset being sold, as obtained from the "GET /flash_swap/currency_pairs" API, which retrieves a list of supported flash swap currency pairs. |
| » sell_amount | body | string | true | Amount to sell (based on the preview result) |
| » buy_currency | body | string | true | The name of the asset being purchased, as obtained from the "GET /flash_swap/currency_pairs" API, which provides a list of supported flash swap currency pairs. |
| » buy_amount | body | string | true | Amount to buy (based on the preview result) |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | The flash swap order is created successfully | Inline |

### Response Schema

Status Code **201**

_Flash swap order_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Flash swap order ID |
| » create_time | integer(int64) | Creation time of order (in milliseconds) |
| » user_id | integer(int64) | User ID |
| » sell_currency | string | Currency to sell |
| » sell_amount | string | Amount to sell |
| » buy_currency | string | Currency to buy |
| » buy_amount | string | Amount to buy |
| » price | string | Price |
| » status | integer | Flash swap order status1 - success2 - failure |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-flash-swap-orders) List all flash swap orders

`GET /flash_swap/orders`

_List all flash swap orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| status | query | integer | false | Flash swap order status |
| sell_currency | query | string | false | Currency to sell which can be retrieved from supported currency list API GET /flash_swap/currencies |
| buy_currency | query | string | false | Currency to buy which can be retrieved from supported currency list API GET /flash_swap/currencies |
| reverse | query | boolean | false | If results are sorted by id in reverse order. Default to true |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| page | query | integer(int32) | false | Page number |

#### [#](#detailed-descriptions-18) Detailed descriptions

**status**: Flash swap order status

`1` - success `2` - failure

**reverse**: If results are sorted by id in reverse order. Default to `true`

*   `true`: sort by id in descending order(recent first)
*   `false`: sort by id in ascending order(oldest first)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Flash swap order] |
| » None | object | Flash swap order |
| »» id | integer(int64) | Flash swap order ID |
| »» create_time | integer(int64) | Creation time of order (in milliseconds) |
| »» user_id | integer(int64) | User ID |
| »» sell_currency | string | Currency to sell |
| »» sell_amount | string | Amount to sell |
| »» buy_currency | string | Currency to buy |
| »» buy_amount | string | Amount to buy |
| »» price | string | Price |
| »» status | integer | Flash swap order status1 - success2 - failure |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-flash-swap-order-s-detail) Get a single flash swap order's detail

`GET /flash_swap/orders/{order_id}`

_Get a single flash swap order's detail_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | integer | true | Flash swap order ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Flash swap order_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Flash swap order ID |
| » create_time | integer(int64) | Creation time of order (in milliseconds) |
| » user_id | integer(int64) | User ID |
| » sell_currency | string | Currency to sell |
| » sell_amount | string | Amount to sell |
| » buy_currency | string | Currency to buy |
| » buy_amount | string | Amount to buy |
| » price | string | Price |
| » status | integer | Flash swap order status1 - success2 - failure |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#initiate-a-flash-swap-order-preview) Initiate a flash swap order preview

`POST /flash_swap/orders/preview`

_Initiate a flash swap order preview_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » sell_currency | body | string | true | The name of the asset being sold, as obtained from the "GET /flash_swap/currency_pairs" API, which retrieves a list of supported flash swap currency pairs. |
| » sell_amount | body | string | false | Amount to sell. |
| » buy_currency | body | string | true | The name of the asset being purchased, as obtained from the "GET /flash_swap/currency_pairs" API, which provides a list of supported flash swap currency pairs. |
| » buy_amount | body | string | false | Amount to buy. |

#### [#](#detailed-descriptions-19) Detailed descriptions

**» sell\_amount**: Amount to sell. It is required to choose one parameter between `sell_amount` and `buy_amount`

**» buy\_amount**: Amount to buy. It is required to choose one parameter between `sell_amount` and `buy_amount`

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | The flash swap order successfully previewed | Inline |

### Response Schema

Status Code **200**

_Initiate a flash swap order preview_

| Name | Type | Description |
| --- | --- | --- |
| » preview_id | string | Preview result ID |
| » sell_currency | string | Currency to sell which can be retrieved from supported currency list API GET /flash_swap/currencies |
| » sell_amount | string | Amount to sell |
| » buy_currency | string | Currency to buy which can be retrieved from supported currency list API GET /flash_swap/currencies |
| » buy_amount | string | Amount to buy |
| » price | string | Price |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#futures) Futures

Futures contract API

## [#](#list-all-futures-contracts) List all futures contracts

`GET /futures/{settle}/contracts`

_List all futures contracts_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

#### [#](#enumerated-values-25) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Contract] |

This operation does not require authentication

## [#](#get-a-single-contract) Get a single contract

`GET /futures/{settle}/contracts/{contract}`

_Get a single contract_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |

#### [#](#enumerated-values-26) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Contract information | Contract |

This operation does not require authentication

## [#](#futures-order-book) Futures order book

`GET /futures/{settle}/order_book`

_Futures order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |
| limit | query | integer | false | Maximum number of order depth data in asks or bids |
| with_id | query | boolean | false | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |

#### [#](#enumerated-values-27) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order book retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set with_id=true to include this field in response |
| » current | number(double) | Response data generation timestamp |
| » update | number(double) | Order book changed timestamp |
| » asks | array | Asks order depth |
| »» futures_order_book_item | object | none |
| »»» p | string | Price (quote currency) |
| »»» s | integer(int64) | Size |
| »» bids | array | Bids order depth |
| »»» futures_order_book_item | object | none |
| »»»» p | string | Price (quote currency) |
| »»»» s | integer(int64) | Size |

This operation does not require authentication

## [#](#futures-trading-history) Futures trading history

`GET /futures/{settle}/trades`

_Futures trading history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| last_id | query | string | false | Specify the starting point for this list based on a previously retrieved id |
| from | query | integer(int64) | false | Specify starting time in Unix seconds. If not specified, to and limit will be used to limit response items. |
| to | query | integer(int64) | false | Specify end time in Unix seconds, default to current time |

#### [#](#detailed-descriptions-20) Detailed descriptions

**last\_id**: Specify the starting point for this list based on a previously retrieved id

This parameter is deprecated. Use `from` and `to` instead to limit time range

**from**: Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items. If items between `from` and `to` are more than `limit`, only `limit` number will be returned.

#### [#](#enumerated-values-28) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | integer(int64) | Trade ID |
| » create_time | number(double) | Trading time |
| » create_time_ms | number(double) | Trading time, with milliseconds set to 3 decimal places. |
| » contract | string | Futures contract |
| » size | integer(int64) | Trading size |
| » price | string | Trading price (quote currency) |
| » is_internal | boolean | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |

This operation does not require authentication

## [#](#get-futures-candlesticks) Get futures candlesticks

`GET /futures/{settle}/candlesticks`

_Get futures candlesticks_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the contract's mark price candlesticks are returned; if prefix with `index_`, index price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying `from`, `to` and `interval`

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default toto - 100 * interval if not specified |
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |
| limit | query | integer | false | Maximum recent data points to return. limit is conflicted with from and to. If either from or to is specified, request will be rejected. |
| interval | query | string | false | Interval time between data points. Note that 1w means natual week(Mon-Sun), while 7d means every 7d since unix 0. Note that 30d means 1 natual month, not 30 days |

#### [#](#enumerated-values-29) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [data point in every timestamp] |
| » None | object | data point in every timestamp |
| »» t | number(double) | Unix timestamp in seconds |
| »» v | integer(int64) | size volume (contract size). Only returned if contract is not prefixed |
| »» c | string | Close price (quote currency) |
| »» h | string | Highest price (quote currency) |
| »» l | string | Lowest price (quote currency) |
| »» o | string | Open price (quote currency) |
| »» sum | string | Trading volume (unit: Quote currency) |

This operation does not require authentication

## [#](#premium-index-k-line) Premium Index K-Line

`GET /futures/{settle}/premium_index`

_Premium Index K-Line_

Maximum of 1000 points can be returned in a query. Be sure not to exceed the limit when specifying from, to and interval

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default toto - 100 * interval if not specified |
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |
| limit | query | integer | false | Maximum recent data points to return. limit is conflicted with from and to. If either from or to is specified, request will be rejected. |
| interval | query | string | false | Interval time between data points |

#### [#](#enumerated-values-30) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | data point in every timestamp |
| »» t | number(double) | Unix timestamp in seconds |
| »» c | string | Close price |
| »» h | string | Highest price |
| »» l | string | Lowest price` |
| »» o | string | Open price |

This operation does not require authentication

## [#](#list-futures-tickers) List futures tickers

`GET /futures/{settle}/tickers`

_List futures tickers_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |

#### [#](#enumerated-values-31) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » contract | string | Futures contract |
| » last | string | Last trading price |
| » change_percentage | string | Change percentage. |
| » total_size | string | Contract total size |
| » low_24h | string | Lowest trading price in recent 24h |
| » high_24h | string | Highest trading price in recent 24h |
| » volume_24h | string | Trade size in recent 24h |
| » volume_24h_btc | string | Trade volumes in recent 24h in BTC(deprecated, use volume_24h_base, volume_24h_quote, volume_24h_settle instead) |
| » volume_24h_usd | string | Trade volumes in recent 24h in USD(deprecated, use volume_24h_base, volume_24h_quote, volume_24h_settle instead) |
| » volume_24h_base | string | Trade volume in recent 24h, in base currency |
| » volume_24h_quote | string | Trade volume in recent 24h, in quote currency |
| » volume_24h_settle | string | Trade volume in recent 24h, in settle currency |
| » mark_price | string | Recent mark price |
| » funding_rate | string | Funding rate |
| » funding_rate_indicative | string | Indicative Funding rate in next period. (deprecated. use funding_rate) |
| » index_price | string | Index price |
| » quanto_base_rate | string | Exchange rate of base currency and settlement currency in Quanto contract. Does not exists in contracts of other types |
| » basis_rate | string | Basis rate |
| » basis_value | string | Basis value |
| » lowest_ask | string | Recent lowest ask |
| » lowest_size | string | The latest seller's lowest price order quantity |
| » highest_bid | string | Recent highest bid |
| » highest_size | string | The latest buyer's highest price order volume |

This operation does not require authentication

## [#](#funding-rate-history) Funding rate history

`GET /futures/{settle}/funding_rate`

_Funding rate history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

#### [#](#enumerated-values-32) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | History retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » t | integer(int64) | Unix timestamp in seconds |
| » r | string | Funding rate |

This operation does not require authentication

## [#](#futures-insurance-balance-history) Futures insurance balance history

`GET /futures/{settle}/insurance`

_Futures insurance balance history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

#### [#](#enumerated-values-33) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » t | integer(int64) | Unix timestamp in seconds |
| » b | string | Insurance balance |

This operation does not require authentication

## [#](#futures-stats) Futures stats

`GET /futures/{settle}/contract_stats`

_Futures stats_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| from | query | integer(int64) | false | Start timestamp |
| interval | query | string | false | none |
| limit | query | integer | false | none |

#### [#](#enumerated-values-34) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | integer(int64) | Stat timestamp |
| » lsr_taker | number | Long/short account number ratio |
| » lsr_account | number | Long/short taker size ratio |
| » long_liq_size | integer(int64) | Long liquidation size |
| » long_liq_amount | number(double) | Long liquidation amount(base currency) |
| » long_liq_usd | number(double) | Long liquidation volume(quote currency) |
| » short_liq_size | integer(int64) | Short liquidation size |
| » short_liq_amount | number(double) | Short liquidation amount(base currency) |
| » short_liq_usd | number(double) | Short liquidation volume(quote currency) |
| » open_interest | integer(int64) | Open interest size |
| » open_interest_usd | number(double) | Open interest volume(quote currency) |
| » top_lsr_account | number(double) | Top trader long/short account ratio |
| » top_lsr_size | number(double) | Top trader long/short position ratio |

This operation does not require authentication

## [#](#get-index-constituents) Get index constituents

`GET /futures/{settle}/index_constituents/{index}`

_Get index constituents_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| index | path | string | true | Index name |

#### [#](#enumerated-values-35) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » index | string | Index name |
| » constituents | array | Constituents |
| »» IndexConstituent | object | none |
| »»» exchange | string | Exchange |
| »»» symbols | array | Symbol list |

This operation does not require authentication

## [#](#retrieve-liquidation-history) Retrieve liquidation history

`GET /futures/{settle}/liq_orders`

_Retrieve liquidation history_

Interval between `from` and `to` cannot exceeds 3600. Some private fields will not be returned in public endpoints. Refer to field description for detail.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

#### [#](#enumerated-values-36) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | integer(int64) | Liquidation time |
| » contract | string | Futures contract |
| » size | integer(int64) | User position size |
| » order_size | integer(int64) | Number of forced liquidation orders |
| » order_price | string | Liquidation order price |
| » fill_price | string | Liquidation order average taker price |
| » left | integer(int64) | System liquidation order maker size |

This operation does not require authentication

## [#](#list-risk-limit-tiers) List risk limit tiers

`GET /futures/{settle}/risk_limit_tiers`

_List risk limit tiers_

When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array. This only takes effect when the 'contract' parameter is empty.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

#### [#](#enumerated-values-37) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Retrieve risk limit configurations for different tiers under a specified contract.] |
| » None | object | Retrieve risk limit configurations for different tiers under a specified contract. |
| »» tier | integer(int) | Tier |
| »» risk_limit | string | Position risk limit |
| »» initial_rate | string | Initial margin rate |
| »» maintenance_rate | string | Maintenance margin rate |
| »» leverage_max | string | Maximum leverage |
| »» contract | string | Markets, visible only during market pagination requests |

This operation does not require authentication

## [#](#query-futures-account) Query futures account

`GET /futures/{settle}/accounts`

_Query futures account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-38) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss.total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| » unrealised_pnl | string | Unrealized PNL |
| » position_margin | string | Position margin |
| » order_margin | string | Order margin of unfinished orders |
| » available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |
| » point | string | POINT amount |
| » currency | string | Settle currency |
| » in_dual_mode | boolean | Whether dual mode is enabled |
| » enable_credit | boolean | Whether portfolio margin account mode is enabled |
| » position_initial_margin | string | Initial margin position, applicable to the portfolio margin account model |
| » maintenance_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |
| » bonus | string | Perpetual Contract Bonus |
| » enable_evolved_classic | boolean | Classic account margin mode, true-new mode, false-old mode |
| » cross_order_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |
| » cross_initial_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |
| » cross_maintenance_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |
| » cross_unrealised_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |
| » cross_available | string | Full warehouse available amount, suitable for the new classic account margin model |
| » isolated_position_margin | string | Ware -position margin, suitable for the new classic account margin model |
| » enable_new_dual_mode | boolean | Whether to open a new two-way position mode |
| » margin_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |
| » history | object | Statistical data |
| »» dnw | string | total amount of deposit and withdraw |
| »» pnl | string | total amount of trading profit and loss |
| »» fee | string | total amount of fee |
| »» refr | string | total amount of referrer rebates |
| »» fund | string | total amount of funding costs |
| »» point_dnw | string | total amount of point deposit and withdraw |
| »» point_fee | string | total amount of point fee |
| »» point_refr | string | total amount of referrer rebates of point fee |
| »» bonus_dnw | string | total amount of perpetual contract bonus transfer |
| »» bonus_offset | string | total amount of perpetual contract bonus deduction |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book-2) Query account book

`GET /futures/{settle}/account_book`

_Query account book_

If the `contract` field is provided, it can only filter records that include this field after 2023-10-30.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| type | query | string | false | Changing Type： |

#### [#](#detailed-descriptions-21) Detailed descriptions

**type**: Changing Type：

*   dnw: Deposit & Withdraw
*   pnl: Profit & Loss by reducing position
*   fee: Trading fee
*   refr: Referrer rebate
*   fund: Funding
*   point\_dnw: POINT Deposit & Withdraw
*   point\_fee: POINT Trading fee
*   point\_refr: POINT Referrer rebate
*   bonus\_offset: bouns deduction

#### [#](#enumerated-values-39) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | number(double) | Change time |
| » change | string | Change amount |
| » balance | string | Balance after change |
| » type | string | Changing Type：- dnw: Deposit & Withdraw- pnl: Profit & Loss by reducing position- fee: Trading fee- refr: Referrer rebate- fund: Funding- point_dnw: POINT Deposit & Withdraw- point_fee: POINT Trading fee- point_refr: POINT Referrer rebate- bonus_offset: bouns deduction |
| » text | string | Comment |
| » contract | string | Futures contract, the field is only available for data after 2023-10-30. |
| » trade_id | string | trade id |
| » id | string | 账户变更记录 id |

#### [#](#enumerated-values-40) Enumerated Values

| Property | Value |
| --- | --- |
| type | dnw |
| type | pnl |
| type | fee |
| type | refr |
| type | fund |
| type | point_dnw |
| type | point_fee |
| type | point_refr |
| type | bonus_offset |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-positions-of-a-user) List all positions of a user

`GET /futures/{settle}/positions`

_List all positions of a user_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| holding | query | boolean | false | Return only real positions - true, return all - false. |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

#### [#](#enumerated-values-41) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Position] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-single-position) Get single position

`GET /futures/{settle}/positions/{contract}`

_Get single position_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |

#### [#](#enumerated-values-42) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin) Update position margin

`POST /futures/{settle}/positions/{contract}/margin`

_Update position margin_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| change | query | string | true | Margin change. Use positive number to increase margin, negative number otherwise. |

#### [#](#enumerated-values-43) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage) Update position leverage

`POST /futures/{settle}/positions/{contract}/leverage`

_Update position leverage_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| leverage | query | string | true | New position leverage |
| cross_leverage_limit | query | string | false | Cross margin leverage(valid only when leverage is 0) |

#### [#](#enumerated-values-44) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit) Update position risk limit

`POST /futures/{settle}/positions/{contract}/risk_limit`

_Update position risk limit_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| risk_limit | query | string | true | New Risk Limit Value |

#### [#](#enumerated-values-45) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#enable-or-disable-dual-mode) Enable or disable dual mode

`POST /futures/{settle}/dual_mode`

_Enable or disable dual mode_

Before setting dual mode, make sure all positions are closed and no orders are open

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| dual_mode | query | boolean | true | Whether to enable dual mode |

#### [#](#enumerated-values-46) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Updated | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss.total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| » unrealised_pnl | string | Unrealized PNL |
| » position_margin | string | Position margin |
| » order_margin | string | Order margin of unfinished orders |
| » available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |
| » point | string | POINT amount |
| » currency | string | Settle currency |
| » in_dual_mode | boolean | Whether dual mode is enabled |
| » enable_credit | boolean | Whether portfolio margin account mode is enabled |
| » position_initial_margin | string | Initial margin position, applicable to the portfolio margin account model |
| » maintenance_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |
| » bonus | string | Perpetual Contract Bonus |
| » enable_evolved_classic | boolean | Classic account margin mode, true-new mode, false-old mode |
| » cross_order_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |
| » cross_initial_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |
| » cross_maintenance_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |
| » cross_unrealised_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |
| » cross_available | string | Full warehouse available amount, suitable for the new classic account margin model |
| » isolated_position_margin | string | Ware -position margin, suitable for the new classic account margin model |
| » enable_new_dual_mode | boolean | Whether to open a new two-way position mode |
| » margin_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |
| » history | object | Statistical data |
| »» dnw | string | total amount of deposit and withdraw |
| »» pnl | string | total amount of trading profit and loss |
| »» fee | string | total amount of fee |
| »» refr | string | total amount of referrer rebates |
| »» fund | string | total amount of funding costs |
| »» point_dnw | string | total amount of point deposit and withdraw |
| »» point_fee | string | total amount of point fee |
| »» point_refr | string | total amount of referrer rebates of point fee |
| »» bonus_dnw | string | total amount of perpetual contract bonus transfer |
| »» bonus_offset | string | total amount of perpetual contract bonus deduction |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#retrieve-position-detail-in-dual-mode) Retrieve position detail in dual mode

`GET /futures/{settle}/dual_comp/positions/{contract}`

_Retrieve position detail in dual mode_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |

#### [#](#enumerated-values-47) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Position] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin-in-dual-mode) Update position margin in dual mode

`POST /futures/{settle}/dual_comp/positions/{contract}/margin`

_Update position margin in dual mode_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| change | query | string | true | Margin change. Use positive number to increase margin, negative number otherwise. |
| dual_side | query | string | true | Long or short position |

#### [#](#enumerated-values-48) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Position] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage-in-dual-mode) Update position leverage in dual mode

`POST /futures/{settle}/dual_comp/positions/{contract}/leverage`

_Update position leverage in dual mode_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| leverage | query | string | true | New position leverage |
| cross_leverage_limit | query | string | false | Cross margin leverage(valid only when leverage is 0) |

#### [#](#enumerated-values-49) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Position] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit-in-dual-mode) Update position risk limit in dual mode

`POST /futures/{settle}/dual_comp/positions/{contract}/risk_limit`

_Update position risk limit in dual mode_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| risk_limit | query | string | true | New Risk Limit Value |

#### [#](#enumerated-values-50) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Position] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-futures-order) Create a futures order

`POST /futures/{settle}/orders`

_Create a futures order_

*   Creating futures orders requires `size`, which is number of contracts instead of currency amount. You can use `quanto_multiplier` in contract detail response to know how much currency 1 size contract represents
*   Zero-filled order cannot be retrieved 10 minutes after order cancellation. You will get a 404 not found for such orders
*   Set `reduce_only` to `true` can keep the position from changing side when reducing position size
*   In single position mode, to close a position, you need to set `size` to 0 and `close` to `true`
*   In dual position mode, to close one side position, you need to set `auto_size` side, `reduce_only` to true and `size` to 0
*   Set `stp_act` to decide the strategy of self-trade prevention. For detailed usage, refer to the `stp_act` parameter in request body

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | FuturesOrder | true | none |
| » contract | body | string | true | Futures contract |
| » size | body | integer(int64) | true | Order size. Specify positive number to make a bid, and negative number to ask |
| » iceberg | body | integer(int64) | false | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price | body | string | false | Order price. 0 for market order with tif set as ioc |
| » close | body | boolean | false | Set as true to close the position, with size set to 0 |
| » reduce_only | body | boolean | false | Set as true to be reduce-only order |
| » tif | body | string | false | Time in force |
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |
| » auto_size | body | string | false | Set side to close dual-mode position. close_long closes the long side; while close_short the short one. Note size also needs to be set to 0 |
| » stp_act | body | string | false | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies |
| settle | path | string | true | Settle currency |

#### [#](#detailed-descriptions-22) Detailed descriptions

**» tif**: Time in force

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled, taker only
*   poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee
*   fok: FillOrKill, fill either completely or none

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) Besides user defined information, reserved contents are listed below, denoting how the order is created:

*   web: from web
*   api: from API
*   app: from mobile phones
*   auto\_deleveraging: from ADL
*   liquidation: from liquidation
*   insurance: from insurance

**» stp\_act**: Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies

1.  After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。
2.  When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。
3.  If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'

*   cn: Cancel newest, Cancel new orders and keep old ones
*   co: Cancel oldest, Cancel old orders and keep new ones
*   cb: Cancel both, Both old and new orders will be cancelled

#### [#](#enumerated-values-51) Enumerated Values

| Parameter | Value |
| --- | --- |
| » tif | gtc |
| » tif | ioc |
| » tif | poc |
| » tif | fok |
| » auto_size | close_long |
| » auto_size | close_short |
| » stp_act | co |
| » stp_act | cn |
| » stp_act | cb |
| » stp_act | - |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders) List futures orders

`GET /futures/{settle}/orders`

_List futures orders_

*   Zero-fill order cannot be retrieved for 10 minutes after cancellation
*   Historical orders, by default, only data within the past 6 months is supported. If you need to query data for a longer period, please use `GET /futures/{settle}/orders_timerange`.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | false | Futures contract, return related data only if specified |
| status | query | string | true | Only list the orders with this status |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| last_id | query | string | false | Specify list staring point using the id of last record in previous list-query results |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-52) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [FuturesOrder] |

### [#](#response-headers) Response Headers

| Status | Header | Type | Format | Description |
| --- | --- | --- | --- | --- |
| 200 | X-Pagination-Limit | integer |  | Request limit specified |
| 200 | X-Pagination-Offset | integer |  | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched) Cancel all `open` orders matched

`DELETE /futures/{settle}/orders`

_Cancel all `open` orders matched_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| contract | query | string | true | Futures contract |
| side | query | string | false | All bids or asks. Both included if not specified |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-53) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | All orders matched cancelled | [FuturesOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders-by-time-range) List Futures Orders By Time Range

`GET /futures/{settle}/orders_timerange`

_List Futures Orders By Time Range_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

#### [#](#enumerated-values-54) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [FuturesOrder] |

### [#](#response-headers-2) Response Headers

| Status | Header | Type | Format | Description |
| --- | --- | --- | --- | --- |
| 200 | X-Pagination-Limit | integer |  | Request limit specified |
| 200 | X-Pagination-Offset | integer |  | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-batch-of-futures-orders) Create a batch of futures orders

`POST /futures/{settle}/batch_orders`

_Create a batch of futures orders_

*   Up to 10 orders per request
*   If any of the order's parameters are missing or in the wrong format, all of them will not be executed, and a http status 400 error will be returned directly
*   If the parameters are checked and passed, all are executed. Even if there is a business logic error in the middle (such as insufficient funds), it will not affect other execution orders
*   The returned result is in array format, and the order corresponds to the orders in the request body
*   In the returned result, the `succeeded` field of type bool indicates whether the execution was successful or not
*   If the execution is successful, the normal order content is included; if the execution fails, the `label` field is included to indicate the cause of the error
*   In the rate limiting, each order is counted individually

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | array[FuturesOrder] | true | none |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-55) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Request is completed | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Futures order details] |
| » None | object | Futures order details |
| »» succeeded | boolean | Whether the batch of orders succeeded |
| »» label | string | Error label, only exists if execution fails |
| »» detail | string | Error detail, only present if execution failed and details need to be given |
| »» id | integer(int64) | Futures order ID |
| »» user | integer | User ID |
| »» create_time | number(double) | Creation time of order |
| »» finish_time | number(double) | Order finished time. Not returned if order is open |
| »» finish_as | string | How the order was finished.- filled: all filled- cancelled: manually cancelled- liquidated: cancelled because of liquidation- ioc: time in force is IOC, finish immediately- auto_deleveraged: finished by ADL- reduce_only: cancelled because of increasing position while reduce-only set- position_closed: cancelled because of position close- position_closed: canceled because the position was closed- reduce_out: only reduce positions by excluding hard-to-fill orders- stp: cancelled because self trade prevention |
| »» status | string | Order status- open: waiting to be traded- finished: finished |
| »» contract | string | Futures contract |
| »» size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| »» iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| »» price | string | Order price. 0 for market order with tif set as ioc |
| »» is_close | boolean | Is the order to close position |
| »» is_reduce_only | boolean | Is the order reduce-only |
| »» is_liq | boolean | Is the order for liquidation |
| »» tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or none |
| »» left | integer(int64) | Size left to be traded |
| »» fill_price | string | Fill price of the order |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| »» tkfr | string | Taker fee |
| »» mkfr | string | Maker fee |
| »» refu | integer | Reference user ID |
| »» stp_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| »» stp_id | integer | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |

#### [#](#enumerated-values-56) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | stp |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |
| tif | fok |
| stp_act | co |
| stp_act | cn |
| stp_act | cb |
| stp_act | - |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-2) Get a single order

`GET /futures/{settle}/orders/{order_id}`

_Get a single order_

*   Zero-fill order cannot be retrieved for 10 minutes after cancellation
*   Historical orders, by default, only data within the past 6 months is supported.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Order ID returned, or user custom ID(i.e., text field). |

#### [#](#detailed-descriptions-23) Detailed descriptions

**order\_id**: Order ID returned, or user custom ID(i.e., `text` field). Operations based on custom ID can only be checked when the order is in orderbook. When the order is finished, it can be checked within 60 seconds after the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-57) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-2) Cancel a single order

`DELETE /futures/{settle}/orders/{order_id}`

_Cancel a single order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Order ID returned, or user custom ID(i.e., text field). |

#### [#](#detailed-descriptions-24) Detailed descriptions

**order\_id**: Order ID returned, or user custom ID(i.e., `text` field). Operations based on custom ID can only be checked when the order is in orderbook. When the order is finished, it can be checked within 60 seconds after the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-58) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-an-order-2) Amend an order

`PUT /futures/{settle}/orders/{order_id}`

_Amend an order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | object | true | none |
| » size | body | integer(int64) | false | New order size, including filled part. |
| » price | body | string | false | New order price. |
| » amend_text | body | string | false | Custom info during amending order |
| » biz_info | body | string | false | Users can annotate this modification with information. |
| » bbo | body | string | false | Users are able to modify the offer price manually. |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Order ID returned, or user custom ID(i.e., text field). |

#### [#](#detailed-descriptions-25) Detailed descriptions

**» size**: New order size, including filled part.

*   If new size is less than or equal to filled size, the order will be cancelled.
*   Order side must be identical to the original one.
*   Close order size cannot be changed.
*   For reduce only orders, increasing size may leads to other reduce only orders being cancelled.
*   If price is not changed, decreasing size will not change its precedence in order book, while increasing will move it to the last at current price.

**order\_id**: Order ID returned, or user custom ID(i.e., `text` field). Operations based on custom ID can only be checked when the order is in orderbook. When the order is finished, it can be checked within 60 seconds after the end of the order. After that, only order ID is accepted.

#### [#](#enumerated-values-59) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-2) List personal trading history

`GET /futures/{settle}/my_trades`

_List personal trading history_

By default, only data within the past 6 months is supported. If you need to query data for a longer period, please use `GET /futures/{settle}/my_trades_timerange`.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| order | query | integer(int64) | false | Futures order ID, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| last_id | query | string | false | Specify the starting point for this list based on a previously retrieved id |

#### [#](#detailed-descriptions-26) Detailed descriptions

**last\_id**: Specify the starting point for this list based on a previously retrieved id

This parameter is deprecated. If you need to iterate through and retrieve more records, we recommend using 'GET /futures/{settle}/my\_trades\_timerange'.

#### [#](#enumerated-values-60) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | integer(int64) | Trade ID |
| » create_time | number(double) | Trading time |
| » contract | string | Futures contract |
| » order_id | string | Order ID related |
| » size | integer(int64) | Trading size |
| » close_size | integer(int64) | Number of closed positions:close_size=0 && size＞0 Open long positionclose_size=0 && size＜0 Open short positionclose_size>0 && size>0 && size <= close_size Close short postionclose_size>0 && size>0 && size > close_size Close short position and open long positionclose_size<0 && size<0 && size >= close_size Close long postionclose_size<0 && size<0 && size < close_size Close long position and open short position |
| » price | string | Trading price |
| » role | string | Trade role. Available values are taker and maker |
| » text | string | User defined information |
| » fee | string | Fee deducted |
| » point_fee | string | Points used to deduct fee |

#### [#](#enumerated-values-61) Enumerated Values

| Property | Value |
| --- | --- |
| role | taker |
| role | maker |

### [#](#response-headers-3) Response Headers

| Status | Header | Type | Format | Description |
| --- | --- | --- | --- | --- |
| 200 | X-Pagination-Limit | integer |  | Request limit specified |
| 200 | X-Pagination-Offset | integer |  | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-by-time-range) List personal trading history by time range

`GET /futures/{settle}/my_trades_timerange`

_List personal trading history by time range_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| role | query | string | false | Query role, maker or taker. |

#### [#](#enumerated-values-62) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » trade_id | string | Trade ID |
| » create_time | number(double) | Trading time |
| » contract | string | Futures contract |
| » order_id | string | Order ID related |
| » size | integer(int64) | Trading size |
| » close_size | integer(int64) | Number of closed positions:close_size=0 && size＞0 Open long positionclose_size=0 && size＜0 Open short positionclose_size>0 && size>0 && size <= close_size Close short postionclose_size>0 && size>0 && size > close_size Close short position and open long positionclose_size<0 && size<0 && size >= close_size Close long postionclose_size<0 && size<0 && size < close_size Close long position and open short position |
| » price | string | Trading price |
| » role | string | Trade role. Available values are taker and maker |
| » text | string | User defined information |
| » fee | string | Fee deducted |
| » point_fee | string | Points used to deduct fee |

#### [#](#enumerated-values-63) Enumerated Values

| Property | Value |
| --- | --- |
| role | taker |
| role | maker |

### [#](#response-headers-4) Response Headers

| Status | Header | Type | Format | Description |
| --- | --- | --- | --- | --- |
| 200 | X-Pagination-Limit | integer |  | Request limit specified |
| 200 | X-Pagination-Offset | integer |  | Request offset specified |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-position-close-history) List position close history

`GET /futures/{settle}/position_close`

_List position close history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| side | query | string | false | Query side. long or shot |
| pnl | query | string | false | Query profit or loss |

#### [#](#enumerated-values-64) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | number(double) | Position close time |
| » contract | string | Futures contract |
| » side | string | Position side, long or short |
| » pnl | string | PNL |
| » pnl_pnl | string | PNL - Position P/L |
| » pnl_fund | string | PNL - Funding Fees |
| » pnl_fee | string | PNL - Transaction Fees |
| » text | string | Text of close order |
| » max_size | string | Max Trade Size |
| » accum_size | string | Cumulative closed position volume |
| » first_open_time | integer(int64) | First Open Time |
| » long_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price. |
| » short_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price |

#### [#](#enumerated-values-65) Enumerated Values

| Property | Value |
| --- | --- |
| side | long |
| side | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-liquidation-history) List liquidation history

`GET /futures/{settle}/liquidates`

_List liquidation history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| at | query | integer | false | Specify a liquidation timestamp |

#### [#](#enumerated-values-66) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | integer(int64) | Liquidation time |
| » contract | string | Futures contract |
| » leverage | string | Position leverage. Not returned in public endpoints. |
| » size | integer(int64) | Position size |
| » margin | string | Position margin. Not returned in public endpoints. |
| » entry_price | string | Average entry price. Not returned in public endpoints. |
| » liq_price | string | Liquidation price. Not returned in public endpoints. |
| » mark_price | string | Mark price. Not returned in public endpoints. |
| » order_id | integer(int64) | Liquidation order ID. Not returned in public endpoints. |
| » order_price | string | Liquidation order price |
| » fill_price | string | Liquidation order average taker price |
| » left | integer(int64) | Liquidation order maker size |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-auto-deleveraging-history) List Auto-Deleveraging History

`GET /futures/{settle}/auto_deleverages`

_List Auto-Deleveraging History_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| at | query | integer | false | Specify an auto-deleveraging timestamp |

#### [#](#enumerated-values-67) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | integer(int64) | Automatic deleveraging time |
| » user | integer(int64) | User ID |
| » order_id | integer(int64) | Order ID. Order IDs before 2023-02-20 are null |
| » contract | string | Futures contract |
| » leverage | string | Position leverage |
| » cross_leverage_limit | string | Cross margin leverage(valid only when leverage is 0) |
| » entry_price | string | Average entry price |
| » fill_price | string | Average fill price |
| » trade_size | integer(int64) | Trading size |
| » position_size | integer(int64) | Positions after auto-deleveraging |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-2) Countdown cancel orders

`POST /futures/{settle}/countdown_cancel_all`

_Countdown cancel orders_

When the timeout set by the user is reached, if there is no cancel or set a new countdown, the related pending orders will be automatically cancelled. This endpoint can be called repeatedly to set a new countdown or cancel the countdown. For example, call this endpoint at 30s intervals, each countdown`timeout` is set to 30s. If this endpoint is not called again within 30 seconds, all pending orders on the specified `market` will be automatically cancelled, if no `market` is specified, all market pending orders will be cancelled. If the `timeout` is set to 0 within 30 seconds, the countdown timer will expire and the cacnel function will be cancelled.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » timeout | body | integer(int32) | true | Countdown time, in seconds |
| » contract | body | string | false | Futures contract |
| settle | path | string | true | Settle currency |

#### [#](#detailed-descriptions-27) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the countdown

#### [#](#enumerated-values-68) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Set countdown successfully | Inline |

### Response Schema

Status Code **200**

_triggerTime_

| Name | Type | Description |
| --- | --- | --- |
| » triggerTime | integer(int64) | Timestamp of the end of the countdown, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-trading-fee-rates-2) Query user trading fee rates

`GET /futures/{settle}/fee`

_Query user trading fee rates_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract, return related data only if specified |

#### [#](#enumerated-values-69) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » additionalProperties | object | The returned result is a map type, where the key represents the market and the value represents the taker and maker fee rates. |
| »» taker_fee | string | Taker fee |
| »» maker_fee | string | maker fee |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-batch-of-orders-with-an-id-list-2) Cancel a batch of orders with an ID list

`POST /futures/{settle}/batch_cancel_orders`

_Cancel a batch of orders with an ID list_

Multiple distinct order ID list can be specified。Each request can cancel a maximum of 20 records.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | array[string] | true | none |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-70) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order cancellation operation completed | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » FutureCancelOrderResult | object | Order cancellation result |
| »» id | string | Order ID |
| »» user_id | integer(int64) | User ID |
| »» succeeded | boolean | Whether cancellation succeeded |
| »» message | string | Error message when failed to cancel the order; empty if succeeded |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modify-orders-with-specified-ids) Batch modify orders with specified IDs

`POST /futures/{settle}/batch_amend_orders`

_Batch modify orders with specified IDs_

You can specify multiple different order IDs. You can only modify up to 10 orders in one request.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| x-gate-exptime | header | integer(int64) | false | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body | body | array[BatchAmendOrderReq] | true | none |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-71) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Request is completed | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Futures order details] |
| » None | object | Futures order details |
| »» succeeded | boolean | Whether the batch of orders succeeded |
| »» label | string | Error label, only exists if execution fails |
| »» detail | string | Error detail, only present if execution failed and details need to be given |
| »» id | integer(int64) | Futures order ID |
| »» user | integer | User ID |
| »» create_time | number(double) | Creation time of order |
| »» finish_time | number(double) | Order finished time. Not returned if order is open |
| »» finish_as | string | How the order was finished.- filled: all filled- cancelled: manually cancelled- liquidated: cancelled because of liquidation- ioc: time in force is IOC, finish immediately- auto_deleveraged: finished by ADL- reduce_only: cancelled because of increasing position while reduce-only set- position_closed: cancelled because of position close- position_closed: canceled because the position was closed- reduce_out: only reduce positions by excluding hard-to-fill orders- stp: cancelled because self trade prevention |
| »» status | string | Order status- open: waiting to be traded- finished: finished |
| »» contract | string | Futures contract |
| »» size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| »» iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| »» price | string | Order price. 0 for market order with tif set as ioc |
| »» is_close | boolean | Is the order to close position |
| »» is_reduce_only | boolean | Is the order reduce-only |
| »» is_liq | boolean | Is the order for liquidation |
| »» tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or none |
| »» left | integer(int64) | Size left to be traded |
| »» fill_price | string | Fill price of the order |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| »» tkfr | string | Taker fee |
| »» mkfr | string | Maker fee |
| »» refu | integer | Reference user ID |
| »» stp_act | string | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| »» stp_id | integer | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |

#### [#](#enumerated-values-72) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | stp |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |
| tif | fok |
| stp_act | co |
| stp_act | cn |
| stp_act | cb |
| stp_act | - |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-price-triggered-order-2) Create a price-triggered order

`POST /futures/{settle}/price_orders`

_Create a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | FuturesPriceTriggeredOrder | true | none |
| » initial | body | object | true | none |
| »» contract | body | string | true | Futures contract |
| »» size | body | integer(int64) | false | Order size. Positive size means to buy, while negative one means to sell. Set to 0 to close the position |
| »» price | body | string | true | Order price. Set to 0 to use market price |
| »» close | body | boolean | false | Set to true if trying to close the position |
| »» tif | body | string | false | Time in force. If using market price, only ioc is supported. |
| »» text | body | string | false | The source of the order, including: |
| »» reduce_only | body | boolean | false | Set to true to create a reduce-only order |
| »» auto_size | body | string | false | Set side to close dual-mode position. close_long closes the long side; while close_short the short one. Note size also needs to be set to 0 |
| » trigger | body | object | true | none |
| »» strategy_type | body | integer(int32) | false | How the order will be triggered |
| »» price_type | body | integer(int32) | false | Price type. 0 - latest deal price, 1 - mark price, 2 - index price |
| »» price | body | string | false | Value of price on price triggered, or price gap on price gap triggered |
| »» rule | body | integer(int32) | false | Trigger condition type |
| »» expiration | body | integer | false | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |
| » order_type | body | string | false | Take-profit/stop-loss types, which include: |
| settle | path | string | true | Settle currency |

#### [#](#detailed-descriptions-28) Detailed descriptions

**»» tif**: Time in force. If using market price, only `ioc` is supported.

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled

**»» text**: The source of the order, including:

*   web: web
*   api: api
*   app: app

**»» strategy\_type**: How the order will be triggered

*   `0`: by price, which means the order will be triggered if price condition is satisfied
*   `1`: by price gap, which means the order will be triggered if gap of recent two prices of specified `price_type` are satisfied. Only `0` is supported currently

**»» rule**: Trigger condition type

*   `1`: calculated price based on `strategy_type` and `price_type` >= `price`
*   `2`: calculated price based on `strategy_type` and `price_type` <= `price`

**» order\_type**: Take-profit/stop-loss types, which include:

*   `close-long-order`: order take-profit/stop-loss, close long position
*   `close-short-order`: order take-profit/stop-loss, close short position
*   `close-long-position`: position take-profit/stop-loss, close long position
*   `close-short-position`: position take-profit/stop-loss, close short position
*   `plan-close-long-position`: position planned take-profit/stop-loss, close long position
*   `plan-close-short-position`: position planned take-profit/stop-loss, close short position

The order take-profit/stop-loss can not be passed by request. These two types are read only.

#### [#](#enumerated-values-73) Enumerated Values

| Parameter | Value |
| --- | --- |
| »» tif | gtc |
| »» tif | ioc |
| »» strategy_type | 0 |
| »» strategy_type | 1 |
| »» price_type | 0 |
| »» price_type | 1 |
| »» price_type | 2 |
| »» rule | 1 |
| »» rule | 2 |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order created | Inline |

### Response Schema

Status Code **201**

_TriggerOrderResponse_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Auto order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-price-triggered-orders) List All Price-triggered Orders

`GET /futures/{settle}/price_orders`

_List All Price-triggered Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| status | query | string | true | Only list the orders with this status |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-74) Enumerated Values

| Parameter | Value |
| --- | --- |
| status | open |
| status | finished |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [FuturesPriceTriggeredOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders-2) Cancel All Price-triggered Orders

`DELETE /futures/{settle}/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | false | Futures contract, return related data only if specified |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-75) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Batch cancellation request accepted. Query order status by listing orders | [FuturesPriceTriggeredOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order-2) Get a price-triggered order

`GET /futures/{settle}/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-76) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Auto order detail | FuturesPriceTriggeredOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order-2) cancel a price-triggered order

`DELETE /futures/{settle}/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-77) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | btc |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Auto order detail | FuturesPriceTriggeredOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#delivery) Delivery

Delivery contract API

## [#](#list-all-futures-contracts-2) List all futures contracts

`GET /delivery/{settle}/contracts`

_List all futures contracts_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-78) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [DeliveryContract] |

This operation does not require authentication

## [#](#get-a-single-contract-2) Get a single contract

`GET /delivery/{settle}/contracts/{contract}`

_Get a single contract_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |

#### [#](#enumerated-values-79) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Contract information | DeliveryContract |

This operation does not require authentication

## [#](#futures-order-book-2) Futures order book

`GET /delivery/{settle}/order_book`

_Futures order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |
| limit | query | integer | false | Maximum number of order depth data in asks or bids |
| with_id | query | boolean | false | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |

#### [#](#enumerated-values-80) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |
| interval | 0 |
| interval | 0.1 |
| interval | 0.01 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order book retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set with_id=true to include this field in response |
| » current | number(double) | Response data generation timestamp |
| » update | number(double) | Order book changed timestamp |
| » asks | array | Asks order depth |
| »» futures_order_book_item | object | none |
| »»» p | string | Price (quote currency) |
| »»» s | integer(int64) | Size |
| »» bids | array | Bids order depth |
| »»» futures_order_book_item | object | none |
| »»»» p | string | Price (quote currency) |
| »»»» s | integer(int64) | Size |

This operation does not require authentication

## [#](#futures-trading-history-2) Futures trading history

`GET /delivery/{settle}/trades`

_Futures trading history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| last_id | query | string | false | Specify the starting point for this list based on a previously retrieved id |
| from | query | integer(int64) | false | Specify starting time in Unix seconds. If not specified, to and limit will be used to limit response items. |
| to | query | integer(int64) | false | Specify end time in Unix seconds, default to current time |

#### [#](#detailed-descriptions-29) Detailed descriptions

**last\_id**: Specify the starting point for this list based on a previously retrieved id

This parameter is deprecated. Use `from` and `to` instead to limit time range

**from**: Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items. If items between `from` and `to` are more than `limit`, only `limit` number will be returned.

#### [#](#enumerated-values-81) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | integer(int64) | Trade ID |
| » create_time | number(double) | Trading time |
| » create_time_ms | number(double) | Trading time, with milliseconds set to 3 decimal places. |
| » contract | string | Futures contract |
| » size | integer(int64) | Trading size |
| » price | string | Trading price (quote currency) |
| » is_internal | boolean | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |

This operation does not require authentication

## [#](#get-futures-candlesticks-2) Get futures candlesticks

`GET /delivery/{settle}/candlesticks`

_Get futures candlesticks_

Return specified contract candlesticks. If prefix `contract` with `mark_`, the contract's mark price candlesticks are returned; if prefix with `index_`, index price candlesticks will be returned.

Maximum of 2000 points are returned in one query. Be sure not to exceed the limit when specifying `from`, `to` and `interval`

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | true | Futures contract |
| from | query | integer(int64) | false | Start time of candlesticks, formatted in Unix timestamp in seconds. Default toto - 100 * interval if not specified |
| to | query | integer(int64) | false | End time of candlesticks, formatted in Unix timestamp in seconds. Default to current time |
| limit | query | integer | false | Maximum recent data points to return. limit is conflicted with from and to. If either from or to is specified, request will be rejected. |
| interval | query | string | false | Interval time between data points. Note that 1w means natual week(Mon-Sun), while 7d means every 7d since unix 0 |

#### [#](#enumerated-values-82) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |
| interval | 10s |
| interval | 30s |
| interval | 1m |
| interval | 5m |
| interval | 15m |
| interval | 30m |
| interval | 1h |
| interval | 2h |
| interval | 4h |
| interval | 6h |
| interval | 8h |
| interval | 12h |
| interval | 1d |
| interval | 7d |
| interval | 1w |
| interval | 30d |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | data point in every timestamp |
| »» t | number(double) | Unix timestamp in seconds |
| »» v | integer(int64) | size volume (contract size). Only returned if contract is not prefixed |
| »» c | string | Close price (quote currency) |
| »» h | string | Highest price (quote currency) |
| »» l | string | Lowest price (quote currency) |
| »» o | string | Open price (quote currency) |

This operation does not require authentication

## [#](#list-futures-tickers-2) List futures tickers

`GET /delivery/{settle}/tickers`

_List futures tickers_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract |

#### [#](#enumerated-values-83) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » contract | string | Futures contract |
| » last | string | Last trading price |
| » change_percentage | string | Change percentage. |
| » total_size | string | Contract total size |
| » low_24h | string | Lowest trading price in recent 24h |
| » high_24h | string | Highest trading price in recent 24h |
| » volume_24h | string | Trade size in recent 24h |
| » volume_24h_btc | string | Trade volumes in recent 24h in BTC(deprecated, use volume_24h_base, volume_24h_quote, volume_24h_settle instead) |
| » volume_24h_usd | string | Trade volumes in recent 24h in USD(deprecated, use volume_24h_base, volume_24h_quote, volume_24h_settle instead) |
| » volume_24h_base | string | Trade volume in recent 24h, in base currency |
| » volume_24h_quote | string | Trade volume in recent 24h, in quote currency |
| » volume_24h_settle | string | Trade volume in recent 24h, in settle currency |
| » mark_price | string | Recent mark price |
| » funding_rate | string | Funding rate |
| » funding_rate_indicative | string | Indicative Funding rate in next period. (deprecated. use funding_rate) |
| » index_price | string | Index price |
| » quanto_base_rate | string | Exchange rate of base currency and settlement currency in Quanto contract. Does not exists in contracts of other types |
| » basis_rate | string | Basis rate |
| » basis_value | string | Basis value |
| » lowest_ask | string | Recent lowest ask |
| » lowest_size | string | The latest seller's lowest price order quantity |
| » highest_bid | string | Recent highest bid |
| » highest_size | string | The latest buyer's highest price order volume |

This operation does not require authentication

## [#](#futures-insurance-balance-history-2) Futures insurance balance history

`GET /delivery/{settle}/insurance`

_Futures insurance balance history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

#### [#](#enumerated-values-84) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » t | integer(int64) | Unix timestamp in seconds |
| » b | string | Insurance balance |

This operation does not require authentication

## [#](#query-futures-account-2) Query futures account

`GET /delivery/{settle}/accounts`

_Query futures account_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-85) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | string | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss.total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| » unrealised_pnl | string | Unrealized PNL |
| » position_margin | string | Position margin |
| » order_margin | string | Order margin of unfinished orders |
| » available | string | The available balance for transferring or trading(including bonus. Bonus can't be be withdrawn. The transfer amount needs to deduct the bonus) |
| » point | string | POINT amount |
| » currency | string | Settle currency |
| » in_dual_mode | boolean | Whether dual mode is enabled |
| » enable_credit | boolean | Whether portfolio margin account mode is enabled |
| » position_initial_margin | string | Initial margin position, applicable to the portfolio margin account model |
| » maintenance_margin | string | The maintenance deposit occupied by the position is suitable for the new classic account margin model and unified account model |
| » bonus | string | Perpetual Contract Bonus |
| » enable_evolved_classic | boolean | Classic account margin mode, true-new mode, false-old mode |
| » cross_order_margin | string | Full -warehouse hanging order deposit, suitable for the new classic account margin model |
| » cross_initial_margin | string | The initial security deposit of the full warehouse is suitable for the new classic account margin model |
| » cross_maintenance_margin | string | Maintain deposit in full warehouse, suitable for new classic account margin models |
| » cross_unrealised_pnl | string | The full warehouse does not achieve profit and loss, suitable for the new classic account margin model |
| » cross_available | string | Full warehouse available amount, suitable for the new classic account margin model |
| » isolated_position_margin | string | Ware -position margin, suitable for the new classic account margin model |
| » enable_new_dual_mode | boolean | Whether to open a new two-way position mode |
| » margin_mode | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode |
| » history | object | Statistical data |
| »» dnw | string | total amount of deposit and withdraw |
| »» pnl | string | total amount of trading profit and loss |
| »» fee | string | total amount of fee |
| »» refr | string | total amount of referrer rebates |
| »» fund | string | total amount of funding costs |
| »» point_dnw | string | total amount of point deposit and withdraw |
| »» point_fee | string | total amount of point fee |
| »» point_refr | string | total amount of referrer rebates of point fee |
| »» bonus_dnw | string | total amount of perpetual contract bonus transfer |
| »» bonus_offset | string | total amount of perpetual contract bonus deduction |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-book-3) Query account book

`GET /delivery/{settle}/account_book`

_Query account book_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| type | query | string | false | Changing Type: |

#### [#](#detailed-descriptions-30) Detailed descriptions

**type**: Changing Type:

*   dnw: Deposit & Withdraw
*   pnl: Profit & Loss by reducing position
*   fee: Trading fee
*   refr: Referrer rebate
*   fund: Funding
*   point\_dnw: POINT Deposit & Withdraw
*   point\_fee: POINT Trading fee
*   point\_refr: POINT Referrer rebate

#### [#](#enumerated-values-86) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |
| type | dnw |
| type | pnl |
| type | fee |
| type | refr |
| type | fund |
| type | point_dnw |
| type | point_fee |
| type | point_refr |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | number(double) | Change time |
| » change | string | Change amount |
| » balance | string | Balance after change |
| » type | string | Changing Type：- dnw: Deposit & Withdraw- pnl: Profit & Loss by reducing position- fee: Trading fee- refr: Referrer rebate- fund: Funding- point_dnw: POINT Deposit & Withdraw- point_fee: POINT Trading fee- point_refr: POINT Referrer rebate- bonus_offset: bouns deduction |
| » text | string | Comment |
| » contract | string | Futures contract, the field is only available for data after 2023-10-30. |
| » trade_id | string | trade id |
| » id | string | 账户变更记录 id |

#### [#](#enumerated-values-87) Enumerated Values

| Property | Value |
| --- | --- |
| type | dnw |
| type | pnl |
| type | fee |
| type | refr |
| type | fund |
| type | point_dnw |
| type | point_fee |
| type | point_refr |
| type | bonus_offset |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-positions-of-a-user-2) List all positions of a user

`GET /delivery/{settle}/positions`

_List all positions of a user_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-88) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Position] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-single-position-2) Get single position

`GET /delivery/{settle}/positions/{contract}`

_Get single position_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |

#### [#](#enumerated-values-89) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-margin-2) Update position margin

`POST /delivery/{settle}/positions/{contract}/margin`

_Update position margin_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| change | query | string | true | Margin change. Use positive number to increase margin, negative number otherwise. |

#### [#](#enumerated-values-90) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-leverage-2) Update position leverage

`POST /delivery/{settle}/positions/{contract}/leverage`

_Update position leverage_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| leverage | query | string | true | New position leverage |

#### [#](#enumerated-values-91) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-position-risk-limit-2) Update position risk limit

`POST /delivery/{settle}/positions/{contract}/risk_limit`

_Update position risk limit_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | path | string | true | Futures contract |
| risk_limit | query | string | true | New position risk limit |

#### [#](#enumerated-values-92) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Position information | Position |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-a-futures-order-2) Create a futures order

`POST /delivery/{settle}/orders`

_Create a futures order_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | FuturesOrder | true | none |
| » contract | body | string | true | Futures contract |
| » size | body | integer(int64) | true | Order size. Specify positive number to make a bid, and negative number to ask |
| » iceberg | body | integer(int64) | false | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price | body | string | false | Order price. 0 for market order with tif set as ioc |
| » close | body | boolean | false | Set as true to close the position, with size set to 0 |
| » reduce_only | body | boolean | false | Set as true to be reduce-only order |
| » tif | body | string | false | Time in force |
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |
| » auto_size | body | string | false | Set side to close dual-mode position. close_long closes the long side; while close_short the short one. Note size also needs to be set to 0 |
| » stp_act | body | string | false | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies |
| settle | path | string | true | Settle currency |

#### [#](#detailed-descriptions-31) Detailed descriptions

**» tif**: Time in force

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled, taker only
*   poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee
*   fok: FillOrKill, fill either completely or none

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) Besides user defined information, reserved contents are listed below, denoting how the order is created:

*   web: from web
*   api: from API
*   app: from mobile phones
*   auto\_deleveraging: from ADL
*   liquidation: from liquidation
*   insurance: from insurance

**» stp\_act**: Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies

1.  After users join the `STP Group`, he can pass `stp_act` to limit the user's self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn` strategy。
2.  When the user does not join the `STP group`, an error will be returned when passing the `stp_act` parameter。
3.  If the user did not use 'stp\_act' when placing the order, 'stp\_act' will return '-'

*   cn: Cancel newest, Cancel new orders and keep old ones
*   co: Cancel oldest, Cancel old orders and keep new ones
*   cb: Cancel both, Both old and new orders will be cancelled

#### [#](#enumerated-values-93) Enumerated Values

| Parameter | Value |
| --- | --- |
| » tif | gtc |
| » tif | ioc |
| » tif | poc |
| » tif | fok |
| » auto_size | close_long |
| » auto_size | close_short |
| » stp_act | co |
| » stp_act | cn |
| » stp_act | cb |
| » stp_act | - |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-futures-orders-2) List futures orders

`GET /delivery/{settle}/orders`

_List futures orders_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | false | Futures contract |
| status | query | string | true | Only list the orders with this status |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| last_id | query | string | false | Specify list staring point using the id of last record in previous list-query results |
| count_total | query | integer | false | Whether to return total number matched. Default to 0(no return) |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-94) Enumerated Values

| Parameter | Value |
| --- | --- |
| status | open |
| status | finished |
| count_total | 0 |
| count_total | 1 |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [FuturesOrder] |

### [#](#response-headers-5) Response Headers

| Status | Header | Type | Format | Description |
| --- | --- | --- | --- | --- |
| 200 | X-Pagination-Limit | integer |  | Request limit specified |
| 200 | X-Pagination-Offset | integer |  | Request offset specified |
| 200 | X-Pagination-Total | integer |  | Total number matched. Only returned if count_total set to 1 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched-2) Cancel all `open` orders matched

`DELETE /delivery/{settle}/orders`

_Cancel all `open` orders matched_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | true | Futures contract |
| side | query | string | false | All bids or asks. Both included if not specified |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-95) Enumerated Values

| Parameter | Value |
| --- | --- |
| side | ask |
| side | bid |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | All orders matched cancelled | [FuturesOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-3) Get a single order

`GET /delivery/{settle}/orders/{order_id}`

_Get a single order_

Zero-filled order cannot be retrieved 10 minutes after order cancellation

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-96) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-3) Cancel a single order

`DELETE /delivery/{settle}/orders/{order_id}`

_Cancel a single order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-97) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order details | FuturesOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-3) List personal trading history

`GET /delivery/{settle}/my_trades`

_List personal trading history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract |
| order | query | integer(int64) | false | Futures order ID, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| last_id | query | string | false | Specify list staring point using the id of last record in previous list-query results |
| count_total | query | integer | false | Whether to return total number matched. Default to 0(no return) |

#### [#](#enumerated-values-98) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |
| count_total | 0 |
| count_total | 1 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | integer(int64) | Trade ID |
| » create_time | number(double) | Trading time |
| » contract | string | Futures contract |
| » order_id | string | Order ID related |
| » size | integer(int64) | Trading size |
| » close_size | integer(int64) | Number of closed positions:close_size=0 && size＞0 Open long positionclose_size=0 && size＜0 Open short positionclose_size>0 && size>0 && size <= close_size Close short postionclose_size>0 && size>0 && size > close_size Close short position and open long positionclose_size<0 && size<0 && size >= close_size Close long postionclose_size<0 && size<0 && size < close_size Close long position and open short position |
| » price | string | Trading price |
| » role | string | Trade role. Available values are taker and maker |
| » text | string | User defined information |
| » fee | string | Fee deducted |
| » point_fee | string | Points used to deduct fee |

#### [#](#enumerated-values-99) Enumerated Values

| Property | Value |
| --- | --- |
| role | taker |
| role | maker |

### [#](#response-headers-6) Response Headers

| Status | Header | Type | Format | Description |
| --- | --- | --- | --- | --- |
| 200 | X-Pagination-Limit | integer |  | Request limit specified |
| 200 | X-Pagination-Offset | integer |  | Request offset specified |
| 200 | X-Pagination-Total | integer |  | Total number matched. Only returned if count_total set to 1 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-position-close-history-2) List position close history

`GET /delivery/{settle}/position_close`

_List position close history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

#### [#](#enumerated-values-100) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | number(double) | Position close time |
| » contract | string | Futures contract |
| » side | string | Position side, long or short |
| » pnl | string | PNL |
| » pnl_pnl | string | PNL - Position P/L |
| » pnl_fund | string | PNL - Funding Fees |
| » pnl_fee | string | PNL - Transaction Fees |
| » text | string | Text of close order |
| » max_size | string | Max Trade Size |
| » accum_size | string | Cumulative closed position volume |
| » first_open_time | integer(int64) | First Open Time |
| » long_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price. |
| » short_price | string | When 'side' is 'long,' it indicates the opening average price; when 'side' is 'short,' it indicates the closing average price |

#### [#](#enumerated-values-101) Enumerated Values

| Property | Value |
| --- | --- |
| side | long |
| side | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-liquidation-history-2) List liquidation history

`GET /delivery/{settle}/liquidates`

_List liquidation history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| at | query | integer | false | Specify a liquidation timestamp |

#### [#](#enumerated-values-102) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | integer(int64) | Liquidation time |
| » contract | string | Futures contract |
| » leverage | string | Position leverage. Not returned in public endpoints. |
| » size | integer(int64) | Position size |
| » margin | string | Position margin. Not returned in public endpoints. |
| » entry_price | string | Average entry price. Not returned in public endpoints. |
| » liq_price | string | Liquidation price. Not returned in public endpoints. |
| » mark_price | string | Mark price. Not returned in public endpoints. |
| » order_id | integer(int64) | Liquidation order ID. Not returned in public endpoints. |
| » order_price | string | Liquidation order price |
| » fill_price | string | Liquidation order average taker price |
| » left | integer(int64) | Liquidation order maker size |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-settlement-history) List settlement history

`GET /delivery/{settle}/settlements`

_List settlement history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| at | query | integer | false | Specify a settlement timestamp |

#### [#](#enumerated-values-103) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | integer(int64) | Liquidation time |
| » contract | string | Futures contract |
| » leverage | string | Position leverage |
| » size | integer(int64) | Position size |
| » margin | string | Position margin |
| » entry_price | string | Average entry price |
| » settle_price | string | Settled price |
| » profit | string | Profit |
| » fee | string | Fee deducted |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-risk-limit-tiers-2) List risk limit tiers

`GET /delivery/{settle}/risk_limit_tiers`

_List risk limit tiers_

When the 'contract' parameter is not passed, the default is to query the risk limits for the top 100 markets.'Limit' and 'offset' correspond to pagination queries at the market level, not to the length of the returned array. This only takes effect when the 'contract' parameter is empty.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| contract | query | string | false | Futures contract |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

#### [#](#enumerated-values-104) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Retrieve risk limit configurations for different tiers under a specified contract.] |
| » None | object | Retrieve risk limit configurations for different tiers under a specified contract. |
| »» tier | integer(int) | Tier |
| »» risk_limit | string | Position risk limit |
| »» initial_rate | string | Initial margin rate |
| »» maintenance_rate | string | Maintenance margin rate |
| »» leverage_max | string | Maximum leverage |
| »» contract | string | Markets, visible only during market pagination requests |

This operation does not require authentication

## [#](#create-a-price-triggered-order-3) Create a price-triggered order

`POST /delivery/{settle}/price_orders`

_Create a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | FuturesPriceTriggeredOrder | true | none |
| » initial | body | object | true | none |
| »» contract | body | string | true | Futures contract |
| »» size | body | integer(int64) | false | Order size. Positive size means to buy, while negative one means to sell. Set to 0 to close the position |
| »» price | body | string | true | Order price. Set to 0 to use market price |
| »» close | body | boolean | false | Set to true if trying to close the position |
| »» tif | body | string | false | Time in force. If using market price, only ioc is supported. |
| »» text | body | string | false | The source of the order, including: |
| »» reduce_only | body | boolean | false | Set to true to create a reduce-only order |
| »» auto_size | body | string | false | Set side to close dual-mode position. close_long closes the long side; while close_short the short one. Note size also needs to be set to 0 |
| » trigger | body | object | true | none |
| »» strategy_type | body | integer(int32) | false | How the order will be triggered |
| »» price_type | body | integer(int32) | false | Price type. 0 - latest deal price, 1 - mark price, 2 - index price |
| »» price | body | string | false | Value of price on price triggered, or price gap on price gap triggered |
| »» rule | body | integer(int32) | false | Trigger condition type |
| »» expiration | body | integer | false | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |
| » order_type | body | string | false | Take-profit/stop-loss types, which include: |
| settle | path | string | true | Settle currency |

#### [#](#detailed-descriptions-32) Detailed descriptions

**»» tif**: Time in force. If using market price, only `ioc` is supported.

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled

**»» text**: The source of the order, including:

*   web: web
*   api: api
*   app: app

**»» strategy\_type**: How the order will be triggered

*   `0`: by price, which means the order will be triggered if price condition is satisfied
*   `1`: by price gap, which means the order will be triggered if gap of recent two prices of specified `price_type` are satisfied. Only `0` is supported currently

**»» rule**: Trigger condition type

*   `1`: calculated price based on `strategy_type` and `price_type` >= `price`
*   `2`: calculated price based on `strategy_type` and `price_type` <= `price`

**» order\_type**: Take-profit/stop-loss types, which include:

*   `close-long-order`: order take-profit/stop-loss, close long position
*   `close-short-order`: order take-profit/stop-loss, close short position
*   `close-long-position`: position take-profit/stop-loss, close long position
*   `close-short-position`: position take-profit/stop-loss, close short position
*   `plan-close-long-position`: position planned take-profit/stop-loss, close long position
*   `plan-close-short-position`: position planned take-profit/stop-loss, close short position

The order take-profit/stop-loss can not be passed by request. These two types are read only.

#### [#](#enumerated-values-105) Enumerated Values

| Parameter | Value |
| --- | --- |
| »» tif | gtc |
| »» tif | ioc |
| »» strategy_type | 0 |
| »» strategy_type | 1 |
| »» price_type | 0 |
| »» price_type | 1 |
| »» price_type | 2 |
| »» rule | 1 |
| »» rule | 2 |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order created | Inline |

### Response Schema

Status Code **201**

_TriggerOrderResponse_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Auto order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-price-triggered-orders-2) List All Price-triggered Orders

`GET /delivery/{settle}/price_orders`

_List All Price-triggered Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| status | query | string | true | Only list the orders with this status |
| contract | query | string | false | Futures contract, return related data only if specified |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-106) Enumerated Values

| Parameter | Value |
| --- | --- |
| status | open |
| status | finished |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [FuturesPriceTriggeredOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-price-triggered-orders-3) Cancel All Price-triggered Orders

`DELETE /delivery/{settle}/price_orders`

_Cancel All Price-triggered Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | true | Futures contract |
| settle | path | string | true | Settle currency |

#### [#](#enumerated-values-107) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Batch cancellation request accepted. Query order status by listing orders | [FuturesPriceTriggeredOrder] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-price-triggered-order-3) Get a price-triggered order

`GET /delivery/{settle}/price_orders/{order_id}`

_Get a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-108) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Auto order detail | FuturesPriceTriggeredOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-price-triggered-order-3) cancel a price-triggered order

`DELETE /delivery/{settle}/price_orders/{order_id}`

_cancel a price-triggered order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| settle | path | string | true | Settle currency |
| order_id | path | string | true | Retrieve the data of the order with the specified ID |

#### [#](#enumerated-values-109) Enumerated Values

| Parameter | Value |
| --- | --- |
| settle | usdt |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Auto order detail | FuturesPriceTriggeredOrder |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#options) Options

Options API

## [#](#list-all-underlyings) List all underlyings

`GET /options/underlyings`

_List all underlyings_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » name | string | Underlying name |
| » index_price | string | Spot index price (quote currency) |

This operation does not require authentication

## [#](#list-all-expiration-times) List all expiration times

`GET /options/expirations`

_List all expiration times_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List expiration times of specified underlying | [integer] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | integer(int64) | Unix timestamp of the expiration time |

This operation does not require authentication

## [#](#list-all-the-contracts-with-specified-underlying-and-expiration-time) List all the contracts with specified underlying and expiration time

`GET /options/contracts`

_List all the contracts with specified underlying and expiration time_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| expiration | query | integer(int64) | false | Unix timestamp of the expiration time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Options contract detail] |
| » None | object | Options contract detail |
| »» name | string | Options contract name |
| »» tag | string | tag |
| »» create_time | number(double) | Creation time |
| »» expiration_time | number(double) | Expiration time |
| »» is_call | boolean | true means call options, while false is put options |
| »» multiplier | string | Multiplier used in converting from invoicing to settlement currency |
| »» underlying | string | Underlying |
| »» underlying_price | string | Underlying price (quote currency) |
| »» last_price | string | Last trading price |
| »» mark_price | string | Current mark price (quote currency) |
| »» index_price | string | Current index price (quote currency) |
| »» maker_fee_rate | string | Maker fee rate, where negative means rebate |
| »» taker_fee_rate | string | Taker fee rate |
| »» order_price_round | string | Minimum order price increment |
| »» mark_price_round | string | Minimum mark price increment |
| »» order_size_min | integer(int64) | Minimum order size the contract allowed |
| »» order_size_max | integer(int64) | Maximum order size the contract allowed |
| »» order_price_deviate | string | The positive and negative offset allowed between the order price and the current mark price, that is, the order price order_price must meet the following conditions:order_price is within the range of mark_price +/- order_price_deviate * underlying_price and does not distinguish between buy and sell orders |
| »» ref_discount_rate | string | Referral fee rate discount |
| »» ref_rebate_rate | string | Referrer commission rate |
| »» orderbook_id | integer(int64) | Current orderbook ID |
| »» trade_id | integer(int64) | Current trade ID |
| »» trade_size | integer(int64) | Historical accumulated trade size |
| »» position_size | integer(int64) | Current total long position size |
| »» orders_limit | integer | Maximum number of open orders |

This operation does not require authentication

## [#](#query-specified-contract-detail) Query specified contract detail

`GET /options/contracts/{contract}`

_Query specified contract detail_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | path | string | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Options contract detail_

| Name | Type | Description |
| --- | --- | --- |
| » name | string | Options contract name |
| » tag | string | tag |
| » create_time | number(double) | Creation time |
| » expiration_time | number(double) | Expiration time |
| » is_call | boolean | true means call options, while false is put options |
| » multiplier | string | Multiplier used in converting from invoicing to settlement currency |
| » underlying | string | Underlying |
| » underlying_price | string | Underlying price (quote currency) |
| » last_price | string | Last trading price |
| » mark_price | string | Current mark price (quote currency) |
| » index_price | string | Current index price (quote currency) |
| » maker_fee_rate | string | Maker fee rate, where negative means rebate |
| » taker_fee_rate | string | Taker fee rate |
| » order_price_round | string | Minimum order price increment |
| » mark_price_round | string | Minimum mark price increment |
| » order_size_min | integer(int64) | Minimum order size the contract allowed |
| » order_size_max | integer(int64) | Maximum order size the contract allowed |
| » order_price_deviate | string | The positive and negative offset allowed between the order price and the current mark price, that is, the order price order_price must meet the following conditions:order_price is within the range of mark_price +/- order_price_deviate * underlying_price and does not distinguish between buy and sell orders |
| » ref_discount_rate | string | Referral fee rate discount |
| » ref_rebate_rate | string | Referrer commission rate |
| » orderbook_id | integer(int64) | Current orderbook ID |
| » trade_id | integer(int64) | Current trade ID |
| » trade_size | integer(int64) | Historical accumulated trade size |
| » position_size | integer(int64) | Current total long position size |
| » orders_limit | integer | Maximum number of open orders |

This operation does not require authentication

## [#](#list-settlement-history-2) List settlement history

`GET /options/settlements`

_List settlement history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » time | number(double) | Last changed time of configuration |
| » contract | string | Options contract name |
| » profit | string | Settlement profit per size (quote currency) |
| » fee | string | Settlement fee per size (quote currency) |
| » strike_price | string | Strike price (quote currency) |
| » settle_price | string | Settlement price (quote currency) |

This operation does not require authentication

## [#](#get-specified-contract-s-settlement) Get specified contract's settlement

`GET /options/settlements/{contract}`

_Get specified contract's settlement_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | path | string | true | none |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| at | query | integer(int64) | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | number(double) | Last changed time of configuration |
| » contract | string | Options contract name |
| » profit | string | Settlement profit per size (quote currency) |
| » fee | string | Settlement fee per size (quote currency) |
| » strike_price | string | Strike price (quote currency) |
| » settle_price | string | Settlement price (quote currency) |

This operation does not require authentication

## [#](#list-my-options-settlements) List my options settlements

`GET /options/my_settlements`

_List my options settlements_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| contract | query | string | false | Options contract name |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | number(double) | Settlement time |
| » underlying | string | Underlying |
| » contract | string | Options contract name |
| » strike_price | string | Strike price (quote currency) |
| » settle_price | string | Settlement price (quote currency) |
| » size | integer(int64) | Size |
| » settle_profit | string | Settlement profit (quote currency) |
| » fee | string | Fee (quote currency) |
| » realised_pnl | string | The accumulated profit and loss of opening a position, including premium, fee, settlement profit, etc. (quote currency) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#options-order-book) Options order book

`GET /options/order_book`

_Options order book_

Bids will be sorted by price from high to low, while asks sorted reversely

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | true | Options contract name |
| interval | query | string | false | Order depth. 0 means no aggregation is applied. default to 0 |
| limit | query | integer | false | Maximum number of order depth data in asks or bids |
| with_id | query | boolean | false | Whether the order book update ID will be returned. This ID increases by 1 on every order book update |

#### [#](#enumerated-values-110) Enumerated Values

| Parameter | Value |
| --- | --- |
| interval | 0 |
| interval | 0.1 |
| interval | 0.01 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order book retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Order Book ID. Increases by 1 on every order book change. Set with_id=true to include this field in response |
| » current | number(double) | Response data generation timestamp |
| » update | number(double) | Order book changed timestamp |
| » asks | array | Asks order depth |
| »» futures_order_book_item | object | none |
| »»» p | string | Price (quote currency) |
| »»» s | integer(int64) | Size |
| »» bids | array | Bids order depth |
| »»» futures_order_book_item | object | none |
| »»»» p | string | Price (quote currency) |
| »»»» s | integer(int64) | Size |

This operation does not require authentication

## [#](#list-tickers-of-options-contracts) List tickers of options contracts

`GET /options/tickers`

_List tickers of options contracts_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Options contract detail |
| »» name | string | Options contract name |
| »» last_price | string | Last trading price (quote currency) |
| »» mark_price | string | Current mark price (quote currency) |
| »» index_price | string | Current index price (quote currency) |
| »» ask1_size | integer(int64) | Best ask size |
| »» ask1_price | string | Best ask price |
| »» bid1_size | integer(int64) | Best bid size |
| »» bid1_price | string | Best bid price |
| »» position_size | integer(int64) | Current total long position size |
| »» mark_iv | string | Implied volatility |
| »» bid_iv | string | Bid side implied volatility |
| »» ask_iv | string | Ask side implied volatility |
| »» leverage | string | Current leverage. Formula: underlying_price / mark_price * delta |
| »» delta | string | Delta |
| »» gamma | string | Gamma |
| »» vega | string | Vega |
| »» theta | string | Theta |
| »» rho | string | Rho |

This operation does not require authentication

## [#](#get-underlying-ticker) Get underlying ticker

`GET /options/underlying/tickers/{underlying}`

_Get underlying ticker_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | path | string | true | Underlying |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Options underlying detail_

| Name | Type | Description |
| --- | --- | --- |
| » trade_put | integer(int64) | Total put options trades amount in last 24h |
| » trade_call | integer(int64) | Total call options trades amount in last 24h |
| » index_price | string | Index price (quote currency) |

This operation does not require authentication

## [#](#get-options-candlesticks) Get options candlesticks

`GET /options/candlesticks`

_Get options candlesticks_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | true | Options contract name |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| interval | query | string | false | Interval time between data points |

#### [#](#enumerated-values-111) Enumerated Values

| Parameter | Value |
| --- | --- |
| interval | 1m |
| interval | 5m |
| interval | 15m |
| interval | 30m |
| interval | 1h |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | data point in every timestamp |
| »» t | number(double) | Unix timestamp in seconds |
| »» v | integer(int64) | size volume (contract size). Only returned if contract is not prefixed |
| »» c | string | Close price (quote currency, unit: underlying corresponding option price) |
| »» h | string | Highest price (quote currency, unit: underlying corresponding option price) |
| »» l | string | Lowest price (quote currency, unit: underlying corresponding option price) |
| »» o | string | Open price (quote currency, unit: underlying corresponding option price) |

This operation does not require authentication

## [#](#mark-price-candlesticks-of-an-underlying) Mark price candlesticks of an underlying

`GET /options/underlying/candlesticks`

_Mark price candlesticks of an underlying_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| interval | query | string | false | Interval time between data points |

#### [#](#enumerated-values-112) Enumerated Values

| Parameter | Value |
| --- | --- |
| interval | 1m |
| interval | 5m |
| interval | 15m |
| interval | 30m |
| interval | 1h |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [data point in every timestamp] |
| » None | object | data point in every timestamp |
| »» t | number(double) | Unix timestamp in seconds |
| »» v | integer(int64) | size volume (contract size). Only returned if contract is not prefixed |
| »» c | string | Close price (quote currency) |
| »» h | string | Highest price (quote currency) |
| »» l | string | Lowest price (quote currency) |
| »» o | string | Open price (quote currency) |
| »» sum | string | Trading volume (unit: Quote currency) |

This operation does not require authentication

## [#](#options-trade-history) Options trade history

`GET /options/trades`

_Options trade history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | false | Options contract name |
| type | query | string(P) | false | C is call, while P is put |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | integer(int64) | Trade ID |
| » create_time | number(double) | Trading time |
| » create_time_ms | number(double) | Trading time, with milliseconds set to 3 decimal places. |
| » contract | string | Futures contract |
| » size | integer(int64) | Trading size |
| » price | string | Trading price (quote currency) |
| » is_internal | boolean | Whether internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the transaction price may deviate, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned. |

This operation does not require authentication

## [#](#list-options-account) List options account

`GET /options/accounts`

_List options account_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » user | integer(int64) | User ID |
| » total | string | Account balance |
| » position_value | string | Position value, long position value is positive, short position value is negative |
| » equity | string | Account equity, the sum of account balance and position value |
| » short_enabled | boolean | If the account is allowed to short |
| » mmp_enabled | boolean | Whether to enable MMP |
| » liq_triggered | boolean | Whether to trigger position liquidation |
| » margin_mode | integer(int32) | ｜ 保证金模式：- 0：经典现货保证金模式 - 1：跨币种保证金模式 - 2：组合保证金模式 |
| » unrealised_pnl | string | Unrealized PNL |
| » init_margin | string | Initial position margin |
| » maint_margin | string | Position maintenance margin |
| » order_margin | string | Order margin of unfinished orders |
| » ask_order_margin | string | Margin for outstanding sell orders |
| » bid_order_margin | string | Margin for outstanding buy orders |
| » available | string | Available balance to transfer out or trade |
| » point | string | POINT amount |
| » currency | string | Settle currency |
| » orders_limit | integer(int32) | Maximum number of outstanding orders |
| » position_notional_limit | integer(int64) | Notional value upper limit, including the nominal value of positions and outstanding orders |

#### [#](#enumerated-values-113) Enumerated Values

| Property | Value |
| --- | --- |
| margin_mode | 0 |
| margin_mode | 1 |
| margin_mode | 2 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-account-changing-history) List account changing history

`GET /options/account_book`

_List account changing history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| type | query | string | false | Changing Type: |

#### [#](#detailed-descriptions-33) Detailed descriptions

**type**: Changing Type:

*   dnw: Deposit & Withdraw
*   prem: Trading premium
*   fee: Trading fee
*   refr: Referrer rebate
*   set: settlement PNL

#### [#](#enumerated-values-114) Enumerated Values

| Parameter | Value |
| --- | --- |
| type | dnw |
| type | prem |
| type | fee |
| type | refr |
| type | set |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | number(double) | Change time |
| » change | string | Amount changed (USDT) |
| » balance | string | Account total balance after change (USDT) |
| » type | string | Changing Type:- dnw: Deposit & Withdraw- prem: Trading premium- fee: Trading fee- refr: Referrer rebate- point_dnw: POINT Deposit & Withdraw- point_fee: POINT Trading fee- point_refr: POINT Referrer rebate |
| » text | string | custom text |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-positions-of-specified-underlying) List user's positions of specified underlying

`GET /options/positions`

_List user's positions of specified underlying_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | false | Underlying |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Options position information] |
| » None | object | Options position information |
| »» user | integer | User ID |
| »» underlying | string | Underlying |
| »» underlying_price | string | Underlying price (quote currency) |
| »» contract | string | Options contract name |
| »» size | integer(int64) | Position size (contract size) |
| »» entry_price | string | Entry size (quote currency) |
| »» mark_price | string | Current mark price (quote currency) |
| »» mark_iv | string | Implied volatility |
| »» realised_pnl | string | Realized PNL |
| »» unrealised_pnl | string | Unrealized PNL |
| »» pending_orders | integer | Current open orders |
| »» close_order | object|null | Current close order if any, or null |
| »»» id | integer(int64) | Close order ID |
| »»» price | string | Close order price （quote currency) |
| »»» is_liq | boolean | Is the close order from liquidation |
| »» delta | string | Delta |
| »» gamma | string | Gamma |
| »» vega | string | Vega |
| »» theta | string | Theta |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-specified-contract-position) Get specified contract position

`GET /options/positions/{contract}`

_Get specified contract position_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | path | string | true | none |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Options position information_

| Name | Type | Description |
| --- | --- | --- |
| » user | integer | User ID |
| » underlying | string | Underlying |
| » underlying_price | string | Underlying price (quote currency) |
| » contract | string | Options contract name |
| » size | integer(int64) | Position size (contract size) |
| » entry_price | string | Entry size (quote currency) |
| » mark_price | string | Current mark price (quote currency) |
| » mark_iv | string | Implied volatility |
| » realised_pnl | string | Realized PNL |
| » unrealised_pnl | string | Unrealized PNL |
| » pending_orders | integer | Current open orders |
| » close_order | object|null | Current close order if any, or null |
| »» id | integer(int64) | Close order ID |
| »» price | string | Close order price （quote currency) |
| »» is_liq | boolean | Is the close order from liquidation |
| » delta | string | Delta |
| » gamma | string | Gamma |
| » vega | string | Vega |
| » theta | string | Theta |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-liquidation-history-of-specified-underlying) List user's liquidation history of specified underlying

`GET /options/position_close`

_List user's liquidation history of specified underlying_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| contract | query | string | false | Options contract name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » time | number(double) | Position close time |
| » contract | string | Options contract name |
| » side | string | Position side, long or short |
| » pnl | string | PNL |
| » text | string | Text of close order |
| » settle_size | string | settlement size |

#### [#](#enumerated-values-115) Enumerated Values

| Property | Value |
| --- | --- |
| side | long |
| side | short |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-an-options-order) Create an options order

`POST /options/orders`

_Create an options order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » contract | body | string | true | Contract name |
| » size | body | integer(int64) | true | Order size. Specify positive number to make a bid, and negative number to ask |
| » iceberg | body | integer(int64) | false | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price | body | string | false | Order price. 0 for market order with tif set as ioc (USDT) |
| » close | body | boolean | false | Set as true to close the position, with size set to 0 |
| » reduce_only | body | boolean | false | Set as true to be reduce-only order |
| » mmp | body | boolean | false | When set to true, delegate to MMP |
| » tif | body | string | false | Time in force |
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |

#### [#](#detailed-descriptions-34) Detailed descriptions

**» tif**: Time in force

*   gtc: GoodTillCancelled
*   ioc: ImmediateOrCancelled, taker only
*   poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) Besides user defined information, reserved contents are listed below, denoting how the order is created:

*   web: from web
*   api: from API
*   app: from mobile phones
*   auto\_deleveraging: from ADL
*   liquidation: from liquidation
*   insurance: from insurance

#### [#](#enumerated-values-116) Enumerated Values

| Parameter | Value |
| --- | --- |
| » tif | gtc |
| » tif | ioc |
| » tif | poc |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 201 | Created (opens new window) | Order detail | Inline |

### Response Schema

Status Code **201**

_Options order detail_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Options order ID |
| » user | integer | User ID |
| » create_time | number(double) | Creation time of order |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as | string | Ending method, including:- filled: fully completed- canceled: user canceled- liquidated: forced liquidation cancellation- ioc: Not fully filled immediately because tif is set to ioc- auto_deleveraged: automatic deleveraging cancel- reduce_only: Increased position is cancelled, because reduce_only is set or the position is closed- position_closed: Because the position was closed, the pending order was canceled- reduce_out: Only reduce the excluded pending orders that are not easy to be filled- mmp_cancelled: MMP canceled |
| » status | string | Order status- open: waiting to be traded- finished: finished |
| » contract | string | Contract name |
| » size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| » iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price | string | Order price. 0 for market order with tif set as ioc (USDT) |
| » is_close | boolean | Is the order to close position |
| » is_reduce_only | boolean | Is the order reduce-only |
| » is_liq | boolean | Is the order for liquidation |
| » is_mmp | boolean | Whether it is MMP delegation. Corresponds to mmp in the request. |
| » tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee |
| » left | integer(int64) | Size left to be traded |
| » fill_price | string | Fill price of the order |
| » text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| » tkfr | string | Taker fee |
| » mkfr | string | Maker fee |
| » refu | integer | Reference user ID |
| » refr | string | Referrer rebate |

#### [#](#enumerated-values-117) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | mmp_cancelled |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-options-orders) List options orders

`GET /options/orders`

_List options orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | false | Options contract name |
| underlying | query | string | false | Underlying |
| status | query | string | true | Only list the orders with this status |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

#### [#](#enumerated-values-118) Enumerated Values

| Parameter | Value |
| --- | --- |
| status | open |
| status | finished |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Options order detail] |
| » None | object | Options order detail |
| »» id | integer(int64) | Options order ID |
| »» user | integer | User ID |
| »» create_time | number(double) | Creation time of order |
| »» finish_time | number(double) | Order finished time. Not returned if order is open |
| »» finish_as | string | Ending method, including:- filled: fully completed- canceled: user canceled- liquidated: forced liquidation cancellation- ioc: Not fully filled immediately because tif is set to ioc- auto_deleveraged: automatic deleveraging cancel- reduce_only: Increased position is cancelled, because reduce_only is set or the position is closed- position_closed: Because the position was closed, the pending order was canceled- reduce_out: Only reduce the excluded pending orders that are not easy to be filled- mmp_cancelled: MMP canceled |
| »» status | string | Order status- open: waiting to be traded- finished: finished |
| »» contract | string | Contract name |
| »» size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| »» iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| »» price | string | Order price. 0 for market order with tif set as ioc (USDT) |
| »» is_close | boolean | Is the order to close position |
| »» is_reduce_only | boolean | Is the order reduce-only |
| »» is_liq | boolean | Is the order for liquidation |
| »» is_mmp | boolean | Whether it is MMP delegation. Corresponds to mmp in the request. |
| »» tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee |
| »» left | integer(int64) | Size left to be traded |
| »» fill_price | string | Fill price of the order |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| »» tkfr | string | Taker fee |
| »» mkfr | string | Maker fee |
| »» refu | integer | Reference user ID |
| »» refr | string | Referrer rebate |

#### [#](#enumerated-values-119) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | mmp_cancelled |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-open-orders-matched-3) Cancel all `open` orders matched

`DELETE /options/orders`

_Cancel all `open` orders matched_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| contract | query | string | false | Options contract name |
| underlying | query | string | false | Underlying |
| side | query | string | false | All bids or asks. Both included if not specified |

#### [#](#enumerated-values-120) Enumerated Values

| Parameter | Value |
| --- | --- |
| side | ask |
| side | bid |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | All orders matched cancelled | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Options order detail] |
| » None | object | Options order detail |
| »» id | integer(int64) | Options order ID |
| »» user | integer | User ID |
| »» create_time | number(double) | Creation time of order |
| »» finish_time | number(double) | Order finished time. Not returned if order is open |
| »» finish_as | string | Ending method, including:- filled: fully completed- canceled: user canceled- liquidated: forced liquidation cancellation- ioc: Not fully filled immediately because tif is set to ioc- auto_deleveraged: automatic deleveraging cancel- reduce_only: Increased position is cancelled, because reduce_only is set or the position is closed- position_closed: Because the position was closed, the pending order was canceled- reduce_out: Only reduce the excluded pending orders that are not easy to be filled- mmp_cancelled: MMP canceled |
| »» status | string | Order status- open: waiting to be traded- finished: finished |
| »» contract | string | Contract name |
| »» size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| »» iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| »» price | string | Order price. 0 for market order with tif set as ioc (USDT) |
| »» is_close | boolean | Is the order to close position |
| »» is_reduce_only | boolean | Is the order reduce-only |
| »» is_liq | boolean | Is the order for liquidation |
| »» is_mmp | boolean | Whether it is MMP delegation. Corresponds to mmp in the request. |
| »» tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee |
| »» left | integer(int64) | Size left to be traded |
| »» fill_price | string | Fill price of the order |
| »» text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| »» tkfr | string | Taker fee |
| »» mkfr | string | Maker fee |
| »» refu | integer | Reference user ID |
| »» refr | string | Referrer rebate |

#### [#](#enumerated-values-121) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | mmp_cancelled |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-4) Get a single order

`GET /options/orders/{order_id}`

_Get a single order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | integer(int64) | true | Order ID returned on successful order creation |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order detail | Inline |

### Response Schema

Status Code **200**

_Options order detail_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Options order ID |
| » user | integer | User ID |
| » create_time | number(double) | Creation time of order |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as | string | Ending method, including:- filled: fully completed- canceled: user canceled- liquidated: forced liquidation cancellation- ioc: Not fully filled immediately because tif is set to ioc- auto_deleveraged: automatic deleveraging cancel- reduce_only: Increased position is cancelled, because reduce_only is set or the position is closed- position_closed: Because the position was closed, the pending order was canceled- reduce_out: Only reduce the excluded pending orders that are not easy to be filled- mmp_cancelled: MMP canceled |
| » status | string | Order status- open: waiting to be traded- finished: finished |
| » contract | string | Contract name |
| » size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| » iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price | string | Order price. 0 for market order with tif set as ioc (USDT) |
| » is_close | boolean | Is the order to close position |
| » is_reduce_only | boolean | Is the order reduce-only |
| » is_liq | boolean | Is the order for liquidation |
| » is_mmp | boolean | Whether it is MMP delegation. Corresponds to mmp in the request. |
| » tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee |
| » left | integer(int64) | Size left to be traded |
| » fill_price | string | Fill price of the order |
| » text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| » tkfr | string | Taker fee |
| » mkfr | string | Maker fee |
| » refu | integer | Reference user ID |
| » refr | string | Referrer rebate |

#### [#](#enumerated-values-122) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | mmp_cancelled |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-a-single-order-4) Cancel a single order

`DELETE /options/orders/{order_id}`

_Cancel a single order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | integer(int64) | true | Order ID returned on successful order creation |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Order detail | Inline |

### Response Schema

Status Code **200**

_Options order detail_

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Options order ID |
| » user | integer | User ID |
| » create_time | number(double) | Creation time of order |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as | string | Ending method, including:- filled: fully completed- canceled: user canceled- liquidated: forced liquidation cancellation- ioc: Not fully filled immediately because tif is set to ioc- auto_deleveraged: automatic deleveraging cancel- reduce_only: Increased position is cancelled, because reduce_only is set or the position is closed- position_closed: Because the position was closed, the pending order was canceled- reduce_out: Only reduce the excluded pending orders that are not easy to be filled- mmp_cancelled: MMP canceled |
| » status | string | Order status- open: waiting to be traded- finished: finished |
| » contract | string | Contract name |
| » size | integer(int64) | Order size. Specify positive number to make a bid, and negative number to ask |
| » iceberg | integer(int64) | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| » price | string | Order price. 0 for market order with tif set as ioc (USDT) |
| » is_close | boolean | Is the order to close position |
| » is_reduce_only | boolean | Is the order reduce-only |
| » is_liq | boolean | Is the order for liquidation |
| » is_mmp | boolean | Whether it is MMP delegation. Corresponds to mmp in the request. |
| » tif | string | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee |
| » left | integer(int64) | Size left to be traded |
| » fill_price | string | Fill price of the order |
| » text | string | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| » tkfr | string | Taker fee |
| » mkfr | string | Maker fee |
| » refu | integer | Reference user ID |
| » refr | string | Referrer rebate |

#### [#](#enumerated-values-123) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | mmp_cancelled |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#countdown-cancel-orders-3) Countdown cancel orders

`POST /options/countdown_cancel_all`

_Countdown cancel orders_

Option order heartbeat detection, when the `timeout` time set by the user is reached, if the existing countdown is not canceled or a new countdown is set, the related `option pending order` will be automatically canceled. This interface can be called repeatedly to set a new countdown or cancel the countdown. Usage example: Repeat this interface at intervals of 30 seconds, with each countdown `timeout` set to 30 (seconds). If this interface is not called again within 30 seconds, all pending orders on the `underlying` `contract` you specified will be automatically cancelled. If `underlying` `contract` is not specified, all pending orders of the user will be automatically cancelled If `timeout` is set to 0 within 30 seconds, the countdown timer will expire and the automatic order cancellation function will be cancelled.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » timeout | body | integer(int32) | true | Countdown time, in seconds |
| » contract | body | string | false | Options contract name |
| » underlying | body | string | false | Underlying |

#### [#](#detailed-descriptions-35) Detailed descriptions

**» timeout**: Countdown time, in seconds At least 5 seconds, 0 means cancel the countdown

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Set countdown successfully | Inline |

### Response Schema

Status Code **200**

_triggerTime_

| Name | Type | Description |
| --- | --- | --- |
| » triggerTime | integer(int64) | Timestamp of the end of the countdown, in milliseconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-personal-trading-history-4) List personal trading history

`GET /options/my_trades`

_List personal trading history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | true | Underlying (Obtained by listing underlying endpoint) |
| contract | query | string | false | Options contract name |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | Trade ID |
| » create_time | number(double) | Trading time |
| » contract | string | Options contract name |
| » order_id | integer | Order ID related |
| » size | integer(int64) | Trading size |
| » price | string | Trading price (quote currency) |
| » underlying_price | string | Underlying price (quote currency) |
| » role | string | Trade role. Available values are taker and maker |

#### [#](#enumerated-values-124) Enumerated Values

| Property | Value |
| --- | --- |
| role | taker |
| role | maker |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-settings) MMP Settings

`POST /options/mmp`

_MMP Settings_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » underlying | body | string | true | Underlying |
| » window | body | integer(int32) | true | Time window (milliseconds), between 1-5000, 0 means disabling MMP |
| » frozen_period | body | integer(int32) | true | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze |
| » qty_limit | body | string | true | Trading volume upper limit (positive number, up to 2 decimal places) |
| » delta_limit | body | string | true | Upper limit of net delta value (positive number, up to 2 decimal places) |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | MMP Information | Inline |

### Response Schema

Status Code **200**

_MMP Settings_

| Name | Type | Description |
| --- | --- | --- |
| » underlying | string | Underlying |
| » window | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disabling MMP |
| » frozen_period | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze |
| » qty_limit | string | Trading volume upper limit (positive number, up to 2 decimal places) |
| » delta_limit | string | Upper limit of net delta value (positive number, up to 2 decimal places) |
| » trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered |
| » frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered. |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-query) MMP Query

`GET /options/mmp`

_MMP Query_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| underlying | query | string | false | Underlying |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [MMP Settings] |
| » None | object | MMP Settings |
| »» underlying | string | Underlying |
| »» window | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disabling MMP |
| »» frozen_period | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze |
| »» qty_limit | string | Trading volume upper limit (positive number, up to 2 decimal places) |
| »» delta_limit | string | Upper limit of net delta value (positive number, up to 2 decimal places) |
| »» trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered |
| »» frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered. |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-reset) MMP Reset

`POST /options/mmp/reset`

_MMP Reset_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » underlying | body | string | true | Underlying |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | MMP Information | Inline |

### Response Schema

Status Code **200**

_MMP Settings_

| Name | Type | Description |
| --- | --- | --- |
| » underlying | string | Underlying |
| » window | integer(int32) | Time window (milliseconds), between 1-5000, 0 means disabling MMP |
| » frozen_period | integer(int32) | Freeze duration (milliseconds), 0 means always frozen, need to call reset API to unfreeze |
| » qty_limit | string | Trading volume upper limit (positive number, up to 2 decimal places) |
| » delta_limit | string | Upper limit of net delta value (positive number, up to 2 decimal places) |
| » trigger_time_ms | integer(int64) | Trigger freeze time (milliseconds), 0 means no freeze is triggered |
| » frozen_until_ms | integer(int64) | Unfreeze time (milliseconds). If the freeze duration is not configured, there will be no unfreeze time after the freeze is triggered. |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#earnuni) EarnUni

Lend & Earn

## [#](#list-currencies-for-lending) List currencies for lending

`GET /earn/uni/currencies`

_List currencies for lending_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Currency detail] |
| » None | object | Currency detail |
| »» currency | string | Currency name |
| »» min_lend_amount | string | The minimum lending amount, in the unit of the currency. |
| »» max_lend_amount | string | The total maximum lending amount, in USDT |
| »» max_rate | string | Maximum rate (Hourly) |
| »» min_rate | string | Minimum rate (Hourly) |

This operation does not require authentication

## [#](#get-currency-detail-for-lending) Get currency detail for lending

`GET /earn/uni/currencies/{currency}`

_Get currency detail for lending_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | path | string | true | Currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Currency detail_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency name |
| » min_lend_amount | string | The minimum lending amount, in the unit of the currency. |
| » max_lend_amount | string | The total maximum lending amount, in USDT |
| » max_rate | string | Maximum rate (Hourly) |
| » min_rate | string | Minimum rate (Hourly) |

This operation does not require authentication

## [#](#lend-or-redeem) Lend or redeem

`POST /earn/uni/lends`

_Lend or redeem_

`Lending`:

The minimum interest rate is required in lending. The lending result is updated hourly and the interest profit is paid on the next hour. A high interest rate might lead to unsuccessful lending and no profit will be gained for that hour. If the funds are redeemed before the hourly settlement, no interest can be obtained for that hour. About priority: the orders created or amended first under the same interest rate will be lent out first

`Redemption`:

Funds that failed to be lent can be redeemed immediately. For the successfully lent funds, enjoy the hourly income, and the redemption will arrive at the next hour

`Note`:

Two minutes before and after the hour is the settlement time, lending and redemption are prohibited.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Currency name |
| » amount | body | string | true | The amount of currency could be lent |
| » type | body | string | true | type: lend - lend, redeem - redeem |
| » min_rate | body | string | false | The minimum interest rate. If the value is too high, it might lead to the unsuccessful lending and no profit will be gained for that hour. |

#### [#](#enumerated-values-125) Enumerated Values

| Parameter | Value |
| --- | --- |
| » type | lend |
| » type | redeem |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Operated successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-s-lending-orders) List user's lending orders

`GET /earn/uni/lends`

_List user's lending orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Loan record |
| »» currency | string | Currency |
| »» current_amount | string | Current amount |
| »» amount | string | Total amount |
| »» lent_amount | string | Lent amount |
| »» frozen_amount | string | Frozen amount |
| »» min_rate | string | Minimum interest rate |
| »» interest_status | string | Interest status: interest_dividend - regular dividend, interest_reinvest - interest reinvestment |
| »» reinvest_left_amount | string | Amount not reinvested |
| »» create_time | integer(int64) | Created time of the lending order |
| »» update_time | integer(int64) | Upated time of the lending order |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-lending-order) Amend lending order

`PATCH /earn/uni/lends`

_Amend lending order_

Currently only supports amending the minimum interest rate (hour)

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | false | Currency name |
| » min_rate | body | string | false | Minimum interest rate |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Updated | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-records-of-lending) List records of lending

`GET /earn/uni/lend_records`

_List records of lending_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| type | query | string | false | type: lend - lend, redeem - redeem |

#### [#](#enumerated-values-126) Enumerated Values

| Parameter | Value |
| --- | --- |
| type | lend |
| type | redeem |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Interest Record |
| »» currency | string | Currency name |
| »» amount | string | current amount |
| »» last_wallet_amount | string | Last wallet amount |
| »» last_lent_amount | string | Last lent amount |
| »» last_frozen_amount | string | Last frozen amount |
| »» type | string | Record type: lend - lend, redeem - redeem |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-the-user-s-total-interest-income-of-specified-currency) Get the user's total interest income of specified currency

`GET /earn/uni/interests/{currency}`

_Get the user's total interest income of specified currency_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | path | string | true | Currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_UniLendInterest_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency |
| » interest | string | Interest |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-interest-records-3) List interest records

`GET /earn/uni/interest_records`

_List interest records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Retrieve data of the specified currency |
| page | query | integer(int32) | false | Page number |
| limit | query | integer(int32) | false | Maximum response items. Default: 100, minimum: 1, Maximum: 100 |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Interest Record |
| »» status | integer | Status: 0 - fail, 1 - success |
| »» currency | string | Currency |
| »» actual_rate | string | Actual Rate |
| »» interest | string | Interest |
| »» interest_status | string | Interest status: interest_dividend - regular dividend, interest_reinvest - interest reinvestment |
| »» create_time | integer(int64) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-interest-reinvestment-toggle) Set interest reinvestment toggle

`PUT /earn/uni/interest_reinvest`

_Set interest reinvestment toggle_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » currency | body | string | true | Currency |
| » status | body | boolean | true | Interest toggle settings, true - interest reinvestment, false - regular dividend |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-currency-interest-compounding-status) query currency interest compounding status

`GET /earn/uni/interest_status/{currency}`

_query currency interest compounding status_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | path | string | true | Currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_UniCurrencyInterest_

| Name | Type | Description |
| --- | --- | --- |
| » currency | string | Currency |
| » interest_status | string | Interest status: interest_dividend - regular dividend, interest_reinvest - interest reinvestment |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#collateral-loan) Collateral-loan

Collateral Loan

## [#](#place-order) Place order

`POST /loan/collateral/orders`

_Place order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » collateral_amount | body | string | true | Collateral amount |
| » collateral_currency | body | string | true | Collateral |
| » borrow_amount | body | string | true | Borrowing amount |
| » borrow_currency | body | string | true | Borrowed currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » order_id | integer(int64) | Order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-orders-2) List Orders

`GET /loan/collateral/orders`

_List Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| collateral_currency | query | string | false | Collateral |
| borrow_currency | query | string | false | Borrowed currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Collateral Order] |
| » None | object | Collateral Order |
| »» order_id | integer(int64) | Order ID |
| »» collateral_currency | string | Collateral |
| »» collateral_amount | string | Collateral amount |
| »» borrow_currency | string | Borrowed currency |
| »» borrow_amount | string | Borrowing amount |
| »» repaid_amount | string | Repaid amount |
| »» repaid_principal | string | Repaid principal |
| »» repaid_interest | string | Repaid interest |
| »» init_ltv | string | The initial collateralization rate |
| »» current_ltv | string | The current collateralization rate |
| »» liquidate_ltv | string | The liquidation collateralization rate |
| »» status | string | Order status:- initial: Initial state after placing the order- collateral_deducted: Collateral deduction successful- collateral_returning: Loan failed - Collateral return pending- lent: Loan successful- repaying: Repayment in progress- liquidating: Liquidation in progress- finished: Order completed- closed_liquidated: Liquidation and repayment completed |
| »» borrow_time | integer(int64) | Borrowing time, timestamp in seconds |
| »» left_repay_total | string | Outstanding principal and interest (outstanding principal + outstanding interest) |
| »» left_repay_principal | string | outstanding principal |
| »» left_repay_interest | string | outstanding interest |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-a-single-order-5) Get a single order

`GET /loan/collateral/orders/{order_id}`

_Get a single order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | integer(int64) | true | Order ID returned on successful order creation |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | Inline |

### Response Schema

Status Code **200**

_Collateral Order_

| Name | Type | Description |
| --- | --- | --- |
| » order_id | integer(int64) | Order ID |
| » collateral_currency | string | Collateral |
| » collateral_amount | string | Collateral amount |
| » borrow_currency | string | Borrowed currency |
| » borrow_amount | string | Borrowing amount |
| » repaid_amount | string | Repaid amount |
| » repaid_principal | string | Repaid principal |
| » repaid_interest | string | Repaid interest |
| » init_ltv | string | The initial collateralization rate |
| » current_ltv | string | The current collateralization rate |
| » liquidate_ltv | string | The liquidation collateralization rate |
| » status | string | Order status:- initial: Initial state after placing the order- collateral_deducted: Collateral deduction successful- collateral_returning: Loan failed - Collateral return pending- lent: Loan successful- repaying: Repayment in progress- liquidating: Liquidation in progress- finished: Order completed- closed_liquidated: Liquidation and repayment completed |
| » borrow_time | integer(int64) | Borrowing time, timestamp in seconds |
| » left_repay_total | string | Outstanding principal and interest (outstanding principal + outstanding interest) |
| » left_repay_principal | string | outstanding principal |
| » left_repay_interest | string | outstanding interest |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#repayment) Repayment

`POST /loan/collateral/repay`

_Repayment_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » order_id | body | integer(int64) | true | Order ID |
| » repay_amount | body | string | true | Repayment amount, it is mandatory when making partial repayments |
| » repaid_all | body | boolean | true | Repayment method, set to true for full repayment, and false for partial repayment; |

#### [#](#detailed-descriptions-36) Detailed descriptions

**» repaid\_all**: Repayment method, set to `true` for full repayment, and `false` for partial repayment; When set to false for partial repayment, the repay\_amount parameter cannot be greater than the remaining amount to be repaid by the user.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Operated successfully | Inline |

### Response Schema

Status Code **200**

_Repay_

| Name | Type | Description |
| --- | --- | --- |
| » repaid_principal | string | Principal |
| » repaid_interest | string | Interest |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#repayment-history) Repayment history

`GET /loan/collateral/repay_records`

_Repayment history_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| source | query | string | true | Operation type: repay - Regular repayment, liquidate - Liquidation |
| borrow_currency | query | string | false | Borrowed currency |
| collateral_currency | query | string | false | Collateral |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Repayment record |
| »» order_id | integer(int64) | Order ID |
| »» record_id | integer(int64) | Repayment record ID |
| »» repaid_amount | string | Repayment amount |
| »» borrow_currency | string | Borrowed currency |
| »» collateral_currency | string | Collateral |
| »» init_ltv | string | The initial collateralization rate |
| »» borrow_time | integer(int64) | Borrowing time, timestamp |
| »» repay_time | integer(int64) | Repayment time, timestamp |
| »» total_interest | string | Total interest |
| »» before_left_principal | string | Principal to be repaid before repayment |
| »» after_left_principal | string | Principal to be repaid after repayment |
| »» before_left_collateral | string | Collateral quantity before repayment |
| »» after_left_collateral | string | Collateral quantity after repayment |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#increase-or-redeem-collateral) Increase or redeem collateral

`POST /loan/collateral/collaterals`

_Increase or redeem collateral_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » order_id | body | integer(int64) | true | Order ID |
| » collateral_currency | body | string | true | Collateral |
| » collateral_amount | body | string | true | Collateral amount |
| » type | body | string | true | Operation types: append - for adding collateral, redeem - for withdrawing collateral |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 204 | No Content (opens new window) | Operated successfully | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-adjustment-records) Query collateral adjustment records

`GET /loan/collateral/collaterals`

_Query collateral adjustment records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| borrow_currency | query | string | false | Borrowed currency |
| collateral_currency | query | string | false | Collateral |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Collateral record |
| »» order_id | integer(int64) | Order ID |
| »» record_id | integer(int64) | Collateral record ID |
| »» borrow_currency | string | Borrowed currency |
| »» borrow_amount | string | Borrowing amount |
| »» collateral_currency | string | Collateral |
| »» before_collateral | string | The collateral amount before adjustment |
| »» after_collateral | string | The collateral amount after adjustment |
| »» before_ltv | string | The collateral ratio before adjustment |
| »» after_ltv | string | The collateral ratio after adjustment |
| »» operate_time | integer(int64) | Timestamp of the operation, in seconds |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-the-total-borrowing-and-collateral-amount-for-the-user) Query the total borrowing and collateral amount for the user

`GET /loan/collateral/total_amount`

_Query the total borrowing and collateral amount for the user_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Total borrowed amount and pledged collateral amount by the user_

| Name | Type | Description |
| --- | --- | --- |
| » borrow_amount | string | Total borrowing amount, calculated in USDT |
| » collateral_amount | string | Total collateral amount, calculated in USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-collateralization-ratio) Query user's collateralization ratio

`GET /loan/collateral/ltv`

_Query user's collateralization ratio_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| collateral_currency | query | string | true | Collateral |
| borrow_currency | query | string | true | Borrowed currency |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_User's currency statistics data_

| Name | Type | Description |
| --- | --- | --- |
| » collateral_currency | string | Collateral |
| » borrow_currency | string | Borrowed currency |
| » init_ltv | string | The initial collateralization rate |
| » alert_ltv | string | Warning collateralization ratio |
| » liquidate_ltv | string | The liquidation collateralization rate |
| » min_borrow_amount | string | Minimum borrowable amount for the loan currency |
| » left_borrowable_amount | string | Remaining borrowable amount for the loan currency |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-supported-borrowing-and-collateral-currencies) Query supported borrowing and collateral currencies

`GET /loan/collateral/currencies`

_Query supported borrowing and collateral currencies_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| loan_currency | query | string | false | The parameter loan_currency is used to specify the borrowing currency. If loan_currency is not provided, the API will return all supported borrowing currencies. If loan_currency is provided, the API will return an array of collateral currencies supported for the specified borrowing currency. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Supported borrowing and collateral currencies |
| »» loan_currency | string | Borrowed currency |
| »» collateral_currency | array | List of supported collateral currencies |

This operation does not require authentication

# [#](#multi-collateral-loan) Multi-collateral-loan

Multi-Collateral Loan

## [#](#create-multi-collateral-order) Create Multi-Collateral Order

`POST /loan/multi_collateral/orders`

_Create Multi-Collateral Order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » order_id | body | string | false | Order ID |
| » order_type | body | string | false | current - current, fixed - fixed, if not specified, default to current |
| » fixed_type | body | string | false | Fixed interest rate loan period: 7d - 7 days, 30d - 30 days. Must be provided for fixed |
| » fixed_rate | body | string | false | Fixed interest rate, must be specified for fixed |
| » auto_renew | body | boolean | false | Fixed interest rate, automatic renewal |
| » auto_repay | body | boolean | false | Fixed interest rate, automatic repayment |
| » borrow_currency | body | string | true | Borrowed currency |
| » borrow_amount | body | string | true | Borrowing amount |
| » collateral_currencies | body | array | false | Collateral currency and amount |
| »» CollateralCurrency | body | object | false | none |
| »»» currency | body | string | false | Currency |
| »»» amount | body | string | false | Size |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » order_id | integer(int64) | Order ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-multi-collateral-orders) List Multi-Collateral Orders

`GET /loan/multi_collateral/orders`

_List Multi-Collateral Orders_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | integer | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| sort | query | string | false | Sort types: time_desc - default sorting by creation time in descending order, ltv_asc - ascending order of ltv, ltv_desc - descending order of ltv. |
| order_type | query | string | false | Order type, current - query current orders, fixed - query fixed orders. If not specified, default to querying current orders |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | [Multi-Collateral Order] |
| » None | object | Multi-Collateral Order |
| »» order_id | string | Order ID |
| »» order_type | string | current - current, fixed - fixed |
| »» fixed_type | string | Fixed interest rate loan periods: 7d - 7 days, 30d - 30 days. |
| »» fixed_rate | string | Fixed interest rate |
| »» expire_time | integer(int64) | Expiration time, timestamp, unit in seconds. |
| »» auto_renew | boolean | Fixed interest rate, automatic renewal |
| »» auto_repay | boolean | Fixed interest rate, automatic repayment |
| »» current_ltv | string | The current collateralization rate |
| »» status | string | Order status:- initial: Initial state after placing the order- collateral_deducted: Collateral deduction successful- collateral_returning: Loan failed - Collateral return pending- lent: Loan successful- repaying: Repayment in progress- liquidating: Liquidation in progress- finished: Order completed- closed_liquidated: Liquidation and repayment completed |
| »» borrow_time | integer(int64) | Borrowing time, timestamp in seconds |
| »» total_left_repay_usdt | string | Value of Left repay amount converted in USDT |
| »» total_left_collateral_usdt | string | Value of Collateral amount in USDT |
| »» borrow_currencies | array | Borrowing Currency List |
| »»» BorrowCurrencyInfo | object | none |
| »»»» currency | string | Currency |
| »»»» index_price | string | Currency Index Price |
| »»»» left_repay_principal | string | outstanding principal |
| »»»» left_repay_interest | string | outstanding interest |
| »»»» left_repay_usdt | string | Value of left total repayments amount in USDT |
| »»» collateral_currencies | array | Collateral Currency List |
| »»»» CollateralCurrencyInfo | object | none |
| »»»»» currency | string | Currency |
| »»»»» index_price | string | Currency Index Price |
| »»»»» left_collateral | string | Left Collateral Amount |
| »»»»» left_collateral_usdt | string | Value of left collateral amount in USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-multi-collateral-order-detail) Get Multi-Collateral Order Detail

`GET /loan/multi_collateral/orders/{order_id}`

_Get Multi-Collateral Order Detail_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| order_id | path | string | true | Order ID returned on successful order creation |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | Inline |

### Response Schema

Status Code **200**

_Multi-Collateral Order_

| Name | Type | Description |
| --- | --- | --- |
| » order_id | string | Order ID |
| » order_type | string | current - current, fixed - fixed |
| » fixed_type | string | Fixed interest rate loan periods: 7d - 7 days, 30d - 30 days. |
| » fixed_rate | string | Fixed interest rate |
| » expire_time | integer(int64) | Expiration time, timestamp, unit in seconds. |
| » auto_renew | boolean | Fixed interest rate, automatic renewal |
| » auto_repay | boolean | Fixed interest rate, automatic repayment |
| » current_ltv | string | The current collateralization rate |
| » status | string | Order status:- initial: Initial state after placing the order- collateral_deducted: Collateral deduction successful- collateral_returning: Loan failed - Collateral return pending- lent: Loan successful- repaying: Repayment in progress- liquidating: Liquidation in progress- finished: Order completed- closed_liquidated: Liquidation and repayment completed |
| » borrow_time | integer(int64) | Borrowing time, timestamp in seconds |
| » total_left_repay_usdt | string | Value of Left repay amount converted in USDT |
| » total_left_collateral_usdt | string | Value of Collateral amount in USDT |
| » borrow_currencies | array | Borrowing Currency List |
| »» BorrowCurrencyInfo | object | none |
| »»» currency | string | Currency |
| »»» index_price | string | Currency Index Price |
| »»» left_repay_principal | string | outstanding principal |
| »»» left_repay_interest | string | outstanding interest |
| »»» left_repay_usdt | string | Value of left total repayments amount in USDT |
| »» collateral_currencies | array | Collateral Currency List |
| »»» CollateralCurrencyInfo | object | none |
| »»»» currency | string | Currency |
| »»»» index_price | string | Currency Index Price |
| »»»» left_collateral | string | Left Collateral Amount |
| »»»» left_collateral_usdt | string | Value of left collateral amount in USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#repay-multi-collateral-loan) Repay Multi-Collateral Loan

`POST /loan/multi_collateral/repay`

_Repay Multi-Collateral Loan_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » order_id | body | integer(int64) | true | Order ID |
| » repay_items | body | array | true | Repay Currency Item |
| »» MultiLoanRepayItem | body | object | false | none |
| »»» currency | body | string | false | Repayment currency |
| »»» amount | body | string | false | Size |
| »»» repaid_all | body | boolean | false | Repayment method, set to true for full repayment, false for partial repayment. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Operated successfully | Inline |

### Response Schema

Status Code **200**

_Repay Multi-Collateral Loan_

| Name | Type | Description |
| --- | --- | --- |
| » order_id | integer(int64) | Order ID |
| » repaid_currencies | array | Repay Currency List |
| »» RepayCurrencyRes | object | none |
| »»» succeeded | boolean | Has the repayment been successful |
| »»» label | string | Error identifier for unsuccessful operations; empty for successful. |
| »»» message | string | Error description in case of operation failure; empty when successful. |
| »»» currency | string | Repayment currency |
| »»» repaid_principal | string | Principal |
| »»» repaid_interest | string | Principal |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-multi-collateral-repay-records) List Multi-Collateral Repay Records

`GET /loan/multi_collateral/repay`

_List Multi-Collateral Repay Records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| type | query | string | true | Operation type: repay - Regular repayment, liquidate - Liquidation |
| borrow_currency | query | string | false | Borrowed currency |
| page | query | integer | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Mult Repay Record |
| »» order_id | integer(int64) | Order ID |
| »» record_id | integer(int64) | Repayment record ID |
| »» init_ltv | string | The initial collateralization rate |
| »» before_ltv | string | Ltv before the operation |
| »» after_ltv | string | Ltv after the operation |
| »» borrow_time | integer(int64) | Borrowing time, timestamp in seconds. |
| »» repay_time | integer(int64) | Repayment time, timestamp in seconds. |
| »» borrow_currencies | array | List of borrowing information |
| »»» currency | string | Currency |
| »»» index_price | string | Currency Index Price |
| »»» before_amount | string | Amount before the operation |
| »»» before_amount_usdt | string | USDT Amount before the operation. |
| »»» after_amount | string | Amount after the operation. |
| »»» after_amount_usdt | string | USDT Amount after the operation. |
| »» collateral_currencies | array | List of collateral information |
| »»» currency | string | Currency |
| »»» index_price | string | Currency Index Price |
| »»» before_amount | string | Amount before the operation |
| »»» before_amount_usdt | string | USDT Amount before the operation. |
| »»» after_amount | string | Amount after the operation. |
| »»» after_amount_usdt | string | USDT Amount after the operation. |
| »» repaid_currencies | array | Repay Currency List |
| »»» RepayRecordRepaidCurrency | object | none |
| »»»» currency | string | Repayment currency |
| »»»» index_price | string | Currency Index Price |
| »»»» repaid_amount | string | Repayment amount |
| »»»» repaid_principal | string | Principal |
| »»»» repaid_interest | string | Interest |
| »»»» repaid_amount_usdt | string | Value of the repayment amount in USDT |
| »»» total_interest_list | array | Total Interest List |
| »»»» RepayRecordTotalInterest | object | none |
| »»»»» currency | string | Currency |
| »»»»» index_price | string | Currency Index Price |
| »»»»» amount | string | Interest Amount |
| »»»»» amount_usdt | string | Interest amount converted to USDT |
| »»»» left_repay_interest_list | array | List of left repay interest |
| »»»»» RepayRecordLeftInterest | object | none |
| »»»»»» currency | string | Currency |
| »»»»»» index_price | string | Currency Index Price |
| »»»»»» before_amount | string | Interest amount before repayment |
| »»»»»» before_amount_usdt | string | Converted value of interest before repayment in USDT |
| »»»»»» after_amount | string | Interest amount after repayment |
| »»»»»» after_amount_usdt | string | Converted value of interest after repayment in USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#operate-multi-collateral) Operate Multi-Collateral

`POST /loan/multi_collateral/mortgage`

_Operate Multi-Collateral_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » order_id | body | integer(int64) | true | Order ID |
| » type | body | string | true | Operation types: append - for adding collateral, redeem - for withdrawing collateral |
| » collaterals | body | array | false | Collateral Currency List |
| »» currency | body | string | false | Currency |
| »» amount | body | string | false | Size |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Operated successfully | Inline |

### Response Schema

Status Code **200**

_Result of multi-collateral adjustment_

| Name | Type | Description |
| --- | --- | --- |
| » order_id | integer(int64) | Order ID |
| » collateral_currencies | array | Collateral Currency Information |
| »» CollateralCurrencyRes | object | none |
| »»» succeeded | boolean | Update success status |
| »»» label | string | Error identifier for unsuccessful operations; empty for successful. |
| »»» message | string | Error description in case of operation failure; empty when successful. |
| »»» currency | string | Currency |
| »»» amount | string | Quantity of successful collateral operation; 0 if the operation fails. |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-collateral-adjustment-records-2) Query collateral adjustment records

`GET /loan/multi_collateral/mortgage`

_Query collateral adjustment records_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| page | query | integer | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| from | query | integer(int64) | false | Start timestamp of the query |
| to | query | integer(int64) | false | Time range ending, default to current time |
| collateral_currency | query | string | false | Collateral |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Multi-Collateral adjustment record. |
| »» order_id | integer(int64) | Order ID |
| »» record_id | integer(int64) | Collateral record ID |
| »» before_ltv | string | The collateral ratio before adjustment |
| »» after_ltv | string | The collateral ratio before adjustment |
| »» operate_time | integer(int64) | Operation time, timestamp in seconds. |
| »» borrow_currencies | array | Borrowing Currency List |
| »»» currency | string | Currency |
| »»» index_price | string | Currency Index Price |
| »»» before_amount | string | Amount before the operation |
| »»» before_amount_usdt | string | USDT Amount before the operation. |
| »»» after_amount | string | Amount after the operation. |
| »»» after_amount_usdt | string | USDT Amount after the operation. |
| »» collateral_currencies | array | Collateral Currency List |
| »»» currency | string | Currency |
| »»» index_price | string | Currency Index Price |
| »»» before_amount | string | Amount before the operation |
| »»» before_amount_usdt | string | USDT Amount before the operation. |
| »»» after_amount | string | Amount after the operation. |
| »»» after_amount_usdt | string | USDT Amount after the operation. |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-user-currency-quota) List User Currency Quota

`GET /loan/multi_collateral/currency_quota`

_List User Currency Quota_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| type | query | string | true | Currency types: collateral - collateral currency, borrow - borrowing currency. |
| currency | query | string | true | When specifying collateral currencies, you can use commas to separate multiple currencies; for borrowing currencies, only one currency can be provided. |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Currency Quota |
| »» currency | string | Currency |
| »» index_price | string | Currency Index Price |
| »» min_quota | string | Minimum borrowing/collateral quota for the currency |
| »» left_quota | string | Remaining borrowing/collateral limit for the currency |
| »» left_quote_usdt | string | Remaining currency limit converted to USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-supported-borrowing-and-collateral-currencies-in-multi-collateral) Query supported borrowing and collateral currencies in Multi-Collateral

`GET /loan/multi_collateral/currencies`

\*Query supported borrowing and collateral currencies in Multi-Collateral \*

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Borrowing and collateral currencies supported for Multi-Collateral._

| Name | Type | Description |
| --- | --- | --- |
| » loan_currencies | array | List of supported borrowing currencies |
| »» MultiLoanItem | object | none |
| »»» currency | string | Currency |
| »»» price | string | Latest price of the currency |
| »» collateral_currencies | array | List of supported collateral currencies |
| »»» MultiCollateralItem | object | none |
| »»»» currency | string | Currency |
| »»»» index_price | string | Currency Index Price |
| »»»» discount | string | Discount |

This operation does not require authentication

## [#](#get-multi-collateral-ratio) Get Multi-Collateral ratio

`GET /loan/multi_collateral/ltv`

_Get Multi-Collateral ratio_

The Multi-Collateral ratio is fixed, irrespective of the currency.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

_Collateral Ratio_

| Name | Type | Description |
| --- | --- | --- |
| » init_ltv | string | The initial collateralization rate |
| » alert_ltv | string | Warning collateralization ratio |
| » liquidate_ltv | string | The liquidation collateralization rate |

This operation does not require authentication

## [#](#query-fixed-interest-rates-for-the-currency-for-7-days-and-30-days) Query fixed interest rates for the currency for 7 days and 30 days

`GET /loan/multi_collateral/fixed_rate`

_Query fixed interest rates for the currency for 7 days and 30 days_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Multi-collateral fixed interest rate |
| »» currency | string | Currency |
| »» rate_7d | string | Fixed interest rate for a lending period of 7 days |
| »» rate_30d | string | Fixed interest rate for a lending period of 30 days |
| »» update_time | integer(int64) | Update time, timestamp, unit in seconds |

This operation does not require authentication

## [#](#query-the-current-interest-rate-of-the-currency) Query the current interest rate of the currency

`GET /loan/multi_collateral/current_rate`

_Query the current interest rate of the currency_

Query the current interest rate of the currency in the last hour. The current interest rate is updated every hour.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currencies | query | array[string] | true | Specify the currency name to query the array. The array is separated by commas and has a maximum of 100 items. |
| vip_level | query | string | false | VIP level, defaults to 0 if not transferred |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Multi-currency pledge current interest rate |
| »» currency | string | Currency |
| »» current_rate | string | Currency current interest rate |

This operation does not require authentication

# [#](#earn) Earn

earn

## [#](#eth2-swap) ETH2 swap

`POST /earn/staking/eth2/swap`

_ETH2 swap_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » side | body | string | true | 1-Forward Swap（ETH -> ETH2）, 2-Reverse Swap（ETH2 -> ETH） |
| » amount | body | string | true | amount |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | swap success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#eth2-historical-rate-of-return-query) ETH2 historical rate of return query

`GET /earn/staking/eth2/rate_records`

_ETH2 historical rate of return query_

Check the ETH earnings rate record for the last 31 days

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » date_time | integer(int64) | Date and Time Stamp |
| » date | string | Date |
| » rate | string | percentage |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#dual-investment-product-list) Dual Investment product list

`GET /earn/dual/investment_plan`

_Dual Investment product list_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| plan_id | query | integer(int64) | false | Financial project id |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int32) | Plan ID |
| » instrument_name | string | Instrument Name |
| » invest_currency | string | Investment Currency |
| » exercise_currency | string | Strike Currency |
| » exercise_price | number(double) | Strike price |
| » delivery_time | integer(int32) | Settlement time |
| » min_copies | integer(int32) | Minimum Copies |
| » max_copies | integer(int32) | Maximum Copies |
| » per_value | string | Per Unit Value |
| » apy_display | string | APY |
| » start_time | integer(int32) | start time |
| » end_time | integer(int32) | Finished time |
| » status | string | Status:NOTSTARTED-not startedONGOING-ongoingENDED-ended |

This operation does not require authentication

## [#](#dual-investment-order-list) Dual Investment order list

`GET /earn/dual/orders`

_Dual Investment order list_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| from | query | integer(int64) | false | Start checkout time |
| to | query | integer(int64) | false | End settlement time |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int32) | Order ID |
| » plan_id | integer(int32) | Plan ID |
| » copies | string | Copies |
| » invest_amount | string | Investment Amount |
| » settlement_amount | string | Settlement Amount |
| » create_time | integer(int32) | Creation time |
| » complete_time | integer(int32) | Completion Time |
| » status | string | Status:INIT-INITSETTLEMENT_SUCCESS-Settlement SuccessSETTLEMENT_PROCESSING-SEttlement ProcessingCANCELED-CanceledFAILED-Failed |
| » invest_currency | string | Investment Currency |
| » exercise_currency | string | Strike Currency |
| » exercise_price | string | Strike price |
| » settlement_price | string | settlement price |
| » settlement_currency | string | Settle currency |
| » apy_display | string | APY |
| » apy_settlement | string | Settlement APY |
| » delivery_time | integer(int32) | Settlement time |
| » text | string | Custom order information |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-dual-investment-order) Place Dual Investment order

`POST /earn/dual/orders`

_Place Dual Investment order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » plan_id | body | string | true | Plan ID |
| » copies | body | string | false | The number of copies is mutually exclusive with the amount field and will be deprecated soon. It is recommended to use the amount parameter. |
| » is_max | body | integer(int32) | false | Whether to purchase at the maximum. Mutually exclusive with the amount field. Will be deprecated soon. It is recommended to use the amount parameter. |
| » amount | body | string | true | Subscription amount, mutually exclusive with the copies field |
| » text | body | string | false | User defined information. If not empty, must follow the rules below: |

#### [#](#detailed-descriptions-37) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#structured-product-list) Structured Product List

`GET /earn/structured/products`

_Structured Product List_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| type | query | string | false | Product Type (default all) |
| status | query | string | true | Status (default: all) |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

#### [#](#detailed-descriptions-38) Detailed descriptions

**type**: Product Type (default all)

`SharkFin2.0`\-SharkFin `BullishSharkFin`\-BullishSharkFin `BearishSharkFin`\-BearishSharkFin `DoubleNoTouch`\-DoubleNoTouch `RangeAccrual`\-RangeAccrual `SnowBall`\-SnowBall

**status**: Status (default: all)

`in_process`\-processing `will_begin`\-unstarted `wait_settlement`\-unsettled `done`\-finish

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Structured Products |
| »» id | integer(int32) | Plan ID |
| »» type | string | product type:SharkFin2.0-Shark Fin2.0BullishSharkFin-Bullish Shark FinBearishSharkFin-Bearish Shark FinDoubleNoTouch-Double No-TouchRangeAccrual-Range AccrualSnowBall-Snow Ball |
| »» name_en | string | name |
| »» investment_coin | string | Investment Currency |
| »» investment_period | string | Investment term |
| »» min_annual_rate | string | Minimum annual rate |
| »» mid_annual_rate | string | Intermediate annual rate |
| »» max_annual_rate | string | Maximum annual rate |
| »» watch_market | string | Watch market |
| »» start_time | integer(int32) | start time |
| »» end_time | integer(int32) | Finished time |
| »» status | string | Status:in_process-in progresswill_begin-will beginwait_settlement-waiting for settlementdone-done |

This operation does not require authentication

## [#](#structured-product-order-list) Structured Product Order List

`GET /earn/structured/orders`

_Structured Product Order List_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| from | query | integer(int64) | false | Start timestamp |
| to | query | integer(int64) | false | End timestamp |
| page | query | integer(int32) | false | Page number |
| limit | query | integer | false | Maximum number of records to be returned in a single list |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Structured order |
| »» id | integer(int32) | Order ID |
| »» pid | string | Plan ID |
| »» lock_coin | string | Locked coin |
| »» amount | string | Locked amount |
| »» status | string | Status:SUCCESS - SUCCESSFAILED - FAILEDDONE - DONE |
| »» income | string | Income |
| »» create_time | integer(int32) | Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-structured-product-order) Place Structured Product Order

`POST /earn/structured/orders`

_Place Structured Product Order_

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » pid | body | string | false | Plan ID |
| » amount | body | string | false | Purchase Amount |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#account) Account

Get account detail

## [#](#get-account-detail) Get account detail

`GET /account/detail`

_Get account detail_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | Inline |

### Response Schema

Status Code **200**

_AccountDetail_

| Name | Type | Description |
| --- | --- | --- |
| » ip_whitelist | array | IP whitelist |
| » currency_pairs | array | CurrencyPair whitelisting |
| » user_id | integer(int64) | User ID |
| » tier | integer(int64) | User VIP level |
| » key | object | API Key detail |
| »» mode | integer(int32) | mode: 1 - classic account 2 - portfolio margin account |
| » copy_trading_role | integer(int32) | User role: 0 - Ordinary user 1 - Order leader 2 - Follower 3 - Order leader and follower |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-transaction-rate-limit-information) Get user transaction rate limit information

`GET /account/rate_limit`

_Get user transaction rate limit information_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successful | [Inline] |

### Response Schema

Status Code **200**

_AccountRateLimit_

| Name | Type | Description |
| --- | --- | --- |
| AccountRateLimit | array | Account flow limit |
| » tier | string | Frequency limit level (For detailed frequency limit rules, see Transaction ratio frequency limit) |
| » ratio | string | Transaction rate |
| » main_ratio | string | Total transaction ratio of main account |
| » updated_at | string | Update time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#create-stp-group) Create STP Group

`POST /account/stp_groups`

_Create STP Group_

Only the main account is allowed to create a new STP user group

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | object | true | none |
| » id | body | integer(int64) | false | STP Group ID |
| » name | body | string | true | STP Group name |
| » creator_id | body | integer(int64) | false | Creator ID |
| » create_time | body | integer(int64) | false | Creation time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | User added successfully. Returning the current users within the STP group. | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » id | integer(int64) | STP Group ID |
| » name | string | STP Group name |
| » creator_id | integer(int64) | Creator ID |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-stp-groups) List STP Groups

`GET /account/stp_groups`

_List STP Groups_

Retrieve the list of STP groups created by the main account user only

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| name | query | string | false | Perform a fuzzy search based on the name |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » id | integer(int64) | STP Group ID |
| » name | string | STP Group name |
| » creator_id | integer(int64) | Creator ID |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-users-of-the-stp-group) List users of the STP group

`GET /account/stp_groups/{stp_id}/users`

_List users of the STP group_

Only the main account that created this STP group is allowed to list the user ID of the STP group

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stp_id | path | integer(int64) | true | STP Group ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » user_id | integer(int64) | User ID |
| » stp_id | integer(int64) | STP Group ID |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#add-users-to-the-stp-group) Add users to the STP group

`POST /account/stp_groups/{stp_id}/users`

_Add users to the STP group_

*   Only the master account that created the STP user group is allowed to add users to the STP user group.- Only accounts under the main account are allowed to be added. Cross-account is not permitted

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stp_id | path | integer(int64) | true | STP Group ID |
| body | body | array[integer] | true | User ID |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | User added successfully. Returning the current users within the STP group. | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » user_id | integer(int64) | User ID |
| » stp_id | integer(int64) | STP Group ID |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-the-user-in-the-stp-group) Delete the user in the STP group

`DELETE /account/stp_groups/{stp_id}/users`

_Delete the user in the STP group_

*   Only the main account that created this STP group is allowed to delete users from the STP user group
*   Deletion is limited to accounts under the current main account; cross-account deletion is not permitted

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| stp_id | path | integer(int64) | true | STP Group ID |
| user_id | query | integer(int64) | true | STP user ID, multiple can be separated by commas |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | [Inline] |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| None | array | none |
| » user_id | integer(int64) | User ID |
| » stp_id | integer(int64) | STP Group ID |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#set-gt-deduction) Set GT deduction.

`POST /account/debit_fee`

_Set GT deduction._

Enable or disable GT deduction for the current account.

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| body | body | DebitFee | true | none |
| » enabled | body | boolean | true | Whether GT fee discount is used |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | None |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-gt-deduction-configuration) Query GT deduction configuration.

`GET /account/debit_fee`

_Query GT deduction configuration._

Query the current GT deduction configuration for the account.

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Success | DebitFee |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#rebate-2) Rebate

broker rebate endpints

## [#](#the-agency-obtains-the-transaction-history-of-the-recommended-user) The agency obtains the transaction history of the recommended user

`GET /rebate/agency/transaction_history`

_The agency obtains the transaction history of the recommended user_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Specify the currency pair, if not specified, return all currency pairs |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency_pair | string | Currency pair |
| » total | integer(int64) | Total |
| » list | array | List of transaction history |
| »» AgencyTransaction | object | none |
| »»» transaction_time | integer(int64) | Transaction Time. (unix timestamp) |
| »»» user_id | integer(int64) | User ID |
| »»» group_name | string | Group name |
| »»» fee | string | Fee |
| »»» fee_asset | string | Fee currency |
| »»» currency_pair | string | Currency pair |
| »»» amount | string | Commission Amount |
| »»» amount_asset | string | Commission Asset |
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#the-agency-obtains-the-commission-history-of-the-recommended-user) The agency obtains the commission history of the recommended user

`GET /rebate/agency/commission_history`

_The agency obtains the commission history of the recommended user_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Filter by currency. Return all currency records if not specified |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » currency_pair | string | Currency pair |
| » total | integer(int64) | Total |
| » list | array | List of comission history |
| »» AgencyCommission | object | none |
| »»» commission_time | integer(int64) | Commission Time. (unix timestamp) |
| »»» user_id | integer(int64) | User ID |
| »»» group_name | string | Group name |
| »»» commission_amount | string | Commission Amount |
| »»» commission_asset | string | Commission Asset |
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-obtains-transaction-records-of-recommended-users) Partner obtains transaction records of recommended users

`GET /rebate/partner/transaction_history`

_Partner obtains transaction records of recommended users_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency_pair | query | string | false | Specify the currency pair, if not specified, return all currency pairs |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | integer(int64) | Total |
| » list | array | List of transaction history |
| »» PartnerTransaction | object | none |
| »»» transaction_time | integer(int64) | Transaction Time. (unix timestamp) |
| »»» user_id | integer(int64) | User ID |
| »»» group_name | string | Group name |
| »»» fee | string | Fee |
| »»» fee_asset | string | Fee currency |
| »»» currency_pair | string | Currency pair |
| »»» amount | string | Commission Amount |
| »»» amount_asset | string | Commission Asset |
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-obtains-commission-records-of-recommended-users) Partner obtains commission records of recommended users

`GET /rebate/partner/commission_history`

_Partner obtains commission records of recommended users_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| currency | query | string | false | Filter by currency. Return all currency records if not specified |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| from | query | integer(int64) | false | Time range beginning, default to 7 days before current time |
| to | query | integer(int64) | false | Time range ending, default to current time |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | integer(int64) | Total |
| » list | array | List of comission history |
| »» PartnerCommission | object | none |
| »»» commission_time | integer(int64) | Commission Time. (unix timestamp) |
| »»» user_id | integer(int64) | User ID |
| »»» group_name | string | Group name |
| »»» commission_amount | string | Commission Amount |
| »»» commission_asset | string | Commission Asset |
| »»» source | string | Source. SPOT - SPOT Rebate, FUTURES - Futures Rebate |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-subordinate-list) Partner subordinate list

`GET /rebate/partner/sub_list`

_Partner subordinate list_

Including sub-agents, direct customers, indirect customers

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | integer(int64) | Total |
| » list | array | Subordinate list |
| »» PartnerSub | object | none |
| »»» user_id | integer(int64) | User ID |
| »»» user_join_time | integer(int64) | The time when the user joined the system, in seconds Unix timestamp |
| »»» type | integer(int64) | Type (1-Sub-agent 2-Indirect Customer 3-Direct Customer) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#the-broker-obtains-the-user-s-commission-rebate-records) The broker obtains the user's commission rebate records

`GET /rebate/broker/commission_history`

_The broker obtains the user's commission rebate records_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| from | query | integer(int64) | false | The start time of the query record. If not specified, the default is to push forward 30 days from the current time. |
| to | query | integer(int64) | false | Time range ending, default to current time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | integer(int64) | Total |
| » list | array | List of comission history |
| »» BrokerCommission | object | none |
| »»» commission_time | integer(int64) | Commission Time. (unix timestamp) |
| »»» user_id | integer(int64) | User ID |
| »»» group_name | string | Group name |
| »»» amount | string | The amount of commission rebates |
| »»» fee | string | Fee |
| »»» fee_asset | string | Fee currency |
| »»» rebate_fee | string | The income from rebates, converted to USDT |
| »»» source | string | Rebate Type: Spot、Futures、Options |
| »»» currency_pair | string | Currency pair |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#the-broker-obtains-the-user-s-trading-history) The broker obtains the user's trading history

`GET /rebate/broker/transaction_history`

_The broker obtains the user's trading history_

Record time range cannot exceed 30 days

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| limit | query | integer | false | Maximum number of records to be returned in a single list |
| offset | query | integer | false | List offset, starting from 0 |
| user_id | query | integer(int64) | false | User ID. If not specified, all user records will be returned |
| from | query | integer(int64) | false | The start time of the query record. If not specified, the default is to push forward 30 days from the current time. |
| to | query | integer(int64) | false | Time range ending, default to current time |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » total | integer(int64) | Total |
| » list | array | List of transaction history |
| »» BrokerTransaction | object | none |
| »»» transaction_time | integer(int64) | Transaction Time. (unix timestamp) |
| »»» user_id | integer(int64) | User ID |
| »»» group_name | string | Group name |
| »»» fee | string | fee (usdt) |
| »»» currency_pair | string | Currency pair |
| »»» amount | string | Commission Amount |
| »»» fee_asset | string | Fee currency |
| »»» source | string | Rebate Type: Spot、Futures、Options |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#user-retrieves-rebate-information) User retrieves rebate information

`GET /rebate/user/info`

_User retrieves rebate information_

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | Successfully retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » None | object | Retrieve user rebate information |
| »» invite_uid | integer(int64) | My inviter's UID |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#user-subordinate-relationship) User-subordinate relationship

`GET /rebate/user/sub_relation`

_User-subordinate relationship_

Query whether the specified user is in the system

### Parameters

| Name | In | Type | Required | Description |
| --- | --- | --- | --- | --- |
| user_id_list | query | string | true | Query the user's ID list, split by,, if there are more than 100, take 100 |

### Responses

| Status | Meaning | Description | Schema |
| --- | --- | --- | --- |
| 200 | OK (opens new window) | List retrieved | Inline |

### Response Schema

Status Code **200**

| Name | Type | Description |
| --- | --- | --- |
| » list | array | Subordinate relationship list |
| »» UserSub | object | none |
| »»» uid | integer(int64) | User ID |
| »»» belong | string | The system to which the user belongs (partner referral). If empty, it means not belonging to any system. |
| »»» type | integer(int64) | Type (0-not in the system 1-direct subordinate agent 2-indirect subordinate agent 3-direct direct customer 4-indirect direct customer 5-ordinary user) |
| »»» ref_uid | integer(int64) | Inviter user ID |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#schemas) Schemas

## [#](#subaccountkey) SubAccountKey

### [#](#properties) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| user_id | string | false | read-only | User ID |
| mode | integer(int32) | false | none | Mode: 1 - classic 2 - portfolio account |
| name | string | false | none | API key name |
| perms | array | false | none | none |
| » name | string | false | none | Permission function name (no value will be cleared)- wallet: wallet- spot: spot/leverage- futures: perpetual contract- delivery: delivery contract- earn: financial management- custody: custody- options: options- account: account information- loan: loan- margin: leverage- unified: unified account- copy: copy |
| » read_only | boolean | false | none | read only |
| ip_whitelist | array | false | none | ip white list (list will be removed if no value is passed) |
| key | string | false | read-only | API Key |
| state | integer(int32) | false | read-only | State 1 - normal 2 - locked 3 - frozen |
| created_at | integer(int64) | false | read-only | Creation time |
| updated_at | integer(int64) | false | read-only | Last update time |
| last_access | integer(int64) | false | read-only | Last access time |

## [#](#estimaterate) EstimateRate

_Estimate the current hourly lending rates, categorized by currency_

### [#](#properties-2) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| additionalProperties | string | false | none | none |

## [#](#currencypair) CurrencyPair

_Spot currency pair_

### [#](#properties-3) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| id | string | false | none | Currency pair |
| base | string | false | none | Base currency |
| base_name | string | false | none | Transaction currency name |
| quote | string | false | none | Quote currency |
| quote_name | string | false | none | Name of the denominated currency |
| fee | string | false | none | Trading fee |
| min_base_amount | string | false | none | Minimum amount of base currency to trade, null means no limit |
| min_quote_amount | string | false | none | Minimum amount of quote currency to trade, null means no limit |
| max_base_amount | string | false | none | Maximum amount of base currency to trade, null means no limit |
| max_quote_amount | string | false | none | Maximum amount of quote currency to trade, null means no limit |
| amount_precision | integer | false | none | Amount scale |
| precision | integer | false | none | Price scale |
| trade_status | string | false | none | How currency pair can be traded- untradable: cannot be bought or sold- buyable: can be bought- sellable: can be sold- tradable: can be bought or sold |
| sell_start | integer(int64) | false | none | Sell start unix timestamp in seconds |
| buy_start | integer(int64) | false | none | Buy start unix timestamp in seconds |
| type | string | false | none | Trading pair type, normal: normal, premarket: pre-market |

#### [#](#enumerated-values-127) Enumerated Values

| Property | Value |
| --- | --- |
| trade_status | untradable |
| trade_status | buyable |
| trade_status | sellable |
| trade_status | tradable |

## [#](#order-2) Order

_Spot order details_

### [#](#properties-4) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| id | string | false | read-only | Order ID |
| text | string | false | none | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- 101: from android- 102: from IOS- 103: from IPAD- 104: from webapp- 3: from web- 2: from apiv2- apiv4: from apiv4 |
| amend_text | string | false | read-only | The custom data that the user remarked when amending the order |
| create_time | string | false | read-only | Creation time of order |
| update_time | string | false | read-only | Last modification time of order |
| create_time_ms | integer(int64) | false | read-only | Creation time of order (in milliseconds) |
| update_time_ms | integer(int64) | false | read-only | Last modification time of order (in milliseconds) |
| status | string | false | read-only | Order status- open: to be filled- closed: filled- cancelled: cancelled |
| currency_pair | string | true | none | Currency pair |
| type | string | false | none | Order Type- limit : Limit Order- market : Market Order |
| account | string | false | none | Account type, spot - spot account, margin - leveraged account, unified - unified account |
| side | string | true | none | Order side |
| amount | string | true | none | When type is limit, it refers to base currency. For instance, BTC_USDT means BTCWhen type is market, it refers to different currency according to side- side : buy means quote currency, BTC_USDT means USDT- side : sell means base currency，BTC_USDT means BTC |
| price | string | false | none | Price can't be empty when type= limit |
| time_in_force | string | false | none | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or noneOnly ioc and fok are supported when type=market |
| iceberg | string | false | none | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported. |
| auto_borrow | boolean | false | write-only | Used in margin or cross margin trading to allow automatic loan of insufficient amount if balance is not enough. |
| auto_repay | boolean | false | none | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:1. This field is only effective for cross margin orders. Margin account does not support setting auto repayment for orders.2. auto_borrow and auto_repay can be both set to true in one order. |
| left | string | false | read-only | Amount left to fill |
| filled_amount | string | false | read-only | Amount traded to fill |
| fill_price | string | false | read-only | Total filled in quote currency. Deprecated in favor of filled_total |
| filled_total | string | false | read-only | Total filled in quote currency |
| avg_deal_price | string | false | read-only | Average fill price |
| fee | string | false | read-only | Fee deducted |
| fee_currency | string | false | read-only | Fee currency unit |
| point_fee | string | false | read-only | Points used to deduct fee |
| gt_fee | string | false | read-only | GT used to deduct fee |
| gt_maker_fee | string | false | read-only | GT used to deduct maker fee |
| gt_taker_fee | string | false | read-only | GT used to deduct taker fee |
| gt_discount | boolean | false | read-only | Whether GT fee discount is used |
| rebated_fee | string | false | read-only | Rebated fee |
| rebated_fee_currency | string | false | read-only | Rebated fee currency unit |
| stp_id | integer | false | read-only | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |
| stp_act | string | false | none | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| finish_as | string | false | read-only | Order completion statuses include:- open: Awaiting processing- filled: Fully filled- cancelled: Cancelled by user- liquidate_cancelled: Cancelled due to liquidation- small: Order quantity too small- depth_not_enough: Cancelled due to insufficient market depth- trader_not_enough: Cancelled due to insufficient counterparty- ioc: Not immediately filled because tif is set to ioc- poc: Not met the order strategy because tif is set to poc- fok: Not fully filled immediately because tif is set to fok- stp: Cancelled due to self-trade prevention- unknown: Unknown |
| action_mode | string | false | write-only | Processing Mode:When placing an order, different fields are returned based on action_mode. This field is only valid during the request and is not included in the response resultACK: Asynchronous mode, only returns key order fieldsRESULT: No clearing informationFULL: Full mode (default) |

#### [#](#enumerated-values-128) Enumerated Values

| Property | Value |
| --- | --- |
| status | open |
| status | closed |
| status | cancelled |
| type | limit |
| type | market |
| side | buy |
| side | sell |
| time_in_force | gtc |
| time_in_force | ioc |
| time_in_force | poc |
| time_in_force | fok |
| stp_act | cn |
| stp_act | co |
| stp_act | cb |
| stp_act | - |
| finish_as | open |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidate_cancelled |
| finish_as | depth_not_enough |
| finish_as | trader_not_enough |
| finish_as | small |
| finish_as | ioc |
| finish_as | poc |
| finish_as | fok |
| finish_as | stp |
| finish_as | unknown |

## [#](#cancelbatchorder) CancelBatchOrder

_Info of order to be cancelled_

### [#](#properties-5) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| currency_pair | string | true | none | Order currency pair |
| id | string | true | none | Order ID or user custom ID.Custom ID are accepted only within 30 minutes after order creation |
| action_mode | string | false | none | Processing Mode:When placing an order, different fields are returned based on action_mode. This field is only valid during the request and is not included in the response resultACK: Asynchronous mode, only returns key order fieldsRESULT: No clearing informationFULL: Full mode (default) |

## [#](#batchamenditem) BatchAmendItem

_Order information that needs to be modified_

### [#](#properties-6) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| order_id | string | true | none | The order ID returned upon successful creation or the custom ID specified by the user during creation (i.e., the 'text' field). |
| currency_pair | string | true | none | Currency pair |
| account | string | false | none | Default spot, unified account and warehouse-by-store leverage account. |
| amount | string | false | none | trade amount, only one of amount and price can be specified |
| price | string | false | none | trade price, only one of amount and price can be specified |
| amend_text | string | false | none | Custom info during amending order |
| action_mode | string | false | none | Processing Mode:When placing an order, different fields are returned based on action_mode. This field is only valid during the request and is not included in the response resultACK: Asynchronous mode, only returns key order fieldsRESULT: No clearing informationFULL: Full mode (default) |

## [#](#spotpricetriggeredorder) SpotPriceTriggeredOrder

_Spot order detail_

### [#](#properties-7) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| trigger | object | true | none | none |
| » price | string | true | none | Trigger price |
| » rule | string | true | none | Price trigger condition- >=: triggered when market price larger than or equal to price field- <=: triggered when market price less than or equal to price field |
| » expiration | integer | true | none | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |
| put | object | true | none | none |
| » type | string | false | none | Order type，default to limit- limit : Limit Order- market : Market Order |
| » side | string | true | none | Order side- buy: buy side- sell: sell side |
| » price | string | true | none | Order price |
| » amount | string | true | none | When type is limit, it refers to base currency. For instance, BTC_USDT means BTCWhen type is market, it refers to different currency according to side- side : buy means quote currency, BTC_USDT means USDT- side : sell means base currency，BTC_USDT means BTC |
| » account | string | true | none | Trading account type. Portfolio margin account must set to unified- normal: spot trading- margin: margin trading- unified: unified trading |
| » time_in_force | string | false | none | time_in_force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only |
| » auto_borrow | boolean | false | none | Whether to borrow coins automatically |
| » auto_repay | boolean | false | none | Whether to repay the loan automatically |
| » text | string | false | none | The source of the order, including:- web: web- api: api- app: app |
| id | integer(int64) | false | read-only | Auto order ID |
| user | integer | false | read-only | User ID |
| market | string | true | none | Currency pair |
| ctime | integer(int64) | false | read-only | Creation time |
| ftime | integer(int64) | false | read-only | Finished time |
| fired_order_id | integer(int64) | false | read-only | ID of the newly created order on condition triggered |
| status | string | false | read-only | Status- open: open- cancelled: being manually cancelled- finish: successfully executed- failed: failed to execute- expired - expired |
| reason | string | false | read-only | Additional remarks on how the order was finished |

#### [#](#enumerated-values-129) Enumerated Values

| Property | Value |
| --- | --- |
| rule | >= |
| rule | <= |
| type | limit |
| type | market |
| side | buy |
| side | sell |
| account | normal |
| account | margin |
| account | unified |
| time_in_force | gtc |
| time_in_force | ioc |

## [#](#contract) Contract

_Futures contract details_

### [#](#properties-8) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| name | string | false | none | Futures contract |
| type | string | false | none | Futures contract type |
| quanto_multiplier | string | false | none | Multiplier used in converting from invoicing to settlement currency |
| leverage_min | string | false | none | Minimum leverage |
| leverage_max | string | false | none | Maximum leverage |
| maintenance_rate | string | false | none | Maintenance rate of margin |
| mark_type | string | false | none | Mark price type, internal - based on internal trading, index - based on external index price |
| mark_price | string | false | none | Current mark price |
| index_price | string | false | none | Current index price |
| last_price | string | false | none | Last trading price |
| maker_fee_rate | string | false | none | Maker fee rate, where negative means rebate |
| taker_fee_rate | string | false | none | Taker fee rate |
| order_price_round | string | false | none | Minimum order price increment |
| mark_price_round | string | false | none | Minimum mark price increment |
| funding_rate | string | false | none | Current funding rate |
| funding_interval | integer | false | none | Funding application interval, unit in seconds |
| funding_next_apply | number(double) | false | none | Next funding time |
| risk_limit_base | string | false | none | Risk limit base,deprecated |
| risk_limit_step | string | false | none | Step of adjusting risk limit,deprecated |
| risk_limit_max | string | false | none | Maximum risk limit the contract allowed,deprecated,It is recommended to use /futures/{settle}/risk_limit_tiers to query risk limits. |
| order_size_min | integer(int64) | false | none | Minimum order size the contract allowed |
| order_size_max | integer(int64) | false | none | Maximum order size the contract allowed |
| order_price_deviate | string | false | none | deviation between order price and current index price. If price of an order is denoted as order_price, it must meet the following condition:abs(order_price - mark_price) <= mark_price * order_price_deviate |
| ref_discount_rate | string | false | none | Referral fee rate discount |
| ref_rebate_rate | string | false | none | Referrer commission rate |
| orderbook_id | integer(int64) | false | none | Current orderbook ID |
| trade_id | integer(int64) | false | none | Current trade ID |
| trade_size | integer(int64) | false | none | Historical accumulated trade size |
| position_size | integer(int64) | false | none | Current total long position size |
| config_change_time | number(double) | false | none | Last changed time of configuration |
| in_delisting | boolean | false | none | in_delisting=true And when position_size>0, it means the contract is in the offline transition periodin_delisting=true And when position_size=0, it means the contract is offline |
| orders_limit | integer | false | none | Maximum number of open orders |
| enable_bonus | boolean | false | none | Whether bouns is enabled |
| enable_credit | boolean | false | none | Whether portfolio margin account is enabled |
| create_time | number(double) | false | none | Created time of the contract |
| funding_cap_ratio | string | false | none | The factor for the maximum of the funding rate. Maximum of funding rate = (1/market maximum leverage - maintenance margin rate) * funding_cap_ratio |

#### [#](#enumerated-values-130) Enumerated Values

| Property | Value |
| --- | --- |
| type | inverse |
| type | direct |
| mark_type | internal |
| mark_type | index |

## [#](#position) Position

_Futures position details_

### [#](#properties-9) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| user | integer(int64) | false | read-only | User ID |
| contract | string | false | read-only | Futures contract |
| size | integer(int64) | false | read-only | Position size |
| leverage | string | false | none | Position leverage. 0 means cross margin; positive number means isolated margin |
| risk_limit | string | false | none | Position risk limit |
| leverage_max | string | false | read-only | Maximum leverage under current risk limit |
| maintenance_rate | string | false | read-only | Maintenance rate under current risk limit |
| value | string | false | read-only | Position value calculated in settlement currency |
| margin | string | false | none | Position margin |
| entry_price | string | false | read-only | Entry price |
| liq_price | string | false | read-only | Liquidation price |
| mark_price | string | false | read-only | Current mark price |
| initial_margin | string | false | read-only | The initial margin occupied by the position, applicable to the portfolio margin account |
| maintenance_margin | string | false | read-only | Maintenance margin required for the position, applicable to portfolio margin account |
| unrealised_pnl | string | false | read-only | Unrealized PNL |
| realised_pnl | string | false | read-only | Realized PNL |
| pnl_pnl | string | false | read-only | Realized PNL - Position P/L |
| pnl_fund | string | false | read-only | Realized PNL - Funding Fees |
| pnl_fee | string | false | read-only | Realized PNL - Transaction Fees |
| history_pnl | string | false | read-only | History realized PNL |
| last_close_pnl | string | false | read-only | PNL of last position close |
| realised_point | string | false | read-only | Realized POINT PNL |
| history_point | string | false | read-only | History realized POINT PNL |
| adl_ranking | integer | false | read-only | Ranking of auto deleveraging, a total of 1-5 grades, 1 is the highest, 5 is the lowest, and 6 is the special case when there is no position held or in liquidation |
| pending_orders | integer | false | read-only | Current open orders |
| close_order | object|null | false | read-only | Current close order if any, or null |
| » id | integer(int64) | false | none | Close order ID |
| » price | string | false | none | Close order price |
| » is_liq | boolean | false | none | Is the close order from liquidation |
| mode | string | false | none | Position mode, including:- single: dual mode is not enabled- dual_long: long position in dual mode- dual_short: short position in dual mode |
| cross_leverage_limit | string | false | none | Cross margin leverage(valid only when leverage is 0) |
| update_time | integer(int64) | false | read-only | Last update time |
| update_id | integer(int64) | false | read-only | Update id. Each time the position is updated, the value will be +1. |
| open_time | integer(int64) | false | none | First Open Time |

#### [#](#enumerated-values-131) Enumerated Values

| Property | Value |
| --- | --- |
| mode | single |
| mode | dual_long |
| mode | dual_short |

## [#](#futuresorder) FuturesOrder

_Futures order details_

### [#](#properties-10) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| id | integer(int64) | false | read-only | Futures order ID |
| user | integer | false | read-only | User ID |
| create_time | number(double) | false | read-only | Creation time of order |
| finish_time | number(double) | false | read-only | Order finished time. Not returned if order is open |
| finish_as | string | false | read-only | How the order was finished.- filled: all filled- cancelled: manually cancelled- liquidated: cancelled because of liquidation- ioc: time in force is IOC, finish immediately- auto_deleveraged: finished by ADL- reduce_only: cancelled because of increasing position while reduce-only set- position_closed: cancelled because of position close- position_closed: canceled because the position was closed- reduce_out: only reduce positions by excluding hard-to-fill orders- stp: cancelled because self trade prevention |
| status | string | false | read-only | Order status- open: waiting to be traded- finished: finished |
| contract | string | true | none | Futures contract |
| size | integer(int64) | true | none | Order size. Specify positive number to make a bid, and negative number to ask |
| iceberg | integer(int64) | false | none | Display size for iceberg order. 0 for non-iceberg. Note that you will have to pay the taker fee for the hidden size |
| price | string | false | none | Order price. 0 for market order with tif set as ioc |
| close | boolean | false | write-only | Set as true to close the position, with size set to 0 |
| is_close | boolean | false | read-only | Is the order to close position |
| reduce_only | boolean | false | write-only | Set as true to be reduce-only order |
| is_reduce_only | boolean | false | read-only | Is the order reduce-only |
| is_liq | boolean | false | read-only | Is the order for liquidation |
| tif | string | false | none | Time in force- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled, taker only- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker fee- fok: FillOrKill, fill either completely or none |
| left | integer(int64) | false | read-only | Size left to be traded |
| fill_price | string | false | read-only | Fill price of the order |
| text | string | false | none | User defined information. If not empty, must follow the rules below:1. prefixed with t-2. no longer than 28 bytes without t- prefix3. can only include 0-9, A-Z, a-z, underscore(_), hyphen(-) or dot(.)Besides user defined information, reserved contents are listed below, denoting how the order is created:- web: from web- api: from API- app: from mobile phones- auto_deleveraging: from ADL- liquidation: from liquidation- insurance: from insurance |
| tkfr | string | false | read-only | Taker fee |
| mkfr | string | false | read-only | Maker fee |
| refu | integer | false | read-only | Reference user ID |
| auto_size | string | false | write-only | Set side to close dual-mode position. close_long closes the long side; while close_short the short one. Note size also needs to be set to 0 |
| stp_id | integer | false | read-only | Orders between users in the same stp_id group are not allowed to be self-traded1. If the stp_id of two orders being matched is non-zero and equal, they will not be executed. Instead, the corresponding strategy will be executed based on the stp_act of the taker.2. stp_id returns 0 by default for orders that have not been set for STP group |
| stp_act | string | false | none | Self-Trading Prevention Action. Users can use this field to set self-trade prevetion strategies1. After users join the STP Group, he can pass stp_act to limit the user's self-trade prevetion strategy. If stp_act is not passed, the default is cn strategy。2. When the user does not join the STP group, an error will be returned when passing the stp_act parameter。3. If the user did not use 'stp_act' when placing the order, 'stp_act' will return '-'- cn: Cancel newest, Cancel new orders and keep old ones- co: Cancel oldest, Cancel old orders and keep new ones- cb: Cancel both, Both old and new orders will be cancelled |
| amend_text | string | false | read-only | The custom data that the user remarked when amending the order |
| biz_info | string | false | read-only | Additional information |

#### [#](#enumerated-values-132) Enumerated Values

| Property | Value |
| --- | --- |
| finish_as | filled |
| finish_as | cancelled |
| finish_as | liquidated |
| finish_as | ioc |
| finish_as | auto_deleveraged |
| finish_as | reduce_only |
| finish_as | position_closed |
| finish_as | reduce_out |
| finish_as | stp |
| status | open |
| status | finished |
| tif | gtc |
| tif | ioc |
| tif | poc |
| tif | fok |
| auto_size | close_long |
| auto_size | close_short |
| stp_act | co |
| stp_act | cn |
| stp_act | cb |
| stp_act | - |

## [#](#batchamendorderreq) BatchAmendOrderReq

_Modify contract order parameters_

### [#](#properties-11) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| order_id | integer(int64) | false | none | Order id, order_id and text must contain at least one |
| text | string | false | none | User-defined order text, at least one of order_id and text must be passed |
| size | integer(int64) | false | none | The new order size, including the executed order size.- If it is less than or equal to the executed quantity, the order will be cancelled.- The new order direction must be consistent with the original one.- The size of the closing order cannot be modified.- For orders that only reduce positions, if the size is increased, other orders that only reduce positions may be kicked out.- If the price is not modified, reducing the size will not affect the depth of the queue, and increasing the size will place it at the end of the current price. |
| price | string | false | none | New order price. |
| amend_text | string | false | none | Custom info during amending order |

## [#](#futurespricetriggeredorder) FuturesPriceTriggeredOrder

_Futures order details_

### [#](#properties-12) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| initial | object | true | none | none |
| » contract | string | true | none | Futures contract |
| » size | integer(int64) | false | none | Order size. Positive size means to buy, while negative one means to sell. Set to 0 to close the position |
| » price | string | true | none | Order price. Set to 0 to use market price |
| » close | boolean | false | write-only | Set to true if trying to close the position |
| » tif | string | false | none | Time in force. If using market price, only ioc is supported.- gtc: GoodTillCancelled- ioc: ImmediateOrCancelled |
| » text | string | false | none | The source of the order, including:- web: web- api: api- app: app |
| » reduce_only | boolean | false | none | Set to true to create a reduce-only order |
| » auto_size | string | false | write-only | Set side to close dual-mode position. close_long closes the long side; while close_short the short one. Note size also needs to be set to 0 |
| » is_reduce_only | boolean | false | read-only | Is the order reduce-only |
| » is_close | boolean | false | read-only | Is the order to close position |
| trigger | object | true | none | none |
| » strategy_type | integer(int32) | false | none | How the order will be triggered- 0: by price, which means the order will be triggered if price condition is satisfied- 1: by price gap, which means the order will be triggered if gap of recent two prices of specified price_type are satisfied.Only 0 is supported currently |
| » price_type | integer(int32) | false | none | Price type. 0 - latest deal price, 1 - mark price, 2 - index price |
| » price | string | false | none | Value of price on price triggered, or price gap on price gap triggered |
| » rule | integer(int32) | false | none | Trigger condition type- 1: calculated price based on strategy_type and price_type >= price- 2: calculated price based on strategy_type and price_type <= price |
| » expiration | integer | false | none | How long (in seconds) to wait for the condition to be triggered before cancelling the order. |
| id | integer(int64) | false | read-only | Auto order ID |
| user | integer | false | read-only | User ID |
| create_time | number(double) | false | read-only | Creation time |
| finish_time | number(double) | false | read-only | Finished time |
| trade_id | integer(int64) | false | read-only | ID of the newly created order on condition triggered |
| status | string | false | read-only | Auto order status- open: order is active- finished: order is finished- inactive: order is not active, only for close-long-order or close-short-order- invalid: order is invalid, only for close-long-order or close-short-order |
| finish_as | string | false | read-only | How order is finished |
| reason | string | false | read-only | Additional remarks on how the order was finished |
| order_type | string | false | none | Take-profit/stop-loss types, which include:- close-long-order: order take-profit/stop-loss, close long position- close-short-order: order take-profit/stop-loss, close short position- close-long-position: position take-profit/stop-loss, close long position- close-short-position: position take-profit/stop-loss, close short position- plan-close-long-position: position planned take-profit/stop-loss, close long position- plan-close-short-position: position planned take-profit/stop-loss, close short positionThe order take-profit/stop-loss can not be passed by request. These two types are read only. |
| me_order_id | integer(int64) | false | read-only | Corresponding order ID of order take-profit/stop-loss. |

#### [#](#enumerated-values-133) Enumerated Values

| Property | Value |
| --- | --- |
| tif | gtc |
| tif | ioc |
| strategy_type | 0 |
| strategy_type | 1 |
| price_type | 0 |
| price_type | 1 |
| price_type | 2 |
| rule | 1 |
| rule | 2 |
| status | open |
| status | finished |
| status | inactive |
| status | invalid |
| finish_as | cancelled |
| finish_as | succeeded |
| finish_as | failed |
| finish_as | expired |

## [#](#deliverycontract) DeliveryContract

_Futures contract details_

### [#](#properties-13) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| name | string | false | none | Futures contract |
| underlying | string | false | none | Underlying |
| cycle | string | false | none | Cycle type, e.g. WEEKLY, QUARTERLY |
| type | string | false | none | Futures contract type |
| quanto_multiplier | string | false | none | Multiplier used in converting from invoicing to settlement currency |
| leverage_min | string | false | none | Minimum leverage |
| leverage_max | string | false | none | Maximum leverage |
| maintenance_rate | string | false | none | Maintenance rate of margin |
| mark_type | string | false | none | Mark price type, internal - based on internal trading, index - based on external index price |
| mark_price | string | false | none | Current mark price |
| index_price | string | false | none | Current index price |
| last_price | string | false | none | Last trading price |
| maker_fee_rate | string | false | none | Maker fee rate, where negative means rebate |
| taker_fee_rate | string | false | none | Taker fee rate |
| order_price_round | string | false | none | Minimum order price increment |
| mark_price_round | string | false | none | Minimum mark price increment |
| basis_rate | string | false | none | Fair basis rate |
| basis_value | string | false | none | Fair basis value |
| basis_impact_value | string | false | none | Funding used for calculating impact bid, ask price |
| settle_price | string | false | none | Settle price |
| settle_price_interval | integer | false | none | Settle price update interval |
| settle_price_duration | integer | false | none | Settle price update duration in seconds |
| expire_time | integer(int64) | false | none | Contract expiry timestamp |
| risk_limit_base | string | false | none | Risk limit base |
| risk_limit_step | string | false | none | Step of adjusting risk limit |
| risk_limit_max | string | false | none | Maximum risk limit the contract allowed |
| order_size_min | integer(int64) | false | none | Minimum order size the contract allowed |
| order_size_max | integer(int64) | false | none | Maximum order size the contract allowed |
| order_price_deviate | string | false | none | deviation between order price and current index price. If price of an order is denoted as order_price, it must meet the following condition:abs(order_price - mark_price) <= mark_price * order_price_deviate |
| ref_discount_rate | string | false | none | Referral fee rate discount |
| ref_rebate_rate | string | false | none | Referrer commission rate |
| orderbook_id | integer(int64) | false | none | Current orderbook ID |
| trade_id | integer(int64) | false | none | Current trade ID |
| trade_size | integer(int64) | false | none | Historical accumulated trade size |
| position_size | integer(int64) | false | none | Current total long position size |
| config_change_time | number(double) | false | none | Last changed time of configuration |
| in_delisting | boolean | false | none | Contract is delisting |
| orders_limit | integer | false | none | Maximum number of open orders |

#### [#](#enumerated-values-134) Enumerated Values

| Property | Value |
| --- | --- |
| cycle | WEEKLY |
| cycle | BI-WEEKLY |
| cycle | QUARTERLY |
| cycle | BI-QUARTERLY |
| type | inverse |
| type | direct |
| mark_type | internal |
| mark_type | index |

## [#](#debitfee) DebitFee

### [#](#properties-14) Properties

| Name | Type | Required | Restrictions | Description |
| --- | --- | --- | --- | --- |
| enabled | boolean | true | none | Whether GT fee discount is used |

Last Updated: 1/17/2025, 2:16:19 AM