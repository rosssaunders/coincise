# DELETE /v4/order/{orderId}

**Source:** [https://doc.xt.com/docs/spot/Order/CancelOrder](https://doc.xt.com/docs/spot/Order/CancelOrder)

## Description

This endpoint performs operations on /v4/order/{orderId}.

## Authentication

Required (Private Endpoint)

## Rate Limit

N/A

## HTTP Request

`DELETE /v4/order/{orderId}`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| orderId | number | Yes |  |  |  |

## Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| rc | number | - |
| mc | string | - |
| ma | array | - |
| result | object | - |
| result.cancelId | string | - |


## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "cancelId": "6216559590087220004"  }}
```