# GET Get MarkPrice K-line

**Source:** [Get MarkPrice K-line](https://developer-pro.bitmart.com/en/futuresv2/)

**API Type:** Futures

## Authentication

Not Required (Public Endpoint)

## Get MarkPrice K-line

`Applicable for querying MarkPrice K-line data. Single time request size upper limit 500`

#### Request URL

`GET https://api-cloud-v2.bitmart.com/contract/public/markprice-kline`

#### Request Limit

See [Detailed Rate Limit](#rate-limit)

#### Request Parameter

> Request

Copy Success

Copy to Clipboard

`curl https://api-cloud-v2.bitmart.com/contract/public/markprice-kline?symbol=BTCUSDT&step=5&start_time=1662518172&end_time=1662518172`

| Field | Type | Required? | Description |
| --- | --- | --- | --- |
| symbol | String | Yes | Symbol of the contract(like BTCUSDT) |
| step | Long | No | K-Line step, default is 1 minute. step: `1`, `3`, `5`, `15`, `30`, `60`, `120`, `240`, `360`, `720`, `1440`, `4320`, `10080` |
| start\_time | Long | Yes | Start time(Timestamp in Seconds) |
| end\_time | Long | Yes | End time(Timestamp in Seconds) |

#### Response Data

> Response

Copy Success

Copy to Clipboard

`{   "code": 1000,   "trace": "0cc6f4c4-8b8c-4253-8e90-8d3195aa109c",   "message": "Ok",   "data": [{     "timestamp": 1662518160,     "open_price": "100",     "close_price": "120",     "high_price": "130",     "low_price": "90",     "volume": "941008"     },     {       "timestamp": 1662518161,       "open_price": "100",       "close_price": "120",       "high_price": "130",       "low_price": "90",       "volume": "941008"     }   ] }`

| Field | Type | Description |
| --- | --- | --- |
| timestamp | Long | Time Window |
| open\_price | String | Opening Price |
| close\_price | String | Closing Price |
| high\_price | String | Highest Price |
| low\_price | String | Lowest Price |
| volume | String | Turnover |