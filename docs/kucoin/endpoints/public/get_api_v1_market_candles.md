# GET /api/v1/market/candles

**Source:** [/api/v1/market/candles](https://www.kucoin.com/docs/rest//api/v1/market/candles)

## Authentication

Not Required (Public Endpoint)

## Description

Get Klines

Get the Kline of the symbol. Data are returned in grouped buckets based on requested type. For each query, the system would return at most 1500 pieces of data. To obtain more data, please page the data by time.

## Parameters

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| symbol | required | string |  symbol |
| type | required | string | Type of candlestick patterns: 1min, 3min, 5min, 15min, 30min, 1hour, 2hour, 4hour, 6hour, 8hour, 12hour, 1day, 1week, 1month |
| startAt | optional | integer | Start time (second), default is 0 |
| endAt | optional | integer | End time (second), default is 0 |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

