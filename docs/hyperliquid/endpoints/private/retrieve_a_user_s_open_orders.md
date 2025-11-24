# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

See a user's open orders

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name       | Type       | Description                                                                                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| type\*<br> | String<br> | "openOrders"<br>                                                                                                                                 |
| user\*<br> | String<br> | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br>                                                 |
| dex<br>    | String<br> | Perp dex name. Defaults to the empty string which represents the first perp dex. Spot open orders are only included with the first perp dex.<br> |

200: OK Successful R

```json
[
  {
    "coin": "BTC",
    "limitPx": "29792.0",
    "oid": 91490942,
    "side": "A",
    "sz": "0.0",
    "timestamp": 1681247412573
  }
]
```
