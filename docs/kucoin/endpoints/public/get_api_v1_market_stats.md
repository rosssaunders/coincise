# GET /api/v1/market/stats

**Source:**
[/api/v1/market/stats](https://www.kucoin.com/docs/rest//api/v1/market/stats)

## Authentication

Not Required (Public Endpoint)

## Description

Get 24hr Stats

Request via this endpoint to get the statistics of the specified ticker in the
last 24 hours.

## Parameters

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| symbol    | required | string | symbol      |

## Responses

### 200

| Parameter             | Required | Type    | Description                                                                                                                                                                      |
| --------------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code                  | required | string  |                                                                                                                                                                                  |
| data                  | required | object  |                                                                                                                                                                                  |
| data.time             | required | integer | timestamp                                                                                                                                                                        |
| data.symbol           | required | string  | Symbol                                                                                                                                                                           |
| data.buy              | required | string  | Best bid price                                                                                                                                                                   |
|  |
| data.sell             | required | string  | Best ask price                                                                                                                                                                   |
| data.changeRate       | required | string  | 24h change rate                                                                                                                                                                  |
| data.changePrice      | required | string  | 24h change price                                                                                                                                                                 |
| data.high             | required | string  | Highest price in 24h                                                                                                                                                             |
| data.low              | required | string  | Lowest price in 24h                                                                                                                                                              |
| data.vol              | required | string  | 24h volume, executed based on base currency                                                                                                                                      |
| data.volValue         | required | string  | 24h traded amount                                                                                                                                                                |
| data.last             | required | string  | Last traded price                                                                                                                                                                |
| data.averagePrice     | required | string  | Average trading price in the last 24 hours                                                                                                                                       |
| data.takerFeeRate     | required | string  | Basic Taker Fee                                                                                                                                                                  |
| data.makerFeeRate     | required | string  | Basic Maker Fee                                                                                                                                                                  |
| data.takerCoefficient | required | string  | The taker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
| data.makerCoefficient | required | string  | The maker fee coefficient. The actual fee needs to be multiplied by this coefficient to get the final fee. Most currencies have a coefficient of 1. If set to 0, it means no fee |
