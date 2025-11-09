# GET /v1/market/all

**Source:** [listing-market-list](https://global-docs.upbit.com/reference/listing-market-list)

## Description

Retrieves the list of all trading pairs supported by Upbit.

The order availability information for a market includes the following key fields.

## Authentication

Not Required (Public Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/market/all`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| is_details | boolean | No | Whether to include detailed information in the query. If true, the response includes detail fields such as caution or warning designation. Default: false. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET      --url https://region-api.upbit.com/v1/market/all      --header 'accept: application/json'
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| english_name | string | English name of the digital asset. |
| market_warning | string | Trading pair warning Information.  NONE (Not applicable) CAUTION(Investment warning) |

## Response Example

### Success Response (200 OK)

```json
[2  {3    "market": "SGD-ETH", "english_name": "Ethereum", "market_warning": "NONE"6  }, {8    "market": "SGD-XRP", "english_name": "XRP", "market_warning": "NONE"11  }, {13    "market": "SGD-BTC", "english_name": "Bitcoin", "market_warning": "NONE"16  }, {18    "market": "SGD-USDT", "english_name": "Tether", "market_warning": "NONE"21  }, {23    "market": "SGD-SOL", "english_name": "Solana", "market_warning": "NONE"26  }27]
```
