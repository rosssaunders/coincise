# GET /rebate/partner/commission_history

**Source:** [/rebate/partner/commission_history](https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-parameters)

## Authentication

Required (Private Endpoint)

## [#](#partner-obtains-rebate-records-of-recommended-users) Partner obtains rebate records of recommended users

`GET /rebate/partner/commission_history`

_Partner obtains rebate records of recommended users_

Record query time range cannot exceed 30 days

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-parameters](https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-parameters)

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
  "total": 52,
  "list": [
    {
      "user_id": 1879043947,
      "commission_time": 1718616728,
      "commission_amount": "0.2216934846",
      "commission_asset": "USDT",
      "source": "SPOT",
      "group_name": "test"
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-responses](https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-responseschema](https://www.gate.io/docs/developers/apiv4/en/#partnercommissionshistory-responseschema)

Status Code **200**

| Name                  | Type           | Description                                                             |
| --------------------- | -------------- | ----------------------------------------------------------------------- |
| » total               | integer(int64) | Total                                                                   |
| » list                | array          | List of commission history                                              |
| »» PartnerCommission  | object         | none                                                                    |
| »»» commission_time   | integer(int64) | Commission time (Unix timestamp in seconds)                             |
| »»» user_id           | integer(int64) | User ID                                                                 |
| »»» group_name        | string         | Group name                                                              |
| »»» commission_amount | string         | Transaction amount                                                      |
| »»» commission_asset  | string         | Commission Asset                                                        |
| »»» source            | string         | Commission source: SPOT - Spot commission, FUTURES - Futures commission |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#partner-subordinate-list) Partner subordinate list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partner-subordinate-list](https://www.gate.io/docs/developers/apiv4/en/#partner-subordinate-list)

> Code samples
