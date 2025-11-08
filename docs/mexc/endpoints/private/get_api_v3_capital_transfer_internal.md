# Query Internal Transfer history

> Request

```
get /api/v3/capital/transfer/internal?&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```
  {
    "page": 1,
    "totalRecords": 1,
    "totalPageNum": 1,
    "data": [
             {
      "tranId":"11945860693",
      "asset":"BTC",
      "amount":"0.1",
      "toAccountType":"EMAIL",
      "toAccount":"156283619@outlook.com",
      "fromAccount":"156283618@outlook.com",
      "status":"SUCCESS",
      "timestamp":1544433325000
    },
    {
      "tranId":"",
      "asset":"BTC",
      "amount":"0.8",
      "toAccountType":"UID",
      "fromAccount":"156283619@outlook.com",
      "toAccount":"87658765",
      "status":"SUCCESS",
      "timestamp":1544433325000
    }
    ]
}

```

- **GET** `/api/v3/capital/transfer/internal`

**Permission:** SPOT_WITHDRAW_READ

**Weight(IP):** 1

**Parameters**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| startTime | long   | No        |             |
| endTime   | long   | No        |             |
| page      | int    | No        | default 1   |
| limit     | int    | No        | default 10  |
| tranId    | string | No        | tranid      |
| timestamp | string | Yes       | timestamp   |
| signature | string | Yes       | signature   |

If startTime and endTime are not provided, will default to returning data from
the last 7 days.

**Response**

| Name            | Description                      |
| --------------- | -------------------------------- |
| page            | page                             |
| totalRecords    | totalRecords                     |
| totalPage       | totalPage                        |
| tranId          | tranId                           |
| asset           | asset                            |
| amount          | amount                           |
| fromAccountType | fromAccountType                  |
| toAccountType   | toAccountType                    |
| status          | status:"SUCCESS","FAILED","WAIT" |
| timestamp       | timestamp                        |

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#query-internal-transfer-history
