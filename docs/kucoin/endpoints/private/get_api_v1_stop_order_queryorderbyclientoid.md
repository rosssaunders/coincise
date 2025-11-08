# GET /api/v1/stop-order/queryOrderByClientOid

**Source:** [/api/v1/stop-order/queryOrderByClientOid](https://www.kucoin.com/docs/rest//api/v1/stop-order/queryOrderByClientOid)

## Authentication

Required (Private Endpoint)

## Description

Get Stop Order By ClientOid

This interface is to obtain Spot stop order details by orderId

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| clientOid | required | string | The client order id |
| symbol | optional | string | symbol name |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | the return code |
| data | required | array | the return code |

