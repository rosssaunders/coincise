# GET /flash_swap/orders/{order_id}

**Source:**
[/flash_swap/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-flash-swap-order) Query single flash swap order

`GET /flash_swap/orders/{order_id}`

_Query single flash swap order_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-parameters](https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-parameters)

| Name     | In   | Type    | Required | Description         |
| -------- | ---- | ------- | -------- | ------------------- |
| order_id | path | integer | true     | Flash swap order ID |

> Example responses

> 200 Response

```json
{
  "id": 54646,
  "create_time": 1651116876378,
  "update_time": 1651116876378,
  "user_id": 11135567,
  "sell_currency": "BTC",
  "sell_amount": "0.01",
  "buy_currency": "USDT",
  "buy_amount": "10",
  "price": "100",
  "status": 1
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-responses](https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getflashswaporder-responseschema)

Status Code **200**

_Flash swap order_

| Name            | Type           | Description                              |
| --------------- | -------------- | ---------------------------------------- |
| » id            | integer(int64) | Flash swap order ID                      |
| » create_time   | integer(int64) | Creation time of order (in milliseconds) |
| » user_id       | integer(int64) | User ID                                  |
| » sell_currency | string         | Currency to sell                         |
| » sell_amount   | string         | Amount to sell                           |
| » buy_currency  | string         | Currency to buy                          |
| » buy_amount    | string         | Amount to buy                            |
| » price         | string         | Price                                    |
| » status        | integer        | Flash swap order status                  |

`1` - success  
`2` - failure |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#flash-swap-order-preview) Flash swap order preview

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#flash-swap-order-preview](https://www.gate.io/docs/developers/apiv4/en/#flash-swap-order-preview)

> Code samples
