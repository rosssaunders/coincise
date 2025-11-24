# POST /flash_swap/orders/preview

**Source:** [/flash_swap/orders/preview](https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#flash-swap-order-preview) Flash swap order preview

`POST /flash_swap/orders/preview`

_Flash swap order preview_

> Body parameter

```json
{
  "sell_currency": "BTC",
  "sell_amount": "0.1",
  "buy_currency": "USDT"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-parameters](https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-parameters)

| Name            | In   | Type   | Required | Description                                                                                                                                                    |
| --------------- | ---- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body            | body | object | true     | none                                                                                                                                                           |
| » sell_currency | body | string | true     | The name of the asset being sold, as obtained from the "GET /flash_swap/currency_pairs" API, which retrieves a list of supported flash swap currency pairs     |
| » sell_amount   | body | string | false    | Amount to sell.                                                                                                                                                |
| » buy_currency  | body | string | true     | The name of the asset being purchased, as obtained from the "GET /flash_swap/currency_pairs" API, which provides a list of supported flash swap currency pairs |
| » buy_amount    | body | string | false    | Amount to buy.                                                                                                                                                 |

#### [#](#detailed-descriptions-22) Detailed descriptions

**» sell_amount**: Amount to sell. It is required to choose one parameter
between `sell_amount` and `buy_amount`

**» buy_amount**: Amount to buy. It is required to choose one parameter between
`sell_amount` and `buy_amount`

> Example responses

> 200 Response

```json
{
  "preview_id": "3453434",
  "sell_currency": "BTC",
  "sell_amount": "0.1",
  "buy_currency": "USDT",
  "buy_amount": "10",
  "price": "100"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-responses](https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-responses)

| Status | Meaning                                                                    | Description                         | Schema |
| ------ | -------------------------------------------------------------------------- | ----------------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Flash swap order preview successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#previewflashswaporder-responseschema)

Status Code **200**

_Flash swap order preview_

| Name                                                                                                             | Type   | Description                  |
| ---------------------------------------------------------------------------------------------------------------- | ------ | ---------------------------- |
| » preview_id                                                                                                     | string | Preview result ID            |
| » sell_currency                                                                                                  | string | Name of the sold asset,      |
| Refer to the interface Query the list of currencies supported for flash swap GET /flash_swap/currenciesto obtain |
| » sell_amount                                                                                                    | string | Amount to sell               |
| » buy_currency                                                                                                   | string | Name of the purchased asset, |
| Refer to the interface Query the list of currencies supported for flash swap GET /flash_swap/currenciesto obtain |
| » buy_amount                                                                                                     | string | Amount to buy                |
| » price                                                                                                          | string | Price                        |

WARNING

To perform this operation, you must be authenticated by API key and secret
