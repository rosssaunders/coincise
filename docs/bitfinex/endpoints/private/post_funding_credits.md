# POST /v2/auth/r/funding/credits/{Symbol}

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-funding-credits](https://docs.bitfinex.com/reference/rest-auth-funding-credits)

post

https://api.bitfinex.com/v2/auth/r/funding/credits/{Symbol}

Funds used in active positions

Response data

| Index   | Field                | Type                                                    | Description                                                               |
| ------- | -------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------- |
| [0...n] | FUNDING_CREDIT_ARRAY | [Funding credit array](#funding-credit-arrays-index-0n) | Each index contains one of the n\` current user's funding credits entries |

Funding credit arrays (Index [0...n])

| Index | Field           | Type    | Description                                                                                   |
| ----- | --------------- | ------- | --------------------------------------------------------------------------------------------- |
| [0]   | ID              | Integer | Loan ID                                                                                       |
| [1]   | SYMBOL          | String  | The currency of the loan (fUSD, etc)                                                          |
| [2]   | SIDE            | Int     | 1 if you are the lender, 0 if you are both the lender and borrower, -1 if you're the borrower |
| [3]   | MTS_CREATE      | Int     | Millisecond Time Stamp when the loan was created                                              |
| [4]   | MTS_UPDATE      | Int     | Millisecond Time Stamp when the loan was updated                                              |
| [5]   | AMOUNT          | Float   | Amount of funds provided                                                                      |
| [6]   | FLAGS           | Object  | Future params object (stay tuned)                                                             |
| [7]   | STATUS          | String  | Loan Status: ACTIVE                                                                           |
| [8]   | RATE_TYPE       | String  | "FIXED" or "VAR" (for FRR)                                                                    |
| [11]  | RATE            | Float   | Rate of the loan (percentage expressed as decimal number i.e. 1% = 0.01)                      |
| [12]  | PERIOD          | Int     | Period of the loan                                                                            |
| [13]  | MTS_OPENING     | Int     | Millisecond Time Stamp for when the loan was opened                                           |
| [14]  | MTS_LAST_PAYOUT | Int     | Millisecond Time Stamp for when the last payout was made                                      |
| [15]  | NOTIFY          | Int     | 0 if false, 1 if true                                                                         |
| [16]  | HIDDEN          | Int     | 0 if false, 1 if true                                                                         |
| [18]  | RENEW           | Int     | 0 if false, 1 if true                                                                         |
| [20]  | NO_CLOSE        | Int     | If funding will be returned when position is closed. 0 if false, 1 if true                    |
| [21]  | POSITION_PAIR   | String  | Pair of the position that the funding was used for                                            |

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (fUSD, ...) , Omit for all symbols (see example)

RAW_BODY
