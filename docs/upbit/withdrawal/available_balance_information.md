# Available Balance Information

##

Response

[](#response)

| Field Name                          | Description                                                                                                                                                                                                                             | Type          |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| member_level                        | User Security Level Information                                                                                                                                                                                                         | Object        |
| member_level.security_level         | User Security Level                                                                                                                                                                                                                     | Integer       |
| member_level.fee_level              | User Fee Level                                                                                                                                                                                                                          | Integer       |
| member_level.email_verified         | User E-mail Authentication Y/N                                                                                                                                                                                                          | Boolean       |
| member_level.identity_auth_verified | User Real Name Verification Y/N                                                                                                                                                                                                         | Boolean       |
| member_level.bank_account_verified  | User Account Verification Y/N                                                                                                                                                                                                           | Boolean       |
| member_level.locked                 | User Account Protection Status                                                                                                                                                                                                          | Boolean       |
| member_level.wallet_locked          | User Withdrawal Protection Status                                                                                                                                                                                                       | Boolean       |
| currency                            | Currency Information                                                                                                                                                                                                                    | Object        |
| currency.code                       | Capitalized English Code referring to Currency                                                                                                                                                                                          | String        |
| currency.withdraw_fee               | Currency Withdrawal Fee                                                                                                                                                                                                                 | NumberString  |
| currency.is_coin                    | Currency digital asset Y/N                                                                                                                                                                                                              | Boolean       |
| currency.wallet_state               | Wallet Status of the currencyIndicates whether deposits and withdrawals are supported. To check the current availability of deposits and withdrawals, please refer to the currency.wallet_support field below.                          | String        |
| currency.wallet_support             | Currency deposit and withdrawal availabilityIf deposits are allowed, 'deposit' will be included; if withdrawals are allowed, 'withdraw' will be included. An empty list indicates that both deposits and withdrawals are not available. | Array[String] |
| account                             | User Account Information                                                                                                                                                                                                                | Object        |
| account.currency                    | Capitalized English Code referring to Currency                                                                                                                                                                                          | String        |
| account.balance                     | Orderable Amount/Quantity                                                                                                                                                                                                               | NumberString  |
| account.locked                      | Order Tied Amount/Quantity                                                                                                                                                                                                              | NumberString  |
| account.avg_buy_price               | Average Buying Price                                                                                                                                                                                                                    | NumberString  |
| account.avg_buy_price_modified      | Average Buying Price Revision Y/N                                                                                                                                                                                                       | Boolean       |
| account.unit_currency               | Average Unit Price Standard Currency                                                                                                                                                                                                    | String        |
| withdraw_limit                      | Withdrawal Restriction Information                                                                                                                                                                                                      | Object        |
| withdraw_limit.currency             | Capitalized English Code referring to Currency                                                                                                                                                                                          | String        |
| withdraw_limit.minimum              | Minimum Withdrawal Amount/Quantity                                                                                                                                                                                                      | NumberString  |
| withdraw_limit.onetime              | Single transaction Withdrawal Limit                                                                                                                                                                                                     | NumberString  |
| withdraw_limit.daily                | Daily Withdrawal Limit                                                                                                                                                                                                                  | NumberString  |
| withdraw_limit.remaining_daily      | Remaining Daily Withdrawal Limit                                                                                                                                                                                                        | NumberString  |
| withdraw_limit.remaining_daily_krw  | Total Remaining Daily Withdrawal Limit                                                                                                                                                                                                  | NumberString  |
| withdraw_limit.fixed                | Number of Decimal Points for Withdrawal Amount/Quantity                                                                                                                                                                                 | Integer       |
| withdraw_limit.can_withdraw         | Withdrawal support statusIndicates whether withdrawals for the asset are supported. To check the current availability of withdrawals, please verify the presence of 'withdraw' in the currency.wallet_support field.                    | Boolean       |

net_type

string

required

Currency Network

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| currency      | string | Yes      | Currency symbol           |
| Authorization | string | Yes      | Authorization token (JWT) |
| error         | object | No       | name                      |
| message       | string | No       | Updated 2 months ago      |

200

json

# 4XX

4XX

object

string

---

NodePythonRubyJava

xxxxxxxxxx

1

const request \= require('request')

2

const uuidv4 \= require("uuid/v4")

3

const crypto \= require('crypto')

4

const sign \= require('jsonwebtoken').sign

5

const queryEncode \= require("querystring").encode

6

​

7

const access_key \= process.env.UPBIT_OPEN_API_ACCESS_KEY

8

const secret_key \= process.env.UPBIT_OPEN_API_SECRET_KEY

9

const server_url \= process.env.UPBIT_OPEN_API_SERVER_URL

10

​

11

const body \= {

12

    currency: 'BTC'

13

}

14

​

15

const query \= queryEncode(body)

16

​

17

const hash \= crypto.createHash('sha512')

18

const queryHash \= hash.update(query, 'utf-8').digest('hex')

19

​

20

const payload \= {

21

    access\_key: access\_key,

22

    nonce: uuidv4(),

23

    query\_hash: queryHash,

24

    query\_hash\_alg: 'SHA512',

25

}

26

​

27

const token \= sign(payload, secret_key)

28

​

29

const options \= {

30

    method: "GET",

31

    url: server\_url + "/v1/withdraws/chance?" + query,

32

    headers: {Authorization: \`Bearer \${token}\`},

33

    json: body

34

}

35

​

36

request(options, (error, response, body) \=> {

37

    if (error) throw new Error(error)

38

    console.log(body)

39

})

xxxxxxxxxx

1

{

2

"member_level": {

3

    "security\_level": 3,

4

    "fee\_level": 0,

5

    "email\_verified": true,

6

    "identity\_auth\_verified": true,

7

    "bank\_account\_verified": true,

8

    "locked": false,

9

    "wallet\_locked": false

10

},

11

"currency": {

12

    "code": "BTC",

13

    "withdraw\_fee": "0.0005",

14

    "is\_coin": true,

15

    "wallet\_state": "working",

16

    "wallet\_support": \[

17

      "deposit",

18

      "withdraw"

19

    \]

20

},

21

"account": {

22

    "currency": "BTC",

23

    "balance": "10.0",

24

    "locked": "0.0",

25

    "avg\_buy\_price": "8042000",

26

    "avg\_buy\_price\_modified": false,

27

    "unit\_currency": "SGD",

28

},

29

"withdraw_limit": {

30

    "currency": "BTC",

31

    "minimum": null,

32

    "onetime": null,

33

    "daily": "10.0",

34

    "remaining\_daily": "10.0",

35

    "remaining\_daily\_sgd": "0.0",

36

    "fixed": null,

37

    "can\_withdraw": true

38

}

39

}

Updated 2 months ago

---

> **Source:**
> [available-balance-information](https://global-docs.upbit.com/reference/available-balance-information)
