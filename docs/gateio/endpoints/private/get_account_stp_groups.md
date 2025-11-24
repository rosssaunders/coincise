# GET /account/stp_groups

**Source:** [/account/stp_groups](https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-stp-user-groups-created-by-the-user) Query STP user groups created by the user

`GET /account/stp_groups`

_Query STP user groups created by the user_

Only query STP user groups created by the current main account

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-parameters](https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-parameters)

| Name | In    | Type   | Required | Description          |
| ---- | ----- | ------ | -------- | -------------------- |
| name | query | string | false    | Fuzzy search by name |

> Example responses

> 200 Response

```json
[
  {
    "id": 123435,
    "name": "group",
    "create_time": 1548000000,
    "creator_id": 10000
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-responses](https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-responseschema](https://www.gate.io/docs/developers/apiv4/en/#liststpgroups-responseschema)

Status Code **200**

| Name          | Type           | Description    |
| ------------- | -------------- | -------------- |
| _None_        | array          | none           |
| » id          | integer(int64) | STP Group ID   |
| » name        | string         | STP Group name |
| » creator_id  | integer(int64) | Creator ID     |
| » create_time | integer(int64) | Creation time  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-users-in-the-stp-user-group) Query users in the STP user group

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-users-in-the-stp-user-group](https://www.gate.io/docs/developers/apiv4/en/#query-users-in-the-stp-user-group)

> Code samples
