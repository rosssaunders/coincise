# GET /api/v3/rebate/affiliate/withdraw

**Source:** https://www.mexc.com/api-docs/spot-v3/rebate-endpoints#get-affiliate-withdraw-record-affiliate-only

> request

```bash
get /api/v3/rebate/affiliate/withdraw?timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{    "success": true,    "code": 0,    "message": null,    "data": {        "pageSize": 10,        "totalCount": 15,        "totalPage": 2,        "currentPage": 1,        "resultList": [            {                "withdrawTime": 1682321417000,                "asset": "USDT",                "amount": "0.00001000"            },            {                "withdrawTime": 1682321405000,                "asset": "USDC",                "amount": "0.00001000"            }        ]    }}​
```

**HTTP Request**

-   **GET** `/api/v3/rebate/affiliate/withdraw`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

**Request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| startTime | long | No | startTime |
| endTime | long | No | endTime |
| page | int | No | page |
| pageSize | int | No | pageSize,default: 10 |
| timestamp | long | Yes | timestamp |
| signature | string | Yes | signature |

**Response**

| Name | Type | Description |
| --- | --- | --- |
| withdrawTime | long | withdrawTime |
| asset | string | withdraw asset |
| amount | string | withdraw amount |

If startTime and endTime are not sent, the data of the last six months is returned.
