# Keep Funding

# Keep Funding

post https://api.bitfinex.com/v2/auth/w/funding/keep

Toggle to keep funding taken. Specify loan for unused funding and credit for
used funding.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> 📘
>
> ###
>
> Loan and credit ID's
>
> [](#loan-and-credit-ids)
>
> Loan or credit ID's can be retrieved through the
> [Funding Loans](/reference?showHidden=94bdb#rest-auth-funding-loans) and
> [Funding Credits](/reference?showHidden=94bdb#rest-auth-funding-credits)
> endpoints.

####

Response array

[](#response-array)

| Index | Field | Type   | Description                                               |
| ----- | ----- | ------ | --------------------------------------------------------- |
| \[0\] | MTS   | Int    | Millisecond Time Stamp of the update                      |
| \[1\] | TYPE  | String | Purpose of notification ('fk-req' (funding keep request)) |

| \[ . . . \]

| | \[6\] | STATUS | String | Status of the notification; it may vary over time
(SUCCESS, ERROR, FAILURE, ...) | | \[7\] | TEXT | String | Text of the
notification |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

type

string

required

Specify the funding type ('credit' or 'loan')

id

array of int32s

Pass an array of id's to toggle their keep funding status (on -> off, off ->
on). If the changes object is also passed, keep funding status will change as
specified in the changes object.

id

ADD int32

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

     \--url https://api.bitfinex.com/v2/auth/w/funding/keep \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json'

RESPONSE

Examples

Choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Margin Funding Source:
https://docs.bitfinex.com/reference/rest-auth-keep-funding Path:
/v2/auth/w/funding/keep Method: POST
