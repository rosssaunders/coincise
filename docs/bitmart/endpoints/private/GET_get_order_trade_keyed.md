# GET Get Order Trade (KEYED)

**Source:** [Get Order Trade (KEYED)](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Required (Private Endpoint)

## Get Order Trade (KEYED)

`Applicable for querying contract order trade detail`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/private/trades`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl -H 'X-BM-KEY:{{AccessKey}}' https://api-cloud-v2.bitmart.com/contract/private/trades?symbol=BTCUSDT&start_time=1662368173&end_time=1662368179`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) |
| account | String | No | Trading account  
\-`futures`  
\-`copy_trading` |
| start\_time | Long | No | Start time(Timestamp in Seconds) |
| end\_time | Long | No | End time(Timestamp in Seconds) |

##### Note

-   If the time range `start_time` and `end_time` are not filled in, the default query is the data of the last 7 days
-   If the time range is filled in, `end_time` must be greater than the value of `start_time`, and the maximum query interval of `start_time` and `end_time` is 90 days
-   Each request returns a maximum of 200 records, and any records exceeding that will not be returned.
-   Supported query order types: `limit`, `market`, `liquidate`, `bankruptcy`, `adl`, `trailing`

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": [{     "order_id": "220921197409432",     "trade_id": "1141853921",     "symbol": "BTCUSDT",     "side": 1,     "price": "19313.3",     "vol": "108",     "exec_type": "Maker",     "profit": false,     "realised_profit": "-0.00832",     "paid_fees": "0",     "account": "futures",     "create_time": 1663663818589   }],   "trace": "638d5048-ad21-4a4b-9365-d0756fbfc7ba" }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Symbol of the contract |
| order\_id | String | Order ID |
| trade\_id | String | Trade detail ID |
| side | Int | Order side  
hedge mode  
\-`1`\=buy\_open\_long  
\-`2`\=buy\_close\_short  
\-`3`\=sell\_close\_long  
\-`4`\=sell\_open\_short  
oneway mode  
\-`1`\=buy  
\-`2`\=buy(reduce only)  
\-`3`\=sell(reduce only)  
\-`4`\=sell |
| price | String | Deal price |
| vol | String | Deal vol |
| profit | Boolean | Profitable or not |
| exec\_type | String | Liquidity type  
\-`Taker`  
\-`Maker` |
| realised\_profit | String | realised profit |
| paid\_fees | String | paid fees |
| account | String | Trading account  
\-`futures`  
\-`copy_trading` |
| create\_time | Long | Transaction create timestamp (ms) |