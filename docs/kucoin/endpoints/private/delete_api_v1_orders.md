# DELETE /api/v1/orders

**Source:** [/api/v1/orders](https://www.kucoin.com/docs/rest//api/v1/orders)

## Authentication

Required (Private Endpoint)

## Description

Cancel All Orders - V1

Cancel all open orders (excluding stop orders). The response is a list of
orderIDs of the canceled orders.

## Parameters

| Parameter | Required | Type   | Description                                                                                                                                                                                                       |
| --------- | -------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| symbol    | optional | string | To cancel all limit orders for a specific contract only, unless otherwise specified, all limit orders will be deleted. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter              | Required | Type   | Description                     |
| ---------------------- | -------- | ------ | ------------------------------- |
| code                   | required | string |                                 |
| data                   | required | object |                                 |
| data.cancelledOrderIds | required | array  | Unique ID of the canceled order |
