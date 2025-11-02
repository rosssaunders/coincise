## Hedge mode Position - Automatic Margin Addition

POST /openApi/swap/v1/trade/autoAddMargin

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

In Hedge mode, it supports setting and canceling 'automatic margin addition'.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                           |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters.                           |
| positionId     | int64  | Yes      | Position ID                                                                           |
| functionSwitch | string | Yes      | Whether to enable the automatic margin addition feature, true: enable, false: disable |
| amount         | string | No       | Amount of margin to be added, in USDT. Must be specified when enabling the feature.   |
| timestamp      | int64  | Yes      | Timestamp of the request, in milliseconds.                                            |
| recvWindow     | int64  | No       | Request validity window, in milliseconds.                                             |

### Response Parameters

| Parameter Name | Type   | Description                                                                              |
| -------------- | ------ | ---------------------------------------------------------------------------------------- |
| code           | int64  | Error code, 0 means success, non-zero means failure                                      |
| msg            | string | Error message                                                                            |
| symbol         | string | Trading pair, e.g., BTC-USDT, please use uppercase letters.                              |
| positionId     | int64  | Position ID                                                                              |
| functionSwitch | string | Whether the automatic margin addition feature is enabled, true: enabled, false: disabled |
| amount         | string | Amount of margin added, in USDT                                                          |

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
