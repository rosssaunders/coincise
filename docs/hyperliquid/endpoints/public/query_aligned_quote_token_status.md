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

"alignedQuoteTokenInfo"

token\*

Number

token index

200: OK

```json
{
    "isAligned": true,
    "firstAlignedTime": 1758949452538,
    "evmMintedSupply": "0.0",
    "dailyAmountOwed": [
        [
            "2025-10-04",
            "0.0"
        ],
        [
            "2025-10-05",
            "0.0"
        ],
        ...
    ],
    "predictedRate": "0.01"
}
```
