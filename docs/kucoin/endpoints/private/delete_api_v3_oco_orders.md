# DELETE /api/v3/oco/orders

**Source:** [/api/v3/oco/orders](https://www.kucoin.com/docs/rest//api/v3/oco/orders)

## Authentication

Required (Private Endpoint)

## Description

Batch Cancel OCO Order

This interface can batch cancel OCO orders through orderIds.  You will receive canceledOrderIds field once the system has received the cancellation request. The cancellation request will be processed by the matching engine in sequence. To know if the request is processed (successfully or not), you may check the order status or the update message from the pushes.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| orderIds | optional | string | Specify the order ID; there can be multiple orders, separated by commas. If not passed, all OCO orders will be canceled by default. |
| symbol | optional | string | Trading pair. If not passed, the OCO orders of all symbols will be canceled by default. |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.cancelledOrderIds | required | array | List of two order IDs related to the canceled OCO order |

