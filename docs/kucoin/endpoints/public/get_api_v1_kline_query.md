# GET /api/v1/kline/query

**Source:**
[/api/v1/kline/query](https://www.kucoin.com/docs/rest//api/v1/kline/query)

## Authentication

Not Required (Public Endpoint)

## Description

Get Klines

Get the symbol’s candlestick chart. Data are returned in grouped buckets based
on requested type. For each query, the system will return at most 500 pieces of
data. To obtain more data, please page the data by time.

## Parameters

| Parameter   | Required | Type    | Description                                                                                                                                                         |
| ----------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol      | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol, indexSymbol, premiumsSymbol1M, premiumsSymbol8H](https://www.kucoin.com/docs-new/api-3470220) |
| granularity | required | integer | Type of candlestick patterns (minutes)                                                                                                                              |
| from        | optional | integer | Start time (milliseconds)                                                                                                                                           |
| to          | optional | integer | End time (milliseconds)                                                                                                                                             |

## Responses

### 200

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| data      | required | array  |             |
