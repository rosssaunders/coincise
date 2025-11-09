# Funding Trades

# Funding Trades

post https://api.bitfinex.com/v2/auth/r/funding/trades/{Symbol}/hist

Get funding trades for offered funding. Can be used to request funding trades
for a specific currency or to retrieve trades for all currencies at once.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index     | Field               | Type                                                  | Description                                                               |
| --------- | ------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------- |
| \[0...n\] | FUNDING_TRADE_ARRAY | [Funding trade array](#funding-trade-arrays-index-0n) | Each index contains one of the n\` current user's funding trades entries. |

####

Funding trade arrays (Index \[0...n\])

[](#funding-trade-arrays-index-0n)

| Index | Field      | Type    | Description                                                               |
| ----- | ---------- | ------- | ------------------------------------------------------------------------- |
| \[0\] | ID         | Integer | Funding trade ID                                                          |
| \[1\] | CURRENCY   | String  | The currency of the offer (fUSD, etc)                                     |
| \[2\] | MTS_CREATE | Int     | Millisecond Time Stamp when the offer was created                         |
| \[3\] | OFFER_ID   | Int     | Funding offer ID                                                          |
| \[4\] | AMOUNT     | Float   | Amount the offer is for                                                   |
| \[5\] | RATE       | Float   | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[6\] | PERIOD     | Int     | Period of the offer                                                       |

| \[ . . . \]

|

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Path Params

Symbol

string

required

Symbol (fUSD, ...) , Omit for all symbols (see example)

Body Params

start

int64

Millisecond start time

end

int64

Millisecond end time

limit

int32

Number of records

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

     \--url https://api.bitfinex.com/v2/auth/r/funding/trades/Symbol/hist \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

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

Section: Margin Funding Source:
https://docs.bitfinex.com/reference/rest-auth-funding-trades-hist Path:
/v2/auth/r/funding/trades/Symbol/hist Method: POST
