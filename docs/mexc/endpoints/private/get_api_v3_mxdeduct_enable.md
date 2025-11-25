# GET api/v3/mxDeduct/enable

**Source:**
https://www.mexc.com/api-docs/spot-v3/spot-account-trade#query-mx-deduct-status

> Request

```bash
get api/v3/mxDeduct/enable
```

> Response

```json
{
  "data": { "mxDeductEnable": false },
  "code": 0,
  "msg": "success",
  "timestamp": 1669109672717
}
```

- **GET** `api/v3/mxDeduct/enable`

**Permission:** SPOT_DEAL_READ

**Weight(IP):** 1

**Parameters:**

| Name       | Type   | Mandatory | Description |
| ---------- | ------ | --------- | ----------- |
| recvWindow | long   | no        | recvWindow  |
| timestamp  | long   | yes       | timestamp   |
| signature  | string | yes       | signature   |

**Response:**

| Name           | Type    | Description               |
| -------------- | ------- | ------------------------- |
| mxDeductEnable | boolean | true:enable,false:disable |
