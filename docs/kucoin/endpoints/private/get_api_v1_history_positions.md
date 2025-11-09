# GET /api/v1/history-positions

**Source:**
[/api/v1/history-positions](https://www.kucoin.com/docs/rest//api/v1/history-positions)

## Authentication

Required (Private Endpoint)

## Description

Get Positions History

This interface can query position history information records.

## Parameters

| Parameter | Required | Type    | Description                                                                                                        |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | optional | string  | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| from      | optional | integer | Closing start time(ms)                                                                                             |
|           |
| to        | optional | integer | Closing end time(ms)                                                                                               |
|           |
| limit     | optional | integer | Number of requests per page, max 200, default 10                                                                   |
|           |
| pageId    | optional | integer | Current page number, default 1                                                                                     |
|           |

## Responses

### 200

| Parameter                         | Required | Type    | Description                                                                                                        |
| --------------------------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| code                              | required | string  |                                                                                                                    |
| data                              | required | object  |                                                                                                                    |
| data.currentPage                  | required | integer | Current page number                                                                                                |
|                                   |
| data.pageSize                     | required | integer | Number of results per page                                                                                         |
|                                   |
| data.totalNum                     | required | integer | Total number of results                                                                                            |
|                                   |
| data.totalPage                    | required | integer | Total number of pages                                                                                              |
|                                   |
| data.items                        | required | array   |                                                                                                                    |
| data.items[].closeId              | required | string  | Close ID                                                                                                           |
|                                   |
| data.items[].userId               | required | string  | User ID                                                                                                            |
| data.items[].symbol               | required | string  | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| data.items[].settleCurrency       | required | string  | Currency used to settle trades                                                                                     |
|                                   |
| data.items[].leverage             | required | string  | Leverage applied to the order                                                                                      |
|                                   |
| data.items[].type                 | required | string  | Type of closure                                                                                                    |
|                                   |
| data.items[].pnl                  | required | string  | Net profit and loss (after deducting fees and funding costs)                                                       |
|                                   |
| data.items[].realisedGrossCost    | required | string  | Accumulated realised gross profit value                                                                            |
|                                   |
| data.items[].withdrawPnl          | required | string  | Accumulated realised profit withdrawn from the position                                                            |
|                                   |
| data.items[].tradeFee             | required | string  | Accumulated trading fees                                                                                           |
|                                   |
| data.items[].fundingFee           | required | string  | Accumulated funding fees                                                                                           |
|                                   |
| data.items[].openTime             | required | integer | Time when the position was opened                                                                                  |
|                                   |
| data.items[].closeTime            | required | integer | Time when the position was closed (default sorted in descending order)                                             |
|                                   |
| data.items[].openPrice            | required | string  | Opening price of the position                                                                                      |
|                                   |
| data.items[].closePrice           | required | string  | Closing price of the position                                                                                      |
|                                   |
| data.items[].marginMode           | required | string  | Margin Mode: CROSS，ISOLATED                                                                                       |
| data.items[].realisedGrossCostNew | required | string  |                                                                                                                    |
| data.items[].tax                  | required | string  | Tax                                                                                                                |
| data.items[].roe                  | optional | string  |                                                                                                                    |
| data.items[].liquidAmount         | required | string  |                                                                                                                    |
| data.items[].liquidPrice          | required | string  |                                                                                                                    |
| data.items[].side                 | required | string  | Position side                                                                                                      |
