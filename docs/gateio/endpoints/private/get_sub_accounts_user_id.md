# GET /sub_accounts/{user_id}

**Source:** [/sub_accounts/{user_id}](https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-sub-account) Get sub-account

`GET /sub_accounts/{user_id}`

_Get sub-account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-parameters](https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-parameters)

| Name    | In   | Type           | Required | Description         |
| ------- | ---- | -------------- | -------- | ------------------- |
| user_id | path | integer(int64) | true     | Sub-account user ID |

> Example responses

> 200 Response

```
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
[https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-responses](https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-responses)

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getsubaccount-responseschema)

Status Code **200**

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

## [#](#create-new-sub-account-api-key-pair) Create new sub-account API key pair

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-new-sub-account-api-key-pair](https://www.gate.io/docs/developers/apiv4/en/#create-new-sub-account-api-key-pair)

> Code samples
