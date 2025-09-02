# Individual Withdrawal Inquiry

##

Request Parameters

[](#request-parameters)

| Field Name | Description     | Type   |
| ---------- | --------------- | ------ |
| uuid       | Withdrawal UUID | String |
| txid       | Withdrawal TXID | String |
| currency   | Currency Symbol | String |

##

Response

[](#response)

| Field Name       | Description                                                        | Type         |
| ---------------- | ------------------------------------------------------------------ | ------------ |
| type             | Withdrawal Type                                                    | String       |
| uuid             | Unique ID for Withdrawal                                           | String       |
| currency         | Currency Symbol                                                    | String       |
| net_type         | Currency Network                                                   | String       |
| txid             | Transaction ID for Withdrawal                                      | String       |
| state            | Withdrawal StatusWAITINGPROCESSINGDONEREJECTEDCANCELLEDFAILED      | String       |
| created_at       | Generation Time                                                    | DateString   |
| done_at          | Completion Time                                                    | DateString   |
| amount           | Withdrawal Quantity                                                | NumberString |
| fee              | Withdrawal Fees                                                    | NumberString |
| transaction_type | Withdrawal Typedefault : Withdrawalinternal : Lightning Withdrawal | String       |
| is_cancelable    | Cancelable Withdrawal (Y/N)                                        | Boolean      |

# 200

## Query Parameters

| Parameter     | Type   | Required | Description          |
| ------------- | ------ | -------- | -------------------- |
| uuid          | string | No       | Withdrawal UUID      |
| txid          | string | No       | Withdrawal TXID      |
| currency      | string | No       | Currency Symbol      |
| Authorization | string | Yes      | Authorization (JWT)  |
| type          | string | No       | uuid                 |
| amount        | string | No       | fee                  |
| error         | object | No       | name                 |
| message       | string | No       | Updated 3 months ago |

200

object

string

string

string

created_at

string

done_at

string

string

transaction_type

string

is_cancelable

boolean

Defaults to true

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

    uuid: '00000000-0000-0000-0000-000000000000'

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

    url: server\_url + "/v1/withdraw?" + query,

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

"type": "withdraw",

3

"uuid": "00000000-0000-0000-0000-000000000000",

4

"currency": "BTC",

5

"net_type": "BTC",

6

"txid": null,

7

"state": "PROCESSING",

8

"created_at": "2018-04-13T11:24:01+09:00",

9

"done_at": null,

10

"amount": "0.01",

11

"fee": "0.0",

12

"transaction_type": "default",

13

"is_cancelable": true

14

}

Updated 3 months ago

---

> **Source:**
> [individual-withdrawal-inquiry](https://global-docs.upbit.com/reference/individual-withdrawal-inquiry)
