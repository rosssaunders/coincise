# GET /options/my_trades

**Source:**
[/options/my_trades](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-trading-records-4) Query personal trading records

`GET /options/my_trades`

_Query personal trading records_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-parameters](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-parameters)

| Name       | In    | Type           | Required | Description                                          |
| ---------- | ----- | -------------- | -------- | ---------------------------------------------------- |
| underlying | query | string         | true     | Underlying (Obtained by listing underlying endpoint) |
| contract   | query | string         | false    | Options contract name                                |
| limit      | query | integer        | false    | Maximum number of records returned in a single list  |
| offset     | query | integer        | false    | List offset, starting from 0                         |
| from       | query | integer(int64) | false    | Start timestamp                                      |
| to         | query | integer(int64) | false    | Termination Timestamp                                |

#### [#](#detailed-descriptions-52) Detailed descriptions

**from**: Start timestamp

Specify start time, time format is Unix timestamp. If not specified, it defaults
to (the data start time of the time range actually returned by to and limit)

**to**: Termination Timestamp

Specify the end time. If not specified, it defaults to the current time, and the
time format is a Unix timestamp

> Example responses

> 200 Response

```json
[
  {
    "underlying_price": "48000",
    "size": 1,
    "contract": "BTC_USDT-20210916-5000-C",
    "id": 1,
    "role": "taker",
    "create_time": 1631763397,
    "order_id": 4,
    "price": "100"
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-responses](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listmyoptionstrades-responseschema)

Status Code **200**

| Name               | Type           | Description                              |
| ------------------ | -------------- | ---------------------------------------- |
| » id               | integer(int64) | Fill ID                                  |
| » create_time      | number(double) | Fill Time                                |
| » contract         | string         | Options contract name                    |
| » order_id         | integer        | Related order ID                         |
| » size             | integer(int64) | Trading size                             |
| » price            | string         | Trade price (quote currency)             |
| » underlying_price | string         | Underlying price (quote currency)        |
| » role             | string         | Trade role. taker - taker, maker - maker |

#### [#](#enumerated-values-132) Enumerated Values

| Property | Value |
| -------- | ----- |
| role     | taker |
| role     | maker |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#mmp-settings) MMP Settings

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#mmp-settings](https://www.gate.io/docs/developers/apiv4/en/#mmp-settings)

> Code samples
