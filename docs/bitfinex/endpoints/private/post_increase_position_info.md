# Increase Position Info

# Increase Position Info

post https://api.bitfinex.com/v2/auth/r/position/increase/info

Returns information relevant to the increase position endpoint.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

**Response Fields**

| Index | Field         | Type                                          | Description                                                                            |
| ----- | ------------- | --------------------------------------------- | -------------------------------------------------------------------------------------- |
| \[0\] | POSITION INFO | [Position Info Array](#position-info-index-0) | Position info                                                                          |
| \[1\] | BALANCE INFO  | [Balance Info Array](#balance-info-index-1)   | Array of info with base currency balance, tradable balance data, and available funding |

| \[ . . . \]

| | \[4\] | FUNDING INFO | [Funding Info Array](#funding-info-index-4) | Array
with data on funding required | | \[5\] | FUNDING CURRENCY INFO |
[Funding Currency Info Array](#funding-currency-info-index-5) | Array with
additional info on funding required |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Position Info (Index \[0\])

[](#position-info-index-0)

| Index | Field       | Type  | Description                                             |
| ----- | ----------- | ----- | ------------------------------------------------------- |
| \[0\] | MAX_POS     | float | Maximum position size for increase position on the pair |
| \[1\] | CURRENT_POS | float | Size of current position on the pair                    |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Balance Info (Index \[1\])

[](#balance-info-index-1)

| Index | Field                 | Type                                                         | Description                                                                                              |
| ----- | --------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| \[0\] | BASE_CURRENCY_BALANCE | float                                                        | Current margin wallet balance in the base currency                                                       |
| \[1\] | TRADABLE BALANCE INFO | [Tradable Balance Info Array](#tradable-balance-info-index1) | Array with total and current tradable balances for both currencies                                       |
| \[2\] | FUNDING_AVAIL         | float                                                        | Available funding below 0.75% (currency depends on the funding currency required for the entered amount) |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Tradable Balance Info (Index\[1\])

[](#tradable-balance-info-index1)

| Index | Field                           | Type  | Description                                                                   |
| ----- | ------------------------------- | ----- | ----------------------------------------------------------------------------- |
| \[0\] | TRADABLE_BALANCE_QUOTE_CURRENCY | float | Tradable balance in the quote currency adjusted for open orders and positions |
| \[1\] | TRADABLE_BALANCE_QUOTE_TOTAL    | float | Tradable balance in the quote currency non-adjusted                           |
| \[2\] | TRADABLE_BALANCE_BASE_CURRENCY  | float | Tradable balance in the base currency adjusted for open orders and positions  |
| \[3\] | TRADABLE_BALANCE_BASE_TOTAL     | float | Tradable balance in the base currency non-adjusted                            |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Funding Info (Index \[4\])

[](#funding-info-index-4)

| Index | Field            | Type  | Description                                             |
| ----- | ---------------- | ----- | ------------------------------------------------------- |
| \[0\] | FUNDING_VALUE    | float | Value of funding required in opposite currency          |
| \[1\] | FUNDING_REQUIRED | float | Funding required for a position of the specified amount |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Funding Currency Info (Index \[5\])

[](#funding-currency-info-index-5)

| Index | Field                     | Type   | Description                            |
| ----- | ------------------------- | ------ | -------------------------------------- |
| \[0\] | FUNDING_VALUE_CURRENCY    | string | Currency of the FUNDING_VALUE field    |
| \[1\] | FUNDING_REQUIRED_CURRENCY | string | Currency of the FUNDING_REQUIRED field |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

symbol

string

required

Defaults to tBTCUSD

Trading pair on which you wish to open a position

amount

string

Defaults to 123

Amount of the position. (positive for long, negative for short)

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

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

10

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/position/increase/info \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"symbol": "tBTCUSD",

8

"amount": "123"

9

}

10

'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Positions Source:
https://docs.bitfinex.com/reference/rest-auth-increase-position-info Path:
/v2/auth/r/position/increase/info Method: POST
