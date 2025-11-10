# POST /v4/batch-order

**Source:**
[https://doc.xt.com/docs/spot/Order/SubmitBatchOrder](https://doc.xt.com/docs/spot/Order/SubmitBatchOrder)

## Description

This endpoint performs operations on /v4/batch-order.

## Authentication

Required (Private Endpoint)

## Rate Limit

- 30/s/apikey

## HTTP Request

`POST /v4/batch-order`

## Request Parameters

| Name               | Type   | Required | Default | Description                                             | Ranges             |
| ------------------ | ------ | -------- | ------- | ------------------------------------------------------- | ------------------ |
| clientBatchId      | string | No       | N/A     | Client batch number. Pattern: `^[a-zA-Z0-9_]{4,32}$`    | —                  |
| items              | array  | Yes      | N/A     | Array                                                   | —                  |
| item.symbol        | string | Yes      | N/A     | Trading pair                                            | —                  |
| item.clientOrderId | string | No       | N/A     | Pattern: `^[a-zA-Z0-9_]{4,32}$`                         | —                  |
| item.side          | string | Yes      | N/A     | Order side                                              | BUY, SELL          |
| item.type          | string | Yes      | N/A     | Order type                                              | LIMIT, MARKET      |
| item.timeInForce   | string | Yes      | N/A     | Effective way                                           | GTC, FOK, IOC, GTX |
| item.bizType       | string | Yes      | N/A     | Business type                                           | SPOT, LEVER        |
| item.price         | number | No       | N/A     | Price. Required if it is LIMIT; blank if it is MARKET   | —                  |
| item.quantity      | number | No       | N/A     | Quantity. Required if it is LIMIT or MARKET by quantity | —                  |
| item.quoteQty      | number | No       | N/A     | Amount. Required if it is LIMIT or MARKET by amount     | —                  |

## Request Example

```bash
{  "clientBatchId": "51232",  "items": [    {      "symbol": "BTC_USDT",      "clientOrderId": "16559590087220001",      "side": "BUY",      "type": "LIMIT",      "timeInForce": "GTC",      "bizType": "SPOT",      "price": 40000,      "quantity": 2,      "quoteQty": 80000    }  ]}
```

## Response Example

```json
{
  "clientBatchId": "51232",
  "items": [
    {
      "symbol": "BTC_USDT",
      "clientOrderId": "16559590087220001",
      "side": "BUY",
      "type": "LIMIT",
      "timeInForce": "GTC",
      "bizType": "SPOT",
      "price": 40000,
      "quantity": 2,
      "quoteQty": 80000
    }
  ]
}
```
