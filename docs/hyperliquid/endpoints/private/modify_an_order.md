# Modify an order

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

#### 

[](#headers-4)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-4)

Request Body

Name

Type

Description

action\*

Object

{

"type": "modify",

"oid": Number | Cloid,

"order": {

"a": Number,

"b": Boolean,

"p": String,

"s": String,

"r": Boolean,

"t": {

"limit": {

"tif": "Alo" | "Ioc" | "Gtc"

} or

"trigger": {

"isMarket": Boolean,

"triggerPx": String,

"tpsl": "tp" | "sl"

}

},

"c": Cloid (optional)

}

} Meaning of keys: a is asset b is isBuy p is price s is size r is reduceOnly t is type c is cloid (client order id)

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

200: OK Successful Response

200: OK Error Response
