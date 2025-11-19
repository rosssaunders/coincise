# Increase Position Info

post https://api.bitfinex.com/v2/auth/r/position/increase/info

Returns information relevant to the increase position endpoint.

**Response Fields**

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | POSITION INFO | [Position Info Array](#position-info-index-0) | Position info |
| [1] | BALANCE INFO | [Balance Info Array](#balance-info-index-1) | Array of info with base currency balance, tradable balance data, and available funding |
[ . . . ]

| [4] | FUNDING INFO | [Funding Info Array](#funding-info-index-4) | Array with data on funding required |
| [5] | FUNDING CURRENCY INFO | [Funding Currency Info Array](#funding-currency-info-index-5) | Array with additional info on funding required |

Position Info (Index [0])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MAX\_POS | float | Maximum position size for increase position on the pair |
| [1] | CURRENT\_POS | float | Size of current position on the pair |

Balance Info (Index [1])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | BASE\_CURRENCY\_BALANCE | float | Current margin wallet balance in the base currency |
| [1] | TRADABLE BALANCE INFO | [Tradable Balance Info Array](#tradable-balance-info-index1) | Array with total and current tradable balances for both currencies |
| [2] | FUNDING\_AVAIL | float | Available funding below 0.75% (currency depends on the funding currency required for the entered amount) |

Tradable Balance Info (Index[1])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | TRADABLE\_BALANCE\_QUOTE\_CURRENCY | float | Tradable balance in the quote currency adjusted for open orders and positions |
| [1] | TRADABLE\_BALANCE\_QUOTE\_TOTAL | float | Tradable balance in the quote currency non-adjusted |
| [2] | TRADABLE\_BALANCE\_BASE\_CURRENCY | float | Tradable balance in the base currency adjusted for open orders and positions |
| [3] | TRADABLE\_BALANCE\_BASE\_TOTAL | float | Tradable balance in the base currency non-adjusted |

Funding Info (Index [4])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | FUNDING\_VALUE | float | Value of funding required in opposite currency |
| [1] | FUNDING\_REQUIRED | float | Funding required for a position of the specified amount |

Funding Currency Info (Index [5])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | FUNDING\_VALUE\_CURRENCY | string | Currency of the FUNDING\_VALUE field |
| [1] | FUNDING\_REQUIRED\_CURRENCY | string | Currency of the FUNDING\_REQUIRED field |

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

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/position/increase/info \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "symbol": "tBTCUSD",

  "amount": "123"

}

'

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-increase-position-info
Path: /v2/auth/r/position/increase/info
Method: POST
