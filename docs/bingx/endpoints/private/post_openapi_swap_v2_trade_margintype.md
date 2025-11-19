# POST /openApi/swap/v2/trade/marginType

**Source:**
[/openApi/swap/v2/trade/marginType](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Change Margin Type

POST /openApi/swap/v2/trade/marginType

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                      |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                             |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                |
| marginType     | string | yes      | Margin mode ISOLATED (isolated margin), CROSSED (cross margin) and SEPARATE_ISOLATED (separated isolated margin) |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                              |

### Response Parameters

| Parameter Name | Type   | Description                                                              |
| -------------- | ------ | ------------------------------------------------------------------------ |
| code           | int64  | error code, 0 means successfully response, others means response failure |
| msg            | string | Error Details Description                                                |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
