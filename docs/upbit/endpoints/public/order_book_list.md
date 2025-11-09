# GET /v1/orderbook

**Source:** [order-book-list](https://global-docs.upbit.com/reference/order-book-list)

## Description

Retrieves the real-time orderbook data for the specified markets.

List of trading pairs to query.
For multiple pairs, specify them as a comma-separated string.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/orderbook`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| markets | string | Yes | List of trading pairs to query. For multiple pairs, specify them as a comma-separated string. [Example] SGD-BTC,SGD-ETH |
| count | integer | No | Number of order book entries to query. Returns the specified number of order book entries, based on the highest bid and lowest ask. If not specified, the default value is 30. |

## Request Example

```bash
curl --request GET      --url 'https://region-api.upbit.com/v1/orderbook?count=30'      --header 'accept: application/json'
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| timestamp | int64 | Timestamp of the query request (ms) |
| total_ask_size | double | Total ask volume in the current orderbook. |
| total_bid_size | double | Total bid volume in the current orderbook. |
| ask_price | double | The lowest sell (ask) price in the orderbook. |
| bid_price | double | The highest buy (bid) price in the orderbook. |
| ask_size | double | Sell (ask) quantity at the corresponding ask price. |
| bid_size | double | Buy (bid) quantity at the corresponding bid price. |
