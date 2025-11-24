# POST /v2/auth/w/order/cancel/multi

**Source:**
[https://docs.bitfinex.com/reference/rest-auth-cancel-orders-multiple](https://docs.bitfinex.com/reference/rest-auth-cancel-orders-multiple)

post

https://api.bitfinex.com/v2/auth/w/order/cancel/multi

Cancels multiple orders simultaneously. Orders can be canceled based on the
Order ID, the combination of Client Order ID and Client Order Date, or the Group
Order ID. Alternatively, the body param 'all' can be used with a value of 1 to
cancel all orders.

Response Fields

This endpoint returns a notification.

| Index | Field      | Type                      | Description                                                                      |
| ----- | ---------- | ------------------------- | -------------------------------------------------------------------------------- |
| [0]   | MTS        | int                       | Milliseconds epoch timestamp of notification                                     |
| [1]   | TYPE       | string                    | Notification's type ("oc_multi-req")                                             |
| [2]   | MESSAGE_ID | int                       | Unique notification's ID                                                         |
| [4]   | DATA       | [Order](#order-objects)[] | An array containing all orders that have been cancelled                          |
| [5]   | CODE       | int                       | W.I.P. (work in progress)                                                        |
| [6]   | STATUS     | string                    | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7]   | TEXT       | string                    | Additional notification description                                              |

Order data arrays

| Index | Field           | Type   | Description                                                                                                                                 |
| ----- | --------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| [0]   | ID              | int    | Order ID                                                                                                                                    |
| [1]   | GID             | int    | Group Order ID                                                                                                                              |
| [2]   | CID             | int    | Client Order ID                                                                                                                             |
| [3]   | SYMBOL          | string | Trading pair (tBTCUSD, tLTCETH, ...)                                                                                                        |
| [4]   | MTS_CREATE      | int    | Millisecond epoch timestamp of creation                                                                                                     |
| [5]   | MTS_UPDATE      | int    | Millisecond epoch timestamp of last update                                                                                                  |
| [6]   | AMOUNT          | float  | Positive means buy, negative means sell                                                                                                     |
| [7]   | AMOUNT_ORIG     | float  | Original amount (before any update)                                                                                                         |
| [8]   | ORDER_TYPE      | string | The order's type (see list below)                                                                                                           |
| [9]   | TYPE_PREV       | string | Previous order type (before the last update)                                                                                                |
| [10]  | MTS_TIF         | int    | Millisecond epoch timestamp for TIF (Time-In-Force)                                                                                         |
| [12]  | FLAGS           | int    | Sum of all active flags for the order (values can be found [here](https://docs.bitfinex.com/v2/docs/flag-values))                           |
| [13]  | STATUS          | string | A complete overview on available order statuses can be found [here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status)     |
| [16]  | PRICE           | float  | Price                                                                                                                                       |
| [17]  | PRICE_AVG       | float  | Average price                                                                                                                               |
| [18]  | PRICE_TRAILING  | float  | The trailing price                                                                                                                          |
| [19]  | PRICE_AUX_LIMIT | float  | Auxiliary Limit price (for STOP LIMIT)                                                                                                      |
| [23]  | NOTIFY          | int    | 1 if operations on order must trigger a notification, 0 if operations on order must not trigger a notification                              |
| [24]  | HIDDEN          | int    | 1 if order must be hidden, 0 if order must not be hidden                                                                                    |
| [25]  | PLACED_ID       | int    | If another order caused this order to be placed (OCO) this will be that other order's ID                                                    |
| [28]  | ROUTING         | string | Indicates origin of action: BFX, API>BFX                                                                                                    |
| [31]  | META            | JSON   | Additional meta information about the order ( $F7 = IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code: "aff_code_here") |

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

| --- | --- | | Rate Limit: | 90 reqs/min (requests per minute) |

Body Params

id

integer

An array containing the IDs of the orders to delete.

gid

integer

An array containing the GIDs of the orders to delete.

cid

json

An array of tuples containing the cid and cid_date pairs of the orders to
delete.

all

int32

If set to 1, cancels all open orders (both trading and derivative)

Response

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/order/cancel/multi \\

     \--header 'Content-Type: application/json' \\

     \--header 'accept: application/json'
