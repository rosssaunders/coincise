# GET /loan/collateral/total_amount

**Source:** [/loan/collateral/total_amount](https://www.gate.io/docs/developers/apiv4/en/#getusertotalamount-responses)

## Authentication

Required (Private Endpoint)

## [#](#query-user-s-total-borrowing-and-collateral-amount) Query user's total borrowing and collateral amount

`GET /loan/collateral/total_amount`

_Query user's total borrowing and collateral amount_

> Example responses

> 200 Response

```json
{
  "borrow_amount": "11",
  "collateral_amount": "111"
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getusertotalamount-responses](https://www.gate.io/docs/developers/apiv4/en/#getusertotalamount-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getusertotalamount-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getusertotalamount-responseschema)

Status Code **200**

_User's total borrowing and collateral amount_

| Name                | Type   | Description                     |
| ------------------- | ------ | ------------------------------- |
| » borrow_amount     | string | Total borrowing amount in USDT  |
| » collateral_amount | string | Total collateral amount in USDT |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-collateralization-ratio-and-remaining-borrowable-currencies) Query user's collateralization ratio and remaining borrowable currencies

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-collateralization-ratio-and-remaining-borrowable-currencies](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-collateralization-ratio-and-remaining-borrowable-currencies)

> Code samples
