# HTX Public REST API Documentation

## Quick Start

### Preparation

Before you use API, you need to login the website to create API Key with proper permissions. The API key is shared for all instruments in HTX including spot, futures, swap, options.

You can manage your API Keys [here](https://www.htx.com/apikey/).

Every user can create at most 20 API Keys, each can be applied with either permission below:

-   Read permission: It is used to query the data, such as order query, trade query.
-   Trade permission: It is used to create order, cancel order and transfer, etc.
-   Withdraw permission: It is used to create withdraw order, cancel withdraw order, etc.

Please remember below information after creation:

-   `Access Key` It is used in API request
    
-   `Secret Key` It is used to generate the signature (only visible once after creation)
    

The API Key can bind maximum 20 IP addresses (either host IP or network IP), we strongly suggest you bind IP address for security purpose. The API Key without IP binding will be expired after 90 days.

**Warning** : These two keys are important to your account safety, please don't share **both** of them together to anyone else (including any product or person from HTX). If you find your API Key is disposed, please remove it immediately.

### SDK and Demo

**SDK (Suggested)**

[Java](https://github.com/huobiapi/huobi_Java) | [Python3](https://github.com/huobiapi/huobi_Python) | [C++](https://github.com/huobiapi/huobi_Cpp) | [C#](https://github.com/HuobiRDCenter/huobi_CSharp) | [Go](https://github.com/huobirdcenter/huobi_golang)

**Other Demos**

[https://github.com/huobiapi?tab=repositories](https://github.com/huobiapi?tab=repositories)

### Testnet (Stopped)

The testnet has been alive for months, however the active user count is rather low and the cost is high, after considering carefully we decide to shutdown the testnet environment.

It is suggest you use live environment, which is more stable and has more liquidity.

### Interface Type

There are two types of interface, you can choose the proper one according to your scenario and preferences.

#### REST API

REST (Representational State Transfer) is one of the most popular communication mechanism under HTTP, each URL represents a type of resource.

It is suggested to use Rest API for one-off operation, like trading and withdraw.

#### WebSocket API

WebSocket is a new protocol in HTML5. It is full-duplex between client and server. The connection can be established by a single handshake, and then server can push the notification to client actively.

It is suggest to use WebSocket API to get data update, like market data and order update.

**Authentication**

Both API has two levels of authentication:

Public API: It is for basic information and market data. It doesn't need authentication.

Private API: It is for account related operation like trading and account management. Each private API must be authenticated with API Key.

### Access URLs

You can compare the network latency between two domain api.huobi.pro and api-aws.huobi.pro, and then choose the better one for you.

In general, the domain api-aws.huobi.pro is optimized for AWS client, the latency will be lower.

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

It is not recommended to use proxy to access HTX API because it will introduce high latency and low stability.

It is recommended to access HTX API from AWS Japan for better stability. If your server is in China mainland, it may be not stable.

### Glossary

#### Trading symbols

The trading symbols are consist of base currency and quote currency. Take the symbol `BTC/USDT` as an example, `BTC` is the base currency, and `USDT` is the quote currency.

#### Account

The `account-id` defines the Identity for different business type, it can be retrieved from API `/v1/account/accounts` , where the `account-type` is the business types.The types include:

-   spot: Spot account
-   otc: OTC account
-   margin: Isolated margin account, the detailed currency type is defined in `subType`
-   super-margin / cross-margin: Cross-margin account
-   investment: c2c margin lending account
-   borrow: c2c margin borrowing account
-   point: Point card account
-   minepool: Minepool account
-   etf: ETF account

You can refer to [HTX Course](https://www.huobi.com/en-us/guide/) to get detailed information

## API Access

### Overview

| Category | URL Path | Description |
| --- | --- | --- |
| Common | /v1/common/\* | Common interface, including currency, currency pair, timestamp, etc |
| Market Data | /market/\* | Market data interface, including trading, depth, quotation, etc |
| Account | /v1/account/\* /v1/subuser/\* | Account interface, including account information, sub-user ,etc |
| Order | /v1/order/\* | Order interface, including order creation, cancellation, query, etc |
| Margin | /v1/margin/\* | Margin interface, including debit, payment, query, etc |
| Cross Margin | /v1/cross-margin/\* | Cross margin interface, including debit, payment, query, etc |

Above is a general category, it doesn't cover all API, you can refer to detailed API document according to your requirement.

### New Version Rate limit Rule

-   The new version rate limit is applied on UID basis, which means, the overall access rate, from all API keys under same UID, to single endpoint, shouldn’t exceed the rate limit applied on that endpoint.
    
-   It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the expire time for current rate limit time window, then you can adjust the API access rate dynamically.

### Request Format

The API is restful and there are two method: GET and POST.

-   GET request: All parameters are included in URL, and do not carry body(content-length>0), in otherwise will return 403 error code.
-   POST request: All parameters are formatted as JSON and put int the request body

### Response Format

The response is JSON format.There are four fields in the top level: `status`, `ch`, `ts` and `data`. The first three fields indicate the general status, the business data is is under `data` field.

Below is an example of response:

```
{"status":"ok","ch":"market.btcusdt.kline.1day","ts":1499223904680,"data"://perAPIresponsedatainnestedJSONobject}
```

| Field | Data Type | Description |
| --- | --- | --- |
| status | string | Status of API response |
| ch | string | The data stream. It may be empty as some API doesn't have data stream |
| ts | int | The UTC timestamp when API respond, the unit is millisecond |
| data | object | The body data in response |

### Data Type

The JSON data type described in this document is defined as below:

-   `string`: a sequence of characters that are quoted
-   `int`: a 32-bit integer, mainly used for status code, size and count
-   `long`: a 64-bit integer, mainly used for Id and timestamp
-   `float`: a fraction represented in decimal format, mainly used for volume and price, recommend to use high precision decimal data types in program

### Best Practice

#### Security

-   It is strongly suggested to bind your IP with your API Key to ensure that your API Key can only be used in your machine. Furthermore, your API Key will be expired after 90 days if it is not binded with any IP.
-   It is strongly suggested not to share your API Key with any body or third-party software, otherwise your personal information and asset may be stolen. If your expose your API Key by accident, please do delete the API Key and create a new one.

#### General

**API Access**

-   It is suggested not to use temporary domain or proxy, which may be not stable.
-   It is suggested to use AWS Japan to access API for lower latency
-   It is suggested to connect to domain `api-aws.huobi.pro` if your server is based on AWS, because this domain is optimized for AWS client, the latency will be lower.

**New Version Rate limit Rule**

-   Only those endpoints marked with rate limit value separately are applied with new rate limit rule.
    
-   It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the expire time for current rate limit time window, then you can adjust the API access rate dynamically.
    
-   The overall access rate, from all API keys under same UID, to single endpoint, shouldn’t exceed the rate limit applied on that endpoint.
    

#### Market

**Market data**

-   It is suggested to use WebSocket interface to subscribe the market update and then cache the data locally, because WebSocket notification has lower latency and not have rate limit.
-   It is suggested not to subscribe too many topics in a single websocket connection, it may generate more notifications and cause network latency and disconnection.

**Latest trade**

-   It is suggested to subscribe WebSocket topic `market.$symbol.trade.detail`, the response field `price` represents the latest price, and it has lower latency.
-   It is suggested to use `tradeId` to de-duplicate if you subscribe WebSocket topic `market.$symbol.trade.detail`.

**Depth**

-   It is suggested to subscribe WebSocket topic `market.$symbol.bbo` if you only need the best bid and best offer.
-   It is suggested to subscribe WebSocket topic `market.$symbol.depth.$type` if you need multiple bid and offer with normal latency.
-   It is suggested to subscribe WebSocket topic `market.$symbol.mbp.$level` if you need multiple bid and offer with lower latency
-   It is suggested to use `version` field to de-duplicate and discard the smaller data if you use Rest interface `/market/depth` and WebSocket topic `market.$symbol.depth.$type`. It is suggest to use `seqNum` to de-duplicate and discard the smaller data if yo subscribe WebSocket topic `market.$symbol.mbp.$levels`.

#### Order

**Place an order (/v1/order/orders/place)**

-   It is suggested to follow the symbol reference (`/v1/common/symbols`) to validate the amount and value before placing the older, otherwise you may place an invalid order and waste your time.
-   It is suggested to provide an unique `client-order-id` field when placing the order, it is useful to track your orders status if you fail to get the order id response. Later you can use the `client-order-id` to match the WebSocket order notification or query order detail by interface `/v1/order/orders/getClientOrder`.The uniqueness of the clientOrderId passed in when you place an order will no longer be verified. We recommend you to manage clientOrderId by yourself to ensure its uniqueness. If multiple orders use the same clientOrderId, the latest order corresponding to the clientOrderId will be returned when querying/canceling an order.

**Search history olders (/v1/order/orders)**

-   It is recommended to use `start-time` and `end-time` to query, that are two timestamps with 13 digits (millisecond). The maximum query time window is 48 hours (2 days), the more precision you provide, the better performance you will get. You can query for multiple iterations.

**Order update**

-   It is suggested to subscribe WebSocket topic `orders.$symbol`, which has lower latency and more accurate sequence.

#### Account

**Asset update**

-   It is suggested to subscribe both WebSocket topic `orders.$symbol` and `account.update#${mode}`. The former one tells the order status update and arrives earlier than the latter one, and the latter one confirms the final asset balance.
-   It is suggested not to subscribe WebSocket topic `accounts`, which is replaced by `accounts.update#${mode}`, and will be retired later.

## Reference Data

### Introduction

Reference data APIs provide public reference information such as system status, market status, symbol info, currency info, chain info and server timestamp.

## Market Data

### Introduction

Market data APIs provide public market information such as varies of candlestick, depth and trade information.

The market data is updated **once per second**.

### Error Code

Below is the error code, error message and description returned by Market data APIs.

| Error Code | Error Message | Description |
| --- | --- | --- |
| invalid-parameter | invalid symbol | Parameter symbol is invalid |
| invalid-parameter | invalid period | Parameter period is invalid for candlestick data |
| invalid-parameter | invalid depth | Parameter depth is invalid for depth data |
| invalid-parameter | invalid type | Parameter type is invalid |
| invalid-parameter | invalid size | Parameter size is invalid |
| invalid-parameter | invalid size,valid range: \[1, 2000\] | Parameter size range is invalid |
| invalid-parameter | request timeout | Request timeout please try again |

## Account

### Introduction

Account APIs provide account related (such as basic info, balance, history, point) query and transfer functionality.

All endpoints in this section require authentication

### Error Code

Below is the error code, error message and description returned by Account APIs.

| Error Code | Error Message | Description |
| --- | --- | --- |
| 500 | system error | Server internal error |
| 1002 | forbidden | Operation is forbidden, such as the account Id and UID doesn't match |
| 2002 | "invalid field value in currency" | Parameter currency is invalid |
| 2002 | "invalid field value in transactTypes" | Parameter transactTypes is invalid (should be transfer) |
| 2002 | "invalid field value in sort" | Parameter sort is invalid (should be 'asc' or 'desc') |
| 2002 | "value in fromId is not found in record" | Value fromId doesn't exist |
| 2002 | "invalid field value in accountId" | Parameter accountId is invalid (should not be empty) |
| 2002 | "value in startTime exceeded valid range" | Value startTime is later than current time or earlier than 180 days ago |
| 2002 | "value in endTime exceeded valid range") | Value endTime is earlier than startTime, or 10 days later than startTime |
| 40401 |  | Deduction is unavailable for sub-accounts. |
| 40402 |  | Deduction currency cannot be empty |
| 40403 |  | Too many requests. |
| 40404 |  | Point Cards are unavailable in the current country or region. |
| 40405 |  | The crypto is unavailable for deduction. |
| 40406 |  | User's Point Card balance is zero. |
| 40407 |  | Invalid deduction type. |
| 40408 |  | Duplicate request. Please try again later |
| 3011 |  | Verification failure |

## Trading

### Introduction

Trading APIs provide trading related functionality, including placing order, canceling order, order history query, trading history query, transaction fee query.

All endpoints in this section require authentication

The parameter "account-id" and "source" should be set properly, refer to details in Request Parameters description below.

Below is the glossary of trading related field:

**order type**: The order type is consist of trade direction and behavior type: \[direction\]-\[type\]

direction:

-   buy
-   sell

type:

-   market : The price is not required in order creation request, you only need to specify either volume or amount. The matching and trade will happen automatically according to the request.
-   limit: Both of the price and amount should be specified in order creation request.
-   limit-maker: The price is specified in order creation request as market maker. It will not be matched in the matching queue.
-   ioc: ioc stands for "immediately or cancel", it means the order will be canceled if it couldn't be matched. If the order is partially traded, the remaining part will be canceled.
-   limit-fok: fok stands for "fill or kill", it means the order will be cancelled if it couldn't be **fully** matched. Even if the order can be partially filled, the entire order will be cancelled.
-   market-grid: Grid trading market order (not supported by API)
-   limit-grid: Grid trading limit order (not supported by API)
-   stop-limit: The price in order creation request is the trigger price. The order will be put into matching queue only when the market price reaches the trigger price. This type is replaced by conditional order, please use conditional order APIs

**order source**: the origin of the order

-   spot-api: API order from spot account
-   margin-api：API order from margin account
-   super-margin-api：API order from cross-margin account
-   c2c-margin-api：API order from c2c account
-   grid-trading-sys：grid order (not supported by API)

**order state**:

-   created: The order is created, and not in the matching queue yet.
-   submitted: The order is submitted, and already in the matching queue, waiting for deal.
-   partial-filled: The order is already in the matching queue and partially traded, and is waiting for further matching and trade.
-   filled: The order is already traded and not in the matching queue any more.
-   partial-canceled: The order is not in the matching queue any more. The status is transferred from 'partial-filled', the order is partially trade, but remaining is canceled.
-   canceling: The order is under canceling, but haven't been removed from matching queue yet.
-   canceled: The order is not in the matching queue any more, and completely canceled. There is no trade associated with this order.

**IDs**: The frequently used identities are listed below:

-   order-id: The unique identity for order.
-   client-order-id: The identity defined by the client. This id is included in order creation request, and will be returned as order-id. For completed orders, clientOrderId will be valid for 2 hours since the order creation (it is still valid for 8 hours concerning other orders). That is to say, if an order has been created for more than 2 hours, clientOrderId can’t be used to query the completed order (It is recommended to check it with orderid). Among them, the status of the completed order includes partially canceled, canceled, and fully executed. The allowed characters are letters (case sensitive), digit, underscore (\_) and hyphen (-), no more than 64 chars.
-   match-id : The identity for order matching.
-   trade-id : The unique identity for the trade.

### Error Code

Below is the error code and description returned by Trading APIs

| Error Code | Description |
| --- | --- |
| forbidden-trade-for-open-protect | The current protection phase is open. You can place orders after the protection period ends (GMT+8) |
| base-argument-unsupported | The specified parameter is not supported |
| base-system-error | System internel error. For placing or canceling order, it is mostly due to cache issue, please try again later. |
| login-required | Signature is missing, or user not find (key and uid not match). |
| parameter-required | Stop-price or operator parameter is missing for stop-order type |
| base-record-invalid | Failed to get data, please try again later |
| order-amount-over-limit | The amount of order exceeds the limitation |
| base-symbol-trade-disabled | The symbol is disabled for trading |
| base-operation-forbidden | The operation is forbidden for current user or the symbol is not allowed to trade over OTC |
| account-get-accounts-inexistent-error | The account doesn't exist in current user |
| account-account-id-inexistent | The account id doesn't exist |
| sub-user-auth-required | Isolated margin account is not enabled for sub user |
| order-disabled | The symbol is pending and not allowed to place order |
| cancel-disabled | The symbol is pending and not allowed to cancel order |
| order-invalid-price | The order price is invalid, usually exceeds the 10% of latest trade price |
| order-accountbalance-error | The account balance is insufficient |
| order-limitorder-price-min-error | Sell price cannot be lower than specific price(limit price to sell cannot be lower than 90% of the market price) |
| order-limitorder-price-max-error | Buy price cannot be higher than specific price(limit price to buy cannot be higher than 110% of the market price) |
| order-limitorder-amount-min-error | Limit order amount can not be less than specific number |
| order-limitorder-amount-max-error | Limit order amount can not be more than specific number |
| order-etp-nav-price-min-error | Order price cannot be lower than specific percentage |
| order-etp-nav-price-max-error | Order price cannot be higher than specific percentage |
| order-orderprice-precision-error | Order price precision error |
| order-orderamount-precision-error | Order amount precision error |
| order-value-min-error | Order value cannot be lower than specific value |
| order-marketorder-amount-min-error | Market order sell amount cannot be less than specific amount |
| order-marketorder-amount-buy-max-error | Market order buy amount(value) cannot be more than specific amount(value) |
| order-marketorder-amount-sell-max-error | Market order sell amount cannot be more than specific amount |
| order-holding-limit-failed | Exceed the holding limit of the currency |
| order-type-invalid | Order type is invalid |
| order-orderstate-error | Order state is invalid |
| order-date-limit-error | Order query date exceed the limit |
| order-source-invalid | Order source is invalid |
| order-update-error | Order update error |
| order-fl-cancellation-is-disallowed | Liquidation order cannot be canceled |
| operation-forbidden-for-fl-account-state | The operation is forbidden when the account is in liquidation |
| operation-forbidden-for-lock-account-state | The operation is forbidden when the account is locked |
| fl-order-already-existed | An unfilled liquidation order already exists |
| order-user-cancel-forbidden | IOC or FOK order is not allowed to cancel |
| account-state-invalid | Invalid status of liquidation account |
| order-price-greater-than-limit | Order price is higher than the limitation before market opens |
| order-price-less-than-limit | Order price is lower than the limitation before market opens |
| order-stop-order-hit-trigger | The stop orders triggered immediately are not allowed |
| market-orders-not-support-during-limit-price-trading | Market orders are not supported during limit-price trading |
| price-exceeds-the-protective-price-during-limit-price-trading | The price exceeds the protective price during limit-price trading |
| invalid-client-order-id | The parameter client order id is duplicated (within last 24h) in place or cancel order request |
| invalid-interval | Query window is zero, negative or greater than limitation |
| invalid-start-date | The start date is invalid |
| invalid-end-date | The end date is invalid |
| invalid-start-time | The start time is invalid |
| invalid-end-time | The end time is invalid |
| validation-constraints-required | The specified parameters is missing |
| symbol-not-support | The symbol is not support for cross margin or C2C |
| not-found | The order id is not found |
| base-not-found | The record is not found |
| 510 | You request too often, please try again later |

### FAQ

#### Q1：What is client-order-id?

A： The `client-order-id` is an optional request parameter while placing order. It's string type which maximum length is 64. The client order id is generated by client, and is only valid within 8 hours (It’s only valid within 2 hours for the final state).

#### Q2：How to get the order size, price and decimal precision?

A： You can call API `GET /v1/common/symbols` to get the currency pair information, pay attention to the difference between the minimum amount and the minimum price.

Below are common errors:

-   order-value-min-error: The order price is less than minimum price
-   order-orderprice-precision-error : The precision for limited order price is wrong
-   order-orderamount-precision-error : The precision for limited order amount is wrong
-   order-limitorder-price-max-error : The limited order price is higher than the threshold(limit price to buy cannot be higher than 110% of the market price)
-   order-limitorder-price-min-error : The limited order price is lower than the threshold(limit price to sell cannot be lower than 90% of the market price)
-   order-limitorder-amount-max-error : The limited order amount is larger than the threshold
-   order-limitorder-amount-min-error : The limited order amount is smaller than the threshold
    

#### Q3：Why I got insufficient balance error while placing an order just after a successful order matching?

A：To ensure the low latency of order update, Order update push is made directly after order matching. Meanwhile, the clearing service of that order may be still in progress at backend. It is suggested to follow either of below to ensure a successful order submission:

1、Subscribe to WebSocket topic `accounts` for getting account balance moves to ensure the completion of asset clearing.

2、After receiving WebSocket push message, check account balance from REST endpoint to ensure sufficient available balance for the next order submission.

3、Leave sufficient balance in your account.

#### Q4: What is the difference between 'filled-fees' and 'filled-points' in match result?

A: Transaction fee can be paid from either of below. They won't exist at the same time.

1、filled-fees: Filled-fee is also called transaction fee. It's charged from your income currency from the transaction. For example, if your purchase order of BTC/USDT got matched，the transaction fee will be based on BTC.

2、filled-points: If user enabled transaction fee deduction, the fee should be charged from either HT or Point. When there's sufficient fund in HT/Point, filled-fees is empty while filled-points has value. That means the deduction is made via HT/Point. User could refer to field `fee-deduct-currency` to get the exact deduction type of the transaction.

#### Q5: What is the difference between 'match-id' and 'trade-id' in matching result?

A: The `match-id` is the identity for order matching, while the `trade-id` is the unique identifier for each trade. One `match-id` may be correlated with multiple `trade-id`, or no `trade-id`(if the order is cancelled). For example, if a taker's order got matched with 3 maker's orders at the same time, it generates 3 trade IDs but only one match ID.

#### Q6: Why the order submission could be rejected even though the order price is set as same as current best bid (or best ask)?

A: For some extreme illiquid trading symbols, the best quote price at particular time might be far away from last trade price. But the price limit is actually based on last trade price which could possibly exclude best quote price from valid range for any new order. It is suggested to place orders based on the WebSocket pushed Bid and market data.

#### Q7: How to retrieve the trading symbols for margin trade

A: You can get details from Rest API `GET /v1/common/symbols`. The `leverage-ratio` represents the isolated-margin ratio. The `super-margin-leverage-ratio` represents the cross-margin.

The value `0` indicates that the trading symbols doesn't support margin trading.

## Conditional Order

### Introduction

By comparing with the existing stop limit order, the newly introduced conditional order does have following major differences:

1) Although the newly introduced conditional order is also triggered by stop price, before it being triggered, the Exchange will not lock order margin for this order. Only when this conditional order being successfully triggered, its order margin will be locked.

2) Conditional order does support not only limit order type but also market order type. (Trailing stop order only supports market order type.)

3) As advanced conditional order, trailing stop order does support additional triggering condition i.e. trailing rate. Only when latest market price breaks stop price, and continues to go up (or down), and then reverts back for a certain percentage which exceeding the pre-defined "trailing rate", this order can be triggered. The valid value range of trailing rate is between 0.1% and 5%.

