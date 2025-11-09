# Order Book List

**Check the proper endpoint based on your region.**

The examples in this page is written using Singapore fiat code(SGD). Set the quote currency to match your region. The base\_url differs by country/region. Make sure to specify the correct region value for your environment.  
  
\- Singapore (sg): https://sg-api.upbit.com  
\- Indonesia (id): https://id-api.upbit.com  
\- Thailand (th): https://th-api.upbit.com

  

Revision History

| Version | Date | Changes |
| --- | --- | --- |
| v1.2.1 | 2025-07-02 | [Addition of `count` parameter, up to 30 orderbook levels supported](https://global-docs.upbit.com/changelog/rest_orderbook_unit_options#/) |
| v1.1.9 | 2025-05-07 | [Change in `orderbook_units` field of the Orderbook API,  
Increased from 15 to 30](https://global-docs.upbit.com/changelog/orderbook_expansion#/) |

Rate Limit

Up to 10 calls per second are allowed. This is measured on an IP basis and request counts are shared within the exchange 'orderbook' group.

markets

string

required

List of trading pairs to query.  
For multiple pairs, specify them as a comma-separated string.

\[Example\] SGD-BTC,SGD-ETH

count

integer

Defaults to 30

Number of order book entries to query.  
Returns the specified number of order book entries, based on the highest bid and lowest ask.  
If not specified, the default value is 30.

# 

200

List of orderbooks

array of objects

object

market

string

required

Trading pair code representing the market.

timestamp

int64

required

Timestamp of the query request (ms)

total\_ask\_size

double

required

Total ask volume in the current orderbook.

total\_bid\_size

double

required

Total bid volume in the current orderbook.

orderbook\_units

array of objects

required

List of order book entries, ordered sequentially from level 1 to level 30.

orderbook\_units\*

object

ask\_price

double

required

The lowest sell (ask) price in the orderbook.

bid\_price

double

required

The highest buy (bid) price in the orderbook.

ask\_size

double

required

Sell (ask) quantity at the corresponding ask price.

bid\_size

double

required

Buy (bid) quantity at the corresponding bid price.

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

https://region\-api.upbit.com/v1/orderbook

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://region-api.upbit.com/v1/orderbook?count=30' \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

190

\]

1

\[

2

  {

3

    "market": "SGD-BTC",

4

    "timestamp": 1753973734372,

5

    "total\_ask\_size": 10.6377063,

6

    "total\_bid\_size": 0.74153973,

7

    "orderbook\_units": \[

8

      {

9

        "ask\_price": 153487,

10

        "bid\_price": 153105,

11

        "ask\_size": 0.00011366,

12

        "bid\_size": 0.17

13

      },

14

      {

15

        "ask\_price": 153489,

16

        "bid\_price": 153104,

17

        "ask\_size": 0.00011366,

18

        "bid\_size": 0.17

19

      },

20

      {

21

        "ask\_price": 153750,

22

        "bid\_price": 152384,

23

        "ask\_size": 0.09,

24

        "bid\_size": 0.2

25

      },

26

      {

27

        "ask\_price": 153813,

28

        "bid\_price": 150956,

29

        "ask\_size": 0.2,

30

        "bid\_size": 0.01627697

31

      },

32

      {

33

        "ask\_price": 155494,

34

        "bid\_price": 150503,

35

        "ask\_size": 0.01175995,

36

        "bid\_size": 0.01534872

37

      },

38

      {

39

        "ask\_price": 155703,

40

        "bid\_price": 150350,

41

        "ask\_size": 0.01115748,

42

        "bid\_size": 0.00329299

43

      },

44

      {

45

        "ask\_price": 155965,

46

        "bid\_price": 149700,

47

        "ask\_size": 0.01410468,

48

        "bid\_size": 0.0187742

49

      },

50

      {

51

        "ask\_price": 156358,

52

        "bid\_price": 149132,

53

        "ask\_size": 0.01346486,

54

        "bid\_size": 0.01736742

55

      },

56

      {

57

        "ask\_price": 156620,

Updated about 1 month ago

* * *

---

**Source:** [order-book-list](https://global-docs.upbit.com/reference/order-book-list)
