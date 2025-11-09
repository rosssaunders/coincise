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
xxxxxxxxxx141curl --request POST   --url 'https://{region}-api.upbit.com/v1/orders/cancel_and_new'   --header 'Authorization: Bearer {JWT_TOKEN}'   --header 'Accept: application/json'   --header 'Content-Type: application/json'   --data '7{8"prev_order_uuid": "d098ceaf-6811-4df8-97f2-b7e01aefc03f",9"new_ord_type": "limit",10"new_price": "153559",11"new_volume": "1"12}13'14​
```

## Response Example

### Success Response (200 OK)

```json
{2  "uuid": "d098ceaf-6811-4df8-97f2-b7e01aefc03f", "side": "bid", "ord_type": "limit", "price": "153559.00", "state": "wait", "market": "SGD-BTC", "created_at": "2025-07-04T15:00:00", "volume": "1.0", "remaining_volume": "1.0", "executed_volume": "0", "reserved_fee": "383.8975", "remaining_fee": "383.8975", "paid_fee": "0", "locked": "153942.8975", "prevented_volume": "0", "prevented_locked": "0", "trades_count": 0, "new_order_uuid": "4b07aa31-4747-485c-8bce-ac5495e4a639"20}
```
