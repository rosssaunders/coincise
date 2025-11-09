# Seconds Candles

Note on 1-Second Candles (Tick Candles) Data Retention

The 1-second candle API provides data for up to **3 months**, based on the time of the request. If you request data beyond this period, the response may return an empty list or fewer items than the requested count. To check the available period, use the to parameter when making the query.

Candles are created only when trades occur within the given time interval.

If no trades occur between the start and end time of a candle, it will not be created and therefore will not appear in the API response. For example, a 1-Second candle with `candle_date_time = 2024-08-31T22:25:00` will not be created if no trades occur between 22:25:00 (inclusive) and 22:25:01 (exclusive).

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the quote currency to match your region. The base\_url differs by country/region. Make sure to specify the correct region value for your environment.  
  
\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

  

Revision History

| Version | Date | Changes |
| --- | --- | --- |
| v1.1.8 | 2024-10-30 | [Addition of `List Second Candles`](https://global-docs.upbit.com/changelog/year_sec_candles#/) |

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and request counts are shared within the exchange 'candle' group.

market

string

required

Trading pair code representing the market.

to

string

End time of the query period.  
Candles earlier than the specified time will be retrieved. If omitted, the latest candles are returned based on the request time.

Accepts ISO 8601 datetime format. You must perform URL encoding to ensure proper handling of spaces and special characters.

\[Example\]  
2025-06-24T04:56:53Z  
2025-06-24 04:56:53  
2025-06-24T13:56:53+08:00

Second candles support queries only for up to the last 3 months from the request time. If you specify a time earlier than that, the response will return an empty array.

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

candle\_date\_time\_utc

string

required

Start time of the candle period in UTC.

opening\_price

double

required

The opening price of the candle, representing the first trading price during the candle period.

high\_price

double

required

The highest trading price, recorded during the candle period.

low\_price

double

required

The lowest trading price. recorded during the candle period.

trade\_price

double

required

The closing price of the candle, representing the last trading price during the candle period.

timestamp

int64

required

The timestamp (in milliseconds) when the last tick of the candle was recorded.

candle\_acc\_trade\_price

double

required

The total trade amount (in the quoted currency) accumulated during the candle period.

candle\_acc\_trade\_volume

double

required

The total traded volume (in the base asset) accumulated during the candle period.

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

* * *

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/candles/seconds

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://region-api.upbit.com/v1/candles/seconds?count=1' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

13

1

\[

2

  {

3

    "market": "SGD-BTC",

4

    "candle\_date\_time\_utc": "2025-07-30T21:11:43",

5

    "opening\_price": 152114,

6

    "high\_price": 152114,

7

    "low\_price": 152114,

8

    "trade\_price": 152114,

9

    "timestamp": 1753909903998,

10

    "candle\_acc\_trade\_price": 16.28532484,

11

    "candle\_acc\_trade\_volume": 0.00010706

12

  }

13

\]

Updated about 1 month ago

* * *

---

**Source:** [seconds-candles](https://global-docs.upbit.com/reference/seconds-candles)
