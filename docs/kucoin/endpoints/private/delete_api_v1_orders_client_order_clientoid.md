# DELETE /api/v1/orders/client-order/{clientOid}

**Source:** [/api/v1/orders/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v1/orders/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Cancel Order By ClientOid

Cancel order by client defined orderId.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| clientOid | required | string | client order id |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

