# GET /v1/order

**Source:** [individual-order-inquiry](https://global-docs.upbit.com/reference/individual-order-inquiry)

## Description

Retrieves an order information by order UUID or Identifier.

Unique identifier(UUID) of the order to query

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
| uuid | string | No | Unique identifier(UUID) of the order to query |
| identifier | string | No | User-defined identifier of the order to query Used when querying by the order identifier assigned by the user or client at the time of order creation. |

## Request Example

```bash
xxxxxxxxxx1curl --request GET \2--url 'https://{region}-api.upbit.com/v1/order?uuid=9ca023a5-851b-4fec-9f0a-48cd83c2eaae' \3--header 'Authorization: Bearer {JWT_TOKEN}' \4--header 'accept: application/json'5​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| uuid | string | Unique identifier for the order. |
| side | string | Order side: "ask" (sell), "bid" (buy). ask bid |
| ord_type | string | Order type.  limit: Limit buy/sell order price: Market buy order market: Market sell order best: Best limit buy/sell order  limit price market best |
| price | string | Order unit price or total amount. For limit orders, this is the unit price. For market buy orders, this is the total purchase amount. |
| state | string | Order status.  wait: Waiting for execution watch: Scheduled order done: Execution completed cancel: Order cancelled  wait watch done cancel |
| created_at | string | Order creation time in UTC. |
| volume | string | Order request amount or quantity. |
| remaining_volume | string | Remaining order quantity after execution. |
| executed_volume | string | Executed order quantity. |
| reserved_fee | string | Fee amount reserved for the order. |
| remaining_fee | string | Remaining fee amount. |
| paid_fee | string | Fee amount paid at the time of execution. |
| locked | string | Amount or quantity locked by pending orders or trades. |
| time_in_force | string | Order execution policy as applied in the response. fok ioc post_only |
| smp_type | string | Self-Match Prevention (SMP) mode applied in the response. reduce cancel_maker cancel_taker |
| prevented_volume | string | Quantity cancelled due to Self-Match Prevention (SMP). Which prevents execution between orders from the same user. |
| prevented_locked | string | Assets released due to Self-Match Prevention (SMP). Remaining assets from an order canceled due to the Self-Match Prevention setting.  For buy orders: Cancelled amount For sell orders: Cancelled quantity |
| identifier | string | Order identifier specified by the client at order creation.  identifier field is only provided for orders created on or after October 18, 2024. |
| trades_count | integer | Number of trades executed for the order. |
| funds | string | Trade execution amount. |
| trend | string | Trade price trend.  up: Trade executed by "buy order" down: Trade executed by "sell order"  up down |
| name | string | Name identifying the error. |
| message | string | Message describing the cause of the error. |
