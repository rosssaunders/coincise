# POST /spot/orders

**Source:** [/spot/orders](https://www.gate.io/docs/developers/apiv4/en/#createorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-an-order) Create an order

`POST /spot/orders`

_Create an order_

Supports spot, margin, leverage, and cross-margin leverage orders. Use different
accounts through the `account` field. Default is `spot`, which means using the
spot account to place orders. If the user has a `unified` account, the default
is to place orders with the unified account.

When using leveraged account trading (i.e., when `account` is set to `margin`),
you can set `auto_borrow` to `true`. In case of insufficient account balance,
the system will automatically execute `POST /margin/uni/loans` to borrow the
insufficient amount. Whether assets obtained after leveraged order execution are
automatically used to repay borrowing orders of the isolated margin account
depends on the automatic repayment settings of the user's isolated margin
account. Account automatic repayment settings can be queried and set through
`/margin/auto_repay`.

When using unified account trading (i.e., when `account` is set to `unified`),
`auto_borrow` can also be enabled to realize automatic borrowing of insufficient
amounts. However, unlike the isolated margin account, whether unified account
orders are automatically repaid depends on the `auto_repay` setting when placing
the order. This setting only applies to the current order, meaning only assets
obtained after order execution will be used to repay borrowing orders of the
cross-margin account. Unified account ordering currently supports enabling both
`auto_borrow` and `auto_repay` simultaneously.

Auto repayment will be triggered when the order ends, i.e., when `status` is
`cancelled` or `closed`.

**Order Status**

The order status in pending orders is `open`, which remains `open` until all
quantity is filled. If fully filled, the order ends and status becomes `closed`.
If the order is cancelled before all transactions are completed, regardless of
partial fills, the status will become `cancelled`.

**Iceberg Orders**

`iceberg` is used to set the displayed quantity of iceberg orders and does not
support complete hiding. Note that hidden portions are charged according to the
taker's fee rate.

**Self-Trade Prevention**

Set `stp_act` to determine the self-trade prevention strategy to use

> Body parameter

```json
{
  "text": "t-abc123",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createorder-parameters)

| Name            | In     | Type    | Required | Description                                                                                                                                      |
| --------------- | ------ | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime  | header | string  | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body            | body   | object  | true     | none                                                                                                                                             |
| » text          | body   | string  | false    | User defined information. If not empty, must follow the rules below:                                                                             |
| » currency_pair | body   | string  | true     | Currency pair                                                                                                                                    |
| » type          | body   | string  | false    | Order Type                                                                                                                                       |
| » account       | body   | string  | false    | Account type, spot - spot account, margin - leveraged account, unified - unified account                                                         |
| » side          | body   | string  | true     | Buy or sell order                                                                                                                                |
| » amount        | body   | string  | true     | Trading quantity                                                                                                                                 |
| » price         | body   | string  | false    | Trading price, required when `type`\=`limit`                                                                                                     |
| » time_in_force | body   | string  | false    | Time in force                                                                                                                                    |
| » iceberg       | body   | string  | false    | Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all amount is not supported                                         |
| » auto_borrow   | body   | boolean | false    | Used in margin or cross margin trading to allow automatic loan of insufficient amount if balance is not enough                                   |
| » auto_repay    | body   | boolean | false    | Enable or disable automatic repayment for automatic borrow loan generated by cross margin order. Default is disabled. Note that:                 |
| » stp_act       | body   | string  | false    | Self-Trading Prevention Action. Users can use this field to set self-trade prevention strategies                                                 |
| » fee_discount  | body   | string  | false    | Fee rate discount                                                                                                                                |
| » action_mode   | body   | string  | false    | Processing Mode:                                                                                                                                 |

#### [#](#detailed-descriptions-13) Detailed descriptions

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

Besides user defined information, reserved contents are listed below, denoting
how the order is created:

- 101: from android
- 102: from IOS
- 103: from IPAD
- 104: from webapp
- 3: from web
- 2: from apiv2
- apiv4: from apiv4

**» type**: Order Type

- limit : Limit Order
- market : Market Order

**» amount**: Trading quantity When `type` is `limit`, it refers to the base
currency (the currency being traded), such as `BTC` in `BTC_USDT` When `type` is
`market`, it refers to different currencies based on the side:

- `side`: `buy` refers to quote currency, `BTC_USDT` means `USDT`
- `side`: `sell` refers to base currency, `BTC_USDT` means `BTC`

**» time_in_force**: Time in force

- gtc: GoodTillCancelled
- ioc: ImmediateOrCancelled, taker only
- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
  fee
- fok: FillOrKill, fill either completely or none Only `ioc` and `fok` are
  supported when `type`\=`market`

**» auto_repay**: Enable or disable automatic repayment for automatic borrow
loan generated by cross margin order. Default is disabled. Note that:

1.  This field is only effective for cross margin orders. Margin account does
    not support setting auto repayment for orders.
2.  `auto_borrow` and `auto_repay` can be both set to true in one order

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

**» action_mode**: Processing Mode: When placing an order, different fields are
returned based on action_mode. This field is only valid during the request and
is not included in the response result ACK: Asynchronous mode, only returns key
order fields RESULT: No clearing information FULL: Full mode (default)

#### [#](#enumerated-values-18) Enumerated Values

| Parameter       | Value  |
| --------------- | ------ |
| » type          | limit  |
| » type          | market |
| » side          | buy    |
| » side          | sell   |
| » time_in_force | gtc    |
| » time_in_force | ioc    |
| » time_in_force | poc    |
| » time_in_force | fok    |
| » stp_act       | cn     |
| » stp_act       | co     |
| » stp_act       | cb     |
| » stp_act       | \-     |

> Example responses

> ACK response body example

```json
{
  "id": "12332324",
  "text": "t-123456",
  "amend_text": "test2"
}
```

> RESULT response body example

```json
{
  "id": "12332324",
  "text": "t-123456",
  "create_time": "1548000000",
  "update_time": "1548000100",
  "create_time_ms": 1548000000123,
  "update_time_ms": 1548000100123,
  "currency_pair": "ETH_BTC",
  "status": "cancelled",
  "type": "limit",
  "account": "spot",
  "side": "buy",
  "iceberg": "0",
  "amount": "1",
  "price": "5.00032",
  "time_in_force": "gtc",
  "auto_borrow": false,
  "left": "0.5",
  "filled_total": "2.50016",
  "avg_deal_price": "5.00032",
  "stp_act": "cn",
  "finish_as": "stp",
  "stp_id": 10240
}
```

> FULL response body example

```json
{
  "id": "1852454420",
  "text": "t-abc123",
  "amend_text": "-",
  "create_time": "1710488334",
  "update_time": "1710488334",
  "create_time_ms": 1710488334073,
  "update_time_ms": 1710488334074,
  "status": "closed",
  "currency_pair": "BTC_USDT",
  "type": "limit",
  "account": "unified",
  "side": "buy",
  "amount": "0.001",
  "price": "65000",
  "time_in_force": "gtc",
  "iceberg": "0",
  "left": "0",
  "filled_amount": "0.001",
  "fill_price": "63.4693",
  "filled_total": "63.4693",
  "avg_deal_price": "63469.3",
  "fee": "0.00000022",
  "fee_currency": "BTC",
  "point_fee": "0",
  "gt_fee": "0",
  "gt_maker_fee": "0",
  "gt_taker_fee": "0",
  "gt_discount": false,
  "rebated_fee": "0",
  "rebated_fee_currency": "USDT",
  "finish_as": "filled"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createorder-responses](https://www.gate.io/docs/developers/apiv4/en/#createorder-responses)

| Status | Meaning                                                                         | Description   | Schema |
| ------ | ------------------------------------------------------------------------------- | ------------- | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order created | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createorder-responseschema)

Status Code **201**

_Spot order details_

| Name   | Type   | Description                                                          |
| ------ | ------ | -------------------------------------------------------------------- |
| » id   | string | Order ID                                                             |
| » text | string | User defined information. If not empty, must follow the rules below: |

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)

Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- 101: from android  
\- 102: from IOS  
\- 103: from IPAD  
\- 104: from webapp  
\- 3: from web  
\- 2: from apiv2  
\- apiv4: from apiv4 | | » amend_text | string | The custom data that the user
remarked when amending the order | | » create_time | string | Creation time of
order | | » update_time | string | Last modification time of order | | »
create_time_ms | integer(int64) | Creation time of order (in milliseconds) | | »
update_time_ms | integer(int64) | Last modification time of order (in
milliseconds) | | » status | string | Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | » currency_pair | string | Currency pair | | »
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | » account | string | Account type, spot - spot
account, margin - leveraged account, unified - unified account | | » side |
string | Buy or sell order | | » amount | string | Trading quantity  
When `type` is `limit`, it refers to the base currency (the currency being
traded), such as `BTC` in `BTC_USDT`  
When `type` is `market`, it refers to different currencies based on the side:  
\- `side`: `buy` refers to quote currency, `BTC_USDT` means `USDT`  
\- `side`: `sell` refers to base currency, `BTC_USDT` means `BTC` | | » price |
string | Trading price, required when `type`\=`limit` | | » time_in_force |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none  
Only `ioc` and `fok` are supported when `type`\=`market` | | » iceberg | string
| Amount to display for the iceberg order. Null or 0 for normal orders. Hiding
all amount is not supported | | » auto_borrow | boolean | Used in margin or
cross margin trading to allow automatic loan of insufficient amount if balance
is not enough | | » auto_repay | boolean | Enable or disable automatic repayment
for automatic borrow loan generated by cross margin order. Default is disabled.
Note that:

