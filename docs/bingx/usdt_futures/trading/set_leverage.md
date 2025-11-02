## Set Leverage

POST /openApi/swap/v2/trade/leverage

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Adjust the user's opening leverage in the specified symbol contract.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                           |
| -------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                                                  |
| side           | string | yes      | Leverage for long or short positions. In the Hedge mode, LONG for long positions, SHORT for short positions. In the One-way mode, only supports BOTH. |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                     |
| leverage       | int64  | yes      | leverage                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                   |

### Response Parameters

| Parameter Name      | Type   | Description                  |
| ------------------- | ------ | ---------------------------- |
| leverage            | int64  | leverage                     |
| symbol              | string | trading pair                 |
| availableLongVol    | string | Available Long Volume        |
| availableShortVol   | string | Available Short Volume       |
| availableLongVal    | string | Available Long Value         |
| availableShortVal   | string | Available Short Value        |
| maxPositionLongVal  | string | Maximum Position Long Value  |
| maxPositionShortVal | string | Maximum Position Short Value |

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
| 109400     | margin is not enough                                                                                                                                         |
| 109400     | In the Hedge mode, the 'Side' field can only be set to LONG or SHORT.                                                                                        |
| 109400     | In the One-way mode, the 'Side' field can only be set to BOTH.                                                                                               |
| 109500     | symbol not exist                                                                                                                                             |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
