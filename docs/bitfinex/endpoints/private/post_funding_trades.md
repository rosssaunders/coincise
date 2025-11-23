# POST /v2/auth/r/funding/trades/{Symbol}/hist

**Source:** [https://docs.bitfinex.com/reference/rest-auth-funding-trades-hist](https://docs.bitfinex.com/reference/rest-auth-funding-trades-hist)

post

https://api.bitfinex.com/v2/auth/r/funding/trades/{Symbol}/hist

Get funding trades for offered funding. Can be used to request funding trades for a specific currency or to retrieve trades for all currencies at once.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | FUNDING\_TRADE\_ARRAY | [Funding trade array](#funding-trade-arrays-index-0n) | Each index contains one of the n\` current user's funding trades entries. |

Funding trade arrays (Index [0...n])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | Integer | Funding trade ID |
| [1] | CURRENCY | String | The currency of the offer (fUSD, etc) |
| [2] | MTS\_CREATE | Int | Millisecond Time Stamp when the offer was created |
| [3] | OFFER\_ID | Int | Funding offer ID |
| [4] | AMOUNT | Float | Amount the offer is for |
| [5] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| [6] | PERIOD | Int | Period of the offer |

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

Number of records

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/funding/trades/Symbol/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'
