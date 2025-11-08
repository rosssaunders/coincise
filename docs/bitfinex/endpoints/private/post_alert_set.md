# Alert Set

# Alert Set

post https://api.bitfinex.com/v2/auth/w/alert/set

Sets up a price alert at the given value

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Index | Term | Type | Description |
| --- | --- | --- | --- |
| \[0\] | INFO | string | 'type:pair:price' |
| \[1\] | TYPE | string | Alert type ('price') |
| \[2\] | PAIR | string | Pair on which the price alert is active (tBTCUSD, tBTCUST, ...) |
| \[3\] | PRICE | float | Alert price |
| \[4\] | COUNTDOWN | int | This is set to 100 when the alert is placed. Each time the alert is triggered, this number will go down. When the countdown reaches 0, the alert gets removed. |

**Ratelimit**: 90 req/min

Body Params

type

string

required

Specify the alert type ('price')

symbol

string

required

Specify the alert symbol (ex. 'tBTCUSD')

price

string

required

Specify the alert price (ex. '232.2')

count

integer

Set the number of times an alert can trigger (ex. 100)

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

     \--url https://api.bitfinex.com/v2/auth/w/alert/set \\

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
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-alert-set
Path: /v2/auth/w/alert/set
Method: POST
