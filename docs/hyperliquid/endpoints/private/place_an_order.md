# Place an order

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

See Python SDK for full featured examples on the fields of the order request.

For limit orders, TIF (time-in-force) sets the behavior of the order upon first
hitting the book.

ALO (add liquidity only, i.e. "post only") will be canceled instead of
immediately matching.

IOC (immediate or cancel) will have the unfilled part canceled instead of
resting.

GTC (good til canceled) orders have no special behavior.

Client Order ID (cloid) is an optional 128 bit hex string, e.g.
`0x1234567890abcdef1234567890abcdef`

####

[](#headers)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body)

Request Body

Name

Type

Description

action\*

Object

{

"type": "order", "orders": \[{

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

}\],

"grouping": "na" | "normalTpsl" | "positionTpsl",

"builder": Optional({"b": "address", "f": Number})

} Meaning of keys: a is asset b is isBuy p is price s is size r is reduceOnly t
is type c is cloid (client order id) Meaning of keys in optional builder
argument: b is the address the should receive the additional fee f is the size
of the fee in tenths of a basis point e.g. if f is 10, 1bp of the order notional
will be charged to the user and sent to the builder

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

200: OK Successful Response (resting)

200: OK Error Response

Copy

```
{
   "status":"ok",
   "response":{
      "type":"order",
      "data":{
         "statuses":[
            {
               "resting":{
                  "oid":77738308
               }
            }
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
      "type":"order",
      "data":{
         "statuses":[
            {
               "error":"Order must have minimum value of $10."
            }
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
      "type":"order",
      "data":{
         "statuses":[
            {
               "filled":{
                  "totalSz":"0.02",
                  "avgPx":"1891.4",
                  "oid":77747314
               }
            }
         ]
      }
   }
}
```
