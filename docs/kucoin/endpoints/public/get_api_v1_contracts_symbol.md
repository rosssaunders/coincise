# GET /api/v1/contracts/{symbol}

**Source:** [/api/v1/contracts/{symbol}](https://www.kucoin.com/docs/rest//api/v1/contracts/{symbol})

## Authentication

Not Required (Public Endpoint)

## Description

Get Symbol

Get information of specified contracts that can be traded. This API will return a list of tradable contracts, including some key parameters of the contract such as the symbol name, tick size, mark price, etc.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Path Parameter. Symbol of the contract |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | 200000 is for success, other is error |
| data | required | object |  |

