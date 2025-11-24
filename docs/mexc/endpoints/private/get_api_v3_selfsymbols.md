# GET /api/v3/selfSymbols

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#user-api-default-symbol

> Request

```bash
GET /api/v3/selfSymbols?timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
{    "code": 200,    "data": [        "GENE1USDT",        "SNTUSDT",        "SQUAWKUSDT",        "HEGICUSDT",        "GUMUSDT"    ],    "msg": null}
```

-   **GET** `/api/v3/selfSymbols`

**Permission:** SPOT\_ACCOUNT\_R

**Weight(IP):** 1

**Request**

NONE

**Response**

| Name | Type | Description |
| --- | --- | --- |
| symbol | string | api trade symbol |
