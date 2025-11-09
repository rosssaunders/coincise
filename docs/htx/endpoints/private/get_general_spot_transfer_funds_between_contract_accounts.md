# GET [General] Spot - transfer funds between contract accounts

**Source:** [[General] Spot - transfer funds between contract accounts](https://www.htx.com/en-us/opend/newApiPages/?id=10000098-77b7-11ed-9966-0242ac110003)

**Category:** Future Transferring Interface

## Authentication

Required (Private Endpoint)

### /v2/account/transfer (\[General\] Spot - transfer funds between contract accounts)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This interface allows for asset transfer between users’ currency spot accounts, contract accounts

#### Request Address

| Environment | Address |
| --- | --- |
| Online | https://api.hbdm.com |
| Online (preferred by aws customers) | https://api.hbdm.vn |

#### Request Parameter

| Parameter | Data Type | Required | Description | Value Range | Default Value |
| --- | --- | --- | --- | --- | --- |
| from | string | true | source，value：spot、futures | e.g. spot、spot、futures |  |
| to | string | true | destination，value：spot、futures | e.g. linear-swap、spot、futures |  |
| currency | string | true | 币种,支持大小写 | e.g. usdt |  |
| amount | decimal | true | 划转金额 |  |  |
| margin-account | string | true | 保证金账户 | e.g. btc-usdt、eth-usdt、USDT |  |

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --- | --- | --- | --- | --- |
| success | string | true | status | true/false |
| data | long | true | The generated transfer order id |  |
| code | long | true | Response code |  |
| message | string | true | Response message |  |

#### Request example

{

"from":

"spot"

"to":

"futures"

"currency":

"usdt"

"amount":

100

"margin-account":

"USDT"

}

#### Response Example

##### Success Example

{

"code":

200

"data":

176104252

"message":

"Succeed"

"success":

true

}