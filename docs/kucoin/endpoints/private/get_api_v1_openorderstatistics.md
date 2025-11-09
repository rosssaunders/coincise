# GET /api/v1/openOrderStatistics

**Source:**
[/api/v1/openOrderStatistics](https://www.kucoin.com/docs/rest//api/v1/openOrderStatistics)

## Authentication

Required (Private Endpoint)

## Description

Get Open Order Value

You can query this endpoint to get the total number and value of all your active
orders.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter              | Required | Type    | Description                            |
| ---------------------- | -------- | ------- | -------------------------------------- |
| code                   | required | string  |                                        |
| data                   | required | object  |                                        |
| data.openOrderBuySize  | required | integer | Total number of unexecuted buy orders  |
|  |
| data.openOrderSellSize | required | integer | Total number of unexecuted sell orders |
|  |
| data.openOrderBuyCost  | required | string  | Value of all unexecuted buy orders     |
|  |
| data.openOrderSellCost | required | string  | Value of all unexecuted sell orders    |
|  |
| data.settleCurrency    | required | string  | Settlement currency                    |
|  |
