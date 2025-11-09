# POST /api/v2/changeCrossUserLeverage

**Source:** [/api/v2/changeCrossUserLeverage](https://www.kucoin.com/docs/rest//api/v2/changeCrossUserLeverage)

## Authentication

Required (Private Endpoint)

## Description

Modify Cross Margin Leverage

This interface can modify the current symbol’s cross-margin leverage multiple.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| leverage | required | string | Leverage multiple |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | boolean |  |

