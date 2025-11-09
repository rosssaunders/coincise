# GET /rebate/agency/commission_history

**Source:** [/rebate/agency/commission_history](https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-parameters)

## Authentication

Required (Private Endpoint)

## [#](#broker-obtains-rebate-history-of-recommended-users) Broker obtains rebate history of recommended users

`GET /rebate/agency/commission_history`

_Broker obtains rebate history of recommended users_

Record query time range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-parameters)

| Name     | In    | Type           | Required | Description                                                                              |
| -------- | ----- | -------------- | -------- | ---------------------------------------------------------------------------------------- |
| currency | query | string         | false    | Specify the currency. If not specified, returns all currencies                           |
| user_id  | query | integer(int64) | false    | User ID. If not specified, all user records will be returned                             |
| from     | query | integer(int64) | false    | Start time for querying records, defaults to 7 days before current time if not specified |
| to       | query | integer(int64) | false    | End timestamp for the query, defaults to current time if not specified                   |
| limit    | query | integer        | false    | Maximum number of records returned in a single list                                      |
| offset   | query | integer        | false    | List offset, starting from 0                                                             |

> Example responses

> 200 Response

```
{
  "total": 100,
  "list": [
    {
      "commission_time": 1539852480,
      "user_id": 10000,
      "group_name": "gateio",
      "commission_amount": "1000",
      "source": "SPOT",
      "commission_asset": "GT"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-responses](https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#agencycommissionshistory-responseschema)

Status Code **200**

| Name                  | Type           | Description                                                             |
| --------------------- | -------------- | ----------------------------------------------------------------------- |
| » currency_pair       | string         | Trading pair                                                            |
| » total               | integer(int64) | Total                                                                   |
| » list                | array          | List of commission history                                              |
| »» AgencyCommission   | object         | none                                                                    |
| »»» commission_time   | integer(int64) | Commission time (Unix timestamp in seconds)                             |
| »»» user_id           | integer(int64) | User ID                                                                 |
| »»» group_name        | string         | Group name                                                              |
| »»» commission_amount | string         | Transaction amount                                                      |
| »»» commission_asset  | string         | Commission Asset                                                        |
| »»» source            | string         | Commission source: SPOT - Spot commission, FUTURES - Futures commission |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-obtains-transaction-history-of-recommended-users) Partner obtains transaction history of recommended users

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partner-obtains-transaction-history-of-recommended-users](https://www.gate.io/docs/developers/apiv4/en/#partner-obtains-transaction-history-of-recommended-users)

> Code samples
