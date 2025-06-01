# Basic Information

## API Basic Information

1.  This article lists the rest baseurl of the interfaces: https://api-cloud.bitmart.com
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

### The specific interface limits are as follows:

| System Interface | Interface Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /system/time | Get system time | IP | 10 times/sec 
| /system/service | Get system service status | IP | 10 times/sec 

| Funding Account Interface | Interface Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /account/v1/currencies | Get currencies | IP | 2 times/2 sec 
| /account/v1/wallet | Get account balance | X-BM-KEY | 12 times/2 sec 
| /account/v1/deposit/address | Deposit address | X-BM-KEY | 2 times/2 sec 
| /account/v1/withdraw/charge | Withdraw quota | X-BM-KEY | 2 times/2 sec 
| /account/v1/withdraw/apply | Withdraw | X-BM-KEY | 8 times/2 sec 
| /account/v1/withdraw/address/list | Withdraw Address | X-BM-KEY | 2 times/2 sec 
| /account/v2/deposit-withdraw/history | Get deposit and withdraw history V2 | X-BM-KEY | 8 times/2 sec 
| /account/v1/deposit-withdraw/detail | Get a deposit Or withdraw detail | X-BM-KEY | 8 times/2 sec 
| /spot/v1/margin/isolated/account | Get Margin Account Details(Isolated) | X-BM-KEY | 12 times/2 sec 
| /spot/v1/margin/isolated/transfer | Margin Asset Transfer | X-BM-KEY | 2 times/2 sec 
| /spot/v1/user_fee | Basic Fee Rate | X-BM-KEY | 2 times/2 sec 
| /spot/v1/trade_fee | Actual Trade Fee Rate | X-BM-KEY | 2 times/2 sec 

| Spot Public Market Interface | Interface Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /spot/v1/currencies | Get a list of all cryptocurrencies | IP | 8 times/2 sec 
| /spot/v1/symbols | Get a list of all trading pairs | IP | 8 times/2 sec 
| /spot/v1/symbols/details | Get a detailed list of all trading pairs | IP | 12 times/2 sec 
| /spot/quotation/v3/tickers | Get Ticker of All Pairs (V3) | IP | 10 times/2 sec 
| /spot/quotation/v3/ticker | Get Ticker of a Trading Pair(V3) | IP | 15 times/2 sec 
| /spot/quotation/v3/lite-klines | Get Latest K-Line (V3) | IP | 15 times/2 sec 
| /spot/quotation/v3/klines | Get History K-Line (V3) | IP | 10 times/2 sec 
| /spot/quotation/v3/books | Get Depth(V3) | IP | 15 times/2 sec 
| /spot/quotation/v3/trades | Get Recent Trades(V3) | IP | 15 times/2 sec 

| Spot Trading Interface | Interface Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /spot/v1/wallet | Get the user's wallet balance(KEYED) | X-BM-KEY | 12 times/2 sec 
| /spot/v2/submit_order | New Order(v2) (SIGNED) | UID | 40 times/2 sec 
| /spot/v4/batch_orders | New Batch Order(v4) (SIGNED) | UID | 40 times/2 sec 
| /spot/v1/margin/submit_order | New Margin Order (SIGNED) | UID | 20 times/1 sec 
| /spot/v3/cancel_order | Cancel Order(v3) (SIGNED) | UID | 40 times/2 sec 
| /spot/v4/cancel_orders | Cancel Batch Order(v4) (SIGNED) | UID | 40 times/2 sec 
| /spot/v4/cancel_all | Cancel All Order(v4) (SIGNED) | UID | 1 times/3 sec 
| /spot/v4/query/order | Query Order By Id(v4) (SIGNED) | X-BM-KEY | 50 times/2 sec 
| /spot/v4/query/client-order | Query Order By clientOrderId(v4) (SIGNED) | X-BM-KEY | 50 times/2 sec 
| /spot/v4/query/open-orders | Current Open Orders(v4) (SIGNED) | X-BM-KEY | 12 times/2 sec 
| /spot/v4/query/history-orders | Account Orders(v4) (SIGNED) | X-BM-KEY | 12 times/2 sec 
| /spot/v4/query/trades | Account Trade List(v4) (SIGNED) | X-BM-KEY | 12 times/2 sec 
| /spot/v4/query/order-trades | Order Trade List(v4) (SIGNED) | X-BM-KEY | 12 times/2 sec 

