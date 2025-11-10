# GET /api/v3/etf/info

**Source:**
[/api/v3/etf/info](https://www.kucoin.com/docs/rest//api/v3/etf/info)

## Authentication

Not Required (Public Endpoint)

## Description

Get ETF Info

This interface returns leveraged token information.

## Parameters

| Parameter | Required | Type   | Description                                  |
| --------- | -------- | ------ | -------------------------------------------- |
| currency  | optional | string | ETF Currency: If empty, query all currencies |
|           |

## Responses

### 200

| Parameter             | Required | Type   | Description                   |
| --------------------- | -------- | ------ | ----------------------------- |
| code                  | required | string |                               |
| data                  | required | array  |                               |
| data[].currency       | required | string | ETF Currency                  |
| data[].netAsset       | required | string | Net worth                     |
| data[].targetLeverage | required | string | Target leverage               |
| data[].actualLeverage | required | string | Actual leverage               |
| data[].issuedSize     | required | string | The amount of currency issued |
| data[].basket         | required | string | Basket information            |
