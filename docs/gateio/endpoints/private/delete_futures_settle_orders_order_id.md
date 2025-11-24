# DELETE /futures/{settle}/orders/{order_id}

**Source:** [/futures/{settle}/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-single-order-2) Cancel single order

`DELETE /futures/{settle}/orders/{order_id}`

_Cancel single order_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorder-parameters)

| Name           | In     | Type   | Required | Description                                                                                                                                      |
| -------------- | ------ | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| settle         | path   | string | true     | Settle currency                                                                                                                                  |
| order_id       | path   | string | true     | Order ID returned, or user custom ID(i.e., `text` field).                                                                                        |

#### [#](#detailed-descriptions-30) Detailed descriptions

**order_id**: Order ID returned, or user custom ID(i.e., `text` field).
Operations based on custom ID can only be checked when the order is in
orderbook. finished, it can be checked within 60 seconds after the end of the
order. After that, only order ID is accepted.

#### [#](#enumerated-values-65) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
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
[https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorder-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorder-responses)

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#amend-single-order-2) Amend single order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#amend-single-order-2](https://www.gate.io/docs/developers/apiv4/en/#amend-single-order-2)

> Code samples
