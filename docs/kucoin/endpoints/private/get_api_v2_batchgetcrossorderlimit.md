# GET /api/v2/batchGetCrossOrderLimit

**Source:** [/api/v2/batchGetCrossOrderLimit](https://www.kucoin.com/docs/rest//api/v2/batchGetCrossOrderLimit)

## Authentication

Required (Private Endpoint)

## Description

Get Cross Margin Risk Limit

Batch get cross margin risk limit.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220), (You may add up to 50 symbols. Use a halfwidth comma to each IP) |
| totalMargin | optional | string | The position opening amount, in the contract's settlement currency.
Defaults to 10,000 in margin currency for max position calculation.
For USDT/USDC, it's 10,000 USD; for others, it's 10,000 divided by the token's USDT price. |
| leverage | optional | integer | Calculates the max position size at the specified leverage.
Defaults to the symbol’s max cross leverage. |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |
| data[].symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| data[].maxOpenSize | required | integer | Maximum amount of open position(Unit is **lots**)
 |
| data[].maxOpenValue | required | string | Maximum value of open position(Unit is **quoteCcy**)
 |
| data[].totalMargin | required | string | Margin amount used for max position calculation. |
| data[].price | required | string | Price used for max position calculation. Defaults to latest transaction price |
| data[].leverage | required | string | Leverage used for max position calculation. |
| data[].mmr | required | string | Maintenance Margin Rate |
| data[].imr | required | string | Initial Margin Rate |
| data[].currency | required | string | Margin Currency |

