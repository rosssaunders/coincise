# Summary

# Summary

post https://api.bitfinex.com/v2/auth/r/summary

Provides an overview of the different fee rates for the account as well as the LEO discount level and the average amount of LEO held over the last 30 days.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| 
\[ . . . \]

 |
| \[4\] | FEE\_INFO | [Fee info array](#fee-info-array-index-4) | Array with info on your current fee rates |
| \[5\] | TRADING\_VOL\_AND\_FEE | [Trading vol and fee](#trading-volume-and-fees-array-index-5) | Array with data on your trading volume and fees paid |
| \[6\] | FUNDING\_EARNINGS | [Funding earnings array](#funding-earnings-array-index-6) | Array with data on your funding earnings |
| 

\[ . . . \]

 |
| \[9\] | LEO\_INFO | Object | Object with info on your LEO level and holdings. Keys: "leo\_lev" (to see your current LEO level) and "leo\_amount\_avg" (to see your average LEO amount held in the past 30 days) |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Fee info array (Index \[4\])

[](#fee-info-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MAKER\_FEE\_INFO | [Maker fee info array](#maker-fee-info-array-index-4) | Array with info on your current maker fee rates |
| \[1\] | TAKER\_FEE\_INFO | [Taker fee info array](#taker-fee-info-array-index-4) | Array with info on your current taker fee rates |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

##### 

Maker fee info array (Index \[0\])

[](#maker-fee-info-array-index-0)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MAKER\_FEE | Float | Shows the maker fee rate for the account |
| \[1\] | MAKER\_FEE | Float | Shows the maker fee rate for the account |
| \[2\] | MAKER\_FEE | Float | Shows the maker fee rate for the account |
| 
\[ . . . \]

 |
| \[5\] | DERIV\_REBATE | float | Shows the maker rebate for derivative trades on the account |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

##### 

Taker fee info array (Index \[1\])

[](#taker-fee-info-array-index-1)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TAKER\_FEE\_TO\_CRYPTO | Float | Shows the taker fee rate for crypto to crypto trades on the account |
| \[1\] | TAKER\_FEE\_TO\_STABLE | Float | Shows the taker fee rate for crypto to stable coin trades on the account |
| \[2\] | TAKER\_FEE\_TO\_FIAT | Float | Shows the taker fee rate for crypto to fiat trades on the account |
| 
\[ . . . \]

 |
| \[5\] | DERIV\_TAKER\_FEE | float | Shows the taker fee rate for derivative trades on the account |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Trading volume and fees array (Index \[5\])

[](#trading-volume-and-fees-array-index-5)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TRADE\_VOL\_30d | Array of objects | Shows objects containing trading volume per currency and Total(USD) over the past 30 days |
| \[1\] | FEES\_TRADING\_30d | Object | Shows trading fees paid per currency over the past 30 days |
| \[2\] | FEES\_TRADING\_TOTAL\_30d | Float | Shows the USD equivalent of the total trading fees paid over the past 30 days |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding earnings array (Index \[6\]

[](#funding-earnings-array-index-6)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| 
\[ . . . \]

 |
| \[1\] | FUNDING\_EARNINGS\_PER\_CURR | Object | Shows the amount earned on your provided funding per currency over the past 30 days |
| \[2\] | FUNDING\_EARNINGS\_TOTAL | Float | Shows the USD equivalent of the total earnings on your provided funding over the past 30 days |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

RAW\_BODY

json

Defaults to {}

{}

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

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-summary
Path: /v2/auth/r/summary
Method: POST
