# POST /v2/auth/r/movements/info

**Source:** [https://docs.bitfinex.com/reference/movement-info](https://docs.bitfinex.com/reference/movement-info)

post

https://api.bitfinex.com/v2/auth/r/movements/info

Detailed information about the deposit/withdrawal

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | ID | Integer | Movement identifier |
| [1] | CURRENCY | String | The symbol of the currency (ex. "BTC") |
| [2] | CURRENCY\_METHOD | String | The extended name of the currency (ex. "BITCOIN") or WIRE for fiat |
| [4] | REMARK | String | Remarks related to movement |
| [5] | MTS\_STARTED | Integer | Movement started at |
| [6] | MTS\_UPDATED | Integer | Movement last updated at |
| [9] | STATUS | String | Current status |
| [12] | AMOUNT | Float | Amount of funds moved (positive for deposits, negative for withdrawals) |
| [13] | FEES | Float | Tx Fees applied |
| [16] | DESTINATION\_ADDRESS | String | Destination address |
| [17] | MEMO | String | Memo/Tag related to transaction |
| [20] | TRANSACTION\_ID | String | Transaction identifier |
| [21] | MOVEMENT\_NOTE | String | Optional personal transaction note |
| [24] | BANK\_FEES | Float | Wire bank fees |
| [25] | BANK\_ROUTER\_ID | Integer | Identifier of bank router |
| [28] | EXTERNAL\_BANK\_MOV\_ID | String | External provider movement id |
| [29] | EXTERNAL\_BANK\_MOV\_STATUS | String | External provider movement status |
| [30] | EXTERNAL\_BANK\_MOV\_DESCRIPTION | String | External provider movement info |
| [31] | EXTERNAL\_BANK\_ACC\_INFO | Object | External provider bank account information for user |

**Ratelimit**: 90 req/min

Body Params

id

int32

required

deposit/withdrawal ids

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/movements/info \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'
