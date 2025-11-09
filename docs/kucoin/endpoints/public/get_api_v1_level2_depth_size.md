# GET /api/v1/level2/depth{size}

**Source:**
[/api/v1/level2/depth{size}](https://www.kucoin.com/docs/rest//api/v1/level2/depth{size})

## Authentication

Not Required (Public Endpoint)

## Description

Get Part OrderBook

Query for part orderbook depth data. (aggregated by price). It is recommended
that you request via this endpoint, as the system response will be faster and
consume less traffic.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| size      | required | string | Get the depth layer, optional value: 20, 100                                                                       |
| symbol    | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter     | Required | Type    | Description                                                                                                        |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| code          | required | string  |                                                                                                                    |
| data          | required | object  |                                                                                                                    |
| data.sequence | required | integer | Sequence number                                                                                                    |
| data.symbol   | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| data.bids     | required | array   | bids, from high to low                                                                                             |
| data.asks     | required | array   | asks, from low to high                                                                                             |
| data.ts       | required | integer | Timestamp (nanoseconds)                                                                                            |
