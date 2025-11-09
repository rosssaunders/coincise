# POST /api/v3/margin/repay

**Source:** [/api/v3/margin/repay](https://www.kucoin.com/docs/rest//api/v3/margin/repay)

## Authentication

Required (Private Endpoint)

## Description

Repay

This API endpoint is used to initiate an application for cross or isolated margin repayment.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | required | string | currency |
| size | required | number | Borrow amount |
| symbol | optional | string | symbol, mandatory for isolated margin account |
| isIsolated | optional | boolean | true-isolated, false-cross; default is false |
| isHf | optional | boolean | true: high frequency borrowing, false: low frequency borrowing; default false |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |
| data.timestamp | required | integer |  |
| data.orderNo | required | string | Repay order ID |
| data.actualSize | required | string | Actual repay amount |

