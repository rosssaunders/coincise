# GET /spot/batch_fee

**Source:** [/spot/batch_fee](https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-parameters)

## Authentication

Required (Private Endpoint)

## [#](#batch-query-account-fee-rates) Batch query account fee rates

`GET /spot/batch_fee`

_Batch query account fee rates_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-parameters](https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-parameters)

| Name           | In    | Type   | Required | Description                           |
| -------------- | ----- | ------ | -------- | ------------------------------------- |
| currency_pairs | query | string | true     | Maximum 50 currency pairs per request |

> Example responses

> 200 Response

```json
{
  "BTC_USDT": {
    "user_id": 10001,
    "taker_fee": "0.002",
    "maker_fee": "0.002",
    "gt_discount": false,
    "gt_taker_fee": "0",
    "gt_maker_fee": "0",
    "loan_fee": "0.18",
    "point_type": "1",
    "currency_pair": "BTC_USDT",
    "debit_fee": 3
  },
  "GT_USDT": {
    "user_id": 10001,
    "taker_fee": "0.002",
    "maker_fee": "0.002",
    "gt_discount": false,
    "gt_taker_fee": "0",
    "gt_maker_fee": "0",
    "loan_fee": "0.18",
    "point_type": "1",
    "currency_pair": "GT_USDT",
    "debit_fee": 3
  },
  "ETH_USDT": {
    "user_id": 10001,
    "taker_fee": "0.002",
    "maker_fee": "0.002",
    "gt_discount": false,
    "gt_taker_fee": "0",
    "gt_maker_fee": "0",
    "loan_fee": "0.18",
    "point_type": "1",
    "currency_pair": "ETH_USDT",
    "debit_fee": 3
  }
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-responses](https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getbatchspotfee-responseschema)

Status Code **200**

| Name                       | Type           | Description                                                                          |
| -------------------------- | -------------- | ------------------------------------------------------------------------------------ |
| » **additionalProperties** | object         | none                                                                                 |
| »» user_id                 | integer(int64) | User ID                                                                              |
| »» taker_fee               | string         | taker fee rate                                                                       |
| »» maker_fee               | string         | maker fee rate                                                                       |
| »» gt_discount             | boolean        | Whether GT deduction discount is enabled                                             |
| »» gt_taker_fee            | string         | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| »» gt_maker_fee            | string         | Maker fee rate with GT deduction. Returns 0 if GT deduction is disabled              |
| »» loan_fee                | string         | Loan fee rate of margin lending                                                      |
| »» point_type              | string         | Point card type: 0 - Original version, 1 - New version since 202009                  |
| »» currency_pair           | string         | Trading pair                                                                         |
| »» debit_fee               | integer        | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#list-spot-trading-accounts) List spot trading accounts

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#list-spot-trading-accounts](https://www.gate.io/docs/developers/apiv4/en/#list-spot-trading-accounts)

> Code samples
