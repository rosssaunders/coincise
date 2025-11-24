# GET /openApi/api/v3/asset/transfer

**Source:** [/openApi/api/v3/asset/transfer](https://bingx-api.github.io/docs/)

## Authentication

Required (Private Endpoint)

## Asset transfer records

GET /openApi/api/v3/asset/transfer

rate limitation by UID: 10/s & rate limitation by IP in group Number: 2

API KEY permission: Read

Content-Type: request body(application/json)

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

> **Source:**
> [https://bingx-api.github.io/docs/#/en-us/common/account-api.html](https://bingx-api.github.io/docs/#/en-us/common/account-api.html)
