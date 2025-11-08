# Margin Info

# Margin Info

post https://api.bitfinex.com/v2/auth/r/info/margin/{key}

Get account margin information (like P/L, Swaps, Margin Balance, Tradable Balance and others). Use different keys (base, SYMBOL, sym\_all) to retrieve different kinds of data.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

### 

Margin base response fields

[](#margin-base-response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | KEY | string | Key for the request ('base') |
| \[1\] | DATA | [Margin base data array](#margin-base-data-array) | Response data associated with the requested key |

#### 

Margin base data array

[](#margin-base-data-array)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | USER\_PL | float | User profit and loss |
| \[1\] | USER\_SWAPS | float | Amount of swaps a user has |
| \[2\] | MARGIN\_BALANCE | float | Balance in margin wallet |
| \[3\] | MARGIN\_NET | float | Balance in margin wallet including P&L |
| \[4\] | MARGIN\_MIN | float | Minimum required margin for current positions |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

### 

Margin symbol response fields

[](#margin-symbol-response-fields)

#### 

Margin symbol

[](#margin-symbol)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | KEY | string | Key for the request ('sym') |
| \[1\] | SYMBOL | string | Pair (e.g. 'tBTCUSD', 'tETHUSD', ...) |
| \[2\] | DATA | [Margin symbol data array](#margin-symbol-data-array) | Response data associated with the requested key |

#### 

Margin sym\_all

[](#margin-sym_all)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | Margin symbol array | [Margin symbol](#margin-symbol) | Each index contains one of the n margin symbol arrays. This returns margin symbol data for each margin-enabled trading pair. |

#### 

Margin symbol data array

[](#margin-symbol-data-array)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | TRADABLE\_BALANCE | float | Your buying power (how large a position you can obtain) |
| \[1\] | GROSS\_BALANCE | float | Your buying power including funds already reserved for open positions |
| \[2\] | BUY | float | Maximum amount you can buy at current best ASK |
| \[3\] | SELL | float | Maximum amount you can sell at current best BID |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

> 📘
> 
> ### 
> 
> Limited to Margin Trading
> 
> [](#limited-to-margin-trading)
> 
> The v2 Margin Info endpoint is limited to margin trading and does not provide information related to derivatives trading.

Path Params

key

string

required

"base" | SYMBOL | sym\_all

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

     \--url https://api.bitfinex.com/v2/auth/r/info/margin/key \\

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
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-info-margin
Path: /v2/auth/r/info/margin/key
Method: POST
