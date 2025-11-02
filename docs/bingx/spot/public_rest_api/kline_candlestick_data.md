## Kline/Candlestick Data

GET /openApi/spot/v2/market/kline

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

Check the candlestick chart data of the filled price

- If startTime and endTime are not provided, the latest candlestick chart data
  will be returned by default.

- If startTime and endTime are provided, the latest candlestick chart data up to
  endTime will be returned by default.

- If startTime is provided and endTime is not provided, the latest candlestick
  chart data starting from startTime will be returned by default.

- If startTime is not provided and endTime is provided, the latest candlestick
  chart data up to endTime will be returned by default.

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                      |
| -------------- | ------ | -------- | ---------------------------------------------------------------- |
| symbol         | string | Yes      | Trading pair, for example: BTC-USDT, please use capital letters. |
| interval       | string | Yes      | Time interval, refer to field description                        |
| startTime      | int64  | No       | Start time, unit: milliseconds                                   |
| endTime        | int64  | No       | End time, unit: milliseconds                                     |
| limit          | int64  | No       | Default value: 500 Maximum value: 1440                           |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds          |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds              |

### Response Parameters

| Parameter Name | Type  | Description             |
| -------------- | ----- | ----------------------- |
| klines         | array | Candlestick chart array |

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/market-api.html](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html)
