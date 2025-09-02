# Withdrawal List Inquiry

##

Request Parameters

[](#request-parameters)

| Field Name | Description                                                   | Type          |
| ---------- | ------------------------------------------------------------- | ------------- |
| currency   | Currency Symbol                                               | String        |
| state      | Withdrawal StatusWAITINGPROCESSINGDONEREJECTEDCANCELLEDFAILED | String        |
| uuids[]    | Withdrawal UUID List                                          | Array<String> |
| txids[]    | Withdrawal TXID List                                          | Array<String> |
| limit      | Quantity Limit (default: 100, max: 100)                       | Number        |
| page       | Number of Pages, default: 1                                   | Number        |
| order_by   | Sortingasc : Ascendingdesc : Descending (default)             | String        |

##

Response

[](#response)

| Field Name       | Description                                                        | Type         |
| ---------------- | ------------------------------------------------------------------ | ------------ |
| type             | Withdrawal Type                                                    | String       |
| uuid             | Withdrawal Unique ID                                               | String       |
| currency         | Currency Symbol                                                    | String       |
| net_type         | Currency Network                                                   | String       |
| txid             | Withdrawal Transaction ID                                          | String       |
| state            | Withdrawal StatusWAITINGPROCESSINGDONEREJECTEDCANCELLEDFAILED      | String       |
| created_at       | Withdrawal Generation Time                                         | DateString   |
| done_at          | Withdrawal Completion Time                                         | DateString   |
| amount           | Withdrawable Amount/Quantity                                       | NumberString |
| fee              | Withdrawal Fee                                                     | NumberString |
| transaction_type | Withdrawal Typedefault : Withdrawalinternal : Lightning Withdrawal | String       |
| is_cancelable    | Cancelable Withdrawal (Y/N)                                        | Boolean      |

uuids\[\]

array of strings

Withdrawal UUID List

uuids\[\]

ADD string

txids\[\]

array of strings

Withdrawal TXID List

txids\[\]

ADD string

Quantity Limit

Number of Pages

order_by

string

Defaults to desc

Sorting

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| currency      | string | No       | Currency Symbol           |
| state         | string | No       | Withdrawal Status         |
| Authorization | string | Yes      | Authorization token (JWT) |
| error         | object | No       | name                      |
| message       | string | No       | Updated 3 months ago      |

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

const currency \= 'XRP'

12

const state \= 'DONE'

13

const txids \= \[

14

    '98c15999f0bdc4ae0e8a-ed35868bb0c204fe6ec29e4058a3451e-88636d1040f4baddf943274ce37cf9cc',

15

    // ...

16

\]

17

​

18

const non_array_body \= {

19

    currency: currency,

20

    state: state,

21

}

22

const array_body \= {

23

    txids: txids,

24

}

25

const body \= {

26

    ...non\_array\_body,

27

    ...array\_body

28

}

29

​

30

const txid_query \= txids.map(txid \=> \`txids\[\]=\${txid}\`).join('&')

31

const query \= queryEncode(non_array_body) + '&' + txid_query

32

​

33

const hash \= crypto.createHash('sha512')

34

const queryHash \= hash.update(query, 'utf-8').digest('hex')

35

​

36

const payload \= {

37

    access\_key: access\_key,

38

    nonce: uuidv4(),

39

    query\_hash: queryHash,

40

    query\_hash\_alg: 'SHA512',

41

}

42

​

43

const token \= sign(payload, secret_key)

44

​

45

const options \= {

46

    method: "GET",

47

    url: server\_url + "/v1/withdraws?" + query,

48

    headers: {Authorization: \`Bearer \${token}\`},

49

    json: body

50

}

51

​

52

request(options, (error, response, body) \=> {

53

    if (error) throw new Error(error)

54

    console.log(body)

55

})

xxxxxxxxxx

1

\[

2

{

3

    "type": "withdraw",

4

    "uuid": "00000000-0000-0000-0000-000000000000",

5

    "currency": "XRP",

6

    "txid": "98c15999f0bdc4ae0e8a-ed35868bb0c204fe6ec29e4058a3451e-88636d1040f4baddf943274ce37cf9cc",

7

    "state": "DONE",

8

    "created\_at": "2019-02-28T15:17:51+09:00",

9

    "done\_at": "2019-02-28T15:22:12+09:00",

10

    "amount": "1.00",

11

    "fee": "0.0",

12

    "transaction\_type": "default",

13

    "is\_cancelable": false

14

}

15

# ....

16

\]

Updated 3 months ago

---

> **Source:**
> [withdrawal-list-inquiry](https://global-docs.upbit.com/reference/withdrawal-list-inquiry)
