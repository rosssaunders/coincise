# POST /sub_accounts/{user_id}/keys

**Source:**
[/sub_accounts/{user_id}/keys](https://www.gate.io/docs/developers/apiv4/en/#createsubaccountkeys-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-new-sub-account-api-key-pair) Create new sub-account API key pair

`POST /sub_accounts/{user_id}/keys`

_Create new sub-account API key pair_

> Body parameter

```json
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
  "ip_whitelist": ["127.0.0.1", "127.0.0.2"]
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createsubaccountkeys-parameters](https://www.gate.io/docs/developers/apiv4/en/#createsubaccountkeys-parameters)

| Name           | In   | Type                                  | Required | Description                                               |
| -------------- | ---- | ------------------------------------- | -------- | --------------------------------------------------------- |
| user_id        | path | integer(int64)                        | true     | Sub-account user ID                                       |
| body           | body | [SubAccountKey](#schemasubaccountkey) | true     | none                                                      |
| » mode         | body | integer(int32)                        | false    | Mode: 1 - classic 2 - portfolio account                   |
| » name         | body | string                                | false    | API Key Name                                              |
| » perms        | body | array                                 | false    | none                                                      |
| »» name        | body | string                                | false    | Permission function name (no value will be cleared)       |
| »» read_only   | body | boolean                               | false    | Read Only                                                 |
| » ip_whitelist | body | array                                 | false    | IP whitelist (list will be cleared if no value is passed) |

#### [#](#detailed-descriptions-5) Detailed descriptions

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

> Example responses

> 200 Response

```json
{
  "state": 1,
  "name": "spot",
  "user_id": 100000,
  "perms": [
    {
      "name": "options",
      "read_only": false
    },
    {
      "name": "spot",
      "read_only": false
    },
    {
      "name": "delivery",
      "read_only": false
    },
    {
      "name": "wallet",
      "read_only": false
    },
    {
      "name": "futures",
      "read_only": false
    }
  ],
  "ip_whitelist": ["127.0.0.1", "127.0.0.2"],
  "mode": 1,
  "secret": "cddcc6e5e78060e013860bdbe5e737830b96821c027664586fb38b411808f4fd",
  "key": "eb8815bf99d7bb5f8ad6497bdc4774a8",
  "created_at": 1663683330,
  "updated_at": 1663683330
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createsubaccountkeys-responses](https://www.gate.io/docs/developers/apiv4/en/#createsubaccountkeys-responses)

| Status | Meaning                                                                    | Description          | Schema                                |
| ------ | -------------------------------------------------------------------------- | -------------------- | ------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Created successfully | [SubAccountKey](#schemasubaccountkey) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-api-key-pairs-of-the-sub-account) List all API key pairs of the sub-account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-all-api-key-pairs-of-the-sub-account](https://www.gate.io/docs/developers/apiv4/en/#list-all-api-key-pairs-of-the-sub-account)

> Code samples
