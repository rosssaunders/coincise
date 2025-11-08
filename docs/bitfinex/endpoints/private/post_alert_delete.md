# Alert Delete

# Alert Delete

post https://api.bitfinex.com/v2/auth/w/alert/price:{symbol}:{price}/del

Delete an active alert.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

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

RAW\_BODY

json

Defaults to {}

{}

Responses

# 

200

200

Response body

array of booleans

# 

400

400

Response body

object

Updated 2 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/alert/price:tBTCUSD:600/del \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 2 months ago

* * *

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-alert-del
Path: /v2/auth/w/alert/price:tBTCUSD:600/del
Method: POST
