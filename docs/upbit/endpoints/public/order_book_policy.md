# GET /v1/orderbook/instruments

**Source:** [order-book-policy](https://global-docs.upbit.com/reference/order-book-policy)

## Description

Retrieves the tick size (order price unit) for the specified trading pairs.

List of trading pairs to query.
For multiple pairs, specify them as a comma-separated string.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 10 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/orderbook/instruments`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| markets | string | Yes | List of trading pairs to query. For multiple pairs, specify them as a comma-separated string. [Example] SGD-BTC,SGD-ETH |

## Request Example

```bash
curl --request GET      --url https://region-api.upbit.com/v1/orderbook/instruments      --header 'accept: application/json'
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| quote_currency | string | Quote currency code of the pair |
| tick_size | string | Price unit applied to the orderbook level |
