# POST private/staking/get-staking-position

**Source:** [private/staking/get-staking-position](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-get-staking-position)

## Authentication

Required (Private Endpoint)

## private/staking/get-staking-position

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/get-staking-position",
  "params": {
    "instrument_name": "SOL.staked"
  }
}
```

> Response Sample

```
{
  "id": 1,
  "code": 0,
  "method": "private/staking/get-staking-position",
  "result": {
    "data": [
      {
        "instrument_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "staked_quantity": "30000.00",
        "pending_staked_quantity": "20000.00",
        "pending_unstaked_quantity": "10000.00",
        "reward_eligible_quantity": "10000.00"
      }
    ]
  }
}
```

Get the total staking position for a user/token

### Request Params

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| instrument\_name | string | N | Staking instrument name, e.g. SOL.staked |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name | Type | Description |
| --- | --- | --- |
| instrument\_name | string | Staking instrument name, e.g. SOL.staked |
| underlying\_inst\_name | string | Underlying instrument name, e.g. SOL |
| staked\_quantity | string | Total staked quantity  
  
For yield-bearing instruments (learn more from [FAQs](https://help.crypto.com/en/articles/6800043-on-chain-staking-guide)), the staked\_quantity, pending\_unstaked\_quantity, reward\_eligible\_quantity fields display the quantity of yield-bearing tokens held.  
  
Example:  
If you hold a TSTON.staked position, this will show the actual quantity of TSTON held on-chain on your behalf via the Crypto.com Exchange. |
| pending\_staked\_quantity | string | Total pending staked quantity |
| pending\_unstaked\_quantity | string | Total pending unstaked quantity |
| reward\_eligible\_quantity | string | Total reward eligible quantity, quantity can be unstaked/convert |