# DELETE /v4/batch-order

**Source:** [https://doc.xt.com/docs/spot/Order/CancelBatchOrder](https://doc.xt.com/docs/spot/Order/CancelBatchOrder)

## Description

This endpoint performs operations on /v4/batch-order.

## Authentication

Required (Private Endpoint)

## HTTP Request

`DELETE /v4/batch-order`

## Request Parameters

| name | type | Required | default | description | ranges |
| --- | --- | --- | --- | --- | --- |
| clientBatchId | string | No |  | client batch id |  |
| orderIds | array | Yes |  | 6216559590087220004, 6216559590087220005 |  |

> Note: The parameters should be placed in the request body in the form of JSON.

## Response Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| rc | number | - |
| mc | string | - |
| ma | array | - |
| result | object | - |


## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {}}
```