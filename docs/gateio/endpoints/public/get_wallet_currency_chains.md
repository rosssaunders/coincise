# GET /wallet/currency_chains

**Source:**
[/wallet/currency_chains](https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-parameters)

## Authentication

Not Required (Public Endpoint)

## [#](#query-chains-supported-for-specified-currency) Query chains supported for specified currency

`GET /wallet/currency_chains`

_Query chains supported for specified currency_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-parameters](https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-parameters)

| Name     | In    | Type   | Required | Description   |
| -------- | ----- | ------ | -------- | ------------- |
| currency | query | string | true     | Currency name |

> Example responses

> 200 Response

```
[
  {
    "chain": "ETH",
    "name_cn": "以太坊ERC20",
    "name_en": "ETH/ERC20",
    "contract_address": "",
    "is_disabled": 0,
    "is_deposit_disabled": 0,
    "is_withdraw_disabled": 0
  }
]
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-responses](https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-responses)

| Status | Meaning                                                                    | Description      | Schema     |
| ------ | -------------------------------------------------------------------------- | ---------------- | ---------- |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Query successful | \[Inline\] |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-responseschema](https://www.gate.io/docs/developers/apiv4/en/#listcurrencychains-responseschema)

Status Code **200**

| Name                   | Type           | Description                                                                                     |
| ---------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| » chain                | string         | Chain name                                                                                      |
| » name_cn              | string         | Chain name in Chinese                                                                           |
| » name_en              | string         | Chain name in English                                                                           |
| » contract_address     | string         | Smart contract address for the currency; if no address is available, it will be an empty string |
| » is_disabled          | integer(int32) | If it is disabled. 0 means NOT being disabled                                                   |
| » is_deposit_disabled  | integer(int32) | Is deposit disabled. 0 means not disabled                                                       |
| » is_withdraw_disabled | integer(int32) | Is withdrawal disabled. 0 means not disabled                                                    |
| » decimal              | string         | Withdrawal precision                                                                            |

This operation does not require authentication

## [#](#generate-currency-deposit-address) Generate currency deposit address

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#generate-currency-deposit-address](https://www.gate.io/docs/developers/apiv4/en/#generate-currency-deposit-address)

> Code samples
