# GET /v2/funding/stats/{symbol}/hist

**Source:** [https://docs.bitfinex.com/reference/rest-public-funding-stats](https://docs.bitfinex.com/reference/rest-public-funding-stats)

get

https://api-pub.bitfinex.com/v2/funding/stats/{symbol}/hist

Get a list of the most recent funding data for the given currency: FRR, average period, total amount provided, total amount used

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Milliseconds epoch timestamp |
| [3] | FRR | float | 1/365th of Flash Return Rate (To get the daily rate, use: **rate x 365**. To get the daily rate as percentage use: **rate x 365 x 100**. To get APR as percentage use **rate x 100 x 365 x 365**.) |
| [4] | AVG\_PERIOD | float | Average period for funding provided |
| [7] | FUNDING\_AMOUNT | float | Total funding provided |
| [8] | FUNDING\_AMOUNT\_USED | float | Total funding provided that is used in positions |
| [11] | FUNDING\_BELOW\_THRESHOLD | float | Sum of open funding offers < 0.75% |

Path Params

symbol

string

required

Defaults to fUSD

The symbol you want information about. (e.g. fUSD, fBTC, fETH, ...)

Query Params

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given as response.

end

int64

If end is given, only records with MTS <= end (milliseconds) will be given as response.

limit

int32

Number of records in response (max. 250).

Response

Request

curl https://api-pub.bitfinex.com/v2/funding/stats/fUSD/hist
