# Funding Offers History

# Funding Offers History

post https://api.bitfinex.com/v2/auth/r/funding/offers/{Symbol}/hist

Get past inactive funding offers.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field               | Type                                                                 | Description                                                                     |
| --------- | ------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| \[0...n\] | FUNDING_OFFER_ARRAY | [Funding offer array](#funding-offers-history-entry-arrays-index-0n) | Each index contains one of the n\` current user's funding offer history entries |

####

Funding offers history entry arrays (Index \[0...n\])

[](#funding-offers-history-entry-arrays-index-0n)

| Index | Field       | Type   | Description                                       |
| ----- | ----------- | ------ | ------------------------------------------------- |
| \[0\] | ID          | Int    | Offer ID                                          |
| \[1\] | SYMBOL      | String | The currency of the offer (fUSD, etc)             |
| \[2\] | MTS_CREATED | Int    | Millisecond Time Stamp when the offer was created |
| \[3\] | MTS_UPDATED | Int    | Millisecond Time Stamp when the offer was updated |
| \[4\] | AMOUNT      | Float  | Amount the offer is for                           |
| \[5\] | AMOUNT_ORIG | Float  | Amount the offer was entered with originally      |
| \[6\] | TYPE        | String | Offer type ('LIMIT')                              |

| \[ . . . \]

| | \[9\] | FLAGS | Object | Future params object (stay tuned) | | \[10\] |
STATUS | String | Offer Status: EXECUTED, CANCELED | |

\[ . . . \]

| | \[14\] | RATE | Float | Rate of the offer (percentage expressed as decimal
number i.e. 1% = 0.01) | | \[15\] | PERIOD | Int | Period of the offer | |
\[16\] | NOTIFY | Int | 0 if false, 1 if true | | \[17\] | HIDDEN | Int | 0 if
false, 1 if true | |

\[ . . . \]

| | \[19\] | RENEW | Int | 0 if false, 1 if true | |

\[ . . . \]

|

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (fUSD, ...) , Omit for all symbols (see example)

Body Params

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Defaults to 25

Number of records (Max 500)

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

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/funding/offers/Symbol/hist \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{"limit":25}'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Margin Funding Source:
https://docs.bitfinex.com/reference/rest-auth-funding-offers-hist Path:
/v2/auth/r/funding/offers/Symbol/hist Method: POST
