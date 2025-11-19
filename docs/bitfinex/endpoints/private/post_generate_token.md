# Generate Token

post https://api.bitfinex.com/v2/auth/w/token

Generates an auth token that could be used for api requests

> 📘
> 
> ### 
> 
> Caps
> 
> 
> 
> Available caps are:
> 
> -   a - account
> -   o - orders
> -   f - funding
> -   s - settings
> -   w - wallets
> -   wd - withdraw -- writePermission: true is required for wd permission
> -   bp - bfxpay

Response data

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| [0] | TOKEN | string | Generated authentication token |

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

token caps/permissions, available values: [a, o, f, s, w, wd, bp]

caps

writePermission

boolean

Defaults to false

token write permission for the caps

truefalse

\_cust\_ip

string

user's ip address

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/token \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "scope": "api",

  "ttl": 120,

  "writePermission": false

}

'

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/generate-token
Path: /v2/auth/w/token
Method: POST
