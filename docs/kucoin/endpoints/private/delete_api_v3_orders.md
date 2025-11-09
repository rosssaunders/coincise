# DELETE /api/v3/orders

**Source:** [/api/v3/orders](https://www.kucoin.com/docs/rest//api/v3/orders)

## Authentication

Required (Private Endpoint)

## Description

Cancel All Orders

Cancel all open orders (excluding stop orders). The response is a list of orderIDs of the canceled orders.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Cancel all limit orders for a specific symbol only,  Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.cancelledOrderIds | required | array | Unique ID of the cancelled order |

