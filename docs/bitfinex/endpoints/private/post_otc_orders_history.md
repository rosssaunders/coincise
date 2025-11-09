# OTC Orders History

# OTC Orders History

post https://api.bitfinex.com/v2/auth/r/orders/otc/{Symbol}/hist

Returns historic OTC orders.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response data

[](#response-data)

| Index     | Field | Type                           | Description                                                            |
| --------- | ----- | ------------------------------ | ---------------------------------------------------------------------- |
| \[0...n\] | ORDER | [OTC Order](#otc-order-arrays) | Each index contains one of the `n` current user's historic OTC orders. |

####

OTC order arrays

[](#otc-order-arrays)

| Index | Field      | Type   | Description                       |
| ----- | ---------- | ------ | --------------------------------- |
| \[0\] | ID         | int    | Order ID                          |
| \[1\] | SYMBOL     | string | Pair (tBTCUSD, …)                 |
| \[2\] | MTS_CREATE | int    | Millisecond timestamp of creation |
| \[3\] | MTS_UPDATE | int    | Millisecond timestamp of update   |

| \[ . . . \]

| | \[5\] | INITIATOR | int | Order initiator, 0 means counter party initiated
order, 1 means user initiated the order | | \[6\] | INITIATOR_NICKNAME | string
| Nickname of the initiator | | \[7\] | COUNTER_PARTY_NICKNAME | string |
Nickname of the counter party user | |

\[ . . . \]

| | \[9\] | AMOUNT | float | Positive means buy, negative means sell | | \[10\]
| PRICE | float | Order price | |

\[ . . . \]

| | \[12\] | STATUS | string | OTC order status, available statuses are:
PENDING, CANCELED, REJECTED, COMPLETED | | \[13\] | TIF | int | Millisecond
timestamp of automatic trade cancelation |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (tBTCUSD, ...) , Omit for all symbols (see example)

Body Params

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Defaults to 25

Number of records (Max 500)

id

array of int64s

Allows you to retrieve specific orders by order ID (id: \[ID1, ID2, ID3\])

id

ADD int64

Responses

#

200

200

Response body

array of arrays

array

#

400

400

Response body

object

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/orders/otc/Symbol/hist \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '{"limit":25}'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Orders Source: https://docs.bitfinex.com/reference/otc-orders-history
Path: /v2/auth/r/orders/otc/Symbol/hist Method: POST
