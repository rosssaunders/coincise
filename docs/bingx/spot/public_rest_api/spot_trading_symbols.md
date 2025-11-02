## Spot trading symbols

GET /openApi/spot/v1/common/symbols

API KEY permission: No API KEY signature required

Content-Type:request body(application/json)

- For price reference, please check:
  [GET /openApi/spot/v1/ticker/24hr](https://bingx-api.github.io/docs/#/en-us/spot/market-api.html#24-hour%20price%20changes)

rate limitation by IP in group Number: 1

### Request Parameters

| Parameter Name | Type   | Required | Description                                             |
| -------------- | ------ | -------- | ------------------------------------------------------- |
| symbol         | string | no       | Trading pair, e.g., BTC-USDT                            |
| recvWindow     | int64  | no       | Timestamp of initiating the request, Unit: milliseconds |
| timestamp      | int64  | yes      | Request valid time window value, Unit: milliseconds     |

### Response Parameters

| Parameter Name | Type  | Description                                            |
| -------------- | ----- | ------------------------------------------------------ |
| symbols        | Array | Symbol list, refer to the table below for order fields |

### Order Parameters

| Parameter Name | Type    | Description                                                                                                                                   |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string  | Trading pair                                                                                                                                  |
| tickSize       | float64 | Price step                                                                                                                                    |
| stepSize       | float64 | Quantity step                                                                                                                                 |
| minQty         | float64 | Version upgrade, this field is deprecated, please ignore this field,the formula is: minQty= minNotional/price                                 |
| maxQty         | float64 | Version upgrade, this field is deprecated, please ignore this field,the formula is: maxQty = maxNotional/price                                |
| minNotional    | float64 | Minimum transaction amount                                                                                                                    |
| maxNotional    | float64 | Maximum transaction amount                                                                                                                    |
| status         | int     | 0 offline, 1 online, 5 pre-open, 10 accessed 25 trading suspended                                                                             |
| apiStateBuy    | Boolean | available buy via api                                                                                                                         |
| apiStateSell   | Boolean | available sell via api                                                                                                                        |
| timeOnline     | long    | online time                                                                                                                                   |
| offTime        | long    | offline time                                                                                                                                  |
| maintainTime   | long    | trading suspension time                                                                                                                       |
| displayName    | string  | The trading pair name displayed on the platform is for display purposes only. Unlike the symbol, which is primarily used for order placement. |

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
