# PUT /sub_accounts/{user_id}/keys/{key}

**Source:** [/sub_accounts/{user_id}/keys/{key}](https://www.gate.io/docs/developers/apiv4/en/#updatesubaccountkeys-parameters)

## Authentication

Required (Private Endpoint)

## [#](#update-sub-account-api-key-pair) Update sub-account API key pair

`PUT /sub_accounts/{user_id}/keys/{key}`

_Update sub-account API key pair_

> Body parameter

```
{
  "mode": 1,
  "name": "spot",
  "perms": [
    {
      "read_only": false,
      "name": "options"
    },
    {
      "read_only": false,
      "name": "spot"
    },
    {
      "read_only": false,
      "name": "delivery"
    },
    {
      "read_only": false,
      "name": "wallet"
    },
    {
      "read_only": false,
      "name": "futures"
    }
  ],
  "ip_whitelist": [
    "127.0.0.1",
    "127.0.0.2"
  ]
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#updatesubaccountkeys-parameters](https://www.gate.io/docs/developers/apiv4/en/#updatesubaccountkeys-parameters)

| Name           | In   | Type                                  | Required | Description                                               |
| -------------- | ---- | ------------------------------------- | -------- | --------------------------------------------------------- |
| user_id        | path | integer                               | true     | Sub-account user ID                                       |
| key            | path | string                                | true     | Sub-account API key                                       |
| body           | body | [SubAccountKey](#schemasubaccountkey) | true     | none                                                      |
| » mode         | body | integer(int32)                        | false    | Mode: 1 - classic 2 - portfolio account                   |
| » name         | body | string                                | false    | API Key Name                                              |
| » perms        | body | array                                 | false    | none                                                      |
| »» name        | body | string                                | false    | Permission function name (no value will be cleared)       |
| »» read_only   | body | boolean                               | false    | Read Only                                                 |
| » ip_whitelist | body | array                                 | false    | IP whitelist (list will be cleared if no value is passed) |

#### [#](#detailed-descriptions-6) Detailed descriptions

**»» name**: Permission function name (no value will be cleared)

- wallet: wallet
- spot: spot/margin
- futures: perpetual contract
- delivery: delivery contract
- earn: earn
- custody: custody
- options: options
- account: account information
- loan: lending
- margin: margin
- unified: unified account
- copy: copy trading

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#updatesubaccountkeys-responses](https://www.gate.io/docs/developers/apiv4/en/#updatesubaccountkeys-responses)

| Status | Meaning                                                                            | Description          | Schema |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Updated successfully | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-sub-account-api-key-pair) Delete sub-account API key pair

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#delete-sub-account-api-key-pair](https://www.gate.io/docs/developers/apiv4/en/#delete-sub-account-api-key-pair)

> Code samples
