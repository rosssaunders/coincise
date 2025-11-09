# GET /v3/trades

**Title:** Get recent trades

**Source:**
[Get recent trades](https://docs.digifinex.com/en-ww/spot/v3/rest.html#get-recent-trades)

## Authentication

Not Required (Public Endpoint)

---

## Get recent trades

### HTTP Request

- GET `https://openapi.digifinex.com/v3/trades`

### Request Parameters

| Field  | Request Type | Mandatory | Description                                        |
| ------ | ------------ | --------- | -------------------------------------------------- |
| symbol | string       | true      | "btc_usdt"                                         |
| limit  | int          | false     | Limit of trades returned, default 100, maximum 500 |

> Response:

```

{
    "data": [{
        "date": 1589875415,
        "id": 2989995478,
        "amount": 0.001,
        "type": "buy",
        "price": 9661.05
    }, {
        "date": 1589875415,
        "id": 2989995473,
        "amount": 0.0005,
        "type": "buy",
        "price": 9659.99
    },
    ...
    ],
    "date": 1589875415,
    "code": 0
}

```

### Response Content

| Field  | Mandatory | Request Type | Description       |
| ------ | --------- | ------------ | ----------------- |
| data   | true      | object       | Customer's trades |
| date   | true      | int          | Timestamp         |
| id     | true      | int          | Trading ID        |
| amount | true      | float        | Volume            |
| type   | true      | str          | Trading Type      |
| price  | true      | float        | Trading Price     |
| code   | true      | int          | Status            |
