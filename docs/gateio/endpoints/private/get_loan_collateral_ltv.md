# GET /loan/collateral/ltv

**Source:** [/loan/collateral/ltv](https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-collateralization-ratio-and-remaining-borrowable-currencies) Query user's collateralization ratio and remaining borrowable currencies

`GET /loan/collateral/ltv`

_Query user's collateralization ratio and remaining borrowable currencies_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-parameters](https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-parameters)

| Name                | In    | Type   | Required | Description         |
| ------------------- | ----- | ------ | -------- | ------------------- |
| collateral_currency | query | string | true     | Collateral currency |
| borrow_currency     | query | string | true     | Borrowed currency   |

> Example responses

> 200 Response

```
{
  "collateral_currency": "BTC",
  "borrow_currency": "USDT",
  "init_ltv": "0.7",
  "alert_ltv": "0.8",
  "liquidate_ltv": "0.9",
  "min_borrow_amount": "3",
  "left_borrowable_amount": "4233030.635065916703"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-responses](https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getuserltvinfo-responseschema)

Status Code **200**

_User's currency statistics data_

| Name                     | Type   | Description                                       |
| ------------------------ | ------ | ------------------------------------------------- |
| » collateral_currency    | string | Collateral currency                               |
| » borrow_currency        | string | Borrowed currency                                 |
| » init_ltv               | string | Initial collateralization rate                    |
| » alert_ltv              | string | Warning collateralization rate                    |
| » liquidate_ltv          | string | Liquidation collateralization rate                |
| » min_borrow_amount      | string | Minimum borrowable amount for the loan currency   |
| » left_borrowable_amount | string | Remaining borrowable amount for the loan currency |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-supported-borrowing-and-collateral-currencies) Query supported borrowing and collateral currencies

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-supported-borrowing-and-collateral-currencies](https://www.gate.io/docs/developers/apiv4/en/#query-supported-borrowing-and-collateral-currencies)

> Code samples
