# GET /flash_swap/currency_pairs

**Source:**
[/flash_swap/currency_pairs](https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#list-all-supported-currency-pairs-in-flash-swap) List All Supported Currency Pairs In Flash Swap

`GET /flash_swap/currency_pairs`

_List All Supported Currency Pairs In Flash Swap_

`BTC_GT` represents selling BTC and buying GT. The limits for each currency may
vary across different currency pairs.

It is not necessary that two currencies that can be swapped instantaneously can
be exchanged with each other. For example, it is possible to sell BTC and buy
GT, but it does not necessarily mean that GT can be sold to buy BTC.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-parameters](https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-parameters)

| Name     | In    | Type           | Required | Description                                                                |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------- |
| currency | query | string         | false    | Query by specified currency name                                           |
| page     | query | integer(int32) | false    | Page number                                                                |
| limit    | query | integer(int32) | false    | Maximum number of items returned. Default: 1000, minimum: 1, maximum: 1000 |

> Example responses

> 200 Response

```
[
  {
    "currency_pair": "BTC_USDT",
    "sell_currency": "BTC",
    "buy_currency": "USDT",
    "sell_min_amount": "0.00001",
    "sell_max_amount": "100",
    "buy_min_amount": "10",
    "buy_max_amount": "10000000"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-responses](https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listflashswapcurrencypair-responseschema)

Status Code **200**

| Name               | Type   | Description                                                          |
| ------------------ | ------ | -------------------------------------------------------------------- |
| » _None_           | object | List all supported currencies in flash swap                          |
| »» currency_pair   | string | Currency pair, `BTC_USDT` represents selling `BTC` and buying `USDT` |
| »» sell_currency   | string | Currency to sell                                                     |
| »» buy_currency    | string | Currency to buy                                                      |
| »» sell_min_amount | string | Minimum sell quantity                                                |
| »» sell_max_amount | string | Maximum sell quantity                                                |
| »» buy_min_amount  | string | Minimum buy quantity                                                 |
| »» buy_max_amount  | string | Maximum buy quantity                                                 |

This operation does not require authentication

## [#](#create-a-flash-swap-order) Create a flash swap order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-a-flash-swap-order](https://www.gate.io/docs/developers/apiv4/en/#create-a-flash-swap-order)

> Code samples
