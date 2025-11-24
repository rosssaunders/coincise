# GET /rebate/user/sub_relation

**Source:** [/rebate/user/sub_relation](https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-parameters)

## Authentication

Required (Private Endpoint)

## [#](#user-subordinate-relationship) User subordinate relationship

`GET /rebate/user/sub_relation`

_User subordinate relationship_

Query whether the specified user is within the system

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-parameters](https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-parameters)

| Name         | In    | Type   | Required | Description                                                                          |
| ------------ | ----- | ------ | -------- | ------------------------------------------------------------------------------------ |
| user_id_list | query | string | true     | Query user ID list, separated by commas. If more than 100, only 100 will be returned |

> Example responses

> 200 Response

```json
{
  "list": [
    {
      "belong": "",
      "ref_uid": 0,
      "type": 0,
      "uid": 9
    },
    {
      "belong": "partner",
      "type": 1,
      "ref_uid": 1,
      "uid": 2
    },
    {
      "belong": "referral",
      "type": 5,
      "ref_uid": 1,
      "uid": 3
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-responses](https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-responseschema](https://www.gate.io/docs/developers/apiv4/en/#usersubrelation-responseschema)

Status Code **200**

| Name        | Type           | Description                                                                                                                                       |
| ----------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| » list      | array          | Subordinate relationship list                                                                                                                     |
| »» UserSub  | object         | none                                                                                                                                              |
| »»» uid     | integer(int64) | User ID                                                                                                                                           |
| »»» belong  | string         | User's system affiliation (partner/referral). Empty means not belonging to any system                                                             |
| »»» type    | integer(int64) | Type (0-Not in system 1-Direct subordinate agent 2-Indirect subordinate agent 3-Direct direct customer 4-Indirect direct customer 5-Regular user) |
| »»» ref_uid | integer(int64) | Inviter user ID                                                                                                                                   |

WARNING

To perform this operation, you must be authenticated by API key and secret

# [#](#schemas) Schemas

## [#](#subaccountkey) SubAccountKey

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#subaccountkey](https://www.gate.io/docs/developers/apiv4/en/#subaccountkey)

```
{
  "user_id": 0,
  "mode": 0,
  "name": "string",
  "perms": [
    {
      "name": "string",
      "read_only": true
    }
  ],
  "ip_whitelist": [
    "string"
  ],
  "key": "string",
  "state": 0,
  "created_at": 0,
  "updated_at": 0,
  "last_access": 0
}

```

### [#](#properties) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties](https://www.gate.io/docs/developers/apiv4/en/#properties)

| Name    | Type           | Required | Restrictions | Description                                         |
| ------- | -------------- | -------- | ------------ | --------------------------------------------------- |
| user_id | integer(int64) | false    | read-only    | User ID                                             |
| mode    | integer(int32) | false    | none         | Mode: 1 - classic 2 - portfolio account             |
| name    | string         | false    | none         | API Key Name                                        |
| perms   | array          | false    | none         | none                                                |
| » name  | string         | false    | none         | Permission function name (no value will be cleared) |

\- wallet: wallet  
\- spot: spot/margin  
\- futures: perpetual contract  
\- delivery: delivery contract  
\- earn: earn  
\- custody: custody  
\- options: options  
\- account: account information  
\- loan: lending  
\- margin: margin  
\- unified: unified account  
\- copy: copy trading | | » read_only | boolean | false | none | Read Only | |
ip_whitelist | array | false | none | IP whitelist (list will be cleared if no
value is passed) | | key | string | false | read-only | API Key | | state |
integer(int32) | false | read-only | Status: 1-Normal 2-Frozen 3-Locked | |
created_at | integer(int64) | false | read-only | Creation time | | updated_at |
integer(int64) | false | read-only | Last Update Time | | last_access |
integer(int64) | false | read-only | Last Access Time |

## [#](#estimaterate) EstimateRate

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#estimaterate](https://www.gate.io/docs/developers/apiv4/en/#estimaterate)

```
{
  "property1": "string",
  "property2": "string"
}

```

_Estimate current hourly lending rates, returned by currency_

### [#](#properties-2) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-2](https://www.gate.io/docs/developers/apiv4/en/#properties-2)

| Name                     | Type   | Required | Restrictions | Description |
| ------------------------ | ------ | -------- | ------------ | ----------- |
| **additionalProperties** | string | false    | none         | none        |

## [#](#spotpricetriggeredorder) SpotPriceTriggeredOrder

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#spotpricetriggeredorder](https://www.gate.io/docs/developers/apiv4/en/#spotpricetriggeredorder)

```
{
  "trigger": {
    "price": "string",
    "rule": ">=",
    "expiration": 0
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "string",
    "amount": "string",
    "account": "normal",
    "time_in_force": "gtc",
    "auto_borrow": false,
    "auto_repay": false,
    "text": "string"
  },
  "id": 0,
  "user": 0,
  "market": "string",
  "ctime": 0,
  "ftime": 0,
  "fired_order_id": 0,
  "status": "string",
  "reason": "string"
}

