## Modify Isolated Position Margin

POST /openApi/swap/v2/trade/positionMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Adjust the isolated margin funds for the positions in the isolated position
mode.

### Request Parameters

| Parameter Name | Type    | Required | Description                                                                   |
| -------------- | ------- | -------- | ----------------------------------------------------------------------------- |
| symbol         | string  | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT          |
| amount         | float64 | yes      | margin funds                                                                  |
| type           | int     | yes      | adjustment direction 1: increase isolated margin, 2: decrease isolated margin |
| positionSide   | string  | no       | Position direction, and only LONG or SHORT can be selected                    |
| positionId     | int64   | no       | Position ID, if it is filled, the system will use the positionId first        |
| timestamp      | int64   | yes      | request timestamp in milliseconds                                             |
| recvWindow     | int64   | no       | Request valid time window value, Unit: milliseconds                           |

### Response Parameters

| Parameter Name | Type    | Description                                                                   |
| -------------- | ------- | ----------------------------------------------------------------------------- |
| code           | int64   | error code, 0 means successfully response, others means response failure      |
| msg            | string  | Error Details Description                                                     |
| amount         | float64 | margin funds                                                                  |
| type           | int     | adjustment direction 1: increase isolated margin, 2: decrease isolated margin |
| positionId     | int64   | Position ID                                                                   |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |
| 109400     | CATI-USDT,symbol not exist, please verify it in api: /openApi/swap/v2/quote/contracts                                                                        |
| 80020      | risk forbidden                                                                                                                                               |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
