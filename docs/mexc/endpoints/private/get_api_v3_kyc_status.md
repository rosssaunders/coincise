# GET /api/v3/kyc/status

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#query-kyc-status

> request

```bash
GET /api/v3/kyc/status?timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{ "status": "1" }
```

**GET** `/api/v3/kyc/status`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | Yes       | timestamp   |
| signature | string | Yes       | signature   |

**Response**

| Name   | Type   | Description                                                   |
| ------ | ------ | ------------------------------------------------------------- |
| status | string | 1:Unverified 2:Primary kyc 3:Advanced kyc 4:Institutional kyc |
