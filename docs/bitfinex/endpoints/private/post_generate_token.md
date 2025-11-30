# POST /v2/auth/w/token

**Source:**
[https://docs.bitfinex.com/reference/generate-token](https://docs.bitfinex.com/reference/generate-token)

post

https://api.bitfinex.com/v2/auth/w/token

Generates an auth token that could be used for api requests

> 📘
>
> ###
>
> Caps
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

Response data

| Index | Term  | Type   | Description                    |
| ----- | ----- | ------ | ------------------------------ |
| [0]   | TOKEN | string | Generated authentication token |

scope

string

required

scope of the token, set it to `api`

ttl

int32

time to live in seconds

caps

array of strings

token caps/permissions, available values: [a, o, f, s, w, wd, bp]

caps

writePermission

boolean

token write permission for the caps

truefalse

\_cust_ip

string

user's ip address

{

"scope": "api",

"ttl": 120,

"writePermission": false

}

'
