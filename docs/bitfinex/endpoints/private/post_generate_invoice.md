# Generate Invoice

post

https://api.bitfinex.com/v2/auth/w/deposit/invoice

Generates a Lightning Network deposit invoice

> ❗️
>
> ###
>
> Creating a deposit address
>
> If this is the first time you are generating an LNX invoice on your account,
> you will first need to create a deposit address. To do this, call
> w/deposit/address with { method: 'LNX', wallet: 'exchange' }

Response data

| Index | Field        | Type   | Description       |
| ----- | ------------ | ------ | ----------------- |
| [0]   | INVOICE_HASH | String | Hashed invoice    |
| [1]   | INVOICE      | String | Requested invoice |

[ . . . ]

| [4] | AMOUNT | String | Amount of invoice |

Body Params

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

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/deposit/invoice \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

"wallet": "exchange",

"currency": "LNX",

"amount": "0"

}

'

---

Section: Account Actions Source:
https://docs.bitfinex.com/reference/rest-auth-deposit-invoice Path:
/v2/auth/w/deposit/invoice Method: POST
