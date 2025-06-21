# Basic Information

## API Basic Information

1.  This article lists the rest baseurl of the interfaces: https://api-cloud-v2.bitmart.com
2.  All interface responses are in JSON format.

### Request Parameter Settings

*   For `GET` and `DELETE` method interfaces, parameters must be sent in the query string, i.e., the parameters concatenated after the `URL?`.
*   For `POST` and `PUT` method interfaces, parameters are sent in the request body in JSON format.

### HTTP Response Codes

*   HTTP 4XX Error codes are used to indicate wrong request content, behavior, and format. The problem is from the request sender.
*   HTTP 403 The error code indicates a violation of the restriction (prohibited call).
*   HTTP 429 The error code indicates that the access frequency is overrun and the IP will be blocked.
*   HTTP 418 The error code indicates that the IP has been blocked after error code 429.
*   HTTP 5XX Error codes are used to indicate problems with BitMart server.

### API Returned Codes

*   `code` Error code
*   `message` Error description
*   `trace` Event tracking ID for each request, which is returned by the server for every request
*   `data` User Data

For details, please refer to [Error Code List](#error-code)

## Signature

The authentication type of each API endpoint will be indicated. If it is marked as `SIGNED`,it means that the endpoint requires a signature to access. If it is marked as `KEYED`, it means that the endpoint only requires an API Access KEY to be set in the request header.

#### Authentication Type

*   `NONE`: Public endpoint, accessible to anyone
*   `KEYED`: Endpoint requires a valid X-BM-KEY to be set in the request header
*   `SIGNED`: Endpoint requires a valid X-BM-KEY and X-BM-SIGN signature to be set in the request header

### 1\. Setting Request Parameters

###### 1.1 Set Request Header Key

> Create X-BM-TIMESTAMP

`// Java System.currentTimeMillis();  // Python int(time.time() * 1000)   // Golang time.Now().UnixNano() / int64(time.Millisecond)  // Nodejs & TypeScript Date.now();  // Javascript Date.now();  // PHP round(microtime(true) * 1000)  // C# DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()`

*   `X-BM-KEY` (Your created API Access KEY)
*   `X-BM-SIGN` (Signature using Sha-256)
*   `X-BM-TIMESTAMP` (Current timestamp in milliseconds when the request is sent)

###### 1.2 Set Request Body Params

*   For `GET/DELETE` requests, the query string is in form format, such as `symbol=BMX&side=BUY`.
*   For `POST/PUT` requests, the query string is in JSON format, such as `{"symbol":"BMX","side":"BUY"}`.

### 2\. Example

> Shell Example

`echo -n '1589793796145#test001#{"symbol":"BTC_USDT","price":"8600","count":"100"}' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"     (stdin)= c31dc326bf87f38bfb49a3f8494961abfa291bd549d0d98d9578e87516cee46d      curl --location --request POST 'localhost:8080/spot/v1/test-post'     --header 'Content-Type: application/json'     --header 'X-BM-KEY: 80618e45710812162b04892c7ee5ead4a3cc3e56'     --header 'X-BM-SIGN: c31dc326bf87f38bfb49a3f8494961abfa291bd549d0d98d9578e87516cee46d'     --header 'X-BM-TIMESTAMP: 1589793796145'     --d '{"symbol":"BTC_USDT","price":"8600","count":"100"}'`

*   Request API: /spot/v1/test-post (SIGNED)
*   Request method: POST
*   Current timestamp: timestamp=`1589793796145`
*   Request body: `{"symbol":"BTC_USDT","price":"8600","count":"100"}`

Then set the following:

*   X-BM-TIMESTAMP=`1589793796145`
*   X-BM-KEY=`Your_api_access_key`
*   X-BM-SIGN= hmac\_sha256(`Your_api_secret_key`, `X-BM-TIMESTAMP` + '#' + `Your_api_memo` + '#' + `{"symbol":"BTC_USDT","price":"8600","count":"100"}`)

Assuming the key you applied for is as follows:

*   `accessKey`\=80618e45710812162b04892c7ee5ead4a3cc3e56
*   `secretKey`\=6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9
*   `memo`\=test001

then the right side is a complete request

You can also refer to the SDK or [Quick Start API](/en/quick/#python-quick-start) below to implement

## Rate Limit

The speed of the public interface is limited according to the IP, and the speed of the private interface is limited according to the API KEY. When the requests exceed the rate limit, the 429 status will be returned: the request is too frequent.

### Endpoints Limit Rules:

| Futures Market Endpoints | Endpoint Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /contract/public/details | Get a detailed list of all trading pairs | IP | 12 times/2 sec 
| /contract/public/depth | Get full depth of trading pairs | IP | 12 times/2 sec 
| /contract/public/open-interest | Get Contract Open Interest | IP | 2 times/2 sec 
| /contract/public/funding-rate | Get Current Funding Rate | IP | 12 times/2 sec 
| /contract/public/funding-rate-history | Get history Funding Rate | IP | 12 times/2 sec 
| /contract/public/kline | Get K-line | IP | 12 times/2 sec 
| /contract/public/markprice-kline | Get Mark Price K-line | IP | 12 times/2 sec 
| /contract/public/leverage-bracket | Get Contract Leverage Risk Limit | IP | 12 times/2 sec 
| /contract/public/market-trade | Get Market Trade | IP | 12 times/2 sec 

| Futures Trade Endpoints | Endpoint Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /contract/private/submit-order | Submit Contract Order | X-BM-KEY | 24 times/2 sec 
| /contract/private/cancel-order | Cancel Contract Order | X-BM-KEY | 40 times/2 sec 
| /contract/private/cancel-orders | Batch Cancel Contract Orders | X-BM-KEY | 2 times/2 sec 
| /contract/private/submit-plan-order | Submit Contract Plan Order | UID | 24 times/2 sec 
| /contract/private/cancel-plan-order | Cancel Contract Plan Order | UID | 40 times/2 sec 
| /contract/private/submit-tp-sl-order | Submit Contract TP or SL order | UID | 24 times/2 esc 
| /contract/private/modify-plan-order | Modify Contract Plan Order | UID | 24 times/2 esc 
| /contract/private/modify-preset-plan-order | Modify Contract Preset Plan Order | UID | 24 times/2 esc 
| /contract/private/modify-tp-sl-order | Modify Contract TP or SL Order | UID | 24 times/2 esc 
| /contract/private/modify-limit-order | Modify Contract Limit Order | UID | 24 times/2 esc 
| /contract/private/cancel-all-after | Timed cancel all open orders | UID | 4 times/2 esc 
| /contract/private/submit-trail-order | Submit Trail Order | UID | 24 times/2 esc 
| /contract/private/cancel-trail-order | Cancel Trail Order | UID | 24 times/2 esc 
| /contract/private/set-position-mode | Set position mode | X-BM-KEY | 2 times/2 esc 
| /contract/private/get-position-mode | Get position mode | X-BM-KEY | 2 times/2 esc 
| /contract/private/get-open-orders | Get Contract All Open Orders | X-BM-KEY | 50 times/2 sec 
| /contract/private/order | Get Contract Order Detail | X-BM-KEY | 50 times/2 sec 
| /contract/private/order-history | Get Contract Order History | X-BM-KEY | 6 times/2 sec 
| /contract/private/trades | Get Contract Order Trade Detail | X-BM-KEY | 6 times/2 sec 
| /contract/private/transaction-history | Get Transaction History | X-BM-KEY | 6 times/2 sec 
| /contract/private/assets-detail | Get Contract Assets Detail | X-BM-KEY | 12 times/2 sec 
| /contract/private/position | Get Current Position Detail | X-BM-KEY | 6 times/2 sec 
| /contract/private/position-v2 | Get Current Position Detail V2 | X-BM-KEY | 6 times/2 sec 
| /contract/private/submit-leverage | Submit Contract Leverage | X-BM-KEY | 24 times/2 sec 
| /account/v1/transfer-contract | Transfer | X-BM-KEY | 1 times/2 sec 
| /account/v1/transfer-contract-list | Get Transfer List | X-BM-KEY | 1 times/2 sec 
| /contract/private/current-plan-order | Get Contract All Current Plan Orders | X-BM-KEY | 50 times/2 sec 
| /contract/private/position-risk | Get Position Risk Info | X-BM-KEY | 24 times/2 sec 
| /contract/private/trade-fee-rate | Get Trade Fee Rate | X-BM-KEY | 2 times/2 esc 

|

| Sub-Account Endpoints | Endpoint Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /account/contract/sub-account/main/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Main Account, ues futures account) | X-BM-KEY | 8 times/2s 
| /account/contract/sub-account/main/v1/main-to-sub | Main-Account Transfer to Sub-Account (For Main Account, ues futures account) | X-BM-KEY | 8 times/2s 
| /account/contract/sub-account/sub/v1/sub-to-main | Sub-Account Transfer to Main-Account (For Sub-Account, ues futures account) | X-BM-KEY | 8 times/2s 
| /account/contract/sub-account/main/v1/wallet | Get Sub-Account Futures Wallet Balance (For Main Account, ues futures account) | X-BM-KEY | 12 times/2s 
| /account/contract/sub-account/v1/transfer-history | Get Account Futures Asset Transfer History (For Main/Sub Account, ues futures account) | X-BM-KEY | 8 times/2s 
| /account/contract/sub-account/main/v1/transfer-list | Get Sub-Account Transfer History (For Main Account, ues futures account) | X-BM-KEY | 8 times/2s 

### REST API

Speed limit judgment:

Each call to the interface will return 3 Response Headers with limit tags, as shown below:

> Example:

`X-BM-RateLimit-Remaining: 10 X-BM-RateLimit-Limit: 600 X-BM-RateLimit-Reset: 60 The above setting means that it can be called 600 times within 60 seconds, and currently has been called 10 times`

| Response Header | Description |
| --- | --- |
| X-BM-RateLimit-Remaining | The number of requests that have been used in the current time window 
| X-BM-RateLimit-Limit | The max number of requests in the current time window 
| X-BM-RateLimit-Reset | Current time window, in seconds 

Note that when X-BM-RateLimit-Remaining> X-BM-RateLimit-Limit, please do not continue to call, otherwise it will be banned

## Futures Public API Definitions

#### Field description

*   `symbol` is the name of the trading pair, consisting of the trading currency and the quote currency. Taking BTCUSDT as an example, BTC is the transaction currency, USDT is the pricing currency, and the transaction pair is mainly used in contract transactions
*   `order_id` order number, the order ID of the same currency pair of each business line is unique

#### Order State（Field:state)

*   `2`\=status\_check
*   `4`\=status\_finish

#### Order Side（Field:side)

*   `1`\=buy\_open\_long
*   `2`\=buy\_close\_short
*   `3`\=sell\_close\_long
*   `4`\=sell\_open\_short

#### Position（Field:position\_type)

*   `1`\=long
*   `2`\=short

#### Position Direction: (Field: position\_side)

*   `both` (For One-way position mode)
*   `long` (For Hedge position mode)
*   `short` (For Hedge position mode)

#### Order Type（Field:type)

*   `limit`
*   `market`
*   `liquidate`
*   `bankruptcy`
*   `adl`
*   `trailing`

#### Open Type（Field:open\_type)

*   `cross`
*   `isolated`

#### Order Mode（Field:mode)

*   `1`\=GTC (Good Till Cancel)
*   `2`\=FOK (Fill or Kill)
*   `3`\=IOC (Immediate or Cancel)
*   `4`\=Maker Only (Good Till Crossing)

#### Timestamp

All the times returned by the system are in the form of timestamps.
