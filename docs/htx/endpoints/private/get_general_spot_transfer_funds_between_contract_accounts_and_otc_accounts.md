# GET [General] Spot - transfer funds between contract accounts and OTC accounts

**Source:**
[[General] Spot - transfer funds between contract accounts and OTC accounts](https://www.htx.com/en-us/opend/newApiPages/?id=10000096-77b7-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v2/account/transfer (\[General\] Spot - transfer funds between contract accounts and OTC accounts)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: This interface allows for asset transfer between users’
currency spot accounts, contract accounts, and OTC accounts.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                               | Value Range                                | Default Value |
| -------------- | --------- | -------- | --------------------------------------------------------- | ------------------------------------------ | ------------- |
| from           | string    | true     | source，value：spot、linear-swap、otc、futures、swap      | e.g. spot、linear-swap、otc、futures、swap |               |
| to             | string    | true     | destination，value：spot、linear-swap、otc、futures、swap | e.g. linear-swap、spot、otc、futures、swap |               |
| currency       | string    | true     | currency.Both uppercase and lowercase are supported.      | e.g. usdt                                  |               |
| amount         | decimal   | true     | Transferring amount                                       |                                            |               |
| margin-account | string    | true     | margin account                                            | e.g. btc-usdt、eth-usdt、USDT              |               |

#### Response Parameter

| Parameter | Data Type | Required | Description                     | Value Range |
| --------- | --------- | -------- | ------------------------------- | ----------- |
| success   | string    | true     | status                          | true/false  |
| data      | long      | true     | The generated transfer order id |             |
| code      | long      | true     | Response code                   |             |
| message   | string    | true     | Response message                |             |

#### Request example

{

"from":

"spot"

"to":

"linear-swap"

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
