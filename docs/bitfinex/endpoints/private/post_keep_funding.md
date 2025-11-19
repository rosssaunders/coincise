# Keep Funding

post https://api.bitfinex.com/v2/auth/w/funding/keep

Toggle to keep funding taken. Specify loan for unused funding and credit for used funding.

> 📘
> 
> ### 
> 
> Loan and credit ID's
> 
> 
> 
> Loan or credit ID's can be retrieved through the [Funding Loans](/reference?showHidden=94bdb#rest-auth-funding-loans) and [Funding Credits](/reference?showHidden=94bdb#rest-auth-funding-credits) endpoints.

Response array

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | Int | Millisecond Time Stamp of the update |
| [1] | TYPE | String | Purpose of notification ('fk-req' (funding keep request)) |
[ . . . ]

| [6] | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | String | Text of the notification |

**Ratelimit**: 90 req/min

Body Params

type

string

required

Specify the funding type ('credit' or 'loan')

id

array of int32s

Pass an array of id's to toggle their keep funding status (on -> off, off -> on). If the changes object is also passed, keep funding status will change as specified in the changes object.

id

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/funding/keep \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json'

---
Section: Margin Funding
Source: https://docs.bitfinex.com/reference/rest-auth-keep-funding
Path: /v2/auth/w/funding/keep
Method: POST
