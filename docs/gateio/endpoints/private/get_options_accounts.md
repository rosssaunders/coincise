# GET /options/accounts

**Source:**
[/options/accounts](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccount-responses)

## Authentication

Required (Private Endpoint)

## [#](#query-account-information) Query account information

`GET /options/accounts`

_Query account information_

> Example responses

> 200 Response

```
{
  "user": 666,
  "currency": "USDT",
  "short_enabled": true,
  "mmp_enabled": false,
  "liq_triggered": false,
  "margin_mode": 0,
  "total": "1650.443022",
  "position_value": "-40.1136",
  "equity": "1610.329422",
  "unrealised_pnl": "-0.7811",
  "init_margin": "0",
  "maint_margin": "135.541485",
  "order_margin": "139.74496",
  "ask_order_margin": "139.74496",
  "bid_order_margin": "0",
  "available": "1514.901537",
  "point": "0",
  "orders_limit": 10,
  "position_notional_limit": 1000000
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccount-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccount-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccount-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionsaccount-responseschema)

Status Code **200**

| Name                                                                   | Type           | Description                                                                                 |
| ---------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------- |
| » user                                                                 | integer(int64) | User ID                                                                                     |
| » total                                                                | string         | Account Balance                                                                             |
| » position_value                                                       | string         | Position value, long position value is positive, short position value is negative           |
| » equity                                                               | string         | Account equity, the sum of account balance and position value                               |
| » short_enabled                                                        | boolean        | If the account is allowed to short                                                          |
| » mmp_enabled                                                          | boolean        | Whether to enable MMP                                                                       |
| » liq_triggered                                                        | boolean        | Whether to trigger position liquidation                                                     |
| » margin_mode                                                          | integer(int32) | ｜ Margin模式：                                                                             |
| \- 0：经典SpotMargin模式 - 1：跨CurrencyMargin模式 - 2：组合Margin模式 |
| » unrealised_pnl                                                       | string         | Unrealized PNL                                                                              |
| » init_margin                                                          | string         | Initial position margin                                                                     |
| » maint_margin                                                         | string         | Position maintenance margin                                                                 |
| » order_margin                                                         | string         | Order margin of unfinished orders                                                           |
| » ask_order_margin                                                     | string         | Margin for outstanding sell orders                                                          |
| » bid_order_margin                                                     | string         | Margin for outstanding buy orders                                                           |
| » available                                                            | string         | Available balance to transfer out or trade                                                  |
| » point                                                                | string         | Point card amount                                                                           |
| » currency                                                             | string         | Settlement currency                                                                         |
| » orders_limit                                                         | integer(int32) | Maximum number of outstanding orders                                                        |
| » position_notional_limit                                              | integer(int64) | Notional value upper limit, including the nominal value of positions and outstanding orders |

#### [#](#enumerated-values-121) Enumerated Values

| Property    | Value |
| ----------- | ----- |
| margin_mode | 0     |
| margin_mode | 1     |
| margin_mode | 2     |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-account-change-history) Query account change history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-account-change-history](https://www.gate.io/docs/developers/apiv4/en/#query-account-change-history)

> Code samples
