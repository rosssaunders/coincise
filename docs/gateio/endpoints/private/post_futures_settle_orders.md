# POST /futures/{settle}/orders

**Source:** [/futures/{settle}/orders](https://www.gate.io/docs/developers/apiv4/en/#createfuturesorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#place-futures-order) Place futures order

`POST /futures/{settle}/orders`

_Place futures order_

- When placing an order, the number of contracts is specified `size`, not the
  number of coins. The number of coins corresponding to each contract is
  returned in the contract details interface `quanto_multiplier`
- 0 The order that was completed cannot be obtained after 10 minutes of
  withdrawal, and the order will be mentioned that the order does not exist
- Setting `reduce_only` to `true` can prevent the position from being penetrated
  when reducing the position
- In single-position mode, if you need to close the position, you need to set
  `size` to 0 and `close` to `true`
- In dual warehouse mode,
- Reduce position: reduce_only=true, size is a positive number that indicates
  short position, negative number that indicates long position
- Add number that indicates adding long positions, and negative numbers indicate
  adding short positions
- Close position: size=0, set the direction of closing position according to
  auto_size, and set `reduce_only` to true at the same time - reduce_only: Make
  sure to only perform position reduction operations to prevent increased
  positions
- Set `stp_act` to determine the use of a strategy that restricts user
  transactions. For detailed usage, refer to the body parameter `stp_act`

> Body parameter

```
{
  "contract": "BTC_USDT",
  "size": 6024,
  "iceberg": 0,
  "price": "3765",
  "tif": "gtc",
  "text": "t-my-custom-id",
  "stp_act": "-"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createfuturesorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createfuturesorder-parameters)

| Name           | In     | Type                                | Required | Description                                                                                                                                       |
| -------------- | ------ | ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-gate-exptime | header | string                              | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected  |
| body           | body   | [FuturesOrder](#schemafuturesorder) | true     | none                                                                                                                                              |
| » contract     | body   | string                              | true     | Futures contract                                                                                                                                  |
| » size         | body   | integer(int64)                      | true     | Required. Trading quantity. Positive for buy, negative for sell. Set to 0 for close position orders.                                              |
| » iceberg      | body   | integer(int64)                      | false    | Display size for iceberg orders. 0 for non-iceberg orders. Note that hidden portions are charged taker fees.                                      |
| » price        | body   | string                              | false    | Order price. Price of 0 with `tif` set to `ioc` represents a market order.                                                                        |
| » close        | body   | boolean                             | false    | Set as `true` to close the position, with `size` set to 0                                                                                         |
| » reduce_only  | body   | boolean                             | false    | Set as `true` to be reduce-only order                                                                                                             |
| » tif          | body   | string                              | false    | Time in force                                                                                                                                     |
| » text         | body   | string                              | false    | Custom order information. If not empty, must follow the rules below:                                                                              |
| » auto_size    | body   | string                              | false    | Set side to close dual-mode position. `close_long` closes the long side; while `close_short` the short one. Note `size` also needs to be set to 0 |
| » stp_act      | body   | string                              | false    | Self-Trading Prevention Action. Users can use this field to set self-trade prevention strategies                                                  |

|» limit_vip|body|integer(int64)|false|限价委托成交的对手单User
VIP 等级，当前下单仅会跟小于等于对手单User
VIP 等级的单成交，仅支持传递11~16，默认是0| |»
pid|body|integer(int64)|false|仓位ID| |settle|path|string|true|Settle currency|

#### [#](#detailed-descriptions-27) Detailed descriptions

**» tif**: Time in force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee
- fok: FillOrKill, fill either completely or none

**» text**: Custom order information. If not empty, must follow the rules below:

1.  Prefixed with `t-`
2.  No longer than 28 bytes without `t-` prefix
3.  Can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

In addition to user-defined information, the following are internal reserved
fields that identify the order source:

- web: Web
- api: API call
- app: Mobile app
- auto_deleveraging: Automatic deleveraging
- liquidation: Forced liquidation of positions under the old classic mode
- liq-xxx: a. Forced liquidation of positions under the new classic mode,
  including isolated margin, one-way cross margin, and non-hedged positions
  under two-way cross margin. b. Forced liquidation of isolated positions under
  the unified account single-currency margin mode
- hedge-liq-xxx: Forced liquidation of hedged positions under the new classic
  mode two-way cross margin, i.e., simultaneously closing long and short
  positions
- pm_liquidate: Forced liquidation under unified account multi-currency margin
  mode
- comb_margin_liquidate: Forced liquidation under unified account portfolio
  margin mode
- scm_liquidate: Forced liquidation of positions under unified account
  single-currency margin mode
- insurance: Insurance

**» stp_act**: Self-Trading Prevention Action. Users can use this field to set
self-trade prevention strategies

1.  After users join the `STP Group`, they can pass `stp_act` to limit the
    user's self-trade prevention strategy. If `stp_act` is not passed, the
    default is `cn` strategy.
2.  When the user does not join the `STP group`, an error will be returned when
    passing the `stp_act` parameter.
3.  If the user did not use `stp_act` when placing the order, `stp_act` will
    return '-'

- cn: Cancel newest, cancel new orders and keep old ones
- co: Cancel oldest, cancel old orders and keep new ones
- cb: Cancel both, both old and new orders will be cancelled

#### [#](#enumerated-values-58) Enumerated Values

| Parameter   | Value       |
| ----------- | ----------- |
| » tif       | gtc         |
| » tif       | ioc         |
| » tif       | poc         |
| » tif       | fok         |
| » auto_size | close_long  |
| » auto_size | close_short |
| » stp_act   | co          |
| » stp_act   | cn          |
| » stp_act   | cb          |
| » stp_act   | \-          |
| settle      | btc         |
| settle      | usdt        |

> Example responses

> 201 Response

```
{
  "id": 15675394,
  "user": 100000,
  "contract": "BTC_USDT",
  "create_time": 1546569968,
  "size": 6024,
  "iceberg": 0,
  "left": 6024,
  "price": "3765",
  "fill_price": "0",
  "mkfr": "-0.00025",
  "tkfr": "0.00075",
  "tif": "gtc",
  "refu": 0,
  "is_reduce_only": false,
  "is_close": false,
  "is_liq": false,
  "text": "t-my-custom-id",
  "status": "finished",
  "finish_time": 1514764900,
  "finish_as": "cancelled",
  "stp_id": 0,
  "stp_act": "-",
  "amend_text": "-"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createfuturesorder-responses](https://www.gate.io/docs/developers/apiv4/en/#createfuturesorder-responses)

| Status | Meaning                                                                         | Description   | Schema                              |
| ------ | ------------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-futures-order-list) Query futures order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-futures-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-futures-order-list)

> Code samples
