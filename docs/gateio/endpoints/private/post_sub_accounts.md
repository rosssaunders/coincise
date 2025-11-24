# POST /sub_accounts

**Source:**
[/sub_accounts](https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-a-new-sub-account) Create a new sub-account

`POST /sub_accounts`

_Create a new sub-account_

> Body parameter

```json
{
  "remark": "remark",
  "login_name": "sub_account_for_trades"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-parameters)

| Name         | In   | Type   | Required | Description                                                                                                          |
| ------------ | ---- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| body         | body | object | true     | none                                                                                                                 |
| » remark     | body | string | false    | Note                                                                                                                 |
| » login_name | body | string | true     | Sub-account login name: Only letters, numbers and underscores are supported, cannot contain other invalid characters |
| » password   | body | string | false    | The sub-account's password. (Default: the same as main account's password)                                           |
| » email      | body | string | false    | The sub-account's email address. (Default: the same as main account's email address)                                 |

> Example responses

> 201 Response

```json
{
  "remark": "remark",
  "login_name": "sub_account_for_trades",
  "user_id": 10001,
  "state": 1,
  "create_time": 168888888
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-responses)

| Status | Meaning                                                                         | Description          | Schema |
| ------ | ------------------------------------------------------------------------------- | -------------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Created successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createsubaccounts-responseschema)

Status Code **201**

| Name          | Type           | Description                                                                                                          |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| » remark      | string         | Note                                                                                                                 |
| » login_name  | string         | Sub-account login name: Only letters, numbers and underscores are supported, cannot contain other invalid characters |
| » password    | string         | The sub-account's password. (Default: the same as main account's password)                                           |
| » email       | string         | The sub-account's email address. (Default: the same as main account's email address)                                 |
| » state       | integer(int32) | Sub-account status: 1-normal, 2-locked                                                                               |
| » type        | integer(int32) | Sub-account type: 1-Regular sub-account, 3-Cross margin sub-account                                                  |
| » user_id     | integer(int64) | Sub-account user ID                                                                                                  |
| » create_time | integer(int64) | Created time                                                                                                         |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-sub-accounts) List sub-accounts

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-sub-accounts](https://www.gate.io/docs/developers/apiv4/en/#list-sub-accounts)

> Code samples
