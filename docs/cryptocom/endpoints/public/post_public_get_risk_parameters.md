# POST public/get-risk-parameters

**Source:**
[public/get-risk-parameters](https://exchange-docs.crypto.com/exchange/v1/rest-ws/index.html#public-get-risk-parameters)

## Authentication

Not Required (Public Endpoint)

## public/get-risk-parameters

> Request Sample

```
https://{URL}/public/get-risk-parameters
```

> Response Sample

```
{
  "id" : -1,
  "method" : "public/get-risk-parameters",
  "code" : 0,
  "result" : {
    "default_max_product_leverage_for_spot" : "1.0",
    "default_max_product_leverage_for_perps" : "20.0",
    "default_max_product_leverage_for_futures" : "20.0",
    "default_unit_margin_rate" : "0.05",
    "default_collateral_cap" : "-1.0",
    "update_timestamp_ms" : 1727853473520,
    "base_currency_config" : [ {
      "instrument_name" : "1INCH",
      "minimum_haircut" : "0",
      "unit_margin_rate" : "0.00050",
      "order_limit" : "100000.0"
    }, {
      "instrument_name" : "AAVE",
      "collateral_cap_notional" : "3600000.0",
      "minimum_haircut" : "0.2",
      "max_product_leverage_for_spot" : "5.0",
      "unit_margin_rate" : "0.007",
      "max_short_sell_limit" : "600.0",
      "order_limit" : "500000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"

    }, {
      "instrument_name" : "ACA",
      "order_limit" : "100000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"
    }, {
      "instrument_name" : "ACH",
      "minimum_haircut" : "0",
      "unit_margin_rate" : "0.00015",
      "order_limit" : "100000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"

    }, {
      "instrument_name" : "AERGO",
      "order_limit" : "100000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"
    }, {
      "instrument_name" : "AERO",
      "order_limit" : "1000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"
    }, {
      "instrument_name" : "ZRO",
      "minimum_haircut" : "0",
      "unit_margin_rate" : "0.004",
      "order_limit" : "500000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"
    }, {
      "instrument_name" : "ZRX",
      "minimum_haircut" : "0",
      "unit_margin_rate" : "0.00040",
      "order_limit" : "100000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"
    } ]
  }
}
```

Provides information on risk parameter settings for
[Smart Cross Margin](https://crypto.com/exchange/document/margin-rules).

### Applies To

REST

### REST Method

GET

### Response Attributes

An array, consisting of:

| Name                                     | Type            | Description                                                                                                                                 |
| ---------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| default_max_product_leverage_for_spot    | number          | default max product leverage for margin trading unless specified in base_currency_config array                                              |
| default_max_product_leverage_for_perps   | number          | default max product leverage for perpetuals unless specified in base_currency_config array                                                  |
| default_max_product_leverage_for_futures | number          | default max product leverage for futures unless specified in base_currency_config array                                                     |
| default_unit_margin_rate                 | number          | default additional margin rate / haircut rate for holding 1 unit of positions unless specified in base_currency_config array                |
| default_collateral_cap                   | number          | refer to specified collateral cap for each token in base_currency_config array. Field is omitted if the token is not eligible as collateral |
| update_timestamp_ms                      | number          | Last update time                                                                                                                            |
| **_base_currency_config_**               | array of string | specific risk parameters as shown below                                                                                                     |

**_base_currency_config_** is an array consisting of below fields for specific
base tokens.

| Name                                                                                                                                 | Type   | Description                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------ | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| collateral_cap_notional                                                                                                              | number | the maximum $notional that is counted towards the margin balance.                                                                  |
| Any additional token balance would not contribute to the margin balance. Field is omitted if the token is not eligible as collateral |
| minimum_haircut                                                                                                                      | number | Minimum haircut rate. Field is omitted if the token is not eligible as collateral                                                  |
| max_product_leverage_for_spot                                                                                                        | number | the max product leverage for margin trading on this token.                                                                         |
| max_product_leverage_for_perps                                                                                                       | number | the max product leverage for perpetuals on this base token                                                                         |
| max_product_leverage_for_futures                                                                                                     | number | the max product leverage for futures on this base token                                                                            |
| unit_margin_rate                                                                                                                     | number | the additional margin rate / haircut rate for holding 1 unit of positions with this base token                                     |
| max_short_sell_limit                                                                                                                 | number | max negative asset balance user can hold on the base token. If field is omitted means no short sell permitted on the token         |
| daily_notional_limit                                                                                                                 | number | max spot order notional user can place in rolling 24-hour window. If field is omitted, user can trade unlimited on this base token |
| order_limit                                                                                                                          | number | max $notional per spot order on this base token                                                                                    |
| max_order_notional_usd                                                                                                               | number | max $notional per spot order on this base token                                                                                    |
| min_order_notional_usd                                                                                                               | number | min $notional per spot order on this base token                                                                                    |
