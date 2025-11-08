# Withdraw(previous,offline soon)

> Request

```
post /api/v3/capital/withdraw/apply?coin=EOS&address=zzqqqqqqqqqq&amount=10&network=EOS&memo=MX10086&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
[
  {
    "id":"7213fea8e94b4a5593d507237e5a555b"
  }
]
```

-   **POST** `/api/v3/capital/withdraw/apply`  
    

**Permission:** SPOT\_WITHDRAW\_WRITE

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| coin | string | YES | coin |
| withdrawOrderId | string | NO | withdrawOrderId |
| network | string | NO | withdraw network |
| address | string | YES | withdraw address |
| memo | string | NO | memo(If memo is required in the address, it must be passed in) |
| amount | string | YES | withdraw amount |
| remark | string | NO | remark |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Can get `network` via endpoints `Get /api/v3/capital/config/getall`'s response params `networkList`.

Response:

| Name | Description |
| --- | --- |
| id | withdraw ID |

---

**Source:** https://mexcdevelop.github.io/apidocs/spot_v3_en#withdraw-previous-offline-soon
