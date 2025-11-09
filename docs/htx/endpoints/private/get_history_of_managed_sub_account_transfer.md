# GET history of managed sub-account transfer

**Source:**
[Get history of managed sub-account transfer](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-195604fc529)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/managed-transfer-history (Get history of managed sub-account transfer)

Request type: GET

Signature verification: No

Interface permission: Read

Rate Limit: X/2s

Interface description: This interface is used by traders to query the transfer
records of the current managed sub-account.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                                                                                                   | Value Range                                                                                                                                                             | Default Value                                                                                                                                                                                          |
| --------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| uid       | long      | false    | Sub-user UID, if it is empty, all the sub-accounts managed by the trader will be queried by default           |                                                                                                                                                                         |                                                                                                                                                                                                        |
| currency  | string    | false    |                                                                                                               |                                                                                                                                                                         |                                                                                                                                                                                                        |
| type      | string    | false    | Transfer type 0: Transfers from master account to sub-account 1: Transfers from sub-account to master account |                                                                                                                                                                         |                                                                                                                                                                                                        |
| startTime | long      | false    | ((end-time) – 48hour)                                                                                         | \[((end-time) – 48hour), (end-time)\]                                                                                                                                   | Far point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days.  |
| endTime   | long      | false    | current-time                                                                                                  | \[(current-time) – 120days,(current-time)\]                                                                                                                             | Near point of time of the query window (unix time in millisecond). Searching based on transact-time. The maximum size of the query window is 48 hour. The query window can be shifted within 120 days. |
| from      | string    | false    | Search internal id to begin with                                                                              | if search next page, then this should be the last id (not trade-id) of last page; if search previous page, then this should be the first id (not trade-id) of last page |                                                                                                                                                                                                        |
| direct    | string    | false    | Search direction when 'from' is used                                                                          | next, prev                                                                                                                                                              | next                                                                                                                                                                                                   |
| size      | string    | false    | The number of orders to return                                                                                | \[1-100\]                                                                                                                                                               | 100                                                                                                                                                                                                    |

#### Response Parameter

| Parameter   | Data Type | Required | Description                                                                                                   | Value Range |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------- | ----------- |
| status      |           | false    |                                                                                                               |             |
| DATA_START  | object    | true     |                                                                                                               |             |
| currency    | string    | true     | Transfer currency                                                                                             |             |
| type        | string    | true     | Transfer type 0: Transfers from master account to sub-account 1: Transfers from sub-account to master account |             |
| amount      | long      | true     | Transfer amount                                                                                               |             |
| uid         | long      | true     | Sub user’s UID                                                                                                |             |
| subUserName | string    | true     | Subaccount username                                                                                           |             |
| query_id    | string    | false    | Query id, which can be used as the from_id field in the next query request                                    |             |
| DATA_START  |           | false    |                                                                                                               |             |

#### Request example

No data

#### Response Example

##### Success Example

No data
