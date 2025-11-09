# GET /margin/accounts

**Source:**
[/margin/accounts](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-parameters)

## Authentication

Required (Private Endpoint)

## [#](#margin-account-list) Margin account list

`GET /margin/accounts`

_Margin account list_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-parameters](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-parameters)

| Name          | In    | Type   | Required | Description  |
| ------------- | ----- | ------ | -------- | ------------ |
| currency_pair | query | string | false    | Trading pair |

> Example responses

> 200 Response

```
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
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-responses](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listisolatedmarginaccounts-responseschema)

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

## [#](#query-margin-account-balance-change-history) Query margin account balance change history

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-margin-account-balance-change-history](https://www.gate.io/docs/developers/apiv4/en/#query-margin-account-balance-change-history)

> Code samples
