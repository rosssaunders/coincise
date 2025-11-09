# Get Affiliate Commission Record (affiliate only)

> request

```
get /api/v3/rebate/affiliate/commission?timestamp={{timestamp}}&signature={{signature}}
```

> response

```
{
    "success": true,
    "code": 0,
    "message": null,
    "data": {
        "pageSize": 10,
        "totalCount": 2,
        "totalPage": 1,
        "currentPage": 1,
        "usdtAmount": null,
        "totalCommissionUsdtAmount": null,
        "totalTradeUsdtAmount": null,
        "finished": null,
        "resultList": [
            {
                "uid": "27121050",
                "account": "",
                "inviteCode": "mexc-12345",
                "inviteTime": 1637145911,
                "spot": "0.00000000",
                "etf": "0.21131086",
                "futures": "0.74546367",
                "total": "0.95677453",
                "deposit": null,
                "firstDepositTime": null
            },
            {
                "uid": "52813530",
                "account": "",
                "inviteCode": "mexc-12345",
                "inviteTime": 1637145478,
                "spot": "1.25023599",
                "etf": "0.00000000",
                "futures": "0.00000000",
                "total": "1.25023599",
                "deposit": "26000.00000000",
                "firstDepositTime": "2021-11-19"
            }
        ]
    }
}
​
```

**HTTP Request**

- **GET** `/api/v3/rebate/affiliate/commission`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name       | Type   | Mandatory | Description          |
| ---------- | ------ | --------- | -------------------- |
| startTime  | long   | No        | startTime            |
| endTime    | long   | No        | endTime              |
| inviteCode | string | No        | invite Code          |
| page       | int    | No        | page                 |
| pageSize   | int    | No        | pageSize，default:10 |
| timestamp  | long   | Yes       | timestamp            |
| signature  | string | Yes       | signature            |

**Response**

| Name             | Type   | Description              |
| ---------------- | ------ | ------------------------ |
| uid              | string | user uid                 |
| account          | string | account                  |
| inviteCode       | string | inviteCode               |
| inviteTime       | long   | inviteTime               |
| spot             | string | spot commission(usdt)    |
| etf              | string | ETF commission(usdt)     |
| futures          | string | futures commission(usdt) |
| total            | string | total commission(usdt)   |
| deposit          | string | deposit amount(usdt)     |
| firstDepositTime | string | first Deposit Time       |

If startTime and endTime are not sent, default return the data of the last six
months .

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#get-affiliate-commission-record-affiliate-only
