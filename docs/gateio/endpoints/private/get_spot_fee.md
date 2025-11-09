# GET /spot/fee

**Source:**
[/spot/fee](https://www.gate.io/docs/developers/apiv4/en/#getfee-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-account-fee-rates) Query account fee rates

`GET /spot/fee`

_Query account fee rates_

This API is deprecated. The new fee query API is `/wallet/fee`

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfee-parameters](https://www.gate.io/docs/developers/apiv4/en/#getfee-parameters)

| Name          | In    | Type   | Required | Description                                              |
| ------------- | ----- | ------ | -------- | -------------------------------------------------------- |
| currency_pair | query | string | false    | Specify currency pair to get more accurate fee settings. |

#### [#](#detailed-descriptions-11) Detailed descriptions

**currency_pair**: Specify currency pair to get more accurate fee settings.

This field is optional. Usually fee settings are the same for all currency
pairs.

> Example responses

> 200 Response

```
{
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
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfee-responses](https://www.gate.io/docs/developers/apiv4/en/#getfee-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getfee-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getfee-responseschema)

Status Code **200**

| Name            | Type           | Description                                                                          |
| --------------- | -------------- | ------------------------------------------------------------------------------------ |
| » user_id       | integer(int64) | User ID                                                                              |
| » taker_fee     | string         | taker fee rate                                                                       |
| » maker_fee     | string         | maker fee rate                                                                       |
| » gt_discount   | boolean        | Whether GT deduction discount is enabled                                             |
| » gt_taker_fee  | string         | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| » gt_maker_fee  | string         | Maker fee rate with GT deduction. Returns 0 if GT deduction is disabled              |
| » loan_fee      | string         | Loan fee rate of margin lending                                                      |
| » point_type    | string         | Point card type: 0 - Original version, 1 - New version since 202009                  |
| » currency_pair | string         | Trading pair                                                                         |
| » debit_fee     | integer        | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#batch-query-account-fee-rates) Batch query account fee rates

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#batch-query-account-fee-rates](https://www.gate.io/docs/developers/apiv4/en/#batch-query-account-fee-rates)

> Code samples
