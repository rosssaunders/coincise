# GET /spot/currency_pairs

**Source:**
[/spot/currency_pairs](https://www.gate.io/docs/developers/apiv4/en/#listcurrencypairs-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-all-supported-currency-pairs) Query all supported currency pairs

`GET /spot/currency_pairs`

_Query all supported currency pairs_

> Example responses

> 200 Response

```json
[
  {
    "id": "ETH_USDT",
    "base": "ETH",
    "base_name": "Ethereum",
    "quote": "USDT",
    "quote_name": "Tether",
    "fee": "0.2",
    "min_base_amount": "0.001",
    "min_quote_amount": "1.0",
    "max_base_amount": "10000",
    "max_quote_amount": "10000000",
    "amount_precision": 3,
    "precision": 6,
    "trade_status": "tradable",
    "sell_start": 1516378650,
    "buy_start": 1516378650,
    "delisting_time": 0,
    "trade_url": "https://www.gate.io/trade/ETH_USDT",
    "st_tag": false
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencypairs-responses](https://www.gate.io/docs/developers/apiv4/en/#listcurrencypairs-responses)

| Status | Meaning                                                                    | Description                  | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | All currency pairs retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencypairs-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcurrencypairs-responseschema)

Status Code **200**

| Name                | Type    | Description                                                      |
| ------------------- | ------- | ---------------------------------------------------------------- |
| _None_              | array   | \[Spot currency pair\]                                           |
| » _None_            | object  | Spot currency pair                                               |
| »» id               | string  | Trading pair                                                     |
| »» base             | string  | Base currency                                                    |
| »» base_name        | string  | Base currency name                                               |
| »» quote            | string  | Quote currency                                                   |
| »» quote_name       | string  | Quote currency name                                              |
| »» fee              | string  | Trading fee rate                                                 |
| »» min_base_amount  | string  | Minimum amount of base currency to trade, `null` means no limit  |
| »» min_quote_amount | string  | Minimum amount of quote currency to trade, `null` means no limit |
| »» max_base_amount  | string  | Maximum amount of base currency to trade, `null` means no limit  |
| »» max_quote_amount | string  | Maximum amount of quote currency to trade, `null` means no limit |
| »» amount_precision | integer | Amount scale                                                     |
| »» precision        | integer | Price scale                                                      |
| »» trade_status     | string  | Trading status                                                   |

\- untradable: cannot be traded  
\- buyable: can be bought  
\- sellable: can be sold  
\- tradable: can be bought and sold | | »» sell_start | integer(int64) | Sell
start unix timestamp in seconds | | »» buy_start | integer(int64) | Buy start
unix timestamp in seconds | | »» delisting_time | integer(int64) | Expected time
to remove the shelves, Unix timestamp in seconds | | »» type | string | Trading
pair type, normal: normal, premarket: pre-market | | »» trade_url | string |
Transaction link | | »» st_tag | boolean | Whether the trading pair is in ST
risk assessment, false - No, true - Yes |

#### [#](#enumerated-values-10) Enumerated Values

| Property     | Value      |
| ------------ | ---------- |
| trade_status | untradable |
| trade_status | buyable    |
| trade_status | sellable   |
| trade_status | tradable   |

This operation does not require authentication

## [#](#query-single-currency-pair-details) Query single currency pair details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-currency-pair-details](https://www.gate.io/docs/developers/apiv4/en/#query-single-currency-pair-details)

> Code samples
