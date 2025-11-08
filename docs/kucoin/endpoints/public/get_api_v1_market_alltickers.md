# GET /api/v1/market/allTickers

**Source:** [/api/v1/market/allTickers](https://www.kucoin.com/docs/rest//api/v1/market/allTickers)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Tickers

Request market tickers for all the trading pairs in the market (including 24h volume); takes a snapshot every 2 seconds.  On the rare occasion that we change the currency name, if you still want the changed symbol name, you can use the symbolName field instead of the symbol field via “Get all tickers” endpoint.

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

