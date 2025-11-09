# GET /spot/price_orders

**Source:** [/spot/price_orders](https://www.gate.io/docs/developers/apiv4/en/#listspotpricetriggeredorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-running-auto-order-list) Query running auto order list

`GET /spot/price_orders`

_Query running auto order list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listspotpricetriggeredorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listspotpricetriggeredorders-parameters)

| Name    | In    | Type    | Required | Description                                                    |
| ------- | ----- | ------- | -------- | -------------------------------------------------------------- |
| status  | query | string  | true     | Query order list based on status                               |
| market  | query | string  | false    | Trading market                                                 |
| account | query | string  | false    | Trading account type. Unified account must be set to `unified` |
| limit   | query | integer | false    | Maximum number of records returned in a single list            |
| offset  | query | integer | false    | List offset, starting from 0                                   |

#### [#](#enumerated-values-28) Enumerated Values

| Parameter | Value    |
| --------- | -------- |
| status    | open     |
| status    | finished |
| account   | normal   |
| account   | margin   |
| account   | unified  |

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
[https://www.gate.io/docs/developers/apiv4/en/#listspotpricetriggeredorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listspotpricetriggeredorders-responses)

| Status | Meaning                                                                    | Description                 | Schema                                                        |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------------------------------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[SpotPriceTriggeredOrder](#schemaspotpricetriggeredorder)\] |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-auto-orders) Cancel all auto orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-all-auto-orders](https://www.gate.io/docs/developers/apiv4/en/#cancel-all-auto-orders)

> Code samples
