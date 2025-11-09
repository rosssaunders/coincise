# DELETE /futures/{settle}/orders

**Source:** [/futures/{settle}/orders](https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-all-orders-with-open-status) Cancel all orders with 'open' status

`DELETE /futures/{settle}/orders`

_Cancel all orders with 'open' status_

Zero-fill orders cannot be retrieved 10 minutes after order cancellation

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorders-parameters)

| Name                | In     | Type    | Required | Description                                                                                                                                              |
| ------------------- | ------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| x-gate-exptime      | header | string  | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected         |
| contract            | query  | string  | true     | Futures contract                                                                                                                                         |
| side                | query  | string  | false    | Specify all buy orders or all sell orders, both are included if not specified. Set to bid to cancel all buy orders, set to ask to cancel all sell orders |
| exclude_reduce_only | query  | boolean | false    | 是否排除仅减仓Order                                                                                                                                      |
| text                | query  | string  | false    | 取消Order的Note信息                                                                                                                                      |
| settle              | path   | string  | true     | Settle currency                                                                                                                                          |

#### [#](#enumerated-values-60) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorders-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelfuturesorders-responses)

| Status | Meaning                                                                    | Description                   | Schema                                  |
| ------ | -------------------------------------------------------------------------- | ----------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation successful | \[[FuturesOrder](#schemafuturesorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-futures-order-list-by-time-range) Query futures order list by time range

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-futures-order-list-by-time-range](https://www.gate.io/docs/developers/apiv4/en/#query-futures-order-list-by-time-range)

> Code samples
