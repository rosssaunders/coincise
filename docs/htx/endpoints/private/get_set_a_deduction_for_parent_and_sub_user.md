# GET Set a deduction for parent and sub user

**Source:**
[Set a deduction for parent and sub user](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52497-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/deduct-mode ( Set a deduction for parent and sub user)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This interface is to set the deduction fee for parent and
sub user (HT or point ).

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter  | Data Type | Required | Description                                               | Value Range | Default Value |
| ---------- | --------- | -------- | --------------------------------------------------------- | ----------- | ------------- |
| subUids    | long      | false    | Sub user's UID list (maximum 50 UIDs, separated by comma) |             |               |
| deductMode | string    | false    | deduct mode：master ,sub                                  |             |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description                                                                           | Value Range |
| ---------- | --------- | -------- | ------------------------------------------------------------------------------------- | ----------- |
| code       | int       | false    | Status code                                                                           |             |
| message    | string    | false    | Error message (if any)                                                                |             |
| DATA_START | object    | false    |                                                                                       |             |
| subUid     | string    | false    | Sub user's UID                                                                        |             |
| deductMode | string    | false    | deduct mode                                                                           |             |
| errCode    | string    | false    | Error code in case of rejection (only valid when the requested UID being rejected)    |             |
| errMessage | string    | false    | Error message in case of rejection (only valid when the requested UID being rejected) |             |
| DATA_END   |           | false    |                                                                                       |             |

#### Request example

{

"subUids":

178211

"deductMode":

"master"

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"subUid":

"158069153"

"deductMode":

"master"

}

1:{

"subUid":

"1461901631"

"deductMode":

NULL

"errCode":

1002

"errMessage":

"forbidden"

}

\]

"ok":

true

}
