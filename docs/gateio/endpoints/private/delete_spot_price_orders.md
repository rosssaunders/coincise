# DELETE /spot/price_orders

**Source:** [/spot/price_orders](https://www.gate.io/docs/developers/apiv4/en/#cancelspotpricetriggeredorderlist-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-all-auto-orders) Cancel all auto orders

`DELETE /spot/price_orders`

_Cancel all auto orders_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelspotpricetriggeredorderlist-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelspotpricetriggeredorderlist-parameters)

| Name    | In    | Type   | Required | Description                                                    |
| ------- | ----- | ------ | -------- | -------------------------------------------------------------- |
| market  | query | string | false    | Trading market                                                 |
| account | query | string | false    | Trading account type. Unified account must be set to `unified` |

#### [#](#enumerated-values-29) Enumerated Values

| Parameter | Value   |
| --------- | ------- |
| account   | normal  |
| account   | margin  |
| account   | unified |

> Example responses

> 200 Response

```
[
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelspotpricetriggeredorderlist-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelspotpricetriggeredorderlist-responses)

| Status | Meaning                                                                    | Description                                                                         | Schema                                                        |
| ------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation request accepted and processed, success determined by order list | \[[SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-single-auto-order-details) Query single auto order details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-auto-order-details](https://www.gate.io/docs/developers/apiv4/en/#query-single-auto-order-details)

> Code samples
