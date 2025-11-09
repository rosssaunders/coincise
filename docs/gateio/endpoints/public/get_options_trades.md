# GET /options/trades

**Source:**
[/options/trades](https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#market-trade-records) Market trade records

`GET /options/trades`

_Market trade records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-parameters)

| Name     | In    | Type           | Required | Description                                         |
| -------- | ----- | -------------- | -------- | --------------------------------------------------- |
| contract | query | string         | false    | Options contract name                               |
| type     | query | string(P)      | false    | `C` for call, `P` for put                           |
| limit    | query | integer        | false    | Maximum number of records returned in a single list |
| offset   | query | integer        | false    | List offset, starting from 0                        |
| from     | query | integer(int64) | false    | Start timestamp                                     |
| to       | query | integer(int64) | false    | Termination Timestamp                               |

#### [#](#detailed-descriptions-47) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

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
[https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionstrades-responseschema)

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

## [#](#query-account-information) Query account information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-account-information](https://www.gate.io/docs/developers/apiv4/en/#query-account-information)

> Code samples
