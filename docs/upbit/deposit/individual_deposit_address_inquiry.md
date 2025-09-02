# Individual Deposit Address Inquiry

##

Request Parameters

[](#request-parameters)

| Field Name  | Description      | Type   |
| ----------- | ---------------- | ------ |
| currency \* | Currency Symbol  | String |
| net_type \* | Currency Network | String |

##

Response

[](#response)

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
> Deposit Address Inquiry Request API precautions
>
> [](#deposit-address-inquiry-request-api-precautions)
>
> If the deposit address was not generated after the deposit address generation
> request, the deposit_address may be null.

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

string

secondary_address

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

    method: "GET",

32

    url: server\_url + "/v1/deposits/coin\_address?" + query,

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

"deposit_address": "3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD",

4

"secondary_address": null

5

}

Updated 3 months ago

---

> **Source:**
> [individual-deposit-address-inquiry](https://global-docs.upbit.com/reference/individual-deposit-address-inquiry)
