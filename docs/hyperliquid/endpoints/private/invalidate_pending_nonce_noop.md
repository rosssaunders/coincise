# Invalidate Pending Nonce (noop)

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This action does not do anything (no operation), but causes the nonce to be marked as used. This can be a more effective way to cancel in-flight orders than the cancel action.

#### 

[](#headers-18)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-14)

Request Body

Name

Type

Description

action\*

Object

{

"type": "noop"

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

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
