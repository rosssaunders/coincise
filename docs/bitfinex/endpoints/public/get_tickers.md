# Tickers

# Tickers

get https://api-pub.bitfinex.com/v2/tickers

The tickers endpoint provides a high level overview of the state of the market.
It shows the current best bid and ask, the last traded price, as well as
information on the daily volume and price movement over the last day. The
endpoint can retrieve multiple tickers with a single query.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> 📘
>
> ###
>
> Symbols
>
> [](#symbols)
>
> A list of possible trading pairs can be retrieved from
> [Configs](/reference/rest-public-conf) by calling
> [pub:list:pair:exchange](https://api-pub.bitfinex.com/v2/conf/pub:list:pair:exchange).
> The API uses the format "t\[Symbol\]" (i.e. tBTCUSD, tETHUSD, tBTCUST, ...).
>
> For funding use format "f\[Symbol\]" (e.g. fUSD, fBTC, fETH, ...). A list of
> all possible symbols can be retrieved from
> [Configs](/reference/rest-public-conf) by calling
> [pub:list:currency](https://api-pub.bitfinex.com/v2/conf/pub:list:currency).
> Please note that not all listed currencies can be provided as funding.

###

Response Fields

[](#response-fields)

####

For trading pair symbols (ex. tBTCUSD)

[](#for-trading-pair-symbols-ex-tbtcusd)

| Index  | Field                 | Type   | Description                                                         |
| ------ | --------------------- | ------ | ------------------------------------------------------------------- |
| \[0\]  | SYMBOL                | string | The symbol of the requested ticker data                             |
| \[1\]  | BID                   | float  | Price of last highest bid                                           |
| \[2\]  | BID_SIZE              | float  | Sum of the 25 highest bid sizes                                     |
| \[3\]  | ASK                   | float  | Price of last lowest ask                                            |
| \[4\]  | ASK_SIZE              | float  | Sum of the 25 lowest ask sizes                                      |
| \[5\]  | DAILY_CHANGE          | float  | Amount that the last price has changed since yesterday              |
| \[6\]  | DAILY_CHANGE_RELATIVE | float  | Relative price change since yesterday (\*100 for percentage change) |
| \[7\]  | LAST_PRICE            | float  | Price of the last trade                                             |
| \[8\]  | VOLUME                | float  | Daily volume                                                        |
| \[9\]  | HIGH                  | float  | Daily high                                                          |
| \[10\] | LOW                   | float  | Daily low                                                           |

####

For funding currency symbols (ex. fUSD)

[](#for-funding-currency-symbols-ex-fusd)

| Index  | Field             | Type   | Description                                                              |
| ------ | ----------------- | ------ | ------------------------------------------------------------------------ |
| \[0\]  | SYMBOL            | string | The symbol of the requested ticker data                                  |
| \[1\]  | FRR               | float  | Flash Return Rate - average of all fixed rate funding over the last hour |
| \[2\]  | BID               | float  | Price of last highest bid                                                |
| \[3\]  | BID_PERIOD        | int    | Bid period covered in days                                               |
| \[4\]  | BID_SIZE          | float  | Sum of the 25 highest bid sizes                                          |
| \[5\]  | ASK               | float  | Price of last lowest ask                                                 |
| \[6\]  | ASK_PERIOD        | int    | Ask period covered in days                                               |
| \[7\]  | ASK_SIZE          | float  | Sum of the 25 lowest ask sizes                                           |
| \[8\]  | DAILY_CHANGE      | float  | Amount that the last price has changed since yesterday                   |
| \[9\]  | DAILY_CHANGE_PERC | float  | Relative price change since yesterday (\*100 for percentage change)      |
| \[10\] | LAST_PRICE        | float  | Price of the last trade                                                  |
| \[11\] | VOLUME            | float  | Daily volume                                                             |
| \[12\] | HIGH              | float  | Daily high                                                               |
| \[13\] | LOW               | float  | Daily low                                                                |

| \[ . . . \]

| | \[16\] | FRR_AMOUNT_AVAILABLE | float | The amount of funding that is
available at the Flash Return Rate |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">30 reqs/min (requests per minute)</td></tr></tbody></table>

[](#query-params)Query Params

symbols

string

required

Defaults to ALL

The symbols you want information about as a comma separated list, or ALL for
every symbol (examples of possible symbols: tBTCUSD, tETHUSD, fUSD, fBTC, ...).

[](#response-schemas)Response

#

200

200

[](#restpublictickers-string-response-body)Response body

json

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL' \\

3

     \--header 'accept: application/json'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result

Updated 5 months ago

---

---

Section: General Source: https://docs.bitfinex.com/reference/rest-public-tickers
Path: /v2/tickers?symbols=ALL Method: GET
