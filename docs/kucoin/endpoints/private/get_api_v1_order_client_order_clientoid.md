# GET /api/v1/order/client-order/{clientOid}

**Source:**
[/api/v1/order/client-order/{clientOid}](https://www.kucoin.com/docs/rest//api/v1/order/client-order/{clientOid})

## Authentication

Required (Private Endpoint)

## Description

Get Order By ClientOid - Old

Request via this interface to check the information of a single active order via
clientOid. The system will send a prompt that the order does not exist if the
order does not exist or has been settled.

## Parameters

| Parameter | Required | Type   | Description                                               |
| --------- | -------- | ------ | --------------------------------------------------------- |
| clientOid | required | string | Unique order ID created by users to identify their orders |

## Responses

### 200

| Parameter          | Required | Type    | Description |
| ------------------ | -------- | ------- | ----------- |
| code               | required | string  |             |
| data               | required | object  |             |
| data.id            | required | string  |             |
| data.symbol        | required | string  |             |
| data.opType        | required | string  |             |
| data.type          | required | string  |             |
| data.side          | required | string  |             |
| data.price         | required | string  |             |
| data.size          | required | string  |             |
| data.funds         | required | string  |             |
| data.dealFunds     | required | string  |             |
| data.dealSize      | required | string  |             |
| data.fee           | required | string  |             |
| data.feeCurrency   | required | string  |             |
| data.stp           | required | string  |             |
| data.stop          | required | string  |             |
| data.stopTriggered | required | boolean |             |
| data.stopPrice     | required | string  |             |
| data.timeInForce   | required | string  |             |
| data.postOnly      | required | boolean |             |
| data.hidden        | required | boolean |             |
| data.iceberg       | required | boolean |             |
| data.visibleSize   | required | string  |             |
| data.cancelAfter   | required | integer |             |
| data.channel       | required | string  |             |
| data.clientOid     | required | string  |             |
| data.remark        | required | string  |             |
| data.tags          | required | string  |             |
| data.isActive      | required | boolean |             |
| data.cancelExist   | required | boolean |             |
| data.createdAt     | required | integer |             |
| data.tradeType     | required | string  |             |
| data.tax           | optional | string  |             |
| data.taxRate       | optional | string  |             |
| data.taxCurrency   | optional | string  |             |
