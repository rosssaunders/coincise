## Query Order history

GET /openApi/spot/v1/trade/historyOrders

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

Notice:

- If orderId is set, orders >= orderId. Otherwise, the most recent orders will
  be returned.
- If startTime and endTime are provided, orderId is not required.

### Request Parameters

| Parameter Name | Type   | Required | Description                                                                                                    |
| -------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------- |
| symbol         | string | no       | Trading pair, e.g., BTC-USDT                                                                                   |
| orderId        | int64  | no       | If orderId is set, orders >= orderId. Otherwise, the most recent orders will be returned.                      |
| startTime      | int64  | no       | Start timestamp, Unit: ms                                                                                      |
| endTime        | int64  | no       | End timestamp, Unit: ms                                                                                        |
| pageIndex      | int64  | no       | Page number, must >0,If not specified, it defaults to 1. Restriction: pageIndex \* pageSize <= 10,000.         |
| pageSize       | int64  | no       | Page size, must >0,Max 100,If not specified, it defaults to 100. Restriction: pageIndex \* pageSize <= 10,000. |
| status         | string | no       | status: FILLED (fully filled) CANCELED: (canceled) FAILED: (failed)                                            |
| type           | string | no       | order type: MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET                         |
| recvWindow     | int64  | no       | Request valid time window value, Unit: milliseconds                                                            |
| timestamp      | int64  | yes      | Timestamp of initiating the request, Unit: milliseconds                                                        |

### Response Parameters

| Parameter Name | Type  | Description                                                              |
| -------------- | ----- | ------------------------------------------------------------------------ |
| orders         | Array | Order list,max length is 2000, refer to the table below for order fields |

### Order Parameters

| Parameter Name      | Type    | Description                                                                |
| ------------------- | ------- | -------------------------------------------------------------------------- |
| symbol              | string  | Trading pair                                                               |
| orderId             | int64   | Order ID                                                                   |
| price               | string  | Price                                                                      |
| origQty             | string  | Original quantity                                                          |
| executedQty         | string  | Executed quantity                                                          |
| cummulativeQuoteQty | string  | Cumulative quote asset transacted quantity                                 |
| status              | string  | Order status: NEW, PENDING, PARTIALLY_FILLED, FILLED, CANCELED, FAILED     |
| type                | string  | MARKET/LIMIT/TAKE_STOP_LIMIT/TAKE_STOP_MARKET/TRIGGER_LIMIT/TRIGGER_MARKET |
| side                | string  | BUY/SELL                                                                   |
| time                | int64   | Order timestamp                                                            |
| updateTime          | int64   | Update timestamp                                                           |
| origQuoteOrderQty   | string  | Original quote order quantity                                              |
| fee                 | float64 | fee                                                                        |
| stopPrice           | string  | trigger price                                                              |
| avgPrice            | string  | average fill price                                                         |

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
