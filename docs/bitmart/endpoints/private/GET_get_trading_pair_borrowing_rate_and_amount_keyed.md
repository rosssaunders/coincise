# GET Get Trading Pair Borrowing Rate and Amount (KEYED)

**Source:** [Get Trading Pair Borrowing Rate and Amount (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Trading Pair Borrowing Rate and Amount (KEYED)

`Applicable for checking the borrowing rate and borrowing amount of trading pairs`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/pairs`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/margin/isolated/pairs?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | It can be multiple-choice; if not filled in, then return all, like BTC\_USDT, ETH\_USDT |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "symbols":[         {           "symbol": "BTC_USDT",           "max_leverage": "10",           "symbol_enabled": true,           "base": {             "currency": "BTC",             "daily_interest": "0.05",             "hourly_interest": "0.00208334",             "max_borrow_amount": "1000.00000000",             "min_borrow_amount": "1.00000000",             "borrowable_amount": "955.90221219"           },           "quote": {             "currency": "USDT",             "daily_interest": "0.05",             "hourly_interest": "0.00208334",             "max_borrow_amount": "12000.00000000",             "min_borrow_amount": "0.01000000",             "borrowable_amount": "12000.00000000"           }         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair |
| max\_leverage | String | Leverage multiplier |
| symbol\_enabled | Boolean | Whether the trading pair is enabled |
| currency | String | Currency |
| daily\_interest | String | Daily interest |
| hourly\_interest | String | Hourly interest |
| max\_borrow\_amount | String | The maximum amount of borrowing (precision: 8 decimal places) |
| min\_borrow\_amount | String | The minimum amount of borrowing (precision: 8 decimal places) |
| borrowable\_amount | String | The current available amount of borrowing (precision: 8 decimal places) |