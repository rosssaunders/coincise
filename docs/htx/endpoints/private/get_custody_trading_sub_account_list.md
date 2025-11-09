# GET custody trading sub-account list

**Source:**
[Get custody trading sub-account list](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-1956045865f)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/entrust-user-list (Get custody trading sub-account list)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: X/2s

Interface description: This interface is used by traders to query the list of
sub-accounts currently being managed.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                     | Value Range | Default Value |
| --------- | --------- | -------- | --------------------------------------------------------------- | ----------- | ------------- |
| fromId    | long      | false    | First record ID in next page (only valid if exceeded page size) |             |               |
| limit     | long      | false    |                                                                 |             |               |

#### Response Parameter

| Parameter   | Data Type | Required | Description                                                                | Value Range  |
| ----------- | --------- | -------- | -------------------------------------------------------------------------- | ------------ |
| code        | int       | true     |                                                                            |              |
| message     | string    | true     |                                                                            | ok , "error" |
| DATA_START  | object    | true     |                                                                            |              |
| list        |           | false    |                                                                            |              |
| uid         | long      | true     | Sub user’s UID                                                             |              |
| subUserName | string    | true     | Subaccount username                                                        |              |
| DATA_END    |           | false    | Query id, which can be used as the from_id field in the next query request |              |
| nextId      | long      | true     | First record ID in next page (only valid if exceeded page size)            |              |

#### Request example

No data

#### Response Example

##### Success Example

No data
