# POST /v2/auth/r/info/funding/{key}

**Source:** [https://docs.bitfinex.com/reference/rest-auth-info-funding](https://docs.bitfinex.com/reference/rest-auth-info-funding)

post

https://api.bitfinex.com/v2/auth/r/info/funding/{key}

Get account funding info

Response fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | "sym" | string | "sym" |
| [1] | SYMBOL | string | The symbol the information pertains to (funding currencies) |
| [2] | FUNDING\_INFO\_ARRAY | [Funding info array](#funding-info-array-index-3) | Contains info on the yield and duration of the user's taken and provided funding |

Funding info array (Index [3])

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| [0] | YIELD\_LOAN | float | Weighted average rate for taken funding |
| [1] | YIELD\_LEND | float | Weighted average rate for provided funding |
| [2] | DURATION\_LOAN | float | Weighted average duration for taken funding |
| [3] | DURATION\_LEND | float | Weighted average duration for provided funding |

**Ratelimit**: 90 req/min

Path Params

key

string

required

SYMBOL

Body Params

RAW\_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/info/funding/key \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
