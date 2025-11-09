# GET API key query

**Source:** [API key query](https://www.htx.com/en-us/opend/newApiPages/?id=7ec52c92-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v2/user/api-key ( API key query)

Request type: GET

Signature verification: Yes

Interface permission: Read

Interface description: This endpoint is used by the parent user to query their own API key information, and the parent user to query their sub user's API key information.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| uid | long | false | parent user uid , sub user uid |  |  |
| accessKey | string | false | The access key of the API key, if not specified, it will return all API keys belong to the UID. |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | int | false | Status code |  |
| message | string | false | Error message (if any) |  |
| DATA\_START | object | false |  |  |
| accessKey | string | false | access key |  |
| note | string | false | API key note |  |
| permission | string | false | API key permission |  |
| ipAddresses | string | false | API key IP addresses |  |
| validDays | int | false | API key expire in (days) | If it is -1, it means permanently valid |
| status | string | false | API key status | normal, expired |
| createTime | long | false | API key creation time |  |
| updateTime | long | false | API key last modified time |  |
| DATA\_END |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v2/user/api-key?uid=xxx&accessKey=xxx"`

#### Response Example

##### Success Example

{

"code":

200

"message":

"success"

"data":\[

0:{

"accessKey":

"160bb889-b7XXXXbe-e0XXXXf5-ghxertfvbf"

"status":

"normal"

"note":

"host"

"permission":

"trade,readOnly"

"ipAddresses":

"192.168.0.1,192.168.1.1"

"validDays":

\-1

"createTime":

1615192704000

"updateTime":

1623030338000

}

1:{

"accessKey":

"5000d371-edXXXXf5tf-40XXXX8b-ab8e5"

"status":

"normal"

"note":

"host two"

"permission":

"readOnly,trade,withdraw"

"ipAddresses":

""

"validDays":

7

"createTime":

1623158078000

"updateTime":

1629875976000

}

\]

"ok":

true

}