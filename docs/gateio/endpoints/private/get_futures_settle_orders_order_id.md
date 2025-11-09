# GET /futures/{settle}/orders/{order_id}

**Source:** [/futures/{settle}/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getfuturesorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-order-details-2) Query single order details

`GET /futures/{settle}/orders/{order_id}`

_Query single order details_

- Zero-fill order cannot be retrieved for 10 minutes after cancellation
- Historical orders, by default, only data within the past 6 months is
  supported.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#getfuturesorder-parameters)

| Name     | In   | Type   | Required | Description                                               |
| -------- | ---- | ------ | -------- | --------------------------------------------------------- |
| settle   | path | string | true     | Settle currency                                           |
| order_id | path | string | true     | Order ID returned, or user custom ID(i.e., `text` field). |

#### [#](#detailed-descriptions-29) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. finished, it can be checked within 60 seconds after the end of the
order. After that, only order ID is accepted.

#### [#](#enumerated-values-64) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

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
[https://www.gate.io/docs/developers/apiv4/en/#getfuturesorder-responses](https://www.gate.io/docs/developers/apiv4/en/#getfuturesorder-responses)

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-single-order-2) Cancel single order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-single-order-2](https://www.gate.io/docs/developers/apiv4/en/#cancel-single-order-2)

> Code samples
