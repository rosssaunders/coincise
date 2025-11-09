# POST /account/stp_groups

**Source:** [/account/stp_groups](https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-stp-user-group) Create STP user group

`POST /account/stp_groups`

_Create STP user group_

Only the main account is allowed to create a new STP user group

> Body parameter

```
{
  "name": "stp_name"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-parameters](https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-parameters)

| Name          | In   | Type           | Required | Description    |
| ------------- | ---- | -------------- | -------- | -------------- |
| body          | body | object         | true     | none           |
| » id          | body | integer(int64) | false    | STP Group ID   |
| » name        | body | string         | true     | STP Group name |
| » creator_id  | body | integer(int64) | false    | Creator ID     |
| » create_time | body | integer(int64) | false    | Creation time  |

> Example responses

> 200 Response

```
{
  "id": 123435,
  "name": "group",
  "create_time": 1548000000,
  "creator_id": 10000
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-responses](https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-responses)

| Status | Meaning                                                                    | Description                                                       | Schema |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | User added successfully, returning current users in the STP group | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createstpgroup-responseschema)

Status Code **200**

| Name          | Type           | Description    |
| ------------- | -------------- | -------------- |
| » id          | integer(int64) | STP Group ID   |
| » name        | string         | STP Group name |
| » creator_id  | integer(int64) | Creator ID     |
| » create_time | integer(int64) | Creation time  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-stp-user-groups-created-by-the-user) Query STP user groups created by the user

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-stp-user-groups-created-by-the-user](https://www.gate.io/docs/developers/apiv4/en/#query-stp-user-groups-created-by-the-user)

> Code samples
