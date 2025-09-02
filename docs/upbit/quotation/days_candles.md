# Days Candles

##

Response

[](#response)

| Field Name              | Description                                                                                      | Type   |
| ----------------------- | ------------------------------------------------------------------------------------------------ | ------ |
| market                  | Market ID                                                                                        | String |
| candle_date_time_utc    | Candle time(UTC)                                                                                 | String |
| opening_price           | Opening price                                                                                    | Double |
| high_price              | High price                                                                                       | Double |
| low_price               | Low price                                                                                        | Double |
| trade_price             | Closing price.                                                                                   | Double |
| timestamp               | Last trade timestamp for the candle.                                                             | Long   |
| candle_acc_trade_price  | Accumulated trade price for the candle.                                                          | Double |
| candle_acc_trade_volume | Accumulated trade quantity for the candle.                                                       | Double |
| prev_closing_price      | Previous Day Close Price(Based on UTC+0)                                                         | Double |
| change_price            | Change price compared to the previous day's closing price                                        | Double |
| change_rate             | Change price rate compared to the previous day's closing price                                   | Double |
| converted_trade_price   | Converted Close price by 'convertingPriceUnit'.(If not digital asset market, return null value.) | Double |

Count of candles (LIMIT : 200)

converting_price_unit

string

Converted close price unit.(Optional. If market ID is in digital asset market).
Available Value : SGD

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

prev_closing_price

number

Defaults to 0

change_price

number

Defaults to 0

change_rate

number

Defaults to 0

converted_trade_price

number

Defaults to 0

# 400

400

object

Updated 3 months ago

---

ShellPythonNode

xxxxxxxxxx

1

\# Request the most recent day candlestick for the IDR-BTC market.

2

curl \--request GET \\

3

     \--url 'https://id-api.upbit.com/v1/candles/days?market=IDR-BTC&count=1' \\

4

     \--header 'accept: application/json'

5

​

6

\# Request the most recent day candlestick for the IDR-BTC market before October
1, 2024 (UTC).

7

curl \--request GET \\

8

     \--url 'https://id-api.upbit.com/v1/candles/days?market=IDR-BTC&count=1&to=2024-10-01%2000%3A00%3A00' \\

9

     \--header 'accept: application/json'

10

Updated 3 months ago

---

> **Source:** [days-candles](https://global-docs.upbit.com/reference/days)
