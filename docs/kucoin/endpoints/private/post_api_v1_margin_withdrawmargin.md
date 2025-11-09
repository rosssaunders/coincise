# POST /api/v1/margin/withdrawMargin

**Source:** [/api/v1/margin/withdrawMargin](https://www.kucoin.com/docs/rest//api/v1/margin/withdrawMargin)

## Authentication

Required (Private Endpoint)

## Description

Remove Isolated Margin

Remove Isolated Margin Manually.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)  |
| withdrawAmount | required | string | The size of the position that can be deposited. If it is USDT-margin, it represents the amount of USDT. If it is coin-margin, this value represents the number of coins
 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | string | The size of the position deposited. If it is USDT-margin, it represents the amount of USDT. If it is coin-margin, this value represents the number of coins
 |

