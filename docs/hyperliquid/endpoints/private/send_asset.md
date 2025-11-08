# Send Asset

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This generalized method is used to transfer tokens between different perp DEXs, spot balance, users, and/or sub-accounts. Use "" to specify the default USDC perp DEX and "spot" to specify spot. Only the collateral token can be transferred to or from a perp DEX.

#### 

[](#headers-11)

Headers

Name

Value

Content-Type\*

`application/json`

#### 

[](#body)

Body

Name

Type

Description

action\*

Object

{

"type": "sendAsset",

"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead),

"signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,

"destination": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,

"sourceDex": name of perp dex to transfer from,

"destinationDex": name of the perp dex to transfer to,

"token": tokenName:tokenId; e.g. "PURR:0xc4bf3f870c0e9465323c0b6ed28096c2",

"amount": amount of token to send as a string; e.g. "0.01",

"fromSubAccount": address in 42-character hexadecimal format or empty string if not from a subaccount,

"nonce": current timestamp in milliseconds as a Number, should match nonce

}

nonce\*

Number

Recommended to use the current timestamp in milliseconds, must match the nonce in the action Object above

signature\*

Object

#### 

[](#response)

Response

200: OK

Copy

```
{'status': 'ok', 'response': {'type': 'default'}}
```
