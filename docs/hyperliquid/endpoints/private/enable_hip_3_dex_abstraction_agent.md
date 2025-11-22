# Enable HIP-3 DEX abstraction (agent)

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

Same effect as UserDexAbstraction above, but only works if setting the value from `null` to `true`.

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

"type": "agentEnableDexAbstraction"

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds

signature\*

Object

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
