# Update isolated margin

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Add or remove margin from isolated position

Note that to target a specific leverage instead of a USDC value of margin change, there is an alternate action `{"type": "topUpIsolatedOnlyMargin", "asset": <asset>, "leverage": <float string>}`

#### 

[](#headers-7)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-7)

Request Body

Name

Type

Description

action\*

Object

{

"type": "updateIsolatedMargin",

"asset": index of coin,

"isBuy": true, (this parameter won't have any effect until hedge mode is introduced)

"ntli": int representing amount to add or remove with 6 decimals, e.g. 1000000 for 1 usd,

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

vaultAddress

String

If trading on behalf of a vault or subaccount, its Onchain address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000

expiresAfter

Number

Timestamp in milliseconds

200: OK Successful response

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
