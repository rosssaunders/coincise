# GET Query withdrawal order by client order id

**Source:**
[Query withdrawal order by client order id](https://www.htx.com/en-us/opend/newApiPages/?id=7ec4f198-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v1/query/withdraw/client-order-id ( Query withdrawal order by client order id)

Request type: GET

Signature verification: Yes

Interface permission: Read

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter     | Data Type | Required | Description                   | Value Range | Default Value |
| ------------- | --------- | -------- | ----------------------------- | ----------- | ------------- |
| clientOrderId | string    | false    | client order id (max 32 char) |             |               |

Notes:  
query the information of withdrawal order, which submitted by api interface. (it
will return the information of withdrawal order which submitted with client
order id. in the other it will return the null that withdrawal order submitted
without with client order id)

#### Response Parameter

| Parameter       | Data Type | Required | Description     | Value Range |
| --------------- | --------- | -------- | --------------- | ----------- |
| status >        | stirng    | false    | status code     |             |
| DATA\\ \_START  | long      | false    |                 |             |
| address         | string    | false    | address         |             |
| client-order-id | string    | false    | client order id |             |
| address-tag     | string    | false    | address tag     |             |
| amount          | decimal   | false    | amount          |             |
| chain           | string    | false    | chain           |             |
| created-at      | long      | false    | created at      |             |
| currency        | string    | false    | currency        |             |
| error-code      | string    | false    | error code      |             |
| error-msg       | string    | false    | error msg       |             |
| fee             | decimal   | false    | fee             |             |
| id              | long      | false    | ID              |             |
| state           | string    | false    | state           |             |
| tx-hash         | string    | false    | transmit hash   |             |
| type            | string    | false    | type            |             |
| updated-at      | long      | false    | updated at      |             |
| DATA_END        | long      | false    |                 |             |

#### Request example

`curl"https://api.huobi.pro/v1/query/withdraw/client-order-id?clientOrderId=xxxxx"`

#### Response Example

##### Success Example

{

"status":

"ok"

"data":{

"id":

101123262

"client-order-id":

"1113"

"type":

"withdraw"

"sub-type":

"FAST"

"currency":

"usdt"

"chain":

"usdt"

"tx-hash":

""

"amount":

1.2

"from-addr-tag":

""

"address":

"1PL24EbWrNNrnMKw1cxAHPsebUz7DdhWTx"

"address-tag":

""

"fee":

0

"state":

"confirmed"

"created-at":

1637758163686

"updated-at":

1637758251559

}

}
