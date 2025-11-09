# GET /api/v2/getMaxOpenSize

**Source:**
[/api/v2/getMaxOpenSize](https://www.kucoin.com/docs/rest//api/v2/getMaxOpenSize)

## Authentication

Required (Private Endpoint)

## Description

Get Max Open Size

Get Maximum Open Position Size.

## Parameters

| Parameter | Required | Type    | Description                                                                                                        |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| price     | required | string  | Order Price                                                                                                        |
|           |
| leverage  | required | integer | Leverage                                                                                                           |
|           |

## Responses

### 200

| Parameter            | Required | Type    | Description                                                                                                        |
| -------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| code                 | required | string  |                                                                                                                    |
| data                 | required | object  |                                                                                                                    |
| data.symbol          | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| data.maxBuyOpenSize  | required | integer | Maximum buy size (unit: lot)                                                                                       |
|                      |
| data.maxSellOpenSize | required | integer | Maximum buy size (unit: lot)                                                                                       |
|                      |
