# POST /v2/auth/r/trades/{symbol}/hist

**Source:** [https://docs.bitfinex.com/reference/rest-auth-trades-by-symbol](https://docs.bitfinex.com/reference/rest-auth-trades-by-symbol)

post

https://api.bitfinex.com/v2/auth/r/trades/{symbol}/hist

Retrieve your trades by trading pair symbol (e.g. tBTCUSD, tLTCUSD, ...). Your most recent trades will be retrieved by default, but a timestamp can be used to retrieve time-specific data.

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | int | Trade database id |
| [1] | SYMBOL | string | Symbol (BTCUSD, …) |
| [2] | MTS | int | Execution timestamp |
| [3] | ORDER\_ID | int | Order id |
| [4] | EXEC\_AMOUNT | float | Positive means buy, negative means sell |
| [5] | EXEC\_PRICE | float | Execution price |
| [6] | ORDER\_TYPE | string | Order type |
| [7] | ORDER\_PRICE | float | Order price |
| [8] | MAKER | int | 1 if true, -1 if false |
| [9] | FEE | float | Fee |
| [10] | FEE\_CURRENCY | string | Fee currency |
| [11] | CID | int | Client Order ID |

> 🚧
> 
> ### 
> 
> Order type
> 
> 
> 
> For trades older than March 2020, the ORDER\_TYPE field will not be set.

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

Path Params

symbol

string

required

Defaults to tBTCUSD

The symbol for which to retrieve trade history (e.g. tBTCUSD, tETHUSD, ...).

Body Params

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given as response.

end

int64

If start is given, only records with MTS <= end (milliseconds) will be given as response.

limit

int32

Number of records in response (max. 2500).

sort

int32

+1: sort in ascending order | -1: sort in descending order (by MTS field).

Response

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/trades/tBTCUSD/hist \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json'
