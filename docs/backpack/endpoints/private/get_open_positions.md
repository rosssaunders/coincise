# GET open positions.

**Source:**
[open positions.](https://docs.backpack.exchange/#tag/Futures/operation/get_positions)

## Authentication

Required (Private Endpoint)

## [](#tag/Futures/operation/get_positions)Get open positions.

Retrieves account position summary.

**Instruction:** `positionQuery`

##### query Parameters

| Parameter | Required | Type   | Description                             |
| --------- | -------- | ------ | --------------------------------------- |
| symbol    | optional | string | Filter for a single position by symbol. |

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

| Parameter                | Required | Type             | Description                                                                                                                                   |
| ------------------------ | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| breakEvenPrice           | required | string <decimal> | Break-even price for this position.                                                                                                           |
| entryPrice               | required | string <decimal> | Entry price for this position.                                                                                                                |
| estLiquidationPrice      | required | string <decimal> | Estimated liquidation price for this position.                                                                                                |
| imf                      | required | string <decimal> | Initial margin fraction for this position.                                                                                                    |
| imfFunction              | required | object           | IMF function.                                                                                                                                 |
| markPrice                | required | string <decimal> | Mark price for this position's market.                                                                                                        |
| mmf                      | required | string <decimal> | Maintenance margin fraction for this position.                                                                                                |
| mmfFunction              | required | object           | MMF function.                                                                                                                                 |
| netCost                  | required | string <decimal> | Positive if long. Negative if short. The net cost to enter into the position,i.e., price\*quantity for all positions adjusting this position. |
| netQuantity              | required | string <decimal> | Positive if long. Negative if short.                                                                                                          |
| netExposureQuantity      | required | string <decimal> | Quantity of this futures position including worst case open positions.                                                                        |
| netExposureNotional      | required | string <decimal> | Notional value of the futures position including worst case open positions.                                                                   |
| pnlRealized              | required | string <decimal> | Aggregates the amount of pnl realized on this position since opening.                                                                         |
| pnlUnrealized            | required | string <decimal> | Unrealized profit and loss for this position.                                                                                                 |
| cumulativeFundingPayment | required | string <decimal> | Cumulative funding payment for this position.                                                                                                 |
| subaccountId             | optional | integer <uint16> | ID of the user subaccount that the position is for.                                                                                           |
| symbol                   | required | string           | Future to which this position belongs.                                                                                                        |
| userId                   | required | integer <int32>  | Id of the user.                                                                                                                               |
| positionId               | required | string           | Id of the position.                                                                                                                           |
| cumulativeInterest       | required | string <decimal> | Cumulative interest paid for this position's unrealized pnl.                                                                                  |

**400**

Bad request.

**401**

Unauthorized.

**404**

Position not found.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
