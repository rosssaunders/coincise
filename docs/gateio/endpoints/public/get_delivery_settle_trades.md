# GET /delivery/{settle}/trades

**Source:** [/delivery/{settle}/trades](https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#futures-market-transaction-records-2) Futures market transaction records

`GET /delivery/{settle}/trades`

_Futures market transaction records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-parameters](https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-parameters)

| Name     | In    | Type           | Required | Description                                                                                                                                                                                              |
| -------- | ----- | -------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| settle   | path  | string         | true     | Settle currency                                                                                                                                                                                          |
| contract | query | string         | true     | Futures contract                                                                                                                                                                                         |
| limit    | query | integer        | false    | Maximum number of records returned in a single list                                                                                                                                                      |
| last_id  | query | string         | false    | Use the ID of the last record in the previous list as the starting point for the next list.This field is no longer supported. For new requests, please use the fromand tofields to specify the time rang |
| from     | query | integer(int64) | false    | Specify starting time in Unix seconds. If not specified, `to` and `limit` will be used to limit response items.                                                                                          |
| to       | query | integer(int64) | false    | Specify end time in Unix seconds, default to current time.                                                                                                                                               |

#### [#](#detailed-descriptions-39) Detailed descriptions

**from**: Specify starting time in Unix seconds. If not specified, `to` and
`limit` will be used to limit response items. If items between `from` and `to`
are more than `limit`, only `limit` number will be returned.

#### [#](#enumerated-values-89) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | usdt  |

> Example responses

> 200 Response

```
[
  {
    "id": 121234231,
    "create_time": 1514764800,
    "contract": "BTC_USDT",
    "size": -100,
    "price": "100.123"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-responses](https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listdeliverytrades-responseschema)

Status Code **200**

| Name             | Type           | Description                                                                                                                                                                                                                                                                                                                                      |
| ---------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _None_           | array          | none                                                                                                                                                                                                                                                                                                                                             |
| » id             | integer(int64) | Fill ID                                                                                                                                                                                                                                                                                                                                          |
| » create_time    | number(double) | Fill Time                                                                                                                                                                                                                                                                                                                                        |
| » create_time_ms | number(double) | Trade time, with millisecond precision to 3 decimal places                                                                                                                                                                                                                                                                                       |
| » contract       | string         | Futures contract                                                                                                                                                                                                                                                                                                                                 |
| » size           | integer(int64) | Trading size                                                                                                                                                                                                                                                                                                                                     |
| » price          | string         | Trade price (quote currency)                                                                                                                                                                                                                                                                                                                     |
| » is_internal    | boolean        | Whether it is an internal trade. Internal trade refers to the takeover of liquidation orders by the insurance fund and ADL users. Since it is not a normal matching on the market depth, the trade price may deviate from the market, and it will not be recorded in the K-line. If it is not an internal trade, this field will not be returned |

This operation does not require authentication

## [#](#futures-market-k-line-chart-2) Futures market K-line chart

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#futures-market-k-line-chart-2](https://www.gate.io/docs/developers/apiv4/en/#futures-market-k-line-chart-2)

> Code samples
