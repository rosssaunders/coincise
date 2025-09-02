# General Deposit Address Inquiry

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
> Deposit Address Inquiry Request API precaution
>
> [](#deposit-address-inquiry-request-api-precaution)
>
> If the deposit address was not generated after the deposit address generation
> request, the deposit_address may be null.

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| Authorization | string | Yes      | Authorization token (JWT) |
| currency      | string | No       | deposit_address           |
| error         | object | No       | name                      |
| message       | string | No       | Updated 3 months ago      |

200

array of objects

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

const sign \= require('jsonwebtoken').sign

4

​

5

const access_key \= process.env.UPBIT_OPEN_API_ACCESS_KEY

6

const secret_key \= process.env.UPBIT_OPEN_API_SECRET_KEY

7

const server_url \= process.env.UPBIT_OPEN_API_SERVER_URL

8

​

9

const payload \= {

10

    access\_key: access\_key,

11

    nonce: uuidv4(),

12

}

13

​

14

const token \= sign(payload, secret_key)

15

​

16

const options \= {

17

    method: "GET",

18

    url: server\_url + "/v1/deposits/coin\_addresses",

19

    headers: {Authorization: \`Bearer \${token}\`},

20

}

21

​

22

request(options, (error, response, body) \=> {

23

    if (error) throw new Error(error)

24

    console.log(body)

25

})

xxxxxxxxxx

1

\[

2

{

3

    "currency": "BTC",

4

    "deposit\_address": "3EusRwybuZUhVDeHL7gh3HSLmbhLcy7NqD",

5

    "secondary\_address": null

6

},

7

{

8

    "currency": "ETH",

9

    "deposit\_address": "0x0d73e0a482b8cf568976d2e8688f4a899d29301c",

10

    "secondary\_address": null

11

},

12

{

13

    "currency": "XRP",

14

    "deposit\_address": "rN9qNpgnBaZwqCg8CvUZRPqCcPPY7wfWep",

15

    "secondary\_address": "3057887915"

16

}

17

\]

Updated 3 months ago

---

> **Source:**
> [general-deposit-address-inquiry](https://global-docs.upbit.com/reference/general-deposit-address-inquiry)
