# Deposit Address

post https://api.bitfinex.com/v2/auth/w/deposit/address

Retrieve your deposit address or generate a new deposit address for a specific currency and wallet.

> 📘
> 
> ### 
> 
> Tag/Memo/Payment\_ID
> 
> 
> 
> For currencies that require a tag, memo, or payment ID, the endpoint will provide these. The deposit address cannot be retrieved through this endpoint, but you can find it on your deposit page on the website. The deposit address is always the same; the tag, memo, or payment ID is used to direct your deposit to the correct account and wallet.

Response data

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| [0] | MTS | int | Seconds epoch timestamp of notification |
| [1] | TYPE | string | Notification's type ("on-req") |
| [2] | MESSAGE\_ID | int | Unique notification's ID |
[ . . . ]

| [4] | DEPOSIT\_ADDRESS\_ARRAY | [Deposit address array](#deposit-address-arrays-index-4) | An array containing deposit adddress data |
| [5] | CODE | int | W.I.P. (work in progress) |
| [6] | STATUS | string | Status of the notification; it may vary over time (SUCCESS, ERROR, FAILURE, ...) |
| [7] | TEXT | string | Additional notification description |

Deposit address arrays (Index [4])

| Index | Field | Type | Description |
| --- | --- | --- | --- |
[ . . . ]

| [1] | METHOD | String | Method of deposit |
| [2] | CURRENCY\_CODE | String | Currency code of new address |

[ . . . ]

| [4] | ADDRESS | String | Deposit address (instead of the address, this field will show Tag/Memo/Payment\_ID for currencies that require it) |
| [5] | POOL\_ADDRESS | String | Pool address (for currencies that require a Tag/Memo/Payment\_ID) |

> 📘
> 
> ### 
> 
> Address Limit
> 
> 
> 
> Please note that you may generate up to 15 addresses in total per currency per month.

**Ratelimit**: 10 req/min

Body Params

wallet

string

required

Defaults to trading

Select the wallet from which to transfer (exchange, margin, funding (can also use the old labels which are exchange, trading and deposit respectively))

method

string

required

Defaults to bitcoin

Method of deposit (methods accepted: “bitcoin”, “litecoin”, “ethereum”, “tetheruso", “tetherusl", “tetherusx", “tetheruss", "ethereumc", "zcash", "monero", "iota"). For an up-to-date listing of supported currencies see: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)

op\_renew

int32

Defaults to 0

Input 1 to generate a new deposit address (old addresses remain valid). Defaults to 0 if omitted, which will return the existing deposit address

Responses

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/w/deposit/address \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

  "wallet": "trading",

  "method": "bitcoin",

  "op\_renew": 0

}

'

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/rest-auth-deposit-address
Path: /v2/auth/w/deposit/address
Method: POST
