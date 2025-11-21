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
    "default_umr_multiplier_for_spot" : "1.0",
    "default_umr_multiplier_for_perps" : "1.0",
    "default_umr_multiplier_for_futures" : "2.0",
    "default_long_pos_limit_perps" : "-1.0",
    "default_short_pos_limit_perps" : "-1.0",
    "default_long_pos_limit_futures" : "-1.0",
    "default_short_pos_limit_futures" : "-1.0",
    "default_unit_margin_rate" : "0.05",
    "default_collateral_cap" : "0.0",
    "update_timestamp_ms" : 1763005542745,
    "base_currency_config" : [ {
      "instrument_name" : "1INCH",
      "minimum_haircut" : "0",
      "unit_margin_rate" : "0.00060",
      "order_limit" : "100000.0",
      "max_order_notional_usd" : "100000.0",
      "min_order_notional_usd" : "1.0"
    }, {
      "instrument_name" : "BOBA",
      "daily_notional_limit" : "10000.0",
      "order_limit" : "10000.0",
      "max_order_notional_usd" : "10000.0",
      "min_order_notional_usd" : "1.0"
    }, {
      "instrument_name" : "BTC",
      "collateral_cap_notional" : "25000000",
      "minimum_haircut" : "0.0625",
      "max_product_leverage_for_spot" : "16.0",
      "max_product_leverage_for_perps" : "50.0",
      "unit_margin_rate" : "0.005",
      "max_short_sell_limit" : "200.0",
      "order_limit" : "10000000",
      "max_order_notional_usd" : "10000000",
      "min_order_notional_usd" : "1.0",
      "long_pos_limit_perps" : "8800.0",
      "short_pos_limit_perps" : "8800.0",
      "long_pos_limit_futures" : "512.0",
      "short_pos_limit_futures" : "512.0"
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

| Name                                     | Type            | Description                                                                                                                                                                  |
| ---------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| default_max_product_leverage_for_spot    | number          | default max product leverage for margin trading unless specified in base_currency_config array                                                                               |
| default_max_product_leverage_for_perps   | number          | default max product leverage for perpetuals unless specified in base_currency_config array                                                                                   |
| default_max_product_leverage_for_futures | number          | default max product leverage for futures unless specified in base_currency_config array                                                                                      |
| default_unit_margin_rate                 | number          | default additional margin rate / haircut rate for holding 1 unit of positions unless specified in base_currency_config array                                                 |
| default_collateral_cap                   | number          | refer to specified collateral cap for each token in base_currency_config array. Field is omitted if the token is not eligible as collateral                                  |
| default_long_pos_limit_perps             | number          | default max long position permitted for perpetual contracts, unless specified in base_currency_config array. A value of **_\-1_** indicates that no position limit applies.  |
| default_short_pos_limit_perps            | number          | default max short position permitted for perpetual contracts, unless specified in base_currency_config array. A value of **_\-1_** indicates that no position limit applies. |
| default_long_pos_limit_futures           | number          | default max long position permitted on futures, unless specified in base_currency_config array. A value of **_\-1_** indicates that no position limit applies.               |
| default_short_pos_limit_futures          | number          | default max short position permitted on futures, unless specified in base_currency_config array. A value of **_\-1_** indicates that no position limit applies.              |
| update_timestamp_ms                      | number          | Last update time                                                                                                                                                             |
| **_base_currency_config_**               | array of string | specific risk parameters as shown below                                                                                                                                      |

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
| long_pos_limit_perps                                                                                                                 | number | the max long position permitted for perpetuals on this base token                                                                  |
| short_pos_limit_perps                                                                                                                | number | the max short position permitted for perpetuals on this base token                                                                 |
| long_pos_limit_futures                                                                                                               | number | the max long position permitted for futures on this base token                                                                     |
| short_pos_limit_futures                                                                                                              | number | the max short position permitted for futures on this base token                                                                    |
