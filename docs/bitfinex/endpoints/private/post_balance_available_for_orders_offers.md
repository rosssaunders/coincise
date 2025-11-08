# Balance Available for Orders/Offers

# Balance Available for Orders/Offers

post https://api.bitfinex.com/v2/auth/calc/order/avail

Calculate the balance available for orders/offers

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

**Fields**

| Fields | Type | Description |
| --- | --- | --- |
| AMOUNT\_AVAIL | float | Amount available for order/offer |

**Ratelimit**: 90 req/min

Body Params

symbol

string

required

Symbol (tBTCUSD, tBTCUST, fUSD, .... )

dir

int32

Direction of the order (1 for by, -1 for sell) (Mandatory for EXCHANGE and MARGIN type, not used for FUNDING)

rate

string

Order price (Mandatory for EXCHANGE and MARGIN type, not used for FUNDING)

type

string

required

Type of the order/offer EXCHANGE, MARGIN, DERIV, or FUNDING

lev

string

Leverage that you want to use in calculating the max order amount (DERIV only)

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

* * *

Language

JavaScriptShell

Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/calc/order/avail \\

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

Updated 5 months ago

* * *

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-calc-order-avail
Path: /v2/auth/calc/order/avail
Method: POST
