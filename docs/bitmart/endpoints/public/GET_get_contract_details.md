# GET Get Contract Details

**Source:**
[Get Contract Details](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get Contract Details

`Applicable to query contract details`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/details`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

`curl https://api-cloud-v2.bitmart.com/contract/public/details?symbol=BTCUSDT`

| Field  | Type   | Required? | Description                          |
| ------ | ------ | --------- | ------------------------------------ |
| symbol | String | No        | Symbol of the contract(like BTCUSDT) |

#### Response Data

> Response

`{   "code": 1000,   "message": "Ok",   "trace": "9b92a999-9463-4c96-91a4-93ad1cad0d72",   "data": {     "symbols": [       {         "symbol": "BTCUSDT",         "product_type": 1,         "open_timestamp": 1594080000123,         "expire_timestamp": 0,         "settle_timestamp": 0,         "base_currency": "BTC",         "quote_currency": "USDT",         "last_price": "23920",         "volume_24h": "18969368",         "turnover_24h": "458933659.7858",         "index_price": "23945.25191635",         "index_name": "BTCUSDT",         "contract_size": "0.001",         "min_leverage": "1",         "max_leverage": "100",         "price_precision": "0.1",         "vol_precision": "1",         "max_volume": "500000",         "market_max_volume": "500000",         "min_volume": "1",         "funding_rate": "0.0001",         "expected_funding_rate": "0.00011",         "open_interest": "4134180870",         "open_interest_value": "94100888927.0433258",         "high_24h": "23900",         "low_24h": "23100",         "change_24h": "0.004",         "funding_interval_hours": 8,         "status": "Delisted",         "delist_time": 1745830379       },       ...     ]   } }`

| Field   | Type | Description                   |
| ------- | ---- | ----------------------------- |
| symbols | List | Array of trading pair details |

Description of the trading pair details field:

| Trading pair details | Type   | Description                   |
| -------------------- | ------ | ----------------------------- |
| symbols              | List   | Array of trading pair details |
| symbol               | String | Symbol of the contract        |
| product_type         | Int    | Contract type                 |

\-`1`\=perpetual  
\-`2`\=futures | | base_currency | String | Base currency | | quote_currency |
String | Quote currency | | volume_precision | String | Volume Precision | |
price_precision | String | Price Precision | | max_volume | String | Maximum
limit order quantity | | market_max_volume | String | Maximum market order
quantity | | min_volume | String | Minimum order quantity | | contract_size |
String | Contract Size | | index_price | String | Index Price | | index_name |
String | Index Name | | min_leverage | String | Minimum leverage ratio | |
max_leverage | String | Maximum leverage ratio | | turnover_24h | String | 24
hours turnover | | volume_24h | String | 24 hours volume | | last_price | String
| Last Price | | open_timestamp | Long | Opening time for the first time | |
expire_timestamp | Long | Expiration time，If null is returned, it does not
expire | | settle_timestamp | Long | Settlement time，If null is returned, it
will not be automatically settlement | | funding_rate | String | current funding
rate | | expected_funding_rate | String | expect funding rate | | open_interest
| String | Open interest | | open_interest_value | String | Value of open
interest | | high_24h | String | 24h High | | low_24h | String | 24h Low | |
change_24h | String | 24h Change | | funding_interval_hours | Int | Funding
interval | | status | String | Status  
\-`Trading`  
\-`Delisted` | | delist_time | Int | Delisting time(UTC+0) |
