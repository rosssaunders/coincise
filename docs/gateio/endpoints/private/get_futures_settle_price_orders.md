# GET /futures/{settle}/price_orders

**Source:** [/futures/{settle}/price_orders](https://www.gate.io/docs/developers/apiv4/en/#listpricetriggeredorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-auto-order-list) Query auto order list

`GET /futures/{settle}/price_orders`

_Query auto order list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listpricetriggeredorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listpricetriggeredorders-parameters)

| Name     | In    | Type    | Required | Description                                             |
| -------- | ----- | ------- | -------- | ------------------------------------------------------- |
| status   | query | string  | true     | Query order list based on status                        |
| contract | query | string  | false    | Futures contract, return related data only if specified |
| limit    | query | integer | false    | Maximum number of records returned in a single list     |
| offset   | query | integer | false    | List offset, starting from 0                            |
| settle   | path  | string  | true     | Settle currency                                         |

#### [#](#enumerated-values-82) Enumerated Values

| Parameter | Value    |
| --------- | -------- |
| status    | open     |
| status    | finished |
| settle    | btc      |
| settle    | usdt     |

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
[https://www.gate.io/docs/developers/apiv4/en/#listpricetriggeredorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listpricetriggeredorders-responses)

| Status | Meaning                                                                    | Description                 | Schema                                                              |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-auto-orders-2) Cancel all auto orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-all-auto-orders-2](https://www.gate.io/docs/developers/apiv4/en/#cancel-all-auto-orders-2)

> Code samples
