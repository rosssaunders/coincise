## Mark Price Kline/Candlestick Data

GET /openApi/swap/v1/market/markPriceKlines

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Get the latest mark price Kline Data

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| interval       | string | yes      | time interval, refer to field description                            |
| startTime      | int64  | no       | Start time, unit: millisecond                                        |
| endTime        | int64  | no       | End time, unit: millisecond                                          |
| limit          | int64  | no       | default: 500 maximum: 1440                                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name | Type    | Description                          |
| -------------- | ------- | ------------------------------------ |
| open           | float64 | Opening Price                        |
| close          | float64 | Closing Price                        |
| high           | float64 | High Price                           |
| low            | float64 | Low Price                            |
| volume         | float64 | transaction volume                   |
| time           | int64   | k-line time stamp, unit milliseconds |

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
> [https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/market-api.html)
