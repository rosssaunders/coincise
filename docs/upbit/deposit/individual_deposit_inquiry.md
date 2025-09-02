# Individual Deposit Inquiry

##

Request Parameters

[](#request-parameters)

| Field Name | Description     | Type   |
| ---------- | --------------- | ------ |
| uuid       | Deposit UUID    | String |
| txid       | Deposit TXID    | String |
| currency   | Currency Symbol | String |

##

Response

[](#response)

| Field Name       | Description                                                                                    | Type         |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------ |
| type             | Deposit Type                                                                                   | String       |
| uuid             | Unique ID for Deposits                                                                         | String       |
| currency         | Currency Symbol                                                                                | String       |
| net_type         | Currency Network                                                                               | String       |
| txid             | Transaction ID for Deposits                                                                    | String       |
| state            | Deposit StatusPROCESSINGACCEPTEDREJECTEDWARNINGCANCELLEDTRAVEL_RULE_SUSPECTEDREFUNDINGREFUNDED | String       |
| created_at       | Deposit Generation Time                                                                        | DateString   |
| done_at          | Deposit Completion Time                                                                        | DateString   |
| amount           | Deposit Amount                                                                                 | NumberString |
| fee              | Deposit Fee                                                                                    | NumberString |
| transaction_type | Deposit Typedefault : Depositinternal : Lightning Deposit                                      | String       |

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| uuid          | string | No       | Individual Deposit UUID   |
| txid          | string | No       | Deposit Type              |
| currency      | string | No       | Currency Symbol           |
| Authorization | string | Yes      | Authorization token (JWT) |
| type          | string | No       | uuid                      |
| state         | string | No       | created_at                |
| amount        | string | No       | fee                       |
| error         | object | No       | name                      |
| message       | string | No       | Updated 3 months ago      |

200

object

string

string

string

done_at

string

string

transaction_type

string

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

    uuid: '94332e99-3a87-4a35-ad98-28b0c969f830'

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

    url: server\_url + "/v1/deposit?" + query,

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

Updated 3 months ago

---

> **Source:**
> [individual-deposit-inquiry](https://global-docs.upbit.com/reference/individual-deposit-inquiry)
