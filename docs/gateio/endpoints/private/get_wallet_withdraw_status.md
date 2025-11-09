# GET /wallet/withdraw_status

**Source:**
[/wallet/withdraw_status](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-withdrawal-status) Query withdrawal status

`GET /wallet/withdraw_status`

_Query withdrawal status_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-parameters](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-parameters)

| Name     | In    | Type   | Required | Description                      |
| -------- | ----- | ------ | -------- | -------------------------------- |
| currency | query | string | false    | Query by specified currency name |

> Example responses

> 200 Response

```
[
  {
    "currency": "GT",
    "name": "GateToken",
    "name_cn": "GateToken",
    "deposit": "0",
    "withdraw_percent": "0%",
    "withdraw_fix": "0.01",
    "withdraw_day_limit": "20000",
    "withdraw_day_limit_remain": "20000",
    "withdraw_amount_mini": "0.11",
    "withdraw_eachtime_limit": "20000",
    "withdraw_fix_on_chains": {
      "BTC": "20",
      "ETH": "15",
      "TRX": "0",
      "EOS": "2.5"
    },
    "withdraw_percent_on_chains": {
      "ETH": "0%",
      "GTEVM": "0%"
    }
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-responses](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listwithdrawstatus-responseschema)

Status Code **200**

| Name                         | Type   | Description                                  |
| ---------------------------- | ------ | -------------------------------------------- |
| » currency                   | string | Currency                                     |
| » name                       | string | Currency name                                |
| » name_cn                    | string | Currency Chinese name                        |
| » deposit                    | string | Deposit fee                                  |
| » withdraw_percent           | string | Withdrawal fee rate percentage               |
| » withdraw_fix               | string | Fixed withdrawal fee                         |
| » withdraw_day_limit         | string | Daily allowed withdrawal amount              |
| » withdraw_amount_mini       | string | Minimum withdrawal amount                    |
| » withdraw_day_limit_remain  | string | Daily withdrawal amount left                 |
| » withdraw_eachtime_limit    | string | Maximum amount for each withdrawal           |
| » withdraw_fix_on_chains     | object | Fixed withdrawal fee on multiple chains      |
| »» **additionalProperties**  | string | none                                         |
| » withdraw_percent_on_chains | object | Percentage withdrawal fee on multiple chains |
| »» **additionalProperties**  | string | none                                         |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-account-balance-information) Query sub-account balance information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-balance-information](https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-balance-information)

> Code samples
