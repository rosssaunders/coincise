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

"type": "twapOrder", "twap": {

"a": Number,

"b": Boolean,

"s": String,

"r": Boolean,

"m": Number,

"t": Boolean

}

} Meaning of keys: a is asset b is isBuy s is size r is reduceOnly

m is minutes t is randomize

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

200: OK Successful Response

200: OK Error Response

```json
{
  "status": "ok",
  "response": {
    "type": "twapOrder",
    "data": {
      "status": {
        "running": {
          "twapId": 77738308
        }
      }
    }
  }
}
```

```json
{
  "status": "ok",
  "response": {
    "type": "twapOrder",
    "data": {
      "status": {
        "error": "Invalid TWAP duration: 1 min(s)"
      }
    }
  }
}
```
