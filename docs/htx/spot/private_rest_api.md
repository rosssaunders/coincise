# HTX Private REST API Documentation

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

### Authentication

#### Overview

The API request may be tampered during internet, therefore all private API must be signed by your API Key (Secrete Key).

Each API Key has permission property, please check the API permission, and make sure your API key has proper permission.

A valid request consists of below parts:

-   API Path: for example api.huobi.pro/v1/order/orders
-   API Access Key: The 'Access Key' in your API Key
-   Signature Method: The first one is for users to use the elliptic curve digital signature algorithm, using Ed25519. ‌The second, hash-based protocol for user-computed signatures, uses HmacSHA256.
-   Ed25519 introduction: It is a high-performance digital signature algorithm that provides fast signature verification and generation while having high security.
-   Signature Version: The version for the signature protocol, it uses **2**
-   Timestamp: The UTC time when the request is sent, e.g. 2017-05-11T16:22:06. It is useful to prevent the request to be intercepted by third-party.
-   Parameters: Each API Method has a group of parameters, you can refer to detailed document for each of them.
    -   For GET request, all the parameters must be signed.
    -   For POST request, the parameters needn't be signed and they should be put in request body.
-   Signature: The value after signed, it is guarantee the signature is valid and the request is not be tempered.

#### Ed25519 Signature Method

The signature may be different if the request text is different, therefore the request should be normalized before signing. Below signing steps take the order query as an example:

This is a full URL to query one order:

`[https://api.huobi.pro/v1/order/orders](https://api.huobi.pro/v1/order/orders)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=Ed25519`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

`&order-id=1234567890`

**1\. The request Method (GET or POST, WebSocket use GET), append line break "\\n"**

`GET\n`

**2\. The host with lower case, append line break "\\n"**

Example:`api.huobi.pro\n`

**3\. The path, append line break "\\n"**

For example, query orders:

`/v1/order/orders\n`

For example, WebSocket v2

`/ws/v2`

**4\. The parameters are URL encoded, and ordered based on ASCII**

For example below is the original parameters:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`order-id=1234567890`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 encoding and URL encoded, the hex must be upper case. For example, The semicolon ':' should be encoded as '%3A', The space should be encoded as '%20'.The 'timestamp' should be formated as 'YYYY-MM-DDThh:mm:ss' and URL encoded. The value is valid within 5 minutes.

Then above parameter should be ordered like below:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=Ed25519`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

`order-id=1234567890`

**5\. Use char "&" to concatenate all parameters**

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**6\. Assemble the pre-signed text**

`GET\n`

`api.huobi.pro\n`

`/v1/order/orders\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**7\. Use the pre-signed text and your Secret Key to generate a signature**

-   Use the request string obtained in the previous step to generate the private key of Ed25519 and add it to generate a signature.
-   Encode the generated signature with base-64, and the resulting value is used as the digital signature of this interface call.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

**8\. Put the signature into request URL**

For Rest interface:

1.  Put all the parameters in the URL
2.  Encode signature by URL encoding and append in the URL with parameter name "Signature".

Finally, the request sent to API should be:

`https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=Ed25519&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D`

For WebSocket interface:

1.  Fill the value according to required JSON schema
2.  The value in JSON doesn't require URL encode

For example:

`{ "action": "req", "ch": "auth", "params": { "authType":"api", "accessKey": "e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx", "signatureMethod": "Ed25519", "signatureVersion": "2.1", "timestamp": "2019-09-01T18:16:16", "signature": "4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=" }}`

#### HmacSHA256 Signature Method

The signature may be different if the request text is different, therefore the request should be normalized before signing. Below signing steps take the order query as an example:

This is a full URL to query one order:

`[https://api.huobi.pro/v1/order/orders](https://api.huobi.pro/v1/order/orders)?`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`&SignatureMethod=HmacSHA256`

`&SignatureVersion=2`

`&Timestamp=2017-05-11T15:19:30`

`&order-id=1234567890`

**1\. The request Method (GET or POST, WebSocket use GET), append line break "\\n"**

`GET\n`

**2\. The host with lower case, append line break "\\n"**

Example:`api.huobi.pro\n`

**3\. The path, append line break "\\n"**

For example, query orders:

`/v1/order/orders\n`

For example, WebSocket v2

`/ws/v2`

**4\. The parameters are URL encoded, and ordered based on ASCII**

For example below is the original parameters:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`order-id=1234567890`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

Use UTF-8 encoding and URL encoded, the hex must be upper case. For example, The semicolon ':' should be encoded as '%3A', The space should be encoded as '%20'.The 'timestamp' should be formated as 'YYYY-MM-DDThh:mm:ss' and URL encoded. The value is valid within 5 minutes.

Then above parameter should be ordered like below:

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx`

`SignatureMethod=HmacSHA256`

`SignatureVersion=2`

`Timestamp=2017-05-11T15%3A19%3A30`

`order-id=1234567890`

**5\. Use char "&" to concatenate all parameters**

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**6\. Assemble the pre-signed text**

`GET\n`

`api.huobi.pro\n`

`/v1/order/orders\n`

`AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&order-id=1234567890`

**7\. Use the pre-signed text and your Secret Key to generate a signature**

-   Use the pre-signed text in step 6 and your API Secret Key to generate hash code by HmacSHA256 hash function.
-   Encode the hash code with base-64 to generate the signature.

`4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=`

**8\. Put the signature into request URL**

For Rest interface:

1.  Put all the parameters in the URL
2.  Encode signature by URL encoding and append in the URL with parameter name "Signature".

Finally, the request sent to API should be:

`[https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D](https://api.huobi.pro/v1/order/orders?AccessKeyId=e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx&order-id=1234567890&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2017-05-11T15%3A19%3A30&Signature=4F65x5A2bLyMWVQj3Aqp%2BB4w%2BivaA7n5Oi2SuYtCJ9o%3D)`

For WebSocket interface:

1.  Fill the value according to required JSON schema
2.  The value in JSON doesn't require URL encode

For example:

`{ "action": "req", "ch": "auth", "params": { "authType":"api", "accessKey": "e2xxxxxx-99xxxxxx-84xxxxxx-7xxxx", "signatureMethod": "HmacSHA256", "signatureVersion": "2.1", "timestamp": "2019-09-01T18:16:16", "signature": "4F65x5A2bLyMWVQj3Aqp+B4w+ivaA7n5Oi2SuYtCJ9o=" }}`

### Sub User

Sub user can be used to isolate the assets and trade, the assets can be transferred between parent and sub users. Sub user can only trade with the sub user. The assets can not be transferred between sub users, only parent user has the transfer permission.

Sub user has independent login password and API Key, they are managed under parent user in website.

Each parent user can create **200** sub user, each sub user can create at most **5** API Key, each API key can have two permissions: **read** and **trade**.

The sub user API Key can also bind IP address, the expiry policy is the same with parent user.

You can access [here](https://account.hbg.com/en-us/subaccount/management) to create and manage sub user.

The sub user can access all public API (including basic information and market data), below are the private APIs that sub user can access:

| API | Description |
| --- | --- |
| POST /v1/order/orders/place | Create and execute an order |
| POST /v1/order/orders/{order-id}/submitcancel | Cancel an order |
| POST /v1/order/orders/submitCancelClientOrder | Cancel an Order based on client order ID |
| POST /v1/order/orders/batchcancel | Cancel multiple orders |
| POST /v1/order/orders/batchCancelOpenOrders | Cancel the open orders |
| GET /v1/order/orders/{order-id} | Query a specific order |
| GET /v1/order/orders | Query orders with criteria |
| GET /v1/order/openOrders | Query open orders |
| GET /v1/order/matchresults | Query the order matching result |
| GET /v1/order/orders/{order-id}/matchresults | Query a specific order matching result |
| GET /v1/account/accounts | Query all accounts in current user |
| GET /v1/account/accounts/{account-id}/balance | Query the specific account balance |
| POST /v1/futures/transfer | Transfer with future account |
| POST /v1/dw/transfer-in/margin | Transfer from spot to margin account |
| POST /v1/dw/transfer-out/margin | Transfer from margin to spot account |
| POST /v1/margin/orders | Request margin loan |
| POST /v1/margin/orders/{order-id}/repay | Repay the debit for specific order |
| GET /v1/margin/loan-orders | Query history loan orders |
| GET /v1/margin/accounts/balance | Query margin account balance |
| GET /v1/account/history | Query account history |
| POST /v1/cross-margin/transfer-in | Transfer Asset from Spot Trading Account to Cross Margin Account |
| POST /v1/cross-margin/transfer-out | Transfer Asset from Cross Margin Account to Spot Trading Account |
| GET /v1/cross-margin/loan-info | Get Loan Interest Rate and Quota |
| POST /v1/cross-margin/orders | Request a Margin Loan |
| POST /v1/cross-margin/orders/{order-id}/repay | Repay Margin Loan |
| GET /v1/cross-margin/loan-orders | Search Past Margin Orders |
| GET /v1/cross-margin/accounts/balance | Get the Balance of the Margin Loan Account |
| GET /v2/account/ledger | Query account ledger |
| POST /v1/account/transfer | Asset Transfer |
| GET /v2/point/account | Query Point Balance |
| POST /v2/point/transfer | Point Transfer |
| GET /v2/etp/reference | Get reference data of ETP |
| POST /v2/etp/creation | ETP Creation |
| POST /v2/etp/redemption | ETP Redemption |
| GET /v2/etp/transactions | Get ETP Creation & Redemption History |
| GET /v2/etp/transaction | Get Specific ETP Creation or Redemption Record |
| GET /v2/etp/rebalance | Get Position Rebalance History |

All other APIs couldn't be accessed by sub user, otherwise the API will return "error-code 403"。

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

### /v1/account/accounts ( Get all Accounts of the Current User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns a list of accounts owned by this API user.

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
| status | string | false | Request Processing Result | "ok","error" |
| DATA\_START | object | false |  |  |
| id | long | false | Unique account id |  |
| state | string | false | Account state | working, lock |
| type | string | false | The type of this account | spot, margin, otc, point, super-margin, investment, borrow, grid-trading, otc-options,trust-credit ( third-party trust account )， |
| subtype | string | false | Sub-account type (only valid for isolated margin accounts and trust-credit third-party trust account ) | The corresponding trading symbol (currency pair) the isolated margin is based on, e.g. btcusdt; Under the trust-credit account type, the value on the subtype identifies the chain where its assets or credit assets are located. Possible values ​​include (reference chain information): btc, eth, usdterc20, trc20usdt, usdc, trx1, etc. |
| DATA\_END | object | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/account/accounts"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "id": 10000001,
      "type": "spot",
      "subtype": "",
      "state": "working"
    },
    {
      "id": 10000002,
      "type": "otc",
      "subtype": "",
      "state": "working"
    },
    {
      "id": 10000003,
      "type": "point",
      "subtype": "",
      "state": "working"
    }
  ]
}
```

### /v1/account/accounts/{account-id}/balance ( Get Account Balance of a Specific Account)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the balance of an account specified by account id.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

Notes:

'account-id': The specified account id to get balance for, can be found by query '/v1/account/accounts' endpoint.

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | account-id in the path field | The value can be GET /v1/account/accounts |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result | "ok","error" |
| DATA\_START | object | false |  |  |
| id | long | false | Unique account id |  |
| state | string | false | Account state | working, lock |
| type | string | false | The type of this account | spot, margin, otc, point, super-margin, investment, borrow, grid-trading, otc-options,trust-credit ( third-party trust account )， |
| LIST\_START | Array | false |  |  |
| currency | string | false | The currency of this balance |  |
| type | string | false | The balance type | trade, frozen, loan, interest, lock, bank,credit-repay,trust-asset |
| balance | string | false | The balance in the main currency unit |  |
| debt | string | false | Invalid field |  |
| available | string | false | Invalid field |  |
| seq-num | string | false | Serial Number of Account Change |  |
| LIST\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/account/accounts/{account-id}/balance" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "id": 1000001,
    "type": "spot",
    "state": "working",
    "list": [
      {
        "currency": "usdt",
        "type": "trade",
        "balance": "91.850043797676510303",
        "debt": "invalid",
        "available": "invalid",
        "seq-num": "477"
      },
      {
        "currency": "usdt",
        "type": "frozen",
        "balance": "5.160000000000000015",
        "debt": "invalid",
        "available": "invalid",
        "seq-num": "477"
      },
      {
        "currency": "poly",
        "type": "trade",
        "balance": "147.928994082840236",
        "debt": "invalid",
        "available": "invalid",
        "seq-num": "2"
      }
    ]
  }
}
```

### /v2/account/valuation (Get The Total Valuation of Platform Assets)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 3/1s

Interface description: Obtain the total asset valuation of the platform account according to the BTC or legal currency denominated unit.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountType | string | false | account type, more to see "Account type data dictionary" |  |  |
| valuationCurrency | string | false | If not filled, the default is BTC (only BTC supported now, and must be capitalized) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | status code |  |
| DATA\_START | object | false |  |  |
| totalBalance | string | false | total balance |  |
| todayProfit | string | false | today profit |  |
| todayProfitRate | string | false | today profit rate |  |
| PROFITACCOUNTBALANCELIST\_START | list | false |  |  |
| distributionType | string | false | distribution type | 1 spot 2 Isolated 3 cross 4 coin futures 5 flat 6 minepool 7 coin swaps 8 investment 9 borrow 10 earn 11 usdt swaps 12 option 13 otc-options 14 crypto-loans 15 grid-trading 16 minepool |
| balance | float | false | balance |  |
| success | boolean | false | get data successful or not. When fails, the accountBalance and balance are 0 |  |
| accountBalance | string | false | account balance |  |
| PROFITACCOUNTBALANCELIST\_END |  | false |  |  |
| UPDATED\_START | list | false |  |  |
| success | boolean | false | updated today, yes or not |  |
| time | long | false | updated time |  |
| UPDATED\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| success | boolean | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/account/valuation?accountTypency=spot&valuationCurrencyunt=BTC" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "updated": {
      "success": true,
      "time": 1629916724000
    },
    "todayProfitRate": "0.004638293764657609",
    "totalBalance": "0.06276321",
    "todayProfit": "0.00028977",
    "profitAccountBalanceList": [
      {
        "distributionType": "11",
        "balance": 0.05728808,
        "success": true,
        "accountBalance": "0.05728808"
      }
    ]
  },
  "success": true
}
```

### /v2/account/asset-valuation ( Get Asset Valuation)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the valuation of the total assets of the account in btc or fiat currency.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountType | string | false | The type of this account | spot, margin, otc, super-margin |  |
| valuationCurrency | string | false | The valuation according to the certain fiat currency | BTC, CNY, USD, JPY, KRW, GBP, TRY, EUR, RUB, VND, HKD, TWD, MYR, SGD, AED, SAR (case sensitive) | BTC |
| subUid | long | false | Sub User's UID. When sub user's UID is not specified, the response would include the records of API key. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | string | false | status code |  |
| ok | string | false |  |  |
| DATA\_START | object | false |  |  |
| balance | string | false | The valuation according to the certain fiat currency |  |
| timestamp | long | false | Return time |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/account/asset-valuation?accountType=spot&valuationCurrency=BTC&subUid=xxxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "balance": "34.75",
    "timestamp": 1594901254363
  },
  "ok": true
}
```

