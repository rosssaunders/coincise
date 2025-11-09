# POST /openApi/swap/v2/trade/order

**Source:** [/openApi/swap/v2/trade/order](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Description

Place a new order for USDT-M perpetual futures.

### Request Parameters

| Parameter   | Type    | Required | Description                                      |
| ----------- | ------- | -------- | ------------------------------------------------ |
| symbol      | string  | Yes      | Trading pair (e.g., BTC-USDT)                   |
| side        | string  | Yes      | Order side: BUY or SELL                         |
| positionSide| string  | No       | Position side: LONG or SHORT                    |
| type        | string  | Yes      | Order type: MARKET, LIMIT, etc.                 |
| quantity    | decimal | Yes      | Order quantity                                   |
| price       | decimal | No       | Order price (required for LIMIT orders)         |

### Response Parameters

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| code      | int    | Error code, 0 means success    |
| msg       | string | Error message                  |
| data      | object | Order information              |

> **Source:** [https://bingx-api.github.io/docs/](https://bingx-api.github.io/docs/)