```

_Spot price order details_

### [#](#properties-3) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-3](https://www.gate.io/docs/developers/apiv4/en/#properties-3)

| Name    | Type   | Required | Restrictions | Description             |
| ------- | ------ | -------- | ------------ | ----------------------- |
| trigger | object | true     | none         | none                    |
| » price | string | true     | none         | Trigger price           |
| » rule  | string | true     | none         | Price trigger condition |

\- `>=`: triggered when market price is greater than or equal to `price`  
\- `<=`: triggered when market price is less than or equal to `price` | | »
expiration | integer | true | none | Maximum wait time for trigger condition (in
seconds). Order will be cancelled if timeout | | put | object | true | none |
none | | » type | string | false | none | Order type，default to `limit`

\- limit : Limit Order  
\- market : Market Order | | » side | string | true | none | Order side

\- buy: buy side  
\- sell: sell side | | » price | string | true | none | Order price | | » amount
| string | true | none | Trading quantity  
When `type` is `limit`, it refers to the base currency (the currency being
traded), such as `BTC` in `BTC_USDT`  
When `type` is `market`, it refers to different currencies based on the side:  
\- `side`: `buy` refers to quote currency, `BTC_USDT` means `USDT`  
\- `side`: `sell` refers to base currency, `BTC_USDT` means `BTC` | | » account
| string | true | none | Trading account type. Unified account must be set to
`unified`

\- normal: spot trading  
\- margin: margin trading  
\- unified: unified account | | » time_in_force | string | false | none |
time_in_force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only | | » auto_borrow | boolean | false |
none | Whether to borrow coins automatically | | » auto_repay | boolean | false
| none | Whether to repay the loan automatically | | » text | string | false |
none | The source of the order, including:  
\- web: Web  
\- api: API call  
\- app: Mobile app | | id | integer(int64) | false | read-only | Auto order ID |
| user | integer | false | read-only | User ID | | market | string | true | none
| Market | | ctime | integer(int64) | false | read-only | Creation time | |
ftime | integer(int64) | false | read-only | End time | | fired_order_id |
integer(int64) | false | read-only | ID of the order created after trigger | |
status | string | false | read-only | Status

\- open: Running  
\- cancelled: Manually cancelled  
\- finish: Successfully completed  
\- failed: Failed to execute  
\- expired: Expired | | reason | string | false | read-only | Additional
description of how the order was completed |

#### [#](#enumerated-values-135) Enumerated Values

| Property      | Value   |
| ------------- | ------- |
| rule          | \>=     |
| rule          | <=      |
| type          | limit   |
| type          | market  |
| side          | buy     |
| side          | sell    |
| account       | normal  |
| account       | margin  |
| account       | unified |
| time_in_force | gtc     |
| time_in_force | ioc     |

## [#](#contract) Contract

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#contract](https://www.gate.io/docs/developers/apiv4/en/#contract)

```
{
  "name": "string",
  "type": "inverse",
  "quanto_multiplier": "string",
  "leverage_min": "string",
  "leverage_max": "string",
  "maintenance_rate": "string",
  "mark_type": "internal",
  "mark_price": "string",
  "index_price": "string",
  "last_price": "string",
  "maker_fee_rate": "string",
  "taker_fee_rate": "string",
  "order_price_round": "string",
  "mark_price_round": "string",
  "funding_rate": "string",
  "funding_interval": 0,
  "funding_next_apply": 0.1,
  "risk_limit_base": "string",
  "risk_limit_step": "string",
  "risk_limit_max": "string",
  "order_size_min": 0,
  "order_size_max": 0,
  "order_price_deviate": "string",
  "ref_discount_rate": "string",
  "ref_rebate_rate": "string",
  "orderbook_id": 0,
  "trade_id": 0,
  "trade_size": 0,
  "position_size": 0,
  "config_change_time": 0.1,
  "in_delisting": true,
  "orders_limit": 0,
  "enable_bonus": true,
  "enable_credit": true,
  "create_time": 0.1,
  "funding_cap_ratio": "string",
  "status": "string",
  "launch_time": 0,
  "delisting_time": 0,
  "delisted_time": 0
}

