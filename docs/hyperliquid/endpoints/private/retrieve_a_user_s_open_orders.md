# Retrieve a user's open orders

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

See a user's open orders

####

[](#headers-1)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

####

[](#request-body-1)

Request Body

Name

Type

Description

type\*

String

"openOrders"

user\*

String

Address in 42-character hexadecimal format; e.g.
0x0000000000000000000000000000000000000000.

dex

String

Perp dex name. Defaults to the empty string which represents the first perp dex.
Spot open orders are only included with the first perp dex.

200: OK Successful R

Copy

```
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
