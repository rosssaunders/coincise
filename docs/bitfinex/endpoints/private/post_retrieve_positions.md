# Retrieve Positions

post https://api.bitfinex.com/v2/auth/r/positions

Get active positions

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | POSITION\_ARRAY | [Position Array](#positions-array) | Each index contains one of the n current user's positions |

Positions Array

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | SYMBOL | string | Pair (tBTCUSD ...) |
| [1] | STATUS | string | Position status (ACTIVE) |
| [2] | AMOUNT | float | Position value. Positive for long and negative for short positions |
| [3] | BASE\_PRICE | float | Base price of the position (average traded price of all previous orders related to the position). |
| [4] | FUNDING | float | Amount of funding associated with the position |
| [5] | FUNDING\_TYPE | int | 0 for daily, 1 for term |
| [6] | PL | float | Profit & Loss (includes 0.2% fee to close position) |
| [7] | PL\_PERC | float | Profit & loss percentage |
| [8] | PRICE\_LIQ | float | Liquidation price |
| [9] | LEVERAGE | float | Leverage used for the position |
[ . . . ]

| [11] | POSITION\_ID | int | Position ID |
| [12] | MTS\_CREATE | int | Millisecond timestamp of creation |
| [13] | MTS\_UPDATE | int | Millisecond timestamp of update |

[ . . . ]

| [15] | TYPE | int | Identifies the type of position: 0 = Margin position, 1 = Derivatives position |

[ . . . ]

| [17] | COLLATERAL | float | Position collateral |
| [18] | COLLATERAL\_MIN | float | Min Collateral Required |
| [19] | META | JSON str | Meta data about the position |

**Ratelimit**: 90 req/min

Body Params

RAW\_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/positions \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-positions
Path: /v2/auth/r/positions
Method: POST
