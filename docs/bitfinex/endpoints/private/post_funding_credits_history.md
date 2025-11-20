# Funding Credits History

# Funding Credits History

post https://api.bitfinex.com/v2/auth/r/funding/credits/{Symbol}/hist

Inactive funds used in positions. Limited to last 3 days.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field                | Type                                                    | Description                                                                       |
| --------- | -------------------- | ------------------------------------------------------- | --------------------------------------------------------------------------------- |
| \[0...n\] | FUNDING_CREDIT_ARRAY | [Funding credit array](#funding-credit-arrays-index-0n) | Each index contains one of the n\` current user's funding credits history entries |

####

Funding credit arrays (Index \[0...n\])

[](#funding-credit-arrays-index-0n)

| Index | Field      | Type    | Description                                                                                   |
| ----- | ---------- | ------- | --------------------------------------------------------------------------------------------- |
| \[0\] | ID         | Integer | Loan ID                                                                                       |
| \[1\] | SYMBOL     | String  | The currency of the loan (fUSD, etc)                                                          |
| \[2\] | SIDE       | Int     | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| \[3\] | MTS_CREATE | Int     | Millisecond Time Stamp when the loan was created                                              |
| \[4\] | MTS_UPDATE | Int     | Millisecond Time Stamp when the loan was updated                                              |
| \[5\] | AMOUNT     | Float   | Amount of funds provided                                                                      |
| \[6\] | FLAGS      | Object  | Future params object (stay tuned)                                                             |
| \[7\] | STATUS     | String  | Loan Status: ACTIVE                                                                           |
| \[8\] | RATE_TYPE  | String  | "FIXED" or "VAR" (for FRR)                                                                    |

| \[ . . . \]

| | \[11\] | RATE | Float | Rate of the loan (percentage expressed as decimal
number i.e. 1% = 0.01) | | \[12\] | PERIOD | Int | Period of the loan | | \[13\]
| MTS_OPENING | Int | Millisecond Time Stamp for when the loan was opened | |
\[14\] | MTS_LAST_PAYOUT | Int | Millisecond Time Stamp for when the last payout
was made | | \[15\] | NOTIFY | Int | 0 if false, 1 if true | | \[16\] | HIDDEN |
Int | 0 if false, 1 if true | |

\[ . . . \]

| | \[18\] | RENEW | Int | 0 if false, 1 if true | |

\[ . . . \]

| | \[20\] | NO_CLOSE | Int | If funding will be returned when position is
closed. 0 if false, 1 if true | | \[21\] | POSITION_PAIR | String | Pair of the
position that the funding was used for |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

[](#path-params)Path Params

Symbol

string

required

Symbol (fUSD, ...) , Omit for all symbols (see example)

[](#body-params)Body Params

start

int64

Milliseconds start time

end

int64

Millisecond end time

limit

string

Defaults to 25

Number of records (Max 500)

[](#response-schemas)Responses

#

200

200

[](#restauthfundingcreditshist-string-response-body)Response body

json

#

400

400

[](#restauthfundingcreditshist-object-response-body)Response body

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

     \--url https://api.bitfinex.com/v2/auth/r/funding/credits/Symbol/hist \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{"limit":"25"}'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Margin Funding Source:
https://docs.bitfinex.com/reference/rest-auth-funding-credits-hist Path:
/v2/auth/r/funding/credits/Symbol/hist Method: POST
