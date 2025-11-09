# POST /api/v3/purchase

**Source:**
[/api/v3/purchase](https://www.kucoin.com/docs/rest//api/v3/purchase)

## Authentication

Required (Private Endpoint)

## Description

Purchase

Invest credit in the market and earn interest

## Request Body

| Parameter    | Required | Type   | Description            |
| ------------ | -------- | ------ | ---------------------- |
| currency     | required | string | Currency               |
| size         | required | string | Purchase amount        |
| interestRate | required | string | Purchase interest rate |

## Responses

### 200

| Parameter    | Required | Type   | Description       |
| ------------ | -------- | ------ | ----------------- |
| code         | required | string |                   |
| data         | required | object |                   |
| data.orderNo | required | string | Purchase order ID |
