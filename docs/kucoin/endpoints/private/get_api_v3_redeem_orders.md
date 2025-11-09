# GET /api/v3/redeem/orders

**Source:**
[/api/v3/redeem/orders](https://www.kucoin.com/docs/rest//api/v3/redeem/orders)

## Authentication

Required (Private Endpoint)

## Description

Get Redeem Orders

This API endpoint provides pagination query for the redeem orders.

## Parameters

| Parameter     | Required | Type    | Description                               |
| ------------- | -------- | ------- | ----------------------------------------- |
| status        | required | string  | DONE-completed; PENDING-settling          |
| currency      | optional | string  | currency                                  |
| redeemOrderNo | optional | string  | Redeem order ID                           |
| currentPage   | optional | integer | Current page; default is 1                |
| pageSize      | optional | integer | Page size; 1<=pageSize<=50; default is 50 |

## Responses

### 200

| Parameter                    | Required | Type    | Description                              |
| ---------------------------- | -------- | ------- | ---------------------------------------- |
| code                         | required | string  |                                          |
| data                         | required | object  |                                          |
| data.currentPage             | required | integer | Current Page                             |
| data.pageSize                | required | integer | Page Size                                |
| data.totalNum                | required | integer | Total Number                             |
| data.totalPage               | required | integer | Total Pages                              |
| data.items                   | required | array   |                                          |
| data.items[].currency        | required | string  | Currency                                 |
| data.items[].purchaseOrderNo | required | string  | Purchase order ID                        |
| data.items[].redeemOrderNo   | required | string  | Redeem order ID                          |
| data.items[].redeemSize      | required | string  | Redemption size                          |
| data.items[].receiptSize     | required | string  | Redeemed size                            |
| data.items[].applyTime       | required | string  | Time of redeem                           |
| data.items[].status          | required | string  | Status: DONE-completed; PENDING-settling |
