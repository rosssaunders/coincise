# DELETE /openApi/swap/v2/trade/batchOrders

**Source:**
[/openApi/swap/v2/trade/batchOrders](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Cancel multiple orders

DELETE /openApi/swap/v2/trade/batchOrders

rate limitation by UID: 5/s & rate limitation by IP in group Number: 3

API KEY permission: Perpetual Futures Trading

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html](https://bingx-api.github.io/docs/#/en-us/swapV2/trade-api.html)
