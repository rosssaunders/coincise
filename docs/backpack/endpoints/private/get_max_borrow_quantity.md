# GET max borrow quantity.

**Source:**
[max borrow quantity.](https://docs.backpack.exchange/#tag/Account/operation/get_max_borrow_quantity)

## Authentication

Required (Private Endpoint)

## [](#tag/Account/operation/get_max_borrow_quantity)Get max borrow quantity.

Retrieves the maxmimum quantity an account can borrow for a given asset based on
the accounts existing exposure and margin requirements

**Instruction:** `maxBorrowQuantity`

##### query Parameters

| Parameter | Required | Type   | Description          |
| --------- | -------- | ------ | -------------------- |
| symbol    | required | string | The asset to borrow. |

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

| Parameter         | Required | Type             | Description |
| ----------------- | -------- | ---------------- | ----------- |
| maxBorrowQuantity | required | string <decimal> |             |
| symbol            | required | string           |             |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |

**503**

Service unavailable.
