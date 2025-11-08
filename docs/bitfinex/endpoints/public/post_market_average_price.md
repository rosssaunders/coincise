# Market Average Price

# Market Average Price

post https://api-pub.bitfinex.com/v2/calc/trade/avg

Calculate the average execution price for Trading or rate for Margin funding.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

### 

Response Fields

[](#response-fields)

#### 

For trading pair symbols (ex. tBTCUSD)

[](#for-trading-pair-symbols-ex-tbtcusd)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | PRICE\_AVG | float | Average price for amount bought or sold given the current order book (trading pairs only) |
| \[1\] | AMOUNT | float | Amount traded or taken/provided in funding |

#### 

For funding currency symbols (ex. fUSD)

[](#for-funding-currency-symbols-ex-fusd)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | RATE\_AVG | float | Average rate for amount taken or provided given the current order book (funding currencies only) |
| \[1\] | AMOUNT | float | Amount traded or taken/provided in funding |

* * *

<table><tbody><tr><td style="font-weight: 600;">Rate Limit:</td><td style="text-align: right;">90 reqs/min (requests per minute)</td></tr></tbody></table>

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

rate\_limit

string

Limit rate/price (ex. "1000.5").

Response

# 

200

200

Response body

json

Updated 5 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request POST \\

2

     \--url 'https://api-pub.bitfinex.com/v2/calc/trade/avg?symbol=tBTCUSD&amount=1.123' \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result

Updated 5 months ago

* * *

---
Section: General
Source: https://docs.bitfinex.com/reference/rest-public-market-average-price
Path: /v2/calc/trade/avg?symbol=tBTCUSD&amount=1.123
Method: POST
