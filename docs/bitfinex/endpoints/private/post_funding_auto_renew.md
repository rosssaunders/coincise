# Funding Auto-renew

# Funding Auto-renew

post https://api.bitfinex.com/v2/auth/w/funding/auto

Activate or deactivate auto-renew. Allows you to specify the currency, amount, rate, and period.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response array

[](#response-array)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | MTS | int | Seconds epoch timestamp of notification |
| \[1\] | TYPE | string | Notification's type ("fa-req") |
| \[2\] | MESSAGE\_ID | int | Unique notification's ID |
| 
\[ . . . \]

 |
| \[4\] | FUNDING\_OFFER\_ARRAY | [FUNDING\_OFFER\_ARRAY](#funding-offer-array-index-4) | An array containing data for the funding offer |
| \[5\] | CODE | int | W.I.P. (work in progress) |
| \[6\] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| \[7\] | TEXT | string | Additional notification description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

#### 

Funding offer array (index 4)

[](#funding-offer-array-index-4)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | CURRENCY | String | Currency (USD, …) |
| \[1\] | PERIOD | Int | Period in days |
| \[2\] | RATE | Float | Rate of the offer (percentage expressed as decimal number i.e. 1% = 0.01) |
| \[3\] | THRESHOLD | Float | Max amount to be auto-renewed |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

**Ratelimit**: 90 req/min

Body Params

status

int32

required

Defaults to 1

1 to activate, 0 to deactivate

currency

string

required

Defaults to USD

Currency for which to enable auto-renew

amount

string

Defaults to 123.45

Amount to be auto-renewed (Minimum 50 USD equivalent). Defaultst to the amount currently provided if omitted.

rate

string

Percentage rate at which to auto-renew. (rate == 0 to renew at FRR). Defaults to FRR if omitted

period

int32

Defaults to 2

Period in days. Defaults to 2 if omitted.

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

* * *

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

12

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/funding/auto \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

  "status": 1,

8

  "currency": "USD",

9

  "amount": "123.45",

10

  "period": 2

11

}

12

'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result400 - Result

Updated 5 months ago

* * *

---
Section: Margin Funding
Source: https://docs.bitfinex.com/reference/rest-auth-funding-auto-renew
Path: /v2/auth/w/funding/auto
Method: POST
