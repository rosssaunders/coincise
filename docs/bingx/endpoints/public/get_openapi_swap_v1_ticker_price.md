# GET /openApi/swap/v1/ticker/price

**Source:** [/openApi/swap/v1/ticker/price](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Symbol Price Ticker

GET /openApi/swap/v1/ticker/price

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                        |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT,If no transaction pair parameters are sent, all transaction pair information will be returned |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds                                                                                                            |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                                                                                                                |

### Response Parameters

| Parameter Name | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT |
| price          | string | price                               |
| time           | int64  | matching engine time                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
