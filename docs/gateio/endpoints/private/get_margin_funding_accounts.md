# GET /margin/funding_accounts

**Source:**
[/margin/funding_accounts](https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#funding-account-list) Funding account list

`GET /margin/funding_accounts`

_Funding account list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-parameters)

| Name     | In    | Type   | Required | Description                      |
| -------- | ----- | ------ | -------- | -------------------------------- |
| currency | query | string | false    | Query by specified currency name |

> Example responses

> 200 Response

```json
[
  {
    "currency": "BTC",
    "available": "1.238",
    "locked": "0",
    "lent": "3.32",
    "total_lent": "3.32"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolatedfundingaccounts-responseschema)

Status Code **200**

| Name         | Type   | Description                                                              |
| ------------ | ------ | ------------------------------------------------------------------------ |
| » currency   | string | Currency name                                                            |
| » available  | string | Available assets to lend, which is identical to spot account `available` |
| » locked     | string | Locked amount. i.e. amount in `open` loans                               |
| » lent       | string | Outstanding loan amount yet to be repaid                                 |
| » total_lent | string | Amount used for lending. total_lent = lent + locked                      |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-user-auto-repayment-settings) Update user auto repayment settings

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#update-user-auto-repayment-settings](https://www.gate.io/docs/developers/apiv4/en/#update-user-auto-repayment-settings)

> Code samples
