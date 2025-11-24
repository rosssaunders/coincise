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
| type\*<br> | String<br> | "delegatorRewards"<br>                                                   |
| user\*<br> | String<br> | hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

200: OK

```json
[
    {
        "time": 1736726400073,
        "source": "delegation",
        "totalAmount": "0.73117184"
    },
    {
        "time": 1736726400073,
        "source": "commission",
        "totalAmount": "130.76445876"
    },
    ...
]
```
