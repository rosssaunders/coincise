# POST /exchange

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Delegate or undelegate native tokens to or from a validator. Note that delegations to a particular validator have a lockup duration of 1 day.

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

"type": "tokenDelegate",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,

"validator": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000, "isUndelegate": boolean,

"wei": number,

"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body

}

nonce\*

number

Recommended to use the current timestamp in milliseconds

signature\*

Object

Response

200: OK

```
{'status': 'ok', 'response': {'type': 'default'}}
```
