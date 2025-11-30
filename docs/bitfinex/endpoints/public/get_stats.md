# GET /v2/stats1/{key}:{size}:{sym_platform}:{side_pair}/{section}

**Source:**
[https://docs.bitfinex.com/reference/rest-public-stats](https://docs.bitfinex.com/reference/rest-public-stats)

get

https://api-pub.bitfinex.com/v2/stats1/{key}:{size}:{sym\_platform}:{side\_pair}/{section}

The Stats endpoint provides various statistics on a specified trading pair or
funding currency. Use the available keys to specify which statistic you wish to
retrieve.

Response Fields

| Index | Field | Type  | Description                 |
| ----- | ----- | ----- | --------------------------- |
| [0]   | MTS   | int   | Millisecond epoch timestamp |
| [1]   | VALUE | float | Total amount                |

Available keys and arguments

| Key                     | Size | Sym/Platform          | Side/Pair             | Example                                             |
| ----------------------- | ---- | --------------------- | --------------------- | --------------------------------------------------- |
| pos.size                | 1m   | tBTCUSD, tLTCUSD, ... | short, long           | pos.size:1m:tBTCUSD:short, pos.size:1m:tBTCUSD:long |
| funding.size            | 1m   | fUSD, fETH, ...       | \-                    | funding.size:1m:fUSD                                |
| credits.size            | 1m   | fUSD, fETH, ...       | \-                    | credits.size:1m:fUSD                                |
| credits.size.sym        | 1m   | fUSD, fETH, ...       | tBTCUSD, tLTCUSD, ... | credits.size.sym:1m:fUSD:tBTCUSD                    |
| vol.1d, vol.7d, vol.30d | 30m  | BFX                   | \-                    | vol.1d:30m:BFX                                      |
| vwap                    | 1d   | tBTCUSD, tLTCUSD, ... | \-                    | vwap:1d:tBTCUSD                                     |

Available keys description

| Key                     | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| pos.size                | Total longs/shorts in base currency (i.e. BTC for tBTCUSD)          |
| funding.size            | Total active funding in specified CCY                               |
| credits.size            | Total funding used in positions in specified CCY                    |
| credits.size.sym        | Total funding used in positions on a specific pair in specified CCY |
| vol.1d, vol.7d, vol.30d | Total trading volume for specified time period (1d/7d/30d)          |
| vwap                    | Volume weighted average price for the day                           |

> 🚧
>
> Specifying either "hist" or "last" section is mandatory for all keys.

---

| --- | --- | | Rate Limit: | 15 reqs/min (requests per minute) |

Path Params

key

string

required

Available keys: "funding.size", "credits.size", "credits.size.sym", "pos.size",
"vol.1d", "vol.7d", "vol.30d", "vwap"

size

string

required

Available values: '1m' (for keys: "pos.size", "funding.size", "credits.size",
"credits.size.sym"), "30m" (for keys: vol.1d, vol.7d, vol.30d), "1d" (for keys:
vwap)

sym_platform

string

required

The symbol you want information about. (e.g. tBTCUSD, tETHUSD, fUSD, fBTC) (used
for keys: "pos.size", "funding.size", "credits.size", "credits.size.sym",
"vwap", "vol1d/7d/30d").

side_pair

string

required

Used to specify the side for "pos.size" key. Available values: "long", "short".
Only for non-funding queries. Used to specify the trading pair on
credits.size.sym.

section

string

required

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
