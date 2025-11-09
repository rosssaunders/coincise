# GET Set Tradable Market for Sub Users

**Source:**
[Set Tradable Market for Sub Users](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52859-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/tradable-market ( Set Tradable Market for Sub Users)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: Parent user is able to set tradable market for a batch of
sub users through this endpoint. By default, sub user’s trading permission in
spot market is activated.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter   | Data Type | Required | Description                                               | Value Range                  | Default Value |
| ----------- | --------- | -------- | --------------------------------------------------------- | ---------------------------- | ------------- |
| subUids     | string    | false    | Sub user's UID list (maximum 50 UIDs, separated by comma) | \-                           |               |
| accountType | string    | false    | Account type                                              | isolated-margin,cross-margin |               |
| activation  | string    | false    | Account activation                                        | activated,deactivated        |               |

#### Response Parameter

| Parameter   | Data Type | Required | Description                                                                           | Value Range                  |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------- | ---------------------------- |
| code        | int       | false    | Status code                                                                           |                              |
| message     | string    | false    | Error message (if any)                                                                |                              |
| DATA_START  | object    | false    |                                                                                       |                              |
| subUid      | string    | false    | Sub user's UID                                                                        |                              |
| accountType | string    | false    | Account type                                                                          | isolated-margin,cross-margin |
| activation  | string    | false    | Account activation                                                                    | activated,deactivated        |
| errCode     | int       | false    | Error code in case of rejection (only valid when the requested UID being rejected)    |                              |
| errMessage  | string    | false    | Error message in case of rejection (only valid when the requested UID being rejected) |                              |
| DATA_END    |           | false    |                                                                                       |                              |

#### Request example

{

"subUids":

"178211"

"accountType":

"isolated-margin"

"activation":

"activated"

}

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"subUid":

"12345678"

"accountType":

"isolated-margin"

"activation":

"activated"

}

1:{

"subUid":

"123456781"

"accountType":

"isolated-margin"

"errCode":

1002

"errMessage":

"forbidden"

}

\]

"ok":

true

}
