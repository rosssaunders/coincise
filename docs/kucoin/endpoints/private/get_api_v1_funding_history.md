# GET /api/v1/funding-history

**Source:**
[/api/v1/funding-history](https://www.kucoin.com/docs/rest//api/v1/funding-history)

## Authentication

Required (Private Endpoint)

## Description

Get Private Funding History

Submit request to get the funding history.

## Parameters

| Parameter | Required | Type    | Description                                                                                                                                              |
| --------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)                                       |
| startAt   | optional | integer | Begin time (milliseconds)                                                                                                                                |
|  |
| endAt     | optional | integer | End time (milliseconds)                                                                                                                                  |
|  |
| reverse   | optional | boolean | This parameter functions to judge whether the lookup is forward or not. True means “yes” and False means “no”. This parameter is set as true by default. |
|  |
| offset    | optional | integer | Start offset. The unique attribute of the last returned result of the last request. The data of the first page will be returned by default.              |
|  |
| forward   | optional | boolean | This parameter functions to judge whether the lookup is forward or not. True means “yes” and False means “no”. This parameter is set as true by default. |
|  |
| maxCount  | optional | integer | Max. record count. The default record count is 10                                                                                                        |

## Responses

### 200

| Parameter                      | Required | Type    | Description                                                                                                        |
| ------------------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| code                           | required | string  |                                                                                                                    |
| data                           | required | object  |                                                                                                                    |
| data.dataList                  | required | array   |                                                                                                                    |
| data.dataList[].id             | required | integer | ID                                                                                                                 |
| data.dataList[].symbol         | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| data.dataList[].timePoint      | required | integer | Time point (milliseconds)                                                                                          |
|  |
| data.dataList[].fundingRate    | required | number  | Funding rate                                                                                                       |
|  |
| data.dataList[].markPrice      | required | number  | Mark price                                                                                                         |
|  |
| data.dataList[].positionQty    | required | integer | Position size                                                                                                      |
| data.dataList[].positionCost   | required | number  | Position value at settlement period                                                                                |
|  |
| data.dataList[].funding        | required | number  | Settled funding fees A positive number means that the user received the funding fee, and vice versa.               |
|  |
| data.dataList[].settleCurrency | required | string  | Settlement currency                                                                                                |
|  |
| data.dataList[].context        | required | string  | Context                                                                                                            |
| data.dataList[].marginMode     | required | string  | Margin mode: ISOLATED (isolated), CROSS (cross margin).                                                            |
| data.hasMore                   | required | boolean | Whether there are more pages                                                                                       |
|  |
