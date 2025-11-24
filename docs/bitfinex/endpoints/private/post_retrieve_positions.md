# POST /v2/auth/r/positions

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-positions](https://docs.bitfinex.com/reference/rest-auth-positions)

post

https://api.bitfinex.com/v2/auth/r/positions

Get active positions

Response Fields

| Index | Field          | Type                               | Description                                               |
| ----- | -------------- | ---------------------------------- | --------------------------------------------------------- |
| [0]   | POSITION_ARRAY | [Position Array](#positions-array) | Each index contains one of the n current user's positions |

Positions Array

| Index | Field          | Type     | Description                                                                                       |
| ----- | -------------- | -------- | ------------------------------------------------------------------------------------------------- |
| [0]   | SYMBOL         | string   | Pair (tBTCUSD ...)                                                                                |
| [1]   | STATUS         | string   | Position status (ACTIVE)                                                                          |
| [2]   | AMOUNT         | float    | Position value. Positive for long and negative for short positions                                |
| [3]   | BASE_PRICE     | float    | Base price of the position (average traded price of all previous orders related to the position). |
| [4]   | FUNDING        | float    | Amount of funding associated with the position                                                    |
| [5]   | FUNDING_TYPE   | int      | 0 for daily, 1 for term                                                                           |
| [6]   | PL             | float    | Profit & Loss (includes 0.2% fee to close position)                                               |
| [7]   | PL_PERC        | float    | Profit & loss percentage                                                                          |
| [8]   | PRICE_LIQ      | float    | Liquidation price                                                                                 |
| [9]   | LEVERAGE       | float    | Leverage used for the position                                                                    |
| [11]  | POSITION_ID    | int      | Position ID                                                                                       |
| [12]  | MTS_CREATE     | int      | Millisecond timestamp of creation                                                                 |
| [13]  | MTS_UPDATE     | int      | Millisecond timestamp of update                                                                   |
| [15]  | TYPE           | int      | Identifies the type of position: 0 = Margin position, 1 = Derivatives position                    |
| [17]  | COLLATERAL     | float    | Position collateral                                                                               |
| [18]  | COLLATERAL_MIN | float    | Min Collateral Required                                                                           |
| [19]  | META           | JSON str | Meta data about the position                                                                      |

**Ratelimit**: 90 req/min

Body Params

RAW_BODY

json

Defaults to {}

{}

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/positions \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '{}'