### /v1/account/transfer ( Asset Transfer)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: API Key Permission：Trade This endpoint allows parent user and sub user to transfer asset between accounts. Features now supported for both parent user and sub user include: 1.transfer asset between spot account and individual isolated-margin account; 2.transfer asset between individual isolated-margin accounts; Features now supported for parent user include: 1.Transfer asset between parent user's spot account and sub user's spot account; 2.Transfer asset from sub user’s spot account to another sub user’s spot account that is under the same parent user(Assets from the Fireblocks sub-accounts can only be transferred to other Fireblocks sub-accounts.); Features now supported for sub user include: 1.Transfer asset from authorized sub user’s spot account to another sub user’s spot account that is under the same parent user( Assets from the Fireblocks sub-accounts can only be transferred to other Fireblocks sub-accounts).The authorization endpoint is POST /v2/sub-user/transferability. 2.Transfer asset from sub user’s spot account to parent user’s spot account; Other transfer functions will be gradually launched later, please take note on API announcement in near future.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| from-user | long | true | Transfer out user uid | parent user uid, sub user uid |  |
| from-account-type | string | true | Transfer out account type | spot, margin |  |
| from-account | long | true | Transfer out account id |  |  |
| to-user | long | true | Transfer in user uid | parent user uid, sub user uid |  |
| to-account-type | string | true | Transfer in account type | spot, margin |  |
| to-account | long | true | Transfer in account id |  |  |
| currency | string | true | Currency name | Refer to GET /v1/common/currencys |  |
| amount | string | true | Amount of fund to transfer |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request status | "ok" or "error" |
| DATA\_START | list | true |  |  |
| transact-id | int | true | Transfer id |  |
| transact-time | long | true | Transfer time |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "from-user": 178911,
  "from-account-type": "spot",
  "from-account": 178911,
  "to-user": 178911,
  "to-account-type": "spot",
  "to-account": 178911,
  "currency": "usdt",
  "amount": "1"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "transact-id": 220521190,
    "transact-time": 1590662591832
  }
}
```

### /v1/account/history ( Get Account History)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 5times/2s

Interface description: This endpoint returns the amount changes of a specified user's account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | Account Id, refer to GET /v1/account/accounts |  |  |
| currency | string | false | Currency name | Refer to /v1/common/currencys |  |
| transact-types | string | false | Amount change types (multiple selection allowed, separated by comma) | trade,etf, transact-fee, fee-deduction, transfer, credit, liquidation, interest, deposit, withdraw, withdraw-fee, exchange, other-types, rebate,fireblocks-dw：asset changes (deposit & withdrawal) | all |
| start-time | long | false | The start time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 1 hour. The query window can be shifted within 30 days. | \[((end-time) – 1hour), (end-time)\] | ((end-time) – 1hour) |
| end-time | long | false | The end time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 1 hour. The query window can be shifted within 30 days. | \[(current-time) – 29days,(current-time)\] | current-time |
| sort | string | false | Sorting order | asc or desc | asc |
| size | int | false | Maximum number of items in each response | \[1-500\] | 100 |
| from-id | long | false | First record ID in this query (only valid for next page querying, see Note 2) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Status code |  |
| DATA\_START | object | false |  |  |
| account-id | long | false | Account ID |  |
| currency | string | false | Currency |  |
| transact-amt | string | false | Amount change (positive value if income, negative value if outcome) |  |
| transact-type | string | false | Amount change types |  |
| avail-balance | string | false | Available balance |  |
| acct-balance | string | false | Account balance |  |
| transact-time | long | false | Transaction time (database time) |  |
| record-id | long | false | Unique record ID in the database |  |
| DATA\_END |  | false |  |  |
| next-id | long | false | First record ID in next page (only valid if exceeded page size, see Note 2) |  |

Notes:

Note 1:

If ‘transact-type’ is shown as ‘rebate’, it implicates a paid maker rebate.

A paid maker rebate could possibly include rebate from multiple trades.

Note 2:

Only when the number of items within the query window (between "start-time" and "end-time") exceeded the page limitation (defined by "size"), HTX server returns "next-id". Once received "next-id", API user should –

1) Be aware of that, some items within the query window were not returned due to the page size limitation.

2) In order to get these items from HTX server, adopt the "next-id" as "from-id" and submit another request, with other request parameters no change.

3) As database record ID, "next-id" and "from-id" are for recurring query purpose and the ID itself does not have any business implication.

Note 3:

Change type contains a detailed list of account types：

https://huobiapi.github.io/docs/spot/v1/en/#get-account-history

#### Request example

`curl"https://api.huobi.pro/v1/account/history?account-id=xxxxx¤cy=BTC&transact-types=transfer&start-time=1667814703000&end-time=1667909627238&sort=asc&size=100&from-id=xxxxxxx" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "account-id": 10000001,
      "currency": "usdt",
      "record-id": 359044707902783800,
      "transact-amt": "-10.000000000000000000",
      "transact-type": "other-types",
      "avail-balance": "81.850043797676510303",
      "acct-balance": "97.010043797676510318",
      "transact-time": 1629882096557
    },
    {
      "account-id": 10000001,
      "currency": "usdt",
      "record-id": 359044690723242100,
      "transact-amt": "-10.000000000000000000",
      "transact-type": "transfer",
      "avail-balance": "81.850043797676510303",
      "acct-balance": "87.010043797676510318",
      "transact-time": 1629882096569
    }
  ],
  "next-id": 47996522235
}
```

### /v2/account/ledger ( Get Account Ledger)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint returns the amount changes of specified user's account. Phase 1 release only supports historical assets transfer querying ("transactType" = "transfer"). The maximum query window size set by "startTime" & "endTime" is 10-day, which mean a maximum of 10-day records are queriable per request. The query window can be within the last 180 days, which means, by adjusting "startTime" & "endTime" accordingly, the records in last 180 days are queriable.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | string | false | Account ID |  |  |
| currency | string | false | Cryptocurrency (default value: all) |  |  |
| transactTypes | string | false | Transaction types (multiple inputs are allowed; default value: all; enumerated values: transfer) | transfer |  |
| startTime | long | false | Farthest time (180 days) |  |  |
| endTime | long | false | Nearest time (180 days) |  |  |
| sort | string | false | Sorting order (enumerated values: asc, desc) | （Deprecated） |  |
| limit | int | false | Maximum number of items in one page (valid range:\[1-500\]; default value:100) |  | 100 |
| fromId | long | false | First record ID in this query (only valid for next page querying. please refer to note 3) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | Sorting as user defined (in request parameter "sort" ) |  |
| accountId | integer | false | Account ID |  |
| currency | string | false | Cryptocurrency |  |
| transactAmt | number | false | Transaction amount (income positive, expenditure negative) |  |
| transactType | string | false | Transaction type | transfer |
| transferType | string | false | Transfer type (only valid for transactType=transfer) | otc-to-spot, spot-to-otc, futures-to-spot, spot-to-futures, dm-swap-to-spot (coin-margined-swap), dm-spot-to-swap (coin-margined-swap), spot-to-linear-swap, linear-swap-to-spot，margin-transfer-in, margin-transfer-out, lock-transfer-in, lock-transfer-out, user-lock-transfer-in, user-lock-transfer-out, master-transfer-in, master-transfer-out, sub-transfer-in, sub-transfer-out, agency-transfer-in, agency-transfer-out, spot-to-super-margin, super-margin-to-spot |
| transactId | integer | false | Transaction ID |  |
| transactTime | integer | false | Transaction time |  |
| transferer | integer | false | Transferer’s account ID |  |
| transferee } | integer | false | Transferee’s account ID |  |
| DATA\_END |  | false |  |  |
| nextId | integer | false | First record ID in next page (only valid if exceeded page size. please refer to note 3.) |  |

Notes:

Only when the number of items within the query window (between "startTime" and "endTime") exceeded the page limitation (defined by "limit"), HTX server returns "nextId". Once received "nextId", API user should –

1) Be aware of that, some items within the query window were not returned due to the page size limitation.

2) In order to get these items from HTX server, adopt the "nextId" as "fromId" and submit another request, with other request parameters no change.

3) As database record ID, "nextId" and "fromId" are for recurring query purpose and the ID itself does not have any business implication.

#### Request example

`curl"https://api.huobi.pro/v2/account/ledger?accountId=xxxx¤cy=BTC&transactTypes=transfer" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "accountId": 10000001,
      "currency": "usdt",
      "transactAmt": 10,
      "transactType": "transfer",
      "transferType": "margin-transfer-out",
      "transactId": 0,
      "transactTime": 1629882331066,
      "transferer": 28483123,
      "transferee": 13496526
    },
    {
      "accountId": 10000001,
      "currency": "usdt",
      "transactAmt": -10,
      "transactType": "transfer",
      "transferType": "margin-transfer-in",
      "transactId": 0,
      "transactTime": 1629882096562,
      "transferer": 13496526,
      "transferee": 28483123
    }
  ],
  "nextId": 1624316679,
  "ok": true
}
```

### /v2/account/transfer (\[General\] Spot - transfer funds between contract accounts and OTC accounts)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This interface allows for asset transfer between users’ currency spot accounts, contract accounts, and OTC accounts.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| from | string | true | source，value：spot、linear-swap、otc、futures、swap | e.g. spot、linear-swap、otc、futures、swap |  |
| to | string | true | destination，value：spot、linear-swap、otc、futures、swap | e.g. linear-swap、spot、otc、futures、swap |  |
| currency | string | true | currency.Both uppercase and lowercase are supported. | e.g. usdt |  |
| amount | decimal | true | Transferring amount |  |  |
| margin-account | string | true | margin account | e.g. btc-usdt、eth-usdt、USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| success | string | true | status | true/false |
| data | long | true | The generated transfer order id |  |
| code | long | true | Response code |  |
| message | string | true | Response message |  |

#### Request example

```
{
  "from": "spot",
  "to": "linear-swap",
  "currency": "usdt",
  "amount": 100,
  "margin-account": "USDT"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": 176104252,
  "message": "Succeed",
  "success": true
}
```

### /v1/futures/transfer ( Transfer Fund Between Spot Account and Future Contract Account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: API Key Permission：Trade This endpoint allows a user to transfer fund between spot accounts and futrue contract accounts. Transferring from a spot account to a contract account, the type is pro-to-futures; transferring from a contract account to a spot account, the type is futures-to-pro

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | Currency name | Refer to GET /v1/common/currencys |  |
| amount | decimal | false | Amount of fund to transfer |  |  |
| type | string | false | Type of the transfer | "futures-to-pro" or "pro-to-futures" |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | Long | false | Transfer id |  |
| status | string | false | Request status. "ok" or "error" |  |
| err-code | string | false | error code. Please refer to the err-code list below for details |  |
| err-msg | string | false | error message. Please refer to the err-code and err-msg list below for details |  |

#### Request example

```
{
  "currency": "btc",
  "amount": 0.001,
  "type": "pro-to-futures"
}
```

#### Response Example

##### Success Example

`  {     "data": 12345,   "status": "ok" }  > Error response: {     "status": "error",     "data": null,     "err-code": "base-msg",     "err-msg": "Insufficient amount available." }`

### /v2/point/account ( Get Point Balance)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/s

Interface description: Via this endpoint, user should be able to query ‘termless’ point’s balance, as well as ‘terminable’ point’s balance including its group IDs and individual expiration date. Via this endpoint, user could only query point’s balance instead of any other cryptocurrency’s balance. Via this endpoint, parent user could query either parent user’s point balance, or sub user’s point balance. User can only exchange HTX point via HTX official web or app.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | string | false | Sub user’s UID (only valid for scenario of parent user querying sub user’s point balance) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| success | string | false |  |  |
| DATA\_START | object | false |  |  |
| accountId | string | false | Account ID |  |
| accountStatus | string | false | Account status (working, lock, fl-sys, fl-mgt, fl-end, fl-negative) |  |
| acctBalance | string | false | Account balance |  |
| GROUPIDS\_START | object | false | Group ID list |  |
| groupId | long | false | Group ID |  |
| expiryDate | long | false | Expiration date (unix time in millisecond) |  |
| remainAmt | string | false | Remaining amount |  |
| GROUPIDS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

Notes:

Group ID is the transaction ID generated while parent user exchanging the ‘terminable’ points.

Group ID of ‘termless’ points is 0.

Expiration date of ‘termless’ points is null.

#### Request example

`curl"https://api.huobi.pro/v2/point/account？subUid=xxxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "accountId": "14403739",
    "groupIds": [
      {
        "groupId": 26,
        "expiryDate": 1594396800000,
        "remainAmt": "0.3"
      }
    ],
    "acctBalance": "0.30000000",
    "accountStatus": "working"
  },
  "success": true
}
```

### /v2/point/transfer ( Point Transfer)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/s

Interface description: Via this endpoint, parent user should be able to transfer points between parent user and sub user, sub user should be able to transfer point to parent user. Both ‘termless’ and ‘terminable’ points are transferrable. Via this endpoint, user could only transfer ‘termless’ and ‘terminable’ points instead of any other cryptocurrencies. Parent user could transfer point between parent user and sub user in two ways. Sub user could only transfer point from sub user to parent user. Before parent user trying to transfer the terminable points back from sub user's account, parent user should query the sub user's point balance first in order to get the corresponding groupId.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fromUid | string | false | Transferer’s UID |  |  |
| toUid | string | false | Transferee’s UID |  |  |
| groupId | long | false | Group ID |  |  |
| amount | string | false | Transfer amount (precision: maximum 8 decimal places) |  |  |

Notes:

\- If groupId=0, it implicates an ‘termless’ point transfer request.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| success | string | false |  |  |
| DATA\_START | object | false |  |  |
| transactId | string | false | Transaction ID |  |
| transactTime | long | false | Transaction time (unix time in millisecond) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "fromUid": "178911",
  "toUid": "178211",
  "groupId": 178911,
  "amount": "178911"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "transactId": "74",
    "transactTime": 1594370136458
  },
  "success": true
}
```

