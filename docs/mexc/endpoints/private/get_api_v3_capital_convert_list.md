# Get Assets That Can Be Converted Into MX

> Request

```
get {{api_url}}/api/v3/capital/convert/list?timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
[
    {
           "convertMx": "0.000009",
           "convertUsdt": "0.000009",
           "balance": "0.000441",
           "asset": "USDT",
           "code": "30021",
           "message": "xxxxxxx"
 },
{
           "convertMx": "0.000009",
           "convertUsdt": "0.000009",
           "balance": "0.000441",
           "asset": "BTC",
           "code": "30021",
           "message": "xxxxxxx"
 }
]
```

-   **GET** `/api/v3/capital/convert/list`  
    

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Response:

| Name | Description |
| --- | --- |
| convertMx | MX amount（Deducted commission fee） |
| convertUsdt | usdt amount |
| balance | Convertible balance |
| asset | asset |
| code | code |
| message | message |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#get-assets-that-can-be-converted-into-mx
