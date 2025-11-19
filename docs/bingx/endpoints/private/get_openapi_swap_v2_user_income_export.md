# GET /openApi/swap/v2/user/income/export

**Source:**
[/openApi/swap/v2/user/income/export](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Export fund flow

GET /openApi/swap/v2/user/income/export

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | trading pair, for example: BTC-USDT                                                                                  |
| incomeType     | string | no       | Fund flow type, optional values:REALIZED_PNL FUNDING_FEE TRADING_FEE INSURANCE_CLEAR TRIAL_FUND ADL SYSTEM_DEDUCTION |
| startTime      | int64  | no       | Start time, unit: millisecond                                                                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                                                                          |
| limit          | int    | no       | Number of returned result sets default value: 100 maximum value: 1000                                                |
| timestamp      | int64  | yes      | request timestamp, unit: millisecond                                                                                 |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
