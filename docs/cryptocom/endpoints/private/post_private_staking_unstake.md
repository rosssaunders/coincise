# POST private/staking/unstake

**Source:** [private/staking/unstake](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-unstake)

## Authentication

Required (Private Endpoint)

## private/staking/unstake

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/unstake",
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
  "method": "private/staking/unstake",
  "result": {
    "staking_id": "1",
    "instrument_name": "SOL.staked",
    "status": "NEW",
    "quantity": "1",
    "underlying_inst_name": "SOL",
    "reason": "NO_ERROR"
  }
}
```

Create a request to unlock staked token.

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | Y | Staking instrument name, e.g. SOL.staked, refer to `instrument_name` from `private/staking/get-staking-instruments` response |
| quantity | string | Y | Unstake quantity  
  
For yield-bearing instruments (learn more from [FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)), this field requires the quantity you wish to unstake in terms of the original staked token.  
  
Example:  
If you hold a TSTON.staked position, specify the quantity of TSTON.staked token you wish to unstake. You can retrieve the conversion rates (of TSTON to TON) from private/staking/get-swap-rate endpoint to estimate the quantity of TON you will receive after the request is successfully completed. |

### Applies To

REST

### REST Method

POST

### Response Attributes

| Name | Type | Description |
| --- | --- | --- |
| staking\_id | string | Request id |
| instrument\_name | string | Staking instrument name, e.g. SOL.staked |
| status | string | Request status:  
\- `NEW`  
\- `PENDING`  
\- `PENDING_WITHDRAWAL`  
\- `PENDING_UNSTAKING`  
\- `COMPLETED`  
\- `REJECTED` |
| quantity | string | Unstake quantity  
  
For yield-bearing instruments (learn more from [FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)), this field displays the quantity you wish to unstake in terms of the original token you staked.  
  
Example:  
If you hold a TSTON.staked position, specify the quantity of TSTON.staked tokens you wish to unstake. This field will show you the quantity of TON you will receive after the request is successfully completed. |
| underlying\_inst\_name | string | Underlying instrument name, e.g. SOL |
| reason | string | Reason for the status, e.g. "NO\_ERROR" |