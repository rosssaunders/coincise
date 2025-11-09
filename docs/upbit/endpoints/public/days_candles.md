# GET /v1/candles/days

**Source:** [days-candles](https://global-docs.upbit.com/reference/days)

## Description

Retrieves the list of candles per day.

Trading pair code representing the market.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/candles/days`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| market | string | Yes | Trading pair code representing the market. |
| to | string | No | End time of the query period. Retrieves candles that occurred before the specified time. If not provided, the most recent candles based on the request time are returned by default. Specify the time in ISO 8601 datetime format. When making the actual request, ensure that any spaces or special characters in the datetime string are properly URL-encoded. [Example] 2025-06-24T04:56:53Z (UTC) 2025-06-24 04:56:53 (UTC) 2025-06-24T13:56:53+08:00 (SGT) |
| count | integer | No | Number of candles to retrieve. Supports up to 200 candles. Default: 1. |
| converting_price_unit | string | No | Conversion currency for the closing price. You can optionally specify a currency to convert the closing price. When used, the response includes an additional field, converted_trade_price. [Example] If specified as “SGD”, the closing price is returned in SGD. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET      --url 'https://region-api.upbit.com/v1/candles/days?count=1'      --header 'accept: application/json'
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| candle_date_time_utc | string | Start time of the candle period in UTC. |
| opening_price | double | The opening price of the candle, representing the first trading price during the candle period. |
| high_price | double | The highest trading price, recorded during the candle period. |
| low_price | double | The lowest trading price. recorded during the candle period. |
| trade_price | double | The closing price of the candle, representing the last trading price during the candle period. |
| timestamp | int64 | The timestamp (in milliseconds) when the last tick of the candle was recorded. |
| candle_acc_trade_price | double | The total trade amount (in the quoted currency) accumulated during the candle period. |
| candle_acc_trade_volume | double | The total traded volume (in the base asset) accumulated during the candle period. |
| prev_closing_price | double | Previous day's closing price, based on UTC. |
| change_price | double | Price change compared to the previous day's closing price. Calculated as "trade_price" - "prev_closing_price".  Positive (+): Current price is higher than previous day's closing price Negative (-): Current price is lower than previous day's closing price |
| change_rate | double | Price change rate compared to the previous day's closing price. Calculated as ("trade_price" - "prev_closing_price") ÷ "prev_closing_price".  Positive (+): Price increase Negative (-): Price decrease  Example: 0.015 = 1.5% increase |
| converted_trade_price | double | The closing price converted based on the currency specified in converted_trade_price.  If converted_trade_price is not included in the request, this field is not provided. If not digital asset market, return null value. |

## Response Example

### Success Response (200 OK)

```json
[2  {3    "market": "SGD-BTC", "candle_date_time_utc": "2025-07-30T00:00:00", "opening_price": 153473, "high_price": 153504, "low_price": 151937, "trade_price": 152114, "timestamp": 1753909903998, "candle_acc_trade_price": 4564.10881053, "candle_acc_trade_volume": 0.0299313, "prev_closing_price": 151721, "change_price": 393, "change_rate": 0.002590280815  }16]
```
