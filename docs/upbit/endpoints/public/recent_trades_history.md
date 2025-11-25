# Recent Trades History

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and
request counts are shared within the exchange 'trade' group.

market

string

required

Trading pair code representing the market.

to

string

End time of the query period(UTC). This is an optional filter parameter to
retrieve trade executed before a specific time window on the selected date.

Specify the time in either HHmmss or HH:mm:ss format. The results are returned
in reverse chronological order starting from the specified time.

\[Example\]  
days_ago=1&to=130000 returns trades before 13:00:00 UTC of the previous day in
descending order.

count

integer

Defaults to 1

Number of trades to retrieve. Supports up to 500 trades. Default: 1.

cursor

string

Cursor for pagination.  
Enter the "sequential_id" from the API response into this field to continue
retrieving trade history.  
It returns up to "count" trades prior to the specified sequential_id.

days_ago

integer

Day offset between the trade date to query and the request time. Trade history
must be queried by specifying the trade date, and up to 7 days of history is
supported (based on UTC). Specify an integer between 1 and 7.  
If omitted, the API returns the trades for the request date.  
If set to 7, it returns trades executed 7 days before the request date, in
reverse chronological order (latest first).

#

200

List of trades

array of objects

object

market

string

required

Trading pair code representing the market.

trade_date_utc

string

required

Trade date in UTC.

trade_time_utc

string

required

Trade time in UTC.

timestamp

int64

required

The timestamp (in milliseconds) when the trade was executed.

trade_price

double

required

The closing price of the candle, representing the last trading price during the
candle period.

trade_volume

double

required

Most recent trade volume for the trading pair.

prev_closing_price

double

required

Previous day's closing price, based on UTC.

change_price

double

required

Price change compared to the previous day's closing price. Calculated as
"trade_price" - "prev_closing_price".

- Positive (+): Current price is higher than previous day's closing price
- Negative (-): Current price is lower than previous day's closing price

ask_bid

string

enum

required

Trade direction.  
"ASK" for sell orders, "BID" for buy orders.

`ASK` `BID`

sequential_id

integer

required

Unique identifier for the trade.  
This field does not guarantee trade order sequence.

#

400

error object

object

error

object

name

number

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

#

404

error object

object

error

object

name

number

required

Name identifying the error.

message

string

required

Message describing the cause of the error.

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/trades/ticks

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://region-api.upbit.com/v1/trades/ticks?count=1' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

14

1

\[

2

{

3

    "market": "SGD-BTC",

4

    "trade\_date\_utc": "2025-07-31",

5

    "trade\_time\_utc": "15:28:57",

6

    "timestamp": 1753975737159,

7

    "trade\_price": 153099,

8

    "trade\_volume": 0.00008736,

9

    "prev\_closing\_price": 152114,

10

    "change\_price": 985,

11

    "ask\_bid": "ASK",

12

    "sequential\_id": 1753975737159000

13

}

14

\]

Updated 7 days ago

---

---

**Source:**
[recent-trades-history](https://global-docs.upbit.com/reference/today-trades-history)
