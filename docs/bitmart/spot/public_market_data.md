# Public Market Data

## Get Currency List (V1)

`Get a list of all cryptocurrencies on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/currencies`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/v1/currencies`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "currencies": [       {         "id": "BTC",         "name": "Bitcoin",         "withdraw_enabled": true,         "deposit_enabled": true       },       {         "id": "ETH",         "name": "Ethereum",         "withdraw_enabled": true,         "deposit_enabled": true       }     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| id | String | Currency abbreviation, such as BTC 
| name | String | Currency full name, such as Bitcoin 
| withdraw_enabled | Boolean | Whether this currency can be withdrawn on the platform<br>- <code>true</code>=can<br>- <code>false</code>=no 
| deposit_enabled | Boolean | Whether this currency can be deposited on the platform<br>- <code>true</code>=can<br>- <code>false</code>=no 

If the currency you need is not included in the returned response, the currency may have been delisted.

## Get Trading Pairs List (V1)

`Get a list of all trading pairs on the platform`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/v1/symbols`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/v1/symbols`

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-d681ac05cea1",   "message": "OK",   "data": {     "symbols": [        "BMX_ETH",        "XLM_ETH",        "MOBI_ETH"     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| symbols | List<symbol></symbol> | Array of trading pairs 

##### Note

*   Returns an array of trading pairs
*   "BMX\_ETH" it means that the base currency of this trading pair is BMX, and the quote currency is ETH

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

| Field | Type | Description |
| --- | --- | --- |
| symbols | List | Array of trading pair details 
| symbol | String | Trading pair name 
| symbol_id | Int | Trading pair id 
| base_currency | String | Base currency 
| quote_currency | String | Quote currency 
| quote_increment | String | The minimum order quantity is also the minimum order quantity increment 
| base_min_size | String | Minimum order quantity 
| price_min_precision | Number | Minimum price accuracy (decimal places), used to query k-line and depth 
| price_max_precision | Number | Maximum price accuracy (decimal places), used to query k-line and depth 
| expiration | String | Expiration time of trading pair 
| min_buy_amount | String | Minimum order amount 
| min_sell_amount | String | Minimum sell amount 
| trade_status | String | Trade Status<br>- <code>trading</code>=is trading<br>- <code>pre-trade</code>=pre-open 

## Get Ticker of All Pairs (V3)

`Get all trading pairs with a volume greater than 0 within 24 hours. Market data includes: latest transaction price, best bid price, best ask price and 24-hour transaction volume snapshot information. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Ticker channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/tickers`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`` curl https://api-cloud.bitmart.com/spot/quotation/v3/tickers` ``

None

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": [     [       "BTC_USDT",  // symbol       "30000.00",  // last       "582.08066", // v_24h       "4793098.48", // qv_24h       "28596.30", // open_24h       "31012.44", // high_24h       "12.44", // low_24h       "0.04909", // fluctuation       "30000", // bid_px       "1",  // bid_sz       "31012.44",  // ask_px       "69994.75267", // ask_sz       "1691671091933" // ts     ],     [       "ETH_USDT",       "1840.00",       "2.00000",       "3680.00",       "1842.18",       "1842.18",       "1840.00",       "-0.00118",       "1812.35",       "4.61989",       "1859.34",       "4.07793",       "1691671094213"     ]   ] }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair 
| last | String | Latest price 
| v_24h | String | 24-hour trade volume in base currency 
| qv_24h | String | 24-hour trade volume in quote currency 
| open_24h | String | 24-hour open price 
| high_24h | String | 24-hour highest price 
| low_24h | String | 24-hour lowest price 
| fluctuation | String | 24-hour price change 
| bid_px | String | top buy price 
| bid_sz | String | Size of top buy order 
| ask_px | String | top sell price 
| ask_sz | String | Size of top sell order 
| ts | String | Time of generation(in milliseconds) 

## Get Ticker of a Trading Pair (V3)

`Applicable to query the aggregated market price of a certain trading pair, and return the latest ticker information. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Ticker channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/ticker`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/ticker?symbol=BTC_USDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. BMX_USDT) 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": {     "symbol": "BTC_USDT",     "last": "30000.00",     "v_24h": "582.08066",     "qv_24h": "4793098.48",     "open_24h": "28596.30",     "high_24h": "31012.44",     "low_24h": "12.44",     "fluctuation": "0.04909",     "bid_px": "30000",     "bid_sz": "1",     "ask_px": "31012.44",     "ask_sz": "69994.75267",     "ts": "1691671061919"   } }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair 
| last | String | Latest price 
| v_24h | String | 24-hour trade volume in base currency 
| qv_24h | String | 24-hour trade volume in quote currency 
| open_24h | String | 24-hour open price 
| high_24h | String | 24-hour highest price 
| low_24h | String | 24-hour lowest price 
| fluctuation | String | 24-hour price change 
| bid_px | String | top buy price 
| bid_sz | String | Size of top buy order 
| ask_px | String | top sell price 
| ask_sz | String | Size of top sell order 
| ts | String | Time of generation(in milliseconds) 

1.If no corresponding trading pair is found, this trading pair has been delisted.  
2.For frequent query needs, we recommend using this endpoint to obtain aggregated ticker for a single trading pair.

## Get Latest K-Line (V3)