All endpoints in this section require authentication

After the official launch of conditional order, HTX might decommission the existing stop order later. This will be notified through another circular.

### Error Code

Below is the error code and the description returned by Conditional Order APIs

| Error Code | Description |
| --- | --- |
| 1001 | Request URL is invalid |
| 1002 | Signature is missing or account id doesn't exist |
| 1003 | Signature is wrong |
| 1006 | Exceed rate limit |
| 1007 | Record is not found |
| 2002 | Specified parameter is missing or invalid |
| 2003 | Trading is disabled |
| 3002 | Order amount precision error |
| 3003 | Trigger price precision error |
| 3004 | Limit order amount is less than minimum amount |
| 3005 | Limit order amount is greater than maximum amount |
| 3006 | Limit order price is higher than maximum price |
| 3007 | Limit order price is lower than minimum price |
| 3008 | Order value is less than minimum value |
| 3009 | Market order amount is less than minimum amount |
| 3010 | Market order amount is greater than maximum amount |
| 3100 | Market orders can be accepted during limit price trading |

## Margin Loan (Cross/Isolated)

### Introduction

Isolated/cross margin loan APIs provide loan related functionality such as requesting and repaying loan, loan querying and transfer.

All endpoints in this section require authentication

Currently loan only supports pairs, in which base currency is USDT, HUSD or BTC

