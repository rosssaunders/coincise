# Positions Snapshot

# Positions Snapshot

post https://api.bitfinex.com/v2/auth/r/positions/snap

Returns position snapshots of user positions between the specified start and end perimiters. Snapshots are taken daily.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0...n\] | POSITION\_SNAPSHOT\_ARRAY | [Position snapshot array](#position-snapshot-entry-arrays-index-0n) | Each index contains one of the n\` current user's position snapshot entries |

#### 

Position snapshot entry arrays (index \[0...n\])

[](#position-snapshot-entry-arrays-index-0n)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | SYMBOL | string | Pair (tBTCUSD, …). |
| \[1\] | STATUS | string | Status (ACTIVE). |
| \[2\] | AMOUNT | float | Size of the position. A positive value indicates a long position; a negative value indicates a short position. |
| \[3\] | BASE\_PRICE | float | Base price of the position. (Average traded price of the previous orders of the position) |
| \[4\] | FUNDING | float | Funding amount |
| \[5\] | FUNDING\_TYPE | int | 0 for daily, 1 for term. |
| 
\[ . . . \]

 |
| \[11\] | POSITION\_ID | int | Position identifier |
| \[12\] | MTS\_CREATE | int | Timestamp of creation (millis) |
| \[13\] | MTS\_UPDATE | int | Timestamp of last update (millis) |
| 

\[ . . . \]

 |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

start

integer

Millisecond start time

end

integer

Millisecond end time

limit

integer

Number of records (Max 500)

id

integer

Position id (can be passed to retrieve a specific position)

Responses

# 

200

200

Response body

json

# 

400

400

Response body

object

Updated 2 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/positions/snap \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 2 months ago

* * *

---
Section: Positions
Source: https://docs.bitfinex.com/reference/rest-auth-positions-snap
Path: /v2/auth/r/positions/snap
Method: POST
