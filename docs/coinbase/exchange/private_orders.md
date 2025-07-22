# Coinbase Exchange API Documentation

## Table of Contents

- [Cancel all orders - Coinbase](#cancel-all-orders-coinbase)
- [Cancel an order - Coinbase](#cancel-an-order-coinbase)
- [Create a new order - Coinbase](#create-a-new-order-coinbase)
- [Get all fills - Coinbase](#get-all-fills-coinbase)
- [Get all orders - Coinbase](#get-all-orders-coinbase)
- [Get single order - Coinbase](#get-single-order-coinbase)

---

# Cancel all orders - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-all-orders](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-all-orders)

## Endpoint

`DELETE /orders`

## Description

With best effort, cancel all open orders. This may require you to make the
request multiple times until all of the open orders are deleted.

## Permissions

This endpoint requires the “trade” permission.

## Examples

| Example                    | Response                                 |
| -------------------------- | ---------------------------------------- |
| /orders?product_id=FOO-BAR | (404) ProductNotFound                    |
| /orders?product_id=BtC-uSd | (200) Cancel all orders for BTC-USD      |
| /orders?Product_id=BTC-USD | (400) Return BadRequest Error            |
| /orders                    | (200) Cancel all orders for all products |

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter  | Type   | Description                               |
| ---------- | ------ | ----------------------------------------- |
| profile_id | string | Cancels orders on a specific profile      |
| product_id | string | Cancels orders on a specific product only |

## Response

### 200 Success

A list of the ids of open orders that were successfully cancelled

#### Example Response

```json
["<string>"]
```

---

# Cancel an order - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-an-order](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/cancel-an-order)

## Endpoint

`DELETE /orders/%7Border_id%7D`

## Description

Cancel a previously placed order

## Permissions

This endpoint requires the “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                                                                                                                                                         |
| --------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id  | string | Yes      | Orders may be canceled using either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace. |

## Query Parameters

| Parameter  | Type   | Description                          |
| ---------- | ------ | ------------------------------------ |
| profile_id | string | Cancels orders on a specific profile |
| product_id | string | Optional product id of order         |

## Response

### 200 Success

the id of the order that was cancelled`

---

# Create a new order - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/create-new-order](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/create-new-order)

## Endpoint

`POST /orders`

## Description

Each profile can place a maximum of 500 open orders on a product. Once reached,
the profile cannot place any new orders until the total number of open orders is
below 500.

## Permissions

This endpoint requires the “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Response

### 200 Success

The new order that was successfully created

#### Response Fields

| Field              | Type         | Required | Description                                                 |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| id                 | string       | Yes      | uuid                                                        |
| product_id         | string       | Yes      | book the order was placed on                                |
| side               | enum<string> | Yes      |                                                             |
| type               | enum<string> | Yes      |                                                             |
| post_only          | boolean      | Yes      | if true, forces order to be maker only                      |
| created_at         | string       | Yes      | timestamp at which order was placed                         |
| fill_fees          | string       | Yes      | fees paid on current filled amount                          |
| filled_size        | string       | Yes      | amount (in base currency) of the order that has been filled |
| status             | enum<string> | Yes      |                                                             |
| settled            | boolean      | Yes      | true if funds have been exchanged and settled               |
| price              | string       | No       | price per unit of base currency                             |
| size               | string       | No       | amount of base currency to buy/sell                         |
| profile_id         | string       | No       | profile_id that placed the order                            |
| funds              | string       | No       | amount of quote currency to spend (for market orders)       |
| specified_funds    | string       | No       | funds with fees                                             |
| time_in_force      | enum<string> | No       |                                                             |
| expire_time        | string       | No       | timestamp at which order expires                            |
| done_at            | string       | No       | timestamp at which order was done                           |
| done_reason        | string       | No       | reason order was done (filled, rejected, or otherwise)      |
| reject_reason      | string       | No       | reason order was rejected by engine                         |
| executed_value     | string       | No       |                                                             |
| stop               | enum<string> | No       |                                                             |
| stop_price         | string       | No       | price (in quote currency) at which to execute the order     |
| funding_amount     | string       | No       |                                                             |
| client_oid         | string       | No       | client order id                                             |
| market_type        | string       | No       | market type where order was traded                          |
| max_floor          | string       | No       | maximum visible quantity for iceberg order                  |
| secondary_order_id | string       | No       | order id for the visible order for iceberg order            |
| stop_limit_price   | string       | No       | stop limit price for TPSL order                             |

#### Example Response

```json
{
  "id": "a9625b04-fc66-4999-a876-543c3684d702",
  "price": "10.00000000",
  "size": "1.00000000",
  "product_id": "BTC-USD",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "side": "buy",
  "type": "limit",
  "time_in_force": "GTC",
  "post_only": true,
  "max_floor": "4",
  "created_at": "2020-03-11T20:48:46.622Z",
  "fill_fees": "0.0000000000000000",
  "filled_size": "0.00000000",
  "executed_value": "0.0000000000000000",
  "status": "open",
  "settled": false
}
```

---

# Get all fills - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-fills](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-fills)

## Endpoint

`GET /fills`

## Description

Get a list of recent fills of the API key’s profile.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter   | Type         | Description                                                                                                                                                  |
| ----------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| order_id    | string       | limit to fills on a specific order. Either order_id or product_id is required.                                                                               |
| product_id  | string       | limit to fills on a specific product. Either order_id or product_id is required.                                                                             |
| limit       | integer      | Limit on number of results to return.                                                                                                                        |
| before      | string       | Used for pagination. Sets start cursor to before id.                                                                                                         |
| after       | string       | Used for pagination. Sets end cursor to after id.                                                                                                            |
| market_type | enum<string> | Market type which the order was filled in.                                                                                                                   |
| start_date  | string       | Search by minimum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |
| end_date    | string       | Search by maximum posted date time and is inclusive of time provided. Valid formats are either RFC3339, date or date time and must be after Unix Epoch time. |

## Response

### 200 Success

id of trade that created the fill

#### Response Fields

| Field            | Type         | Required | Description                                    |
| ---------------- | ------------ | -------- | ---------------------------------------------- |
| trade_id         | integer      | Yes      | id of trade that created the fill              |
| product_id       | string       | Yes      | book the order was placed on                   |
| order_id         | string       | Yes      | uuid                                           |
| user_id          | string       | Yes      | id of user's account                           |
| profile_id       | string       | Yes      | profile_id that placed the order               |
| liquidity        | enum<string> | Yes      |                                                |
| price            | string       | Yes      | price per unit of base currency                |
| size             | string       | Yes      | amount of base currency to buy/sell            |
| fee              | string       | Yes      | fees paid on current filled amount             |
| created_at       | string       | Yes      | timestamp of fill                              |
| side             | enum<string> | Yes      |                                                |
| settled          | boolean      | Yes      | true if funds have been exchanged and settled  |
| usd_volume       | string       | Yes      | true if funds have been exchanged and settled  |
| funding_currency | string       | Yes      | funding currency which the order was filled in |
| market_type      | string       | No       | market type which the order was filled in      |

#### Example Response

```json
[
  {
    "created_at": "2019-11-21T01:38:23.878Z",
    "trade_id": 78098253,
    "product_id": "BTC-USD",
    "order_id": "41473628-db2c-464e-b9f4-82df7e4fb4f4",
    "user_id": "5cf6e115aaf44503db300f1e",
    "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
    "liquidity": "T",
    "price": "8087.38000000",
    "size": "0.00601800",
    "fee": "0.2433492642000000",
    "side": "sell",
    "settled": true,
    "usd_volume": "48.6698528400000000",
    "funding_currency": "USDC"
  }
]
```

---

# Get all orders - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-orders](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-all-orders)

## Endpoint

`GET /orders`

## Description

Orders with a “pending” status have fewer fields in the response.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Query Parameters

| Parameter   | Type           | Description                                            |
| ----------- | -------------- | ------------------------------------------------------ |
| profile_id  | string         | Filter results by a specific profile_id                |
| product_id  | string         | Filter results by a specific product_id                |
| sortedBy    | enum<string>   | Sort criteria for results.                             |
| sorting     | enum<string>   | Ascending or descending order, by sortedBy             |
| start_date  | string         | Filter results by minimum posted date                  |
| end_date    | string         | Filter results by maximum posted date                  |
| before      | string         | Used for pagination. Sets start cursor to before date. |
| after       | string         | Used for pagination. Sets end cursor to after date.    |
| limit       | integer        | Limit on number of results to return.                  |
| status      | enum<string>[] | Array with order statuses to filter by.                |
| market_type | string         | Market type which the order was traded in.             |

## Response

### 200 Success

uuid

#### Response Fields

| Field              | Type         | Required | Description                                                 |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| id                 | string       | Yes      | uuid                                                        |
| product_id         | string       | Yes      | book the order was placed on                                |
| side               | enum<string> | Yes      |                                                             |
| type               | enum<string> | Yes      |                                                             |
| post_only          | boolean      | Yes      | if true, forces order to be maker only                      |
| created_at         | string       | Yes      | timestamp at which order was placed                         |
| fill_fees          | string       | Yes      | fees paid on current filled amount                          |
| filled_size        | string       | Yes      | amount (in base currency) of the order that has been filled |
| status             | enum<string> | Yes      |                                                             |
| settled            | boolean      | Yes      | true if funds have been exchanged and settled               |
| price              | string       | No       | price per unit of base currency                             |
| size               | string       | No       | amount of base currency to buy/sell                         |
| profile_id         | string       | No       | profile_id that placed the order                            |
| funds              | string       | No       | amount of quote currency to spend (for market orders)       |
| specified_funds    | string       | No       | funds with fees                                             |
| time_in_force      | enum<string> | No       |                                                             |
| expire_time        | string       | No       | timestamp at which order expires                            |
| done_at            | string       | No       | timestamp at which order was done                           |
| done_reason        | string       | No       | reason order was done (filled, rejected, or otherwise)      |
| reject_reason      | string       | No       | reason order was rejected by engine                         |
| executed_value     | string       | No       |                                                             |
| stop               | enum<string> | No       |                                                             |
| stop_price         | string       | No       | price (in quote currency) at which to execute the order     |
| funding_amount     | string       | No       |                                                             |
| client_oid         | string       | No       | client order id                                             |
| market_type        | string       | No       | market type where order was traded                          |
| max_floor          | string       | No       | maximum visible quantity for iceberg order                  |
| secondary_order_id | string       | No       | order id for the visible order for iceberg order            |
| stop_limit_price   | string       | No       | stop limit price for TPSL order                             |

#### Example Response

```json
[
  {
    "id": "a9625b04-fc66-4999-a876-543c3684d702",
    "price": "10.00000000",
    "size": "1.00000000",
    "product_id": "BTC-USD",
    "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
    "side": "buy",
    "type": "limit",
    "time_in_force": "GTC",
    "post_only": true,
    "max_floor": "4",
    "created_at": "2020-03-11T20:48:46.622Z",
    "fill_fees": "0.0000000000000000",
    "filled_size": "0.00000000",
    "executed_value": "0.0000000000000000",
    "status": "open",
    "settled": false
  }
]
```

---

# Get single order - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-single-order](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/orders/get-single-order)

## Endpoint

`GET /orders/%7Border_id%7D`

## Description

Orders can be queried using either the exchange assigned id or the client
assigned client_oid. When using client_oid it must be preceded by the client:
namespace.

## Permissions

This endpoint requires either the “view” or “trade” permission.

## Authorization

| Header               | Type   | Required |
| -------------------- | ------ | -------- |
| cb-access-key        | string | Yes      |
| cb-access-passphrase | string | Yes      |
| cb-access-sign       | string | Yes      |
| cb-access-timestamp  | string | Yes      |

## Path Parameters

| Parameter | Type   | Required | Description                                                                                                                                        |
| --------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| order_id  | string | Yes      | order_id is either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace. |

## Query Parameters

| Parameter   | Type   | Description                                |
| ----------- | ------ | ------------------------------------------ |
| market_type | string | Market type which the order was traded in. |

## Response

### 200 Success

uuid

#### Response Fields

| Field              | Type         | Required | Description                                                 |
| ------------------ | ------------ | -------- | ----------------------------------------------------------- |
| id                 | string       | Yes      | uuid                                                        |
| product_id         | string       | Yes      | book the order was placed on                                |
| side               | enum<string> | Yes      |                                                             |
| type               | enum<string> | Yes      |                                                             |
| post_only          | boolean      | Yes      | if true, forces order to be maker only                      |
| created_at         | string       | Yes      | timestamp at which order was placed                         |
| fill_fees          | string       | Yes      | fees paid on current filled amount                          |
| filled_size        | string       | Yes      | amount (in base currency) of the order that has been filled |
| status             | enum<string> | Yes      |                                                             |
| settled            | boolean      | Yes      | true if funds have been exchanged and settled               |
| price              | string       | No       | price per unit of base currency                             |
| size               | string       | No       | amount of base currency to buy/sell                         |
| profile_id         | string       | No       | profile_id that placed the order                            |
| funds              | string       | No       | amount of quote currency to spend (for market orders)       |
| specified_funds    | string       | No       | funds with fees                                             |
| time_in_force      | enum<string> | No       |                                                             |
| expire_time        | string       | No       | timestamp at which order expires                            |
| done_at            | string       | No       | timestamp at which order was done                           |
| done_reason        | string       | No       | reason order was done (filled, rejected, or otherwise)      |
| reject_reason      | string       | No       | reason order was rejected by engine                         |
| executed_value     | string       | No       |                                                             |
| stop               | enum<string> | No       |                                                             |
| stop_price         | string       | No       | price (in quote currency) at which to execute the order     |
| funding_amount     | string       | No       |                                                             |
| client_oid         | string       | No       | client order id                                             |
| market_type        | string       | No       | market type where order was traded                          |
| max_floor          | string       | No       | maximum visible quantity for iceberg order                  |
| secondary_order_id | string       | No       | order id for the visible order for iceberg order            |
| stop_limit_price   | string       | No       | stop limit price for TPSL order                             |

#### Example Response

```json
{
  "id": "a9625b04-fc66-4999-a876-543c3684d702",
  "price": "10.00000000",
  "size": "1.00000000",
  "product_id": "BTC-USD",
  "profile_id": "8058d771-2d88-4f0f-ab6e-299c153d4308",
  "side": "buy",
  "type": "limit",
  "time_in_force": "GTC",
  "post_only": true,
  "max_floor": "4",
  "created_at": "2020-03-11T20:48:46.622Z",
  "fill_fees": "0.0000000000000000",
  "filled_size": "0.00000000",
  "executed_value": "0.0000000000000000",
  "status": "open",
  "settled": false
}
```

---
