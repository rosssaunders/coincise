## Position and Maintenance Margin Ratio

GET /openApi/swap/v1/maintMarginRatio

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Get information on Position and Maintenance Margin Ratio

### Request Parameters

| Parameter Name | Type   | Required | Description                                                |
| -------------- | ------ | -------- | ---------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters |
| timestamp      | int64  | Yes      | Request timestamp in milliseconds                          |
| recvWindow     | int64  | No       | Request valid time window in milliseconds                  |

### Response Parameters

| Parameter Name   | Type   | Description                                 |
| ---------------- | ------ | ------------------------------------------- |
| tier             | string | Layer                                       |
| symbol           | string | Trading pair                                |
| minPositionVal   | string | Minimum position value                      |
| maxPositionVal   | string | Maximum position value                      |
| maintMarginRatio | string | Maintenance margin ratio                    |
| maintAmount      | string | Maintenance margin quick calculation amount |

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
