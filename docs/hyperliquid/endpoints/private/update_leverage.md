# Update leverage

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Update cross or isolated leverage on a coin.

####

[](#headers-6)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-6)

Request Body

Name

Type

Description

action\*

Object

{

"type": "updateLeverage",

"asset": index of coin,

"isCross": true or false if updating cross-leverage,

"leverage": integer representing new leverage, subject to leverage constraints
on that coin

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

vaultAddress

String

If trading on behalf of a vault or subaccount, its Onchain address in
42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000

expiresAfter

Number

Timestamp in milliseconds

200: OK Successful response

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
