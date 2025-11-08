# GET /api/v2/symbols

**Source:** [/api/v2/symbols](https://www.kucoin.com/docs/rest//api/v2/symbols)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Symbols

Request a list of available currency pairs for trading via this endpoint. If you want to get the market information of the trading symbol, please use Get All Tickers.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| market | optional | string | [The trading market](https://www.kucoin.com/docs-new/api-222921786) |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

