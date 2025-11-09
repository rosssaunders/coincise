# GET /spot/insurance_history

**Source:** [/spot/insurance_history](https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-spot-insurance-fund-historical-data) Query spot insurance fund historical data

`GET /spot/insurance_history`

_Query spot insurance fund historical data_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-parameters)

| Name     | In    | Type           | Required | Description                                                                 |
| -------- | ----- | -------------- | -------- | --------------------------------------------------------------------------- |
| business | query | string         | true     | Leverage business, margin - position by position; unified - unified account |
| currency | query | string         | true     | Currency                                                                    |
| page     | query | integer(int32) | false    | Page number                                                                 |
| limit    | query | integer        | false    | The maximum number of items returned in the list, the default value is 30   |
| from     | query | integer(int64) | true     | Start timestamp in seconds                                                  |
| to       | query | integer(int64) | true     | End timestamp in seconds                                                    |

> Example responses

> 200 Response

```
[
  {
    "currency": "BTC",
    "balance": "1021.21",
    "time": 1727054547
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-responses](https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getspotinsurancehistory-responseschema)

Status Code **200**

| Name       | Type           | Description                            |
| ---------- | -------------- | -------------------------------------- |
| » currency | string         | Currency                               |
| » balance  | string         | Balance                                |
| » time     | integer(int64) | Creation time, timestamp, milliseconds |

This operation does not require authentication

## [#](#create-price-triggered-order) Create price-triggered order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#create-price-triggered-order](https://www.gate.io/docs/developers/apiv4/en/#create-price-triggered-order)

> Code samples
