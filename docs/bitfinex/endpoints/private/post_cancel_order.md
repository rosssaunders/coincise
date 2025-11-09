# Cancel Order

# Cancel Order

post https://api.bitfinex.com/v2/auth/w/order/cancel

Cancels one of the current user's orders.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

Users can cancel their margin, exchange and derivative orders by providing their
IDs.

Alternatively, users can cancel an order using its CID along with a date
(YYYY-MM-DD).

Both the ID and CID of an order can be get through the
[Retrieve Orders](/reference/rest-auth-retrieve-orders) and
[Retrieve Orders (by symbol)](/reference/rest-auth-retrieve-orders-by-symbol)
endpoints.

###

Response Fields

[](#response-fields)

This endpoint returns a notification.

| Index | Field      | Type   | Description                                  |
| ----- | ---------- | ------ | -------------------------------------------- |
| \[0\] | MTS        | int    | Milliseconds epoch timestamp of notification |
| \[1\] | TYPE       | string | Notification's type ("oc-req")               |
| \[2\] | MESSAGE_ID | int    | Unique notification's ID                     |

| \[ . . . \]

| | \[4\] | DATA | [Order](#order-objects) | The order that has been cancelled |
| \[5\] | CODE | int | W.I.P. (work in progress) | | \[6\] | STATUS | string |
Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...)
| | \[7\] | TEXT | string | Additional notification description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Order data array

[](#order-data-array)

| Index  | Field       | Type   | Description                                         |
| ------ | ----------- | ------ | --------------------------------------------------- |
| \[0\]  | ID          | int    | Order ID                                            |
| \[1\]  | GID         | int    | Group Order ID                                      |
| \[2\]  | CID         | int    | Client Order ID                                     |
| \[3\]  | SYMBOL      | string | Trading pair (tBTCUSD, tLTCETH, ...)                |
| \[4\]  | MTS_CREATE  | int    | Millisecond epoch timestamp of creation             |
| \[5\]  | MTS_UPDATE  | int    | Millisecond epoch timestamp of last update          |
| \[6\]  | AMOUNT      | float  | Positive means buy, negative means sell             |
| \[7\]  | AMOUNT_ORIG | float  | Original amount (before any update)                 |
| \[8\]  | ORDER_TYPE  | string | The order's type (see list below)                   |
| \[9\]  | TYPE_PREV   | string | Previous order type (before the last update)        |
| \[10\] | MTS_TIF     | int    | Millisecond epoch timestamp for TIF (Time-In-Force) |

| \[ . . . \]

| | \[12\] | FLAGS | int | Sum of all active flags for the order (values can be
found [here](https://docs.bitfinex.com/v2/docs/flag-values)) | | \[13\] | STATUS
| string | A complete overview on available order statuses can be found
[here](https://docs.bitfinex.com/docs/abbreviations-glossary#order-status) | |

\[ . . . \]

| | \[16\] | PRICE | float | Price | | \[17\] | PRICE_AVG | float | Average
price | | \[18\] | PRICE_TRAILING | float | The trailing price | | \[19\] |
PRICE_AUX_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) | |

\[ . . . \]

| | \[23\] | NOTIFY | int | 1 if operations on order must trigger a
notification, 0 if operations on order must not trigger a notification | |
\[24\] | HIDDEN | int | 1 if order must be hidden, 0 if order must not be hidden
| | \[25\] | PLACED_ID | int | If another order caused this order to be placed
(OCO) this will be that other order's ID | |

\[ . . . \]

| | \[28\] | ROUTING | string | Indicates origin of action: BFX, API>BFX | |

\[ . . . \]

| | \[31\] | META | JSON | Additional meta information about the order ( $F7 =
IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int), aff_code:
"aff_code_here") |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

> 📘
>
> ###
>
> Available order types
>
> [](#available-order-types)
>
> Available order types are: `LIMIT`, `EXCHANGE LIMIT`, `MARKET`,
> `EXCHANGE MARKET`, `STOP`, `EXCHANGE STOP`, `STOP LIMIT`,
> `EXCHANGE STOP LIMIT`, `TRAILING STOP`, `EXCHANGE TRAILING STOP`, `FOK`,
> `EXCHANGE FOK`, `IOC`, `EXCHANGE IOC`.

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

Body Params

id

integer

The ID of the order to cancel (can be get using the
[Retrieve Orders](/reference#rest-auth-retrieve-orders) and the
[Retrieve Orders (by symbol)](/reference#rest-auth-retrieve-orders-by-symbol)
endpoints).

cid

integer

The CID of the order to cancel. Users must also provide a `cid_date` to cancel
an order through its CID. Providing only the CID will cause the endpoint to
return an error. (int45)

cid_date

date

An YYYY-MM-DD date to provide along with an order's CID.

Response

#

200

200

Response body

array

Updated about 1 month ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/order/cancel \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json'

RESPONSE

Examples

Choose an example:

application/json

200 - Result

Updated about 1 month ago

---

---

Section: Orders Source:
https://docs.bitfinex.com/reference/rest-auth-cancel-order Path:
/v2/auth/w/order/cancel Method: POST
