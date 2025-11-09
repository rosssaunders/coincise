# POST /api/v1/position/margin/auto-deposit-status

**Source:**
[/api/v1/position/margin/auto-deposit-status](https://www.kucoin.com/docs/rest//api/v1/position/margin/auto-deposit-status)

## Authentication

Required (Private Endpoint)

## Description

Modify Isolated Margin Auto-Deposit Status

This endpoint is only applicable to isolated margin and is no longer
recommended. It is recommended to use cross margin instead.

## Request Body

| Parameter | Required | Type    | Description            |
| --------- | -------- | ------- | ---------------------- |
| symbol    | required | string  | Symbol of the contract |
|  |
| status    | required | boolean | Status                 |

## Responses

### 200

| Parameter | Required | Type    | Description |
| --------- | -------- | ------- | ----------- |
| code      | required | string  |             |
| data      | required | boolean |             |
