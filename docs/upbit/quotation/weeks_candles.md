# Weeks Candles

##

Response

[](#response)

| Field Name              | Description                                | Type   |
| ----------------------- | ------------------------------------------ | ------ |
| market                  | Market ID                                  | String |
| candle_date_time_utc    | Candle time(UTC)                           | String |
| opening_price           | Open price                                 | Double |
| high_price              | High price                                 | Double |
| low_price               | Low price                                  | Double |
| trade_price             | Close price                                | Double |
| timestamp               | Last trade timestamp for the candle.       | Long   |
| candle_acc_trade_price  | Accumulated trade price for the candle.    | Double |
| candle_acc_trade_volume | Accumulated trade quantity for the candle. | Double |
| first_day_of_period     | First date of the candles.                 | String |

Count of candles (LIMIT : 200)

# 200

## Query Parameters

| Parameter | Type   | Required | Description                                                                                                                                             |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| market    | string | Yes      | Market ID (ex. SGD-BTC, BTC-XRP)                                                                                                                        |
| to        | string | No       | When Only pagination is needed, the last candle time of the previous result. (exclusive). format : `yyyy-MM-dd'T'HH:mm:ssXXX` or `yyyy-MM-dd HH:mm:ss`. |

200

array of objects

object

string

opening_price

number

Defaults to 0

high_price

number

Defaults to 0

low_price

number

Defaults to 0

trade_price

number

Defaults to 0

candle_acc_trade_price

number

Defaults to 0

candle_acc_trade_volume

number

Defaults to 0

first_day_of_period

string

# 400

400

object

Updated 3 months ago

---

ShellPythonNode

xxxxxxxxxx

1

\# Request the most recent week candlestick for the IDR-BTC market.

2

curl \--request GET \\

3

     \--url 'https://id-api.upbit.com/v1/candles/weeks?market=IDR-BTC&count=1' \\

4

     \--header 'accept: application/json'

5

​

6

\# Request the most recent week candlestick for the IDR-BTC market before
October 1, 2024 (UTC).

7

curl \--request GET \\

8

     \--url 'https://id-api.upbit.com/v1/candles/weeks?market=IDR-BTC&count=1&to=2024-10-01%2000%3A00%3A00' \\

9

     \--header 'accept: application/json'

10

Updated 3 months ago

---

> **Source:** [weeks-candles](https://global-docs.upbit.com/reference/weeks)
