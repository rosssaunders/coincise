# Deposit List Inquiry

##

Request Parameters

[](#request-parameters)

| Field Name | Description                                                                                    | Type          |
| ---------- | ---------------------------------------------------------------------------------------------- | ------------- |
| currency   | Currency Symbol                                                                                | String        |
| state      | Deposit StatusPROCESSINGACCEPTEDREJECTEDWARNINGCANCELLEDTRAVEL_RULE_SUSPECTEDREFUNDINGREFUNDED | String        |
| uuids[]    | Deposit UUID List                                                                              | Array<String> |
| txids[]    | Deposit TXID List                                                                              | Array<String> |
| limit      | Quantity Limit (default: 100, limit: 100)                                                      | Number        |
| page       | Number of Pages, default: 1                                                                    | Number        |
| order_by   | Sortingasc : Ascendingdesc : Descending (default)                                              | String        |

##

Response

[](#response)

| Field Name       | Description                                                                             | Type         |
| ---------------- | --------------------------------------------------------------------------------------- | ------------ |
| type             | Deposit Type                                                                            | String       |
| uuid             | Unique ID for Deposits                                                                  | String       |
| currency         | Currency Symbol                                                                         | String       |
| net_type         | Currency Network                                                                        | String       |
| txid             | Transaction ID for Deposits                                                             | String       |
| state            | Deposit StatusPROCESSINGACCEPTEDCANCELLEDREJECTEDTRAVEL_RULE_SUSPECTEDREFUNDINGREFUNDED | String       |
| created_at       | Deposit Generation Time                                                                 | DateString   |
| done_at          | Deposit Completion Time                                                                 | DateString   |
| amount           | Deposit Amount                                                                          | NumberString |
| fee              | Deposit Fee                                                                             | NumberString |
| transaction_type | Deposit Typedefault : Depositinternal : Lightning Deposit                               | String       |

uuids\[\]

array of strings

Deposit UUID List

uuids\[\]

ADD string

txids\[\]

array of strings

Deposit TXID List

txids\[\]

ADD string

Number of pages

Page Number

order_by

string

Defaults to desc

Sorting Method

# 200

## Query Parameters

| Parameter     | Type   | Required | Description              |
| ------------- | ------ | -------- | ------------------------ |
| currency      | string | No       | Currency Symbol          |
| state         | string | No       | Deposit Status           |
| Authorization | string | Yes      | Authorization token(JWT) |
| error         | object | No       | name                     |
| message       | string | No       | Updated 3 months ago     |

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

const currency \= 'SGD'

12

const txids \= \[

13

    '9e37c537-6849-4c8b-a134-57313f5dfc5a',

14

    // ...

15

\]

16

​

17

const non_array_body \= {

18

    currnecy: currency,

19

}

20

const array_body \= {

21

    txids: txids,

22

}

23

const body \= {

24

    ...non\_array\_body,

25

    ...array\_body

26

}

27

​

28

const txid_query \= txids.map(txid \=> \`txids\[\]=\${txid}\`).join('&')

29

const query \= queryEncode(non_array_body) + '&' + txid_query

30

​

31

const hash \= crypto.createHash('sha512')

32

const queryHash \= hash.update(query, 'utf-8').digest('hex')

33

​

34

const payload \= {

35

    access\_key: access\_key,

36

    nonce: uuidv4(),

37

    query\_hash: queryHash,

38

    query\_hash\_alg: 'SHA512',

39

}

40

​

41

const token \= sign(payload, secret_key)

42

​

43

const options \= {

44

    method: "GET",

45

    url: server\_url + "/v1/deposits?" + query,

46

    headers: {Authorization: \`Bearer \${token}\`},

47

    json: body

48

}

49

​

50

request(options, (error, response, body) \=> {

51

    if (error) throw new Error(error)

52

    console.log(body)

53

})

Updated 3 months ago

---

> **Source:**
> [deposit-list-inquiry](https://global-docs.upbit.com/reference/deposit-list-inquiry)
