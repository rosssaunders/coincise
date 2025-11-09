# DELETE /v4/open-order

**Source:**
[https://doc.xt.com/docs/spot/Order/CancelCurrentPendingOrder](https://doc.xt.com/docs/spot/Order/CancelCurrentPendingOrder)

## Description

This endpoint performs operations on /v4/open-order.

## Authentication

Required (Private Endpoint)

## Rate Limit

- 10/s/apikey
- **Note:** The parameters should be placed in the request body in the form of
  JSON.

## HTTP Request

`DELETE /v4/open-order`

## Request Parameters

| Name    | Type   | Required | Default | Description                                    | Ranges      |
| ------- | ------ | -------- | ------- | ---------------------------------------------- | ----------- |
| symbol  | string | No       | N/A     | Trading pair, if not filled in, represents all | —           |
| bizType | string | Yes      | N/A     | Business type                                  | SPOT, LEVER |
| side    | string | No       | N/A     | Order side                                     | BUY, SELL   |

## Response Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| rc        | number | -           |
| mc        | string | -           |
| ma        | array  | -           |
| result    | object | -           |

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": {}
}
```
