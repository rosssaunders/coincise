# GET /spot/currencies/{currency}

**Source:** [/spot/currencies/{currency}](https://www.gate.io/docs/developers/apiv4/en/#getcurrency-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-single-currency-information) Query single currency information

`GET /spot/currencies/{currency}`

_Query single currency information_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getcurrency-parameters](https://www.gate.io/docs/developers/apiv4/en/#getcurrency-parameters)

| Name     | In   | Type   | Required | Description   |
| -------- | ---- | ------ | -------- | ------------- |
| currency | path | string | true     | Currency name |

> Example responses

> 200 Response

```
{
  "currency": "GT",
  "name": "GateToken",
  "delisted": false,
  "withdraw_disabled": false,
  "withdraw_delayed": false,
  "deposit_disabled": false,
  "trade_disabled": false,
  "chain": "GT",
  "chains": [
    {
      "name": "GT",
      "addr": "",
      "withdraw_disabled": false,
      "withdraw_delayed": false,
      "deposit_disabled": false
    },
    {
      "name": "ETH",
      "withdraw_disabled": false,
      "withdraw_delayed": false,
      "deposit_disabled": false,
      "addr": "0xE66747a101bFF2dBA3697199DCcE5b743b454759"
    },
    {
      "name": "GTEVM",
      "withdraw_disabled": false,
      "withdraw_delayed": false,
      "deposit_disabled": false,
      "addr": ""
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getcurrency-responses](https://www.gate.io/docs/developers/apiv4/en/#getcurrency-responses)

| Status | Meaning                                                                    | Description      | Schema |
| ------ | -------------------------------------------------------------------------- | ---------------- | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getcurrency-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getcurrency-responseschema)

Status Code **200**

| Name                  | Type    | Description                                                                     |
| --------------------- | ------- | ------------------------------------------------------------------------------- |
| » currency            | string  | Currency symbol                                                                 |
| » name                | string  | Currency name                                                                   |
| » delisted            | boolean | Whether currency is de-listed                                                   |
| » withdraw_disabled   | boolean | Whether withdrawal is suspended (deprecated)                                    |
| » withdraw_delayed    | boolean | Whether withdrawal has delay (deprecated)                                       |
| » deposit_disabled    | boolean | Whether deposit is suspended (deprecated)                                       |
| » trade_disabled      | boolean | Whether currency's trading is disabled                                          |
| » fixed_rate          | string  | Fixed fee rate. Only for fixed rate currencies, not valid for normal currencies |
| » chain               | string  | The main chain corresponding to the coin                                        |
| » is_private          | boolean | Is it a privacy currency?                                                       |
| » chains              | array   | All links corresponding to coins                                                |
| »» SpotCurrencyChain  | object  | none                                                                            |
| »»» name              | string  | Blockchain name                                                                 |
| »»» addr              | string  | token address                                                                   |
| »»» withdraw_disabled | boolean | Whether currency's withdrawal is disabled                                       |
| »»» withdraw_delayed  | boolean | Whether currency's withdrawal is delayed                                        |
| »»» deposit_disabled  | boolean | Whether currency's deposit is disabled                                          |

This operation does not require authentication

## [#](#query-all-supported-currency-pairs) Query all supported currency pairs

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#query-all-supported-currency-pairs](https://www.gate.io/docs/developers/apiv4/en/#query-all-supported-currency-pairs)

> Code samples
