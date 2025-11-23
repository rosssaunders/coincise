# POST /v2/auth/w/funding/close

**Source:** [https://docs.bitfinex.com/reference/rest-auth-funding-close](https://docs.bitfinex.com/reference/rest-auth-funding-close)

post

https://api.bitfinex.com/v2/auth/w/funding/close

Return Taken "Used" or "Unused" funding.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | Int | Millisecond Time Stamp of the update |
| [1] | TYPE | String | Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req') |
| [6] | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |

> 🚧
> 
> ### 
> 
> Offer ID
> 
> 
> 
> Please note that the Offer ID needed is not the one received from the initial offer submission response. The Offer ID should be retrieved via the [Funding Loans](/reference#rest-auth-funding-loans) and [Funding Credits](/reference#rest-auth-funding-credits) endpoints.

**Ratelimit**: 90 req/min

Body Params

id

int64

required

Offer ID (retrievable via the [Funding Loans](/reference#rest-auth-funding-loans) and [Funding Credits](/reference#rest-auth-funding-credits) endpoints)

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/funding/close \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'
