# GET /spot/accounts

**Source:** [/spot/accounts](https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#list-spot-trading-accounts) List spot trading accounts

`GET /spot/accounts`

_List spot trading accounts_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-parameters)

| Name     | In    | Type   | Required | Description                      |
| -------- | ----- | ------ | -------- | -------------------------------- |
| currency | query | string | false    | Query by specified currency name |

> Example responses

> 200 Response

```json
[
  {
    "currency": "ETH",
    "available": "968.8",
    "locked": "0",
    "update_id": 98
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listspotaccounts-responseschema)

Status Code **200**

| Name        | Type           | Description                    |
| ----------- | -------------- | ------------------------------ |
| » currency  | string         | Currency detail                |
| » available | string         | Available amount               |
| » locked    | string         | Locked amount, used in trading |
| » update_id | integer(int64) | Version number                 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-spot-account-transaction-history) Query spot account transaction history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-spot-account-transaction-history](https://www.gate.io/docs/developers/apiv4/en/#query-spot-account-transaction-history)

> Code samples
