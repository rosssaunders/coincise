# GET /api/v1/margin/maxWithdrawMargin

**Source:**
[/api/v1/margin/maxWithdrawMargin](https://www.kucoin.com/docs/rest//api/v1/margin/maxWithdrawMargin)

## Authentication

Required (Private Endpoint)

## Description

Get Max Withdraw Margin

This interface can query the maximum amount of margin that the current position
supports withdrawal.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter | Required | Type   | Description                                                                                                                                                             |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| code      | required | string |                                                                                                                                                                         |
| data      | required | string | The size of the position that can be deposited. If it is USDT-margin, it represents the amount of USDT. If it is coin-margin, this value represents the number of coins |
|  |
