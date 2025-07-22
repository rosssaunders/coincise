# Coinbase Exchange API Documentation

## Table of Contents

- [Get all known trading pairs - Coinbase](#get-all-known-trading-pairs-coinbase)
- [Get all product volume - Coinbase](#get-all-product-volume-coinbase)
- [Get product book - Coinbase](#get-product-book-coinbase)
- [Get product candles - Coinbase](#get-product-candles-coinbase)
- [Get product stats - Coinbase](#get-product-stats-coinbase)
- [Get product ticker - Coinbase](#get-product-ticker-coinbase)
- [Get product trades - Coinbase](#get-product-trades-coinbase)
- [Get single product - Coinbase](#get-single-product-coinbase)

---

# Get all known trading pairs - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-known-trading-pairs](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-known-trading-pairs)

## Endpoint

`GET /products`

## Description

Order Size Limits Removed

## Query Parameters

| Parameter | Type   | Description |
| --------- | ------ | ----------- |
| type      | string |             |

## Response

### 200 Success

Min order price (a.k.a. price increment

#### Response Fields

| Field                     | Type         | Required | Description                                                                               |
| ------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------- |
| id                        | string       | Yes      |                                                                                           |
| base_currency             | string       | Yes      |                                                                                           |
| quote_currency            | string       | Yes      |                                                                                           |
| quote_increment           | string       | Yes      | Min order price (a.k.a. price increment                                                   |
| base_increment            | string       | Yes      |                                                                                           |
| display_name              | string       | Yes      |                                                                                           |
| min_market_funds          | string       | Yes      |                                                                                           |
| margin_enabled            | boolean      | Yes      |                                                                                           |
| post_only                 | boolean      | Yes      |                                                                                           |
| limit_only                | boolean      | Yes      |                                                                                           |
| cancel_only               | boolean      | Yes      |                                                                                           |
| status                    | enum<string> | Yes      |                                                                                           |
| status_message            | string       | Yes      |                                                                                           |
| auction_mode              | boolean      | Yes      |                                                                                           |
| trading_disabled          | boolean      | No       |                                                                                           |
| fx_stablecoin             | boolean      | No       |                                                                                           |
| max_slippage_percentage   | string       | No       |                                                                                           |
| high_bid_limit_percentage | string       | No       | Percentage to calculate highest price for limit buy order (Stable coin trading pair only) |

#### Example Response

```json
[
  {
    "id": "BTC-USD",
    "base_currency": "BTC",
    "quote_currency": "USD",
    "quote_increment": "0.01000000",
    "base_increment": "0.00000001",
    "display_name": "BTC/USD",
    "min_market_funds": "10",
    "margin_enabled": false,
    "post_only": false,
    "limit_only": false,
    "cancel_only": false,
    "status": "online",
    "status_message": "",
    "auction_mode": true
  }
]
```

---

# Get all product volume - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-product-volume](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-all-product-volume)

## Endpoint

`GET /products/volume-summary`

## Description

Gets 30day and 24hour volume for all products and market types

## Response

### 200 Success

#### Response Fields

| Field                    | Type     | Required | Description |
| ------------------------ | -------- | -------- | ----------- |
| id                       | string   | Yes      |             |
| base_currency            | string   | Yes      |             |
| quote_currency           | string   | Yes      |             |
| display_name             | string   | Yes      |             |
| market_types             | object[] | Yes      |             |
| spot_volume_24hour       | string   | Yes      |             |
| spot_volume_30day        | string   | Yes      |             |
| rfq_volume_24hour        | string   | Yes      |             |
| rfq_volume_30day         | string   | Yes      |             |
| conversion_volume_24hour | string   | Yes      |             |
| conversion_volume_30day  | string   | Yes      |             |

#### Example Response

```json
[
  [
    {
      "id": "GALA-XYO",
      "base_currency": "GALA",
      "quote_currency": "XYO",
      "display_name": "GALA-XYO",
      "market_types": ["rfq"],
      "spot_volume_24hour": "",
      "spot_volume_30day": "",
      "rfq_volume_24hour": "1232.2342",
      "rfq_volume_30day": "2453232.2342",
      "conversion_volume_24hour": "0",
      "conversion_volume_30day": "0"
    }
  ]
]
```

---

# Get product book - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-book](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-book)

## Endpoint

`GET /products/%7Bproduct_id%7D/book`

## Description

By default, only the inside (i.e., the best) bid and ask are returned. This is
equivalent to a book depth of 1 level. To see a larger order book, specify the
level query parameter.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Query Parameters

| Parameter | Type    | Description |
| --------- | ------- | ----------- |
| level     | integer |             |

## Response

### 200 Success

#### Response Fields

| Field        | Type     | Required | Description |
| ------------ | -------- | -------- | ----------- |
| bids         | object[] | Yes      |             |
| asks         | object[] | Yes      |             |
| sequence     | number   | Yes      |             |
| time         | string   | Yes      |             |
| auction_mode | boolean  | No       |             |
| auction      | object   | No       |             |

#### Example Response

```json
{
  "indicative_open_price": "333.99",
  "indicative_open_size": "0.193",
  "indicative_bid_price": "333.98",
  "indicative_bid_size": "4.39088265",
  "indicative_ask_price": "333.99",
  "indicative_ask_size": "25.23542881",
  "auction_status": "CAN_OPEN"
}
```

---

# Get product candles - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-candles](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-candles)

## Endpoint

`GET /products/%7Bproduct_id%7D/candles`

## Description

If the start or end fields are not provided, both fields are ignored. If a
custom time range is not declared, then one ending now is selected.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Query Parameters

| Parameter   | Type   | Description                                  |
| ----------- | ------ | -------------------------------------------- |
| granularity | string |                                              |
| start       | string | Timestamp for starting range of aggregations |
| end         | string | Timestamp for ending range of aggregations   |

## Response

### 200 Success

The response is of type object[].

#### Example Response

```json
[{}]
```

---

# Get product stats - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-stats](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-stats)

## Endpoint

`GET /products/%7Bproduct_id%7D/stats`

## Description

Thevolume property is in base currency units. Properties open, high, low are in
quote currency units.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field                     | Type   | Required | Description |
| ------------------------- | ------ | -------- | ----------- |
| open                      | string | Yes      |             |
| high                      | string | Yes      |             |
| low                       | string | Yes      |             |
| last                      | string | Yes      |             |
| volume                    | string | Yes      |             |
| volume_30day              | string | No       |             |
| rfq_volume_24hour         | string | No       |             |
| rfq_volume_30day          | string | No       |             |
| conversions_volume_24hour | string | No       |             |
| conversions_volume_30day  | string | No       |             |

#### Example Response

```json
{
  "open": "5414.18000000",
  "high": "6441.37000000",
  "low": "5261.69000000",
  "volume": "53687.76764233",
  "last": "6250.02000000",
  "volume_30day": "786763.72930864",
  "rfq_volume_24hour": "78.23",
  "conversions_volume_24hour": "0.000000",
  "rfq_volume_30day": "0.000000",
  "conversions_volume_30day": "0.000000"
}
```

---

# Get product ticker - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-ticker](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-ticker)

## Endpoint

`GET /products/%7Bproduct_id%7D/ticker`

## Description

Coinbase recommends that you get real-time updates by connecting with the
WebSocket stream and listening for match messages, rather than polling.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Response

### 200 Success

#### Response Fields

| Field              | Type    | Required | Description |
| ------------------ | ------- | -------- | ----------- |
| ask                | string  | Yes      |             |
| bid                | string  | Yes      |             |
| volume             | string  | Yes      |             |
| trade_id           | integer | Yes      |             |
| price              | string  | Yes      |             |
| size               | string  | Yes      |             |
| time               | string  | Yes      |             |
| rfq_volume         | string  | No       |             |
| conversions_volume | string  | No       |             |

#### Example Response

```json
{
  "trade_id": 86326522,
  "price": "6268.48",
  "size": "0.00698254",
  "time": "2020-03-20T00:22:57.833Z",
  "bid": "6265.15",
  "ask": "6267.71",
  "volume": "53602.03940154",
  "rfq_volume": "123.122",
  "conversions_volume": "0.00"
}
```

---

# Get product trades - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-trades](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-product-trades)

## Endpoint

`GET /products/%7Bproduct_id%7D/trades`

## Description

The side of a trade indicates the maker order side. The maker order is the order
that was open on the order book.

## Path Parameters

| Parameter  | Type   | Required | Description                       |
| ---------- | ------ | -------- | --------------------------------- |
| product_id | string | Yes      | list trades for specific product. |

## Query Parameters

| Parameter | Type    | Description                                          |
| --------- | ------- | ---------------------------------------------------- |
| limit     | integer | Limit on number of results to return.                |
| before    | string  | Used for pagination. Sets start cursor to before id. |
| after     | string  | Used for pagination. Sets end cursor to after id.    |

## Response

### 200 Success

#### Response Fields

| Field    | Type         | Required | Description |
| -------- | ------------ | -------- | ----------- |
| trade_id | integer      | Yes      |             |
| side     | enum<string> | Yes      |             |
| size     | string       | Yes      |             |
| price    | string       | Yes      |             |
| time     | string       | Yes      |             |

#### Example Response

```json
[
  {
    "time": "2020-03-20T00:36:59.860Z",
    "trade_id": 86327327,
    "price": "6225.32000000",
    "size": "0.06469797",
    "side": "sell"
  }
]
```

---

# Get single product - Coinbase

**Source:**
[https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-single-product](https://docs.cdp.coinbase.com/api-reference/exchange-api/rest-api/products/get-single-product)

## Endpoint

`GET /products/%7Bproduct_id%7D`

## Description

Get information on a single product.

## Path Parameters

| Parameter  | Type   | Required | Description |
| ---------- | ------ | -------- | ----------- |
| product_id | string | Yes      |             |

## Response

### 200 Success

Min order price (a.k.a. price increment

#### Response Fields

| Field                     | Type         | Required | Description                                                                               |
| ------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------------- |
| id                        | string       | Yes      |                                                                                           |
| base_currency             | string       | Yes      |                                                                                           |
| quote_currency            | string       | Yes      |                                                                                           |
| quote_increment           | string       | Yes      | Min order price (a.k.a. price increment                                                   |
| base_increment            | string       | Yes      |                                                                                           |
| display_name              | string       | Yes      |                                                                                           |
| min_market_funds          | string       | Yes      |                                                                                           |
| margin_enabled            | boolean      | Yes      |                                                                                           |
| post_only                 | boolean      | Yes      |                                                                                           |
| limit_only                | boolean      | Yes      |                                                                                           |
| cancel_only               | boolean      | Yes      |                                                                                           |
| status                    | enum<string> | Yes      |                                                                                           |
| status_message            | string       | Yes      |                                                                                           |
| auction_mode              | boolean      | Yes      |                                                                                           |
| trading_disabled          | boolean      | No       |                                                                                           |
| fx_stablecoin             | boolean      | No       |                                                                                           |
| max_slippage_percentage   | string       | No       |                                                                                           |
| high_bid_limit_percentage | string       | No       | Percentage to calculate highest price for limit buy order (Stable coin trading pair only) |

#### Example Response

```json
{
  "id": "BTC-USD",
  "base_currency": "BTC",
  "quote_currency": "USD",
  "quote_increment": "0.01000000",
  "base_increment": "0.00000001",
  "display_name": "BTC/USD",
  "min_market_funds": "10",
  "margin_enabled": false,
  "post_only": false,
  "limit_only": false,
  "cancel_only": false,
  "status": "online",
  "status_message": "",
  "auction_mode": true
}
```

---
