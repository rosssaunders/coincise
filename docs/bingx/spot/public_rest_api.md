# BingX Spot Public REST API

## Introduction

Welcome to the [BingX](https://bingx.com) API, welcome to sign up for the BingX
BrokerProject
[BingX Broker Program Application](https://docs.google.com/forms/d/e/1FAIpQLSfO4Ws3UO13h_9tcnRKKGJD6QTvTM8q32hmpNQlzB4tofup7g/viewform)

You can use our API to access market data endpoints of spot trading. The market
data API is publicly accessible and provides market data, statistics, order book
depth of a Trading Pair.

If you have any questions or feedback, you can join the
[API issue Telegram group](https://t.me/+uSWmuaKA5sw2MzE1).

BingX sincerely invites you to participate in the API function user survey and
share your ideas so that we can better serve you and enhance your trading
experience.

[Fill in the questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSd0yjx5okwQG1D7tf4pBAcf4WbMW8zE-Ew01ardWGCwoIZoMg/viewform)

---

## Frequently Asked Questions

Q: What is UID?

A: UID stands for User ID, which is a unique identifier for each user (including
parent users and sub-users). UID can be viewed in the personal information
section of the web or app interface, and it can also be obtained through the GET
/openApi/account/v1/uid interface.

Q: How many API Keys can a user apply for?

A: Each parent user can create up to 20 sets of API Keys. Each parent user can
also create up to 20 sub-users, and each sub-user can create up to 20 sets of
API Keys. Each API Key can be set with different permissions.

Q: Why do I often experience disconnections and timeouts?

A: It could be due to network fluctuations. We recommend reconnecting in such
cases.

Q: Why does WebSocket connection always get disconnected?

A: You can check if your code returns a Pong after receiving a Ping. If you are
subscribing to account-related websockets, please also check if you are
regularly updating the listenkey. We recommend using our sample code first.

Q: Why does signature authentication always fail?

A: Please carefully read our signature authentication instructions, or test
using our sample code first.

Q: Is the API Key for U-based contracts the same as Spot trading?

A: The API Key for U-based contracts is the same as the API Key for Spot
trading. However, the permissions for spot trading and contract trading are
separate and need to be configured accordingly.

Q: How many types of risk control restrictions does BingX have for APIs?

A: BingX has three types of risk control strategies for APIs: api rate limiting,
trading restrictions, and network firewall restrictions. These restrictions may
change at any time.

Interface rate limiting:

- The rate limiting for each api may vary. Please refer to the specific api
  documentation for details.

Trading restrictions: Trading behavior is evaluated based on the behavior of
regular users. If your trading behavior deviates significantly from that of
regular users, you may be prohibited from trading, and the duration of the
prohibition is uncertain. The duration of the trading prohibition may increase
under the following circumstances:

- 1\. Frequently occupying the best bid and ask prices.
- 2\. Frequently placing/canceling orders without any trades.
- 3\. Very low trade completion rate, where the completion rate = number of
  trades / (number of placed orders + number of canceled orders).
- 4\. Very low trade weight, where the trade weight = total trade amount /
  (total placed order amount + total canceled order amount).
- 5\. Continuously sending frequent requests after receiving a 429 error
  response.

Network Firewall Restrictions

- Currently, we do not provide explicit information about network firewall
  restrictions. If you receive an HTTP 403 error message, it means you have
  violated a network firewall rule. In most cases, this error occurs due to
  excessive requests and will result in a five-minute temporary ban. However, if
  your requests are considered malicious, it may lead to a longer ban or even
  permanent suspension.

Q: How to report API api errors?

Please contact our official customer service and provide the following template
to report the issue. Our technical support will assist you:

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

A: Currently, there is no limit, but there is a subscription rate limit. Please
do not exceed 10/s.

---

## General Info

### Service Address

https://open-api.bingx.com

Alternate domain name: open-api.bingx.io (total frequency limit: 60/min) Release
the frequency limit of the alternate domain name only when there is a problem
with the primary domain name open-api.bingx.com

HTTP 200 status code indicates a successful response. The response body might
contain a message which will be displayed accordingly.

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/base-info.html)

### Common Error Codes

##### Types:

- 4XX error codes are used to indicate wrong request content, behavior, format.

- 5XX error codes are used to indicate problems with the Bingx service.

##### Common business error codes:

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

##### Notes:

- If it fails, there will be an error description included in the response body.

- Errors may be thrown from every interface.

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/base-info.html)

### Rate limit

If the request is too frequent, the system will automatically restrict the
request and recover after 5 minutes;

Based on account UID rate limit, each api has its own independent rate limit,
which does not affect each other

Users can check the current frequency limit usage and the expiration of the time
window according to "X-RateLimit-Requests-Remain" (remaining number of frequency
limits) and "X-RateLimit-Requests-Expire" (window expiration time) in the Http
Header. time, and dynamically adjust your request frequency based on this value.

##### REST API

The API requests are subject to different rate limits based on UID and IP.
Please refer to the respective API documentation for UID rate limits. IP rate
limits are based on the following grouping rules:

- Market API Group \[1\]: The total IP rate limit for all interfaces within the
  group is 100 requests per 10 seconds.

- Account API Group \[2\]: The total IP rate limit for all interfaces within the
  group is 1000 requests per 10 seconds, with an individual IP rate limit of 100
  requests per 10 seconds for each interface.

- Account API Group \[3\]: The total IP rate limit for all interfaces within the
  group is 1000 requests per 10 seconds, with an individual IP rate limit of 200
  requests per 10 seconds for each interface.

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/base-info.html)

