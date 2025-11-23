# POST /v2/auth/r/funding/credits/{Symbol}/hist

**Source:** [https://docs.bitfinex.com/reference/rest-auth-funding-credits-hist](https://docs.bitfinex.com/reference/rest-auth-funding-credits-hist)

post

https://api.bitfinex.com/v2/auth/r/funding/credits/{Symbol}/hist

Inactive funds used in positions. Limited to last 3 days.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | FUNDING\_CREDIT\_ARRAY | [Funding credit array](#funding-credit-arrays-index-0n) | Each index contains one of the n\` current user's funding credits history entries |

Funding credit arrays (Index [0...n])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | Integer | Loan ID |
| [1] | SYMBOL | String | The currency of the loan (fUSD, etc) |
| [2] | SIDE | Int | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| [3] | MTS\_CREATE | Int | Millisecond Time Stamp when the loan was created |
| [4] | MTS\_UPDATE | Int | Millisecond Time Stamp when the loan was updated |
| [5] | AMOUNT | Float | Amount of funds provided |
| [6] | FLAGS | Object | Future params object (stay tuned) |
| [7] | STATUS | String | Loan Status: ACTIVE |
| [8] | RATE\_TYPE | String | "FIXED" or "VAR" (for FRR) |
| [11] | RATE | Float | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01) |
| [12] | PERIOD | Int | Period of the loan |
| [13] | MTS\_OPENING | Int | Millisecond Time Stamp for when the loan was opened |
| [14] | MTS\_LAST\_PAYOUT | Int | Millisecond Time Stamp for when the last payout was made |
| [15] | NOTIFY | Int | 0 if false, 1 if true |
| [16] | HIDDEN | Int | 0 if false, 1 if true |
| [18] | RENEW | Int | 0 if false, 1 if true |
| [20] | NO\_CLOSE | Int | If funding will be returned when position is closed. 0 if false, 1 if true |
| [21] | POSITION\_PAIR | String | Pair of the position that the funding was used for |

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (fUSD, ...) , Omit for all symbols (see example)

Body Params

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

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/funding/credits/Symbol/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{"limit":"25"}'
