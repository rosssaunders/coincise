# GET Sub user API key deletion

**Source:** [Sub user API key deletion](https://www.htx.com/en-us/opend/newApiPages/?id=7ec5208e-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/api-key-deletion ( Sub user API key deletion)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to delete the API key of the sub user.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| subUid | long | false | sub user uid |  |  |
| accessKey | string | false | Access key for sub user API key |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any)） |  |

#### Request example

{

"subUid":

178211

"accessKey":

"178211"

}

#### Response Example

##### Success Example

{

"code":

200

"data":

NULL

}