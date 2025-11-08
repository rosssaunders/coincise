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

