# POST /spot/cancel_batch_orders

**Source:**
[/spot/cancel_batch_orders](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-batch-orders-by-specified-id-list) Cancel batch orders by specified ID list

`POST /spot/cancel_batch_orders`

_Cancel batch orders by specified ID list_

Multiple currency pairs can be specified, but maximum 20 orders are allowed per
request

> Body parameter

```
[
  {
    "currency_pair": "BTC_USDT",
    "id": "123456"
  }
]
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-parameters)

| Name           | In     | Type            | Required | Description                                                                                                                                      |
| -------------- | ------ | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string          | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array\[object\] | true     | none                                                                                                                                             |

> Example responses

> 200 Response

```
[
  {
    "currency_pair": "BTC_USDT",
    "id": "123456",
    "text": "123456",
    "succeeded": true,
    "label": null,
    "message": null
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-responses)

| Status | Meaning                                                                    | Description                  | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Batch cancellation completed | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchorders-responseschema)

Status Code **200**

| Name                | Type    | Description                                                     |
| ------------------- | ------- | --------------------------------------------------------------- |
| » CancelOrderResult | object  | Order cancellation result                                       |
| »» currency_pair    | string  | Order currency pair                                             |
| »» id               | string  | Order ID                                                        |
| »» text             | string  | Custom order information                                        |
| »» succeeded        | boolean | Whether cancellation succeeded                                  |
| »» label            | string  | Error label when failed to cancel the order; emtpy if succeeded |
| »» message          | string  | Error description when cancellation fails, empty if successful  |
| »» account          | string  | Default is empty (deprecated)                                   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-single-order-details) Query single order details

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-single-order-details](https://www.gate.io/docs/developers/apiv4/en/#query-single-order-details)

> Code samples
