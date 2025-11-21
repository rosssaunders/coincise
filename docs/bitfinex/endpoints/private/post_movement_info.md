# Movement info

post

https://api.bitfinex.com/v2/auth/r/movements/info

Detailed information about the deposit/withdrawal

Response data

| Index | Field           | Type    | Description                                                        |
| ----- | --------------- | ------- | ------------------------------------------------------------------ |
| [0]   | ID              | Integer | Movement identifier                                                |
| [1]   | CURRENCY        | String  | The symbol of the currency (ex. "BTC")                             |
| [2]   | CURRENCY_METHOD | String  | The extended name of the currency (ex. "BITCOIN") or WIRE for fiat |

[ . . . ]

| [4] | REMARK | String | Remarks related to movement | | [5] | MTS_STARTED |
Integer | Movement started at | | [6] | MTS_UPDATED | Integer | Movement last
updated at |

[ . . . ]

| [9] | STATUS | String | Current status |

[ . . . ]

| [12] | AMOUNT | Float | Amount of funds moved (positive for deposits, negative
for withdrawals) | | [13] | FEES | Float | Tx Fees applied |

[ . . . ]

| [16] | DESTINATION_ADDRESS | String | Destination address | | [17] | MEMO |
String | Memo/Tag related to transaction |

[ . . . ]

| [20] | TRANSACTION_ID | String | Transaction identifier | | [21] |
MOVEMENT_NOTE | String | Optional personal transaction note |

[ . . . ]

| [24] | BANK_FEES | Float | Wire bank fees | | [25] | BANK_ROUTER_ID | Integer
| Identifier of bank router |

[ . . . ]

| [28] | EXTERNAL_BANK_MOV_ID | String | External provider movement id | | [29]
| EXTERNAL_BANK_MOV_STATUS | String | External provider movement status | | [30]
| EXTERNAL_BANK_MOV_DESCRIPTION | String | External provider movement info | |
[31] | EXTERNAL_BANK_ACC_INFO | Object | External provider bank account
information for user |

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

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/movement-info Path:
/v2/auth/r/movements/info Method: POST