Once completed a margin loan or transfer, please wait for 10 seconds before requesting for the next margin loan or transfer.

### Error Code

**Below is the error code and description for Isolated margin loan APIs**

| Error Code | Description |
| --- | --- |
| account-transfer-balance-insufficient-error | Account balance is insufficient |
| account-transfer-balance-overflow-error | Account balance is overflow |
| base-msg | Customized error, check error message |
| base-system-error | Server internal error |
| base-currency-error | currency is invalid |
| base-symbol-error | symbol is invalid |
| base-margin-symbol-invalid | symbol is invalid for margin |
| base-record-invalid | The data is not found |
| base-request-timeout | Request timeout, try again later |
| base\_request\_exceed\_number\_limit | Request exceeds number limit, try again later |
| base-date-limit-error | Date is invalid |
| base-update-error | Update operation error |
| base-operation-forbidden | Operation is forbidden |
| dw-insufficient-balance | Account balance is insufficient |
| dw-account-transfer-error | Transfer error |
| frequent-invoke | Operates too frequently, try again later |
| loan-order-not-found | Loan order is not found |
| loan-amount-scale-limit | Loan order amount precision error |
| loan-repay-max-limit | Repay amount is greater than requested |
| loan-insufficient-balance | Loan account balance is insufficient |
| login-required | Signature is missing |
| margin-country-not-allow | The registered country is forbidden to apply for margin |
| margin-country-auth-required | Your IP is not allowed, require ID verification |
| margin-trading-is-not-available | Isolated margin trading is not available |
| margin-account-state-error | Margin account state is abnormal (liquidation) |
| risk-verification-failed | Risk verification failed |
| sub-user-auth-required | Sub user is not authorized |

**Below is the error code and description for Cross margin loan APIs (including general margin)**

| Error Code | Description |
| --- | --- |
| abnormal-users-cannot-transfer | Abnormal user cannot transfer |
| account-explosion-in-prohibited-transfer | Account is explosion and transfer is prohibited |
| account-is-abnormal-retry-after-refresh | Account is abnormal, try again later |
| account-balance-insufficient-error | Account balance is insufficient |
| account-cannot-be-inquired | Account is not found |
| base-not-in-white-list | Operation is not allowed for current user |
| base-currency-error | Currency is not found |
| base-operation-forbidden | Operation is forbidden |
| base-user-request-exceed-limit | Operates too frequently, try again later |
| base-currency-not-open | The currency is not enabled |
| beyond-maximum-number-of-rollover | Transfer amount exceed the limit |
| exceed-maximum-amount | Exceed the limit |
| start-date-cannot-greater-than-end-date | Start date cannot be greater than end date |
| frequent-invoke | Operates too frequently |
| insufficient-exchange-fund | Exchange fund is insufficient |
| loan-order-not-found | Loan order is not found |
| loan-amount-scale-limit | Loan order amount precision error |
| loan-repay-max-limit | Repay amount is greater than requested |
| loan-insufficient-balance | Loan account balance is insufficient |
| loan-fee-rate-compute-fail | Loan fee is abnormal |
| login-required | Signature is missing |
| margin-subuser-no-permission | Sub user has no permission |
| normal-and-warehouse-can-transfer | Normal and warehouse user can transfer |
| order-orderamount-precision-error | Order amount precision error |
| require-exchange-id | Exchange id is required |
| subacount-currency-not-exit | Sub account for this currency does not exist |
| system-busy | System is busy |
| unsupport-kyc-info | KYC info is unsupported |
| uc-network-error | Network error for User Center, try again later |
| uncreated-currency-cannot-be-drawn | Uncreated sub account cannot be drawn |

### FAQ

#### Q1: I can see I have loanable amount in my margin account, why the API returns no sufficient amount error when I apply margin loan?

A: The available amount depends on not only account available amount, but also the system available amount. Due to risk control, the system has a max available amount everyday. If the total loan amount reaches the max value, user will fail to apply for loan, unless someone repays the loan in the same day. Right now we are implementing a more user-friendly solution that provides more accurate information to API users.

## Spot

### Introduction

Welcome to HTX API！

This is the official HTX API document, and will be continue updating. HTX will also publish API announcement in advance for any API change. Please subscribe to our announcements so that you can get the latest updates.

