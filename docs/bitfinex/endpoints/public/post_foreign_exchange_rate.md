# Foreign Exchange Rate

# Foreign Exchange Rate

post https://api-pub.bitfinex.com/v2/calc/fx

Calculate the exchange rate between two currencies

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields

[](#response-fields)

| Index | Field        | Type  | Description   |
| ----- | ------------ | ----- | ------------- |
| \[0\] | CURRENT_RATE | float | Exchange rate |

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

[](#body-params)Body Params

ccy1

string

required

Defaults to BTC

1st currency (base currency).

ccy2

string

required

Defaults to USD

2nd currency (quote currency).

[](#response-schemas)Response

#

200

200

[](#restpublicforeignexchangerate-array-response-body)Response body

array of numbers

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

10

1

curl \--request POST \\

2

     \--url https://api-pub.bitfinex.com/v2/calc/fx \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"ccy1": "BTC",

8

"ccy2": "USD"

9

}

10

'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result

Updated 5 months ago

---

---

Section: General Source:
https://docs.bitfinex.com/reference/rest-public-foreign-exchange-rate Path:
/v2/calc/fx Method: POST
