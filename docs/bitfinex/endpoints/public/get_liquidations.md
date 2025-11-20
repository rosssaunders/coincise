# Liquidations

# Liquidations

get https://api-pub.bitfinex.com/v2/liquidations/hist

Endpoint to retrieve liquidations. By default it will retrieve the most recent
liquidations, but time-specific data can be retrieved using timestamps.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Request Fields

[](#request-fields)

| Index | Field | Type | Description |
| ----- | ----- | ---- | ----------- |

| \[ . . . \]

| | \[1\] | POS_ID | int | Position ID | | \[2\] | MTS | int | Millisecond epoch
timestamp | |

\[ . . . \]

| | \[4\] | SYMBOL | string | Trading pair (e.g. tBTCUSD, ...) | | \[5\] |
AMOUNT | float | Size of the position. Positive values means a long position,
negative values means a short position. | | \[6\] | BASE_PRICE | float | The
price at which user entered the position | |

\[ . . . \]

| | \[8\] | IS_MATCH | int | 0: initial liquidation trigger | 1: market
execution | | \[9\] | IS_MARKET_SOLD | int | 0: position acquired by the system
| 1: direct sell into the market | |

\[ . . . \]

| | \[11\] | PRICE_ACQUIRED | float | The price at which the position has been
acquired |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">3 reqs/min (requests per minute)</td></tr></tbody></table>

[](#query-params)Query Params

sort

int32

+1: sort in ascending order | -1: sort in descending order (by MTS field).

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given
as response.

end

int64

If end is given, only records with MTS <= end (milliseconds) will be given as
response.

limit

int32

Number of records in response (max. 500).

[](#response-schemas)Response

#

200

200

[](#restpublicliquidations-string-response-body)Response body

json

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://api-pub.bitfinex.com/v2/liquidations/hist \\

3

     \--header 'accept: application/json'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result

Updated 5 months ago

---

---

Section: General Source:
https://docs.bitfinex.com/reference/rest-public-liquidations Path:
/v2/liquidations/hist Method: GET
