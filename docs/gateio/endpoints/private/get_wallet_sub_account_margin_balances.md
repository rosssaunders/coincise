# GET /wallet/sub_account_margin_balances

**Source:** [/wallet/sub_account_margin_balances](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-sub-account-isolated-margin-account-balance-information) Query sub-account isolated margin account balance information

`GET /wallet/sub_account_margin_balances`

_Query sub-account isolated margin account balance information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-parameters](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-parameters)

| Name    | In    | Type   | Required | Description                                                                                                                        |
| ------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| sub_uid | query | string | false    | Sub-account user ID, you can query multiple records separated by `,`. If not specified, it will return records of all sub-accounts |

> Example responses

> 200 Response

```json
[
  {
    "uid": "10000",
    "available": [
      {
        "locked": false,
        "currency_pair": "BTC_USDT",
        "risk": "9999.99",
        "base": {
          "available": "0.1",
          "borrowed": "0",
          "interest": "0",
          "currency": "BTC",
          "locked": "0"
        },
        "quote": {
          "available": "0",
          "borrowed": "0",
          "interest": "0",
          "currency": "USDT",
          "locked": "0"
        }
      }
    ]
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-responses](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-responses)

| Status | Meaning                                                                    | Description                 | Schema     |
| ------ | -------------------------------------------------------------------------- | --------------------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | List retrieved successfully | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listsubaccountmarginbalances-responseschema)

Status Code **200**

| Name              | Type    | Description                                                                                                                                                       |
| ----------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| » uid             | string  | User ID                                                                                                                                                           |
| » available       | array   | Margin account balances                                                                                                                                           |
| »» _None_         | object  | Margin account information for a trading pair. `base` corresponds to base currency account information, `quote` corresponds to quote currency account information |
| »»» currency_pair | string  | Trading pair                                                                                                                                                      |
| »»» account_type  | string  | Account type: risk - risk rate account, mmr - maintenance margin rate account, inactive - market not activated                                                    |
| »»» leverage      | string  | User's current market leverage multiplier                                                                                                                         |
| »»» locked        | boolean | Whether the account is locked                                                                                                                                     |
| »»» risk          | string  | Current risk rate of the margin account (returned when the account is a risk rate account)                                                                        |
| »»» mmr           | string  | Leveraged Account Current Maintenance Margin Rate (returned when the Account is Account)                                                                          |
| »»» base          | object  | Currency account information                                                                                                                                      |
| »»»» currency     | string  | Currency name                                                                                                                                                     |
| »»»» available    | string  | Amount available for margin trading, available = margin + borrowed                                                                                                |
| »»»» locked       | string  | Frozen funds, such as amounts already placed in margin market for order trading                                                                                   |
| »»»» borrowed     | string  | Borrowed funds                                                                                                                                                    |
| »»»» interest     | string  | Unpaid interest                                                                                                                                                   |
| »»» quote         | object  | Currency account information                                                                                                                                      |
| »»»» currency     | string  | Currency name                                                                                                                                                     |
| »»»» available    | string  | Amount available for margin trading, available = margin + borrowed                                                                                                |
| »»»» locked       | string  | Frozen funds, such as amounts already placed in margin market for order trading                                                                                   |
| »»»» borrowed     | string  | Borrowed funds                                                                                                                                                    |
| »»»» interest     | string  | Unpaid interest                                                                                                                                                   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-sub-account-perpetual-futures-account-balance-information) Query sub-account perpetual futures account balance information

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-perpetual-futures-account-balance-information](https://www.gate.io/docs/developers/apiv4/en/#query-sub-account-perpetual-futures-account-balance-information)

> Code samples
