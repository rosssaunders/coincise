# Approve a builder fee

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Approve a maximum fee rate for a builder.

**Headers**

Name

Value

Content-Type\*

`application/json`

**Body**

Name

Type

Description

action\*

Object

{ "type": "approveBuilderFee",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,

"maxFeeRate": the maximum allowed builder fee rate as a percent string; e.g. "0.001%",

"builder": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,

"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body

}

nonce\*

number

Recommended to use the current timestamp in milliseconds

signature\*

Object

**Response**

200

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
