# GET /api/v1/order/client-order/{clientOid}

**Source:** [/api/v1/order/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v1/order/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Get Order By ClientOid - Old

Request via this interface to check the information of a single active order via clientOid. The system will send a prompt that the order does not exist if the order does not exist or has been settled.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | Unique order ID created by users to identify their orders |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