```

_Futures contract details_

### [#](#properties-4) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-4](https://www.gate.io/docs/developers/apiv4/en/#properties-4)

| Name                | Type           | Required | Restrictions | Description                                                                                                                               |
| ------------------- | -------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| name                | string         | false    | none         | Futures contract                                                                                                                          |
| type                | string         | false    | none         | Contract type: inverse - inverse contract, direct - direct contract                                                                       |
| quanto_multiplier   | string         | false    | none         | Multiplier used in converting from invoicing to settlement currency                                                                       |
| leverage_min        | string         | false    | none         | Minimum leverage                                                                                                                          |
| leverage_max        | string         | false    | none         | Maximum leverage                                                                                                                          |
| maintenance_rate    | string         | false    | none         | Maintenance rate of margin                                                                                                                |
| mark_type           | string         | false    | none         | Mark price type: internal - internal trading price, index - external index price                                                          |
| mark_price          | string         | false    | none         | Current mark price                                                                                                                        |
| index_price         | string         | false    | none         | Current index price                                                                                                                       |
| last_price          | string         | false    | none         | Last trading price                                                                                                                        |
| maker_fee_rate      | string         | false    | none         | Maker fee rate, negative values indicate rebates                                                                                          |
| taker_fee_rate      | string         | false    | none         | Taker fee rate                                                                                                                            |
| order_price_round   | string         | false    | none         | Minimum order price increment                                                                                                             |
| mark_price_round    | string         | false    | none         | Minimum mark price increment                                                                                                              |
| funding_rate        | string         | false    | none         | Current funding rate                                                                                                                      |
| funding_interval    | integer        | false    | none         | Funding application interval, unit in seconds                                                                                             |
| funding_next_apply  | number(double) | false    | none         | Next funding time                                                                                                                         |
| risk_limit_base     | string         | false    | none         | Base risk limit (deprecated)                                                                                                              |
| risk_limit_step     | string         | false    | none         | Risk limit adjustment step (deprecated)                                                                                                   |
| risk_limit_max      | string         | false    | none         | Maximum risk limit allowed by the contract (deprecated). It is recommended to use /futures/{settle}/risk_limit_tiers to query risk limits |
| order_size_min      | integer(int64) | false    | none         | Minimum order size allowed by the contract                                                                                                |
| order_size_max      | integer(int64) | false    | none         | Maximum order size allowed by the contract                                                                                                |
| order_price_deviate | string         | false    | none         | Maximum allowed deviation between order price and current mark price. The order price `order_price` must satisfy the following condition: |

abs(order_price - mark_price) <= mark_price \* order_price_deviate | |
ref_discount_rate | string | false | none | Trading fee discount for referred
users | | ref_rebate_rate | string | false | none | Commission rate for
referrers | | orderbook_id | integer(int64) | false | none | Orderbook update ID
| | trade_id | integer(int64) | false | none | Current trade ID | | trade_size |
integer(int64) | false | none | Historical cumulative trading volume | |
position_size | integer(int64) | false | none | Current total long position size
| | config_change_time | number(double) | false | none | Last configuration
update time | | in_delisting | boolean | false | none | `in_delisting=true` and
position_size>0 indicates the contract is in delisting transition period  
`in_delisting=true` and position_size=0 indicates the contract is delisted | |
orders_limit | integer | false | none | Maximum number of pending orders | |
enable_bonus | boolean | false | none | Whether bonus is enabled | |
enable_credit | boolean | false | none | Whether portfolio margin account is
enabled | | create_time | number(double) | false | none | Created time of the
contract | | funding_cap_ratio | string | false | none | The factor for the
maximum of the funding rate. Maximum of funding rate = (1/market maximum
leverage - maintenance margin rate) \* funding_cap_ratio | | status | string |
false | none | FuturesStatus Type包含：prelaunch(预上线),
trading(Trade中),delisting(下架中), delisted(已下架), circuit_breaker（熔断) | |
launch_time | integer(int64) | false | none | Contract expiry timestamp | |
delisting_time | integer(int64) | false | none | Futures进入只减仓StatusTime | |
delisted_time | integer(int64) | false | none | Futures下架Time |

#### [#](#enumerated-values-136) Enumerated Values

| Property  | Value    |
| --------- | -------- |
| type      | inverse  |
| type      | direct   |
| mark_type | internal |
| mark_type | index    |

## [#](#position) Position

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#position](https://www.gate.io/docs/developers/apiv4/en/#position)

```
{
  "user": 0,
  "contract": "string",
  "size": 0,
  "leverage": "string",
  "risk_limit": "string",
  "leverage_max": "string",
  "maintenance_rate": "string",
  "value": "string",
  "margin": "string",
  "entry_price": "string",
  "liq_price": "string",
  "mark_price": "string",
  "initial_margin": "string",
  "maintenance_margin": "string",
  "unrealised_pnl": "string",
  "realised_pnl": "string",
  "pnl_pnl": "string",
  "pnl_fund": "string",
  "pnl_fee": "string",
  "history_pnl": "string",
  "last_close_pnl": "string",
  "realised_point": "string",
  "history_point": "string",
  "adl_ranking": 0,
  "pending_orders": 0,
  "close_order": {
    "id": 0,
    "price": "string",
    "is_liq": true
  },
  "mode": "single",
  "cross_leverage_limit": "string",
  "update_time": 0,
  "update_id": 0,
  "trade_long_size": 0,
  "trade_long_xprice": "string",
  "trade_short_size": 0,
  "trade_short_xprice": "string",
  "trade_max_size": "string",
  "open_time": 0,
  "risk_limit_table": "string",
  "average_maintenance_rate": "string",
  "voucher_size": "string",
  "voucher_margin": "string",
  "voucher_id": 0,
  "pid": 0
}

