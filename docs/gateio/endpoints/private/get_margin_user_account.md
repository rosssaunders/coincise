# GET /margin/user/account

**Source:** [/margin/user/account](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-isolated-margin-account-list) Query user's isolated margin account list

`GET /margin/user/account`

_Query user's isolated margin account list_

Supports querying risk ratio isolated accounts and margin ratio isolated
accounts

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-parameters](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-parameters)

| Name          | In    | Type   | Required | Description  |
| ------------- | ----- | ------ | -------- | ------------ |
| currency_pair | query | string | false    | Trading pair |

> Example responses

> 200 Response

```json
[
  {
    "currency_pair": "BTC_USDT",
    "account_type": "mmr",
    "leverage": "20",
    "locked": false,
    "risk": "1.3318",
    "mmr": "16.5949188975473644",
    "base": {
      "currency": "BTC",
      "available": "0.047060413211",
      "locked": "0",
      "borrowed": "0.047233",
      "interest": "0"
    },
    "quote": {
      "currency": "USDT",
      "available": "1234",
      "locked": "0",
      "borrowed": "0",
      "interest": "0"
    }
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginuseraccount-responseschema)

Status Code **200**

| Name             | Type    | Description                                                                                                                                                           |
| ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _None_           | array   | \[Margin account information for a trading pair. `base` corresponds to base currency account information, `quote` corresponds to quote currency account information\] |
| » _None_         | object  | Margin account information for a trading pair. `base` corresponds to base currency account information, `quote` corresponds to quote currency account information     |
| »» currency_pair | string  | Trading pair                                                                                                                                                          |
| »» account_type  | string  | Account type: risk - risk rate account, mmr - maintenance margin rate account, inactive - market not activated                                                        |
| »» leverage      | string  | User's current market leverage multiplier                                                                                                                             |
| »» locked        | boolean | Whether the account is locked                                                                                                                                         |
| »» risk          | string  | Current risk rate of the margin account (returned when the account is a risk rate account)                                                                            |
| »» mmr           | string  | Leveraged Account Current Maintenance Margin Rate (returned when the Account is Account)                                                                              |
| »» base          | object  | Currency account information                                                                                                                                          |
| »»» currency     | string  | Currency name                                                                                                                                                         |
| »»» available    | string  | Amount available for margin trading, available = margin + borrowed                                                                                                    |
| »»» locked       | string  | Frozen funds, such as amounts already placed in margin market for order trading                                                                                       |
| »»» borrowed     | string  | Borrowed funds                                                                                                                                                        |
| »»» interest     | string  | Unpaid interest                                                                                                                                                       |
| »» quote         | object  | Currency account information                                                                                                                                          |
| »»» currency     | string  | Currency name                                                                                                                                                         |
| »»» available    | string  | Amount available for margin trading, available = margin + borrowed                                                                                                    |
| »»» locked       | string  | Frozen funds, such as amounts already placed in margin market for order trading                                                                                       |
| »»» borrowed     | string  | Borrowed funds                                                                                                                                                        |
| »»» interest     | string  | Unpaid interest                                                                                                                                                       |

WARNING

To perform this operation, you must be authenticated by API key and secret
