# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This generalized method is used to transfer tokens between different perp DEXs,
spot balance, users, and/or sub-accounts. Use "" to specify the default USDC
perp DEX and "spot" to specify spot. Only the collateral token can be
transferred to or from a perp DEX.

Headers

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | `application/json`<br> |

Body

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | {<br>"type": "sendAsset",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead),<br>"signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"destination": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,<br>"sourceDex": name of perp dex to transfer from,<br>"destinationDex": name of the perp dex to transfer to,<br>"token": tokenName:tokenId; e.g. "PURR:0xc4bf3f870c0e9465323c0b6ed28096c2",<br>"amount": amount of token to send as a string; e.g. "0.01",<br>"fromSubAccount": address in 42-character hexadecimal format or empty string if not from a subaccount,<br>"nonce": current timestamp in milliseconds as a Number, should match nonce<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds, must match the nonce in the action Object above<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

Response

200: OK

```
{'status': 'ok', 'response': {'type': 'default'}}
```
