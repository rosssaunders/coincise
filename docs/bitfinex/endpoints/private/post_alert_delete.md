# POST /v2/auth/w/alert/price:{symbol}:{price}/del

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-alert-del](https://docs.bitfinex.com/reference/rest-auth-alert-del)

post

https://api.bitfinex.com/v2/auth/w/alert/price:{symbol}:{price}/del

Delete an active alert.

**Ratelimit**: 90 req/min

Path Params

symbol

string

required

Defaults to tBTCUSD

price

string

required

Defaults to 600

Body Params

RAW_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/alert/price:tBTCUSD:600/del \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
