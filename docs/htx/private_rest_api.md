# HTX Private REST API API Documentation

---

## Spot > Introduction

Welcome to HTX API！

This is the official HTX API document, and will be continue updating. HTX will also publish API announcement in advance for any API change. Please subscribe to our announcements so that you can get the latest updates.

You can click [Here](https://www.huobi.pe/support/en-us/list/360000070201) to view the announcements. If you want to subscribe, please click "Follow" button in the top right of the page. After login and click "Follow" again, then choose the type you want to follow. After you subscribe, the button will be changed to "Following". If you don't have any account, you need to register first in the login dialog.

**How to read this document**

The top of the document is the navigation menu for different API business; The language button in the top right is for different languages, it supports Chinese and English right now. The main content of each API document has three parts, the left hand side is the contents, the middle part is the document body, and the right hand side is the request and response sameple.

Below is the content for Spot API document

The first part is the overview:

*   **Quick Start**: It introduces the overall knowledge of HTX API, and suitability for new HTX API user
*   **API Explorer**: It introduces the API Explorer online tool, which is convenient for user to invoke and observe the API
*   **FAQ**: It lists the frequently asked questions regardless the specific API
*   **Contact Us**: It introduces how to contact us according to different subjects

The second part is detail for each API. Each API category is listed in one section, and each each section has below contents:

*   **Introduction**: It introduces notes and description for this API category
*   **_Specific API_**: It introduces the usage, rate limit, request, parameters and response for each API
*   **Error Code**: It lists the common error code and the description for this API category
*   **FAQ**: It lists the frequently asked questions for this API category

---

## Contact Us > Market Maker Program

It is very welcome for market maker who has good market making strategy and large trading volume. If your HTX Spot account or Contract account has at least 10 BTC, you can send your email to:

*   [Vip@global-hgroup.com](mailto:Vip@global-hgroup.com) for HTX(spot / leverage) market maker
*   [Vip@global-hgroup.com](mailto:Vip@global-hgroup.com) for HTX Contract market maker

And provide below details:

1.  UID (not linked to any rebate program in any accounts)
2.  Screenshot of trading volume in other transaction platform (such as trading volume within 30 days, or VIP status)
3.  A brief description of your market-making strategy

Market makers will not be able to use point cards, VIP rate, rebate or any other fee promotion.

---

## Contact Us > Technical Support

If you have any other questions on API, you can contact us by below ways:

*   Join official **Telegram** group: [API技术交流群01](https://t.me/htx_api)
*   Contact customer support from Help Center or send email to [support@huobigroup.com](mailto:support@huobigroup.com).

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
`GET`  
`api.huobi.pro`  
`/v1/account/accounts`  
`AccessKeyId=rfhxxxxx-950000847-boooooo3-432c0&SignatureMethod=HmacSHA256&SignatureVersion=2&Timestamp=2019-11-06T03%3A26%3A13`

Note：It is safe to share your Access Key, which is to prove your identity, and it will not affect your account safety. Remember do **not** share your `Secret Key` to any one. If you expose your `Secret Key` by accident, please [remove](https://www.hbg.com/en-us/apikey/) the related API Key immediately.

---

## Quick Start > Preparation

Before you use API, you need to login the website to create API Key with proper permissions. The API key is shared for all instruments in HTX including spot, futures, swap, options.

You can manage your API Keys [here](https://www.htx.com/apikey/).

Every user can create at most 20 API Keys, each can be applied with either permission below:

*   Read permission: It is used to query the data, such as order query, trade query.
*   Trade permission: It is used to create order, cancel order and transfer, etc.
*   Withdraw permission: It is used to create withdraw order, cancel withdraw order, etc.

Please remember below information after creation:

*   `Access Key` It is used in API request
    
*   `Secret Key` It is used to generate the signature (only visible once after creation)
    

The API Key can bind maximum 20 IP addresses (either host IP or network IP), we strongly suggest you bind IP address for security purpose. The API Key without IP binding will be expired after 90 days.

**Warning** : These two keys are important to your account safety, please don't share **both** of them together to anyone else (including any product or person from HTX). If you find your API Key is disposed, please remove it immediately.

---

## Quick Start > SDK and Demo

**SDK (Suggested)**

[Java](https://github.com/huobiapi/huobi_Java) | [Python3](https://github.com/huobiapi/huobi_Python) | [C++](https://github.com/huobiapi/huobi_Cpp) | [C#](https://github.com/HuobiRDCenter/huobi_CSharp) | [Go](https://github.com/huobirdcenter/huobi_golang)

**Other Demos**

[https://github.com/huobiapi?tab=repositories](https://github.com/huobiapi?tab=repositories)

---

## Quick Start > Testnet (Stopped)

The testnet has been alive for months, however the active user count is rather low and the cost is high, after considering carefully we decide to shutdown the testnet environment.

It is suggest you use live environment, which is more stable and has more liquidity.

---

## Quick Start > Interface Type

There are two types of interface, you can choose the proper one according to your scenario and preferences.

### REST API

REST (Representational State Transfer) is one of the most popular communication mechanism under HTTP, each URL represents a type of resource.

It is suggested to use Rest API for one-off operation, like trading and withdraw.

### WebSocket API

WebSocket is a new protocol in HTML5. It is full-duplex between client and server. The connection can be established by a single handshake, and then server can push the notification to client actively.

It is suggest to use WebSocket API to get data update, like market data and order update.

**Authentication**

Both API has two levels of authentication:

Public API: It is for basic information and market data. It doesn't need authentication.

Private API: It is for account related operation like trading and account management. Each private API must be authenticated with API Key.

---

## Quick Start > Access URLs

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

---

## Quick Start > Authentication

### Overview

The API request may be tampered during internet, therefore all private API must be signed by your API Key (Secrete Key).

Each API Key has permission property, please check the API permission, and make sure your API key has proper permission.

A valid request consists of below parts:

*   API Path: for example api.huobi.pro/v1/order/orders
*   API Access Key: The 'Access Key' in your API Key
*   Signature Method: The first one is for users to use the elliptic curve digital signature algorithm, using Ed25519. ‌The second, hash-based protocol for user-computed signatures, uses HmacSHA256.
*   Ed25519 introduction: It is a high-performance digital signature algorithm that provides fast signature verification and generation while having high security.
*   Signature Version: The version for the signature protocol, it uses **2**
*   Timestamp: The UTC time when the request is sent, e.g. 2017-05-11T16:22:06. It is useful to prevent the request to be intercepted by third-party.
*   Parameters: Each API Method has a group of parameters, you can refer to detailed document for each of them.
    *   For GET request, all the parameters must be signed.
    *   For POST request, the parameters needn't be signed and they should be put in request body.
*   Signature: The value after signed, it is guarantee the signature is valid and the request is not be tempered.

### Ed25519 Signature Method

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

*   Use the request string obtained in the previous step to generate the private key of Ed25519 and add it to generate a signature.
*   Encode the generated signature with base-64, and the resulting value is used as the digital signature of this interface call.

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

### `HmacSHA256` Signature Method

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

*   Use the pre-signed text in step 6 and your API Secret Key to generate hash code by HmacSHA256 hash function.
*   Encode the hash code with base-64 to generate the signature.

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

---

## Quick Start > Sub User

Sub user can be used to isolate the assets and trade, the assets can be transferred between parent and sub users. Sub user can only trade with the sub user. The assets can not be transferred between sub users, only parent user has the transfer permission.

Sub user has independent login password and API Key, they are managed under parent user in website.

Each parent user can create **200** sub user, each sub user can create at most **5** API Key, each API key can have two permissions: **read** and **trade**.

The sub user API Key can also bind IP address, the expiry policy is the same with parent user.

You can access [here](https://account.hbg.com/en-us/subaccount/management) to create and manage sub user.

The sub user can access all public API (including basic information and market data), below are the private APIs that sub user can access:

| API | Description |
| --- | --- |
| [POST /v1/order/orders/place](https://huobiapi.github.io/docs/spot/v1/en/#fd6ce2a756) | Create and execute an order |
| [POST /v1/order/orders/{order-id}/submitcancel](https://huobiapi.github.io/docs/spot/v1/en/#4e53c0fccd) | Cancel an order |
| [POST /v1/order/orders/submitCancelClientOrder](https://huobiapi.github.io/docs/spot/v1/en/#submit-cancel-for-an-order-based-on-client-order-id) | Cancel an Order based on client order ID |
| [POST /v1/order/orders/batchcancel](https://huobiapi.github.io/docs/spot/v1/en/#ad00632ed5) | Cancel multiple orders |
| [POST /v1/order/orders/batchCancelOpenOrders](https://huobiapi.github.io/docs/spot/v1/en/#open-orders) | Cancel the open orders |
| [GET /v1/order/orders/{order-id}](https://huobiapi.github.io/docs/spot/v1/en/#92d59b6aad) | Query a specific order |
| [GET /v1/order/orders](https://huobiapi.github.io/docs/spot/v1/en/#d72a5b49e7) | Query orders with criteria |
| [GET /v1/order/openOrders](https://huobiapi.github.io/docs/spot/v1/en/#95f2078356) | Query open orders |
| [GET /v1/order/matchresults](https://huobiapi.github.io/docs/spot/v1/en/#0fa6055598) | Query the order matching result |
| [GET /v1/order/orders/{order-id}/matchresults](https://huobiapi.github.io/docs/spot/v1/en/#56c6c47284) | Query a specific order matching result |
| [GET /v1/account/accounts](https://huobiapi.github.io/docs/spot/v1/en/#bd9157656f) | Query all accounts in current user |
| [GET /v1/account/accounts/{account-id}/balance](https://huobiapi.github.io/docs/spot/v1/en/#870c0ab88b) | Query the specific account balance |
| [POST /v1/futures/transfer](https://huobiapi.github.io/docs/spot/v1/en/#e227a2a3e8) | Transfer with future account |
| [POST /v1/dw/transfer-in/margin](https://huobiapi.github.io/docs/spot/v1/en/#0d3c2e7382) | Transfer from spot to margin account |
| [POST /v1/dw/transfer-out/margin](https://huobiapi.github.io/docs/spot/v1/en/#0d3c2e7382) | Transfer from margin to spot account |
| [POST /v1/margin/orders](https://huobiapi.github.io/docs/spot/v1/en/#48cca1ce88) | Request margin loan |
| [POST /v1/margin/orders/{order-id}/repay](https://huobiapi.github.io/docs/spot/v1/en/#48aa7c8199) | Repay the debit for specific order |
| [GET /v1/margin/loan-orders](https://huobiapi.github.io/docs/spot/v1/en/#e52396720a) | Query history loan orders |
| [GET /v1/margin/accounts/balance](https://huobiapi.github.io/docs/spot/v1/en/#6e79ba8e80) | Query margin account balance |
| [GET /v1/account/history](https://huobiapi.github.io/docs/spot/v1/en/#get-account-history) | Query account history |
| [POST /v1/cross-margin/transfer-in](https://huobiapi.github.io/docs/spot/v1/en/#transfer-asset-from-spot-trading-account-to-cross-margin-account) | Transfer Asset from Spot Trading Account to Cross Margin Account |
| [POST /v1/cross-margin/transfer-out](https://huobiapi.github.io/docs/spot/v1/en/#transfer-asset-from-cross-margin-account-to-spot-trading-account) | Transfer Asset from Cross Margin Account to Spot Trading Account |
| [GET /v1/cross-margin/loan-info](https://huobiapi.github.io/docs/spot/v1/en/#get-loan-interest-rate-and-quota-2) | Get Loan Interest Rate and Quota |
| [POST /v1/cross-margin/orders](https://huobiapi.github.io/docs/spot/v1/en/#request-a-margin-loan-2) | Request a Margin Loan |
| [POST /v1/cross-margin/orders/{order-id}/repay](https://huobiapi.github.io/docs/spot/v1/en/#repay-margin-loan-2) | Repay Margin Loan |
| [GET /v1/cross-margin/loan-orders](https://huobiapi.github.io/docs/spot/v1/en/#search-past-margin-orders-2) | Search Past Margin Orders |
| [GET /v1/cross-margin/accounts/balance](https://huobiapi.github.io/docs/spot/v1/en/#get-the-balance-of-the-margin-loan-account-2) | Get the Balance of the Margin Loan Account |
| [GET /v2/account/ledger](https://huobiapi.github.io/docs/spot/v1/en/#get-account-ledger) | Query account ledger |
| [POST /v1/account/transfer](https://huobiapi.github.io/docs/spot/v1/en/#asset-transfer) | Asset Transfer |
| [GET /v2/point/account](https://huobiapi.github.io/docs/spot/v1/en/#get-point-balance) | Query Point Balance |
| [POST /v2/point/transfer](https://huobiapi.github.io/docs/spot/v1/en/#point-transfer) | Point Transfer |
| [GET /v2/etp/reference](https://huobiapi.github.io/docs/spot/v1/en/#get-reference-data-of-etp) | Get reference data of ETP |
| [POST /v2/etp/creation](https://huobiapi.github.io/docs/spot/v1/en/#etp-creation) | ETP Creation |
| [POST /v2/etp/redemption](https://huobiapi.github.io/docs/spot/v1/en/#etp-redemption) | ETP Redemption |
| [GET /v2/etp/transactions](https://huobiapi.github.io/docs/spot/v1/en/#get-etp-creation-amp-redemption-history) | Get ETP Creation & Redemption History |
| [GET /v2/etp/transaction](https://huobiapi.github.io/docs/spot/v1/en/#get-specific-etp-creation-or-redemption-record) | Get Specific ETP Creation or Redemption Record |
| [GET /v2/etp/rebalance](https://huobiapi.github.io/docs/spot/v1/en/#get-position-rebalance-history) | Get Position Rebalance History |

All other APIs couldn't be accessed by sub user, otherwise the API will return "error-code 403"。

---

## Quick Start > Glossary

### Trading symbols

The trading symbols are consist of base currency and quote currency. Take the symbol `BTC/USDT` as an example, `BTC` is the base currency, and `USDT` is the quote currency.

### Account

The `account-id` defines the Identity for different business type, it can be retrieved from API `/v1/account/accounts` , where the `account-type` is the business types.The types include:

*   spot: Spot account
*   otc: OTC account
*   margin: Isolated margin account, the detailed currency type is defined in `subType`
*   super-margin / cross-margin: Cross-margin account
*   investment: c2c margin lending account
*   borrow: c2c margin borrowing account
*   point: Point card account
*   minepool: Minepool account
*   etf: ETF account

You can refer to [HTX Course](https://www.huobi.com/en-us/guide/) to get detailed information

---

## API Access > Overview

| Category | URL Path | Description |
| --- | --- | --- |
| Common | /v1/common/\* | Common interface, including currency, currency pair, timestamp, etc |
| Market Data | /market/\* | Market data interface, including trading, depth, quotation, etc |
| Account | /v1/account/\* /v1/subuser/\* | Account interface, including account information, sub-user ,etc |
| Order | /v1/order/\* | Order interface, including order creation, cancellation, query, etc |
| Margin | /v1/margin/\* | Margin interface, including debit, payment, query, etc |
| Cross Margin | /v1/cross-margin/\* | Cross margin interface, including debit, payment, query, etc |

Above is a general category, it doesn't cover all API, you can refer to detailed API document according to your requirement.

---

## API Access > New Version Rate limit Rule

*   The new version rate limit is applied on UID basis, which means, the overall access rate, from all API keys under same UID, to single endpoint, shouldn’t exceed the rate limit applied on that endpoint.  
    
*   It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the expire time for current rate limit time window, then you can adjust the API access rate dynamically.

---

## API Access > Request Format

The API is restful and there are two method: GET and POST.

*   GET request: All parameters are included in URL, and do not carry body(content-length>0), in otherwise will return 403 error code.
*   POST request: All parameters are formatted as JSON and put int the request body

---

## API Access > Response Format

The response is JSON format.There are four fields in the top level: `status`, `ch`, `ts` and `data`. The first three fields indicate the general status, the business data is is under `data` field.

Below is an example of response:

```
{ "status": "ok", "ch": "market.btcusdt.kline.1day", "ts": 1499223904680, "data": // per API response data in nested JSON object}
```

| Field | Data Type | Description |
| --- | --- | --- |
| status | string | Status of API response |
| ch | string | The data stream. It may be empty as some API doesn't have data stream |
| ts | int | The UTC timestamp when API respond, the unit is millisecond |
| data | object | The body data in response |

---

## API Access > Data Type

The JSON data type described in this document is defined as below:

*   `string`: a sequence of characters that are quoted
*   `int`: a 32-bit integer, mainly used for status code, size and count
*   `long`: a 64-bit integer, mainly used for Id and timestamp
*   `float`: a fraction represented in decimal format, mainly used for volume and price, recommend to use high precision decimal data types in program

---

## API Access > Best Practice

### Security

*   It is strongly suggested to bind your IP with your API Key to ensure that your API Key can only be used in your machine. Furthermore, your API Key will be expired after 90 days if it is not binded with any IP.
*   It is strongly suggested not to share your API Key with any body or third-party software, otherwise your personal information and asset may be stolen. If your expose your API Key by accident, please do delete the API Key and create a new one.

### General

**API Access**

*   It is suggested not to use temporary domain or proxy, which may be not stable.
*   It is suggested to use AWS Japan to access API for lower latency
*   It is suggested to connect to domain `api-aws.huobi.pro` if your server is based on AWS, because this domain is optimized for AWS client, the latency will be lower.

**New Version Rate limit Rule**

*   Only those endpoints marked with rate limit value separately are applied with new rate limit rule.
    
*   It is suggested to read HTTP Header `X-HB-RateLimit-Requests-Remain` and `X-HB-RateLimit-Requests-Expire` to get the remaining count of request and the expire time for current rate limit time window, then you can adjust the API access rate dynamically.
    
*   The overall access rate, from all API keys under same UID, to single endpoint, shouldn’t exceed the rate limit applied on that endpoint.
    

### Market

**Market data**

*   It is suggested to use WebSocket interface to subscribe the market update and then cache the data locally, because WebSocket notification has lower latency and not have rate limit.
*   It is suggested not to subscribe too many topics in a single websocket connection, it may generate more notifications and cause network latency and disconnection.

**Latest trade**

*   It is suggested to subscribe WebSocket topic `market.$symbol.trade.detail`, the response field `price` represents the latest price, and it has lower latency.
*   It is suggested to use `tradeId` to de-duplicate if you subscribe WebSocket topic `market.$symbol.trade.detail`.

**Depth**

*   It is suggested to subscribe WebSocket topic `market.$symbol.bbo` if you only need the best bid and best offer.
*   It is suggested to subscribe WebSocket topic `market.$symbol.depth.$type` if you need multiple bid and offer with normal latency.
*   It is suggested to subscribe WebSocket topic `market.$symbol.mbp.$level` if you need multiple bid and offer with lower latency
*   It is suggested to use `version` field to de-duplicate and discard the smaller data if you use Rest interface `/market/depth` and WebSocket topic `market.$symbol.depth.$type`. It is suggest to use `seqNum` to de-duplicate and discard the smaller data if yo subscribe WebSocket topic `market.$symbol.mbp.$levels`.

### Order

**Place an order (/v1/order/orders/place)**

*   It is suggested to follow the symbol reference (`/v1/common/symbols`) to validate the amount and value before placing the older, otherwise you may place an invalid order and waste your time.
*   It is suggested to provide an unique `client-order-id` field when placing the order, it is useful to track your orders status if you fail to get the order id response. Later you can use the `client-order-id` to match the WebSocket order notification or query order detail by interface `/v1/order/orders/getClientOrder`.The uniqueness of the clientOrderId passed in when you place an order will no longer be verified. We recommend you to manage clientOrderId by yourself to ensure its uniqueness. If multiple orders use the same clientOrderId, the latest order corresponding to the clientOrderId will be returned when querying/canceling an order.

**Search history olders (/v1/order/orders)**

*   It is recommended to use `start-time` and `end-time` to query, that are two timestamps with 13 digits (millisecond). The maximum query time window is 48 hours (2 days), the more precision you provide, the better performance you will get. You can query for multiple iterations.

**Order update**

*   It is suggested to subscribe WebSocket topic `orders.$symbol`, which has lower latency and more accurate sequence.

### Account

**Asset update**

*   It is suggested to subscribe both WebSocket topic `orders.$symbol` and `account.update#${mode}`. The former one tells the order status update and arrives earlier than the latter one, and the latter one confirms the final asset balance.
*   It is suggested not to subscribe WebSocket topic `accounts`, which is replaced by `accounts.update#${mode}`, and will be retired later.

---

## Account > Introduction

Account APIs provide account related (such as basic info, balance, history, point) query and transfer functionality.

All endpoints in this section require authentication

---

## Account > Error Code

Below is the error code, error message and description returned by Account APIs.

| Error Code | Error Message | Description |
| --- | --- | --- |
| 500 | system error | Server internal error |
| 1002 | forbidden | Operation is forbidden, such as the account Id and UID doesn't match |
| 2002 | "invalid field value in `currency`" | Parameter currency is invalid |
| 2002 | "invalid field value in `transactTypes`" | Parameter transactTypes is invalid (should be transfer) |
| 2002 | "invalid field value in `sort`" | Parameter sort is invalid (should be 'asc' or 'desc') |
| 2002 | "value in `fromId` is not found in record" | Value fromId doesn't exist |
| 2002 | "invalid field value in `accountId`" | Parameter accountId is invalid (should not be empty) |
| 2002 | "value in `startTime` exceeded valid range" | Value startTime is later than current time or earlier than 180 days ago |
| 2002 | "value in `endTime` exceeded valid range") | Value endTime is earlier than startTime, or 10 days later than startTime |
| 40401 |   | Deduction is unavailable for sub-accounts. |
| 40402 |   | Deduction currency cannot be empty |
| 40403 |   | Too many requests. |
| 40404 |   | Point Cards are unavailable in the current country or region. |
| 40405 |   | The crypto is unavailable for deduction. |
| 40406 |   | User's Point Card balance is zero. |
| 40407 |   | Invalid deduction type. |
| 40408 |   | Duplicate request. Please try again later |
| 3011 |   | Verification failure |

---

## Trading > Introduction

Trading APIs provide trading related functionality, including placing order, canceling order, order history query, trading history query, transaction fee query.

All endpoints in this section require authentication

The parameter "account-id" and "source" should be set properly, refer to details in Request Parameters description below.

Below is the glossary of trading related field:

**order type**: The order type is consist of trade direction and behavior type: \[direction\]-\[type\]

direction:

*   buy
*   sell

type:

*   market : The price is not required in order creation request, you only need to specify either volume or amount. The matching and trade will happen automatically according to the request.
*   limit: Both of the price and amount should be specified in order creation request.
*   limit-maker: The price is specified in order creation request as market maker. It will not be matched in the matching queue.
*   ioc: ioc stands for "immediately or cancel", it means the order will be canceled if it couldn't be matched. If the order is partially traded, the remaining part will be canceled.
*   limit-fok: fok stands for "fill or kill", it means the order will be cancelled if it couldn't be **fully** matched. Even if the order can be partially filled, the entire order will be cancelled.
*   market-grid: Grid trading market order (not supported by API)
*   limit-grid: Grid trading limit order (not supported by API)
*   stop-limit: The price in order creation request is the trigger price. The order will be put into matching queue only when the market price reaches the trigger price. This type is replaced by conditional order, please use conditional order APIs

**order source**: the origin of the order

*   spot-api: API order from spot account
*   margin-api：API order from margin account
*   super-margin-api：API order from cross-margin account
*   c2c-margin-api：API order from c2c account
*   grid-trading-sys：grid order (not supported by API)

**order state**:

*   created: The order is created, and not in the matching queue yet.
*   submitted: The order is submitted, and already in the matching queue, waiting for deal.
*   partial-filled: The order is already in the matching queue and partially traded, and is waiting for further matching and trade.
*   filled: The order is already traded and not in the matching queue any more.
*   partial-canceled: The order is not in the matching queue any more. The status is transferred from 'partial-filled', the order is partially trade, but remaining is canceled.
*   canceling: The order is under canceling, but haven't been removed from matching queue yet.
*   canceled: The order is not in the matching queue any more, and completely canceled. There is no trade associated with this order.

**IDs**: The frequently used identities are listed below:

*   order-id: The unique identity for order.
*   client-order-id: The identity defined by the client. This id is included in order creation request, and will be returned as order-id. For completed orders, clientOrderId will be valid for 2 hours since the order creation (it is still valid for 8 hours concerning other orders). That is to say, if an order has been created for more than 2 hours, clientOrderId can’t be used to query the completed order (It is recommended to check it with orderid). Among them, the status of the completed order includes partially canceled, canceled, and fully executed. The allowed characters are letters (case sensitive), digit, underscore (\_) and hyphen (-), no more than 64 chars.
*   match-id : The identity for order matching.
*   trade-id : The unique identity for the trade.

---

## Trading > Error Code

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

---

## Trading > FAQ

### Q1：What is client-order-id?

A： The `client-order-id` is an optional request parameter while placing order. It's string type which maximum length is 64. The client order id is generated by client, and is only valid within 8 hours (It’s only valid within 2 hours for the final state).

### Q2：How to get the order size, price and decimal precision?

A： You can call API `GET /v1/common/symbols` to get the currency pair information, pay attention to the difference between the minimum amount and the minimum price.

Below are common errors:

*   order-value-min-error: The order price is less than minimum price
*   order-orderprice-precision-error : The precision for limited order price is wrong
*   order-orderamount-precision-error : The precision for limited order amount is wrong
*   order-limitorder-price-max-error : The limited order price is higher than the threshold(limit price to buy cannot be higher than 110% of the market price)
*   order-limitorder-price-min-error : The limited order price is lower than the threshold(limit price to sell cannot be lower than 90% of the market price)
*   order-limitorder-amount-max-error : The limited order amount is larger than the threshold
*   order-limitorder-amount-min-error : The limited order amount is smaller than the threshold  
    

### Q3：Why I got insufficient balance error while placing an order just after a successful order matching?

A：To ensure the low latency of order update, Order update push is made directly after order matching. Meanwhile, the clearing service of that order may be still in progress at backend. It is suggested to follow either of below to ensure a successful order submission:

1、Subscribe to WebSocket topic `accounts` for getting account balance moves to ensure the completion of asset clearing.

2、After receiving WebSocket push message, check account balance from REST endpoint to ensure sufficient available balance for the next order submission.

3、Leave sufficient balance in your account.

### Q4: What is the difference between 'filled-fees' and 'filled-points' in match result?

A: Transaction fee can be paid from either of below. They won't exist at the same time.

1、filled-fees: Filled-fee is also called transaction fee. It's charged from your income currency from the transaction. For example, if your purchase order of BTC/USDT got matched，the transaction fee will be based on BTC.

2、filled-points: If user enabled transaction fee deduction, the fee should be charged from either HT or Point. When there's sufficient fund in HT/Point, filled-fees is empty while filled-points has value. That means the deduction is made via HT/Point. User could refer to field `fee-deduct-currency` to get the exact deduction type of the transaction.

### Q5: What is the difference between 'match-id' and 'trade-id' in matching result?

A: The `match-id` is the identity for order matching, while the `trade-id` is the unique identifier for each trade. One `match-id` may be correlated with multiple `trade-id`, or no `trade-id`(if the order is cancelled). For example, if a taker's order got matched with 3 maker's orders at the same time, it generates 3 trade IDs but only one match ID.

### Q6: Why the order submission could be rejected even though the order price is set as same as current best bid (or best ask)?

A: For some extreme illiquid trading symbols, the best quote price at particular time might be far away from last trade price. But the price limit is actually based on last trade price which could possibly exclude best quote price from valid range for any new order. It is suggested to place orders based on the WebSocket pushed Bid and market data.

### Q7: How to retrieve the trading symbols for margin trade

A: You can get details from Rest API `GET /v1/common/symbols`. The `leverage-ratio` represents the isolated-margin ratio. The `super-margin-leverage-ratio` represents the cross-margin.

The value `0` indicates that the trading symbols doesn't support margin trading.

---

## Conditional Order > Introduction

By comparing with the existing stop limit order, the newly introduced conditional order does have following major differences:  

1) Although the newly introduced conditional order is also triggered by stop price, before it being triggered, the Exchange will not lock order margin for this order. Only when this conditional order being successfully triggered, its order margin will be locked.  
2) Conditional order does support not only limit order type but also market order type. (Trailing stop order only supports market order type.)  
3) As advanced conditional order, trailing stop order does support additional triggering condition i.e. trailing rate. Only when latest market price breaks stop price, and continues to go up (or down), and then reverts back for a certain percentage which exceeding the pre-defined "trailing rate", this order can be triggered. The valid value range of trailing rate is between 0.1% and 5%.  

All endpoints in this section require authentication

After the official launch of conditional order, HTX might decommission the existing stop order later. This will be notified through another circular.

---

## Conditional Order > Error Code

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

---

## Margin Loan (Cross/Isolated) > Introduction

Isolated/cross margin loan APIs provide loan related functionality such as requesting and repaying loan, loan querying and transfer.

All endpoints in this section require authentication

Currently loan only supports pairs, in which base currency is USDT, HUSD or BTC

Once completed a margin loan or transfer, please wait for 10 seconds before requesting for the next margin loan or transfer.

---

## Margin Loan (Cross/Isolated) > Error Code

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

---

## Margin Loan (Cross/Isolated) > FAQ

### Q1: I can see I have loanable amount in my margin account, why the API returns no sufficient amount error when I apply margin loan?

A: The available amount depends on not only account available amount, but also the system available amount. Due to risk control, the system has a max available amount everyday. If the total loan amount reaches the max value, user will fail to apply for loan, unless someone repays the loan in the same day. Right now we are implementing a more user-friendly solution that provides more accurate information to API users.

---

## Sub-account Management > Introduction

Sub user management APIs provide sub user account management (creation, query, permission, transfer), sub user API key management (creation, update, query, deletion), sub user address (deposit, withdraw) query and balance query.

All endpoints in this section require authentication

---

## Sub-account Management > Error Code

Below is the error code, error message and description returned by Sub user management APIs

| Error Code | Error Message | Description |
| --- | --- | --- |
| 1002 | forbidden | Operation is forbidden, such as sub user creation is not allowed for current user |
| 1003 | unauthorized | Signature is wrong |
| 2002 | invalid field value | Parameter is invalid |
| 2014 | number of sub account in the request exceeded valid range | number of sub account exceeded |
| 2014 | number of api key in the request exceeded valid range | number of API Key exceeded |
| 2016 | invalid request while value specified in sub user states | lock or unlock failure |

---

# Endpoints

---

## /v1/account/accounts ( Get all Accounts of the Current User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns a list of accounts owned by this API user.

### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

Notes:  
No parameters are needed for this endpoint.

### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result | "ok","error" |
| DATA\_START | object | false |  |  |
| id | long | false | Unique account id |  |
| state | string | false | Account state | working, lock |
| type | string | false | The type of this account | spot, margin, otc, point, super-margin, investment, borrow, grid-trading, otc-options,trust-credit ( third-party trust account )， |
| subtype | string | false | Sub-account type (only valid for isolated margin accounts and trust-credit third-party trust account ) | The corresponding trading symbol (currency pair) the isolated margin is based on, e.g. btcusdt; Under the trust-credit account type, the value on the subtype identifies the chain where its assets or credit assets are located. Possible values ​​include (reference chain information): btc, eth, usdterc20, trc20usdt, usdc, trx1, etc. |
| DATA\_END | object | false |  |  |

### Request example

`curl"https://api.huobi.pro/v1/account/accounts"`

### Response Example

#### Success Example

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

---

## /v1/account/accounts/{account-id}/balance ( Get Account Balance of a Specific Account)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 100times/2s

Interface description: This endpoint returns the balance of an account specified by account id.

### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

Notes:  
'account-id': The specified account id to get balance for, can be found by query '/v1/account/accounts' endpoint.

### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| account-id | string | false | account-id in the path field | The value can be GET /v1/account/accounts |  |

### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | Request Processing Result | "ok","error" |
| DATA\_START | object | false |  |  |
| id | long | false | Unique account id |  |
| state | string | false | Account state | working, lock |
| type | string | false | The type of this account | spot, margin, otc, point, super-margin, investment, borrow, grid-trading, otc-options,trust-credit ( third-party trust account )， |
| \_\_list\_\_ | Array | false |  |  |
| currency | string | false | The currency of this balance |  |
| type | string | false | The balance type | trade, frozen, loan, interest, lock, bank,credit-repay,trust-asset |
| balance | string | false | The balance in the main currency unit |  |
| debt | string | false | Invalid field |  |
| available | string | false | Invalid field |  |
| seq-num | string | false | Serial Number of Account Change |  |
| \_\_/list\_\_ |  | false |  |  |

### Request example

`curl"https://api.huobi.pro/v1/account/accounts/{account-id}/balance"`

### Response Example

#### Success Example

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

---

## /v1/account/accounts/{sub-uid} ( Get Account Balance of a Sub-User)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: This endpoint returns the balance of a sub-user specified by sub-uid.

### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| sub-uid | long | false | Sub user UID |  |  |

### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false | status "OK" or "Error" |  |
| DATA\_START | object | false |  |  |
| id | long | false | account's ID |  |
| type | string | false | The type of this account: spot, margin, otc, point,super-margin |  |
| \_\_list\_\_ | string | false |  |  |
| currency | object | false | The currency of this balance |  |
| type | string | false | The balance type: trade, frozen, loan, interest, lock, bank |  |
| balance | string | false | The balance in the main currency unit |  |
| debt | string | false | Invalid field |  |
| available | string | false | Invalid field |  |
| \_\_/list\_\_ | decimal | false |  |  |
| symbol |  | false |  |  |
| DATA\_END | string | false |  |  |

### Request example

`curl"https://api.huobi.pro/v1/account/accounts/{sub-uid}"`

### Response Example

#### Success Example

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

---

## /v2/sub-user/entrust-user-list (Get custody trading sub-account list)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: X/2s

Interface description: This interface is used by traders to query the list of sub-accounts currently being managed.

### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fromId | long | false | First record ID in next page (only valid if exceeded page size) |  |  |
| limit | long | false |  |  |  |

### Response Parameter

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

### Request example

No data

### Response Example

#### Success Example

No data

---

## /v2/sub-user/managed-transfer-history (Get history of managed sub-account transfer)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: X/2s

Interface description: This interface is used by traders to query the transfer records of the current managed sub-account.

### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

### Request Parameter

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

### Response Parameter

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

### Request example

No data

### Response Example

#### Success Example

No data