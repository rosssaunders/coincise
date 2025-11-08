# POST private/get-instrument-fee-rate

**Source:**
[private/get-instrument-fee-rate](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-instrument-fee-rate)

## Authentication

Required (Private Endpoint)

## private/get-instrument-fee-rate

> Request Sample

```
{
  "id": 1,
  "nonce" : 1610905028000,
  "method": "private/get-instrument-fee-rate",
  "params": {
    "instrument_name": "BTC_USD"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "method": "private/get-instrument-fee-rate",
  "code": 0,
  "result": {
    "instrument_name": "BTC_USD",
    "effective_maker_rate_bps": "6.5",
    "effective_taker_rate_bps": "6.9"
  }
}
```

Get the instrument fee rate.

### Request Params

| Name            | Type   | Required | Description               |
| --------------- | ------ | -------- | ------------------------- |
| instrument_name | string | Y        | e.g. BTC_USD, BTCUSD-PERP |

### Response Attributes

| Name                     | Type   | Required | Description       |
| ------------------------ | ------ | -------- | ----------------- |
| instrument_name          | string | Y        | e.g. BTC_USD      |
| effective_maker_rate_bps | string | Y        | maker rate in bps |
| effective_taker_rate_bps | string | Y        | taker rate in bps |

### Applies To

REST

### REST Method

POST
