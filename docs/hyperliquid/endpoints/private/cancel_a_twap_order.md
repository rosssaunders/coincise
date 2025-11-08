# Cancel a TWAP order

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

#### 

[](#headers-16)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-12)

Request Body

Name

Type

Description

action\*

Object

{

"type": "twapCancel",

"a": Number,

"t": Number

} Meaning of keys: a is asset t is twap\_id

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

vaultAddress

String

If trading on behalf of a vault or subaccount, its address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000

expiresAfter

Number

Timestamp in milliseconds

200: OK Successful Response

200: OK Error Response

Copy

```
{
   "status":"ok",
   "response":{
      "type":"twapCancel",
      "data":{
         "status": "success"
      }
   }
}
```

Copy

```
{
   "status":"ok",
   "response":{
      "type":"twapCancel",
      "data":{
         "status": {
            "error": "TWAP was never placed, already canceled, or filled."
         }
      }
   }
}
```