```

_Futures position details_

### [#](#properties-5) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-5](https://www.gate.io/docs/developers/apiv4/en/#properties-5)

| Name               | Type           | Required | Restrictions | Description                                                                                                                                                              |
| ------------------ | -------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| user               | integer(int64) | false    | read-only    | User ID                                                                                                                                                                  |
| contract           | string         | false    | read-only    | Futures contract                                                                                                                                                         |
| size               | integer(int64) | false    | read-only    | Position size                                                                                                                                                            |
| leverage           | string         | false    | none         | Position leverage. 0 means cross margin; positive number means isolated margin                                                                                           |
| risk_limit         | string         | false    | none         | Position risk limit                                                                                                                                                      |
| leverage_max       | string         | false    | read-only    | Maximum leverage under current risk limit                                                                                                                                |
| maintenance_rate   | string         | false    | read-only    | Maintenance rate under current risk limit                                                                                                                                |
| value              | string         | false    | read-only    | Position value calculated in settlement currency                                                                                                                         |
| margin             | string         | false    | none         | Position margin                                                                                                                                                          |
| entry_price        | string         | false    | read-only    | Entry price                                                                                                                                                              |
| liq_price          | string         | false    | read-only    | Liquidation price                                                                                                                                                        |
| mark_price         | string         | false    | read-only    | Current mark price                                                                                                                                                       |
| initial_margin     | string         | false    | read-only    | The initial margin occupied by the position, applicable to the portfolio margin account                                                                                  |
| maintenance_margin | string         | false    | read-only    | Maintenance margin required for the position, applicable to portfolio margin account                                                                                     |
| unrealised_pnl     | string         | false    | read-only    | Unrealized PNL                                                                                                                                                           |
| realised_pnl       | string         | false    | read-only    | Realized PnL                                                                                                                                                             |
| pnl_pnl            | string         | false    | read-only    | Realized PNL - Position P/L                                                                                                                                              |
| pnl_fund           | string         | false    | read-only    | Realized PNL - Funding Fees                                                                                                                                              |
| pnl_fee            | string         | false    | read-only    | Realized PNL - Transaction Fees                                                                                                                                          |
| history_pnl        | string         | false    | read-only    | Total realized PnL from closed positions                                                                                                                                 |
| last_close_pnl     | string         | false    | read-only    | PNL of last position close                                                                                                                                               |
| realised_point     | string         | false    | read-only    | Realized POINT PNL                                                                                                                                                       |
| history_point      | string         | false    | read-only    | History realized POINT PNL                                                                                                                                               |
| adl_ranking        | integer        | false    | read-only    | Ranking of auto deleveraging, a total of 1-5 grades, `1` is the highest, `5` is the lowest, and `6` is the special case when there is no position held or in liquidation |
| pending_orders     | integer        | false    | read-only    | Current pending order quantity                                                                                                                                           |
| close_order        | object         | null     | false        | read-only                                                                                                                                                                | Current close order information, or `null` if no close order |
| » id               | integer(int64) | false    | none         | Order ID                                                                                                                                                                 |
| » price            | string         | false    | none         | Order price                                                                                                                                                              |
| » is_liq           | boolean        | false    | none         | Whether the close order is from liquidation                                                                                                                              |
| mode               | string         | false    | none         | Position mode, including:                                                                                                                                                |

\- `single`: Single position mode  
\- `dual_long`: Long position in dual position mode  
\- `dual_short`: Short position in dual position mode | | cross_leverage_limit |
string | false | none | Cross margin leverage (valid only when `leverage` is 0)
| | update_time | integer(int64) | false | read-only | Last update time | |
update_id | integer(int64) | false | read-only | Update ID. The value increments
by 1 each time the position is updated | | trade_long_size | integer(int64) |
false | read-only | Cumulative long size | | trade_long_xprice | string | false
| read-only | Cumulative long size\*price | | trade_short_size | integer(int64)
| false | read-only | Cumulative short size | | trade_short_xprice | string |
false | read-only | Cumulative short size\*price | | trade_max_size | string |
false | none | Maximum position | | open_time | integer(int64) | false | none |
First Open Time | | risk_limit_table | string | false | read-only | Risk limit
table ID | | average_maintenance_rate | string | false | read-only | Average
maintenance margin rate | | voucher_size | string | false | read-only |
Experience Coupon Position Size | | voucher_margin | string | false | read-only
| Experience Coupon Position Margin | | voucher_id | integer(int64) | false |
read-only | Experience Coupon ID | | pid | integer(int64) | false | read-only
| 分仓仓位id |

#### [#](#enumerated-values-137) Enumerated Values

| Property | Value      |
| -------- | ---------- |
| mode     | single     |
| mode     | dual_long  |
| mode     | dual_short |

## [#](#futuresorder) FuturesOrder

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futuresorder](https://www.gate.io/docs/developers/apiv4/en/#futuresorder)

```
{
  "id": 0,
  "user": 0,
  "create_time": 0.1,
  "update_time": 0.1,
  "finish_time": 0.1,
  "finish_as": "filled",
  "status": "open",
  "contract": "string",
  "size": 0,
  "iceberg": 0,
  "price": "string",
  "close": false,
  "is_close": true,
  "reduce_only": false,
  "is_reduce_only": true,
  "is_liq": true,
  "tif": "gtc",
  "left": 0,
  "fill_price": "string",
  "text": "string",
  "tkfr": "string",
  "mkfr": "string",
  "refu": 0,
  "auto_size": "close_long",
  "stp_id": 0,
  "stp_act": "co",
  "amend_text": "string",

  "limit_vip": 0,
  "pid": 0
}

