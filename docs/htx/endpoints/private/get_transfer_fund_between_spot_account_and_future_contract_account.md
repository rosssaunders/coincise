# GET Transfer Fund Between Spot Account and Future Contract Account

**Source:**
[Transfer Fund Between Spot Account and Future Contract Account](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4cf23-7773-11ed-9966-0242ac110003)

**Category:** Account

## Authentication

Required (Private Endpoint)

### /v1/futures/transfer ( Transfer Fund Between Spot Account and Future Contract Account)

Request type: POST

Signature verification: Yes

Interface permission: Trade

Interface description: API Key Permission：Trade This endpoint allows a user to
transfer fund between spot accounts and futrue contract accounts. Transferring
from a spot account to a contract account, the type is pro-to-futures;
transferring from a contract account to a spot account, the type is
futures-to-pro

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description                | Value Range                          | Default Value |
| --------- | --------- | -------- | -------------------------- | ------------------------------------ | ------------- |
| currency  | string    | false    | Currency name              | Refer to GET /v1/common/currencys    |               |
| amount    | decimal   | false    | Amount of fund to transfer |                                      |               |
| type      | string    | false    | Type of the transfer       | "futures-to-pro" or "pro-to-futures" |               |

#### Response Parameter

| Parameter | Data Type | Required | Description                                                                    | Value Range |
| --------- | --------- | -------- | ------------------------------------------------------------------------------ | ----------- |
| data      | Long      | false    | Transfer id                                                                    |             |
| status    | string    | false    | Request status. "ok" or "error"                                                |             |
| err-code  | string    | false    | error code. Please refer to the err-code list below for details                |             |
| err-msg   | string    | false    | error message. Please refer to the err-code and err-msg list below for details |             |

#### Request example

{

"currency":

"btc"

"amount":

0.001

"type":

"pro-to-futures"

}

#### Response Example

##### Success Example

`{ "data": 12345, "status": "ok" } > Error response: { "status": "error", "data": null, "err-code": "base-msg", "err-msg": "Insufficient amount available." }`
