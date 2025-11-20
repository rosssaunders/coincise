# Trades

# Trades

post https://api.bitfinex.com/v2/auth/r/trades/hist

Retrieve your trades. Your most recent trades will be retrieved by default, but
a timestamp can be used to retrieve time-specific data.

/\*! tailwindcss v4.1.17 | MIT License | https://tailwindcss.com \*/ @layer
theme, base, components, utilities; @layer utilities;

###

Response Fields

[](#response-fields)

| Index  | Field        | Type   | Description                             |
| ------ | ------------ | ------ | --------------------------------------- |
| \[0\]  | ID           | int    | Trade database id                       |
| \[1\]  | SYMBOL       | string | Symbol (BTCUSD, …)                      |
| \[2\]  | MTS          | int    | Execution timestamp                     |
| \[3\]  | ORDER_ID     | int    | Order id                                |
| \[4\]  | EXEC_AMOUNT  | float  | Positive means buy, negative means sell |
| \[5\]  | EXEC_PRICE   | float  | Execution price                         |
| \[6\]  | ORDER_TYPE   | string | Order type                              |
| \[7\]  | ORDER_PRICE  | float  | Order price                             |
| \[8\]  | MAKER        | int    | 1 if true, -1 if false                  |
| \[9\]  | FEE          | float  | Fee                                     |
| \[10\] | FEE_CURRENCY | string | Fee currency                            |
| \[11\] | CID          | int    | Client Order ID                         |

> 🚧
>
> ###
>
> Order type
>
> [](#order-type)
>
> For trades older than March 2020, the ORDER_TYPE field will not be set.

---

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

[](#body-params)Body Params

start

int64

If start is given, only records with MTS >= start (milliseconds) will be given
as response.

end

int64

If start is given, only records with MTS <= end (milliseconds) will be given as
response.

limit

int32

Number of records in response (max. 2500).

sort

int32

+1: sort in ascending order | -1: sort in descending order (by MTS field).

[](#response-schemas)Response

#

200

200

[](#restauthtrades-string-response-body)Response body

json

Updated 5 months ago

---

Language

ShellNodeRubyPHPPython

cURL Request

Examples

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url https://api.bitfinex.com/v2/auth/r/trades/hist \\

3

     \--header 'Content-Type: application/json' \\

4

     \--header 'accept: application/json'

Response

Examples

Choose an example:

application/json

200 - Result

Updated 5 months ago

---

---

Section: Orders Source: https://docs.bitfinex.com/reference/rest-auth-trades
Path: /v2/auth/r/trades/hist Method: POST
