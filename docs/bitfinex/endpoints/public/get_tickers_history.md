# GET /v2/tickers/hist

**Source:** [https://docs.bitfinex.com/reference/rest-public-tickers-history](https://docs.bitfinex.com/reference/rest-public-tickers-history)

get

https://api-pub.bitfinex.com/v2/tickers/hist

History of recent trading tickers. Provides historic data of the best bid and ask at an hourly interval.

Historic data goes back 1 year.

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | SYMBOL | string | The symbol of the requested ticker history data |
| [1] | BID | float | Price of last highest bid |
| [3] | ASK | float | Price of last lowest ask |
| [12] | MTS | int | Millisecond epoch timestamp |

Query Params

symbols

string

required

Defaults to ALL

The symbols you want information about as a comma separated list, or ALL for every symbol. Ex: 'tBTCUSD' (funding currencies are not supported at this time).

limit

int32

Defaults to 100

Number of records in response (max. 250).

start

integer

If start is given, only records with MTS >= start (milliseconds) will be given as response.

end

integer

If end is given, only records with MTS <= end (milliseconds) will be given as response.

sort

integer

Defaults to -1

+1: sort in ascending order | -1: sort in descending order (by MTS field).

Response

curl \--request GET \\

     \--url 'https://api-pub.bitfinex.com/v2/tickers/hist?symbols=ALL&limit=100&sort=-1' \\

     \--header 'accept: application/json'
