# POST /futures/{settle}/batch_orders

**Source:** [/futures/{settle}/batch_orders](https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#place-batch-futures-orders) Place batch futures orders

`POST /futures/{settle}/batch_orders`

_Place batch futures orders_

- Up to 10 orders per request
- If any of the order's parameters are missing or in the wrong format, all of
  them will not be executed, and a http status 400 error will be returned
  directly
- If the parameters are checked and passed, all are executed. Even if there is a
  business logic error in the middle (such as insufficient funds), it will not
  affect other execution orders
- The returned result is in array format, and the order corresponds to the
  orders in the request body
- In the returned result, the `succeeded` field of type bool indicates whether
  the execution was successful or not
- If the execution is successful, the normal order content is included; if the
  execution fails, the `label` field is included to indicate the cause of the
  error
- In the rate limiting, each order is counted individually

> Body parameter

```json
[
  {
    "contract": "BTC_USDT",
    "size": 6024,
    "iceberg": 0,
    "price": "3765",
    "tif": "gtc",
    "text": "t-my-custom-id",
    "stp_act": "-"
  }
]
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-parameters)

| Name           | In     | Type                                         | Required | Description                                                                                                                                      |
| -------------- | ------ | -------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string                                       | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array\[[FuturesOrder](#schemafuturesorder)\] | true     | none                                                                                                                                             |
| settle         | path   | string                                       | true     | Settle currency                                                                                                                                  |

#### [#](#enumerated-values-62) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "succeeded": true,
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-responses](https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request execution completed | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createbatchfuturesorder-responseschema)

Status Code **200**

| Name           | Type           | Description                                                                 |
| -------------- | -------------- | --------------------------------------------------------------------------- |
| _None_         | array          | \[Futures order details\]                                                   |
| » _None_       | object         | Futures order details                                                       |
| »» succeeded   | boolean        | Request execution result                                                    |
| »» label       | string         | Error label, only exists if execution fails                                 |
| »» detail      | string         | Error detail, only present if execution failed and details need to be given |
| »» id          | integer(int64) | Futures order ID                                                            |
| »» user        | integer        | User ID                                                                     |
| »» create_time | number(double) | Creation time of order                                                      |
| »» finish_time | number(double) | Order finished time. Not returned if order is open                          |
| »» finish_as   | string         | How the order was finished:                                                 |

\- filled: all filled  
\- cancelled: manually cancelled  
\- liquidated: cancelled because of liquidation  
\- ioc: time in force is `IOC`, finish immediately  
\- auto_deleveraged: finished by ADL  
\- reduce_only: cancelled because of increasing position while `reduce-only`
set  
\- position_closed: cancelled because the position was closed  
\- reduce_out: only reduce positions by excluding hard-to-fill orders  
\- stp: cancelled because self trade prevention | | »» status | string | Order
status

\- `open`: Pending  
\- `finished`: Completed | | »» contract | string | Futures contract | | »» size
| integer(int64) | Required. Trading quantity. Positive for buy, negative for
sell. Set to 0 for close position orders. | | »» iceberg | integer(int64) |
Display size for iceberg orders. 0 for non-iceberg orders. Note that hidden
portions are charged taker fees. | | »» price | string | Order price. Price of 0
with `tif` set to `ioc` represents a market order. | | »» is_close | boolean |
Is the order to close position | | »» is_reduce_only | boolean | Is the order
reduce-only | | »» is_liq | boolean | Is the order for liquidation | | »» tif |
string | Time in force

\- gtc: GoodTillCancelled  
\- ioc: ImmediateOrCancelled, taker only  
\- poc: PendingOrCancelled, makes a post-only order that always enjoys a maker
fee  
\- fok: FillOrKill, fill either completely or none | | »» left | integer(int64)
| Unfilled quantity | | »» fill_price | string | Fill price | | »» text | string
| User defined information. If not empty, must follow the rules below:

1\. prefixed with `t-`  
2\. no longer than 28 bytes without `t-` prefix  
3\. can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.)  
Besides user defined information, reserved contents are listed below, denoting
how the order is created:

\- web: from web  
\- api: from API  
\- app: from mobile phones  
\- auto_deleveraging: from ADL  
\- liquidation: from liquidation  
\- insurance: from insurance | | »» tkfr | string | Taker fee | | »» mkfr |
string | Maker fee | | »» refu | integer | Referrer user ID | | »» stp_act |
string | Self-Trading Prevention Action. Users can use this field to set
self-trade prevention strategies

1\. After users join the `STP Group`, they can pass `stp_act` to limit the
user's self-trade prevention strategy. If `stp_act` is not passed, the default
is `cn` strategy.  
2\. When the user does not join the `STP group`, an error will be returned when
passing the `stp_act` parameter.  
3\. If the user did not use `stp_act` when placing the order, `stp_act` will
return '-'

\- cn: Cancel newest, cancel new orders and keep old ones  
\- co: Cancel oldest, cancel old orders and keep new ones  
\- cb: Cancel both, both old and new orders will be cancelled | | »» stp_id |
integer | Orders between users in the same `stp_id` group are not allowed to be
self-traded

1\. If the `stp_id` of two orders being matched is non-zero and equal, they will
not be executed. Instead, the corresponding strategy will be executed based on
the `stp_act` of the taker.  
2\. `stp_id` returns `0` by default for orders that have not been set for
`STP group` |

#### [#](#enumerated-values-63) Enumerated Values

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
| stp_act   | co               |
| stp_act   | cn               |
| stp_act   | cb               |
| stp_act   | \-               |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-single-order-details-2) Query single order details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-order-details-2](https://www.gate.io/docs/developers/apiv4/en/#query-single-order-details-2)

> Code samples
