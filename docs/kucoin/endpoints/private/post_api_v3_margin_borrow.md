# POST /api/v3/margin/borrow

**Source:** [/api/v3/margin/borrow](https://www.kucoin.com/docs/rest//api/v3/margin/borrow)

## Authentication

Required (Private Endpoint)

## Description

Borrow

This API endpoint is used to initiate an application for cross or isolated margin borrowing.

## Request Body

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| currency | required | string | currency |
| size | required | number | Borrow amount |
| timeInForce | required | string | timeInForce: IOC, FOK |
| symbol | optional | string | symbol, mandatory for isolated margin account |
| isIsolated | optional | boolean | true-isolated, false-cross; default is false |
| isHf | optional | boolean | true: high frequency borrowing, false: low frequency borrowing; default false |

## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | object |  |

