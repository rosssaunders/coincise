# POST /v3/%7Bmarket%7D%E2%80%8B/order%E2%80%8B/batch_new

**Title:** Create multiple order

**Source:**
[Create multiple order](https://docs.digifinex.com/en-ww/spot/v3/rest.html#create-multiple-order)

## Authentication

Required (Private Endpoint)

---

## Create multiple order

### HTTP Request

- POST `https://openapi.digifinex.com/v3/{market}​/order​/batch_new`

### Request Parameters

market：spot, margin up to 10 orders at a time, either all succeed or all fail

| Field  | Request Type | Mandatory | Description                                                                                                                                            |
| ------ | ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| market | str          | true      | "spot","margin"                                                                                                                                        |
| symbol | str          | true      | Symbol Name                                                                                                                                            |
| list   | str          | true      | order list, must be json-format, eg:\[{"type":"buy","amount":0.1,"price":6000,"post_only":1},{"type":"sell","amount":0.1,"price":6100,"post_only":0}\] |

> Response:

```

{
  "code": 0,
  "order_ids": [
    "198361cecdc65f9c8c9bb2fa68faec40",
    "3fb0d98e51c18954f10d439a9cf57de0"
  ]
}

```

### Response Content

| Field     | Mandatory | Request Type | Description  |
| --------- | --------- | ------------ | ------------ |
| order_ids | true      | object       | Order ID列表 |
| code      | true      | int          | Status       |
