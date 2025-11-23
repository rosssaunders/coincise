# GET /v2/liquidations/hist

**Source:** [https://docs.bitfinex.com/reference/rest-public-liquidations](https://docs.bitfinex.com/reference/rest-public-liquidations)

get

https://api-pub.bitfinex.com/v2/liquidations/hist

Endpoint to retrieve liquidations. By default it will retrieve the most recent liquidations, but time-specific data can be retrieved using timestamps.

Request Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [1] | POS\_ID | int | Position ID |
| [2] | MTS | int | Millisecond epoch timestamp |
| [4] | SYMBOL | string | Trading pair (e.g. tBTCUSD, ...) |
| [5] | AMOUNT | float | Size of the position. Positive values means a long position, negative values means a short position. |
| [6] | BASE\_PRICE | float | The price at which user entered the position |
| [8] | IS\_MATCH | int | 0: initial liquidation trigger | 1: market execution |
| [9] | IS\_MARKET\_SOLD | int | 0: position acquired by the system | 1: direct sell into the market |
| [11] | PRICE\_ACQUIRED | float | The price at which the position has been acquired |

* * *

| --- | --- |
| Rate Limit: | 3 reqs/min (requests per minute) |

Query Params

sort

int32

+1: sort in ascending order | -1: sort in descending order (by MTS field).

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given as response.

end

int64

If end is given, only records with MTS <= end (milliseconds) will be given as response.

limit

int32

Number of records in response (max. 500).

Response

curl \--request GET \\

     \--url https://api-pub.bitfinex.com/v2/liquidations/hist \\

     \--header 'accept: application/json'
