# Years Candles

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

Revision History

| Version | Date       | Changes                                                                                       |
| ------- | ---------- | --------------------------------------------------------------------------------------------- |
| v1.1.8  | 2024-10-30 | [Addition of `List Year Candles`](https://global-docs.upbit.com/changelog/year_sec_candles#/) |

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

first_day_of_period

string

required

Start date of candle aggregation.

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

Updated about 1 month ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/candles/years

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://region-api.upbit.com/v1/candles/years?count=1' \\

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

    "candle\_date\_time\_utc": "2025-01-01T00:00:00",

5

    "opening\_price": 127871,

6

    "high\_price": 157745,

7

    "low\_price": 101000,

8

    "trade\_price": 152114,

9

    "timestamp": 1753909903998,

10

    "candle\_acc\_trade\_price": 3041987.66401311,

11

    "candle\_acc\_trade\_volume": 23.30205337,

12

    "first\_day\_of\_period": "2025-01-01"

13

}

14

\]

Updated about 1 month ago

---

---

**Source:**
[years-candles](https://global-docs.upbit.com/reference/years-candles)
