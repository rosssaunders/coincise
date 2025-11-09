# GET /wallet/total_balance

**Source:**
[/wallet/total_balance](https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-account-totals) Query personal account totals

`GET /wallet/total_balance`

_Query personal account totals_

This query endpoint returns the total _estimated value_ of all currencies in
each account converted to the input currency. Exchange rates and related account
balance information may be cached for up to 1 minute. It is not recommended to
use this interface data for real-time calculations.

For real-time calculations, query the corresponding balance interface based on
account type, such as:

- `GET /spot/accounts` to query spot account
- `GET /margin/accounts` to query margin account
- `GET /futures/{settle}/accounts` to query futures account

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-parameters](https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-parameters)

| Name     | In    | Type   | Required | Description                                                                                                 |
| -------- | ----- | ------ | -------- | ----------------------------------------------------------------------------------------------------------- |
| currency | query | string | false    | Target currency type for statistical conversion. Accepts BTC, CNY, USD, and USDT. USDT is the default value |

> Example responses

> 200 Response

```
{
  "details": {
    "cross_margin": {
      "amount": "0",
      "currency": "USDT"
    },
    "spot": {
      "currency": "USDT",
      "amount": "42264489969935775.5160259954878034182418"
    },
    "finance": {
      "amount": "662714381.70310327810191647181",
      "currency": "USDT"
    },
    "margin": {
      "amount": "1259175.664137668554329559",
      "currency": "USDT",
      "borrowed": "0.00"
    },
    "quant": {
      "amount": "591702859674467879.6488202650892478553852",
      "currency": "USDT"
    },
    "futures": {
      "amount": "2384175.5606114082065",
      "currency": "USDT",
      "unrealised_pnl": "0.00"
    },
    "delivery": {
      "currency": "USDT",
      "amount": "1519804.9756702",
      "unrealised_pnl": "0.00"
    },
    "warrant": {
      "amount": "0",
      "currency": "USDT"
    },
    "cbbc": {
      "currency": "USDT",
      "amount": "0"
    }
  },
  "total": {
    "currency": "USDT",
    "amount": "633967350312281193.068368815439797304437",
    "unrealised_pnl": "0.00",
    "borrowed": "0.00"
  }
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-responses](https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-responses)

| Status | Meaning                                                                    | Description                                | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------------------------ | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Request is valid and successfully returned | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-responseschema](https://www.gate.io/docs/developers/apiv4/en/#gettotalbalance-responseschema)

Status Code **200**

_User's total balance information_

| Name              | Type   | Description                                                                                   |
| ----------------- | ------ | --------------------------------------------------------------------------------------------- |
| » total           | object | Total balances calculated with specified currency unit                                        |
| »» amount         | string | Account total balance amount                                                                  |
| »» currency       | string | Currency                                                                                      |
| »» unrealised_pnl | string | Unrealised_pnl, this field will only appear in futures, options, delivery, and total accounts |
| »» borrowed       | string | Total borrowed amount, this field will only appear in margin and cross_margin accounts        |
| » details         | object | Total balances in different accounts                                                          |

\- cross_margin: cross margin account  
\- spot: spot account  
\- finance: finance account  
\- margin: margin account  
\- quant: quant account  
\- futures: perpetual contract account  
\- delivery: delivery contract account  
\- warrant: warrant account  
\- cbbc: CBBC account | | »» **additionalProperties** | object | Total balances
calculated with specified currency unit | | »»» amount | string | Account total
balance amount | | »»» currency | string | Currency | | »»» unrealised_pnl |
string | Unrealised_pnl, this field will only appear in futures, options,
delivery, and total accounts | | »»» borrowed | string | Total borrowed amount,
this field will only appear in margin and cross_margin accounts |

#### [#](#enumerated-values-3) Enumerated Values

| Property | Value |
| -------- | ----- |
| currency | BTC   |
| currency | CNY   |
| currency | USD   |
| currency | USDT  |
| currency | BTC   |
| currency | CNY   |
| currency | USD   |
| currency | USDT  |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-list-of-convertible-small-balance-currencies) Get list of convertible small balance currencies

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-list-of-convertible-small-balance-currencies](https://www.gate.io/docs/developers/apiv4/en/#get-list-of-convertible-small-balance-currencies)

> Code samples
