# DELETE /delivery/{settle}/orders/{order_id}

**Source:** [/delivery/{settle}/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-single-order-3) Cancel single order

`DELETE /delivery/{settle}/orders/{order_id}`

_Cancel single order_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorder-parameters)

| Name     | In   | Type   | Required | Description                                    |
| -------- | ---- | ------ | -------- | ---------------------------------------------- |
| settle   | path | string | true     | Settle currency                                |
| order_id | path | string | true     | ID returned when order is successfully created |

#### [#](#enumerated-values-105) Enumerated Values

| Parameter | Value |
| --------- | ----- |
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
[https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorder-responses](https://www.gate.io/docs/developers/apiv4/en/#canceldeliveryorder-responses)

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-personal-trading-records-3) Query personal trading records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-records-3](https://www.gate.io/docs/developers/apiv4/en/#query-personal-trading-records-3)

> Code samples