```

_Futures order details_

### [#](#properties-6) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-6](https://www.gate.io/docs/developers/apiv4/en/#properties-6)

| Name        | Type           | Required | Restrictions | Description                                        |
| ----------- | -------------- | -------- | ------------ | -------------------------------------------------- |
| id          | integer(int64) | false    | read-only    | Futures order ID                                   |
| user        | integer        | false    | read-only    | User ID                                            |
| create_time | number(double) | false    | read-only    | Creation time of order                             |
| update_time | number(double) | false    | read-only    | Order更新Time                                      |
| finish_time | number(double) | false    | read-only    | Order finished time. Not returned if order is open |
| finish_as   | string         | false    | read-only    | How the order was finished:                        |

\- filled: all filled  
\- cancelled: manually cancelled  
\- liquidated: cancelled because of liquidation  
\- ioc: time in force is `IOC`, finish immediately  
\- auto_deleveraged: finished by ADL  
\- reduce_only: cancelled because of increasing position while `reduce-only`
set  
\- position_closed: cancelled because the position was closed  
\- reduce_out: only reduce positions by excluding hard-to-fill orders  
\- stp: cancelled because self trade prevention | | status | string | false |
read-only | Order status

\- `open`: Pending  
\- `finished`: Completed | | contract | string | true | none | Futures contract
| | size | integer(int64) | true | none | Required. Trading quantity. Positive
for buy, negative for sell. Set to 0 for close position orders. | | iceberg |
integer(int64) | false | none | Display size for iceberg orders. 0 for
non-iceberg orders. Note that hidden portions are charged taker fees. | | price
| string | false | none | Order price. Price of 0 with `tif` set to `ioc`
represents a market order. | | close | boolean | false | write-only | Set as
`true` to close the position, with `size` set to 0 | | is_close | boolean |
false | read-only | Is the order to close position | | reduce_only | boolean |
false | write-only | Set as `true` to be reduce-only order | | is_reduce_only |
boolean | false | read-only | Is the order reduce-only | | is_liq | boolean |
false | read-only | Is the order for liquidation | | tif | string | false | none
| Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | left | integer(int64) |
false | read-only | Unfilled quantity | | fill_price | string | false |
read-only | Fill price | | text | string | false | none | Custom order
information. If not empty, must follow the rules below:

1\. Prefixed with `t-`  
2\. No longer than 28 bytes without `t-` prefix  
3\. Can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

In addition to user-defined information, the following are internal reserved
fields that identify the order source:

\- web: Web  
\- api: API call  
\- app: Mobile app  
\- auto_deleveraging: Automatic deleveraging  
\- liquidation: Forced liquidation of positions under the old classic mode  
\- liq-xxx: a. Forced liquidation of positions under the new classic mode,
including isolated margin, one-way cross margin, and non-hedged positions under
two-way cross margin. b. Forced liquidation of isolated positions under the
unified account single-currency margin mode  
\- hedge-liq-xxx: Forced liquidation of hedged positions under the new classic
mode two-way cross margin, i.e., simultaneously closing long and short
positions  
\- pm_liquidate: Forced liquidation under unified account multi-currency margin
mode  
\- comb_margin_liquidate: Forced liquidation under unified account portfolio
margin mode  
\- scm_liquidate: Forced liquidation of positions under unified account
single-currency margin mode  
\- insurance: Insurance | | tkfr | string | false | read-only | Taker fee | |
mkfr | string | false | read-only | Maker fee | | refu | integer | false |
read-only | Referrer user ID | | auto_size | string | false | write-only | Set
side to close dual-mode position. `close_long` closes the long side; while
`close_short` the short one. Note `size` also needs to be set to 0 | | stp_id |
integer | false | read-only | Orders between users in the same `stp_id` group
are not allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | stp_act | string | false | none | Self-Trading Prevention
Action. Users can use this field to set self-trade prevention strategies

1\. After users join the `STP Group`, they can pass `stp_act` to limit the
user's self-trade prevention strategy. If `stp_act` is not passed, the default
is `cn` strategy.  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter.  
3\. If the user did not use `stp_act` when placing the order, `stp_act` will
return '-'

\- cn: Cancel newest, cancel new orders and keep old ones  
\- co: Cancel oldest, cancel old orders and keep new ones  
\- cb: Cancel both, both old and new orders will be cancelled | | amend_text |
string | false | read-only | The custom data that the user remarked when
amending the order |

|limit_vip|integer(int64)|false|write-only|限价委托成交的对手单User
VIP 等级，当前下单仅会跟小于等于对手单User
VIP 等级的单成交，仅支持传递11~16，默认是0|
|pid|integer(int64)|false|write-only|仓位ID|

#### [#](#enumerated-values-138) Enumerated Values

| Property  | Value            |
| --------- | ---------------- |
| finish_as | filled           |
| finish_as | cancelled        |
| finish_as | liquidated       |
| finish_as | ioc              |
| finish_as | auto_deleveraged |
| finish_as | reduce_only      |
| finish_as | position_closed  |
| finish_as | reduce_out       |
| finish_as | stp              |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |
| tif       | fok              |
| auto_size | close_long       |
| auto_size | close_short      |
| stp_act   | co               |
| stp_act   | cn               |
| stp_act   | cb               |
| stp_act   | \-               |

## [#](#batchamendorderreq) BatchAmendOrderReq

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batchamendorderreq](https://www.gate.io/docs/developers/apiv4/en/#batchamendorderreq)

```
{
  "order_id": 0,
  "text": "string",
  "size": 0,
  "price": "string",
  "amend_text": "string",

  }

