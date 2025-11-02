# GET borrow lend markets.

**Source:**
[borrow lend markets.](https://docs.backpack.exchange/#tag/Borrow-Lend-Markets/operation/get_borrow_lend_markets)

## Authentication

Not Required (Public Endpoint)

## [](#tag/Borrow-Lend-Markets/operation/get_borrow_lend_markets)Get borrow lend markets.

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

Array

| Parameter                    | Required | Type               | Description                                                                                                                                                                                      |
| ---------------------------- | -------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| state                        | required | string             | State of the borrow lend market.                                                                                                                                                                 |
| assetMarkPrice               | required | string <decimal>   | Mark price of spot instrument.                                                                                                                                                                   |
| borrowInterestRate           | required | string <decimal>   | The rate borrowers pay.                                                                                                                                                                          |
| borrowedQuantity             | required | string <decimal>   | The amount of assets borrowed from the pool.                                                                                                                                                     |
| fee                          | required | string <decimal>   | The fee that the exchange takes on borrow lend yield.                                                                                                                                            |
| lendInterestRate             | required | string <decimal>   | The APY rate lenders receive.                                                                                                                                                                    |
| lentQuantity                 | required | string <decimal>   | The amount of assets lent to the pool.                                                                                                                                                           |
| maxUtilization               | required | string <decimal>   | The max amount of utilization that can be used by borrowing or redeeming lend, irrespsective of the throttle.                                                                                    |
| openBorrowLendLimit          | required | string <decimal>   | Can't increase borrows or lends pass this threshold. It's possible this is less than the outstanding amount. If that's the case, then it simply prevents new borrow or lends from being created. |
| optimalUtilization           | required | string <decimal>   | The optimal utilization rate for the interest rate model.                                                                                                                                        |
| symbol                       | required | string             | Uniquely identifies the token.                                                                                                                                                                   |
| timestamp                    | required | string <date-time> | Timestamp of the summary.                                                                                                                                                                        |
| throttleUtilizationThreshold | required | string <decimal>   | The threshold that triggers borrow throttling.                                                                                                                                                   |
| throttleUtilizationBound     | required | string <decimal>   | The max utilization threshold for any given timestep. Any borrow or lend redemption should fail if it puts utilization above this (with the exception of liquidations).                          |
| throttleUpdateFraction       | required | string <decimal>   | Hyper-param determining the max utilization can increase during any timestep.                                                                                                                    |
| utilization                  | required | string <decimal>   | Utilisation.                                                                                                                                                                                     |
| stepSize                     | required | string <decimal>   | Step Size.                                                                                                                                                                                       |

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
