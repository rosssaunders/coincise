# GET /api/v1/trade/history

**Source:**
[/api/v1/trade/history](https://www.kucoin.com/docs/rest//api/v1/trade/history)

## Authentication

Not Required (Public Endpoint)

## Description

Get Trade History

Request the trade history of the specified symbol via this endpoint. The
returned quantity is the last 100 transaction records.

## Parameters

| Parameter | Required | Type   | Description                                                                                                        |
| --------- | -------- | ------ | ------------------------------------------------------------------------------------------------------------------ |
| symbol    | required | string | Symbol of the contract. Please refer to [Get Symbol endpoint: symbol](https://www.kucoin.com/docs-new/api-3470220) |

## Responses

### 200

| Parameter           | Required | Type    | Description                                                                                                                                   |
| ------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| code                | required | string  |                                                                                                                                               |
| data                | required | array   |                                                                                                                                               |
| data[].sequence     | required | integer | Sequence number                                                                                                                               |
| data[].contractId   | required | integer | Deprecated param                                                                                                                              |
| data[].tradeId      | required | string  | Transaction ID                                                                                                                                |
| data[].makerOrderId | required | string  | Maker order ID                                                                                                                                |
| data[].takerOrderId | required | string  | Taker order ID                                                                                                                                |
| data[].ts           | required | integer | Filled timestamp (nanosecond)                                                                                                                 |
| data[].size         | required | integer | Filled amount                                                                                                                                 |
| data[].price        | required | string  | Filled price                                                                                                                                  |
| data[].side         | required | string  | Filled side; the trade side indicates the taker order side. A taker order is the order that was matched with orders opened on the order book. |
