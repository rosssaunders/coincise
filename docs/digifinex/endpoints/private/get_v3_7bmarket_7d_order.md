# GET /v3/%7Bmarket%7D/order

**Title:** Get order status

**Source:**
[Get order status](https://docs.digifinex.com/en-ww/spot/v3/rest.html#get-order-status)

## Authentication

Required (Private Endpoint)

---

## Get order status

### HTTP Request

- GET `https://openapi.digifinex.com/v3/{market}/order`

### Request Parameters

market：spot, margin

| Field    | Request Type | Mandatory | Description                                     |
| -------- | ------------ | --------- | ----------------------------------------------- |
| market   | str          | true      | "spot","margin"                                 |
| order_id | str          | true      | Order ID list, separated by commas, limit of 20 |

> Response:

```

{
  "code": 0,
  "data": [
    {
      "symbol": "BTC_USDT",
      "order_id": "dd3164b333a4afa9d5730bb87f6db8b3",
      "created_date": 1562303547,
      "finished_date": 0,
      "price": 0.1,
      "amount": 1,
      "cash_amount": 1,
      "executed_amount": 0,
      "avg_price": 0,
      "status": 1,
      "type": "buy",
      "kind": "margin"
    }
  ]
}

```

### Response Content

| Field           | Mandatory | Request Type | Description                                                                                                                                                    |
| --------------- | --------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data            | true      | object       | Order Status List                                                                                                                                              |
| symbol          | true      | string       | Symbol Name                                                                                                                                                    |
| order_id        | true      | string       | Order ID                                                                                                                                                       |
| created_date    | true      | int          | Created Time                                                                                                                                                   |
| finished_date   | true      | int          | Finished Time                                                                                                                                                  |
| price           | true      | float        | Price                                                                                                                                                          |
| amount          | true      | float        | Volume                                                                                                                                                         |
| cash_amount     | true      | float        | Cash amount of orders, 0 for none order                                                                                                                        |
| executed_amount | true      | float        | Amount been executed                                                                                                                                           |
| avg_price       | true      | float        | Average price of amount been executed                                                                                                                          |
| status          | true      | int          | Order status, 0 for none executed, 1 for partially executed, 2 for fully executed, 3 for cancelled with none executed, 4 for cancelled with partially executed |
| type            | true      | string       | buy for limit buy order, sell for limit sell order, buy_market for market buy order, sell_market for market sell order                                         |
| kind            | true      | string       | spot, margin                                                                                                                                                   |
| code            | true      | int          | Status                                                                                                                                                         |
