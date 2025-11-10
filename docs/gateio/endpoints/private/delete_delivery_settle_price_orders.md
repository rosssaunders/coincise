# DELETE /delivery/{settle}/price_orders

**Source:**
[/delivery/{settle}/price_orders](https://www.gate.io/docs/developers/apiv4/en/#cancelpricetriggereddeliveryorderlist-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-all-auto-orders-3) Cancel all auto orders

`DELETE /delivery/{settle}/price_orders`

_Cancel all auto orders_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelpricetriggereddeliveryorderlist-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelpricetriggereddeliveryorderlist-parameters)

| Name     | In    | Type   | Required | Description      |
| -------- | ----- | ------ | -------- | ---------------- |
| contract | query | string | true     | Futures contract |
| settle   | path  | string | true     | Settle currency  |

#### [#](#enumerated-values-115) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "initial": {
      "contract": "BTC_USDT",
      "size": 100,
      "price": "5.03"
    },
    "trigger": {
      "strategy_type": 0,
      "price_type": 0,
      "price": "3000",
      "rule": 1,
      "expiration": 86400
    },
    "id": 1283293,
    "user": 1234,
    "create_time": 1514764800,
    "finish_time": 1514764900,
    "trade_id": 13566,
    "status": "finished",
    "finish_as": "cancelled",
    "reason": "",
    "order_type": "close-long-order"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelpricetriggereddeliveryorderlist-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelpricetriggereddeliveryorderlist-responses)

| Status | Meaning                                                                    | Description                                                                         | Schema                                                              |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted and processed, success determined by order list | \[[FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-single-auto-order-details-3) Query single auto order details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-auto-order-details-3](https://www.gate.io/docs/developers/apiv4/en/#query-single-auto-order-details-3)

> Code samples
