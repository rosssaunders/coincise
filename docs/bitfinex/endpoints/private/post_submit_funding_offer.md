# Submit Funding Offer

# Submit Funding Offer

post https://api.bitfinex.com/v2/auth/w/funding/offer/submit

Submit a new funding offer.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

**What is FRR?**

The FRR, or Flash Return Rate, is a dynamic rate that is a derivative of current
market conditions.  
See the
[Knowledge Base](https://support.bitfinex.com/hc/en-us/articles/213919009-Flash-Return-Rate)
for more information.

**FRR Offer**

To place an FRR offer, use type FRRDELTAVAR and specify the rate as 0. This will
place an FRRDELTAVAR offer with an offset of 0.

> 📘
>
> ###
>
> Funding Order Types
>
> [](#funding-order-types)
>
> **LIMIT: Place an order at an explicit, static rate**  
> e.g. Placing a LIMIT order with a rate of 0.01 will put an order on the book
> with a rate of 0.01. Do note that rates are percentages expressed as decimals,
> so a rate of 0.01 will equal 1%.
>
> ---
>
> **FRRDELTAFIX: Place an order at an implicit, static rate, relative to the
> FRR**  
> e.g. Given that the FRR was 0.03 at the time, placing a FRRDELTAFIX order with
> a rate of 0.01 will put an order on the book with a rate of 0.04 (FRR + rate).
>
> Before the order is matched, the rate updates against the FRR. Once matched,
> the rate becomes static and will no longer update against the FRR.
>
> The offset can be negative or positive for FRRDELTAFIX.
>
> ---
>
> **FRRDELTAVAR: Place an order at an implicit, dynamic rate, relative to the
> FRR**  
> e.g. Given that the FRR was 0.03 at the time, placing a FRRDELTAVAR order with
> a rate of 0.01 will put an order on the book with a rate of 0.04 (FRR + rate).
>
> This rate will update automatically with the FRR both on the book as well as
> after matching.
>
> The offset can only be positive for FRRDELTAVAR.

####

Response data

[](#response-data)

| Index | Field      | Type   | Description                             |
| ----- | ---------- | ------ | --------------------------------------- |
| \[0\] | MTS        | int    | Seconds epoch timestamp of notification |
| \[1\] | TYPE       | string | Notification's type ("on-req")          |
| \[2\] | MESSAGE_ID | int    | Unique notification's ID                |

| \[ . . . \]

| | \[4\] | FUNDING_OFFER_ARRAY |
[FUNDING_OFFER_ARRAY](#funding-offer-array-index-4) | An array containing only
the new offer | | \[5\] | CODE | int | W.I.P. (work in progress) | | \[6\] |
STATUS | string | Status of the notification; it may vary over time (SUCCESS,
ERROR, FAILURE, ...) | | \[7\] | TEXT | string | Additional notification
description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Funding offer array (Index \[4\])

[](#funding-offer-array-index-4)

| Index | Field           | Type    | Description                                       |
| ----- | --------------- | ------- | ------------------------------------------------- |
| \[0\] | ID              | Integer | Offer ID                                          |
| \[1\] | SYMBOL          | String  | The currency of the offer (fUSD, etc)             |
| \[2\] | MTS_CREATED     | Int     | Millisecond Time Stamp when the offer was created |
| \[3\] | MTS_UPDATED     | Int     | Millisecond Time Stamp when the offer was updated |
| \[4\] | AMOUNT          | Float   | Current amount of the offer                       |
| \[5\] | AMOUNT_ORIGINAL | Float   | Amount of the initial offer                       |
| \[6\] | OFFER_TYPE      | String  | Offer Type                                        |

| \[ . . . \]

| | \[9\] | FLAGS | Int | Flags active on the offer; see
https://docs.bitfinex.com/v2/docs/flag-values | | \[10\] | OFFER_STATUS | String
| Offer Status: ACTIVE, EXECUTED, PARTIALLY FILLED, CANCELED | |

\[ . . . \]

| | \[14\] | RATE | Float | Rate of the offer (percentage expressed as decimal
number i.e. 1% = 0.01) | | \[15\] | PERIOD | Int | Period of the offer | |
\[16\] | NOTIFY | Boolean | True / false | | \[17\] | HIDDEN | Int | 0 if false,
1 if true | |

\[ . . . \]

| | \[19\] | RENEW | Boolean | True / false |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

type

string

required

Defaults to LIMIT

Order Type (LIMIT, FRRDELTAVAR, FRRDELTAFIX)

symbol

string

required

Defaults to fUSD

Symbol for desired pair (fUSD, fBTC, etc..)

amount

string

required

Defaults to 123.45

Amount (positive for offer, negative for bid)

rate

string

required

Defaults to 0.001

Daily rate

period

int32

required

Defaults to 2

Time period of offer. Minimum 2 days. Maximum 120 days.

flags

int32

Defaults to 0

Optional see [https://docs.bitfinex.com/v2/docs/flag-values](/docs/flag-values)

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

14

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/funding/offer/submit \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"type": "LIMIT",

8

"symbol": "fUSD",

9

"amount": "123.45",

10

"rate": "0.001",

11

"period": 2,

12

"flags": 0

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

Section: Margin Funding Source:
https://docs.bitfinex.com/reference/rest-auth-submit-funding-offer Path:
/v2/auth/w/funding/offer/submit Method: POST
