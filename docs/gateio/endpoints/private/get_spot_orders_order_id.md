# GET /spot/orders/{order_id}

**Source:** [/spot/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-order-details) Query single order details

`GET /spot/orders/{order_id}`

_Query single order details_

By default, queries orders for spot, unified account, and isolated margin
accounts.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#getorder-parameters)

| Name          | In    | Type   | Required | Description                                                                                                                                                  |
| ------------- | ----- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| order_id      | path  | string | true     | The order ID returned when the order was successfully created or the custom ID specified by the user's creation (i.e. the `text` field).                     |
| currency_pair | query | string | true     | Specify the trading pair to query. This field is required when querying pending order records. This field can be omitted when querying filled order records. |
| account       | query | string | false    | Specify query account                                                                                                                                        |

#### [#](#detailed-descriptions-16) Detailed descriptions

**order_id**: The order ID returned when the order was successfully created or
the custom ID specified by the user's creation (i.e. the `text` field).
Operations based on custom IDs can only be checked in pending orders. Only order
ID can be used after the order is finished (transaction/cancel)

> Example responses

> 200 Response

```
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
[https://www.gate.io/docs/developers/apiv4/en/#getorder-responses](https://www.gate.io/docs/developers/apiv4/en/#getorder-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Detail retrieved | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getorder-responseschema)

Status Code **200**

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
all amount is not supported | | » auto_repay | boolean | Enable or disable
automatic repayment for automatic borrow loan generated by cross margin order.
Default is disabled. Note that:

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
\- unknown: Unknown | | » fee_discount | string | Fee rate discount |

#### [#](#enumerated-values-22) Enumerated Values

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

## [#](#amend-single-order) Amend single order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#amend-single-order](https://www.gate.io/docs/developers/apiv4/en/#amend-single-order)

> Code samples
