# User Universal Transfer

> Request

```
post /api/v3/capital/transfer?fromAccountType=FUTURES&toAccountType=SPOT&asset=USDT&amount=1&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
[
  {
    "tranId": "c45d800a47ba4cbc876a5cd29388319"
  }
]
```

-   **POST** `/api/v3/capital/transfer`  
    

**Permission:** SPOT\_TRANSFER\_WRITE

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| fromAccountType | string | YES | fromAccountType:"SPOT","FUTURES" |
| toAccountType | string | YES | toAccountType:"SPOT","FUTURES" |
| asset | string | YES | asset |
| amount | string | YES | amount |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Response:

| Name | Description |
| --- | --- |
| tranId | tranId |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#user-universal-transfer
