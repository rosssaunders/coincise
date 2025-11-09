# GET Asset Transfer

**Source:** [Asset Transfer](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4b9db-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/account/transfer ( Asset Transfer)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: API Key Permission：Trade This endpoint allows parent user and sub user to transfer asset between accounts. Features now supported for both parent user and sub user include: 1.transfer asset between spot account and individual isolated-margin account; 2.transfer asset between individual isolated-margin accounts; Features now supported for parent user include: 1.Transfer asset between parent user's spot account and sub user's spot account; 2.Transfer asset from sub user’s spot account to another sub user’s spot account that is under the same parent user(Assets from the Fireblocks sub-accounts can only be transferred to other Fireblocks sub-accounts.); Features now supported for sub user include: 1.Transfer asset from authorized sub user’s spot account to another sub user’s spot account that is under the same parent user( Assets from the Fireblocks sub-accounts can only be transferred to other Fireblocks sub-accounts).The authorization endpoint is POST /v2/sub-user/transferability. 2.Transfer asset from sub user’s spot account to parent user’s spot account; Other transfer functions will be gradually launched later, please take note on API announcement in near future.

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.huobi.pro |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| from-user | long | true | Transfer out user uid | parent user uid, sub user uid |  |
| from-account-type | string | true | Transfer out account type | spot, margin |  |
| from-account | long | true | Transfer out account id |  |  |
| to-user | long | true | Transfer in user uid | parent user uid, sub user uid |  |
| to-account-type | string | true | Transfer in account type | spot, margin |  |
| to-account | long | true | Transfer in account id |  |  |
| currency | string | true | Currency name | Refer to GET /v1/common/currencys |  |
| amount | string | true | Amount of fund to transfer |  |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| status | string | true | Request status | "ok" or "error" |
| DATA\_START | list | true |  |  |
| transact-id | int | true | Transfer id |  |
| transact-time | long | true | Transfer time |  |
| DATA\_END |  | false |  |  |

#### Request example

{

"from-user":

178911

"from-account-type":

"spot"

"from-account":

178911

"to-user":

178911

"to-account-type":

"spot"

"to-account":

178911

"currency":

"usdt"

"amount":

"1"

}

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"transact-id":

220521190

"transact-time":

1590662591832

}

}