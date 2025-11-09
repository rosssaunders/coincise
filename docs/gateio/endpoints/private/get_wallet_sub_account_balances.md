# GET /wallet/sub_account_balances

**Source:**
[/wallet/sub_account_balances](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-sub-account-balance-information) Query sub-account balance information

`GET /wallet/sub_account_balances`

_Query sub-account balance information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-parameters)

| Name    | In    | Type   | Required | Description                                                                                                                        |
| ------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | Sub-account user ID, you can query multiple records separated by `,`. If not specified, it will return records of all sub-accounts |

> Example responses

> 200 Response

```
[
  {
    "uid": "10003",
    "available": {
      "BTC": "0.1",
      "GT": "2000",
      "USDT": "10"
    }
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountbalances-responseschema)

Status Code **200**

| Name                        | Type   | Description                      |
| --------------------------- | ------ | -------------------------------- |
| » uid                       | string | User ID                          |
| » available                 | object | Available balances of currencies |
| »» **additionalProperties** | string | none                             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-account-isolated-margin-account-balance-information) Query sub-account isolated margin account balance information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-isolated-margin-account-balance-information](https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-isolated-margin-account-balance-information)

> Code samples