### Server time

https://open-api.bingx.com/openApi/spot/v1/server/time

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/base-info.html)

---

## Market Data

### Spot trading symbols

GET /openApi/spot/v1/common/symbols

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

- For price reference, please check:
  [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| symbol         | string | no       | Trading pair, e.g., BTC-USDT                            |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type  | Description                                            |
| -------------- | ----- | ------------------------------------------------------ |
| symbols        | Array | Symbol list, refer to the table below for order fields |

#### Order Parameters

| Parameter Name | Type    | Description                                                                                                                                   |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | Trading pair                                                                                                                                  |
| tickSize       | float64 | Price step                                                                                                                                    |
| stepSize       | float64 | Quantity step                                                                                                                                 |
| minQty         | float64 | Version upgrade, this field is deprecated, please ignore this field,the formula is: minQty= minNotional/price                                 |
| maxQty         | float64 | Version upgrade, this field is deprecated, please ignore this field,the formula is: maxQty = maxNotional/price                                |
| minNotional    | float64 | Minimum transaction amount                                                                                                                    |
| maxNotional    | float64 | Maximum transaction amount                                                                                                                    |
| status         | int     | 0 offline, 1 online, 5 pre-open, 25 trading suspended                                                                                         |
| apiStateBuy    | Boolean | available buy via api                                                                                                                         |
| apiStateSell   | Boolean | available sell via api                                                                                                                        |
| timeOnline     | long    | online time                                                                                                                                   |
| offTime        | long    | offline time                                                                                                                                  |
| maintainTime   | long    | trading suspension time                                                                                                                       |
| displayName    | string  | The trading pair name displayed on the platform is for display purposes only. Unlike the symbol, which is primarily used for order placement. |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Recent Trades List

GET /openApi/spot/v1/market/trades

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USDT                            |
| limit          | int    | no       | default 100, max 500                                    |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type    | Description    |
| -------------- | ------- | -------------- |
| id             | long    | transaction id |
| price          | float64 | price          |
| qty            | float64 | quantity       |
| time           | long    | time           |
| buyerMaker     | boolean | Buyer or not   |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Order Book

GET /openApi/spot/v1/market/depth

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USDT                            |
| limit          | int    | no       | default 20, max 1000                                    |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

#### Response Parameters

| Parameter Name | Type  | Description                                  |
| -------------- | ----- | -------------------------------------------- |
| bids           | array | first element price, second element quantity |
| asks           | array | first element price, second element quantity |
| ts             | int   | Timestamp of depth, Unit: milliseconds       |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Kline/Candlestick Data

GET /openApi/spot/v2/market/kline

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Check the candlestick chart data of the filled price

- If startTime and endTime are not provided, the latest candlestick chart data
  will be returned by default.

- If startTime and endTime are provided, the latest candlestick chart data up to
  endTime will be returned by default.

- If startTime is provided and endTime is not provided, the latest candlestick
  chart data starting from startTime will be returned by default.

- If startTime is not provided and endTime is provided, the latest candlestick
  chart data up to endTime will be returned by default.

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                      |
| -------------- | ------ | -------- | ---------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, for example: BTC-USDT, please use capital letters. |
| interval       | string | Yes      | Time interval, refer to field description                        |
| startTime      | int64  | No       | Start time, unit: milliseconds                                   |
| endTime        | int64  | No       | End time, unit: milliseconds                                     |
| limit          | int64  | No       | Default value: 500 Maximum value: 1440                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds          |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds              |

#### Response Parameters

| Parameter Name | Type  | Description             |
| -------------- | ----- | ----------------------- |
| klines         | array | Candlestick chart array |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### 24hr Ticker Price Change Statistics

GET /openApi/spot/v1/ticker/24hr

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

[1\. Create Account](https://bingx.com)
[2\. Pass KYC/KYB](https://bingx.com/en-us/account/api/)
[3\. Create API KEY](https://bingx.com/en-us/account/api/)
[4\. Configure API KEY permissions](https://bingx.com/en-us/account/api/)
[5\. Understanding signature authentication](https://bingx-api.github.io/docs/#/en-us/swapV2/authentication.html#Signature%20Description)
_6\. Run the following example code_
[7\. Understand common error codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common%20Error%20Codes)
[8\. Understand rate limitations](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate%20limit)
[9\. Understanding request timestamps](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)
[10\. Understand fee schedule](https://bingx.com/en-us/support/costs/)
[11\. Understand trading rules](https://bingx.com/en-us/tradeInfo/perpetual/trading-rules/BTC-USDT)

request parameters https://open-api.bingx.com

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                  |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| symbol         | string | no       | Trading pairs, such as: BTC-USDT, will return all symbol data when no parameters are entered |
| timestamp      | int64  | yes      | The timestamp of the request, in milliseconds                                                |
| recvWindow     | int64  | no       | Request valid time window value, unit: millisecond                                           |

#### Response Parameters

| Parameter Name     | Type    | Description                                            |
| ------------------ | ------- | ------------------------------------------------------ |
| symbol             | string  | Trading pair, for example: BTC-USDT                    |
| openPrice          | string  | Opening price in the last 24 hours                     |
| highPrice          | string  | The highest price in the last 24 hours                 |
| lowPrice           | string  | The lowest price in the last 24 hours                  |
| lastPrice          | string  | Latest price                                           |
| volume             | string  | Total trading volume (base asset)                      |
| quoteVolume        | string  | Total quote volume (quote asset)                       |
| openTime           | int64   | The start time of the ticker interval                  |
| closeTime          | int64   | end time of the ticker interval                        |
| count              | int     | The number of transactions within the statistical time |
| bidPrice           | float64 | bid price                                              |
| bidQty             | float64 | bid quantity                                           |
| askPrice           | float64 | ask price                                              |
| askQty             | float64 | ask quantity                                           |
| priceChangePercent | string  | Price change percentage field                          |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Order Book aggregation

GET /openApi/spot/v2/market/depth

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Interface Parameters

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, such as: BTC_USDT                                                       |
| depth          | int64  | Yes      | Query depth                                                                           |
| type           | string | Yes      | step0 default precision, step1 to step5 are 10 to 100000 times precision respectively |

#### Response Parameters

| Parameter Name | Type  | Description                                                                                          |
| -------------- | ----- | ---------------------------------------------------------------------------------------------------- |
| bids           | array | Buy depth, where the first element of the array is the price and the second element is the quantity  |
| asks           | array | Sell depth, where the first element of the array is the price and the second element is the quantity |
| ts             | int64 | Timestamp                                                                                            |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Symbol Price Ticker

GET /openApi/spot/v1/ticker/price

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Interface Parameters

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                     |
| -------------- | ------ | -------- | ------------------------------- |
| symbol         | string | Yes      | Trading pair, such as: BTC_USDT |

#### Response Parameters

| Parameter Name | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| price          | string | Latest price                    |
| symbol         | string | Trading pair, such as: BTC_USDT |
| timestamp      | int64  | Timestamp                       |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Symbol Order Book Ticker

GET /openApi/spot/v1/ticker/bookTicker

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Interface Parameters

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                     |
| -------------- | ------ | -------- | ------------------------------- |
| symbol         | string | Yes      | Trading pair, such as: BTC_USDT |

#### Response Parameters

| Parameter Name | Type   | Description                     |
| -------------- | ------ | ------------------------------- |
| eventType      | string | Data type                       |
| symbol         | string | Trading pair, such as: BTC_USDT |
| bidPrice       | string | Best bid price                  |
| bidVolume      | string | Best bid volume                 |
| askPrice       | string | Best ask price                  |
| askVolume      | string | Best ask volume                 |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Historical K-line

GET /openApi/market/his/v1/kline

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Query historical K-line data for transaction prices

- If startTime and endTime are not sent, the latest K-line data is returned by
  default

- If startTime and endTime are sent, the latest K-line data up to endTime is
  returned by default

- If startTime is sent but endTime is not sent, the latest K-line data starting
  from startTime is returned by default

- If startTime is not sent but endTime is sent, the latest K-line data up to
  endTime is returned by default

Interface Parameters

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters |
| interval       | string | Yes      | Time interval, reference field description                 |
| startTime      | int64  | No       | Start time, unit: milliseconds                             |
| endTime        | int64  | No       | End time, unit: milliseconds                               |
| limit          | int64  | No       | Default value: 500 Maximum value: 500                      |

#### Response Parameters

| Parameter Name | Type  | Description  |
| -------------- | ----- | ------------ |
| klines         | array | K-line array |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

### Old Trade Lookup

GET /openApi/market/his/v1/trade

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

#### Request Parameters

| Parameter Name | Type   | Required | Description                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------- |
| symbol         | string | yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters |
| limit          | int    | no       | Default 100, maximum 500                                   |
| fromId         | string | no       | The last recorded tid                                      |

#### Response Parameters

| Parameter Name | Type    | Description |
| -------------- | ------- | ----------- |
| id             | long    | Trade id    |
| price          | float64 | Price       |
| qty            | float64 | Quantity    |
| time           | long    | Time        |
| buyerMaker     | boolean | Buyer maker |

#### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [original URL](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)

---