### /v1/account/switch/user/info (User deduction information query)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 5 times/1s

Interface description: User inquires about deduction information.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | code |  |
| message | string | false | message |  |
| DATA\_START | object | true |  |  |
| pointSwitch | int | true | Whether to enable point card deduction ( Choose one of point card deduction and HTX deduction ) | 1：yes,0：no |
| currencySwitch | int | true | Whether to enable HTX deduction ( Choose one of point card deduction and HTX deduction ) | 1：yes,0：no |
| deductionCurrency | string | true | deduction currency | HTX.... |
| DATA\_START |  | false |  |  |

Notes: Assume that the /v1/account/fee/switch interface is set to switchType = 0, and the return parameters of the query for this interface will be 0.

#### Request example

`curl"https://api.huobi.pro/v1/account/switch/user/info"`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "pointSwitch": "1",
    "htxSwitch": "0",
    "currency": "HTX"
  },
  "success": true
}
```

### /v1/account/overview/info (Deductible currency query information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 5 times/1s

Interface description: Users query asset information that can be used to deduct handling fees.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | code |  |
| message | string | false | message |  |
| DATA\_START | object | true |  |  |
| currency | string | true | The currency of this balance |  |
| DATA\_START |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/account/overview/info"`

#### Response Example

##### Success Example

```
{
  "code": "200",
  "data": {
    "currency": "TRX"
  },
  "success": true
}
```

### /v1/account/fee/switch (Set up spot/margin deduction fee method)

Request type: POST

Signature verification: Yes

Interface permission: Read

Rate Limit: 2 times/1s

Interface description: Used to set spot/margin transaction fee deductions, you can use point cards to deduct, or you can use HTX to deduct.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| switchType | int | true | 0: Point card deduction, 1: Currency deduction, 2: Close deduction |  |  |
| deductionCurrency | String | false | When switchType = 1, you need to select deduction | For example HTX、TRX...... |  |

Notes: Assuming that the balance clicked by the user is zero, if switchType=40406, an XXX error will be reported when calling this interface.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | code |  |
| message | string | false | message |  |
| DATA\_START | object | true |  |  |
| DATA\_START |  | false |  |  |

#### Request example

```
{
  "switchType": 1,
  "deductionCurrency": "TRX"
}
```

#### Response Example

##### Success Example

```
{
  "code": "200",
  "data": {},
  "success": true
}
```

### /v1/order/orders/place ( Place a New Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: This endpoint places a new order and sends to the exchange to be matched.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | The account id used for this trade |  | NA |
| symbol | string | false | The trading symbol to trade |  | NA |
| type | string | false | The order type。buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  | NA |
| amount | string | false | order size (for buy market order, it's order value) |  | NA |
| price | string | false | The order price (not available for market order) |  | NA |
| source | string | false | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api'; |  | spot-api |
| client-order-id | string | false | Client order ID |  | NA |
| self-match-prevent | int | false | self match prevent. 0: no, means allowing self-trading; 1: yes, means not allowing self-trading |  | 0 |
| stop-price | string | false | Trigger price of stop limit order |  | NA |
| operator | string | false | operation charactor of stop price |  | NA |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status | "OK" or "Error" |
| data | long | false | order number |  |

Notes:

The returned data object is a single string which represents the order id

buy-limit-maker

If the order price is greater than or equal to the lowest selling price in the market, the order will be rejected.

If the order price is less than the lowest selling price in the market, the order will be accepted.

sell-limit-maker

If the order price is less than or equal to the highest buy price in the market, the order will be rejected.

If the order price is greater than the highest buy price in the market, the order will be accepted.

#### Request example

```
{
  "account-id": "100009",
  "amount": "10.1",
  "price": "100.1",
  "source": "spot-api",
  "symbol": "ethusdt",
  "type": "buy-limit",
  "client-order-id": "a0001"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": "356501383558845"
}
```

### /v1/order/batch-orders ( Place a Batch of Orders)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 50times/2s

Interface description: A batch contains at most 10 orders.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| \[{ account-id | string | false | The account id, refer to GET /v1/account/accounts. Use 'spot' account-id for spot trading, use 'margin' account-id for isolated margin trading, use ‘super-margin’  account-id for cross margin trading. use borrow account id for c2c margin trading |  | NA |
| symbol | string | false | The trading symbol, i.e. btcusdt, ethbtc...(Refer to GET /v1/common/symbols) |  | NA |
| type | string | false | The type of order, including 'buy-market', 'sell-market', 'buy-limit', 'sell-limit', 'buy-ioc', 'sell-ioc', 'buy-limit-maker', 'sell-limit-maker' (refer to detail below), 'buy-stop-limit', 'sell-stop-limit', buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok. |  | NA |
| amount | string | false | The order size (for buy market order, it's order value) |  | NA |
| price | string | false | The order price (not available for market order) |  | NA |
| source | string | false | When trade with spot use 'spot-api';When trade with margin use 'margin-api'; When trade with super-margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api' |  | spot-api |
| client-order-id | string | false | Client order ID |  | NA |
| self-match-prevent | int | false | self match prevent. 0: no, means allowing self-trading; 1: yes, means not allowing self-trading |  | 0 |
| stop-price | string | false | Trigger price of stop limit order |  | NA |
| operator}\] | string | false | Operation character of stop price, use 'gte' for greater than and equal (>=), use 'lte' for less than and equal (<=) |  | NA |

Notes:

buy-limit-maker

If the order price is greater than or equal to the lowest selling price in the market, the order will be rejected.

If the order price is less than the lowest selling price in the market, the order will be accepted.

sell-limit-maker

If the order price is less than or equal to the highest buy price in the market, the order will be rejected.

If the order price is greater than the highest buy price in the market, the order will be accepted.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| order-id | long | false | The order id |  |
| client-order-id | string | false | The client order id (if available) |  |
| err-code | string | false | The error code (only for rejected order) |  |
| err-msg | string | false | The error message (only for rejected order) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
[
  {
    "account-id": "13496526",
    "symbol": "adausdt",
    "type": "buy-limit-maker",
    "amount": "5",
    "price": "1",
    "source": "spot-api",
    "client-order-id": "2345"
  },
  {
    "account-id": "13496526",
    "symbol": "adausdt",
    "type": "buy-limit-maker",
    "amount": "4",
    "price": "1",
    "source": "spot-api",
    "client-order-id": "23456"
  }
]
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "order-id": 361560582529749,
      "client-order-id": "2345"
    },
    {
      "client-order-id": "23456",
      "err-code": "order-value-min-error",
      "err-msg": "Order total cannot be lower than: 5 USDT"
    }
  ]
}
```

### /v1/order/auto/place (Margin Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: Margin orders are automatically borrowed to place orders or repay.Sub-accounts are not currently supported for automatic borrowing and automatic repayment.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | The trading symbol to trade |  |  |
| account-id | string | true | The account id used for this trade |  |  |
| amount | string | false | Order transaction volume (market buy order is the order transaction amount); for market orders, you can only choose one of the two amounts, amount and market-amount, 0 means not to transmit; |  |  |
| market-amount | String | false | The market price order buy order is the order transaction volume, and the sell unit order transaction amount; amount and market-amount can only be selected from the two, 0 means not to be transmitted; |  |  |
| borrow-amount | string | false | The currency or quantity that needs to be borrowed (buying at market price represents the amount, and the rest represents the quantity) (borrowing needs to be uploaded). The maximum precision is 3 digits, if it exceeds, it will be rounded up. Such as: 6.12345 should pass 6.124 |  |  |
| type | string | true | buy-market, sell-market, buy-limit, sell-limit,, buy-stop-limit, sell-stop-limit | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc,buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |  |
| trade-purpose | string | true | Transaction purpose {1: automatic loan, 2: automatic repayment} |  |  |
| price | string | false | The order price (not available for market order) |  |  |
| stop-price | string | false | Trigger price of stop limit order |  |  |
| operator | string | false | operation charactor of stop price |  |  |
| source | string | true | When trade with spot use 'spot-api';When trade with isolated margin use 'margin-api'; When trade with cross margin use 'super-margin-api';When trade with c2c-margin use 'c2c-margin-api'; |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | Integer | true | code |  |
| success | Boolean | true |  |  |
| message | String | false |  |  |
| data | OrderResp | false |  |  |
| order-id | long | true | order id |  |

#### Request example

```
{
  "market-amount": "10",
  "account-id": 31253990,
  "source": "super-margin-web",
  "type": "buy-market",
  "symbol": "btcusdt",
  "trade-purpose": "2"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "order-id": 912928425935415
  },
  "message": null,
  "success": true
}
```

### /v1/order/orders/{order-id}/submitcancel ( Submit Cancel for an Order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: This endpoint submits a request to cancel an order. The actual result of the cancellation request needs to be checked by order status or match result endpoints after submitting the request.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | order id which needs to be filled in the path |  |  |
| symbol | string | false | symbol which needs to be filled in the URL |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status | "OK" or "Error" |
| data | long | false | cancel order number |  |

Notes:

The returned data object is a single string which represents the order id

#### Request example

```
{
  "order-id": "178211",
  "symbol": "btcusdt"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": "356501495694025"
}
```

### /v1/order/orders/submitCancelClientOrder ( Submit Cancel for an Order (based on client order ID))

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 100times/2s

Interface description: This endpoint submit a request to cancel an order based on client-order-id . It is suggested to use /v1/order/orders/{order-id}/submitcancel to cancel a single order, which is faster and more stable This only submits the cancel request, the actual result of the canel request needs to be checked by order status or match result endpoints

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| client-order-id | string | false | User-generated order number |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status | "OK" or "Error" |
| data | long | false | cancel order number |  |

#### Request example

```
{
  "client-order-id": "a0001"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 10
}
```

### v1/order/cancelAllOrders (Spot Cancel all orders)

Request type: GET

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 times/2s

Interface description: All spot orders can be cancelled through this interface.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to trade, you can use "," to separate batches, and if it is empty, all trading pairs will be cancelled. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |

#### Request example

```
{
  "symbol": "btcusdt"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok"
}
```

### /v1/order/openOrders ( Get All Open Orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns all open orders which have not been filled completely.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | NA | Refer to GET /v1/account/accounts | The account id used for this trade |
| symbol | string | false | NA | Refer to GET /v1/common/symbols | The trading symbol to trade |
| side | string | false | NA | buy, sell | Filter on the direction of the trade |
| types | string | false |  |  | Query a combination of order types, separated by commas |
| from | string | false | NA |  | start order ID the searching to begin with |
| direct | string | false | NA | prev - in ascending order from the start order ID; next - in descending order from the start order ID | searching direction |
| size | int | false | 100 | \[1, 500\] | The number of orders to return |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| id | long | false | Order id |  |
| client-order-id | string | false | Client order id |  |
| symbol | string | false | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| price | string | false | The limit price of limit order |  |
| created-at | long | false | The timestamp in milliseconds when the order was created |  |
| type | string | false | All possible order type (refer to introduction in this section) |  |
| filled-amount | string | false | The amount which has been filled |  |
| filled-cash-amount | string | false | The filled total in quote currency |  |
| filled-fees | string | false | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| source | string | false | The source where the order was triggered, possible values: sys, web, api, app |  |
| state | string | false | Order status, valid values: created, submitted, partial-filled |  |
| stop-price | string | false | Stop-loss orders trigger prices |  |
| operator | string | false | Stop profit stop loss order trigger price operator |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/openOrders?account-id=100009&symbol=ethusdt&side=buy" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "apnusdt",
      "source": "web",
      "price": "1.555550000000000000",
      "created-at": 1630633835224,
      "amount": "572.330000000000000000",
      "account-id": 13496526,
      "filled-cash-amount": "0.0",
      "client-order-id": "",
      "filled-amount": "0.0",
      "filled-fees": "0.0",
      "id": 357630527817871,
      "state": "submitted",
      "type": "sell-limit"
    }
  ]
}
```

### /v1/order/orders/batchCancelOpenOrders ( Submit Cancel for Multiple Orders by Criteria)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 50times/2s

Interface description: This endpoint submit cancellation for multiple orders (not exceeding 100 orders per request) at once with given criteria. This endpoint only submit the cancellation request, the actual cancellation result will need to be confirmed by other endpoints like order status, matchresult, etc.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | The account id used for this cancel | Refer to GET /v1/account/accounts | NA |
| symbol | string | false | The trading symbol list (maximum 10 symbols, separated by comma, default value all symbols) | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols | all |
| types | string | false | One or more types of order to include in the search, use comma to separate. | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok | NA |
| side | string | false | Filter on the direction of the trade | buy, sell | NA |
| size | int | false | The number of orders to cancel | \[1, 100\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| success-count | int | false | The number of cancel request sent successfully |  |
| failed-count | int | false | The number of cancel request failed |  |
| next-id | long | false | the next order id that can be cancelled, -1 indicates no open orders |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "account-id": "178211",
  "symbol": "btcusdt",
  "types": "buy-limite",
  "side": "buy",
  "size": 100
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "success-count": 2,
    "failed-count": 0,
    "next-id": 5454600
  }
}
```

### /v1/order/orders/batchcancel ( Submit Cancel for Multiple Orders by IDs)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 50times/2s

Interface description: This endpoint submit cancellation for multiple orders at once with given ids. It is suggested to use order-ids instead of client-order-ids, so that the cancellation is faster, more accurate and more stable.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-ids | string | false | The order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request). It is suggest to use order-ids rather than client-order-ids, the former is faster and more stable |  | No more than 50 orders per request |
| client-order-ids | string | false | The client order ids to cancel (Either order-ids or client-order-ids can be filled in one batch request), it must exist already, otherwise it is not allowed to use when placing a new order |  | No more than 50 orders per request |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| success | array | false |  |  |
| FAILED\_START | object | false |  |  |
| order-id | string | false |  |  |
| client-order-id | string | false |  |  |
| err-code | string | false |  |  |
| err-msg | string | false |  |  |
| order-state | string | false |  |  |
| FAILED\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "client-order-ids": [
    "12345",
    "123456"
  ]
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "success": [
      "12345"
    ],
    "failed": [
      {
        "err-msg": "Incorrect order state",
        "order-state": "7",
        "order-id": "357631450723117",
        "err-code": "order-orderstate-error",
        "client-order-id": "123456"
      }
    ]
  }
}
```

