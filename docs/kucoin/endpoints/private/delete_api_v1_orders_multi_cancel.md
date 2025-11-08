# DELETE /api/v1/orders/multi-cancel

**Source:** [/api/v1/orders/multi-cancel](https://www.kucoin.com/docs/rest//api/v1/orders/multi-cancel)

## Authentication

Required (Private Endpoint)

## Description

Batch Cancel Orders

Cancel a bach of orders by client defined orderId or system generated orderId

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| orderIdsList | required | array | the list of orderId |
| clientOidsList | required | array | the list of client orderId |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

