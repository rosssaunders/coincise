# Tickers By Trading Pair

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the quote currency to match your region. The base\_url differs by country/region. Make sure to specify the correct region value for your environment.  
  
\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

### 

Price Change Indicators

[](#price-change-indicators)

The fields `change`, `change_price`, `change_rate`, `signed_change_price`, and `signed_change_rate` returned when retrieving the current price of a pair provide indicators related to price changes. These change indicators are **calculated based on the previous day’s closing price.**

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and request counts are shared within the exchange 'ticker' group.

markets

string

required

List of trading pairs to query.  
For multiple pairs, specify them as a comma-separated string.

\[Example\] SGD-BTC,SGD-ETH

# 

200

List of tickers

array of objects

object

market

string

required

Trading pair code representing the market.

trade\_date

string

required

Recent trade date in UTC.

trade\_time

string

required

Recent trade time in UTC.

trade\_timestamp

int64

required

The timestamp (in milliseconds) when the trade was executed.

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

prev\_closing\_price

double

required

Previous day's closing price, based on UTC.

change

string

enum

required

Status of price change.

-   `EVEN`: No change
-   `RISE`: Increase
-   `FALL`: Decrease

`EVEN` `RISE` `FALL`

change\_price

double

required

Absolute value of the price change compared to the previous day's closing price. Calculated as "trade\_price" - "prev\_closing\_price".

change\_rate

double

required

Absolute value of the price change rate compared to the previous day's closing price. Calculated as ("trade\_price" - "prev\_closing\_price") ÷ "prev\_closing\_price".

signed\_change\_price

double

required

Signed price change compared to the previous day's closing price. Calculated as "trade\_price" - "prev\_closing\_price".

-   Positive (+): Current price is higher than previous day's closing price
-   Negative (-): Current price is lower than previous day's closing price

signed\_change\_rate

double

required

Signed price change rate compared to the previous day's closing price. Calculated as ("trade\_price" - "prev\_closing\_price") ÷ "prev\_closing\_price".

-   Positive (+): Price increase
-   Negative (-): Price decrease

\[Example\]: 0.015 = 1.5% increase

trade\_volume

double

required

Most recent trade volume for the trading pair.

acc\_trade\_price

double

required

Accumulated trade amount since UTC.

acc\_trade\_price\_24h

double

required

Accumulated trade amount over the past 24 hours.

acc\_trade\_volume

double

required

Accumulated trade volume since UTC.

acc\_trade\_volume\_24h

double

required

Accumulated trade volume over the past 24 hours.

highest\_52\_week\_price

double

required

Highest trading price achieved in the past 52 weeks.

highest\_52\_week\_date

string

required

Date when the 52-week high price was achieved.

lowest\_52\_week\_price

double

required

Lowest trading price achieved in the past 52 weeks.

lowest\_52\_week\_date

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

https://region\-api.upbit.com/v1/ticker

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://region-api.upbit.com/v1/ticker \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

54

1

\[

2

  {

3

    "market": "SGD-BTC",

4

    "trade\_date": "20250802",

5

    "trade\_time": "050603",

6

    "trade\_timestamp": 1754111163227,

7

    "opening\_price": 146200,

8

    "high\_price": 147185,

9

    "low\_price": 146200,

10

    "trade\_price": 147152,

11

    "prev\_closing\_price": 146069,

12

    "change": "RISE",

13

    "change\_price": 1083,

14

    "change\_rate": 0.0074143042,

15

    "signed\_change\_price": 1083,

16

    "signed\_change\_rate": 0.0074143042,

17

    "trade\_volume": 0.00001592,

18

    "acc\_trade\_price": 4615.64264147,

19

    "acc\_trade\_price\_24h": 2449.59753547,

20

    "acc\_trade\_volume": 0.0315062,

21

    "acc\_trade\_volume\_24h": 0.01669057,

22

    "highest\_52\_week\_price": 157745,

23

    "highest\_52\_week\_date": "2025-07-14",

24

    "lowest\_52\_week\_price": 65687,

25

    "lowest\_52\_week\_date": "2024-08-05",

26

    "timestamp": 1754190935031

27

  },

28

  {

29

    "market": "SGD-ETH",

30

    "trade\_date": "20250803",

31

    "trade\_time": "025714",

32

    "trade\_timestamp": 1754189834969,

33

    "opening\_price": 4333,

34

    "high\_price": 4448,

35

    "low\_price": 4333,

36

    "trade\_price": 4448,

37

    "prev\_closing\_price": 4397,

38

    "change": "RISE",

39

    "change\_price": 51,

40

    "change\_rate": 0.0115988174,

41

    "signed\_change\_price": 51,

42

    "signed\_change\_rate": 0.0115988174,

43

    "trade\_volume": 0.22116943,

44

    "acc\_trade\_price": 1225.0473119,

45

    "acc\_trade\_price\_24h": 2461.18629393,

46

    "acc\_trade\_volume": 0.27675085,

47

    "acc\_trade\_volume\_24h": 0.54777252,

48

    "highest\_52\_week\_price": 5483,

49

    "highest\_52\_week\_date": "2024-12-16",

50

    "lowest\_52\_week\_price": 1881,

51

    "lowest\_52\_week\_date": "2025-04-07",

52

    "timestamp": 1754190935030

53

  }

54

\]

Updated about 1 month ago

* * *

---

**Source:** [tickers-by-trading-pair](https://global-docs.upbit.com/reference/tickers)
