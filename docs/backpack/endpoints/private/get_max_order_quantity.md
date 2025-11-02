# GET max order quantity.

**Source:**
[max order quantity.](https://docs.backpack.exchange/#tag/Account/operation/get_max_order_quantity)

## Authentication

Required (Private Endpoint)

## [](#tag/Account/operation/get_max_order_quantity)Get max order quantity.

Retrieves the maxmimum quantity an account can trade for a given symbol based on
the account's balances, existing exposure and margin requirements.

**Instruction:** `maxOrderQuantity`

##### query Parameters

| Parameter       | Required | Type             | Description                                                   |
| --------------- | -------- | ---------------- | ------------------------------------------------------------- |
| symbol          | required | string           | The market symbol to trade.                                   |
| side            | required | string           | The side of the order.                                        |
| price           | optional | string <decimal> | The limit price of the order. Not included for market orders. |
| reduceOnly      | optional | boolean          | Whether the order is reduce only.                             |
| autoBorrow      | optional | boolean          | Whether the order uses auto borrow.                           |
| autoBorrowRepay | optional | boolean          | Whether the order uses auto borrow repay.                     |
| autoLendRedeem  | optional | boolean          | Whether the order uses auto lend redeem.                      |

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

| Parameter        | Required | Type             | Description |
| ---------------- | -------- | ---------------- | ----------- |
| autoBorrow       | optional | boolean          |             |
| autoBorrowRepay  | optional | boolean          |             |
| autoLendRedeem   | optional | boolean          |             |
| maxOrderQuantity | required | string <decimal> |             |
| price            | optional | string <decimal> |             |
| side             | required | string           |             |
| symbol           | required | string           |             |
| reduceOnly       | optional | boolean          |             |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
