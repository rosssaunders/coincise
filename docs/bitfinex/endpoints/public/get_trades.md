# GET /v2/trades/{symbol}/hist

**Source:**
[https://docs.bitfinex.com/reference/rest-public-trades](https://docs.bitfinex.com/reference/rest-public-trades)

get

https://api-pub.bitfinex.com/v2/trades/{symbol}/hist

The trades endpoint allows the retrieval of past public trades and includes
details such as price, size, and time. Optional parameters can be used to limit
the number of results; you can specify a start and end timestamp, a limit, and a
sorting method.

Response Fields

For trading pair symbols (ex. tBTCUSD)

| Index | Field  | Type  | Description                                       |
| ----- | ------ | ----- | ------------------------------------------------- |
| [0]   | ID     | int   | ID of the trade                                   |
| [1]   | MTS    | int   | Millisecond epoch timestamp                       |
| [2]   | AMOUNT | float | How much was bought (positive) or sold (negative) |
| [3]   | PRICE  | float | Price at which the trade was executed             |

For funding currency symbols (ex. fUSD)

| Index | Field  | Type  | Description                                       |
| ----- | ------ | ----- | ------------------------------------------------- |
| [0]   | ID     | int   | ID of the trade                                   |
| [1]   | MTS    | int   | Millisecond epoch timestamp                       |
| [2]   | AMOUNT | float | How much was bought (positive) or sold (negative) |
| [3]   | RATE   | float | Rate at which funding transaction occurred        |
| [4]   | PERIOD | int   | Amount of time the funding transaction was for    |

---

| --- | --- | | Rate Limit: | 15 reqs/min (requests per minute) |

Path Params

symbol

string

required

Defaults to tBTCUSD

The symbol you want information about. (e.g. tBTCUSD, tETHUSD, fUSD, fBTC)

Query Params

limit

int32

Defaults to 125

Number of records in response (max. 10000).

sort

int32

Defaults to -1

+1: sort in ascending order | -1: sort in descending order (by MTS field).

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given
as response.

end

int64

If end is given, only records with MTS <= end (milliseconds) will be given as
response.

Response

curl \--request GET \\

     \--url 'https://api-pub.bitfinex.com/v2/trades/tBTCUSD/hist?limit=125&sort=-1' \\

     \--header 'accept: application/json'
