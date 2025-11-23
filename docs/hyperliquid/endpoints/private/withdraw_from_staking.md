# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This method is used to transfer native token from staking into the user's spot account. Note that transfers from staking to spot account go through a 7 day unstaking queue.

Headers

Name

Value

Content-Type\*

`application/json`

Body

Name

Type

Description

action\*

Object

{

"type": "cWithdraw",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,

"wei": amount of wei to transfer as a number,

"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds, must match the nonce in the action Object above

signature\*

Object

Response

200: OK

```
{'status': 'ok', 'response': {'type': 'default'}}
```
