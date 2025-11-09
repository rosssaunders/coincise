# GET Sub user API key modification

**Source:** [Sub user API key modification](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52249-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/sub-user/api-key-modification ( Sub user API key modification)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This endpoint is used by the parent user to modify the API key of the sub user

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
| note | string | false | API key note for sub user API key | Up to 255 characters |  |
| permission | string | false | API key permission for sub user API key | Valid value: readOnly, trade; multiple inputs are allowed, separated by comma, i.e. readOnly, trade; readOnly is required permission for any API key, while trade permission is optional. |  |
| ipAddresses | string | false | At most 20 IPv4/IPv6 host address(es) and/or IPv4 network address(es) can bind with one API key, separated by comma. For example: 202.106.196.115, 202.106.96.0/24. An API key not linked with an IP address but has trading or withdrawal permissions will be automatically deactivated after 90 days of inactivity. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| { note | string | false | API key note |  |
| permission | string | false | API key permission |  |
| ipAddresses | string | false | IPv4/IPv6 host address(es) or IPv4 network address(es) bind to the API key |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"subUid":

178211

"accessKey":

"178211"

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

"note":

"tom"

"permission":

"trade,readOnly"

"ipAddresses":

"192.168.1.1"

}

"ok":

true

}