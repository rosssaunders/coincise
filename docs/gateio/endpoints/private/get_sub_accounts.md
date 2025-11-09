# GET /sub_accounts

**Source:** [/sub_accounts](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#list-sub-accounts) List sub-accounts

`GET /sub_accounts`

_List sub-accounts_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-parameters)

| Name | In    | Type   | Required | Description                                                                                                            |
| ---- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| type | query | string | false    | Enter `0` to list all types of sub-accounts (currently supporting cross-margin sub-accounts and regular sub-accounts). |

#### [#](#detailed-descriptions-4) Detailed descriptions

**type**: Enter `0` to list all types of sub-accounts (currently supporting
cross-margin sub-accounts and regular sub-accounts). Enter `1` to query regular
sub-accounts only. If no parameter is passed, only regular sub-accounts will be
queried by default.

> Example responses

> 200 Response

```
[
  {
    "remark": "remark",
    "login_name": "sub_account_for_trades",
    "user_id": 10001,
    "state": 1,
    "create_time": 168888888
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsubaccounts-responseschema)

Status Code **200**

| Name          | Type           | Description                                                                                                          |
| ------------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| _None_        | array          | none                                                                                                                 |
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

## [#](#get-sub-account) Get sub-account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-sub-account](https://www.gate.io/docs/developers/apiv4/en/#get-sub-account)

> Code samples
