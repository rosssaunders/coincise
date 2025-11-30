# POST /v2/auth/r/orders/otc/{Symbol}/hist

**Source:**
[https://docs.bitfinex.com/reference/otc-orders-history](https://docs.bitfinex.com/reference/otc-orders-history)

post

https://api.bitfinex.com/v2/auth/r/orders/otc/{Symbol}/hist

Returns historic OTC orders.

Response data

| Index   | Field | Type                           | Description                                                            |
| ------- | ----- | ------------------------------ | ---------------------------------------------------------------------- |
| [0...n] | ORDER | [OTC Order](#otc-order-arrays) | Each index contains one of the `n` current user's historic OTC orders. |

OTC order arrays

| Index | Field                  | Type   | Description                                                                              |
| ----- | ---------------------- | ------ | ---------------------------------------------------------------------------------------- |
| [0]   | ID                     | int    | Order ID                                                                                 |
| [1]   | SYMBOL                 | string | Pair (tBTCUSD, …)                                                                        |
| [2]   | MTS_CREATE             | int    | Millisecond timestamp of creation                                                        |
| [3]   | MTS_UPDATE             | int    | Millisecond timestamp of update                                                          |
| [5]   | INITIATOR              | int    | Order initiator, 0 means counter party initiated order, 1 means user initiated the order |
| [6]   | INITIATOR_NICKNAME     | string | Nickname of the initiator                                                                |
| [7]   | COUNTER_PARTY_NICKNAME | string | Nickname of the counter party user                                                       |
| [9]   | AMOUNT                 | float  | Positive means buy, negative means sell                                                  |
| [10]  | PRICE                  | float  | Order price                                                                              |
| [12]  | STATUS                 | string | OTC order status, available statuses are: PENDING, CANCELED, REJECTED, COMPLETED         |
| [13]  | TIF                    | int    | Millisecond timestamp of automatic trade cancelation                                     |

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (tBTCUSD, ...) , Omit for all symbols (see example)

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records (Max 500)

id

array of int64s

Allows you to retrieve specific orders by order ID (id: [ID1, ID2, ID3])

id
