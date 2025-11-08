# POST /api/v1/orders/multi

**Source:** [/api/v1/orders/multi](https://www.kucoin.com/docs/rest//api/v1/orders/multi)

## Authentication

Required (Private Endpoint)

## Description

Batch Add Orders

Place multiple order to the futures trading system, you can place two major types of orders: limit and market. Orders can only be placed if your account has sufficient funds. Once an order is placed, your funds will be put on hold for the duration of the order. The amount of funds on hold depends on the order type and parameters specified. You can place up to 20 orders at one time, including limit orders, market orders, and stop orders  Please be noted that the system would hold the fees from the orders entered the orderbook in advance.

## Request Body


## Responses

### 200

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| code | required | string |  |
| data | required | array |  |

