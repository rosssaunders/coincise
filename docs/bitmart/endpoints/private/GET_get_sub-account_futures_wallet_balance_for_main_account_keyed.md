# GET Get Sub-Account Futures Wallet Balance (For Main Account) (KEYED)

**Source:**
[Get Sub-Account Futures Wallet Balance (For Main Account) (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Sub-Account Futures Wallet Balance (For Main Account) (KEYED)

`Get Sub-Account futures wallet balance (For Main Account) (KEYED)`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/account/contract/sub-account/main/v1/wallet?subAccount=subAccount1@xxx.com&currency=USDT`

| Field      | Type   | Required? | Description          |
| ---------- | ------ | --------- | -------------------- |
| subAccount | String | Yes       | Sub-Account username |
| currency   | String | No        | currency             |

#### Response Data

> Response

`{   "message": "OK",   "code": 1000,   "trace": "87db8cd43374470f96aacb0e3fcaf34c.77.16872314088656435",   "data": {     "wallet": [       {         "currency": "USDT",         "name": "USDT",         "available": "204.15216696",         "frozen": "0.00000000"       }     ]   } }`

| Field     | Type   | Description                 |
| --------- | ------ | --------------------------- |
| currency  | String | Token symbol, e.g., 'BTC'   |
| name      | String | Token name, e.g., 'Bitcoin' |
| available | String | Available Balance           |
| frozen    | String | Frozen Balance              |

The return list contains only assets with a balance greater than 0.
