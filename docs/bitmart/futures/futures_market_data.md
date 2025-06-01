# Futures Market Data

## Get Contract Details

`Applicable to query contract details`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/details`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/details?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | No | Symbol of the contract(like BTCUSDT) 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "trace": "9b92a999-9463-4c96-91a4-93ad1cad0d72",   "data": {     "symbols": [       {         "symbol": "BTCUSDT",         "product_type": 1,         "open_timestamp": 1594080000123,         "expire_timestamp": 0,         "settle_timestamp": 0,         "base_currency": "BTC",         "quote_currency": "USDT",         "last_price": "23920",         "volume_24h": "18969368",         "turnover_24h": "458933659.7858",         "index_price": "23945.25191635",         "index_name": "BTCUSDT",         "contract_size": "0.001",         "min_leverage": "1",         "max_leverage": "100",         "price_precision": "0.1",         "vol_precision": "1",         "max_volume": "500000",         "market_max_volume": "500000",         "min_volume": "1",         "funding_rate": "0.0001",         "expected_funding_rate": "0.00011",         "open_interest": "4134180870",         "open_interest_value": "94100888927.0433258",         "high_24h": "23900",         "low_24h": "23100",         "change_24h": "0.004",         "funding_interval_hours": 8       },       ...     ]   } }`

| Field | Type | Description |
| --- | --- | --- |
| symbols | List | Array of trading pair details 

Description of the trading pair details field:

| Trading pair details | Type | Description |
| --- | --- | --- |
| symbols | List | Array of trading pair details 
| symbol | String | Symbol of the contract 
| product_type | Int | Contract type<br>-<code>1</code>=perpetual<br>-<code>2</code>=futures 
| base_currency | String | Base currency 
| quote_currency | String | Quote currency 
| volume_precision | String | Volume Precision 
| price_precision | String | Price Precision 
| max_volume | String | Maximum limit order quantity 
| market_max_volume | String | Maximum market order quantity 
| min_volume | String | Minimum order quantity 
| contract_size | String | Contract Size 
| index_price | String | Index Price 
| index_name | String | Index Name 
| min_leverage | String | Minimum leverage ratio 
| max_leverage | String | Maximum leverage ratio 
| turnover_24h | String | 24 hours turnover 
| volume_24h | String | 24 hours volume 
| last_price | String | Last Price 
| open_timestamp | Long | Opening time for the first time 
| expire_timestamp | Long | Expiration time，If null is returned, it does not expire 
| settle_timestamp | Long | Settlement time，If null is returned, it will not be automatically settlement 
| funding_rate | String | current funding rate 
| expected_funding_rate | String | expect funding rate 
| open_interest | String | Open interest 
| open_interest_value | String | Value of open interest 
| high_24h | String | 24h High 
| low_24h | String | 24h Low 
| change_24h | String | 24h Change 
| funding_interval_hours | Int | Funding interval 

## Get Market Depth

