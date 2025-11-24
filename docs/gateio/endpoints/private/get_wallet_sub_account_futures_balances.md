# GET /wallet/sub_account_futures_balances

**Source:**
[/wallet/sub_account_futures_balances](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-sub-account-perpetual-futures-account-balance-information) Query sub-account perpetual futures account balance information

`GET /wallet/sub_account_futures_balances`

_Query sub-account perpetual futures account balance information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-parameters)

| Name    | In    | Type   | Required | Description                                                                                                                        |
| ------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | Sub-account user ID, you can query multiple records separated by `,`. If not specified, it will return records of all sub-accounts |
| settle  | query | string | false    | Query balance of specified settlement currency                                                                                     |

> Example responses

> 200 Response

```json
[
  [
    {
      "available": {
        "btc": {
          "available": "0.0009",
          "bonus": "0",
          "cross_available": "0.0009",
          "cross_initial_margin": "0",
          "cross_maintenance_margin": "0",
          "cross_order_margin": "0",
          "cross_unrealised_pnl": "0",
          "currency": "BTC",
          "enable_credit": false,
          "enable_evolved_classic": true,
          "enable_new_dual_mode": false,
          "history": {
            "bonus_dnw": "0",
            "bonus_offset": "0",
            "cross_settle": "0",
            "dnw": "0.0009",
            "fee": "0",
            "fund": "0",
            "pnl": "0",
            "point_dnw": "0",
            "point_fee": "0",
            "point_refr": "0",
            "refr": "0"
          },
          "in_dual_mode": false,
          "isolated_position_margin": "0",
          "maintenance_margin": "0",
          "margin_mode": 0,
          "margin_mode_name": "classic",
          "order_margin": "0",
          "point": "0",
          "position_initial_margin": "0",
          "position_margin": "0",
          "total": "0.0009",
          "unrealised_pnl": "0",
          "update_id": 11,
          "update_time": 1741766400,
          "user": 10003
        },
        "usd": {},
        "usdt": {
          "available": "500.7",
          "bonus": "0",
          "cross_available": "500.7",
          "cross_initial_margin": "0",
          "cross_maintenance_margin": "0",
          "cross_order_margin": "0",
          "cross_unrealised_pnl": "0",
          "currency": "USDT",
          "enable_credit": true,
          "enable_evolved_classic": true,
          "enable_new_dual_mode": true,
          "history": {
            "bonus_dnw": "0",
            "bonus_offset": "0",
            "cross_settle": "-1.854650083",
            "dnw": "1.89047097",
            "fee": "-0.141010882",
            "fund": "0",
            "pnl": "0.10519",
            "point_dnw": "0",
            "point_fee": "0",
            "point_refr": "0",
            "refr": "0"
          },
          "in_dual_mode": true,
          "isolated_position_margin": "0",
          "maintenance_margin": "0",
          "margin_mode": 1,
          "margin_mode_name": "multi_currency",
          "order_margin": "0",
          "point": "0",
          "position_initial_margin": "0",
          "position_margin": "0",
          "total": "0.000000005",
          "unrealised_pnl": "0",
          "update_id": 37,
          "update_time": 1741766400,
          "user": 10003
        }
      },
      "uid": "10003"
    }
  ]
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountfuturesbalances-responseschema)

Status Code **200**

| Name                                                                           | Type    | Description                                                                                                                                                                                     |
| ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » uid                                                                          | string  | User ID                                                                                                                                                                                         |
| » available                                                                    | object  | Futures account balances                                                                                                                                                                        |
| »» **additionalProperties**                                                    | object  | none                                                                                                                                                                                            |
| »»» total                                                                      | string  | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. |
| total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| »»» unrealised_pnl                                                             | string  | Unrealized PNL                                                                                                                                                                                  |
| »»» position_margin                                                            | string  | Position margin                                                                                                                                                                                 |
| »»» order_margin                                                               | string  | Order margin of unfinished orders                                                                                                                                                               |
| »»» available                                                                  | string  | Available balance for transferring or trading (including bonus. Bonus cannot be withdrawn, so transfer amount needs to deduct bonus)                                                            |
| »»» point                                                                      | string  | Point card amount                                                                                                                                                                               |
| »»» currency                                                                   | string  | Settlement currency                                                                                                                                                                             |
| »»» in_dual_mode                                                               | boolean | Whether dual mode is enabled                                                                                                                                                                    |
| »»» position_mode                                                              | string  | 持仓模式，single-单向持仓，dual-双向持仓，split-分仓(in_dual_mode失效了)                                                                                                                        |
| »»» enable_credit                                                              | boolean | Whether portfolio margin account mode is enabled                                                                                                                                                |
| »»» position_initial_margin                                                    | string  | Initial margin occupied by positions, applicable to unified account mode                                                                                                                        |
| »»» maintenance_margin                                                         | string  | Maintenance margin occupied by positions, applicable to new classic account margin mode and unified account mode                                                                                |
| »»» bonus                                                                      | string  | Bonus                                                                                                                                                                                           |
| »»» enable_evolved_classic                                                     | boolean | Classic account margin mode, true-new mode, false-old mode                                                                                                                                      |
| »»» cross_order_margin                                                         | string  | Cross margin order margin, applicable to new classic account margin mode                                                                                                                        |
| »»» cross_initial_margin                                                       | string  | Cross margin initial margin, applicable to new classic account margin mode                                                                                                                      |
| »»» cross_maintenance_margin                                                   | string  | Cross margin maintenance margin, applicable to new classic account margin mode                                                                                                                  |
| »»» cross_unrealised_pnl                                                       | string  | Cross margin unrealized P&L, applicable to new classic account margin mode                                                                                                                      |
| »»» cross_available                                                            | string  | Cross margin available balance, applicable to new classic account margin mode                                                                                                                   |
| »»» cross_margin_balance                                                       | string  | Cross margin balance, applicable to new classic account margin mode                                                                                                                             |
| »»» cross_mmr                                                                  | string  | Cross margin maintenance margin rate, applicable to new classic account margin mode                                                                                                             |
| »»» cross_imr                                                                  | string  | Cross margin initial margin rate, applicable to new classic account margin mode                                                                                                                 |
| »»» isolated_position_margin                                                   | string  | Isolated position margin, applicable to new classic account margin mode                                                                                                                         |
| »»» enable_new_dual_mode                                                       | boolean | Whether to open a new two-way position mode                                                                                                                                                     |
| »»» margin_mode                                                                | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode                                                                                                        |
| »»» enable_tiered_mm                                                           | boolean | Whether to enable tiered maintenance margin calculation                                                                                                                                         |
| »»» position_voucher_total                                                     | string  | Total Position Experience Coupon Amount in Account                                                                                                                                              |
| »»» history                                                                    | object  | Statistical data                                                                                                                                                                                |
| »»»» dnw                                                                       | string  | total amount of deposit and withdraw                                                                                                                                                            |
| »»»» pnl                                                                       | string  | total amount of trading profit and loss                                                                                                                                                         |
| »»»» fee                                                                       | string  | total amount of fee                                                                                                                                                                             |
| »»»» refr                                                                      | string  | total amount of referrer rebates                                                                                                                                                                |
| »»»» fund                                                                      | string  | total amount of funding costs                                                                                                                                                                   |
| »»»» point_dnw                                                                 | string  | total amount of point deposit and withdraw                                                                                                                                                      |
| »»»» point_fee                                                                 | string  | total amount of point fee                                                                                                                                                                       |
| »»»» point_refr                                                                | string  | total amount of referrer rebates of point fee                                                                                                                                                   |
| »»»» bonus_dnw                                                                 | string  | total amount of perpetual contract bonus transfer                                                                                                                                               |
| »»»» bonus_offset                                                              | string  | total amount of perpetual contract bonus deduction                                                                                                                                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-account-cross-margin-account-balance-information) Query sub-account cross margin account balance information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-cross-margin-account-balance-information](https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-cross-margin-account-balance-information)

> Code samples
