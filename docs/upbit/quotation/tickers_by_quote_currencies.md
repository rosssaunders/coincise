# Tickers By Quote Currencies

##

Request Parameters

[](#request-parameters)

| Field Name       | Description                                                                        | Type   |
| ---------------- | ---------------------------------------------------------------------------------- | ------ |
| quote_currencies | A list of quote currency codes separated by commas (ex. IDR, THB, SGD, BTC, USDT). | String |

##

Response

[](#response)

| Field Name            | Description                                                                         | Type   |
| --------------------- | ----------------------------------------------------------------------------------- | ------ |
| market                | Market ID                                                                           | String |
| trade_date            | Last trade date(UTC)                                                                | String |
| trade_time            | Last trade time(UTC)                                                                | String |
| trade_timestamp       | Last trade timestamp(UTC)Format: Unix Timestamp                                     | Long   |
| opening_price         | Opening price                                                                       | Double |
| high_price            | High price                                                                          | Double |
| low_price             | Low price                                                                           | Double |
| trade_price           | Closing price                                                                       | Double |
| prev_closing_price    | Previous closing price(from UTC +00:00).                                            | Double |
| change                | Change price type compared to the previous day's closing price.EVEN or RISE or FALL | String |
| change_price          | Change price compared to the previous day's closing price.                          | Double |
| change_rate           | Change price rate compared to the previous day's closing price.                     | Double |
| signed_change_price   | Signed change price price compared to the previous day's closing price.             | Double |
| signed_change_rate    | Signed change price rate compared to the previous day's closing price.              | Double |
| trade_volume          | Last trade volume                                                                   | Double |
| acc_trade_price       | Accumulated trade price(from UTC +00:00).                                           | Double |
| acc_trade_price_24h   | 24-hour accumulated trade price.                                                    | Double |
| acc_trade_volume      | Accumulated trade volume(from UTC +00:00).                                          | Double |
| acc_trade_volume_24h  | 24-hour accumulated trade volume.                                                   | Double |
| highest_52_week_price | 52-week high price                                                                  | Double |
| highest_52_week_date  | Date of 52-week high price                                                          | String |
| lowest_52_week_price  | 52-week low price                                                                   | Double |
| lowest_52_week_date   | Date of 52-week low price                                                           | String |
| timestamp             | Last changed timestamp                                                              | Long   |

quote_currencies

string

required

Comma separated currency codes (ex. SGD,THB,IDR,BTC,USDT)

# 200

200

json

# 400

400

object

Updated 3 months ago

---

NodePythonShell

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url https://exchange-region-endpoint-url.com/v1/ticker/all \\

3

     \--header 'accept: application/json'

xxxxxxxxxx

1

\[

2

{

3

    "market": "IDR-BTC",

4

    "trade\_date": "20240903",

5

    "trade\_time": "021805",

6

    "trade\_timestamp": 1725329885549,

7

    "opening\_price": 921540000,

8

    "high\_price": 934210000,

9

    "low\_price": 921540000,

10

    "trade\_price": 934200000,

11

    "prev\_closing\_price": 915430000,

12

    "change": "RISE",

13

    "change\_price": 18770000,

14

    "change\_rate": 0.0205040254,

15

    "signed\_change\_price": 18770000,

16

    "signed\_change\_rate": 0.0205040254,

17

    "trade\_volume": 0.00010704,

18

    "acc\_trade\_price": 11917930.43300000,

19

    "acc\_trade\_price\_24h": 12212110.01540000,

20

    "acc\_trade\_volume": 0.01286253,

21

    "acc\_trade\_volume\_24h": 0.01318691,

22

    "highest\_52\_week\_price": 1173570000.00000000,

23

    "highest\_52\_week\_date": "2024-06-05",

24

    "lowest\_52\_week\_price": 387710000.00000000,

25

    "lowest\_52\_week\_date": "2023-09-11",

26

    "timestamp": 1725335880051

27

},

28

{

29

    "market": "IDR-ETH",

30

    "trade\_date": "20240902",

31

    "trade\_time": "203333",

32

    "trade\_timestamp": 1725309213621,

33

    "opening\_price": 37980000.0000,

34

    "high\_price": 39630000.0000,

35

    "low\_price": 37980000.0000,

36

    "trade\_price": 39630000.0000,

37

    "prev\_closing\_price": 38780000.0000,

38

    "change": "RISE",

39

    "change\_price": 850000.0000,

40

    "change\_rate": 0.0219185147,

41

    "signed\_change\_price": 850000.0000,

42

    "signed\_change\_rate": 0.0219185147,

43

    "trade\_volume": 0.01639873,

44

    "acc\_trade\_price": 3102665.326800000000,

45

    "acc\_trade\_price\_24h": 1521886.07400000,

46

    "acc\_trade\_volume": 0.08015691,

47

    "acc\_trade\_volume\_24h": 0.03853555,

48

    "highest\_52\_week\_price": 64560000.00000000,

49

    "highest\_52\_week\_date": "2024-03-12",

50

    "lowest\_52\_week\_price": 23040000.00000000,

51

    "lowest\_52\_week\_date": "2023-09-11",

52

    "timestamp": 1725335880050

53

},

54

...

55

\]

Updated 3 months ago

---

> **Source:**
> [tickers-by-quote-currencies](https://global-docs.upbit.com/reference/tickers_by_quote)
