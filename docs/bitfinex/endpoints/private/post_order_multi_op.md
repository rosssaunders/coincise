# Order Multi-OP

post https://api.bitfinex.com/v2/auth/w/order/multi

Send Multiple order-related operations. Please note the sent object has only one property with a value of an array of arrays detailing each order operation. (Max 75 operations per request)

> ❗️
> 
> ### 
> 
> Cancel All Orders
> 
> 
> 
> Please note that using {"all" : 1} to cancel all orders will cancel all trading as well as all derivatives orders. Order IDs can be passed instead to cancel only selected orders.

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

**Response Fields**

| Term | Type | Description |
| --- | --- | --- |
| MTS | int | Millisecond Time Stamp of the update |
| TYPE | string | Purpose of notification ('on-req', 'oc-req', 'uca', 'fon-req', 'foc-req') |
| MESSAGE\_ID | int | unique ID of the message |
| ID | int | Order ID |
| GID | int | Group ID |
| CID | int | Client Order ID |
| SYMBOL | string | Pair (tBTCUSD, …) |
| MTS\_CREATE | int | Millisecond timestamp of creation |
| MTS\_UPDATE | int | Millisecond timestamp of update |
| AMOUNT | float | Positive means buy, negative means sell. |
| AMOUNT\_ORIG | float | Original amount |
| TYPE | string | The type of the order: LIMIT, EXCHANGE LIMIT, MARKET, EXCHANGE MARKET, STOP, EXCHANGE STOP, STOP LIMIT, EXCHANGE STOP LIMIT, TRAILING STOP, EXCHANGE TRAILING STOP, FOK, EXCHANGE FOK, IOC, EXCHANGE IOC. |
| TYPE\_PREV | string | Previous order type |
| MTS\_TIF | int | Millisecond timestamp of Time-In-Force: automatic order cancellation |
| ORDER\_STATUS | string | Order Status: ACTIVE, EXECUTED @ PRICE(AMOUNT) e.g. "EXECUTED @ 107.6(-0.2)", PARTIALLY FILLED @ PRICE(AMOUNT), INSUFFICIENT MARGIN was: PARTIALLY FILLED @ PRICE(AMOUNT), CANCELED, CANCELED was: PARTIALLY FILLED @ PRICE(AMOUNT), RSN\_DUST (amount is less than 0.00000001), RSN\_PAUSE (trading is paused due to rebase events on AMPL or funding settlement on derivatives) |
| PRICE | float | Price |
| PRICE\_AVG | float | Average price |
| PRICE\_TRAILING | float | The trailing price |
| PRICE\_AUX\_LIMIT | float | Auxiliary Limit price (for STOP LIMIT) |
| HIDDEN | int | "null" if false, 1 if true |
| PLACED\_ID | int | If another order caused this order to be placed (OCO) this will be that other order's ID |
| ROUTING | string | indicates origin of action: BFX, ETHFX, API>BFX, API>ETHFX |
| FLAGS | int | See [https://docs.bitfinex.com/v2/docs/flag-values](/docs/flag-values). |
| META | json string | Additional meta information about the order ( $F7 = IS\_POST\_ONLY (0 if false, 1 if true), $F33 = Leverage (int)) |
| CODE | null or integer | Work in progress |
| STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| TEXT | string | Text of the notification |

**Ratelimit**: 90 req/min

Body Params

type

string

Defaults to EXCHANGE\_LIMIT

Order Type: LIMIT, EXCHANGE LIMIT, MARKET, EXCHANGE MARKET, STOP, EXCHANGE STOP, STOP LIMIT, EXCHANGE STOP LIMIT, TRAILING STOP, EXCHANGE TRAILING STOP, FOK, EXCHANGE FOK, IOC, EXCHANGE IOC.

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

Set the leverage for a derivative order, supported by derivative symbol orders only. The value should be between 1 and 100 inclusive. The field is optional, if omitted the default leverage value of 10 will be used.

price\_trailing

string

Defaults to 1

The trailing price for a trailing stop order

price\_aux\_limit

string

Defaults to 10

Auxiliary Limit price (for STOP LIMIT)

price\_oco\_stop

string

Defaults to 10

OCO stop price

gid

integer

Group Order ID (int45)

tif

string

Defaults to YYYY-MM-DD HH:MM:SS

Time-In-Force: datetime for automatic order cancellation (e.g. 2020-01-15 10:45:23).

id

integer

Order ID (Can be retrieved by calling the [Retrieve Orders](/reference#rest-auth-orders) endpoint)

cid

integer

Client Order ID (int45)

cid\_date

string

Defaults to YYYY-MM-DD

Client Order ID Date

all

int32

Defaults to 1

Cancel all open orders if value is set to: 1

Responses

Request

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/order/multi \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "type": "EXCHANGE\_LIMIT",

  "symbol": "tBTCUSD",

  "price": "123.45",

  "amount": "1.2345",

  "flags": 0,

  "lev": 10,

  "price\_trailing": "1",

  "price\_aux\_limit": "10",

  "price\_oco\_stop": "10",

  "tif": "YYYY-MM-DD HH:MM:SS",

  "cid\_date": "YYYY-MM-DD",

  "all": 1

}

'

---
Section: Orders
Source: https://docs.bitfinex.com/reference/rest-auth-order-multi
Path: /v2/auth/w/order/multi
Method: POST