### /v2/algo-orders/cancel-all-after (Dead man’s switch)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: The Dead man’s switch protects the user’s assets when the connection to the exchange is lost due to network or system errors. Turn on/off the Dead man’s switch. If the Dead man’s switch is turned on and the API call isn’t sent twice within the set time, the platform will cancel all of your orders on the spot market（a maximum cancellation of 500 orders）.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| timeout | int | false |  | 0 or >=5 seconds | time out duration (unit：second); see notes for details |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | status code |  |
| message | string | false | error description (if any) |  |
| DATA\_START | object | false |  |  |
| currentTime | long | false | current time |  |
| triggerTime | long | false | trigger time |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "timeout": 10
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "message": "success",
  "data": {
    "currentTime": 1630491627230,
    "triggerTime": 1630491637230
  }
}
```

### /v1/order/orders/{order-id} ( Get the Order Detail of an Order)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns the detail of a specific order. If an order is created via API, then it's no longer queryable after being cancelled for 2 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | order id when order was created. Place it within path |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true |  |  |
| DATA\_START | object | true |  |  |
| id | long | true | order id |  |
| client-order-id | string | true | User-generated order number |  |
| symbol | long | true | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| account-id | long | true | The account id which this order belongs to |  |
| amount | string | true | The amount of base currency in this order |  |
| price | string | true | The limit price of limit order |  |
| created-at | string | true | The timestamp in milliseconds when the order was created |  |
| finished-at | long | true | The timestamp in milliseconds when the order was changed to a final state. This is not the time the order is matched. |  |
| canceled-at | long | true | The timestamp in milliseconds when the order was canceled, if not canceled then has value of 0 |  |
| type | string | true | All possible order type (refer to introduction in this section) | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |
| field-amount | string | true | The amount which has been filled |  |
| field-cash-amount | string | true | The filled total in quote currency |  |
| field-fees | string | true | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| source | string | true | All possible order source (refer to introduction in this section) | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys" |
| canceled-source | string | true | canceled source | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self\_match\_prevent"、"market"、"fok"、"ioc"、 "limit\_maker" |
| state | string | true | All possible order state (refer to introduction in this section) | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn |
| stop-price | string | true | trigger price of stop limit order |  |
| operator | string | true | operation character of stop price: gte, lte |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/orders/{order-id} `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "id": 357632718898331,
    "symbol": "adausdt",
    "account-id": 13496526,
    "client-order-id": "23456",
    "amount": "5.000000000000000000",
    "price": "1.000000000000000000",
    "created-at": 1630649406687,
    "type": "buy-limit-maker",
    "field-amount": "0.0",
    "field-cash-amount": "0.0",
    "field-fees": "0.0",
    "finished-at": 0,
    "source": "spot-api",
    "state": "submitted",
    "canceled-at": 0
  }
}
```

### /v1/order/orders/getClientOrder ( Get the Order Detail of an Order (based on client order ID))

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This interface returns the latest status and details of the order with the specified user-created order number.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| clientOrderId | string | false | Client order ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status |  |
| DATA\_START | object | true |  |  |
| id | long | true | order id |  |
| client-order-id | string | true | Client order id |  |
| symbol | long | true | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| account-id | long | true | The account id which this order belongs to |  |
| amount | string | true | The amount of base currency in this order |  |
| price | string | true | The limit price of limit order |  |
| created-at | string | true | The timestamp in milliseconds when the order was created |  |
| finished-at | long | true | The timestamp in milliseconds when the order was changed to a final state. This is not the time the order is matched. |  |
| canceled-at | long | true | The timestamp in milliseconds when the order was canceled, if not canceled then has value of 0 |  |
| type | string | true | All possible order type (refer to introduction in this section) | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |
| field-amount | string | true | The amount which has been filled |  |
| field-cash-amount | string | true | The filled total in quote currency |  |
| field-fees | string | true | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| source | string | true | All possible order source (refer to introduction in this section) | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys" |
| canceled-source | string | true | canceled source | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self\_match\_prevent"、"market"、"fok"、"ioc"、 "limit\_maker" |
| state | string | true | All possible order state (refer to introduction in this section) | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn |
| stop-price | string | true | trigger price of stop limit order |  |
| operator | string | true | operation character of stop price |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/orders/getClientOrder?clientOrderId=xxxxxxxx" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "id": 357632718898331,
    "symbol": "adausdt",
    "account-id": 13496526,
    "client-order-id": "23456",
    "amount": "5.000000000000000000",
    "price": "1.000000000000000000",
    "created-at": 1630649406687,
    "type": "buy-limit-maker",
    "field-amount": "0.0",
    "field-cash-amount": "0.0",
    "field-fees": "0.0",
    "finished-at": 0,
    "source": "spot-api",
    "state": "submitted",
    "canceled-at": 0
  }
}
```

### /v1/order/orders/{order-id}/matchresults ( Get the Match Result of an Order)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns the match result of an order.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | Order ID, place it into path |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| id | long | false | Internal id |  |
| symbol | string | false | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| order-id | string | false | The order id of this order |  |
| match-id | string | false | The match id of this match |  |
| trade-id | long | false | Unique trade ID (NEW) |  |
| price | long | false | filled price |  |
| created-at | long | false | The timestamp in milliseconds when this record is created (slightly later than trade time) |  |
| type | integer | false | All possible order type (refer to introduction in this section) |  |
| filled-amount | string | false | The amount which has been filled |  |
| filled-fees | string | false | Transaction fee (positive value). If maker rebate applicable, revert maker rebate value per trade (negative value). | When "fee-deduct-state" = "done", it represents the final state |
| fee-currency | string | false | Currency of transaction fee or transaction fee rebate (transaction fee of buy order is based on base currency, transaction fee of sell order is based on quote currency; transaction fee rebate of buy order is based on quote currency, transaction fee rebate of sell order is based on base currency) |  |
| source | string | false | All possible order source (refer to introduction in this section) | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |
| role | string | false | the role in the transaction: taker or maker |  |
| filled-points | string | false | deduction amount (unit: in htx or hbpoint) |  |
| fee-deduct-currency | string | false | deduction type. if blank, the transaction fee is based on original currency; if showing value as "ht", the transaction fee is deducted by HT; if showing value as "hbpoint", the transaction fee is deducted by HB point. |  |
| fee-deduct-state | string | false | Fee deduction status，In deduction：ongoing，Deduction completed：done |  |
| DATA\_END |  | false |  |  |

Notes:

The calculated maker rebate value inside ‘filled-fees’ would not be paid immediately.

#### Request example

`curl"https://api.huobi.pro/v1/order/orders/{order-id}/matchresults `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "polyusdt",
      "fee-currency": "poly",
      "source": "spot-web",
      "order-id": 345487249132375,
      "price": "0.338",
      "created-at": 1629443051839,
      "role": "taker",
      "match-id": 5014,
      "filled-amount": "147.928994082840236",
      "filled-fees": "0",
      "filled-points": "0.1",
      "fee-deduct-currency": "hbpoint",
      "fee-deduct-state": "done",
      "trade-id": 1085,
      "id": 313288753120940,
      "type": "buy-market"
    }
  ]
}
```

### /v1/order/orders ( Search Past Orders)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50times/2s

Interface description: This endpoint returns orders based on a specific searching criteria. The order created via API will no longer be queryable after being cancelled for more than 2 hours. If the user does not fill in the start-time and end-time any parameters, the server will return the historical orders from near to far \[now, now - 48 hours\]. If the user fills in the start-time but does not fill in the end-time parameter, the server will return the historical order from near to far \[start-time + 48 hours, start-time\]. If the user does not fill in the start-time but fills in the end-time parameter, the server will return the historical order from near to far \[end-time, end-time - 48 hours\]. If the user fills in both start-time and end-time parameters, the server will return historical orders from near to far \[end-time, start-time\]. The maximum range of each query is 48 hours, and the last 180 days data can be queried continuously.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | true | All supported trading symbols, e.g. btcusdt, bccbtc | The trading symbol | NA |
| types | string | false | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok | One or more types of order to include in the search, use comma to separate. | NA |
| start-time | long | false | Value range \[((end-time) – 48h), (end-time)\], maximum query window size is 48 hours, query window shift should be within past 180 days, query window shift should be within past 2 hours for cancelled order (state = "canceled") | Search starts time, UTC time in millisecond | \-48h |
| end-time | long | false | Value range \[(present-179d), present\], maximum query window size is 48 hours, query window shift should be within past 180 days, queriable range should be within past 2 hours for cancelled order (state = "canceled") | Search ends time, UTC time in millisecond | present |
| states | string | true | filled, partial-canceled, canceled | One or more states of order to include in the search, use comma to separate. | NA |
| from | string | false | NA | Search order id to begin with | NA |
| direct | string | false | next, prev | Search direction when 'from' is used | both |
| size | string | false | \[1-100\] | The number of orders to return | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| id | long | false | Order id |  |
| client-order-id | string | false | User-generated order number |  |
| account-id | long | false | Account id |  |
| amount | long | false | The amount of base currency in this order |  |
| symbol | string | false | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| price | string | false | The limit price of limit order |  |
| created-at | string | false | The timestamp in milliseconds when the order was created |  |
| canceled-at | long | false | The timestamp in milliseconds when the order was canceled, or 0 if not canceled |  |
| finished-at | long | false | The timestamp in milliseconds when the order was finished, or 0 if not finished |  |
| type | string | false | All possible order type (refer to introduction in this section) | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-stop-limit, sell-stop-limit, buy-limit-fok, sell-limit-fok, buy-stop-limit-fok, sell-stop-limit-fok |
| field-amount | string | false | The amount which has been filled |  |
| field-cash-amount | string | false | The filled total in quote currency |  |
| field-fees | string | false | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| source | string | false | All possible order source (refer to introduction in this section) | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys" |
| state | string | false | filled, partial-canceled, canceled | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn |
| stop-price | string | false | trigger price of stop limit order |  |
| operator | string | false | operation character of stop price |  |
| role | string | true | Order transaction direction If the order is a taker transaction, role returns the taker enumeration If the order is a maker transaction, role returns the maker enumeration If the order is both a taker transaction and a maker achievement, role returns the taker, maker enumeration | taker or maker or both |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/orders" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "id": 345487249132375,
      "symbol": "polyusdt",
      "account-id": 13496526,
      "client-order-id": "",
      "amount": "50.000000000000000000",
      "price": "0.0",
      "created-at": 1629443051822,
      "type": "buy-market",
      "field-amount": "147.928994082840236000",
      "field-cash-amount": "49.999999999999999768",
      "field-fees": "0.295857988165680472",
      "finished-at": 1629443051838,
      "source": "spot-web",
      "state": "filled",
      "canceled-at": 0
    }
  ]
}
```

