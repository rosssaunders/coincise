# GET /v2/tickers

**Source:** [https://docs.bitfinex.com/reference/rest-public-tickers](https://docs.bitfinex.com/reference/rest-public-tickers)

get

https://api-pub.bitfinex.com/v2/tickers

The tickers endpoint provides a high level overview of the state of the market. It shows the current best bid and ask, the last traded price, as well as information on the daily volume and price movement over the last day. The endpoint can retrieve multiple tickers with a single query.

> 📘
> 
> ### 
> 
> Symbols
> 
> 
> 
> A list of possible trading pairs can be retrieved from [Configs](/reference/rest-public-conf) by calling [pub:list:pair:exchange](https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange). The API uses the format "t[Symbol]" (i.e. tBTCUSD, tETHUSD, tBTCUST, ...).
> 
> For funding use format "f[Symbol]" (e.g. fUSD, fBTC, fETH, ...). A list of all possible symbols can be retrieved from [Configs](/reference/rest-public-conf) by calling [pub:list:currency](https://api-pub.bitfinex.com/v2/conf/pub:list:currency). Please note that not all listed currencies can be provided as funding.

Response Fields

For trading pair symbols (ex. tBTCUSD)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | SYMBOL | string | The symbol of the requested ticker data |
| [1] | BID | float | Price of last highest bid |
| [2] | BID\_SIZE | float | Sum of the 25 highest bid sizes |
| [3] | ASK | float | Price of last lowest ask |
| [4] | ASK\_SIZE | float | Sum of the 25 lowest ask sizes |
| [5] | DAILY\_CHANGE | float | Amount that the last price has changed since yesterday |
| [6] | DAILY\_CHANGE\_RELATIVE | float | Relative price change since yesterday (\*100 for percentage change) |
| [7] | LAST\_PRICE | float | Price of the last trade |
| [8] | VOLUME | float | Daily volume |
| [9] | HIGH | float | Daily high |
| [10] | LOW | float | Daily low |

For funding currency symbols (ex. fUSD)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | SYMBOL | string | The symbol of the requested ticker data |
| [1] | FRR | float | Flash Return Rate - average of all fixed rate funding over the last hour |
| [2] | BID | float | Price of last highest bid |
| [3] | BID\_PERIOD | int | Bid period covered in days |
| [4] | BID\_SIZE | float | Sum of the 25 highest bid sizes |
| [5] | ASK | float | Price of last lowest ask |
| [6] | ASK\_PERIOD | int | Ask period covered in days |
| [7] | ASK\_SIZE | float | Sum of the 25 lowest ask sizes |
| [8] | DAILY\_CHANGE | float | Amount that the last price has changed since yesterday |
| [9] | DAILY\_CHANGE\_PERC | float | Relative price change since yesterday (\*100 for percentage change) |
| [10] | LAST\_PRICE | float | Price of the last trade |
| [11] | VOLUME | float | Daily volume |
| [12] | HIGH | float | Daily high |
| [13] | LOW | float | Daily low |
| [16] | FRR\_AMOUNT\_AVAILABLE | float | The amount of funding that is available at the Flash Return Rate |

* * *

| --- | --- |
| Rate Limit: | 30 reqs/min (requests per minute) |

Query Params

symbols

string

required

Defaults to ALL

The symbols you want information about as a comma separated list, or ALL for every symbol (examples of possible symbols: tBTCUSD, tETHUSD, fUSD, fBTC, ...).

Response

curl \--request GET \\

     \--url 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL' \\

     \--header 'accept: application/json'