`Get full depth of trading pairs.`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/depth`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/depth?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "trace": "b9bff62d-9ac8-4815-8808-8f745673c096",   "data": {     "asks": [       [         "23935.4",         "65",         "65"       ]     ],     "bids": [       [         "23935.4",         "65",         "65"       ]     ],     "timestamp": 1660285421287,     "symbol": "BTCUSDT"   } }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Unix timestamp in milliseconds for when the last updated time occurred 
| bids | List | Bid order depth 
| asks | List | Ask order depth 
| symbol | String | symbol 

Return a maximum of 50 pieces of data.

Market depth details：

| Field | Type | Description |
| --- | --- | --- |
| The first | String | The price at current depth. For example 23935.4 
| The second | String | Total quantity of current price depth. For example 65 
| The third | String | Accumulates the total quantity above (including) the current price depth. For example 65 

## Get Futures Openinterest

`Applicable for querying the open interest and open interest value data of the specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/open-interest`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/open-interest?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": {     "timestamp": 1661239541734,     "symbol": "BTCUSDT",     "open_interest": "4134180870",     "open_interest_value": "94100888927.0433258"   } }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Timestamp 
| symbol | String | Symbol of the contract 
| open_interest | String | Open interest 
| open_interest_value | String | Value of open interest 

## Get Current Funding Rate

`Applicable for checking the current funding rate of a specified contract`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/funding-rate`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/funding-rate?symbol=BTCUSDT`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "timestamp": 1662518172178,     "symbol": "BTCUSDT",     "rate_value": "0.000164",     "expected_rate": "0.000164",     "funding_time": 1709971200000,     "funding_upper_limit": "0.0375",     "funding_lower_limit": "-0.0375"   },   "trace": "13f7fda9-9543-4e11-a0ba-cbe117989988" }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Timestamp 
| symbol | String | Symbol of the contract 
| rate_value | String | Funding rate of the previous period 
| expected_rate | String | Funding rate for the next period 
| funding_time | Long | Next funding settlement time 
| funding_upper_limit | Long | Upper limit of funding rate for this trading pair 
| funding_lower_limit | Long | Lower limit of funding rate for this trading pair 

## Get K-line

`Applicable for querying MarketPrice K-line data. Single time request size upper limit 500`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/kline`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/kline?symbol=BTCUSDT&step=5&start_time=1662518172&end_time=1662518172`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| step | Long | No | K-Line step, default is 1 minute. step: <code>1</code>, <code>3</code>, <code>5</code>, <code>15</code>, <code>30</code>, <code>60</code>, <code>120</code>, <code>240</code>, <code>360</code>, <code>720</code>, <code>1440</code>, <code>4320</code>, <code>10080</code> 
| start_time | Long | Yes | Start time(Timestamp in Seconds) 
| end_time | Long | Yes | End time(Timestamp in Seconds) 

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": [{     "timestamp": 1662518160,     "open_price": "100",     "close_price": "120",     "high_price": "130",     "low_price": "90",     "volume": "941008"     },     {       "timestamp": 1662518161,       "open_price": "100",       "close_price": "120",       "high_price": "130",       "low_price": "90",       "volume": "941008"     }   ] }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Time Window 
| open_price | String | Opening Price 
| close_price | String | Closing Price 
| high_price | String | Highest Price 
| low_price | String | Lowest Price 
| volume | String | Turnover 

## Get MarkPrice K-line

`Applicable for querying MarkPrice K-line data. Single time request size upper limit 500`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/markprice-kline`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/markprice-kline?symbol=BTCUSDT&step=5&start_time=1662518172&end_time=1662518172`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) 
| step | Long | No | K-Line step, default is 1 minute. step: <code>1</code>, <code>3</code>, <code>5</code>, <code>15</code>, <code>30</code>, <code>60</code>, <code>120</code>, <code>240</code>, <code>360</code>, <code>720</code>, <code>1440</code>, <code>4320</code>, <code>10080</code> 
| start_time | Long | Yes | Start time(Timestamp in Seconds) 
| end_time | Long | Yes | End time(Timestamp in Seconds) 

#### Response Data

> Response

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": [{     "timestamp": 1662518160,     "open_price": "100",     "close_price": "120",     "high_price": "130",     "low_price": "90",     "volume": "941008"     },     {       "timestamp": 1662518161,       "open_price": "100",       "close_price": "120",       "high_price": "130",       "low_price": "90",       "volume": "941008"     }   ] }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Time Window 
| open_price | String | Opening Price 
| close_price | String | Closing Price 
| high_price | String | Highest Price 
| low_price | String | Lowest Price 
| volume | String | Turnover 

## Get Funding Rate History

`Applicable for querying funding rate history data`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/funding-rate-history`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/funding-rate-history?symbol=BTCUSDT&limit=10`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Instrument name, e.g. BTCUSDT 
| limit | String | No | Number of results per request. The maximum is 100; The default is 100 

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "data": {     "list": [       {         "symbol": "BTCUSDT",         "funding_rate": "0.000090600584",         "funding_time": "1733979600000"       }     ]   },   "trace": "4b588ac6b7cb11ef96b16280797cd561.3819021.39457365988950452" }`

| Field | Type | Description |
| --- | --- | --- |
| list | list | Array of list details 

Description of the list details field:

| Field | Type | Description |
| --- | --- | --- |
| symbol | String | Instrument name, e.g. BTCUSDT 
| funding_rate | String | Actual funding rate 
| funding_time | String | Settlement time, Unix timestamp format in milliseconds, e.g. 1733738400000
