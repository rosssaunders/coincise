# GET /api/v2/symbols/{symbol}

**Source:** [/api/v2/symbols/{symbol}](https://www.kucoin.com/docs/rest//api/v2/symbols/{symbol})

## Authentication

Not Required (Public Endpoint)

## Description

Get Symbol 

Request via this endpoint to get detail currency pairs for trading. If you want to get the market information of the trading symbol, please use Get All Tickers.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string | Path parameter, Symbol |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

