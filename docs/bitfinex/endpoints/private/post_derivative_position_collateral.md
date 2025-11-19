# Derivative Position Collateral

post https://api.bitfinex.com/v2/auth/w/deriv/collateral/set

Update the amount of collateral assigned to a derivative position

Sets the amount of collateral, applied to the active derivative position, for the given symbol.

!

**Response Fields**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | STATUS | int | Returns 1 if successful |

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

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/deriv/collateral/set \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "symbol": "tBTCF0:USTF0",

  "collateral": 1150.61

}

'

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-deriv-pos-collateral-set
Path: /v2/auth/w/deriv/collateral/set
Method: POST
