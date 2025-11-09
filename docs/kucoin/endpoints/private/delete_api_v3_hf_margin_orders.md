# DELETE /api/v3/hf/margin/orders

**Source:**
[/api/v3/hf/margin/orders](https://www.kucoin.com/docs/rest//api/v3/hf/margin/orders)

## Authentication

Required (Private Endpoint)

## Description

Cancel All Orders By Symbol

This interface can cancel all open Margin orders by symbol. This endpoint only
sends cancellation requests. The results of the requests must be obtained by
checking the order status or subscribing to Websocket.

## Parameters

| Parameter | Required | Type   | Description                                                                                        |
| --------- | -------- | ------ | -------------------------------------------------------------------------------------------------- |
| symbol    | required | string | symbol                                                                                             |
| tradeType | required | string | Transaction type: MARGIN_TRADE - cross margin trade, MARGIN_ISOLATED_TRADE - isolated margin trade |

## Responses

### 200

| Parameter | Required | Type   | Description |
| --------- | -------- | ------ | ----------- |
| code      | required | string |             |
| data      | required | string |             |
