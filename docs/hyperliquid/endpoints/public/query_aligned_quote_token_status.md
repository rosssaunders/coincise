# POST /info

**Source:**
https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint

`POST` `https://api.hyperliquid.xyz/info`

Headers

| Name               | Type       | Description            |
| ------------------ | ---------- | ---------------------- |
| Content-Type\*<br> | String<br> | "application/json"<br> |

Request Body

| Name        | Type       | Description                 |
| ----------- | ---------- | --------------------------- |
| type\*<br>  | String<br> | "alignedQuoteTokenInfo"<br> |
| token\*<br> | Number<br> | token index<br>             |

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
