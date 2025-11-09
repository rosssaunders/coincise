# GET /api/v2/position/getMarginMode

**Source:** [/api/v2/position/getMarginMode](https://www.kucoin.com/docs/rest//api/v2/position/getMarginMode)

## Authentication

Required (Private Endpoint)

## Description

Get Margin Mode

This interface can query the margin mode of the current symbol.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| data.marginMode | required | string | Margin mode: ISOLATED (isolated), CROSS (cross margin). |

