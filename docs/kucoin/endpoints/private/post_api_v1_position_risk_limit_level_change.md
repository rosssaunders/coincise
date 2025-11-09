# POST /api/v1/position/risk-limit-level/change

**Source:**
[/api/v1/position/risk-limit-level/change](https://www.kucoin.com/docs/rest//api/v1/position/risk-limit-level/change)

## Authentication

Required (Private Endpoint)

## Description

Modify Isolated Margin Risk Limit

This interface can be used to obtain information about risk limit level of a
specific contract (only valid for Isolated Margin).

## Request Body

| Parameter | Required | Type    | Description                                                                                                        |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| level     | required | integer | Level                                                                                                              |

## Responses

### 200

| Parameter | Required | Type    | Description                                                                                                                                                        |
| --------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| code      | required | string  |                                                                                                                                                                    |
| data      | required | boolean | Adjusting the level will result in the cancellation of any open orders. The response will indicate only whether the adjustment request was successfully submitted. |
|  |
