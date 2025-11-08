# Tickers History

# Tickers History

get https://api-pub.bitfinex.com/v2/tickers/hist

History of recent trading tickers. Provides historic data of the best bid and ask at an hourly interval.

Historic data goes back 1 year.

/\*! tailwindcss v4.1.16 | MIT License | https://tailwindcss.com \*/ @layer theme, base, components, utilities; @layer utilities;

### 

Response Fields

[](#response-fields)

| Index | Field | Type | Description |
| --- | --- | --- | --- |
| \[0\] | SYMBOL | string | The symbol of the requested ticker history data |
| \[1\] | BID | float | Price of last highest bid |
| 
\[ . . . \]

 |
| \[3\] | ASK | float | Price of last lowest ask |
| 

\[ . . . \]

 |
| \[12\] | MTS | int | Millisecond epoch timestamp |

td:has(div.placeholders) { background-color: #ebebeb } .placeholders { height: 10px; text-align: center; font-size: 16px; line-height: 8px; }

Query Params

symbols

string

required

Defaults to ALL

The symbols you want information about as a comma separated list, or ALL for every symbol. Ex: 'tBTCUSD' (funding currencies are not supported at this time).

limit

int32

Defaults to 100

Number of records in response (max. 250).

start

integer

If start is given, only records with MTS >= start (milliseconds) will be given as response.

end

integer

If end is given, only records with MTS <= end (milliseconds) will be given as response.

sort

integer

Defaults to -1

+1: sort in ascending order | -1: sort in descending order (by MTS field).

Response

# 

200

200

Response body

json

Updated 4 months ago

* * *

Language

ShellNodeRubyPHPPython

cURL Request

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://api-pub.bitfinex.com/v2/tickers/hist?symbols=ALL&limit=100&sort=-1' \\

3

     \--header 'accept: application/json'

Try It!

RESPONSE

Examples

Click `Try It!` to start a request and see the response here! Or choose an example:

application/json

200 - Result

Updated 4 months ago

* * *

---
Section: General
Source: https://docs.bitfinex.com/reference/rest-public-tickers-history
Path: /v2/tickers/hist?symbols=ALL&limit=100&sort=-1
Method: GET
