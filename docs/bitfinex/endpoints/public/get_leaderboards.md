# Leaderboards

# Leaderboards

get https://api-pub.bitfinex.com/v2/rankings/{Key}:{Time\_Frame}:{Symbol}/{Section}

The leaderboards endpoint allows you to retrieve leaderboard standings for unrealized profit (period delta), unrealized profit (inception), volume, and realized profit.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

> 📘
> 
> ### 
> 
> Leaderboard Competitions
> 
> [](#leaderboard-competitions)
> 
> The [Configs Endpoint](https://dash.readme.io/project/bitfinex/v2/refs/rest-public-conf) can be used to retrieve a list of all competitions shown on our [Leaderboards](https://leaderboard.bitfinex.com/).
> 
> The endpoint can be called like this: [https://api-pub.bitfinex.com/v2/conf/pub:list:competitions](https://api-pub.bitfinex.com/v2/conf/pub:list:competitions)

| 
Key

 | 

Available Time Frames

 | 

Available Symbols

 |
| --- | --- | --- |
| 

"plu\_diff" - (Unrealised Profit (Period Delta))

 | 

"1w", "1M"

 | 

tGLOBAL:USD

 |
| 

"plu" - (Unrealised Profit (Inception))

 | 

"3h" - for specific pairs  
"1w", "1M" - for tGLOBAL:USD

 | 

-   Trading Pairs (e.g. tBTCUSD, tETHUSD)
-   tGLOBAL:USD

 |
| 

"plr" - (Realized Profit)

 | 

"1w", "1M"

 | 

tGLOBAL:USD

 |
| 

"vol" - (Volume)

 | 

"3h", "1w", "1M"

 | 

-   Trading Pairs (e.g. tBTCUSD, tETHUSD)
-   tGLOBAL:USD

 |

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

# 

200

200

Response body

json

# 

400

400

Response body

object

Updated 5 months ago

* * *

Language

JavaScriptShell

Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://api-pub.bitfinex.com/v2/rankings/vol:3h:tBTCUSD/hist?sort=-1&start=null&end=null&limit=125' \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: General
Source: https://docs.bitfinex.com/reference/rest-public-rankings
Path: /v2/rankings/vol:3h:tBTCUSD/hist?sort=-1&start=null&end=null&limit=125
Method: GET
