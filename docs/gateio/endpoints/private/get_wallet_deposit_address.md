# GET /wallet/deposit_address

**Source:**
[/wallet/deposit_address](https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-parameters)

## Authentication

Required (Private Endpoint)

## [#](#generate-currency-deposit-address) Generate currency deposit address

`GET /wallet/deposit_address`

_Generate currency deposit address_

### Parameters

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-parameters](https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-parameters)

| Name     | In    | Type   | Required | Description   |
| -------- | ----- | ------ | -------- | ------------- |
| currency | query | string | true     | Currency name |

> Example responses

> 200 Response

```json
{
  "currency": "USDT",
  "address": "LPXtk1kWHioP62SzfqwKbYE3Z7Wt2ujYEc",
  "multichain_addresses": [
    {
      "chain": "TRX",
      "address": "LPXtk1kWHioP62SzfqwKbYE3Z7Wt2ujYEc",
      "payment_id": "",
      "payment_name": "",
      "obtain_failed": 0
    }
  ]
}
```

### Responses

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-responses](https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-responses)

| Status | Meaning                                                                    | Description                    | Schema |
| ------ | -------------------------------------------------------------------------- | ------------------------------ | ------ |
| 200    | [OK (opens new window)](https://tools.ietf.org/html/rfc7231#section-6.3.1) | Address successfully generated | Inline |

### Response Schema

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-responseschema](https://www.gate.io/docs/developers/apiv4/en/#getdepositaddress-responseschema)

Status Code **200**

| Name                     | Type    | Description                                                                             |
| ------------------------ | ------- | --------------------------------------------------------------------------------------- |
| » currency               | string  | Currency detail                                                                         |
| » address                | string  | Deposit address                                                                         |
| » multichain_addresses   | array   | none                                                                                    |
| »» MultiChainAddressItem | object  | none                                                                                    |
| »»» chain                | string  | Name of the chain                                                                       |
| »»» address              | string  | Deposit address                                                                         |
| »»» payment_id           | string  | Notes that some currencies required(e.g., Tag, Memo) when depositing                    |
| »»» payment_name         | string  | Note type, `Tag` or `Memo`                                                              |
| »»» obtain_failed        | integer | The obtain failed status- 0: address successfully obtained- 1: failed to obtain address |

WARNING

To perform this operation, you must be authenticated by API key and secret

## [#](#get-withdrawal-records) Get withdrawal records

**Source:**
[https://www.gate.io/docs/developers/apiv4/en/#get-withdrawal-records](https://www.gate.io/docs/developers/apiv4/en/#get-withdrawal-records)

> Code samples