1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` can be both set to true in one order | | »
left | string | Amount left to fill | | » filled_amount | string | Amount filled
| | » fill_price | string | Total filled in quote currency. Deprecated in favor
of `filled_total` | | » filled_total | string | Total filled in quote currency |
| » avg_deal_price | string | Average fill price | | » fee | string | Fee
deducted | | » fee_currency | string | Fee currency unit | | » point_fee |
string | Points used to deduct fee | | » gt_fee | string | GT used to deduct fee
| | » gt_maker_fee | string | GT amount used to deduct maker fee | | »
gt_taker_fee | string | GT amount used to deduct taker fee | | » gt_discount |
boolean | Whether GT fee deduction is enabled | | » rebated_fee | string |
Rebated fee | | » rebated_fee_currency | string | Rebated fee currency unit | |
» stp_id | integer | Orders between users in the same `stp_id` group are not
allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | » stp_act | string | Self-Trading Prevention Action. Users can
use this field to set self-trade prevention strategies

1\. After users join the `STP Group`, they can pass `stp_act` to limit the
user's self-trade prevention strategy. If `stp_act` is not passed, the default
is `cn` strategy.  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter.  
3\. If the user did not use `stp_act` when placing the order, `stp_act` will
return '-'

\- cn: Cancel newest, cancel new orders and keep old ones  
\- co: Cancel oldest, cancel old orders and keep new ones  
\- cb: Cancel both, both old and new orders will be cancelled | | » finish_as |
string | Order completion statuses include:

\- open: Awaiting processing  
\- filled: Fully filled  
\- cancelled: Cancelled by user  
\- liquidate_cancelled: Cancelled due to liquidation  
\- small: Order quantity too small  
\- depth_not_enough: Cancelled due to insufficient market depth  
\- trader_not_enough: Cancelled due to insufficient counterparty  
\- ioc: Not immediately filled because tif is set to ioc  
\- poc: Not met the order poc  
\- fok: Not fully filled immediately because tif is set to fok  
\- stp: Cancelled due to self-trade prevention  
\- unknown: Unknown | | » fee_discount | string | Fee rate discount | | »
action_mode | string | Processing Mode:  
When placing an order, different fields are returned based on action_mode. This
field is only valid during the request and is not included in the response
result  
ACK: Asynchronous mode, only returns key order fields  
RESULT: No clearing information  
FULL: Full mode (default) |

#### [#](#enumerated-values-19) Enumerated Values

| Property      | Value               |
| ------------- | ------------------- |
| status        | open                |
| status        | closed              |
| status        | cancelled           |
| type          | limit               |
| type          | market              |
| side          | buy                 |
| side          | sell                |
| time_in_force | gtc                 |
| time_in_force | ioc                 |
| time_in_force | poc                 |
| time_in_force | fok                 |
| stp_act       | cn                  |
| stp_act       | co                  |
| stp_act       | cb                  |
| stp_act       | \-                  |
| finish_as     | open                |
| finish_as     | filled              |
| finish_as     | cancelled           |
| finish_as     | liquidate_cancelled |
| finish_as     | depth_not_enough    |
| finish_as     | trader_not_enough   |
| finish_as     | small               |
| finish_as     | ioc                 |
| finish_as     | poc                 |
| finish_as     | fok                 |
| finish_as     | stp                 |
| finish_as     | unknown             |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-orders) List orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-orders](https://www.gate.io/docs/developers/apiv4/en/#list-orders)

> Code samples
