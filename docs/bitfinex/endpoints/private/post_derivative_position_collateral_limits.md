# POST /v2/auth/calc/deriv/collateral/limits

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-calc-deriv-collateral-limits](https://docs.bitfinex.com/reference/rest-auth-calc-deriv-collateral-limits)

post

https://api.bitfinex.com/v2/auth/calc/deriv/collateral/limits

Calculate the minimum and maximum collateral that can be assigned to your
derivative position.

When adjusting collateral on a derivative position, the system can sometimes
return an error: ["error",110202,"collateral: market risk"]. The error prevents
the reduction of assigned collateral to a point where the risk of liquidation
would be too high. When updating the collateral through the UI, minimum and
maximum values are shown to prevent such an error. When updating collateral
through the API, this endpoint can be used to calculate these minimum and
maximum values.

> 🚧
>
> ###
>
> Position required
>
> An open position is required on the pair for which you would like to calculate
> the collateral limits.

**Response fields**

| Index | Field          | Type  | Description                                                                                      |
| ----- | -------------- | ----- | ------------------------------------------------------------------------------------------------ |
| [0]   | MIN_COLLATERAL | float | Minimum amount of collateral that can be assigned to your current position on the provided pair. |
| [1]   | MAX_COLLATERAL | float | Maximum amount of collateral that can be assigned to your current position on the provided pair. |

**Ratelimit**: 90 req/min

symbol

string

The derivative symbol, e.g. tBTCF0:USTF0

{

"symbol": "tBTCF0:USTF0"

}

'
