# GET Transfer Asset between Parent and Sub Account

**Source:**
[Transfer Asset between Parent and Sub Account](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4feac-7773-11ed-9966-0242ac110003)

**Category:** Sub-account Management

## Authentication

Required (Private Endpoint)

### /v1/subuser/transfer ( Transfer Asset between Parent and Sub Account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Rate Limit: 2times/2s

Interface description: This endpoint allows user to transfer asset between
parent and sub account.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                      | Value Range | Default Value                                                                                |
| --------------- | --------- | -------- | ---------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------- |
| sub-uid         | long      | false    | The sub account's uid to transfer to or from                     |             |                                                                                              |
| currency        | string    | false    | The type of currency toCurrency, i.e. btc, ltc, bch, eth, etc... |             |                                                                                              |
| amount          | decimal   | false    | The amount of asset to transfer                                  |             |                                                                                              |
| type            | string    | false    | The type of transfer                                             |             | master-transfer-in, master-transfer-out, master-point-transfer-in, master-point-transfer-out |
| client-order-id | string    | false    | client order id                                                  |             |                                                                                              |

#### Response Parameter

| Parameter | Data Type | Required | Description        | Value Range |
| --------- | --------- | -------- | ------------------ | ----------- |
| data      | int       | false    | Unique transfer id |             |
| status    | string    | false    | status             |             |

#### Request example

{

"sub-uid":

178211

"currency":

"usdt"

"amount":

178211

"client-order-id":

"178211"

"type":

"master-transfer-in"

}

#### Response Example

##### Success Example

{

"data":

123456

"status":

"ok"

}
