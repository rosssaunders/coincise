# Orders History (by symbol)

post

https://api.bitfinex.com/v2/auth/r/orders/{symbol}/hist

Retrieves all user's closed/cancelled orders up to 2 weeks in the past by
trading pair symbol (e.g. tBTCUSD, tLTCBTC, ...).

Response Fields

| Index | Field       | Type   | Description                                         |
| ----- | ----------- | ------ | --------------------------------------------------- |
| [0]   | ID          | int    | Order ID                                            |
| [1]   | GID         | int    | Group Order ID                                      |
| [2]   | CID         | int    | Client Order ID                                     |
| [3]   | SYMBOL      | string | Trading pair (tBTCUSD, tLTCBTC, ...)                |
| [4]   | MTS_CREATE  | int    | Millisecond epoch timestamp of creation             |
| [5]   | MTS_UPDATE  | int    | Millisecond epoch timestamp of last update          |
| [6]   | AMOUNT      | float  | Positive means buy, negative means sell             |
| [7]   | AMOUNT_ORIG | float  | Original amount (before any update)                 |
| [8]   | ORDER_TYPE  | string | The order's type (see list below)                   |
| [9]   | TYPE_PREV   | string | Previous order type (before the last update)        |
| [10]  | MTS_TIF     | int    | Millisecond epoch timestamp for TIF (Time-In-Force) |

[ . . . ]

| [12] | FLAGS | int | Sum of all active flags for the order (values can be
found [here](https://docs.bitfinex.com/v2/docs/flag-values)) | | [13] | STATUS |
string | A complete overview on available order statuses can be found
[here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) |

[ . . . ]

| [16] | PRICE | float | Price | | [17] | PRICE_AVG | float | Average price | |
[18] | PRICE_TRAILING | float | The trailing price | | [19] | PRICE_AUX_LIMIT |
float | Auxiliary Limit price (for STOP LIMIT) |

[ . . . ]

| [23] | NOTIFY | int | 1 if operations on order must trigger a notification, 0
if operations on order must not trigger a notification | | [24] | HIDDEN | int |
1 if order must be hidden, 0 if order must not be hidden | | [25] | PLACED_ID |
int | If another order caused this order to be placed (OCO) this will be that
other order's ID |

[ . . . ]

| [28] | ROUTING | string | Indicates origin of action: BFX, API>BFX |

[ . . . ]

| [31] | META | JSON | Additional meta information about the order ( $F7 =
IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code:
"aff_code_here") |

> 📘
>
> ###
>
> Available order types
>
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`,
> `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`,
> `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`,
> `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

---

<table><tbody><tr><td>Rate Limit:</td><td>90 reqs/min (requests per minute)</td></tr></tbody></table>

Path Params

symbol

string

required

Defaults to tBTCUSD

The symbol for which to retrieve order history (e.g. tBTCUSD, tETHUSD, ...).

Body Params

start

int64

If start is given, only records with MTS_CREATE >= start (milliseconds) will be
given as response.

end

int64

If end is given, only records with MTS_CREATE <= end (milliseconds) will be
given as response.

limit

int32

Number of records in response (max. 2500)

id

array of int64s

Allows users to retrieve specific orders by Order ID (id: [ID1, ID2, ID3]).

id

Response

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/orders/tBTCUSD/hist \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json'

---

Section: Orders Source:
https://docs.bitfinex.com/reference/rest-auth-orders-history-by-symbol Path:
/v2/auth/r/orders/tBTCUSD/hist Method: POST