You can click [Here](https://www.huobi.pe/support/en-us/list/360000070201) to view the announcements. If you want to subscribe, please click "Follow" button in the top right of the page. After login and click "Follow" again, then choose the type you want to follow. After you subscribe, the button will be changed to "Following". If you don't have any account, you need to register first in the login dialog.

**How to read this document**

The top of the document is the navigation menu for different API business; The language button in the top right is for different languages, it supports Chinese and English right now. The main content of each API document has three parts, the left hand side is the contents, the middle part is the document body, and the right hand side is the request and response sameple.

Below is the content for Spot API document

The first part is the overview:

-   **Quick Start**: It introduces the overall knowledge of HTX API, and suitability for new HTX API user
-   **API Explorer**: It introduces the API Explorer online tool, which is convenient for user to invoke and observe the API
-   **FAQ**: It lists the frequently asked questions regardless the specific API
-   **Contact Us**: It introduces how to contact us according to different subjects

The second part is detail for each API. Each API category is listed in one section, and each each section has below contents:

-   **Introduction**: It introduces notes and description for this API category
-   **_Specific API_**: It introduces the usage, rate limit, request, parameters and response for each API
-   **Error Code**: It lists the common error code and the description for this API category
-   **FAQ**: It lists the frequently asked questions for this API category

## Contact Us

### Market Maker Program

It is very welcome for market maker who has good market making strategy and large trading volume. If your HTX Spot account or Contract account has at least 10 BTC, you can send your email to:

-   [Vip@global-hgroup.com](mailto:Vip@global-hgroup.com) for HTX(spot / leverage) market maker
-   [Vip@global-hgroup.com](mailto:Vip@global-hgroup.com) for HTX Contract market maker

And provide below details:

1.  UID (not linked to any rebate program in any accounts)
2.  Screenshot of trading volume in other transaction platform (such as trading volume within 30 days, or VIP status)
3.  A brief description of your market-making strategy

Market makers will not be able to use point cards, VIP rate, rebate or any other fee promotion.

### Technical Support

If you have any other questions on API, you can contact us by below ways:

-   Join official **Telegram** group: [API技术交流群01](https://t.me/htx_api)
-   Contact customer support from Help Center or send email to [support@huobigroup.com](mailto:support@huobigroup.com).

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

Note：It is safe to share your Access Key, which is to prove your identity, and it will not affect your account safety. Remember do **not** share your `Secret Key` to any one. If you expose your `Secret Key` by accident, please [remove](https://www.hbg.com/en-us/apikey/) the related API Key immediately.

## Sub-account Management

### Introduction

Sub user management APIs provide sub user account management (creation, query, permission, transfer), sub user API key management (creation, update, query, deletion), sub user address (deposit, withdraw) query and balance query.

All endpoints in this section require authentication

### Error Code

Below is the error code, error message and description returned by Sub user management APIs

| Error Code | Error Message | Description |
| --- | --- | --- |
| 1002 | forbidden | Operation is forbidden, such as sub user creation is not allowed for current user |
| 1003 | unauthorized | Signature is wrong |
| 2002 | invalid field value | Parameter is invalid |
| 2014 | number of sub account in the request exceeded valid range | number of sub account exceeded |
| 2014 | number of api key in the request exceeded valid range | number of API Key exceeded |
| 2016 | invalid request while value specified in sub user states | lock or unlock failure |

## Endpoints

### https://status.huobigroup.com/api/v2/summary.json ( Get system status)

Request type: GET

Signature verification: No

Interface description: This endpoint allows users to get system status, Incidents and planned maintenance. The system status can also be obtained through email, SMS, webhook, RSS/Atom feed. Users can click here to subscribe. The subscription function depends on Google services. Before you subscribe, please ensure that you can access Google services normally.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://status.huobigroup.com/api/v2/summary.json |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameter is available for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| page |  | false | basic information of HTX spot status page |  |
| {id | string | false | page id |  |
| name | string | false | page name |  |
| url | string | false | page url |  |
| time\_zone | string | false | time zone |  |
| updated\_at} | string | false | page update time |  |
| components |  | false | System components and their status |  |
| \[{id | string | false | component id |  |
| name | string | false | component name, including Order submission, Order cancellation, Deposit etc. |  |
| status | string | false | component status, value range: operational, degraded\_performance, partial\_outage, major\_outage, under maintenance |  |
| created\_at | string | false | component created time |  |
| updated\_at | string | false | component updated time |  |
| .......}\] |  | false | for details of other fields, please refer to the return example |  |
| incidents |  | false | System fault incident and their status. If there is no fault at present, it will return to null |  |
| \[{id | string | false | incident id |  |
| name | string | false | incident name |  |
| status | string | false | incident status, value range: investigating, identified, monitoring, resolved |  |
| created\_at | string | false | incident creat time |  |
| updated\_at | string | false | incident update time |  |
| .......}\] |  | false | for details of other fields, please refer to the return example |  |
| scheduled\_maintenances |  | false | System scheduled maintenance incident and status. If there is no scheduled maintenance at present, it will return to null |  |
| \[{id | string | false | incident id |  |
| name | string | false | incident name |  |
| status | string | false | incident staus, value range: scheduled, in progress, verifying, completed |  |
| created\_at | string | false | incident created time |  |
| updated\_at | string | false | incident updated time |  |
| scheduled\_for | string | false | scheduled maintenance start time |  |
| scheduled\_until | string | false | scheduled maintenance end time |  |
| .......}\] |  | false | for details of other fields, please refer to the return example |  |
| status |  | false | The overall current status of the system |  |
| {indicator | string | false | system indicator, value range: none, minor, major, critical, maintenance |  |
| description} | string | false | system description, value range: All Systems Operational, Minor Service Outager, Partial System Outage, Partially Degraded Service, Service Under Maintenance |  |

#### Request example

`curl"https://status.huobigroup.com/api/v2/summary.json"`

#### Response Example

##### Success Example

```
{
  "page": {
    "id": "p0qjfl24znv5",
    "name": "HTX",
    "url": "https://status.huobigroup.com",
    "time_zone": "Etc/UTC",
    "updated_at": "2020-02-07T10:25:14.717Z"
  },
  "components": [
    {
      "id": "h028tnzw1n5l",
      "name": "Deposit",
      "status": "operational",
      "created_at": "2019-12-05T02:07:12.372Z",
      "updated_at": "2020-02-07T09:27:15.563Z",
      "position": 1,
      "description": null,
      "showcase": true,
      "group_id": "gtd0nyr3pf0k",
      "page_id": "p0qjfl24znv5",
      "group": false,
      "only_show_if_degraded": false
    }
  ],
  "incidents": [
    {
      "id": "rclfxz2g21ly",
      "name": "Market data is delayed",
      "status": "investigating",
      "created_at": "2020-02-11T03:15:01.913Z",
      "updated_at": "2020-02-11T03:15:02.003Z",
      "monitoring_at": null,
      "resolved_at": null,
      "impact": "minor",
      "shortlink": "http://stspg.io/pkvbwp8jppf9",
      "started_at": "2020-02-11T03:15:01.906Z",
      "page_id": "p0qjfl24znv5",
      "incident_updates": [
        {
          "id": "dwfsk5ttyvtb",
          "status": "investigating",
          "body": "Market data is delayed",
          "incident_id": "rclfxz2g21ly",
          "created_at": "2020-02-11T03:15:02.000Z",
          "updated_at": "2020-02-11T03:15:02.000Z",
          "display_at": "2020-02-11T03:15:02.000Z",
          "affected_components": [
            {
              "code": "nctwm9tghxh6",
              "name": "Market data",
              "old_status": "operational",
              "new_status": "degraded_performance"
            }
          ],
          "deliver_notifications": true,
          "custom_tweet": null,
          "tweet_id": null
        }
      ],
      "components": [
        {
          "id": "nctwm9tghxh6",
          "name": "Market data",
          "status": "degraded_performance",
          "created_at": "2020-01-13T09:34:48.284Z",
          "updated_at": "2020-02-11T03:15:01.951Z",
          "position": 8,
          "description": null,
          "showcase": false,
          "group_id": null,
          "page_id": "p0qjfl24znv5",
          "group": false,
          "only_show_if_degraded": false
        }
      ]
    }
  ],
  "scheduled_maintenances": [
    {
      "id": "k7g299zl765l",
      "name": "Schedule maintenance",
      "status": "scheduled",
      "created_at": "2020-02-11T03:16:31.481Z",
      "updated_at": "2020-02-11T03:16:31.530Z",
      "monitoring_at": null,
      "resolved_at": null,
      "impact": "maintenance",
      "shortlink": "http://stspg.io/md4t4ym7nytd",
      "started_at": "2020-02-11T03:16:31.474Z",
      "page_id": "p0qjfl24znv5",
      "incident_updates": [
        {
          "id": "8whgr3rlbld8",
          "status": "scheduled",
          "body": "We will be undergoing scheduled maintenance during this time.",
          "incident_id": "k7g299zl765l",
          "created_at": "2020-02-11T03:16:31.527Z",
          "updated_at": "2020-02-11T03:16:31.527Z",
          "display_at": "2020-02-11T03:16:31.527Z",
          "affected_components": [
            {
              "code": "h028tnzw1n5l",
              "name": "Deposit And Withdraw - Deposit",
              "old_status": "operational",
              "new_status": "operational"
            }
          ],
          "deliver_notifications": true,
          "custom_tweet": null,
          "tweet_id": null
        }
      ],
      "components": [
        {
          "id": "h028tnzw1n5l",
          "name": "Deposit",
          "status": "operational",
          "created_at": "2019-12-05T02:07:12.372Z",
          "updated_at": "2020-02-10T12:34:52.970Z",
          "position": 1,
          "description": null,
          "showcase": false,
          "group_id": "gtd0nyr3pf0k",
          "page_id": "p0qjfl24znv5",
          "group": false,
          "only_show_if_degraded": false
        }
      ],
      "scheduled_for": "2020-02-15T00:00:00.000Z",
      "scheduled_until": "2020-02-15T01:00:00.000Z"
    }
  ],
  "status": {
    "indicator": "minor",
    "description": "Partially Degraded Service"
  }
}
```

### /v2/market-status ( Get Market Status)

Request type: GET

Signature verification: No

Interface description: The endpoint returns current market status The enum values of market status includes: 1 - normal (order submission & cancellation are allowed)，2 - halted (order submission & cancellation are prohibited)，3 - cancel-only(order submission is prohibited but order cancellation is allowed). Halt reason includes: 2 - emergency maintenance，3 - schedule maintenance.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| marketStatus | integer | false | Market status (1=normal, 2=halted, 3=cancel-only) |  |
| haltStartTime | long | false | Halt start time (unix time in millisecond) , only valid for marketStatus=halted or cancel-only |  |
| haltEndTime | long | false | Estimated halt end time (unix time in millisecond) , only valid for marketStatus=halted or cancel-only; if this field is not returned during marketStatus=halted or cancel-only, it implicates the halt end time cannot be estimated at this time. |  |
| haltReason | integer | false | Halt reason (2=emergency-maintenance, 3=scheduled-maintenance) , only valid for marketStatus=halted or cancel-only |  |
| affectedSymbols | string | false | Affected symbols, separated by comma. If affect all symbols just respond with value ‘all’. Only valid for marketStatus=halted or cancel-only |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/market-status"`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "message": "success",
  "data": {
    "marketStatus": 1
  }
}
```

### /v2/settings/common/symbols ( Get all Supported Trading Symbol(V2))

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:

It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | Object | false |  |  |
| si | string | false | state\_isolated |  |
| scr | string | false | state\_cross |  |
| sc | string | false | symbol(outside) |  |
| dn | string | false | display name |  |
| bc | string | false | base currency |  |
| bcdn | string | false | base currency display name |  |
| qc | string | false | quote currency |  |
| qcdn | string | false | quote currency display name |  |
| state | string | false | symbol status. unknown，not-online，pre-online，online，suspend，offline，transfer-board，fuse |  |
| whe | boolean | false | white enabled |  |
| cd | boolean | false | country disabled |  |
| te | boolean | false | trade enabled |  |
| toa | long | false | the time trade open at |  |
| sp | string | false | symbol partition |  |
| w | int | false | weight sort |  |
| ttp | decimal(10,6) | false | trade total precision |  |
| tap | decimal(10,6) | false | trade amount precision |  |
| tpp | decimal(10,6) | false | trade price precision |  |
| fp | decimal(10,6) | false | fee precision |  |
| suspend\_desc | string | false | suspend desc |  |
| transfer\_board\_desc | string | false | transfer board desc |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| lr | decimal | false | leverage ratio, such as: 3.5, or null if the symbol does not support this leverage ratio |  |
| smlr | decimal | false | super-margin leverage ratio, such as: 3, or null if the symbol does not support super-margin.For trading pairs launched after September 15, 2020, this field does not return a value. You can query it through /v1/settings/common/market-symbols. |  |
| flr | String | false | C2C leverage ratio, such as:3, or null if the symbol does not support C2C |  |
| wr | string | false | withdraw\_risk, such as: 3, or null if the symbol does not support super-margin |  |
| d | int | false | direction: 1 for long and 2 for short |  |
| elr | string | false | etp leverage ratio |  |
| p | Object | false |  |  |
| castate | string | false | not Required. The state of the call auction; it will only be displayed when it is in the 1st and 2nd stage of the call auction. Enumeration values: "ca\_1", "ca\_2" |  |
| ca1oa | long | false | not Required. this information is only available for that symbols configured with call auction. The total number of milliseconds since 0:0:0:00,000 on January 1, 1970 UTC to the present. |  |
| ca2oa | long | false | not Required. this information is only available for that symbols configured with call auction. The total number of milliseconds since 0:0:0:00,000 on January 1, 1970 UTC to the present. |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err\_code | string | false | error code(returned when the interface reports an error) |  |
| err\_msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl”https://api.huobi.pro/v1/settings/common/symbols“`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "tags": "",
      "state": "online",
      "wr": "1.5",
      "sc": "ethusdt",
      "p": [
        {
          "id": 9,
          "name": "Grayscale",
          "weight": 91
        }
      ],
      "bcdn": "ETH",
      "qcdn": "USDT",
      "elr": null,
      "tpp": 2,
      "tap": 4,
      "fp": 8,
      "smlr": null,
      "flr": null,
      "whe": false,
      "cd": false,
      "te": true,
      "sp": "main",
      "d": null,
      "bc": "eth",
      "qc": "usdt",
      "toa": 1514779200000,
      "ttp": 8,
      "w": 999400000,
      "lr": 5,
      "dn": "ETH/USDT"
    }
  ],
  "ts": "1641870869718",
  "full": 1
}
```

### /v2/settings/common/currencies ( Get all Supported Currencies(V2))

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:

It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | Object | false |  |  |
| cc | string | false | currency code |  |
| dn | string | false | currency display name |  |
| fn | string | false | currency full name |  |
| at | int | false | asset type, 1 virtual currency 2 fiat currency |  |
| wp | int | false | withdraw precision |  |
| ft | string | false | fee type, eth: Fixed fee, btc: Interval fee husd: Fee charged in proportion |  |
| dma | string | false | deposit min amount |  |
| wma | string | false | withdraw min amount |  |
| sp | string | false | show precision |  |
| w | string | false | weight |  |
| qc | boolean | false | be quote currency |  |
| state | string | false | symbol state. unkown, not-online, online, offline |  |
| v | boolean | false | visible or not -- users who have offline currency but have assets can see it |  |
| whe | boolean | false | white enabled |  |
| cd | boolean | false | country disabled--users who have country disabled currency but have assets can see it |  |
| de | boolean | false | deposit enabled |  |
| wed | boolean | false | withdraw enabled |  |
| cawt | boolean | false | currency addr with tag |  |
| fc | int | false | fast confirms |  |
| sc | int | false | safe confirms |  |
| swd | string | false | suspend withdraw desc |  |
| wd | string | false | withdraw desc |  |
| sdd | string | false | suspend deposit desc |  |
| dd | string | false | deposit desc |  |
| svd | string | false | suspend visible desc |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err\_code | string | false | error code(returned when the interface reports an error) |  |
| err\_msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl"https://api.huobi.pro/v2/settings/common/currencies"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "tags": "",
      "cawt": false,
      "fc": 12,
      "sc": 12,
      "dma": "1",
      "wma": "10",
      "ft": "eth",
      "whe": false,
      "cd": false,
      "qc": true,
      "sp": "8",
      "wp": 6,
      "fn": "Tether USDT",
      "at": 1,
      "cc": "usdt",
      "v": true,
      "de": true,
      "wed": true,
      "w": 10006,
      "state": "online",
      "dn": "USDT",
      "dd": "Please don’t deposit any other digital assets except USDT to the above address. Otherwise, you may lose your assets permanently. !>_<!Depositing to the above address requires confirmations of the entire network. It will arrive after 12 confirmations, and it will be available to withdraw after 12 confirmations. !>_<!Minimum deposit amount: 1 USDT. Any deposits less than the minimum will not be credited or refunded.!>_<!Your deposit address won’t change often. If there are any changes, we will notify you via announcement or email.!>_<!Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.",
      "svd": null,
      "swd": null,
      "sdd": null,
      "wd": "Minimum withdrawal amount: 10 USDT (ERC20). !>_<!To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.!>_<!Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked."
    }
  ],
  "ts": "1641869938436",
  "full": 1
}
```

