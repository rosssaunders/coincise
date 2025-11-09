# Claim Position

# Claim Position

post https://api.bitfinex.com/v2/auth/w/position/claim

The claim feature allows the use of funds you have in your Margin Wallet to
settle a leveraged position as an exchange buy or sale. Claiming some or all of
a position requires that you have enough partially realized P/L (you've reduced
the position at a profit) and/or funds (BTC or USD) in your Margin Wallet (net
of any outstanding financing charges) to satisfy some or all of the outstanding
financing associated with your position.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response fields

[](#response-fields)

| Index | Field      | Type   | Description                             |
| ----- | ---------- | ------ | --------------------------------------- |
| \[0\] | MTS        | int    | Seconds epoch timestamp of notification |
| \[1\] | TYPE       | string | Notification's type ("on-req")          |
| \[2\] | MESSAGE_ID | int    | Unique notification's ID                |

| \[ . . . \]

| | \[4\] | DATA | [Claim Array](#claim-array)\[\] | An array containing info on
the position claim | | \[5\] | CODE | int | W.I.P. (work in progress) | | \[6\]
| STATUS | string | Status of the notification; it may vary over time (SUCCESS,
ERROR, FAILURE, ...) | | \[7\] | TEXT | string | Additional notification
description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Claim array

[](#claim-array)

| Index | Term                | Type   | Description                                                                                          |
| ----- | ------------------- | ------ | ---------------------------------------------------------------------------------------------------- |
| \[0\] | SYMBOL              | string | Pair (tBTCUSD, …).                                                                                   |
| \[1\] | POSITION_STATUS     | string | Status (ACTIVE, CLOSED).                                                                             |
| \[2\] | AMOUNT              | float  | Size of the position. Positive values means a long position, negative values means a short position. |
| \[3\] | BASE_PRICE          | float  | Base price of the position. (Average traded price of the previous orders of the position)            |
| \[4\] | MARGIN_FUNDING      | float  | The amount of funding being used for this position.                                                  |
| \[5\] | MARGIN_FUNDING_TYPE | int    | 0 for daily, 1 for term.                                                                             |

| \[ . . . \]

| | \[11\] | POSITION_ID | int | position identifier | | \[12\] | MTS_CREATE |
time | Timestamp of creation (millis) | | \[13\] | MTS_UPDATE | time | Timestamp
of last update (millis) | |

\[ . . . \]

| | \[15\] | POS_TYPE | int | Type of Position (0 for margin, 1 for deriv) | |

\[ . . . \]

|

| \[17\] | COLLATERAL | float | Position collateral | | \[18\] | MIN_COLLATERAL
| float | Min Collateral Required | | \[19\] | META | JSON str | Meta data about
the position claim |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

> 📘
>
> ###
>
> Position ID
>
> [](#position-id)
>
> Position ID retrievable via
> [https://docs.bitfinex.com/v2/reference#rest-auth-positions](/reference#rest-auth-positions)

**Ratelimit**: 90 req/min

Body Params

id

int64

required

Position ID

amount

string

Defaults to "0.001"

Optional amount, used to perform a partial claim.

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

     \--url https://api.bitfinex.com/v2/auth/w/position/claim \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"amount": "\\"0.001\\""

8

}

9

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
https://docs.bitfinex.com/reference/rest-auth-position-claim Path:
/v2/auth/w/position/claim Method: POST
