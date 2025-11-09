# Generate Token

# Generate Token

post https://api.bitfinex.com/v2/auth/w/token

Generates an auth token that could be used for api requests

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> 📘
>
> ###
>
> Caps
>
> [](#caps)
>
> Available caps are:
>
> - a - account
> - o - orders
> - f - funding
> - s - settings
> - w - wallets
> - wd - withdraw -- writePermission: true is required for wd permission
> - bp - bfxpay

####

Response data

[](#response-data)

| Index | Term  | Type   | Description                    |
| ----- | ----- | ------ | ------------------------------ |
| \[0\] | TOKEN | string | Generated authentication token |

Body Params

scope

string

required

Defaults to api

scope of the token, set it to `api`

ttl

int32

Defaults to 120

time to live in seconds

caps

array of strings

token caps/permissions, available values: \[a, o, f, s, w, wd, bp\]

caps

ADD string

writePermission

boolean

Defaults to false

token write permission for the caps

truefalse

\_cust_ip

string

user's ip address

Responses

#

200

200

Response body

array of strings

#

400

400

Response body

object

Updated 4 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

11

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/token \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"scope": "api",

8

"ttl": 120,

9

"writePermission": false

10

}

11

'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 4 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/generate-token Path: /v2/auth/w/token
Method: POST
