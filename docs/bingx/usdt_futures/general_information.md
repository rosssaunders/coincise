# BingX USDT-Futures API - General Information

## Introduction

Welcome to the [BingX](https://bingx.com) API, welcome to sign up for the BingX
BrokerProject
[BingX Broker Program Application](https://docs.google.com/forms/d/e/1FAIpQLSfO4Ws3UO13h_9tcnRKKGJD6QTvTM8q32hmpNQlzB4tofup7g/viewform)

You can use our API to access market data, trading, and account management
endpoints of Perpetual Swap. The market data API is publicly accessible and
provides market data such as The Latest Trade of a Trading Pair. The account and
trading APIs require authentication with an API Key which allows you to place
and cancel orders and enquire order status and account info.

This page presents the USDT-M Perpetual Futures API documentation (V2), which is
advised over the V1 version. For V1 version, please refer to
[USDT-M Perpetual Futures API Reference V1](https://bingx-api.github.io/docs/#/swap/introduce)

If you have any questions or feedback, you can join the
[API issue Telegram group](https://t.me/+uSWmuaKA5sw2MzE1).

BingX sincerely invites you to participate in the API function user survey and
share your ideas so that we can better serve you and enhance your trading
experience.

[Fill in the questionnaire](https://docs.google.com/forms/d/e/1FAIpQLSd0yjx5okwQG1D7tf4pBAcf4WbMW8zE-Ew01ardWGCwoIZoMg/viewform)

---

## General Info

### Common Error Codes

##### Types:

- 4XX error codes are used to indicate wrong request content, behavior, format.

- 5XX error codes are used to indicate problems with the Bingx service.

##### Error Codes:

- 400 Bad Request – Invalid request format Invalid request format

- 401 Unauthorized – Invalid API Key Invalid API Key

- 403 Forbidden – You do not have access to the requested resource

- 404 - Not Found

- 429 - Too Many Requests Return code is used when breaking a request rate
  limit.

- 418 - return code is used when an IP has been auto-banned for continuing to
  send requests after receiving 429 codes.

- 500 - Internal Server Error – We had a problem with our server We had a
  problem with our server

- 504 - return code means that the API server has submitted a request to the
  service center but failed to get a response. It should be noted that the 504
  return code does not mean that the request failed. It refers to an unknown
  status. The request may have been executed, or it may have failed. Further
  confirmation is required.

##### Common business error codes:

- 100001 - signature verification failed#

- 100500 - Internal system error

- 80012 - service unavailable

- 80014 - Invalid parameter

- 80016 - Order does not exist

- 80017 - position does not exist

- 80020 - risk forbidden

- 100004 - Permission denied as the API key was created without the permission

- 100419 - IP does not match IP whitelist

- 101204 - Insufficient margin

- 80013 - The number of your entrusted orders has reached the system limit. If
  you need to place an order, please cancel other orders first

- 80018 - order is already filled

- 80019 - The order is being processed. Please use the allOrders api to retrieve
  the order details later

100400

- arguments invalid
- miss arguments

- 100412 - Null signature

- 100413 - Incorrect apiKey

- 100421 - Null timestamp or timestamp mismatch

- 100410 - rate limitation

- 101209 - The maximum position value for this leverage is \*\* USDT

- 101212 - Failed. Please check if you have pending orders under the trading
  pair. If yes, please cancel them and try again

- 101215 - The Maker (Post Only) order ensures that the user always acts as a
  maker. If the order would immediately match with available orders in the
  market, it will be canceled.

- 101414 - The maximum leverage for the trading pair is \*, please reduce the
  leverage

- 101415 - This trading pair is suspended from opening new position

- 101460 - The order price should be higher than the estimated liquidation price
  of the long position

- 101500 - rpc timeout

- 101514 - You're temporarily suspended from opening positions. Please try again
  later

- 109201 - The same order number is only allowed to be submitted once within 1
  second.

101211

- Order price should be lower than\*
- Order price should be higher than\*

80012

- GetMarketTrades getContractInfo failled
- symbol not exist
- invalid parameter
- Service Unavailable
- leverage illegal
- connect: connection refused
- margin is not enough
- startTime is later than endTime
- OpenInterestNotExist
- The current system is busy, please try again later
- invalid connection
- stop order cnt hit limit 50
- network failed
- trading has been locked
- position limit

101400

- No position to close
- Order size error
- Insufficient margin
- Must be lower than the maximum callback rate of 90%
- Must be greater than the minimum callback rate of 0.1%
- Invalid Parameter

80001

- tickers is nil
- Request failed
- service has some errors, order not exist
- orderId and clientOrderId are both empty, orderId and clientOrderId are both
  empty
- order state illegal, order not exist
- the account has positions or pending orders
- margin is not enough
- You're temporarily suspended from opening positions. Please try again later
- order state illegalorder not exist
- Mismatch type
- At present, the actual position is occupied by a Limit Order. If you need to
  close the position, please cancel other orders first
- trading strategy available is false
- order not exist
- The maximum leverage for the trading pair is 5, please reduce the leverage
- Order size error
- The current system is busy

##### Notes:

- If it fails, there will be an error description included in the response body.

- Errors may be thrown from every interface.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common Error
> Codes](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Common
> Error Codes)

### Timestamp

- Unless otherwise specified, all timestamps from the API are returned with
  millisseconds resolution.
- The timestamp of the request must be within 5 seconds of the API service time,
  otherwise the request will be considered expired and rejected. If there is a
  large deviation between the local server time and the API server time, we
  recommend that you update the http header by querying the API server time.
  header。

##### Example

1587091154123

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Timestamp)

### Numbers

- Decimal numbers are returned as "Strings" in order to preserve full precision.
  It is recommended that the numbers are converted to "Strings" to avoid
  truncation and precision loss.
- Integer numbers (such as trade ID and sequences) are unquoted.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Numbers](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Numbers)

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
  group is 100 requests per 10 seconds and 500 requests per minute

- Account API Group \[2\]: The total IP rate limit for all interfaces within the
  group is 1000 requests per 10 seconds, with an individual IP rate limit of 100
  requests per 10 seconds for each interface.

- Account API Group \[3\]: The total IP rate limit for all interfaces within the
  group is 1000 requests per 10 seconds, with an individual IP rate limit of 200
  requests per 10 seconds for each interface.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate
> limit](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Rate
> limit)

### Get Server Time

##### HTTP Request

GET https://open-api.bingx.com/openApi/swap/v2/server/time

##### Parameters: null

- code - int64 - error code, 0 means successfully response, others means
  response failure

- msg - string - Error Details Description

- serverTime - int64 - The current time of the system，unit: ms

{"code": 0,"msg": "","data": {"serverTime": 1675319535362}}

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Get Server
> Time](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html#Get
> Server Time)

---
