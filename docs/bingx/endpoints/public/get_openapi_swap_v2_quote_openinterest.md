# GET /openApi/swap/v2/quote/openInterest

**Source:**
[/openApi/swap/v2/quote/openInterest](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Open Interest Statistics

GET /openApi/swap/v2/quote/openInterest

API KEY permission: No API KEY signature required

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description          |
| -------------- | ------ | -------------------- |
| openInterest   | string | Position Amount      |
| symbol         | string | contract name        |
| time           | int64  | matching engine time |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
