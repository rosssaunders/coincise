# GET Get Trading Pair Details (V1)

**Source:**
[Get Trading Pair Details (V1)](https://developer-pro.bitmart.com/en/spot/)

**API Type:** Spot

## Authentication

Not Required (Public Endpoint)

## Get Trading Pair Details (V1)

`Get a detailed list of all trading pairs on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/symbols/details`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/v1/symbols/details`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "symbols": [         {             "symbol":"GXC_BTC",              "symbol_id":1024,              "base_currency":"GXC",              "quote_currency":"BTC",              "quote_increment":"1.00000000",              "base_min_size":"1.00000000",              "price_min_precision":6,              "price_max_precision":8,              "expiration":"NA",              "min_buy_amount":"0.00010000",              "min_sell_amount":"0.00010000",              "trade_status":"trading"         }     ]   } }`

| Field               | Type   | Description                                                             |
| ------------------- | ------ | ----------------------------------------------------------------------- |
| symbols             | List   | Array of trading pair details                                           |
| symbol              | String | Trading pair name                                                       |
| symbol_id           | Int    | Trading pair id                                                         |
| base_currency       | String | Base currency                                                           |
| quote_currency      | String | Quote currency                                                          |
| quote_increment     | String | The minimum order quantity is also the minimum order quantity increment |
| base_min_size       | String | Minimum order quantity                                                  |
| price_min_precision | Number | Minimum price accuracy (decimal places), used to query k-line and depth |
| price_max_precision | Number | Maximum price accuracy (decimal places), used to query k-line and depth |
| expiration          | String | Expiration time of trading pair                                         |
| min_buy_amount      | String | Minimum order amount                                                    |
| min_sell_amount     | String | Minimum sell amount                                                     |
| trade_status        | String | Trade Status                                                            |

\- `trading`\=is trading  
\- `pre-trade`\=pre-open |
