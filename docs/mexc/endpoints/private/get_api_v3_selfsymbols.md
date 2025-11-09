# User API default symbol

> Request

```
GET /api/v3/selfSymbols?timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
{
    "code": 200,
    "data": [
        "GENE1USDT",
        "SNTUSDT",
        "SQUAWKUSDT",
        "HEGICUSDT",
        "GUMUSDT"
    ],
    "msg": null
}
```

- **GET** `/api/v3/selfSymbols`

**Permission:** SPOT_ACCOUNT_R

**Weight(IP):** 1

**Request**

NONE

**Response**

| Name   | Type   | Description      |
| ------ | ------ | ---------------- |
| symbol | string | api trade symbol |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#user-api-default-symbol
