# GET Lock/Unlock Sub User

**Source:** [Lock/Unlock Sub User](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52620-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/management ( Lock/Unlock Sub User)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 20times/2s

Interface description: This endpoint allows parent user to lock or unlock a specific sub user.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | Sub user UID |  |  |
| action | string | false | Action type | lock,unlock |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | status code |  |
| DATA\_START | object | false |  |  |
| subUid | long | false | sub user UID |  |
| userState | string | false | The state of sub user | lock,normal |
| DATA\_END |  | false |  |  |

#### Request example

{

"subUid":

178211

"action":

"lock"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"subUid":

245686628

"userState":

"lock"

}

"ok":

true

}