### /v1/order/history ( Search Historical Orders within 48 Hours)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns orders based on a specific searching criteria. The orders created via API will no longer be queryable after being cancelled for more than 2 hours.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol |  | false | The trading symbol to trade | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols |  |
| start-time |  | false | Start time (included) | UTC time in millisecond | The time 48 hours ago |
| end-time |  | false | End time (included) | UTC time in millisecond | The query time |
| direct |  | false | Direction of the query. (Note: If the total number of items in the search result is within the limitation defined in "size", this field does not take effect.) | prev, next | next |
| size |  | false | Number of items in each response | \[10-1000\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status |  | true | status |  |
| DATA\_START |  | true |  |  |
| {account-id | string | true | Account ID |  |
| amount | string | true | Order size |  |
| canceled-at | string | true | Order cancellation time |  |
| created-at | string | true | Order creation time |  |
| field-amount | string | true | Executed order amount |  |
| field-cash-amount | string | true | Executed cash amount |  |
| field-fees | string | true | Transaction fee (Accurate fees refer to matchresults endpoint) |  |
| finished-at | string | true | Last trade time |  |
| id | string | true | Order ID |  |
| client-order-id | string | true | User-generated order number |  |
| price | string | false | Order price |  |
| source | string | false | All possible order source (refer to introduction in this section) |  |
| canceled-source | string | true | canceled source | "timeout-canceled-order"、"cross-margin-fl-sys"、"isolated-margin-fl-sys"、"coin-listing-delisting"、"api"、"user-actively-cancels-order-web"、"user-actively-cancels-order-ios"、"user-actively-cancels-order-android"、"admin"、"grid-end"、"system-manually-cancels-order"、"circuit"、"self\_match\_prevent"、"market"、"fok"、"ioc"、 "limit\_maker" |
| state | string | true | Order status ( filled, partial-canceled, canceled ) |  |
| symbol | string | true | Trading symbol |  |
| stop-price | string | true | trigger price of stop limit order |  |
| operator | string | true | operation character of stop price. e.g. get, lte |  |
| type | string | true | All possible order type (refer to introduction in this section) |  |
| next-time | string | true | Next query "start-time" (in response of "direct" = prev), Next query "end-time" (in response of "direct" = next). Note: Only when the total number of items in the search result exceeded the limitation defined in "size", this field exists. UTC time in millisecond. |  |
| role | string | true | Order transaction direction If the order is a taker transaction, role returns the taker enumeration If the order is a maker transaction, role returns the maker enumeration If the order is both a taker transaction and a maker achievement, role returns the taker, maker enumeration | taker or maker or both |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/order/history?symbol=btcusdi" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "id": 357632718898331,
      "symbol": "adausdt",
      "account-id": 13496526,
      "client-order-id": "23456",
      "amount": "5.000000000000000000",
      "price": "1.000000000000000000",
      "created-at": 1630649406687,
      "type": "buy-limit-maker",
      "field-amount": "0.0",
      "field-cash-amount": "0.0",
      "field-fees": "0.0",
      "finished-at": 0,
      "source": "spot-api",
      "state": "submitted",
      "canceled-at": 0
    },
    {
      "id": 357632718898330,
      "symbol": "adausdt",
      "account-id": 13496526,
      "client-order-id": "2345",
      "amount": "5.000000000000000000",
      "price": "1.000000000000000000",
      "created-at": 1630649406687,
      "type": "buy-limit-maker",
      "field-amount": "0.0",
      "field-cash-amount": "0.0",
      "field-fees": "0.0",
      "finished-at": 0,
      "source": "spot-api",
      "state": "submitted",
      "canceled-at": 0
    }
  ]
}
```

### /v1/order/matchresults ( Search Match Results)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns the match results of past and current filled, or partially filled orders based on specific search criteria.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to trade | All supported trading symbol, e.g. btcusdt, bccbtc.Refer to GET /v1/common/symbols | N/A |
| types | string | false | The types of order to include in the search | buy-market, sell-market, buy-limit, sell-limit, buy-ioc, sell-ioc, buy-limit-maker, sell-limit-maker, buy-stop-limit, sell-stop-limit | all |
| start-time | long | false | ((end-time) – 48hour) | \[((end-time) – 48hour), (end-time)\] | Far point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| end-time | long | false | current-time | \[(current-time) – 120days,(current-time)\] | Near point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| from | string | false | Search internal id to begin with | if search next page, then this should be the last id (not trade-id) of last page; if search previous page, then this should be the first id (not trade-id) of last page | N/A |
| direct | string | false | Search direction when 'from' is used | next, prev | next |
| size | string | false | The number of orders to return | \[1-500\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | status |  |
| DATA\_START | object | true |  |  |
| id | long | true | Record id, non sequential, it can be used in "from" field for next request |  |
| symbol | string | true | The trading symbol to trade, e.g. btcusdt, bccbtc |  |
| order-id | long | true | The order id of this order |  |
| match-id | long | true | The match id of this match |  |
| trade-id | integer | true | Unique trade ID |  |
| price | string | true | The limit price of limit order |  |
| created-at | long | true | The timestamp in milliseconds when this record is created |  |
| type | string | true | All possible order type (refer to introduction in this section) | created：Created，submitted : The order is waiting for transaction，partial-filled : Partial deal，filled : Closed the deal，partial-canceled :Partial cancellation of transaction，canceling :Undo in process，canceled : Have been withdrawn |
| filled-amount | string | true | The amount which has been filled |  |
| filled-fees | string | true | Transaction fee (positive value). If maker rebate applicable, revert maker rebate value per trade (negative value). | When "fee-deduct-state" = "done", it represents the final state |
| fee-currency | string | true | Currency of transaction fee or transaction fee rebate (transaction fee of buy order is based on base currency, transaction fee of sell order is based on quote currency; transaction fee rebate of buy order is based on quote currency, transaction fee rebate of sell order is based on base currency) |  |
| source | string | true | All possible order source (refer to introduction in this section) | "sys","web","api","app","fl-sys","fl-mgt","spot-stop","margin-stop","super-margin-stop","grid-trading-sys" |
| role | string | true | The role in the transaction: taker or maker. |  |
| filled-points | string | true | deduction amount (unit: in htx or hbpoint) |  |
| fee-deduct-currency | string | true | deduction type: ht or hbpoint. |  |
| fee-deduct-state | string | true | Fee deduction status，In deduction：ongoing，Deduction completed：done |  |
| DATA\_END |  | false |  |  |

Notes:

The calculated maker rebate value inside ‘filled-fees’ would not be paid immediately.

#### Request example

`curl"https://api.huobi.pro/v1/order/matchresults?symbol=btcusdi" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "polyusdt",
      "fee-currency": "poly",
      "source": "spot-web",
      "price": "0.338",
      "created-at": 1629443051839,
      "role": "taker",
      "order-id": 345487249132375,
      "match-id": 5014,
      "trade-id": 1085,
      "filled-amount": "147.928994082840236",
      "filled-fees": "0",
      "filled-points": "0.1",
      "fee-deduct-currency": "hbpoint",
      "fee-deduct-state": "done",
      "id": 313288753120940,
      "type": "buy-market"
    }
  ]
}
```

### /v2/reference/transact-fee-rate ( Get Current Fee Rate Applied to The User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 50 times / 2s

Interface description: Api users can query trading pair rates. They are limited to checking up to 10 trading pairs at a time. The rates for sub-users are the same as those for parent users.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbols | string | true | The trading symbols to query, separated by comma | btcusdt, ethbtc... |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false |  |  |
| message | string | false |  |  |
| DATA\_START | object | false |  |  |
| symbol | string | false | symbol |  |
| makerFeeRate | string | false | Basic rate - passive party, if transaction fee rebate is applicable, return rebate rate (negative value) |  |
| takerFeeRate | string | false | Base Rate - Active Party |  |
| actualMakerRate | string | false | Rate after deduction - Passive party, if deduction is not applicable or deduction is not enabled, the base rate will be returned; if transaction fee rebate is applicable, the rebate rate will be returned (negative value) |  |
| actualTakerRate | string | false | Rate after deduction – the active party, if the deduction is not applicable or the deduction is not enabled, the base rate will be returned |  |
| DATA\_END |  | false |  |  |

Notes:

\- If makerFeeRate/actualMakerRate is positive，this field means the transaction fee rate. - If makerFeeRate/actualMakerRate is negative, this field means the rebate fee rate.

#### Request example

`curl"https://api.huobi.pro/v2/reference/transact-fee-rate?symbols=btcusdt" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "symbol": "btcusdt",
      "actualMakerRate": "0.002",
      "actualTakerRate": "0.002",
      "takerFeeRate": "0.002",
      "makerFeeRate": "0.002"
    },
    {
      "symbol": "apnusdt",
      "actualMakerRate": "0.002",
      "actualTakerRate": "0.002",
      "takerFeeRate": "0.002",
      "makerFeeRate": "0.002"
    },
    {
      "symbol": "htusdt",
      "actualMakerRate": "0.002",
      "actualTakerRate": "0.002",
      "takerFeeRate": "0.002",
      "makerFeeRate": "0.002"
    }
  ],
  "success": true
}
```

### /v2/algo-orders (Place a conditional order)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 20times/2sec

Interface description: Conditional order can be only placed via this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | integer | false | Account ID | At present only support spot account id, margin account id, super-margin account. C2C margin account id is not supported at this point of time. |  |
| symbol | string | false | Trading symbol |  |  |
| orderPrice | string | false | Order price (invalid for market order) |  |  |
| orderSide | string | false | Order side | buy,sell |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |  |
| timeInForce | string | false | Time in force | gtc (invalid for orderType=market), boc (invalid for orderType=market), ioc, fok (invalid for orderType=market) | gtc for orderType=limit; ioc for orderType=market |
| orderType | string | false | Order type | limit,market |  |
| clientOrderId | string | false | Client order ID (max length 64-char) |  |  |
| stopPrice | string | false | Stop price |  |  |
| trailingRate | string | false | Trailing rate (only valid for trailing stop order) | \[0.001-0.050\] |  |

Notes:

• The gap between orderPrice and stopPrice shouldn't exceed the price limit ratio. For example, a limit buy order's price couldn't be higher than 110% of market price, this limitation should be also applicable to orderPrice/stopPrice ratio.

• User has to make sure the clientOrderId's uniqueness. While the conditional order being triggered, if the clientOrderId is duplicated with another order (within 24hour) coming from same user, the conditional order will fail triggering.

• User has to make sure the corresponding account has sufficient fund for triggering this conditional order, otherwise it would cause conditional order triggering failure.

• timeInForce enum values: gtc - good till cancel，boc - book or cancel (also called as post only, or book only), ioc - immediate or cancel, fok - fill or kill

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| clientOrderId | string | false | Client order ID |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "accountId": 178211,
  "symbol": "178211",
  "orderPrice": "178211",
  "orderSide": "178211",
  "orderSize": "178211",
  "orderValue": "178211",
  "timeInForce": "178211",
  "orderType": "178211",
  "clientOrderId": "178211",
  "stopPrice": "178211",
  "trailingRate": "178211"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "clientOrderId": "a001"
  }
}
```

### /v2/algo-orders/cancellation (Cancel conditional orders (before triggering))

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 20times/2sec

Interface description: This endpoint only supports order cancellation for those conditional orders which have not triggered yet. To cancel a triggered order, please refer to the endpoints in "Trading" section. Before a conditional order triggering, it can be only cancelled via this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| clientOrderIds | string | false | Client order ID (maximum 50 orders are allowed, Transfer in the form of as array) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| accepted | string\[\] | false | Accepted clientOrderId list |  |
| rejected | string\[\] | false | Rejected clientOrderId list |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "clientOrderIds": [
    "zy0002",
    "zy0003"
  ]
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "accepted": [
      "zy0002",
      "zy0003"
    ],
    "rejected": []
  }
}
```

### /v2/algo-orders/opening ( Query open conditional orders (before triggering))

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: Search by orderOrigTime This endpoint only returns those conditional orders which have not triggered with orderStatus value as created. Before a conditional order triggering, it can be queried out through this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | integer | false | Account ID |  |  |
| symbol | string | false | Trading symbol |  |  |
| orderSide | string | false | Order side | buy,sell |  |
| orderType | string | false | Order type | limit,market |  |
| sort | string | false | Sorting order | asc, desc | desc |
| limit | integer | false | Maximum number of items in one page | \[1,500\] | 100 |
| fromId | long | false | First record ID in this query (only valid for next page querying) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | In ascening/descending order defined in 'sort' |  |
| accountId | integer | false | Account ID |  |
| source | string | false | Order source (api,web,ios,android,mac,windows,sys) |  |
| clientOrderId | string | false | Client order ID |  |
| symbol | string | false | Trading symbol |  |
| orderPrice | string | false | Order price (invalid for market order) |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |
| orderSide | string | false | Order side |  |
| timeInForce | string | false | Time in force |  |
| orderType | string | false | Order type |  |
| stopPrice | string | false | Stop price |  |
| trailingRate | string | false | Trailing rate (only valid for trailing stop order) |  |
| orderOrigTime | long | false | Order original time |  |
| lastActTime | long | false | Order last activity time |  |
| orderStatus | string | false | Order status (created) |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/algo-orders/opening?accountId=xxx&symbol=xxxx&orderSide=xxx&orderType=xxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "lastActTime": 1630657250326,
      "orderOrigTime": 1630657250238,
      "symbol": "adausdt",
      "source": "api",
      "clientOrderId": "123",
      "orderSide": "buy",
      "orderType": "limit",
      "orderPrice": "0.1",
      "orderSize": "100",
      "accountId": 13496526,
      "timeInForce": "gtc",
      "stopPrice": "0.1",
      "orderStatus": "created"
    },
    {
      "lastActTime": 1630657243576,
      "orderOrigTime": 1630657243534,
      "symbol": "adausdt",
      "source": "api",
      "clientOrderId": "12",
      "orderSide": "buy",
      "orderType": "limit",
      "orderPrice": "0.1",
      "orderSize": "100",
      "accountId": 13496526,
      "timeInForce": "gtc",
      "stopPrice": "0.1",
      "orderStatus": "created"
    }
  ]
}
```

### /v2/algo-orders/history (Query conditional order history)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: Search by orderOrigTime This endpoint only returns those conditional orders which have been cancelled before triggering (orderStatus=canceled), or which have failed to trigger (orderStatus=rejected), or which have successfully triggered (orderStatus=triggered). To further query the latest status of a successfully triggered conditonal order, please refer to the endpoints in "Trading" section. The cancelled conditional order before triggering, as well as the conditional order failed to trigger, can be queried out through this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | integer | false | Account ID |  |  |
| symbol | string | false | Trading symbol |  |  |
| orderSide | string | false | Order side | buy,sell |  |
| orderType | string | false | Order type | limit,market |  |
| orderStatus | string | false | Order status | canceled,rejected,triggered |  |
| startTime | long | false | Farthest time |  | current time |
| endTime | long | false | Nearest time |  | desc |
| sort | string | false | Sorting order | asc, desc | 100 |
| limit | integer | false | Maximum number of items in one page | \[1-500\] |  |
| fromId | long | false | First record ID in this query (only valid for next page querying) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | In ascening/descending order defined in 'sort' |  |
| accountId | integer | false | Account ID |  |
| source | string | false | Order source |  |
| clientOrderId | string | false | Client order ID |  |
| orderId | string | false | Order ID (only valid for orderStatus=triggered) |  |
| symbol | string | false | Trading symbol |  |
| orderPrice | string | false | Order price (invalid for market order) |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |
| orderSide | string | false | Order side |  |
| timeInForce | string | false | Time in force |  |
| orderType | string | false | Order type |  |
| stopPrice | string | false | Stop price |  |
| trailingRate | string | false | Trailing rate (only valid for trailing stop order) |  |
| orderOrigTime | long | false | Order original time |  |
| lastActTime | long | false | Order last activity time |  |
| orderCreateTime | long | false | Order trigger time (only valid for orderStatus=triggered) |  |
| orderStatus | string | false | Order status (triggered,canceled,rejected) |  |
| errCode | integer | false | Status code in case of order triggering failure (only valid for orderStatus=rejected) |  |
| errMessage | string | false | Error message in case of order triggering failure (only valid for orderStatus=rejected) |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/algo-orders/history?accountId=xxxx&symbol=xxxx&orderSide=xxx&orderType=limite&orderStatus=canceled" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "orderOrigTime": 1630656758442,
      "lastActTime": 1630656880512,
      "symbol": "adausdt",
      "source": "api",
      "clientOrderId": "1234567",
      "orderSide": "buy",
      "orderType": "limit",
      "orderPrice": "0.1",
      "orderSize": "100",
      "accountId": 13496526,
      "timeInForce": "gtc",
      "stopPrice": "0.1",
      "orderStatus": "canceled"
    }
  ],
  "nextId": 9585084
}
```

### /v2/algo-orders/specific ( Query a specific conditional order)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: Search by orderOrigTime To further query the latest status of a successfully triggered conditonal order, please refer to the endpoints in "Trading" section. The conditional order before triggering, as well as the conditional order failed to trigger, can be queried out through this endpoint instead of any endpoint in "Trading" section.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| clientOrderId | string | false | Client order ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| accountId | integer | false | Account ID |  |
| source | string | false | Order source |  |
| clientOrderId | string | false | Client order ID |  |
| orderId | string | false | Order ID (only valid for orderStatus=triggered) |  |
| symbol | string | false | Trading symbol |  |
| orderPrice | string | false | Order price (invalid for market order) |  |
| orderSize | string | false | Order size (invalid for market buy order) |  |
| orderValue | string | false | Order value (only valid for market buy order) |  |
| orderSide | string | false | Order side |  |
| timeInForce | string | false | Time in force |  |
| orderType | string | false | Order type |  |
| stopPrice | string | false | Stop price |  |
| trailingRate | string | false | Trailing rate (only valid for trailing stop order) |  |
| orderOrigTime | long | false | Order original time |  |
| lastActTime | long | false | Order last activity time |  |
| orderCreateTime | long | false | Order trigger time (only valid for orderStatus=triggered) |  |
| orderStatus | string | false | Order status (created,triggered,canceled,rejected) |  |
| errCode | integer | false | Status code in case of order triggering failure (only valid for orderStatus=rejected) |  |
| errMessage | string | false | Error message in case of order triggering failure (only valid for orderStatus=rejected) |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/algo-orders/specific?clientOrderId=xxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "lastActTime": 1630656880512,
    "orderOrigTime": 1630656758442,
    "symbol": "adausdt",
    "source": "api",
    "orderStatus": "canceled",
    "clientOrderId": "1234567",
    "orderSide": "buy",
    "orderType": "limit",
    "orderPrice": "0.1",
    "orderSize": "100",
    "accountId": 13496526,
    "timeInForce": "gtc",
    "stopPrice": "0.1"
  }
}
```

