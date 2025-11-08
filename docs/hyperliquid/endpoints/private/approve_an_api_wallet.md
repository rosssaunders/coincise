# Approve an API wallet

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Approves an API Wallet (also sometimes referred to as an Agent Wallet). See
[here](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/nonces-and-api-wallets#api-wallets)
for more details.

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

{ "type": "approveAgent",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead),
"signatureChainId": the id of the chain used when signing in hexadecimal format;
e.g. "0xa4b1" for Arbitrum,

"agentAddress": address in 42-character hexadecimal format; e.g.
0x0000000000000000000000000000000000000000,

"agentName": Optional name for the API wallet. An account can have 1 unnamed
approved wallet and up to 3 named ones. And additional 2 named agents are
allowed per subaccount,

"nonce": current timestamp in milliseconds as a Number, must match nonce in
outer request body

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
