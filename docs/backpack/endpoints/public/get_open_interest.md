# GET open interest.

**Source:**
[open interest.](https://docs.backpack.exchange/#tag/Markets/operation/get_open_interest)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Markets/operation/get_open_interest)Get open interest.

Retrieves the current open interest for the given market. If no market is
provided, then all markets are returned.

##### query Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| symbol    | optional | string |             |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter    | Required | Type             | Description               |
| ------------ | -------- | ---------------- | ------------------------- |
| symbol       | required | string           | The symbol of the market. |
| openInterest | optional | string <decimal> | The open interest.        |
| timestamp    | required | integer <int64>  | Timestamp.                |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
