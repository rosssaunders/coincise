# GET /api/v3/sub-account/asset

**Source:**
https://www.mexc.com/api-docs/spot-v3/subaccount-endpoints#query-sub-account-asset

> request

```bash
get /api/v3/sub-account/asset?subAccount=account1&accountType=SPOT&timestamp={{timestamp}}&signature={{signature}}
```

> response

```json
{
  "balances": [
    { "asset": "MX", "free": "3", "locked": "0" },
    { "asset": "BTC", "free": "0.0003", "locked": "0" }
  ]
}
```

- **GET** `/api/v3/sub-account/asset`

**Permission:** SPOT_TRANSFER_READ

**Weight(IP):** 1

**request**

| Name        | Type   | Mandatory | Description                                               |
| ----------- | ------ | --------- | --------------------------------------------------------- |
| subAccount  | string | Yes       | subAccount name,only support query for single subaccount  |
| accountType | string | Yes       | account type:"SPOT","FUTURES",only support SPOT currently |
| timestamp   | string | Yes       | timestamp                                                 |
| signature   | string | Yes       | signature                                                 |

**response**

| Name     | Type   | Description |
| -------- | ------ | ----------- |
| balances | string | balance     |
| asset    | string | asset       |
| free     | string | free        |
| locked   | string | locked      |
