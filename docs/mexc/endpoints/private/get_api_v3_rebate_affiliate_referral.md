# GET /api/v3/rebate/affiliate/referral

**Source:** https://www.mexc.com/api-docs/spot-v3/rebate-endpoints#get-affiliate-referral-dataaffiliate-only

> request

```bash
get /api/v3/rebate/affiliate/referral?timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{    "success": true,    "code": 0,    "message": null,    "data": {        "pageSize": 10,        "totalCount": 15,        "totalPage": 2,        "currentPage": 1,        "resultList": [            {                "uid": "42469975",                "nickName": null,                "email": "",                "registerTime": 1640275818000,                "inviteCode": "mexc-12201950",                "depositAmount": "0.00000000",                "tradingAmount": "0.00000000",                "commission": "0.00000000",                "firstDepositTime": null,                "firstTradeTime": null,                "lastDepositTime": null,                "lastTradeTime": null,                "withdrawAmount": "0.00000000",                "asset": "0 USDT",                "identification": 1          }        ]    }}​
```

**HTTP Request**

-   **GET** `/api/v3/rebate/affiliate/referral`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

**Request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| startTime | long | No | startTime |
| endTime | long | No | endTime |
| uid | string | No | uid |
| inviteCode | string | No | invite code |
| page | int | No | page |
| pageSize | int | No | pageSize,default: 10 |
| timestamp | long | Yes | timestamp |
| signature | string | Yes | signature |

**Response**

| Name | Type | Description |
| --- | --- | --- |
| uid | int | uid |
| account | string | account email |
| inviteCode | string | invite code |
| inviteTime | long | invite time |
| nickName | string | nickName |
| firstDeposit | long | first deposit date |
| firstTrade | long | first trade date |
| lastDeposit | long | last deposit date |
| lastTrade | long | last trade date |
| depositAmount | string | deposit amount(USDT) |
| tradingAmount | string | trading amount(USDT) |
| amount | string | commission amount(USDT) |
| asset | string | 0 USDT、1-1,000 USDT、1,000 - 10,000 USDT、 10,000 - 50,000 USDT、50,000 - 100,000 USDT、 100,000 - 500,000 USDT、500,000 - 1,000,000 USDT、 1,000,000 - 5,000,000 USDT、>5,000,000 USDT |
| withdrawalAmount | string | withdrawal amount(USDT) |
| identification | int | identification,1: Uncertified, 2: primary, 3: Advanced, 4: Institutional |

If startTime and endTime are not sent, the data from T-7 to T is returned.
