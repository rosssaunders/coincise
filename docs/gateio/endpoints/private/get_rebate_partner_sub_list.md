# GET /rebate/partner/sub_list

**Source:**
[/rebate/partner/sub_list](https://www.gate.io/docs/developers/apiv4/en/#partnersublist-parameters)

## Authentication

Required (Private Endpoint)

## [#](#partner-subordinate-list) Partner subordinate list

`GET /rebate/partner/sub_list`

_Partner subordinate list_

Including sub-agents, direct customers, and indirect customers

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partnersublist-parameters](https://www.gate.io/docs/developers/apiv4/en/#partnersublist-parameters)

| Name    | In    | Type           | Required | Description                                                  |
| ------- | ----- | -------------- | -------- | ------------------------------------------------------------ |
| user_id | query | integer(int64) | false    | User ID. If not specified, all user records will be returned |
| limit   | query | integer        | false    | Maximum number of records returned in a single list          |
| offset  | query | integer        | false    | List offset, starting from 0                                 |

> Example responses

> 200 Response

```
{
  "total": 3,
  "list": [
    {
      "user_id": 1,
      "user_join_time": 1666255731,
      "type": 1
    },
    {
      "user_id": 2,
      "user_join_time": 1666271213,
      "type": 2
    },
    {
      "user_id": 3,
      "user_join_time": 1666422143,
      "type": 3
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partnersublist-responses](https://www.gate.io/docs/developers/apiv4/en/#partnersublist-responses)

| Status | Meaning                                                                    | Description                 | Schema |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#partnersublist-responseschema](https://www.gate.io/docs/developers/apiv4/en/#partnersublist-responseschema)

Status Code **200**

| Name               | Type           | Description                                                            |
| ------------------ | -------------- | ---------------------------------------------------------------------- |
| » total            | integer(int64) | Total                                                                  |
| » list             | array          | Subordinate list                                                       |
| »» PartnerSub      | object         | none                                                                   |
| »»» user_id        | integer(int64) | User ID                                                                |
| »»» user_join_time | integer(int64) | Time when user joined the system, Unix timestamp in seconds            |
| »»» type           | integer(int64) | Type (1-Sub-agent 2-Indirect direct customer 3-Direct direct customer) |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#broker-obtains-user-s-rebate-records) Broker obtains user's rebate records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#broker-obtains-user-s-rebate-records](https://www.gate.io/docs/developers/apiv4/en/#broker-obtains-user-s-rebate-records)

> Code samples
