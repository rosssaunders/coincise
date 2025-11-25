# Days Candles

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Candles are created only when trades occur within the given time interval.

If no trades occur between the start and end time of a candle, it will not be
created and therefore will not appear in the API response. For example, a Day
candle with `candle_date_time = 2024-08-31T00:00:00` will not be created if no
trades occur between 2024-08-31T00:00:00 (inclusive) and 2024-09-01T00:00:00
(exclusive).

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and
request counts are shared within the exchange 'candle' group.

market

string

required

Trading pair code representing the market.

to

string

End time of the query period. Retrieves candles that occurred before the
specified time. If not provided, the most recent candles based on the request
time are returned by default.

Specify the time in ISO 8601 datetime format. When making the actual request,
ensure that any spaces or special characters in the datetime string are properly
URL-encoded.

\[Example\]  
2025-06-24T04:56:53Z (UTC)  
2025-06-24 04:56:53 (UTC)  
2025-06-24T13:56:53+08:00 (SGT)

count

integer

Defaults to 1

Number of candles to retrieve.  
Supports up to 200 candles.  
Default: 1.

converting_price_unit

string

Conversion currency for the closing price. You can optionally specify a currency
to convert the closing price. When used, the response includes an additional
field, converted_trade_price.

\[Example\]  
If specified as “SGD”, the closing price is returned in SGD.

#

200

List of candles

array of objects

object

market

string

required

Trading pair code representing the market.

candle_date_time_utc

string

required

Start time of the candle period in UTC.

opening_price

double

required

The opening price of the candle, representing the first trading price during the
candle period.

high_price

double

required

The highest trading price, recorded during the candle period.

low_price

double

required

The lowest trading price. recorded during the candle period.

trade_price

double

required

The closing price of the candle, representing the last trading price during the
candle period.

timestamp

int64

required

The timestamp (in milliseconds) when the last tick of the candle was recorded.

candle_acc_trade_price

double

required

The total trade amount (in the quoted currency) accumulated during the candle
period.

candle_acc_trade_volume

double

required

The total traded volume (in the base asset) accumulated during the candle
period.

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

change_rate

double

required

Price change rate compared to the previous day's closing price. Calculated as
("trade_price" - "prev_closing_price") ÷ "prev_closing_price".

- Positive (+): Price increase
- Negative (-): Price decrease

Example: 0.015 = 1.5% increase

converted_trade_price

double

The closing price converted based on the currency specified in
converted_trade_price.

- If converted_trade_price is not included in the request, this field is not
  provided.
- If not digital asset market, return null value.

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

https://region\-api.upbit.com/v1/candles/days

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://region-api.upbit.com/v1/candles/days?count=1' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

16

1

\[

2

{

3

    "market": "SGD-BTC",

4

    "candle\_date\_time\_utc": "2025-07-30T00:00:00",

5

    "opening\_price": 153473,

6

    "high\_price": 153504,

7

    "low\_price": 151937,

8

    "trade\_price": 152114,

9

    "timestamp": 1753909903998,

10

    "candle\_acc\_trade\_price": 4564.10881053,

11

    "candle\_acc\_trade\_volume": 0.0299313,

12

    "prev\_closing\_price": 151721,

13

    "change\_price": 393,

14

    "change\_rate": 0.0025902808

15

}

16

\]

Updated 7 days ago

---

---

**Source:** [days-candles](https://global-docs.upbit.com/reference/days)
