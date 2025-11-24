# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Approve a maximum fee rate for a builder.

**Headers**

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | `application/json`<br> |

**Body**

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | { "type": "approveBuilderFee",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"maxFeeRate": the maximum allowed builder fee rate as a percent string; e.g. "0.001%",<br>"builder": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,<br>"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body<br>}<br> |
| nonce\*<br>     | number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

**Response**

```
{'status': 'ok', 'response': {'type': 'default'}}
```
