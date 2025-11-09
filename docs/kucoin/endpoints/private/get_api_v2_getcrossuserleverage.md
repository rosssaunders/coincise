# GET /api/v2/getCrossUserLeverage

**Source:** [/api/v2/getCrossUserLeverage](https://www.kucoin.com/docs/rest//api/v2/getCrossUserLeverage)

## Authentication

Required (Private Endpoint)

## Description

Get Cross Margin Leverage

This interface can query the current symbol’s cross-margin leverage multiple.

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
| data.leverage | required | string | Leverage multiple |

