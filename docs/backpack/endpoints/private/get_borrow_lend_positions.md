# GET borrow lend positions.

**Source:**
[borrow lend positions.](https://docs.backpack.exchange/#tag/Borrow-Lend/operation/get_borrow_lend_positions)

## Authentication

Required (Private Endpoint)

## [](#tag/Borrow-Lend/operation/get_borrow_lend_positions)Get borrow lend positions.

Retrieves all the open borrow lending positions for the account.

**Instruction:** `borrowLendPositionQuery`

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

Array

| Parameter           | Required | Type             | Description                                                                                |
| ------------------- | -------- | ---------------- | ------------------------------------------------------------------------------------------ |
| cumulativeInterest  | required | string <decimal> | Cumulative interest payments quantity.                                                     |
| id                  | required | string           | Uniquely identifies the position.                                                          |
| imf                 | required | string <decimal> | Initial margin fraction for this position.                                                 |
| imfFunction         | required | object           | IMF function.                                                                              |
| netQuantity         | required | string <decimal> | Net quantity of the position, positive if long, negative if short.                         |
| markPrice           | required | string <decimal> | Mark price of the underlying asset.                                                        |
| mmf                 | required | string <decimal> | Maintenance margin fraction for this position.                                             |
| mmfFunction         | required | object           | MMF function.                                                                              |
| netExposureQuantity | required | string <decimal> | Net exposure of the position, positive if long, negative if short. Lends have no exposure. |
| netExposureNotional | required | string <decimal> | Notional value of the position.                                                            |
| symbol              | required | string           | Symbol of the underlying asset.                                                            |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
