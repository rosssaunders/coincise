# Deposit Address

# Deposit Address

post https://api.bitfinex.com/v2/auth/w/deposit/address

Retrieve your deposit address or generate a new deposit address for a specific
currency and wallet.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

> 📘
>
> ###
>
> Tag/Memo/Payment_ID
>
> [](#tagmemopayment_id)
>
> For currencies that require a tag, memo, or payment ID, the endpoint will
> provide these. The deposit address cannot be retrieved through this endpoint,
> but you can find it on your deposit page on the website. The deposit address
> is always the same; the tag, memo, or payment ID is used to direct your
> deposit to the correct account and wallet.

####

Response data

[](#response-data)

| Index | Field      | Type   | Description                             |
| ----- | ---------- | ------ | --------------------------------------- |
| \[0\] | MTS        | int    | Seconds epoch timestamp of notification |
| \[1\] | TYPE       | string | Notification's type ("on-req")          |
| \[2\] | MESSAGE_ID | int    | Unique notification's ID                |

| \[ . . . \]

| | \[4\] | DEPOSIT_ADDRESS_ARRAY |
[Deposit address array](#deposit-address-arrays-index-4) | An array containing
deposit adddress data | | \[5\] | CODE | int | W.I.P. (work in progress) | |
\[6\] | STATUS | string | Status of the notification; it may vary over time
(SUCCESS, ERROR, FAILURE, ...) | | \[7\] | TEXT | string | Additional
notification description |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Deposit address arrays (Index \[4\])

[](#deposit-address-arrays-index-4)

| Index | Field | Type | Description |
| ----- | ----- | ---- | ----------- |

| \[ . . . \]

| | \[1\] | METHOD | String | Method of deposit | | \[2\] | CURRENCY_CODE |
String | Currency code of new address | |

\[ . . . \]

| | \[4\] | ADDRESS | String | Deposit address (instead of the address, this
field will show Tag/Memo/Payment_ID for currencies that require it) | | \[5\] |
POOL_ADDRESS | String | Pool address (for currencies that require a
Tag/Memo/Payment_ID) |

td:has(div.placeholders) { background-color: #ebebeb; } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

> 📘
>
> ###
>
> Address Limit
>
> [](#address-limit)
>
> Please note that you may generate up to 15 addresses in total per currency per
> month.

**Ratelimit**: 10 req/min

[](#body-params)Body Params

wallet

string

required

Defaults to trading

Select the wallet from which to transfer (exchange, margin, funding (can also
use the old labels which are exchange, trading and deposit respectively))

method

string

required

Defaults to bitcoin

Method of deposit (methods accepted: “bitcoin”, “litecoin”, “ethereum”,
“tetheruso", “tetherusl", “tetherusx", “tetheruss", "ethereumc", "zcash",
"monero", "iota"). For an up-to-date listing of supported currencies see:
[https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)

op_renew

int32

Defaults to 0

Input 1 to generate a new deposit address (old addresses remain valid). Defaults
to 0 if omitted, which will return the existing deposit address

[](#response-schemas)Responses

#

200

200

[](#restauthdepositaddress-array-response-body)Response body

array

#

400

400

[](#restauthdepositaddress-object-response-body)Response body

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

     \--url https://api.bitfinex.com/v2/auth/w/deposit/address \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json' \\

5

     \--data '

6

{

7

"wallet": "trading",

8

"method": "bitcoin",

9

"op_renew": 0

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
https://docs.bitfinex.com/reference/rest-auth-deposit-address Path:
/v2/auth/w/deposit/address Method: POST