```

_Modify contract order parameters_

### [#](#properties-7) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-7](https://www.gate.io/docs/developers/apiv4/en/#properties-7)

| Name     | Type           | Required | Restrictions | Description                                                               |
| -------- | -------------- | -------- | ------------ | ------------------------------------------------------------------------- |
| order_id | integer(int64) | false    | none         | Order id, order_id and text must contain at least one                     |
| text     | string         | false    | none         | User-defined order text, at least one of order_id and text must be passed |
| size     | integer(int64) | false    | none         | New order size, including filled size.                                    |

\- If less than or equal to the filled quantity, the order will be cancelled.  
\- The new order side must be identical to the original one.  
\- Close order size cannot be modified.  
\- For reduce-only orders, increasing the size may cancel other reduce-only
orders.  
\- If the price is not modified, decreasing the size will not affect the depth
queue, while increasing the size will place it at the end of the current price
level. | | price | string | false | none | New order price | | amend_text |
string | false | none | Custom info during order amendment |

## [#](#futurespricetriggeredorder) FuturesPriceTriggeredOrder

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futurespricetriggeredorder](https://www.gate.io/docs/developers/apiv4/en/#futurespricetriggeredorder)

```
{
  "initial": {
    "contract": "string",
    "size": 0,
    "price": "string",
    "close": false,
    "tif": "gtc",
    "text": "string",
    "reduce_only": false,
    "auto_size": "string",
    "is_reduce_only": true,
    "is_close": true
  },
  "trigger": {
    "strategy_type": 0,
    "price_type": 0,
    "price": "string",
    "rule": 1,
    "expiration": 0
  },
  "id": 0,
  "user": 0,
  "create_time": 0.1,
  "finish_time": 0.1,
  "trade_id": 0,
  "status": "open",
  "finish_as": "cancelled",
  "reason": "string",
  "order_type": "string",
  "me_order_id": 0
}

