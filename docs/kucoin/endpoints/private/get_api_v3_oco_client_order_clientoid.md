# GET /api/v3/oco/client-order/{clientOid}

**Source:** [/api/v3/oco/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v3/oco/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Get OCO Order By ClientOid

Request via this interface to get a oco order information via the client order ID.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | Client Order Id，unique identifier created by the user |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

