# GET /api/v3/rebate/referCode

**Source:** https://www.mexc.com/api-docs/spot-v3/rebate-endpoints#query-refercode

> request

```bash
get /api/v3/rebate/referCode?timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{    "referCode": "in3jd"}
```

**HTTP Request**

-   **GET** `/api/v3/rebate/referCode`

**Permission:** SPOT\_ACCOUNT\_READ

**Weight(IP):** 1

**Request**

| Name | Type | Mandatory | Description |
| --- | --- | --- | --- |
| recvWindow | long | NO |  |
| timestamp | long | YES |  |
| signature | string | YES |  |

**Response**

| Name | Type | Description |
| --- | --- | --- |
| referCode | string | referCode |
