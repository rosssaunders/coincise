# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Returns at most 2000 fills per response and only the 10000 most recent fills are
available

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

userFillsByTime

user\*

String

Address in 42-character hexadecimal format; e.g.
0x0000000000000000000000000000000000000000.

startTime\*

int

Start time in milliseconds, inclusive

endTime

int

End time in milliseconds, inclusive. Defaults to current time.

aggregateByTime

bool

When true, partial fills are combined when a crossing order gets filled by
multiple different resting orders. Resting orders filled by multiple crossing
orders are only aggregated if in the same block.

200: OK Number of fills is limited to 2000

```json
[
  // Perp fill
  {
    "closedPnl": "0.0",
    "coin": "AVAX",
    "crossed": false,
    "dir": "Open Long",
    "hash": "0xa166e3fa63c25663024b03f2e0da011a00307e4017465df020210d3d432e7cb8",
    "oid": 90542681,
    "px": "18.435",
    "side": "B",
    "startPosition": "26.86",
    "sz": "93.53",
    "time": 1681222254710,
    "fee": "0.01", // the total fee, inclusive of builderFee below
    "feeToken": "USDC",
    "builderFee": "0.01", // this is optional and will not be present if 0
    "tid": 118906512037719
  },
  // Spot fill - note the difference in the "coin" format. Refer to
  // https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/asset-ids
  // for more information on how spot asset IDs work
  {
    "coin": "@107",
    "px": "18.62041381",
    "sz": "43.84",
    "side": "A",
    "time": 1735969713869,
    "startPosition": "10659.65434798",
    "dir": "Sell",
    "closedPnl": "8722.988077",
    "hash": "0x2222138cc516e3fe746c0411dd733f02e60086f43205af2ae37c93f6a792430b",
    "oid": 59071663721,
    "crossed": true,
    "fee": "0.304521",
    "tid": 907359904431134,
    "feeToken": "USDC"
  }
]
```
