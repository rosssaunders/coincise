# Query User Universal Transfer History

> Request

```
get /api/v3/capital/transfer
```

> Response

```
[
  {
    "rows":[
    {
      "tranId":"11945860693",
      "clientTranId":"test",
      "asset":"BTC",
      "amount":"0.1",
      "fromAccountType":"SPOT",
      "toAccountType":"FUTURE",
      "fromSymbol":"SPOT",
      "toSymbol":"FUTURE",
      "status":"SUCCESS",
      "timestamp":1544433325000
    },
    {
      "tranId":"11945860693",
      "clientTranId":"test",
      "asset":"BTC",
      "amount":"0.1",
      "fromAccountType":"SPOT",
      "toAccountType":"FUTURE",
      "fromSymbol":"SPOT",
      "toSymbol":"FUTURE",
      "status":"SUCCESS",
      "timestamp":1544433325000
    }],
    "total": 2,
  }
]
```

- **GET** `/api/v3/capital/transfer`

**Permission:** SPOT_TRANSFER_READ

**Weight(IP):** 1

Parameters:

| Name            | Type   | Mandatory | Description                      |
| --------------- | ------ | --------- | -------------------------------- |
| fromAccountType | string | YES       | fromAccountType:"SPOT","FUTURES" |
| toAccountType   | string | YES       | toAccountType:"SPOT","FUTURES"   |
| startTime       | string | NO        | startTime                        |
| endTime         | string | NO        | endTime                          |
| page            | string | NO        | default:1                        |
| size            | string | NO        | default:10, max:100              |
| timestamp       | string | YES       | timestamp                        |
| signature       | string | YES       | signature                        |

1.  Only can quary the data for the last six months
2.  If 'startTime' and 'endTime' are not send, will return the last seven days'
    data by default

Response:

| Name            | Description     |
| --------------- | --------------- |
| total           | total           |
| tranId          | tranId          |
| clientTranId    | client ID       |
| asset           | coin            |
| amount          | amount          |
| fromAccountType | fromAccountType |
| toAccountType   | toAccountType   |
| symbol          | symbol          |
| status          | status          |
| timestamp       | timestamp       |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#query-user-universal-transfer-history
