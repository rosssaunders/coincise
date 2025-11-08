# Retrieve a user's historical orders

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Returns at most 2000 most recent historical orders

#### 

[](#headers-5)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-7)

Request Body

Name

Type

Description

type\*

String

"historicalOrders"

user\*

String

Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

Copy

```
[
  {
    "order": {
      "coin": "ETH",
      "side": "A",
      "limitPx": "2412.7",
      "sz": "0.0",
      "oid": 1,
      "timestamp": 1724361546645,
      "triggerCondition": "N/A",
      "isTrigger": false,
      "triggerPx": "0.0",
      "children": [],
      "isPositionTpsl": false,
      "reduceOnly": true,
      "orderType": "Market",
      "origSz": "0.0076",
      "tif": "FrontendMarket",
      "cloid": null
    },
    "status": "filled" | "open" | "canceled" | "triggered" | "rejected" | "marginCanceled",
    "statusTimestamp": 1724361546645
  }
]
```
