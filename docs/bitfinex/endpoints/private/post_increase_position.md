# POST /v2/auth/w/position/increase

**Source:** [https://docs.bitfinex.com/reference/rest-auth-position-increase](https://docs.bitfinex.com/reference/rest-auth-position-increase)

post

https://api.bitfinex.com/v2/auth/w/position/increase

Essentially a reverse of the [Claim Position](/reference#rest-auth-position-claim) feature, the Increase Position feature allows you to create a new position using the funds in your margin wallet. For more information about this feature, please look to the [Increase Position article](https://support.bitfinex.com/hc/en-us/articles/900004477903-Increase-Position) on our knowledge base.

The Increase Position feature requires a verified or paper trading account. Full verification is required to use the increase position feature to open a long position on pairs with a fiat quote currency.

> 🚧
> 
> ### 
> 
> Verification Required
> 
> 
> 
> The Increase Position feature is only available on accounts with, basic+, intermediate or full [verification levels](https://support.bitfinex.com/hc/en-us/articles/360017321633-Verification-Levels-and-Advantages) or on accounts marked for paper trading.
> 
> Full verification is required to use the increase position feature to open a long position on pairs with a fiat quote currency.

Response Fields

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Seconds epoch timestamp of notification |
| [1] | TYPE | string | Notification's type ("pmi-req") |
| [2] | MESSAGE\_ID | int | Unique notification's ID |
| [4] | DATA | [Position increase array](#position-increase-array)[] | An array containing info on the position increase |
| [5] | CODE | int | W.I.P. (work in progress) |
| [6] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | string | Additional notification description |

Position increase array

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | SYMBOL | string | Pair (tBTCUSD, …) |
| [2] | AMOUNT | float | Size of the position. Positive for long, negative for short positions |
| [3] | BASE\_PRICE | float | Base price of the position (average of all trades related to the position) |

**Ratelimit**: 90 req/min

Body Params

symbol

string

required

Defaults to tBTCUSD

Trading pair on which you wish to open a position

amount

string

required

Defaults to 123

Amount of the position. (positive for long, negative for short)

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/position/increase \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "symbol": "tBTCUSD",

  "amount": "123"

}

'
