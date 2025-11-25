# Tickers By Quote Currencies

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the
quote currency to match your region. The base_url differs by country/region.
Make sure to specify the correct region value for your environment.

\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

###

Price Change Indicators

[](#price-change-indicators)

The fields `change`, `change_price`, `change_rate`, `signed_change_price`, and
`signed_change_rate` returned when retrieving the current price of a pair
provide indicators related to price changes. These change indicators are
**calculated based on the previous day’s closing price.**

Revision History

| Version | Date       | Changes                                                                                            |
| ------- | ---------- | -------------------------------------------------------------------------------------------------- |
| v1.1.6  | 2024-09-04 | [Addition of `List Tickers by Market`](https://global-docs.upbit.com/changelog/tickers_by_quote#/) |

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and
request counts are shared within the exchange 'ticker' group.

quote_currencies

string

required

List of quote currencies to query. To query multiple currencies, provide them as
a comma-separated string.

\[Example\] SGD,BTC

#

200

List of tickers by market

array of objects

object

market

string

required

Trading pair code representing the market.

trade_date

string

required

Recent trade date in UTC.

trade_time

string

required

Recent trade time in UTC.

trade_timestamp

int64

required

The timestamp (in milliseconds) when the ticker was requested.

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

prev_closing_price

double

required

Previous day's closing price, based on UTC.

change

string

enum

required

Status of price change.

- `EVEN`: No change
- `RISE`: Increase
- `FALL`: Decrease

`EVEN` `RISE` `FALL`

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

signed_change_price

double

required

Signed price change compared to the previous day's closing price. Calculated as
"trade_price" - "prev_closing_price".

- Positive (+): Current price is higher than previous day's closing price
- Negative (-): Current price is lower than previous day's closing price

signed_change_rate

double

required

Signed price change rate compared to the previous day's closing price.
Calculated as ("trade_price" - "prev_closing_price") ÷ "prev_closing_price".

- Positive (+): Price increase
- Negative (-): Price decrease

\[Example\]: 0.015 = 1.5% increase

trade_volume

double

required

Most recent trade volume for the trading pair.

acc_trade_price

double

required

Accumulated trade amount since UTC.

acc_trade_price_24h

double

required

Accumulated trade amount over the past 24 hours.

acc_trade_volume

double

required

Accumulated trade volume since UTC.

acc_trade_volume_24h

double

required

Accumulated trade volume over the past 24 hours.

highest_52_week_price

double

required

Highest trading price achieved in the past 52 weeks.

highest_52_week_date

string

required

Date when the 52-week high price was achieved.

lowest_52_week_price

double

required

Lowest trading price achieved in the past 52 weeks.

lowest_52_week_date

string

required

Date when the 52-week low price was achieved.

timestamp

int64

required

The timestamp (in milliseconds) when the ticker was requested.

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

Updated 7 days ago

---

ShellPythonJavaNode

Base URL

https://region\-api.upbit.com/v1/ticker/all

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://region-api.upbit.com/v1/ticker/all \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

132

\]

1

\[

2

{

3

    "market": "SGD-USDT",

4

    "trade\_date": "20250731",

5

    "trade\_time": "112447",

6

    "trade\_timestamp": 1753961087850,

7

    "opening\_price": 1.3,

8

    "high\_price": 1.3,

9

    "low\_price": 1.295,

10

    "trade\_price": 1.3,

11

    "prev\_closing\_price": 1.3,

12

    "change": "EVEN",

13

    "change\_price": 0,

14

    "change\_rate": 0,

15

    "signed\_change\_price": 0,

16

    "signed\_change\_rate": 0,

17

    "trade\_volume": 7059.27692307,

18

    "acc\_trade\_price": 15279.16441218865,

19

    "acc\_trade\_price\_24h": 15329.03441219,

20

    "acc\_trade\_volume": 11754.54954784,

21

    "acc\_trade\_volume\_24h": 11792.9110863,

22

    "highest\_52\_week\_price": 800,

23

    "highest\_52\_week\_date": "2024-11-16",

24

    "lowest\_52\_week\_price": 1.25,

25

    "lowest\_52\_week\_date": "2025-06-30",

26

    "timestamp": 1753975850030

27

},

28

{

29

    "market": "SGD-SOL",

30

    "trade\_date": "20250731",

31

    "trade\_time": "141705",

32

    "trade\_timestamp": 1753971425175,

33

    "opening\_price": 232,

34

    "high\_price": 232,

35

    "low\_price": 228.7,

36

    "trade\_price": 228.7,

37

    "prev\_closing\_price": 228.3,

38

    "change": "RISE",

39

    "change\_price": 0.4,

40

    "change\_rate": 0.0017520806,

41

    "signed\_change\_price": 0.4,

42

    "signed\_change\_rate": 0.0017520806,

43

    "trade\_volume": 0.00481822,

44

    "acc\_trade\_price": 10737.123250223,

45

    "acc\_trade\_price\_24h": 11628.53010595,

46

    "acc\_trade\_volume": 46.30406992,

47

    "acc\_trade\_volume\_24h": 50.19863171,

48

    "highest\_52\_week\_price": 405.45,

49

    "highest\_52\_week\_date": "2025-01-19",

50

    "lowest\_52\_week\_price": 128.6,

51

    "lowest\_52\_week\_date": "2025-04-07",

52

    "timestamp": 1753975850031

53

},

54

{

55

    "market": "SGD-BTC",

56

    "trade\_date": "20250731",

57

    "trade\_time": "152857",

Updated 7 days ago

---

---

**Source:**
[tickers-by-quote-currencies](https://global-docs.upbit.com/reference/tickers_by_quote)
