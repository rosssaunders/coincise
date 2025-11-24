# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Add or remove margin from isolated position

Note that to target a specific leverage instead of a USDC value of margin
change, there is an alternate action
`{"type": "topUpIsolatedOnlyMargin", "asset": <asset>, "leverage": <float string>}`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                                                                                                                                                                                                                   |
| ---------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "updateIsolatedMargin",<br>"asset": index of coin,<br>"isBuy": true, (this parameter won't have any effect until hedge mode is introduced)<br>"ntli": int representing amount to add or remove with 6 decimals, e.g. 1000000 for 1 usd,<br>}<br> |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>                                                                                                                                                                                                  |
| signature\*<br>  | Object<br> | <br>                                                                                                                                                                                                                                                          |
| vaultAddress<br> | String<br> | If trading on behalf of a vault or subaccount, its Onchain address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000<br>                                                                                                    |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                                                                                                                                                                                                                 |

200: OK Successful response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
