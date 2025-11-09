# GET Deductible currency query information

**Source:** [Deductible currency query information](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18f7c4cea32)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/account/overview/info (Deductible currency query information)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 5 times/1s

Interface description: Users query asset information that can be used to deduct handling fees.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| code | integer | false | code |  |
| message | string | false | message |  |
| DATA\_START | object | true |  |  |
| currency | string | true | The currency of this balance |  |
| DATA\_START |  | false |  |  |

#### Request example

`curl"https://api.huobi.pro/v1/account/overview/info"`

#### Response Example

##### Success Example

{

"code":

"200"

"data":{

"currency":

"TRX"

}

"success":

true

}