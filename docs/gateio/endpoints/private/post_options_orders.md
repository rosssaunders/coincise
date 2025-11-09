# POST /options/orders

**Source:**
[/options/orders](https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-an-options-order) Create an options order

`POST /options/orders`

_Create an options order_

> Body parameter

```
{
  "size": -1,
  "iceberg": 0,
  "contract": "BTC_USDT-20210916-5000-C",
  "text": "-",
  "tif": "gtc",
  "price": "100"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-parameters)

| Name          | In   | Type           | Required | Description                                                                                                  |
| ------------- | ---- | -------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| body          | body | object         | true     | none                                                                                                         |
| » contract    | body | string         | true     | Options identifier                                                                                           |
| » size        | body | integer(int64) | true     | Required. Trading quantity. Positive for buy, negative for sell. Set to 0 for close position orders.         |
| » iceberg     | body | integer(int64) | false    | Display size for iceberg orders. 0 for non-iceberg orders. Note that hidden portions are charged taker fees. |
| » price       | body | string         | false    | Order price. Price of 0 with `tif` set as `ioc` represents market order (quote currency)                     |
| » close       | body | boolean        | false    | Set as `true` to close the position, with `size` set to 0                                                    |
| » reduce_only | body | boolean        | false    | Set as `true` to be reduce-only order                                                                        |
| » mmp         | body | boolean        | false    | When set to true, it is an MMP order                                                                         |
| » tif         | body | string         | false    | Time in force strategy. Market orders currently only support IOC mode                                        |
| » text        | body | string         | false    | User defined information. If not empty, must follow the rules below:                                         |

#### [#](#detailed-descriptions-49) Detailed descriptions

**» tif**: Time in force strategy. Market orders currently only support IOC mode

- gtc: Good Till Cancelled
- ioc: Immediate Or Cancelled, execute immediately or cancel, taker only
- poc: Pending Or Cancelled, passive order, maker only

**» text**: User defined information. If not empty, must follow the rules below:

1.  prefixed with `t-`
2.  no longer than 28 bytes without `t-` prefix
3.  can only include 0-9, A-Z, a-z, underscore(\_), hyphen(-) or dot(.) Besides
    user defined information, reserved contents are listed below, denoting how
    the order is created:

- web: from web
- api: from API
- app: from mobile phones
- auto_deleveraging: from ADL
- liquidation: from liquidation
- insurance: from insurance

#### [#](#enumerated-values-124) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| » tif     | gtc   |
| » tif     | ioc   |
| » tif     | poc   |

> Example responses

> 201 Response

```
{
  "status": "finished",
  "size": -1,
  "id": 2,
  "iceberg": 0,
  "is_liq": false,
  "is_close": false,
  "is_mmp": false,
  "contract": "BTC_USDT-20210916-5000-C",
  "text": "-",
  "fill_price": "100",
  "finish_as": "filled",
  "left": 0,
  "tif": "gtc",
  "is_reduce_only": false,
  "create_time": 1631763361,
  "finish_time": 1631763397,
  "price": "100"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-responses](https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-responses)

| Status | Meaning                                                                         | Description  | Schema |
| ------ | ------------------------------------------------------------------------------- | ------------ | ------ |
| 201    | [Created (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.2) | Order detail | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-responseschema](https://www.gate.io/docs/developers/apiv4/en/#createoptionsorder-responseschema)

Status Code **201**

_Options order details_

| Name          | Type           | Description                                        |
| ------------- | -------------- | -------------------------------------------------- |
| » id          | integer(int64) | Options order ID                                   |
| » user        | integer        | User ID                                            |
| » create_time | number(double) | Creation time of order                             |
| » finish_time | number(double) | Order finished time. Not returned if order is open |
| » finish_as   | string         | Order finish reason:                               |

\- filled: Fully filled  
\- cancelled: User cancelled  
\- liquidated: Cancelled due to liquidation  
\- ioc: Not immediately fully filled due to IOC time-in-force setting  
\- auto_deleveraged: Cancelled due to auto-deleveraging  
\- reduce_only: Cancelled due to position increase while reduce-only is set  
\- position_closed: Cancelled because the position was closed  
\- reduce_out: Only reduce positions by excluding hard-to-fill orders  
\- mmp_cancelled: Cancelled by MMP | | » status | string | Order status

\- `open`: Pending  
\- `finished`: Completed | | » contract | string | Options identifier | | » size
| integer(int64) | Required. Trading quantity. Positive for buy, negative for
sell. Set to 0 for close position orders. | | » iceberg | integer(int64) |
Display size for iceberg orders. 0 for non-iceberg orders. Note that hidden
portions are charged taker fees. | | » price | string | Order price. Price of 0
with `tif` set as `ioc` represents market order (quote currency) | | » is_close
| boolean | Is the order to close position | | » is_reduce_only | boolean | Is
the order reduce-only | | » is_liq | boolean | Is the order for liquidation | |
» is_mmp | boolean | Whether it is an MMP order. Corresponds to `mmp` in the
request | | » tif | string | Time in force strategy. Market orders currently
only support IOC mode

\- gtc: Good Till Cancelled  
\- ioc: Immediate Or Cancelled, execute immediately or cancel, taker only  
\- poc: Pending Or Cancelled, passive order, maker only | | » left |
integer(int64) | Unfilled quantity | | » fill_price | string | Fill price | | »
text | string | User defined information. If not empty, must follow the rules
below:

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
\- insurance: from insurance | | » tkfr | string | Taker fee | | » mkfr | string
| Maker fee | | » refu | integer | Referrer user ID | | » refr | string |
Referrer rebate |

#### [#](#enumerated-values-125) Enumerated Values

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
| finish_as | mmp_cancelled    |
| status    | open             |
| status    | finished         |
| tif       | gtc              |
| tif       | ioc              |
| tif       | poc              |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-options-orders) List options orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-options-orders](https://www.gate.io/docs/developers/apiv4/en/#list-options-orders)

> Code samples
