# LNX Invoice Payments

post

https://api.bitfinex.com/v2/auth/r/ext/invoice/payments

Retrieve invoice and payment data

Response data

| Term              | Type   | Description                                         |
| ----------------- | ------ | --------------------------------------------------- |
| PAYMENT_HASH      | string | Payment hash                                        |
| CREATED_AT        | int    | Invoice created timestamp in milliseconds           |
| INVOICE_EXPIRY    | int    | Optional, invoice expired timestamp in milliseconds |
| INVOICE           | string | LNX invoice                                         |
| RECIPIENT_PUB_KEY | string | Recipient public key                                |
| MEMO              | string | Optional, invoice memo                              |
| AMOUNT            | number | Amount in satoshis                                  |
| BFX_AMOUNT        | string | Amount in BTC                                       |
| STATUS            | string | Invoice/payment status                              |

Body Params

action

string

required

Query action, use one of getPaymentsByUser, getInvoicesByUser, getInvoiceById,
getPaymentById

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

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/lnx-invoice-payments Path:
/v2/auth/r/ext/invoice/payments Method: POST
