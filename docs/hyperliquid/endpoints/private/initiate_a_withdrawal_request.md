# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

This method is used to initiate the withdrawal flow. After making this request,
the L1 validators will sign and send the withdrawal request to the bridge
contract. There is a $1 fee for withdrawing at the time of this writing and
withdrawals take approximately 5 minutes to finalize.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name            | Type       | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| --------------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>    | Object<br> | { "type": "withdraw3",<br>"hyperliquidChain": "Mainnet" (on testnet use "Testnet" instead), "signatureChainId": the id of the chain used when signing in hexadecimal format; e.g. "0xa4b1" for Arbitrum,<br>"amount": amount of usd to send as a string, e.g. "1" for 1 usd,<br>"time": current timestamp in milliseconds as a Number, should match nonce,<br>"destination": address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br>}<br> |
| nonce\*<br>     | Number<br> | Recommended to use the current timestamp in milliseconds, must match the nonce in the action Object above<br>                                                                                                                                                                                                                                                                                                                                                                     |
| signature\*<br> | Object<br> | <br>                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

200: OK

```
{'status': 'ok', 'response': {'type': 'default'}}
```
