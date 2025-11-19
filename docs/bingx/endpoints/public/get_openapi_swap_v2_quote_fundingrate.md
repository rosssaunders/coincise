# GET /openApi/swap/v2/quote/fundingRate

**Source:**
[/openApi/swap/v2/quote/fundingRate](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Get Funding Rate History

GET /openApi/swap/v2/quote/fundingRate

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| startTime      | int64  | no       | Start time, unit: millisecond                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                          |
| limit          | int32  | no       | default: 100 maximum: 1000                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description                         |
| -------------- | ------ | ----------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT |
| fundingRate    | string | funding rate                        |
| fundingTime    | int64  | Funding time: milliseconds          |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
