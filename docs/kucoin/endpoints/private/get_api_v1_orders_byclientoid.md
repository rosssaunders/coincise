# GET /api/v1/orders/byClientOid

**Source:** [/api/v1/orders/byClientOid](https://www.kucoin.com/docs/rest//api/v1/orders/byClientOid)

## Authentication

Required (Private Endpoint)

## Description

Get Order By ClientOid

Get a single order by client order ID (including a stop order).

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | The user self-defined order ID. |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

