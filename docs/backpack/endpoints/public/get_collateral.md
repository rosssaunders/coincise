# GET collateral.

**Source:**
[collateral.](https://docs.backpack.exchange/#tag/Assets/operation/get_collateral_parameters)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Assets/operation/get_collateral_parameters)Get collateral.

Get collateral parameters for assets.

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter       | Required | Type   | Description                                  |
| --------------- | -------- | ------ | -------------------------------------------- |
| symbol          | required | string | Symbol of the collateral.                    |
| imfFunction     | required | object | IMF function.                                |
| mmfFunction     | required | object | MMF function.                                |
| haircutFunction | required | object | Calculates the haircut for collateral value. |

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
