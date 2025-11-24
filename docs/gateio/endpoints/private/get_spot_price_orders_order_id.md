# GET /spot/price_orders/{order_id}

**Source:**
[/spot/price_orders/{order_id}](https://www.gate.io/docs/developers/apiv4/en/#getspotpricetriggeredorder-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-single-auto-order-details) Query single auto order details

`GET /spot/price_orders/{order_id}`

_Query single auto order details_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getspotpricetriggeredorder-parameters](https://www.gate.io/docs/developers/apiv4/en/#getspotpricetriggeredorder-parameters)

| Name     | In   | Type   | Required | Description                                    |
| -------- | ---- | ------ | -------- | ---------------------------------------------- |
| order_id | path | string | true     | ID returned when order is successfully created |

> Example responses

> 200 Response

```json
{
  "trigger": {
    "price": "100",
    "rule": ">=",
    "expiration": 3600
  },
  "put": {
    "type": "limit",
    "side": "buy",
    "price": "2.15",
    "amount": "2.00000000",
    "account": "normal",
    "time_in_force": "gtc",
    "text": "api"
  },
  "id": 1283293,
  "user": 1234,
  "market": "GT_USDT",
  "ctime": 1616397800,
  "ftime": 1616397801,
  "fired_order_id": 0,
  "status": "",
  "reason": ""
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getspotpricetriggeredorder-responses](https://www.gate.io/docs/developers/apiv4/en/#getspotpricetriggeredorder-responses)

| Status | Meaning                                                                    | Description        | Schema                                                    |
| ------ | -------------------------------------------------------------------------- | ------------------ | --------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Auto order details | [SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-single-auto-order) Cancel single auto order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-single-auto-order](https://www.gate.io/docs/developers/apiv4/en/#cancel-single-auto-order)

> Code samples
