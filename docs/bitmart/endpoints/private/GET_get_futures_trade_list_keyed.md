# GET Get Futures Trade List(KEYED)

**Source:**
[Get Futures Trade List(KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Futures Trade List(KEYED)

`Used for API affiliates to query contract rebate records within a certain time range`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/affiliate/trade-list`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/private/affiliate/trade-list?user_id=123456&type=1&page=1&size=10`

| Field   | Type | Required | Description |
| ------- | ---- | -------- | ----------- |
| user_id | Long | Yes      | userID      |
| type    | Int  | Yes      | Query type: |

\-`1`\=U-based  
\-`2`\=Coin-based | | page | Int | Yes | Page number | | size | Int | Yes |
Number of records per page | | start_time | Long | No | Query start timestamp(in
second) | | end_time | Long | No | Query end timestamp(in second) |

#### Response Data

> Response

`{   "total": 60,   "size": 10,   "page": 1,   "list": [{     "leverage": 20.000000000000000000,     "symbol": "BTCUSDT",     "create_time": 1689933471000,     "open_type": 2,     "fee": 0.57162048,     "deal_price": 29771.900000000000000000,     "realised_profit": 0,     "way": 1,     "deal_vol": 32.000000000000000000,     "select_copy_trade": 1,     "user_type": 1,     "user_id": 10048829,     "category": 2   }] }`

| Field     | Type | Description |
| --------- | ---- | ----------- |
| user_id   | Long | userID      |
| user_type | Int  | User Type:  |

\-Direct User  
\-Indirect User | | create_time | Long | Creation Time | | symbol | String |
symbol | | leverage | Int | leverage | | select_copy_trade | Int | Type:  
1-Copy Trading  
2-Non-Copy Trading | | open_type | Int | Position Type:  
\-`1`\=Isolated  
\-`2`\=Cross | | way | Int | Order Direction:  
\-`1`\=Long  
\-`2`\=Close Short  
\-`3`\=Close Long  
\-`4`\=Short | | category | Int | Order Type:  
\-`1`\=Limit Order  
\-`2`\=Market Order | | deal_price | Decimal | Average Deal Price | | deal_vol |
Decimal | Deal Volume | | fee | Decimal | fee | | realised_profit | Decimal |
Realized Profit and Loss |
