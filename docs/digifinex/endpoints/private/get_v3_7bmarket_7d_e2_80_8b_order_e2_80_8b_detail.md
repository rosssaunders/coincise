# GET /v3/%7Bmarket%7D%E2%80%8B/order%E2%80%8B/detail

**Title:** Get order trades details

**Source:** [Get order trades details](https://docs.digifinex.com/en-ww/spot/v3/rest.html#get-order-trades-details)

## Authentication

Required (Private Endpoint)

---

## Get order trades details

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/{market}​/order​/detail`

### Request Parameters

market：spot, margin

| Field | Request Type | Mandatory | Description |
| --- | --- | --- | --- |
| market | str | true | "spot","margin" |
| order\_id | str | true | Order ID |

> Response:

```

{
  "code": 0,
  "data": {
    "symbol": "BTC_USDT",
    "order_id": "dd3164b333a4afa9d5730bb87f6db8b3",
    "created_date": 1562303547,
    "finished_date": 1574665459,
    "price": 6000,
    "amount": 0.58,
    "cash_amount": 0,
    "executed_amount": 0.58,
    "avg_price": 6000,
    "status": 2,
    "type": "buy",
    "kind": "margin",
    "detail": {
      "tid": "63194988",
      "date": 1574665459,
      "executed_amount": 0.58,
      "executed_price": 6000
    }
  }
}

```

### Response Content

| Field | Mandatory | Request Type | Description |
| --- | --- | --- | --- |
| data | true | object | Order Status List |
| symbol | true | string | Symbol Name |
| order\_id | true | string | Order ID |
| created\_date | true | int | Created Time |
| finished\_date | true | int | Finished Time |
| price | true | float | Price |
| amount | true | float | Volume |
| cash\_amount | true | float | Cash amount of orders, 0 for none order |
| executed\_amount | true | float | Amount been executed |
| avg\_price | true | float | Average price of amount been executed |
| status | true | int | Order status, 0 for none executed, 1 for partially executed, 2 for fully executed, 3 for cancelled with none executed, 4 for cancelled with partially executed |
| type | true | string | buy for limit buy order, sell for limit sell order, buy\_market for market buy order, sell\_market for market sell order |
| kind | true | string | spot, margin |
| detail | true | object | Order Detail |
| tid | true | string | Trading ID |
| date | true | int | Trading Time |
| executed\_amount | true | float | Trading Volume |
| executed\_price | true | float | Trading Price格 |
| code | true | int | Status |