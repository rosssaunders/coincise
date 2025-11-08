# POST /api/v3/redeem

**Source:** [/api/v3/redeem](https://www.kucoin.com/docs/rest//api/v3/redeem)

## Authentication

Required (Private Endpoint)

## Description

Redeem

Redeem your loan order.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | required | string | Currency |
| size | required | string | Redemption amount |
| purchaseOrderNo | required | string | Purchase order ID |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

