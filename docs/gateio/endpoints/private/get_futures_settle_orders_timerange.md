# GET /futures/{settle}/orders_timerange

**Source:**
[/futures/{settle}/orders_timerange](https://www.gate.io/docs/developers/apiv4/en/#getorderswithtimerange-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-futures-order-list-by-time-range) Query futures order list by time range

`GET /futures/{settle}/orders_timerange`

_Query futures order list by time range_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getorderswithtimerange-parameters](https://www.gate.io/docs/developers/apiv4/en/#getorderswithtimerange-parameters)

| Name     | In    | Type           | Required | Description                                             |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                         |
| contract | query | string         | false    | Futures contract, return related data only if specified |
| from     | query | integer(int64) | false    | Start timestamp                                         |
| to       | query | integer(int64) | false    | Termination Timestamp                                   |
| limit    | query | integer        | false    | Maximum number of records returned in a single list     |
| offset   | query | integer        | false    | List offset, starting from 0                            |

#### [#](#detailed-descriptions-28) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-61) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

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
[https://www.gate.io/docs/developers/apiv4/en/#getorderswithtimerange-responses](https://www.gate.io/docs/developers/apiv4/en/#getorderswithtimerange-responses)

| Status | Meaning                                                                    | Description                 | Schema                                  |
| ------ | -------------------------------------------------------------------------- | --------------------------- | --------------------------------------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[[FuturesOrder](#schemafuturesorder)\] |

### [#](#response-headers-2) Response Headers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#response-headers-2](https://www.gate.io/docs/developers/apiv4/en/#response-headers-2)

| Status | Header              | Type    | Format | Description                     |
| ------ | ------------------- | ------- | ------ | ------------------------------- |
| 200    | X-Pagination-Limit  | integer |        | Limit specified for pagination  |
| 200    | X-Pagination-Offset | integer |        | Offset specified for pagination |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-batch-futures-orders) Place batch futures orders

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#place-batch-futures-orders](https://www.gate.io/docs/developers/apiv4/en/#place-batch-futures-orders)

> Code samples
