# POST /flash_swap/orders

**Source:**
[/flash_swap/orders](https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-a-flash-swap-order) Create a flash swap order

`POST /flash_swap/orders`

_Create a flash swap order_

Initiate a flash swap preview in advance because order creation requires a
preview result

> Body parameter

```
{
  "preview_id": "4564564",
  "sell_currency": "BTC",
  "sell_amount": "0.1",
  "buy_currency": "USDT",
  "buy_amount": "10"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-parameters)

| Name            | In   | Type   | Required | Description                                                                                                                                           |
| --------------- | ---- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| body            | body | object | true     | none                                                                                                                                                  |
| » preview_id    | body | string | true     | Preview result ID                                                                                                                                     |
| » sell_currency | body | string | true     | Name of the asset to be sold, obtained from the interface GET /flash_swap/currency_pairs: Query the list of all trading pairs supporting flash swap   |
| » sell_amount   | body | string | true     | Amount to sell (based on the preview result)                                                                                                          |
| » buy_currency  | body | string | true     | Name of the asset to be bought, obtained from the interface GET /flash_swap/currency_pairs: Query the list of all trading pairs supporting flash swap |
| » buy_amount    | body | string | true     | Amount to buy (based on the preview result)                                                                                                           |

> Example responses

> 201 Response

```
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
[https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-responses](https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-responses)

| Status | Meaning                                                                         | Description                           | Schema |
| ------ | ------------------------------------------------------------------------------- | ------------------------------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Flash swap order created successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createflashswaporder-responseschema)

Status Code **201**

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

## [#](#query-flash-swap-order-list) Query flash swap order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-flash-swap-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-flash-swap-order-list)

> Code samples
