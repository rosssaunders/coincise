# POST /v2/auth/w/deriv/collateral/set

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-deriv-pos-collateral-set](https://docs.bitfinex.com/reference/rest-auth-deriv-pos-collateral-set)

post

https://api.bitfinex.com/v2/auth/w/deriv/collateral/set

Update the amount of collateral assigned to a derivative position

Sets the amount of collateral, applied to the active derivative position, for
the given symbol.

!

**Response Fields**

| Index | Field  | Type | Description             |
| ----- | ------ | ---- | ----------------------- |
| [0]   | STATUS | int  | Returns 1 if successful |

**Ratelimit**: 90 req/min

symbol

string

The derivative symbol, e.g. tBTCF0:USTF0

collateral

float

The amount of collateral to apply to the open position

{

"symbol": "tBTCF0:USTF0",

"collateral": 1150.61

}

'
