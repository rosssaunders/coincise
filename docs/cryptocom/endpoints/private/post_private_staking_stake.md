# POST private/staking/stake

**Source:**
[private/staking/stake](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-stake)

## Authentication

Required (Private Endpoint)

## private/staking/stake

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/stake",
  "params": {
    "instrument_name": "SOL.staked",
    "quantity": "1"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "code": 0,
  "method": "private/staking/stake",
  "result": {
    "staking_id": "1",
    "instrument_name": "SOL.staked",
    "status": "NEW",
    "quantity": "1",
    "underlying_inst_name": "SOL",
    "pre_stake_charge_rate_in_bps": "50",
    "pre_stake_charge": "0.5",
    "reason": "NO_ERROR"
  }
}
```

Create a request to earn token rewards by staking on-chain in the Exchange.

### Request Params

| Name            | Type   | Required | Description                                                                                                                  |
| --------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------- |
| instrument_name | string | Y        | Staking instrument name, e.g. SOL.staked, refer to `instrument_name` from `private/staking/get-staking-instruments` response |
| quantity        | string | Y        | Stake quantity                                                                                                               |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name            | Type   | Description                              |
| --------------- | ------ | ---------------------------------------- |
| staking_id      | string | Request id                               |
| instrument_name | string | Staking instrument name, e.g. SOL.staked |
| status          | string | Request status:                          |

\- `NEW`  
\- `PENDING`  
\- `STAKED`  
\- `COMPLETED`  
\- `REJECTED` | | quantity | string | Stake quantity | | underlying_inst_name |
string | Underlying instrument name of staking, e.g. SOL | |
pre_stake_charge_rate_in_bps | string | Pre stake charge rate in basis point | |
pre_stake_charge | string | Pre stake charge value | | reason | string | Reason
for the status, e.g. "NO_ERROR" |
