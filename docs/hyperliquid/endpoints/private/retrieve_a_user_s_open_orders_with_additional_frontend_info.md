# Retrieve a user's open orders with additional frontend info

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

#### 

[](#headers-2)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-2)

Request Body

Name

Type

Description

type\*

String

"frontendOpenOrders"

user\*

String

Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

dex

String

Perp dex name. Defaults to the empty string which represents the first perp dex. Spot open orders are only included with the first perp dex.

200: OK

Copy

```
[
    {
        "coin": "BTC",
        "isPositionTpsl": false,
        "isTrigger": false,
        "limitPx": "29792.0",
        "oid": 91490942,
        "orderType": "Limit",
        "origSz": "5.0",
        "reduceOnly": false,
        "side": "A",
        "sz": "5.0",
        "timestamp": 1681247412573,
        "triggerCondition": "N/A",
        "triggerPx": "0.0",
    }
]
```
