# Available Order Information

##

Request Parameters

[](#request-parameters)

| Field Name | Description | Type   |
| ---------- | ----------- | ------ |
| market \*  | Market ID   | String |

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
> New order methods have been added to the '**ask_types**' and '**bid_types**'
> fields.
>
> - **ask_types**: `best_fok`, `best_ioc`, `limit_fok`, `limit_ioc`
> - **bid_types**: `best_fok`, `best_ioc`, `limit_fok`, `limit_ioc`

> 🚧
>
> The `market.order_types` field is deprecated. Kindly use the `ask_types` and
> ` bid_types` fields to request an order.

| Field Name                         | Description                                                              | Type          |
| ---------------------------------- | ------------------------------------------------------------------------ | ------------- |
| bid_fee                            | Buying Fee Ratio                                                         | NumberString  |
| ask_fee                            | Selling Fee Ratio                                                        | NumberString  |
| maker_bid_fee                      | Maker fee rate for buy orders                                            | NumberString  |
| maker_ask_fee                      | Maker fee rate for sell orders                                           | NumberString  |
| market                             | Market                                                                   | Object        |
| market.id                          | Market Unique Key                                                        | String        |
| market.name                        | Market Name                                                              | String        |
| market.order_types                 | Support Order Method (deprecated)                                        | Array[String] |
| market.ask_types                   | Sell Order Support Method                                                | Array[String] |
| market.bid_types                   | Buy Order Support Method                                                 | Array[String] |
| market.order_sides                 | Support Order Type                                                       | Array[String] |
| market.bid                         | Buying Restrictions                                                      | Object        |
| market.bid.currency                | Capitalized English Code referring to Currency                           | String        |
| market.bid.price_unit              | Order Amount Unit (deprecated)                                           | String        |
| market.bid.min_total               | Minimum order amount for buying (in quote currency, e.g., SGD, THB, IDR) | NumberString  |
| market.ask                         | Sell Restrictions                                                        | Object        |
| market.ask.currency                | Capitalized English Code referring to Currency                           | String        |
| market.ask.price_unit              | Order Amount Unit (deprecated)                                           | String        |
| market.ask.min_total               | Minimum order amount for selling (in quote currency, e.g.,SGD, THB, IDR) | NumberString  |
| market.max_total                   | Minimum Buying/Selling Amount                                            | NumberString  |
| market.state                       | Market Operation Status                                                  | String        |
| bid_account                        | Account Status of the Currency used for buying                           | Object        |
| bid_account.currency               | Capitalized English Code referring to Currency                           | NumberString  |
| bid_account.balance                | Orderable Amount/Quantity                                                | NumberString  |
| bid_account.locked                 | Order Tied Amount/Quantity                                               | NumberString  |
| bid_account.avg_buy_price          | Average Buying Price                                                     | Boolean       |
| bid_account.avg_buy_price_modified | Average Buying Price Revision Y/N                                        | String        |
| bid_account.unit_currency          | Average Unit Price Standard Currency                                     | Object        |
| ask_account                        | Account Status of the Currency used for selling                          | Object        |
| ask_account.currency               | Capitalized English Code referring to Currency                           | String        |
| ask_account.balance                | Orderable Amount/Quantity                                                | NumberString  |
| ask_account.locked                 | Order Tied Amount/Quantity                                               | NumberString  |
| ask_account.avg_buy_price          | Average Buying Price                                                     | NumberString  |
| ask_account.avg_buy_price_modified | Average Buying Price Revision Y/N                                        | Boolean       |
| ask_account.unit_currency          | Average Unit Price Standard Currency                                     | String        |

# 200

## Query Parameters

| Parameter     | Type   | Required | Description               |
| ------------- | ------ | -------- | ------------------------- |
| market        | string | Yes      | Market ID                 |
| Authorization | string | Yes      | Authorization token (JWT) |
| name          | string | No       | order_types               |
| bid           | object | No       | bid object                |
| ask           | object | No       | ask object                |
| state         | string | No       | bid_account               |
| currency      | string | No       | balance                   |
| locked        | string | No       | avg_buy_price             |
| error         | object | No       | name                      |
| message       | string | No       | Updated about 1 month ago |

200

object

bid_fee

string

ask_fee

string

maker_bid_fee

string

maker_ask_fee

string

string

array of strings

order_types

order_sides

array of strings

order_sides

bid_types

array of strings

bid_types

ask_types

array of strings

ask_types

max_total

string

object

string

string

avg_buy_price_modified

boolean

Defaults to true

unit_currency

string

ask_account

object

string

string

avg_buy_price_modified

boolean

Defaults to true

unit_currency

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

    market: 'SGD-BTC'

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

    url: server\_url + "/v1/orders/chance?" + query,

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

"bid_fee": "0.0025",

3

"ask_fee": "0.0025",

4

"maker_bid_fee": "0.0025",

5

"maker_ask_fee": "0.0025",

6

"market": {

7

    "id": "SGD-BTC",

8

    "name": "BTC/SGD",

9

    "order\_types": \[

10

      "limit"

11

    \],

12

    "order\_sides": \[

13

      "ask",

14

      "bid"

15

    \],

16

    "bid\_types": \[

17

      "best\_fok",

18

      "best\_ioc",

19

      "limit",

20

      "limit\_fok",

21

      "limit\_ioc",

22

      "price"

23

    \],

24

    "ask\_types": \[

25

      "best\_fok",

26

      "best\_ioc",

27

      "limit",

28

      "limit\_fok",

29

      "limit\_ioc",

30

      "market"

31

    \],

32

    "bid": {

33

      "currency": "SGD",

34

      "min\_total": "1"

35

    },

36

    "ask": {

37

      "currency": "BTC",

38

      "min\_total": "1"

39

    },

40

    "max\_total": "1000000",

41

    "state": "active"

42

},

43

"bid_account": {

44

    "currency": "SGD",

45

    "balance": "0",

46

    "locked": "0",

47

    "avg\_buy\_price": "0",

48

    "avg\_buy\_price\_modified": true,

49

    "unit\_currency": "SGD"

50

},

51

"ask_account": {

52

    "currency": "BTC",

53

    "balance": "0",

54

    "locked": "0",

55

    "avg\_buy\_price": "0",

56

    "avg\_buy\_price\_modified": false,

57

    "unit\_currency": "SGD"

58

}

59

}

Updated about 1 month ago

---

> **Source:**
> [available-order-information](https://global-docs.upbit.com/reference/available-order-information)
