# POST /futures/{settle}/batch_cancel_orders

**Source:** [/futures/{settle}/batch_cancel_orders](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#cancel-batch-orders-by-specified-id-list-2) Cancel batch orders by specified ID list

`POST /futures/{settle}/batch_cancel_orders`

_Cancel batch orders by specified ID list_

Multiple different order IDs can be specified, maximum 20 records per request

> Body parameter

```json
[
  "1",
  "2",
  "3"
]
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-parameters)

| Name           | In     | Type            | Required | Description                                                                                                                                      |
| -------------- | ------ | --------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| x-gate-exptime | header | string          | false    | Specify the expiration time (milliseconds); if the GATE receives the request time greater than the expiration time, the request will be rejected |
| body           | body   | array\[string\] | true     | none                                                                                                                                             |
| settle         | path   | string          | true     | Settle currency                                                                                                                                  |

#### [#](#enumerated-values-77) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "user_id": 111,
    "id": "123456",
    "succeeded": true,
    "message": ""
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-responses](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-responses)

| Status | Meaning                                                                    | Description                            | Schema     |
| ------ | -------------------------------------------------------------------------- | -------------------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Order cancellation operation completed | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#cancelbatchfutureorders-responseschema)

Status Code **200**

| Name                      | Type           | Description                                                    |
| ------------------------- | -------------- | -------------------------------------------------------------- |
| » FutureCancelOrderResult | object         | Order cancellation result                                      |
| »» id                     | string         | Order ID                                                       |
| »» user_id                | integer(int64) | User ID                                                        |
| »» succeeded              | boolean        | Whether cancellation succeeded                                 |
| »» message                | string         | Error description when cancellation fails, empty if successful |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-modify-orders-by-specified-ids) Batch modify orders by specified IDs

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batch-modify-orders-by-specified-ids](https://www.gate.io/docs/developers/apiv4/en/#batch-modify-orders-by-specified-ids)

> Code samples
