# DELETE /account/stp_groups/{stp_id}/users

**Source:** [/account/stp_groups/{stp_id}/users](https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-parameters)

## Authentication

Required (Private Endpoint)

## [#](#delete-users-from-the-stp-user-group) Delete users from the STP user group

`DELETE /account/stp_groups/{stp_id}/users`

_Delete users from the STP user group_

- Only the main account that created this STP group is allowed to delete users
  from the STP user group
- Deletion is limited to accounts under the current main account; cross-account
  deletion is not permitted

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-parameters](https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-parameters)

| Name    | In    | Type           | Required | Description                                           |
| ------- | ----- | -------------- | -------- | ----------------------------------------------------- |
| stp_id  | path  | integer(int64) | true     | STP Group ID                                          |
| user_id | query | integer(int64) | true     | STP user IDs, multiple IDs can be separated by commas |

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
[https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-responses](https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-responses)

| Status | Meaning                                                                    | Description                                                        | Schema     |
| ------ | -------------------------------------------------------------------------- | ------------------------------------------------------------------ | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Users deleted successfully, returns current users in the STP group | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#deletestpgroupusers-responseschema)

Status Code **200**

| Name          | Type           | Description   |
| ------------- | -------------- | ------------- |
| _None_        | array          | none          |
| » user_id     | integer(int64) | User ID       |
| » stp_id      | integer(int64) | STP Group ID  |
| » create_time | integer(int64) | Creation time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#configure-gt-fee-deduction) Configure GT fee deduction

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#configure-gt-fee-deduction](https://www.gate.io/docs/developers/apiv4/en/#configure-gt-fee-deduction)

> Code samples
