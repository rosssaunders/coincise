# GET /v2/candles/{candle}/{section}

**Source:**
[https://docs.bitfinex.com/reference/rest-public-candles](https://docs.bitfinex.com/reference/rest-public-candles)

get

https://api-pub.bitfinex.com/v2/candles/{candle}/{section}

The Candles endpoint provides OCHL (Open, Close, High, Low) and volume data for
the specified funding currency or trading pair. The endpoint provides the last
100 candles by default, but a limit and a start and/or end timestamp can be
specified.

Response Fields

| Index | Field  | Type  | Description                                    |
| ----- | ------ | ----- | ---------------------------------------------- |
| [0]   | MTS    | int   | Millisecond epoch timestamp                    |
| [1]   | OPEN   | int   | First execution during the time frame          |
| [2]   | CLOSE  | int   | Last execution during the time frame           |
| [3]   | HIGH   | int   | Highest execution during the time frame        |
| [4]   | LOW    | int   | Lowest execution during the timeframe          |
| [5]   | VOLUME | float | Quantity of symbol traded within the timeframe |

Available candles

Trading pair candles

| Key   | Time frame       | Trading pair                   | Example          |
| ----- | ---------------- | ------------------------------ | ---------------- |
| trade | 1m, 5m, 15m, ... | tBTCUSD, tLTCUSD, tETHUSD, ... | trade:1m:tBTCUSD |

Funding currency candles

| Key   | Time frame       | Funding currency      | Period   | Example           |
| ----- | ---------------- | --------------------- | -------- | ----------------- |
| trade | 1m, 5m, 15m, ... | fUSD, fBTC, fETH, ... | :pPERIOD | trade:1m:fUSD:p30 |

Aggregate funding currency candles

| Key   | Time frame | Funding currency | Aggregation [10, 30] | Period        | Example                  |
| ----- | ---------- | ---------------- | -------------------- | ------------- | ------------------------ |
| trade | 1m, ...    | fUSD, ...        | :aAGGR               | :pSTART:p:END | trade:1m:fUSD:a10:p2:p10 |

> 📘
>
> ###
>
> Time frame available values
>
> Available values: "1m", "5m", "15m", "30m", "1h", "3h", "6h", "12h", "1D",
> "1W", "14D", "1M".

> 🚧
>
> ###
>
> Funding Candles
>
> Be sure to specify a period or aggregated period when retrieving funding
> candles. If you wish to mimic the candles found in the UI, use the following
> setup to aggregate all funding candles: a30:p2:p30.  
> Example: [https://api-pub.bitfinex.com/v2/candles/trade:1h:fUSD:a30:p2:p30/hist](https://api-pub.bitfinex.com/v2/candles/trade:1h:fUSD:a30:p2:p30/hist).

> 🚧
>
> Specifying either "hist" or "last" section is mandatory for all keys.

---

| --- | --- | | Rate Limit: | 30 reqs/min (requests per minute) |

Path Params

candle

string

required

Defaults to trade:1m:tBTCUSD

Check [Available candles](/reference/rest-public-candles#available-candles)
table to understand how to compose this argument.

section

string

required

Defaults to hist

Available values: "last", "hist".

Query Params

sort

int32

+1: sort in ascending order | -1: sort in descending order (by MTS field).

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given
as response.

end

int64

If end is given, only records with MTS <= end (milliseconds) will be given as
response.

limit

int32

Number of records in response (max. 10000).

Response

curl \--request GET \\

     \--url https://api-pub.bitfinex.com/v2/candles/trade%3A1m%3AtBTCUSD/hist \\

     \--header 'accept: application/json'