### /v1/settings/common/currencys ( Get Currencys Settings)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:

It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | Object | false |  |  |
| name | string | false | currency name |  |
| dn | string | false | currency display name |  |
| vat | long | false | visible assets timestamp |  |
| det | long | false | deposit enable timestamp |  |
| wet | long | false | withdraw enable timestamp |  |
| wp | int | false | withdraw precision |  |
| ct | string | false | currency type |  |
| cp | string | false | currency partition. INVALID, all(PRO and HADAX), pro, hadax |  |
| ss | array | false | support sites. unknown, otc, futures(coin-m futures), minepool( not supports mulan), institution, swap(coin-m swap), asset(mulan does not support transfer, it is only used for reconciliation, cfd(cfd contract in Japan), chat(HTX Chat IM), option, linear-swap(usdt-m), custody(funding account in HK), turbine, margin, super-margin |  |
| oe | integer | false | 0: disable, 1: enable |  |
| dma | string | false | deposit min amount |  |
| wma | string | false | withdraw min amount |  |
| sp | string | false | show precision |  |
| w | string | false | weight |  |
| qc | boolean | false | be quote currency |  |
| state | string | false | currency state. unkown, not-online, online, offline |  |
| v | boolean | false | visible |  |
| whe | boolean | false | white enabled |  |
| cd | boolean | false | country disabled |  |
| de | boolean | false | deposit enabled |  |
| we | boolean | false | withdraw enabled |  |
| cawt | boolean | false | currency addr with tag |  |
| cao | boolean | false | currency addr oneoff |  |
| fc | int | false | fast confirms |  |
| sc | int | false | safe confirms |  |
| swd | string | false | suspend withdraw desc |  |
| wd | string | false | withdraw desc |  |
| sdd | string | false | suspend deposit desc |  |
| dd | string | false | deposit desc |  |
| svd | string | false | suspend visible desc |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| fn | string | false | currency full name |  |
| bc |  | false |  |  |
| iqc |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err-code | string | false | error code(returned when the interface reports an error) |  |
| err-msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl"https://api.huobi.pro/v1/settings/common/currencys"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "tags": "",
      "name": "usdt",
      "state": "online",
      "cawt": false,
      "fc": 12,
      "sc": 12,
      "sp": "8",
      "iqc": true,
      "ct": "eth",
      "de": true,
      "we": true,
      "cd": false,
      "oe": 1,
      "v": true,
      "whe": false,
      "wet": 1609430400000,
      "det": 1609430400000,
      "cp": "all",
      "vat": 1508839200000,
      "ss": [
        "INSTITUTION",
        "MINEPOOL",
        "OTC"
      ],
      "fn": "Tether USDT",
      "wp": 6,
      "w": 10006,
      "dma": "1",
      "wma": "10",
      "dn": "USDT",
      "dd": "Please don’t deposit any other digital assets except USDT to the above address. Otherwise, you may lose your assets permanently. !>_<!Depositing to the above address requires confirmations of the entire network. It will arrive after 12 confirmations, and it will be available to withdraw after 12 confirmations. !>_<!Minimum deposit amount: 1 USDT. Any deposits less than the minimum will not be credited or refunded.!>_<!Your deposit address won’t change often. If there are any changes, we will notify you via announcement or email.!>_<!Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.",
      "svd": null,
      "swd": null,
      "sdd": null,
      "wd": "Minimum withdrawal amount: 10 USDT (ERC20). !>_<!To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.!>_<!Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked."
    }
  ],
  "ts": "1641872721891",
  "full": 1
}
```

### /v1/settings/common/currencys ( Get Currencys Settings)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:

It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | Object | false |  |  |
| name | string | false | currency name |  |
| dn | string | false | currency display name |  |
| vat | long | false | visible assets timestamp |  |
| det | long | false | deposit enable timestamp |  |
| wet | long | false | withdraw enable timestamp |  |
| wp | int | false | withdraw precision |  |
| ct | string | false | currency type |  |
| cp | string | false | currency partition. INVALID, all(PRO and HADAX), pro, hadax |  |
| ss | array | false | support sites. unknown, otc, futures(coin-m futures), minepool( not supports mulan), institution, swap(coin-m swap), asset(mulan does not support transfer, it is only used for reconciliation, cfd(cfd contract in Japan), chat(HTX Chat IM), option, linear-swap(usdt-m), custody(funding account in HK), turbine, margin, super-margin |  |
| oe | integer | false | 0: disable, 1: enable |  |
| dma | string | false | deposit min amount |  |
| wma | string | false | withdraw min amount |  |
| sp | string | false | show precision |  |
| w | string | false | weight |  |
| qc | boolean | false | be quote currency |  |
| state | string | false | currency state. unkown, not-online, online, offline |  |
| v | boolean | false | visible |  |
| whe | boolean | false | white enabled |  |
| cd | boolean | false | country disabled |  |
| de | boolean | false | deposit enabled |  |
| we | boolean | false | withdraw enabled |  |
| cawt | boolean | false | currency addr with tag |  |
| cao | boolean | false | currency addr oneoff |  |
| fc | int | false | fast confirms |  |
| sc | int | false | safe confirms |  |
| swd | string | false | suspend withdraw desc |  |
| wd | string | false | withdraw desc |  |
| sdd | string | false | suspend deposit desc |  |
| dd | string | false | deposit desc |  |
| svd | string | false | suspend visible desc |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| fn | string | false | currency full name |  |
| bc |  | false |  |  |
| iqc |  | false |  |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err-code | string | false | error code(returned when the interface reports an error) |  |
| err-msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl"https://api.huobi.pro/v1/settings/common/currencys"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "tags": "",
      "name": "usdt",
      "state": "online",
      "cawt": false,
      "fc": 12,
      "sc": 12,
      "sp": "8",
      "iqc": true,
      "ct": "eth",
      "de": true,
      "we": true,
      "cd": false,
      "oe": 1,
      "v": true,
      "whe": false,
      "wet": 1609430400000,
      "det": 1609430400000,
      "cp": "all",
      "vat": 1508839200000,
      "ss": [
        "INSTITUTION",
        "MINEPOOL",
        "OTC"
      ],
      "fn": "Tether USDT",
      "wp": 6,
      "w": 10006,
      "dma": "1",
      "wma": "10",
      "dn": "USDT",
      "dd": "Please don’t deposit any other digital assets except USDT to the above address. Otherwise, you may lose your assets permanently. !>_<!Depositing to the above address requires confirmations of the entire network. It will arrive after 12 confirmations, and it will be available to withdraw after 12 confirmations. !>_<!Minimum deposit amount: 1 USDT. Any deposits less than the minimum will not be credited or refunded.!>_<!Your deposit address won’t change often. If there are any changes, we will notify you via announcement or email.!>_<!Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked.",
      "svd": null,
      "swd": null,
      "sdd": null,
      "wd": "Minimum withdrawal amount: 10 USDT (ERC20). !>_<!To ensure the safety of your funds, your withdrawal request will be manually reviewed if your security strategy or password is changed. Please wait for phone calls or emails from our staff.!>_<!Please make sure that your computer and browser are secure and your information is protected from being tampered or leaked."
    }
  ],
  "ts": "1641872721891",
  "full": 1
}
```

