# GET /account/stp_groups/{stp_id}/users

**Source:**
[/account/stp_groups/{stp_id}/users](https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-users-in-the-stp-user-group) Query users in the STP user group

`GET /account/stp_groups/{stp_id}/users`

_Query users in the STP user group_

Only the main account that created this STP group can query the account ID list
in the current STP group

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-parameters](https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-parameters)

| Name   | In   | Type           | Required | Description  |
| ------ | ---- | -------------- | -------- | ------------ |
| stp_id | path | integer(int64) | true     | STP Group ID |

> Example responses

> 200 Response

```
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
[https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-responses](https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#liststpgroupsusers-responseschema)

Status Code **200**

| Name          | Type           | Description   |
| ------------- | -------------- | ------------- |
| _None_        | array          | none          |
| » user_id     | integer(int64) | User ID       |
| » stp_id      | integer(int64) | STP Group ID  |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#add-users-to-the-stp-user-group) Add users to the STP user group

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#add-users-to-the-stp-user-group](https://www.gate.io/docs/developers/apiv4/en/#add-users-to-the-stp-user-group)

> Code samples
