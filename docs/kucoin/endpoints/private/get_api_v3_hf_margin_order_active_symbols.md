# GET /api/v3/hf/margin/order/active/symbols

**Source:**
[/api/v3/hf/margin/order/active/symbols](https://www.kucoin.com/docs/rest//api/v3/hf/margin/order/active/symbols)

## Authentication

Required (Private Endpoint)

## Description

Get Symbols With Open Order

This interface can query all Margin symbols that have active orders.

## Parameters

| Parameter | Required | Type   | Description                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------ |
| tradeType | required | string | Cross Margin: MARGIN_TRADE, Isolated Margin: MARGIN_ISOLATED_TRADE |
|  |

## Responses

### 200

| Parameter       | Required | Type    | Description                       |
| --------------- | -------- | ------- | --------------------------------- |
| code            | required | string  |                                   |
| data            | required | object  |                                   |
| data.symbolSize | required | integer | Symbol Size                       |
| data.symbols    | required | array   | The symbol that has active orders |