### /v1/settings/common/symbols ( Get Symbols Setting)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:

It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | Object | false |  |  |
| symbol | string | false | symbol(outside) |  |
| sn | string | false | symbol name |  |
| bc | string | false | base currency |  |
| qc | string | false | quote currency |  |
| state | string | false | symbol status. unknown，not-online，pre-online，online，suspend，offline，transfer-board，fuse |  |
| ve | boolean | false | visible |  |
| we | boolean | false | white enabled |  |
| dl | boolean | false | delist |  |
| cd | boolean | false | country disabled |  |
| te | boolean | false | trade enabled |  |
| ce | boolean | false | cancel enabled |  |
| tet | long | false | trade enable timestamp |  |
| toa | long | false | the time trade open at |  |
| tca | long | false | the time trade close at |  |
| voa | long | false | visible open at |  |
| vca | long | false | visible close at |  |
| sp | string | false | symbol partition |  |
| tm | string | false | symbol partition |  |
| w | int | false | weight sort |  |
| ttp | decimal(10,6) | false | trade total precision |  |
| tap | decimal(10,6) | false | trade amount precision |  |
| tpp | decimal(10,6) | false | trade price precision |  |
| fp | decimal(10,6) | false | fee precision |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| d |  | false |  |  |
| bcdn | string | false | base currency display name |  |
| qcdn | string | false | quote currency display name |  |
| elr | string | false | etp leverage ratio |  |
| castate | string | false | Not required. The state of the call auction; it will only be displayed when it is in the 1st and 2nd stage of the call auction. Enumeration values: "ca\_1", "ca\_2" |  |
| ca1oa | long | false | not Required. the open time of call auction phase 1, total milliseconds since January 1, 1970 0:0:0:00ms UTC |  |
| ca1ca | long | false | not Required. the close time of call auction phase 1, total milliseconds since January 1, 1970 0:0:0:00ms UTC |  |
| ca2oa | long | false | not Required. the open time of call auction phase 2, total milliseconds since January 1, 1970 0:0:0:00ms UTC |  |
| ca2ca | long | false | not Required. the close time of call auction phase 2, total milliseconds since January 1, 1970 0:0:0:00ms UTC |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err-code | string | false | error code(returned when the interface reports an error) |  |
| err-msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl "https://api.huobi.pro/v1/settings/common/symbols"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "agldusdt",
      "tags": "",
      "state": "online",
      "bcdn": "AGLD",
      "qcdn": "USDT",
      "elr": null,
      "tm": "PRO",
      "sn": "AGLD/USDT",
      "ve": true,
      "dl": false,
      "te": true,
      "ce": true,
      "cd": false,
      "tet": 1630668600000,
      "we": false,
      "toa": 1630668600000,
      "tca": 1893470400000,
      "voa": 1630666800000,
      "vca": 1893470400000,
      "bc": "agld",
      "qc": "usdt",
      "sp": "innovation",
      "d": null,
      "tpp": 4,
      "tap": 4,
      "fp": 8,
      "w": 950000000,
      "ttp": 8
    }
  ],
  "ts": "1641880066563",
  "full": 1
}
```

### /v1/settings/common/market-symbols ( Get Market Symbols Setting)

Request type: GET

Signature verification: No

Interface permission: Read

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbols | string | false | symbols. NA means all symbols, multiple symbols separated with comma |  |  |
| ts | long | false | timestamp to get incremental data |  |  |

Notes:

It returns updated data from this timestample to the current time if filled in with ts. If there is no update, the "data" of response is "\[\]".

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | Object | false |  |  |
| symbol | string | false | symbol(outside) |  |
| bc | string | false | base currency |  |
| qc | string | false | quote currency |  |
| state | string | false | symbol status. unknown，not-online，pre-online，online，suspend，offline，transfer-board，fuse |  |
| sp | string | false | symbol partition |  |
| tags | string | false | Tags, multiple tags are separated by commas, such as: st, hadax |  |
| lr | decimal | false | leverage ratio of margin symbol, provided by Global |  |
| smlr | decimal | false | leverage ratio of super-margin symbol, provided by Global |  |
| pp | integer | false | price precision |  |
| ap | integer | false | amount precision |  |
| vp | integer | false | value precision |  |
| minoa | decimal | false | min order amount |  |
| maxoa | decimal | false | max order amount |  |
| minov | decimal | false | min order value |  |
| lominoa | decimal | false | min amount of limit price order |  |
| lomaxoa | decimal | false | max amount of limit price order |  |
| lomaxba | decimal | false | max amount of limit price buy order |  |
| lomaxsa | decimal | false | max amount of limit price sell order |  |
| smminoa | decimal | false | min amount of market price sell order |  |
| smmaxoa | decimal | false | max amount of market price sell order |  |
| bmmaxov | decimal | false | max amount of market price buy order |  |
| blmlt | decimal(10,6) | false | Buy limit must less than |  |
| slmgt | decimal(10,6) | false | Sell limit must greater than |  |
| msormlt | decimal(10,6) | false | Market sell order rate must less than |  |
| mbormlt | decimal(10,6) | false | Market buy order rate must less than |  |
| at | string | false | trading by api interface |  |
| u | string | false | ETP: symbol |  |
| mfr | decimal | false |  |  |
| ct | string | false | charge time(unix time in millisecond, just for symbols of ETP) |  |
| rt | string | false | rebal time(unix time in millisecond, just for symbols of ETP) |  |
| rthr | decimal | false | rebal threshold(just for symbols of ETP) |  |
| in | decimal | false | ETP: init nav |  |
| maxov | decimal | false | max value of market price order |  |
| flr | decimal | false | C2C: funding leverage ratio |  |
| castate | string | false | not Required. The state of the call auction; it will only be displayed when it is in the 1st and 2nd stage of the call auction. Enumeration values: "ca\_1", "ca\_2" |  |
| DATA\_END |  | false |  |  |
| ts | String | false | timestamp of incremental data |  |
| full | int | false | full data flag: 0 for no and 1 for yes |  |
| err-code | string | false | error code(returned when the interface reports an error) |  |
| err-msg | string | false | error msg(returned when the interface reports an error) |  |

#### Request example

`curl"https://api.huobi.pro/v1/settings/common/market-symbols"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "btc3lusdt",
      "state": "online",
      "bc": "btc3l",
      "qc": "usdt",
      "pp": 4,
      "ap": 4,
      "sp": "main",
      "vp": 8,
      "minoa": 0.01,
      "maxoa": 199.0515,
      "minov": 5,
      "lominoa": 0.01,
      "lomaxoa": 199.0515,
      "lomaxba": 199.0515,
      "lomaxsa": 199.0515,
      "smminoa": 0.01,
      "blmlt": 1.1,
      "slmgt": 0.9,
      "smmaxoa": 199.0515,
      "bmmaxov": 2500,
      "msormlt": 0.1,
      "mbormlt": 0.1,
      "maxov": 2500,
      "u": "btcusdt",
      "mfr": 0.035,
      "ct": "23:55:00",
      "rt": "00:00:00",
      "rthr": 4,
      "in": 16.3568,
      "at": "enabled",
      "tags": "etp,nav,holdinglimit,activities"
    }
  ],
  "ts": "1641880897191",
  "full": 1
}
```

### /v2/reference/currencies ( APIv2 - Currency & Chains)

Request type: GET

Signature verification: No

Interface permission: Read

Interface description: API user could query static reference information for each currency, as well as its corresponding chain(s). (Public Endpoint)

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | Currency | btc, ltc, bch, eth, etc ...(available currencies in HTX) |  |
| authorizedUser | boolean | false | Authorized user | true or false (if not filled, default value is true) |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| currency | string | false | Currency |  |
| \_\_chains\_\_ | object | false |  |  |
| chain | string | false | Chain name |  |
| displayName | string | false | Chain display name |  |
| baseChain | string | false | Base chain name |  |
| baseChainProtocol | string | false | Base chain protocol |  |
| isDynamic | boolean | false | Is dynamic fee type or not (only applicable to withdrawFeeType = fixed) | true,false |
| numOfConfirmations | int | false | Number of confirmations required for deposit success (trading & withdrawal allowed once reached) |  |
| numOfFastConfirmations | int | false | Number of confirmations required for quick success (trading allowed but withdrawal disallowed once reached) |  |
| minDepositAmt | string | false | Minimal deposit amount in each request |  |
| depositStatus | string | false | Deposit status | allowed,prohibited |
| minWithdrawAmt | string | false | Minimal withdraw amount in each request |  |
| maxWithdrawAmt | string | false | Maximum withdraw amount in each request |  |
| withdrawQuotaPerDay | string | false | Maximum withdraw amount in a day (Singapore timezone) |  |
| withdrawQuotaPerYear | string | false | Maximum withdraw amount in a year |  |
| withdrawQuotaTotal | string | false | Maximum withdraw amount in total |  |
| withdrawPrecision | int | false | Withdraw amount precision |  |
| withdrawFeeType | string | false | Type of withdraw fee (only one type can be applied to each currency) | fixed,circulated,ratio |
| transactFeeWithdraw | string | false | Withdraw fee in each request (only applicable to withdrawFeeType = fixed) |  |
| minTransactFeeWithdraw | string | false | Minimal withdraw fee in each request (only applicable to withdrawFeeType = circulated or ratio) |  |
| maxTransactFeeWithdraw | string | false | Maximum withdraw fee in each request (only applicable to withdrawFeeType = circulated or ratio) |  |
| transactFeeRateWithdraw | string | false | Withdraw fee in each request (only applicable to withdrawFeeType = ratio) |  |
| withdrawStatus | string | false | Withdraw status | allowed,prohibited |
| DATA\_END |  | false |  |  |
| instStatus | string | false | Instrument status | normal,delisted |
| \_\_/chains\_\_ |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/reference/currencies?currency=usdt"`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "chains": [
        {
          "chain": "trc20usdt",
          "displayName": "",
          "baseChain": "TRX",
          "baseChainProtocol": "TRC20",
          "isDynamic": false,
          "depositStatus": "allowed",
          "maxTransactFeeWithdraw": "1.00000000",
          "maxWithdrawAmt": "280000.00000000",
          "minDepositAmt": "100",
          "minTransactFeeWithdraw": "0.10000000",
          "minWithdrawAmt": "0.01",
          "numOfConfirmations": 999,
          "numOfFastConfirmations": 999,
          "withdrawFeeType": "circulated",
          "withdrawPrecision": 5,
          "withdrawQuotaPerDay": "280000.00000000",
          "withdrawQuotaPerYear": "2800000.00000000",
          "withdrawQuotaTotal": "2800000.00000000",
          "withdrawStatus": "allowed"
        },
        {
          "chain": "usdt",
          "displayName": "",
          "baseChain": "BTC",
          "baseChainProtocol": "OMNI",
          "isDynamic": false,
          "depositStatus": "allowed",
          "maxWithdrawAmt": "19000.00000000",
          "minDepositAmt": "0.0001",
          "minWithdrawAmt": "2",
          "numOfConfirmations": 30,
          "numOfFastConfirmations": 15,
          "transactFeeRateWithdraw": "0.00100000",
          "withdrawFeeType": "ratio",
          "withdrawPrecision": 7,
          "withdrawQuotaPerDay": "90000.00000000",
          "withdrawQuotaPerYear": "111000.00000000",
          "withdrawQuotaTotal": "1110000.00000000",
          "withdrawStatus": "allowed"
        },
        {
          "chain": "usdterc20",
          "displayName": "",
          "baseChain": "ETH",
          "baseChainProtocol": "ERC20",
          "isDynamic": false,
          "depositStatus": "allowed",
          "maxWithdrawAmt": "18000.00000000",
          "minDepositAmt": "100",
          "minWithdrawAmt": "1",
          "numOfConfirmations": 999,
          "numOfFastConfirmations": 999,
          "transactFeeWithdraw": "0.10000000",
          "withdrawFeeType": "fixed",
          "withdrawPrecision": 6,
          "withdrawQuotaPerDay": "180000.00000000",
          "withdrawQuotaPerYear": "200000.00000000",
          "withdrawQuotaTotal": "300000.00000000",
          "withdrawStatus": "allowed"
        }
      ],
      "currency": "usdt",
      "instStatus": "normal"
    }
  ]
}
```

### /v1/common/timestamp ( Get Current Timestamp)

Request type: GET

Signature verification: No

Interface description: This endpoint returns the current timestamp, i.e. the number of milliseconds that have elapsed since 00:00:00 UTC on 1 January 1970.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameter is needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result |  |
| data | long | false | current system timestamp |  |

#### Request example

`curl"https://api.huobi.pro/v1/common/timestamp"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 1629715504949
}
```

### /market/history/kline ( Get Klines(Candles))

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves all klines in a specific range.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | All trading symbol supported, e.g. btcusdt, bccbtcn (to retrieve candlesticks for ETP NAV, symbol = ETP trading symbol + suffix 'nav'，for example: btc3lusdtnav) |  |
| period | string | false | The period of each candle | 1min, 5min, 15min, 30min, 60min, 4hour, 1day, 1mon, 1week, 1year |  |
| size | integer | false | The number of data returns | \[1-2000\] | 150 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.kline.$period |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object | false |  |  |
| id | long | false | The UNIX timestamp in seconds as response id |  |
| amount | float | false | Accumulated trading volume, in base currency |  |
| count | integer | false | The number of completed trades |  |
| open | float | false | The opening price |  |
| close | float | false | The closing price |  |
| low | float | false | The low price |  |
| high | float | false | The high price |  |
| vol | float | false | Accumulated trading value, in quote currency |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/history/kline?period=1day&size=200&symbol=btcusdt"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.kline.5min",
  "status": "ok",
  "ts": 1629769247172,
  "data": [
    {
      "id": 1629769200,
      "open": 49056.37,
      "close": 49025.51,
      "low": 49022.86,
      "high": 49056.38,
      "amount": 3.946281917950917,
      "vol": 193489.67275732,
      "count": 196
    },
    {
      "id": 1629768900,
      "open": 48994.61,
      "close": 49056.37,
      "low": 48966.72,
      "high": 49072.46,
      "amount": 30.72223099519689,
      "vol": 1505870.732227976,
      "count": 1504
    }
  ]
}
```

