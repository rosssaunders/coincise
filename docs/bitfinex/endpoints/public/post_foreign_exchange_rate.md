# POST /v2/calc/fx

**Source:**
[https://docs.bitfinex.com/reference/rest-public-foreign-exchange-rate](https://docs.bitfinex.com/reference/rest-public-foreign-exchange-rate)

post

https://api-pub.bitfinex.com/v2/calc/fx

Calculate the exchange rate between two currencies

Response Fields

| Index | Field        | Type  | Description   |
| ----- | ------------ | ----- | ------------- |
| [0]   | CURRENT_RATE | float | Exchange rate |

---

| --- | --- | | Rate Limit: | 90 reqs/min (requests per minute) |

Body Params

ccy1

string

required

Defaults to BTC

1st currency (base currency).

ccy2

string

required

Defaults to USD

2nd currency (quote currency).

Response

curl \--request POST \\

     \--url https://api-pub.bitfinex.com/v2/calc/fx \\

     \--header 'accept: application/json' \\

     \--header 'content-type: application/json' \\

     \--data '

{

"ccy1": "BTC",

"ccy2": "USD"

}

'
