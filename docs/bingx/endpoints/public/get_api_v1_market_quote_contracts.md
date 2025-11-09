# GET /openApi/swap/v2/quote/contracts

**Source:** [/openApi/swap/v2/quote/contracts](https://bingx-api.github.io/docs/)

## Authentication

Not Required (Public Endpoint)

## Description

Query contract information for USDT-M perpetual futures.

### Request Parameters

| Parameter | Type     | Required | Description                |
| --------- | -------- | -------- | -------------------------- |
| symbol    | string   | No       | Trading pair (e.g., BTC-USDT) |

### Response Parameters

| Parameter | Type   | Description                    |
| --------- | ------ | ------------------------------ |
| code      | int    | Error code, 0 means success    |
| msg       | string | Error message                  |
| data      | array  | Contract information array     |

> **Source:** [https://bingx-api.github.io/docs/](https://bingx-api.github.io/docs/)
