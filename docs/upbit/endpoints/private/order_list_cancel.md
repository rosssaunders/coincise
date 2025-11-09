# GET /v1/orders/uuids

**Source:** [order-list-cancel](https://global-docs.upbit.com/reference/order-list-cancel)

## Description

Cancel specified orders by providing a list of UUIDs or Identifiers. You can cancel up to 20 orders in a single request.

List of order UUIDs
The maximum number of orders that can be canceled is 20.
When querying with two or more UUIDs, specify the query parameters as follows:

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/orders/uuids`

## Request Example

```bash
curl --request DELETE     --url 'https://{region}-api.upbit.com/v1/orders/uuids?uuids[]=bbbb8e07-1689-4769-af3e-a117016623f8&uuids[]=4312ba49-5f1a-4a01-9f3b-2d2bce17267e&uuids[]=bdb49a54-de36-4eb4-a963-9c8d4337a9da'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| count | number | Number of orders successfully cancelled. |
| uuid | string | Unique identifier for the order. |
| market | string | Trading pair code representing the market. |
| identifier | string | Order identifier specified by the client at order creation.  identifier field is only provided for orders created on or after October 18, 2024. |
