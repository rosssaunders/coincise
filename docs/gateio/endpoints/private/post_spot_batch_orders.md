# POST /spot/batch_orders

**Source:** [/spot/batch_orders](https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#batch-place-orders) Batch place orders

`POST /spot/batch_orders`

_Batch place orders_

Batch order requirements:

1.  Custom order field `text` is required
2.  At most 4 trading pairs, maximum 10 orders each, are allowed in one request
3.  No mixture of spot orders and margin orders, i.e. `account` must be
    identical for all orders

> Body parameter

```json
[
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
]
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-parameters)

| Name           | In     | Type   | Required | Description                                                                                                                                      |
| -------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array  | true     | none                                                                                                                                             |

> Example responses

> 200 Response

```json
[
  {
    "order_id": "12332324",
    "amend_text": "t-123456",
    "text": "t-123456",
    "succeeded": true,
    "label": "",
    "message": "",
    "id": "12332324",
    "create_time": "1548000000",
    "update_time": "1548000100",
    "create_time_ms": 1548000000123,
    "update_time_ms": 1548000100123,
    "currency_pair": "ETC_BTC",
    "status": "cancelled",
    "type": "limit",
    "account": "spot",
    "side": "buy",
    "amount": "1",
    "price": "5.00032",
    "time_in_force": "gtc",
    "iceberg": "0",
    "left": "0.5",
    "filled_amount": "1.242",
    "filled_total": "2.50016",
    "avg_deal_price": "5.00032",
    "fee": "0.005",
    "fee_currency": "ETH",
    "point_fee": "0",
    "gt_fee": "0",
    "gt_discount": false,
    "rebated_fee": "0",
    "rebated_fee_currency": "BTC",
    "stp_act": "cn",
    "finish_as": "stp",
    "stp_id": 10240
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-responses](https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request execution completed | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createbatchorders-responseschema)

Status Code **200**

| Name          | Type   | Description                                                                                                          |
| ------------- | ------ | -------------------------------------------------------------------------------------------------------------------- |
| _None_        | array  | \[Batch order details\]                                                                                              |
| » _None_      | object | Batch order details                                                                                                  |
| »» order_id   | string | Order ID                                                                                                             |
| »» amend_text | string | The custom data that the user remarked when amending the order                                                       |
| »» text       | string | Order custom information. Users can set custom ID with this field. Custom fields must meet the following conditions: |

1\. Must start with `t-`  
2\. Excluding `t-`, length cannot exceed 28 bytes  
3\. Can only contain numbers, letters, underscore(\_), hyphen(-) or dot(.) | |
»» succeeded | boolean | Request execution result | | »» label | string | Error
label, if any, otherwise an empty string | | »» message | string | Detailed
error message, if any, otherwise an empty string | | »» id | string | Order ID |
| »» create_time | string | Creation time of order | | »» update_time | string |
Last modification time of order | | »» create_time_ms | integer(int64) |
Creation time of order (in milliseconds) | | »» update_time_ms | integer(int64)
| Last modification time of order (in milliseconds) | | »» status | string |
Order status

\- `open`: to be filled  
\- `closed`: filled  
\- `cancelled`: cancelled | | »» currency_pair | string | Currency pair | | »»
type | string | Order Type

\- limit : Limit Order  
\- market : Market Order | | »» account | string | Account type, spot - spot
account, margin - leveraged account, unified - unified account | | »» side |
string | Buy or sell order | | »» amount | string | Trade amount | | »» price |
string | Order price | | »» time_in_force | string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | »» iceberg | string |
Amount to display for the iceberg order. Null or 0 for normal orders. Hiding all
amount is not supported | | »» auto_repay | boolean | Enable or disable
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
fee | | »» gt_discount | boolean | Whether GT fee deduction is enabled | | »»
rebated_fee | string | Rebated fee | | »» rebated_fee_currency | string |
Rebated fee currency unit | | »» stp_id | integer | Orders between users in the
same `stp_id` group are not allowed to be self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` | | »» stp_act | string | Self-Trading Prevention Action. Users can
use this field to set self-trade prevetion strategies

1\. After users join the `STP Group`, he can pass `stp_act` to limit the user's
self-trade prevetion strategy. If `stp_act` is not passed, the default is `cn`
strategy。  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter。  
3\. If the user did not use 'stp_act' when placing the order, 'stp_act' will
return '-'

\- cn: Cancel newest, Cancel new orders and keep old ones  
\- co: Cancel oldest, new ones  
\- cb: Cancel both, Both old and new orders will be cancelled | | »» finish_as |
string | How the order was finished.

\- open: processing  
\- filled: filled totally  
\- cancelled: manually cancelled  
\- ioc: time in force is `IOC`, finish immediately  
\- stp: cancelled because self trade prevention |

#### [#](#enumerated-values-15) Enumerated Values

| Property      | Value        |
| ------------- | ------------ |
| status        | open         |
| status        | closed       |
| status        | cancelled    |
| type          | limit        |
| type          | market       |
| account       | spot         |
| account       | margin       |
| account       | cross_margin |
| account       | unified      |
| side          | buy          |
| side          | sell         |
| time_in_force | gtc          |
| time_in_force | ioc          |
| time_in_force | poc          |
| time_in_force | fok          |
| stp_act       | cn           |
| stp_act       | co           |
| stp_act       | cb           |
| stp_act       | \-           |
| finish_as     | open         |
| finish_as     | filled       |
| finish_as     | cancelled    |
| finish_as     | ioc          |
| finish_as     | stp          |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-all-open-orders) List all open orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-all-open-orders](https://www.gate.io/docs/developers/apiv4/en/#list-all-open-orders)

> Code samples
