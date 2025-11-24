# GET /unified/accounts

**Source:**
[/unified/accounts](https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-unified-account-information) Get unified account information

`GET /unified/accounts`

_Get unified account information_

The assets of each currency in the account will be adjusted according to their
liquidity, defined by corresponding adjustment coefficients, and then uniformly
converted to USD to calculate the total asset value and position value of the
account.

For specific formulas, please refer to [Margin Formula](#margin-formula)

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-parameters)

| Name     | In    | Type   | Required | Description                      |
| -------- | ----- | ------ | -------- | -------------------------------- |
| currency | query | string | false    | Query by specified currency name |
| sub_uid  | query | string | false    | Sub account user ID              |

> Example responses

> 200 Response

```json
{
  "user_id": 10001,
  "locked": false,
  "balances": {
    "ETH": {
      "available": "0",
      "freeze": "0",
      "borrowed": "0.075393666654",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "1016.1",
      "total_freeze": "0",
      "total_liab": "0",
      "spot_in_use": "1.111"
    },
    "POINT": {
      "available": "9999999999.017023138734",
      "freeze": "0",
      "borrowed": "0",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "12016.1",
      "total_freeze": "0",
      "total_liab": "0",
      "spot_in_use": "12"
    },
    "USDT": {
      "available": "0.00000062023",
      "freeze": "0",
      "borrowed": "0",
      "negative_liab": "0",
      "futures_pos_liab": "0",
      "equity": "16.1",
      "total_freeze": "0",
      "total_liab": "0",
      "spot_in_use": "12"
    }
  },
  "total": "230.94621713",
  "borrowed": "161.66395521",
  "total_initial_margin": "1025.0524665088",
  "total_margin_balance": "3382495.944473949183",
  "total_maintenance_margin": "205.01049330176",
  "total_initial_margin_rate": "3299.827135672679",
  "total_maintenance_margin_rate": "16499.135678363399",
  "total_available_margin": "3381470.892007440383",
  "unified_account_total": "3381470.892007440383",
  "unified_account_total_liab": "0",
  "unified_account_total_equity": "100016.1",
  "leverage": "2",
  "spot_order_loss": "12",
  "spot_hedge": false
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listunifiedaccounts-responseschema)

Status Code **200**

| Name                             | Type           | Description                                                                                                                                                                                                                     |
| -------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » user_id                        | integer(int64) | User ID                                                                                                                                                                                                                         |
| » refresh_time                   | integer(int64) | Last refresh time                                                                                                                                                                                                               |
| » locked                         | boolean        | Whether the account is locked, valid in cross-currency margin/combined margin mode, false in other modes such as single-currency margin mode                                                                                    |
| » balances                       | object         | none                                                                                                                                                                                                                            |
| »» UnifiedBalance                | object         | none                                                                                                                                                                                                                            |
| »»» available                    | string         | Available balance, valid in single currency margin/cross-currency margin/combined margin mode, calculation varies by mode                                                                                                       |
| »»» freeze                       | string         | Locked balance, valid in single currency margin/cross-currency margin/combined margin mode                                                                                                                                      |
| »»» borrowed                     | string         | Borrowed amount, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                                      |
| »»» negative_liab                | string         | Negative balance borrowing, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                           |
| »»» futures_pos_liab             | string         | Contract opening position borrowing currency (abandoned, to be offline field)                                                                                                                                                   |
| »»» equity                       | string         | Equity, valid in single currency margin/cross currency margin/combined margin mode                                                                                                                                              |
| »»» total_freeze                 | string         | Total frozen (deprecated, to be removed)                                                                                                                                                                                        |
| »»» total_liab                   | string         | Total borrowed amount, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                                |
| »»» spot_in_use                  | string         | The amount of spot hedging is valid in the combined margin mode, and is 0 in other margin modes such as single currency and cross-currency margin modes                                                                         |
| »»» funding                      | string         | Uniloan financial management amount, effective when turned on as a unified account margin switch                                                                                                                                |
| »»» funding_version              | string         | Funding version                                                                                                                                                                                                                 |
| »»» cross_balance                | string         | Full margin balance is valid in single currency margin mode, and is 0 in other modes such as cross currency margin/combined margin mode                                                                                         |
| »»» iso_balance                  | string         | Isolated margin balance is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode                                                                                      |
| »»» im                           | string         | Full-position initial margin is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode                                                                                 |
| »»» mm                           | string         | Cross margin maintenance margin, valid in single-currency margin mode, 0 in other modes such as cross-currency margin/combined margin mode                                                                                      |
| »»» imr                          | string         | Full-position initial margin rate is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode                                                                            |
| »»» mmr                          | string         | Full-position maintenance margin rate is valid in single-currency margin mode and is 0 in other modes such as cross-currency margin/combined margin mode                                                                        |
| »»» margin_balance               | string         | Full margin balance is valid in single currency margin mode and is 0 in other modes such as cross currency margin/combined margin mode                                                                                          |
| »»» available_margin             | string         | Cross margin available balance, valid in single currency margin mode, 0 in other modes such as cross-currency margin/combined margin mode                                                                                       |
| »»» enabled_collateral           | boolean        | Currency enabled as margin: true - Enabled, false - Disabled                                                                                                                                                                    |
| »» total                         | string         | Total account assets converted to USD, i.e. the sum of `(available + freeze) * price` in all currencies (deprecated, to be removed, replaced by unified_account_total)                                                          |
| »» borrowed                      | string         | Total borrowed amount converted to USD, i.e. the sum of `borrowed * price` of all currencies (excluding point cards), valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode |
| »» total_initial_margin          | string         | Total initial margin, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                                 |
| »» total_margin_balance          | string         | Total margin balance, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                                 |
| »» total_maintenance_margin      | string         | Total maintenance margin is valid in cross-currency margin/combined margin mode, and is 0 in other modes such as single-currency margin mode                                                                                    |
| »» total_initial_margin_rate     | string         | Total initial margin rate, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                            |
| »» total_maintenance_margin_rate | string         | Total maintenance margin rate, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                        |
| »» total_available_margin        | string         | Available margin amount, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                              |
| »» unified_account_total         | string         | Total unified account assets, valid in single currency margin/cross-currency margin/combined margin mode                                                                                                                        |
| »» unified_account_total_liab    | string         | Total unified account borrowed amount, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                |
| »» unified_account_total_equity  | string         | Total unified account equity, valid in single currency margin/cross-currency margin/combined margin mode                                                                                                                        |
| »» leverage                      | string         | Actual leverage ratio, valid in cross-currency margin/combined margin mode                                                                                                                                                      |
| »» spot_order_loss               | string         | Total pending order loss, in USDT, valid in cross-currency margin/combined margin mode, 0 in other modes such as single-currency margin mode                                                                                    |
| »» spot_hedge                    | boolean        | Spot hedging status: true - enabled, false - disabled                                                                                                                                                                           |
| »» use_funding                   | boolean        | Whether to use Earn funds as margin                                                                                                                                                                                             |
| »» is_all_collateral             | boolean        | Whether all currencies are used as margin: true - all currencies as margin, false - no                                                                                                                                          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-maximum-borrowable-amount-for-unified-account) Query maximum borrowable amount for unified account

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-maximum-borrowable-amount-for-unified-account](https://www.gate.io/docs/developers/apiv4/en/#query-maximum-borrowable-amount-for-unified-account)

> Code samples
