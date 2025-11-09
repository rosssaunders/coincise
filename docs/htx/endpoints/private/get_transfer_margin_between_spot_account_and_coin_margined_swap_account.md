# GET Transfer margin between Spot account and Coin Margined Swap account

**Source:**
[Transfer margin between Spot account and Coin Margined Swap account](https://www.htx.com/en-us/opend/newApiPages/?id=5d51c338-77b6-11ed-9966-0242ac110003)

**Category:** Swap Transferring Interface

## Authentication

Required (Private Endpoint)

### https://api.huobi.pro/v2/account/transfer (Transfer margin between Spot account and Coin Margined Swap account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 1 times per second

#### Request Address

| Environment | Address                                   |
| ----------- | ----------------------------------------- |
| Online      | https://api.huobi.pro/v2/account/transfer |

#### Request Parameter

| Parameter | Data Type | Required | Description                                          | Value Range | Default Value |
| --------- | --------- | -------- | ---------------------------------------------------- | ----------- | ------------- |
| from      | string    | true     | source，value：spot、swap                            |             | e.g. spot     |
| to        | string    | true     | destination，value：spot、swap                       |             | e.g. swap     |
| currency  | string    | true     | currency.Both uppercase and lowercase are supported. | e.g. btc    |               |
| amount    | decimal   | true     | Transferring amount                                  |             |               |

Notes:  
This interface is used to transfer assets between Spot account and Coin Margined
Swap account.  
API rate limit for this interface is 1 times/second.  
Transferring margin between Spot account and Coin Margined Swap account
Interface, sets 8 decimal places for transferring amount of all coins.

#### Response Parameter

| Parameter | Data Type | Required | Description                                        | Value Range |
| --------- | --------- | -------- | -------------------------------------------------- | ----------- |
| code      | long      | true     | response code                                      |             |
| success   | boolean   | true     | true/false                                         |             |
| message   | string    | true     | response messsage                                  |             |
| data      | long      | true     | Transfer ID ,If status="error", data will be null. |             |

#### Request example

{

"from":

"222"

"to":

"2234"

"currency":

"btc"

"amount":

"2"

}

#### Response Example

##### Success Example

`正确的返回： { "code":200, "data":113423809, "message":"Succeed", "success":true } 错误的返回： { "code":1303, "data":null, "message":"The single transfer-out amount must be no less than 0.0008BTC", "success":false}`
