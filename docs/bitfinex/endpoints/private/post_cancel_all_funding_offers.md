# Cancel All Funding Offers

# Cancel All Funding Offers

post https://api.bitfinex.com/v2/auth/w/funding/offer/cancel/all

Cancel all of your current funding offers. Can also be used to only cancel
offers in the specified currency.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> 📘
>
> ###
>
> Currency
>
> [](#currency)
>
> Specifying a currency is optional. If the currency param is omitted, all open
> offers will be cancelled.

**Response data**

| Index | Field | Type   | Description                                                                |
| ----- | ----- | ------ | -------------------------------------------------------------------------- |
| \[0\] | MTS   | Int    | Millisecond Time Stamp of the update                                       |
| \[1\] | TYPE  | String | Purpose of notification ('foc_all-req' (funding offer cancel all request)) |

| \[ . . . \]

| | \[6\] | STATUS | String | Status of the notification; it may vary over time
(SUCCESS, ERROR, FAILURE, ...) | | \[7\] | TEXT | String | Text of the
notification |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

currency

string

Currency for which to cancel all offers (USD, BTC, UST ...)

Responses

#

200

200

Response body

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

     \--url https://api.bitfinex.com/v2/auth/w/funding/offer/cancel/all \\

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
https://docs.bitfinex.com/reference/rest-auth-cancel-all-funding-offers Path:
/v2/auth/w/funding/offer/cancel/all Method: POST
