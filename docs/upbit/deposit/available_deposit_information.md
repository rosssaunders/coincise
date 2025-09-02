# Available Deposit Information

##

Request Parameters

[](#request-parameters)

| Field Name | Description                                                           | Type   |
| ---------- | --------------------------------------------------------------------- | ------ |
| currency   | Deposit currency                                                      | String |
| net_type   | Deposit network typeFor more information see the Deposit list inquiry | String |

##

Response

[](#response)

| 필드                          | 설명                                                                                                                                                                 | 타입    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| currency                      | Currency Symbol                                                                                                                                                      | String  |
| net_type                      | Currency Network                                                                                                                                                     | String  |
| is_deposit_possible           | Deposit Support Y/N                                                                                                                                                  | Boolean |
| deposit_impossible_reason     | Reason for Deposit Unavailability                                                                                                                                    | String  |
| minimum_deposit_amount        | Minimum Deposit Amount※ If you deposit an amount less than the minimum deposit amount, it will not be reflected in your balance, and the deposit cannot be canceled. | Decimal |
| minimum_deposit_confirmations | Minimum Number of Deposit Confirmations                                                                                                                              | Int     |
| decimal_precision             | Deposit Decimal Places                                                                                                                                               | Int     |

> ❗️
>
> ###
>
> The information on digital asset deposit status may differ from the actual
> service status.
>
> [](#the-information-on-digital-asset-deposit-status-may-differ-from-the-actual-service-status)
>
> Please note that the deposit status information provided by the digital asset
> deposit information retrieval **API may be delayed by several minutes compared
> to the actual service status**. It is intended for reference purposes only,
> and **should not be used as part of any trading strategy.**
>
> Before making any deposits, please check the **Upbit Support Center** and the
> **Wallet Status** page.
> ([Upbit Singapore](https://sg.upbit.com/service_center/wallet_status) |
> [Upbit Indonesia](https://id.upbit.com/service_center/wallet_status) |
> [Upbit Thailand](https://th.upbit.com/service_center/wallet_status))

net_type

string

Currency Network

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| currency      | string | No       | Currency Symbol           |
| Authorization | string | Yes      | Authorization token (JWT) |
| error         | object | No       | name                      |
| message       | string | No       | Updated 3 months ago      |

200

object

string

is_deposit_possible

boolean

Defaults to true

deposit_impossible_reason

string

minimum_deposit_amount

integer

Defaults to 0

minimum_deposit_confirmations

integer

Defaults to 0

decimal_precision

integer

Defaults to 0

# 400

400

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

    currency: 'BTC',

13

    net\_type: 'BTC'

14

}

15

​

16

const query \= queryEncode(body)

17

​

18

const hash \= crypto.createHash('sha512')

19

const queryHash \= hash.update(query, 'utf-8').digest('hex')

20

​

21

const payload \= {

22

    access\_key: access\_key,

23

    nonce: uuidv4(),

24

    query\_hash: queryHash,

25

    query\_hash\_alg: 'SHA512',

26

}

27

​

28

const token \= sign(payload, secret_key)

29

​

30

const options \= {

31

    method: "GET",

32

    url: server\_url + "/v1/deposits/chance/coin?" + query,

33

    headers: {Authorization: \`Bearer \${token}\`},

34

    json: body

35

}

36

​

37

request(options, (error, response, body) \=> {

38

    if (error) throw new Error(error)

39

    console.log(body)

40

})

xxxxxxxxxx

1

{

2

"currency": "BTC",

3

"net_type": "BTC",

4

"is_deposit_possible": false,

5

"deposit_impossible_reason": "네트워크 업그레이드로 인한 입출금 일시중단",

6

"minimum_deposit_amount": 0,

7

"minimum_deposit_confirmations": 1,

8

"decimal_precision": 8

9

}

Updated 3 months ago

---

> **Source:**
> [available-deposit-information](https://global-docs.upbit.com/reference/available-deposit-information)