### /market/detail/merged ( Get Latest Aggregated Ticker)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the latest ticker with some important 24h aggregated market data.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to /v1/common/symbols |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.detail.merged |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ | object | false |  |  |
| id | long | false | The internal identity |  |
| amount | float | false | Accumulated trading volume of last 24 hours (rotating 24h), in base currency |  |
| count | integer | false | The number of completed trades (rotating 24h) |  |
| open | float | false | The opening price of last 24 hours (rotating 24h) |  |
| close | float | false | The last price of last 24 hours (rotating 24h) |  |
| low | float | false | The lowest price of last 24 hours (rotating 24h) |  |
| high | float | false | The highest price of last 24 hours (rotating 24h) |  |
| vol | float | false | Accumulated trading value of last 24 hours (rotating 24h), in quote currency |  |
| bid | object | false | The current best bid in format \[price, size\] |  |
| ask | object | false | The current best ask in format \[price, size\] |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/detail/merged?symbol=ethusdt"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.detail.merged",
  "status": "ok",
  "ts": 1629788763750,
  "tick": {
    "id": 272156789143,
    "version": 272156789143,
    "open": 50080,
    "close": 49820.92,
    "low": 48767,
    "high": 50500,
    "amount": 12055.365781937457,
    "vol": 598561868.5709001,
    "count": 420573,
    "bid": [
      49819.48,
      2.58112
    ],
    "ask": [
      49819.49,
      0.002411
    ]
  }
}
```

### /market/tickers ( Get Latest Tickers for All Pairs)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the latest tickers for all supported pairs.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:

No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object | false |  |  |
| amount | float | false | The aggregated trading volume in last 24 hours (rotating 24h) |  |
| count | integer | false | The number of completed trades of last 24 hours (rotating 24h) |  |
| open | float | false | The opening price of a nature day (Singapore time) |  |
| close | float | false | The closing price of a nature day (Singapore time) |  |
| low | float | false | The lowest price of a nature day (Singapore time) |  |
| high | float | false | The highest price of a nature day (Singapore time) |  |
| vol | float | false | The aggregated trading value in last 24 hours (rotating 24h) |  |
| symbol | string | false | The trading symbol of this object, e.g. btcusdt, bccbtc |  |
| bid | float | false | Best bid price |  |
| bidSize | float | false | Best bid size |  |
| ask | float | false | Best ask price |  |
| askSize | float | false | Best ask size |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/tickers"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "ts": 1629789355531,
  "data": [
    {
      "symbol": "smtusdt",
      "open": 0.004659,
      "high": 0.004696,
      "low": 0.0046,
      "close": 0.00468,
      "amount": 36551302.17544405,
      "vol": 170526.0643855023,
      "count": 1709,
      "bid": 0.004651,
      "bidSize": 54300.341,
      "ask": 0.004679,
      "askSize": 1923.4879
    },
    {
      "symbol": "ltcht",
      "open": 12.795626,
      "high": 12.918053,
      "low": 12.568926,
      "close": 12.918053,
      "amount": 1131.801675005825,
      "vol": 14506.9381937385,
      "count": 923,
      "bid": 12.912687,
      "bidSize": 0.1068,
      "ask": 12.927032,
      "askSize": 5.3228
    }
  ]
}
```