```

_Futures price-triggered order details_

### [#](#properties-8) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-8](https://www.gate.io/docs/developers/apiv4/en/#properties-8)

| Name       | Type           | Required | Restrictions | Description                                                                     |
| ---------- | -------------- | -------- | ------------ | ------------------------------------------------------------------------------- |
| initial    | object         | true     | none         | none                                                                            |
| » contract | string         | true     | none         | Futures contract                                                                |
| » size     | integer(int64) | false    | none         | Represents the number of contracts that need to be closed, full closing: size=0 |

Partial closing: plan-close-short-position size>0  
Partial closing: plan-close-long-position size<0 | | » price | string | true |
none | Order price. Set to 0 to use market price | | » close | boolean | false |
write-only | When all positions are closed in a single position mode, it must be
set to true to perform the closing operation  
When partially closed positions in single-store mode/double-store mode, you can
not set close, or close=false | | » tif | string | false | none | Time in force
strategy, default is gtc, market orders currently only support ioc mode

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled | | » text | string | false | none | The source of
the order, including:  
\- web: Web  
\- api: API call  
\- app: Mobile app | | » reduce_only | boolean | false | none | When set to
true, perform automatic position reduction operation. Set to true to ensure that
the order will not open a new position, and is only used to close or reduce
positions | | » auto_size | string | false | write-only | Single position mode:
auto_size is not required  
Dual position mode full closing (size=0): auto_size must be set, close_long for
closing long positions, close_short for closing short positions  
Dual position mode partial closing (size≠0): auto_size is not required | | »
is_reduce_only | boolean | false | read-only | Is the order reduce-only | | »
is_close | boolean | false | read-only | Is the order to close position | |
trigger | object | true | none | none | | » strategy_type | integer(int32) |
false | none | Trigger Strategy

\- 0: Price trigger, triggered when price meets conditions  
\- 1: Price spread trigger, i.e. the difference between the latest price
specified in `price_type` and the second-last price  
Currently only supports 0 (latest transaction price) | | » price_type |
integer(int32) | false | none | Reference price type. 0 - Latest trade price,
1 - Mark price, 2 - Index price | | » price | string | false | none | Price
value for price trigger, or spread value for spread trigger | | » rule |
integer(int32) | false | none | Price Condition Type

\- 1: Trigger when the price calculated based on `strategy_type` and
`price_type` is greater than or equal to `Trigger.Price`, while Trigger.Price
must > last_price  
\- 2: Trigger when the price calculated based on `strategy_type` and
`price_type` is less than or equal to `Trigger.Price`, and Trigger.Price must <
last_price | | » expiration | integer | false | none | Maximum wait time for
trigger condition (in seconds). Order will be cancelled if timeout | | id |
integer(int64) | false | read-only | Auto order ID | | user | integer | false |
read-only | User ID | | create_time | number(double) | false | read-only |
Creation time | | finish_time | number(double) | false | read-only | End time |
| trade_id | integer(int64) | false | read-only | ID of the order created after
trigger | | status | string | false | read-only | Order status

\- `open`: Active  
\- `finished`: Finished  
\- `inactive`: Inactive, only applies to order take-profit/stop-loss  
\- `invalid`: Invalid, only applies to order take-profit/stop-loss | | finish_as
| string | false | read-only | Finish status: cancelled - Cancelled; succeeded -
Succeeded; failed - Failed; expired - Expired | | reason | string | false |
read-only | Additional description of how the order was completed | | order_type
| string | false | none | Types of take-profit and stop-loss orders, including:

\- `close-long-order`: Order take-profit/stop-loss, close long position  
\- `close-short-order`: Order take-profit/stop-loss, close short position  
\- `close-long-position`: Position take-profit/stop-loss, used to close all long
positions  
\- `close-short-position`: Position take-profit/stop-loss, used to close all
short positions  
\- `plan-close-long-position`: Position plan take-profit/stop-loss, used to
close all or partial long positions  
\- `plan-close-short-position`: Position plan take-profit/stop-loss, used to
close all or partial short positions

The two types of order take-profit/stop-loss are read-only and cannot be passed
in requests | | me_order_id | integer(int64) | false | read-only | Corresponding
order ID for order take-profit/stop-loss orders |

#### [#](#enumerated-values-139) Enumerated Values

| Property      | Value     |
| ------------- | --------- |
| tif           | gtc       |
| tif           | ioc       |
| strategy_type | 0         |
| strategy_type | 1         |
| price_type    | 0         |
| price_type    | 1         |
| price_type    | 2         |
| rule          | 1         |
| rule          | 2         |
| status        | open      |
| status        | finished  |
| status        | inactive  |
| status        | invalid   |
| finish_as     | cancelled |
| finish_as     | succeeded |
| finish_as     | failed    |
| finish_as     | expired   |

## [#](#deliverycontract) DeliveryContract

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#deliverycontract](https://www.gate.io/docs/developers/apiv4/en/#deliverycontract)

```
{
  "name": "string",
  "underlying": "string",
  "cycle": "WEEKLY",
  "type": "inverse",
  "quanto_multiplier": "string",
  "leverage_min": "string",
  "leverage_max": "string",
  "maintenance_rate": "string",
  "mark_type": "internal",
  "mark_price": "string",
  "index_price": "string",
  "last_price": "string",
  "maker_fee_rate": "string",
  "taker_fee_rate": "string",
  "order_price_round": "string",
  "mark_price_round": "string",
  "basis_rate": "string",
  "basis_value": "string",
  "basis_impact_value": "string",
  "settle_price": "string",
  "settle_price_interval": 0,
  "settle_price_duration": 0,
  "expire_time": 0,
  "risk_limit_base": "string",
  "risk_limit_step": "string",
  "risk_limit_max": "string",
  "order_size_min": 0,
  "order_size_max": 0,
  "order_price_deviate": "string",
  "ref_discount_rate": "string",
  "ref_rebate_rate": "string",
  "orderbook_id": 0,
  "trade_id": 0,
  "trade_size": 0,
  "position_size": 0,
  "config_change_time": 0.1,
  "in_delisting": true,
  "orders_limit": 0
}

