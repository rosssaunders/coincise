# POST /unified/portfolio_calculator

**Source:**
[/unified/portfolio_calculator](https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#portfolio-margin-calculator) Portfolio margin calculator

`POST /unified/portfolio_calculator`

_Portfolio margin calculator_

Portfolio Margin Calculator

When inputting simulated position portfolios, each position includes the
position name and quantity held, supporting markets within the range of BTC and
ETH perpetual contracts, options, and spot markets. When inputting simulated
orders, each order includes the market identifier, order price, and order
quantity, supporting markets within the range of BTC and ETH perpetual
contracts, options, and spot markets. Market orders are not included.

> Body parameter

```
{
  "spot_balances": [
    {
      "currency": "BTC",
      "equity": "-1",
      "freeze": "10"
    }
  ],
  "spot_orders": [
    {
      "currency_pairs": "BTC_USDT",
      "order_price": "344",
      "size": "100",
      "left": "100",
      "type": "sell"
    }
  ],
  "futures_positions": [
    {
      "contract": "BTC_USDT",
      "size": "100"
    }
  ],
  "futures_orders": [
    {
      "contract": "BTC_USDT",
      "size": "10",
      "left": "8"
    }
  ],
  "options_positions": [
    {
      "options_name": "BTC_USDT-20240329-32000-C",
      "size": "10"
    }
  ],
  "options_orders": [
    {
      "options_name": "BTC_USDT-20240329-32000-C",
      "size": "100",
      "left": "80"
    }
  ],
  "spot_hedge": false
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-parameters](https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-parameters)

| Name                    | In   | Type    | Required | Description                                                                                                                                                               |
| ----------------------- | ---- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| body                    | body | object  | true     | none                                                                                                                                                                      |
| » spot_balances         | body | array   | false    | Spot                                                                                                                                                                      |
| »» _None_               | body | object  | false    | Spot                                                                                                                                                                      |
| »»» currency            | body | string  | true     | Currency name                                                                                                                                                             |
| »»» equity              | body | string  | true     | Currency equity, where equity = balance - borrowed, represents the net delta exposure of your spot positions, which can be negative. Currently only supports BTC and ETH  |
| »» spot_orders          | body | array   | false    | Spot orders                                                                                                                                                               |
| »»» _None_              | body | object  | false    | Spot orders                                                                                                                                                               |
| »»»» currency_pairs     | body | string  | true     | Market                                                                                                                                                                    |
| »»»» order_price        | body | string  | true     | Price                                                                                                                                                                     |
| »»»» count              | body | string  | false    | Initial order quantity for spot trading pairs, not involved in actual calculation. Currently only supports BTC and ETH Currently only supports three currencies: BTC, ETH |
| »»»» left               | body | string  | true     | Unfilled quantity, involved in actual calculation                                                                                                                         |
| »»»» type               | body | string  | true     | Order type, sell - sell order, buy - buy order                                                                                                                            |
| »»» futures_positions   | body | array   | false    | Futures positions                                                                                                                                                         |
| »»»» _None_             | body | object  | false    | Futures positions                                                                                                                                                         |
| »»»»» contract          | body | string  | true     | Futures name, currently only supports USDT perpetual contracts for BTC and ETH                                                                                            |
| »»»»» size              | body | string  | true     | Position size, measured in contract quantity                                                                                                                              |
| »»»» futures_orders     | body | array   | false    | Futures order                                                                                                                                                             |
| »»»»» _None_            | body | object  | false    | Futures order                                                                                                                                                             |
| »»»»»» contract         | body | string  | true     | Futures name, currently only supports USDT perpetual contracts for BTC and ETH                                                                                            |
| »»»»»» size             | body | string  | true     | Contract quantity, representing the initial order quantity, not involved in actual settlement                                                                             |
| »»»»»» left             | body | string  | true     | Unfilled contract quantity, involved in actual calculation                                                                                                                |
| »»»»» options_positions | body | array   | false    | Options positions                                                                                                                                                         |
| »»»»»» _None_           | body | object  | false    | Options positions                                                                                                                                                         |
| »»»»»»» options_name    | body | string  | true     | Option name, currently only supports USDT options for BTC and ETH                                                                                                         |
| »»»»»»» size            | body | string  | true     | Position size, measured in contract quantity                                                                                                                              |
| »»»»»» options_orders   | body | array   | false    | Option orders                                                                                                                                                             |
| »»»»»»» _None_          | body | object  | false    | Option orders                                                                                                                                                             |
| »»»»»»»» options_name   | body | string  | true     | Option name, currently only supports USDT options for BTC and ETH                                                                                                         |
| »»»»»»»» size           | body | string  | true     | Initial order quantity, not involved in actual calculation                                                                                                                |
| »»»»»»»» left           | body | string  | true     | Unfilled contract quantity, involved in actual calculation                                                                                                                |
| »»»»»»» spot_hedge      | body | boolean | false    | Whether to enable spot hedging                                                                                                                                            |

> Example responses

> 200 Response

```
{
  "maintain_margin_total": "0.000000000000",
  "initial_margin_total": "0.000000000000",
  "calculate_time": "1709014486",
  "risk_unit": [
    {
      "symbol": "BTC",
      "margin_result": [
        {
          "type": "original_position",
          "profit_loss_ranges": [
            {
              "price_percentage": "-0.200000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.160000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.120000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.080000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "-0.040000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.000000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.040000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.080000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.120000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.160000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            },
            {
              "price_percentage": "0.200000000000",
              "implied_volatility_percentage": "-0.300000000000",
              "profit_loss": "0.000000000000"
            }
          ],
          "max_loss": {
            "price_percentage": "-0.200000000000",
            "implied_volatility_percentage": "-0.300000000000",
            "profit_loss": "0.000000000000"
          },
          "mr1": "0.000000000000",
          "mr2": "0.000000000000",
          "mr3": "0.000000000000",
          "mr4": "0.000000000000"
        }
      ],
      "maintain_margin": "0.000000000000",
      "initial_margin": "0.000000000000"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-responses](https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-responseschema](https://www.gate.io/docs/developers/apiv4/en/#calculateportfoliomargin-responseschema)

Status Code **200**

_Portfolio margin calculator output_

| Name                    | Type           | Description                                                                                                                                                                                                             |
| ----------------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » maintain_margin_total | string         | Total maintenance margin, including only portfolio margin calculation results for positions in risk units, excluding borrowing margin. If borrowing exists, conventional borrowing margin requirements will still apply |
| » initial_margin_total  | string         | Total initial margin, calculated as the maximum of the following three combinations: position, position + positive delta orders, position + negative delta orders                                                       |
| » calculate_time        | integer(int64) | Calculation time                                                                                                                                                                                                        |
| » risk_unit             | array          | Risk unit                                                                                                                                                                                                               |
| »» _None_               | object         | Risk unit                                                                                                                                                                                                               |
| »»» symbol              | string         | Risk unit name                                                                                                                                                                                                          |
| »»» spot_in_use         | string         | Spot hedge usage                                                                                                                                                                                                        |
| »»» maintain_margin     | string         | Maintenance margin                                                                                                                                                                                                      |
| »»» initial_margin      | string         | Initial margin                                                                                                                                                                                                          |
| »»» margin_result       | array          | Margin result                                                                                                                                                                                                           |
| »»»» _None_             | object         | Margin result                                                                                                                                                                                                           |
| »»»»» type              | string         | Position combination type                                                                                                                                                                                               |

`original_position` - Original position  
`long_delta_original_position` - Positive delta + Original position  
`short_delta_original_position` - Negative delta + Original position | | »»»»»
profit*loss_ranges | array | Results of 33 stress scenarios for MR1 | | »»»»»»
\_None* | object | Profit and loss range | | »»»»»»» price_percentage | string |
Percentage change in price | | »»»»»»» implied_volatility_percentage | string |
Percentage change in implied volatility | | »»»»»»» profit_loss | string | PnL |
| »»»»»» max_loss | object | Profit and loss range | | »»»»»»» price_percentage
| string | Percentage change in price | | »»»»»»» implied_volatility_percentage
| string | Percentage change in implied volatility | | »»»»»»» profit_loss |
string | PnL | | »»»»»» mr1 | string | Stress testing | | »»»»»» mr2 | string |
Basis spread risk | | »»»»»» mr3 | string | Volatility spread risk | | »»»»»»
mr4 | string | Option short risk | | »»»»» delta | string | Total Delta of risk
unit | | »»»»» gamma | string | Total Gamma of risk unit | | »»»»» theta |
string | Total Theta of risk unit | | »»»»» vega | string | Total Vega of risk
unit |

This operation does not require authentication

## [#](#maximum-and-minimum-currency-leverage-that-can-be-set) Maximum and minimum currency leverage that can be set

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#maximum-and-minimum-currency-leverage-that-can-be-set](https://www.gate.io/docs/developers/apiv4/en/#maximum-and-minimum-currency-leverage-that-can-be-set)

> Code samples
