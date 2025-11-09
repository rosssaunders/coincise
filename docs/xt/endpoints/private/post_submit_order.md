# POST /v4/order

**Source:**
[https://doc.xt.com/docs/spot/Order/SubmitOrder](https://doc.xt.com/docs/spot/Order/SubmitOrder)

## Description

This endpoint performs operations on /v4/order.

## Authentication

Required (Private Endpoint)

## Rate Limit

20/s/apikey

## HTTP Request

`POST /v4/order`

## Request Parameters

| name          | type   | Required | default | description                                                                                                | ranges |
| ------------- | ------ | -------- | ------- | ---------------------------------------------------------------------------------------------------------- | ------ |
| symbol        | string | Yes      |         |                                                                                                            |        |
| clientOrderId | string | No       |         | Pattern: ^\[a-zA-Z0-9\_\]`{4,22}`                                                                          |        |
| $             |        |          |         |                                                                                                            |        |
| side          | string | Yes      |         | "BUY,SELL"                                                                                                 |        |
| type          | string | Yes      |         | "order type:LIMIT,MARKET"                                                                                  |        |
| timeInForce   | string | Yes      |         | effective way:GTC, FOK, IOC, GTX                                                                           |        |
| bizType       | string | Yes      |         | "SPOT, LEVER"                                                                                              |        |
| price         | number | No       |         | price. Required if it is the LIMIT price; blank if it is the MARKET price                                  |        |
| quantity      | number | No       |         | quantity. Required if it is the LIMIT price or the order is placed at the market price by quantity         |        |
| quoteQty      | number | No       |         | amount. Required if it is the LIMIT price or the order is the market price when placing an order by amount |        |
| nftId         | string | No       |         | nft id                                                                                                     |        |

## Response Example

```json
{
  "rc": 0,
  "mc": "string",
  "ma": [{}],
  "result": {
    "orderId": "6216559590087220004",
    "ip": "127.0.0.1"
  }
}
```
