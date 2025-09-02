# Deposit Address Generation

##

Request Parameters

[](#request-parameters)

| Field Name  | Description      | Type   |
| ----------- | ---------------- | ------ |
| currency \* | Currency Symbol  | String |
| net_type \* | Currency Network | String |

##

Response1

[](#response1)

| Field Name | Description         | Type    |
| ---------- | ------------------- | ------- |
| success    | Request Success Y/N | Boolean |
| message    | Result Message      | String  |

##

Response2

[](#response2)

| Field Name        | Description               | Type   |
| ----------------- | ------------------------- | ------ |
| currency          | Currency Symbol           | String |
| net_type          | Currency Network          | String |
| deposit_address   | Deposit Address           | String |
| secondary_address | Secondary Deposit Address | String |

> 📘
>
> ###
>
> Deposit Address Generation Request API precaution
>
> [](#deposit-address-generation-request-api-precaution)
>
> Deposit Address Generation occurs asynchronously in the server.
>
> Due to the asynchronous generation characteristics, the deposit address may
> not be issued simultaneously with the request.
>
> Upon an Address Issuance Request, the result will be returned as Response 1
> and it will be returned as Response1 until the address issue is complete.
>
> After the address is issued, you will not get a new address but your current
> issued address will be transitioned into a Response 2.
>
> If the address is not generated normally, please call the API again after a
> certain time.

net_type

string

required

Currency Network

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| currency      | string | Yes      | Currency Symbol           |
| Authorization | string | Yes      | Authorization token (JWT) |
| error         | object | No       | name                      |
| message       | string | No       | Updated 3 months ago      |

200

object

message

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

    method: "POST",

32

    url: server\_url + "/v1/deposits/generate\_coin\_address",

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

"success": true,

3

"message": "Generating a BTC deposit address."

4

}

Updated 3 months ago

---

> **Source:**
> [deposit-address-generation](https://global-docs.upbit.com/reference/deposit-address-generation)
