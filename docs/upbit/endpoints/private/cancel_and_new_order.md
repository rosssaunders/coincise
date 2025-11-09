# GET /v1/orders/cancel_and_new

**Source:** [cancel-and-new-order](https://global-docs.upbit.com/reference/cancel-and-new-order)

## Description

Cancel existing order and create new order in a single request.

The mandatory parameters based on the new order type ("new_ord_type") are as follows..

## Authentication

Required (Private Endpoint)

## Rate Limit

Up to 8 calls per second are allowed.

This is measured on an IP basis and request counts are shared within the exchange.

## HTTP Request

`GET /v1/orders/cancel_and_new`

## Request Parameters

### Query Parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| prev_order_uuid | string | No | Unique identifier of the order to be cancelled. |
| prev_order_identifier | string | No | Client-specified identifier of the order to be cancelled. |
| new_ord_type | string | Yes | Type of the new order to be created. Enter one of the following values depending on the order type to be created.  limit: Limit buy/sell order price: Market buy order market: Market sell order best: Best limit buy/sell order (The time_in_force field is required.) |
| new_volume | string | No | New order quantity as a numeric string. If set to "remain_only", the remaining quantity of the previous order will be used. Required for:  Limit buy/sell (new_ord_type = "limit") Market sell (new_ord_type = "market") Best limit sell (previous order side = "ask" and new_ord_type = "best") |
| new_price | string | No | New order unit price or total amount. entered as a numeric string based on the currency for purchase. Required for:  Limit buy/sell (new_ord_type = "limit") Market buy (new_ord_type = "price") Best limit buy (previous order side = "bid" and new_ord_type = "best")  The price field is used for different purposes depending on the order type.  For limit orders, this field specifies the quote price. For market buy and best limit buy, this field specifies the total purchase amount. The order will execute for the volume that fills this amount at market or best price. |
| new_identifier | string | No | Client-specified identifier for the new order. Must be unique within all orders of the user's account. Once used, identifier values (including prev_order_identifier) cannot be reused. |
| new_time_in_force | string | No | Order execution policy. Order execution policy such as IOC (Immediate or Cancel), FOK (Fill or Kill), and Post Only can be specified. For market orders (when the ord_type field is set to "limit"), all options can be used optionally. For best bid/ask limit orders (when the ord_type field is set to "best"), either "ioc" or "fok" must be specified. The available values are as follows:  ioc: Execute immediately for available quantity at the limit price; cancel the rest. fok: Execute only if the full quantity can be filled at the limit price; otherwise cancel the order. post_only: Only add to the order book as maker; cancel if the order would execute as taker. |
| new_smp_type | string | No | Self-Match Prevention (SMP) mode for the new order. To prevent self-trading, where buy and sell orders created from the same account are executed during automated trading, the SMP mode can be set optionally. If the SMP mode set for the maker order differs from that of the taker order, the taker order’s mode will take precedence. The available values are as follows:  cancel_maker: Cancels the maker order. In other words, if the conditions for self-trading are met when placing a new order, the previously created order will be canceled to prevent execution. cancel_taker: Cancels the taker order. In other words, if the conditions for self-trading are met when placing a new order, the newly created order will be canceled to prevent execution. reduce: When self-matching conditions are met upon new order creation, the order quantities of the existing and new orders are reduced to prevent matching. If the remaining quantity reaches zero, the order is canceled. |

## Request Example

```bash
xxxxxxxxxx141curl --request POST \2  --url 'https://{region}-api.upbit.com/v1/orders/cancel_and_new' \3  --header 'Authorization: Bearer {JWT_TOKEN}' \4  --header 'Accept: application/json' \5  --header 'Content-Type: application/json' \6  --data '7{8"prev_order_uuid": "d098ceaf-6811-4df8-97f2-b7e01aefc03f",9"new_ord_type": "limit",10"new_price": "153559",11"new_volume": "1"12}13'14​
```

## Response Parameters

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| market | string | Trading pair code representing the market. |
| uuid | string | Unique identifier of the order to be canceled. |
| side | string | Side of order to be canceled: "ask" (sell), "bid" (buy). ask bid |
| ord_type | string | Order type to be canceled. limit price market best |
| price | string | Order unit price or total amount. For limit orders, this is the unit price. For market buy orders, this is the total purchase amount. |
| state | string | Order status to be canceled  wait: Waiting for execution watch: Scheduled order done: Execution completed cancel: Order cancelled  wait watch done cancel |
| created_at | string | Order creation time in UTC. |
| volume | string | Amount or quantity of the order to be canceled. |
| remaining_volume | string | Remaining volume of the order to be canceled. |
| executed_volume | string | Executed volume of the order to be canceled. |
| reserved_fee | string | Fee amount reserved for the order to be canceled. |
| remaining_fee | string | Remaining fee amount of the order to be canceled. |
| paid_fee | string | Used fee of the order to be canceled |
| locked | string | Cost in use for the trade of the order to be canceled. |
| prevented_volume | string | Quantity of the order to be canceled due to Self-Match Prevention. |
| prevented_locked | string | Assets released from the order to be canceled due to Self-Match Prevention. Remaining assets from an order canceled due to the Self-Match Prevention setting.  For buy orders: Cancelled amount For sell orders: Cancelled quantity |
| smp_type | string | Self-Match Prevention (SMP) mode applied in the response. reduce cancel_maker cancel_taker |
| trades_count | integer | Number of executions for the order to be canceled. |
| time_in_force | string | Order execution policy as applied in the response. fok ioc post_only |
| new_order_uuid | string | Unique identifier for the newly created order. |
| new_order_identifier | string | Client-specified identifier for the newly created order. |
| name | string | Name identifying the error. |
| message | string | Message describing the cause of the error. |
