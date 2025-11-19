# Funding Offers History

post https://api.bitfinex.com/v2/auth/r/funding/offers/{Symbol}/hist

Get past inactive funding offers.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | FUNDING\_OFFER\_ARRAY | [Funding offer array](#funding-offers-history-entry-arrays-index-0n) | Each index contains one of the n\` current user's funding offer history entries |

Funding offers history entry arrays (Index [0...n])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | Int | Offer ID |
| [1] | SYMBOL | String | The currency of the offer (fUSD, etc) |
| [2] | MTS\_CREATED | Int | Millisecond Time Stamp when the offer was created |
| [3] | MTS\_UPDATED | Int | Millisecond Time Stamp when the offer was updated |
| [4] | AMOUNT | Float | Amount the offer is for |
| [5] | AMOUNT\_ORIG | Float | Amount the offer was entered with originally |
| [6] | TYPE | String | Offer type ('LIMIT') |
[ . . . ]

| [9] | FLAGS | Object | Future params object (stay tuned) |
| [10] | STATUS | String | Offer Status: EXECUTED, CANCELED |

[ . . . ]

| [14] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| [15] | PERIOD | Int | Period of the offer |
| [16] | NOTIFY | Int | 0 if false, 1 if true |
| [17] | HIDDEN | Int | 0 if false, 1 if true |

[ . . . ]

| [19] | RENEW | Int | 0 if false, 1 if true |

[ . . . ]

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

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/funding/offers/Symbol/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{"limit":25}'

---
Section: Margin Funding
Source: https://docs.bitfinex.com/reference/rest-auth-funding-offers-hist
Path: /v2/auth/r/funding/offers/Symbol/hist
Method: POST
