# GET /openApi/swap/v1/market/historicalTrades

**Source:**
[/openApi/swap/v1/market/historicalTrades](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Query historical transaction orders

GET /openApi/swap/v1/market/historicalTrades

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                              |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------- |
| fromId         | int64  | no       | From which transaction ID to start returning. By default, it returns the most recent transaction records |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                     |
| limit          | int    | no       | The number of returned result sets The default value is 50, the maximum value is 100                     |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                     |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                      |

### Response Parameters

| Parameter Name | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| time           | int64  | transaction time                                           |
| isBuyerMaker   | bool   | Whether the buyer is the maker of the order (true / false) |
| price          | string | transaction price                                          |
| qty            | string | transaction quantity                                       |
| quoteQty       | string | turnover                                                   |
| id             | string | transaction ID                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
