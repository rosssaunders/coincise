# GET /rebate/user/info

**Source:**
[/rebate/user/info](https://www.gate.io/docs/developers/apiv4/en/#rebateuserinfo-responses)

## Authentication

Required (Private Endpoint)

## [#](#user-obtains-rebate-information) User obtains rebate information

`GET /rebate/user/info`

_User obtains rebate information_

> Example responses

> 200 Response

```json
{
  "invite_uid": 987
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#rebateuserinfo-responses](https://www.gate.io/docs/developers/apiv4/en/#rebateuserinfo-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#rebateuserinfo-responseschema](https://www.gate.io/docs/developers/apiv4/en/#rebateuserinfo-responseschema)

Status Code **200**

| Name          | Type           | Description                      |
| ------------- | -------------- | -------------------------------- |
| » _None_      | object         | Retrieve user rebate information |
| »» invite_uid | integer(int64) | My inviter's UID                 |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#user-subordinate-relationship) User subordinate relationship

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#user-subordinate-relationship](https://www.gate.io/docs/developers/apiv4/en/#user-subordinate-relationship)

> Code samples
