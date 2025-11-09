# GET [General] Transfer margin between Spot account and USDT Margined Contracts account

**Source:**
[[General] Transfer margin between Spot account and USDT Margined Contracts account](https://www.htx.com/en-us/opend/newApiPages/?id=8cb89bf5-77b5-11ed-9966-0242ac110003)

**Category:** Swap Transferring Interface

## Authentication

Required (Private Endpoint)

### /v2/account/transfer (\[General\] Transfer margin between Spot account and USDT Margined Contracts account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 times/second.

Interface description: The interface supports cross margin mode and isolated
margin mode. This interface is used to transfer assets between Spot account and
USDT Margined Contracts account. API rate limit for this interface is 1
times/second. Transferring margin between Spot account and USDT Margined
Contracts account Interface, sets 8 decimal places for transferring amount of
all coins.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter      | Data Type | Required | Description                                          | Value Range                   | Default Value |
| -------------- | --------- | -------- | ---------------------------------------------------- | ----------------------------- | ------------- |
| from           | string    | true     | source，value：spot、linear-swap                     | e.g. spot                     |               |
| to             | string    | true     | destination，value：spot、linear-swap                | e.g. linear-swap              |               |
| currency       | string    | true     | currency.Both uppercase and lowercase are supported. | e.g. USDT                     |               |
| amount         | decimal   | true     | Transferring amount                                  |                               |               |
| margin-account | string    | true     | margin account                                       | e.g. BTC-USDT，ETH-USDT, USDT |               |

Notes:  
when "margin-account" is USDT，it means the transfer in or transfer out from
cross margin account.

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

`正确的返回： { "code": 200, "data": 176104252, "message": "Succeed", "success": true } 错误的返回： { "code":1303, "data":null, "message":"The single transfer-out amount must be no less than 0.0008BTC", "success":false }`
