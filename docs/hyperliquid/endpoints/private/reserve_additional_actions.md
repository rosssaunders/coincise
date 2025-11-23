# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Instead of trading to increase the address based rate limits, this action allows reserving additional actions for 0.0005 USDC per request. The cost is paid from the Perps balance.

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

"type": "reserveRequestWeight",

"weight": Number

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

expiresAfter

Number

Timestamp in milliseconds

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
