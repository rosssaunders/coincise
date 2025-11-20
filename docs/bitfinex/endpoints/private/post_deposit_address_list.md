# Deposit Address List

# Deposit Address List

post https://api.bitfinex.com/v2/auth/r/deposit/address/all

Retrieve all deposit addresses for a specific currency.

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

| Index | Field       | Type   | Description                                                                                                       |
| ----- | ----------- | ------ | ----------------------------------------------------------------------------------------------------------------- |
| \[0\] | ADDRESS     | string | Deposit address (instead of the address, this field will show Tag/Memo/Payment_ID for currencies that require it) |
| \[1\] | WALLET_TYPE | string | Wallet type, e.g. "funding"                                                                                       |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height:
10px; text-align: center; font-size: 16px; line-height: 8px; }

####

Deposit address arrays (Index \[4\])**Ratelimit**: 10 req/min

[](#deposit-address-arrays-index-4ratelimit-10-reqmin)

[](#body-params)Body Params

method

string

required

Method of deposit (methods accepted: “bitcoin”, “litecoin”, “ethereum”,
“tetheruso", “tetherusl", “tetherusx", “tetheruss", "ethereumc", "zcash",
"monero", "iota"). For an up-to-date listing of supported currencies see:
[https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)

page

int32

Page cursor, default 1

pageSize

int32

Number of items per page, should be between 20-100, default is 20

[](#response-schemas)Responses

#

200

200

[](#depositaddressall-string-response-body)Response body

json

#

400

400

[](#depositaddressall-object-response-body)Response body

object

Updated 5 months ago

---

Language

JavaScriptShell

Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/deposit/address/all \\

3

     \--header 'accept: application/json' \\

4

     \--header 'content-type: application/json'

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
https://docs.bitfinex.com/reference/deposit-address-all Path:
/v2/auth/r/deposit/address/all Method: POST
