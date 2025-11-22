# POST /v2/auth/r/ext/invoice/payments

**Source:** [https://docs.bitfinex.com/reference/lnx-invoice-payments](https://docs.bitfinex.com/reference/lnx-invoice-payments)

post

https://api.bitfinex.com/v2/auth/r/ext/invoice/payments

Retrieve invoice and payment data

Response data

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

Responses

Request

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/ext/invoice/payments \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'
