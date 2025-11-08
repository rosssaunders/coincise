# Stats

# Stats

get https://api-pub.bitfinex.com/v2/stats1/{key}:{size}:{sym\_platform}:{side\_pair}/{section}

The Stats endpoint provides various statistics on a specified trading pair or funding currency. Use the available keys to specify which statistic you wish to retrieve.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Millisecond epoch timestamp |
| \[1\] | VALUE | float | Total amount |

### 

Available keys and arguments

[](#available-keys-and-arguments)

| Key | Size | Sym/Platform | Side/Pair | Example |
| --- | --- | --- | --- | --- |
| pos.size | 1m | tBTCUSD, tLTCUSD, ... | short, long | pos.size:1m:tBTCUSD:short, pos.size:1m:tBTCUSD:long |
| funding.size | 1m | fUSD, fETH, ... | \- | funding.size:1m:fUSD |
| credits.size | 1m | fUSD, fETH, ... | \- | credits.size:1m:fUSD |
| credits.size.sym | 1m | fUSD, fETH, ... | tBTCUSD, tLTCUSD, ... | credits.size.sym:1m:fUSD:tBTCUSD |
| vol.1d, vol.7d, vol.30d | 30m | BFX | \- | vol.1d:30m:BFX |
| vwap | 1d | tBTCUSD, tLTCUSD, ... | \- | vwap:1d:tBTCUSD |

### 

Available keys description

[](#available-keys-description)

| Key | Description |
| --- | --- |
| pos.size | Total longs/shorts in base currency (i.e. BTC for tBTCUSD) |
| funding.size | Total active funding in specified CCY |
| credits.size | Total funding used in positions in specified CCY |
| credits.size.sym | Total funding used in positions on a specific pair in specified CCY |
| vol.1d, vol.7d, vol.30d | Total trading volume for specified time period (1d/7d/30d) |
| vwap | Volume weighted average price for the day |

> 🚧
> 
> Specifying either "hist" or "last" section is mandatory for all keys.

* * *

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">15 reqs/min (requests per minute)</td></tr></tbody></table>

Path Params

key

string

required

Defaults to pos.size

Available keys: "funding.size", "credits.size", "credits.size.sym", "pos.size", "vol.1d", "vol.7d", "vol.30d", "vwap"

size

string

required

Defaults to 1m

Available values: '1m' (for keys: "pos.size", "funding.size", "credits.size", "credits.size.sym"), "30m" (for keys: vol.1d, vol.7d, vol.30d), "1d" (for keys: vwap)

sym\_platform

string

required

Defaults to tBTCUSD

The symbol you want information about. (e.g. tBTCUSD, tETHUSD, fUSD, fBTC) (used for keys: "pos.size", "funding.size", "credits.size", "credits.size.sym", "vwap", "vol1d/7d/30d").

side\_pair

string

required

Defaults to long

Used to specify the side for "pos.size" key. Available values: "long", "short". Only for non-funding queries. Used to specify the trading pair on credits.size.sym.

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

If start is given, only records with MTS >= start (milliseconds) will be given as response.

end

int64

If end is given, only records with MTS <= end (milliseconds) will be given as response.

limit

int32

Number of records in response (max. 10000).

Response

# 

200

200

Response body

json

Updated 5 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://api-pub.bitfinex.com/v2/stats1/pos.size:1m:tBTCUSD:long/hist \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result

Updated 5 months ago

* * *

---
Section: General
Source: https://docs.bitfinex.com/reference/rest-public-stats
Path: /v2/stats1/pos.size:1m:tBTCUSD:long/hist
Method: GET
