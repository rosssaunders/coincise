# GET /api/v1/hf/orders/active/symbols

**Source:**
[/api/v1/hf/orders/active/symbols](https://www.kucoin.com/docs/rest//api/v1/hf/orders/active/symbols)

## Authentication

Required (Private Endpoint)

## Description

Get Symbols With Open Order

This interface can query all spot symbol that has active orders

## Responses

### 200

| Parameter    | Required | Type   | Description                       |
| ------------ | -------- | ------ | --------------------------------- |
| code         | required | string |                                   |
| data         | required | object |                                   |
| data.symbols | required | array  | The symbol that has active orders |
