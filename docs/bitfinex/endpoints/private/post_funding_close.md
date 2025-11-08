# Funding Close

# Funding Close

post https://api.bitfinex.com/v2/auth/w/funding/close

Return Taken "Used" or "Unused" funding.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | Int | Millisecond Time Stamp of the update |
| \[1\] | TYPE | String | Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req') |
| 
\[ . . . \]

 |
| \[6\] | STATUS | String | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| 

\[ . . . \]

 |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

> 🚧
> 
> ### 
> 
> Offer ID
> 
> [](#offer-id)
> 
> Please note that the Offer ID needed is not the one received from the initial offer submission response. The Offer ID should be retrieved via the [Funding Loans](/reference#rest-auth-funding-loans) and [Funding Credits](/reference#rest-auth-funding-credits) endpoints.

**Ratelimit**: 90 req/min

Body Params

id

int64

required

Offer ID (retrievable via the [Funding Loans](/reference#rest-auth-funding-loans) and [Funding Credits](/reference#rest-auth-funding-credits) endpoints)

Responses

# 

200

200

Response body

array

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

     \--url https://api.bitfinex.com/v2/auth/w/funding/close \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

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
Source: https://docs.bitfinex.com/reference/rest-auth-funding-close
Path: /v2/auth/w/funding/close
Method: POST
