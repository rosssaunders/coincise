# Retrieve a user's TWAP slice fills

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Returns at most 2000 most recent TWAP slice fills

#### 

[](#headers-6)

Headers

Name

Type

Description

Content-Type\*

String

"application/json"

#### 

[](#request-body-8)

Request Body

Name

Type

Description

type\*

String

"userTwapSliceFills"

user\*

String

Address in 42-character hexadecimal format; e.g. 0x0000000000000000000000000000000000000000.

200: OK

Copy

```
[
    {
        "fill": {
            "closedPnl": "0.0",
            "coin": "AVAX",
            "crossed": true,
            "dir": "Open Long",
            "hash": "0x0000000000000000000000000000000000000000000000000000000000000000", // TWAP fills have a hash of 0
            "oid": 90542681,
            "px": "18.435",
            "side": "B",
            "startPosition": "26.86",
            "sz": "93.53",
            "time": 1681222254710,
            "fee": "0.01",
            "feeToken": "USDC",
            "tid": 118906512037719
        },
        "twapId": 3156
    }
]
```
