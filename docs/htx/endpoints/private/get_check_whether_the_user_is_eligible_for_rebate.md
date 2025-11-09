# GET Check whether the user is eligible for rebate

**Source:** [Check whether the user is eligible for rebate](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89359-77b5-11ed-9966-18c8f982264)

**Category:** Broker API

## Authentication

Required (Private Endpoint)

### /broker/v1/user\_rebate\_status (Check whether the user is eligible for rebate)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20 times/2s

Interface description: This endpoint is used for API brokers to check whether users meet the conditions for rebates on the HTX The endpoint is not open to the public but only available to particular API brokers.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| queryUid | String | true | User uid to be checked |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | false |  | ok , "error" |
| DATA\_START | object array | false |  |  |
| spotRebateStatus | boolean | true | Whether the spot meet the rebate conditions true-yes false-no |  |
| contractRebateStatus | boolean | true | Whether the futures meet the rebate conditions true-yes false-no |  |
| spotIsNewUser | boolean | true | Whether the spot is a new user true-yes false-no |  |
| contractIsNewUser | boolean | true | Whether the futures is a new users true-yes false-no |  |
| DATA\_END |  | false |  |  |
| ts | long | true |  |  |

#### Request example

`curl"https://api.huobi.pro/ /broker/v1/user_rebate_status? queryUid =12345678"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"spotRebateStatus":

false

"contractRebateStatus":

false

"spotIsNewUser":

false

}

"ts":

1606976912267

}