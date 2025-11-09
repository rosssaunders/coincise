# GET Get Contract Assets (KEYED)

**Source:**
[Get Contract Assets (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Contract Assets (KEYED)

`Applicable for querying user contract asset details`

#### Request URl

`GET https://api-cloud-v2.bitmart.com/contract/private/assets-detail`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request None

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/assets-detail`

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [     {       "currency": "USDT",       "position_deposit": "100",       "frozen_balance": "100",       "available_balance": "100",       "equity": "100",       "unrealized": "100"     },     {       "currency": "BTC",       "available_balance": "0",       "frozen_balance": "0",       "unrealized": "0",       "equity": "0",       "position_deposit": "0"     },     {       "currency": "ETH",       "available_balance": "0",       "frozen_balance": "0",       "unrealized": "0",       "equity": "0",       "position_deposit": "0"     }   ],   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field             | Type   | Description               |
| ----------------- | ------ | ------------------------- |
| currency          | String | Currency                  |
| position_deposit  | String | Position margin           |
| frozen_balance    | String | Transaction freeze amount |
| available_balance | String | Available amount          |
| equity            | String | Total equity              |
| unrealized        | String | Unrealized P&L            |
