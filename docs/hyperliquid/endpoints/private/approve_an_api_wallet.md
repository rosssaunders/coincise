# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Approves an API Wallet (also sometimes referred to as an Agent Wallet). See
[here](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/nonces-and-api-wallets#api-wallets)
for more details.

**Headers**

| Name               | Value                  |
| ------------------ | ---------------------- |
| Content-Type\*<br> | `application/json`<br> |

**Body**

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| --------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| action\*<br>    | Object<br> | { "type": "approveAgent",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"agentAddress": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000,<br>"agentName": Optional name for the API wallet. An account can have 1 unnamed approved wallet and up to 3 named ones. And additional 2 named agents are allowed per subaccount,<br>"nonce": current timestamp in milliseconds as a Number, must match nonce in outer request body<br>}<br> |
| nonce\*<br>     | number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

**Response**

```
{'status': 'ok', 'response': {'type': 'default'}}
```
