# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

Request Body

Name

Type

Description

action\*

Object

{

"type": "cancelByCloid",

"cancels": \[

{

"asset": Number,

"cloid": String

}

\]

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

vaultAddress

String

If trading on behalf of a vault or subaccount, its address in 42-character
hexadecimal format; e.g. 0x0000000000000000000000000000000000000000

expiresAfter

Number

Timestamp in milliseconds

200: OK Successful Response

200: OK Error Response
