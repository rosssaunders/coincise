# DELETE /api/v1/orders/multi-cancel

**Source:**
[/api/v1/orders/multi-cancel](https://www.kucoin.com/docs/rest//api/v1/orders/multi-cancel)

## Authentication

Required (Private Endpoint)

## Description

Batch Cancel Orders

Cancel a bach of orders by client defined orderId or system generated orderId

## Request Body

| Parameter                  | Required | Type   | Description                                                                                                        |
| -------------------------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| orderIdsList               | required | array  | the list of orderId                                                                                                |
| clientOidsList             | required | array  | the list of client orderId                                                                                         |
| clientOidsList[].symbol    | required | string | Symbol of the contract, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |
| clientOidsList[].clientOid | required | string |                                                                                                                    |

## Responses

### 200

| Parameter        | Required | Type   | Description |
| ---------------- | -------- | ------ | ----------- |
| code             | required | string |             |
| data             | required | array  |             |
| data[].orderId   | required | string |             |
| data[].clientOid | required | string |             |
| data[].code      | required | string |             |
| data[].msg       | required | string |             |
