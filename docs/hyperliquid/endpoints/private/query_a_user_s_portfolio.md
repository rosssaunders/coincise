# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

Request Body

Name

Type

Description

type\*

String

"portfolio"

user\*

String

hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

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
