# GET /spot/orders

**Source:** [/spot/orders](https://www.gate.io/docs/developers/apiv4/en/#listorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#list-orders) List orders

`GET /spot/orders`

_List orders_

`status` is set to `open`, that is, when querying the pending order list, only
`page` and `limit` paging control are supported. `limit` The maximum setting is
only 100. Does not support `side` and `from`, `to` parameters for querying by
time range.

`status` when querying historical orders, in addition to paging query, it also
supports `from` and `to` query by time range. In addition, it also supports
setting the `side` parameter to filter unilateral history.

The parameters for time range filtering are all processed according to the
**end** time of the order.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listorders-parameters)

| Name          | In    | Type           | Required | Description                                                                                |
| ------------- | ----- | -------------- | -------- | ------------------------------------------------------------------------------------------ |
| currency_pair | query | string         | true     | Query by specified currency pair. Required for open orders, optional for filled orders     |
| status        | query | string         | true     | List orders based on status                                                                |
| page          | query | integer(int32) | false    | Page number                                                                                |
| limit         | query | integer        | false    | Maximum number of records to be returned. If `status` is `open`, maximum of `limit` is 100 |
| account       | query | string         | false    | Specify query account                                                                      |
| from          | query | integer(int64) | false    | Start timestamp for the query                                                              |
| to            | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                     |
| side          | query | string         | false    | Specify all bids or all asks, both included if not specified                               |

#### [#](#detailed-descriptions-14) Detailed descriptions

**status**: List orders based on status

`open` - order is waiting to be filled `finished` - order has been filled or
cancelled

> Example responses

> 200 Response

```
[
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listorders-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listorders-responseschema)

Status Code **200**

| Name     | Type   | Description                                                          |
| -------- | ------ | -------------------------------------------------------------------- |
| _None_   | array  | \[Spot order details\]                                               |
| » _None_ | object | Spot order details                                                   |
| »» id    | string | Order ID                                                             |
| »» text  | string | User defined information. If not empty, must follow the rules below: |

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
\- apiv4: from apiv4 | | »» amend_text | string | The custom data that the user
remarked when amending the order | | »» create_time | string | Creation time of
order | | »» update_time | string | Last modification time of order | | »»
create_time_ms | integer(int64) | Creation time of order (in milliseconds) | |
»» update_time_ms | integer(int64) | Last modification time of order (in
milliseconds) | | »» status | string | Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | »» currency_pair | string | Currency pair | | »»
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | »» account | string | Account type, spot - spot
account, margin - leveraged account, unified - unified account | | »» side |
string | Buy or sell order | | »» amount | string | Trading quantity  
When `type` is `limit`, it refers to the base currency (the currency being
traded), such as `BTC` in `BTC_USDT`  
When `type` is `market`, it refers to different currencies based on the side:  
\- `side`: `buy` refers to quote currency, `BTC_USDT` means `USDT`  
\- `side`: `sell` refers to base currency, `BTC_USDT` means `BTC` | | »» price |
string | Trading price, required when `type`\=`limit` | | »» time_in_force |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none  
Only `ioc` and `fok` are supported when `type`\=`market` | | »» iceberg | string
| Amount to display for the iceberg order. Null or 0 for normal orders. Hiding
all amount is not supported | | »» auto_repay | boolean | Enable or disable
automatic repayment for automatic borrow loan generated by cross margin order.
Default is disabled. Note that:

1\. This field is only effective for cross margin orders. Margin account does
not support setting auto repayment for orders.  
2\. `auto_borrow` and `auto_repay` can be both set to true in one order | | »»
left | string | Amount left to fill | | »» filled_amount | string | Amount
filled | | »» fill_price | string | Total filled in quote currency. Deprecated
in favor of `filled_total` | | »» filled_total | string | Total filled in quote
currency | | »» avg_deal_price | string | Average fill price | | »» fee | string
| Fee deducted | | »» fee_currency | string | Fee currency unit | | »» point_fee
| string | Points used to deduct fee | | »» gt_fee | string | GT used to deduct
fee | | »» gt_maker_fee | string | GT amount used to deduct maker fee | | »»
gt_taker_fee | string | GT amount used to deduct taker fee | | »» gt_discount |
boolean | Whether GT fee deduction is enabled | | »» rebated_fee | string |
Rebated fee | | »» rebated_fee_currency | string | Rebated fee currency unit | |
»» stp_id | integer | Orders between users in the same `stp_id` group are not
allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | »» stp_act | string | Self-Trading Prevention Action. Users can
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
\- cb: Cancel both, both old and new orders will be cancelled | | »» finish_as |
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
\- unknown: Unknown | | »» fee_discount | string | Fee rate discount |

#### [#](#enumerated-values-20) Enumerated Values

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

## [#](#cancel-all-open-orders-in-specified-currency-pair) Cancel all `open` orders in specified currency pair

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-all-open-orders-in-specified-currency-pair](https://www.gate.io/docs/developers/apiv4/en/#cancel-all-open-orders-in-specified-currency-pair)

> Code samples
