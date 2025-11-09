# GET Sub user API key creation

**Source:**
[Sub user API key creation](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52185-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/api-key-generation ( Sub user API key creation)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to create the
API key of the sub user

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter   | Data Type | Required | Description                                                                                                                    | Value Range                                                                                                                                                                                                                                                                                                           | Default Value |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| otpToken    | string    | false    | Google verification code of the parent user, the parent user must be bound to Google Authenticator for verification on the web | 6 characters, pure numbers                                                                                                                                                                                                                                                                                            |               |
| subUid      | long      | false    | Sub user UID                                                                                                                   |                                                                                                                                                                                                                                                                                                                       |               |
| note        | string    | false    | API key note                                                                                                                   | Up to 255 characters with any font                                                                                                                                                                                                                                                                                    |               |
| permission  | string    | false    | API key permissions                                                                                                            | Valid value: readOnly, trade; multiple inputs are allowed, separated by comma, i.e. readOnly, trade; readOnly is required permission for any API key, while trade permission is optional.                                                                                                                             |               |
| ipAddresses | string    | false    | The IPv4/IPv6 host address or IPv4 network address bound to the API key                                                        | At most 20 IPv4/IPv6 host address(es) and/or IPv4 network address(es) can bind with one API key, separated by comma. For example: 202.106.196.115, 202.106.96.0/24. An API key not linked with an IP address but has trading or withdrawal permissions will be automatically deactivated after 90 days of inactivity. |               |

#### Response Parameter

| Parameter   | Data Type | Required | Description            | Value Range |
| ----------- | --------- | -------- | ---------------------- | ----------- |
| code        | int       | false    | Status code            |             |
| message     | string    | false    | Error message (if any) |             |
| DATA_START  | object    | false    |                        |             |
| note        | string    | false    | API key note           |             |
| accessKey   | string    | false    | access key             |             |
| secretKey   | string    | false    | secret key             |             |
| permission  | string    | false    | API key permission     |             |
| ipAddresses | string    | false    | API key IP addresses   |             |
| DATA_END    |           | false    |                        |             |

#### Request example

{

"otpToken":

"178211"

"subUid":

178911

"note":

"178211"

"permission":

"178211"

"ipAddresses":

"178211"

}

#### Response Example

##### Success Example

{

"code":

200

"data":{

"accessKey":

"2b55df29-vf25treb80-1535713d-8aea2"

"secretKey":

"c405c550-6fa0583b-fb4bc38e-d317e"

"note":

"62924133"

"permission":

"trade,readOnly"

"ipAddresses":

"192.168.0.1,192.168.1.1"

}

}
