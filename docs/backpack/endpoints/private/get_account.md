# GET account.

**Source:**
[account.](https://docs.backpack.exchange/#tag/Account/operation/get_account)

## Authentication

Required (Private Endpoint)

## [](#tag/Account/operation/get_account)Get account.

**Instruction:** `accountQuery`

##### header Parameters

| Parameter   | Required | Type             | Description                                                                 |
| ----------- | -------- | ---------------- | --------------------------------------------------------------------------- |
| X-API-KEY   | required | string           | API key                                                                     |
| X-SIGNATURE | required | string           | Signature of the request                                                    |
| X-TIMESTAMP | required | integer <int64>  | Timestamp of the request in milliseconds                                    |
| X-WINDOW    | optional | integer <uint64> | Time the request is valid for in milliseconds (default 5000, maximum 60000) |

### Responses

**200**

Success.

##### Response Schema: application/json; charset=utf-8

| Parameter             | Required | Type             | Description                                                                |
| --------------------- | -------- | ---------------- | -------------------------------------------------------------------------- |
| autoBorrowSettlements | required | boolean          | If true, then tries to borrow during collateral reconciliation.            |
| autoLend              | required | boolean          | If true, then tries to automatically lend with available balance.          |
| autoRealizePnl        | required | boolean          | Determines if the account should have continuous PnL realization.          |
| autoRepayBorrows      | required | boolean          | If true, then tries to automatically repay borrows with available balance. |
| borrowLimit           | required | string <decimal> | Borrow limit.                                                              |
| futuresMakerFee       | required | string <decimal> | Futures maker fee in basis points. Negative if a rebate exists.            |
| futuresTakerFee       | required | string <decimal> | Futures taker fee in basis points.                                         |
| leverageLimit         | required | string <decimal> | Leverage limit of the account.                                             |
| limitOrders           | required | integer <uint64> | Number of open limit orders.                                               |
| liquidating           | required | boolean          | Whether the account is liquidating.                                        |
| positionLimit         | required | string <decimal> | Position limit.                                                            |
| spotMakerFee          | required | string <decimal> | Spot maker fee in basis points. Negative if a rebate exists.               |
| spotTakerFee          | required | string <decimal> | Spot taker fee in basis points.                                            |
| triggerOrders         | required | integer <uint64> | Number of open trigger orders.                                             |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
