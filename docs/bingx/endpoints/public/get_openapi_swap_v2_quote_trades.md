# GET /openApi/swap/v2/quote/trades

**Source:** [/openApi/swap/v2/quote/trades](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Recent Trades List

GET /openApi/swap/v2/quote/trades

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| limit          | int    | no       | default: 500, maximum 1000                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description                                                |
| -------------- | ------ | ---------------------------------------------------------- |
| time           | int64  | transaction time                                           |
| isBuyerMaker   | bool   | Whether the buyer is the maker of the order (true / false) |
| price          | string | transaction price                                          |
| qty            | string | transaction quantity                                       |
| quoteQty       | string | turnover                                                   |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
