# GET /v2/ticker/{symbol}

**Source:** [https://docs.bitfinex.com/reference/rest-public-ticker](https://docs.bitfinex.com/reference/rest-public-ticker)

get

https://api-pub.bitfinex.com/v2/ticker/{symbol}

The ticker endpoint provides a high level overview of the state of the market for a specified pair. It shows the current best bid and ask, the last traded price, as well as information on the daily volume and price movement over the last day.

Response Fields (trading pairs, ex. tBTCUSD)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | BID | float | Price of last highest bid |
| [1] | BID\_SIZE | float | Sum of the 25 highest bid sizes |
| [2] | ASK | float | Price of last lowest ask |
| [3] | ASK\_SIZE | float | Sum of the 25 lowest ask sizes |
| [4] | DAILY\_CHANGE | float | Amount that the last price has changed since yesterday |
| [5] | DAILY\_CHANGE\_RELATIVE | float | Relative price change since yesterday (\*100 for percentage change) |
| [6] | LAST\_PRICE | float | Price of the last trade |
| [7] | VOLUME | float | Daily volume |
| [8] | HIGH | float | Daily high |
| [9] | LOW | float | Daily low |

Response Fields (funding currencies, ex. fUSD)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | FRR | float | Flash Return Rate - average of all fixed rate funding over the last hour |
| [1] | BID | float | Price of last highest bid |
| [2] | BID\_PERIOD | int | Bid period covered in days |
| [3] | BID\_SIZE | float | Sum of the 25 highest bid sizes |
| [4] | ASK | float | Price of last lowest ask |
| [5] | ASK\_PERIOD | int | Ask period covered in days |
| [6] | ASK\_SIZE | float | Sum of the 25 lowest ask sizes |
| [7] | DAILY\_CHANGE | float | Amount that the last price has changed since yesterday |
| [8] | DAILY\_CHANGE\_PERC | float | Relative price change since yesterday (\*100 for percentage change) |
| [9] | LAST\_PRICE | float | Price of the last trade |
| [10] | VOLUME | float | Daily volume |
| [11] | HIGH | float | Daily high |
| [12] | LOW | float | Daily low |
| [15] | FRR\_AMOUNT\_AVAILABLE | float | The amount of funding that is available at the Flash Return Rate |

* * *

| --- | --- |
| Rate Limit: | 90 reqs/min (requests per minute) |

Path Params

symbol

string

required

Defaults to tBTCUSD

The symbol you want information about. (e.g. tBTCUSD, tETHUSD, fUSD, fBTC)

Responses

curl \--request GET \\

     \--url https://api-pub.bitfinex.com/v2/ticker/tBTCUSD \\

     \--header 'accept: application/json'
