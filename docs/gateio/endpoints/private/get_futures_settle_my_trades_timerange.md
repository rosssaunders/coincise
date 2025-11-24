# GET /futures/{settle}/my_trades_timerange

**Source:**
[/futures/{settle}/my_trades_timerange](https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-trading-records-by-time-range) Query personal trading records by time range

`GET /futures/{settle}/my_trades_timerange`

_Query personal trading records by time range_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-parameters](https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-parameters)

| Name     | In    | Type           | Required | Description                                             |
| -------- | ----- | -------------- | -------- | ------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                         |
| contract | query | string         | false    | Futures contract, return related data only if specified |
| from     | query | integer(int64) | false    | Start timestamp                                         |
| to       | query | integer(int64) | false    | Termination Timestamp                                   |
| limit    | query | integer        | false    | Maximum number of records returned in a single list     |
| offset   | query | integer        | false    | List offset, starting from 0                            |
| role     | query | string         | false    | Query role, maker or taker                              |

#### [#](#detailed-descriptions-33) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

#### [#](#enumerated-values-69) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | btc   |
| settle    | usdt  |

> Example responses

> 200 Response

```json
[
  {
    "trade_id": "121234231",
    "create_time": 1514764800.123,
    "contract": "BTC_USDT",
    "order_id": "21893289839",
    "size": 100,
    "price": "100.123",
    "text": "t-123456",
    "fee": "0.01",
    "point_fee": "0",
    "role": "taker",
    "close_size": 0
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-responses](https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getmytradeswithtimerange-responseschema)

Status Code **200**

| Name          | Type           | Description                 |
| ------------- | -------------- | --------------------------- |
| » trade_id    | string         | Fill ID                     |
| » create_time | number(double) | Fill Time                   |
| » contract    | string         | Futures contract            |
| » order_id    | string         | Related order ID            |
| » size        | integer(int64) | Trading size                |
| » close_size  | integer(int64) | Number of closed positions: |

close_size=0 && size＞0 Open long position  
close_size=0 && size＜0 Open short position  
close_size>0 && size>0 && size <= close_size Close short position  
close_size>0 && size>0 && size > close_size Close short position and open long
position  
close_size<0 && size<0 && size >= close_size Close long position  
close_size<0 && size<0 && size < close_size Close long position and open short
position | | » price | string | Fill Price | | » role | string | Trade role.
taker - taker, maker - maker | | » text | string | Order custom information | |
» fee | string | Trade fee | | » point_fee | string | Points used to deduct
trade fee |

#### [#](#enumerated-values-70) Enumerated Values

| Property | Value |
| -------- | ----- |
| role     | taker |
| role     | maker |

### [#](#response-headers-4) Response Headers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#response-headers-4](https://www.gate.io/docs/developers/apiv4/en/#response-headers-4)

| Status | Header              | Type    | Format | Description                     |
| ------ | ------------------- | ------- | ------ | ------------------------------- |
| 200    | X-Pagination-Limit  | integer |        | Limit specified for pagination  |
| 200    | X-Pagination-Offset | integer |        | Offset specified for pagination |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-position-close-history) Query position close history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-position-close-history](https://www.gate.io/docs/developers/apiv4/en/#query-position-close-history)

> Code samples
