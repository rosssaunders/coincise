# Tickers By Trading Pair

##

Request Parameters

[](#request-parameters)

| Field Name | Description                                          | Type   |
| ---------- | ---------------------------------------------------- | ------ |
| markets    | Comma separated Market ID list (ex. IDR-BTC,BTC-XRP) | String |

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

# 200

## Query Parameters

| Parameter | Type   | Required | Description                                           |
| --------- | ------ | -------- | ----------------------------------------------------- |
| markets   | string | Yes      | Comma separated Market ID list (ex. IDR-BTC,BTC-XRP ) |
| market    | string | No       | trade_date                                            |
| change    | string | No       | change_price                                          |

200

array of objects

object

string

trade_time

string

trade_timestamp

integer

Defaults to 0

opening_price

integer

Defaults to 0

high_price

integer

Defaults to 0

low_price

integer

Defaults to 0

trade_price

integer

Defaults to 0

prev_closing_price

integer

Defaults to 0

integer

Defaults to 0

change_rate

number

Defaults to 0

signed_change_price

integer

Defaults to 0

signed_change_rate

number

Defaults to 0

trade_volume

number

Defaults to 0

acc_trade_price

number

Defaults to 0

acc_trade_price_24h

number

Defaults to 0

acc_trade_volume

number

Defaults to 0

acc_trade_volume_24h

number

Defaults to 0

highest_52_week_price

integer

Defaults to 0

highest_52_week_date

string

lowest_52_week_price

integer

Defaults to 0

lowest_52_week_date

string

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

     \--url https://exchange-region-endpoint-url.com/v1/ticker \\

3

     \--header 'accept: application/json'

Updated 3 months ago

---

> **Source:**
> [tickers-by-trading-pair](https://global-docs.upbit.com/reference/tickers)
