## 24hr Ticker Price Change Statistics

GET /openApi/swap/v2/quote/ticker

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                                          |
| -------------- | ------ | -------- | -------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds              |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds                  |

### Response Parameters

| Parameter Name     | Type    | Description                                                  |
| ------------------ | ------- | ------------------------------------------------------------ |
| symbol             | string  | trading pair, for example: BTC-USDT                          |
| priceChange        | string  | 24 hour price change                                         |
| priceChangePercent | string  | price change percentage                                      |
| lastPrice          | string  | latest transaction price                                     |
| lastQty            | string  | latest transaction amount                                    |
| highPrice          | string  | 24-hour highest price                                        |
| lowPrice           | string  | 24 hours lowest price                                        |
| volume             | string  | 24-hour volume                                               |
| quoteVolume        | string  | 24-hour turnover, the unit is USDT                           |
| openPrice          | string  | first price within 24 hours                                  |
| openTime           | int64   | The time when the first transaction occurred within 24 hours |
| closeTime          | int64   | The time when the last transaction occurred within 24 hours  |
| bidPrice           | float64 | bid price                                                    |
| bidQty             | float64 | bid quantity                                                 |
| askPrice           | float64 | ask price                                                    |
| askQty             | float64 | ask quantity                                                 |

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
