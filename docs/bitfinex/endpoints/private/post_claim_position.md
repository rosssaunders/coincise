# Claim Position

post https://api.bitfinex.com/v2/auth/w/position/claim

The claim feature allows the use of funds you have in your Margin Wallet to settle a leveraged position as an exchange buy or sale. Claiming some or all of a position requires that you have enough partially realized P/L (you've reduced the position at a profit) and/or funds (BTC or USD) in your Margin Wallet (net of any outstanding financing charges) to satisfy some or all of the outstanding financing associated with your position.

Response fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Seconds epoch timestamp of notification |
| [1] | TYPE | string | Notification's type ("on-req") |
| [2] | MESSAGE\_ID | int | Unique notification's ID |
[ . . . ]

| [4] | DATA | [Claim Array](#claim-array)[] | An array containing info on the position claim |
| [5] | CODE | int | W.I.P. (work in progress) |
| [6] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | string | Additional notification description |

Claim array

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| [0] | SYMBOL | string | Pair (tBTCUSD, …). |
| [1] | POSITION\_STATUS | string | Status (ACTIVE, CLOSED). |
| [2] | AMOUNT | float | Size of the position. Positive values means a long position, negative values means a short position. |
| [3] | BASE\_PRICE | float | Base price of the position. (Average traded price of the previous orders of the position) |
| [4] | MARGIN\_FUNDING | float | The amount of funding being used for this position. |
| [5] | MARGIN\_FUNDING\_TYPE | int | 0 for daily, 1 for term. |
[ . . . ]

| [11] | POSITION\_ID | int | position identifier |
| [12] | MTS\_CREATE | time | Timestamp of creation (millis) |
| [13] | MTS\_UPDATE | time | Timestamp of last update (millis) |

[ . . . ]

| [15] | POS\_TYPE | int | Type of Position (0 for margin, 1 for deriv) |

[ . . . ]

| [17] | COLLATERAL | float | Position collateral |
| [18] | MIN\_COLLATERAL | float | Min Collateral Required |
| [19] | META | JSON str | Meta data about the position claim |

> 📘
> 
> ### 
> 
> Position ID
> 
> 
> 
> Position ID retrievable via [https://docs.bitfinex.com/v2/reference#rest-auth-positions](/reference#rest-auth-positions)

**Ratelimit**: 90 req/min

Body Params

id

int64

required

Position ID

amount

string

Defaults to "0.001"

Optional amount, used to perform a partial claim.

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/position/claim \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "amount": "\\"0.001\\""

}

'

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-position-claim
Path: /v2/auth/w/position/claim
Method: POST
