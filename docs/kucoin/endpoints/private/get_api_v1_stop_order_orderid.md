# GET /api/v1/stop-order/{orderId}

**Source:** [/api/v1/stop-order/{orderId}](https://www.kucoin.com/docs/rest//api/v1/stop-order/{orderId})

## Authentication

Required (Private Endpoint)

## Description

Get Stop Order By OrderId

This interface is to obtain Spot stop order details by orderId

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| orderId | required | string | The order id |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| data | required | object | the details |
| code | required | string | return status code |

