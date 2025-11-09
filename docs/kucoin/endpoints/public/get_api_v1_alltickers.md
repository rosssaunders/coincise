# GET /api/v1/allTickers

**Source:**
[/api/v1/allTickers](https://www.kucoin.com/docs/rest//api/v1/allTickers)

## Authentication

Not Required (Public Endpoint)

## Description

Get All Tickers

This endpoint returns "last traded price/size", "best bid/ask price/size" etc.
of a single symbol. These messages can also be obtained through Websocket.

## Responses

### 200

| Parameter           | Required | Type    | Description                                                                                                                                   |
| ------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| code                | required | string  | 200000 is for success, other is error                                                                                                         |
| data                | required | array   |                                                                                                                                               |
| data[].sequence     | required | integer | Sequence number, used to judge whether the messages pushed by Websocket are continuous.                                                       |
| data[].symbol       | required | string  | Symbol                                                                                                                                        |
| data[].side         | required | string  | Trade direction                                                                                                                               |
| data[].size         | required | integer | Filled side; the trade side indicates the taker order side. A taker order is the order that was matched with orders opened on the order book. |
| data[].tradeId      | required | string  | Transaction ID                                                                                                                                |
| data[].price        | required | string  | Filled price                                                                                                                                  |
| data[].bestBidPrice | required | string  | Best bid price                                                                                                                                |
| data[].bestBidSize  | required | integer | Best bid size                                                                                                                                 |
| data[].bestAskPrice | required | string  | Best ask price                                                                                                                                |
| data[].bestAskSize  | required | integer | Best ask size                                                                                                                                 |
| data[].ts           | required | integer | Filled time (nanoseconds)                                                                                                                     |
