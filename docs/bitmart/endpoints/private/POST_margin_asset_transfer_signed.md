# POST Margin Asset Transfer (SIGNED)

**Source:** [Margin Asset Transfer (SIGNED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Margin Asset Transfer (SIGNED)

`For fund transfers between a margin account and spot account`

#### Request URL

`POST https://api-cloud.bitmart.com/spot/v1/margin/isolated/transfer`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl   -H 'X-BM-KEY:{{AccessKey}}'   -H 'X-BM-TIMESTAMP:{{currentTime}}'   -H 'X-BM-SIGN:{{SIGN}}'   -X POST -d '{     "symbol":"BTC_USDT",     "currency":"BTC",     "amount":"1",     "side":"in" }' https://api-cloud.bitmart.com/spot/v1/margin/isolated/transfer`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX\_USDT) |
| currency | String | Yes | Currency |
| amount | String | Yes | Amount of transfers (precision: 8 decimal places) |
| side | String | Yes | Transfer direction  
\- `in`\=Transfer in  
\- `out`\=Transfer out |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "transfer_id":"124532"     } }`

| Field | Type | Description |
| --- | --- | --- |
| transfer\_id | String | Transfer order id, only successful transfers will be returned |