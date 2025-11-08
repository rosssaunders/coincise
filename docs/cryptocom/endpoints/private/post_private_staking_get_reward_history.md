# POST private/staking/get-reward-history

**Source:** [private/staking/get-reward-history](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-get-reward-history)

## Authentication

Required (Private Endpoint)

## private/staking/get-reward-history

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/get-reward-history",
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
  "method": "private/staking/get-reward-history",
  "result": {
    "data": [
      {
        "staking_inst_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "reward_inst_name": "SOL.staked",
        "reward_quantity": "123.4567",
        "staked_balance": "1234567",
        "event_timestamp_ms": "1667795832609"
      }
    ]
  }
}
```

Get stake/unstake request history

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | N | Staking instrument name, e.g. SOL.staked |
| start\_time | number or string | N | Start time in Unix time format (`inclusive`)  
Default: `end_time - 30 days`  
Min: `end_time - 180 days` |
| end\_time | number or string | N | End time in Unix time format (`inclusive`)  
Default: current system timestamp |
| limit | number or string | N | The maximum number of requests returned  
Default: 20  
Max: 500 |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name | Type | Description |
| --- | --- | --- |
| staking\_inst\_name | string | Staking instrument name, e.g. SOL.staked |
| underlying\_inst\_name | string | Underlying instrument name, e.g. SOL |
| reward\_inst\_name | string | Reward instrument name, e.g. SOL.staked |
| reward\_quantity | string | Reward quantity |
| staked\_balance | string | Staked balance |
| event\_timestamp\_ms | string | Event timestamp in milliseconds in Unix time format |