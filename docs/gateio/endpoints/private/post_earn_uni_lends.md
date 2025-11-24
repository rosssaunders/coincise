# POST /earn/uni/lends

**Source:** [/earn/uni/lends](https://www.gate.io/docs/developers/apiv4/en/#createunilend-parameters)

## Authentication

Required (Private Endpoint)

## [#](#create-lending-or-redemption) Create lending or redemption

`POST /earn/uni/lends`

_Create lending or redemption_

Lending: When lending, a minimum lending rate must be set. After successful
lending is determined on an hourly basis, earnings will be calculated based on
the determined rate. Earnings for each hour will be settled at the top of the
hour. If lending fails due to an excessively high interest rate, no interest
will be earned for that hour. If funds are redeemed before the hourly for that
hour. Priority: Under the same interest rate, wealth management products created
or modified earlier will be prioritized for lending. Redemption: For funds that
failed to be lent, redemption will be credited immediately. For funds
successfully lent, they are entitled to the earnings for that hour, and
redemption will be credited in the next hourly interval. Note: The two minutes
before and after the hourly mark are the settlement period, during which lending
and redemption are prohibited.

> Body parameter

```json
{
  "currency": "AE",
  "amount": "100",
  "min_rate": "0.00001",
  "type": "lend"
}
```

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createunilend-parameters](https://www.gate.io/docs/developers/apiv4/en/#createunilend-parameters)

| Name       | In   | Type   | Required | Description                                                                                                               |
| ---------- | ---- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------- |
| body       | body | object | true     | none                                                                                                                      |
| » currency | body | string | true     | Currency name                                                                                                             |
| » amount   | body | string | true     | Amount to deposit into lending pool                                                                                       |
| » type     | body | string | true     | Operation type: lend - Lend, redeem - Redeem                                                                              |
| » min_rate | body | string | false    | Minimum interest rate. If set too high, lending may fail and no interest will be earned. Required for lending operations. |

#### [#](#enumerated-values-133) Enumerated Values

| Parameter | Value  |
| --------- | ------ |
| » type    | lend   |
| » type    | redeem |

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#createunilend-responses](https://www.gate.io/docs/developers/apiv4/en/#createunilend-responses)

| Status | Meaning                                                                            | Description          | Schema |
| ------ | ---------------------------------------------------------------------------------- | -------------------- | ------ |
| 204    | [No Content (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.5) | Operation successful | None   |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#query-user-s-lending-order-list) Query user's lending order list

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-user-s-lending-order-list](https://www.gate.io/docs/developers/apiv4/en/#query-user-s-lending-order-list)

> Code samples
