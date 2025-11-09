# Funding Stats

# Funding Statistics

get https://api-pub.bitfinex.com/v2/funding/stats/{symbol}/hist

Get a list of the most recent funding data for the given currency: FRR, average
period, total amount provided, total amount used

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields

[](#response-fields)

| Index | Field | Type | Description                  |
| ----- | ----- | ---- | ---------------------------- |
| \[0\] | MTS   | int  | Milliseconds epoch timestamp |

| \[ . . . \]

| | \[3\] | FRR | float | 1/365th of Flash Return Rate (To get the daily rate,
use: **rate x 365**. To get the daily rate as percentage use: **rate x 365 x
100**. To get APR as percentage use **rate x 100 x 365 x 365**.) | | \[4\] |
AVG_PERIOD | float | Average period for funding provided | |

\[ . . . \]

| | \[7\] | FUNDING_AMOUNT | float | Total funding provided | | \[8\] |
FUNDING_AMOUNT_USED | float | Total funding provided that is used in positions |
|

\[ . . . \]

| | \[11\] | FUNDING_BELOW_THRESHOLD | float | Sum of open funding offers <
0.75% |

b { font-weight: 600 } td:has(div.placeholders) { background-color: #ebebeb }
.placeholders { height: 10px; text-align: center; font-size: 16px; line-height:
8px; }

Path Params

symbol

string

required

Defaults to fUSD

The symbol you want information about. (e.g. fUSD, fBTC, fETH, ...)

Query Params

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

Number of records in response (max. 250).

Response

#

200

200

Response body

json

Updated 5 months ago

---

Language

JavaScriptShell

Request

xxxxxxxxxx

1

curl https://api-pub.bitfinex.com/v2/funding/stats/fUSD/hist

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result

Updated 5 months ago

---

---

Section: General Source:
https://docs.bitfinex.com/reference/rest-public-funding-stats Path:
/v2/funding/stats/fUSD/hist
