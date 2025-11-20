# Update Position Funding Type

# Update Position Funding Type

post https://api.bitfinex.com/v2/auth/w/position/update/funding/type

Update the funding type of a given position

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields

[](#response-fields)

| Index | Field | Type   | Description                             |
| ----- | ----- | ------ | --------------------------------------- |
| \[0\] | MTS   | int    | Seconds epoch timestamp of notification |
| \[1\] | TYPE  | string | Notification's type ("puft-req")        |

| \[ . . . \]

| | \[6\] | STATUS | string | Status of the notification; it may vary over time
(SUCCESS, ERROR, FAILURE, ...) | | \[7\] | TEXT | string | Additional
notification description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

[](#body-params)Body Params

symbol

string

Trading pair for which you wish to change the funding type

type

integer

Provide the desired funding type setting (0 for daily and 1 for term funding)

[](#response-schemas)Response

#

200

[](#post-newendpoint-string-response-body)Response body

json

Updated 4 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/position/update/funding/type \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json'

Response

Examples

Choose an example:

application/json

200 - New Example

Updated 4 months ago

---

---

Section: Positions Source:
https://docs.bitfinex.com/reference/update-position-funding-type Path:
/v2/auth/w/position/update/funding/type Method: POST
