# GET /api/v1/positions

**Source:** [/api/v1/positions](https://www.kucoin.com/docs/rest//api/v1/positions)

## Authentication

Required (Private Endpoint)

## Description

Get Position List

Get the position details of a specified position.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | optional | string | Quote currency code, Please refer to [rootSymbol](https://www.kucoin.com/docs-new/api-221752070) , such as USDT,XBT. Query all positions when empty |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

