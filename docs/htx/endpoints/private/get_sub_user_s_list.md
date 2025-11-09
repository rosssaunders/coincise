# GET Sub User's List

**Source:** [Get Sub User's List](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52a87-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/user-list ( Get Sub User's List)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Via this endpoint parent user is able to query a full list of sub user's UID as well as their status.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| fromId | long | false | First record ID in next page (only valid if exceeded page size) |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false | In ascending order of uid, each response contains maximum 100 records |  |
| uid | long | false | Sub user’s UID |  |
| userState | string | false | Sub user’s status | lock, normal |
| subUserName | string | true | Subaccount username |  |
| note | string | true | API key note |  |
| DATA\_END |  | false |  |  |
| nextId | long | false | First record ID in next page (only valid if exceeded page size) |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/user-list?fromId=xxxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"uid":

63628520

"userState":

"normal"

"subUserName":

""

"note":

""

}

1:{

"uid":

132208121

"userState":

"normal"

"subUserName":

""

"note":

""

}

\]

}