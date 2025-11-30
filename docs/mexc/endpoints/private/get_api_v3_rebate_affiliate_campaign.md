# GET /api/v3/rebate/affiliate/campaign

**Source:**
https://www.mexc.com/api-docs/spot-v3/rebate-endpoints#get-affiliate-campaign-data-affiliate-only

> request

```bash
get /api/v3/rebate/affiliate/campaign?timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{    "success": true,    "code": 0,    "message": null,    "data": {        "pageSize": 10,        "totalCount": 15,        "totalPage": 2,        "currentPage": 1,        "resultList": [            {                "campaign": "11kd",                "inviteCode": "mexc-11Kd",                "clickTime": 0,                "createTime": 1695125287000,                "signup": 0,                "traded": 0,                "deposited": 0,                "depositAmount": "0",                "tradingAmount": "0",                "commission": "0"            },            {                "campaign": "New10",                "inviteCode": "mexc-newcode",                "clickTime": 7,                "createTime": 1693152531000,                "signup": 0,                "traded": 0,                "deposited": 0,                "depositAmount": "0",                "tradingAmount": "0",                "commission": "0"            }        ]    }}​
```

**HTTP Request**

- **GET** `/api/v3/rebate/affiliate/campaign`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name      | Type   | Mandatory | Description          |
| --------- | ------ | --------- | -------------------- |
| startTime | long   | No        | startTime            |
| endTime   | long   | No        | endTime              |
| page      | int    | No        | page                 |
| pageSize  | int    | No        | pageSize,default: 10 |
| timestamp | long   | Yes       | timestamp            |
| signature | string | Yes       | signature            |

**Response**

| Name          | Type   | Description          |
| ------------- | ------ | -------------------- |
| campaign      | string | campaign name        |
| inviteCode    | string | campaign inviteCode  |
| createTime    | long   | campaign createTime  |
| clickTime     | int    | inviteCode clickTime |
| signup        | int    | signup number        |
| deposited     | int    | deposited number     |
| depositAmount | string | depositAmount(usdt)  |
| tradingAmount | string | tradingAmount(usdt)  |
| traded        | int    | traded number        |
| commission    | string | commission           |

If startTime and endTime are not sent, the data from T-7 to T is returned.
