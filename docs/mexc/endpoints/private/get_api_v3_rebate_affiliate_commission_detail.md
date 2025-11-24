# GET /api/v3/rebate/affiliate/commission/detail

**Source:** https://www.mexc.com/api-docs/spot-v3/rebate-endpoints#get-affiliate-commission-detail-record-affiliate-only

> request

```bash
get /api/v3/rebate/affiliate/commission/detail?timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{    "success": true,    "code": 0,    "message": null,    "data": {        "pageSize": 10,        "totalCount": 5,        "totalPage": 1,        "currentPage": 1,        "totalCommissionUsdtAmount": "0.0011",        "totalTradeUsdtAmount": "281.8096",        "resultList": [            {                "type": 2,                "sourceType": 2,                "state": 2,                "date": 1689264000000,                "uid": "17875073",                "rate": 0.1,                "symbol": "USDT",                "takerAmount": "170.49326",                "makerAmount": "0",                "amountCurrency": "USDT",                "usdtAmount": "170.49326",                "commission": "0.00085246",                "currency": "USDT"            }        ]    }}​
```

**HTTP Request**

-   **GET** `/api/v3/rebate/affiliate/commission/detail`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

**Request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| startTime | long | No | startTime |
| endTime | long | No | endTime |
| inviteCode | string | No | inviteCode |
| page | int | No | page |
| pageSize | int | No | pageSize,default: 10 |
| type | int | No | commission type,1:spot,2:futures,3:ETF |
| timestamp | long | Yes | timestamp |
| signature | string | Yes | signature |

**Response**

| Name | Type | Description |
| --- | --- | --- |
| totalCommissionUsdtAmount | string | total commission in usdt |
| totalTradeUsdtAmount | string | total trade volume in usdt |
| type | int | commission type,1:spot 2:futures 3:ETF |
| sourceType | int | sourceType,1:referral 2:sub-affiliate |
| state | int | commission state |
| date | long | trade date |
| uid | string | uid |
| rate | string | commission rate |
| symbol | string | symbol |
| takerAmount | string | taker amount |
| makerAmount | string | maker amount |
| amountCurrency | string | amount currency |
| usdtAmount | string | usdt amount |
| commission | string | commission amount |
| currency | string | commission currency |

If startTime and endTime are not sent, the data from T-7 to T is returned. If type is not sent, the data of all types is returned,maximum 30 days data can be queried at one time.
