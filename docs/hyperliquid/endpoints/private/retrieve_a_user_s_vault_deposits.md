# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name       | Type       | Description                                                                                      |
| ---------- | ---------- | ------------------------------------------------------------------------------------------------ |
| type\*<br> | String<br> | "userVaultEquities"<br>                                                                          |
| user\*<br> | String<br> | Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

200: OK

```json
[
  {
    "vaultAddress": "0xdfc24b077bc1425ad1dea75bcb6f8158e10df303",
    "equity": "742500.082809"
  }
]
```
