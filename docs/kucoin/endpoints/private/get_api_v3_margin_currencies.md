# GET /api/v3/margin/currencies

**Source:** [/api/v3/margin/currencies](https://www.kucoin.com/docs/rest//api/v3/margin/currencies)

## Authentication

Required (Private Endpoint)

## Description

Get Margin Risk Limit

Request Configure and Risk limit info of the margin via this endpoint.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| isIsolated | optional | boolean | True-isolated, false-cross |
| currency | optional | string | Currency: This field is only required for cross margin |
| symbol | optional | string | Symbol: This field is only required for isolated margin |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

