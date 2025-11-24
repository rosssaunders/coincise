# POST /account/stp_groups/{stp_id}/users

**Source:** [/account/stp_groups/{stp_id}/users](https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-parameters)

## Authentication

Required (Private Endpoint)

## [#](#add-users-to-the-stp-user-group) Add users to the STP user group

`POST /account/stp_groups/{stp_id}/users`

_Add users to the STP user group_

- Only the main account that created this STP group can add users to the STP
  user group
- Only accounts under the current main account are allowed, cross-main account
  is not permitted

> Body parameter

```json
[
  1,
  2,
  3
]
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-parameters](https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-parameters)

| Name   | In   | Type             | Required | Description  |
| ------ | ---- | ---------------- | -------- | ------------ |
| stp_id | path | integer(int64)   | true     | STP Group ID |
| body   | body | array\[integer\] | true     | User ID      |

> Example responses

> 200 Response

```json
[
  {
    "user_id": 10000,
    "stp_id": 1,
    "create_time": 1548000000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-responses](https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-responses)

| Status | Meaning                                                                    | Description                                                       | Schema     |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User added successfully, returning current users in the STP group | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#addstpgroupusers-responseschema)

Status Code **200**

| Name          | Type           | Description   |
| ------------- | -------------- | ------------- |
| _None_        | array          | none          |
| » user_id     | integer(int64) | User ID       |
| » stp_id      | integer(int64) | STP Group ID  |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#delete-users-from-the-stp-user-group) Delete users from the STP user group

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#delete-users-from-the-stp-user-group](https://www.gate.io/docs/developers/apiv4/en/#delete-users-from-the-stp-user-group)

> Code samples
