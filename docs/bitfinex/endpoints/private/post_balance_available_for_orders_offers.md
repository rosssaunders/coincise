# Balance Available for Orders/Offers

post

https://api.bitfinex.com/v2/auth/calc/order/avail

Calculate the balance available for orders/offers

**Fields**

| Fields       | Type  | Description                      |
| ------------ | ----- | -------------------------------- |
| AMOUNT_AVAIL | float | Amount available for order/offer |

**Ratelimit**: 90 req/min

Body Params

symbol

string

required

Symbol (tBTCUSD, tBTCUST, fUSD, .... )

dir

int32

Direction of the order (1 for by, -1 for sell) (Mandatory for EXCHANGE and
MARGIN type, not used for FUNDING)

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

Request

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/calc/order/avail \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-calc-order-avail Path:
/v2/auth/calc/order/avail Method: POST
