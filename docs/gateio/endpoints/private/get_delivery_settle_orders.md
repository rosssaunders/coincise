# GET /delivery/{settle}/orders

**Source:** [/delivery/{settle}/orders](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-futures-order-list-2) Query futures order list

`GET /delivery/{settle}/orders`

_Query futures order list_

Zero-fill orders cannot be retrieved 10 minutes after order cancellation

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorders-parameters)

| Name        | In    | Type    | Required | Description                                                                                    |
| ----------- | ----- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| contract    | query | string  | false    | Futures contract                                                                               |
| status      | query | string  | true     | Query order list based on status                                                               |
| limit       | query | integer | false    | Maximum number of records returned in a single list                                            |
| offset      | query | integer | false    | List offset, starting from 0                                                                   |
| last_id     | query | string  | false    | Specify the currency name to query in batches, and support up to 100 pass parameters at a time |
| count_total | query | integer | false    | Whether to return total number matched, defaults to 0 (no return)                              |
| settle      | path  | string  | true     | Settle currency                                                                                |

#### [#](#enumerated-values-102) Enumerated Values

| Parameter   | Value    |
| ----------- | -------- |
| status      | open     |
| status      | finished |
| count_total | 0        |
| count_total | 1        |
| settle      | usdt     |

> Example responses

> 200 Response

```
[
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
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliveryorders-responses)

| Status | Meaning                                                                    | Description                 | Schema                                  |
| ------ | -------------------------------------------------------------------------- | --------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[FuturesOrder](#schemafuturesorder)\] |

### [#](#response-headers-5) Response Headers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#response-headers-5](https://www.gate.io/docs/developers/apiv4/en/#response-headers-5)

| Status | Header              | Type    | Format | Description                                                      |
| ------ | ------------------- | ------- | ------ | ---------------------------------------------------------------- |
| 200    | X-Pagination-Limit  | integer |        | Limit specified for pagination                                   |
| 200    | X-Pagination-Offset | integer |        | Offset specified for pagination                                  |
| 200    | X-Pagination-Total  | integer |        | Total number matched, only returned if `count_total` is set to 1 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-orders-with-open-status-2) Cancel all orders with 'open' status

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-all-orders-with-open-status-2](https://www.gate.io/docs/developers/apiv4/en/#cancel-all-orders-with-open-status-2)

> Code samples
