# GET /api/v3/purchase/orders

**Source:**
[/api/v3/purchase/orders](https://www.kucoin.com/docs/rest//api/v3/purchase/orders)

## Authentication

Required (Private Endpoint)

## Description

Get Purchase Orders

This API endpoint provides a pagination query for the purchase orders.

## Parameters

| Parameter       | Required | Type    | Description                               |
| --------------- | -------- | ------- | ----------------------------------------- |
| status          | required | string  | DONE-completed; PENDING-settling          |
| currency        | optional | string  | Currency                                  |
| purchaseOrderNo | optional | string  | Purchase order ID                         |
| currentPage     | optional | integer | Current page; default is 1                |
| pageSize        | optional | integer | Page size; 1<=pageSize<=50; default is 50 |

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
| data.items[].purchaseSize    | required | string  | Total purchase size                      |
| data.items[].matchSize       | required | string  | Executed size                            |
| data.items[].interestRate    | required | string  | Target annualized interest rate          |
| data.items[].incomeSize      | required | string  | Redeemed amount                          |
| data.items[].applyTime       | required | integer | Time of purchase                         |
| data.items[].status          | required | string  | Status: DONE-completed; PENDING-settling |
