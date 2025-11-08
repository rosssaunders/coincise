# GET Signature

**Source:** [Signature](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Signature

The authentication type of each API endpoint will be indicated. If it is marked as `SIGNED`,it means that the endpoint requires a signature to access. If it is marked as `KEYED`, it means that the endpoint only requires an API Access KEY to be set in the request header.

#### Authentication Type

-   `NONE`: Public endpoint, accessible to anyone
-   `KEYED`: Endpoint requires a valid X-BM-KEY to be set in the request header
-   `SIGNED`: Endpoint requires a valid X-BM-KEY and X-BM-SIGN signature to be set in the request header

### 1\. Setting Request Parameters

###### 1.1 Set Request Header Key

> Create X-BM-TIMESTAMP

`// Java System.currentTimeMillis();  // Python int(time.time() * 1000)  // Golang time.Now().UnixNano() / int64(time.Millisecond)  // Nodejs & TypeScript Date.now();  // Javascript Date.now();  // PHP round(microtime(true) * 1000)  // C# DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()`

-   `X-BM-KEY` (Your created API Access KEY)
-   `X-BM-SIGN` (Signature using Sha-256)
-   `X-BM-TIMESTAMP` (Current timestamp in milliseconds when the request is sent)

###### 1.2 Set Request Body Params

-   For `GET/DELETE` requests, the query string is in form format, such as `symbol=BMX&side=BUY`.
-   For `POST/PUT` requests, the query string is in JSON format, such as `{"symbol":"BMX","side":"BUY"}`.

### 2\. Example

> Shell Example

`echo -n '1589793796145#test001#{"symbol":"BTC_USDT","price":"8600","count":"100"}' | openssl dgst -sha256 -hmac "6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9"     (stdin)= c31dc326bf87f38bfb49a3f8494961abfa291bd549d0d98d9578e87516cee46d      curl --location --request POST 'localhost:8080/spot/v1/test-post'     --header 'Content-Type: application/json'     --header 'X-BM-KEY: 80618e45710812162b04892c7ee5ead4a3cc3e56'     --header 'X-BM-SIGN: c31dc326bf87f38bfb49a3f8494961abfa291bd549d0d98d9578e87516cee46d'     --header 'X-BM-TIMESTAMP: 1589793796145'     --d '{"symbol":"BTC_USDT","price":"8600","count":"100"}'`

-   Request API: /spot/v1/test-post (SIGNED)
-   Request method: POST
-   Current timestamp: timestamp=`1589793796145`
-   Request body: `{"symbol":"BTC_USDT","price":"8600","count":"100"}`

Then set the following:

-   X-BM-TIMESTAMP=`1589793796145`
-   X-BM-KEY=`Your_api_access_key`
-   X-BM-SIGN= hmac\_sha256(`Your_api_secret_key`, `X-BM-TIMESTAMP` + '#' + `Your_api_memo` + '#' + `{"symbol":"BTC_USDT","price":"8600","count":"100"}`)

Assuming the key you applied for is as follows:

-   `accessKey`\=80618e45710812162b04892c7ee5ead4a3cc3e56
-   `secretKey`\=6c6c98544461bbe71db2bca4c6d7fd0021e0ba9efc215f9c6ad41852df9d9df9
-   `memo`\=test001

then the right side is a complete request

You can also refer to the SDK or [Quick Start API](/en/quick/#python-quick-start) below to implement