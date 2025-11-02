## Cancel multiple orders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type:request body(application/json)

Batch cancellation of some of the orders whose current account is in the current
entrusted state.

DELETE /openApi/swap/v2/trade/batchOrders

### Request Parameters

| Parameter Name    | Type   | Required | Description                                                                                                                    |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| orderIdList       | LIST   | no       | system order number, up to 10 orders \[1234567,2345678\]                                                                       |
| clientOrderIdList | LIST   | no       | Customized order ID for users, up to 10 orders \["abc1234567","abc2345678"\]. The system will convert this field to lowercase. |
| symbol            | string | yes      | There must be a hyphen/ "-" in the trading pair symbol. eg: BTC-USDT                                                           |
| timestamp         | int64  | yes      | request timestamp, unit: millisecond                                                                                           |
| recvWindow        | int64  | no       | Request valid time window value, Unit: milliseconds                                                                            |

### Response Parameters

| Parameter Name | Type   | Description                                                              |
| -------------- | ------ | ------------------------------------------------------------------------ |
| code           | int64  | error code, 0 means successfully response, others means response failure |
| msg            | string | Error Details Description                                                |
| success        | LIST   | list of successfully canceled orders                                     |
| failed         | array  | list of failed orders                                                    |
| orderId        | int64  | Order ID                                                                 |
| errorCode      | int64  | error code, 0 means successfully response, others means response failure |
| errorMessage   | string | Error Details Description                                                |

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
| 80014      | orderIdList & clientOrderIDList are both empty;                                                                                                              |
| 109201     | The same order number is only allowed to be submitted once within 1 second.                                                                                  |
| 109201     | The same order number is only allowed to be submitted once within 1 second.                                                                                  |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
