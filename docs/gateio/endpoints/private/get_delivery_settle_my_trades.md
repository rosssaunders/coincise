# GET /delivery/{settle}/my_trades

**Source:** [/delivery/{settle}/my_trades](https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-trading-records-3) Query personal trading records

`GET /delivery/{settle}/my_trades`

_Query personal trading records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-parameters](https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-parameters)

| Name        | In    | Type           | Required | Description                                                                                    |
| ----------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------------- |
| settle      | path  | string         | true     | Settle currency                                                                                |
| contract    | query | string         | false    | Futures contract                                                                               |
| order       | query | integer(int64) | false    | Futures order ID, return related data only if specified                                        |
| limit       | query | integer        | false    | Maximum number of records returned in a single list                                            |
| offset      | query | integer        | false    | List offset, starting from 0                                                                   |
| last_id     | query | string         | false    | Specify the currency name to query in batches, and support up to 100 pass parameters at a time |
| count_total | query | integer        | false    | Whether to return total number matched, defaults to 0 (no return)                              |

#### [#](#enumerated-values-106) Enumerated Values

| Parameter   | Value |
| ----------- | ----- |
| settle      | usdt  |
| count_total | 0     |
| count_total | 1     |

> Example responses

> 200 Response

```json
[
  {
    "id": 121234231,
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
[https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-responses](https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getmydeliverytrades-responseschema)

Status Code **200**

| Name          | Type           | Description                 |
| ------------- | -------------- | --------------------------- |
| _None_        | array          | none                        |
| » id          | integer(int64) | Fill ID                     |
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

#### [#](#enumerated-values-107) Enumerated Values

| Property | Value |
| -------- | ----- |
| role     | taker |
| role     | maker |

### [#](#response-headers-6) Response Headers

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#response-headers-6](https://www.gate.io/docs/developers/apiv4/en/#response-headers-6)

| Status | Header              | Type    | Format | Description                                                      |
| ------ | ------------------- | ------- | ------ | ---------------------------------------------------------------- |
| 200    | X-Pagination-Limit  | integer |        | Limit specified for pagination                                   |
| 200    | X-Pagination-Offset | integer |        | Offset specified for pagination                                  |
| 200    | X-Pagination-Total  | integer |        | Total number matched, only returned if `count_total` is set to 1 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-position-close-history-2) Query position close history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-position-close-history-2](https://www.gate.io/docs/developers/apiv4/en/#query-position-close-history-2)

> Code samples
