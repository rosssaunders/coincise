# GET /v1/orders

**Source:** [order](https://global-docs.upbit.com/reference/order)

## Description

Creates an order to buy or sell a specific trading pair.

The available order types are as follows.

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 8 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/orders`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| market | string | Yes | Trading pair code for which the order will be created. |
| side | string | Yes | Order side: "bid" for buy orders, "ask" for sell orders. |
| volume | string | No | Order quantity, as a numeric string. Required for:  Limit buy/sell (ord_type = "limit") Market sell (ord_type = "market") Best limit sell (side = "ask" and ord_type = "best") |
| price | string | No | Order unit price or total amount, entered as a numeric string based on the currency for purchase. Required for:  Limit buy/sell (ord_type = "limit") Market buy (ord_type = "price") Best limit buy (side = "bid" and ord_type = "best")  The price field is used for different purposes depending on the order type.  For limit orders, this field specifies the quote price. For market buy and best limit buy, this field specifies the total purchase amount. The order will execute for the volume that fills this amount at market or best price. |
| ord_type | string | No | Order type to create. Enter one of the following values depending on the order type to be created.  limit: Limit buy/sell order price: Market buy order market: Market sell order best: Best limit buy/sell order (The time_in_force field is required.) |
| identifier | string | No | Client-specified order identifier. Each order must have a unique identifier within the user's account. Once used, an identifier value cannot be reused regardless of order creation or execution. |
| time_in_force | string | No | Order execution policy. Order execution policy such as IOC (Immediate or Cancel), FOK (Fill or Kill), and Post Only can be specified. For market orders (when the ord_type field is set to "limit"), all options can be used optionally. For best bid/ask limit orders (when the ord_type field is set to "best"), either "ioc" or "fok" must be specified. The available values are as follows:  ioc: Execute immediately for available quantity at the limit price; cancel the rest. fok: Execute only if the full quantity can be filled at the limit price; otherwise cancel the order. post_only: Only add to the order book as maker; cancel if the order would execute as taker. |
| smp_type | string | No | Self-Match Prevention (SMP) mode. The available values are as follows:  cancel_maker: Cancel the maker order (existing order) cancel_taker: Cancel the taker order (new order) reduce: Reduce both order quantities to prevent self-trading; cancel the order if remaining quantity is 0 |

## Request Example

```bash
xxxxxxxxxx151curl --request POST \2--url 'https://{region}-api.upbit.com/v1/orders' \3--header 'Authorization: Bearer {JWT_TOKEN}' \4--header 'Accept: application/json' \5--header 'Content-Type: application/json' \6--data '7  {8  "market":"SGD-BTC",9  "side":"bid",10  "volume":"1",11  "price":"153559",12  "ord_type":"limit"13  }14'15​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| uuid | string | Unique identifier for the order. |
| side | string | Order side: "ask" (sell), "bid" (buy). ask bid |
| ord_type | string | Order type. limit price market best |
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
| trades_count | integer | Number of trades executed for the order. |
| time_in_force | string | Order execution policy as applied in the response. fok ioc post_only |
| identifier | string | Order identifier specified by the client at order creation.  identifier field is only provided for orders created on or after October 18, 2024. |
| smp_type | string | Self-Match Prevention (SMP) mode applied in the response. reduce cancel_maker cancel_taker |
| prevented_volume | string | Quantity cancelled due to Self-Match Prevention (SMP). Which prevents execution between orders from the same user. |
| prevented_locked | string | Assets released due to Self-Match Prevention (SMP). Remaining assets from an order canceled due to the Self-Match Prevention setting.  For buy orders: Cancelled amount For sell orders: Cancelled quantity |
| name | string | Name identifying the error. |
| message | string | Message describing the cause of the error. |
