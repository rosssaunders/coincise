# POST /v2/auth/w/transfer

**Source:** [https://docs.bitfinex.com/reference/rest-auth-transfer](https://docs.bitfinex.com/reference/rest-auth-transfer)

post

https://api.bitfinex.com/v2/auth/w/transfer

Transfer funds between wallets. This endpoint can also be used to convert USDT to USDT0 for derivatives trading.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Seconds epoch timestamp of notification |
| [1] | TYPE | string | Notification's type ("on-req") |
| [2] | MESSAGE\_ID | int | Unique notification's ID |
| [4] | TRANSFER\_ARRAY | [TRANSFER\_ARRAY](#transfer-array-index-4) | An array containing details of the transfer/conversion |
| [5] | CODE | int | W.I.P. (work in progress) |
| [6] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | string | Additional notification description |

Transfer array (index [4])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS\_UPDATED | Int | Millisecond Time Stamp of the update |
| [1] | WALLET\_FROM | String | Starting wallet |
| [2] | WALLET\_TO | String | Destination wallet |
| [4] | CURRENCY | String | Currency |
| [5] | CURRENCY\_TO | String | Currency converted to |
| [7] | AMOUNT | Int | Amount of Transfer |

> 📘
> 
> ### 
> 
> Derivatives Wallet
> 
> 
> 
> Note that the margin wallet, for Derivative symbols, is the derivatives wallet. If the destination is 'margin' and the currency\_to is 'USTF0', the funds will end up in the derivatives wallet.

Body Params

from

string

required

Defaults to trading

Select the wallet from which to transfer (exchange, margin, funding (can also use the old labels which are exchange, trading and deposit respectively))

to

string

required

Defaults to exchange

Select the wallet to transfer to (exchange, margin, funding (can also use the old labels which are exchange, trading and deposit respectively))

currency

string

required

Defaults to UST

Select the currency that you would like to transfer (USD, UST, BTC, ....)

currency\_to

string

Defaults to USTF0

Select the currency that you would like to exchange to (USTF0 === USDT for derivatives pairs)

amount

string

required

Defaults to 123.45

Select the amount to transfer

email\_dst

string

Allows transfer of funds to a sub- or master-account identified by the associated email address.

user\_id\_dst

int32

Allows transfer of funds to a sub- or master-account identified by the associated user id.

tfaToken

object

Required only when email\_dst or user\_id\_dst is present and auth token is used instead of api credentials

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/transfer \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "from": "trading",

  "to": "exchange",

  "currency": "UST",

  "currency\_to": "USTF0",

  "amount": "123.45"

}

'
