# Deposit into staking

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This method is used to transfer native token from the user's spot account into
staking for delegating to validators.

####

[](#headers-12)

Headers

Name

Value

Content-Type\*

`application/json`

####

[](#body-1)

Body

Name

Type

Description

action\*

Object

{

"type": "cDeposit",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead),
"signatureChainId": the id of the chain used when signing in hexadecimal format;
e.g. "0xa4b1" for Arbitrum,

"wei": amount of wei to transfer as a number,

"nonce": current timestamp in milliseconds as a Number, must match nonce in
outer request body

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds, must match the nonce
in the action Object above

signature\*

Object

####

[](#response-1)

Response

200: OK

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
