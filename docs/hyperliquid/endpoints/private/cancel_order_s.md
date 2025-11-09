# Cancel order(s)

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

####

[](#headers-1)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-1)

Request Body

Name

Type

Description

action\*

Object

{

"type": "cancel",

"cancels": \[

{

"a": Number,

"o": Number

}

\]

} Meaning of keys: a is asset o is oid (order id)

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

Copy

```
{
   "status":"ok",
   "response":{
      "type":"cancel",
      "data":{
         "statuses":[
            "success"
         ]
      }
   }
}
```

Copy

```
{
   "status":"ok",
   "response":{
      "type":"cancel",
      "data":{
         "statuses":[
            {
               "error":"Order was never placed, already canceled, or filled."
            }
         ]
      }
   }
}
```
