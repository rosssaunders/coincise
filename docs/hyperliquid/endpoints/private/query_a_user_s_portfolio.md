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
| type\*<br> | String<br> | "portfolio"<br>                                                          |
| user\*<br> | String<br> | hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.<br> |

200: OK

```json
[
  [
    "day",
    {
      "accountValueHistory": [
        [
          1741886630493,
          "0.0"
        ],
        [
          1741895270493,
          "0.0"
        ],
        ...
      ],
      "pnlHistory": [
        [
          1741886630493,
          "0.0"
        ],
        [
          1741895270493,
          "0.0"
        ],
        ...
      ],
      "vlm": "0.0"
    }
  ],
  ["week", { ... }],
  ["month", { ... }],
  ["allTime", { ... }],
  ["perpDay", { ... }],
  ["perpWeek", { ... }],
  ["perpMonth", { ... }],
  ["perpAllTime", { ... }]
]
```
