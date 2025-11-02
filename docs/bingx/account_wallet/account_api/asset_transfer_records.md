## Asset transfer records

GET /openApi/api/v3/asset/transfer

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type:request body(application/json)

### Request Parameters

| Parameter Name | Type | Required | Description                                         |
| -------------- | ---- | -------- | --------------------------------------------------- |
| type           | ENUM | yes      | transfer type, (query by type or tranId)            |
| tranId         | LONG | no       | transaction ID, (query by type or tranId)           |
| startTime      | LONG | no       | Starting time1658748648396                          |
| endTime        | LONG | no       | End Time 1658748648396                              |
| current        | int  | no       | current page default1                               |
| size           | int  | no       | Page size default 10 can not exceed 100             |
| recvWindow     | LONG | no       | Execution window time, cannot be greater than 60000 |
| timestamp      | LONG | yes      | current timestamp e.g.1658748648396                 |

### Response Parameters

| Parameter Name | Type    | Description         |
| -------------- | ------- | ------------------- |
| total          | LONG    | total               |
| rows           | Array   | Array               |
| asset          | string  | coin name           |
| amount         | DECIMAL | coin amount         |
| type           | ENUM    | transfer tpye       |
| status         | string  | CONFIRMED           |
| tranId         | LONG    | Transaction ID      |
| timestamp      | LONG    | Transfer time stamp |

### Data Parameters

|                   | Description                             |
| ----------------- | --------------------------------------- |
| FUND_SFUTURES     | Funding Account->Standard Contract      |
| SFUTURES_FUND     | Standard Contract->Funding Account      |
| FUND_PFUTURES     | Funding Account->Perpetual Futures      |
| PFUTURES_FUND     | Perpetual Futures->Funding Account      |
| SFUTURES_PFUTURES | Standard Contract->Perpetual Futures    |
| PFUTURES_SFUTURES | Perpetual Futures->Standard Contract    |
| FUND_STRADING     | Funding Account -> Grid Account         |
| STRADING_FUND     | Grid Account ->Funding Account          |
| FUND_CTRADING     | Funding Account -> Copy Trade Account   |
| SFUTURES_CTRADING | Standard Contract -> Copy Trade Account |
| PFUTURES_CTRADING | Perpetual Futures -> Copy Trade Account |
| CTRADING_FUND     | Copy Trade Account -> Funding Account   |
| CTRADING_SFUTURES | Copy Trade Account -> Standard Contract |
| CTRADING_PFUTURES | Copy Trade Account -> Perpetual Futures |

### Errors

| Error Code | Description                                                                                                                                                  |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 80014      | timestamp is invalid                                                                                                                                         |
| 100421     | Null timestamp or timestamp mismatch, try to run our sample code from the link https://bingx-api.github.io/docs/#/en-us/spot/account-api.html#Query%20Assets |
| 100419     | IP does not match IP whitelist , please go to https://bingx.com/en/account/api/ to verify the ip you have set                                                |
| 100410     | code:100410:The endpoint trigger frequency limit rule is currently in the disabled period and will be unblocked after 1727193814249                          |
| 100410     | rate limited                                                                                                                                                 |
| 100413     | Incorrect apiKey                                                                                                                                             |
| 100410     | over 20 error code:100202 requests within 480000 ms for this api, please verify and fix it ,can retry after time: 1727193970155                              |

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html](https://bingx-api.github.io/docs/#/en-us/common/account-api.html)
