# POST /v2/auth/r/funding/offers/{Symbol}

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-funding-offers](https://docs.bitfinex.com/reference/rest-auth-funding-offers)

post

https://api.bitfinex.com/v2/auth/r/funding/offers/{Symbol}

Get active funding offers. A path param can be used to retrieve offers in a
particular currency. All offers are returned if no currency is specified.

Response data

| Index   | Field               | Type                                                                | Description                                                                    |
| ------- | ------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| [0...n] | FUNDING_OFFER_ARRAY | [Funding offer array](#active-funding-offers-entry-arrays-index-0n) | Each index contains one of the n\` current user's active funding offer entries |

Active funding offers entry arrays (index [0...n]

| Index | Field       | Type    | Description                                                               |
| ----- | ----------- | ------- | ------------------------------------------------------------------------- |
| [0]   | ID          | Integer | Offer ID                                                                  |
| [1]   | SYMBOL      | String  | The currency of the offer (fUSD, etc)                                     |
| [2]   | MTS_CREATED | Int     | Millisecond Time Stamp when the offer was created                         |
| [3]   | MTS_UPDATED | Int     | Millisecond Time Stamp when the offer was updated                         |
| [4]   | AMOUNT      | Float   | Amount of the offer                                                       |
| [5]   | AMOUNT_ORIG | Float   | Amount of the offer when it was first created                             |
| [6]   | TYPE        | String  | "LIMIT, ..."                                                              |
| [9]   | FLAGS       | Object  | Future params object (stay tuned)                                         |
| [10]  | STATUS      | String  | Offer Status: ACTIVE, PARTIALLY FILLED                                    |
| [14]  | RATE        | Float   | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| [15]  | PERIOD      | Int     | Period of the offer                                                       |
| [16]  | NOTIFY      | Int     | 0 if false, 1 if true                                                     |
| [17]  | HIDDEN      | Int     | null if false, 1 if true                                                  |
| [19]  | RENEW       | Int     | 0 if false, 1 if true                                                     |

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (fUSD, ...) (Can be omitted to return funding offers for all currencies)

Body Params

RAW_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/funding/offers/Symbol \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
