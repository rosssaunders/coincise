# POST /info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

**Headers**

Name

Value

Content-Type\*

"application/json"

**Body**

Name

Type

Description

type\*

String

"maxBuilderFee"

user\*

String

Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

builder\*

String

Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

**Response**

200: OK

```
1 // maximum fee approved in tenths of a basis point i.e. 1 means 0.001%
```
