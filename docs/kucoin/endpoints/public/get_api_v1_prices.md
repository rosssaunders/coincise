# GET /api/v1/prices

**Source:** [/api/v1/prices](https://www.kucoin.com/docs/rest//api/v1/prices)

## Authentication

Not Required (Public Endpoint)

## Description

Get Fiat Price

Request the fiat price of the currencies for the available trading pairs via
this endpoint.

## Parameters

| Parameter  | Required | Type   | Description                                                                                                                         |
| ---------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| base       | optional | string | Ticker symbol of a base currency, e.g. USD, EUR. Default is USD                                                                     |
| currencies | optional | string | Comma-separated cryptocurrencies to be converted into fiat, e.g.: BTC,ETH, etc. Default to return the fiat price of all currencies. |

## Responses

### 200

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| data      | required | object |             |