```

_Futures contract details_

### [#](#properties-9) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-9](https://www.gate.io/docs/developers/apiv4/en/#properties-9)

| Name                  | Type           | Required | Restrictions | Description                                                                                                                               |
| --------------------- | -------------- | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| name                  | string         | false    | none         | Futures contract                                                                                                                          |
| underlying            | string         | false    | none         | Underlying                                                                                                                                |
| cycle                 | string         | false    | none         | Cycle type, e.g. WEEKLY, QUARTERLY                                                                                                        |
| type                  | string         | false    | none         | Contract type: inverse - inverse contract, direct - direct contract                                                                       |
| quanto_multiplier     | string         | false    | none         | Multiplier used in converting from invoicing to settlement currency                                                                       |
| leverage_min          | string         | false    | none         | Minimum leverage                                                                                                                          |
| leverage_max          | string         | false    | none         | Maximum leverage                                                                                                                          |
| maintenance_rate      | string         | false    | none         | Maintenance rate of margin                                                                                                                |
| mark_type             | string         | false    | none         | Mark price type: internal - internal trading price, index - external index price                                                          |
| mark_price            | string         | false    | none         | Current mark price                                                                                                                        |
| index_price           | string         | false    | none         | Current index price                                                                                                                       |
| last_price            | string         | false    | none         | Last trading price                                                                                                                        |
| maker_fee_rate        | string         | false    | none         | Maker fee rate, negative values indicate rebates                                                                                          |
| taker_fee_rate        | string         | false    | none         | Taker fee rate                                                                                                                            |
| order_price_round     | string         | false    | none         | Minimum order price increment                                                                                                             |
| mark_price_round      | string         | false    | none         | Minimum mark price increment                                                                                                              |
| basis_rate            | string         | false    | none         | Fair basis rate                                                                                                                           |
| basis_value           | string         | false    | none         | Fair basis value                                                                                                                          |
| basis_impact_value    | string         | false    | none         | Funding used for calculating impact bid, ask price                                                                                        |
| settle_price          | string         | false    | none         | Settle price                                                                                                                              |
| settle_price_interval | integer        | false    | none         | Settle price update interval                                                                                                              |
| settle_price_duration | integer        | false    | none         | Settle price update duration in seconds                                                                                                   |
| expire_time           | integer(int64) | false    | none         | Contract expiry timestamp                                                                                                                 |
| risk_limit_base       | string         | false    | none         | Risk limit base                                                                                                                           |
| risk_limit_step       | string         | false    | none         | Step of adjusting risk limit                                                                                                              |
| risk_limit_max        | string         | false    | none         | Maximum risk limit the contract allowed                                                                                                   |
| order_size_min        | integer(int64) | false    | none         | Minimum order size allowed by the contract                                                                                                |
| order_size_max        | integer(int64) | false    | none         | Maximum order size allowed by the contract                                                                                                |
| order_price_deviate   | string         | false    | none         | Maximum allowed deviation between order price and current mark price. The order price `order_price` must satisfy the following condition: |

abs(order_price - mark_price) <= mark_price \* order_price_deviate | |
ref_discount_rate | string | false | none | Trading fee discount for referred
users | | ref_rebate_rate | string | false | none | Commission rate for
referrers | | orderbook_id | integer(int64) | false | none | Orderbook update ID
| | trade_id | integer(int64) | false | none | Current trade ID | | trade_size |
integer(int64) | false | none | Historical cumulative trading volume | |
position_size | integer(int64) | false | none | Current total long position size
| | config_change_time | number(double) | false | none | Last configuration
update time | | in_delisting | boolean | false | none | Contract is delisting |
| orders_limit | integer | false | none | Maximum number of pending orders |

#### [#](#enumerated-values-140) Enumerated Values

| Property  | Value        |
| --------- | ------------ |
| cycle     | WEEKLY       |
| cycle     | BI-WEEKLY    |
| cycle     | QUARTERLY    |
| cycle     | BI-QUARTERLY |
| type      | inverse      |
| type      | direct       |
| mark_type | internal     |
| mark_type | index        |

## [#](#debitfee) DebitFee

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#debitfee](https://www.gate.io/docs/developers/apiv4/en/#debitfee)

```
{
  "enabled": true
}

```

### [#](#properties-10) Properties

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#properties-10](https://www.gate.io/docs/developers/apiv4/en/#properties-10)

| Name    | Type    | Required | Restrictions | Description                         |
| ------- | ------- | -------- | ------------ | ----------------------------------- |
| enabled | boolean | true     | none         | Whether GT fee deduction is enabled |
