# POST private/staking/get-convert-history

**Source:**
[private/staking/get-convert-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-get-convert-history)

## Authentication

Required (Private Endpoint)

## private/staking/get-convert-history

> Request Sample with limit and time range provided

```
{
  "id": 1,
  "method": "private/staking/get-convert-history",
  "params": {
    "start_time": 1691455454495,
    "end_time": 1691545277000,
    "limit": "10"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "code": 0,
  "method": "private/staking/get-convert-history",
  "result": {
    "data": [
      {
        "from_instrument_name": "ETH.staked",
        "to_instrument_name": "CDCETH",
        "expected_rate": "1.0203",
        "from_quantity": "3.14159265",
        "slippage_tolerance_bps": "3",
        "actual_rate": "1.0203",
        "to_quantity": "3.14159265",
        "convert_id": 1,
        "status": "COMPLETED",
        "create_timestamp_ms": "1688140984005"
      }
    ]
  }
}
```

Get convert request history

### Request Params

| Name       | Type             | Required | Description                                  |
| ---------- | ---------------- | -------- | -------------------------------------------- |
| start_time | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 day`  
Min: `end_time - 180 days` | | end_time | number or string | N | End time in
Unix time format (`inclusive`)  
Default: current system timestamp | | limit | number or string | N | The maximum
number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                 | Type   | Description                      |
| -------------------- | ------ | -------------------------------- |
| from_instrument_name | string | Instrument name to convert from: |

\- ETH.staked  
\- CDCETH | | to_instrument_name | string | Instrument name to convert to:  
\- CDCETH  
\- ETH.staked | | expected_rate | string | Expected conversion rate | |
from_quantity | string | Quantity to be converted in from_instrument_name | |
slippage_tolerance_bps | string | Maximum slippage allowed in basis point | |
actual_rate | string | Actual conversion rate | | to_quantity | string |
Quantity converted to to_instrument_name | | convert_id | string | Convert
request id | | status | string | Request status:  
\- `COMPLETED`  
\- Reason of `REJECTED` | | create_timestamp_ms | string | Request creation
timestamp in milliseconds in Unix time format |
