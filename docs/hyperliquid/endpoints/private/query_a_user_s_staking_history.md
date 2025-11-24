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
| type\*<br> | String<br> | "delegatorHistory"<br>                                                   |
| user\*<br> | String<br> | hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

200: OK

```json
[
    {
        "time": 1735380381353,
        "hash": "0x55492465cb523f90815a041a226ba90147008d4b221a24ae8dc35a0dbede4ea4",
        "delta": {
            "delegate": {
                "validator": "0x5ac99df645f3414876c816caa18b2d234024b487",
                "amount": "10000.0",
                "isUndelegate": false
            }
        }
    },
    ...
]
```
