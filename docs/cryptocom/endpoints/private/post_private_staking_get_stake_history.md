# POST private/staking/get-stake-history

**Source:**
[private/staking/get-stake-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-get-stake-history)

## Authentication

Required (Private Endpoint)

## private/staking/get-stake-history

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/get-stake-history",
  "params": {
    "instrument_name": "SOL.staked",
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
  "method": "private/staking/get-stake-history",
  "result": {
    "data": [
      {
        "instrument_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "cycle_id": "1",
        "staking_id": "1",
        "status": "COMPLETED",
        "account": "12345678-9999-1234-9999-123456789999",
        "quantity": "1",
        "side": "STAKE",
        "create_timestamp_ms": "1668658093600"
      },
      {
        "instrument_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "cycle_id": "2",
        "staking_id": "2",
        "status": "REJECTED",
        "account": "12345678-9999-1234-9999-123456789999",
        "quantity": "0.5",
        "side": "UNSTAKE",
        "create_timestamp_ms": "1668658093600"
      }
    ]
  }
}
```

Get stake/unstake request history

### Request Params

| Name            | Type             | Required | Description                                  |
| --------------- | ---------------- | -------- | -------------------------------------------- |
| instrument_name | string           | N        | Staking instrument name, e.g. SOL.staked     |
| start_time      | number or string | N        | Start time in Unix time format (`inclusive`) |

Default: `end_time - 30 days`  
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

| Name                 | Type   | Description                              |
| -------------------- | ------ | ---------------------------------------- |
| instrument_name      | string | Staking instrument name, e.g. SOL.staked |
| underlying_inst_name | string | Underlying instrument name, e.g. SOL     |
| cycle_id             | string | Cycle id                                 |
| staking_id           | string | Request id                               |
| status               | string | Request status:                          |

\- `COMPLETED`  
\- `REJECTED` | | account | string | Account id | | quantity | string |
Stake/unstake quantity

For yield-bearing instruments (learn more from
[FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)),
this field displays the quantity in terms of the original staked token.

Example:  
After unstaking a TSTON.staked position, this field shows how much TON was
received as a result of the completed request. | | side | string | Stake or
Unstake | | create_timestamp_ms | string | Request creation timestamp in
milliseconds in Unix time format |
