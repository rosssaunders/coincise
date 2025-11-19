# Submit Order

post https://api.bitfinex.com/v2/auth/w/order/submit

Submits an order on a trading pair (e.g. BTCUSD, LTCBTC, ...).

Response Fields

This endpoint returns a notification.

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Seconds epoch timestamp of notification |
| [1] | TYPE | string | Notification's type ("on-req") |
| [2] | MESSAGE\_ID | int | Unique notification's ID |
[ . . . ]

| [4] | DATA | [Order](#order-objects)[] | An array containing only the new order |
| [5] | CODE | int | W.I.P. (work in progress) |
| [6] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | string | Additional notification description |

Order data array

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | int | Order ID |
| [1] | GID | int | Group Order ID |
| [2] | CID | int | Client Order ID |
| [3] | SYMBOL | string | Trading pair (tBTCUSD, tLTCETH, ...) |
| [4] | MTS\_CREATE | int | Millisecond epoch timestamp of creation |
| [5] | MTS\_UPDATE | int | Millisecond epoch timestamp of last update |
| [6] | AMOUNT | float | Positive means buy, negative means sell |
| [7] | AMOUNT\_ORIG | float | Original amount (before any update) |
| [8] | ORDER\_TYPE | string | The order's type (see list below) |
| [9] | TYPE\_PREV | string | Previous order type (before the last update) |
| [10] | MTS\_TIF | int | Millisecond epoch timestamp for TIF (Time-In-Force) |
[ . . . ]

| [12] | FLAGS | int | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values)) |
| [13] | STATUS | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |

[ . . . ]

| [16] | PRICE | float | Price |
| [17] | PRICE\_AVG | float | Average price |
| [18] | PRICE\_TRAILING | float | The trailing price |
| [19] | PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |

[ . . . ]

| [23] | NOTIFY | int | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification |
| [24] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden |
| [25] | PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |

[ . . . ]

| [28] | ROUTING | string | Indicates origin of action: BFX, API>BFX |

[ . . . ]

| [31] | META | JSON | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff\_code: "aff\_code\_here") |

> 📘
> 
> ### 
> 
> Available order types
> 
> 
> 
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`, `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`, `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`, `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

> 📘
> 
> ### 
> 
> Using multiple flags at once
> 
> 
> 
> You may sum flag values to pass multiple flags. For example, 4160 (64 + 4096) means Hidden and Post Only.

> 🚧
> 
> ### 
> 
> meta: {aff\_code: ...}
> 
> 
> 
> API orders can now pass an affiliate code through which you can earn rebates. To learn more about these rebates and our affiliate program, please look at the relevant [announcement](https://blog.bitfinex.com/announcements/the-revolution-continues/) and [knowledge base article](https://support.bitfinex.com/hc/en-us/articles/360036965234-The-Bitfinex-Affiliate-Program).

> 🚧
> 
> ### 
> 
> meta: {protect\_selfmatch: 1}
> 
> 
> 
> The 'protect\_selfmatch' flag can be used to avoid matching orders with standing orders on the same account. This flag is passed in the meta object in the order body when submitting or updating your orders.
> 
> Note that this flag is only intended to assist users in avoiding unintentional wash trading. As per our [trading rulebook](https://www.bitfinex.com/legal/trading-rulebook), wash trading is forbidden on the platform.

* * *

<table><tbody><tr><td>Rate Limit:</td><td>90 reqs/min (requests per minute)</td></tr></tbody></table>

Body Params

type

string

required

Defaults to EXCHANGE LIMIT

The type of the order (see list above).

symbol

string

required

Defaults to tBTCUSD

The trading pair symbol to submit the order on.

amount

string

required

Defaults to 0.1

Amount of order (positive for buy, negative for sell).

price

string

required

Defaults to 10000

Price of the order.

lev

int32

Set the leverage for a derivative order, supported by derivative symbol orders only. The value should be between 1 and 100 inclusive. If omitted the default leverage value of 10 will be used.

price\_trailing

string

The trailing price for a trailing stop order.

price\_aux\_limit

string

Auxiliary Limit price (only for STOP LIMIT).

price\_oco\_stop

string

OCO (One-Cancels-Other) stop price.

gid

integer

Group ID for the order. (int45)

cid

integer

Client Order ID; should be unique in the day (UTC+0). (int45)

flags

int32

The sum of all order flags (see [https://docs.bitfinex.com/docs/flag-values](/docs/flag-values)).

tif

string

Time-In-Force: datetime for automatic order cancellation (e.g. 2020-01-15 10:45:23).

meta

object

Object to pass order meta data. Options: 'aff\_code' (to pass affiliate codes), 'make\_visible' (to toggle visible on hit for hidden orders), 'protect\_selfmatch' (to cancel submitted order if it would match with one of your own orders). Example: meta: {aff\_code: "AFF\_CODE\_HERE", make\_visible: 1}

Response

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/order/submit \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json' \\

     \--data '

{

  "type": "EXCHANGE LIMIT",

  "symbol": "tBTCUSD",

  "amount": "0.1",

  "price": "10000"

}

'

---
Section: Orders
Source: https://docs.bitfinex.com/reference/rest-auth-submit-order
Path: /v2/auth/w/order/submit
Method: POST
