# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name       | Type       | Description                                                              |
| ---------- | ---------- | ------------------------------------------------------------------------ |
| type\*<br> | String<br> | "userDexAbstraction"<br>                                                 |
| user\*<br> | String<br> | hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

200: OK

```
true
```
