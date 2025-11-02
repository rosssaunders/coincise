# GET max withdrawal quantity.

**Source:**
[max withdrawal quantity.](https://docs.backpack.exchange/#tag/Account/operation/get_max_withdrawal_quantity)

## Authentication

Required (Private Endpoint)

## [](#tag/Account/operation/get_max_withdrawal_quantity)Get max withdrawal quantity.

Retrieves the maxmimum quantity an account can withdraw for a given asset based
on the accounts existing exposure and margin requirements The response will
include the maximum quantity that can be withdrawn and whether the withdrawal is
with auto borrow or auto lend redeem enabled.

**Instruction:** `maxWithdrawalQuantity`

##### query Parameters

| Parameter      | Required | Type    | Description                                      |
| -------------- | -------- | ------- | ------------------------------------------------ |
| symbol         | required | string  | The asset to withdraw.                           |
| autoBorrow     | optional | boolean | Whether the withdrawal is with auto borrow.      |
| autoLendRedeem | optional | boolean | Whether the withdrawal is with auto lend redeem. |

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

| Parameter             | Required | Type             | Description |
| --------------------- | -------- | ---------------- | ----------- |
| autoBorrow            | optional | boolean          |             |
| autoLendRedeem        | optional | boolean          |             |
| maxWithdrawalQuantity | required | string <decimal> |             |
| symbol                | required | string           |             |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
