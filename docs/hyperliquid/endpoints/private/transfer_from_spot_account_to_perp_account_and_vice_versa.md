# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This method is used to transfer USDC from the user's spot wallet to perp wallet
and vice versa.

**Headers**

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | "application/json"<br> |

**Body**

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | {<br>"type": "usdClassTransfer",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"amount": amount of usd to transfer as a string, e.g. "1" for 1 usd. If you want to use this action for a subaccount, you can include subaccount: address after the amount, e.g. "1" subaccount:0x0000000000000000000000000000000000000000,<br>"toPerp": true if (spot -> perp) else false,<br>"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds, must match the nonce in the action Object above<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

**Response**

200: OK

```
{'status': 'ok', 'response': {'type': 'default'}}
```
