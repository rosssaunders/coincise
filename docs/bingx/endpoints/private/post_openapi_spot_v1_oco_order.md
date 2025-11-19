# POST /openApi/spot/v1/oco/order

**Source:** [/openApi/spot/v1/oco/order](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Create an OCO Order

POST /openApi/spot/v1/oco/order

rate limitation by UID: 2/s & rate limitation by IP in group Number: 2

API KEY permission: Spot Trading

Content-Type: request body(application/json)

### Request Parameters

| Parameter Name     | Type    | Required | Description                                                                               |
| ------------------ | ------- | -------- | ----------------------------------------------------------------------------------------- |
| symbol             | string  | Yes      | Trading pair, e.g., BTC-USDT, please use uppercase letters                                |
| side               | string  | Yes      | Order type, BUY for buy, SELL for sell                                                    |
| quantity           | float64 | Yes      | Order quantity, e.g., 0.1 BTC                                                             |
| limitPrice         | float64 | Yes      | Limit order price. e.g., 10000 USDT                                                       |
| orderPrice         | float64 | Yes      | The limit order price set after a stop-limit order is triggered. e.g., 10000 USDT         |
| triggerPrice       | float64 | Yes      | The trigger price of the stop-limit order. e.g., 10000 USDT                               |
| listClientOrderId  | string  | No       | Custom unique ID for the entire Order List, only supports numeric strings, e.g., "123456" |
| aboveClientOrderId | string  | No       | Custom unique ID for the limit order, only supports numeric strings, e.g., "123456"       |
| belowClientOrderId | string  | No       | Custom unique ID for the stop-limit order, only supports numeric strings, e.g., "123456"  |
| recvWindow         | float64 | No       | Request validity time window, in milliseconds                                             |
| timestamp          | int64   | Yes      | Request timestamp, in milliseconds                                                        |

### Response Parameters

| Parameter Name | Type    | Description                                                                                                                                                    |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orderId        | string  | Order ID                                                                                                                                                       |
| clientOrderId  | string  | Custom order ID                                                                                                                                                |
| orderType      | string  | ocoLimit: OCO Limit Order, ocoTps: OCO Stop-Limit Order                                                                                                        |
| symbol         | string  | Trading pair                                                                                                                                                   |
| price          | float64 | Order price                                                                                                                                                    |
| triggerPrice   | float64 | Trigger price                                                                                                                                                  |
| quantity       | float64 | Order quantity                                                                                                                                                 |
| status         | string  | Order status, NEW for new order, PENDING for pending, PARTIALLY_FILLED for partially filled, FILLED for fully filled, CANCELED for canceled, FAILED for failed |
| side           | string  | Order type, BUY for buy, SELL for sell                                                                                                                         |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html](https://bingx-api.github.io/docs/#/en-us/spot/trade-api.html)
