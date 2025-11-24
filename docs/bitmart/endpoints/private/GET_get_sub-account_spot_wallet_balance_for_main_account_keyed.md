# GET Get Sub-Account Spot Wallet Balance (For Main Account) (KEYED)

**Source:**
[Get Sub-Account Spot Wallet Balance (For Main Account) (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Sub-Account Spot Wallet Balance (For Main Account) (KEYED)

`Get Sub-Account spot wallet balance (For Main Account)`

#### Request URL

`GET https://api-cloud.bitmart.com/account/sub-account/main/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/account/sub-account/main/v1/wallet?subAccount=subAccount1@xxx.com`

| Field      | Type   | Required? | Description          |
| ---------- | ------ | --------- | -------------------- |
| subAccount | String | Yes       | Sub-Account username |
| currency   | String | No        | currency             |

#### Response Data

> Response

```json
{
  "message": "OK",
  "code": 1000,
  "trace": "ef834248-51d3-4223-9481-f862aa9dd39f",
  "data": {
    "wallet": [
      {
        "currency": "USDT",
        "name": "Tether USD",
        "available": "1000.00000000",
        "frozen": "0.00000000"
      },
      {
        "currency": "BTC",
        "name": "Bitcoin",
        "available": "10000.00000000",
        "frozen": "10.00000000"
      }
    ]
  }
}
```

| Field     | Type   | Description                 |
| --------- | ------ | --------------------------- |
| currency  | String | Token symbol, e.g., 'BTC'   |
| name      | String | Token name, e.g., 'Bitcoin' |
| available | String | Available Balance           |
| frozen    | String | Frozen Balance              |

The return list contains only assets with a balance greater than 0.
