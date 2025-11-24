# GET /unified/currency_discount_tiers

**Source:**
[/unified/currency_discount_tiers](https://www.gate.io/docs/developers/apiv4/en/#listcurrencydiscounttiers-responses)

## Authentication

Not Required (Public Endpoint)

## [#](#query-unified-account-tiered) Query unified account tiered

`GET /unified/currency_discount_tiers`

_Query unified account tiered_

> Example responses

> 200 Response

```json
[
  [
    {
      "currency": "USDT",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "1",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    },
    {
      "currency": "USDC",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "1",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "10000000"
        },
        {
          "tier": "2",
          "discount": "0.98",
          "lower_limit": "10000000",
          "leverage": "10",
          "upper_limit": "15000000"
        },
        {
          "tier": "3",
          "discount": "0.95",
          "lower_limit": "15000000",
          "leverage": "10",
          "upper_limit": "20000000"
        },
        {
          "tier": "4",
          "discount": "0.925",
          "lower_limit": "20000000",
          "leverage": "10",
          "upper_limit": "50000000"
        },
        {
          "tier": "5",
          "discount": "0.9",
          "lower_limit": "50000000",
          "leverage": "10",
          "upper_limit": "100000000"
        },
        {
          "tier": "6",
          "discount": "0",
          "lower_limit": "100000000",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    },
    {
      "currency": "BTC",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "0.98",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "1000"
        },
        {
          "tier": "2",
          "discount": "0.95",
          "lower_limit": "1000",
          "leverage": "10",
          "upper_limit": "10000"
        },
        {
          "tier": "3",
          "discount": "0.9",
          "lower_limit": "10000",
          "leverage": "10",
          "upper_limit": "50000"
        },
        {
          "tier": "4",
          "discount": "0.85",
          "lower_limit": "50000",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    },
    {
      "currency": "ETH",
      "discount_tiers": [
        {
          "tier": "1",
          "discount": "0.98",
          "lower_limit": "0",
          "leverage": "10",
          "upper_limit": "1000"
        },
        {
          "tier": "2",
          "discount": "0.95",
          "lower_limit": "1000",
          "leverage": "10",
          "upper_limit": "10000"
        },
        {
          "tier": "3",
          "discount": "0.9",
          "lower_limit": "10000",
          "leverage": "10",
          "upper_limit": "50000"
        },
        {
          "tier": "4",
          "discount": "0.85",
          "lower_limit": "50000",
          "leverage": "10",
          "upper_limit": "+"
        }
      ]
    }
  ]
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencydiscounttiers-responses](https://www.gate.io/docs/developers/apiv4/en/#listcurrencydiscounttiers-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencydiscounttiers-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcurrencydiscounttiers-responseschema)

Status Code **200**

| Name              | Type   | Description                                |
| ----------------- | ------ | ------------------------------------------ |
| » _None_          | object | Unified account tiered discount            |
| »» currency       | string | Currency name                              |
| »» discount_tiers | array  | Tiered discount                            |
| »»» tier          | string | Tier                                       |
| »»» discount      | string | Discount                                   |
| »»» lower_limit   | string | Lower limit                                |
| »»» upper_limit   | string | Upper limit, + indicates positive infinity |
| »»» leverage      | string | Position leverage                          |

This operation does not require authentication

## [#](#query-unified-account-tiered-loan-margin) Query unified account tiered loan margin

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-unified-account-tiered-loan-margin](https://www.gate.io/docs/developers/apiv4/en/#query-unified-account-tiered-loan-margin)

> Code samples
