# GET Sub User's Status

**Source:** [Get Sub User's Status](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52b46-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/user-state ( Get Sub User's Status)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: Via this endpoint, parent user is able to query sub user's status by specifying a UID.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | Sub user's UID |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| uid | long | false | Sub user’s UID |  |
| userState | string | false | Sub user’s status | lock, normal |
| DATA\_END | object | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/sub-user/user-state?subUid=xxxx"`

#### Response Example

##### Success Example

{

"code":

200

"data":{

"uid":

132208121

"userState":

"normal"

}

}