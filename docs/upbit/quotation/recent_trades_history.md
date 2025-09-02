# Recent Trades History

##

Response

[](#response)

| Field Name         | Description                                               | Type   |
| ------------------ | --------------------------------------------------------- | ------ |
| market             | Market ID                                                 | String |
| trade_date_utc     | Trade Date(UTC)                                           | String |
| trade_time_utc     | Trade time(UTC)                                           | String |
| timestamp          | Trade timestamp                                           | Long   |
| trade_price        | Trade price                                               | Double |
| trade_volume       | Trade volume                                              | Double |
| prev_closing_price | Previous day closing price(from UTC +00:00).              | Double |
| change_price       | Change price compared to the previous day's closing price | Double |
| ask_bid            | Order type(ASK or BID)                                    | String |
| sequential_id      | Trade Sequential ID                                       | Long   |

- The `sequential_id` field can be used as a basis for determining the
  uniqueness of the transaction. However, it does not guarantee the order of
  transactions.

Count of trades

days_ago

int32

When given, it returns trade history within 7 days from the latest trade date.
Value should be less than or equal to 7.

# 200

## Query Parameters

| Parameter | Type   | Required | Description                                                                                                                                            |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| market    | string | Yes      | Market ID (ex. SGD-BTC, BTC-XRP)                                                                                                                       |
| to        | string | No       | When Only pagination is needed, the last trade time of the previous result. (exclusive). format : `yyyy-MM-dd'T'HH:mm:ssXXX` or `yyyy-MM-dd HH:mm:ss`. |
| cursor    | string | No       | Pagination Cursor. (The Trade Sequential ID)                                                                                                           |

200

array of objects

object

string

trade_time_utc

string

trade_price

number

Defaults to 0

trade_volume

number

Defaults to 0

prev_closing_price

number

Defaults to 0

change_price

number

Defaults to 0

ask_bid

string

sequential_id

integer

Defaults to 0

# 400

400

object

Updated 3 months ago

---

ShellNodeRubyPHPPython

xxxxxxxxxx

1

curl \--request GET \\

2

     \--url 'https://exchange-region-endpoint-url.com/v1/trades/ticks?count=1' \\

3

     \--header 'accept: application/json'

Updated 3 months ago

---

> **Source:**
> [recent-trades-history](https://global-docs.upbit.com/reference/today-trades-history)
