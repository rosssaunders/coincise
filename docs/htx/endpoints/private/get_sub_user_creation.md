# GET Sub user creation

**Source:** [Sub user creation](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52336-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/creation ( Sub user creation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to create sub users, up to 50 at a time

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| USERLIST\_START | object | true |  |  |  |
| userName | string | true | Sub user name, an important identifier of the sub user's identity, requires unique within the HTX platform | The combination of 6 to 20 letters and numbers, or only letters. Letter is not case sensitive. The first character has to be a letter. |  |
| note | string | false | Sub user note, no unique requirements | Up to 20 characters, unlimited character types |  |
| USERLIST\_END |  | false |  |  |  |
| subAccountType | String | false | Sub account type, GENERAL general type (default to general type if no value), CONTACT contract type, GRID contract grid type, FIRE-BLOCK fireblock custody account. It indicates that sub account types cannot be specified in accounts, which means that all sub account types within a batch are the same |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| userName | string | false | Sub user name |  |
| note | string | false | Sub user note (only valid for sub-users with note)） |  |
| uid | long | false | Sub user UID (only valid for successfully created sub users) |  |
| errCode | string | false | Error code for creation failure (only valid for sub users that failed to create) |  |
| errMessage | string | false | Cause of creation failure error (only valid for sub users that failed to create) |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"userList":\[

0:{

"userName":

"test123"

"note":

"huobi"

}

1:{

"userName":

"test456"

"note":

"huobitwo"

}

\]

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"userName":

"test123"

"note":

"HTX"

"uid":

123

}

1:{

"userName":

"test456"

"note":

"HTX two"

"errCode":

"2002"

"errMessage":

"value in user name duplicated with existing record"

}

\]

}