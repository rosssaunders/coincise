# GET Create a Withdraw Request

**Source:**
[Create a Withdraw Request](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4cc41-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v1/dw/withdraw/api/create ( Create a Withdraw Request)

Request type: POST

Signature verification: Yes

Interface permission: Withdraw

Rate Limit: 20times/2s

Interface description: Parent user creates a withdraw request from spot account
to an external address (exists in your withdraw address list), which doesn't
require two-factor-authentication. If user has chosen fast withdraw preferred in
settings , the withdraw requests submitted via this endpoint would choose 'fast
withdraw' as preferred channel. It means if the withdraw address is managed by
HTX, the withdraw transfer is not on-chain, and then the transaction hash
(tx-hash) field will be empty in withdraw record. Only support the existed
addresses in your withdraw address list. The once-off withdraw address of IOTA
couldn't be set in the list, thus IOTA withdrawal is not supported through API.

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter       | Data Type | Required | Description                                                                                                                                                                                                                                                                                                                           | Value Range                                                                                                             | Default Value |
| --------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------- |
| address         | string    | false    | The desination address of this withdraw.If the internal withdrawal is initiated through UID, mobile phone number and email, in addition to adding it to the withdrawal address, it also needs to follow the following format. Note that UID, PHONE and MAIL must be capitalized.UID:1234567、 PHONE:0098-1234567、 MAIL:234234@QQ.COM |                                                                                                                         |               |
| currency        | string    | false    | Crypto currency,refer to GET /v1/common/currencys                                                                                                                                                                                                                                                                                     |                                                                                                                         |               |
| amount          | string    | false    | The amount of currency to withdraw                                                                                                                                                                                                                                                                                                    |                                                                                                                         |               |
| fee             | float     | false    | \>=0,Please check whether the handling fee is too high through the handling fee interface before withdrawal to avoid losses, and cancel the operation through the "Cancel the Withdrawal" interface before successful withdrawal.If you withdraw coins through UID, this field can pass 0                                             |                                                                                                                         |               |
| chain           | string    | false    | If you withdraw coins through UID, this field is required, and the default parameter is t397342.The currency type is required for one coin with multiple chains, and can be omitted for one coin with one chain.                                                                                                                      | Refer toGET /v2/reference/currencies.Set as "usdt" to withdraw USDT to OMNI, set as "trc20usdt" to withdraw USDT to TRX |               |
| addr-tag        | string    | false    | A tag specified for this address.If you withdraw money through UID, this field is required and is the UID of the other party.                                                                                                                                                                                                         |                                                                                                                         |               |
| client-order-id | string    | false    | client order id                                                                                                                                                                                                                                                                                                                       |                                                                                                                         |               |
| exchange-vasp   | string    | false    | Exchange id, which can be accessed through /v1/query/vasp-list public interface                                                                                                                                                                                                                                                       |                                                                                                                         |               |
| user-name-vasp  | string    | false    | The recipient's name, supports Korean and English; the surname and first name are separated by "##", for example "XING##MING"; if it is English, all letters are converted to uppercase                                                                                                                                               |                                                                                                                         |               |

Notes:  
If the client-order-id(the id of withdrawal order) is not empty, idempotent
verification will be performed. For the withdrawal request with the same
client-order-id, the previously submitted successful withdrawal order id will be
directly returned

#### Response Parameter

| Parameter | Data Type | Required | Description | Value Range |
| --------- | --------- | -------- | ----------- | ----------- |
| data      | long      | false    | Transfer id |             |

#### Request example

{

"address":

"0xde709f2102306220921060314715629080e2fb77"

"amount":

"0.05"

"currency":

"eth"

"fee":

"0.01"

}

#### Response Example

##### Success Example

{

"data":

700

}
