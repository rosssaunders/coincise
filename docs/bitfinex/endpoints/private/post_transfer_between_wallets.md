# Transfer Between Wallets

# Transfer Between Wallets

post https://api.bitfinex.com/v2/auth/w/transfer

Transfer funds between wallets. This endpoint can also be used to convert USDT
to USDT0 for derivatives trading.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

####

Response data

[](#response-data)

| Index | Field      | Type   | Description                             |
| ----- | ---------- | ------ | --------------------------------------- |
| \[0\] | MTS        | int    | Seconds epoch timestamp of notification |
| \[1\] | TYPE       | string | Notification's type ("on-req")          |
| \[2\] | MESSAGE_ID | int    | Unique notification's ID                |

| \[ . . . \]

| | \[4\] | TRANSFER_ARRAY | [TRANSFER_ARRAY](#transfer-array-index-4) | An
array containing details of the transfer/conversion | | \[5\] | CODE | int |
W.I.P. (work in progress) | | \[6\] | STATUS | string | Status of the
notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) | | \[7\] |
TEXT | string | Additional notification description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Transfer array (index \[4\])

[](#transfer-array-index-4)

| Index | Field       | Type   | Description                          |
| ----- | ----------- | ------ | ------------------------------------ |
| \[0\] | MTS_UPDATED | Int    | Millisecond Time Stamp of the update |
| \[1\] | WALLET_FROM | String | Starting wallet                      |
| \[2\] | WALLET_TO   | String | Destination wallet                   |

| \[ . . . \]

| | \[4\] | CURRENCY | String | Currency | | \[5\] | CURRENCY_TO | String |
Currency converted to | |

\[ . . . \]

| | \[7\] | AMOUNT | Int | Amount of Transfer |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

> 📘
>
> ###
>
> Derivatives Wallet
>
> [](#derivatives-wallet)
>
> Note that the margin wallet, for Derivative symbols, is the derivatives
> wallet. If the destination is 'margin' and the currency_to is 'USTF0', the
> funds will end up in the derivatives wallet.

[](#body-params)Body Params

from

string

required

Defaults to trading

Select the wallet from which to transfer (exchange, margin, funding (can also
use the old labels which are exchange, trading and deposit respectively))

to

string

required

Defaults to exchange

Select the wallet to transfer to (exchange, margin, funding (can also use the
old labels which are exchange, trading and deposit respectively))

currency

string

required

Defaults to UST

Select the currency that you would like to transfer (USD, UST, BTC, ....)

currency_to

string

Defaults to USTF0

Select the currency that you would like to exchange to (USTF0 === USDT for
derivatives pairs)

amount

string

required

Defaults to 123.45

Select the amount to transfer

email_dst

string

Allows transfer of funds to a sub- or master-account identified by the
associated email address.

user_id_dst

int32

Allows transfer of funds to a sub- or master-account identified by the
associated user id.

tfaToken

object

Required only when email_dst or user_id_dst is present and auth token is used
instead of api credentials

tfaToken object

[](#response-schemas)Responses

#

200

200

[](#restauthtransfer-string-response-body)Response body

json

#

400

400

[](#restauthtransfer-object-response-body)Response body

object

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

13

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/w/transfer \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"from": "trading",

8

"to": "exchange",

9

"currency": "UST",

10

"currency_to": "USTF0",

11

"amount": "123.45"

12

}

13

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
https://docs.bitfinex.com/reference/rest-auth-transfer Path: /v2/auth/w/transfer
Method: POST
