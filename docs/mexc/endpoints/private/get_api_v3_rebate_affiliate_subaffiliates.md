# Get Subaffiliates Data (affiliate only)

> request

```
get /api/v3/rebate/affiliate/subaffiliates?timestamp={{timestamp}}&signature={{signature}}
```

> response

```
{
    "success": true,
    "code": 0,
    "message": null,
    "data": {
        "pageSize": 10,
        "totalCount": 15,
        "totalPage": 2,
        "currentPage": 1,
        "resultList": [
            {
                "subaffiliateName": "ada176@mailtemp.top ada176",
                "subaffiliateMail": "ad*****6@mailtemp.top",
                "campaign": "new1",
                "inviteCode": "mexc-12181621",
                "activationTime": 1639834136000,
                "registered": 0,
                "deposited": 0,
                "depositAmount": "0",
                "commission": "0"
            },
            {
                "subaffiliateName": "ada165@mailtemp.top ada165",
                "subaffiliateMail": "ad*****5@mailtemp.top",
                "campaign": null,
                "inviteCode": "1KMyk",
                "activationTime": 1639831541000,
                "registered": 0,
                "deposited": 1,
                "depositAmount": "21.15318",
                "commission": "0.5161221"
            }
        ]
    }
}

​
```

**HTTP Request**

- **GET** `/api/v3/rebate/affiliate/subaffiliates`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name       | Type   | Mandatory | Description          |
| ---------- | ------ | --------- | -------------------- |
| startTime  | long   | No        | startTime            |
| endTime    | long   | No        | endTime              |
| inviteCode | string | No        | inviteCode           |
| page       | int    | No        | page                 |
| pageSize   | int    | No        | pageSize,default: 10 |
| timestamp  | long   | Yes       | timestamp            |
| signature  | string | Yes       | signature            |

**Response**

| Name             | Type   | Description       |
| ---------------- | ------ | ----------------- |
| subaffiliateName | string | subaffiliate name |
| subaffiliateMail | string | subaffiliate mail |
| campaign         | string | campaign          |
| inviteCode       | string | inviteCode        |
| activationTime   | long   | activation time   |
| registered       | int    | registered number |
| deposited        | int    | deposited number  |
| depositAmount    | string | deposit amount    |
| commission       | string | commission        |

If startTime and endTime are not sent, the data from T-7 to T is returned.

---

**Source:**
https://mexcdevelop.github.io/apidocs/spot_v3_en#get-subaffiliates-data-affiliate-only
