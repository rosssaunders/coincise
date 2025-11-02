## Change Margin Type

POST /openApi/swap/v2/trade/marginType

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Change the user's margin mode on the specified symbol contract: isolated margin,
cross margin and separated isolated margin.

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
| 109400     | the account has positions or pending orders                                                                                                                  |
| 109500     | SetTradingStrategy network failed                                                                                                                            |
| 80012      | query Service Unavailable, err:contract not exist                                                                                                            |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
