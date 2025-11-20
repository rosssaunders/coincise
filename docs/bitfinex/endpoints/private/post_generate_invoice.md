# Generate Invoice

# Generate Invoice

post https://api.bitfinex.com/v2/auth/w/deposit/invoice

Generates a Lightning Network deposit invoice

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> ❗️
>
> ###
>
> Creating a deposit address
>
> [](#creating-a-deposit-address)
>
> If this is the first time you are generating an LNX invoice on your account,
> you will first need to create a deposit address. To do this, call
> w/deposit/address with { method: 'LNX', wallet: 'exchange' }

####

Response data

[](#response-data)

| Index | Field        | Type   | Description       |
| ----- | ------------ | ------ | ----------------- |
| \[0\] | INVOICE_HASH | String | Hashed invoice    |
| \[1\] | INVOICE      | String | Requested invoice |

| \[ . . . \]

| | \[4\] | AMOUNT | String | Amount of invoice |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

[](#body-params)Body Params

wallet

string

required

Defaults to exchange

Select the wallet that will receive the invoice payment. Currently only
'exchange' is available

currency

string

required

Defaults to LNX

Select the currency for which you wish to generate an invoice. Currently only
LNX (Bitcoin Lightning Network) is available.

amount

string

required

Defaults to 0

Amount that you wish to deposit (in BTC; min 0.000001, max 0.02)

[](#response-schemas)Responses

#

200

200

[](#restauthdepositinvoice-string-response-body)Response body

json

#

400

400

[](#restauthdepositinvoice-object-response-body)Response body

object

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

11

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/deposit/invoice \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"wallet": "exchange",

8

"currency": "LNX",

9

"amount": "0"

10

}

11

'

Try It!

Response

Examples

Click `Try It!` to start a request and see the response here! Or choose an
example:

application/json

200 - Result400 - Result

Updated 5 months ago

---

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-deposit-invoice Path:
/v2/auth/w/deposit/invoice Method: POST
