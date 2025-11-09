# GET /v1/candles/years

**Source:** [years-candles](https://global-docs.upbit.com/reference/years-candles)

## Description

Retrieves the list of candles per year.

Trading pair code representing the market.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/candles/years`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| market | string | Yes | Trading pair code representing the market. |
| to | string | No | End time of the query period. Retrieves candles that occurred before the specified time. If not provided, the most recent candles based on the request time are returned by default. Specify the time in ISO 8601 datetime format. When making the actual request, ensure that any spaces or special characters in the datetime string are properly URL-encoded. [Example] 2025-06-24T04:56:53Z (UTC) 2025-06-24 04:56:53 (UTC) 2025-06-24T13:56:53+08:00 (SGT) |
| count | integer | No | Number of candles to retrieve. Supports up to 200 candles. Default: 1. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET      --url 'https://region-api.upbit.com/v1/candles/years?count=1'      --header 'accept: application/json'
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
| first_day_of_period | string | Start date of candle aggregation. |

## Response Example

### Success Response (200 OK)

```json
[2  {3    "market": "SGD-BTC", "candle_date_time_utc": "2025-01-01T00:00:00", "opening_price": 127871, "high_price": 157745, "low_price": 101000, "trade_price": 152114, "timestamp": 1753909903998, "candle_acc_trade_price": 3041987.66401311, "candle_acc_trade_volume": 23.30205337, "first_day_of_period": "2025-01-01"13  }14]
```
