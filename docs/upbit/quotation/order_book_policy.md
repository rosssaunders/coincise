# Order Book Policy

##

Request Parameters

[](#request-parameters)

| Field Name | Description                                          | Type   |
| ---------- | ---------------------------------------------------- | ------ |
| markets\*  | Comma separated Market ID list (ex. IDR-BTC,BTC-XRP) | String |

##

Response

[](#response)

| Field Name     | Description                                        | Type   |
| -------------- | -------------------------------------------------- | ------ |
| market         | Market ID                                          | String |
| quote_currency | Quote currency code (ex. IDR, THB, SGD, BTC, USDT) | String |
| tick_size      | Tick size                                          | String |

markets

array of strings

required

Comma separated Market ID list (ex. IDR-BTC,BTC-XRP)

markets\*

ADD string

# 200

OK

json

Updated about 1 month ago

---

ShellPythonNode

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://exchange-region-endpoint-url.com/v1/orderbook/instruments?markets=IDR-XRP&markets=BTC-XRP&markets=USDT-XRP' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

1

\[

2

{

3

    "market": "IDR-XRP",

4

    "quote\_currency": "IDR",

5

    "tick\_size": "50"

6

},

7

{

8

    "market": "BTC-XRP",

9

    "quote\_currency": "BTC",

10

    "tick\_size": "0.00000001"

11

},

12

{

13

    "market": "USDT-XRP",

14

    "quote\_currency": "USDT",

15

    "tick\_size": "0.001"

16

}

17

\]

Updated about 1 month ago

---

> **Source:**
> [order-book-policy](https://global-docs.upbit.com/reference/order-book-policy)
