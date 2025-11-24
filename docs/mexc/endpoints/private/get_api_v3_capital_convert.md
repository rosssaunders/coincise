# GET /api/v3/capital/convert

**Source:** https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#dustlog

> Request

```bash
get {{api_url}}/api/v3/capital/convert?timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
{    "data": [        {            "totalConvert": "0.00885018",            "totalFee": "0.000177",            "convertTime": 1665360563000,            "convertDetails": [                {                    "id": "3e52a99c5c3447b2af2163cd829dca28",                    "convert": "0.00885018",                    "fee": "0.000177",                    "amount": "0.007130464601986065",                    "time": 1665360563000,                    "asset": "ETHF"                }            ]        },        {            "totalConvert": "0.026782",            "totalFee": "0.00053562",            "convertTime": 1663631477000,            "convertDetails": [                {                    "id": "6483bfb1766d41d8a4b6b6315ded6e99",                    "convert": "0.02098255",                    "fee": "0.00041965",                    "amount": "0.00000098",                    "time": 1663631477000,                    "asset": "BTC"                },                {                    "id": "f9e886f28c454f5dae45eec6a11f6c6a",                    "convert": "0.00084019",                    "fee": "0.0000168",                    "amount": "2",                    "time": 1663631477000,                    "asset": "JAM"                }            ]        }    ],      "totalRecords": 4,    "page": 1,    "totalPageNum": 1}
```

-   **GET** `/api/v3/capital/convert`

**Permission:** SPOT\_DEAL\_READ

**Weight(IP):** 1

Parameters:

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| startTime | long | NO | startTime |
| endTime | long | NO | endTime |
| page | int | NO | page,default 1 |
| limit | int | NO | limit,default 1; max 1000 |
| timestamp | string | YES | timestamp |
| signature | string | YES | signature |

Response:

| Name | Type | Description |
| --- | --- | --- |
| totalConvert | string | Convert MX amount(Deducted commission fee) |
| totalFee | string | Total fee amount |
| convertTime | long | Convert time |
| convertDetails | object | Convert details |
| id | string | Convert id |
| convert | string | Convert mx |
| fee | string | fee amount |
| amount | string | amount |
| time | long | Convert time |
| asset | string | asset |
| page | int | page |
| totalRecords | int | totalRecords |
| totalPage | int | totalPage |
