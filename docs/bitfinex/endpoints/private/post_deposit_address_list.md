# Deposit Address List

post https://api.bitfinex.com/v2/auth/r/deposit/address/all

Retrieve all deposit addresses for a specific currency.

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
| [0] | ADDRESS | string | Deposit address (instead of the address, this field will show Tag/Memo/Payment\_ID for currencies that require it) |
| [1] | WALLET\_TYPE | string | Wallet type, e.g. "funding" |

Deposit address arrays (Index [4])**Ratelimit**: 10 req/min

Body Params

method

string

required

Method of deposit (methods accepted: “bitcoin”, “litecoin”, “ethereum”, “tetheruso", “tetherusl", “tetherusx", “tetheruss", "ethereumc", "zcash", "monero", "iota"). For an up-to-date listing of supported currencies see: [https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method](https://api-pub.bitfinex.com//v2/conf/pub:map:tx:method)

page

int32

Page cursor, default 1

pageSize

int32

Number of items per page, should be between 20-100, default is 20

Responses

Request

curl \--request POST \\

     \--url https://api.bitfinex.com/v2/auth/r/deposit/address/all \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json'

---
Section: Account Actions
Source: https://docs.bitfinex.com/reference/deposit-address-all
Path: /v2/auth/r/deposit/address/all
Method: POST