### /v2/account/repayment ( Repay Margin Loan（Cross/Isolated ）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2/s

Interface description: Available Accounts: Main and Sub-Accounts While repaying the loan, loan interest will be paid first if there is no appointed transactId. Otherwise, currency will not be authenticated.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| accountId | string | false | repayment account ID |  |  |
| currency | string | false | repayment currency |  |  |
| amount | string | false | repayment amount |  |  |
| transactId | string | false | loan transaction ID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | status code |  |
| message | string | false | error description (if any) |  |
| DATA\_START | array | false |  |  |
| repayId | string | false | repayment ID |  |
| repayTime | long | false | repayment time (unix time in millisecond) |  |
| DATA\_END |  | false |  |  |

Notes:

Returning "repayId" doesn’t mean the repayment is 100% successful. Please check the transaction record to confirm the repayment status.

#### Request example

```
{
  "accountid": "1266826",
  "currency": "btc",
  "amount": "0.00800334",
  "transactId": "437"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "Data": [
    {
      "repayId": 1174424,
      "repayTime": 1600747722018
    }
  ]
}
```

### /v1/dw/transfer-in/margin (Transfer Asset from Spot Trading Account to Isolated Margin Account（Isolated）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint transfers specific asset from isolated margin account to spot trading account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol, e.g. btcusdt, bccbtc |  |  |
| currency | string | false | The currency to transfer |  |  |
| amount | string | false | The amount of currency to transfer |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | integer | false | Transfer id |  |
| status | string | false | status |  |
| code | integer | false | code |  |

#### Request example

```
{
  "symbol": "ethusdt",
  "currency": "eth",
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 46971504,
  "code": 200
}
```

### /v1/dw/transfer-out/margin ( Transfer Asset from Isolated Margin Account to Spot Trading Account（Isolated）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint transfers specific asset from isolated margin account to spot trading account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol, e.g. btcusdt, bccbtc |  |  |
| currency | string | false | The currency to transfer |  |  |
| amount | string | false | The amount of currency to transfer |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | integer | false | Transfer id |  |
| status | string | false | status |  |
| code | integer | false | code |  |

#### Request example

```
{
  "symbol": "ethusdt",
  "currency": "eth",
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 46971504,
  "code": 200
}
```

### /v1/margin/loan-info ( Get Loan Interest Rate and Quota（Isolated）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2sec

Interface description: The endpoint returns loan interest rates and quota applied on the user.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbols | string | false | Trading symbol (multiple pairs available, separated by comma) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| symbol | string | false | Trading symbol |  |
| CURRENCIES\_START | object | false |  |  |
| currency | string | false | Currency |  |
| interest-rate | string | false | Basic daily interest rate |  |
| min-loan-amt | string | false | Minimal loanable amount |  |
| max-loan-amt | string | false | Maximum loanable amount |  |
| loanable-amt | string | false | Remaining loanable amount |  |
| actual-rate | string | false | Actual interest rate (if deduction is inapplicable or disabled, return basic daily interest rate) |  |
| CURRENCIES\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/margin/loan-info?symbol=all" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "symbol": "btcusdt",
      "currencies": [
        {
          "currency": "btc",
          "interest-rate": "0.00098",
          "min-loan-amt": "0.020000000000000000",
          "max-loan-amt": "550.000000000000000000",
          "loanable-amt": "0.045696000000000000",
          "actual-rate": "0.00098"
        },
        {
          "currency": "usdt",
          "interest-rate": "0.00098",
          "min-loan-amt": "100.000000000000000000",
          "max-loan-amt": "4000000.000000000000000000",
          "loanable-amt": "400.000000000000000000",
          "actual-rate": "0.00098"
        }
      ]
    }
  ]
}
```

### /v1/margin/orders ( Request a Margin Loan（Isolated）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint places an order to apply a margin loan.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to borrow margin, e.g. btcusdt, bccbtc |  |  |
| currency | string | false | The currency to borrow |  |  |
| amount | string | false | The amount of currency to borrow (precision: 3 decimal places) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Status |  |
| data | integer | false | Margin order id |  |

#### Request example

```
{
  "symbol": "ethusdt",
  "currency": "eth",
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 1000
}
```

### /v1/margin/orders/{order-id}/repay ( Repay Margin Loan（Isolated）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint repays margin loan with your asset in your margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | The amount of currency to repay |  |  |
| amount | string | false | Loan order ID (written in url path) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | integer | false | Margin order id |  |

#### Request example

```
{
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "data": 1000
}
```

### /v1/margin/loan-orders ( Search Past Margin Orders（Isolated）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns margin orders based on a specific searching criteria.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| symbol | string | false | The trading symbol to trade | The trading symbol, e.g. btcusdt, bccbtc | NA |
| states | string | false | Order status list, multiple state allowed, separated by comma | created, accrual (loaned), cleared (paid), invalid, failed | NA |
| start-date | string | false | Search starts date, in format yyyy-mm-dd | NA | \-61d |
| end-date | string | false | Search ends date, in format yyyy-mm-dd | NA | today |
| from | string | false | Search order id to begin with | NA | NA |
| direct | string | false | Search direction when 'from' is used | next, prev | both |
| size | string | false | The number of orders to return | \[1, 100\] | 100 |
| sub-uid | int | false | Sub user ID (Required field while parent user querying sub user’s orders) |  | If not entered, by default it returns margin orders of current user |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| id | long | false | Order id |  |
| account-id | long | false | Account id |  |
| user-id | long | false | User id |  |
| symbol | string | false | The margin loan pair to trade, e.g. btcusdt, bccbtc |  |
| currency | string | false | The currency in the loan |  |
| created-at | string | false | The timestamp in milliseconds when the order was created |  |
| accrued-at | string | false | The timestamp in milliseconds when the last accure happened |  |
| loan-amount | string | false | The amount of the origin loan |  |
| loan-balance | string | false | The amount of the loan left |  |
| interest-rate | string | false | The loan interest rate |  |
| interest-amount | long | false | The accumulated loan interest |  |
| interest-balance | long | false | The amount of loan interest left |  |
| state | string | false | Loan state, possible values: created, accrual (loaned), cleared (paid), invalid, failed |  |
| paid-point | string | false | Paid HTX Points for repayment |  |
| paid-coin | string | false | Paid original cryptocurrency for repayment |  |
| deduct-rate | string | false | Deduction rate for repayment |  |
| deduct-currency | string | false | Deduction currency for repayment |  |
| deduct-amount | string | false | Deduction value for repayment |  |
| updated-at | long | false | Update time |  |
| hour-interest-rate | string | false | Hourly interest rate |  |
| day-interest-rate | string | false | Daily interest rate |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/margin/loan-orders?symbol=xxxxx" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "deduct-rate": "1",
      "created-at": 1595831651478,
      "updated-at": 1595832010845,
      "accrued-at": 1595831651478,
      "interest-amount": "0.004083000000000000",
      "loan-amount": "100.000000000000000000",
      "hour-interest-rate": "0.000040830000000000",
      "loan-balance": "0.000000000000000000",
      "interest-balance": "0.000000000000000000",
      "paid-coin": "0.004083000000000000",
      "day-interest-rate": "0.000980000000000000",
      "interest-rate": "0.000040830000000000",
      "user-id": 5574974,
      "account-id": 5463409,
      "currency": "usdt",
      "symbol": "btcusdt",
      "paid-point": "0.000000000000000000",
      "deduct-currency": "",
      "deduct-amount": "0",
      "id": 7839857,
      "state": "cleared"
    }
  ]
}
```

### /v1/margin/accounts/balance ( Get the Balance of the Margin Loan Account（Isolated）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the balance of the margin loan account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| ymbol | string | false | NA |  | The trading symbol, e.g. btcusdt.If this is empty, then 'transfer-out-available' and 'loan-available' balance type won't be returned |
| sub-uid | int | false | If not entered, by default it returns margin account details of current user |  | Sub user ID (Required field while parent user querying sub user’s margin account details) |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| DATA\_START | object | false | object |  |
| id | int | false | int |  |
| type | string | false | string |  |
| symbol | string | false | The margin loan pair, e.g. btcusdt, bccbtc |  |
| state | string | false | Loan state, possible values: created, accrual (loaned), cleared (paid), invalid |  |
| risk-rate | string | false | The risk rate |  |
| fl-type | string | false | safe,sell,buy |  |
| fl-price | string | false | The price which margin closeout was triggered |  |
| LIST\_START | array | false | The list of margin accounts and their details |  |
| currency | string | false | The currency name |  |
| type | string | false | The sub account type, possible values: trade, frozen, loan, interest ,transfer-out-available, loan-available |  |
| balance | string | false | The negative balance means the loan or interest that need to repay. All trade balance can be transferred out if transfer-out-available balance is -1 |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/margin/accounts/balance?symbol=xxxx&sub-uid=xxxx" `

#### Response Example

##### Success Example

```
{
  "data": [
    {
      "id": 18264,
      "type": "margin",
      "state": "working",
      "symbol": "btcusdt",
      "fl-price": "0",
      "fl-type": "safe",
      "risk-rate": "475.952571086994250554",
      "list": [
        {
          "currency": "btc",
          "type": "trade",
          "balance": "1168.533000000000000000"
        },
        {
          "currency": "btc",
          "type": "frozen",
          "balance": "0.000000000000000000"
        },
        {
          "currency": "btc",
          "type": "loan",
          "balance": "-2.433000000000000000"
        },
        {
          "currency": "btc",
          "type": "interest",
          "balance": "-0.000533000000000000"
        },
        {
          "currency": "btc",
          "type": "transfer-out-available",
          "balance": "1163.872174670000000000"
        },
        {
          "currency": "btc",
          "type": "loan-available",
          "balance": "8161.876538350676000000"
        }
      ]
    }
  ]
}
```

### /v1/cross-margin/transfer-in ( Transfer Asset from Spot Trading Account to Cross Margin Account（Cross）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint transfers specific asset from spot trading account to cross margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | Currency |  |  |
| amount | string | false | Transfer amount |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | integer | false | Transfer id |  |

#### Request example

```
{
  "currency": "eth",
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 1000
}
```

### /v1/cross-margin/transfer-out (Transfer Asset from Cross Margin Account to Spot Trading Account（Cross）)

Request type: POST

Signature verification: No

Interface permission: Trade

Interface description: This endpoint transfers specific asset from spot trading account to cross margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | Currency |  |  |
| amount | string | false | Transfer amount |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | integer | false | Transfer id |  |

#### Request example

```
{
  "currency": "eth",
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 1000
}
```

### /v1/cross-margin/loan-info ( Get Loan Interest Rate and Quota（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns loan interest rates and loan quota applied on the user.

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
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| currency | string | false | Currency |  |
| interest-rate | string | false | Basic daily interest rate |  |
| min-loan-amt | string | false | Minimal loanable amount |  |
| max-loan-amt | string | false | Maximum loanable amount |  |
| loanable-amt | string | false | Remaining loanable amount |  |
| actual-rate | string | false | Actual interest rate post deduction (if deduction is inapplicable or disabled, return basic daily interest rate) |  |
| DATA\_END |  | false |  |  |
| code | int | false | status code |  |

#### Request example

`curl"https://api.huobi.pro/v1/cross-margin/loan-info"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "currency": "bch",
      "interest-rate": "0.00098",
      "min-loan-amt": "0.35",
      "max-loan-amt": "3500",
      "loanable-amt": "0.70405181",
      "actual-rate": "0.000343"
    },
    {
      "currency": "btc",
      "interest-rate": "0.00098",
      "min-loan-amt": "0.01",
      "max-loan-amt": "100",
      "loanable-amt": "0.02281914",
      "actual-rate": "0.000343"
    },
    {
      "currency": "eos",
      "interest-rate": "0.00098",
      "min-loan-amt": "30",
      "max-loan-amt": "300000",
      "loanable-amt": "57.69175296",
      "actual-rate": "0.000343"
    },
    {
      "currency": "eth",
      "interest-rate": "0.00098",
      "min-loan-amt": "0.5",
      "max-loan-amt": "6000",
      "loanable-amt": "1.06712197",
      "actual-rate": "0.000343"
    },
    {
      "currency": "ltc",
      "interest-rate": "0.00098",
      "min-loan-amt": "1.5",
      "max-loan-amt": "15000",
      "loanable-amt": "3.28947368",
      "actual-rate": "0.000343"
    },
    {
      "currency": "usdt",
      "interest-rate": "0.00098",
      "min-loan-amt": "100",
      "max-loan-amt": "1500000",
      "loanable-amt": "200.00000000",
      "actual-rate": "0.000343"
    },
    {
      "currency": "xrp",
      "interest-rate": "0.00098",
      "min-loan-amt": "380",
      "max-loan-amt": "4000000",
      "loanable-amt": "734.21439060",
      "actual-rate": "0.000343"
    }
  ],
  "code": 200
}
```

### /v1/cross-margin/orders ( Request a Margin Loan（Cross）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint places an order to apply for a margin loan.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | The currency to borrow |  |  |
| amount | string | false | The amount of currency to borrow (precision: 3 decimal places) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status |  |
| data | integer | false | Margin order id |  |

#### Request example

```
{
  "currency": "eth",
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": 1000
}
```

