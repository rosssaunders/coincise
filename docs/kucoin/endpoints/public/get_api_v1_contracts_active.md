# GET /api/v1/contracts/active

**Source:** [/api/v1/contracts/active](https://www.kucoin.com/docs/rest//api/v1/contracts/active)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Symbols

Get detailed information of all contracts that can be traded. This API will return a list of tradable contracts, including some key parameters of the contract such as the symbol name, tick size, mark price, etc.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string | 200000 is for success, other is error |
| data | required | array | List of all contracts |

