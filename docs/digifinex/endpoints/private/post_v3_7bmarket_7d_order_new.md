# POST /v3/%7Bmarket%7D/order/new

**Title:** Create new order

**Source:**
[Create new order](https://docs.digifinex.com/en-ww/spot/v3/rest.html#create-new-order)

## Authentication

Required (Private Endpoint)

---

## Create new order

### HTTP Request

- POST `https://openapi.digifinex.com/v3/{market}/order/new`

### Request Parameters

market：spot, margin

| Field     | Request Type | Mandatory | Description                                                                                                                                   |
| --------- | ------------ | --------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| market    | str          | true      | "spot","margin"                                                                                                                               |
| symbol    | str          | true      | Symbol Name                                                                                                                                   |
| type      | str          | true      | buy for limit buy order, sell for limit sell order, buy_market for market buy order, sell_market for market sell order                        |
| amount    | float        | true      | Order amount, value in quote currency for market orders and base currency in other order types                                                |
| price     | float        | false     | Order price required for limit order                                                                                                          |
| post_only | int          | false     | Default 0, enabled by 1, if enabled the order will be cancelled if it can be executed immediately, making sure there will be no market taking |

> Response:

```

{
  "code": 0,
  "order_id": "198361cecdc65f9c8c9bb2fa68faec40"
}

```

### Response Content

| Field    | Mandatory | Request Type | Description |
| -------- | --------- | ------------ | ----------- |
| order_id | true      | str          | Order ID    |
| code     | true      | int          | Status      |
