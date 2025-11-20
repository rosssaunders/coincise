# GET Get Borrow Record(Isolated)  (KEYED)

**Source:** [Get Borrow Record(Isolated)  (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Borrow Record(Isolated) (KEYED)

`Applicable to the inquiry of borrowing records of an isolated margin account`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow_record`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}'  https://api-cloud.bitmart.com/spot/v1/margin/isolated/borrow_record?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX\_USDT) |
| borrow\_id | String | No | Borrow order id |
| start\_time | Long | No | Query start time: Timestamp |
| end\_time | Long | No | Query end time: Timestamp |
| N | Int | No | Query record size, allowed range\[1-100\]. Default is 50 |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "records":[         {           "borrow_id": "133425",           "symbol": "BTC_USDT",           "currency": "BTC",           "borrow_amount": "1.23854339",           "daily_interest": "0.05",           "hourly_interest": "0.00208334",           "interest_amount": "0.02398474",           "create_time": 1655345808         },         ...       ]     } }`

| Field | Type | Description |
| --- | --- | --- |
| borrow\_id | String | Borrow order id |
| symbol | String | Trading pair |
| currency | String | Currency |
| borrow\_amount | String | The total principal amount borrowed (precision: 8 decimal places) |
| daily\_interest | String | Daily interest |
| hourly\_interest | String | Hourly interest |
| interest\_amount | String | Total interest (precision: 8 decimal places) |
| create\_time | Long | Order creation time |