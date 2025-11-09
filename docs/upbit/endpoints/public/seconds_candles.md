# GET /v1/candles/seconds

**Source:** [seconds-candles](https://global-docs.upbit.com/reference/seconds-candles)

## Description

Retrieves the list of candles per second.

Trading pair code representing the market.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/candles/seconds`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| market | string | Yes | Trading pair code representing the market. |
| to | string | No | End time of the query period. Candles earlier than the specified time will be retrieved. If omitted, the latest candles are returned based on the request time. Accepts ISO 8601 datetime format. You must perform URL encoding to ensure proper handling of spaces and special characters. [Example] 2025-06-24T04:56:53Z 2025-06-24 04:56:53 2025-06-24T13:56:53+08:00 Second candles support queries only for up to the last 3 months from the request time. If you specify a time earlier than that, the response will return an empty array. |
| count | integer | No | Number of candles to retrieve. Supports up to 200 candles. Default: 1. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET      --url 'https://region-api.upbit.com/v1/candles/seconds?count=1'      --header 'accept: application/json'
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

## Response Example

### Success Response (200 OK)

```json
[2  {3    "market": "SGD-BTC", "candle_date_time_utc": "2025-07-30T21:11:43", "opening_price": 152114, "high_price": 152114, "low_price": 152114, "trade_price": 152114, "timestamp": 1753909903998, "candle_acc_trade_price": 16.28532484, "candle_acc_trade_volume": 0.0001070612  }13]
```
