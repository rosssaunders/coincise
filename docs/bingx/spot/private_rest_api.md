# Introduction

Welcome to the [BingX](https://bingx.com) API, welcome to sign up for the BingX BrokerProject [BingX Broker Program Application](https://docs.google.com/forms/d/e/1FAIpQLSfO4Ws3UO13h_9tcnRKKGJD6QTvTM8q32hmpNQlzB4tofup7g/viewform)

You can use our API to access market data endpoints of spot trading. The market data API is publicly accessible and provides market data, statistics, order book depth of a Trading Pair.

If you have any questions or feedback, you can join the [API issue Telegram group](https://t.me/+uSWmuaKA5sw2MzE1).

---

# Frequently Asked Questions

Q: What is UID?

A: UID stands for User ID, which is a unique identifier for each user (including parent users and sub-users). UID can be viewed in the personal information section of the web or app interface, and it can also be obtained through the GET /openApi/account/v1/uid interface.

Q: How many API Keys can a user apply for?

A: Each parent user can create up to 20 sets of API Keys. Each parent user can also create up to 20 sub-users, and each sub-user can create up to 20 sets of API Keys. Each API Key can be set with different permissions.

Q: Why do I often experience disconnections and timeouts?

A: It could be due to network fluctuations. We recommend reconnecting in such cases.

Q: Why does WebSocket connection always get disconnected?

A: You can check if your code returns a Pong after receiving a Ping. If you are subscribing to account-related websockets, please also check if you are regularly updating the listenkey. We recommend using our sample code first.

Q: Why does signature authentication always fail?

A: Please carefully read our signature authentication instructions, or test using our sample code first.

Q: Is the API Key for U-based contracts the same as Spot trading?

A: The API Key for U-based contracts is the same as the API Key for Spot trading. However, the permissions for spot trading and contract trading are separate and need to be configured accordingly.

Q: How many types of risk control restrictions does BingX have for APIs?

A: BingX has three types of risk control strategies for APIs: api rate limiting, trading restrictions, and network firewall restrictions. These restrictions may change at any time.

Interface rate limiting:

- The rate limiting for each api may vary. Please refer to the specific api documentation for details.

Trading restrictions: Trading behavior is evaluated based on the behavior of regular users. If your trading behavior deviates significantly from that of regular users, you may be prohibited from trading, and the duration of the prohibition is uncertain. The duration of the trading prohibition may increase under the following circumstances:

- 1\. Frequently occupying the best bid and ask prices.
- 2\. Frequently placing/canceling orders without any trades.
- 3\. Very low trade completion rate, where the completion rate = number of trades / (number of placed orders + number of canceled orders).
- 4\. Very low trade weight, where the trade weight = total trade amount / (total placed order amount + total canceled order amount).
- 5\. Continuously sending frequent requests after receiving a 429 error response.

Network Firewall Restrictions

- Currently, we do not provide explicit information about network firewall restrictions. If you receive an HTTP 403 error message, it means you have violated a network firewall rule. In most cases, this error occurs due to excessive requests and will result in a five-minute temporary ban. However, if your requests are considered malicious, it may lead to a longer ban or even permanent suspension.

Q: How to report API api errors?

Please contact our official customer service and provide the following template to report the issue. Our technical support will assist you:

- 1\. Problem description
- 2\. User ID (UID) and order ID (if related to account or order), API KEY
- 3\. Complete request parameters (if applicable)
- 4\. Complete JSON formatted response
- 5\. Time and frequency of the issue (when it started, if it can be reproduced)
- 6\. Signature information

Q: Does the API support standard contract trading?

A: Currently not supported.

Q: Does the API support stock and forex trading?

A: Currently not supported.

Q: Does the mobile app support API management?

A: This feature is under development.

Q: How many channels can be subscribed per IP address on BingX?

A: Currently, there is no limit, but there is a subscription rate limit. Please do not exceed 10/s.

---

# General Info

## Service Address

https://open-api.bingx.com

Alternate domain name: open-api.bingx.io (total frequency limit: 60/min) Release the frequency limit of the alternate domain name only when there is a problem with the primary domain name open-api.bingx.com

HTTP 200 status code indicates a successful response. The response body might contain a message which will be displayed accordingly.

## Common Error Codes

#### Types:

- 4XX error codes are used to indicate wrong request content, behavior, format.

- 5XX error codes are used to indicate problems with the Bingx service.

#### Common business error codes:

- 100001 - signature verification failed#

- 100202 - Insufficient balance

- 100204 - No data

- 100400 - Invalid parameter

- 100440 - Order price deviates greatly from the market price

- 100500 - We had a problem with our server

- 100503 - Server busy

100202

- Insufficient assets
- The current system is busy, please try again later

100421

- The current system is busy, please try again later

100400

- quantity/quoteOrderQty can't both be lte 0 in limit order
- The current system is busy, please try again later
- The same order can only be submitted once per second.
- invalid symbol, send symbol like BTC-USDT
- The minimum amount per order is \*
- miss arguments

100414

- The account is abnormal, please contact customer service.

100413

- Incorrect apiKey
- Null apiKey

#### Notes:

- If it fails, there will be an error description included in the response body.

- Errors may be thrown from every interface.

## Rate limit

If the request is too frequent, the system will automatically restrict the request and recover after 5 minutes;

Based on account UID rate limit, each api has its own independent rate limit, which does not affect each other

Users can check the current frequency limit usage and the expiration of the time window according to "X-RateLimit-Requests-Remain" (remaining number of frequency limits) and "X-RateLimit-Requests-Expire" (window expiration time) in the Http Header. time, and dynamically adjust your request frequency based on this value.

#### REST API

The API requests are subject to different rate limits based on UID and IP. Please refer to the respective API documentation for UID rate limits. IP rate limits are based on the following grouping rules:

- Market API Group \[1\]: The total IP rate limit for all interfaces within the group is 100 requests per 10 seconds.

- Account API Group \[2\]: The total IP rate limit for all interfaces within the group is 1000 requests per 10 seconds, with an individual IP rate limit of 100 requests per 10 seconds for each interface.

- Account API Group \[3\]: The total IP rate limit for all interfaces within the group is 1000 requests per 10 seconds, with an individual IP rate limit of 200 requests per 10 seconds for each interface.

## Server time

https://open-api.bingx.com/openApi/spot/v1/server/time

---

# Authentication

## Generate an API Key

- Before being able to sign any requests, you must create an API Key at the API Management page on[BingX](https://bingx.com)Upon creating a key you will have 2 pieces of information which you should remember:API key and Secret key.
- While setting the API key, it is recommended to set the IP access whitelist for security reasons
- Never tell anyone your API key/Secret key

If the API key is accidentally leaked, please delete it immediately and produce a new API key

## Permission Settings

- The default permission for newly created APIs is read-only.
- If you need to perform write operations such as placing an order through the API, you need to modify it to the corresponding permission on the UI.

## Make Requests

All private REST requests must contain the following parameters:

- Pass the API Key with X-BX-APIKEY on the request header.
- The request parameter carries the signature obtained by using the signature algorithm.
- timestamp is the timestamp of your request, in milliseconds. When the server receives the request, it will judge the timestamp in the request. If it is sent before 5000 milliseconds, the request will be considered invalid. This time window value can be defined by sending the optional parameter recvWindow.

## Signature Description

signatureRequest parameter by using HMAC SHA256 encode

for example

- api parameters

symbol=BTC-USDT

timestamp=1696751141337

recvWindow=0

- api information

apiKey = hO6oQotzTE0S5FRYze2Jx2wGx7eVnJGMolpA1nZyehsoMgCcgKNWQHd4QgTFZuwl4Zt4xMe2PqGBegWXO4A

secretKey = mheO6dR8ovSsxZQCOYEFCtelpuxcWGTfHw7te326y6jOwq5WpvFQ9JNljoTwBXZGv5It07m9RXSPpDQEK2w

- Example of sending parameters through query string

1\. Splice all api parameters (without sorting)

recvWindow=0&symbol=BTC-USDT&timestamp=1696751141337

2\. Use secretKey to generate a signature for the concatenated parameter string: 1e63e8cfd1c04919881e60cf369e404b9b7c87d3a09bc300f1abfdcce7da57e8

echo -n "recvWindow=0&symbol=BTC-USDT&timestamp=1696751141337" | openssl dgst -sha256 -hmac "mheO6dR8ovSsxZQCOYEFCtelpuxcWGTfHw7te326y6jOwq5WpvFQ9JNljoTwBXZGv5It07m9RXSPpDQEK2w" -hex

3\. Send request

Some query string scenarios (such as a='1 '&b={a:'2'}) require URL encoding for each value of the request parameters, only for the value value, without URL encoding for the field key, nor for the entire original parameters string. Here is a special field: the value of timestamp does not require URL encoding. Please refer to[URL encoding scenario description](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#Bulk%20order)

- Example of sending parameters through request body

1\. Sort and concatenate all api parameters according to (a-z) (sorting required)

recvWindow=0&subAccountString=abc12345&timestamp=1696751141337

2\. Use secretKey to generate a signature for the concatenated parameter string:1e63e8cfd1c04919881e60cf369e404b9b7c87d3a09bc300f1abfdcce7da57e8

echo -n "recvWindow=0&subAccountString=abc12345&timestamp=1696751141337" | openssl dgst -sha256 -hmac "mheO6dR8ovSsxZQCOYEFCtelpuxcWGTfHw7te326y6jOwq5WpvFQ9JNljoTwBXZGv5It07m9RXSPpDQEK2w" -hex

3\. Combine into JSON, place the request body, and set header: 'Content Type': 'application/JSON'

{"recvWindow":0,"subAccountString":"abc12345","timestamp":1696751141337,"signature":"1e63e8cfd1c04919881e60cf369e404b9b7c87d3a09bc300f1abfdcce7da57e8"}

## Requests

Root URL for REST access: https://open-api.bingx.com

Alternate domain name: open-api.bingx.io (total frequency limit: 60/min) Release the frequency limit of the alternate domain name only when there is a problem with the primary domain name open-api.bingx.com

Request Description

- Request parameter: Parameter encapsulation is performed according to the api request parameter specification.

- Submit request parameters: Submit the encapsulated request parameters to the server through POST/GET/DELETE, etc.

- Server response: The server first performs parameter security verification on the user request data, and returns the response data to the user in JSON format after passing the verification according to the business logic.

- Data processing: process the server response data.

Success

- A successful response is indicated by HTTP status code 200 and may optionally contain a body. If the response has a body, it will be included under each resource below.

---

# Trades Endpoints

## Place order

POST /openApi/spot/v1/trade/order

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Description

Can be used to place 1 order on spot

Notice:

- For limit orders, price is required.
- or limit orders, either quantity or quoteOrderQty is required. When two parameters are passed at the same time, the server uses the parameter quantity first.
- For buy-side market orders, quoteOrderQty is required.
- For sell-side market orders, quantity is required.

Trading Rules:

- Trading Rules: [https://bingx.com/en/spot/trading-rules/](https://bingx.com/en/spot/trading-rules/)
- About price accuracy and quantity accuracy reference interface: [https://open-api.bingx.com/openApi/spot/v1/common/symbols](https://open-api.bingx.com/openApi/spot/v1/common/symbols)
- If the accuracy exceeds the range of the current period, the current API order will still be successful, but it will be truncated. For example, the price requirement is: 0.0001, if the order is 0.123456, it will be successfully submitted with 0.1234.

- For price reference, please check: [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)
- For Minimum/Maximum transaction amount reference, please check: [GET /openApi/spot/v1/common/symbols](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#Query%20Symbols)

If the spot trader of copy trading has enabled the function

- The order frequency can only be 1/s, exceeding it will be limited frequency.
- BUY can use this endpoint:POST /openApi/spot/v1/trade/order
- SELL need to use another specific endpoint:[POST /openApi/copyTrading/v1/spot/trader/sellOrder](http://localhost:1024/#/en-us/copyTrade/trader-interface.html#Trader%20sells%20spot%20assets%20based%20on%20buy%20order%20number)

### Order Type

MARKET: Market Price

LIMITED: Limit Price

TAKE\_ STOP\_ Limit: Limit Price Stop Profit Stop Loss Order

TAKE\_ STOP\_ MARKET: Market price stop loss order

TRIGGER\_ Limit: Price limit plan commission

TRIGGER\_ Market: Market price plan commission

### Request Parameters

| Parameter Name   | Type    | Required | Description                                                                                                                                                                                       |
| ---------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol           | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                                                      |
| side             | string  | yes      | BUY/SELL                                                                                                                                                                                          |
| type             | string  | yes      | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                                                                                        |
| stopPrice        | string  | 是       | order trigger price, used for TAKE\_ STOP\_ LIMITED,TAKE\_ STOP\_ MARKET, TRIGGER\_ LIMITED, TRIGGER\_ Market type orders.                                                                        |
| quantity         | float64 | no       | Original quantity, e.g., 0.1BTC                                                                                                                                                                   |
| quoteOrderQty    | float64 | no       | Quote order quantity, e.g., 100USDT,if quantity and quoteOrderQty are input at the same time, quantity will be used first, and quoteOrderQty will be discarded                                    |
| price            | float64 | no       | Price, e.g., 10000USDT                                                                                                                                                                            |
| newClientOrderId | string  | no       | Only letters, numbers and \_,Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same newClientOrderId,Only supports a query range of 2 hours |
| timeInForce      | string  | no       | Time in force, currently supports PostOnly, GTC, IOC, FOK. Default is GTC if not specified.                                                                                                       |
| recvWindow       | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                                                               |
| timestamp        | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                                                           |

### Response Parameters

| Parameter Name      | Type   | Description                                                            |
| ------------------- | ------ | ---------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                           |
| orderId             | int64  | Order ID                                                               |
| transactTime        | int64  | Transaction timestamp                                                  |
| price               | string | Price                                                                  |
| origQty             | string | Original quantity                                                      |
| executedQty         | string | Executed quantity                                                      |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                             |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED |
| type                | string | MARKET/LIMIT                                                           |
| side                | string | BUY/SELL                                                               |
| clientOrderID       | string | Customized order ID for users                                          |

### Errors

| Error Code | Description                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                                                                                                             |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets                                                                                     |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                                                                                                    |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                                                                                                              |
| 100410     | rate limited                                                                                                                                                                                                                                     |
| 100413     | Incorrect apiKey                                                                                                                                                                                                                                 |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                                                                                                                  |
| 100202     | Insufficient assets, please verify the assets status                                                                                                                                                                                             |
| 100421     | traders prohibit openApi from placing orders                                                                                                                                                                                                     |
| 100414     | Your account is under risk control or without KYC, it's not allowed to place spot order via api,currently,please contact customer service                                                                                                        |
| 100400     | check limit entrust value fail, entrust volume too low, userID: \*\*\*, minVolume:69.93, entrustVolume: 54.02                                                                                                                                    |
| 100400     | check param fail:entrust volume and value is 0.0                                                                                                                                                                                                 |
| 100414     | risk control check fail, code(1), reason()                                                                                                                                                                                                       |
| 100490     | spot symbol is offline                                                                                                                                                                                                                           |
| 100500     | order open error:The current system is busy, please try again later, and the previous cancel order request result:false, order not exist                                                                                                         |
| 100440     | check price diverge fail, entrustPrice to high, userID: \*\*\*,entrustPrice:0.4950, indexPrice:0.0910,tradePrice: 0.0910, maxEntrustPriceDiverge:0.4550, minEntrustPriceDiverge:0.0182,minDivergeRatio:0.2000000000,maxDivergeRatio:5.0000000000 |
| 100400     | price can't be lte 0 in limit order                                                                                                                                                                                                              |
| 100421     | The symbol you request is not available to place order currently, please verify symbol's status by api:/openApi/spot/v1/common/symbols                                                                                                           |
| 100421     | CheckUserAndSymbol: contract not exist                                                                                                                                                                                                           |
| 100421     | cancel fail, order not exist                                                                                                                                                                                                                     |
| 100400     | the order you want to cancel is FILLED or CANCELLED already, or is not a valid order id ,please verify                                                                                                                                           |

## Place multiple orders

POST /openApi/spot/v1/trade/batchOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Description

Can be used to place orders in bulk on spot

Notes

- For a limit order, the "price" parameter must be included.
- For a limit order, either "quantity" or "quoteOrderQty" must be included. If both parameters are provided, the server will prioritize the "quantity" parameter.
- For a market buy order, the "quoteOrderQty" parameter must be included.
- For a market sell order, the "quantity" parameter must be included.
- Orders created through the api will not be displayed on the app and web pages.

If you need to calculate the maximum and minimum order quantities for a currency pair, you can use the formula: U (minNotional or maxNotional) / (Limit price or Market price)

- For price reference, please check: [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)
- For Minimum/Maximum transaction amount reference, please check: [GET /openApi/spot/v1/common/symbols](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#Query%20Symbols)

Trading Rules:

- Trading Rules: [https://bingx.com/en/spot/trading-rules/](https://bingx.com/en/spot/trading-rules/)
- About price accuracy and quantity accuracy reference interface: [https://open-api.bingx.com/openApi/spot/v1/common/symbols](https://open-api.bingx.com/openApi/spot/v1/common/symbols)
- If the accuracy exceeds the range of the current period, the current API order will still be successful, but it will be truncated. For example, the price requirement is: 0.0001, if the order is 0.123456, it will be successfully submitted with 0.1234.

- place batch orders, how to sign the request? please refer to [Perpetual: place batch orders](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#Bulk%20order)

### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                                                                                                                                                     |
| -------------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data           | array | Yes      | The request array for placing orders, limited to 5 orders.                                                                                                                                                                      |
| sync           | bool  | no       | sync=false (default false if not filled in): parallel ordering (but all orders need to have the same symbol/side/type), sync = true (multiple orders are ordered serially, all orders do not require the same symbol/side/type) |

### Response Parameters

| Parameter Name | Type  | Description                       |
| -------------- | ----- | --------------------------------- |
| orders         | array | Response array for a single order |

### Data Parameters

|                  | Description                                                                                                                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol           | Trading symbol, for example: BTC-USDT, please use capital letters.                                                                                                                                |
| side             | Transaction type, BUY = buy SELL = sell                                                                                                                                                           |
| type             | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                                                                                        |
| stopPrice        | order trigger price, used for TAKE\_ STOP\_ LIMITED,TAKE\_ STOP\_ MARKET, TRIGGER\_ LIMITED, TRIGGER\_ Market type orders.                                                                        |
| quantity         | Order quantity, for example: 0.1BTC                                                                                                                                                               |
| quoteOrderQty    | Order amount, for example: 100 USDT                                                                                                                                                               |
| price            | Order price, for example: 10,000 USDT                                                                                                                                                             |
| newClientOrderId | Only letters, numbers and \_,Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same newClientOrderId,Only supports a query range of 2 hours |
| timeInForce      | Time in force, currently supports PostOnly, GTC, IOC, FOK. Default is GTC if not specified.                                                                                                       |
| recvWindow       | Request validity time window, unit: milliseconds                                                                                                                                                  |
| timestamp        | Request timestamp, unit: milliseconds                                                                                                                                                             |

### Order Parameters

|                     | Description                                                                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | Trading symbol, for example: BTC-USDT, please use capital letters.                                                                                                          |
| orderId             | Order number, please watch out for numeric overflow                                                                                                                         |
| transactTime        | Transaction timestamp, in milliseconds                                                                                                                                      |
| price               | Order price                                                                                                                                                                 |
| origQty             | Order quantity                                                                                                                                                              |
| executedQty         | Filled amount                                                                                                                                                               |
| cummulativeQuoteQty | Volume                                                                                                                                                                      |
| status              | Order status, NEW = New order PENDING = Pending order PARTIALLY_FILLED = Partially filled order FILLED = Fully filled order CANCELED = Canceled order FAILED = Failed order |
| type                | Order type, MARKET = market price LIMIT = limit price                                                                                                                       |
| side                | Transaction type, BUY = buy SELL = sell                                                                                                                                     |
| clientOrderID       | Customized order ID for users                                                                                                                                               |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Cancel Order

POST /openApi/spot/v1/trade/cancel

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name     | Type    | Required | Description                                                                                                                                                       |
| ------------------ | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol             | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                      |
| orderId            | int64   | no       | Order ID                                                                                                                                                          |
| clientOrderID      | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same clientOrderID,Only supports a query range of 2 hours |
| cancelRestrictions | string  | no       | Cancel orders with specified status: NEW: new order, PENDING: order in progress, PARTIALLY_FILLED: partially filled                                               |
| recvWindow         | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                               |
| timestamp          | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                           |

### Response Parameters

| Parameter Name      | Type   | Description                                                                |
| ------------------- | ------ | -------------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                               |
| orderId             | int64  | Order ID                                                                   |
| price               | string | Price                                                                      |
| origQty             | string | Original quantity                                                          |
| executedQty         | string | Executed quantity                                                          |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                                 |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string | BUY/SELL                                                                   |
| clientOrderID       | string | Customized order ID for users                                              |
| stopPrice           | string | trigger price                                                              |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Cancel multiple orders

POST /openApi/spot/v1/trade/cancelOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                            |
| -------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                           |
| process        | int     | no       | 0 or 1, default 0,if process=1,will handle valid orderIds partially, and return invalid orderIds in fails list, if process=0,if one of orderIds invalid, will all fail |
| orderIds       | string  | yes      | Order Ids: for example:orderIds=id1,id2,id3                                                                                                                            |
| clientOrderIDs | string  | no       | Custom order IDs, for example: clientOrderIDs=id1,id2,id3                                                                                                              |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                                    |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                                |

### Response Parameters

| Parameter Name      | Type    | Description                                                                |
| ------------------- | ------- | -------------------------------------------------------------------------- |
| symbol              | string  | Trading pair                                                               |
| orderId             | int64   | Order ID                                                                   |
| price               | string  | Price                                                                      |
| origQty             | string  | Original quantity                                                          |
| executedQty         | string  | Executed quantity                                                          |
| cummulativeQuoteQty | string  | Cumulative quote asset transacted quantity                                 |
| status              | string  | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string  | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string  | BUY/SELL                                                                   |
| clientOrderID       | string  | Customized order ID for users                                              |
| stopPrice           | float64 | trigger price                                                              |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Cancel all Open Orders on a Symbol

POST /openApi/spot/v1/trade/cancelOpenOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                        |
| -------------- | ------- | -------- | ------------------------------------------------------------------ |
| symbol         | string  | no       | Trading pair, e.g., BTC-USDT,If not filled out, cancel all orders. |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds            |

### Response Parameters

| Parameter Name      | Type   | Description                                                                |
| ------------------- | ------ | -------------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                               |
| orderId             | int64  | Order ID                                                                   |
| price               | string | Price                                                                      |
| origQty             | string | Original quantity                                                          |
| executedQty         | string | Executed quantity                                                          |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                                 |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string | BUY/SELL                                                                   |
| clientOrderID       | string | Customized order ID for users                                              |
| stopPrice           | string | trigger price                                                              |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Cancel an Existing Order and Send a New Orde

POST /openApi/spot/v1/trade/order/cancelReplace

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name      | Type    | Required | Description                                                                                                                                                                                            |
| ------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol              | string  | yes      | The trading pair, for example: BTC-USDT, please use uppercase letters                                                                                                                                  |
| cancelOrderId       | int64   | no       | The ID of the order to be canceled                                                                                                                                                                     |
| cancelClientOrderID | string  | no       | The user-defined ID of the order to be canceled, character length limit: 1-40, different orders cannot use the same clientOrderID, only supports a query range of 2 hours                              |
| cancelRestrictions  | string  | no       | Cancel orders with specified status: NEW: New order, PENDING: Pending order, PARTIALLY_FILLED: Partially filled                                                                                        |
| CancelReplaceMode   | string  | yes      | STOP_ON_FAILURE: If the cancel order fails, it will not continue to place a new order. ALLOW_FAILURE: Regardless of whether the cancel order succeeds or fails, it will continue to place a new order. |
| side                | string  | yes      | The type of transaction, BUY: Buy, SELL: Sell                                                                                                                                                          |
| type                | string  | yes      | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                                                                                             |
| stopPrice           | string  | yes      | Trigger price used for TAKE_STOP_LIMIT, TAKE_STOP_MARKET, TRIGGER_LIMIT, TRIGGER_MARKET order types.                                                                                                   |
| quantity            | float64 | no       | Order quantity, e.g. 0.1BTC                                                                                                                                                                            |
| quoteOrderQty       | float64 | no       | Order amount, e.g. 100USDT                                                                                                                                                                             |
| price               | float64 | no       | Order price, e.g. 10000USDT                                                                                                                                                                            |
| newClientOrderId    | string  | no       | Custom order ID consisting of letters, numbers, and \_. Character length should be between 1-40. Different orders cannot use the same newClientOrderId.                                                |
| recvWindow          | float64 | no       | Request valid time window in milliseconds.                                                                                                                                                             |
| timestamp           | int64   | yes      | Request timestamp in milliseconds.                                                                                                                                                                     |

### Response Parameters

| Parameter Name      | Type   | Description                                                                                                                                   |
| ------------------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol              | string | Trading symbol                                                                                                                                |
| orderId             | int64  | Order ID                                                                                                                                      |
| price               | string | Order price                                                                                                                                   |
| origQty             | string | Order quantity                                                                                                                                |
| executedQty         | string | Executed quantity                                                                                                                             |
| cummulativeQuoteQty | string | Cumulative quote quantity                                                                                                                     |
| status              | string | Order status: NEW (new order), PENDING (pending), PARTIALLY_FILLED (partially filled), FILLED (filled), CANCELED (cancelled), FAILED (failed) |
| type                | string | Order type: MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                                                        |
| side                | string | Transaction type: BUY (buy), SELL (sell)                                                                                                      |
| clientOrderID       | string | User-defined order ID                                                                                                                         |
| stopPrice           | string | Trigger price                                                                                                                                 |
| cancelRestrictions  | string | Cancel orders in specific states: NEW (new order), PENDING (pending), PARTIALLY_FILLED (partially filled)                                     |
| transactTime        | int64  | Transaction timestamp                                                                                                                         |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query Order details

GET /openApi/spot/v1/trade/query

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                                                                                                       |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | yes      | Trading pair, e.g., BTC-USDT                                                                                                                                      |
| orderId        | int64   | no       | Order ID                                                                                                                                                          |
| clientOrderID  | string  | no       | Customized order ID for users, with a limit of characters from 1 to 40. Different orders cannot use the same clientOrderID,Only supports a query range of 2 hours |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                                                                                                               |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                                                                                                           |

### Response Parameters

| Parameter Name      | Type   | Description                                                                |
| ------------------- | ------ | -------------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                               |
| orderId             | int64  | Order ID                                                                   |
| price               | string | Price                                                                      |
| origQty             | string | Original quantity                                                          |
| executedQty         | string | Executed quantity                                                          |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                                 |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string | BUY/SELL                                                                   |
| time                | int64  | Order timestamp                                                            |
| updateTime          | int64  | Update timestamp                                                           |
| origQuoteOrderQty   | string | Original quote order quantity                                              |
| fee                 | string | Fee                                                                        |
| feeAsset            | string | Fee asset                                                                  |
| clientOrderID       | string | Customized order ID for users                                              |
| stopPrice           | string | trigger price                                                              |
| avgPrice            | string | average fill price                                                         |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Current Open Orders

GET /openApi/spot/v1/trade/openOrders

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type    | Required | Description                                                            |
| -------------- | ------- | -------- | ---------------------------------------------------------------------- |
| symbol         | string  | no       | Trading pair, e.g., BTC-USDT,Query all pending orders when left blank. |
| recvWindow     | float64 | no       | Request valid time window value, Unit: milliseconds                    |
| timestamp      | int64   | yes      | Timestamp of initiating the request, Unit: milliseconds                |

### Response Parameters

| Parameter Name | Type  | Description                                                              |
| -------------- | ----- | ------------------------------------------------------------------------ |
| orders         | Array | Order list,max length is 2000, refer to the table below for order fields |

### Order Parameters

| Parameter Name      | Type   | Description                                                                |
| ------------------- | ------ | -------------------------------------------------------------------------- |
| symbol              | string | Trading pair                                                               |
| orderId             | int64  | Order ID                                                                   |
| price               | string | Price                                                                      |
| origQty             | string | Original quantity                                                          |
| executedQty         | string | Executed quantity                                                          |
| cummulativeQuoteQty | string | Cumulative quote asset transacted quantity                                 |
| status              | string | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string | BUY/SELL                                                                   |
| time                | int64  | Order timestamp                                                            |
| updateTime          | int64  | Update timestamp                                                           |
| origQuoteOrderQty   | string | Original quote order quantity                                              |
| stopPrice           | string | trigger price                                                              |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query Order history

GET /openApi/spot/v1/trade/historyOrders

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Notice:

- If orderId is set, orders >= orderId. Otherwise, the most recent orders will be returned.
- If startTime and endTime are provided, orderId is not required.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                    |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | Trading pair, e.g., BTC-USDT                                                                                   |
| orderId        | int64  | no       | If orderId is set, orders >= orderId. Otherwise, the most recent orders will be returned.                      |
| startTime      | int64  | no       | Start timestamp, Unit: ms                                                                                      |
| endTime        | int64  | no       | End timestamp, Unit: ms                                                                                        |
| pageIndex      | int64  | no       | Page number, must >0,If not specified, it defaults to 1. Restriction: pageIndex \* pageSize <= 10,000.         |
| pageSize       | int64  | no       | Page size, must >0,Max 100,If not specified, it defaults to 100. Restriction: pageIndex \* pageSize <= 10,000. |
| status         | string | no       | status: FILLED (fully filled) CANCELED: (canceled) FAILED: (failed)                                            |
| type           | string | no       | order type: MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                         |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                            |
| timestamp      | int64  | yes      | Timestamp of initiating the request, Unit: milliseconds                                                        |

### Response Parameters

| Parameter Name | Type  | Description                                                              |
| -------------- | ----- | ------------------------------------------------------------------------ |
| orders         | Array | Order list,max length is 2000, refer to the table below for order fields |

### Order Parameters

| Parameter Name      | Type    | Description                                                                |
| ------------------- | ------- | -------------------------------------------------------------------------- |
| symbol              | string  | Trading pair                                                               |
| orderId             | int64   | Order ID                                                                   |
| price               | string  | Price                                                                      |
| origQty             | string  | Original quantity                                                          |
| executedQty         | string  | Executed quantity                                                          |
| cummulativeQuoteQty | string  | Cumulative quote asset transacted quantity                                 |
| status              | string  | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string  | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string  | BUY/SELL                                                                   |
| time                | int64   | Order timestamp                                                            |
| updateTime          | int64   | Update timestamp                                                           |
| origQuoteOrderQty   | string  | Original quote order quantity                                              |
| fee                 | float64 | fee                                                                        |
| stopPrice           | string  | trigger price                                                              |
| avgPrice            | string  | average fill price                                                         |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query transaction details

GET /openApi/spot/v1/trade/myTrades

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

- Can only check data within the past 7 days range

- If trigTime/endTime is not filled in or invalid, the data of the past 24 hours is returned by default

- Simultaneously limit the maximum number of returns limit = 500

- Return to the list sorted by time field, from smallest to largest

### Request Parameters

| Parameter Name | Type    | Required | Description                                                       |
| -------------- | ------- | -------- | ----------------------------------------------------------------- |
| symbol         | string  | Yes      | Trading pair, e.g. BTC-USDT, please use uppercase letters         |
| orderId        | long    | no       | Order ID                                                          |
| startTime      | long    | No       | Start timestamp, unit: ms                                         |
| endTime        | long    | No       | End timestamp, unit: ms                                           |
| fromId         | long    | No       | Starting trade ID. By default, the latest trade will be retrieved |
| limit          | long    | No       | Default 500, maximum 1000                                         |
| recvWindow     | float64 | No       | Request valid time window, unit: milliseconds                     |
| timestamp      | int64   | Yes      | Request timestamp, unit: milliseconds                             |

### Response Parameters

| Parameter Name  | Type    | Description                 |
| --------------- | ------- | --------------------------- |
| symbol          | string  | Trading symbol              |
| id              | int     | Trade ID                    |
| orderId         | int64   | Order ID                    |
| price           | string  | Price of the trade          |
| qty             | string  | Quantity of the trade       |
| quoteQty        | string  | Quote asset quantity traded |
| commission      | float64 | Commission amount           |
| commissionAsset | string  | Commission asset type       |
| time            | int64   | Trade time                  |
| isBuyer         | bool    | Whether the buyer           |
| isMaker         | bool    | Whether the maker           |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query Trading Commission Rate

GET /openApi/spot/v1/user/commissionRate

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Used to query the current trading commission rate for spot trading.

### Request Parameters

| Parameter Name | Type    | Required | Description                                               |
| -------------- | ------- | -------- | --------------------------------------------------------- |
| symbol         | string  | Yes      | Trading pair, e.g. BTC-USDT, please use uppercase letters |
| recvWindow     | float64 | No       | Request valid time window in milliseconds                 |
| timestamp      | int64   | Yes      | Request timestamp in milliseconds                         |

### Response Parameters

| Parameter Name      | Type    | Description           |
| ------------------- | ------- | --------------------- |
| takerCommissionRate | float64 | Taker commission rate |
| makerCommissionRate | float64 | Maker commission rate |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Cancel All After

POST /openApi/spot/v1/trade/cancelAllAfter

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Spot Trading

Content-Type:request body(application/json)

After the countdown ends, cancel all current pending orders. This request can be continuously maintained to constantly extend the penalty time.

Rate limit: 1 time/1s

If you have a large amount of pending orders, they will be canceled in batches, which may take several seconds to cancel in batches. In addition, during the process of canceling all pending orders, the system will reject further ACTIVATE and CLOSE requests. After the system has completed the task of canceling all pending orders, it can continue to accept ACTIVATE and CLOSE requests.

HTTP request

Interface parameters

### Request Parameters

| Parameter Name | Type   | Required | Description                                        |
| -------------- | ------ | -------- | -------------------------------------------------- |
| type           | string | Yes      | Request type: ACTIVATE-Activate, CLOSE-Close       |
| timeOut        | int    | Yes      | Activate countdown time (seconds), range: 10s-120s |

### Response Parameters

| Parameter Name | Type   | Description                                                                    |
| -------------- | ------ | ------------------------------------------------------------------------------ |
| triggerTime    | int    | Trigger time for deleting all pending orders                                   |
| status         | Status | ACTIVATED (Activation successful)/CLOSED (Closed successfully)/FAILED (Failed) |
| note           | string | Explanation                                                                    |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Create an OCO Order

POST /openApi/spot/v1/oco/order

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Spot Trading

Content-Type:request body(application/json)

Send a new one-cancels-the-other (OCO) order, and initiating one of them immediately cancels the other order

### Request Parameters

| Parameter Name     | Type    | Required | Description                                                                               |
| ------------------ | ------- | -------- | ----------------------------------------------------------------------------------------- |
| symbol             | string  | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters                                |
| side               | string  | Yes      | Order type, BUY for buy, SELL for sell                                                    |
| quantity           | float64 | Yes      | Order quantity, e.g., 0.1 BTC                                                             |
| limitPrice         | float64 | Yes      | Limit order price. e.g., 10000 USDT                                                       |
| orderPrice         | float64 | Yes      | The limit order price set after a stop-limit order is triggered. e.g., 10000 USDT         |
| triggerPrice       | float64 | Yes      | The trigger price of the stop-limit order. e.g., 10000 USDT                               |
| listClientOrderId  | string  | No       | Custom unique ID for the entire Order List, only supports numeric strings, e.g., "123456" |
| aboveClientOrderId | string  | No       | Custom unique ID for the limit order, only supports numeric strings, e.g., "123456"       |
| belowClientOrderId | string  | No       | Custom unique ID for the stop-limit order, only supports numeric strings, e.g., "123456"  |
| recvWindow         | float64 | No       | Request validity time window, in milliseconds                                             |
| timestamp          | int64   | Yes      | Request timestamp, in milliseconds                                                        |

### Response Parameters

| Parameter Name | Type    | Description                                                                                                                                                    |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | string  | Order ID                                                                                                                                                       |
| clientOrderId  | string  | Custom order ID                                                                                                                                                |
| orderType      | string  | ocoLimit: OCO Limit Order, ocoTps: OCO Stop-Limit Order                                                                                                        |
| symbol         | string  | Trading pair                                                                                                                                                   |
| price          | float64 | Order price                                                                                                                                                    |
| triggerPrice   | float64 | Trigger price                                                                                                                                                  |
| quantity       | float64 | Order quantity                                                                                                                                                 |
| status         | string  | Order status, NEW for new order, PENDING for pending, PARTIALLY_FILLED for partially filled, FILLED for fully filled, CANCELED for canceled, FAILED for failed |
| side           | string  | Order type, BUY for buy, SELL for sell                                                                                                                         |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Cancel an OCO Order List

POST /openApi/spot/v1/oco/cancel

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Spot Trading

Content-Type:request body(application/json)

Used to cancel the entire OCOC order

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------- |
| orderId        | string | No       | The order ID of the limit order or the stop-limit order. Either orderId or clientOrderId must be provided. |
| clientOrderId  | string | No       | The User-defined order ID of the limit order or the stop-limit order                                       |
| recvWindow     | int64  | No       | Request validity window, in milliseconds                                                                   |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                                                         |

### Response Parameters

| Parameter Name | Type   | Description           |
| -------------- | ------ | --------------------- |
| orderId        | string | Order ID              |
| clientOrderId  | string | User-defined order ID |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query an OCO Order List

GET /openApi/spot/v1/oco/orderList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the OCO order list

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                        |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------- |
| orderListId    | string | No       | OCO order group ID. Either \`orderListId\` or \`clientOrderId\` must be filled in. |
| clientOrderId  | string | No       | User-defined OCO order group ID                                                    |
| recvWindow     | int64  | No       | Request valid time window, in milliseconds                                         |
| timestamp      | int64  | Yes      | Request timestamp, in milliseconds                                                 |

### Response Parameters

| Parameter Name  | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| transactionTime | int64   | Order time                                              |
| orderId         | string  | Order ID                                                |
| clientOrderId   | string  | User-defined order ID                                   |
| symbol          | string  | Trading pair                                            |
| orderType       | string  | ocoLimit: OCO limit order, ocoTps: OCO stop-limit order |
| side            | string  | Order type, BUY for buy, SELL for sell                  |
| triggerPrice    | float64 | Trigger price                                           |
| price           | float64 | Order price                                             |
| quantity        | float64 | Order quantity                                          |
| orderListId     | string  | OCO order group ID                                      |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query All Open OCO Orders

GET /openApi/spot/v1/oco/openOrderList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query the list of orders that are currently in the pending order state

### Request Parameters

| Parameter Name | Type  | Required | Description                              |
| -------------- | ----- | -------- | ---------------------------------------- |
| pageIndex      | int64 | Yes      | Page number                              |
| pageSize       | int64 | Yes      | Number of items per page                 |
| recvWindow     | int64 | No       | Request validity window, in milliseconds |
| timestamp      | int64 | Yes      | Request timestamp, in milliseconds       |

### Response Parameters

| Parameter Name  | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| transactionTime | int64   | Order time                                              |
| orderId         | string  | Order ID                                                |
| clientOrderId   | string  | User-defined order ID                                   |
| symbol          | string  | Trading pair                                            |
| orderType       | string  | ocoLimit: OCO Limit Order, ocoTps: OCO Stop-Limit Order |
| side            | string  | Trade type, BUY for buy, SELL for sell                  |
| triggerPrice    | float64 | Trigger price                                           |
| price           | float64 | Order price                                             |
| quantity        | float64 | Order quantity                                          |
| orderListId     | string  | OCO order group ID                                      |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

## Query OCO Historical Order List

GET /openApi/spot/v1/oco/historyOrderList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query OCO historical order list

### Request Parameters

| Parameter Name | Type  | Required | Description                              |
| -------------- | ----- | -------- | ---------------------------------------- |
| pageIndex      | int64 | Yes      | Page number                              |
| pageSize       | int64 | Yes      | Number of items per page                 |
| startTime      | int64 | No       | Start time, timestamp, in milliseconds   |
| endTime        | int64 | No       | End time, timestamp, in milliseconds     |
| recvWindow     | int64 | No       | Request validity window, in milliseconds |
| timestamp      | int64 | Yes      | Request timestamp, in milliseconds       |

### Response Parameters

| Parameter Name  | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| transactionTime | int64   | Order time                                              |
| orderId         | string  | Order ID                                                |
| clientOrderId   | string  | User-defined order ID                                   |
| symbol          | string  | Trading pair                                            |
| orderType       | string  | ocoLimit: OCO Limit Order, ocoTps: OCO Stop-Limit Order |
| side            | string  | Trade type, BUY for buy, SELL for sell                  |
| triggerPrice    | float64 | Trigger price                                           |
| price           | float64 | Order price                                             |
| quantity        | float64 | Order quantity                                          |
| orderListId     | string  | OCO order group ID                                      |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

---