| Sub-Account Interface | Interface Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /account/sub-account/main/v1/sub-to-main | Sub-Account Spot Asset Transfer (For Main Account) | X-BM-KEY | 2 times/2 sec 
| /account/sub-account/sub/v1/sub-to-main | Sub-Account Spot Asset Transfer (For Sub-Account) | X-BM-KEY | 2 times/2 sec 
| /account/sub-account/main/v1/main-to-sub | Main Account Spot Asset Transfer (For Main Account) | X-BM-KEY | 2 times/2 sec 
| /account/sub-account/sub/v1/sub-to-sub | Sub-Account to Sub-Account Spot Asset Transfer (For Sub-Account) | X-BM-KEY | 2 times/2 sec 
| /account/sub-account/main/v1/sub-to-sub | Sub-account to Sub-Account Spot Asset Transfer (For Main Account) | X-BM-KEY | 2 times/2 sec 
| /account/sub-account/main/v1/transfer-list | Query Sub-account Spot Asset Transfer History (For Main Account) | X-BM-KEY | 8 times/2 sec 
| /account/sub-account/v1/transfer-history | Get Account Spot Asset Transfer History | X-BM-KEY | 8 times/2 sec 
| /account/sub-account/main/v1/wallet | Get Sub-Account Spot Wallet Balance (For Main Account) | X-BM-KEY | 12 times/2 sec 
| /account/sub-account/main/v1/subaccount-list | Get Sub-account List (For Main Account) | X-BM-KEY | 8 times/2 sec 

| Margin Loan Interface | Interface Name | Limit Target | Rate |
| --- | --- | --- | --- |
| /spot/v1/margin/isolated/borrow | Margin Borrow (Isolated) | X-BM-KEY | 2 times/2 sec 
| /spot/v1/margin/isolated/repay | Margin Repay (Isolated) | X-BM-KEY | 2 times/2 sec 
| /spot/v1/margin/isolated/borrow_record | Get Borrow Record(Isolated) | X-BM-KEY | 150 times/2 sec 
| /spot/v1/margin/isolated/repay_record | Get Repayment Record(Isolated) | X-BM-KEY | 150 times/2 sec 
| /spot/v1/margin/isolated/pairs | Get Trading Pair Borrowing Rate and Amount | X-BM-KEY | 2 times/2 sec 

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

## About recvWindow, timestamp

Currently only applicable to v4 interfaces

### Time synchronization security

Signed interfaces require the timestamp parameter to be passed, whose value should be the Unix timestamp (in milliseconds) at the time the request is sent, set in the `X-BM-TIMESTAMP` header of the request. When the server receives the request, it will check the timestamp in the request. If it was sent more than 5000 milliseconds ago, the request will be considered invalid. This time window value can be defined by sending the optional parameter `recvWindow`.

The pseudo code for this logic is as follows:

  `if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow)   {     // process request   }    else    {     // reject request   }`

### About trade timeliness

The internet is not always stable and reliable, so there may be latency fluctuations between your program and the BitMart server. This is the purpose of setting `recvWindow`. If you are engaged in high-frequency trading and have high requirements for trade timeliness, you can set recvWindow flexibly to meet your requirements.

It is recommended to use a recvWindow of less than 5 seconds! It cannot exceed 60 seconds at most!

## Public API Definitions

#### Field description

*   `currency` Currency refers to the basic unit that can be transferred in and out, such as BTC, ETH, EOS, etc
*   `symbol` Trading pair name, consists of base and quote currency. Taking BTC\_USDT as an example, BTC is the base currency, and USDT is the quote currency. Trading pairs are mainly used in spot trading
*   `orderId` Order number, the order ID under the same currency pair of each business line is unique
*   `tradeId` The unique number of the trade

#### Order State （Field:state)

*   `new`\=The order has been accepted by the engine.
*   `partially_filled`\=A part of the order has been filled.
*   `filled`\=The order has been completed.
*   `canceled`\=The order has been canceled.
*   `partially_canceled`\=A part of the order has been filled, and the order has been canceled.

#### Order Cancellation Reason （Field:cancelSource)

*   `user`\=User manually canceled.
*   `system`\=System automatically canceled.

#### Order Side （Field:side)

*   `buy`\=Buy
*   `sell`\=Sell

#### Order Type （Field:type)

*   `limit`\=Limit Order
*   `market`\=Market Order
*   `limit_maker`\=PostOnly Order
*   `ioc`\=IOC Order

#### Trade Role （Field:tradeRole)

*   `taker`\=Take orders, take the initiative to deal
*   `maker`\=Pending order, passive transaction

#### Timestamp

All the times returned by the system are in the form of timestamps.
