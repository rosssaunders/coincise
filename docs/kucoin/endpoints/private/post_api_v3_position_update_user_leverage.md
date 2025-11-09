# POST /api/v3/position/update-user-leverage

**Source:** [/api/v3/position/update-user-leverage](https://www.kucoin.com/docs/rest//api/v3/position/update-user-leverage)

## Authentication

Required (Private Endpoint)

## Description

Modify Leverage

This endpoint allows modifying the leverage multiplier for cross margin or isolated margin.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | optional | string | symbol, mandatory for isolated margin account |
| isIsolated | optional | boolean | true-isolated, false-cross; default is false |
| leverage | required | string | New leverage multiplier. Must be greater than 1 and up to two decimal places, and cannot be less than the user's current debt leverage or greater than the system's maximum leverage |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | string |  |

