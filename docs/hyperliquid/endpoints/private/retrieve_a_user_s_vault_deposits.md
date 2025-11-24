# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

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

"userVaultEquities"

user\*

String

Address in 42-character hexadecimal format; e.g.
0x0000000000000000000000000000000000000000.

200: OK

```json
[
  {
    "vaultAddress": "0xdfc24b077bc1425ad1dea75bcb6f8158e10df303",
    "equity": "742500.082809"
  }
]
```
