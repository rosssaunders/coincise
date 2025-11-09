# Book

# Book

get https://api-pub.bitfinex.com/v2/book/{symbol}/{precision}

The Public Books endpoint allows you to keep track of the state of Bitfinex
order books on a price aggregated basis with customizable precision. Raw books
can be retrieved by using precision R0.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields (Books)

[](#response-fields-books)

####

For trading pair symbols (ex. tBTCUSD)

[](#for-trading-pair-symbols-ex-tbtcusd)

| Index | Field  | Type  | Description                                                                  |
| ----- | ------ | ----- | ---------------------------------------------------------------------------- |
| \[0\] | PRICE  | float | Price level                                                                  |
| \[1\] | COUNT  | int   | Number of orders at that price level                                         |
| \[2\] | AMOUNT | float | Total amount available at that price level (if AMOUNT > 0 then bid else ask) |

####

For funding currency symbols (ex. fUSD)

[](#for-funding-currency-symbols-ex-fusd)

| Index | Field  | Type  | Description                                                                  |
| ----- | ------ | ----- | ---------------------------------------------------------------------------- |
| \[0\] | RATE   | float | Rate level                                                                   |
| \[1\] | PERIOD | int   | Period level                                                                 |
| \[2\] | COUNT  | int   | Number of orders at that price level                                         |
| \[3\] | AMOUNT | float | Total amount available at that price level (if AMOUNT > 0 then ask else bid) |

###

Response Fields (Raw Books)

[](#response-fields-raw-books)

####

For trading pair symbols (ex. tBTCUSD)

[](#for-trading-pair-symbols-ex-tbtcusd-1)

| Index | Field    | Type  | Description                                                                  |
| ----- | -------- | ----- | ---------------------------------------------------------------------------- |
| \[0\] | ORDER_ID | int   | Order ID                                                                     |
| \[1\] | PRICE    | float | Price level                                                                  |
| \[2\] | AMOUNT   | float | Total amount available at that price level (if AMOUNT > 0 then bid else ask) |

####

For funding currency symbols (ex. fUSD)

[](#for-funding-currency-symbols-ex-fusd-1)

| Index | Field    | Type  | Description                                                                  |
| ----- | -------- | ----- | ---------------------------------------------------------------------------- |
| \[0\] | OFFER_ID | int   | Offer ID                                                                     |
| \[1\] | PERIOD   | int   | Period level                                                                 |
| \[2\] | RATE     | float | Rate level                                                                   |
| \[3\] | AMOUNT   | float | Total amount available at that price level (if AMOUNT > 0 then ask else bid) |

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">240 reqs/min (requests per minute)</td></tr></tbody></table>

Path Params

symbol

string

required

Defaults to tBTCUSD

The symbol you want information about. (e.g. tBTCUSD, tETHUSD, fUSD, fBTC)

precision

string

required

Defaults to P0

Level of price aggregation (P0, P1, P2, P3, P4 and R0).

Query Params

len

int32

Defaults to 25

Number of price points ("1", "25", "100").

Responses

#

200

200

Response body

json

#

500

500

Response body

array

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://api-pub.bitfinex.com/v2/book/tBTCUSD/P0?len=25' \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result (Books)200 - Result (Raw Books)500 - Result

Updated 5 months ago

---

---

Section: General Source: https://docs.bitfinex.com/reference/rest-public-book
Path: /v2/book/tBTCUSD/P0?len=25 Method: GET
