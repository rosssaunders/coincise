## Cancel All Open Orders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Cancel all orders in the current entrusted state of the current account.

DELETE /openApi/swap/v2/trade/allOpenOrders

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT,if you do not fill this field,will delete all type of orders                                                                                                                                                                                                                                                              |
| type           | string | no       | LIMIT: Limit Order / MARKET: Market Order / STOP_MARKET: Stop Market Order / TAKE_PROFIT_MARKET: Take Profit Market Order / STOP: Stop Limit Order / TAKE_PROFIT: Take Profit Limit Order / TRIGGER_LIMIT: Stop Limit Order with Trigger / TRIGGER_MARKET: Stop Market Order with Trigger / TRAILING_STOP_MARKET: Trailing Stop Market Order / TRAILING_TP_SL: Trailing TakeProfit or StopLoss |
| timestamp      | int64  | yes      | request timestamp in milliseconds                                                                                                                                                                                                                                                                                                                                                              |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                                                                                                                                                                                                                                                                                                            |

### Response Parameters

| Parameter Name | Type | Description                          |
| -------------- | ---- | ------------------------------------ |
| success        | LIST | list of successfully canceled orders |
| failed         | LIST | list of failed orders                |

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
