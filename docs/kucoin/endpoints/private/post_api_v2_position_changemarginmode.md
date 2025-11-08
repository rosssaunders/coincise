# POST /api/v2/position/changeMarginMode

**Source:** [/api/v2/position/changeMarginMode](https://www.kucoin.com/docs/rest//api/v2/position/changeMarginMode)

## Authentication

Required (Private Endpoint)

## Description

Switch Margin Mode

This interface can modify the margin mode of the current symbol.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| marginMode | required | string | Modified margin model: ISOLATED (isolated), CROSS (cross margin). |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

