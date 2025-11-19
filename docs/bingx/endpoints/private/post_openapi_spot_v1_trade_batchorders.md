# POST /openApi/spot/v1/trade/batchOrders

**Source:**
[/openApi/spot/v1/trade/batchOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Place multiple orders

POST /openApi/spot/v1/trade/batchOrders

rate limitation by UID: 2/s & rate limitation by IP in group Number: 3

API KEY permission: Spot Trading

Content-Type: request body(application/json)

### Description

Can be used to place orders in bulk on spot

Notes

- For a limit order, the "price" parameter must be included.
- For a limit order, either "quantity" or "quoteOrderQty" must be included. If
  both parameters are provided, the server will prioritize the "quantity"
  parameter.
- For a market buy order, the "quoteOrderQty" parameter must be included.
- For a market sell order, the "quantity" parameter must be included.
- Orders created through the api will not be displayed on the app and web pages.

If you need to calculate the maximum and minimum order quantities for a currency
pair, you can use the formula: U (minNotional or maxNotional) / (Limit price or
Market price)

- For price reference, please check:
  [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)
- For Minimum/Maximum transaction amount reference, please check:
  [GET /openApi/spot/v1/common/symbols](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#Query%20Symbols)

Trading Rules:

- Trading Rules:
  [https://bingx.com/en/spot/trading-rules/](https://bingx.com/en/spot/trading-rules/)
- About price accuracy and quantity accuracy reference interface:
  [https://open-api.bingx.com/openApi/spot/v1/common/symbols](https://open-api.bingx.com/openApi/spot/v1/common/symbols)
- If the accuracy exceeds the range of the current period, the current API order
  will still be successful, but it will be truncated. For example, the price
  requirement is: 0.0001, if the order is 0.123456, it will be successfully
  submitted with 0.1234.

- place batch orders, how to sign the request? please refer to
  [Perpetual: place batch orders](https://bingx-api.github.io/docs/#/swapV2/trade-api.html#Bulk%20order)

### Request Parameters

| Parameter Name | Type  | Required | Description                                                                                                                                                                                                                     |
| -------------- | ----- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data           | array | Yes      | The request array for placing orders, limited to 5 orders.                                                                                                                                                                      |
| sync           | bool  | no       | sync=false (default false if not filled in): parallel ordering (but all orders need to have the same symbol/side/type), sync = true (multiple orders are ordered serially, all orders do not require the same symbol/side/type) |

### Response Parameters

| Parameter Name | Type  | Description                       |
| -------------- | ----- | --------------------------------- |
| orders         | array | Response array for a single order |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
