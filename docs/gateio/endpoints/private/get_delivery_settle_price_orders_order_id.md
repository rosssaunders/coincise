# GET /delivery/{settle}/price_orders/{order_id}

**Source:**
[/delivery/{settle}/price_orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getpricetriggereddeliveryorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-auto-order-details-3) Query single auto order details

`GET /delivery/{settle}/price_orders/{order_id}`

_Query single auto order details_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getpricetriggereddeliveryorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#getpricetriggereddeliveryorder-parameters)

| Name     | In   | Type   | Required | Description                                    |
| -------- | ---- | ------ | -------- | ---------------------------------------------- |
| settle   | path | string | true     | Settle currency                                |
| order_id | path | string | true     | ID returned when order is successfully created |

#### [#](#enumerated-values-116) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```
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
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getpricetriggereddeliveryorder-responses](https://www.gate.io/docs/developers/apiv4/en/#getpricetriggereddeliveryorder-responses)

| Status | Meaning                                                                    | Description        | Schema                                                          |
| ------ | -------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order details | [FuturesPriceTriggeredOrder](#schemafuturespricetriggeredorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-single-auto-order-3) Cancel single auto order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-single-auto-order-3](https://www.gate.io/docs/developers/apiv4/en/#cancel-single-auto-order-3)

> Code samples
