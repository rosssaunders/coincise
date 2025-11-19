# GET /openApi/swap/v2/user/income

**Source:** [/openApi/swap/v2/user/income](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Get Account Profit and Loss Fund Flow

GET /openApi/swap/v2/user/income

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| incomeType     | string | no       | Income type, see remarks                                             |
| startTime      | int64  | no       | start time                                                           |
| endTime        | int64  | no       | end time                                                             |
| limit          | int64  | no       | Number of result sets to return Default: 100 Maximum: 1000           |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                    |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type   | Description                                                                                         |
| -------------- | ------ | --------------------------------------------------------------------------------------------------- |
| symbol         | string | trading pair, for example: BTC-USDT                                                                 |
| incomeType     | string | money flow type                                                                                     |
| income         | string | The amount of capital flow, positive numbers represent inflows, negative numbers represent outflows |
| asset          | string | asset content                                                                                       |
| info           | string | Remarks, depending on the type of stream                                                            |
| time           | int64  | time, unit: millisecond                                                                             |
| tranId         | string | transfer id                                                                                         |
| tradeId        | string | The original transaction ID that caused the transaction                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/account-api.html)
