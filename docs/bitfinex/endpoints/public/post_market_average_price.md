# POST /v2/calc/trade/avg

**Source:**
[https://docs.bitfinex.com/reference/rest-public-market-average-price](https://docs.bitfinex.com/reference/rest-public-market-average-price)

post

https://api-pub.bitfinex.com/v2/calc/trade/avg

Calculate the average execution price for Trading or rate for Margin funding.

Response Fields

For trading pair symbols (ex. tBTCUSD)

| Index | Field     | Type  | Description                                                                               |
| ----- | --------- | ----- | ----------------------------------------------------------------------------------------- |
| [0]   | PRICE_AVG | float | Average price for amount bought or sold given the current order book (trading pairs only) |
| [1]   | AMOUNT    | float | Amount traded or taken/provided in funding                                                |

For funding currency symbols (ex. fUSD)

| Index | Field    | Type  | Description                                                                                      |
| ----- | -------- | ----- | ------------------------------------------------------------------------------------------------ |
| [0]   | RATE_AVG | float | Average rate for amount taken or provided given the current order book (funding currencies only) |
| [1]   | AMOUNT   | float | Amount traded or taken/provided in funding                                                       |

---

| --- | --- | | Rate Limit: | 90 reqs/min (requests per minute) |

Query Params

symbol

string

required

Defaults to tBTCUSD

The symbol you want information about.

amount

string

required

Defaults to 1.123

Amount. Positive for buy, negative for sell (ex. "1.123")

period

int32

Maximum period for margin funding (required for funding currencies).

rate_limit

string

Limit rate/price (ex. "1000.5").

Response

curl \--request POST \\

     \--url 'https://api-pub.bitfinex.com/v2/calc/trade/avg?symbol=tBTCUSD&amount=1.123' \\

     \--header 'accept: application/json'
