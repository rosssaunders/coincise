# GET /v3/order_book

**Title:** Get orderbook

**Source:**
[Get orderbook](https://docs.digifinex.com/en-ww/spot/v3/rest.html#get-orderbook)

## Authentication

Not Required (Public Endpoint)

---

## Get orderbook

### HTTP Request

- GET `https://openapi.digifinex.com/v3/order_book`

### Request Parameters

| Field  | Request Type | Mandatory | Description                             |
| ------ | ------------ | --------- | --------------------------------------- |
| symbol | string       | true      | "btc_usdt"                              |
| limit  | int          | false     | Limit of depth, default 10, maximum 150 |

> Response:

```

{
    "bids": [
        [9559.45, 1.3766],
        [9559.04, 0.0127],
        ..
    ],
    "asks": [
        [9563.45, 0.6312],
        [9563.34, 0.0087],
        ..
    ],
    "date": 1589874953,
    "code": 0
}

```

### Response Content

| Field | Mandatory | Request Type | Description          |
| ----- | --------- | ------------ | -------------------- |
| bids  | true      | object       | Bids \[price, size\] |
| asks  | true      | object       | Asks \[price, size\] |
| date  | true      | int          | Timestamp            |
| code  | true      | int          | Status               |
