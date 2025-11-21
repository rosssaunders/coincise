# Book

get

https://api-pub.bitfinex.com/v2/book/{symbol}/{precision}

The Public Books endpoint allows you to keep track of the state of Bitfinex
order books on a price aggregated basis with customizable precision. Raw books
can be retrieved by using precision R0.

Response Fields (Books)

For trading pair symbols (ex. tBTCUSD)

| Index | Field  | Type  | Description                                                                  |
| ----- | ------ | ----- | ---------------------------------------------------------------------------- |
| [0]   | PRICE  | float | Price level                                                                  |
| [1]   | COUNT  | int   | Number of orders at that price level                                         |
| [2]   | AMOUNT | float | Total amount available at that price level (if AMOUNT > 0 then bid else ask) |

For funding currency symbols (ex. fUSD)

| Index | Field  | Type  | Description                                                                  |
| ----- | ------ | ----- | ---------------------------------------------------------------------------- |
| [0]   | RATE   | float | Rate level                                                                   |
| [1]   | PERIOD | int   | Period level                                                                 |
| [2]   | COUNT  | int   | Number of orders at that price level                                         |
| [3]   | AMOUNT | float | Total amount available at that price level (if AMOUNT > 0 then ask else bid) |

Response Fields (Raw Books)

For trading pair symbols (ex. tBTCUSD)

| Index | Field    | Type  | Description                                                                  |
| ----- | -------- | ----- | ---------------------------------------------------------------------------- |
| [0]   | ORDER_ID | int   | Order ID                                                                     |
| [1]   | PRICE    | float | Price level                                                                  |
| [2]   | AMOUNT   | float | Total amount available at that price level (if AMOUNT > 0 then bid else ask) |

For funding currency symbols (ex. fUSD)

| Index | Field    | Type  | Description                                                                  |
| ----- | -------- | ----- | ---------------------------------------------------------------------------- |
| [0]   | OFFER_ID | int   | Offer ID                                                                     |
| [1]   | PERIOD   | int   | Period level                                                                 |
| [2]   | RATE     | float | Rate level                                                                   |
| [3]   | AMOUNT   | float | Total amount available at that price level (if AMOUNT > 0 then ask else bid) |

---

<table><tbody><tr><td>Rate Limit:</td><td>240 reqs/min (requests per minute)</td></tr></tbody></table>

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

curl \--request GET \\

     \--url 'https://api-pub.bitfinex.com/v2/book/tBTCUSD/P0?len=25' \\

     \--header 'accept: application/json'

---

Section: General Source: https://docs.bitfinex.com/reference/rest-public-book
Path: /v2/book/tBTCUSD/P0?len=25 Method: GET