### /market/depth ( Get Market Depth)

Request type: GET

Signature verification: No

Rate Limit: 4,000 5 minutes

Interface description: This endpoint retrieves the current order book of a specific pair.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | Refer to GET /v1/common/symbols |  |
| depth | integer | false | The number of market depth to return on each side | 5, 10, 20 | 20 |
| type | string | false | Market depth aggregation level, details below | step0：No market depth aggregation step1：Aggregation level = precision\*10 step2：Aggregation level = precision\*100 step3：Aggregation level = precision\*1000 step4：Aggregation level = precision\*10000 step5：Aggregation level = precision\*100000 | step0 |

Notes:

When the type value is 'step0', if 'depth' is not entered, the default value is 150。

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format： market.$symbol.depth.$type |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ | object | false |  |  |
| ts | integer | false | The UNIX timestamp in milliseconds is adjusted to Singapore time |  |
| version | integer | false | Internal data |  |
| bids | object | false | The current all bids in format \[price, size\] |  |
| asks | object | false | The current all asks in format \[price, size\] |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/depth?symbol=btcusdt&depth=5&type=step0"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.depth.step0",
  "status": "ok",
  "ts": 1629790438801,
  "tick": {
    "ts": 1629790438215,
    "version": 136107114472,
    "bids": [
      [
        49790.87,
        0.779876
      ],
      [
        49785.9,
        0.000182
      ],
      [
        49784.48,
        0.002758
      ],
      [
        49784.29,
        0.05
      ],
      [
        49783.06,
        0.005038
      ]
    ],
    "asks": [
      [
        49790.88,
        2.980472
      ],
      [
        49790.89,
        0.006613
      ],
      [
        49792.16,
        0.080302
      ],
      [
        49792.67,
        0.030112
      ],
      [
        49793.23,
        0.043103
      ]
    ]
  }
}
```

### /market/trade ( Get the Last Trade)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the latest trade with its price, volume, and direction.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | Refer to GET /v1/common/symbols |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.trade.detail |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ | object | false |  |  |
| id | long | false | global transaction ID |  |
| ts | long | false | Latest Creation Time |  |
| DATA\_START | object | false |  |  |
| id | integer | false | The unique trade id of this trade (to be obsoleted) |  |
| trade-id | integer | false | The unique trade id (NEW) |  |
| amount | float | false | The trading volume in base currency |  |
| price | float | false | The trading price in quote currency |  |
| ts | integer | false | The UNIX timestamp in milliseconds adjusted to Singapore time |  |
| direction | string | false | The direction of the taker trade: 'buy' or 'sell' |  |
| DATA\_END |  | false |  |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/trade?symbol=btcusdt"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.trade.detail",
  "status": "ok",
  "ts": 1629792192037,
  "tick": {
    "id": 136107843051,
    "ts": 1629792191928,
    "data": [
      {
        "id": 1.361078430513484e+26,
        "ts": 1629792191928,
        "trade-id": 102517374388,
        "amount": 0.028416,
        "price": 49806,
        "direction": "buy"
      },
      {
        "id": 1.361078430513484e+26,
        "ts": 1629792191928,
        "trade-id": 102517374387,
        "amount": 0.025794,
        "price": 49806,
        "direction": "buy"
      }
    ]
  }
}
```

### /market/history/trade ( Get the Most Recent Trades)

Request type: GET

Signature verification: No

Rate Limit: 3,000 5 minutes

Interface description: This endpoint retrieves the most recent trades with their price, volume, and direction.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols |  |
| size | integer | false | The number of data returns | \[1-2000\] | 1 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format：market.$symbol.trade.detail |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| DATA\_START | object | false |  |  |
| id | long | false | global transaction ID |  |
| ts | long | false | Latest Creation Time |  |
| DATA\_START | object | false |  |  |
| id | integer | false | The unique trade id of this trade (to be obsoleted) |  |
| trade-id | integer | false | The unique trade id (NEW) |  |
| amount | float | false | The trading volume in base currency |  |
| price | float | false | The trading price in quote currency |  |
| ts | integer | false | The UNIX timestamp in milliseconds adjusted to Singapore time |  |
| direction | string | false | The direction of the taker trade: 'buy' or 'sell' |  |
| DATA\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:

The returned data object is an array which represents one recent timestamp; each timestamp object again is an array which represents all trades occurred at this timestamp.

#### Request example

`curl"https://api.huobi.pro/market/history/trade?symbol=btcusdt&size=2"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.trade.detail",
  "status": "ok",
  "ts": 1629793657842,
  "data": [
    {
      "id": 136108764379,
      "ts": 1629793656939,
      "data": [
        {
          "id": 1.361087643793484e+26,
          "ts": 1629793656939,
          "trade-id": 102517381182,
          "amount": 0.000124,
          "price": 49656.4,
          "direction": "buy"
        }
      ]
    },
    {
      "id": 136108763320,
      "ts": 1629793656198,
      "data": [
        {
          "id": 1.361087633203484e+26,
          "ts": 1629793656198,
          "trade-id": 102517381181,
          "amount": 0.01125,
          "price": 49655,
          "direction": "buy"
        },
        {
          "id": 1.361087633203484e+26,
          "ts": 1629793656198,
          "trade-id": 102517381180,
          "amount": 0.00083,
          "price": 49651.35,
          "direction": "buy"
        }
      ]
    }
  ]
}
```

### /market/detail ( Get the Last 24h Market Summary)

Request type: GET

Signature verification: No

Rate Limit: 4,500 5 minutes

Interface description: This endpoint retrieves the summary of trading in the market for the last 24 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to query | Refer to /v1/common/symbols |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format： market.$symbol.detail |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ | object | false |  |  |
| id | integer | false | The internal identity |  |
| amount | float | false | The aggregated trading volume in USDT of last 24 hours (rotating 24h) |  |
| count | integer | false | The number of completed trades of last 24 hours (rotating 24h) |  |
| open | float | false | The opening price of last 24 hours (rotating 24h) |  |
| close | float | false | The closing price of last 24 hours (rotating 24h) |  |
| low | float | false | The lowest price of last 24 hours (rotating 24h) |  |
| high | float | false | The highest price of last 24 hours (rotating 24h) |  |
| vol | float | false | The trading volume in base currency of last 24 hours (rotating 24h) |  |
| version | integer | false | Internal data |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/detail?symbol=ethusdt"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.detail",
  "status": "ok",
  "ts": 1629795484817,
  "tick": {
    "id": 272164011416,
    "low": 48767.7,
    "high": 50500.6,
    "open": 50266.89,
    "close": 49728.71,
    "vol": 601037933.6834868,
    "amount": 12110.642402972368,
    "version": 272164011416,
    "count": 420452
  }
}
```

### /market/fullMbp (Full Order Book)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: 5 times/1s

Interface description: Query the complete market depth data, Updated once per second,and support returning up to 5000 levels.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | Trading Pairs, and support returning up to 5000 levels. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result "ok","error" |  |
| ch | string | false | Data belonged channel，Format： market.$symbol.depth.$type |  |
| ts | long | false | Time of Respond Generation, Unit: Millisecond |  |
| \_\_tick\_\_ |  | false |  |  |
| ts | 调整为新加坡时间的时间戳，单位毫秒 | false | The UNIX timestamp in milliseconds is adjusted to Singapore time |  |
| version | 内部字段 | false | Internal data |  |
| bids | 当前的所有买单 \[price, size\] | false | The current all bids in format \[price, size\] |  |
| asks | 当前的所有卖单 \[price, size\] | false | The current all asks in format \[price, size\] |  |
| \_\_/tick\_\_ |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/market/fullMbp?symbol=ethusdt"`

#### Response Example

##### Success Example

```
{
  "ch": "market.btcusdt.depth.step0",
  "status": "ok",
  "ts": 1629790438801,
  "tick": {
    "ts": 1629790438215,
    "version": 136107114472,
    "bids": [
      [
        49790.87,
        0.779876
      ],
      [
        49785.9,
        0.000182
      ],
      [
        49784.48,
        0.002758
      ],
      [
        49784.29,
        0.05
      ],
      [
        49783.06,
        0.005038
      ]
    ],
    "asks": [
      [
        49790.88,
        2.980472
      ],
      [
        49790.89,
        0.006613
      ],
      [
        49792.16,
        0.080302
      ],
      [
        49792.67,
        0.030112
      ],
      [
        49793.23,
        0.043103
      ]
    ]
  }
}
```