# DELETE /api/v3/capital/withdraw

**Source:**
https://www.mexc.com/api-docs/spot-v3/wallet-endpoints#cancel-withdraw

> Request

```bash
delete /api/v3/capital/withdraw?id=ca7bd51895134fb5bd749f1cf875b8af&timestamp={{timestamp}}&signature={{signature}}
```

> Response

```json
{ "id": "ca7bd51895134fb5bd749f1cf875b8af" }
```

- **DELETE** `/api/v3/capital/withdraw`

**Permission:** SPOT_WITHDRAW_W

**Weight(IP):** 1

**Request**

| Name | Type   | Mandatory | Description |
| ---- | ------ | --------- | ----------- |
| id   | string | Yes       | withdraw id |

**Response**

| Name | Description |
| ---- | ----------- |
| id   | withdraw id |
