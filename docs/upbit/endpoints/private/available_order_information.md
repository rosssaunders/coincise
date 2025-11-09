# GET /v1/orders/chance

**Source:** [available-order-information](https://global-docs.upbit.com/reference/available-order-information)

## Description

Retrieves the order availability information for the specified pair.

The order availability information for a market includes the following key fields.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/orders/chance`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| market | string | Yes | Trading pair code representing the market. |

## Request Example

```bash
curl --request GET     --url 'https://{region}-api.upbit.com/v1/orders/chance?market=SGD-BTC'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| bid_fee | string | Fee rate applied to buy orders. |
| ask_fee | string | Fee rate applied to sell orders. |
| maker_bid_fee | string | Fee rate for buy maker orders. |
| maker_ask_fee | string | Fee rate for sell maker orders. |
