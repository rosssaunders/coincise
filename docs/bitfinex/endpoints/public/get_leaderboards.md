# GET /v2/rankings/{Key}:{Time_Frame}:{Symbol}/{Section}

**Source:** [https://docs.bitfinex.com/reference/rest-public-rankings](https://docs.bitfinex.com/reference/rest-public-rankings)

get

https://api-pub.bitfinex.com/v2/rankings/{Key}:{Time\_Frame}:{Symbol}/{Section}

The leaderboards endpoint allows you to retrieve leaderboard standings for unrealized profit (period delta), unrealized profit (inception), volume, and realized profit.

> 📘
> 
> ### 
> 
> Leaderboard Competitions
> 
> 
> 
> The [Configs Endpoint](https://dash.readme.io/project/bitfinex/v2/refs/rest-public-conf) can be used to retrieve a list of all competitions shown on our [Leaderboards](https://leaderboard.bitfinex.com/).
> 
> The endpoint can be called like this: [https://api-pub.bitfinex.com/v2/conf/pub:list:competitions](https://api-pub.bitfinex.com/v2/conf/pub:list:competitions)

Key

Available Time Frames

Available Symbols

| --- | --- | --- |

"plu\_diff" - (Unrealised Profit (Period Delta))

"1w", "1M"

tGLOBAL:USD

"plu" - (Unrealised Profit (Inception))

"3h" - for specific pairs  
"1w", "1M" - for tGLOBAL:USD

-   Trading Pairs (e.g. tBTCUSD, tETHUSD)
-   tGLOBAL:USD

"plr" - (Realized Profit)

"1w", "1M"

tGLOBAL:USD

"vol" - (Volume)

"3h", "1w", "1M"

-   Trading Pairs (e.g. tBTCUSD, tETHUSD)
-   tGLOBAL:USD

**Response Details**

| Fields | Type | Description |
| --- | --- | --- |
| MTS | int | millisecond timestamp |
| USERNAME | string | Username |
| RANKING | int | Place on leaderboard |
| VALUE | float | Value of volume, unrealized profit, or realized profit |
| TWITTER\_HANDLE | string | Shows the user's Twitter handle (if available) |

**Ratelimit**: 90 req/min

Path Params

Key

string

required

Defaults to vol

Allowed values: "plu\_diff" for unrealized profit (period delta); "plu" for unrealized profit (inception); "vol" for volume; "plr" for realized profit

Time\_Frame

string

required

Defaults to 3h

Available values: "3h", "1w", "1M" - see table below for available time frames per key

Symbol

string

required

Defaults to tBTCUSD

The symbol you want information about. (e.g. tBTCUSD, tETHUSD, tGLOBAL:USD) - see table below for available symbols per key

Section

string

required

Defaults to hist

Available values: "hist"

Query Params

sort

int32

Defaults to -1

if = 1 it sorts results returned with old > new

start

int64

Defaults to null

Millisecond start time

end

int64

Defaults to null

Millisecond end time

limit

int32

Defaults to 125

Number of records (Max: 10000)

Responses

Request

curl \--request GET \\

     \--url 'https://api-pub.bitfinex.com/v2/rankings/vol:3h:tBTCUSD/hist?sort=-1&start=null&end=null&limit=125' \\

     \--header 'accept: application/json'
