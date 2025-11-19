# Movements

post https://api.bitfinex.com/v2/auth/r/movements/{Currency}/hist

View your past deposits/withdrawals. Currency can be specified to retrieve movements specific to that currency.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0...n] | MOVEMENT\_ARRAY | [Movement array](#movement-arrays-index-0n) | Each index contains one of the n\` current user's movements entries. |

Movement arrays (Index [0...n])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | String | Movement identifier |
| [1] | CURRENCY | String | The symbol of the currency (ex. "BTC") |
| [2] | CURRENCY\_NAME | String | The extended name of the currency (ex. "BITCOIN") |
[ . . . ]

| [5] | MTS\_STARTED | Int | Movement started at |
| [6] | MTS\_UPDATED | Int | Movement last updated at |

[ . . . ]

| [9] | STATUS | String | Current status |

[ . . . ]

| [12] | AMOUNT | String | Amount of funds moved (positive for deposits, negative for withdrawals) |
| [13] | FEES | String | Tx Fees applied |

[ . . . ]

| [16] | DESTINATION\_ADDRESS | String | Destination address |
| [17] | PAYMENT\_ID | String | Payment ID (if relevant) |

[ . . . ]

| [20] | TRANSACTION\_ID | String | Transaction identifier |
| [21] | WITHDRAW\_TRANSACTION\_NOTE | String | Optional personal withdraw transaction note |

**Ratelimit**: 90 req/min

Path Params

Currency

string

required

Currency (BTC, ...). For an up-to-date listing of supported currencies see: [https://api.bitfinex.com/v2/conf/pub:map:currency:label](https://api.bitfinex.com/v2/conf/pub:map:currency:label) - Currency param can be omitted to retrieve recent movements for all currencies.

Body Params

start

int64

Millisecond start time, only records with MTS\_UPDATED >= start (milliseconds) will be given as response.

end

int64

Millisecond end time, only records with MTS\_UPDATED <= end (milliseconds) will be given as response.

limit

int32

Number of records (Max 2500)

id

array of int32s

Optional array of deposit/withdrawal ids

id

address

string

Optional deposit address filter

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/movements/Currency/hist \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-movements
Path: /v2/auth/r/movements/Currency/hist
Method: POST
