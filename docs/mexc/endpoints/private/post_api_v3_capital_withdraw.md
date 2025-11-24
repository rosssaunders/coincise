# POST /api/v3/capital/withdraw

**Source:** https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#withdrawnew

> Request

```bash
post /api/v3/capital/withdraw?coin=EOS&address=zzqqqqqqqqqq&amount=10&netWork=EOS&memo=MX10086&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
{    "id":"7213fea8e94b4a5593d507237e5a555b"}
```

-   **POST** `/api/v3/capital/withdraw`

**Permission:** SPOT\_WITHDRAW\_WRITE

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| coin | string | YES | coin |
| withdrawOrderId | string | NO | withdrawOrderId |
| netWork | string | NO | withdraw network |
| contractAddress | string | NO | coin contract address |
| address | string | YES | withdraw address |
| memo | string | NO | memo(If memo is required in the address, it must be passed in) |
| amount | string | YES | withdraw amount |
| remark | string | NO | remark |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Can get `netWork` via endpoints `Get /api/v3/capital/config/getall`'s response params `networkList`.

Response:

| Name | Description |
| --- | --- |
| id | withdraw ID |
