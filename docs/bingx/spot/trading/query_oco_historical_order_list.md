## Query OCO Historical Order List

GET /openApi/spot/v1/oco/historyOrderList

rate limitation by UID: 5/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Query OCO historical order list

### Request Parameters

| Parameter Name | Type  | Required | Description                              |
| -------------- | ----- | -------- | ---------------------------------------- |
| pageIndex      | int64 | Yes      | Page number                              |
| pageSize       | int64 | Yes      | Number of items per page                 |
| startTime      | int64 | No       | Start time, timestamp, in milliseconds   |
| endTime        | int64 | No       | End time, timestamp, in milliseconds     |
| recvWindow     | int64 | No       | Request validity window, in milliseconds |
| timestamp      | int64 | Yes      | Request timestamp, in milliseconds       |

### Response Parameters

| Parameter Name  | Type    | Description                                             |
| --------------- | ------- | ------------------------------------------------------- |
| transactionTime | int64   | Order time                                              |
| orderId         | string  | Order ID                                                |
| clientOrderId   | string  | User-defined order ID                                   |
| symbol          | string  | Trading pair                                            |
| orderType       | string  | ocoLimit: OCO Limit Order, ocoTps: OCO Stop-Limit Order |
| side            | string  | Trade type, BUY for buy, SELL for sell                  |
| triggerPrice    | float64 | Trigger price                                           |
| price           | float64 | Order price                                             |
| quantity        | float64 | Order quantity                                          |
| orderListId     | string  | OCO order group ID                                      |

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
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
