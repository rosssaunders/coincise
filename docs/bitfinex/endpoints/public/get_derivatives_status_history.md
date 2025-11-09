# Derivatives Status History

# Derivatives Status History

get https://api-pub.bitfinex.com/v2/status/deriv/{key}/hist

Endpoint used to receive different types of historical platform information -
currently supports derivatives pair status only.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields

[](#response-fields)

| Index | Field | Type | Description                 |
| ----- | ----- | ---- | --------------------------- |
| \[0\] | MTS   | int  | Millisecond epoch timestamp |

| \[ . . . \]

| | \[2\] | DERIV_PRICE | float | Derivative book mid price | | \[3\] |
SPOT_PRICE | float | Book mid price of the underlying Bitfinex spot trading pair
| |

\[ . . . \]

| | \[5\] | INSURANCE_FUND_BALANCE | float | The balance available to the
liquidation engine to absorb losses | |

\[ . . . \]

| | \[7\] | NEXT_FUNDING_EVT_MTS | int | Millisecond timestamp of next funding
event | | \[8\] | NEXT_FUNDING_ACCRUED | float | Current accrued funding for
next 8h period | | \[9\] | NEXT_FUNDING_STEP | int | Incremental accrual counter
| |

\[ . . . \]

| | \[11\] | CURRENT_FUNDING | float | Funding applied in the current 8h period
| |

\[ . . . \]

| | \[14\] | MARK_PRICE | float | Price based on the BFX Composite Index | |

\[ . . . \]

| | \[17\] | OPEN_INTEREST | float | Total number of outstanding derivative
contracts | |

\[ . . . \]

| | \[21\] | CLAMP_MIN | float | Range in the average spread that does not
require a funding payment | | \[22\] | CLAMP_MAX | float | Funding payment cap |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

Path Params

key

string

required

Defaults to tBTCF0:USTF0

The key of the pairs to obtain history information. (e.g. tBTCF0:USTF0,
tETHF0:USTF0, ...)

Query Params

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

Number of records in response (max. 5000).

Response

#

200

200

Response body

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

     \--url https://api-pub.bitfinex.com/v2/status/deriv/tBTCF0%3AUSTF0/hist \\

3

     \--header 'accept: application/json'

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
https://docs.bitfinex.com/reference/rest-public-derivatives-status-history Path:
/v2/status/deriv/tBTCF0%3AUSTF0/hist Method: GET
