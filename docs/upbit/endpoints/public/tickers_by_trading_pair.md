# GET /v1/ticker

**Source:** [tickers-by-trading-pair](https://global-docs.upbit.com/reference/tickers)

## Description

Retrieves the current price for the specified pair. Returns the ticker snapshot of the pair at the time of the request.

The fields change, change_price, change_rate, signed_change_price, and signed_change_rate returned when retrieving the current price of a pair provide indicators related to price changes. These change indicators are calculated based on the previous day’s closing price.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/ticker`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| markets | string | Yes | List of trading pairs to query. For multiple pairs, specify them as a comma-separated string. [Example] SGD-BTC,SGD-ETH |

## Request Example

```bash
curl --request GET      --url https://region-api.upbit.com/v1/ticker      --header 'accept: application/json'
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| trade_date | string | Recent trade date in UTC. |
| trade_time | string | Recent trade time in UTC. |
| trade_timestamp | int64 | The timestamp (in milliseconds) when the trade was executed. |
| opening_price | double | The opening price of the candle, representing the first trading price during the candle period. |
| high_price | double | The highest trading price, recorded during the candle period. |
| low_price | double | The lowest trading price. recorded during the candle period. |
| trade_price | double | The closing price of the candle, representing the last trading price during the candle period. |
| prev_closing_price | double | Previous day's closing price, based on UTC. |
| change | string | Status of price change.  EVEN: No change RISE: Increase FALL: Decrease  EVEN RISE FALL |
| change_price | double | Absolute value of the price change compared to the previous day's closing price. Calculated as "trade_price" - "prev_closing_price". |
| change_rate | double | Absolute value of the price change rate compared to the previous day's closing price. Calculated as ("trade_price" - "prev_closing_price") ÷ "prev_closing_price". |
| signed_change_price | double | Signed price change compared to the previous day's closing price. Calculated as "trade_price" - "prev_closing_price".  Positive (+): Current price is higher than previous day's closing price Negative (-): Current price is lower than previous day's closing price |
| signed_change_rate | double | Signed price change rate compared to the previous day's closing price. Calculated as ("trade_price" - "prev_closing_price") ÷ "prev_closing_price".  Positive (+): Price increase Negative (-): Price decrease  [Example]: 0.015 = 1.5% increase |
| trade_volume | double | Most recent trade volume for the trading pair. |
| acc_trade_price | double | Accumulated trade amount since UTC. |
| acc_trade_price_24h | double | Accumulated trade amount over the past 24 hours. |
| acc_trade_volume | double | Accumulated trade volume since UTC. |
| acc_trade_volume_24h | double | Accumulated trade volume over the past 24 hours. |
| highest_52_week_price | double | Highest trading price achieved in the past 52 weeks. |
| highest_52_week_date | string | Date when the 52-week high price was achieved. |
| lowest_52_week_price | double | Lowest trading price achieved in the past 52 weeks. |
| lowest_52_week_date | string | Date when the 52-week low price was achieved. |
| timestamp | int64 | The timestamp (in milliseconds) when the ticker was requested. |
