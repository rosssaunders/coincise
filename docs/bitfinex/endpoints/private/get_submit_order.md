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

---
Section: Orders
Source: https://docs.bitfinex.com/reference/rest-auth-submit-order


