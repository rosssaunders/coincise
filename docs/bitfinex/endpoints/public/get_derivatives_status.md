# Derivatives Status

# Derivatives Status

get https://api-pub.bitfinex.com/v2/status/deriv

Endpoint used to receive different types of platform information - currently supports derivatives pair status only.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | KEY | string | Requested key(s) |
| \[1\] | MTS | int | Millisecond epoch timestamp |
| 
\[ . . . \]

 |
| \[3\] | DERIV\_PRICE | float | Derivative book mid price |
| \[4\] | SPOT\_PRICE | float | Book mid price of the underlying Bitfinex spot trading pair |
| 

\[ . . . \]

 |
| \[6\] | INSURANCE\_FUND\_BALANCE | float | The balance available to the liquidation engine to absorb losses |
| 

\[ . . . \]

 |
| \[8\] | NEXT\_FUNDING\_EVT\_MTS | int | Millisecond timestamp of next funding event |
| \[9\] | NEXT\_FUNDING\_ACCRUED | float | Current accrued funding for next 8h period |
| \[10\] | NEXT\_FUNDING\_STEP | int | Incremental accrual counter |
| 

\[ . . . \]

 |
| \[12\] | CURRENT\_FUNDING | float | Funding applied in the current 8h period |
| 

\[ . . . \]

 |
| \[15\] | MARK\_PRICE | float | Price based on the BFX Composite Index |
| 

\[ . . . \]

 |
| \[18\] | OPEN\_INTEREST | float | Total number of outstanding derivative contracts |
| 

\[ . . . \]

 |
| \[22\] | CLAMP\_MIN | float | Range in the average spread that does not require a funding payment |
| \[23\] | CLAMP\_MAX | float | Funding payment cap |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

* * *

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

Query Params

keys

string

Defaults to tBTCF0:USTF0,tETHF0:USTF0

The key or keys (separate by commas) of the pairs to fetch status information. To fetch information for all pairs use the key value 'ALL'.

Response

# 

200

200

Response body

json

Updated 5 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://api-pub.bitfinex.com/v2/status/deriv?keys=tBTCF0%3AUSTF0%2CtETHF0%3AUSTF0' \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result

Updated 5 months ago

* * *

---
Section: General
Source: https://docs.bitfinex.com/reference/rest-public-derivatives-status
Path: /v2/status/deriv?keys=tBTCF0%3AUSTF0%2CtETHF0%3AUSTF0
Method: GET
