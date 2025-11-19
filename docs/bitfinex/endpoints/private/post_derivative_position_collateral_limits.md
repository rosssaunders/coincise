# Derivative Position Collateral Limits

post https://api.bitfinex.com/v2/auth/calc/deriv/collateral/limits

Calculate the minimum and maximum collateral that can be assigned to your derivative position.

When adjusting collateral on a derivative position, the system can sometimes return an error: ["error",110202,"collateral: market risk"]. The error prevents the reduction of assigned collateral to a point where the risk of liquidation would be too high. When updating the collateral through the UI, minimum and maximum values are shown to prevent such an error. When updating collateral through the API, this endpoint can be used to calculate these minimum and maximum values.

> 🚧
> 
> ### 
> 
> Position required
> 
> 
> 
> An open position is required on the pair for which you would like to calculate the collateral limits.

**Response fields**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MIN\_COLLATERAL | float | Minimum amount of collateral that can be assigned to your current position on the provided pair. |
| [1] | MAX\_COLLATERAL | float | Maximum amount of collateral that can be assigned to your current position on the provided pair. |

**Ratelimit**: 90 req/min

Body Params

symbol

string

Defaults to tBTCF0:USTF0

The derivative symbol, e.g. tBTCF0:USTF0

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/calc/deriv/collateral/limits \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "symbol": "tBTCF0:USTF0"

}

'

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-calc-deriv-collateral-limits
Path: /v2/auth/calc/deriv/collateral/limits
Method: POST
