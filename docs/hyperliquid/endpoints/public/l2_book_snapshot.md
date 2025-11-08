# L2 book snapshot

**Source:** https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Returns at most 20 levels per side

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

"l2Book"

coin\*

String

coin

nSigFigs

Number

Optional field to aggregate levels to `nSigFigs` significant figures. Valid values are 2, 3, 4, 5, and `null`, which means full precision

mantissa

Number

Optional field to aggregate levels. This field is only allowed if nSigFigs is 5. Accepts values of 1, 2 or 5.

**Response**

200: OK

Copy

```
{
  "coin": "BTC",
  "time": 1754450974231,
  "levels": [
    [
      {
        "px": "113377.0",
        "sz": "7.6699",
        "n": 17 // number of levels
      },
      {
        "px": "113376.0",
        "sz": "4.13714",
        "n": 8
      },
    ],
    [
      {
        "px": "113397.0",
        "sz": "0.11543",
        "n": 3
      }
    ]
  ]
}
```
