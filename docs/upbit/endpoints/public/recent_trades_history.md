# GET /v1/trades/ticks

**Source:** [recent-trades-history](https://global-docs.upbit.com/reference/today-trades-history)

## Description

Retrieves recent trades for the specified pair.

Trading pair code representing the market.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/trades/ticks`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| market | string | Yes | Trading pair code representing the market. |
| to | string | No | End time of the query period(UTC). This is an optional filter parameter to retrieve trade executed before a specific time window on the selected date. Specify the time in either HHmmss or HH:mm:ss format. The results are returned in reverse chronological order starting from the specified time. [Example] days_ago=1&to=130000 returns trades before 13:00:00 UTC of the previous day in descending order. |
| count | integer | No | Number of trades to retrieve. Supports up to 500 trades. Default: 1. |
| cursor | string | No | Cursor for pagination. Enter the "sequential_id" from the API response into this field to continue retrieving trade history. It returns up to "count" trades prior to the specified sequential_id. |
| days_ago | integer | No | Day offset between the trade date to query and the request time. Trade history must be queried by specifying the trade date, and up to 7 days of history is supported (based on UTC). Specify an integer between 1 and 7. If omitted, the API returns the trades for the request date. If set to 7, it returns trades executed 7 days before the request date, in reverse chronological order (latest first). |

## Request Example

```bash
curl --request GET      --url 'https://region-api.upbit.com/v1/trades/ticks?count=1'      --header 'accept: application/json'
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| trade_date_utc | string | Trade date in UTC. |
| trade_time_utc | string | Trade time in UTC. |
| timestamp | int64 | The timestamp (in milliseconds) when the trade was executed. |
| trade_price | double | The closing price of the candle, representing the last trading price during the candle period. |
| trade_volume | double | Most recent trade volume for the trading pair. |
| prev_closing_price | double | Previous day's closing price, based on UTC. |
| change_price | double | Price change compared to the previous day's closing price. Calculated as "trade_price" - "prev_closing_price".  Positive (+): Current price is higher than previous day's closing price Negative (-): Current price is lower than previous day's closing price |
| ask_bid | string | Trade direction. "ASK" for sell orders, "BID" for buy orders. ASK BID |
| sequential_id | integer | Unique identifier for the trade. This field does not guarantee trade order sequence. |
