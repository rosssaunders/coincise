# Order Multi-OP

# Order Multi-OP

post https://api.bitfinex.com/v2/auth/w/order/multi

Send Multiple order-related operations. Please note the sent object has only one
property with a value of an array of arrays detailing each order operation. (Max
75 operations per request)

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> ❗️
>
> ###
>
> Cancel All Orders
>
> [](#cancel-all-orders)
>
> Please note that using {"all" : 1} to cancel all orders will cancel all
> trading as well as all derivatives orders. Order IDs can be passed instead to
> cancel only selected orders.

> 🚧
>
> ###
>
> meta: {protect_selfmatch: 1}
>
> [](#meta-protect_selfmatch-1)
>
> The 'protect_selfmatch' flag can be used to avoid matching orders with
> standing orders on the same account. This flag is passed in the meta object in
> the order body when submitting or updating your orders.
>
> Note that this flag is only intended to assist users in avoiding unintentional
> wash trading. As per our
> [trading rulebook](https://www.bitfinex.com/legal/trading-rulebook), wash
> trading is forbidden on the platform.

**Response Fields**

| Term            | Type            | Description                                                                                                                                                                                                                                                                                                                                                                     |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| MTS             | int             | Millisecond Time Stamp of the update                                                                                                                                                                                                                                                                                                                                            |
| TYPE            | string          | Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req')                                                                                                                                                                                                                                                                                                       |
| MESSAGE_ID      | int             | unique ID of the message                                                                                                                                                                                                                                                                                                                                                        |
| ID              | int             | Order ID                                                                                                                                                                                                                                                                                                                                                                        |
| GID             | int             | Group ID                                                                                                                                                                                                                                                                                                                                                                        |
| CID             | int             | Client Order ID                                                                                                                                                                                                                                                                                                                                                                 |
| SYMBOL          | string          | Pair (tBTCUSD, …)                                                                                                                                                                                                                                                                                                                                                               |
| MTS_CREATE      | int             | Millisecond timestamp of creation                                                                                                                                                                                                                                                                                                                                               |
| MTS_UPDATE      | int             | Millisecond timestamp of update                                                                                                                                                                                                                                                                                                                                                 |
| AMOUNT          | float           | Positive means buy, negative means sell.                                                                                                                                                                                                                                                                                                                                        |
| AMOUNT_ORIG     | float           | Original amount                                                                                                                                                                                                                                                                                                                                                                 |
| TYPE            | string          | The type of the order: LIMIT, EXCHANGE LIMIT, MARKET, EXCHANGE MARKET, STOP, EXCHANGE STOP, STOP LIMIT, EXCHANGE STOP LIMIT, TRAILING STOP, EXCHANGE TRAILING STOP, FOK, EXCHANGE FOK, IOC, EXCHANGE IOC.                                                                                                                                                                       |
| TYPE_PREV       | string          | Previous order type                                                                                                                                                                                                                                                                                                                                                             |
| MTS_TIF         | int             | Millisecond timestamp of Time-In-Force: automatic order cancellation                                                                                                                                                                                                                                                                                                            |
| ORDER_STATUS    | string          | Order Status: ACTIVE, EXECUTED @ PRICE(AMOUNT) e.g. "EXECUTED @ 107.6(-0.2)", PARTIALLY FILLED @ PRICE(AMOUNT), INSUFFICIENT MARGIN was: PARTIALLY FILLED @ PRICE(AMOUNT), CANCELED, CANCELED was: PARTIALLY FILLED @ PRICE(AMOUNT), RSN_DUST (amount is less than 0.00000001), RSN_PAUSE (trading is paused due to rebase events on AMPL or funding settlement on derivatives) |
| PRICE           | float           | Price                                                                                                                                                                                                                                                                                                                                                                           |
| PRICE_AVG       | float           | Average price                                                                                                                                                                                                                                                                                                                                                                   |
| PRICE_TRAILING  | float           | The trailing price                                                                                                                                                                                                                                                                                                                                                              |
| PRICE_AUX_LIMIT | float           | Auxiliary Limit price (for STOP LIMIT)                                                                                                                                                                                                                                                                                                                                          |
| HIDDEN          | int             | "null" if false, 1 if true                                                                                                                                                                                                                                                                                                                                                      |
| PLACED_ID       | int             | If another order caused this order to be placed (OCO) this will be that other order's ID                                                                                                                                                                                                                                                                                        |
| ROUTING         | string          | indicates origin of action: BFX, ETHFX, API>BFX, API>ETHFX                                                                                                                                                                                                                                                                                                                      |
| FLAGS           | int             | See [https://docs.bitfinex.com/v2/docs/flag-values](/docs/flag-values).                                                                                                                                                                                                                                                                                                         |
| META            | json string     | Additional meta information about the order ( $F7 = IS_POST_ONLY (0 if false, 1 if true), $F33 = Leverage (int))                                                                                                                                                                                                                                                                |
| CODE            | null or integer | Work in progress                                                                                                                                                                                                                                                                                                                                                                |
| STATUS          | string          | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...)                                                                                                                                                                                                                                                                                                |
| TEXT            | string          | Text of the notification                                                                                                                                                                                                                                                                                                                                                        |

**Ratelimit**: 90 req/min

[](#body-params)Body Params

type

string

Defaults to EXCHANGE_LIMIT

Order Type: LIMIT, EXCHANGE LIMIT, MARKET, EXCHANGE MARKET, STOP, EXCHANGE STOP,
STOP LIMIT, EXCHANGE STOP LIMIT, TRAILING STOP, EXCHANGE TRAILING STOP, FOK,
EXCHANGE FOK, IOC, EXCHANGE IOC.

symbol

string

Defaults to tBTCUSD

Symbol for desired pair

price

string

Defaults to 123.45

Price of order

amount

string

Defaults to 1.2345

Amount of order (positive for buy, negative for sell)

flags

int32

Defaults to 0

Optional see [https://docs.bitfinex.com/v2/docs/flag-values](/docs/flag-values)

lev

int32

Defaults to 10

Set the leverage for a derivative order, supported by derivative symbol orders
only. The value should be between 1 and 100 inclusive. The field is optional, if
omitted the default leverage value of 10 will be used.

price_trailing

string

Defaults to 1

The trailing price for a trailing stop order

price_aux_limit

string

Defaults to 10

Auxiliary Limit price (for STOP LIMIT)

price_oco_stop

string

Defaults to 10

OCO stop price

gid

integer

Group Order ID (int45)

tif

string

Defaults to YYYY-MM-DD HH:MM:SS

Time-In-Force: datetime for automatic order cancellation (e.g. 2020-01-15
10:45:23).

id

integer

Order ID (Can be retrieved by calling the
[Retrieve Orders](/reference#rest-auth-orders) endpoint)

cid

integer

Client Order ID (int45)

cid_date

string

Defaults to YYYY-MM-DD

Client Order ID Date

all

int32

Defaults to 1

Cancel all open orders if value is set to: 1

[](#response-schemas)Responses

#

200

200

[](#restauthordermulti-string-response-body)Response body

json

#

400

400

[](#restauthordermulti-object-response-body)Response body

object

Updated about 1 month ago

---

Language

JavaScriptShell

Request

Examples

xxxxxxxxxx

20

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/order/multi \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"type": "EXCHANGE_LIMIT",

8

"symbol": "tBTCUSD",

9

"price": "123.45",

10

"amount": "1.2345",

11

"flags": 0,

12

"lev": 10,

13

"price_trailing": "1",

14

"price_aux_limit": "10",

15

"price_oco_stop": "10",

16

"tif": "YYYY-MM-DD HH:MM:SS",

17

"cid_date": "YYYY-MM-DD",

18

"all": 1

19

}

20

'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated about 1 month ago

---

---

Section: Orders Source:
https://docs.bitfinex.com/reference/rest-auth-order-multi Path:
/v2/auth/w/order/multi Method: POST