`Query the latest K-line and return a maximum of 1000 data. Note that the latest K-line of the interface is not real-time data. If you want real-time data, please use websocket to subscribe to K-line channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/lite-klines`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/lite-klines?symbol=BMX_ETH&step=15&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. <code>BMX_USDT</code>) 
| before | Long | No | Query timestamp (unit: second, e.g. 1525760116), query the data before this time 
| after | Long | No | Query timestamp (unit: second, e.g. 1525769116), query the data after this time 
| step | Int | No | k-line step, value <code>[1, 5, 15, 30, 60,</code><br><code>120, 240, 1440, 10080, 43200]</code> unit: minute, default 1 
| limit | Int | No | Return number, the maximum value is 200, default is 100 

A total of four query modes are supported:  
1\. If only before is passed, check forward according to the time  
2\. If only after is passed, check backward according to the time  
3\. Both before and after need to verify whether the time interval is legal, and if it is legal, check the interval  
4\. If neither before nor after is passed, the latest K-line will be returned in reverse order  

#### Response Data

> Response

`{   "code":1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data":[     [       "1689736680",  // t       "3.721",  // o       "3.743",  // h       "3.677",  // l       "3.708",  // c       "22698348.04828491",  // v       "12698348.04828491"  // qv     ],     [       "1689736620",       "3.731",       "3.799",       "3.494",       "3.72",       "67632347.24399722",       "37632347.24399722"     ]   ] }`

| Field | Type | Description |
| --- | --- | --- |
| t | String | Create timestamp (in seconds), It can be used as the unique identification of K line 
| o | String | Open price 
| h | String | Highest price 
| l | String | Lowest price 
| c | String | Close price 
| v | String | Trading volume, with a unit of currency (If in BTC_USDT, The unit is BTC) 
| qv | String | Trading volume, the value is the quantity in quote currency (If in BTC_USDT, The unit is USDT) 

## Get History K-Line (V3)

`Get k-line data within a specified time range of a specified trading pair. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe KLine channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/klines`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/klines?symbol=BMX_ETH&step=15&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. <code>BMX_USDT</code>) 
| before | Long | No | Query timestamp (unit: second, e.g. 1525760116), query the data before this time 
| after | Long | No | Query timestamp (unit: second, e.g. 1525769116), query the data after this time 
| step | Int | No | k-line step, value <code>[1, 5, 15, 30, 60,</code><br><code>120, 240, 1440, 10080, 43200]</code> unit: minute, default 1 
| limit | Int | No | Return number, the maximum value is 200, default is 100 

A total of four query modes are supported:  
1\. If only before is passed, check forward according to the time  
2\. If only after is passed, check backward according to the time  
3\. Both before and after need to verify whether the time interval is legal, and if it is legal, check the interval  
4\. If neither before nor after is passed, the latest K-line will be returned in reverse order  

#### Response Data

> Response

`{   "code":1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data":[     [       "1689736680",  // t       "3.721",  // o       "3.743",  // h       "3.677",  // l       "3.708",  // c       "22698348.04828491",  // v       "12698348.04828491"  // qv     ],     [       "1689736620",       "3.731",       "3.799",       "3.494",       "3.72",       "67632347.24399722",       "37632347.24399722"     ]   ] }`

| Field | Type | Description |
| --- | --- | --- |
| t | String | Create timestamp (in seconds), It can be used as the unique identification of K line 
| o | String | Open price 
| h | String | Highest price 
| l | String | Lowest price 
| c | String | Close price 
| v | String | Trading volume, with a unit of currency (If in BTC_USDT, The unit is BTC) 
| qv | String | Trading volume, the value is the quantity in quote currency (If in BTC_USDT, The unit is USDT) 

## Get Depth (V3)

`Get full depth of trading pairs. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Depth channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/books`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/books?symbol=BTC_USDT&limit=1`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. <code>BMX_USDT</code>) 
| limit | Int | No | Order book depth per side. Maximum 50, e.g. 50 bids + 50 asks. Default returns to 35 depth data, e.g. 35 bids + 35 asks. 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": {     "ts": "1691672864874",     "symbol": "BTC_USDT",     "asks": [       [         "31012.44",  // price         "69994.75267"  // amount       ]     ],     "bids": [       [         "30000.00", // price         "1.00000"  // amount       ]     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| ts | String | Create time(Timestamp in milliseconds) 
| symbol | String | Trading pair 
| asks | List[] | Order book on sell side 
| bids | List[] | Order book on buy side 
| amount | String | Total number of current price depth 
| price | String | The price at current depth 

## Get Recent Trades (V3)

`Get the latest trade records of the specified trading pair. Note that the interface is not real-time data, if you need real-time data, please use websocket to subscribe Trade channel`

#### Request URL

`GET https://api-cloud.bitmart.com/spot/quotation/v3/trades`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud.bitmart.com/spot/quotation/v3/trades?symbol=BMX_ETH&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Trading pair (e.g. <code>BMX_USDT</code>) 
| limit | Int | No | Number of returned items, maximum is 50, default 50 

#### Response Data

> Response

`{   "code": 1000,   "trace":"886fb6ae-456b-4654-b4e0-1231",   "message": "success",   "data": [     [       "BMX_ETH", // symbol       "1691743270994", // ts       "1.00000000", // price       "1.0", // size       "sell" // side     ]   ] }`

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Trading pair 
| ts | String | Trade time (in milliseconds) 
| price | String | Trade price 
| size | String | Trade number 
| side | String | Order Side<br>- <code>buy</code><br>- <code>sell</code>
