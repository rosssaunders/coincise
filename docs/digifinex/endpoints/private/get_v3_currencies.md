# GET /v3/currencies

**Title:** Get currency deposit and withdrawal information

**Source:** [Get currency deposit and withdrawal information](https://docs.digifinex.com/en-ww/spot/v3/rest.html#get-currency-deposit-and-withdrawal-information)

## Authentication

Required (Private Endpoint)

---

## Get currency deposit and withdrawal information

Search for crypto information, including deposit and withrawal service, withdrawal fees and minimum deposit amount etc.

### HTTP Request

-   GET `https://openapi.digifinex.com/v3/currencies`

### Request Parameters

| Name of parameter | If necessary | Type | Description | Default | Value range |
| --- | --- | --- | --- | --- | --- |
| currency | false | string | cryptocurrency | By default, the default value is null and returns to all crptos | btc, ltc, bch, eth, etc ... |

> Response:

```
{
  "code": 200,
  "data":
    [
      {
        "currency": "xrp",
        "chain":"",
        "min_deposit_amount": 0.01,
        "min_withdraw_amount": 0.02,
        "deposit_status":1,
        "withdraw_status":1,
        "withdraw_fee_currency":"eth",
        "min_withdraw_fee":0.006,
        "withdraw_fee_rate":0.02,
      },
      ...
    ]
}
```

### Response Content

| Name of parameter | If necessary | Data type | Description | Value range |
| --- | --- | --- | --- | --- |
| currency | true | string | currency |  |
| chain | true | string | chain name | The chain name is empty by default, and USDT has two chains: ERC20 and OMNI |
| min\_deposit\_amount | true | float | minimum deposit |  |
| min\_withdraw\_amount | true | float | minimum withdrawal |  |
| deposit\_status | true | int | deposit status: 1 is on, 0 is off |  |
| withdraw\_status | true | int | withdrawal status: 1 is on, 0 is off |  |
| withdraw\_fee\_currency | true | string | The currency of withdrawal fee |  |
| min\_withdraw\_fee | true | float | Minimum withdrawal fee |  |
| withdraw\_fee\_rate | true | float | Percentage of withdrawal fee. Note: if the actual fee is less than the minimum fee, it will be charged according to minimum fee; Otherwise, it will be charged according to the actual fee. |  |

### Status code

| Status code | error message | Error scenario description |
| --- | --- | --- |
| 200 | success | success |