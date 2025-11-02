## 24hr Ticker Price Change Statistics

GET /openApi/spot/v1/ticker/24hr

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                  |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------- |
| symbol         | string | no       | Trading pairs, such as: BTC-USDT, will return all symbol data when no parameters are entered |
| timestamp      | int64  | yes      | The timestamp of the request, in milliseconds                                                |
| recvWindow     | int64  | no       | Request valid time window value, unit: millisecond                                           |

### Response Parameters

| Parameter Name     | Type    | Description                                            |
| ------------------ | ------- | ------------------------------------------------------ |
| symbol             | string  | Trading pair, for example: BTC-USDT                    |
| openPrice          | string  | Opening price in the last 24 hours                     |
| highPrice          | string  | The highest price in the last 24 hours                 |
| lowPrice           | string  | The lowest price in the last 24 hours                  |
| lastPrice          | string  | Latest price                                           |
| volume             | string  | Total trading volume (base asset)                      |
| quoteVolume        | string  | Total quote volume (quote asset)                       |
| openTime           | int64   | The start time of the ticker interval                  |
| closeTime          | int64   | end time of the ticker interval                        |
| count              | int     | The number of transactions within the statistical time |
| bidPrice           | float64 | bid price                                              |
| bidQty             | float64 | bid quantity                                           |
| askPrice           | float64 | ask price                                              |
| askQty             | float64 | ask quantity                                           |
| priceChangePercent | string  | Price change percentage field                          |

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
