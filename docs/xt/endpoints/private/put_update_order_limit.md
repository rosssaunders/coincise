# PUT /v4/order/{orderId}

**Source:** [https://doc.xt.com/docs/spot/Order/UpdateOrderLimit](https://doc.xt.com/docs/spot/Order/UpdateOrderLimit)

## Description

This endpoint performs operations on /v4/order/{orderId}.

## Authentication

Required (Private Endpoint)

## Rate Limit

50/s/apikey

## HTTP Request

`PUT /v4/order/{orderId}`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| orderId | number | Yes |  | order ID |  |
| price | number | Yes |  | Price |  |
| quantity | number | Yes |  | Quantity |  |

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "orderId": "6216559590087220004",
```