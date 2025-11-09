# GET /api/v3/mark-price/all-symbols

**Source:**
[/api/v3/mark-price/all-symbols](https://www.kucoin.com/docs/rest//api/v3/mark-price/all-symbols)

## Authentication

Not Required (Public Endpoint)

## Description

Get Mark Price List

This endpoint returns the current Mark price for all margin trading pairs.

## Responses

### 200

| Parameter        | Required | Type    | Description              |
| ---------------- | -------- | ------- | ------------------------ |
| code             | required | string  |                          |
| data             | required | array   |                          |
| data[].symbol    | required | string  | symbol                   |
| data[].timePoint | required | integer | Timestamp (milliseconds) |
| data[].value     | required | number  | Mark price               |
