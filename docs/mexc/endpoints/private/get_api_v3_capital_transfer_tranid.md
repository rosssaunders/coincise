# Query User Universal Transfer History （by tranId）

> Request

```
get /api/v3/capital/transfer/tranId?tranId=cb28c88cd20c42819e4d5148d5fb5742&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
{
    "tranId": "cb28c88cd20c42819e4d5148d5fb5742",
    "clientTranId": null,
    "asset": "USDT",
    "amount": "10",
    "fromAccountType": "SPOT",
    "toAccountType": "FUTURES",
    "symbol": null,
    "status": "SUCCESS",
    "timestamp": 1678603205000
}
```

-   **GET** `/api/v3/capital/transfer/tranId`  
    

**Permission:** SPOT\_TRANSFER\_R

**Weight(IP):** 1

**request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| tranId | string | YES | tranId |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Only can quary the data for the last six months

**response**

| Name | Description |
| --- | --- |
| tranId | tranId |
| clientTranId | client ID |
| asset | coin |
| amount | amount |
| fromAccountType | fromAccountType |
| toAccountType | toAccountType |
| symbol | symbol |
| status | status |
| timestamp | timestamp |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#query-user-universal-transfer-history-by-tranid
