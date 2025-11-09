# GET /api/v1/contracts/risk-limit/{symbol}

**Source:** [/api/v1/contracts/risk-limit/{symbol}](https://www.kucoin.com/docs/rest//api/v1/contracts/risk-limit/{symbol})

## Authentication

Required (Private Endpoint)

## Description

Get Isolated Margin Risk Limit

This interface can be used to obtain information about risk limit level of a specific contract (only valid for Isolated Margin).

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |
| data[].symbol | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| data[].level | required | integer | Level
 |
| data[].maxRiskLimit | required | integer | Upper limit USDT (included)
 |
| data[].minRiskLimit | required | integer | Lower limit USDT
 |
| data[].maxLeverage | required | integer | Max. leverage
 |
| data[].initialMargin | required | number | Initial margin rate
 |
| data[].maintainMargin | required | number | Maintenance margin rate
 |

