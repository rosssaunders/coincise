# POST public/get-expired-settlement-price

**Source:** [public/get-expired-settlement-price](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-expired-settlement-price)

## Authentication

Not Required (Public Endpoint)

## public/get-expired-settlement-price

> Request Sample

```
https://{URL}/public/get-expired-settlement-price?instrument_type=FUTURE&page=1
```

> Response Sample

```
{
  "id": -1,
  "method": "public/get-expired-settlement-price",
  "code": 0,
  "result": {
    "data": [{
      "i": "BTCUSD-210528m2",
      "x": 1622145600000,
      "v": "50776.73000",
      "t": 1622145540000
    },
      {
        "i": "BTCUSD-210528m3",
        "x": 1622160000000,
        "v": "38545.570000",
        "t": 1622159940000
      }]
  }
}
```

Fetches settlement price of expired instruments.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_type | string | Y | `FUTURE` |
| page | number | N | Default is 1 |

### Applies To

REST

### REST Method

GET

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| i | string | Instrument name |
| x | long | Expiry timestamp (millisecond) |
| v | string | Value |
| t | long | Timestamp |