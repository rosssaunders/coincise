# GET collateral.

**Source:**
[collateral.](https://docs.backpack.exchange/#tag/Capital/operation/get_collateral)

## Authentication

Required (Private Endpoint)

## [](#tag/Capital/operation/get_collateral)Get collateral.

Retrieves collateral information for an account.

**Instruction:** `collateralQuery`

##### query Parameters

| Parameter    | Required | Type             | Description |
| ------------ | -------- | ---------------- | ----------- |
| subaccountId | optional | integer <uint16> |             |

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

| Parameter          | Required | Type             | Description                                                   |
| ------------------ | -------- | ---------------- | ------------------------------------------------------------- |
| assetsValue        | required | string <decimal> | Notional value of assets                                      |
| borrowLiability    | required | string <decimal> | Total borrow notional.                                        |
| collateral         | required | objects          | Collateral held for a given spot asset.                       |
| imf                | required | string <decimal> | Initial margin fraction.                                      |
| unsettledEquity    | required | string <decimal> | Unsettled claim on the liquidity fund.                        |
| liabilitiesValue   | required | string <decimal> | Notional value of liabilities                                 |
| marginFraction     | optional | string <decimal> | Margin fraction.                                              |
| mmf                | required | string <decimal> | Maintenance margin fraction.                                  |
| netEquity          | required | string <decimal> | Net equity.                                                   |
| netEquityAvailable | required | string <decimal> | Net equity available.                                         |
| netEquityLocked    | required | string <decimal> | Net equity Locked.                                            |
| netExposureFutures | required | string <decimal> | Total exposure of positions as well potential open positions. |
| pnlUnrealized      | required | string <decimal> | Unrealised PnL.                                               |

**400**

Bad request.

**500**

Internal server error.

##### Response Schema: application/json; charset=utf-8

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| message   | required | string |             |
