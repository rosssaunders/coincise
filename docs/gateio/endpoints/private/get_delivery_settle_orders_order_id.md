# GET /delivery/{settle}/orders/{order_id}

**Source:** [/delivery/{settle}/orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getdeliveryorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-order-details-3) Query single order details

`GET /delivery/{settle}/orders/{order_id}`

_Query single order details_

Zero-fill orders cannot be retrieved 10 minutes after order cancellation

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdeliveryorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#getdeliveryorder-parameters)

| Name     | In   | Type   | Required | Description                                    |
| -------- | ---- | ------ | -------- | ---------------------------------------------- |
| settle   | path | string | true     | Settle currency                                |
| order_id | path | string | true     | ID returned when order is successfully created |

#### [#](#enumerated-values-104) Enumerated Values

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
[https://www.gate.io/docs/developers/apiv4/en/#getdeliveryorder-responses](https://www.gate.io/docs/developers/apiv4/en/#getdeliveryorder-responses)

| Status | Meaning                                                                    | Description   | Schema                              |
| ------ | -------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order details | [FuturesOrder](#schemafuturesorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-single-order-3) Cancel single order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-single-order-3](https://www.gate.io/docs/developers/apiv4/en/#cancel-single-order-3)

> Code samples
