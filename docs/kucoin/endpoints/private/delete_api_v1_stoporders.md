# DELETE /api/v1/stopOrders

**Source:**
[/api/v1/stopOrders](https://www.kucoin.com/docs/rest//api/v1/stopOrders)

## Authentication

Required (Private Endpoint)

## Description

Cancel All Stop orders

Cancel all untriggered stop orders. The response is a list of orderIDs of the
canceled stop orders. To cancel triggered stop orders, please use 'Cancel
Multiple Futures Limit orders'.

## Parameters

| Parameter | Required | Type   | Description                                                                                                                                                                                              |
| --------- | -------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | optional | string | Cancel all limit orders for a specific contract only, If not specified, all the limit orders will be deleted, Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter              | Required | Type   | Description                      |
| ---------------------- | -------- | ------ | -------------------------------- |
| code                   | required | string |                                  |
| data                   | required | object |                                  |
| data.cancelledOrderIds | required | array  | Unique ID of the cancelled order |
