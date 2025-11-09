# GET /v1/order

**Source:** [order-cancel](https://global-docs.upbit.com/reference/order-cancel)

## Description

Cancel an order by UUID or Identifier.

Unique identifier(UUID) of the order to cancel

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 30 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/order`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| uuid | string | Yes | Unique identifier(UUID) of the order to cancel |
| identifier | string | No | Client-assigned identifier of the order to be canceled. Used when canceling an order by the order identifier assigned by the user or client at the time of order creation. |

## Request Example

```bash
xxxxxxxxxx1curl --request DELETE     --url 'https://{region}-api.upbit.com/v1/order?uuid=cdd92199-2897-4e14-9448-f923320408ad'     --header 'Authorization: Bearer {JWT_TOKEN}'     --header 'Accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| uuid | string | Unique identifier for the order. |
| side | string | Order side: "ask" (sell), "bid" (buy). ask bid |
| ord_type | string | Order type.  limit: Limit buy/sell order price: Market buy order market: Market sell order best: Best limit buy/sell order  limit price market best |
| price | string | Order unit price or total amount. For limit orders, this is the unit price. For market buy orders, this is the total purchase amount. |
| state | string | Order status.  wait: Waiting for execution watch: Scheduled order  wait watch |
| created_at | string | Order creation time in UTC. |
| volume | string | Order request amount or quantity. |
| remaining_volume | string | Remaining order quantity after execution. |
| executed_volume | string | Executed order quantity. |
| reserved_fee | string | Fee amount reserved for the order. |
| remaining_fee | string | Remaining fee amount. |
| paid_fee | string | Fee amount paid at the time of execution. |
| locked | string | Amount or quantity locked by pending orders or trades. |
| time_in_force | string | Order execution policy as applied in the response. fok ioc post_only |
| identifier | string | Order identifier specified by the client at order creation.  identifier field is only provided for orders created on or after October 18, 2024. |
| smp_type | string | Self-Match Prevention (SMP) mode applied in the response. reduce cancel_maker cancel_taker |
| prevented_volume | string | Quantity cancelled due to Self-Match Prevention (SMP). Which prevents execution between orders from the same user. |
| prevented_locked | string | Assets released due to Self-Match Prevention (SMP). Remaining assets from an order canceled due to the Self-Match Prevention setting.  For buy orders: Cancelled amount For sell orders: Cancelled quantity |
| trades_count | integer | Number of trades executed for the order. |

## Response Example

### Success Response (200 OK)

```json
[2  {3    "uuid": "cdd92199-2897-4e14-9448-f923320408ad", "side": "bid", "ord_type": "limit", "price": "153559.00", "state": "wait", "market": "SGD-BTC", "created_at": "2025-07-04T15:00:00", "volume": "1.0", "remaining_volume": "1.0", "executed_volume": "0", "reserved_fee": "383.8975", "remaining_fee": "383.8975", "paid_fee": "0", "locked": "153942.8975", "prevented_volume": "0", "prevented_locked": "0", "trades_count": 020  }21]
```
