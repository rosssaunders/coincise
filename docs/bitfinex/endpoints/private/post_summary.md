# Summary

# Summary

post https://api.bitfinex.com/v2/auth/r/summary

Provides an overview of the different fee rates for the account as well as the
LEO discount level and the average amount of LEO held over the last 30 days.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index | Field | Type | Description |
| ----- | ----- | ---- | ----------- |

| \[ . . . \]

| | \[4\] | FEE_INFO | [Fee info array](#fee-info-array-index-4) | Array with
info on your current fee rates | | \[5\] | TRADING_VOL_AND_FEE |
[Trading vol and fee](#trading-volume-and-fees-array-index-5) | Array with data
on your trading volume and fees paid | | \[6\] | FUNDING_EARNINGS |
[Funding earnings array](#funding-earnings-array-index-6) | Array with data on
your funding earnings | |

\[ . . . \]

| | \[9\] | LEO_INFO | Object | Object with info on your LEO level and holdings.
Keys: "leo_lev" (to see your current LEO level) and "leo_amount_avg" (to see
your average LEO amount held in the past 30 days) |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Fee info array (Index \[4\])

[](#fee-info-array-index-4)

| Index | Field          | Type                                                  | Description                                     |
| ----- | -------------- | ----------------------------------------------------- | ----------------------------------------------- |
| \[0\] | MAKER_FEE_INFO | [Maker fee info array](#maker-fee-info-array-index-4) | Array with info on your current maker fee rates |
| \[1\] | TAKER_FEE_INFO | [Taker fee info array](#taker-fee-info-array-index-4) | Array with info on your current taker fee rates |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

#####

Maker fee info array (Index \[0\])

[](#maker-fee-info-array-index-0)

| Index | Field     | Type  | Description                              |
| ----- | --------- | ----- | ---------------------------------------- |
| \[0\] | MAKER_FEE | Float | Shows the maker fee rate for the account |
| \[1\] | MAKER_FEE | Float | Shows the maker fee rate for the account |
| \[2\] | MAKER_FEE | Float | Shows the maker fee rate for the account |

| \[ . . . \]

| | \[5\] | DERIV_REBATE | float | Shows the maker rebate for derivative trades
on the account |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

#####

Taker fee info array (Index \[1\])

[](#taker-fee-info-array-index-1)

| Index | Field               | Type  | Description                                                              |
| ----- | ------------------- | ----- | ------------------------------------------------------------------------ |
| \[0\] | TAKER_FEE_TO_CRYPTO | Float | Shows the taker fee rate for crypto to crypto trades on the account      |
| \[1\] | TAKER_FEE_TO_STABLE | Float | Shows the taker fee rate for crypto to stable coin trades on the account |
| \[2\] | TAKER_FEE_TO_FIAT   | Float | Shows the taker fee rate for crypto to fiat trades on the account        |

| \[ . . . \]

| | \[5\] | DERIV_TAKER_FEE | float | Shows the taker fee rate for derivative
trades on the account |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Trading volume and fees array (Index \[5\])

[](#trading-volume-and-fees-array-index-5)

| Index | Field                  | Type             | Description                                                                               |
| ----- | ---------------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| \[0\] | TRADE_VOL_30d          | Array of objects | Shows objects containing trading volume per currency and Total(USD) over the past 30 days |
| \[1\] | FEES_TRADING_30d       | Object           | Shows trading fees paid per currency over the past 30 days                                |
| \[2\] | FEES_TRADING_TOTAL_30d | Float            | Shows the USD equivalent of the total trading fees paid over the past 30 days             |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Funding earnings array (Index \[6\]

[](#funding-earnings-array-index-6)

| Index | Field | Type | Description |
| ----- | ----- | ---- | ----------- |

| \[ . . . \]

| | \[1\] | FUNDING_EARNINGS_PER_CURR | Object | Shows the amount earned on your
provided funding per currency over the past 30 days | | \[2\] |
FUNDING_EARNINGS_TOTAL | Float | Shows the USD equivalent of the total earnings
on your provided funding over the past 30 days |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

[](#body-params)Body Params

RAW_BODY

json

Defaults to {}

{}

[](#response-schemas)Responses

#

200

200

[](#restauthsummary-string-response-body)Response body

json

#

400

400

[](#restauthsummary-object-response-body)Response body

object

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/summary \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{}'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-summary Path: /v2/auth/r/summary
Method: POST
