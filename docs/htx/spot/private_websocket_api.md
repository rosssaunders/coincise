# HTX Private WebSocket API Documentation

## Quick Start

### Preparation

Before you use API, you need to login the website to create API Key with proper
permissions. The API key is shared for all instruments in HTX including spot,
futures, swap, options.

You can manage your API Keys [here](https://www.htx.com/apikey/).

Every user can create at most 20 API Keys, each can be applied with either
permission below:

- Read permission: It is used to query the data, such as order query, trade
  query.
- Trade permission: It is used to create order, cancel order and transfer, etc.
- Withdraw permission: It is used to create withdraw order, cancel withdraw
  order, etc.

Please remember below information after creation:

- `Access Key` It is used in API request
- `Secret Key` It is used to generate the signature (only visible once after
  creation)

The API Key can bind maximum 20 IP addresses (either host IP or network IP), we
strongly suggest you bind IP address for security purpose. The API Key without
IP binding will be expired after 90 days.

**Warning** : These two keys are important to your account safety, please don't
share **both** of them together to anyone else (including any product or person
from HTX). If you find your API Key is disposed, please remove it immediately.

### SDK and Demo

**SDK (Suggested)**

[Java](https://github.com/huobiapi/huobi_Java) |
[Python3](https://github.com/huobiapi/huobi_Python) |
[C++](https://github.com/huobiapi/huobi_Cpp) |
[C#](https://github.com/HuobiRDCenter/huobi_CSharp) |
[Go](https://github.com/huobirdcenter/huobi_golang)

**Other Demos**

[https://github.com/huobiapi?tab=repositories](https://github.com/huobiapi?tab=repositories)

### Testnet (Stopped)

The testnet has been alive for months, however the active user count is rather
low and the cost is high, after considering carefully we decide to shutdown the
testnet environment.

It is suggest you use live environment, which is more stable and has more
liquidity.

### Interface Type

There are two types of interface, you can choose the proper one according to
your scenario and preferences.

#### REST API

REST (Representational State Transfer) is one of the most popular communication
mechanism under HTTP, each URL represents a type of resource.

It is suggested to use Rest API for one-off operation, like trading and
withdraw.

#### WebSocket API

WebSocket is a new protocol in HTML5. It is full-duplex between client and
server. The connection can be established by a single handshake, and then server
can push the notification to client actively.

It is suggest to use WebSocket API to get data update, like market data and
order update.

**Authentication**

Both API has two levels of authentication:

Public API: It is for basic information and market data. It doesn't need
authentication.

Private API: It is for account related operation like trading and account
management. Each private API must be authenticated with API Key.

### Access URLs

You can compare the network latency between two domain api.huobi.pro and
api-aws.huobi.pro, and then choose the better one for you.

In general, the domain api-aws.huobi.pro is optimized for AWS client, the
latency will be lower.

**REST API**

**`https://api.huobi.pro`**

**`https://api-aws.huobi.pro`**

**Websocket Feed (market data except MBP incremental)**

**`wss://api.huobi.pro/ws`**

**`wss://api-aws.huobi.pro/ws`**

**Websocket Feed (market data only MBP incremental)**

**`wss://api.huobi.pro/feed`**

**`wss://api-aws.huobi.pro/feed`**

**Websocket Feed (account and order)**

**`wss://api.huobi.pro/ws/v2`**

**`wss://api-aws.huobi.pro/ws/v2`**

Please initiate API calls with non-China IP.

It is not recommended to use proxy to access HTX API because it will introduce
high latency and low stability.

It is recommended to access HTX API from AWS Japan for better stability. If your
server is in China mainland, it may be not stable.

### Glossary

#### Trading symbols

The trading symbols are consist of base currency and quote currency. Take the
symbol `BTC/USDT` as an example, `BTC` is the base currency, and `USDT` is the
quote currency.

#### Account

The `account-id` defines the Identity for different business type, it can be
retrieved from API `/v1/account/accounts` , where the `account-type` is the
business types.The types include:

- spot: Spot account
- otc: OTC account
- margin: Isolated margin account, the detailed currency type is defined in
  `subType`
- super-margin / cross-margin: Cross-margin account
- investment: c2c margin lending account
- borrow: c2c margin borrowing account
- point: Point card account
- minepool: Minepool account
- etf: ETF account

You can refer to [HTX Course](https://www.huobi.com/en-us/guide/) to get
detailed information

## API Access

### Overview

| Category     | URL Path                      | Description                                                         |
| ------------ | ----------------------------- | ------------------------------------------------------------------- |
| Common       | /v1/common/\*                 | Common interface, including currency, currency pair, timestamp, etc |
| Market Data  | /market/\*                    | Market data interface, including trading, depth, quotation, etc     |
| Account      | /v1/account/\* /v1/subuser/\* | Account interface, including account information, sub-user ,etc     |
| Order        | /v1/order/\*                  | Order interface, including order creation, cancellation, query, etc |
| Margin       | /v1/margin/\*                 | Margin interface, including debit, payment, query, etc              |
| Cross Margin | /v1/cross-margin/\*           | Cross margin interface, including debit, payment, query, etc        |

Above is a general category, it doesn't cover all API, you can refer to detailed
API document according to your requirement.

### New Version Rate limit Rule

- The new version rate limit is applied on UID basis, which means, the overall
  access rate, from all API keys under same UID, to single endpoint, shouldn’t
  exceed the rate limit applied on that endpoint.
- It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and
  `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the
  expire time for current rate limit time window, then you can adjust the API
  access rate dynamically.

### Request Format

The API is restful and there are two method: GET and POST.

- GET request: All parameters are included in URL, and do not carry
  body(content-length>0), in otherwise will return 403 error code.
- POST request: All parameters are formatted as JSON and put int the request
  body

### Response Format

The response is JSON format.There are four fields in the top level: `status`,
`ch`, `ts` and `data`. The first three fields indicate the general status, the
business data is is under `data` field.

Below is an example of response:

```
{"status":"ok","ch":"market.btcusdt.kline.1day","ts":1499223904680,"data"://perAPIresponsedatainnestedJSONobject}
```

| Field  | Data Type | Description                                                           |
| ------ | --------- | --------------------------------------------------------------------- |
| status | string    | Status of API response                                                |
| ch     | string    | The data stream. It may be empty as some API doesn't have data stream |
| ts     | int       | The UTC timestamp when API respond, the unit is millisecond           |
| data   | object    | The body data in response                                             |

### Data Type

The JSON data type described in this document is defined as below:

- `string`: a sequence of characters that are quoted
- `int`: a 32-bit integer, mainly used for status code, size and count
- `long`: a 64-bit integer, mainly used for Id and timestamp
- `float`: a fraction represented in decimal format, mainly used for volume and
  price, recommend to use high precision decimal data types in program

### Best Practice

#### Security

- It is strongly suggested to bind your IP with your API Key to ensure that your
  API Key can only be used in your machine. Furthermore, your API Key will be
  expired after 90 days if it is not binded with any IP.
- It is strongly suggested not to share your API Key with any body or
  third-party software, otherwise your personal information and asset may be
  stolen. If your expose your API Key by accident, please do delete the API Key
  and create a new one.

#### General

**API Access**

- It is suggested not to use temporary domain or proxy, which may be not stable.
- It is suggested to use AWS Japan to access API for lower latency
- It is suggested to connect to domain `api-aws.huobi.pro` if your server is
  based on AWS, because this domain is optimized for AWS client, the latency
  will be lower.

**New Version Rate limit Rule**

- Only those endpoints marked with rate limit value separately are applied with
  new rate limit rule.
- It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and
  `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the
  expire time for current rate limit time window, then you can adjust the API
  access rate dynamically.
- The overall access rate, from all API keys under same UID, to single endpoint,
  shouldn’t exceed the rate limit applied on that endpoint.

#### Market

**Market data**

- It is suggested to use WebSocket interface to subscribe the market update and
  then cache the data locally, because WebSocket notification has lower latency
  and not have rate limit.
- It is suggested not to subscribe too many topics in a single websocket
  connection, it may generate more notifications and cause network latency and
  disconnection.

**Latest trade**

- It is suggested to subscribe WebSocket topic `market.$symbol.trade.detail`,
  the response field `price` represents the latest price, and it has lower
  latency.
- It is suggested to use `tradeId` to de-duplicate if you subscribe WebSocket
  topic `market.$symbol.trade.detail`.

**Depth**

- It is suggested to subscribe WebSocket topic `market.$symbol.bbo` if you only
  need the best bid and best offer.
- It is suggested to subscribe WebSocket topic `market.$symbol.depth.$type` if
  you need multiple bid and offer with normal latency.
- It is suggested to subscribe WebSocket topic `market.$symbol.mbp.$level` if
  you need multiple bid and offer with lower latency
- It is suggested to use `version` field to de-duplicate and discard the smaller
  data if you use Rest interface `/market/depth` and WebSocket topic
  `market.$symbol.depth.$type`. It is suggest to use `seqNum` to de-duplicate
  and discard the smaller data if yo subscribe WebSocket topic
  `market.$symbol.mbp.$levels`.

#### Order

**Place an order (/v1/order/orders/place)**

- It is suggested to follow the symbol reference (`/v1/common/symbols`) to
  validate the amount and value before placing the older, otherwise you may
  place an invalid order and waste your time.
- It is suggested to provide an unique `client-order-id` field when placing the
  order, it is useful to track your orders status if you fail to get the order
  id response. Later you can use the `client-order-id` to match the WebSocket
  order notification or query order detail by interface
  `/v1/order/orders/getClientOrder`.The uniqueness of the clientOrderId passed
  in when you place an order will no longer be verified. We recommend you to
  manage clientOrderId by yourself to ensure its uniqueness. If multiple orders
  use the same clientOrderId, the latest order corresponding to the
  clientOrderId will be returned when querying/canceling an order.

**Search history olders (/v1/order/orders)**

- It is recommended to use `start-time` and `end-time` to query, that are two
  timestamps with 13 digits (millisecond). The maximum query time window is 48
  hours (2 days), the more precision you provide, the better performance you
  will get. You can query for multiple iterations.

**Order update**

- It is suggested to subscribe WebSocket topic `orders.$symbol`, which has lower
  latency and more accurate sequence.

#### Account

**Asset update**

- It is suggested to subscribe both WebSocket topic `orders.$symbol` and
  `account.update#${mode}`. The former one tells the order status update and
  arrives earlier than the latter one, and the latter one confirms the final
  asset balance.
- It is suggested not to subscribe WebSocket topic `accounts`, which is replaced
  by `accounts.update#${mode}`, and will be retired later.

## Reference Data

### Introduction

Reference data APIs provide public reference information such as system status,
market status, symbol info, currency info, chain info and server timestamp.

## Market Data

### Introduction

Market data APIs provide public market information such as varies of
candlestick, depth and trade information.

The market data is updated **once per second**.

## Account

### Introduction

Account APIs provide account related (such as basic info, balance, history,
point) query and transfer functionality.

All endpoints in this section require authentication

### Error Code

Below is the error code, error message and description returned by Account APIs.

| Error Code | Error Message                             | Description                                                              |
| ---------- | ----------------------------------------- | ------------------------------------------------------------------------ |
| 500        | system error                              | Server internal error                                                    |
| 1002       | forbidden                                 | Operation is forbidden, such as the account Id and UID doesn't match     |
| 2002       | "invalid field value in currency"         | Parameter currency is invalid                                            |
| 2002       | "invalid field value in transactTypes"    | Parameter transactTypes is invalid (should be transfer)                  |
| 2002       | "invalid field value in sort"             | Parameter sort is invalid (should be 'asc' or 'desc')                    |
| 2002       | "value in fromId is not found in record"  | Value fromId doesn't exist                                               |
| 2002       | "invalid field value in accountId"        | Parameter accountId is invalid (should not be empty)                     |
| 2002       | "value in startTime exceeded valid range" | Value startTime is later than current time or earlier than 180 days ago  |
| 2002       | "value in endTime exceeded valid range")  | Value endTime is earlier than startTime, or 10 days later than startTime |
| 40401      |                                           | Deduction is unavailable for sub-accounts.                               |
| 40402      |                                           | Deduction currency cannot be empty                                       |
| 40403      |                                           | Too many requests.                                                       |
| 40404      |                                           | Point Cards are unavailable in the current country or region.            |
| 40405      |                                           | The crypto is unavailable for deduction.                                 |
| 40406      |                                           | User's Point Card balance is zero.                                       |
| 40407      |                                           | Invalid deduction type.                                                  |
| 40408      |                                           | Duplicate request. Please try again later                                |
| 3011       |                                           | Verification failure                                                     |

## Trading

### Introduction

Trading APIs provide trading related functionality, including placing order,
canceling order, order history query, trading history query, transaction fee
query.

All endpoints in this section require authentication

The parameter "account-id" and "source" should be set properly, refer to details
in Request Parameters description below.

Below is the glossary of trading related field:

**order type**: The order type is consist of trade direction and behavior type:
\[direction\]-\[type\]

direction:

- buy
- sell

type:

- market : The price is not required in order creation request, you only need to
  specify either volume or amount. The matching and trade will happen
  automatically according to the request.
- limit: Both of the price and amount should be specified in order creation
  request.
- limit-maker: The price is specified in order creation request as market maker.
  It will not be matched in the matching queue.
- ioc: ioc stands for "immediately or cancel", it means the order will be
  canceled if it couldn't be matched. If the order is partially traded, the
  remaining part will be canceled.
- limit-fok: fok stands for "fill or kill", it means the order will be cancelled
  if it couldn't be **fully** matched. Even if the order can be partially
  filled, the entire order will be cancelled.
- market-grid: Grid trading market order (not supported by API)
- limit-grid: Grid trading limit order (not supported by API)
- stop-limit: The price in order creation request is the trigger price. The
  order will be put into matching queue only when the market price reaches the
  trigger price. This type is replaced by conditional order, please use
  conditional order APIs

**order source**: the origin of the order

- spot-api: API order from spot account
- margin-api：API order from margin account
- super-margin-api：API order from cross-margin account
- c2c-margin-api：API order from c2c account
- grid-trading-sys：grid order (not supported by API)

**order state**:

- created: The order is created, and not in the matching queue yet.
- submitted: The order is submitted, and already in the matching queue, waiting
  for deal.
- partial-filled: The order is already in the matching queue and partially
  traded, and is waiting for further matching and trade.
- filled: The order is already traded and not in the matching queue any more.
- partial-canceled: The order is not in the matching queue any more. The status
  is transferred from 'partial-filled', the order is partially trade, but
  remaining is canceled.
- canceling: The order is under canceling, but haven't been removed from
  matching queue yet.
- canceled: The order is not in the matching queue any more, and completely
  canceled. There is no trade associated with this order.

**IDs**: The frequently used identities are listed below:

- order-id: The unique identity for order.
- client-order-id: The identity defined by the client. This id is included in
  order creation request, and will be returned as order-id. For completed
  orders, clientOrderId will be valid for 2 hours since the order creation (it
  is still valid for 8 hours concerning other orders). That is to say, if an
  order has been created for more than 2 hours, clientOrderId can’t be used to
  query the completed order (It is recommended to check it with orderid). Among
  them, the status of the completed order includes partially canceled, canceled,
  and fully executed. The allowed characters are letters (case sensitive),
  digit, underscore (\_) and hyphen (-), no more than 64 chars.
- match-id : The identity for order matching.
- trade-id : The unique identity for the trade.

### Error Code

Below is the error code and description returned by Trading APIs

| Error Code                                                    | Description                                                                                                       |
| ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| forbidden-trade-for-open-protect                              | The current protection phase is open. You can place orders after the protection period ends (GMT+8)               |
| base-argument-unsupported                                     | The specified parameter is not supported                                                                          |
| base-system-error                                             | System internel error. For placing or canceling order, it is mostly due to cache issue, please try again later.   |
| login-required                                                | Signature is missing, or user not find (key and uid not match).                                                   |
| parameter-required                                            | Stop-price or operator parameter is missing for stop-order type                                                   |
| base-record-invalid                                           | Failed to get data, please try again later                                                                        |
| order-amount-over-limit                                       | The amount of order exceeds the limitation                                                                        |
| base-symbol-trade-disabled                                    | The symbol is disabled for trading                                                                                |
| base-operation-forbidden                                      | The operation is forbidden for current user or the symbol is not allowed to trade over OTC                        |
| account-get-accounts-inexistent-error                         | The account doesn't exist in current user                                                                         |
| account-account-id-inexistent                                 | The account id doesn't exist                                                                                      |
| sub-user-auth-required                                        | Isolated margin account is not enabled for sub user                                                               |
| order-disabled                                                | The symbol is pending and not allowed to place order                                                              |
| cancel-disabled                                               | The symbol is pending and not allowed to cancel order                                                             |
| order-invalid-price                                           | The order price is invalid, usually exceeds the 10% of latest trade price                                         |
| order-accountbalance-error                                    | The account balance is insufficient                                                                               |
| order-limitorder-price-min-error                              | Sell price cannot be lower than specific price(limit price to sell cannot be lower than 90% of the market price)  |
| order-limitorder-price-max-error                              | Buy price cannot be higher than specific price(limit price to buy cannot be higher than 110% of the market price) |
| order-limitorder-amount-min-error                             | Limit order amount can not be less than specific number                                                           |
| order-limitorder-amount-max-error                             | Limit order amount can not be more than specific number                                                           |
| order-etp-nav-price-min-error                                 | Order price cannot be lower than specific percentage                                                              |
| order-etp-nav-price-max-error                                 | Order price cannot be higher than specific percentage                                                             |
| order-orderprice-precision-error                              | Order price precision error                                                                                       |
| order-orderamount-precision-error                             | Order amount precision error                                                                                      |
| order-value-min-error                                         | Order value cannot be lower than specific value                                                                   |
| order-marketorder-amount-min-error                            | Market order sell amount cannot be less than specific amount                                                      |
| order-marketorder-amount-buy-max-error                        | Market order buy amount(value) cannot be more than specific amount(value)                                         |
| order-marketorder-amount-sell-max-error                       | Market order sell amount cannot be more than specific amount                                                      |
| order-holding-limit-failed                                    | Exceed the holding limit of the currency                                                                          |
| order-type-invalid                                            | Order type is invalid                                                                                             |
| order-orderstate-error                                        | Order state is invalid                                                                                            |
| order-date-limit-error                                        | Order query date exceed the limit                                                                                 |
| order-source-invalid                                          | Order source is invalid                                                                                           |
| order-update-error                                            | Order update error                                                                                                |
| order-fl-cancellation-is-disallowed                           | Liquidation order cannot be canceled                                                                              |
| operation-forbidden-for-fl-account-state                      | The operation is forbidden when the account is in liquidation                                                     |
| operation-forbidden-for-lock-account-state                    | The operation is forbidden when the account is locked                                                             |
| fl-order-already-existed                                      | An unfilled liquidation order already exists                                                                      |
| order-user-cancel-forbidden                                   | IOC or FOK order is not allowed to cancel                                                                         |
| account-state-invalid                                         | Invalid status of liquidation account                                                                             |
| order-price-greater-than-limit                                | Order price is higher than the limitation before market opens                                                     |
| order-price-less-than-limit                                   | Order price is lower than the limitation before market opens                                                      |
| order-stop-order-hit-trigger                                  | The stop orders triggered immediately are not allowed                                                             |
| market-orders-not-support-during-limit-price-trading          | Market orders are not supported during limit-price trading                                                        |
| price-exceeds-the-protective-price-during-limit-price-trading | The price exceeds the protective price during limit-price trading                                                 |
| invalid-client-order-id                                       | The parameter client order id is duplicated (within last 24h) in place or cancel order request                    |
| invalid-interval                                              | Query window is zero, negative or greater than limitation                                                         |
| invalid-start-date                                            | The start date is invalid                                                                                         |
| invalid-end-date                                              | The end date is invalid                                                                                           |
| invalid-start-time                                            | The start time is invalid                                                                                         |
| invalid-end-time                                              | The end time is invalid                                                                                           |
| validation-constraints-required                               | The specified parameters is missing                                                                               |
| symbol-not-support                                            | The symbol is not support for cross margin or C2C                                                                 |
| not-found                                                     | The order id is not found                                                                                         |
| base-not-found                                                | The record is not found                                                                                           |
| 510                                                           | You request too often, please try again later                                                                     |

### FAQ

#### Q1：What is client-order-id?

A： The `client-order-id` is an optional request parameter while placing order.
It's string type which maximum length is 64. The client order id is generated by
client, and is only valid within 8 hours (It’s only valid within 2 hours for the
final state).

#### Q2：How to get the order size, price and decimal precision?

A： You can call API `GET /v1/common/symbols` to get the currency pair
information, pay attention to the difference between the minimum amount and the
minimum price.

Below are common errors:

- order-value-min-error: The order price is less than minimum price
- order-orderprice-precision-error : The precision for limited order price is
  wrong
- order-orderamount-precision-error : The precision for limited order amount is
  wrong
- order-limitorder-price-max-error : The limited order price is higher than the
  threshold(limit price to buy cannot be higher than 110% of the market price)
- order-limitorder-price-min-error : The limited order price is lower than the
  threshold(limit price to sell cannot be lower than 90% of the market price)
- order-limitorder-amount-max-error : The limited order amount is larger than
  the threshold
- order-limitorder-amount-min-error : The limited order amount is smaller than
  the threshold

#### Q3：Why I got insufficient balance error while placing an order just after a successful order matching?

A：To ensure the low latency of order update, Order update push is made directly
after order matching. Meanwhile, the clearing service of that order may be still
in progress at backend. It is suggested to follow either of below to ensure a
successful order submission:

1、Subscribe to WebSocket topic `accounts` for getting account balance moves to
ensure the completion of asset clearing.

2、After receiving WebSocket push message, check account balance from REST
endpoint to ensure sufficient available balance for the next order submission.

3、Leave sufficient balance in your account.

#### Q4: What is the difference between 'filled-fees' and 'filled-points' in match result?

A: Transaction fee can be paid from either of below. They won't exist at the
same time.

1、filled-fees: Filled-fee is also called transaction fee. It's charged from
your income currency from the transaction. For example, if your purchase order
of BTC/USDT got matched，the transaction fee will be based on BTC.

2、filled-points: If user enabled transaction fee deduction, the fee should be
charged from either HT or Point. When there's sufficient fund in HT/Point,
filled-fees is empty while filled-points has value. That means the deduction is
made via HT/Point. User could refer to field `fee-deduct-currency` to get the
exact deduction type of the transaction.

#### Q5: What is the difference between 'match-id' and 'trade-id' in matching result?

A: The `match-id` is the identity for order matching, while the `trade-id` is
the unique identifier for each trade. One `match-id` may be correlated with
multiple `trade-id`, or no `trade-id`(if the order is cancelled). For example,
if a taker's order got matched with 3 maker's orders at the same time, it
generates 3 trade IDs but only one match ID.

#### Q6: Why the order submission could be rejected even though the order price is set as same as current best bid (or best ask)?

A: For some extreme illiquid trading symbols, the best quote price at particular
time might be far away from last trade price. But the price limit is actually
based on last trade price which could possibly exclude best quote price from
valid range for any new order. It is suggested to place orders based on the
WebSocket pushed Bid and market data.

#### Q7: How to retrieve the trading symbols for margin trade

A: You can get details from Rest API `GET /v1/common/symbols`. The
`leverage-ratio` represents the isolated-margin ratio. The
`super-margin-leverage-ratio` represents the cross-margin.

The value `0` indicates that the trading symbols doesn't support margin trading.

## Websocket Account and Order

### Introduction

#### Access URL

**Websocket Asset and Order**

**`wss://api.huobi.pro/ws/v2`**

**`wss://api-aws.huobi.pro/ws/v2`**

Note: By comparing to api.huobi.pro, the network latency to api-aws.huobi.pro is
lower, for those client's servers locating at AWS.

#### Message Compression

Unlike Market WebSocket, the return data of Account and Order Websocket are not
compressed by GZIP.

#### Heartbeat

{ "action": "ping", "data": { "ts": 1575537778295 } }

Once the Websocket connection is established, HTX server will periodically send
"ping" message at 20s interval, with an integer inside.

{ "action": "pong", "data": { "ts": 1575537778295 // the same with "ping"
message } }

Once client receives "ping", it should respond "pong" message back with the same
integer.

#### Valid Values of action

| Valid Values | Description                               |
| ------------ | ----------------------------------------- |
| sub          | Subscribe                                 |
| req          | Request                                   |
| ping,pong    | Heartbeat                                 |
| push         | Push (from HTX server to client's server) |

#### Rate Limit

There are multiple limitations for this version:

- The limitation of single connection for **valid** request (including req, sub,
  unsub, excluding ping/pong or other invalid request) is **50 per second**. It
  will return "too many request" when the limit is exceeded.
- A single API Key can establish **10** connections. It will return "too many
  connection" when the limit is exceeded.
- The limitation of requests from single IP is **100 per second**. It will
  return "too many request" when the limitation is exceeded.

#### Authentication

Authentication request field list

| Field            | Required | Data Type | Description                                                                              |
| ---------------- | -------- | --------- | ---------------------------------------------------------------------------------------- |
| action           | true     | string    | Action type, valid value: "req"                                                          |
| ch               | true     | string    | Channel, valid value: "auth"                                                             |
| authType         | true     | string    | Authentication type, valid value: "api". Note: this is not part of signature calculation |
| accessKey        | true     | string    | Access key                                                                               |
| signatureMethod  | true     | string    | Signature method, valid value: "HmacSHA256"                                              |
| signatureVersion | true     | string    | Signature version, valid value: "2.1"                                                    |
| timestamp        | true     | string    | Timestamp in UTC in format like 2017-05-11T16:22:06                                      |
| signature        | true     | string    | Signature                                                                                |

{ "action": "req", "ch": "auth", "params": { "authType":"api", "accessKey":
"e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx", "signatureMethod": "HmacSHA256",
"signatureVersion": "2.1", "timestamp": "2019-09-01T18:16:16", "signature":
"4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=" } }

This is an exmaple of authentication request:

{ "action": "req", "code": 200, "ch": "auth", "data": {} }

The response of success:

#### Generating Signature

The signature generation method of Account and Order WebSocket is similar with
Rest API , with only following differences:

1.  The request method should be "GET", to URL "/ws/v2".
2.  The involved field names in signature generation are:
    accessKey，signatureMethod，signatureVersion，timestamp
3.  The valid value of signatureVersion is 2.1.

Please refer to detailed signature generation steps from:
\[https://huobiapi.github.io/docs/spot/v1/cn/#c64cd15fdc\]

`GET          ` `api.huobi.pro          ` `/ws/v2          `
`accessKey=0664b695-rfhfg2mkl3-abbf6c5d-49810&signatureMethod=HmacSHA256&signatureVersion=2.1&timestamp=2019-12-05T11%3A53%3A03`

The final string involved in signature generation should be like below:

Note: The data in JSON request doesn't require URL encode

#### Subscribe a Topic to Continuously Receive Updates

Once the Websocket connection is established, Websocket client could send
following request to subscribe a topic:

`{`

`"action": "sub",`

`"ch": "accounts.update"`

`}`

Upon success, Websocket client should receive a response below:

`{`

`"action": "sub",`

`"code": 200,`

`"ch": "accounts.update#0",`

`"data": {}`

`}`

#### first push msg of accounts update exception

`{`

`"action":"sub",`

`"code":500,`

`"ch":"accounts.update#2",`

`"message":"系统异常:"`

`}`

When the first push msg is "message":"系统异常:", accounts update infotmation
will not be pushed any more, and you need to re-subscribe accounts update topic

### Error Code

Below is the return code, return message and the description returend from Asset
and Order WebSocket

| Return Code | Return Message           | Description                                                                                   |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------- |
| 200         | Success                  | Successful                                                                                    |
| 100         | time out close           | The connection is timeout and closed                                                          |
| 400         | Bad Request              | The request is invalid                                                                        |
| 404         | Not Found                | The service is not found                                                                      |
| 429         | Too Many Requests        | Connection number exceed limit                                                                |
| 500         | system error             | System internal error                                                                         |
| 2000        | invalid.ip               | The IP is invalid                                                                             |
| 2001        | nvalid.json              | The JSON request is invalid                                                                   |
| 2001        | invalid.action           | Parameter action is invalid                                                                   |
| 2001        | invalid.symbol           | Parameter symbol is invalid                                                                   |
| 2001        | invalid.ch               | Parameter channel is invalid                                                                  |
| 2001        | missing.param.auth       | Parameter auth is missing                                                                     |
| 2002        | invalid.auth.state       | Authentication state is invalid                                                               |
| 2002        | auth.fail                | Authentication failed, including wrong IP address binding in API Key                          |
| 2003        | query.account.list.error | Account query error                                                                           |
| 4000        | too.many.request         | Request exceed limit (a single instance limit to 50 per second)                               |
| 4000        | too.many.connection      | Connection number exceed limit for single API Key (a single instance limit to 10 connections) |

## Spot

### Introduction

Welcome to HTX API！

This is the official HTX API document, and will be continue updating. HTX will
also publish API announcement in advance for any API change. Please subscribe to
our announcements so that you can get the latest updates.

You can click [Here](https://www.huobi.pe/support/en-us/list/360000070201) to
view the announcements. If you want to subscribe, please click "Follow" button
in the top right of the page. After login and click "Follow" again, then choose
the type you want to follow. After you subscribe, the button will be changed to
"Following". If you don't have any account, you need to register first in the
login dialog.

**How to read this document**

The top of the document is the navigation menu for different API business; The
language button in the top right is for different languages, it supports Chinese
and English right now. The main content of each API document has three parts,
the left hand side is the contents, the middle part is the document body, and
the right hand side is the request and response sameple.

Below is the content for Spot API document

The first part is the overview:

- **Quick Start**: It introduces the overall knowledge of HTX API, and
  suitability for new HTX API user
- **API Explorer**: It introduces the API Explorer online tool, which is
  convenient for user to invoke and observe the API
- **FAQ**: It lists the frequently asked questions regardless the specific API
- **Contact Us**: It introduces how to contact us according to different
  subjects

The second part is detail for each API. Each API category is listed in one
section, and each each section has below contents:

- **Introduction**: It introduces notes and description for this API category
- **_Specific API_**: It introduces the usage, rate limit, request, parameters
  and response for each API
- **Error Code**: It lists the common error code and the description for this
  API category
- **FAQ**: It lists the frequently asked questions for this API category

## Contact Us

### Technical Support

If you have any other questions on API, you can contact us by below ways:

- Join official **Telegram** group: [API技术交流群01](https://t.me/htx_api)
- Contact customer support from Help Center or send email to
  [support@huobigroup.com](mailto:support@huobigroup.com).

If you encounter API errors, please use below template in your feedback:

`1. Problem description`

`2. UID, Account Id and Order Id (if related with account and order)`

`3. Raw URL request`

`4. Raw JSON request (if any)`

`5. Raw JSON response`

`6. Problem time and frequency (such as, when this problem occurs, whether it is reproducible)`

`7. Pre-signed text (Required for authentication issue)`

Below is an example：

`1. Problem description: API authentication error`

`2. UID：123456`

`3. Raw URL request: https://api.huobi.pro/v1/account/accounts?&SignatureVersion=2&SignatureMethod=HmacSHA256&Timestamp=2019-11-06T03%3A25%3A39&AccessKeyId=rfhxxxxx-950000847-boooooo3-432c0&Signature=HhJwApXKpaLPewiYLczwfLkoTPnFPHgyF61iq0iTFF8%3D`

`4. Raw JSON request: N/A`

`5. Raw JSON response：{"status":"error","err-code":"api-signature-not-valid","err-msg":"Signature not valid: Incorrect Access key [Access key错误]","data":null}`

`6. Problem time and frequency: It occurs every time`

`7. Pre-signed text:`

`GET `

`api.huobi.pro `

`/v1/account/accounts `

`AccessKeyId=rfhxxxxx-950000847-boooooo3-432c0&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2019-11-06T03%3A26%3A13`

Note：It is safe to share your Access Key, which is to prove your identity, and
it will not affect your account safety. Remember do **not** share your
`Secret Key` to any one. If you expose your `Secret Key` by accident, please
[remove](https://www.hbg.com/en-us/apikey/) the related API Key immediately.

## Sub-account Management

### Introduction

Sub user management APIs provide sub user account management (creation, query,
permission, transfer), sub user API key management (creation, update, query,
deletion), sub user address (deposit, withdraw) query and balance query.

All endpoints in this section require authentication

### Error Code

Below is the error code, error message and description returned by Sub user
management APIs

| Error Code | Error Message                                             | Description                                                                       |
| ---------- | --------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 1002       | forbidden                                                 | Operation is forbidden, such as sub user creation is not allowed for current user |
| 1003       | unauthorized                                              | Signature is wrong                                                                |
| 2002       | invalid field value                                       | Parameter is invalid                                                              |
| 2014       | number of sub account in the request exceeded valid range | number of sub account exceeded                                                    |
| 2014       | number of api key in the request exceeded valid range     | number of API Key exceeded                                                        |
| 2016       | invalid request while value specified in sub user states  | lock or unlock failure                                                            |

## Endpoints

### accounts.update#\${mode} ( Subscribe Account Change)

Signature verification: No

Interface permission: Read

Interface description: The topic updates account change details.

#### Subscription Address

| Environment                         | Address                       |
| ----------------------------------- | ----------------------------- |
| Online                              | wss://api.huobi.pro/ws/v2     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/v2 |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                       | Value Range | Default Value |
| --------- | --------- | -------- | ------------------------------------------------- | ----------- | ------------- |
| mode      | integer   | false    | Trigger mode, valid value: 0, 1, default value: 0 |             |               |

Notes:

Samples

1、Not specifying "mode":

accounts.update

Only update when account balance changed;

2、Specify "mode" as 0:

accounts.update#0

Only update when account balance changed;

3、Specify "mode" as 1:

accounts.update#1

Update when either account balance changed or available balance changed.

4、Specify "mode" as 2:

accounts.update#2

Whenever account balance or available balance changed, it will be updated
together.

Note: The topic disseminates the current static value of individual accounts
first, at the beginning of subscription, followed by account change updates.
While disseminating the current static value of individual accounts, inside the
message, field value of "changeType" and "changeTime" is null.

#### Data Update

| Parameter   | Data Type | Required | Description                                                                                                                                                                  | Value Range |
| ----------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| currency    | string    | false    | Currency                                                                                                                                                                     |             |
| accountId   | long      | false    | Account ID                                                                                                                                                                   |             |
| balance     | string    | false    | Account balance (only exists when account balance changed)                                                                                                                   |             |
| available   | string    | false    | Available balance (only exists when available balance changed)                                                                                                               |             |
| changeType  | string    | false    | Change type, valid value: order.place,order.match,order.refund,order.cancel,order.fee-refund,margin.transfer,margin.loan,margin.interest,margin.repay,deposit,withdraw,other |             |
| accountType | string    | false    | account type, valid value: trade, loan, interest                                                                                                                             |             |
| changeTime  | long      | false    | Change time, unix time in millisecond                                                                                                                                        |             |
| seqNum      | long      | false    | Serial Number of Account Change                                                                                                                                              |             |

Notes:

A maker rebate would be paid in batch mode for multiple trades.

#### Subscription Example

```
{
  "action": "sub",
  "ch": "accounts.update"
}
```

#### Example of a Successful Subscription

```
{
  "action": "sub",
  "code": 200,
  "ch": "accounts.update#0",
  "data": {}
}
```

#### Example of a Data Update

` accounts.update#0： {     "action": "push",     "ch": "accounts.update#0",     "data": {         "currency": "btc",         "accountId": 123456,         "balance": "23.111",         "changeType": "transfer",         "accountType":"trade",         "seqNum": "86872993928",         "changeTime": 1568601800000     } }  accounts.update#1： {     "action": "push",     "ch": "accounts.update#1",     "data": {         "currency": "btc",         "accountId": 33385,         "available": "2028.699426619837209087",         "changeType": "order.match",         "accountType":"trade",         "seqNum": "86872993928",         "changeTime": 1574393385167     } } {     "action": "push",     "ch": "accounts.update#1",     "data": {         "currency": "btc",         "accountId": 33385,         "balance": "2065.100267619837209301",         "changeType": "order.match",         "accountType":"trade",         "seqNum": "86872993928",         "changeTime": 1574393385122     } }`

#### Example of a Subscription Cancellation

```
{
  "action": "unsub",
  "ch": "accounts.update"
}
```

### orders#\${symbol} ( Subscribe Order Updates)

Signature verification: No

Interface permission: Read

Rate Limit:

Interface description: An order update can be triggered by any of following: -
Conditional order triggering failure (eventType=trigger) - Conditional order
cancellation before trigger (eventType=deletion) - Order creation
(eventType=creation) - Order matching (eventType=trade) - Order cancellation
(eventType=cancellation) The field list in order update message can be various
per event type, developers can design the data structure in either of two
ways: - Define a data structure including fields for all event types, allowing a
few of them are null - Define different data structure for each event type to
include specific fields, inheriting from a common data structure which has
common fields

#### Subscription Address

| Environment                         | Address                       |
| ----------------------------------- | ----------------------------- |
| Online                              | wss://api.huobi.pro/ws/v2     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/v2 |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                             | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------------- | ----------- | ------------- |
| symbol    | string    | false    | Trading symbol (wildcard \* is allowed) |             |               |

#### Data Update

| Parameter                                                 | Data Type | Required | Description                                                                                                                                                  | Value Range                                                                                                                                                                                                                                                                                                                                            |
| --------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| After conditional order triggering failure                |           | false    |                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| eventType                                                 | string    | false    | Event type, valid value: trigger (only applicable for conditional order)                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| symbol                                                    | string    | false    | Trading symbol                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| clientOrderId                                             | string    | false    | Client order ID                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| orderSide                                                 | string    | false    | Order side, valid value: buy, sell                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                        |
| orderStatus                                               | string    | false    | Order status, valid value: rejected                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| canceledSource                                            | string    | false    | Enumeration value code of the cancellation source                                                                                                            |                                                                                                                                                                                                                                                                                                                                                        |
| canceledSourceDesc                                        | string    | false    | canceled source                                                                                                                                              | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self_match_prevent"、"market"、"fok"、"ioc"、 "limit_maker" |
| errCode                                                   | int       | false    | Error code for triggering failure                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                        |
| errMessage                                                | string    | false    | Error message for triggering failure                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |
| lastActTime                                               | long      | false    | Order triggering failure time                                                                                                                                |                                                                                                                                                                                                                                                                                                                                                        |
| After conditional order being cancelled before triggering |           | false    |                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| eventType                                                 | string    | false    | Event type, valid value: deletion (only applicable for conditional order)                                                                                    |                                                                                                                                                                                                                                                                                                                                                        |
| symbol                                                    | string    | false    | Trading symbol                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| clientOrderId                                             | string    | false    | Client order ID                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| orderSide                                                 | string    | false    | Order side, valid value: buy, sell                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                        |
| orderStatus                                               | string    | false    | Order status, valid value: canceled                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| lastActTime                                               | long      | false    | Order trigger time                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                        |
| After order is submitted                                  |           | false    |                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| eventType                                                 | string    | false    | Event type, valid value: creation                                                                                                                            |                                                                                                                                                                                                                                                                                                                                                        |
| symbol                                                    | string    | false    | Trading symbol                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| accountId                                                 | long      | false    | account ID                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| orderId                                                   | long      | false    | Order ID                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| clientOrderId                                             | string    | false    | Client order ID (if any)                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| orderSource                                               | string    | false    | Order source                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                        |
| orderPrice                                                | string    | false    | Order price                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                        |
| orderSize                                                 | string    | false    | Order size (inapplicable for market buy order)                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| orderValue                                                | string    | false    | Order value (only applicable for market buy order)                                                                                                           |                                                                                                                                                                                                                                                                                                                                                        |
| type                                                      | string    | false    | Order type, valid value: buy-market, sell-market, buy-limit, sell-limit, buy-limit-maker, sell-limit-maker, buy-ioc, sell-ioc, buy-limit-fok, sell-limit-fok |                                                                                                                                                                                                                                                                                                                                                        |
| orderStatus                                               | string    | false    | Order status, valid value: submitted                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                        |
| orderCreateTime                                           | long      | false    | Order creation time                                                                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| After order matching                                      |           | false    |                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| eventType                                                 | string    | false    | Event type, valid value: trade                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| symbol                                                    | string    | false    | Trading symbol                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| tradePrice                                                | string    | false    | Trade price                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                        |
| tradeVolume                                               | string    | false    | Trade volume                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                        |
| orderId                                                   | long      | false    | Order ID                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| type                                                      | string    | false    | Order type, valid value: buy-market, sell-market, buy-limit, sell-limit, buy-limit-maker, sell-limit-maker, buy-ioc, sell-ioc, buy-limit-fok, sell-limit-fok |                                                                                                                                                                                                                                                                                                                                                        |
| clientOrderId                                             | string    | false    | Client order ID (if any)                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| orderSource                                               | string    | false    | Order source                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                        |
| orderPrice                                                | string    | false    | Original order price (not available for market order)                                                                                                        |                                                                                                                                                                                                                                                                                                                                                        |
| orderSize                                                 | string    | false    | Original order amount (not available for buy-market order)                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| orderValue                                                | string    | false    | Original order value (only available for buy-market order)                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| tradeId                                                   | long      | false    | Trade ID                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| tradeTime                                                 | long      | false    | Trade time                                                                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| aggressor                                                 | bool      | false    | Aggressor or not, valid value: true (taker), false (maker)                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| orderStatus                                               | string    | false    | Order status, valid value: partial-filled, filled                                                                                                            |                                                                                                                                                                                                                                                                                                                                                        |
| remainAmt                                                 | string    | false    | Remaining amount (for buy-market order it's remaining value)                                                                                                 |                                                                                                                                                                                                                                                                                                                                                        |
| execAmt                                                   | string    | false    | Accumulative amount (for buy-market order it is accumulative value)                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| totalTradeAmount                                          | string    | false    | Total transaction amount--This field must be a newly completed order on December 6, 2024. The historical data is empty.                                      |                                                                                                                                                                                                                                                                                                                                                        |
| After order cancellation                                  |           | false    |                                                                                                                                                              |                                                                                                                                                                                                                                                                                                                                                        |
| eventType                                                 | string    | false    | Event type, valid value: cancellation                                                                                                                        |                                                                                                                                                                                                                                                                                                                                                        |
| symbol                                                    | string    | false    | Trading symbol                                                                                                                                               |                                                                                                                                                                                                                                                                                                                                                        |
| orderId                                                   | long      | false    | Order ID                                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| type                                                      | string    | false    | Order type, valid value: buy-market, sell-market, buy-limit, sell-limit, buy-limit-maker, sell-limit-maker, buy-ioc, sell-ioc, buy-limit-fok, sell-limit-fok |                                                                                                                                                                                                                                                                                                                                                        |
| clientOrderId                                             | string    | false    | Client order ID (if any)                                                                                                                                     |                                                                                                                                                                                                                                                                                                                                                        |
| orderSource                                               | string    | false    | Order source                                                                                                                                                 |                                                                                                                                                                                                                                                                                                                                                        |
| orderPrice                                                | string    | false    | Original order price (not available for market order)                                                                                                        |                                                                                                                                                                                                                                                                                                                                                        |
| orderSize                                                 | string    | false    | Original order amount (not available for buy-market order)                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| orderValue                                                | string    | false    | Original order value (only available for buy-market order)                                                                                                   |                                                                                                                                                                                                                                                                                                                                                        |
| orderStatus                                               | string    | false    | Order status, valid value: partial-canceled, canceled                                                                                                        |                                                                                                                                                                                                                                                                                                                                                        |
| remainAmt                                                 | string    | false    | Remaining amount (for buy-market order it's remaining value)                                                                                                 |                                                                                                                                                                                                                                                                                                                                                        |
| execAmt                                                   | string    | false    | Accumulative amount (for buy-market order it is accumulative value)                                                                                          |                                                                                                                                                                                                                                                                                                                                                        |
| totalTradeAmount                                          | string    | false    | Total transaction amount--This field must be a newly completed order on December 6, 2024. The historical data is empty.                                      |                                                                                                                                                                                                                                                                                                                                                        |
| lastActTime                                               | long      | false    | Last activity time                                                                                                                                           |                                                                                                                                                                                                                                                                                                                                                        |

#### Subscription Example

```
{
  "action": "sub",
  "ch": "orders#btcusdt"
}
```

#### Example of a Successful Subscription

```
{
  "action": "sub",
  "code": 200,
  "ch": "orders#btcusdt",
  "data": {}
}
```

#### Example of a Data Update

`After conditional order triggering failure –  {     "action":"push",     "ch":"orders#btcusdt",     "data":      {         "orderSide":"buy",         "lastActTime":1583853365586,         "clientOrderId":"abc123",         "orderStatus":"rejected",         "symbol":"btcusdt",         "eventType":"trigger",         "errCode": 2002,         "errMessage":"invalid.client.order.id (NT)"     } }  After conditional order being cancelled before triggering –  {     "action":"push",     "ch":"orders#btcusdt",     "data":     {         "orderSide":"buy",         "lastActTime":1583853365586,         "clientOrderId":"abc123",         "orderStatus":"canceled",         "symbol":"btcusdt",         "eventType":"deletion"     } } After order is submitted –  {     "action":"push",     "ch":"orders#btcusdt",     "data":     {         "orderSize":"2.000000000000000000",         "orderCreateTime":1583853365586,         "accountld":992701,         "orderPrice":"77.000000000000000000",         "type":"sell-limit",         "orderId":27163533,         "clientOrderId":"abc123",         "orderSource":"spot-api",         "orderStatus":"submitted",         "symbol":"btcusdt",         "eventType":"creation"      } }`

#### Example of a Subscription Cancellation

```
{
  "action": "unsub",
  "ch": "orders#btcusdt"
}
```

### trade.clearing#\${symbol}#\${mode} ( Subscribe Trade Details & Order Cancellation post Clearing)

Signature verification: No

Interface permission: Read

Interface description: Only update when order is in transaction or cancellation.
Order transaction update is in tick by tick mode, which means, if a taker’s
order matches with multiple maker’s orders, the simultaneous multiple trades
will be disseminated one by one. But the update sequence of the multiple trades,
may not be exactly the same as the sequence of the transactions made. Also, if
an order is auto cancelled immediately just after its partial fills, for example
a typical IOC order, this channel would possibly disseminate the cancellation
update first prior to the trade. If user willing to receive order updates in
exact same sequence with the original happening, it is recommended to subscribe
order update channel orders#\${symbol}.

#### Subscription Address

| Environment                         | Address                       |
| ----------------------------------- | ----------------------------- |
| Online                              | wss://api.huobi.pro/ws/v2     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/v2 |

#### Request Parameter

| Field Name | Type | Description |
| ---------- | ---- | ----------- |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter | Data Type | Required | Description                                                                                                            | Value Range | Default Value |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| symbol    | string    | false    | Trading symbol (wildcard \* is allowed)                                                                                |             |               |
| mode      | int       | false    | Subscription mode (0 – subscribe only trade event; 1 – subscribe both trade and cancellation events; default value: 0) |             |               |

Notes:

About optional field ‘mode’: If not filled, or filled with 0, it implicates to
subscribe trade event only. If filled with 1, it implicates to subscribe both
trade and cancellation events.

#### Data Update

| Parameter       | Data Type | Required | Description                                                                                                                                                                                                                                                                                              | Value Range |
| --------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| eventType       | string    | false    | Event type (trade)                                                                                                                                                                                                                                                                                       |             |
| symbol          | string    | false    | Trading symbol                                                                                                                                                                                                                                                                                           |             |
| orderId         | long      | false    | Order ID                                                                                                                                                                                                                                                                                                 |             |
| tradePrice      | string    | false    | Trade price                                                                                                                                                                                                                                                                                              |             |
| tradeVolume     | string    | false    | Trade volume                                                                                                                                                                                                                                                                                             |             |
| orderSide       | string    | false    | Order side, valid value: buy, sell                                                                                                                                                                                                                                                                       |             |
| orderType       | string    | false    | Order type, valid value: buy-market, sell-market,buy-limit,sell-limit,buy-ioc,sell-ioc,buy-limit-maker,sell-limit-maker,buy-stop-limit,sell-stop-limit,buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok                                                                            |             |
| aggressor       | bool      | false    | Aggressor or not, valid value: true, false                                                                                                                                                                                                                                                               |             |
| tradeId         | long      | false    | Trade ID                                                                                                                                                                                                                                                                                                 |             |
| tradeTime       | long      | false    | Trade time, unix time in millisecond                                                                                                                                                                                                                                                                     |             |
| transactFee     | string    | false    | Transaction fee (positive value) or Transaction rebate (negative value)                                                                                                                                                                                                                                  |             |
| feeCurrency     | string    | false    | Currency of transaction fee or transaction fee rebate (transaction fee of buy order is based on base currency, transaction fee of sell order is based on quote currency; transaction fee rebate of buy order is based on quote currency, transaction fee rebate of sell order is based on base currency) |             |
| feeDeduct       | string    | false    | Transaction fee deduction                                                                                                                                                                                                                                                                                |             |
| feeDeductType   | string    | false    | Transaction fee deduction type, valid value: ht, point                                                                                                                                                                                                                                                   |             |
| accountId       | long      | false    | Account ID                                                                                                                                                                                                                                                                                               |             |
| source          | string    | false    | Order source                                                                                                                                                                                                                                                                                             |             |
| orderPrice      | string    | false    | Order price (invalid for market order)                                                                                                                                                                                                                                                                   |             |
| orderSize       | string    | false    | Order size (invalid for market buy order)                                                                                                                                                                                                                                                                |             |
| orderValue      | string    | false    | Order value (only valid for market buy order)                                                                                                                                                                                                                                                            |             |
| clientOrderId   | string    | false    | Client order ID                                                                                                                                                                                                                                                                                          |             |
| stopPrice       | string    | false    | Stop price (only valid for stop limit order)                                                                                                                                                                                                                                                             |             |
| operator        | string    | false    | Operation character (only valid for stop limit order)                                                                                                                                                                                                                                                    |             |
| orderCreateTime | long      | false    | Order creation time                                                                                                                                                                                                                                                                                      |             |
| orderStatus     | string    | false    | Order status, valid value: filled, partial-filled                                                                                                                                                                                                                                                        |             |

Notes:

\- The calculated maker rebate value inside ‘transactFee’ may not be paid
immediately.

#### Subscription Example

```
{
  "action": "sub",
  "ch": "trade.clearing#btcusdt#0"
}
```

#### Example of a Successful Subscription

```
{
  "action": "sub",
  "code": 200,
  "ch": "trade.clearing#btcusdt#0",
  "data": {}
}
```

#### Example of a Data Update

```
{
  "ch": "trade.clearing#btcusdt#0",
  "data": {
    "eventType": "trade",
    "symbol": "btcusdt",
    "orderId": 99998888,
    "tradePrice": "9999.99",
    "tradeVolume": "0.96",
    "orderSide": "buy",
    "aggressor": true,
    "tradeId": 919219323232,
    "tradeTime": 998787897878,
    "transactFee": "19.88",
    "feeDeduct ": "0",
    "feeDeductType": "",
    "feeCurrency": "btc",
    "accountId": 9912791,
    "source": "spot-api",
    "orderPrice": "10000",
    "orderSize": "1",
    "clientOrderId": "a001",
    "orderCreateTime": 998787897878,
    "orderStatus": "partial-filled"
  }
}
```

#### Example of a Subscription Cancellation

```
{
  "action": "unsub",
  "ch": "trade.clearing#btcusdt#0"
}
```

### create-order (ws Place An Sport Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Support spot order transactions through websocket.

#### Subscription Address

| Environment                         | Address                          |
| ----------------------------------- | -------------------------------- |
| Online                              | wss://api.huobi.pro/ws/trade     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type   | Description                             |
| ---------- | ------ | --------------------------------------- |
| ch         | string | Required； Operator Name，create-order; |
| params     | string | Order parameters                        |
| cid        | string | request id                              |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter          | Data Type | Required | Description                                                                                                                                                                                                                   | Value Range | Default Value |
| ------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| account-id         | string    | false    | The account id used for this trade                                                                                                                                                                                            |             |               |
| symbol             | string    | false    | The trading symbol to trade                                                                                                                                                                                                   |             |               |
| type               | string    | false    | The order type。buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |             |               |
| amount             | string    | false    | order size (for buy market order, it's order value)                                                                                                                                                                           |             |               |
| price              | string    | false    | The order price (not available for market order)                                                                                                                                                                              |             |               |
| source             | string    | false    | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api';                                    |             | spot-api      |
| client-order-id    | string    | false    | Client order ID                                                                                                                                                                                                               |             |               |
| self-match-prevent | int       | false    | self match prevent. 0: no, means allowing self-trading; 1: yes, means not allowing self-trading                                                                                                                               |             | 0             |
| stop-price         | string    | false    | Trigger price of stop limit order                                                                                                                                                                                             |             |               |
| operator           | string    | false    | operation charactor of stop price                                                                                                                                                                                             |             |               |

Notes: buy-limit-maker If the order price is greater than or equal to the lowest
selling price in the market, the order will be rejected. If the order price is
less than the lowest selling price in the market, the order will be accepted.
sell-limit-maker If the order price is less than or equal to the highest buy
price in the market, the order will be rejected. If the order price is greater
than the highest buy price in the market, the order will be accepted.

#### Data Update

| Parameter | Data Type | Required | Description  | Value Range    |
| --------- | --------- | -------- | ------------ | -------------- |
| status    | string    | false    | status       | OK" or "Error" |
| data      | long      | false    | order number |                |

Notes: Notes: The returned data object is a single string which represents the
order id

#### Subscription Example

```
{
  "cid": "0bdac8fe-8798-11ef-8a39-acde48001122",
  "ch": "create-order",
  "params": {
    "account-id": 31276149,
    "price": 60001,
    "amount": "0.001",
    "market-amount": "0",
    "source": "spot-api",
    "type": "buy-limit-fok",
    "symbol": "btcusdt",
    "coupon-id": ""
  }
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

```
{
  "status": "ok",
  "data": "1180298630694853",
  "cid": "0bdac8fe-8798-11ef-8a39-acde48001122"
}
```

#### Example of a Subscription Cancellation

No data

### create-batchorder (ws Place An Spot Batch Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Supports spot batch order transactions via websocket.

#### Subscription Address

| Environment                         | Address                          |
| ----------------------------------- | -------------------------------- |
| Online                              | wss://api.huobi.pro/ws/trade     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type   | Description                                  |
| ---------- | ------ | -------------------------------------------- |
| ch         | string | Required； Operator Name，create-batchorder; |
| params     | string | Order parameters                             |
| cid        | string | request id                                   |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter          | Data Type | Required | Description                                                                                                                                                                                                                   | Value Range | Default Value |
| ------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| account-id         | string    | false    | The account id used for this trade                                                                                                                                                                                            |             |               |
| symbol             | string    | false    | The trading symbol to trade                                                                                                                                                                                                   |             |               |
| type               | string    | false    | The order type。buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |             |               |
| amount             | string    | false    | order size (for buy market order, it's order value)                                                                                                                                                                           |             |               |
| price              | string    | false    | The order price (not available for market order)                                                                                                                                                                              |             |               |
| source             | string    | false    | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api';                                    |             | spot-api      |
| client-order-id    | string    | false    | Client order ID                                                                                                                                                                                                               |             |               |
| self-match-prevent | int       | false    | self match prevent. 0: no, means allowing self-trading; 1: yes, means not allowing self-trading                                                                                                                               |             | 0             |
| stop-price         | string    | false    | Trigger price of stop limit order                                                                                                                                                                                             |             |               |
| operator           | string    | false    | operation charactor of stop price                                                                                                                                                                                             |             |               |

Notes: buy-limit-maker If the order price is greater than or equal to the lowest
selling price in the market, the order will be rejected. If the order price is
less than the lowest selling price in the market, the order will be accepted.
sell-limit-maker If the order price is less than or equal to the highest buy
price in the market, the order will be rejected. If the order price is greater
than the highest buy price in the market, the order will be accepted.

#### Data Update

| Parameter       | Data Type | Required | Description                                 | Value Range |
| --------------- | --------- | -------- | ------------------------------------------- | ----------- |
| status          | string    | false    | status                                      |             |
| DATA_START      | object    | false    |                                             |             |
| order-id        | long      | false    | The order id                                |             |
| client-order-id | string    | false    | The client order id (if available)          |             |
| err-code        | string    | false    | The error code (only for rejected order)    |             |
| err-msg         | string    | false    | The error message (only for rejected order) |             |
| DATA_END        |           | false    |                                             |             |

Notes: Notes: The returned data object is a single string which represents the
order id

#### Subscription Example

```
{
  "cid": "a7ed6700-8799-11ef-9ce3-acde48001122",
  "ch": "create-batchorder",
  "params": [
    {
      "price": 60001,
      "amount": "0.001",
      "market-amount": "0",
      "account-id": 31276149,
      "source": "spot-api",
      "type": "buy-limit-fok",
      "symbol": "btcusdt",
      "coupon-id": ""
    },
    {
      "price": 60001,
      "amount": "0.001",
      "market-amount": "0",
      "account-id": 31276149,
      "source": "spot-api",
      "type": "buy-limit-fok",
      "symbol": "btcusdt",
      "coupon-id": ""
    }
  ]
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

```
{
  "status": "ok",
  "data": [
    {
      "order-id": 1180298630694870,
      "client-order-id": ""
    },
    {
      "order-id": 1180298630694871,
      "client-order-id": ""
    }
  ],
  "cid": "a7ed6700-8799-11ef-9ce3-acde48001122"
}
```

#### Example of a Subscription Cancellation

No data

### create-margin-order (ws Place An Margin Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Support margin order transactions through websocket.

#### Subscription Address

| Environment                         | Address                          |
| ----------------------------------- | -------------------------------- |
| Online                              | wss://api.huobi.pro/ws/trade     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type   | Description                                    |
| ---------- | ------ | ---------------------------------------------- |
| ch         | string | Required； Operator Name，create-margin-order; |
| params     | string | Order parameters                               |
| cid        | string | request id                                     |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter     | Data Type | Required | Description                                                                                                                                                                                                                                                                           | Value Range | Default Value |
| ------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| symbol        | string    | true     | The trading symbol to trade                                                                                                                                                                                                                                                           |             |               |
| account-id    | string    | true     | The account id used for this trade                                                                                                                                                                                                                                                    |             |               |
| amount        | string    | false    | Order transaction volume (market buy order is the order transaction amount); for market orders, you can only choose one of the two amounts, amount and market-amount, 0 means not to transmit;                                                                                        |             |               |
| market-amount | string    | false    | The market price order buy order is the order transaction volume, and the sell unit order transaction amount; amount and market-amount can only be selected from the two, 0 means not to be transmitted;                                                                              |             |               |
| borrow-amount | string    | false    | The currency or quantity that needs to be borrowed (buying at market price represents the amount, and the rest represents the quantity) (borrowing needs to be uploaded). The maximum precision is 3 digits, if it exceeds, it will be rounded up. Such as: 6.12345 should pass 6.124 |             |               |
| type          | string    | true     | buy-market, sell-market, buy-limit, sell-limit,, buy-stop-limit, sell-stop-limit                                                                                                                                                                                                      |             |               |
| trade-purpose | string    | true     | Transaction purpose {1: automatic loan, 2: automatic repayment}                                                                                                                                                                                                                       |             |               |
| price         | string    | false    | The order price (not available for market order)                                                                                                                                                                                                                                      |             |               |
| stop-price    | string    | false    | Trigger price of stop limit order                                                                                                                                                                                                                                                     |             |               |
| operator      | string    | false    | operation charactor of stop price                                                                                                                                                                                                                                                     |             |               |
| source        | string    | true     | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api';                                                                                            |             |               |

#### Data Update

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |
| code      | Integer   | true     |             |             |
| success   | Boolean   | true     |             |             |
| message   | String    | false    |             |             |
| data      | OrderResp | false    |             |             |
| order-id  | long      | true     |             |             |

#### Subscription Example

```
{
  "cid": "137fedb2-879a-11ef-bc0b-acde48001122",
  "ch": "create-margin-order",
  "params": {
    "price": 64350,
    "amount": "0.001554",
    "market-amount": "0",
    "account-id": 31276407,
    "repay-amount": 72.8,
    "source": "super-margin-api",
    "type": "sell-limit-fok",
    "symbol": "btcusdt",
    "trade-purpose": 2
  }
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

```
{
  "code": 200,
  "data": {
    "orderId": 1180298630694873
  },
  "message": null,
  "success": true,
  "cid": "137fedb2-879a-11ef-bc0b-acde48001122"
}
```

#### Example of a Subscription Cancellation

No data

### cancelall (ws Cancel All Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit

Interface description: Support for cancelling all (Maximum 100 at a time) orders
through websocket.

#### Subscription Address

| Environment                         | Address                          |
| ----------------------------------- | -------------------------------- |
| Online                              | wss://api.huobi.pro/ws/trade     |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |

#### Request Parameter

| Field Name | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| ch         | string | Required； Operator Name，cancelall; |
| params     | string | Order parameters                     |
| cid        | string | request id                           |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter  | Data Type | Required | Description                                                                                 | Value Range                                                                                                                                                                | Default Value |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| account-id | string    | false    | The account id used for this cancel                                                         | Refer to GET /v1/account/accounts                                                                                                                                          |               |
| symbol     | string    | false    | The trading symbol list (maximum 10 symbols, separated by comma, default value all symbols) | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols                                                                                         | all           |
| types      | string    | false    | One or more types of order to include in the search, use comma to separate.                 | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |               |
| size       | string    | false    | Filter on the direction of the trade                                                        | buy, sell                                                                                                                                                                  |               |
| size       | ion       | false    | The number of orders to cancel                                                              | \[1, 100\]                                                                                                                                                                 | 100           |

#### Data Update

| Parameter     | Data Type | Required | Description                                                          | Value Range |
| ------------- | --------- | -------- | -------------------------------------------------------------------- | ----------- |
| status        | string    | false    | status                                                               |             |
| DATA_START    | object    | false    |                                                                      |             |
| success-count | int       | false    | The number of cancel request sent successfully                       |             |
| failed-count  | int       | false    | The number of cancel request failed                                  |             |
| next-id       | long      | false    | the next order id that can be cancelled, -1 indicates no open orders |             |
| DATA_END      |           | false    |                                                                      |             |

#### Subscription Example

```
{
  "cid": "9b5769cc-879a-11ef-9a6a-acde48001122",
  "ch": "cancelall",
  "params": {
    "account-id": 31276149,
    "symbol": "btcusdt"
  }
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "success-count": 4,
    "failed-count": 0,
    "next-id": -1
  },
  "cid": "9b5769cc-879a-11ef-9a6a-acde48001122"
}
```

#### Example of a Subscription Cancellation

No data

### cancel (ws Batch Cancel Specified Order)

Signature verification: Yes

Interface permission: Trade

Rate Limit: Shared REST frequency limit.If you cancel an order individually, the
frequency limit for single order cancellation will be used. If you cancel orders
in batches, the frequency limit for batch order cancellation will be used. They
will not affect each other.

Interface description: Supports batch cancellation of specified orders via
websocket.

#### Subscription Address

| Environment                         | Address                          |
| ----------------------------------- | -------------------------------- |
| Online (preferred by aws customers) | wss://api-aws.huobi.pro/ws/trade |
| Online                              | wss://api.huobi.pro/ws/trade     |

#### Request Parameter

| Field Name | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| ch         | string | Required； Operator Name，cancel; |
| params     | string | Order parameters                  |
| cid        | string | request id                        |

#### Rule description

| Subscribe(sub) | Unsubscribe( unsub ) | Rule |
| -------------- | -------------------- | ---- |

#### Subscription Parameter

| Parameter        | Data Type | Required | Description                                                                                                                                                                                          | Value Range | Default Value                      |
| ---------------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ---------------------------------- |
| order-ids        | string    | false    | The order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request). It is suggest to use order-ids rather than client-order-ids, the former is faster and more stable |             | No more than 50 orders per request |
| client-order-ids | string    | false    | The client order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request), it must exist already, otherwise it is not allowed to use when placing a new order         |             | No more than 50 orders per request |

#### Data Update

| Parameter       | Data Type | Required | Description | Value Range |
| --------------- | --------- | -------- | ----------- | ----------- |
| status          | string    | false    |             |             |
| DATA_START      | object    | false    |             |             |
| success         | array     | false    |             |             |
| FAILED_START    | object    | false    |             |             |
| order-id        | string    | false    |             |             |
| client-order-id | string    | false    |             |             |
| err-code        | string    | false    |             |             |
| err-msg         | string    | false    |             |             |
| order-state     | string    | false    |             |             |
| FAILED_END      |           | false    |             |             |
| DATA_END        |           | false    |             |             |

#### Subscription Example

```
{
  "cid": "70675af0-879b-11ef-9123-acde48001122",
  "ch": "cancel",
  "params": {
    "order-ids": [
      "1180298630694875",
      "1180298630694876"
    ]
  }
}
```

#### Example of a Successful Subscription

No data

#### Example of a Data Update

```
{
  "status": "ok",
  "data": {
    "success": [
      "1180298630694875",
      "1180298630694876"
    ],
    "failed": []
  },
  "cid": "70675af0-879b-11ef-9123-acde48001122"
}
```

#### Example of a Subscription Cancellation

No data
