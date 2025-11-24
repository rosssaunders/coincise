# GET /futures/{settle}/orders

**Source:**
[/futures/{settle}/orders](https://www.gate.io/docs/developers/apiv4/en/#listfuturesorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-futures-order-list) Query futures order list

`GET /futures/{settle}/orders`

_Query futures order list_

- Zero-fill order cannot be retrieved for 10 minutes after cancellation
- Historical orders, by default, only data within the past 6 months is
  supported. If you need to query data for a longer period, please use
  `GET /futures/{settle}/orders_timerange`.

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#listfuturesorders-parameters)

| Name     | In    | Type    | Required | Description                                                                                    |
| -------- | ----- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| contract | query | string  | false    | Futures contract, return related data only if specified                                        |
| status   | query | string  | true     | Query order list based on status                                                               |
| limit    | query | integer | false    | Maximum number of records returned in a single list                                            |
| offset   | query | integer | false    | List offset, starting from 0                                                                   |
| last_id  | query | string  | false    | Specify the currency name to query in batches, and support up to 100 pass parameters at a time |
| settle   | path  | string  | true     | Settle currency                                                                                |

#### [#](#enumerated-values-59) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
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
[https://www.gate.io/docs/developers/apiv4/en/#listfuturesorders-responses](https://www.gate.io/docs/developers/apiv4/en/#listfuturesorders-responses)

| Status | Meaning                                                                    | Description                 | Schema                                  |
| ------ | -------------------------------------------------------------------------- | --------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[FuturesOrder](#schemafuturesorder)\] |

### [#](#response-headers) Response Headers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#response-headers](https://www.gate.io/docs/developers/apiv4/en/#response-headers)

| Status | Header              | Type    | Format | Description                     |
| ------ | ------------------- | ------- | ------ | ------------------------------- |
| 200    | X-Pagination-Limit  | integer |        | Limit specified for pagination  |
| 200    | X-Pagination-Offset | integer |        | Offset specified for pagination |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#cancel-all-orders-with-open-status) Cancel all orders with 'open' status

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#cancel-all-orders-with-open-status](https://www.gate.io/docs/developers/apiv4/en/#cancel-all-orders-with-open-status)

> Code samples
