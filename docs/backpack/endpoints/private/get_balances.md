# GET balances.

**Source:**
[balances.](https://docs.backpack.exchange/#tag/Capital/operation/get_balances)

## Authentication

Required (Private Endpoint)

## [](#tag/Capital/operation/get_balances)Get balances.

Retrieves account balances and the state of the balances (locked or available).

Locked assets are those that are currently in an open order.

**Instruction:** `balanceQuery`

##### header Parameters

| Parameter   | Required | Type             | Description                                                                 |
| ----------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| X-API-KEY   | optional | string           | API key                                                                     |
| X-SIGNATURE | optional | string           | Signature of the request                                                    |
| X-TIMESTAMP | optional | integer <int64>  | Timestamp of the request in milliseconds                                    |
| X-WINDOW    | optional | integer <uint64> | Time the request is valid for in milliseconds (default 5000, maximum 60000) |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

| Parameter       | Required | Type   | Description |
| --------------- | -------- | ------ | ----------- |
| property name\* | optional | object |             |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
