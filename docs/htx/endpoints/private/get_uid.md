# GET UID

**Source:**
[Get UID](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52d6c-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/user/uid ( Get UID)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint allow users to view the user ID of the
account easily.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --------- | --------- | -------- | ----------- | ----------- | ------------- |

Notes:  
No parameters are needed for this endpoint.

#### Response Parameter

| Parameter | Data Type | Required | Description            | Value Range |
| --------- | --------- | -------- | ---------------------- | ----------- |
| code      | int       | false    | Status code            |             |
| message   | string    | false    | Error message (if any) |             |
| data      | long      | false    | UID                    |             |

#### Request example

`curl"https://api.huobi.pro/v2/user/uid"`

#### Response Example

##### Success Example

{

"code":

200

"data":

63628520

}
