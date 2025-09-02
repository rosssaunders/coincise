# Individual Order Inquiry

##

Request Parameters

[](#request-parameters)

| Field Name | Description                         | Type   |
| ---------- | ----------------------------------- | ------ |
| uuid       | Order UUID                          | String |
| identifier | User Designated Value for Inquiries | String |

> 🚧
>
> Either the `uuid` or `identifier` must be included.

##

Response

[](#response)

> 📘
>
> ###
>
> New order type & options
>
> [](#new-order-type--options)
>
> We support the `best` order type as well as the `ioc` (Immediate or Cancel)
> and `fok` (Fill or Kill) functions.
>
> - The `best` order type is added to the `ord_type` field.
> - The `time_in_force` field is added. (Type: `ioc` and `fok`)

| Field Name        | Description                                                                                                                                        | Type          |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| uuid              | Unique Order ID                                                                                                                                    | String        |
| side              | Order Type                                                                                                                                         | String        |
| ord_type          | Order Method                                                                                                                                       | String        |
| price             | Currency Price at the Time of Order                                                                                                                | NumberString  |
| state             | Order Statuswait : waiting for orders to be completedwatch : wait for stop-limit ordersdone : completed ordercancel : cancel order                 | String        |
| market            | Market Unique Key                                                                                                                                  | String        |
| created_at        | Order Created Time                                                                                                                                 | DateString    |
| volume            | User Input Order Volume                                                                                                                            | NumberString  |
| remaining_volume  | Remaining Order Volume after trading                                                                                                               | NumberString  |
| reserved_fee      | Ratio Reserved as Fees                                                                                                                             | NumberString  |
| remaining_fee     | Remaining Fees                                                                                                                                     | NumberString  |
| paid_fee          | Used Fees                                                                                                                                          | NumberString  |
| locked            | Ratio being used in Transactions                                                                                                                   | NumberString  |
| executed_volume   | Traded Volume                                                                                                                                      | NumberString  |
| trades_count      | The number of Transactions in the order                                                                                                            | Integer       |
| trades            | Transaction                                                                                                                                        | Array[Object] |
| trades.market     | Market Unique Key                                                                                                                                  | String        |
| trades.uuid       | Unique Transaction ID                                                                                                                              | String        |
| trades.price      | Traded Price                                                                                                                                       | NumberString  |
| trades.volume     | Traded Volume                                                                                                                                      | NumberString  |
| trades.funds      | Total Traded Price                                                                                                                                 | NumberString  |
| trades.side       | Traded Type                                                                                                                                        | String        |
| trades.created_at | Traded Time                                                                                                                                        | DateString    |
| time_in_force     | IOC, FOK, Post Only settings                                                                                                                       | String        |
| identifier        | User custom value for query\*Provided only for orders created after October 18, 2024                                                               | String        |
| smp_type          | SMP (Self-Match Prevention) Type                                                                                                                   | String        |
| prevented_volume  | Total cancelled volume by SMP                                                                                                                      | NumberString  |
| prevented_locked  | (Buy) The amount canceled due to the Self-Match Prevention (SMP) setting.(Sell) The volume canceled due to the Self-Match Prevention (SMP) setting | NumberString  |

# 200

## Query Parameters

| Parameter     | Type   | Required | Description                         |
| ------------- | ------ | -------- | ----------------------------------- |
| uuid          | string | No       | Order UUID                          |
| identifier    | string | No       | User Designated Value for Inquiries |
| Authorization | string | Yes      | Authorization token (JWT)           |
| price         | string | No       | state                               |
| market        | string | No       | created_at                          |
| volume        | string | No       | remaining_volume                    |
| locked        | string | No       | executed_volume                     |
| trades        | object | No       | market                              |
| error         | object | No       | name                                |
| message       | string | No       | Updated 3 months ago                |

200

object

string

ord_type

string

string

string

string

reserved_fee

string

remaining_fee

string

paid_fee

string

string

trades_count

integer

Defaults to 0

prevented_volume

string

prevented_locked

string

trades

array of objects

string

string

string

side

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

    uuid: '9ca023a5-851b-4fec-9f0a-48cd83c2eaae'

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

    url: server\_url + "/v1/order?" + query,

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
> [individual-order-inquiry](https://global-docs.upbit.com/reference/individual-order-inquiry)
