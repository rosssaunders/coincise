# GET /wallet/fee

**Source:**
[/wallet/fee](https://www.gate.io/docs/developers/apiv4/en/#gettradefee-parameters)

## Authentication

Required (Private Endpoint)

## [#](#query-personal-trading-fees) Query personal trading fees

`GET /wallet/fee`

_Query personal trading fees_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettradefee-parameters](https://www.gate.io/docs/developers/apiv4/en/#gettradefee-parameters)

| Name          | In    | Type   | Required | Description                                                                        |
| ------------- | ----- | ------ | -------- | ---------------------------------------------------------------------------------- |
| currency_pair | query | string | false    | Specify currency pair to get more accurate fee settings.                           |
| settle        | query | string | false    | Specify the settlement currency of the contract to get more accurate fee settings. |

#### [#](#detailed-descriptions-3) Detailed descriptions

**currency_pair**: Specify currency pair to get more accurate fee settings.

This field is optional. Usually fee settings are the same for all currency
pairs.

**settle**: Specify the settlement currency of the contract to get more accurate
fee settings.

This field is optional. Generally, the fee settings for all settlement
currencies are the same.

#### [#](#enumerated-values-2) Enumerated Values

| Parameter | Value |
| --------- | ----- |
| settle    | BTC   |
| settle    | USDT  |
| settle    | USD   |

> Example responses

> 200 Response

```
{
  "user_id": 10001,
  "taker_fee": "0.002",
  "maker_fee": "0.002",
  "futures_taker_fee": "-0.00025",
  "futures_maker_fee": "0.00075",
  "gt_discount": false,
  "gt_taker_fee": "0",
  "gt_maker_fee": "0",
  "loan_fee": "0.18",
  "point_type": "1",
  "delivery_taker_fee": "0.00016",
  "delivery_maker_fee": "-0.00015",
  "debit_fee": 3
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettradefee-responses](https://www.gate.io/docs/developers/apiv4/en/#gettradefee-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#gettradefee-responseschema](https://www.gate.io/docs/developers/apiv4/en/#gettradefee-responseschema)

Status Code **200**

| Name                 | Type           | Description                                                                          |
| -------------------- | -------------- | ------------------------------------------------------------------------------------ |
| » user_id            | integer(int64) | User ID                                                                              |
| » taker_fee          | string         | taker fee rate                                                                       |
| » maker_fee          | string         | maker fee rate                                                                       |
| » gt_discount        | boolean        | Whether GT deduction discount is enabled                                             |
| » gt_taker_fee       | string         | Taker fee rate if using GT deduction. It will be 0 if GT deduction is disabled       |
| » gt_maker_fee       | string         | Maker fee rate with GT deduction. Returns 0 if GT deduction is disabled              |
| » loan_fee           | string         | Loan fee rate of margin lending                                                      |
| » point_type         | string         | Point card type: 0 - Original version, 1 - New version since 202009                  |
| » futures_taker_fee  | string         | Perpetual contract taker fee rate                                                    |
| » futures_maker_fee  | string         | Perpetual contract maker fee rate                                                    |
| » delivery_taker_fee | string         | Delivery contract taker fee rate                                                     |
| » delivery_maker_fee | string         | Delivery contract maker fee rate                                                     |
| » debit_fee          | integer        | Deduction types for rates, 1 - GT deduction, 2 - Point card deduction, 3 - VIP rates |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-personal-account-totals) Query personal account totals

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-personal-account-totals](https://www.gate.io/docs/developers/apiv4/en/#query-personal-account-totals)

> Code samples
