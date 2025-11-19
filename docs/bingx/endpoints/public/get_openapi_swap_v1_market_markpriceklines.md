# GET /openApi/swap/v1/market/markPriceKlines

**Source:**
[/openApi/swap/v1/market/markPriceKlines](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Mark Price Kline/Candlestick Data

GET /openApi/swap/v1/market/markPriceKlines

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| interval       | string | yes      | time interval, refer to field description                            |
| startTime      | int64  | no       | Start time, unit: millisecond                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                          |
| limit          | int64  | no       | default: 500 maximum: 1440                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type    | Description                          |
| -------------- | ------- | ------------------------------------ |
| open           | float64 | Opening Price                        |
| close          | float64 | Closing Price                        |
| high           | float64 | High Price                           |
| low            | float64 | Low Price                            |
| volume         | float64 | transaction volume                   |
| time           | int64   | k-line time stamp, unit milliseconds |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
