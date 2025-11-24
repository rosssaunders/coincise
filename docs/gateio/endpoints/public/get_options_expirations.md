# GET /options/expirations

**Source:** [/options/expirations](https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#list-all-expiration-dates) List all expiration dates

`GET /options/expirations`

_List all expiration dates_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-parameters](https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-parameters)

| Name       | In    | Type   | Required | Description                                          |
| ---------- | ----- | ------ | -------- | ---------------------------------------------------- |
| underlying | query | string | true     | Underlying (Obtained by listing underlying endpoint) |

> Example responses

> 200 Response

```json
[
  1637913600
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-responses](https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-responses)

| Status | Meaning                                                                    | Description                                    | Schema      |
| ------ | -------------------------------------------------------------------------- | ---------------------------------------------- | ----------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List expiration dates for specified underlying | \[integer\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listoptionsexpirations-responseschema)

Status Code **200**

| Name     | Type           | Description                       |
| -------- | -------------- | --------------------------------- |
| » _None_ | integer(int64) | Unix timestamp of expiration date |

This operation does not require authentication

## [#](#list-all-contracts-for-specified-underlying-and-expiration-date) List all contracts for specified underlying and expiration date

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-all-contracts-for-specified-underlying-and-expiration-date](https://www.gate.io/docs/developers/apiv4/en/#list-all-contracts-for-specified-underlying-and-expiration-date)

> Code samples
