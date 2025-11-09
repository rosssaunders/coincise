# POST /api/v2/position/batchChangeMarginMode

**Source:**
[/api/v2/position/batchChangeMarginMode](https://www.kucoin.com/docs/rest//api/v2/position/batchChangeMarginMode)

## Authentication

Required (Private Endpoint)

## Description

Batch Switch Margin Mode

Batch modify the margin mode of the symbols.

## Request Body

| Parameter  | Required | Type   | Description                                                                                                             |
| ---------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| marginMode | required | string | Modified margin model: ISOLATED (isolated), CROSS (cross margin).                                                       |
| symbols    | required | array  | Symbol list of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter            | Required | Type   | Description                                                                   |
| -------------------- | -------- | ------ | ----------------------------------------------------------------------------- |
| code                 | required | string |                                                                               |
| data                 | required | object |                                                                               |
| data.marginMode      | required | object | Target Margin Model, Symbols that failed to be modified will also be included |
| data.errors          | required | array  | Symbol which modification failed                                              |
| data.errors[].code   | optional | string | Error code                                                                    |
| data.errors[].msg    | optional | string | Error message                                                                 |
| data.errors[].symbol | optional | string | Symbol                                                                        |
