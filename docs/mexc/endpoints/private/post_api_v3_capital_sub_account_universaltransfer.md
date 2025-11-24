# POST /api/v3/capital/sub-account/universalTransfer

**Source:** https://www.mexc.com/api-docs/spot-v3/subaccount-endpoints#universal-transfer-for-master-account

> Request

```bash
post /api/v3/capital/sub-account/universalTransfer
```

> Response

```json
 {    "tranId":11945860693  }
```

-   **POST** `/api/v3/capital/sub-account/universalTransfer`

**Permission:** SPOT\_TRANSFER\_WRITE

**Weight(IP):** 1

**Parameters:**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| fromAccount | string | NO | Transfer from master account by default if fromAccount is not sent |
| toAccount | string | NO | Transfer to master account by default if toAccount is not sent |
| fromAccountType | string | YES | fromAccountType:"SPOT","FUTURES" |
| toAccountType | string | YES | toAccountType:"SPOT","FUTURES" |
| asset | string | YES | asset,eg:USDT |
| amount | string | YES | amount,eg:1.82938475 |
| timestamp | string | YES | timestamp |
| signature | string | YES | sign |

**Response:**

| Name | Type | Description |
| --- | --- | --- |
| tranId | string | transfer ID |
