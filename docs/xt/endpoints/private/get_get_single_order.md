# GET /v4/order/{orderId}

**Source:** [https://doc.xt.com/docs/spot/Order/GetSingleOrder](https://doc.xt.com/docs/spot/Order/GetSingleOrder)

## Description

This endpoint retrieves operations on /v4/order/{orderId}.

## Authentication

Required (Private Endpoint)

## Rate Limit

-   10/s/apikey

## HTTP Request

`GET /v4/order/{orderId}`

## Request Parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| orderId | number | Yes | — | Order ID |

## Response Example

```json
{  "rc": 0,  "mc": "string",  "ma": [{}],  "result": {    "symbol": "BTC_USDT",    "orderId": "6216559590087220004",    "clientOrderId": "16559590087220001",    "baseCurrency": "string",    "quoteCurrency": "string",    "side": "BUY",
```