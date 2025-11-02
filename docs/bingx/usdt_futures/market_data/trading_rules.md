## Trading Rules

GET /openApi/swap/v1/tradingRules

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                     |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g. BTC-USDT. Please use uppercase letters. If not provided, information for all trading pairs will be returned. |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds.                                                                                              |
| recvWindow     | int64  | No       | Request validity window value in milliseconds.                                                                                  |

### Response Parameters

| Parameter Name      | Type   | Description                                                                                                                                                                                                       |
| ------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| minSizeCoin         | string | Minimum order quantity, denominated in coin.                                                                                                                                                                      |
| minSizeUsd          | string | Minimum order amount, denominated in USDT.                                                                                                                                                                        |
| maxMumOrder         | string | Maximum number of open orders for this contract, including: limit orders, market orders, stop orders, trailing orders, take-profit orders, stop-loss orders, and OCO orders.                                      |
| protectionThreshold | string | Spread protection threshold (decimal). If spread protection is enabled and when a strategy order is triggered, if the spread between the latest price and mark price exceeds this threshold, the order will fail. |
| buyMaxPrice         | string | Upper limit ratio for limit order buy price (decimal). Limit order price must satisfy: current price × lower limit < order price < current price × upper limit.                                                   |
| buyMinPrice         | string | Lower limit ratio for limit order buy price (decimal). Limit order price must satisfy: current price × lower limit < order price < current price × upper limit.                                                   |
| sellMaxPrice        | string | Upper limit ratio for limit order sell price (decimal). Limit order price must satisfy: current price × lower limit < order price < current price × upper limit.                                                  |
| sellMinPrice        | string | Lower limit ratio for limit order sell price (decimal). Limit order price must satisfy: current price × lower limit < order price < current price × upper limit.                                                  |
| marketRatio         | string | Price tolerance ratio for market orders (decimal). If the spread between the market order execution price and mark price exceeds this ratio, the order may fail or be partially filled.                           |

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
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
