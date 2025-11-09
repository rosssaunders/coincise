# POST /v3/%7Bmarket%7D/order/cancel

**Title:** Cancel order

**Source:**
[Cancel order](https://docs.digifinex.com/en-ww/spot/v3/rest.html#cancel-order)

## Authentication

Required (Private Endpoint)

---

## Cancel order

### HTTP Request

- POST `https://openapi.digifinex.com/v3/{market}/order/cancel`

### Request Parameters

market：spot, margin

| Field    | Request Type | Mandatory | Description                        |
| -------- | ------------ | --------- | ---------------------------------- |
| market   | str          | true      | "spot","margin"                    |
| order_id | str          | true      | Order ID list, separated by commas |

> Response:

```

{
  "code": 0,
  "date": 1744190302,
  "success": [
    "198361cecdc65f9c8c9bb2fa68faec40",
    "3fb0d98e51c18954f10d439a9cf57de0"
  ],
  "error": [
    "78a7104e3c65cc0c5a212a53e76d0205"
  ]
}

```

### Response Content

| Field   | Mandatory | Request Type | Description           |
| ------- | --------- | ------------ | --------------------- |
| success | true      | object       | Cancel Success Orders |
| error   | true      | object       | Cancel Failed Orders  |
| code    | true      | int          | Status                |
| date    | true      | int          | date                  |
