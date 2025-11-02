## Common Error Codes

#### Types:

- 4XX error codes are used to indicate wrong request content, behavior, format.

- 5XX error codes are used to indicate problems with the Bingx service.

#### Error Codes:

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

#### Common business error codes:

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

#### Notes:

- If it fails, there will be an error description included in the response body.

- Errors may be thrown from every interface.

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html](https://bingx-api.github.io/docs/#/en-us/swapV2/base-info.html)
