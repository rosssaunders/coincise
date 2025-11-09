# GET /delivery/{settle}/accounts

**Source:** [/delivery/{settle}/accounts](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#get-futures-account-2) Get futures account

`GET /delivery/{settle}/accounts`

_Get futures account_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-parameters)

| Name   | In   | Type   | Required | Description     |
| ------ | ---- | ------ | -------- | --------------- |
| settle | path | string | true     | Settle currency |

#### [#](#enumerated-values-93) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```
{
  "user": 1666,
  "currency": "USDT",
  "total": "9707.803567115145",
  "unrealised_pnl": "3371.248828",
  "position_margin": "38.712189181",
  "order_margin": "0",
  "available": "9669.091377934145",
  "point": "0",
  "bonus": "0",
  "in_dual_mode": false,
  "enable_evolved_classic": false,
  "cross_initial_margin": "61855.56788525",
  "cross_maintenance_margin": "682.04678105",
  "cross_order_margin": "0",
  "cross_unrealised_pnl": "1501.178222634128",
  "cross_available": "27549.406108813951",
  "cross_margin_balance": "10371.77306201952",
  "cross_mmr": "797.2134",
  "cross_imr": "116.6097",
  "isolated_position_margin": "0",
  "history": {
    "dnw": "10000",
    "pnl": "68.3685",
    "fee": "-1.645812875",
    "refr": "0",
    "fund": "-358.919120009855",
    "point_dnw": "0",
    "point_fee": "0",
    "point_refr": "0",
    "bonus_dnw": "0",
    "bonus_offset": "0"
  },
  "enable_tiered_mm": true
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryaccounts-responseschema)

Status Code **200**

| Name                                                                           | Type    | Description                                                                                                                                                                                     |
| ------------------------------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » total                                                                        | string  | total is the balance after the user's accumulated deposit, withdraw, profit and loss (including realized profit and loss, fund, fee and referral rebate), excluding unrealized profit and loss. |
| total = SUM(history_dnw, history_pnl, history_fee, history_refr, history_fund) |
| » unrealised_pnl                                                               | string  | Unrealized PNL                                                                                                                                                                                  |
| » position_margin                                                              | string  | Position margin                                                                                                                                                                                 |
| » order_margin                                                                 | string  | Order margin of unfinished orders                                                                                                                                                               |
| » available                                                                    | string  | Available balance for transferring or trading (including bonus. Bonus cannot be withdrawn, so transfer amount needs to deduct bonus)                                                            |
| » point                                                                        | string  | Point card amount                                                                                                                                                                               |
| » currency                                                                     | string  | Settlement currency                                                                                                                                                                             |
| » in_dual_mode                                                                 | boolean | Whether dual mode is enabled                                                                                                                                                                    |
| » position_mode                                                                | string  | 持仓模式，single-单向持仓，dual-双向持仓，split-分仓(in_dual_mode失效了)                                                                                                                        |
| » enable_credit                                                                | boolean | Whether portfolio margin account mode is enabled                                                                                                                                                |
| » position_initial_margin                                                      | string  | Initial margin occupied by positions, applicable to unified account mode                                                                                                                        |
| » maintenance_margin                                                           | string  | Maintenance margin occupied by positions, applicable to new classic account margin mode and unified account mode                                                                                |
| » bonus                                                                        | string  | Bonus                                                                                                                                                                                           |
| » enable_evolved_classic                                                       | boolean | Classic account margin mode, true-new mode, false-old mode                                                                                                                                      |
| » cross_order_margin                                                           | string  | Cross margin order margin, applicable to new classic account margin mode                                                                                                                        |
| » cross_initial_margin                                                         | string  | Cross margin initial margin, applicable to new classic account margin mode                                                                                                                      |
| » cross_maintenance_margin                                                     | string  | Cross margin maintenance margin, applicable to new classic account margin mode                                                                                                                  |
| » cross_unrealised_pnl                                                         | string  | Cross margin unrealized P&L, applicable to new classic account margin mode                                                                                                                      |
| » cross_available                                                              | string  | Cross margin available balance, applicable to new classic account margin mode                                                                                                                   |
| » cross_margin_balance                                                         | string  | Cross margin balance, applicable to new classic account margin mode                                                                                                                             |
| » cross_mmr                                                                    | string  | Cross margin maintenance margin rate, applicable to new classic account margin mode                                                                                                             |
| » cross_imr                                                                    | string  | Cross margin initial margin rate, applicable to new classic account margin mode                                                                                                                 |
| » isolated_position_margin                                                     | string  | Isolated position margin, applicable to new classic account margin mode                                                                                                                         |
| » enable_new_dual_mode                                                         | boolean | Whether to open a new two-way position mode                                                                                                                                                     |
| » margin_mode                                                                  | integer | Margin mode, 0-classic margin mode, 1-cross-currency margin mode, 2-combined margin mode                                                                                                        |
| » enable_tiered_mm                                                             | boolean | Whether to enable tiered maintenance margin calculation                                                                                                                                         |
| » position_voucher_total                                                       | string  | Total Position Experience Coupon Amount in Account                                                                                                                                              |
| » history                                                                      | object  | Statistical data                                                                                                                                                                                |
| »» dnw                                                                         | string  | total amount of deposit and withdraw                                                                                                                                                            |
| »» pnl                                                                         | string  | total amount of trading profit and loss                                                                                                                                                         |
| »» fee                                                                         | string  | total amount of fee                                                                                                                                                                             |
| »» refr                                                                        | string  | total amount of referrer rebates                                                                                                                                                                |
| »» fund                                                                        | string  | total amount of funding costs                                                                                                                                                                   |
| »» point_dnw                                                                   | string  | total amount of point deposit and withdraw                                                                                                                                                      |
| »» point_fee                                                                   | string  | total amount of point fee                                                                                                                                                                       |
| »» point_refr                                                                  | string  | total amount of referrer rebates of point fee                                                                                                                                                   |
| »» bonus_dnw                                                                   | string  | total amount of perpetual contract bonus transfer                                                                                                                                               |
| »» bonus_offset                                                                | string  | total amount of perpetual contract bonus deduction                                                                                                                                              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-futures-account-change-history-2) Query futures account change history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-futures-account-change-history-2](https://www.gate.io/docs/developers/apiv4/en/#query-futures-account-change-history-2)

> Code samples
