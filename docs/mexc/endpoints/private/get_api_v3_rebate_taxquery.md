# Get Rebate History Records

> request

```
get /api/v3/rebate/taxQuery?timestamp={{timestamp}}&signature={{signature}}
```

> response

```
{
    "page": 1,
    "totalRecords": 1,
    "totalPageNum": 1,
    "data": [
        {
            "spot": "0.00082273",
            "futures":"0.00022487",      
            "total": "0.00012126",
            "uid": "221827",
            "account": "154****291@qq.com",
            "inviteTime": 1637651320000
        },
        ...
        {
            "spot": "0.00082273",
            "futures":"0.00022487",    
            "total": "0.00012126",
            "uid": "82937",
            "account": "338****291@qq.com",
            "inviteTime": 1637651320000
        }
    ]
}
```

**Http Request**

- **GET** `/api/v3/rebate/taxQuery`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| startTime  | long   | NO        |             |
| endTime    | long   | NO        |             |
| page       | int    | NO        | default 1   |
| recvWindow | long   | NO        |             |
| timestamp  | long   | YES       |             |
| signature  | string | YES       |             |

**Response**

| Name       | Type   | Description              |
| ---------- | ------ | ------------------------ |
| spot       | string | spot rebate,unit:usdt    |
| futures    | string | futures rebate,unit:usdt |
| total      | string | total rebate,unit:usdt   |
| uid        | string | Invitee uid              |
| account    | string | Invitee account          |
| inviteTime | long   | invite time              |

If startTime and endTime are not sent, the recent 1 year's data will be
returned.

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#get-rebate-history-records
