# DELETE /delivery/{settle}/orders

**Source:**
[/delivery/{settle}/orders](https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-all-orders-with-open-status-2) Cancel all orders with 'open' status

`DELETE /delivery/{settle}/orders`

_Cancel all orders with 'open' status_

Zero-fill orders cannot be retrieved 10 minutes after order cancellation

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorders-parameters)

| Name     | In    | Type   | Required | Description                                                  |
| -------- | ----- | ------ | -------- | ------------------------------------------------------------ |
| contract | query | string | true     | Futures contract                                             |
| side     | query | string | false    | Specify all bids or all asks, both included if not specified |
| settle   | path  | string | true     | Settle currency                                              |

#### [#](#enumerated-values-103) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| side      | ask   |
| side      | bid   |
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
[https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorders-responses](https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorders-responses)

| Status | Meaning                                                                    | Description                   | Schema                                  |
| ------ | -------------------------------------------------------------------------- | ----------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation successful | \[[FuturesOrder](#schemafuturesorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-single-order-details-3) Query single order details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-order-details-3](https://www.gate.io/docs/developers/apiv4/en/#query-single-order-details-3)

> Code samples
