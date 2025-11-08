# LNX Invoice Payments

# LNX Invoice Payments

post https://api.bitfinex.com/v2/auth/r/ext/invoice/payments

Retrieve invoice and payment data

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

#### 

Response data

[](#response-data)

| Term | Type | Description |
| --- | --- | --- |
| PAYMENT\_HASH | string | Payment hash |
| CREATED\_AT | int | Invoice created timestamp in milliseconds |
| INVOICE\_EXPIRY | int | Optional, invoice expired timestamp in milliseconds |
| INVOICE | string | LNX invoice |
| RECIPIENT\_PUB\_KEY | string | Recipient public key |
| MEMO | string | Optional, invoice memo |
| AMOUNT | number | Amount in satoshis |
| BFX\_AMOUNT | string | Amount in BTC |
| STATUS | string | Invoice/payment status |

Body Params

action

string

required

Query action, use one of getPaymentsByUser, getInvoicesByUser, getInvoiceById, getPaymentById

query

object

required

Query params

query object

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

     \--url https://api.bitfinex.com/v2/auth/r/ext/invoice/payments \\

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
Source: https://docs.bitfinex.com/reference/lnx-invoice-payments
Path: /v2/auth/r/ext/invoice/payments
Method: POST
