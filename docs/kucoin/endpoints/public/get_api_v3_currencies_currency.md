# GET /api/v3/currencies/{currency}

**Source:** [/api/v3/currencies/{currency}](https://www.kucoin.com/docs/rest//api/v3/currencies/{currency})

## Authentication

Not Required (Public Endpoint)

## Description

Get Currency

Request the currency details of a specified currency via this endpoint.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| chain | optional | string | Support for querying the chain of currency, e.g. the available values for USDT are OMNI, ERC20, TRC20. This only applies to multi-chain currencies; no need for single-chain currencies. |
| currency | required | string | Path parameter, Currency |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

