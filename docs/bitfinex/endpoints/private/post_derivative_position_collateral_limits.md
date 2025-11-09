# Derivative Position Collateral Limits

# Derivative Position Collateral Limits

post https://api.bitfinex.com/v2/auth/calc/deriv/collateral/limits

Calculate the minimum and maximum collateral that can be assigned to your
derivative position.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

When adjusting collateral on a derivative position, the system can sometimes
return an error: \["error",110202,"collateral: market risk"\]. The error
prevents the reduction of assigned collateral to a point where the risk of
liquidation would be too high. When updating the collateral through the UI,
minimum and maximum values are shown to prevent such an error. When updating
collateral through the API, this endpoint can be used to calculate these minimum
and maximum values.

> 🚧
>
> ###
>
> Position required
>
> [](#position-required)
>
> An open position is required on the pair for which you would like to calculate
> the collateral limits.

**Response fields**

| Index | Field          | Type  | Description                                                                                      |
| ----- | -------------- | ----- | ------------------------------------------------------------------------------------------------ |
| \[0\] | MIN_COLLATERAL | float | Minimum amount of collateral that can be assigned to your current position on the provided pair. |
| \[1\] | MAX_COLLATERAL | float | Maximum amount of collateral that can be assigned to your current position on the provided pair. |

**Ratelimit**: 90 req/min

Body Params

symbol

string

Defaults to tBTCF0:USTF0

The derivative symbol, e.g. tBTCF0:USTF0

Responses

#

200

200

Response body

array of numbers

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

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/calc/deriv/collateral/limits \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"symbol": "tBTCF0:USTF0"

8

}

9

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
https://docs.bitfinex.com/reference/rest-auth-calc-deriv-collateral-limits Path:
/v2/auth/calc/deriv/collateral/limits Method: POST
