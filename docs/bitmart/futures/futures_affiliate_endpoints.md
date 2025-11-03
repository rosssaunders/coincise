# Futures Affiliate Endpoints

## Get Futures Rebate List(KEYED)

`Used for API affiliates to query contract rebate records within a certain time range`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/affiliate/rebate-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/private/affiliate/rebate-list?page=1&size=10&currency=USDT`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | Long | No | user ID 
| page | Int | Yes | Page number 
| size | Int | Yes | Number of records per page 
| currency | String | Yes | query currency 
| rebate_start_time | Long | No | Query rebate start timestamp(in second) 
| rebate_end_time | Long | No | Query rebate end timestamp(in second) 
| register_start_time | Long | No | Query register start timestamp(in second) 
| register_end_time | Long | No | Query register end timestamp(in second) 

#### Response Data

> Response

`{   "total": 2,   "btc_rebate_sum": 0,   "size": 10,   "usdt_rebate_sum": 448.9697507148,   "page": 1,   "eth_rebate_sum": 0,   "rebate_detail_page_data": [{     "rebate_coin": "USDT",     "trade_user_id": 4225149,     "total_rebate_amount": 427.1825970576,     "user_type":1   }, {     "rebate_coin": "USDT",     "trade_user_id": 4225148,     "total_rebate_amount": 21.7871536572,     "user_type":1   }] }`

| Field | Type | Description |
| --- | --- | --- |
| btc_rebate_sum | Decimal | Total BTC rebates 
| usdt_rebate_sum | Decimal | Total USDT rebates 
| eth_rebate_sum | Decimal | Total ETH rebates 
| rebate_detail_page_data | Object | Rebate details 
| rebate_coin | String | Currency 
| trade_user_id | Long | Trading user ID 
| total_rebate_amount | Decimal | Total commission for the user 
| user_type | Int | User type<br>-<code>0</code>=Indirect<br>-<code>1</code>=Direct 

## Get Futures Trade List(KEYED)

`Used for API affiliates to query contract rebate records within a certain time range`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/affiliate/trade-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/private/affiliate/trade-list?user_id=123456&type=1&page=1&size=10`

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| user_id | Long | Yes | userID 
| type | Int | Yes | Query type:<br>-<code>1</code>=U-based<br>-<code>2</code>=Coin-based 
| page | Int | Yes | Page number 
| size | Int | Yes | Number of records per page 
| start_time | Long | No | Query start timestamp(in second) 
| end_time | Long | No | Query end timestamp(in second) 

#### Response Data

> Response

`{   "total": 60,   "size": 10,   "page": 1,   "list": [{     "leverage": 20.000000000000000000,     "symbol": "BTCUSDT",     "create_time": 1689933471000,     "open_type": 2,     "fee": 0.57162048,     "deal_price": 29771.900000000000000000,     "realised_profit": 0,     "way": 1,     "deal_vol": 32.000000000000000000,     "select_copy_trade": 1,     "user_type": 1,     "user_id": 10048829,     "category": 2   }] }`

| Field | Type | Description |
| --- | --- | --- |
| user_id | Long | userID 
| user_type | Int | User Type:<br>-Direct User<br>-Indirect User 
| create_time | Long | Creation Time 
| symbol | String | symbol 
| leverage | Int | leverage 
| select_copy_trade | Int | Type:<br>1-Copy Trading<br>2-Non-Copy Trading 
| open_type | Int | Position Type:<br>-<code>1</code>=Isolated<br>-<code>2</code>=Cross 
| way | Int | Order Direction:<br>-<code>1</code>=Long<br>-<code>2</code>=Close Short<br>-<code>3</code>=Close Long<br>-<code>4</code>=Short 
| category | Int | Order Type:<br>-<code>1</code>=Limit Order<br>-<code>2</code>=Market Order 
| deal_price | Decimal | Average Deal Price 
| deal_vol | Decimal | Deal Volume 
| fee | Decimal | fee 
| realised_profit | Decimal | Realized Profit and Loss
