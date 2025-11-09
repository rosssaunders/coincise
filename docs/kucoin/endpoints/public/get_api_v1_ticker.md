# GET /api/v1/ticker

**Source:** [/api/v1/ticker](https://www.kucoin.com/docs/rest//api/v1/ticker)

## Authentication

Not Required (Public Endpoint)

## Description

Get Ticker

This endpoint returns "last traded price/size", "best bid/ask price/size" etc.
of a single symbol. These messages can also be obtained through Websocket.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

|

## Responses

### 200

| Parameter         | Required | Type    | Description                                                                                                                                   |
| ----------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| code              | required | string  | 200000 is for success, other is error                                                                                                         |
| data              | required | object  |                                                                                                                                               |
| data.sequence     | required | integer | Sequence number, used to judge whether the messages pushed by Websocket are continuous.                                                       |
| data.symbol       | required | string  | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220)                            |
| data.side         | required | string  | Filled side; the trade side indicates the taker order side. A taker order is the order that was matched with orders opened on the order book. |
| data.size         | required | integer | Filled quantity                                                                                                                               |
| data.tradeId      | required | string  | Transaction ID                                                                                                                                |
| data.price        | required | string  | Filled price                                                                                                                                  |
| data.bestBidPrice | required | string  | Best bid price                                                                                                                                |
| data.bestBidSize  | required | integer | Best bid size                                                                                                                                 |
| data.bestAskPrice | required | string  | Best ask price                                                                                                                                |
| data.bestAskSize  | required | integer | Best ask size                                                                                                                                 |
| data.ts           | required | integer | Filled time (nanoseconds)                                                                                                                     |
