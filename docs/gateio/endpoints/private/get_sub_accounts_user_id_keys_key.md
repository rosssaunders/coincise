# GET /sub_accounts/{user_id}/keys/{key}

**Source:**
[/sub_accounts/{user_id}/keys/{key}](https://www.gate.io/docs/developers/apiv4/en/#getsubaccountkey-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-specific-api-key-pair-of-the-sub-account) Get specific API key pair of the sub-account

`GET /sub_accounts/{user_id}/keys/{key}`

_Get specific API key pair of the sub-account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getsubaccountkey-parameters](https://www.gate.io/docs/developers/apiv4/en/#getsubaccountkey-parameters)

| Name    | In   | Type    | Required | Description         |
| ------- | ---- | ------- | -------- | ------------------- |
| user_id | path | integer | true     | Sub-account user ID |
| key     | path | string  | true     | Sub-account API key |

> Example responses

> 200 Response

```
{
  "state": 1,
  "name": "spot",
  "user_id": 1000000,
  "perms": [
    {
      "name": "futures",
      "read_only": false
    },
    {
      "name": "wallet",
      "read_only": false
    },
    {
      "name": "delivery",
      "read_only": false
    },
    {
      "name": "options",
      "read_only": false
    },
    {
      "name": "spot",
      "read_only": false
    }
  ],
  "mode": 1,
  "ip_whitelist": [
    "127.0.0.1",
    "127.0.0.2"
  ],
  "key": "75c3264105b74693d8cb5c7f1a8e2420",
  "created_at": 1663642892,
  "last_access": 1663642892,
  "update_at": 1663642892
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getsubaccountkey-responses](https://www.gate.io/docs/developers/apiv4/en/#getsubaccountkey-responses)

| Status | Meaning                                                                    | Description            | Schema                                |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | [SubAccountKey](#schemasubaccountkey) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#lock-sub-account) Lock sub-account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#lock-sub-account](https://www.gate.io/docs/developers/apiv4/en/#lock-sub-account)

> Code samples
