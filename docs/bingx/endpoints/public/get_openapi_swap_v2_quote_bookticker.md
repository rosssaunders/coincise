# GET /openApi/swap/v2/quote/bookTicker

**Source:**
[/openApi/swap/v2/quote/bookTicker](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Symbol Order Book Ticker

GET /openApi/swap/v2/quote/bookTicker

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type    | Description                                                          |
| -------------- | ------- | -------------------------------------------------------------------- |
| symbol         | string  | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| bid_price      | float64 | Optimal purchase price                                               |
| bid_qty        | float64 | Order quantity                                                       |
| ask_price      | float64 | Best selling price                                                   |
| lastUpdateId   | int64   | The ID of the latest trade                                           |
| time           | long    | The time of the trade in milliseconds                                |
| ask_qty        | float64 | Order quantity                                                       |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
