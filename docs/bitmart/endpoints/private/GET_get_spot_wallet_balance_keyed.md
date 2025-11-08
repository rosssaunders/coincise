# GET Get Spot Wallet Balance (KEYED)

**Source:** [Get Spot Wallet Balance (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Spot Wallet Balance (KEYED)

`Get the user's wallet balance for all currencies`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/wallet`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/wallet`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "wallet": [          {               "id": "BTC",               "available": "10.000000",               "name": "Bitcoin",               "frozen": "10.000000",           },           ...     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| id | String | Cryptocurrency abbreviation |
| name | String | Full name |
| available | String | Available balance |
| frozen | String | Frozen balance |