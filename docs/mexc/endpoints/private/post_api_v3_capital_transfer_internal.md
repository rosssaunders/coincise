# POST /api/v3/capital/transfer/internal

**Source:** https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#internal-transfer

> Request

```bash
post /api/v3/capital/transfer/internal?&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
  {    "tranId": "c45d800a47ba4cbc876a5cd29388319"  }
```

-   **POST** `/api/v3/capital/transfer/internal`

**Permission:** SPOT\_WITHDRAW\_WRITE

**Weight(IP):** 1

**Parameters**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| toAccountType | string | Yes | toAccountTyp:EMAIL/UID/MOBILE |
| toAccount | string | Yes | toAccount:EMAIL/UID/MOBILE |
| areaCode | string | No | areaCode of mobile |
| asset | string | Yes | asset |
| amount | string | Yes | amount |
| timestamp | string | Yes | timestamp |
| signature | string | Yes | signature |

**Response**

| Name | Description |
| --- | --- |
| tranId | tranId |
