# GET Get Futures Rebate List(KEYED)

**Source:** [Get Futures Rebate List(KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Futures Rebate List(KEYED)

`Used for API affiliates to query contract rebate records within a certain time range`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/affiliate/rebate-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud-v2.bitmart.com/contract/private/affiliate/rebate-list?page=1&size=10&currency=USDT`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| user\_id | Long | No | user ID |
| page | Int | Yes | Page number |
| size | Int | Yes | Number of records per page |
| currency | String | Yes | query currency |
| rebate\_start\_time | Long | No | Query rebate start timestamp(in second) |
| rebate\_end\_time | Long | No | Query rebate end timestamp(in second) |
| register\_start\_time | Long | No | Query register start timestamp(in second) |
| register\_end\_time | Long | No | Query register end timestamp(in second) |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "total": 2,   "btc_rebate_sum": 0,   "size": 10,   "usdt_rebate_sum": 448.9697507148,   "page": 1,   "eth_rebate_sum": 0,   "rebate_detail_page_data": [{     "rebate_coin": "USDT",     "trade_user_id": 4225149,     "total_rebate_amount": 427.1825970576,     "user_type":1   }, {     "rebate_coin": "USDT",     "trade_user_id": 4225148,     "total_rebate_amount": 21.7871536572,     "user_type":1   }] }`

| Field | Type | Description |
| --- | --- | --- |
| btc\_rebate\_sum | Decimal | Total BTC rebates |
| usdt\_rebate\_sum | Decimal | Total USDT rebates |
| eth\_rebate\_sum | Decimal | Total ETH rebates |
| rebate\_detail\_page\_data | Object | Rebate details |
| rebate\_coin | String | Currency |
| trade\_user\_id | Long | Trading user ID |
| total\_rebate\_amount | Decimal | Total commission for the user |
| user\_type | Int | User type  
\-`0`\=Indirect  
\-`1`\=Direct |