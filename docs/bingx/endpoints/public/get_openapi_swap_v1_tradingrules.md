# GET /openApi/swap/v1/tradingRules

**Source:** [/openApi/swap/v1/tradingRules](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Trading Rules

GET /openApi/swap/v1/tradingRules

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
