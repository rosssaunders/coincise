# Funding Loans

# Funding Loans

post https://api.bitfinex.com/v2/auth/r/funding/loans/{Symbol}

Funds not used in active positions

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | FUNDING\_LOAN\_ARRAY | [Funding loan array](#funding-loan-arrays-index-0n) | Each index contains one of the n\` current user's funding loans entries |

#### 

Funding loan arrays (Index \[0...n\])

[](#funding-loan-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | ID | Integer | Loan ID |
| \[1\] | SYMBOL | String | The currency of the loan (fUSD, etc) |
| \[2\] | SIDE | Int | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| \[3\] | MTS\_CREATE | Int | Millisecond Time Stamp when the loan was created |
| \[4\] | MTS\_UPDATE | Int | Millisecond Time Stamp when the loan was updated |
| \[5\] | AMOUNT | Float | Amount of funds provided |
| \[6\] | FLAGS | Object | Future params object (stay tuned) |
| \[7\] | STATUS | String | Loan Status: ACTIVE |
| \[8\] | RATE\_TYPE | String | "FIXED" or "VAR" (for FRR) |
| 
\[ . . . \]

 |
| \[11\] | RATE | Float | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[12\] | PERIOD | Int | Period of the loan |
| \[13\] | MTS\_OPENING | Int | Millisecond Time Stamp for when the loan was opened |
| \[14\] | MTS\_LAST\_PAYOUT | Int | Millisecond Time Stamp for when the last payout was made |
| \[15\] | NOTIFY | Int | 0 if false, 1 if true |
| \[16\] | HIDDEN | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[18\] | RENEW | Int | 0 if false, 1 if true |
| 

\[ . . . \]

 |
| \[20\] | NO\_CLOSE | Int | If funding will be returned when position is closed. 0 if false, 1 if true |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (fUSD, ...), Omit for all symbols (see example)

Body Params

RAW\_BODY

json

Defaults to {}

{}

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

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/funding/loans/Symbol \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: Margin Funding
Source: https://docs.bitfinex.com/reference/rest-auth-funding-loans
Path: /v2/auth/r/funding/loans/Symbol
Method: POST
