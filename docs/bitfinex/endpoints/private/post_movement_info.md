# Movement info

# Movement info

post https://api.bitfinex.com/v2/auth/r/movements/info

Detailed information about the deposit/withdrawal

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index | Field           | Type    | Description                                                        |
| ----- | --------------- | ------- | ------------------------------------------------------------------ |
| \[0\] | ID              | Integer | Movement identifier                                                |
| \[1\] | CURRENCY        | String  | The symbol of the currency (ex. "BTC")                             |
| \[2\] | CURRENCY_METHOD | String  | The extended name of the currency (ex. "BITCOIN") or WIRE for fiat |

| \[ . . . \]

| | \[4\] | REMARK | String | Remarks related to movement | | \[5\] |
MTS_STARTED | Integer | Movement started at | | \[6\] | MTS_UPDATED | Integer |
Movement last updated at | |

\[ . . . \]

| | \[9\] | STATUS | String | Current status | |

\[ . . . \]

| | \[12\] | AMOUNT | Float | Amount of funds moved (positive for deposits,
negative for withdrawals) | | \[13\] | FEES | Float | Tx Fees applied | |

\[ . . . \]

| | \[16\] | DESTINATION_ADDRESS | String | Destination address | | \[17\] |
MEMO | String | Memo/Tag related to transaction | |

\[ . . . \]

| | \[20\] | TRANSACTION_ID | String | Transaction identifier | | \[21\] |
MOVEMENT_NOTE | String | Optional personal transaction note | |

\[ . . . \]

| | \[24\] | BANK_FEES | Float | Wire bank fees | | \[25\] | BANK_ROUTER_ID |
Integer | Identifier of bank router | |

\[ . . . \]

| | \[28\] | EXTERNAL_BANK_MOV_ID | String | External provider movement id | |
\[29\] | EXTERNAL_BANK_MOV_STATUS | String | External provider movement status |
| \[30\] | EXTERNAL_BANK_MOV_DESCRIPTION | String | External provider movement
info | | \[31\] | EXTERNAL_BANK_ACC_INFO | Object | External provider bank
account information for user |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

[](#body-params)Body Params

id

int32

required

deposit/withdrawal ids

[](#response-schemas)Responses

#

200

200

[](#movementinfo-array-response-body)Response body

array

#

400

400

[](#movementinfo-object-response-body)Response body

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

     \--url https://api.bitfinex.com/v2/auth/r/movements/info \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/movement-info Path:
/v2/auth/r/movements/info Method: POST
