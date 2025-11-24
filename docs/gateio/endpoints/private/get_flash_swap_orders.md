# GET /flash_swap/orders

**Source:**
[/flash_swap/orders](https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-flash-swap-order-list) Query flash swap order list

`GET /flash_swap/orders`

_Query flash swap order list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-parameters)

| Name          | In    | Type           | Required | Description                                                 |
| ------------- | ----- | -------------- | -------- | ----------------------------------------------------------- |
| status        | query | integer        | false    | Flash swap order status                                     |
| sell_currency | query | string         | false    | Asset name to sell                                          |
| buy_currency  | query | string         | false    | Asset name to buy                                           |
| reverse       | query | boolean        | false    | Sort by ID in ascending or descending order, default `true` |
| limit         | query | integer        | false    | Maximum number of records returned in a single list         |
| page          | query | integer(int32) | false    | Page number                                                 |

#### [#](#detailed-descriptions-21) Detailed descriptions

**status**: Flash swap order status

`1` - success `2` - failed

**sell_currency**: Asset name to sell

- Retrieved from API `GET /flash_swap/currencies` for supported flash swap
  currencies

**buy_currency**: Asset name to buy

- Retrieved from API `GET /flash_swap/currencies` for supported flash swap
  currencies

**reverse**: Sort by ID in ascending or descending order, default `true`

- `true`: ID descending order (most recent data first)
- `false`: ID ascending order (oldest data first)

> Example responses

> 200 Response

```json
[
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-responses](https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listflashswaporders-responseschema)

Status Code **200**

| Name             | Type           | Description                              |
| ---------------- | -------------- | ---------------------------------------- |
| _None_           | array          | \[Flash swap order\]                     |
| » _None_         | object         | Flash swap order                         |
| »» id            | integer(int64) | Flash swap order ID                      |
| »» create_time   | integer(int64) | Creation time of order (in milliseconds) |
| »» user_id       | integer(int64) | User ID                                  |
| »» sell_currency | string         | Currency to sell                         |
| »» sell_amount   | string         | Amount to sell                           |
| »» buy_currency  | string         | Currency to buy                          |
| »» buy_amount    | string         | Amount to buy                            |
| »» price         | string         | Price                                    |
| »» status        | integer        | Flash swap order status                  |

`1` - success  
`2` - failure |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-single-flash-swap-order) Query single flash swap order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-flash-swap-order](https://www.gate.io/docs/developers/apiv4/en/#query-single-flash-swap-order)

> Code samples