### /v1/cross-margin/orders/{order-id}/repay ( Repay Margin Loan（Cross）)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint repays margin loan with you asset in your margin account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| order-id | string | false | Loan order ID (written in url path) |  |  |
| amount | string | false | The amount of currency to repay |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| tatus | string | false | status |  |
| data | null | false |  |  |

#### Request example

```
{
  "amount": "1.0"
}
```

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": null
}
```

### /v1/cross-margin/loan-orders ( Search Past Margin Orders（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns margin orders based on a specific searching criteria.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| start-date | string | false | Search starts date, in format yyyy-mm-dd | NA | \-61d |
| end-date | string | false | Search ends date, in format yyyy-mm-dd | NA | today |
| currency | string | false | Currency | NA | NA |
| state | string | false | Order status | created, accrual (loaned), cleared (paid), invalid | all |
| from | string | false | Search order id to begin with | NA | 0 |
| direct | string | false | Search direction when 'from' is used | next, prev | next |
| size | string | false | The number of orders to return | \[10-100\] | 10 |
| sub-uid | long | false | Sub user UID |  | If not specified, returns loan order list of current logged in user |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| id | long | false | Order id |  |
| account-id | long | false | Account id |  |
| user-id | long | false | User id |  |
| currency | string | false | The currency in the loan |  |
| filled-points | string | false | Point deduction amount |  |
| filled-ht | string | false | HT deduction amount |  |
| created-at | string | false | The timestamp in milliseconds when the order was created |  |
| accrued-at | string | false | The timestamp in milliseconds when the last accure happened |  |
| loan-amount | string | false | The amount of the origin loan |  |
| loan-balance | string | false | The amount of the loan left |  |
| interest-amount | long | false | The accumulated loan interest |  |
| interest-balance | long | false | The amount of loan interest left |  |
| state | string | false | Loan state, possible values: created, accrual (loaned), cleared (paid), invalid |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/cross-margin/loan-orders?start-date=xxxx&end-date=xxxxxx¤cy=xxxxxx&state=created&from=xxxx&direct=next&size=100&sub-uid=xxxxxx" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "loan-balance": "0.100000000000000000",
      "interest-balance": "0.000200000000000000",
      "loan-amount": "0.100000000000000000",
      "accrued-at": 1511169724531,
      "interest-amount": "0.000200000000000000",
      "filled-points": "0.2",
      "filled-ht": "0.2",
      "currency": "btc",
      "id": 394,
      "state": "accrual",
      "account-id": 17747,
      "user-id": 119913,
      "created-at": 1511169724531
    }
  ]
}
```

### /v1/cross-margin/accounts/balance ( Get the Balance of the Margin Loan Account（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns the balance of the margin loan account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub-uid | long | false | Sub user UID |  | If not specified, returns account balance of current logged in user |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  |  |
| DATA\_START | object | false |  |  |
| id | integer | false |  |  |
| type | integer | false |  |  |
| state | string | false | account state: working, fl-sys, fl-end, fl-negative |  |
| risk-rate | string | false |  |  |
| acct-balance-sum | string | false |  |  |
| debt-balance-sum | string | false |  |  |
| LIST\_START | array | false |  |  |
| currency | string | false |  |  |
| type | string | false | account type: trade, frozen, loan, interest, transfer-out-available, loan-available |  |
| balance | string | false | The negative balance means the loan or interest that need to repay. All trade balance can be transferred out if transfer-out-available balance is -1 |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/cross-margin/accounts/balance?sub-uid=xxx" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": {
    "id": 18264,
    "type": "cross-margin",
    "state": "working",
    "risk-rate": "1000",
    "acct-balance-sum": "12312.123123",
    "debt-balance-sum": "1231.2123123",
    "list": [
      {
        "currency": "btc",
        "type": "trade",
        "balance": "1168.533000000000000000"
      },
      {
        "currency": "btc",
        "type": "frozen",
        "balance": "0.000000000000000000"
      },
      {
        "currency": "btc",
        "type": "loan",
        "balance": "-2.433000000000000000"
      },
      {
        "currency": "btc",
        "type": "interest",
        "balance": "-0.000533000000000000"
      },
      {
        "currency": "btc",
        "type": "transfer-out-available",
        "balance": "1163.872174670000000000"
      },
      {
        "currency": "btc",
        "type": "loan-available",
        "balance": "8161.876538350676000000"
      }
    ]
  }
}
```

### /v2/margin/limit (Obtain leverage position limit（Cross）)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This interface returns the position limit at the user level.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| currency | string | false | If empty, all currencies will be queried by default. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | Status code |  |
| message | string | false | Incorrect description (if any) |  |
| status | string | false | status |  |
| DATA\_START | object | false |  |  |
| currency | string | false | currency |  |
| maxHoldings | string | false | Position limit |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/margin/limit?currency=xxxx" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "currency": "btc",
      "max-holdings": "-1"
    },
    {
      "currency": "eth",
      "max-holdings": "-1"
    },
    {
      "currency": "ada",
      "max-holdings": "3000000"
    }
  ],
  "code": 200
}
```

### /v2/account/repayment ( Repayment Record Reference)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: Available Accounts: Main and Sub-Accounts Sort by "repayTime"

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| repayId | string | false | repayment transaction ID |  |  |
| accountId | string | false | account ID (default value: all accounts) |  |  |
| currency | string | false | borrowing/lending currency (default value: all currencies) |  |  |
| startTime | long | false | start time (unix time in millisecond; range: \[(endTime – x D), endTime\]; default value: (endTime – x D) |  |  |
| endTime | long | false | end time (unix time in millisecond；range: \[(present time – y D), present time\]; default value: present time) |  |  |
| sort | string | false | sort direction (value: asc, desc; default value: desc) |  |  |
| limit | integer | false | max return items per page (range: \[1-100\]; default value: 50) |  |  |
| fromId | long | false | search ID from the start (only available when searching for the next page) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | status code |  |
| message | string | false | error description (if any) |  |
| DATA\_START | array | false | sorted by the appointed order |  |
| repayId | string | false | repayment transaction ID |  |
| repayTime | long | false | repayment transaction time (unix time in millisecond) |  |
| accountId | string | false | repayment account ID |  |
| currency | string | false | repayment currency |  |
| repaidAmount | string | false | repaid amount |  |
| TRANSACTIDS\_START | object | false | ID list of original loan transactions (arranged by order of repaymen time) |  |
| transactId | long | false | original loan transaction ID |  |
| repaidPrincipal | string | false | principal repaid |  |
| repaidInterest | string | false | interest repaid |  |
| paidHt | string | false | HT paid |  |
| paidPoint | string | false | point paid |  |
| TRANSACTIDS\_END |  | false |  |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | search the start ID in the next page (return only when there is data in the next page) |  |

#### Request example

`curl"https://api.huobi.pro/v2/account/repayment?repayId=xxxx&accountId=xxx¤cy=xxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "repayId": 1174413,
      "repayTime": 1600747389111,
      "accountId": 1266826,
      "currency": "btc",
      "repaidAmount": "0.00200083",
      "transactIds": {
        "transactId": 502,
        "repaidprincipal": "0.00199666",
        "repaidInterest": "0.00000417",
        "paidHt": "0",
        "paidPoint": "0"
      }
    }
  ]
}
```

### /v2/sub-user/deduct-mode ( Set a deduction for parent and sub user)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This interface is to set the deduction fee for parent and sub user (HT or point ).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUids | long | false | Sub user's UID list (maximum 50 UIDs, separated by comma) |  |  |
| deductMode | string | false | deduct mode：master ,sub |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| subUid | string | false | Sub user's UID |  |
| deductMode | string | false | deduct mode |  |
| errCode | string | false | Error code in case of rejection (only valid when the requested UID being rejected) |  |
| errMessage | string | false | Error message in case of rejection (only valid when the requested UID being rejected) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "subUids": 178211,
  "deductMode": "master"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "subUid": "158069153",
      "deductMode": "master"
    },
    {
      "subUid": "1461901631",
      "deductMode": null,
      "errCode": 1002,
      "errMessage": "forbidden"
    }
  ],
  "ok": true
}
```

### /v2/user/api-key ( API key query)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint is used by the parent user to query their own API key information, and the parent user to query their sub user's API key information.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| uid | long | false | parent user uid , sub user uid |  |  |
| accessKey | string | false | The access key of the API key, if not specified, it will return all API keys belong to the UID. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| accessKey | string | false | access key |  |
| note | string | false | API key note |  |
| permission | string | false | API key permission |  |
| ipAddresses | string | false | API key IP addresses |  |
| validDays | int | false | API key expire in (days) | If it is -1, it means permanently valid |
| status | string | false | API key status | normal, expired |
| createTime | long | false | API key creation time |  |
| updateTime | long | false | API key last modified time |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/user/api-key?uid=xxx&accessKey=xxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "message": "success",
  "data": [
    {
      "accessKey": "160bb889-b7XXXXbe-e0XXXXf5-ghxertfvbf",
      "status": "normal",
      "note": "host",
      "permission": "trade,readOnly",
      "ipAddresses": "192.168.0.1,192.168.1.1",
      "validDays": -1,
      "createTime": 1615192704000,
      "updateTime": 1623030338000
    },
    {
      "accessKey": "5000d371-edXXXXf5tf-40XXXX8b-ab8e5",
      "status": "normal",
      "note": "host two",
      "permission": "readOnly,trade,withdraw",
      "ipAddresses": "",
      "validDays": 7,
      "createTime": 1623158078000,
      "updateTime": 1629875976000
    }
  ],
  "ok": true
}
```

### /v2/user/uid ( Get UID)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint allow users to view the user ID of the account easily.

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
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| data | long | false | UID |  |

#### Request example

`curl"https://api.huobi.pro/v2/user/uid"`

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": 63628520
}
```

### /v2/sub-user/creation ( Sub user creation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to create sub users, up to 50 at a time

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| USERLIST\_START | object | true |  |  |  |
| userName | string | true | Sub user name, an important identifier of the sub user's identity, requires unique within the HTX platform | The combination of 6 to 20 letters and numbers, or only letters. Letter is not case sensitive. The first character has to be a letter. |  |
| note | string | false | Sub user note, no unique requirements | Up to 20 characters, unlimited character types |  |
| USERLIST\_END |  | false |  |  |  |
| subAccountType | String | false | Sub account type, GENERAL general type (default to general type if no value), CONTACT contract type, GRID contract grid type, FIRE-BLOCK fireblock custody account. It indicates that sub account types cannot be specified in accounts, which means that all sub account types within a batch are the same |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| userName | string | false | Sub user name |  |
| note | string | false | Sub user note (only valid for sub-users with note)） |  |
| uid | long | false | Sub user UID (only valid for successfully created sub users) |  |
| errCode | string | false | Error code for creation failure (only valid for sub users that failed to create) |  |
| errMessage | string | false | Cause of creation failure error (only valid for sub users that failed to create) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "userList": [
    {
      "userName": "test123",
      "note": "huobi"
    },
    {
      "userName": "test456",
      "note": "huobitwo"
    }
  ]
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "userName": "test123",
      "note": "HTX",
      "uid": 123
    },
    {
      "userName": "test456",
      "note": "HTX two",
      "errCode": "2002",
      "errMessage": "value in user name duplicated with existing record"
    }
  ]
}
```

### /v2/sub-user/user-list ( Get Sub User's List)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Via this endpoint parent user is able to query a full list of sub user's UID as well as their status.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fromId | long | false | First record ID in next page (only valid if exceeded page size) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | In ascending order of uid, each response contains maximum 100 records |  |
| uid | long | false | Sub user’s UID |  |
| userState | string | false | Sub user’s status | lock, normal |
| subUserName | string | true | Subaccount username |  |
| note | string | true | API key note |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/user-list?fromId=xxxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "uid": 63628520,
      "userState": "normal",
      "subUserName": "",
      "note": ""
    },
    {
      "uid": 132208121,
      "userState": "normal",
      "subUserName": "",
      "note": ""
    }
  ]
}
```

### /v2/sub-user/management ( Lock/Unlock Sub User)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 20times/2s

Interface description: This endpoint allows parent user to lock or unlock a specific sub user.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | Sub user UID |  |  |
| action | string | false | Action type | lock,unlock |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | status code |  |
| DATA\_START | object | false |  |  |
| subUid | long | false | sub user UID |  |
| userState | string | false | The state of sub user | lock,normal |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "subUid": 178211,
  "action": "lock"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "subUid": 245686628,
    "userState": "lock"
  },
  "ok": true
}
```

### /v2/sub-user/user-state ( Get Sub User's Status)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Via this endpoint, parent user is able to query sub user's status by specifying a UID.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | Sub user's UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| uid | long | false | Sub user’s UID |  |
| userState | string | false | Sub user’s status | lock, normal |
| DATA\_END | object | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/user-state?subUid=xxxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "uid": 132208121,
    "userState": "normal"
  }
}
```

### /v2/sub-user/tradable-market ( Set Tradable Market for Sub Users)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: Parent user is able to set tradable market for a batch of sub users through this endpoint. By default, sub user’s trading permission in spot market is activated.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUids | string | false | Sub user's UID list (maximum 50 UIDs, separated by comma) | \- |  |
| accountType | string | false | Account type | isolated-margin,cross-margin |  |
| activation | string | false | Account activation | activated,deactivated |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| subUid | string | false | Sub user's UID |  |
| accountType | string | false | Account type | isolated-margin,cross-margin |
| activation | string | false | Account activation | activated,deactivated |
| errCode | int | false | Error code in case of rejection (only valid when the requested UID being rejected) |  |
| errMessage | string | false | Error message in case of rejection (only valid when the requested UID being rejected) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "subUids": "178211",
  "accountType": "isolated-margin",
  "activation": "activated"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "subUid": "12345678",
      "accountType": "isolated-margin",
      "activation": "activated"
    },
    {
      "subUid": "123456781",
      "accountType": "isolated-margin",
      "errCode": 1002,
      "errMessage": "forbidden"
    }
  ],
  "ok": true
}
```

