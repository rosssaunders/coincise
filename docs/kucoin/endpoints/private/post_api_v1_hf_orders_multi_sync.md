# POST /api/v1/hf/orders/multi/sync

**Source:** [/api/v1/hf/orders/multi/sync](https://www.kucoin.com/docs/rest//api/v1/hf/orders/multi/sync)

## Authentication

Required (Private Endpoint)

## Description

Batch Add Orders Sync

This endpoint supports sequential batch order placement from a single endpoint. A maximum of 5 orders can be placed simultaneously. The order types must be limit orders of the same trading pair

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| orderList | required | array | Order List |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

