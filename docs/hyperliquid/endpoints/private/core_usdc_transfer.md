# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Send usd to another address. This transfer does not touch the EVM bridge. The
signature format is human readable for wallet interfaces.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | {<br>"type": "usdSend",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"destination": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,<br>"amount": amount of usd to send as a string, e.g. "1" for 1 usd,<br>"time": current timestamp in milliseconds as a Number, should match nonce<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                                                                                                                                                                                                                                                                                       |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
