# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This method is used to transfer native token from the user's spot account into
staking for delegating to validators.

Headers

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | `application/json`<br> |

Body

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                            |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | {<br>"type": "cDeposit",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"wei": amount of wei to transfer as a number,<br>"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds, must match the nonce in the action Object above<br>                                                                                                                                                                                                                                                          |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                   |

Response

200: OK

```
{'status': 'ok', 'response': {'type': 'default'}}
```
