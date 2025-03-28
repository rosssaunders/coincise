

# APIV4/EN/

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
or with [Python SDK(opens new window)](https://github.com/gateio/gateapi-python):\
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