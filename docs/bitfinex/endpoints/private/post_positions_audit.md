# Positions Audit

# Positions Audit

post https://api.bitfinex.com/v2/auth/r/positions/audit

Return an audit of your positions. You latest positions will be retrieved by
default, but ID's can be specified to retrieve an audit for specific positions.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field                | Type                                                          | Description                                                            |
| --------- | -------------------- | ------------------------------------------------------------- | ---------------------------------------------------------------------- |
| \[0...n\] | POSITION_AUDIT_ARRAY | [Position audit array](#position-audit-entry-arrays-index-0n) | Each index contains one of the n current user's position audit entries |

####

Position audit entry arrays (index \[0...n\])

[](#position-audit-entry-arrays-index-0n)

| Index | Field        | Type   | Description                                                                                                    |
| ----- | ------------ | ------ | -------------------------------------------------------------------------------------------------------------- |
| \[0\] | SYMBOL       | String | Pair (tETHUSD, …).                                                                                             |
| \[1\] | STATUS       | String | Status (ACTIVE, CLOSED).                                                                                       |
| \[2\] | AMOUNT       | Float  | Size of the position. A positive value indicates a long position; a negative value indicates a short position. |
| \[3\] | BASE_PRICE   | Float  | Base price of the position. (Average traded price of the previous orders of the position)                      |
| \[4\] | FUNDING      | Float  | Funding amount                                                                                                 |
| \[5\] | FUNDING_TYPE | Int    | 0 for daily, 1 for term.                                                                                       |

| \[ . . . \]

| | \[11\] | POSITION_ID | Int64 | Position ID | | \[12\] | MTS_CREATE | Int |
Millisecond timestamp of creation | | \[13\] | MTS_UPDATE | Int | Millisecond
timestamp of update | |

\[ . . . \]

| | \[15\] | TYPE | Int | Identifies the type of position: 'null' = Margin
position, 1 = Derivatives position | |

\[ . . . \]

| | \[17\] | COLLATERAL | Float | The amount of collateral applied to the open
position | | \[18\] | COLLATERAL_MIN | Float | The minimum amount of collateral
required for the position | | \[19\] | META | JSON String | Additional meta
information about the position |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

id

array of int64s

required

Defaults to ,,,

Array of id's to audit

id\*

int64

int64

int64

int64

ADD int64

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records (Max 250)

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

14

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/positions/audit \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"id": \[

8

    null,

9

    null,

10

    null,

11

    null

12

\]

13

}

14

'

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

Section: Positions Source:
https://docs.bitfinex.com/reference/rest-auth-positions-audit Path:
/v2/auth/r/positions/audit Method: POST
