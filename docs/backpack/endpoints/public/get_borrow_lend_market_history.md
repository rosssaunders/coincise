# GET borrow lend market history.

**Source:**
[borrow lend market history.](https://docs.backpack.exchange/#tag/Borrow-Lend-Markets/operation/get_borrow_lend_markets_history)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Borrow-Lend-Markets/operation/get_borrow_lend_markets_history)Get borrow lend market history.

##### query Parameters

| Parameter | Required | Type   | Description                                                   |
| --------- | -------- | ------ | ------------------------------------------------------------- |
| interval  | required | string | Filter for an interval.                                       |
| symbol    | optional | string | Market symbol to query. If not set, all markets are returned. |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter          | Required | Type               | Description                                  |
| ------------------ | -------- | ------------------ | -------------------------------------------- |
| borrowInterestRate | required | string <decimal>   | The rate borrowers pay.                      |
| borrowedQuantity   | required | string <decimal>   | The amount of assets borrowed from the pool. |
| lendInterestRate   | required | string <decimal>   | The APY rate lenders receive.                |
| lentQuantity       | required | string <decimal>   | The amount of assets lent to the pool.       |
| timestamp          | required | string <date-time> | Timestamp of the summary.                    |
| utilization        | required | string <decimal>   | Utilisation.                                 |

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
