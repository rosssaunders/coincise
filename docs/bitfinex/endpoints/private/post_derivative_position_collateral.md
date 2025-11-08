# Derivative Position Collateral

# Derivative Position Collateral

post https://api.bitfinex.com/v2/auth/w/deriv/collateral/set

Update the amount of collateral assigned to a derivative position

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

Sets the amount of collateral, applied to the active derivative position, for the given symbol.

![](https://files.readme.io/1e9466b-Screenshot_2.png "Screenshot_2.png")

**Response Fields**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | STATUS | int | Returns 1 if successful |

**Ratelimit**: 90 req/min

Body Params

symbol

string

Defaults to tBTCF0:USTF0

The derivative symbol, e.g. tBTCF0:USTF0

collateral

float

Defaults to 1150.61

The amount of collateral to apply to the open position

Responses

# 

200

200

Response body

array of arrays of integers

array of integers

# 

400

400

Response body

object

# 

500

500

Response body

Collateral amount is too large / small

Symbol does not support derivatives

No active positions for the given symbol

Updated 3 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

10

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/deriv/collateral/set \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

  "symbol": "tBTCF0:USTF0",

8

  "collateral": 1150.61

9

}

10

'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result500 - Collateral amount is too large / small500 - Symbol does not support derivatives500 - No active positions for the given symbol

Updated 3 months ago

* * *

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-deriv-pos-collateral-set
Path: /v2/auth/w/deriv/collateral/set
Method: POST
