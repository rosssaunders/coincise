# POST private/get-fee-rate

**Source:**
[private/get-fee-rate](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-get-fee-rate)

## Authentication

Required (Private Endpoint)

## private/get-fee-rate

> Request Sample

```
 {
  "id": 1,
  "method": "/private/get-fee-rate",
  "params": {},
  "nonce": 1721989202781
}
```

> Response Sample

```
{
  "id": 1,
  "method": "/private/get-fee-rate",
  "code": 0,
  "result": {
    "spot_tier": "3",
    "deriv_tier": "3",
    "effective_spot_maker_rate_bps": "6.5",
    "effective_spot_taker_rate_bps": "6.9",
    "effective_deriv_maker_rate_bps": "1.1",
    "effective_deriv_taker_rate_bps": "3"
  }
}
```

Get fee rates for user’s account.

### Request Params

N/A

### Response Attributes

| Name                           | Type   | Required | Description                     |
| ------------------------------ | ------ | -------- | ------------------------------- |
| spot_tier                      | string | Y        | 30day spot trading volume tier  |
| deriv_tier                     | string | Y        | 30day deriv trading volume tier |
| effective_spot_maker_rate_bps  | string | Y        | 30day spot maker rate in bps    |
| effective_spot_taker_rate_bps  | string | Y        | 30day spot taker rate in bps    |
| effective_deriv_maker_rate_bps | string | Y        | 30day deriv maker rate in bps   |
| effective_deriv_taker_rate_bps | string | Y        | 30day deriv taker rate in bps   |

### Applies To

REST

### REST Method

POST
