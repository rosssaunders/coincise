# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

If set, actions on HIP-3 perps will automatically transfer collateral from
validator-operated USDC perps balance for HIP-3 DEXs where USDC is the
collateral token, and spot otherwise. When HIP-3 DEX abstraction is active,
collateral is returned to the same source (validator-operated USDC perps or spot
balance) when released from positions or open orders.

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

"type": "userDexAbstraction",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead),

"signatureChainId": the id of the chain used when signing in hexadecimal format;
e.g. "0xa4b1" for Arbitrum,

"user": address in 42-character hexadecimal format. Can be a sub-account of the
user,

"enabled": boolean,

"nonce": current timestamp in milliseconds as a Number, should match nonce

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
