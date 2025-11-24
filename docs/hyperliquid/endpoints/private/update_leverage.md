# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Update cross or isolated leverage on a coin.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                                                                                                                                                                               |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "updateLeverage",<br>"asset": index of coin,<br>"isCross": true or false if updating cross-leverage,<br>"leverage": integer representing new leverage, subject to leverage constraints on that coin<br>}<br> |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                              |
| signature\*<br>  | Object<br> | <br>                                                                                                                                                                                                                      |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its Onchain address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br>                                                                |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                                                                                             |

200: OK Successful response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
