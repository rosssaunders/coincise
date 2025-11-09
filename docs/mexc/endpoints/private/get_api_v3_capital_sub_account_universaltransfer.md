# Query Universal Transfer History (For Master Account)

> Request

```
get /api/v3/capital/sub-account/universalTransfer
```

> Response

```
  {
    "tranId":"11945860693",
    "fromAccount":"master@test.com",
    "toAccount":"subaccount1@test.com",
    "clientTranId":"test",
    "asset":"BTC",
    "amount":"0.1",
    "fromAccountType":"SPOT",
    "toAccountType":"FUTURE",
    "fromSymbol":"SPOT",
    "toSymbol":"FUTURE",
    "status":"SUCCESS",
    "timestamp":1544433325000
  }
```

- **GET** `/api/v3/capital/sub-account/universalTransfer`

**Permission:** SPOT_TRANSFER_READ

**Weight(IP):** 1

**Parameters:**

| Name            | Type   | Mandatory | Description                                                        |
| --------------- | ------ | --------- | ------------------------------------------------------------------ |
| fromAccount     | string | NO        | Transfer from master account by default if fromAccount is not sent |
| toAccount       | string | NO        | Transfer to master account by default if toAccount is not sent     |
| fromAccountType | string | YES       | fromAccountType:"SPOT","FUTURES"                                   |
| toAccountType   | string | YES       | toAccountType:"SPOT","FUTURES"                                     |
| startTime       | string | NO        | startTime                                                          |
| endTime         | string | NO        | endTime                                                            |
| page            | string | NO        | default 1                                                          |
| limit           | string | NO        | default 500, max 500                                               |
| timestamp       | string | YES       | timestamp                                                          |
| signature       | string | YES       | sign                                                               |

**Response:**

| Name            | Type   | Description     |
| --------------- | ------ | --------------- |
| tranId          | string | transfer ID     |
| fromAccount     | string | fromAccount     |
| toAccount       | string | toAccount       |
| clientTranId    | string | clientTranId    |
| asset           | string | asset           |
| amount          | string | transfer amount |
| fromAccountType | string | fromAccountType |
| toAccountType   | string | toAccountType   |
| fromSymbol      | string | fromSymbol      |
| toSymbol        | string | toSymbol        |
| status          | string | status          |
| timestamp       | number | timestamp       |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#query-universal-transfer-history-for-master-account
