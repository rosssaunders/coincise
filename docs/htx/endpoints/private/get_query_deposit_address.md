# GET Query Deposit Address

**Source:**
[Query Deposit Address](https://www.htx.com/en-us/opend/newApiPages/?id=7ec50029-7773-11ed-9966-0242ac110003)

**Category:** Wallet (Deposits and Withdrawals)

## Authentication

Required (Private Endpoint)

### /v2/account/deposit/address ( Query Deposit Address)

Request type: GET

Signature verification: Yes

Interface permission: Read

Rate Limit: 20times/2s

Interface description: Parent user and sub user could query deposit address of
corresponding chain, for a specific crypto currency (except IOTA).

#### Request Address

| Environment                         | Address                   |
| ----------------------------------- | ------------------------- |
| Online                              | https://api.huobi.pro     |
| Online (preferred by aws customers) | https://api-aws.huobi.pro |

#### Request Parameter

| Parameter | Data Type | Required | Description     | Value Range                       | Default Value |
| --------- | --------- | -------- | --------------- | --------------------------------- | ------------- |
| currency  | string    | false    | Crypto currency | Refer to GET /v1/common/currencys |               |

#### Response Parameter

| Parameter  | Data Type | Required | Description            | Value Range |
| ---------- | --------- | -------- | ---------------------- | ----------- |
| code       | int       | false    | Status code            |             |
| message    | string    | false    | Error message (if any) |             |
| DATA_START | object    | false    |                        |             |
| currency   | string    | false    | Crypto currency        |             |
| address    | string    | false    | Deposit address        |             |
| addressTag | string    | false    | Deposit address tag    |             |
| chain      | string    | false    | Block chain name       |             |
| DATA_END   |           | false    |                        |             |

#### Request example

`curl"https://api.huobi.pro/v2/account/deposit/address?currency=btc"`

#### Response Example

##### Success Example

{

"code":

200

"data":\[

0:{

"userId":

12345678

"currency":

"btc"

"address":

"0xd476b0d77583fbda5180039f1f513b750cb4f527"

"addressTag":

""

"chain":

"hbtc"

}

1:{

"userId":

12345678

"currency":

"btc"

"address":

"16egzDeZiVDJ4D44UbWKN6snLYFjS1aEmJ"

"addressTag":

""

"chain":

"btc"

}

2:{

"userId":

12345678

"currency":

"btc"

"address":

"0xd476b0d77583fbda5180039f1f513b750cb4f527"

"addressTag":

""

"chain":

"hrc20btc"

}

\]

}
