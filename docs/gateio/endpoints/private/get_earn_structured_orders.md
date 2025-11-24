# GET /earn/structured/orders

**Source:** [/earn/structured/orders](https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-parameters)

## Authentication

Required (Private Endpoint)

## [#](#structured-product-order-list) Structured Product Order List

`GET /earn/structured/orders`

_Structured Product Order List_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-parameters](https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-parameters)

| Name  | In    | Type           | Required | Description                                         |
| ----- | ----- | -------------- | -------- | --------------------------------------------------- |
| from  | query | integer(int64) | false    | Start timestamp                                     |
| to    | query | integer(int64) | false    | Termination Timestamp                               |
| page  | query | integer(int32) | false    | Page number                                         |
| limit | query | integer        | false    | Maximum number of records returned in a single list |

#### [#](#detailed-descriptions-58) Detailed descriptions

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
    "id": 35,
    "pid": "3691",
    "lock_coin": "ETH",
    "amount": "20",
    "status": "SUCCESS",
    "income": "0.000000",
    "create_time": 1697685172
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-responses](https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-responses)

| Status | Meaning                                                                    | Description            | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-responseschema](https://www.gate.io/docs/developers/apiv4/en/#liststructuredorders-responseschema)

Status Code **200**

| Name         | Type           | Description      |
| ------------ | -------------- | ---------------- |
| » _None_     | object         | Structured order |
| »» id        | integer(int32) | Order ID         |
| »» pid       | string         | Product ID       |
| »» lock_coin | string         | Locked coin      |
| »» amount    | string         | Locked amount    |
| »» status    | string         | Status:          |

SUCCESS - SUCCESS  
FAILED - FAILED  
DONE - DONE | | »» income | string | Income | | »» create_time | integer(int32)
| Created time |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#place-structured-product-order) Place Structured Product Order

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#place-structured-product-order](https://www.gate.io/docs/developers/apiv4/en/#place-structured-product-order)

> Code samples
