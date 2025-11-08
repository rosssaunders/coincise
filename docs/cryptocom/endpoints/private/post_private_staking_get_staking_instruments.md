# POST private/staking/get-staking-instruments

**Source:**
[private/staking/get-staking-instruments](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#private-staking-get-staking-instruments)

## Authentication

Required (Private Endpoint)

## private/staking/get-staking-instruments

> Request Sample

```
{
  "id": 1,
  "method": "private/staking/get-staking-instruments",
  "params": {}
}
```

> Response Sample

```
{
  "id": 1,
  "code": 0,
  "method": "private/staking/get-staking-instruments",
  "result": {
    "data": [
      {
        "instrument_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "reward_inst_name": "SOL.staked",
        "out_of_stock": false,
        "block_unstake": false,
        "est_rewards": "0.0661",
        "apr_y": "APR",
        "min_stake_amt": "0.00000001",
        "reward_frequency": "2.5",
        "lock_up_period": "5",
        "is_compound_reward": true,
        "pre_stake_charge_enable": false,
        "pre_stake_charge_rate_in_bps": "0",
        "is_restaked": false,
        "additional_rewards": []
      },
      {
        "instrument_name": "DYDX.staked",
        "underlying_inst_name": "DYDX",
        "reward_inst_name": "DYDX",
        "out_of_stock": false,
        "block_unstake": false,
        "est_rewards": "0.05",
        "apr_y": "APR",
        "min_stake_amt": "0.00000001",
        "reward_frequency": "1",
        "lock_up_period": "31",
        "is_compound_reward": false,
        "pre_stake_charge_enable": false,
        "pre_stake_charge_rate_in_bps": "0",
        "is_restaked": false,
        "additional_rewards": [
          {
            "reward_inst_name": "USD_Stable_Coin"
          }
        ]
      }
    ]
  }
}
```

Get staking instruments information

### Request Params

| Name              | Type | Required | Description |
| ----------------- | ---- | -------- | ----------- |
| no param required | N/A  |          |             |

### Applies To

REST

### REST Method

POST

### Response Attributes

An array, consisting of:

| Name                         | Type    | Description                                 |
| ---------------------------- | ------- | ------------------------------------------- |
| instrument_name              | string  | Staking instrument name, e.g. SOL.staked    |
| underlying_inst_name         | string  | Underlying instrument name, e.g. SOL        |
| reward_inst_name             | string  | Reward instrument name, e.g. SOL.staked     |
| out_of_stock                 | boolean | Disabled stake - true or false              |
| block_unstake                | boolean | Disabled unstake - true or false            |
| est_rewards                  | string  | Estimated rewards                           |
| apr_y                        | string  | Estimated rewards unit - APR or APY         |
| min_stake_amt                | string  | Minimum stake amount                        |
| reward_frequency             | string  | Estimated reward frequency (day)            |
| lock_up_period               | string  | Estimated lock up period (day)              |
| is_compound_reward           | boolean | Is reward compounded - true or false        |
| pre_stake_charge_enable      | boolean | Is pre stake charge applied - true or false |
| pre_stake_charge_rate_in_bps | string  | Pre stake charge rate in basis point        |
| is_restaked                  | boolean | Is restaked instrument - true or false      |
| additional_rewards           | array   | See below                                   |

`additional_rewards` consists of:

| Name             | Type   | Description                       |
| ---------------- | ------ | --------------------------------- |
| reward_inst_name | string | Additional reward instrument name |
