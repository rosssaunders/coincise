# GET /account/detail

**Source:** [/account/detail](https://www.gate.io/docs/developers/apiv4/en/#getaccountdetail-responses)

## Authentication

Required (Private Endpoint)

## [#](#retrieve-user-account-information) Retrieve user account information

`GET /account/detail`

_Retrieve user account information_

> Example responses

> 200 Response

```json
{
  "user_id": 1667201533,
  "ip_whitelist": [
    "127.0.0.1"
  ],
  "currency_pairs": [
    "USDT_BTC"
  ],
  "key": {
    "mode": 1
  },
  "tier": 2,
  "copy_trading_role": 1
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getaccountdetail-responses](https://www.gate.io/docs/developers/apiv4/en/#getaccountdetail-responses)

| Status | Meaning                                                                    | Description            | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Successfully retrieved | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getaccountdetail-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getaccountdetail-responseschema)

Status Code **200**

_AccountDetail_

| Name                | Type           | Description                                                                                     |
| ------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| » ip_whitelist      | array          | IP Whitelist                                                                                    |
| » currency_pairs    | array          | Trading pair whitelist                                                                          |
| » user_id           | integer(int64) | User ID                                                                                         |
| » tier              | integer(int64) | User VIP level                                                                                  |
| » key               | object         | API Key details                                                                                 |
| »» mode             | integer(int32) | Mode: 1 - Classic mode, 2 - Legacy unified mode                                                 |
| » copy_trading_role | integer(int32) | User role: 0 - Normal user, 1 - Copy trading leader, 2 - Follower, 3 - Both leader and follower |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-user-transaction-rate-limit-information) Get user transaction rate limit information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-user-transaction-rate-limit-information](https://www.gate.io/docs/developers/apiv4/en/#get-user-transaction-rate-limit-information)

> Code samples
