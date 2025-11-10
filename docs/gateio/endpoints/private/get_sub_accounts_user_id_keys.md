# GET /sub_accounts/{user_id}/keys

**Source:**
[/sub_accounts/{user_id}/keys](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountkeys-parameters)

## Authentication

Required (Private Endpoint)

## [#](#list-all-api-key-pairs-of-the-sub-account) List all API key pairs of the sub-account

`GET /sub_accounts/{user_id}/keys`

_List all API key pairs of the sub-account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountkeys-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountkeys-parameters)

| Name    | In   | Type    | Required | Description         |
| ------- | ---- | ------- | -------- | ------------------- |
| user_id | path | integer | true     | Sub-account user ID |

> Example responses

> 200 Response

```
[
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountkeys-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountkeys-responses)

| Status | Meaning                                                                    | Description                 | Schema                                    |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ----------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[SubAccountKey](#schemasubaccountkey)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#update-sub-account-api-key-pair) Update sub-account API key pair

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#update-sub-account-api-key-pair](https://www.gate.io/docs/developers/apiv4/en/#update-sub-account-api-key-pair)

> Code samples
