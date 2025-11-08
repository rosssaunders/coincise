# Movements

# Movements

post https://api.bitfinex.com/v2/auth/r/movements/{Currency}/hist

View your past deposits/withdrawals. Currency can be specified to retrieve movements specific to that currency.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | MOVEMENT\_ARRAY | [Movement array](#movement-arrays-index-0n) | Each index contains one of the n\` current user's movements entries. |

#### 

Movement arrays (Index \[0...n\])

[](#movement-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | String | Movement identifier |
| \[1\] | CURRENCY | String | The symbol of the currency (ex. "BTC") |
| \[2\] | CURRENCY\_NAME | String | The extended name of the currency (ex. "BITCOIN") |
| 
\[ . . . \]

 |
| \[5\] | MTS\_STARTED | Int | Movement started at |
| \[6\] | MTS\_UPDATED | Int | Movement last updated at |
| 

\[ . . . \]

 |
| \[9\] | STATUS | String | Current status |
| 

\[ . . . \]

 |
| \[12\] | AMOUNT | String | Amount of funds moved (positive for deposits, negative for withdrawals) |
| \[13\] | FEES | String | Tx Fees applied |
| 

\[ . . . \]

 |
| \[16\] | DESTINATION\_ADDRESS | String | Destination address |
| \[17\] | PAYMENT\_ID | String | Payment ID (if relevant) |
| 

\[ . . . \]

 |
| \[20\] | TRANSACTION\_ID | String | Transaction identifier |
| \[21\] | WITHDRAW\_TRANSACTION\_NOTE | String | Optional personal withdraw transaction note |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Path Params

Currency

string

required

Currency (BTC, ...). For an up-to-date listing of supported currencies see: [https://api.bitfinex.com/v2/conf/pub:map:currency:label](https://api.bitfinex.com/v2/conf/pub:map:currency:label) - Currency param can be omitted to retrieve recent movements for all currencies.

Body Params

start

int64

Millisecond start time, only records with MTS\_UPDATED >= start (milliseconds) will be given as response.

end

int64

Millisecond end time, only records with MTS\_UPDATED <= end (milliseconds) will be given as response.

limit

int32

Number of records (Max 2500)

id

array of int32s

Optional array of deposit/withdrawal ids

id

ADD int32

address

string

Optional deposit address filter

Responses

# 

200

200

Response body

json

# 

400

400

Response body

object

Updated 3 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/movements/Currency/hist \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 3 months ago

* * *

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-movements
Path: /v2/auth/r/movements/Currency/hist
Method: POST
