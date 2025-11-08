# POST private/staking/convert

**Source:**
[private/staking/convert](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-convert)

## Authentication

Required (Private Endpoint)

## private/staking/convert

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/convert",
  "params": {
    "from_instrument_name": "ETH.staked",
    "to_instrument_name": "CDCETH",
    "expected_rate": "1.0203",
    "from_quantity": "3.14159265",
    "slippage_tolerance_bps": "3"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "code": 0,
  "method": "private/staking/convert",
  "result": {
    "from_instrument_name": "ETH.staked",
    "to_instrument_name": "CDCETH",
    "expected_rate": "1.0203",
    "from_quantity": "3.14159265",
    "slippage_tolerance_bps": "3",
    "convert_id": 1,
    "reason": "NO_ERROR"
  }
}
```

Create a request to convert between staked token with liquid staking token.

### Request Params

| Name                 | Type   | Required | Description                      |
| -------------------- | ------ | -------- | -------------------------------- |
| from_instrument_name | string | Y        | Instrument name to convert from: |

\- ETH.staked  
\- CDCETH | | to_instrument_name | string | Y | Instrument name to convert to:  
\- CDCETH if `from_instrument_name` is ETH.staked  
\- ETH.staked if `from_instrument_name` is CDCETH | | expected_rate | string | Y
| Expected conversion rate, received from `public/staking/get-conversion-rate` |
| from_quantity | string | Y | Quantity to be converted in from_instrument_name
| | slippage_tolerance_bps | string | Y | Maximum slippage allowed in basis
point |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name                   | Type   | Description                                       |
| ---------------------- | ------ | ------------------------------------------------- |
| from_instrument_name   | string | Instrument name to convert from , e.g. ETH.staked |
| to_instrument_name     | string | Instrument name to convert to, e.g. CDCETH        |
| expected_rate          | string | Expected conversion rate                          |
| from_quantity          | string | Quantity to be converted in from_instrument_name  |
| slippage_tolerance_bps | string | Maximum slippage allowed in basis point           |
| convert_id             | string | Convert request id                                |
| reason                 | string | Reason for the status, e.g. "NO_ERROR"            |
