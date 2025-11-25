# GET /api/v3/uid

**Source:** https://www.mexc.com/api-docs/spot-v3/spot-account-trade#query-uid

> request

```bash
GET /api/v3/uid?timestamp={{timestamp}}&signature={[{signature]}
```

> response

```json
{ "uid": "209302839" }
```

**GET** `/api/v3/uid`

**Permission:** SPOT_ACCOUNT_READ

**Weight(IP):** 1

**Request**

| Name      | Type   | Mandatory | Description |
| --------- | ------ | --------- | ----------- |
| timestamp | string | Yes       | timestamp   |
| signature | string | Yes       | signature   |

**Response**

| Name | Type   | Description |
| ---- | ------ | ----------- |
| uid  | string | account uid |
