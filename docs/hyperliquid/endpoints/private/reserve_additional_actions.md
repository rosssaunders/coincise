# POST /exchange

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/exchange-endpoint

`POST` `https://api.hyperliquid.xyz/exchange`

Instead of trading to increase the address based rate limits, this action allows
reserving additional actions for 0.0005 USDC per request. The cost is paid from
the Perps balance.

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name             | Type       | Description                                                       |
| ---------------- | ---------- | ----------------------------------------------------------------- |
| action\*<br>     | Object<br> | {<br>"type": "reserveRequestWeight",<br>"weight": Number<br>}<br> |
| nonce\*<br>      | Number<br> | Recommended to use the current timestamp in milliseconds<br>      |
| signature\*<br>  | Object<br> | <br>                                                              |
| expiresAfter<br> | Number<br> | Timestamp in milliseconds<br>                                     |

200: OK Successful Response

```
{'status': 'ok', 'response': {'type': 'default'}}
```
