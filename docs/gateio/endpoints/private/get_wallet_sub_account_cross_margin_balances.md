# GET /wallet/sub_account_cross_margin_balances

**Source:** [/wallet/sub_account_cross_margin_balances](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-sub-account-cross-margin-account-balance-information) Query sub-account cross margin account balance information

`GET /wallet/sub_account_cross_margin_balances`

_Query sub-account cross margin account balance information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-parameters)

| Name    | In    | Type   | Required | Description                                                                                                                        |
| ------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | Sub-account user ID, you can query multiple records separated by `,`. If not specified, it will return records of all sub-accounts |

> Example responses

> 200 Response

```json
[
  {
    "uid": "100000",
    "available": {
      "user_id": 100003,
      "locked": false,
      "total": "20.000000",
      "borrowed": "0.000000",
      "interest": "0",
      "borrowed_net": "0",
      "net": "20",
      "leverage": "3",
      "risk": "9999.99",
      "total_initial_margin": "0.00",
      "total_margin_balance": "20.00",
      "total_maintenance_margin": "0.00",
      "total_initial_margin_rate": "9999.9900",
      "total_maintenance_margin_rate": "9999.9900",
      "total_available_margin": "20.00",
      "balances": {
        "USDT": {
          "available": "20.000000",
          "freeze": "0.000000",
          "borrowed": "0.000000",
          "interest": "0.000000"
        }
      }
    }
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountcrossmarginbalances-responseschema)

Status Code **200**

| Name                              | Type           | Description                                                                                                            |
| --------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------- |
| » uid                             | string         | User ID                                                                                                                |
| » available                       | object         | none                                                                                                                   |
| »» user_id                        | integer(int64) | Cross margin account user ID. 0 means this sub-account has not yet opened a cross margin account                       |
| »» locked                         | boolean        | Whether the account is locked                                                                                          |
| »» balances                       | object         | none                                                                                                                   |
| »»» CrossMarginBalance            | object         | none                                                                                                                   |
| »»»» available                    | string         | Available balance                                                                                                      |
| »»»» freeze                       | string         | Locked balance                                                                                                         |
| »»»» borrowed                     | string         | Borrowed balance                                                                                                       |
| »»»» interest                     | string         | Unpaid interest                                                                                                        |
| »»» total                         | string         | Total account value in USDT, i.e., the sum of all currencies' `(available+freeze)*price*discount`                      |
| »»» borrowed                      | string         | Total borrowed value in USDT, i.e., the sum of all currencies' `borrowed*price*discount`                               |
| »»» borrowed_net                  | string         | Total borrowed value in USDT \* leverage factor                                                                        |
| »»» net                           | string         | Total net assets in USDT                                                                                               |
| »»» leverage                      | string         | Position leverage                                                                                                      |
| »»» interest                      | string         | Total unpaid interest in USDT, i.e., the sum of all currencies' `interest*price*discount`                              |
| »»» risk                          | string         | Risk rate. When it falls below 110%, liquidation will be triggered. Calculation formula: `total / (borrowed+interest)` |
| »»» total_initial_margin          | string         | Total initial margin                                                                                                   |
| »»» total_margin_balance          | string         | Total margin balance                                                                                                   |
| »»» total_maintenance_margin      | string         | Total maintenance margin                                                                                               |
| »»» total_initial_margin_rate     | string         | Total initial margin rate                                                                                              |
| »»» total_maintenance_margin_rate | string         | Total maintenance margin rate                                                                                          |
| »»» total_available_margin        | string         | Total available margin                                                                                                 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-withdrawal-address-whitelist) Query withdrawal address whitelist

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-withdrawal-address-whitelist](https://www.gate.io/docs/developers/apiv4/en/#query-withdrawal-address-whitelist)

> Code samples
