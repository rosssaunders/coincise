# GET Get Repayment Record(Isolated) (KEYED)

**Source:**
[Get Repayment Record(Isolated) (KEYED)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Required (Private Endpoint)

## Get Repayment Record(Isolated) (KEYED)

`Applicable to the inquiry of repayment records of isolated margin account`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay_record`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud.bitmart.com/spot/v1/margin/isolated/repay_record?symbol=BTC_USDT`

| Field      | Type   | Required? | Description                                              |
| ---------- | ------ | --------- | -------------------------------------------------------- |
| symbol     | String | Yes       | Trading pair (e.g. BMX_USDT)                             |
| repay_id   | String | No        | Repayment ID                                             |
| currency   | String | No        | Currency                                                 |
| start_time | Long   | No        | Query start time: Timestamp                              |
| end_time   | Long   | No        | Query end time: Timestamp                                |
| N          | Int    | No        | Query record size, allowed range\[1-100\]. Default is 50 |

#### Response Data

> Response

`{     "message":"OK",     "code":1000,     "trace":"f7f74924-14da-42a6-b7f2-d3799dd9a612",     "data":{       "records":[         {           "repay_id":"118723",           "repay_time":1655345808,           "symbol":"BTC_USDT",           "currency":"BTC",           "repaid_amount":"1.1",           "repaid_principal":"1",           "repaid_interest":"0.1"         },         ...       ]     } }`

| Field            | Type   | Description                                     |
| ---------------- | ------ | ----------------------------------------------- |
| repay_id         | String | Repayment ID                                    |
| repay_time       | Long   | Repayment Timestamp                             |
| symbol           | String | Repayment trading pairs(like BTC_USDT)          |
| currency         | String | Repayment currency                              |
| repaid_amount    | String | Repayment amount                                |
| repaid_principal | String | The principal amount returned by this repayment |
| repaid_interest  | String | Interest returned by this repayment             |
