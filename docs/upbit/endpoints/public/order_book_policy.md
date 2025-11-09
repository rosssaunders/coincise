# Order Book Policy

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Revision History

| Version | Date       | Changes                                                                                                         |
| ------- | ---------- | --------------------------------------------------------------------------------------------------------------- |
| v1.2.2  | 2025-07-31 | [Addition of `List Orderbook Instruments` API](https://global-docs.upbit.com/changelog/orderbook-instruments#/) |

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and
request counts are shared within the exchange 'orderbook' group.

markets

string

required

List of trading pairs to query.  
For multiple pairs, specify them as a comma-separated string.

\[Example\] SGD-BTC,SGD-ETH

#

200

List of orderbook instruments

array of objects

object

market

string

required

Trading pair code representing the market.

quote_currency

string

required

Quote currency code of the pair

tick_size

string

required

Price unit applied to the orderbook level

#

400

error object

object

error

object

name

number

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

#

404

error object

object

error

object

name

number

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

Updated about 1 month ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/orderbook/instruments

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://region-api.upbit.com/v1/orderbook/instruments \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

12

1

\[

2

{

3

    "market": "SGD-BTC",

4

    "quote\_currency": "SGD",

5

    "tick\_size": "1"

6

},

7

{

8

    "market": "SGD-ETH",

9

    "quote\_currency": "SGD",

10

    "tick\_size": "1"

11

}

12

\]

Updated about 1 month ago

---

---

**Source:**
[order-book-policy](https://global-docs.upbit.com/reference/order-book-policy)