### /v2/sub-user/transferability ( Set Asset Transfer Permission for Sub Users)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: Parent user is able to set asset transfer permission for a batch of sub users. By default, the asset transfer from sub user’s spot account to parent user’s spot account is allowed.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUids | string | false | Sub user's UID list (maximum 50 UIDs, separated by comma) |  |  |
| accountType | string | false | Account type (if not available, adopt default value 'spot'） | spot |  |
| transferrable | bool | false | Transferrablility | true,false |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| subUid | long | false | Sub user's UID |  |
| accountType | string | false | Account type | spot |
| transferrable | bool | false | Transferrability | true,false |
| errCode | int | false | Error code in case of rejection (only valid when the requested UID being rejected) |  |
| errMessage | string | false | Error code in case of rejection (only valid when the requested UID being rejected) |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "subUids": "178211",
  "accountType": "spot",
  "transferrable": true
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "accountType": "spot",
      "transferrable": true,
      "subUid": 245686628
    },
    {
      "accountType": "spot",
      "subUid": 2215699261,
      "errCode": 2002,
      "errMessage": "invalid field value in `2,215,699,261`"
    }
  ],
  "ok": true
}
```

### /v2/sub-user/account-list ( Get Sub User's Account List)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Via this endpoint parent user is able to query account list of sub user by specifying a UID.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | Sub User's UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| uid | long | false | Sub user’s UID |  |
| deductMode |  | false | deduct mode |  |
| LIST\_START | object | false |  |  |
| accountType | string | false | Account type | spot, isolated-margin, cross-margin |
| activation | string | false | Account’s activation | activated, deactivated |
| transferrable | bool | false | Transfer permission (only valid for accountType=spot) | true, false |
| ACCOUNTIDS\_START | object | false |  |  |
| accountId | string | false | Account ID |  |
| subType | string | false | Account sub type (only valid for accountType=isolated-margin) |  |
| accountStatus | string | false | Account status | normal, locked |
| ACCOUNTIDS\_END |  | false |  |  |
| LIST\_END |  | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/account-list?subUid=xxxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "uid": 132208121,
    "deductMode": "sub",
    "list": [
      {
        "accountType": "isolated-margin",
        "activation": "activated"
      },
      {
        "accountType": "cross-margin",
        "activation": "deactivated"
      },
      {
        "accountType": "spot",
        "activation": "activated",
        "transferrable": true,
        "accountIds": [
          {
            "accountId": 12255180,
            "accountStatus": "normal"
          }
        ]
      }
    ]
  }
}
```

### /v2/sub-user/api-key-generation ( Sub user API key creation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to create the API key of the sub user

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| otpToken | string | false | Google verification code of the parent user, the parent user must be bound to Google Authenticator for verification on the web | 6 characters, pure numbers |  |
| subUid | long | false | Sub user UID |  |  |
| note | string | false | API key note | Up to 255 characters with any font |  |
| permission | string | false | API key permissions | Valid value: readOnly, trade; multiple inputs are allowed, separated by comma, i.e. readOnly, trade; readOnly is required permission for any API key, while trade permission is optional. |  |
| ipAddresses | string | false | The IPv4/IPv6 host address or IPv4 network address bound to the API key | At most 20 IPv4/IPv6 host address(es) and/or IPv4 network address(es) can bind with one API key, separated by comma. For example: 202.106.196.115, 202.106.96.0/24. An API key not linked with an IP address but has trading or withdrawal permissions will be automatically deactivated after 90 days of inactivity. |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| note | string | false | API key note |  |
| accessKey | string | false | access key |  |
| secretKey | string | false | secret key |  |
| permission | string | false | API key permission |  |
| ipAddresses | string | false | API key IP addresses |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "otpToken": "178211",
  "subUid": 178911,
  "note": "178211",
  "permission": "178211",
  "ipAddresses": "178211"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "accessKey": "2b55df29-vf25treb80-1535713d-8aea2",
    "secretKey": "c405c550-6fa0583b-fb4bc38e-d317e",
    "note": "62924133",
    "permission": "trade,readOnly",
    "ipAddresses": "192.168.0.1,192.168.1.1"
  }
}
```

### /v2/sub-user/api-key-modification ( Sub user API key modification)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to modify the API key of the sub user

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | sub user uid |  |  |
| accessKey | string | false | Access key for sub user API key |  |  |
| note | string | false | API key note for sub user API key | Up to 255 characters |  |
| permission | string | false | API key permission for sub user API key | Valid value: readOnly, trade; multiple inputs are allowed, separated by comma, i.e. readOnly, trade; readOnly is required permission for any API key, while trade permission is optional. |  |
| ipAddresses | string | false | At most 20 IPv4/IPv6 host address(es) and/or IPv4 network address(es) can bind with one API key, separated by comma. For example: 202.106.196.115, 202.106.96.0/24. An API key not linked with an IP address but has trading or withdrawal permissions will be automatically deactivated after 90 days of inactivity. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| { note | string | false | API key note |  |
| permission | string | false | API key permission |  |
| ipAddresses | string | false | IPv4/IPv6 host address(es) or IPv4 network address(es) bind to the API key |  |
| DATA\_END |  | false |  |  |

#### Request example

```
{
  "subUid": 178211,
  "accessKey": "178211",
  "note": "178211",
  "permission": "178211",
  "ipAddresses": "178211"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": {
    "note": "tom",
    "permission": "trade,readOnly",
    "ipAddresses": "192.168.1.1"
  },
  "ok": true
}
```

### /v2/sub-user/api-key-deletion ( Sub user API key deletion)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to delete the API key of the sub user.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | sub user uid |  |  |
| accessKey | string | false | Access key for sub user API key |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any)） |  |

#### Request example

```
{
  "subUid": 178211,
  "accessKey": "178211"
}
```

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": null
}
```

### /v1/subuser/transfer ( Transfer Asset between Parent and Sub Account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint allows user to transfer asset between parent and sub account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub-uid | long | false | The sub account's uid to transfer to or from |  |  |
| currency | string | false | The type of currency toCurrency, i.e. btc, ltc, bch, eth, etc... |  |  |
| amount | decimal | false | The amount of asset to transfer |  |  |
| type | string | false | The type of transfer |  | master-transfer-in, master-transfer-out, master-point-transfer-in, master-point-transfer-out |
| client-order-id | string | false | client order id |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| data | int | false | Unique transfer id |  |
| status | string | false | status |  |

#### Request example

```
{
  "sub-uid": 178211,
  "currency": "usdt",
  "amount": 178211,
  "client-order-id": "178211",
  "type": "master-transfer-in"
}
```

#### Response Example

##### Success Example

```
{
  "data": 123456,
  "status": "ok"
}
```

### /v2/sub-user/deposit-address ( Query Deposit Address of Sub User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Parent user could query sub user's deposit address on corresponding chain, for a specific crypto currency (except IOTA).

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false |  |  | Sub user UID (limited to 1 per request) |
| currency | string | false |  |  | Crypto currency,refer to GET /v1/common/currencys |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false |  |  |
| message | string | false |  |  |
| DATA\_START | object | false |  |  |
| currency | string | false |  |  |
| address | string | false |  |  |
| addressTag | string | false |  |  |
| chain | string | false |  |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/deposit-address?subUid=xxxx¤cy=xxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "userId": 12345678,
      "currency": "btc",
      "address": "0x4efee1ca7fc887d921f4bbcc444fbc12c464d87f",
      "addressTag": "",
      "chain": "hbtc"
    },
    {
      "userId": 12345678,
      "currency": "btc",
      "address": "1C4o8WmACM8yHBbJjbdzLbc9ei7WFLFoMk",
      "addressTag": "",
      "chain": "btc"
    },
    {
      "userId": 12345678,
      "currency": "btc",
      "address": "0x4efee1ca7fc887d921f4bbcc444fbc12c464d87f",
      "addressTag": "",
      "chain": "hrc20btc"
    }
  ]
}
```

### /v2/sub-user/query-deposit ( Query Deposit History of Sub User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Parent user could query sub user's deposit history via this endpoint.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | true | Sub user UID |  |  |
| currency | string | false | Cryptocurrency (default value: all) |  |  |
| startTime | long | false | Farthest time (please refer to note 1 for valid range and default value) |  |  |
| endTime | long | false | Nearest time (please refer to note 2 for valid range and default value) |  |  |
| sort | string | false | Sorting order (enumerated values: asc, desc) |  |  |
| limit | int | false | Maximum number of items in one page (valid range:\[1-500\]; default value:100) |  |  |
| fromId | long | false | First record ID in this query (only valid for next page querying; please refer to note 3) |  |  |

Notes:

startTime valid range: \[(endTime – 30days), endTime\]

startTime default value: (endTime – 30days)

Note 2:

endTime valid range: Unlimited

endTime default value: current time

Note 3:

Only when the number of items within the query window (between "startTime" and "endTime") exceeded the page limitation (defined by "limit"), HTX server returns "nextId". Once received "nextId", API user should –

1) Be aware of that, some items within the query window were not returned due to the page size limitation.

2) In order to get these items from HTX server, adopt the "nextId" as "fromId" and submit another request, with other request parameters no change.

3) "nextId" and "fromId" are for recurring query purpose and the ID itself does not have any business implication.

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| id | long | false | Deposit id |  |
| currency | string | false | Cryptocurrency |  |
| txHash | string | false | The on-chain transaction hash |  |
| chain | string | false | Block chain name |  |
| amount | bigdecimal | false | The number of crypto asset transferred |  |
| address | string | false | The deposit source address |  |
| addressTag | string | false | The user defined address tag |  |
| state | string | false | The state of this transfer (see below for details) | unknown：On-chain transfer has not been received，confirming：On-chain transfer waits for first confirmation，confirmed：On-chain transfer confirmed for at least one block，safe：Multiple on-chain confirmation happened，orphan：Confirmed but currently in an orphan branch |
| createTime | long | false | The timestamp in milliseconds for the transfer creation |  |
| updateTime | long | false | The timestamp in milliseconds for the transfer's latest update |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/query-deposit?subUid=xxxx¤cy=xxx" `

#### Response Example

##### Success Example

```
{
  "code": 200,
  "data": [
    {
      "id": 33419472,
      "currency": "ltc",
      "chain": "ltc",
      "amount": 0.001,
      "address": "LUuuPs5C5Ph3cZz76ZLN1AMLSstqG5PbAz",
      "state": "safe",
      "txHash": "847601d249861da56022323514870ddb96456ec9579526233d53e690264605a7",
      "addressTag": "",
      "createTime": 1587033225787,
      "updateTime": 1587033716616
    }
  ]
}
```

### /v1/subuser/aggregate-balance ( Get the Aggregated Balance of all Sub-users)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 2times/2s

Interface description: This endpoint returns the aggregated balance from all the sub-users.

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
| status | string | false |  |  |
| DATA\_START | list | false |  |  |
| currency | string | false | The currency of this balance |  |
| type | string | false | account type | spot, margin, point,super-margin |
| balance | string | false | The total balance in the main currency unit including all balance and frozen banlance |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/subuser/aggregate-balance"`

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "currency": "hbpoint",
      "balance": "10",
      "type": "point"
    },
    {
      "currency": "ada",
      "balance": "0",
      "type": "spot"
    },
    {
      "currency": "usdt",
      "balance": "8.08559165",
      "type": "spot"
    }
  ]
}
```

### /v1/account/accounts/{sub-uid} ( Get Account Balance of a Sub-User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns the balance of a sub-user specified by sub-uid.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub-uid | long | false | Sub user UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status "OK" or "Error" |  |
| DATA\_START | object | false |  |  |
| id | long | false | account's ID |  |
| type | string | false | The type of this account: spot, margin, otc, point,super-margin |  |
| LIST\_START | string | false |  |  |
| currency | object | false | The currency of this balance |  |
| type | string | false | The balance type: trade, frozen, loan, interest, lock, bank |  |
| balance | string | false | The balance in the main currency unit |  |
| debt | string | false | Invalid field |  |
| available | string | false | Invalid field |  |
| LIST\_END | decimal | false |  |  |
| symbol |  | false |  |  |
| DATA\_END | string | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/account/accounts/{sub-uid}" `

#### Response Example

##### Success Example

```
{
  "status": "ok",
  "data": [
    {
      "id": 13704588,
      "type": "spot",
      "state": "working",
      "list": [
        {
          "currency": "usdt",
          "type": "trade",
          "balance": "8.0855916572",
          "debt": "invalid",
          "available": "invalid"
        }
      ],
      "symbol": ""
    },
    {
      "id": 24994285,
      "type": "point",
      "state": "working",
      "list": [
        {
          "currency": "hbpoint",
          "type": "trade",
          "balance": "10"
        }
      ],
      "symbol": ""
    }
  ]
}
```

### /v2/sub-user/entrust-user-list (Get custody trading sub-account list)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: X/2s

Interface description: This interface is used by traders to query the list of sub-accounts currently being managed.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fromId | long | false | First record ID in next page (only valid if exceeded page size) |  |  |
| limit | long | false |  |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | true |  |  |
| message | string | true |  | ok , "error" |
| DATA\_START | object | true |  |  |
| list |  | false |  |  |
| uid | long | true | Sub user’s UID |  |
| subUserName | string | true | Subaccount username |  |
| DATA\_END |  | false | Query id, which can be used as the from\_id field in the next query request |  |
| nextId | long | true | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

No data

#### Response Example

##### Success Example

No data

### /v2/sub-user/managed-transfer-history (Get history of managed sub-account transfer)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: X/2s

Interface description: This interface is used by traders to query the transfer records of the current managed sub-account.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| uid | long | false | Sub-user UID, if it is empty, all the sub-accounts managed by the trader will be queried by default |  |  |
| currency | string | false |  |  |  |
| type | string | false | Transfer type 0: Transfers from master account to sub-account 1: Transfers from sub-account to master account |  |  |
| startTime | long | false | ((end-time) – 48hour) | \[((end-time) – 48hour), (end-time)\] | Far point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| endTime | long | false | current-time | \[(current-time) – 120days,(current-time)\] | Near point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| from | string | false | Search internal id to begin with | if search next page, then this should be the last id (not trade-id) of last page; if search previous page, then this should be the first id (not trade-id) of last page |  |
| direct | string | false | Search direction when 'from' is used | next, prev | next |
| size | string | false | The number of orders to return | \[1-100\] | 100 |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status |  | false |  |  |
| DATA\_START | object | true |  |  |
| currency | string | true | Transfer currency |  |
| type | string | true | Transfer type 0: Transfers from master account to sub-account 1: Transfers from sub-account to master account |  |
| amount | long | true | Transfer amount |  |
| uid | long | true | Sub user’s UID |  |
| subUserName | string | true | Subaccount username |  |
| query\_id | string | false | Query id, which can be used as the from\_id field in the next query request |  |
| DATA\_START |  | false |  |  |

#### Request example

No data

#### Response Example

##### Success Example

No data